---
title: Tutorial Summary
---

# Spring Boot Microservices Level 1: Communication and Discovery

This tutorial covers the foundational principles and practical implementation for enabling inter-service communication and dynamic service discovery in a Spring Boot microservices architecture, using Spring Cloud Netflix components (Eureka and Ribbon).

## 1. Prerequisites and Setup

As a Java developer, you should be familiar with:
* Spring Boot basics (creating REST controllers, managing dependencies).
* Maven/Gradle for build management.

All projects must use **Spring Boot** and include the `spring-boot-starter-web` dependency.

## 2. Part 1: Inter-Service Communication (The Problem)

### 2.1 Direct Communication (Hardcoded URLs)

Initially, microservices communicate directly using hardcoded IP addresses and ports.

**Example (A `CatalogService` calling a `MovieService`):**

```java
// Using RestTemplate for synchronous communication
@Service
public class CatalogService {

    private final RestTemplate restTemplate;

    public CatalogService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Movie getMovieInfo(String movieId) {
        // PROBLEM: Hardcoded URL and port!
        String url = "http://localhost:8082/movies/" + movieId;
        return restTemplate.getForObject(url, Movie.class);
    }
}
```

This approach is brittle and fails when services scale, move, or change ports, highlighting the need for Service Discovery.

## 3. Part 2: Service Discovery with Spring Cloud Eureka

**Service Discovery** is the process of automatically detecting the network location of service instances. We use **Eureka** as the central registry.

### 3.1 Step A: Creating the Eureka Discovery Server

A dedicated Spring Boot application acts as the registry server.

#### 1. Dependencies

Add the Eureka Server dependency (often under `spring-cloud-starter-netflix-eureka-server`).

#### 2. Main Application Class

Annotate the main class with `@EnableEurekaServer`:

```java
package com.example.discoveryserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer // KEY ANNOTATION
public class DiscoveryServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(DiscoveryServerApplication.class, args);
    }
}
```

#### 3. Configuration (`application.properties` or `application.yml`)

Set the port and configure the server not to register itself as a client:

```yaml
server:
  port: 8761 # Default Eureka server port

eureka:
  client:
    # This server is the registry, so it doesn't need to register or fetch the registry
    register-with-eureka: false
    fetch-registry: false
```

### 3.2 Step B: Configuring Microservice Clients

All microservices (e.g., `CatalogService`, `MovieService`) must register themselves with the Eureka Server.

#### 1. Dependencies

Add the Eureka Client dependency (often under `spring-cloud-starter-netflix-eureka-client`).

#### 2. Main Application Class (Optional Annotation)

While Spring Cloud can auto-configure the client, it is good practice to ensure it's enabled:

```java
package com.example.catalogservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient; // Explicitly enables client

@SpringBootApplication
@EnableDiscoveryClient // Good practice, though often inferred by dependency
public class CatalogServiceApplication {
    // ...
}
```

#### 3. Configuration (`application.yml`)

Tell the client where to find the Eureka server and how to identify itself:

```yaml
spring:
  application:
    name: catalog-service # The name used for discovery

server:
  port: 8081 # Unique port for this service instance

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka # Point to the Eureka Server
```

## 4. Part 3: Client-Side Load Balancing (Ribbon)

With Eureka running, services register themselves. Now, clients need to use the registered service name instead of a hardcoded URL. **Ribbon**, integrated with Spring Cloud, handles the lookup and client-side load balancing.

### 4.1 Implementing Load-Balanced Communication

In the client service (`CatalogService`), modify the `RestTemplate` configuration.

#### 1. Configure the RestTemplate

The key is the `@LoadBalanced` annotation on the `RestTemplate` bean:

```java
package com.example.catalogservice;

import org.springframework.cloud.client.loadbalancer.LoadBalanced; // Import

@Configuration
public class RestTemplateConfig {

    @Bean
    @LoadBalanced // KEY ANNOTATION: Injects client-side load balancing capability
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

#### 2. Update the Service Call

Replace the hardcoded `http://localhost:8082` with the service's registration name (e.g., `movie-service`):

```java
@Service
public class CatalogService {
    // ... restTemplate is now load-balanced ...

    public Movie getMovieInfo(String movieId) {
        // SOLUTION: Use the service ID (as registered in Eureka) instead of URL/port
        String url = "http://movie-service/movies/" + movieId; // 'movie-service' is the spring.application.name of the Movie Service
        return restTemplate.getForObject(url, Movie.class);
    }
}
```

**Crux:** When `CatalogService` makes a request to `http://movie-service/...`:

1.  The `@LoadBalanced` `RestTemplate` interceptor is triggered.
2.  It queries the **Eureka Server** for the instances of the service named `movie-service`.
3.  **Ribbon** (the underlying load balancer) selects one of the available instances (using a default algorithm like Round Robin).
4.  The request URL is rewritten from `http://movie-service/...` to `http://<selected-instance-ip>:<port>/...` and sent.

This setup achieves dynamic communication and basic load distribution, forming the bedrock of Level 1 microservices architecture.
