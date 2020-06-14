package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.entity.Class;
import com.example.demo.entity.grades.FinalGradeCours;
import com.example.demo.entity.grades.TotalGrade;
import com.example.demo.exception.MessageForUser;
import com.example.demo.entity.professorCoursClass.ProfessorCoursClasaLink;
import com.example.demo.model.*;
import com.example.demo.model.professorCoursClass.ClassFullResponseDTO;
import com.example.demo.model.professorCoursClass.ProfessorCoursResponseDTO;
import com.example.demo.model.professorCoursClass.StudentResponseDTO;
import com.example.demo.model.professorCoursClass.UserResponseDTO;
import com.example.demo.model.response.*;
import com.example.demo.repository.*;
import com.example.demo.repository.grades.CatalogTezeRepository;
import com.example.demo.repository.grades.FinalGradeCoursRepository;
import com.example.demo.repository.grades.TotalGradeRepository;
import com.example.demo.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController()
public class ProfessorService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CoursRepository coursRepository;

    @Autowired
    ClassRepository classRepository;

    @Autowired
    CatalogNoteRepository catalogNoteRepository;

    @Autowired
    CatalogAbsenteRepository catalogAbsenteRepository;

    @Autowired
    CatalogTezeRepository catalogTezeRepository;

    @Autowired
    LocationRepository locationRepository;

    @Autowired
    ScolarYearStructureRepository scolarYearStructureRepository;

    @Autowired
    FinalGradeCoursRepository finalGradeCoursRepository;

    @Autowired
    TotalGradeRepository totalGradeRepository;

    @Autowired
    ProfessorCoursClassLinkRepository professorCoursClassLinkRepository;


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

    public ResponseEntity assignTezaToStudent(NewGradeForStudentDTO gradeDTO){
        //profesoul logat
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User professor = userRepository.findByUsername(currentUser.getUsername());

        //preda sau nu clasei
        Optional<Class> studentClass = classRepository.findByStudentsId(gradeDTO.getStudentId());
        Optional<ProfessorCoursClasaLink> pccl =
                professorCoursClassLinkRepository.findByClassCoursProfessor(
                        studentClass.get().getId(),
                        gradeDTO.getCoursId(),
                        professor.getId()
                );

        //preda sau nu clasei
        if(pccl.isPresent()) {
            //in ce semestru suntem
            List<ScolarYearStructure> all = scolarYearStructureRepository.findAll();
            ScolarYearStructure newYearStructure = all.get(all.size() - 1);

            CatalogTeze newTeza = new CatalogTeze();
            newTeza.setNota(gradeDTO.getNota());
            newTeza.setCours(coursRepository.findById(gradeDTO.getCoursId()));
            newTeza.setProfessor(userRepository.findById(professor.getId()));
            newTeza.setStudent(userRepository.findById(gradeDTO.getStudentId()));
            newTeza.setDate(gradeDTO.getDate());
            if (newYearStructure.isSemIstart()) {
                newTeza.setSemester(1);
                Optional<CatalogTeze> test = catalogTezeRepository.findByStudentIdProfessorIdSemester(
                        gradeDTO.getStudentId(),
                        gradeDTO.getCoursId(),
                        newTeza.getSemester()
                        );
                if(test.isPresent()){
                    MessageForUser msg = new MessageForUser();
                    msg.setMessage("Studentul are o teza pentru semestrul I");
                    return ResponseEntity.ok(msg);
                }
                Optional<FinalGradeCours> studentFinalGrade =
                        finalGradeCoursRepository.findByStudentIdAndCoursId(gradeDTO.getStudentId(), gradeDTO.getCoursId(), 1);
                if (studentFinalGrade.isPresent()) {
                    MessageForUser msg = new MessageForUser();
                    msg.setMessage("Studentul are situatia incheiata pe Semestrul I");
                    return ResponseEntity.ok(msg);
                }
            }
            if (newYearStructure.isSemIIstart()) {
                newTeza.setSemester(2);
                Optional<CatalogTeze> test = catalogTezeRepository.findByStudentIdProfessorIdSemester(
                        gradeDTO.getStudentId(),
                        gradeDTO.getCoursId(),
                        newTeza.getSemester()
                );
                if(test.isPresent()){
                    MessageForUser msg = new MessageForUser();
                    msg.setMessage("Studentul are o teza pentru semestrul II");
                    return ResponseEntity.ok(msg);
                }
                Optional<FinalGradeCours> studentFinalGrade =
                        finalGradeCoursRepository.findByStudentIdAndCoursId(gradeDTO.getStudentId(), gradeDTO.getCoursId(), 2);
                if (studentFinalGrade.isPresent()) {
                    MessageForUser msg = new MessageForUser();
                    msg.setMessage("Studentul are situatia incheiata pe Semestrul II");
                    return ResponseEntity.ok(msg);
                }
            }
            catalogTezeRepository.save(newTeza);
            ////schimba asta/ returneaza datele studentului
            //return ResponseEntity.ok(catalogTezeRepository.findAll());
            //int studentId, int coursId, int semester
            return findStudentGradesForFinal(newTeza.getStudent().getId(), newTeza.getCours().getId(), newTeza.getSemester());
        } else {
            MessageForUser msg = new MessageForUser();
            msg.setMessage("Nu predati acestei clase!");
            return ResponseEntity.ok(msg);
        }
    }

    public ResponseEntity deleteTezaFromStudent(int tezaId){
        CatalogTeze teza = catalogTezeRepository.findById(tezaId).get();
        catalogTezeRepository.deleteById(tezaId);
        //int studentId, int coursId, int semester
        return findStudentGradesForFinal(teza.getStudent().getId(), teza.getCours().getId(), teza.getSemester());
    }

    public ResponseEntity assignGradeToStudent(NewGradeForStudentDTO gradeDTO){
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User professor = userRepository.findByUsername(currentUser.getUsername());

        Optional<Class> studentClass = classRepository.findByStudentsId(gradeDTO.getStudentId());
        Optional<ProfessorCoursClasaLink> pccl =
                professorCoursClassLinkRepository.findByClassCoursProfessor(
                        studentClass.get().getId(),
                        gradeDTO.getCoursId(),
                        professor.getId()
                );
        if(pccl.isPresent()) {
            List<ScolarYearStructure> all = scolarYearStructureRepository.findAll();
            ScolarYearStructure newYearStructure = all.get(all.size() - 1);

            CatalogNote newGrade = new CatalogNote();
            newGrade.setNota(gradeDTO.getNota());
            newGrade.setCours(coursRepository.findById(gradeDTO.getCoursId()));
            newGrade.setProfessor(userRepository.findById(professor.getId()));
            newGrade.setStudent(userRepository.findById(gradeDTO.getStudentId()));
            newGrade.setDate(gradeDTO.getDate());
            if (newYearStructure.isSemIstart()) {
                newGrade.setSemester(1);
                Optional<FinalGradeCours> studentFinalGrade =
                        finalGradeCoursRepository.findByStudentIdAndCoursId(gradeDTO.getStudentId(), gradeDTO.getCoursId(), 1);
                if (studentFinalGrade.isPresent()) {
                    MessageForUser msg = new MessageForUser();
                    msg.setMessage("Studentul are situatia incheiata pe Semestrul I");
                    return ResponseEntity.ok(msg);
                }
            }
            if (newYearStructure.isSemIIstart()) {
                newGrade.setSemester(2);
                Optional<FinalGradeCours> studentFinalGrade =
                        finalGradeCoursRepository.findByStudentIdAndCoursId(gradeDTO.getStudentId(), gradeDTO.getCoursId(), 2);
                        finalGradeCoursRepository.findByStudentIdAndCoursId(gradeDTO.getStudentId(), gradeDTO.getCoursId(), 2);
                if (studentFinalGrade.isPresent()) {
                    MessageForUser msg = new MessageForUser();
                    msg.setMessage("Studentul are situatia incheiata pe Semestrul II");
                    return ResponseEntity.ok(msg);
                }
            }
            catalogNoteRepository.save(newGrade);
            return ResponseEntity.ok(findStudentGradesForFinal(gradeDTO.getStudentId(), gradeDTO.getCoursId(), newGrade.getSemester()));
        } else {
            MessageForUser msg = new MessageForUser();
            msg.setMessage("Nu predati acestei clase!");
            return ResponseEntity.ok(msg);
        }
    }


    public ResponseEntity addAbsenceToAStudent(NewAbsenceForStudentDTO absenceDTO){
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User professor = userRepository.findByUsername(currentUser.getUsername());

        User student = userRepository.findById(absenceDTO.getStudentId());
        Cours cours = coursRepository.findById(absenceDTO.getCoursId());

        Optional<Class> studentClass = classRepository.findByStudentsId(absenceDTO.getStudentId());
        Optional<ProfessorCoursClasaLink> pccl =
                professorCoursClassLinkRepository.findByClassCoursProfessor(
                        studentClass.get().getId(),
                        absenceDTO.getCoursId(),
                        professor.getId()
                );
        if(pccl.isPresent()) {
            List<ScolarYearStructure> all = scolarYearStructureRepository.findAll();
            ScolarYearStructure newYearStructure = all.get(all.size() - 1);
            CatalogAbsente newAbsence = new CatalogAbsente();
            newAbsence.setCours(cours);
            newAbsence.setProfessor(professor);
            newAbsence.setStudent(student);
            newAbsence.setMotivated(absenceDTO.isMotivated());
            newAbsence.setDate(absenceDTO.getDate());
            if (newYearStructure.isSemIstart()) {
                newAbsence.setSemester(1);
            }
            if (newYearStructure.isSemIIstart()) {
                newAbsence.setSemester(2);
            }
            catalogAbsenteRepository.save(newAbsence);

            return findStudentAbsences(newAbsence.getStudent().getId(),newAbsence.getCours().getId(),newAbsence.getSemester());
        }
        else{
            MessageForUser msg = new MessageForUser();
            msg.setMessage("Nu predati acestei clase!");
            return ResponseEntity.ok(msg);
        }

    }

    public ResponseEntity findAllClasses(){
        List<Class> allClasses = classRepository.findAll();
        return ResponseEntity.ok(allClasses);
    }

    public ResponseEntity getMyCourses(){
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User professor = userRepository.findByUsername(currentUser.getUsername());
        return ResponseEntity.ok(professor.getCours());
    }

    ////=============MODIFICAT
    public ResponseEntity findAllStudentsFromAClass(int classID){
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User professor = userRepository.findByUsername(currentUser.getUsername());
        Class clasa = classRepository.findById(classID);
        if(clasa == null){
            return ResponseEntity.ok("This class does not exist ! ");
        }
        AllStudentsFromClassResponseDTO response = new AllStudentsFromClassResponseDTO();
        response.setStudents(studentsFromClass(classID));
        List<Cours> courses = new ArrayList<>(0);
        List<ProfessorCoursClasaLink> pccls = professorCoursClassLinkRepository.findByClassIdAndProfessorId(classID, professor.getId());
        for(ProfessorCoursClasaLink p : pccls){
            if(p.getCours().getId() != 10)//NU ADAUGA PURTARE PENTRU A NU SE PUTEA ADAUGA NOTE/ABSENTE LA PURTARE
            courses.add(p.getCours());
        }
        response.setCommonCours(courses);

        return ResponseEntity.ok(response);
    }
    /////===============

    public ResponseEntity findStudentLocations(int studentID){
        User student = userRepository.findById(studentID);
        if(student == null){
            return ResponseEntity.ok("This user does not exist ! ");
        }
        Set<Role> roles = student.getRoles();
        Role role = roles.iterator().next();
        if(role.getId() != 4){
            return ResponseEntity.ok("The selected User is not a Student ! ");
        }
        return ResponseEntity.ok(locationRepository.findByUserId(studentID));
    }

