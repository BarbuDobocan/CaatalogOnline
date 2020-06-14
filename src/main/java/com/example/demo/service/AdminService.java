package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.entity.Class;
import com.example.demo.entity.grades.FinalGradeCours;
import com.example.demo.entity.grades.TotalGrade;
import com.example.demo.entity.professorCoursClass.ProfessorCoursClasaLink;
import com.example.demo.exception.MessageForUser;
import com.example.demo.model.*;
import com.example.demo.model.professorCoursClass.*;
import com.example.demo.model.response.*;
import com.example.demo.repository.*;
import com.example.demo.repository.grades.CatalogTezeRepository;
import com.example.demo.repository.grades.FinalGradeCoursRepository;
import com.example.demo.repository.grades.TotalGradeRepository;
import com.example.demo.security.JWTTokenProvider;
import com.example.demo.security.UserPrincipal;
import com.example.demo.service.BackupDB.DBAutoBackupController;
import com.example.demo.service.comparator.ClassComparator;
import com.example.demo.service.email.EmailConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController()
public class AdminService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private CoursRepository coursRepository;

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private EmailConfiguration emailCfg;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    CatalogNoteRepository catalogNoteRepository;

    @Autowired
    CatalogAbsenteRepository catalogAbsenteRepository;

    @Autowired
    CatalogTezeRepository catalogTezeRepository;

    @Autowired
    ScolarYearStructureRepository scolarYearStructureRepository;

    @Autowired
    FinalGradeCoursRepository finalGradeCoursRepository;

    @Autowired
    TotalGradeRepository totalGradeRepository;

    @Autowired
    ProfessorCoursClassLinkRepository professorCoursClassLinkRepository;

    @Autowired
    ProfessorService professorService;

    @Autowired
    DBAutoBackupController dbAutoBackupController;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

//    private boolean checkIfAllStudentsTotalGradesSemI()
//    {
//        // verifica la numar
//        List<User> students = userRepository.findAllUsersWithRole(4);
//        List<TotalGradeSemI> totalGradesI = totalGradeSemIRepository.findAll();
//        if(students.size() > totalGradesI.size())
//        {
//            return false;
//        }
//        else
//        {
//            return true;
//        }
//    }

    static String getAlphaNumericString(int n)
    {
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghijklmnopqrstuvxyz";

        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++) {
            int index = (int)(AlphaNumericString.length()* Math.random());
            sb.append(AlphaNumericString.charAt(index));
        }
        return sb.toString();
    }

//    private Set<User> getProfessorsThatAreNotInAClass(int classID){
//        Set<Integer> usersIDs = userRepository.findAllUsersIDsWithRole(2);//2 is professor role ID
//        Set<User> allProfessors = new HashSet<>(0);
//        for(int userID : usersIDs){
//            allProfessors.add(userRepository.findById(userID));
//        }
//        Class clasa = classRepository.findById(classID);
//        allProfessors.removeAll(clasa.getProfessors());
//        return allProfessors;
//    }

