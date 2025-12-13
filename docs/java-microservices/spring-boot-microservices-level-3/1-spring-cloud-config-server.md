---
title: 1. Setting Up Spring Cloud Config Server
---

# 1. Setting Up the Spring Cloud Config Server

The first step is to create a dedicated Spring Boot application that will act as our central Config Server. This server will be responsible for fetching configuration files from a Git repository and serving them to other microservices.

## Step 1: Create a Git Repository for Configuration

Before creating the server, you need a place to store your configuration files.

1.  Go to GitHub (or any other Git provider) and create a new, empty repository. For this workshop, let's call it `microservices-config`.
2.  You do not need to clone it locally yet. Just have the repository URL ready.

This repository will hold the `.properties` or `.yml` files for all your microservices.

## Step 2: Create the Config Server Project

1.  Go to [start.spring.io](https://start.spring.io).
2.  Set up the project with the following details:
    *   **Project**: Maven
    *   **Language**: Java
    *   **Spring Boot**: 2.x.x
    *   **Group**: `io.javabrains`
    *   **Artifact**: `spring-cloud-config-server`
    *   **Dependencies**: `Config Server`
3.  Generate and download the project.

## Step 3: Enable the Config Server

Add the `@EnableConfigServer` annotation to your main application class. This single annotation turns the application into a configuration server.

```java title="src/main/java/io/javabrains/springcloudconfigserver/SpringCloudConfigServerApplication.java"
package io.javabrains.springcloudconfigserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class SpringCloudConfigServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringCloudConfigServerApplication.class, args);
	}
}
```

## Step 4: Configure the Server

Now, we need to tell the Config Server where to find the configuration files. We do this in the `application.properties` file.

```yaml title="src/main/resources/application.properties"
# Set the port for the config server
server.port=8888

# Point to the Git repository containing the configuration files
spring.cloud.config.server.git.uri=https://github.com/your-username/microservices-config.git
```

**Replace `https://github.com/your-username/microservices-config.git` with the URL of the Git repository you created in Step 1.**

## Step 5: Run and Test

Run the `SpringCloudConfigServerApplication` main class.

The server is now running, but our Git repository is empty, so it has no configuration to serve yet. You can test that the server is working by navigating to an endpoint that corresponds to a hypothetical application configuration.

For example, if you were to have a `movie-catalog-service.properties` file, you could access it at:

`http://localhost:8888/movie-catalog-service/default`

Since the file doesn't exist, you'll likely see an error or an empty response, but this confirms the server is running and trying to fetch the configuration.

In the next step, we will populate the Git repository and configure our microservices to connect to this server.
