package com.example.demo.security;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserAuthDetailsService implements UserDetailsService {

    // @Autowired
    private final UserRepository userRepository;

    public UserAuthDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepository
                .findByUsername(s);
        //.orElseThrow(() -> new UsernameNotFoundException("User name " + s + "Not Found in DB"));;

        if(user == null){
            throw new UsernameNotFoundException("User name " + s + "Not found in DB");
        }
        System.out.println(6);
        //return UserPrincipal.create(user);
        return new UserPrincipal(user);
    }
}