//    private List<Cours> getCoursesThatAreNotAssignedToThisClass(int classID){
//        Class clasa = classRepository.findById(classID);
//        List<Cours> courses = coursRepository.findAll();
//        courses.removeAll(clasa.getCourses());
//        return courses;
//    }

    private List<Cours> getCoursesThatAreNotAssignedToThisProfessor(int professorID){
        User professor = userRepository.findById(professorID);
        List<Cours> courses = coursRepository.findAll();
        courses.removeAll(professor.getCours());
        for(int i = 0; i < courses.size(); i++)
        {
            if(courses.get(i).getId() == 10)
            {
                courses.remove(i);
            }
        }
        return courses;
    }

    private List<Class> getClassesThatAreNotAssignedToThisProfessor(int professorID){
        List<Class> classes = classRepository.findByProfessorsId(professorID);
        List<Class> allClasses = classRepository.findAll();
        allClasses.removeAll(classes);
        return allClasses;
    }

    private List<User> getAllProfessorsThatAreNotMasters(){
       List<User> allProfessors = userRepository.findAllUsersWithRole(2);
       List<User> classMasters = userRepository.findAllClassMasters();
       allProfessors.removeAll(classMasters);
       return allProfessors;
    }

    private static boolean isValid(String email) {
        String regex = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
        return email.matches(regex);
    }

    public ResponseEntity register(RegisterUserDTO registerUserDTO){
        //MESAJUL CATRE UTILIZATOR
        MessageForUser msg = new MessageForUser();
        if (Objects.isNull(registerUserDTO.getUsername()) || registerUserDTO.getUsername()==null) {
            msg.setMessage("Username cannot be null ! ");
            return  ResponseEntity.ok(msg);
        }
//        if (Objects.isNull(registerUserDTO.getPassword()) || registerUserDTO.getPassword()==null) {
//            msg.setMessage( "Password cannot be null !");
//            return ResponseEntity.ok(msg);
//        }
        if (Objects.isNull(registerUserDTO.getRoleID())) {
            msg.setMessage("RoleID cannot be null !");
            return ResponseEntity.ok(msg);
        }
        if (Objects.isNull(registerUserDTO.isActive())) {
            msg.setMessage("ActiveField cannot be null !");
            return ResponseEntity.ok(msg);
        }
        if (Objects.isNull(registerUserDTO.getAddress())) {
            msg.setMessage("Address cannot be null !");
            return ResponseEntity.ok(msg);
        }
        if (Objects.isNull(registerUserDTO.getEmail())) {
            msg.setMessage("Email cannot be null !");
            return ResponseEntity.ok(msg);
        }
        if (Objects.isNull(registerUserDTO.getPhoneNumber())) {
            msg.setMessage("PhoneNumber cannot be null !");
            return ResponseEntity.ok(msg);
        }
        if (Objects.isNull(registerUserDTO.getFullName())) {
            msg.setMessage("FullName cannot be null !");
            return ResponseEntity.ok(msg);
        }
        if(registerUserDTO.getRoleID()==4 && Objects.isNull(registerUserDTO.getRegistrationNumber())){
            msg.setMessage("RegistrationNumber cannot be null if you want to add a Student!");
            return ResponseEntity.ok(msg);
        }
        if(userRepository.findByUsername(registerUserDTO.getUsername()) != null)
        {
            msg.setMessage("Username already used");
            return ResponseEntity.ok(msg);
        }
        if(!isValid(registerUserDTO.getEmail()))
        {
            msg.setMessage("Email is not valid");
            return ResponseEntity.ok(msg);
        }

        if(registerUserDTO.getRoleID()==4){
            List<User> allUsers = userRepository.findAllUsersWithRole(4);
            for(User user : allUsers){
                Set<Role> roles = user.getRoles();
                Role role = roles.iterator().next();
                System.out.println(role.getId());
                if(role.getId()==4)
                {
                    String rNumber1 = user.getRegistrationNumber();
                    String rNumber2 = registerUserDTO.getRegistrationNumber();
                    System.out.println(rNumber1 + "  " + rNumber2);
                    if(rNumber1!=null && rNumber2!=null && rNumber1.equals(rNumber2))
                    {
                        msg.setMessage("RegistrationNumber already used for " + user.getFullName() + "!!");
                     return ResponseEntity.ok(msg);
                    }
                }
            }
        }

        User newUser = new User();
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findById(registerUserDTO.getRoleID()).get();
        roles.add(userRole);

        newUser.setUsername(registerUserDTO.getUsername());

        String p = getAlphaNumericString(6);
        System.out.println("newPassword  " + p);
        newUser.setPassword(passwordEncoder.encode(p));

        newUser.setRoles(roles);
        newUser.setActive(registerUserDTO.isActive());
        newUser.setCours(null);
        newUser.setPhoneNumber(registerUserDTO.getPhoneNumber());
        newUser.setEmail(registerUserDTO.getEmail());
        newUser.setAddress(registerUserDTO.getAddress());
        newUser.setFullName(registerUserDTO.getFullName());
        if(registerUserDTO.getRoleID()==4){
            newUser.setRegistrationNumber(registerUserDTO.getRegistrationNumber());
        }

        // email sender
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(registerUserDTO.getEmail());
        mailMessage.setSubject("Contul tau a fost creat");
        mailMessage.setText("Username:" + registerUserDTO.getUsername() + "   Parola:" + p + " ROLUL:" + userRole.getRole());
        javaMailSender.send(mailMessage);

        userRepository.save(newUser);
        return findAllUsersWithRole(registerUserDTO.getRoleID());
       // return ResponseEntity.ok(userRepository.findAll());
    }

    public ResponseEntity getRoles(){
        return ResponseEntity.ok(roleRepository.findAll());
    }

    public ResponseEntity findUserById(int userId){
        return ResponseEntity.ok(userRepository.findById(userId));
    }

    public ResponseEntity removeUser(int userID){
        User removedUser = userRepository.findById(userID);
        if(removedUser != null)
        {
            removedUser.setCours(null);
            removedUser.setRoles(null);
            removedUser.setKids(null);
            userRepository.deleteById(userID);
            return ResponseEntity.ok("User " + removedUser.getUsername() + " was removed");
        }
        else
        {
            return ResponseEntity.ok("The selected userID does not exist ! ");
        }

    }

    public ResponseEntity getAllUsers(){
        return ResponseEntity.ok(userRepository.findAll());
    }

    public ResponseEntity findAllUsersWithRole(int roleId){
        Set<Integer> usersIDs = userRepository.findAllUsersIDsWithRole(roleId);
        //ArrayList<User> users = new ArrayList<User>(0);
        ArrayList<StudentResponseDTO> response = new ArrayList<>(0);
        for(int userID : usersIDs){
            User u = userRepository.findById(userID);
            StudentResponseDTO userR = new StudentResponseDTO();
            userR.setId(u.getId());
            userR.setUserName(u.getUsername());
            userR.setEmail(u.getEmail());
            userR.setRegistrationNumber(u.getRegistrationNumber());
            userR.setPhoneNumber(u.getPhoneNumber());
            userR.setRoles(u.getRoles());
            userR.setName(u.getFullName());
            userR.setAddress(u.getAddress());
            response.add(userR);
           // users.add(userRepository.findById(userID));
        }
        return ResponseEntity.ok(response);
    }

    public ResponseEntity addNewCours(CoursDTO coursDTO){
        if (Objects.isNull(coursDTO.getCoursName()) || coursDTO.getCoursName()==null) {
            return  ResponseEntity.ok( "Cours Name cannot be null ! ");
        }
        if(coursRepository.findByCoursName(coursDTO.getCoursName()) != null){
            return  ResponseEntity.ok( "This cours already exist !! ");
        }

        Cours newCours = new Cours();
        newCours.setCoursName(coursDTO.getCoursName());
        coursRepository.save(newCours);
        return ResponseEntity.ok(coursRepository.findAll());
    }

    public ResponseEntity removeCours(int coursID){
        List<ScolarYearStructure> all = scolarYearStructureRepository.findAll();
        ScolarYearStructure yearStructure = all.get(all.size()-1);

        if(coursRepository.findById(coursID) != null && yearStructure.isYearIsStarting()){
            if(coursRepository.findById(coursID).getCoursName() != "PURTARE"){
                Cours cours = coursRepository.findById(coursID);
                List<ProfessorCoursClasaLink> pccl = professorCoursClassLinkRepository.findByCoursId(coursID);
                List<User> professors = userRepository.findProfessorsThatTeachThisCours(coursID);
                for(User p : professors){
                    p.removeCours(cours);
                    userRepository.save(p);
                }
                for(ProfessorCoursClasaLink p : pccl){
                    professorCoursClassLinkRepository.deleteById(p.getId());
                }
                coursRepository.deleteById(coursID);
            }
            return ResponseEntity.ok( coursRepository.findAll());
        }else{
            return ResponseEntity.ok( coursRepository.findAll());
        }
    }

    public ResponseEntity getCourses(){
        return ResponseEntity.ok(coursRepository.findAll());
    }

    public ResponseEntity assignCoursToProfessor(int professorID, int coursID){
        if(userRepository.findById(professorID) == null){
            return  ResponseEntity.ok( "user with that ID was not found ! ");
        }
        if(coursRepository.findById(coursID) ==  null){
            return ResponseEntity.ok("cours with that ID was not found ! ");
        }

        User professor = userRepository.findById(professorID);
        if(professor != null)
        {
            Set<Role> roles = professor.getRoles();
            Role role = roles.iterator().next();
            if(role.getId()!=2){
                return ResponseEntity.ok("The selected User id not a professor ! ");
            }
            Set<Cours> assignedCourses = professor.getCours();
            for(Cours cours :  assignedCourses){
                if(cours.getId() == coursID){
                    return ResponseEntity.ok("The professor has already assigned this cours ! ");
                }
            }
        }
        Cours assignedCours = coursRepository.findById(coursID);
        professor.addCours(assignedCours);
        userRepository.save(professor);
        ProfessorCoursesResponseDTO response = new ProfessorCoursesResponseDTO();
        response.setAssignedCourses(professor.getCours());
        response.setUnassignedCourses(getCoursesThatAreNotAssignedToThisProfessor(professorID));
        //return ResponseEntity.ok(response);
        return getProfessorProfileData(professorID);
    }


    public ResponseEntity  removeCoursFromProfessor(int professorID, int coursID){
        if(userRepository.findById(professorID) == null){
            return  ResponseEntity.ok( "user with that ID was not found ! ");
        }
        if(coursRepository.findById(coursID) ==  null){
            return ResponseEntity.ok("cours with that ID was not found ! ");
        }
        User professor = userRepository.findById(professorID);

        List<ProfessorCoursClasaLink> pccl =
                professorCoursClassLinkRepository.findByCoursIdAndProfessorId(coursID, professorID);

        for(ProfessorCoursClasaLink p : pccl){
            professorCoursClassLinkRepository.deleteById(p.getId());
        }

        if(professor != null)
        {
            boolean checkCours = false;
            Set<Role> roles = professor.getRoles();
            Role role = roles.iterator().next();
            if(role.getId()!=2){
                return ResponseEntity.ok("The selected User id not a professor ! ");
            }

            Set<Cours> assignedCourses = professor.getCours();
            for(Cours cours :  assignedCourses){
                if(cours.getId() == coursID){
                    checkCours = true;
                }
            }
            if(checkCours)
            {
                Cours selectedCours = coursRepository.findById(coursID);
                professor.removeCours(selectedCours);
                userRepository.save(professor);
                ProfessorCoursesResponseDTO response = new ProfessorCoursesResponseDTO();
                response.setAssignedCourses(professor.getCours());
                response.setUnassignedCourses(getCoursesThatAreNotAssignedToThisProfessor(professorID));
               // return ResponseEntity.ok(response);
                return getProfessorProfileData(professorID);
            }
            else{
               return ResponseEntity.ok("The selected course cannot be unassinged because the selected used do not have that cours assigned ! ");
            }
        }
        return ResponseEntity.ok("YES BOY");
    }

    public ResponseEntity getStudentsThatAreNotHisKids(int parentID){
        List<User> students = userRepository.findAllUsersWithRole(4);
        User parent = userRepository.findById(parentID);
        List<User> kids = parent.getKids().stream().collect(Collectors.toList());
        students.removeAll(kids);
        List<StudentResponseDTO> response = new ArrayList<>(0);
        for(User u : students){
            StudentResponseDTO kid = new StudentResponseDTO();
            kid.setId(u.getId());
            kid.setRegistrationNumber(u.getRegistrationNumber());
            kid.setUserName(u.getUsername());
            kid.setRoles(u.getRoles());
            kid.setEmail(u.getEmail());
            kid.setPhoneNumber(u.getPhoneNumber());
            kid.setName(u.getFullName());
            kid.setAddress(u.getAddress());
            response.add(kid);
        }
        return ResponseEntity.ok(response);
    }

    public ResponseEntity addKidsToParent(AssigManyStudentsToClassDTO assigManyStudentsToParentDTO){
        User parent = userRepository.findById(assigManyStudentsToParentDTO.getClassId());
        for(int i : assigManyStudentsToParentDTO.getStudents()){
            User kid = userRepository.findById(i);
            parent.addKid(kid);
        }
        userRepository.save(parent);
        return getParentProfileData(parent.getId());
    }

    public ResponseEntity removeKidFormParent(int parentID, int kidID){
        if(userRepository.findById(parentID) == null){
            return  ResponseEntity.ok( "user with parentID was not found ! ");
        }
        if(userRepository.findById(kidID) == null){
            return  ResponseEntity.ok( "user with kidID was not found ! ");
        }
        User parent = userRepository.findById(parentID);
        User kid = userRepository.findById(kidID);

        parent.removeKid(kid);
        userRepository.save(parent);

        return getParentProfileData(parentID);
    }

    public ResponseEntity changeSelectedUserData(ChangeUserDataDTO changeUserDataDTO){
        User user = userRepository.findById(changeUserDataDTO.getId());
        user.setFullName(changeUserDataDTO.getName());
        user.setAddress(changeUserDataDTO.getAddress());
        user.setEmail(changeUserDataDTO.getEmail());
        user.setPhoneNumber(changeUserDataDTO.getPhoneNumber());
        Set<Role> role = user.getRoles();
        Role rol = role.iterator().next();
        if(rol.getId() == 4){
            user.setRegistrationNumber(changeUserDataDTO.getRegistrationNumber());
        }
        userRepository.save(user);

        if(rol.getId() == 2)
            return getProfessorProfileData(user.getId());

        if(rol.getId() == 3)
            return getParentProfileData(user.getId());

        if(rol.getId() == 4)
            return professorService.findStudentProfileData(user.getId());

        return null;
    }

    public ResponseEntity addNewClass(ClassDTO classDTO){
        List<Class> verifyClass = classRepository.findByName(classDTO.getName());


        if(verifyClass != null)
        {
            for(Class clasa : verifyClass) {
                if(clasa.getYear() == classDTO.getYear())
                {
                    return  ResponseEntity.ok("This class already exist !");
                }
            }
        }
        Class newClass = new Class();
        newClass.setYear(classDTO.getYear());
        newClass.setName(classDTO.getName());
        classRepository.save(newClass);
        return getClasses();
    }

    public ResponseEntity deleteClass(int classID){
        Class clasa = classRepository.findById(classID);
        List<ProfessorCoursClasaLink> pccl = professorCoursClassLinkRepository.findByClassId(classID);
        for(ProfessorCoursClasaLink p : pccl){
            professorCoursClassLinkRepository.deleteById(p.getId());
        }
        clasa.setStudents(null);
        clasa.setMasterOfClass(null);
        classRepository.deleteById(classID);
        return getClasses();
    }

    public ResponseEntity getClasses(){
        List<Class> clase = classRepository.findAll();
        List<ClassResponseDTO> response = new ArrayList<>(0);
        for(Class c : clase){
            ClassResponseDTO r = new ClassResponseDTO();
            r.setId(c.getId());
            r.setName(c.getName());
            r.setYear(c.getYear());
            response.add(r);
        }
        Collections.sort(response, new ClassComparator());

        return ResponseEntity.ok(response);
    }

    public ResponseEntity findAllStudentsThatAreNotInAClass(){
        return ResponseEntity.ok(userRepository.findAllStudentsThatAreNotInAClass());
    }

    public ResponseEntity transferAllStudents(int fromClassID, int toClassID){
        Class fromClass = classRepository.findById(fromClassID);
        Class toClass = classRepository.findById(toClassID);

        Set<User> students = fromClass.getStudents();
        for(User u : students){
            toClass.addStudent(u);
        }
        classRepository.save(toClass);
        return ResponseEntity.ok(toClass);
    }

    public ResponseEntity removeAllStudentsFromAClass(int classID){
        Class clasa = classRepository.findById(classID);
        Set<User> students = clasa.getStudents();
        for(User u : students){
            clasa.removeStudent(u);
        }
        classRepository.save(clasa);
        return ResponseEntity.ok(clasa);
    }

    public ResponseEntity getProfessorProfileData(int professorID){
        User professor = userRepository.findById(professorID);
        List<ProfessorCoursClasaLink> pccl = professorCoursClassLinkRepository.findByProfessorId(professorID);
        ProfessorProfileDataDTO response = new ProfessorProfileDataDTO();
        List<ClassCoursResponseDTO> classResponse = new ArrayList<>(0);

        UserResponseDTO prof = new UserResponseDTO();
        prof.setId(professor.getId());
        prof.setName(professor.getFullName());
        prof.setUserName(professor.getUsername());
        prof.setPhoneNumber(professor.getPhoneNumber());
        prof.setEmail(professor.getEmail());
        prof.setAddress(professor.getAddress());
        prof.setRoles(professor.getRoles());
        response.setUser(prof);

        for(ProfessorCoursClasaLink p : pccl){
            Class c = p.getClasa();
            Cours cours = p.getCours();

            ClassResponseDTO clasa = new ClassResponseDTO();
            clasa.setId(c.getId());
            clasa.setName(c.getName());
            clasa.setYear(c.getYear());

            ClassCoursResponseDTO ccr = new ClassCoursResponseDTO();
            ccr.setClasa(clasa);
            ccr.setCours(cours);
            classResponse.add(ccr);
        }
        response.setClasses(classResponse);
        response.setCourses(professor.getCours());

        Optional<Integer> classId = classRepository.findByMasterId(professor.getId());
        if(classId.isPresent())
        {
            int a = classId.get();
            Class clasa = classRepository.findById(a);
            ClassResponseDTO mastersClass = new ClassResponseDTO();
            mastersClass.setId(clasa.getId());
            mastersClass.setName(clasa.getName());
            mastersClass.setYear(clasa.getYear());
            response.setMasterOfClass(mastersClass);
        }
        return ResponseEntity.ok(response);
    }

    public ResponseEntity getProfessorUnassignedCourses(int professorID){
        return ResponseEntity.ok(getCoursesThatAreNotAssignedToThisProfessor(professorID));
    }

    public ResponseEntity getProfessorUnassignedClasses(int professorID){
        return ResponseEntity.ok(getClassesThatAreNotAssignedToThisProfessor(professorID));
    }

    public ResponseEntity removeMasterOfClass(int classID){
        Class clasa = classRepository.findById(classID);
        Optional<ProfessorCoursClasaLink> pccl =
                professorCoursClassLinkRepository.findByClassCoursProfessor(
                        classID,
                        10,
                        clasa.getMasterOfClass().getId());
        if(pccl.isPresent())
        {
            professorCoursClassLinkRepository.deleteById(pccl.get().getId());
        }

        clasa.setMasterOfClass(null);
        classRepository.save(clasa);

        if(clasa.getMasterOfClass() != null){
            UserResponseDTO master = new UserResponseDTO();
            master.setId(clasa.getMasterOfClass().getId());
            master.setEmail(clasa.getMasterOfClass().getEmail());
            master.setPhoneNumber(clasa.getMasterOfClass().getPhoneNumber());
            master.setUserName(clasa.getMasterOfClass().getUsername());
            master.setName(clasa.getMasterOfClass().getFullName());
            return ResponseEntity.ok(master);
        }else{
            return ResponseEntity.ok(false);
        }

    }

    public ResponseEntity removeClassFromMaster(int professorId){
        Optional<Integer> classId = classRepository.findByMasterId(professorId);
        int clasId = classId.get();

        //clasa dirigintelui
        Class clasa = classRepository.findById(clasId);
        Optional<ProfessorCoursClasaLink> pccl =
                professorCoursClassLinkRepository.findByClassCoursProfessor(
                        clasId,
                        10,
                        clasa.getMasterOfClass().getId());
        if(pccl.isPresent())
        {
            professorCoursClassLinkRepository.deleteById(pccl.get().getId());
        }

        clasa.setMasterOfClass(null);
        classRepository.save(clasa);
        List<Integer> simpleClasses = classRepository.findClassesThatHaveNotMasters();
        List<ClassResponseDTO> classList = new ArrayList<ClassResponseDTO>(0);

        //aici se creeaza lista cu clasele fara diriginte
        for(int i : simpleClasses){
            ClassResponseDTO b = new ClassResponseDTO();
            Class c = classRepository.findById(i);
            b.setId(i);
            b.setName(c.getName());
            b.setYear(c.getYear());
            classList.add(b);
        }
        //raspunsul trimis inapoi
        RemoveClassFromMasterRespDTO response = new RemoveClassFromMasterRespDTO();
        response.setClassesWithoutMaster(classList);

        //mai verific inca o data daca profesorul este diriginte
        Optional<Integer> classIdResponse = classRepository.findByMasterId(professorId);
        if(classIdResponse.isPresent()) {
            int clasIdResp = classId.get();
            Class clasaResponse = classRepository.findById(clasIdResp);
            ClassResponseDTO b = new ClassResponseDTO();
            b.setId(clasaResponse.getId());
            b.setName(clasaResponse.getName());
            b.setYear(clasaResponse.getYear());
            response.setMasterOfClass(b);
        }
        return ResponseEntity.ok(response);
    }

    public ResponseEntity yearWillStart()
    {
        //se creeaza un nou an scolar
       // ScolarYearStructure newYearStructure = new ScolarYearStructure();
        List<ScolarYearStructure> all = scolarYearStructureRepository.findAll();
        ScolarYearStructure newYearStructure = all.get(all.size()-1);

        newYearStructure.setYearIsStarting(true);
        newYearStructure.setSemIstart(false);
        newYearStructure.setSemIstop(false);
        newYearStructure.setSemIIstart(false);
        newYearStructure.setSemIIstop(false);
        newYearStructure.setYearIsFinished(false);

        dbAutoBackupController.schedule();

        //se sterge tot catalogul
        catalogNoteRepository.deleteGrades();
        catalogAbsenteRepository.deleteMissings();
        catalogTezeRepository.deleteThesis();
        finalGradeCoursRepository.deleteFinalGrades();
        totalGradeRepository.deleteTotalGrades();

        scolarYearStructureRepository.save(newYearStructure);

        YearStructureDTO response = new YearStructureDTO();
        response.setScolarYearStructure(newYearStructure);
        response.setNrStep(0);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity startSemI(){
        //se creeaza un nou an scolar
       // ScolarYearStructure newYearStructure = new ScolarYearStructure();
        List<ScolarYearStructure> all = scolarYearStructureRepository.findAll();
        ScolarYearStructure newYearStructure = all.get(all.size()-1);

        newYearStructure.setYearIsStarting(false);
        newYearStructure.setSemIstart(true);
        newYearStructure.setSemIstop(false);
        newYearStructure.setSemIIstart(false);
        newYearStructure.setSemIIstop(false);
        newYearStructure.setYearIsFinished(false);
        scolarYearStructureRepository.save(newYearStructure);

        YearStructureDTO response = new YearStructureDTO();
        response.setScolarYearStructure(newYearStructure);
        response.setNrStep(1);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity stopSemI(){
        //se schimba anul scolaru creeat inainte
        List<ScolarYearStructure> all = scolarYearStructureRepository.findAll();
        ScolarYearStructure newYearStructure = all.get(all.size()-1);
       // boolean ok = checkIfAllStudentsTotalGradesSemI();
       // if(ok) {
        newYearStructure.setYearIsStarting(false);
        newYearStructure.setSemIstart(false);
        newYearStructure.setSemIstop(true);
        newYearStructure.setSemIIstart(false);
        newYearStructure.setSemIIstop(false);
        newYearStructure.setYearIsFinished(false);
        scolarYearStructureRepository.save(newYearStructure);

        YearStructureDTO response = new YearStructureDTO();
        response.setScolarYearStructure(newYearStructure);
        response.setNrStep(2);
        return ResponseEntity.ok(response);
//        }
//        else
//        {
//            MessageForUser msg = new MessageForUser();
//            msg.setMessage("Se pare ca sunt studenti cu situatia neincheiata");
//            return ResponseEntity.ok(msg);
//        }
    }

    public ResponseEntity startSemII(){
        List<ScolarYearStructure> all = scolarYearStructureRepository.findAll();
        ScolarYearStructure newYearStructure = all.get(all.size()-1);
            newYearStructure.setYearIsStarting(false);
            newYearStructure.setSemIstart(false);
            newYearStructure.setSemIstop(false);
            newYearStructure.setSemIIstart(true);
            newYearStructure.setSemIIstop(false);
            newYearStructure.setYearIsFinished(false);
            scolarYearStructureRepository.save(newYearStructure);

            YearStructureDTO response = new YearStructureDTO();
            response.setScolarYearStructure(newYearStructure);
            response.setNrStep(3);
            return ResponseEntity.ok(response);
    }

    public ResponseEntity stopSemII(){
        List<ScolarYearStructure> all = scolarYearStructureRepository.findAll();
        ScolarYearStructure newYearStructure = all.get(all.size()-1);

        newYearStructure.setYearIsStarting(false);
        newYearStructure.setSemIstart(false);
        newYearStructure.setSemIstop(false);
        newYearStructure.setSemIIstart(false);
        newYearStructure.setSemIIstop(true);
        newYearStructure.setYearIsFinished(false);
        scolarYearStructureRepository.save(newYearStructure);

        YearStructureDTO response = new YearStructureDTO();
        response.setScolarYearStructure(newYearStructure);
        response.setNrStep(4);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity yearIsFinished(){
        List<ScolarYearStructure> all = scolarYearStructureRepository.findAll();
        ScolarYearStructure newYearStructure = all.get(all.size()-1);

        newYearStructure.setYearIsStarting(false);
        newYearStructure.setSemIstart(false);
        newYearStructure.setSemIstop(false);
        newYearStructure.setSemIIstart(false);
        newYearStructure.setSemIIstop(false);
        newYearStructure.setYearIsFinished(true);
        scolarYearStructureRepository.save(newYearStructure);



        YearStructureDTO response = new YearStructureDTO();
        response.setScolarYearStructure(newYearStructure);
        response.setNrStep(5);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity getYearStructure(){
        List<ScolarYearStructure> all = scolarYearStructureRepository.findAll();
        ScolarYearStructure newYearStructure = all.get(all.size()-1);

        YearStructureDTO response = new YearStructureDTO();
        response.setScolarYearStructure(newYearStructure);
        if(newYearStructure.isYearIsStarting())
            response.setNrStep(0);
        if(newYearStructure.isSemIstart())
            response.setNrStep(1);
        if(newYearStructure.isSemIstop())
            response.setNrStep(2);
        if(newYearStructure.isSemIIstart())
            response.setNrStep(3);
        if(newYearStructure.isSemIIstop())
            response.setNrStep(4);
        if(newYearStructure.isYearIsFinished())
            response.setNrStep(5);

        return ResponseEntity.ok(response);
    }

    ///////////////========================
    private List<StudentResponseDTO> freeStudents(){
        List<StudentResponseDTO> response = new ArrayList<StudentResponseDTO>(0);
        Set<User> students = userRepository.findAllStudentsThatAreNotInAClass();
        for(User u : students){
            StudentResponseDTO a = new StudentResponseDTO();
            a.setId(u.getId());
            a.setUserName(u.getUsername());
            a.setName(u.getFullName());
            a.setEmail(u.getEmail());
            a.setRegistrationNumber(u.getRegistrationNumber());
            a.setPhoneNumber(u.getPhoneNumber());
            response.add(a);
        }
        return response;
    }

    private boolean doesProfessorTeachThisCours(int professorId, int coursId) {
        User professor = userRepository.findById(professorId);
        for (Cours c : professor.getCours()) {
            if (c.getId() == coursId) {
                return true;
            }
        }
        return false;
    }

    private List<StudentResponseDTO> studentsFromClass(int classId){
        Class clasa = classRepository.findById(classId);
        Set<User> students = clasa.getStudents();
        List<StudentResponseDTO> studentsResponse = new ArrayList<StudentResponseDTO>(0);
        for(User s : students){
            StudentResponseDTO a = new StudentResponseDTO();
            a.setRegistrationNumber(s.getRegistrationNumber());
            a.setId(s.getId());
            a.setEmail(s.getEmail());
            a.setName(s.getFullName());
            a.setUserName(s.getUsername());
            a.setPhoneNumber(s.getPhoneNumber());
            a.setRoles(s.getRoles());
            studentsResponse.add(a);
        }
        return studentsResponse;
    }

    private List<ProfessorCoursResponseDTO> findCoursesAndProfessorsOfClass(int classId){
        List<ProfessorCoursClasaLink> classData = professorCoursClassLinkRepository.findByClassId(classId);
        List<ProfessorCoursResponseDTO> response = new ArrayList<ProfessorCoursResponseDTO>(0);
        for(ProfessorCoursClasaLink pccl : classData)
        {
            UserResponseDTO b = new UserResponseDTO();
            ProfessorCoursResponseDTO a = new ProfessorCoursResponseDTO();
            a.setCours(pccl.getCours());
            b.setId(pccl.getProfessor().getId());
            b.setEmail(pccl.getProfessor().getEmail());
            b.setName(pccl.getProfessor().getFullName());
            b.setUserName(pccl.getProfessor().getUsername());
            b.setPhoneNumber(pccl.getProfessor().getPhoneNumber());
            a.setProfessor(b);
            response.add(a);
        }
        return response;
    }

    //gaseste toate cursurile si profesorii care le predau
    private List<OneCoursAndManyProfessorsDTO> findCoursesAndAllProfessorsThatTeachIt(){
        List<OneCoursAndManyProfessorsDTO> response = new ArrayList<OneCoursAndManyProfessorsDTO>(0);
        List<Cours> courses = coursRepository.findAll();
        for(Cours c : courses){
            OneCoursAndManyProfessorsDTO a = new OneCoursAndManyProfessorsDTO();
            a.setCours(c);
            a.setProfessors(userRepository.findProfessorsThatTeachThisCours(c.getId()));
            response.add(a);
        }
        return response;
    }

    private List<ProfessorCoursResponseDTO> assignCoursesToClass(List<CoursProfessorClassDTO> listCoursProfessorClassDTO, int classId){
        Class clasa = classRepository.findById(classId);
        for(CoursProfessorClassDTO a : listCoursProfessorClassDTO){
            if(a.getProfessorId() != -1)
            {
                Cours cours = coursRepository.findById(a.getCoursId());
                User professor = userRepository.findById(a.getProfessorId());
                ProfessorCoursClasaLink pccl = new ProfessorCoursClasaLink();
                pccl.setClasa(clasa);
                pccl.setCours(cours);
                pccl.setProfessor(professor);
                professorCoursClassLinkRepository.save(pccl);
            }
        }
        List<ProfessorCoursResponseDTO> response = findCoursesAndProfessorsOfClass(classId);
        return response;
    }

    public ResponseEntity assignMasterToClass(int classID, int professorID){
        //GetClassesResponse response = new GetClassesResponse();
        UserResponseDTO response = new UserResponseDTO();

        Cours behavior = coursRepository.findById(10);////PURTARE

        Class clasa = classRepository.findById(classID);
        User prof = userRepository.findById(professorID);
        clasa.setMasterOfClass(prof);
        classRepository.save(clasa);

        ProfessorCoursClasaLink pccl = new ProfessorCoursClasaLink();
        pccl.setProfessor(prof);
        pccl.setCours(behavior);
        pccl.setClasa(clasa);
        professorCoursClassLinkRepository.save(pccl);

        response.setId(clasa.getMasterOfClass().getId());
        response.setName(clasa.getMasterOfClass().getFullName());
        response.setUserName(clasa.getMasterOfClass().getUsername());
        response.setPhoneNumber(clasa.getMasterOfClass().getPhoneNumber());
        response.setEmail(clasa.getMasterOfClass().getEmail());

        return ResponseEntity.ok(response);
//        response.setClasses(clasa);
//        response.setStudentsThatAreNotInAClass(userRepository.findAllStudentsThatAreNotInAClass());
//        response.setProfessorsNotThisClass(getProfessorsThatAreNotInAClass(classID));
//        response.setCoursesNotThisClass(getCoursesThatAreNotAssignedToThisClass(classID));
//        response.setProfessorThatAreNotMasters(getAllProfessorsThatAreNotMasters());
//        return ResponseEntity.ok(response);
    }

    public ResponseEntity getFreeStudents(){
        List<StudentResponseDTO> response = this.freeStudents();
        return ResponseEntity.ok(response);
    }

    public ResponseEntity assignCoursByProfessorToClass(CoursProfessorClassDTO coursProfessorClassDTO){
        Cours cours = coursRepository.findById(coursProfessorClassDTO.getCoursId());
        Class clasa = classRepository.findById(coursProfessorClassDTO.getClassId());
        User professor = userRepository.findById(coursProfessorClassDTO.getProfessorId());
        ProfessorCoursClasaLink pccl = new ProfessorCoursClasaLink();
        pccl.setClasa(clasa);
        pccl.setCours(cours);
        pccl.setProfessor(professor);

        Optional<ProfessorCoursClasaLink> test
                = professorCoursClassLinkRepository.findByClassCoursProfessor(
                        coursProfessorClassDTO.getClassId(),
                        coursProfessorClassDTO.getCoursId(),
                        coursProfessorClassDTO.getProfessorId()
                );
        if(test.isPresent())
        {
            return ResponseEntity.ok("Profesorul preda deja acest curs, acestei clase!");
        }

        Optional<ProfessorCoursClasaLink> test1
                = professorCoursClassLinkRepository.findByClassIdAndCoursId(
                coursProfessorClassDTO.getClassId(),
                coursProfessorClassDTO.getCoursId());
        if(test1.isPresent())
        {
            return ResponseEntity.ok("Clasa invata deja aceasta materie");
        }

        if(doesProfessorTeachThisCours(coursProfessorClassDTO.getProfessorId(),coursProfessorClassDTO.getCoursId()))
        {
            professorCoursClassLinkRepository.save(pccl);
            return ResponseEntity.ok(professorCoursClassLinkRepository.findAll());
        }
        else
        {
            return ResponseEntity.ok("Profesorul nu preda aces curs");
        }
    }

    //Retureaza cursurile si profesorii clasei
    public ResponseEntity getCoursByProfessorsOfClass(int classId){
        List<ProfessorCoursResponseDTO> response = findCoursesAndProfessorsOfClass(classId);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity removeCoursByProfessorFromClass(int classId, int coursId){
        //classRepository.deleteById(classID);
        Optional<ProfessorCoursClasaLink> test = professorCoursClassLinkRepository.findByClassIdAndCoursId(classId, coursId);
        ProfessorCoursClasaLink pccl = test.get();
        if(coursId != 10)//PURTARE
        {
            professorCoursClassLinkRepository.deleteById(pccl.getId());
        }

        return ResponseEntity.ok(findCoursesAndProfessorsOfClass(classId));
    }

    public ResponseEntity getCoursAndItsProfessor(){
        List<OneCoursAndManyProfessorsDTO> response = findCoursesAndAllProfessorsThatTeachIt();
        return ResponseEntity.ok(response);
    }

    public ResponseEntity getClassProfileData(int classId){
        Class clasa = classRepository.findById(classId);

        List<StudentResponseDTO> studentsResponse = studentsFromClass(classId);

        List<ProfessorCoursResponseDTO> coursesResponse = findCoursesAndProfessorsOfClass(classId);

        ClassResponseDTO clasResp = new ClassResponseDTO();
        clasResp.setId(clasa.getId());
        clasResp.setYear(clasa.getYear());
        clasResp.setName(clasa.getName());

        ProfileClassResponseDTO response = new ProfileClassResponseDTO();

        response.setStudents(studentsResponse);
        response.setCourses(coursesResponse);
        response.setClasa(clasResp);

        User masterOfClass = clasa.getMasterOfClass();
        UserResponseDTO masterResponse = new UserResponseDTO();
        if(masterOfClass != null)
        {
            masterResponse.setId(masterOfClass.getId());
            masterResponse.setUserName(masterOfClass.getUsername());
            masterResponse.setName(masterOfClass.getFullName());
            masterResponse.setEmail(masterOfClass.getEmail());
            masterResponse.setPhoneNumber(masterOfClass.getPhoneNumber());
            response.setMasterOfClass(masterResponse);
        }
        return ResponseEntity.ok(response);
    }

    public ResponseEntity changeClassProfileData(ClassResponseDTO classResponseDTO){
        Class clasa = classRepository.findById(classResponseDTO.getId());

        clasa.setYear(classResponseDTO.getYear());
        clasa.setName(classResponseDTO.getName());
        classRepository.save(clasa);
        return getClassProfileData(classResponseDTO.getId());
    }

    public ResponseEntity assignManyStudentsToClass(AssigManyStudentsToClassDTO assigManyStudentsToClassDTO){
        Class clasa = classRepository.findById(assigManyStudentsToClassDTO.getClassId());
        for(int i : assigManyStudentsToClassDTO.getStudents()){
            User student = userRepository.findById(i);
            clasa.addStudent(student);
        }
        classRepository.save(clasa);
        List<StudentResponseDTO> studentsResponse = studentsFromClass(assigManyStudentsToClassDTO.getClassId());
        return ResponseEntity.ok(studentsResponse);
    }

    public ResponseEntity assignStudentToClass(int classID, int studentID){
        Class clasa = classRepository.findById(classID);
        User student = userRepository.findById(studentID);
        Optional<List<FinalGradeCours>> studSemIGrades =
                finalGradeCoursRepository.findByStudentSemesterMaxGrade(studentID, 1, 11);
        List<ProfessorCoursClasaLink> classCourses = professorCoursClassLinkRepository.findByClassId(classID);

        NewStudentSem2ResponseDTO response = new NewStudentSem2ResponseDTO();
        List<Cours> coursList = new ArrayList<>(0);
        boolean ok;
        if(studSemIGrades.isPresent() && studSemIGrades.get().size() > 0)
        {
            for(ProfessorCoursClasaLink pccl : classCourses){
                ok = false;
                for(FinalGradeCours grade : studSemIGrades.get()){
                    if(pccl.getCours().getId() == grade.getCours().getId()){
                        ok = true;
                    }
                }
                if(!ok){
                    coursList.add(pccl.getCours());
                }
            }
        }
        else
        {
            for(ProfessorCoursClasaLink pccl : classCourses){
                coursList.add(pccl.getCours());
            }
        }

        if(coursList.size() == 0)
        {
            clasa.addStudent(student);
            classRepository.save(clasa);
            List<StudentResponseDTO> studentsResponse = studentsFromClass(classID);
            return ResponseEntity.ok(studentsResponse);
        }
        else
        {
            response.setResponse(coursList);
            response.setShowModal(true);
            return ResponseEntity.ok(response);
        }
    }

    public ResponseEntity addFinalsToStudentAndAssignHimToClass(TransfStudentDataDTO transfStudentDataDTO){
        Class clasa = classRepository.findById(transfStudentDataDTO.getClassId());
        User student = userRepository.findById(transfStudentDataDTO.getStudentId());

        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User admin = userRepository.findByUsername(currentUser.getUsername());

        List<GradeCoursDTO> courses = transfStudentDataDTO.getFinals();
        for(GradeCoursDTO c : courses){
            FinalGradeCours newFinal = new FinalGradeCours();
            newFinal.setGrade(c.getGrade());
            newFinal.setSemester(1);

            Cours cours = coursRepository.findById(c.getCoursId());
            newFinal.setCours(cours);
            newFinal.setProfessor(admin);
            newFinal.setStudent(student);
            finalGradeCoursRepository.save(newFinal);
        }
        Optional<TotalGrade> semI = totalGradeRepository.findByStudentIdAndCoursId(student.getId(), 1);
        if(semI.isPresent())
        {
            totalGradeRepository.deleteById(semI.get().getId());
        }
        List<FinalGradeCours> studentGrades = finalGradeCoursRepository.findByStudentId(student.getId());

        double sum = 0;
        for(FinalGradeCours fgc : studentGrades){
            sum = sum + fgc.getGrade();
        }
        double average = sum / studentGrades.size();
        TotalGrade totalGrade = new TotalGrade();
        totalGrade.setTotalGradeI(average);
        totalGrade.setSemester(1);
        totalGrade.setProfessor(admin);
        totalGrade.setStudent(student);
        totalGradeRepository.save(totalGrade);
        clasa.addStudent(student);
        classRepository.save(clasa);
        return ResponseEntity.ok(studentsFromClass(clasa.getId()));
    }

    public ResponseEntity takeOutStudendFromClass(int studentId, int classId){
        Class clasa = classRepository.findById(classId);
        User student = userRepository.findById(studentId);
        clasa.removeStudent(student);
        classRepository.save(clasa);
        List<StudentResponseDTO> response = studentsFromClass(classId);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity findUnassignedCoursesToClass(int classId){
        //toate cursurile
        List<OneCoursAndManyProfessorsDTO> allCourses = findCoursesAndAllProfessorsThatTeachIt();
        //toate cursuile din clasa
        List<ProfessorCoursResponseDTO> classCourses = findCoursesAndProfessorsOfClass(classId);
        List<OneCoursAndManyProfessorsDTO> response = new ArrayList<OneCoursAndManyProfessorsDTO>(0);
        boolean ok;
        int newId = 0;
        for(OneCoursAndManyProfessorsDTO ac : allCourses){
            ok = true;
            for(ProfessorCoursResponseDTO cc : classCourses){
                if(ac.getCours().getId() == cc.getCours().getId() || ac.getCours().getId() == 10){
                    ok = false;
                }
            }
            if(ok){
                ac.setId(newId);
                response.add(ac);
                newId++;
            }
        }
        return ResponseEntity.ok(response);
    }

    public ResponseEntity assignManyCoursesToAClass(List<CoursProfessorClassDTO> listCoursProfessorClassDTO, int classId){
        List<ProfessorCoursResponseDTO> response = assignCoursesToClass(listCoursProfessorClassDTO, classId);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity getProfessorsThatAreNotMastersForClassProfile(){
        List<User> professors = getAllProfessorsThatAreNotMasters();
        List<UserResponseDTO> response = new ArrayList<UserResponseDTO>(0);
        for(User p : professors){
            UserResponseDTO professor = new UserResponseDTO();
            professor.setId(p.getId());
            professor.setEmail(p.getEmail());
            professor.setPhoneNumber(p.getPhoneNumber());
            professor.setUserName(p.getUsername());
            professor.setName(p.getFullName());
            response.add(professor);
        }
        return ResponseEntity.ok(response);
    }

    public ResponseEntity getParentProfileData(int parentID){
        User parent = userRepository.findById(parentID);
        UserResponseDTO parentResp = new UserResponseDTO();
        List<UserResponseDTO> kids = new ArrayList<>(0);

        parentResp.setId(parent.getId());
        parentResp.setRoles(parent.getRoles());
        parentResp.setAddress(parent.getAddress());
        parentResp.setEmail(parent.getEmail());
        parentResp.setPhoneNumber(parent.getPhoneNumber());
        parentResp.setUserName(parent.getUsername());
        parentResp.setName(parent.getFullName());

        for(User u : parent.getKids()){
            StudentResponseDTO kid = new StudentResponseDTO();
            kid.setId(u.getId());
            kid.setAddress(u.getAddress());
            kid.setName(u.getFullName());
            kid.setUserName(u.getUsername());
            kid.setPhoneNumber(u.getPhoneNumber());
            kid.setEmail(u.getEmail());
            kid.setRoles(u.getRoles());
            kid.setRegistrationNumber(u.getRegistrationNumber());

            kids.add(kid);
        }
        ParentProfileResponseDTO response = new ParentProfileResponseDTO();
        response.setKids(kids);
        response.setUser(parentResp);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity deleteUserById(int userId){
        User user = userRepository.findById(userId);
        Set<Role> roles = user.getRoles();
        Role role = roles.iterator().next();
        if(role.getId() == 1){
            MessageForUser msg = new MessageForUser();
            msg.setMessage("Adminul nu poate fi sters!");
            return ResponseEntity.ok(msg);
        }
        if(role.getId() == 2){
            user.setCours(null);
            user.setRoles(null);
            List<ProfessorCoursClasaLink> pccl = professorCoursClassLinkRepository.findByProfessorId(user.getId());
            for(ProfessorCoursClasaLink p : pccl){
                professorCoursClassLinkRepository.deleteById(p.getId());
            }
            Optional<Integer> masterClassId = classRepository.findByMasterId(user.getId());
            if(masterClassId.isPresent()){
                classRepository.deleteById(masterClassId.get());
            }
            userRepository.deleteById(user.getId());

            MessageForUser msg = new MessageForUser();
            msg.setMessage("Profesor Sters!");
            return ResponseEntity.ok(msg);
        }
        if(role.getId() == 3){
            user.setKids(null);
            user.setRoles(null);
            userRepository.deleteById(user.getId());
            MessageForUser msg = new MessageForUser();
            msg.setMessage("Parinte Sters!");
            return ResponseEntity.ok(msg);
        }
        if(role.getId() == 4){
            user.setRoles(null);
            List<Integer> parents = userRepository.studentParents(user.getId());
            for(int p : parents){
                User parent = userRepository.findById(p);
                parent.removeKid(user);
                userRepository.save(parent);
            }
            userRepository.deleteById(user.getId());
            MessageForUser msg = new MessageForUser();
            msg.setMessage("Student Sters!");
            return ResponseEntity.ok(msg);
        }
        return null;
    }

    ////////////////===================

}
