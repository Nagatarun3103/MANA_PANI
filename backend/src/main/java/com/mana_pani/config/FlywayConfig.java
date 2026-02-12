package com.mana_pani.config;

import org.flywaydb.core.Flyway;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.autoconfigure.flyway.FlywayProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.context.annotation.Primary; // Import Primary

import javax.sql.DataSource;

@Configuration
public class FlywayConfig {

    @Bean
    @ConfigurationProperties(prefix = "spring.flyway")
    public FlywayProperties flywayProperties() {
        return new FlywayProperties();
    }

    // Define a specific DataSource for Flyway
    @Bean
    @Primary // Mark the main application DataSource as primary
    @ConfigurationProperties("spring.datasource")
    public DataSource primaryDataSource(DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().build();
    }

    @Bean(initMethod = "migrate")
    public Flyway flyway(DataSource primaryDataSource, FlywayProperties flywayProperties) {
        return Flyway.configure()
                .dataSource(primaryDataSource)
                .locations(flywayProperties.getLocations().toArray(new String[0]))
                .baselineOnMigrate(flywayProperties.isBaselineOnMigrate())
                .load();
    }
}
