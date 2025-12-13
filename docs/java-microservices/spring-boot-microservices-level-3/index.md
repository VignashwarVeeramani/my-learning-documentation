---
title: Spring Boot Microservices Level 3
---

# Spring Boot Microservices Level 3: Microservice Configuration

Welcome to Level 3 of the Spring Boot Microservices workshop. In this module, we tackle the challenge of managing configuration in a distributed system.

As your number of microservices grows, managing `application.properties` files for each service across multiple environments (Dev, QA, Prod) becomes a nightmare. **Spring Cloud Config** provides a solution by externalizing configuration to a central server backed by a version control system (like Git).

## Learning Path

This module covers the following key concepts:

1.  **The Problem with Local Configuration**: Why keeping properties inside the JAR is bad for microservices.
2.  **Spring Cloud Config Server**: Setting up a centralized server to serve configuration properties.
3.  **Git-Backed Configuration**: Storing your properties files in a Git repository.
4.  **Config Client**: Connecting your microservices (`movie-catalog-service`, etc.) to the Config Server.
5.  **Dynamic Refresh**: Updating configuration at runtime without restarting services using `@RefreshScope`.

Let's centralize our configuration!
