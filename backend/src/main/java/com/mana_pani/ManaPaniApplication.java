package com.mana_pani;

import com.mana_pani.model.ERole;
import com.mana_pani.model.Role;
import com.mana_pani.model.User;
import com.mana_pani.repository.RoleRepository;
import com.mana_pani.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import javax.sql.DataSource;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ManaPaniApplication {

    public static void main(String[] args) {
        SpringApplication.run(ManaPaniApplication.class, args);
    }

    @Configuration
    public class DataSourceConfig {

        @Value("${JDBC_DATABASE_URL}")
        private String dbUrl;

        @Value("${JDBC_DATABASE_USERNAME}")
        private String username;

        @Value("${JDBC_DATABASE_PASSWORD}")
        private String password;

        @Bean
        public DataSource dataSource() {
            // Render's URL is in the format "postgres://user:password@host:port/database"
            // JDBC requires "jdbc:postgresql://host:port/database"
            String correctedDbUrl = dbUrl.replace("postgres://", "jdbc:postgresql://");
            
            HikariConfig config = new HikariConfig();
            config.setDriverClassName("org.postgresql.Driver");
            config.setJdbcUrl(correctedDbUrl);
            config.setUsername(username);
            config.setPassword(password);
            config.addDataSourceProperty("sslmode", "require");
            return new HikariDataSource(config);
        }
    }

    @Bean
    CommandLineRunner run(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (roleRepository.findByName(ERole.ROLE_USER).isEmpty()) {
                roleRepository.save(new Role(ERole.ROLE_USER));
            }
            if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
                roleRepository.save(new Role(ERole.ROLE_ADMIN));
            }

            if (userRepository.findByUsername("user").isEmpty()) {
                Set<Role> roles = new HashSet<>();
                roles.add(roleRepository.findByName(ERole.ROLE_USER).get());
                User user = new User("user", "user@manapani.com", passwordEncoder.encode("password"));
                user.setRoles(roles);
                userRepository.save(user);
            }

            if (userRepository.findByUsername("GRS").isEmpty()) {
                Set<Role> roles = new HashSet<>();
                roles.add(roleRepository.findByName(ERole.ROLE_USER).get());
                roles.add(roleRepository.findByName(ERole.ROLE_ADMIN).get());
                User admin = new User("GRS", "grs@manapani.com", passwordEncoder.encode("GRS_Mahi"));
                admin.setRoles(roles);
                userRepository.save(admin);
            }
        };
    }
}
