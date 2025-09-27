---
id: java-generics
title: Java Generics
---

# Java Generics

Generics add a layer of abstraction over types, allowing for type-safe collections and methods.

## Generic Class

Here is an example of a generic `Box` class that can hold any type of object.

```java
public class Box<T> {
    private T t;

    public void set(T t) { this.t = t; }
    public T get() { return t; }
}
```