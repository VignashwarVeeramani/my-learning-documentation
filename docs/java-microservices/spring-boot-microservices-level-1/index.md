---
title: Spring Boot Microservices Level 1
---

# Spring Boot Microservices Level 1: Communication and Discovery

Welcome to the first level of the Spring Boot Microservices workshop. This guide is designed for entry-level learners and is based on the popular workshop by Koushik Kothagal (Java Brains).

In this series, we will build a simple movie catalog system from the ground up. This system will consist of three separate microservices that work together:

1.  **Movie Catalog Service**: The main application that interacts with the user. It fetches movie information and ratings to display a personalized movie catalog.
2.  **Movie Info Service**: A microservice responsible for providing details about a specific movie.
3.  **Ratings Data Service**: A microservice that manages user ratings for movies.

## Learning Path

We will cover the following key concepts step-by-step:

1.  **Creating the Microservices**: We'll start by building the three core services as independent Spring Boot applications.
2.  **Inter-Service Communication**: Learn how to make services talk to each other using `RestTemplate`.
3.  **Service Discovery**: Introduce a discovery server (Netflix Eureka) to allow services to find and communicate with each other dynamically, without hardcoding URLs.

Use the sidebar to navigate through the different parts of this workshop. Let's get started!
