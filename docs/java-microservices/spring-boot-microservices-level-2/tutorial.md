---
title: Tutorial Summary
---

# Spring Boot Microservices Level 2: Fault Tolerance and Resilience

This tutorial focuses on making microservices resilient to failures using the **Circuit Breaker** pattern and improving inter-service communication reliability with **Timeouts and Retries**. We use **Spring Cloud Netflix Hystrix** and **Ribbon** (which is already integrated with the `@LoadBalanced` `RestTemplate`).

## 1. The Need for Fault Tolerance

In a microservices architecture, a failure in one service (e.g., a slow response or an outage) can quickly cascade, consuming resources and eventually causing the calling service and the entire application to fail.

The two main solutions we implement are:
1.  **Circuit Breaker (Hystrix):** To stop cascading failures and provide a fallback response. 
2.  **Timeouts/Retries (Ribbon):** To handle transient network issues and prevent indefinite blocking.

## 2. Part 1: Implementing the Circuit Breaker Pattern (Hystrix)

The Circuit Breaker pattern is a critical mechanism where a protective layer monitors calls to a service. If the failure rate exceeds a threshold, the circuit "trips" (opens), and subsequent calls are immediately routed to a **fallback method**, preventing the service caller from overloading the failing service.

### 2.1 Step A: Dependencies and Enabling Hystrix

In the service that *makes* the external call (e.g., `CatalogService` calling `MovieService`):

1.  **Add Dependencies (Maven):**
    * `spring-cloud-starter-netflix-hystrix` (or the newer `spring-cloud-starter-circuitbreaker-resilience4j` in modern Spring Cloud, though Hystrix is used in this classic course).

2.  **Enable the Circuit Breaker:**
    Annotate the client application's main class:

    ```java
    package com.example.catalogservice;

    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;
    import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker; // KEY ANNOTATION
    import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

    @SpringBootApplication
    @EnableDiscoveryClient
    @EnableCircuitBreaker
    public class CatalogServiceApplication {
        // ...
    }
    ```

### 2.2 Step B: Applying `@HystrixCommand` and the Fallback Method

The `@HystrixCommand` annotation is placed on the method making the external service call.

#### Example: `CatalogService`

```java
@Service
public class CatalogService {

    private final RestTemplate restTemplate;
    // ... constructor ...

    @HystrixCommand(fallbackMethod = "getFallbackMovieInfo") // KEY ANNOTATION
    public Movie getMovieInfo(String movieId) {
        // This is the primary call to the external service
        String url = "http://movie-service/movies/" + movieId;
        return restTemplate.getForObject(url, Movie.class);
    }

    /**
     * Fallback method executed when the Circuit Breaker opens or the main
     * call fails (e.g., due to timeout or 5xx/4xx error).
     * Must have the same signature (parameters and return type) as the main method.
     */
    public Movie getFallbackMovieInfo(String movieId) {
        // Provide a default or cached response here
        return new Movie(movieId, "Movie Title Unavailable", "Default Plot");
    }
}
```

## 3. Part 2: Configuring Timeouts and Retries (Ribbon)

Hystrix handles failures once they occur. **Ribbon**, the client-side load balancer integrated with our `@LoadBalanced` `RestTemplate`, handles network-level issues by configuring connection timeouts, read timeouts, and automatic retries.

### 3.1 Configuration (`application.yml`)

These properties are configured within the calling service (`CatalogService`) and are prefixed with the name of the *target* service (`movie-service`).

| Property | Description |
| :--- | :--- |
| `ReadTimeout` | How long to wait for a response after the connection is established. |
| `ConnectTimeout` | How long to wait to establish a connection. |
| `MaxAutoRetries` | Number of times to retry on the **same** server after a failed attempt. |
| `MaxAutoRetriesNextServer` | Number of **different** servers to retry against (after all retries on the current server fail). |
| `NFLoadBalancerRuleClassName` | Specifies the load balancing algorithm (e.g., Round Robin, Availability Filtering). |

```yaml
# Catalog Service's Configuration (application.yml)
movie-service: # Target Service ID
  ribbon:
    # 1. TIMEOUT CONFIGURATION
    ReadTimeout: 2000 # 2 seconds to wait for data
    ConnectTimeout: 1000 # 1 second to establish connection

    # 2. RETRY CONFIGURATION
    MaxAutoRetries: 0 # Do not retry on the same server (set to >0 for transient errors)
    MaxAutoRetriesNextServer: 1 # Try one other server instance if the first fails

    # 3. LOAD BALANCING RULE (Optional but good for resilience)
    # Use AvailabilityFilteringRule to skip servers marked as down by the health check
    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.AvailabilityFilteringRule
```

### 3.2 Hystrix and Ribbon Interaction

It is important to note the interaction:

  * **Ribbon Timeout:** If a request takes longer than the configured `ReadTimeout` (e.g., 2000ms), Ribbon considers it a failure, and if configured, performs a retry.
  * **Hystrix Timeout:** Hystrix has its own timeout configuration (default is often 1000ms). If the Ribbon/RestTemplate call, **including all retries**, exceeds the Hystrix timeout, the Hystrix circuit breaker is triggered, and the **Fallback Method** is executed.

**Best Practice:** Set the Hystrix timeout **higher** than the total possible Ribbon retry time, or explicitly disable the Hystrix timeout and rely on Ribbon's.

```yaml
# Hystrix Configuration (Global or specific to the command)
hystrix:
  command:
    default: # Applies to all Hystrix commands
      execution:
        isolation:
          thread:
            # Set Hystrix timeout to be much higher than the Ribbon timeout + retries
            timeoutInMilliseconds: 3000
```

## 4. Part 3: Monitoring with Hystrix Dashboard

The **Hystrix Dashboard** provides a visual, real-time view of metrics for the configured Hystrix commands (successes, failures, latency, circuit status).

### 4.1 Step A: Create the Monitoring Service

Create a new Spring Boot application (or dedicated module) for the Dashboard.

1.  **Dependencies:**

      * `spring-cloud-starter-netflix-hystrix-dashboard`

2.  **Enable Dashboard:**
    Annotate the main class:

    ```java
    @SpringBootApplication
    @EnableHystrixDashboard // KEY ANNOTATION
    public class HystrixDashboardApplication {
        // ...
    }
    ```

### 4.2 Step B: Exposing Metrics from Client Services

The services being monitored (e.g., `CatalogService`) must expose an endpoint for the Dashboard to poll.

1.  **Dependencies (in the Client Service):**

      * `spring-boot-starter-actuator`

2.  **Configuration (in the Client Service):**
    Expose the Hystrix metrics stream:

    ```yaml
    # application.yml for CatalogService
    management:
      endpoints:
        web:
          exposure:
            include: hystrix.stream # Expose the necessary stream endpoint
    ```

The Dashboard service can now be run and pointed to the client service's stream (e.g., `http://localhost:8081/actuator/hystrix.stream`) to visualize the Circuit Breaker's operation in real-time.
