---
title: 3. Creating the Movie Catalog Service
---

# 3. Creating the Movie Catalog Service

The **Movie Catalog Service** is the primary service that brings everything together. It will:
1.  Get the list of movies a user has rated from the **Ratings Data Service**.
2.  For each movie ID, it will call the **Movie Info Service** to get the movie's details.
3.  Combine this information to create a personalized catalog for the user.

## Step 1: Create a New Spring Boot Project

1.  Go to [start.spring.io](https://start.spring.io).
2.  Set up the project with the following details:
    *   **Project**: Maven
    *   **Language**: Java
    *   **Spring Boot**: 2.x.x or 3.x.x
    *   **Group**: `io.javabrains`
    *   **Artifact**: `movie-catalog-service`
    *   **Dependencies**: `Spring Web`
3.  Generate and download the project.

## Step 2: Create the Model Classes

We need model classes to represent the data we are working with.

### `CatalogItem.java`
This class represents a single item in the user's movie catalog, combining movie info and the user's rating.

```java title="src/main/java/io/javabrains/moviecatalogservice/models/CatalogItem.java"
package io.javabrains.moviecatalogservice.models;

public class CatalogItem {

    private String name;
    private String desc;
    private int rating;

    public CatalogItem(String name, String desc, int rating) {
        this.name = name;
        this.desc = desc;
        this.rating = rating;
    }
    // Getters and setters...
}
```

### `Movie.java` and `Rating.java`
These are copies of the model classes from the other two services. They are needed here so that `RestTemplate` can parse the JSON responses from the other services into Java objects.

```java title="src/main/java/io/javabrains/moviecatalogservice/models/Movie.java"
// Same as Movie.java in movie-info-service
```

```java title="src/main/java/io/javabrains/moviecatalogservice/models/Rating.java"
// Same as Rating.java in ratings-data-service
```

### `UserRating.java`
This class is also a copy from the `ratings-data-service` to help parse the list of ratings.

```java title="src/main/java/io/javabrains/moviecatalogservice/models/UserRating.java"
// Same as UserRating.java in ratings-data-service
```

## Step 3: Configure `RestTemplate`

To make REST calls to other services, we need an instance of `RestTemplate`. The best practice is to create a single, shared `Bean` for it.

Add this to your main application class:

```java title="src/main/java/io/javabrains/moviecatalogservice/MovieCatalogServiceApplication.java"
package io.javabrains.moviecatalogservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class MovieCatalogServiceApplication {

    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }

	public static void main(String[] args) {
		SpringApplication.run(MovieCatalogServiceApplication.class, args);
	}
}
```

## Step 4: Create the REST Controller

This is where the core logic resides. We will inject the `RestTemplate` and use it to call the other services.

```java title="src/main/java/io/javabrains/moviecatalogservice/resources/MovieCatalogResource.java"
package io.javabrains.moviecatalogservice.resources;

import io.javabrains.moviecatalogservice.models.CatalogItem;
import io.javabrains.moviecatalogservice.models.Movie;
import io.javabrains.moviecatalogservice.models.UserRating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/catalog")
public class MovieCatalogResource {

    @Autowired
    private RestTemplate restTemplate;

    @RequestMapping("/{userId}")
    public List<CatalogItem> getCatalog(@PathVariable("userId") String userId) {

        // 1. Get all rated movie IDs from ratings-data-service
        UserRating userRating = restTemplate.getForObject("http://localhost:8082/ratingsdata/users/" + userId, UserRating.class);

        return userRating.getRatings().stream()
                .map(rating -> {
                    // 2. For each movie ID, call movie-info-service to get details
                    Movie movie = restTemplate.getForObject("http://localhost:8081/movies/" + rating.getMovieId(), Movie.class);
                    
                    // 3. Put them all together
                    return new CatalogItem(movie.getName(), movie.getDescription(), rating.getRating());
                })
                .collect(Collectors.toList());
    }
}
```

## Step 5: Configure the Port

Let's set this service to run on port `8080`.

```yaml title="src/main/resources/application.properties"
server.port=8080
```

## Step 6: Run and Test

1.  Make sure the `ratings-data-service` and `movie-info-service` are both running.
2.  Run the `MovieCatalogServiceApplication` main class.
3.  Test the endpoint by navigating to: `http://localhost:8080/catalog/testuser`

You should see a combined JSON response like this:

```json
[
  {
    "name": "Test Name for ID: 100",
    "desc": "Test Description",
    "rating": 4
  },
  {
    "name": "Test Name for ID: 200",
    "desc": "Test Description",
    "rating": 3
  }
]
```

We now have a functioning, albeit basic, microservices application! However, notice the hardcoded URLs (`localhost:8081`, `localhost:8082`). This is not ideal. In the next step, we will fix this using a discovery server.
