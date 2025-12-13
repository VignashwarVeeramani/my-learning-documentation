---
title: 2. Protecting Multiple Calls & Bulkheads
---

# 2. Protecting Multiple Calls & The Bulkhead Pattern

In the previous step, we protected the call to the `movie-info-service`. However, we are making two external calls in our `getCatalog` method. We also need to protect the call to the `ratings-data-service`.

This also introduces a new concept: the **Bulkhead Pattern**. By default, Hystrix puts all circuit breakers in the same thread pool. If multiple services are slow, they can saturate this pool and bring down the entire application. The Bulkhead Pattern isolates different circuit breakers into their own thread pools, so a failure in one doesn't affect others.

## Step 1: Refactor to a Service Class

The `MovieCatalogResource` is getting crowded. It's a good practice to move the logic of calling external services into a dedicated `@Service` class.

```java title="src/main/java/io/javabrains/moviecatalogservice/services/MovieInfo.java"
package io.javabrains.moviecatalogservice.services;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import io.javabrains.moviecatalogservice.models.Movie;
import io.javabrains.moviecatalogservice.models.Rating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MovieInfo {

    @Autowired
    private RestTemplate restTemplate;

    @HystrixCommand(fallbackMethod = "getFallbackMovieInfo")
    public Movie getMovieInfo(Rating rating) {
        return restTemplate.getForObject("http://movie-info-service/movies/" + rating.getMovieId(), Movie.class);
    }

    public Movie getFallbackMovieInfo(Rating rating) {
        return new Movie(rating.getMovieId(), "Movie name not found", "");
    }
}
```

```java title="src/main/java/io/javabrains/moviecatalogservice/services/UserRatingInfo.java"
package io.javabrains.moviecatalogservice.services;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import io.javabrains.moviecatalogservice.models.Rating;
import io.javabrains.moviecatalogservice.models.UserRating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;

@Service
public class UserRatingInfo {

    @Autowired
    private RestTemplate restTemplate;

    @HystrixCommand(fallbackMethod = "getFallbackUserRating")
    public UserRating getUserRating(String userId) {
        return restTemplate.getForObject("http://ratings-data-service/ratingsdata/users/" + userId, UserRating.class);
    }

    public UserRating getFallbackUserRating(String userId) {
        UserRating userRating = new UserRating();
        userRating.setUserId(userId);
        userRating.setRatings(Arrays.asList(
                new Rating("0", 0) // Return a default, empty rating
        ));
        return userRating;
    }
}
```

## Step 2: Update the Controller

Now, the controller can be simplified to just orchestrate the calls to these new service classes.

```java title="src/main/java/io/javabrains/moviecatalogservice/resources/MovieCatalogResource.java"
// ... imports
import io.javabrains.moviecatalogservice.services.MovieInfo;
import io.javabrains.moviecatalogservice.services.UserRatingInfo;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/catalog")
public class MovieCatalogResource {

    @Autowired
    private MovieInfo movieInfo;

    @Autowired
    private UserRatingInfo userRatingInfo;

    @RequestMapping("/{userId}")
    public List<CatalogItem> getCatalog(@PathVariable("userId") String userId) {

        // Get the ratings from the ratings service
        UserRating userRating = userRatingInfo.getUserRating(userId);

        return userRating.getRatings().stream()
                .map(rating -> {
                    // Get movie info from the movie info service
                    Movie movie = movieInfo.getMovieInfo(rating);
                    return new CatalogItem(movie.getName(), movie.getDescription(), rating.getRating());
                })
                .collect(Collectors.toList());
    }
}
```

## Step 3: Implement the Bulkhead Pattern

To isolate the two service calls, we can assign each `@HystrixCommand` to a different thread pool. We do this using `@HystrixProperty`.

Update the `@HystrixCommand` annotations in your service classes:

```java title="src/main/java/io/javabrains/moviecatalogservice/services/MovieInfo.java"
// ... imports
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;

@Service
public class MovieInfo {
    // ...
    @HystrixCommand(
            fallbackMethod = "getFallbackMovieInfo",
            threadPoolKey = "movieInfoPool", // Assign to a specific thread pool
            threadPoolProperties = {
                    @HystrixProperty(name = "coreSize", value = "20"), // Size of the pool
                    @HystrixProperty(name = "maxQueueSize", value = "10") // Max requests to queue
            }
    )
    public Movie getMovieInfo(Rating rating) {
        // ...
    }
    // ...
}
```

```java title="src/main/java/io/javabrains/moviecatalogservice/services/UserRatingInfo.java"
// ... imports
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;

@Service
public class UserRatingInfo {
    // ...
    @HystrixCommand(
            fallbackMethod = "getFallbackUserRating",
            threadPoolKey = "userRatingPool", // Assign to a different thread pool
            threadPoolProperties = {
                    @HystrixProperty(name = "coreSize", value = "20"),
                    @HystrixProperty(name = "maxQueueSize", value = "10")
            }
    )
    public UserRating getUserRating(String userId) {
        // ...
    }
    // ...
}
```

### Explanation

*   **`threadPoolKey`**: This gives a unique name to the thread pool. All commands with the same key will share a pool.
*   **`coreSize`**: The number of threads in the pool.
*   **`maxQueueSize`**: The number of requests that can be queued before they are rejected.

Now, if the `movie-info-service` becomes slow and saturates its thread pool, the `userRatingPool` will be unaffected, and calls to the `ratings-data-service` can still succeed.

## Step 4: Test the Fallback

1.  Start all services except the `ratings-data-service`.
2.  Make a request to `http://localhost:8080/catalog/testuser`.

You should see a response based on the fallback data from `getFallbackUserRating`:

```json
[
  {
    "name": "Movie name not found",
    "desc": "",
    "rating": 0
  }
]
```

This confirms that both service calls are now protected by their own isolated circuit breakers.
