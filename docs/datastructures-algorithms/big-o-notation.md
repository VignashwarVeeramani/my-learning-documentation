---
sidebar_position: 1
---

# Big O Notation

Big O notation is a mathematical notation used in computer science to describe the performance or complexity of an algorithm. It specifically describes the **worst-case scenario**, focusing on how the runtime or space requirements of an algorithm grow as the input size increases.

## Table of Contents

- [Best, Average, and Worst Case](#best-average-and-worst-case)
- [O(n) - Linear Time](#on---linear-time)
- [Simplification Rule: Drop Constants](#simplification-rule-drop-constants)
- [O(n²) - Quadratic Time](#on%C2%B2---quadratic-time)
- [Simplification Rule: Drop Non-Dominants](#simplification-rule-drop-non-dominants)
- [O(1) - Constant Time](#o1---constant-time)
- [O(log n) - Logarithmic Time](#olog-n---logarithmic-time)
- [Different Terms for Inputs](#different-terms-for-inputs)
- [Big O of ArrayLists](#big-o-of-arraylists)
- [Big O Wrap Up](#big-o-wrap-up)

---

## Best, Average, and Worst Case

When analyzing an algorithm, we can consider three scenarios for its performance, often represented by Greek letters:

*   **Ω (Omega): Best Case.** This represents the minimum number of operations an algorithm will perform. For example, if you're searching for an item in an array and find it at the very first position.
*   **Θ (Theta): Average Case.** This describes the expected or average performance of an algorithm.
*   **O (Omicron / Big O): Worst Case.** This represents the maximum number of operations an algorithm will perform, providing an upper bound on its complexity.

> **Important:** While people might colloquially ask for the "best-case Big O" or "average-case Big O," this is technically incorrect. Big O notation formally refers to the worst-case complexity. The correct terms for best and average cases are Omega (Ω) and Theta (Θ), respectively. In interviews and professional settings, when someone says "Big O," they almost always mean the worst-case performance.

---

## O(n) - Linear Time

**O(n)**, or **Linear Time**, is one of the most common and intuitive complexities. It means that the number of operations an algorithm performs is directly proportional to the size of the input (`n`).

If the input size doubles, the number of operations also doubles.

### Example

A simple `for` loop that iterates through all elements of an input is a classic example of O(n).

```java
public class BigOExamples {

    /**
     * This method has a time complexity of O(n).
     * The number of operations is directly proportional to the value of n.
     * If n is 10, the loop runs 10 times.
     * If n is 1,000,000, the loop runs 1,000,000 times.
     */
    public static void printItems(int n) {
        for (int i = 0; i < n; i++) {
            System.out.println(i);
        }
    }
}
```

---

## Simplification Rule: Drop Constants

When calculating Big O, we simplify the notation by dropping constant multipliers. The core idea of Big O is to describe the long-term growth rate of an algorithm, and as the input size (`n`) grows very large, constant factors become insignificant.

### Example

Consider a method with two separate, non-nested `for` loops that each run `n` times.

```java
public class BigOExamples {

    /**
     * This method contains two separate loops that each run n times.
     * The total number of operations is n + n = 2n.
     * In Big O notation, we drop the constant '2'.
     * Therefore, the time complexity is O(n), not O(2n).
     */
    public static void printItemsTwice(int n) {
        for (int i = 0; i < n; i++) {
            System.out.println(i);
        }

        for (int j = 0; j < n; j++) {
            System.out.println(j);
        }
    }
}
```

Even though this method performs twice as many operations as the first `O(n)` example, both have the same Big O complexity. Whether the complexity is `O(2n)` or `O(100n)`, we simplify it to **O(n)** because the algorithm's runtime still grows linearly with the input size.

---

## O(n²) - Quadratic Time

**O(n²)** describes an algorithm whose performance is proportional to the square of the input size. This typically occurs when you have nested loops iterating over the same input.

As `n` grows, the number of operations grows exponentially, making O(n²) much less efficient than O(n). If you can refactor an O(n²) algorithm to be O(n), it's a massive performance gain.

### Example

A nested `for` loop is the classic example of O(n²). If `n` is 10, the inner loop runs 10 times for each of the 10 outer loop iterations, resulting in `10 * 10 = 100` total operations.

```java
public class BigOExamples {
    /**
     * This method has a time complexity of O(n²).
     * The outer loop runs n times, and the inner loop runs n times for each outer iteration.
     * Total operations = n * n = n².
     */
    public static void printPairs(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                // Note: The quotes create a string "i j" instead of adding the numbers.
                System.out.println(i + " " + j);
            }
        }
    }
}
```

---

## Simplification Rule: Drop Non-Dominants

When an algorithm has multiple terms in its complexity, we simplify by dropping the non-dominant terms. The dominant term is the one that grows the fastest as `n` becomes large.

For an expression like `O(n² + n)`, the `n²` term grows much faster than the `n` term. As `n` approaches infinity, the contribution of the `n` term becomes negligible. Therefore, we simplify `O(n² + n)` to just **O(n²)**.

### Example

This method combines a nested loop (O(n²)) with a separate single loop (O(n)).

```java
public class BigOExamples {
    /**
     * The complexity here is O(n² + n).
     * The nested loop is O(n²).
     * The single loop is O(n).
     * We drop the non-dominant 'n' term.
     * The final complexity is O(n²).
     */
    public static void printItemsWithNestedLoop(int n) {
        // This part is O(n²)
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.println(i + " " + j);
            }
        }
        // This part is O(n)
        for (int k = 0; k < n; k++) {
            System.out.println(k);
        }
    }
}
```

---

## O(1) - Constant Time

**O(1)**, or **Constant Time**, is the most efficient complexity. It means the number of operations does not change as the input size `n` grows. The algorithm will always take the same amount of time, regardless of the input.

This doesn't mean there's only one operation. It could be two, five, or a hundred operations. As long as the number of operations is constant and doesn't depend on `n`, the complexity is O(1).

### Example

A simple addition is O(1). It's one operation whether `n` is 10 or 1,000,000.

```java
public class BigOExamples {
    /**
     * This method has a time complexity of O(1).
     * It performs one addition, regardless of the value of n.
     */
    public static int addItem(int n) {
        return n + n;
    }
}
```

---

## O(log n) - Logarithmic Time

**O(log n)** is an extremely efficient complexity, second only to O(1). It's characteristic of algorithms that use a "divide and conquer" strategy. With each step, the algorithm reduces the size of the problem by a significant factor (usually half).

This means that even for a massive input size (e.g., a billion items), the algorithm can find a solution in a very small number of steps.

### Example

Binary search on a **sorted** array is the classic example of O(log n). To find an item, you check the middle element. If it's not a match, you discard half of the array and repeat the process on the remaining half.

- An array of 8 items takes at most 3 steps (2³ = 8).
- An array of over 1 billion items takes at most 31 steps (2³¹ ≈ 2.1 billion).

The base of the logarithm (e.g., log₂) is considered a constant and is dropped in Big O notation.

---

## Different Terms for Inputs

A common interview "gotcha" is when a function takes multiple, independent inputs. If you have two separate loops that run based on two different inputs, `a` and `b`, you cannot simplify the complexity to O(n).

- If the loops are separate (one after the other), the complexity is **O(a + b)**.
- If the loops are nested (one inside the other), the complexity is **O(a * b)**.

You cannot combine them because you don't know the relationship between `a` and `b`. One could be 1 while the other is a billion.

### Example

```java
public class BigOExamples {
    // Complexity: O(a + b)
    public static void printItemsSeparate(int a, int b) {
        for (int i = 0; i < a; i++) {
            System.out.println(i);
        }
        for (int j = 0; j < b; j++) {
            System.out.println(j);
        }
    }

    // Complexity: O(a * b)
    public static void printItemsNested(int a, int b) {
        for (int i = 0; i < a; i++) {
            for (int j = 0; j < b; j++) {
                System.out.println(i + " " + j);
            }
        }
    }
}
```

---

## Big O of ArrayLists

The performance of `ArrayList` operations depends on where in the list the operation occurs.

| Operation                               | Big O   | Explanation                                                                                                                              |
| --------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Add/Remove at the End** (`.add(item)`) | **O(1)** | Adding or removing from the end is fast because no re-indexing of other elements is needed. (This is amortized time; resizing can be O(n)). |
| **Add/Remove at the Beginning**         | **O(n)** | To add/remove at index 0, every other element in the list must be shifted one position, requiring `n` operations.                        |
| **Add/Remove in the Middle**            | **O(n)** | On average, you have to shift half the elements (`n/2`). We drop the constant (1/2), so the complexity is O(n).                            |
| **Search by Value** (`.contains()`)     | **O(n)** | In the worst case, you have to iterate through every element to find the value.                                                          |
| **Search by Index** (`.get(index)`)     | **O(1)** | Accessing an element by its index is a direct lookup and takes constant time.                                                            |

---

## Big O Wrap Up

This table shows how dramatically the number of operations grows for different complexities as `n` increases.

| Big O      | n = 100   | n = 1,000 | Terminology        |
| ---------- | --------- | --------- | ------------------ |
| **O(1)**   | 1         | 1         | Constant           |
| **O(log n)** | ~7        | ~10       | Divide and Conquer |
| **O(n)**   | 100       | 1,000     | Proportional       |
| **O(n²)**  | 10,000    | 1,000,000 | Loop within a Loop |

As you can see, an O(n²) algorithm becomes very inefficient very quickly. A great resource for reviewing these complexities is Big-O Cheat Sheet.
