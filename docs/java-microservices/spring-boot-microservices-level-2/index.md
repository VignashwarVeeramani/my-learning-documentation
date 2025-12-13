---
title: Spring Boot Microservices Level 2
---

# Spring Boot Microservices Level 2: Fault Tolerance and Resilience

Welcome to Level 2 of the Spring Boot Microservices workshop. In Level 1, we built communicating microservices. Now, we will address a critical question: **What happens when a service fails?**

In a distributed system, failure is inevitable. If the `Movie Info Service` goes down, the `Movie Catalog Service` shouldn't crash or hang indefinitely. It should fail gracefully.

## Learning Path

This module covers the following key concepts:

1.  **Fault Tolerance Basics**: Understanding why microservices are fragile and the need for resilience.
2.  **Circuit Breaker Pattern**: Implementing the Circuit Breaker pattern to stop cascading failures.
3.  **Netflix Hystrix**: Using the Hystrix library to implement fault tolerance.
4.  **Fallback Mechanisms**: Providing default responses when a service is down.
5.  **Bulkhead Pattern**: Isolating resources to prevent one failing service from taking down the entire application.
6.  **Hystrix Dashboard**: Visualizing the health and status of your circuit breakers.

*Note: This workshop follows the classic Java Brains curriculum using **Netflix Hystrix**. While Hystrix is now in maintenance mode (replaced by Resilience4j in newer Spring Boot versions), the concepts and patterns remain exactly the same.*

Let's make our system bulletproof!
