---
title: 5. Registering Services with Eureka
---

# 5. Registering Services with Eureka (Client Setup)

Now that our Eureka Discovery Server is running, we need to configure our three microservices (`movie-catalog-service`, `movie-info-service`, and `ratings-data-service`) to act as Eureka clients. This involves two main steps for each service:

1.  Adding the `Eureka Client` dependency and enabling it.
2.  Updating the `RestTemplate` call in the catalog service to use service discovery.

## Step 1: Update Dependencies and Enable Eureka Client

For **all three** of your microservices (`movie-catalog-service`, `movie-info-service`, and `ratings-data-service`), perform the following changes.

### a) Add the `Eureka Client` Dependency

Go to your `pom.xml` file and add the `spring-cloud-starter-netflix-eureka-client` dependency.

```xml title="pom.xml"
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```
*Note: You will also need to add the `spring-cloud-dependencies` BOM (Bill of Materials) to your `<dependencyManagement>` section to ensure version compatibility between Spring Boot and Spring Cloud.*

### b) Enable the Eureka Client

Add the `@EnableEurekaClient` annotation to the main application class of each service.

```java title="Example: MovieInfoServiceApplication.java"
package io.javabrains.movieinfoservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class MovieInfoServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieInfoServiceApplication.class, args);
	}
}
```

### c) Configure the Application Name

Each service needs a unique name to register itself with Eureka. Add the following to the `application.properties` file of each service.

**For `movie-info-service`:**
```yaml title="movie-info-service/src/main/resources/application.properties"
spring.application.name=movie-info-service
```

**For `ratings-data-service`:**
```yaml title="ratings-data-service/src/main/resources/application.properties"
spring.application.name=ratings-data-service
```

**For `movie-catalog-service`:**
```yaml title="movie-catalog-service/src/main/resources/application.properties"
spring.application.name=movie-catalog-service
```

## Step 2: Update the `RestTemplate` Call

The final step is to change the hardcoded URLs in `movie-catalog-service` to use the service names we just defined.

### a) Add `@LoadBalanced` to `RestTemplate`

In the `MovieCatalogServiceApplication`, add the `@LoadBalanced` annotation to your `RestTemplate` bean. This tells Spring Boot to create a "smart" `RestTemplate` that can handle service discovery.

```java title="src/main/java/io/javabrains/moviecatalogservice/MovieCatalogServiceApplication.java"
// ... imports
import org.springframework.cloud.client.loadbalancer.LoadBalanced;

@SpringBootApplication
@EnableEurekaClient
public class MovieCatalogServiceApplication {

    @Bean
    @LoadBalanced // Add this annotation
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
    // ... main method
}
```

### b) Change the URLs in the Controller

Now, in your `MovieCatalogResource`, you can replace the hardcoded `localhost` URLs with the service names.

```java title="src/main/java/io/javabrains/moviecatalogservice/resources/MovieCatalogResource.java"
// ... imports and class definition

@RestController
@RequestMapping("/catalog")
public class MovieCatalogResource {

    @Autowired
    private RestTemplate restTemplate;

    @RequestMapping("/{userId}")
    public List<CatalogItem> getCatalog(@PathVariable("userId") String userId) {

        // Get all rated movie IDs from ratings-data-service
        // The URL now uses the service name "ratings-data-service"
        UserRating userRating = restTemplate.getForObject("http://ratings-data-service/ratingsdata/users/" + userId, UserRating.class);

        return userRating.getRatings().stream()
                .map(rating -> {
                    // For each movie ID, call movie-info-service to get details
                    // The URL now uses the service name "movie-info-service"
                    Movie movie = restTemplate.getForObject("http://movie-info-service/movies/" + rating.getMovieId(), Movie.class);
                    
                    // Put them all together
                    return new CatalogItem(movie.getName(), movie.getDescription(), rating.getRating());
                })
                .collect(Collectors.toList());
    }
}
```
The `@LoadBalanced` `RestTemplate` will intercept these URLs, look up the actual host and port from the Eureka server, and make the request for you.

## Step 3: Run and Test Everything

1.  Start the **`discovery-server`** first. Wait for it to be fully up.
2.  Start the **`movie-info-service`**.
3.  Start the **`ratings-data-service`**.
4.  Start the **`movie-catalog-service`**.

Now, go to the Eureka dashboard at `http://localhost:8761/`. You should see all three services listed under "Instances currently registered with Eureka".

Finally, test the main endpoint again:

`http://localhost:8080/catalog/testuser`

The output should be exactly the same as before, but now your application is much more resilient and scalable, with no hardcoded dependencies between services.

Congratulations! You have successfully built a microservices application with service discovery.
