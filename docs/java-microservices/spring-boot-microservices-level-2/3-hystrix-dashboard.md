---
title: 3. Visualizing with Hystrix Dashboard
---

# 3. Visualizing with the Hystrix Dashboard

While our circuit breakers are working, we have no visibility into their status. Are they open or closed? How many requests are failing? The **Hystrix Dashboard** provides a real-time graphical interface to monitor the health of your Hystrix commands.

## Step 1: Create the Hystrix Dashboard Project

1.  Go to [start.spring.io](https://start.spring.io).
2.  Set up the project with the following details:
    *   **Project**: Maven
    *   **Language**: Java
    *   **Spring Boot**: 2.x.x
    *   **Group**: `io.javabrains`
    *   **Artifact**: `hystrix-dashboard`
    *   **Dependencies**: `Hystrix Dashboard`, `Spring Boot Actuator`
3.  Generate and download the project.

*Note: The `Hystrix Dashboard` dependency is also part of Spring Cloud.*

## Step 2: Enable the Hystrix Dashboard

Add the `@EnableHystrixDashboard` annotation to your main application class.

```java title="src/main/java/io/javabrains/hystrixdashboard/HystrixDashboardApplication.java"
package io.javabrains.hystrixdashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.hystrix.dashboard.EnableHystrixDashboard;

@SpringBootApplication
@EnableHystrixDashboard
public class HystrixDashboardApplication {

	public static void main(String[] args) {
		SpringApplication.run(HystrixDashboardApplication.class, args);
	}
}
```

## Step 3: Expose the Hystrix Stream in the Client

The Hystrix Dashboard needs a stream of metrics to display. This stream is provided by the client application (`movie-catalog-service`) over an Actuator endpoint.

In your `movie-catalog-service`:

### a) Add the Actuator Dependency
If you don't already have it, add the `spring-boot-starter-actuator` dependency to your `pom.xml`.

```xml title="movie-catalog-service/pom.xml"
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

### b) Expose the Hystrix Stream Endpoint
In the `application.properties` file, you need to expose the `hystrix.stream` endpoint.

```yaml title="movie-catalog-service/src/main/resources/application.properties"
# This is needed to expose the /actuator/hystrix.stream endpoint
management.endpoints.web.exposure.include=hystrix.stream
```

## Step 4: Run and Connect

1.  Start all your services:
    *   `discovery-server`
    *   `movie-info-service`
    *   `ratings-data-service`
    *   `movie-catalog-service`
    *   `hystrix-dashboard`

2.  Open the Hystrix Dashboard in your browser. It usually runs on port `8083` or another available port. Check your console logs. Let's assume it's `http://localhost:8083/hystrix`.

3.  On the dashboard homepage, you will see a form asking for the URL of a Hystrix stream. Enter the URL of the `movie-catalog-service`'s Hystrix stream endpoint:
    `http://localhost:8080/actuator/hystrix.stream`

4.  Click "Monitor Stream".

## Step 5: Visualize the Circuits

You will now see a dashboard with two main circuits, one for each of your thread pools (`movieInfoPool` and `userRatingPool`).

*   **Generate some traffic**: Make several requests to `http://localhost:8080/catalog/testuser`. You will see the "Success" count increase and the circuits will be green and healthy.

*   **Simulate a failure**: Stop the `movie-info-service`. Continue making requests to the catalog service. You will see:
    *   The `movieInfoPool` circuit will start showing "Failures" and "Short-Circuited" requests.
    *   The circuit color will change from green to yellow, and eventually to red, indicating it has "tripped" or opened.
    *   The `userRatingPool` circuit will remain green and healthy, demonstrating the Bulkhead pattern in action.

The Hystrix Dashboard gives you invaluable real-time insight into the resilience of your application, allowing you to monitor, diagnose, and tune your fault-tolerance settings.
