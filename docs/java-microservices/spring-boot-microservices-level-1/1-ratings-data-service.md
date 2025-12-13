---
title: 1. Creating the Ratings Data Service
---

# 1. Creating the Ratings Data Service

The **Ratings Data Service** is the simplest of our three microservices. Its only job is to provide movie rating data for a specific user.

## Step 1: Create a New Spring Boot Project

1.  Go to [start.spring.io](https://start.spring.io).
2.  Set up the project with the following details:
    *   **Project**: Maven
    *   **Language**: Java
    *   **Spring Boot**: 2.x.x (e.g., 2.7.18) or 3.x.x
    *   **Group**: `io.javabrains`
    *   **Artifact**: `ratings-data-service`
    *   **Dependencies**: `Spring Web`
3.  Generate and download the project.

## Step 2: Create the `Rating` Model

This is a simple Plain Old Java Object (POJO) to hold the rating information.

```java title="src/main/java/io/javabrains/ratingsdataservice/models/Rating.java"
package io.javabrains.ratingsdataservice.models;

public class Rating {

    private String movieId;
    private int rating;

    public Rating(String movieId, int rating) {
        this.movieId = movieId;
        this.rating = rating;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
```

## Step 3: Create the `UserRating` Model

This model will hold a list of `Rating` objects for a specific user.

```java title="src/main/java/io/javabrains/ratingsdataservice/models/UserRating.java"
package io.javabrains.ratingsdataservice.models;

import java.util.Arrays;
import java.util.List;

public class UserRating {

    private String userId;
    private List<Rating> ratings;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

    public void initData(String userId) {
        this.setUserId(userId);
        this.setRatings(Arrays.asList(
                new Rating("100", 4),
                new Rating("200", 3)
        ));
    }
}
```
*Note: The `initData` method is a temporary way to provide hardcoded data. We will replace this later.*

## Step 4: Create the REST Controller

Create a controller that exposes an endpoint to get the ratings for a given user ID.

```java title="src/main/java/io/javabrains/ratingsdataservice/resources/RatingsResource.java"
package io.javabrains.ratingsdataservice.resources;

import io.javabrains.ratingsdataservice.models.Rating;
import io.javabrains.ratingsdataservice.models.UserRating;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ratingsdata")
public class RatingsResource {

    @RequestMapping("/users/{userId}")
    public UserRating getUserRatings(@PathVariable("userId") String userId) {
        UserRating userRating = new UserRating();
        userRating.initData(userId);
        return userRating;
    }
}
```

## Step 5: Configure the Port

It's good practice to run each microservice on a different port. Let's set this one to run on port `8082`.

```yaml title="src/main/resources/application.properties"
server.port=8082
```

## Step 6: Run and Test

Run the `RatingsDataServiceApplication` main class. You can test the endpoint by navigating to:

`http://localhost:8082/ratingsdata/users/testuser`

You should see the following JSON response:

```json
{
  "userId": "testuser",
  "ratings": [
    {
      "movieId": "100",
      "rating": 4
    },
    {
      "movieId": "200",
      "rating": 3
    }
  ]
}
```

With this, our first microservice is complete and running!
