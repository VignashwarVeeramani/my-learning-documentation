---
title: Tutorial Summary
---

# Spring Boot Microservices Level 3: Microservice Configuration

This tutorial focuses on implementing centralized configuration management using **Spring Cloud Config Server**. This pattern is crucial for microservices to manage environment-specific properties, credentials, and feature flags efficiently.

## 1. The Need for Centralized Configuration

In a microservices architecture, managing configuration files (e.g., `application.yml`, credentials, database connection strings) across dozens of services and multiple environments (dev, staging, prod) becomes a logistical nightmare.

**Spring Cloud Config** provides a centralized solution:
* **Externalization:** Configuration is moved outside the service's codebase.
* **Version Control:** Configuration is stored in a Git repository, allowing for auditing, history, and versioning via branches/tags.
* **Environment and Profile Specificity:** Services can dynamically pull configuration specific to their environment (`dev`, `prod`) and profile.

## 2. Part 1: Setting up the Config Server

The Config Server is a dedicated Spring Boot application that acts as an intermediary, exposing configurations stored in a Git repository over HTTP.

### 2.1 Step A: Dependencies and Enabling the Server

1.  **Dependencies:** Create a new Spring Boot project and add the `spring-cloud-starter-config-server` dependency.

2.  **Enable Annotation:** Annotate the main application class with `@EnableConfigServer`.

    ```java
    package com.example.configserver;

    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;
    import org.springframework.cloud.config.server.EnableConfigServer; // KEY

    @SpringBootApplication
    @EnableConfigServer // Turns this Spring Boot app into the Config Server
    public class ConfigServerApplication {
        public static void main(String[] args) {
            SpringApplication.run(ConfigServerApplication.class, args);
        }
    }
    ```

### 2.2 Step B: Server Configuration (Git Backend)

The Config Server must be configured to point to the remote repository (e.g., GitHub, GitLab, or a local Git repository) where configuration files are stored.

Configure the server's `application.yml` (or `application.properties`):

```yaml
server:
  port: 8888 # Conventional port for Config Server

spring:
  application:
    name: config-server
  cloud:
    config:
      server:
        git:
          uri: https://github.com/your-org/config-repo.git # URI to your configuration repository
          # search-paths: '*/{profile}' # Optional: if your repo structure is complex
          # username: <git_username> # Required if repository is private
          # password: <git_password> # Required if repository is private
```

### 2.3 Step C: Configuration Repository Structure

The Git repository must contain configuration files named according to the Spring convention:

  * **`{application}`-`{profile}`.**`{extension}` (e.g., `movie-service-dev.yml`)
  * **`application`-`{profile}`.**`{extension}` (General properties for all services)

**Example Repository Files:**

  * `movie-service.yml` (Default properties for `movie-service`)
  * `movie-service-prod.yml` (Production-specific properties for `movie-service`)
  * `catalog-service.yml` (Default properties for `catalog-service`)

## 3. Part 2: Setting up the Microservice Client

Microservices that need external configuration must be configured to contact the Config Server upon startup.

### 3.1 Step A: Dependencies

In the client microservice (e.g., `MovieService`), add the `spring-cloud-starter-config` dependency.

### 3.2 Step B: Client Configuration (`bootstrap.yml` vs `application.yml`)

The configuration needed to locate the Config Server must be loaded **before** the main `application.yml`. For older Spring Cloud versions, this requires the **`bootstrap.yml`** file (or `bootstrap.properties`).

> **Note:** For modern Spring Boot 2.4+ projects, Spring recommends using `spring.config.import` in `application.yml` instead of the deprecated `bootstrap.yml`. However, `bootstrap.yml` is used in the classic workshop setup.

**`bootstrap.yml` (Required for the client service to connect to the server before auto-configuration):**

```yaml
spring:
  application:
    name: movie-service # Matches the file prefix in the Git repository (e.g., movie-service.yml)
  cloud:
    config:
      uri: http://localhost:8888 # URL of the running Config Server
      label: main # Corresponds to the Git branch (e.g., main or master)
```

## 4. Part 3: Accessing Dynamic Configuration

Once the client is configured, properties are injected into the Spring Environment.

### 4.1 Accessing Properties

Properties can be accessed using standard Spring mechanisms:

1.  **`@Value` Annotation (Simple, single property):**

    ```java
    @Value("${db.connection.url}")
    private String dbUrl;
    ```

2.  **`@ConfigurationProperties` (Structured, recommended):**

    ```java
    @Configuration
    @ConfigurationProperties(prefix = "movie.config") // Binds properties starting with 'movie.config'
    public class MovieConfig {
        private String welcomeMessage;
        // Getters and setters...
    }
    ```

### 4.2 Dynamic Configuration Refresh

One of the greatest benefits is the ability to change configuration in Git and update the running microservice **without restarting the JVM**. This requires two steps:

1.  **Actuator Dependency:** Ensure `spring-boot-starter-actuator` is included in the client service.

2.  **Enable `@RefreshScope`:** Annotate the bean (Controller, Service, or `@ConfigurationProperties` class) that needs dynamic updates.

    ```java
    @RestController
    @RefreshScope // KEY ANNOTATION: Marks this bean for refreshing upon POST to /actuator/refresh
    public class MovieResource {

        @Value("${db.connection.url}") // Property we want to refresh
        private String dbUrl;

        // ...
    }
    ```

3.  **Trigger Refresh:** When configuration changes in Git, call the refresh endpoint on the client service instance (e.g., via Postman or a CI/CD pipeline):

    ```bash
    POST http://<client-host>:<port>/actuator/refresh
    ```

This triggers the client to pull the latest configuration from the Config Server, and any beans marked with `@RefreshScope` are instantly re-initialized with the new property values.

You can find the first video in the playlist on configuration in microservices here: [Microservice configuration with Spring Boot [01] - Java Brains](https://www.youtube.com/watch?v=upoIwn4rWCo).
