---
title: 1. Implementing Hystrix Circuit Breaker
---

# 1. Implementing the Hystrix Circuit Breaker

The first step in making our application fault-tolerant is to wrap the calls to external services with a circuit breaker. We will use **Netflix Hystrix** for this. The changes will be made in the `movie-catalog-service`, as it is the consumer of the other services.

## Step 1: Add Hystrix Dependency

In the `movie-catalog-service`, add the `spring-cloud-starter-netflix-hystrix` dependency to your `pom.xml`.

```xml title="movie-catalog-service/pom.xml"
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
</dependency>
```
*Note: Ensure your Spring Cloud BOM is managing the version correctly.*

## Step 2: Enable Circuit Breakers

In the main application class, enable the circuit breaker functionality by adding the `@EnableCircuitBreaker` annotation.

```java title="src/main/java/io/javabrains/moviecatalogservice/MovieCatalogServiceApplication.java"
package io.javabrains.moviecatalogservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
// ... other imports

@SpringBootApplication
@EnableEurekaClient
@EnableCircuitBreaker // Enable Hystrix
public class MovieCatalogServiceApplication {
    // ... beans and main method
}
```

## Step 3: Add `@HystrixCommand` to the Service Call

Now, we need to protect the `RestTemplate` calls. The easiest way is to annotate the method making the external call with `@HystrixCommand`. This annotation tells Hystrix to wrap this method in a circuit breaker.

We will also provide a **fallback method**. This is the method Hystrix will call if the original method fails (e.g., due to a timeout or an exception).

```java title="src/main/java/io/javabrains/moviecatalogservice/resources/MovieCatalogResource.java"
// ... imports
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;

@RestController
@RequestMapping("/catalog")
public class MovieCatalogResource {

    @Autowired
    private RestTemplate restTemplate;

    @RequestMapping("/{userId}")
    public List<CatalogItem> getCatalog(@PathVariable("userId") String userId) {

        UserRating userRating = restTemplate.getForObject("http://ratings-data-service/ratingsdata/users/" + userId, UserRating.class);

        return userRating.getRatings().stream()
                .map(rating -> {
                    // This is the call we want to protect
                    Movie movie = getMovieInfo(rating);
                    return new CatalogItem(movie.getName(), movie.getDescription(), rating.getRating());
                })
                .collect(Collectors.toList());
    }

    @HystrixCommand(fallbackMethod = "getFallbackMovieInfo")
    private Movie getMovieInfo(Rating rating) {
        return restTemplate.getForObject("http://movie-info-service/movies/" + rating.getMovieId(), Movie.class);
    }

    private Movie getFallbackMovieInfo(Rating rating) {
        // Return a hardcoded, "empty" movie object
        return new Movie(rating.getMovieId(), "Movie name not found", "");
    }
}
```

### Refactoring Explanation

1.  We extracted the `RestTemplate` call to the `movie-info-service` into its own private method, `getMovieInfo()`.
2.  We annotated this new method with `@HystrixCommand`.
3.  We specified `fallbackMethod = "getFallbackMovieInfo"`. This tells Hystrix: "If `getMovieInfo()` fails, call `getFallbackMovieInfo()` instead."
4.  The `getFallbackMovieInfo()` method has the same signature and provides a default `Movie` object. This prevents the entire request from failing just because one downstream service is unavailable.

## Step 4: Test the Fallback

1.  Start all your services (`discovery-server`, `ratings-data-service`, `movie-catalog-service`).
2.  **Do NOT start the `movie-info-service`**.
3.  Make a request to the catalog service: `http://localhost:8080/catalog/testuser`

You should now see a response where the movie names are replaced by the fallback value:

```json
[
  {
    "name": "Movie name not found",
    "desc": "",
    "rating": 4
  },
  {
    "name": "Movie name not found",
    "desc": "",
    "rating": 3
  }
]
```

The application no longer crashes! The circuit breaker correctly identified the failure and executed the fallback logic.
