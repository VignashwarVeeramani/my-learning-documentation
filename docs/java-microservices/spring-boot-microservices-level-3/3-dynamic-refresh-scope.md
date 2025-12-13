---
title: 3. Dynamic Configuration with @RefreshScope
---

# 3. Dynamic Configuration with @RefreshScope

One of the most powerful features of Spring Cloud Config is the ability to change configuration at runtime *without* restarting your microservices. This is achieved using the **Actuator** `/refresh` endpoint and the `@RefreshScope` annotation.

## Step 1: Add the Actuator Dependency

In your client microservice (`movie-catalog-service`), you need the `spring-boot-starter-actuator` dependency. We added this in Level 2 for the Hystrix Dashboard, but if you don't have it, add it now.

```xml title="movie-catalog-service/pom.xml"
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

## Step 2: Expose the `/refresh` Endpoint

By default, most Actuator endpoints are not exposed over HTTP. You need to explicitly enable the `/refresh` endpoint in your client's configuration.

Since the client now gets its properties from the Config Server, the best place to put this is in the `movie-catalog-service.properties` file in your `microservices-config` Git repository.

```properties title="microservices-config/movie-catalog-service.properties"
my.greeting=Hello from the config server!

# Expose the refresh endpoint
management.endpoints.web.exposure.include=refresh
```
Commit and push this change to your Git repository.

## Step 3: Annotate Beans with `@RefreshScope`

The `@RefreshScope` annotation tells Spring to create a special proxy for a bean. When the `/refresh` endpoint is triggered, this proxy will be destroyed and recreated, effectively re-injecting its dependencies and re-reading its configuration.

You should apply this annotation to any bean that injects configuration properties with `@Value` or `@ConfigurationProperties`. In our case, this is the `MovieCatalogResource`.

```java title="src/main/java/io/javabrains/moviecatalogservice/resources/MovieCatalogResource.java"
// ... imports
import org.springframework.cloud.context.config.annotation.RefreshScope;

@RestController
@RequestMapping("/catalog")
@RefreshScope // Add this annotation
public class MovieCatalogResource {

    @Value("${my.greeting}")
    private String greeting;

    // ... rest of the class
}
```

## Step 4: Test the Dynamic Refresh

1.  Restart your **Config Server** and then your `movie-catalog-service` to ensure they pick up the latest changes.
2.  Make a request to `http://localhost:8080/catalog/testuser` and check the console log. It should print the original message: `Injected property: Hello from the config server!`
3.  Now, go to your `microservices-config` Git repository and change the property in `movie-catalog-service.properties`:

    ```properties
    my.greeting=Hello again, the config has been updated!
    management.endpoints.web.exposure.include=refresh
    ```
    Commit and push this change.

4.  Wait a few seconds for the Config Server to pick up the change from Git.
5.  **Trigger the refresh**. This is done by sending an empty **HTTP POST** request to the client's `/refresh` endpoint. You can use a tool like `curl` or Postman.

    ```bash
    curl -X POST http://localhost:8080/actuator/refresh
    ```

6.  You should see a JSON response indicating which properties have changed, for example: `["config.client.version","my.greeting"]`.
7.  **Verify the change**. Make another request to `http://localhost:8080/catalog/testuser`. Check the console log again. It should now print the new message: `Injected property: Hello again, the config has been updated!`

You have successfully updated the application's configuration at runtime without a restart. This is an incredibly powerful feature for managing applications in a live production environment.
