---
sidebar_position: 2
---

# Java Streams

The Java Stream API, introduced in Java 8, provides a powerful and declarative way to process sequences of elements. Streams allow you to chain together operations to perform complex data processing tasks, such as filtering, mapping, and reducing, in a highly readable and efficient manner.

## Table of Contents

- [What are Java Streams?](#what-are-java-streams)
- [Creating Streams](#creating-streams)
- [Stream Operations: Intermediate vs. Terminal](#stream-operations-intermediate-vs-terminal)
- [Common Intermediate Operations](#common-intermediate-operations)
  - [`filter()`](#filter)
  - `map()`
  - `sorted()`
  - `distinct()`
- Common Terminal Operations
  - `forEach()`
  - `collect()`
  - `reduce()`
  - `anyMatch()`, `allMatch()`, `noneMatch()`
- Putting It All Together: A Complete Example

---

## What are Java Streams?

A stream is not a data structure that stores elements; instead, it conveys elements from a source (like a `Collection` or an array) through a pipeline of computational operations.

Key characteristics:
*   **Declarative:** You describe *what* you want to do, not *how* to do it.
*   **Consumable:** A stream can only be traversed once.
*   **Lazy Execution:** Intermediate operations are not executed until a terminal operation is invoked.
*   **No Storage:** Streams don't store their elements.

---

## Creating Streams

You can create streams from various data sources.

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class StreamCreation {
    public static void main(String[] args) {
        // 1. From a Collection
        List<String> items = List.of("Apple", "Banana", "Cherry");
        Stream<String> streamFromList = items.stream();

        // 2. From an Array
        String[] array = {"Apple", "Banana", "Cherry"};
        Stream<String> streamFromArray = Arrays.stream(array);

        // 3. From individual values
        Stream<String> streamOfValues = Stream.of("Apple", "Banana", "Cherry");
    }
}
```

---

## Stream Operations: Intermediate vs. Terminal

A stream pipeline consists of a source, zero or more **intermediate operations**, and one **terminal operation**.

*   **Intermediate Operations:** These are "lazy" operations that transform a stream into another stream. They don't do any processing until a terminal operation is called. Examples include `filter()`, `map()`, and `sorted()`.
*   **Terminal Operations:** These are "eager" operations that trigger the execution of the pipeline and produce a final result or a side-effect. After a terminal operation is called, the stream cannot be used again. Examples include `forEach()`, `collect()`, and `reduce()`.

---

## Common Intermediate Operations

### `filter()`
Returns a stream consisting of the elements that match a given predicate (a condition).

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);
List<Integer> evenNumbers = numbers.stream()
    .filter(n -> n % 2 == 0) // Keep only even numbers
    .collect(Collectors.toList()); // [2, 4, 6]
```

### `map()`
Returns a stream consisting of the results of applying a given function to the elements of the stream. It's used for transformation.

```java
List<String> words = List.of("hello", "world");
List<Integer> wordLengths = words.stream()
    .map(String::length) // Transform each word to its length
    .collect(Collectors.toList()); // [5, 5]
```

### `sorted()`
Returns a stream consisting of the elements of the stream, sorted according to natural order.

```java
List<String> fruits = List.of("Cherry", "Apple", "Banana");
List<String> sortedFruits = fruits.stream()
    .sorted() // Sort alphabetically
    .collect(Collectors.toList()); // ["Apple", "Banana", "Cherry"]
```

### `distinct()`
Returns a stream consisting of the unique elements.

```java
List<Integer> numbersWithDuplicates = List.of(1, 2, 2, 3, 3, 3, 4);
List<Integer> uniqueNumbers = numbersWithDuplicates.stream()
    .distinct() // Keep only unique elements
    .collect(Collectors.toList()); // [1, 2, 3, 4]
```

---

## Common Terminal Operations

### `forEach()`
Performs an action for each element of the stream. This is often used for printing or applying a function with side-effects.

```java
List<String> names = List.of("Alice", "Bob", "Charlie");
names.stream()
    .forEach(System.out::println); // Prints each name on a new line
```

### `collect()`
Performs a mutable reduction operation on the elements of the stream. This is the most common way to get data out of a stream and into a `List`, `Set`, or `Map`.

```java
List<String> fruits = List.of("Apple", "Banana", "Cherry");
List<String> fruitList = fruits.stream().collect(Collectors.toList());
Set<String> fruitSet = fruits.stream().collect(Collectors.toSet());
```

### `reduce()`
Performs a reduction on the elements of the stream, using an associative accumulation function, and returns an `Optional` describing the reduced value.

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5);
int sum = numbers.stream()
    .reduce(0, (a, b) -> a + b); // 0 is the identity, (a, b) -> a + b is the accumulator
    // Can also be written as: .reduce(0, Integer::sum);
System.out.println(sum); // 15
```

### `anyMatch()`, `allMatch()`, `noneMatch()`
These are short-circuiting terminal operations that check if elements match a given predicate.

```java
List<Integer> numbers = List.of(2, 4, 6, 8, 9);

boolean anyEven = numbers.stream().anyMatch(n -> n % 2 == 0); // true
boolean allEven = numbers.stream().allMatch(n -> n % 2 == 0); // false (because of 9)
boolean noneOdd = numbers.stream().noneMatch(n -> n % 2 != 0); // false (because of 9)
```

---

## Putting It All Together: A Complete Example

Let's combine several operations to solve a more complex problem. Given a list of people, find the names of all adults (age 18+) in uppercase, sorted alphabetically.

```java
// Assume a Person class exists:
// public class Person {
//     private String name;
//     private int age;
//     // constructor, getters...
// }

List<Person> people = List.of(
    new Person("Alice", 25),
    new Person("Bob", 17),
    new Person("Charlie", 30),
    new Person("Zoe", 22)
);

List<String> adultNames = people.stream()
    .filter(p -> p.getAge() >= 18)      // Intermediate: Keep only adults
    .map(Person::getName)               // Intermediate: Get their names
    .map(String::toUpperCase)           // Intermediate: Convert names to uppercase
    .sorted()                           // Intermediate: Sort the names
    .collect(Collectors.toList());      // Terminal: Collect results into a list

System.out.println(adultNames); // [ALICE, CHARLIE, ZOE]
```