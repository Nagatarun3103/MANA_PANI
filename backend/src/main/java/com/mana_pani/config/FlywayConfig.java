package com.mana_pani.config;

import org.flywaydb.core.Flyway;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationInitializer;
import org.springframework.boot.autoconfigure.flyway.FlywayProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class FlywayConfig {

    @Bean
    @ConfigurationProperties(prefix = "spring.flyway")
    public FlywayProperties flywayProperties() {
        return new FlywayProperties();
    }

    @Bean
    public Flyway flyway(DataSource dataSource, FlywayProperties flywayProperties) {
        return Flyway.configure()
                .dataSource(dataSource)
                .locations(flywayProperties.getLocations().toArray(new String[0]))
                .baselineOnMigrate(flywayProperties.isBaselineOnMigrate())
                .load();
    }

    // This bean ensures Flyway migrations run early and completes before JPA init
    @Bean
    public FlywayMigrationInitializer flywayInitializer(Flyway flyway) {
        return new FlywayMigrationInitializer(flyway, null);
    }
}

