---
id: resiliency
title: Resiliency
---

# Resiliency in Spring Boot

Building resilient microservices is crucial. Spring Boot, with libraries like Resilience4j, makes this easier.

## Circuit Breaker

A circuit breaker can prevent a network or service failure from cascading.

```java
@CircuitBreaker(name = "myService", fallbackMethod = "fallback")
public String someMethod(String param) {
    // ... logic that might fail
    return restTemplate.getForObject("http://example.com/api", String.class);
}
```