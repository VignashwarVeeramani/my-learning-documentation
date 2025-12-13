---
title: 2. Connecting Clients to Config Server
---

# 2. Connecting Microservices as Config Clients

Now that the Config Server is running, we need to configure our microservices (like `movie-catalog-service`) to fetch their configuration from it instead of from their local `application.properties` file.

## Step 1: Add Properties to the Git Repository

First, let's add some configuration for the `movie-catalog-service` to our `microservices-config` Git repository.

1.  Clone the `microservices-config` repository you created earlier to your local machine.
2.  Inside the repository, create a new file named `movie-catalog-service.properties`.
3.  Add a sample property to this file. This property will be read by our microservice.

    ```properties title="movie-catalog-service.properties"
    my.greeting=Hello from the config server!
    ```
4.  Commit and push this new file to your remote Git repository.

## Step 2: Update the Client Microservice

We will modify the `movie-catalog-service` to act as a config client.

### a) Add the Config Client Dependency

In the `movie-catalog-service`'s `pom.xml`, add the `spring-cloud-starter-config` dependency.

```xml title="movie-catalog-service/pom.xml"
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
```

### b) Rename `application.properties`

Spring Boot has a specific startup lifecycle. To ensure that the application connects to the Config Server *before* it does anything else, we need to provide the Config Server's location in a special file named `bootstrap.properties`.

1.  In `src/main/resources`, rename `application.properties` to `bootstrap.properties`.
2.  Update the file with the following content:

    ```properties title="src/main/resources/bootstrap.properties"
    # This name MUST match the name of the properties file in the Git repo
    spring.application.name=movie-catalog-service

    # The location of the Spring Cloud Config Server
    spring.cloud.config.uri=http://localhost:8888
    ```

**How it works:**
*   The `spring.application.name` tells the Config Server which file to look for in the Git repository (e.g., `movie-catalog-service.properties`).
*   The `spring.cloud.config.uri` tells the client where the Config Server is running.
*   The `bootstrap.properties` file is loaded before the regular `application.properties`, ensuring this connection is established first.

## Step 3: Read the Externalized Property

To verify that the configuration is being loaded from the server, let's inject the `my.greeting` property into our controller and display it.

```java title="src/main/java/io/javabrains/moviecatalogservice/resources/MovieCatalogResource.java"
// ... imports
import org.springframework.beans.factory.annotation.Value;

@RestController
@RequestMapping("/catalog")
public class MovieCatalogResource {

    @Value("${my.greeting}") // Inject the property from the config server
    private String greeting;

    // ... other autowired fields

    @RequestMapping("/{userId}")
    public List<CatalogItem> getCatalog(@PathVariable("userId") String userId) {

        System.out.println("Injected property: " + greeting);

        // ... existing logic ...
    }
}
```

## Step 4: Run and Test

1.  Make sure your **Config Server** (`spring-cloud-config-server`) is running.
2.  Run the `movie-catalog-service`.
3.  Check the console logs for the `movie-catalog-service`. You should see the message: `Injected property: Hello from the config server!`
4.  Make a request to `http://localhost:8080/catalog/testuser`. The log message should appear again.

This confirms that your microservice is successfully fetching its configuration from the central Config Server, which in turn is reading it from your Git repository. You can now manage all your properties in one central location.
