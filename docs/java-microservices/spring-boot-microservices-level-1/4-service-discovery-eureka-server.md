---
title: 4. Service Discovery - Eureka Server
---

# 4. Setting Up the Eureka Discovery Server

In our current setup, the `movie-catalog-service` has hardcoded URLs for the other services. This is brittle and not suitable for a real-world microservices application where services can be running on different machines with dynamic IP addresses and ports.

**Service Discovery** solves this problem. A discovery server acts as a phone book for your microservices. Each service registers itself with the server upon startup, and other services can then ask the server for the location of a service they need to call.

We will use **Netflix Eureka**, which is a popular choice and integrates well with Spring Boot.

## Step 1: Create the Eureka Server Project

1.  Go to [start.spring.io](https://start.spring.io).
2.  Set up the project with the following details:
    *   **Project**: Maven
    *   **Language**: Java
    *   **Spring Boot**: 2.x.x (e.g., 2.7.18)
    *   **Group**: `io.javabrains`
    *   **Artifact**: `discovery-server`
    *   **Dependencies**: `Eureka Server`
3.  Generate and download the project.

*Note: The `Eureka Server` dependency is part of the Spring Cloud project. If you are using Spring Boot 3.x, you will need to ensure you have the correct Spring Cloud dependencies managed in your `pom.xml`.*

## Step 2: Enable the Eureka Server

To turn your Spring Boot application into a Eureka Server, you just need to add one annotation to your main application class.

```java title="src/main/java/io/javabrains/discoveryserver/DiscoveryServerApplication.java"
package io.javabrains.discoveryserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class DiscoveryServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(DiscoveryServerApplication.class, args);
	}
}
```

## Step 3: Configure the Server

We need to configure the server's port and tell it *not* to register itself as a client.

```yaml title="src/main/resources/application.properties"
# Set the port for the Eureka server
server.port=8761

# Configuration to prevent the server from registering itself
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
```

## Step 4: Run and Test

Run the `DiscoveryServerApplication` main class. You can now access the Eureka dashboard by navigating to:

`http://localhost:8761/`

You will see a dashboard showing the status of the discovery server. Under the "Instances currently registered with Eureka" section, you will see that no instances are registered yet.

In the next step, we will configure our other microservices to register themselves with this server.
