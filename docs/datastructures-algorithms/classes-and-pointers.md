---
sidebar_position: 3
---

# Classes and Pointers

Understanding classes and how Java handles object references (pointers) is essential for building and manipulating data structures effectively.

## Table of Contents

- [Classes](#classes)
- [Pointers (Object References)](#pointers-object-references)

---

## Classes

A **class** can be thought of as a blueprint or a "cookie cutter." It defines the properties and behaviors of an object, but it is not the object itself. You use the class to create instances, or "cookies."

### Core Components of a Class

1.  **Class Variables (Fields):** These are the properties of an object. It's a best practice to declare them as `private` to encapsulate the data.
2.  **Constructor:** A special method that is called when you create a new instance of a class (using the `new` keyword). It has the same name as the class and is used to initialize the object's variables.
3.  **Methods:** These define the behaviors or actions that an object can perform.

### Example: The `Cookie` Class

Let's define a `Cookie` class. Each cookie will have one property: its color.

```java
// File: Cookie.java
public class Cookie {

    private String color;

    // Constructor
    public Cookie(String color) {
        // 'this.color' refers to the class variable
        // 'color' refers to the parameter passed to the constructor
        this.color = color;
    }

    // Getter method
    public String getColor() {
        return color;
    }

    // Setter method
    public void setColor(String color) {
        this.color = color;
    }
}
```

### Creating Instances

Once the class is defined, you can create multiple, independent instances of it.

```java
// File: Main.java
public class Main {

    public static void main(String[] args) {
        // Create an instance of Cookie called cookieOne
        Cookie cookieOne = new Cookie("green");

        // Create another instance of Cookie called cookieTwo
        Cookie cookieTwo = new Cookie("blue");

        System.out.println("Initial Colors:");
        System.out.println("Cookie 1: " + cookieOne.getColor()); // Output: green
        System.out.println("Cookie 2: " + cookieTwo.getColor()); // Output: blue

        // Use the setter to change the color of the first cookie
        cookieOne.setColor("yellow");

        System.out.println("\nColors after update:");
        System.out.println("Cookie 1: " + cookieOne.getColor()); // Output: yellow
        System.out.println("Cookie 2: " + cookieTwo.getColor()); // Output: blue
    }
}
```

This example demonstrates that `cookieOne` and `cookieTwo` are separate objects. Changing one does not affect the other. This concept is the foundation for building complex data structures where each node or element is an instance of a class.

---

## Pointers (Object References)

In Java, we don't work with pointers in the same way as C++, but we work with **references**. When you create an object, the variable doesn't hold the object itself; it holds a reference (or a "pointer") to the object's location in memory.

### Primitives vs. Objects

*   **Primitive Types (`int`, `double`, etc.):** When you assign one primitive variable to another, the value is copied. They are independent.
*   **Object Types (`HashMap`, `Cookie`, etc.):** When you assign one object variable to another, the reference (the "pointer") is copied, not the object itself. Both variables now point to the **exact same object** in memory.

### Example: Primitive Type (Value Copy)

```java
int num1 = 11;
int num2 = num1; // num2 gets a copy of the value of num1

num1 = 22; // This only changes num1

System.out.println("num1: " + num1); // Output: 22
System.out.println("num2: " + num2); // Output: 11 (remains unchanged)
```

### Example: Object Type (Reference Copy)

Now, let's see what happens with an object.

```java
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> map1 = new HashMap<>();
        map1.put("value", 11);

        // This copies the reference, not the object.
        // Both map1 and map2 now point to the SAME HashMap.
        HashMap<String, Integer> map2 = map1;

        // Modify the object using the map1 reference
        map1.put("value", 22);

        System.out.println("map1: " + map1); // Output: {value=22}
        System.out.println("map2: " + map2); // Output: {value=22} (also changed!)
    }
}
```

Because both `map1` and `map2` point to the same object, a change made through one variable is visible through the other.

### Garbage Collection

If an object in memory no longer has any references pointing to it, it becomes unreachable. Java's **Garbage Collector** is an automatic process that periodically finds and deletes these unreachable objects, freeing up memory.

For example, if we later did `map1 = null;` and `map2 = null;`, the original `HashMap` object would have no references and would be eligible for garbage collection.

### Why This Matters for Data Structures

This concept is critical for data structures like Linked Lists.

*   The `head` and `tail` variables are references that point to the first and last nodes.
*   Each node in the list contains a reference (`next`) that points to the subsequent node.

Manipulating these references is how we add, remove, and traverse elements in the structure.