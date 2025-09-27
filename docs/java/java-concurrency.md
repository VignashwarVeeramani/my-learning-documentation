---
id: java-concurrency
title: Java Concurrency
---

# Java Concurrency

This section covers the fundamentals of concurrent programming in Java.

## Threads and Runnables

A `Thread` is the smallest unit of execution. You can create threads by extending the `Thread` class or implementing the `Runnable` interface.

```java
class MyRunnable implements Runnable {
    public void run() {
        System.out.println("MyRunnable is running.");
    }
}

Thread t = new Thread(new MyRunnable());
t.start();
```