---
sidebar_position: 2
---

# Big O Cheat Sheet

This guide serves as a quick reference for the time and space complexities of common data structures and algorithms, inspired by the excellent resource at [bigocheatsheet.com](https://www.bigocheatsheet.com/).

## Table of Contents

- [Big O Complexity Graph](#big-o-complexity-graph)
- [Common Data Structure Operations](#common-data-structure-operations)
- [Array Sorting Algorithms](#array-sorting-algorithms)

---

## Big O Complexity Graph

The following graph visually represents the growth rates of common Big O complexities. The flatter the curve, the more efficient and scalable the algorithm.

![Big O Complexity Graph](https://www.bigocheatsheet.com/img/big-o-graph.png)

| Complexity | Name         | Performance | Description                                                              |
| :--------- | :----------- | :---------- | :----------------------------------------------------------------------- |
| **O(1)**   | Constant     | Excellent   | Always takes the same amount of time, regardless of input size.          |
| **O(log n)** | Logarithmic  | Excellent   | Runtime grows very slowly as input size increases (e.g., binary search). |
| **O(n)**   | Linear       | Good        | Runtime is directly proportional to the input size (e.g., simple loop).  |
| **O(n log n)** | Linearithmic | Fair        | A common complexity for efficient sorting algorithms (e.g., Merge Sort). |
| **O(n²)**  | Quadratic    | Bad         | Runtime grows exponentially; slow for large inputs (e.g., nested loops). |
| **O(2ⁿ)**  | Exponential  | Horrible    | Becomes unusable very quickly, even for small increases in `n`.          |
| **O(n!)**  | Factorial    | Horrible    | Extremely slow; often found in naive solutions to complex problems.      |

---

## Common Data Structure Operations

The efficiency of a data structure is determined by the time complexity of its core operations.

### Time Complexity (Big O)

| Data Structure         | Access (Avg) | Search (Avg) | Insertion (Avg) | Deletion (Avg) | Access (Worst) | Search (Worst) | Insertion (Worst) | Deletion (Worst) |
| :--------------------- | :----------: | :----------: | :-------------: | :------------: | :------------: | :------------: | :---------------: | :--------------: |
| **Array**              |     O(1)     |     O(n)     |      O(n)       |      O(n)      |      O(1)      |      O(n)      |       O(n)        |       O(n)       |
| **Stack**              |     O(n)     |     O(n)     |      O(1)       |      O(1)      |      O(n)      |      O(n)      |       O(1)        |       O(1)       |
| **Queue**              |     O(n)     |     O(n)     |      O(1)       |      O(1)      |      O(n)      |      O(n)      |       O(1)        |       O(1)       |
| **Singly-Linked List** |     O(n)     |     O(n)     |      O(1)       |      O(1)      |      O(n)      |      O(n)      |       O(1)        |       O(1)       |
| **Doubly-Linked List** |     O(n)     |     O(n)     |      O(1)       |      O(1)      |      O(n)      |      O(n)      |       O(1)        |       O(1)       |
| **Hash Table**         |     O(1)     |     O(1)     |      O(1)       |      O(1)      |      O(n)      |      O(n)      |       O(n)        |       O(n)       |
| **Binary Search Tree** |   O(log n)   |   O(log n)   |    O(log n)     |    O(log n)    |      O(n)      |      O(n)      |       O(n)        |       O(n)       |

**Key Takeaways:**
*   **Hash Table:** Offers excellent average-case performance (O(1)) for search, insertion, and deletion. The worst-case O(n) occurs due to hash collisions, where multiple elements are mapped to the same bucket, forcing a linear search.
*   **Binary Search Tree (BST):** Provides efficient O(log n) operations on average. However, if the tree becomes unbalanced (e.g., by inserting elements in sorted order), it degenerates into a linked list, resulting in O(n) worst-case performance.
*   **Array:** Provides the fastest possible access time (O(1)) when you know the index. However, adding or removing elements is slow (O(n)) because it may require shifting all subsequent elements.

### Space Complexity (Worst-Case)

| Data Structure         | Space Complexity |
| :--------------------- | :--------------: |
| **Array**              |       O(n)       |
| **Stack**              |       O(n)       |
| **Queue**              |       O(n)       |
| **Singly-Linked List** |       O(n)       |
| **Doubly-Linked List** |       O(n)       |
| **Hash Table**         |       O(n)       |
| **Binary Search Tree** |       O(n)       |

---

## Array Sorting Algorithms

Sorting algorithms are a fundamental part of computer science, and their efficiencies vary significantly.

### Time and Space Complexity

| Algorithm          | Time (Best) | Time (Average) | Time (Worst) | Space (Worst) |
| :----------------- | :---------: | :------------: | :----------: | :-----------: |
| **Quicksort**      | O(n log n)  |   O(n log n)   |    O(n²)     |   O(log n)    |
| **Mergesort**      | O(n log n)  |   O(n log n)   |  O(n log n)  |     O(n)      |
| **Heapsort**       | O(n log n)  |   O(n log n)   |  O(n log n)  |     O(1)      |
| **Bubble Sort**    |    O(n)     |     O(n²)      |    O(n²)     |     O(1)      |
| **Insertion Sort** |    O(n)     |     O(n²)      |    O(n²)     |     O(1)      |
| **Selection Sort** |    O(n²)    |     O(n²)      |    O(n²)     |     O(1)      |

**Key Takeaways:**
*   **Mergesort** is a great general-purpose sort. It's stable and guarantees O(n log n) performance, but it requires extra space (O(n)).
*   **Quicksort** is often faster in practice than Mergesort but has a worst-case of O(n²) if the pivot selections are poor (e.g., on an already-sorted array). It's an in-place sort with O(log n) space complexity.
*   **Heapsort** is a good choice if you need guaranteed O(n log n) performance but cannot afford the extra space required by Mergesort (O(1) space).
*   **Bubble Sort** and **Insertion Sort** are simple but