//    public ResponseEntity getStudentGrades(int studentID){
//        return ResponseEntity.ok(catalogNoteRepository.findByStudentId(studentID));
//    }

    public ResponseEntity getStudentAbsences(int studentID){
        return ResponseEntity.ok(catalogAbsenteRepository.findByStudentId(studentID));
    }

    ///ADMIIIIN
    public ResponseEntity findStudentProfileData(int studentID){
        StudentProfileDataDTO response = new StudentProfileDataDTO();

        //mediile
        ResponseEntity<TotalGradeFullResponse2DTO> av = findStudentAllTypeGrades(studentID);
        TotalGradeFullResponse2DTO averages = av.getBody();
        response.setAverages(averages);

        User student = userRepository.findById(studentID);

        StudentResponseDTO user = new StudentResponseDTO();
        user.setId(student.getId());
        user.setAddress(student.getAddress());
        user.setName(student.getFullName());
        user.setPhoneNumber(student.getPhoneNumber());
        user.setEmail(student.getEmail());
        user.setRoles(student.getRoles());
        user.setRegistrationNumber(student.getRegistrationNumber());
        user.setUserName(student.getUsername());

        response.setUser(user);
        //cursurile Studentului
        Optional<Class> clasaStudentului = classRepository.findByStudentsId(studentID);
        List<Cours> coursResp = new ArrayList<>(0);
        if(clasaStudentului.isPresent()){
            List<Integer> courses = professorCoursClassLinkRepository.getClassCourses(clasaStudentului.get().getId());
            for(int c : courses){
             Cours cours = coursRepository.findById(c);
                coursResp.add(cours);
            }
            ClassDTO clasa = new ClassDTO(clasaStudentului.get().getYear(), clasaStudentului.get().getName());
            response.setClasa(clasa);
        }
        response.setStudentCourses(coursResp);

        return ResponseEntity.ok(response);
    }

    public ResponseEntity masterForThisClass(){
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User professor = userRepository.findByUsername(currentUser.getUsername());
        Optional<Integer> classId = classRepository.findByMasterId(professor.getId());

        if(classId.isPresent()){
            int a = classId.get();
            Class clasa = classRepository.findById(a);//String classIdS = classId.get().toString(); Integer.parseInt(classIdS)
            ClassFullResponseDTO response = new ClassFullResponseDTO();

            //datele generale ale clasei
            response.setId(clasa.getId());
            response.setName(clasa.getName());
            response.setYear(clasa.getYear());

            List<StudentResponseDTO> responseStudents = new ArrayList<>(0);
            for(User u : clasa.getStudents()) {
                StudentResponseDTO s = new StudentResponseDTO();
                s.setId(u.getId());
                s.setName(u.getFullName());
                s.setPhoneNumber(u.getPhoneNumber());
                s.setRegistrationNumber(u.getRegistrationNumber());
                s.setEmail(u.getEmail());
                s.setUserName(u.getUsername());
                s.setAddress(u.getAddress());
                s.setRoles(u.getRoles());
                responseStudents.add(s);
            }
            //Studentii din clasa
            response.setStudents(responseStudents);
            //Materiile si profesorii care le predau
            response.setCourses(findCoursesAndProfessorsOfClass(a));
            return ResponseEntity.ok(response);
        }
        else
        {
            MessageForUser msg = new MessageForUser();
            msg.setMessage("Profesorul nu este diriginte");
            return ResponseEntity.ok(msg);//"Profesorul nu este diriginte"
        }
    }

    public ResponseEntity findStudentGradesForFinal(int studentId, int coursId, int semester){
        List<CatalogNote> studentGrades = catalogNoteRepository.findByStudentIdCoursIdAndSemester(studentId,coursId,semester);
        List<GradeListResponseDTO> studentGradesResponse = new ArrayList<GradeListResponseDTO>(0);

        for(CatalogNote cn : studentGrades){
            GradeListResponseDTO a = new GradeListResponseDTO();
            a.setId(cn.getId());
            a.setCours(cn.getCours());
            a.setGrade(cn.getNota());
            a.setProfessorId(cn.getProfessor().getId());
            a.setProfessorName(cn.getProfessor().getFullName());
            a.setSemester(cn.getSemester());
            a.setDate(cn.getDate());
            studentGradesResponse.add(a);
        }

        GradeListAndFinalGradeDTO response = new GradeListAndFinalGradeDTO();
        response.setStudentGradesResponse(studentGradesResponse);

        Optional<FinalGradeCours> studentFinalGrade = finalGradeCoursRepository.findByStudentIdAndCoursId(studentId, coursId, semester);
        if(studentFinalGrade.isPresent())
        {
            response.setFinalGradeCours(studentFinalGrade.get());
        }

        Optional<CatalogTeze> teza = catalogTezeRepository.findByStudentIdProfessorIdSemester(studentId, coursId, semester);
        if(teza.isPresent()) {
            ///////////BARBU
            GradeListResponseDTO thesis = new GradeListResponseDTO();
            thesis.setId(teza.get().getId());
            thesis.setDate(teza.get().getDate());
            thesis.setSemester(teza.get().getSemester());
            thesis.setProfessorId(teza.get().getProfessor().getId());
            thesis.setProfessorName(teza.get().getProfessor().getFullName());
            thesis.setCours(teza.get().getCours());
            thesis.setGrade(teza.get().getNota());
            // returnez un array cu un singur obiect
            List<GradeListResponseDTO> a = new ArrayList<>(0);
            a.add(thesis);
            response.setThesis(a);
        }

        Optional<TotalGrade> studentTotalGrade = totalGradeRepository.findByStudentIdAndCoursId(studentId,semester);
        if(studentTotalGrade.isPresent()){
            response.setCanFinalGradeBeDeleted(false);
        }
        return ResponseEntity.ok(response);
    }

    public ResponseEntity deleteGrade(int gradeId){
        CatalogNote grade = catalogNoteRepository.findById(gradeId);
        User student = grade.getStudent();
        Cours cours = grade.getCours();
        int semester = grade.getSemester();
        catalogNoteRepository.deleteById(gradeId);
        return findStudentGradesForFinal(student.getId(), cours.getId(), semester);
    }

    public ResponseEntity findStudentAbsences(int studentId, int coursId, int semester){
        List<CatalogAbsente> missings;
        if(coursId != -2)
        {
             missings = catalogAbsenteRepository.findByStudentIdCoursIdSemester(studentId, coursId, semester);
        }
        else
        {
             missings = catalogAbsenteRepository.findByStudentAndSemester(studentId, semester);
        }
        List<AbsenceResponseDTO> response = new ArrayList<>(0);
        for(CatalogAbsente a : missings){
            AbsenceResponseDTO absence = new AbsenceResponseDTO();
            absence.setId(a.getId());
            absence.setCoursName(a.getCours().getCoursName());
            absence.setProfessorName(a.getProfessor().getFullName());
            absence.setStudentName(a.getStudent().getFullName());
            absence.setDate(a.getDate());
            absence.setSemester(a.getSemester());
            absence.setMotivated(a.isMotivated());
            response.add(absence);
        }
        return ResponseEntity.ok(response);
    }

    public ResponseEntity deleteAbsence(int absenceId){
        CatalogAbsente absenta = catalogAbsenteRepository.findById(absenceId);
        User student = absenta.getStudent();
        Cours cours = absenta.getCours();
        int semester = absenta.getSemester();
        catalogAbsenteRepository.deleteById(absenceId);
        return findStudentAbsences(student.getId(), cours.getId(), semester);
    }

    public ResponseEntity motivateAbsence(int absenceId, int selectedCoursId){
        CatalogAbsente absenta = catalogAbsenteRepository.findById(absenceId);
        absenta.setMotivated(true);
        catalogAbsenteRepository.save(absenta);
        User student = absenta.getStudent();
        int semester = absenta.getSemester();
        return findStudentAbsences(student.getId(), selectedCoursId, semester);
    }

    public ResponseEntity setTotalGrade(SetTotalGradeDTO setTotalGradeDTO){
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User professor = userRepository.findByUsername(currentUser.getUsername());

        User student = userRepository.findById(setTotalGradeDTO.getStudentId());

        //in ce semestru suntem
        List<ScolarYearStructure> all = scolarYearStructureRepository.findAll();
        ScolarYearStructure newYearStructure = all.get(all.size() - 1);

        TotalGrade newTotalGrade = new TotalGrade();
        newTotalGrade.setProfessor(professor);
        newTotalGrade.setStudent(student);
        newTotalGrade.setTotalGradeI(setTotalGradeDTO.getFinalGrade());

        if(newYearStructure.isSemIstart())
        {
            newTotalGrade.setSemester(1);
            totalGradeRepository.save(newTotalGrade);
        }
        if(newYearStructure.isSemIIstart()){
            newTotalGrade.setSemester(2);
            totalGradeRepository.save(newTotalGrade);

            Optional<TotalGrade> semI = totalGradeRepository.findByStudentIdAndCoursId(setTotalGradeDTO.getStudentId(),1);
            TotalGrade finalTotalGrade = new TotalGrade();
            finalTotalGrade.setStudent(student);
            finalTotalGrade.setProfessor(professor);
            finalTotalGrade.setSemester(3);
            double totalGrade = (semI.get().getTotalGradeI() + newTotalGrade.getTotalGradeI()) / 2;
            finalTotalGrade.setTotalGradeI(totalGrade);
            totalGradeRepository.save(finalTotalGrade);
        }
        return findStudentAllTypeGrades(setTotalGradeDTO.getStudentId());
    }

    public ResponseEntity setStudentFinalGrade(SetFinalGradeDTO finalGradeDTO){
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User professor = userRepository.findByUsername(currentUser.getUsername());

        FinalGradeCours newFinalGrade = new FinalGradeCours();
        User student = userRepository.findById(finalGradeDTO.getStudentId());
        Cours cours = coursRepository.findById(finalGradeDTO.getCoursId());
        Optional<Class> clasa = classRepository.findByStudentsId(finalGradeDTO.getStudentId());
        newFinalGrade.setCours(cours);
        newFinalGrade.setGrade(finalGradeDTO.getGrade());
        newFinalGrade.setProfessor(professor);
        newFinalGrade.setSemester(finalGradeDTO.getSemester());
        newFinalGrade.setYear(clasa.get().getYear());
        newFinalGrade.setStudent(student);

        finalGradeCoursRepository.save(newFinalGrade);

        if(finalGradeDTO.getSemester() == 2){
            FinalGradeCours semI = finalGradeCoursRepository.findByStudentIdAndCoursIdReal(
                    finalGradeDTO.getStudentId(),
                    finalGradeDTO.getCoursId(),
                    1
                    );
            double finalGrade = (semI.getGrade() + newFinalGrade.getGrade())/2;
            FinalGradeCours yearGradeCours = new FinalGradeCours();
            yearGradeCours.setStudent(student);
            yearGradeCours.setProfessor(professor);
            yearGradeCours.setSemester(3);
            int year = Calendar.getInstance().get(Calendar.YEAR);;
            yearGradeCours.setYear(year);
            yearGradeCours.setCours(cours);
            yearGradeCours.setGrade(finalGrade);
            finalGradeCoursRepository.save(yearGradeCours);
        }

        return findStudentGradesForFinal(finalGradeDTO.getStudentId(), finalGradeDTO.getCoursId(), finalGradeDTO.getSemester());
    }

    public ResponseEntity setStudentFinalGradeBehavior(SetFinalGradeDTO finalGradeDTO){
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User professor = userRepository.findByUsername(currentUser.getUsername());

        FinalGradeCours newFinalGrade = new FinalGradeCours();
        User student = userRepository.findById(finalGradeDTO.getStudentId());
        Cours cours = coursRepository.findById(finalGradeDTO.getCoursId());
        Optional<Class> clasa = classRepository.findByStudentsId(finalGradeDTO.getStudentId());
        newFinalGrade.setCours(cours);
        newFinalGrade.setGrade(finalGradeDTO.getGrade());
        newFinalGrade.setProfessor(professor);
        newFinalGrade.setSemester(finalGradeDTO.getSemester());
        newFinalGrade.setYear(clasa.get().getYear());
        newFinalGrade.setStudent(student);

        finalGradeCoursRepository.save(newFinalGrade);

        if(finalGradeDTO.getSemester() == 2){
            FinalGradeCours semI = finalGradeCoursRepository.findByStudentIdAndCoursIdReal(
                    finalGradeDTO.getStudentId(),
                    finalGradeDTO.getCoursId(),
                    1
            );
            double finalGrade = (semI.getGrade() + newFinalGrade.getGrade())/2;
            FinalGradeCours yearGradeCours = new FinalGradeCours();
            yearGradeCours.setStudent(student);
            yearGradeCours.setProfessor(professor);
            yearGradeCours.setSemester(3);
            int year = Calendar.getInstance().get(Calendar.YEAR);;
            yearGradeCours.setYear(year);
            yearGradeCours.setCours(cours);
            yearGradeCours.setGrade(finalGrade);
            finalGradeCoursRepository.save(yearGradeCours);
        }
        return findStudentAllTypeGrades(student.getId());
    }

    ///media la purtare
    public ResponseEntity deleteStudentFinalGrade(int studentId){
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User professor = userRepository.findByUsername(currentUser.getUsername());

        List<ScolarYearStructure> all = scolarYearStructureRepository.findAll();
        ScolarYearStructure newYearStructure = all.get(all.size() - 1);
        if(newYearStructure.isSemIstart())
        {
            Optional<FinalGradeCours> fgc = finalGradeCoursRepository.findByStudentIdAndCoursId(studentId, 10, 1);
            finalGradeCoursRepository.deleteById(fgc.get().getId());
        }
        if(newYearStructure.isSemIIstart())
        {
            Optional<FinalGradeCours> fgc = finalGradeCoursRepository.findByStudentIdAndCoursId(studentId, 10, 2);
            finalGradeCoursRepository.deleteById(fgc.get().getId());
            Optional<FinalGradeCours> finalGrade = finalGradeCoursRepository.findByStudentIdAndCoursId(studentId, 10, 3);
            if(finalGrade.isPresent()){
                finalGradeCoursRepository.deleteById(finalGrade.get().getId());
            }
        }

        return findStudentAllTypeGrades(studentId);
    }

    public ResponseEntity removeStudentFinalGrade(int finalGradeId){
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User professor = userRepository.findByUsername(currentUser.getUsername());

        Optional<FinalGradeCours> test = finalGradeCoursRepository.findById(finalGradeId);
        if(test.isPresent()){
            finalGradeCoursRepository.deleteById(finalGradeId);
            if(test.get().getSemester() == 2)
            {
                Optional<FinalGradeCours> finalGrade =
                        finalGradeCoursRepository.findByStudentIdAndCoursId(
                                test.get().getStudent().getId(),
                                test.get().getCours().getId(),
                                3);
                if(finalGrade.isPresent()){
                    finalGradeCoursRepository.deleteById(finalGrade.get().getId());
                }
            }
            return findStudentGradesForFinal(test.get().getStudent().getId(),test.get().getCours().getId(), test.get().getSemester());
        }
        else{
            MessageForUser msg = new MessageForUser();
            msg.setMessage("Nu are media incheiata!");
            return ResponseEntity.ok(msg);
        }
    }

    public ResponseEntity deleteStudentTotalGrade(int tgId){
        Optional<TotalGrade> totalGrade = totalGradeRepository.findById(tgId);
        if(totalGrade.isPresent()){
            User student = totalGrade.get().getStudent();
            List<ScolarYearStructure> all = scolarYearStructureRepository.findAll();
            ScolarYearStructure newYearStructure = all.get(all.size() - 1);

            if(newYearStructure.isSemIstart()){
                totalGradeRepository.deleteById(tgId);
            }

            if(newYearStructure.isSemIIstart()){
                totalGradeRepository.deleteById(tgId);
                Optional<TotalGrade> finalTotalGrade =
                        totalGradeRepository.findByStudentIdAndCoursId(totalGrade.get().getStudent().getId(), 3);
                if(finalTotalGrade.isPresent()){
                    totalGradeRepository.deleteById(finalTotalGrade.get().getId());
                }
            }
            return findStudentAllTypeGrades(student.getId());
        }
        return null;
    }

    public ResponseEntity getMyClasses(){
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User professor = userRepository.findByUsername(currentUser.getUsername());
        int id = professor.getId();
        List<Integer> classes = professorCoursClassLinkRepository.getProfessorClasses(id);
        List<ClassResponseDTO> response = new ArrayList<>(0);
        for(int clas : classes){
            Class c = classRepository.findById(clas);
            ClassResponseDTO oneClass = new ClassResponseDTO();
            oneClass.setId(c.getId());
            oneClass.setYear(c.getYear());
            oneClass.setName(c.getName());
            response.add(oneClass);
        }
        return ResponseEntity.ok(response);
    }

    public ResponseEntity findStudentAllTypeGrades(int studentId){
        TotalGradeFullResponse2DTO response = new TotalGradeFullResponse2DTO();

        List<TotalGradeResponse2DTO> listResponse = new ArrayList<>(0);
        Optional<Class> clasa = classRepository.findByStudentsId(studentId);
        if(clasa.isPresent())
        {
            List<ProfessorCoursClasaLink> pccl = professorCoursClassLinkRepository.findByClassId(clasa.get().getId());
            for(ProfessorCoursClasaLink p : pccl){
                TotalGradeResponse2DTO a = new TotalGradeResponse2DTO();
                a.setCours(p.getCours());
                List<FinalGradeCours> grades =  finalGradeCoursRepository.findByStudentAndCours(studentId, p.getCours().getId());
                for(FinalGradeCours g : grades){
                    TotalGradeResponseDTO sem = new TotalGradeResponseDTO();
                    sem.setId(g.getId());
                    sem.setGrade(g.getGrade());
                    sem.setProfessorName(g.getProfessor().getFullName());
                    sem.setProfessorId(g.getProfessor().getId());
                    sem.setSemester(g.getSemester());
                    sem.setCours(g.getCours());
                    if(g.getSemester() == 1){
                        a.setSemI(sem);
                    }
                    if(g.getSemester() == 2){
                        a.setSemII(sem);
                    }
                    if(g.getSemester() == 3){
                        a.setYearFinal(sem);
                    }
                }
                listResponse.add(a);
            }
            response.setListGrades(listResponse);//mediile pentru fiecare materie
        }
        else
        {
            response.setListGrades(null);//mediile pentru fiecare materie
        }


        TotalGradeResponse2DTO totalAverages = new TotalGradeResponse2DTO();
        MessageForTGR2DTO messageResponse = new MessageForTGR2DTO();
        List<TotalGrade> totalGrades = totalGradeRepository.findByStudentId(studentId);
        totalAverages.setCours(null);
        for(TotalGrade tg : totalGrades){
            TotalGradeResponseDTO sem = new TotalGradeResponseDTO();
            sem.setId(tg.getId());
            sem.setSemester(tg.getSemester());
            sem.setProfessorId(tg.getProfessor().getId());
            sem.setProfessorName(tg.getProfessor().getFullName());
            sem.setGrade(tg.getTotalGradeI());

            if(tg.getSemester() == 1){
                Optional<List<FinalGradeCours>> badGrades =
                        finalGradeCoursRepository.findByStudentSemesterMaxGrade(studentId ,tg.getSemester(),5);
                if(badGrades.isPresent())
                {
                    messageResponse.setSemIText("CORIGENT");
                }
                else {
                    messageResponse.setSemIText("PROMOVAT");
                }
                totalAverages.setSemI(sem);
            }
            if(tg.getSemester() == 2){
                Optional<List<FinalGradeCours>> badGrades =
                        finalGradeCoursRepository.findByStudentSemesterMaxGrade(studentId ,tg.getSemester(),5);
                if(badGrades.isPresent())
                {
                    messageResponse.setSemIIText("CORIGENT");
                }else{
                    messageResponse.setSemIIText("PROMOVAT");
                }
                totalAverages.setSemII(sem);
            }
            if(tg.getSemester() == 3){
                Optional<List<FinalGradeCours>> badGrades =
                        finalGradeCoursRepository.findByStudentSemesterMaxGrade(studentId ,tg.getSemester(),5);
                if(badGrades.isPresent())
                {
                    if(badGrades.get().size() < 3)
                        messageResponse.setFinalText("CORIGENT");
                    else
                        messageResponse.setFinalText("REPETENT");
                }
                else{
                    messageResponse.setFinalText("PROMOVAT");
                }
                totalAverages.setYearFinal(sem);
            }
        }
        response.setMessage(messageResponse);
        response.setAverages(totalAverages);// mediile pe semestru
        return ResponseEntity.ok(response);
    }
}
