---
id: springboot-starter
title: Spring Boot Starter
---

# Spring Boot Starter

Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run".

## Simple Controller

Here is a basic REST controller that returns a greeting.

```java
@RestController
public class GreetingController {
    @GetMapping("/hello")
    public String sayHello() {
        return "Hello from Spring Boot!";
    }
}
```