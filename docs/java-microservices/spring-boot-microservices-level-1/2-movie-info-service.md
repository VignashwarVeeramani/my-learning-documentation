---
title: 2. Creating the Movie Info Service
---

# 2. Creating the Movie Info Service

The **Movie Info Service** is our second microservice. Its job is to provide metadata (like the name and description) for a given movie ID.

## Step 1: Create a New Spring Boot Project

1.  Go to [start.spring.io](https://start.spring.io).
2.  Set up the project with the following details:
    *   **Project**: Maven
    *   **Language**: Java
    *   **Spring Boot**: 2.x.x or 3.x.x
    *   **Group**: `io.javabrains`
    *   **Artifact**: `movie-info-service`
    *   **Dependencies**: `Spring Web`
3.  Generate and download the project.

## Step 2: Create the `Movie` Model

This is a simple POJO to hold the movie's ID and name.

```java title="src/main/java/io/javabrains/movieinfoservice/models/Movie.java"
package io.javabrains.movieinfoservice.models;

public class Movie {

    private String movieId;
    private String name;
    private String description;

    public Movie(String movieId, String name, String description) {
        this.movieId = movieId;
        this.name = name;
        this.description = description;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
```

## Step 3: Create the REST Controller

Create a controller that exposes an endpoint to get details for a given movie ID.

```java title="src/main/java/io/javabrains/movieinfoservice/resources/MovieResource.java"
package io.javabrains.movieinfoservice.resources;

import io.javabrains.movieinfoservice.models.Movie;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movies")
public class MovieResource {

    @RequestMapping("/{movieId}")
    public Movie getMovieInfo(@PathVariable("movieId") String movieId) {
        // In a real application, you would look this up in a database or another service.
        // Here, we are hardcoding it for simplicity.
        return new Movie(movieId, "Test Name for ID: " + movieId, "Test Description");
    }
}
```

## Step 4: Configure the Port

Let's set this service to run on port `8081`.

```yaml title="src/main/resources/application.properties"
server.port=8081
```

## Step 5: Run and Test

Run the `MovieInfoServiceApplication` main class. You can test the endpoint by navigating to:

`http://localhost:8081/movies/1234`

You should see the following JSON response:

```json
{
  "movieId": "1234",
  "name": "Test Name for ID: 1234",
  "description": "Test Description"
}
```

Our second microservice is now complete and running. We now have two independent services that can provide different pieces of data.
