# Spring Boot Application Layer: Annotations

This document details the annotations used in the main application class (`AccountsApplication.java`) of the Accounts microservice.

## 1. `@SpringBootApplication`

This is a convenience annotation that adds all of the following:

*   **`@Configuration`**: Tags the class as a source of bean definitions for the application context.
*   **`@EnableAutoConfiguration`**: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings.
*   **`@ComponentScan`**: Tells Spring to look for other components, configurations, and services in the `com.eazybytes.accounts` package, allowing it to find and register the controllers, services, repositories, etc.

In essence, this single annotation kicks off the entire Spring Boot application.

### Sample Code:

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AccountsApplication {

    public static void main(String[] args) {
        SpringApplication.run(AccountsApplication.class, args);
    }
}
```

## 2. `@EnableJpaAuditing`

This annotation enables JPA Auditing in the application. JPA Auditing allows you to automatically track and log changes to your entities, such as who created or modified them and when the changes occurred.

*   **`auditorAwareRef`**: This attribute is configured to point to a bean that provides information about the current user (auditor). In this case, it's set to `"auditAwareImpl"`, which is a custom implementation of the `AuditorAware` interface.

### Sample Code:

```java
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
public class AccountsApplication {
    // ...
}
```

## 3. `@OpenAPIDefinition`

This annotation is used to define the overall structure of the OpenAPI (formerly Swagger) documentation for the REST API. It provides metadata about the API, such as its title, version, and contact information.

### Nested Annotations:

*   **`@Info`**: Contains general information about the API.
    *   **`@Contact`**: Specifies the contact information for the exposed API.
    *   **`@License`**: Provides license information for the API.
*   **`@ExternalDocumentation`**: Provides a link to external documentation.

### Sample Code:

```java
import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
        info = @Info(
                title = "Accounts microservice REST API Documentation",
                description = "EazyBank Accounts microservice REST API Documentation",
                version = "v1",
                contact = @Contact(
                        name = "Madan Reddy",
                        email = "tutor@eazybytes.com",
                        url = "https://www.eazybytes.com"
                ),
                license = @License(
                        name = "Apache 2.0",
                        url = "https://www.eazybytes.com"
                )
        ),
        externalDocs = @ExternalDocumentation(
                description =  "EazyBank Accounts microservice REST API Documentation",
                url = "https://www.eazybytes.com/swagger-ui.html"
        )
)
public class AccountsApplication {
    // ...
}
```