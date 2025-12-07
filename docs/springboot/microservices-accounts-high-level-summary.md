# Microservice High-Level Summary: Accounts

This document provides a high-level technical and functional overview of the `accounts` microservice.

## 1. Functional Overview

The **accounts** microservice is a standalone Spring Boot application responsible for managing all customer and bank account information. It serves as the system of record for accounts.

**Core Responsibilities:**
- Creating a new customer along with a new bank account.
- Fetching account and customer details using a customer's mobile number.
- Updating existing account and customer information.
- Deleting customer and account records.

## 2. Technical Architecture

The service is built using a standard layered architecture pattern, which separates concerns and improves maintainability.

!Layered Architecture

### Key Technologies:

*   **Framework:** Spring Boot 3
*   **Language:** Java 17
*   **API:** Spring Web (`@RestController`) for creating RESTful endpoints.
*   **Data Persistence:** Spring Data JPA with an in-memory H2 database for development.
*   **Monitoring:** Spring Boot Actuator for health checks and application information.

### Best Practices Implemented:

*   **DTO Pattern:** The API uses Data Transfer Objects (`dto` package) to decouple the external API contract from the internal database model (`entity` package).
*   **Mapper Pattern:** A dedicated `mapper` layer handles the conversion between `Entity` and `DTO` objects, keeping business logic clean.
*   **Global Exception Handling:** A `@ControllerAdvice` class provides centralized, consistent error handling for the entire application.

## 3. Package Structure & Layers

The package structure directly reflects the layered architecture.

*   `controller`: **Presentation Layer**
    *   Handles HTTP requests, calls the service layer.
    *   Interacts exclusively with DTOs.

*   `service`: **Business Logic Layer**
    *   Contains the core application logic (e.g., how to create an account).
    *   Orchestrates data operations by calling the repository layer.

*   `repository`: **Data Access Layer**
    *   Interfaces extending `JpaRepository`.
    *   Responsible for all communication with the database.

*   `entity`: **Persistence Model**
    *   JPA entities that map directly to database tables.

*   `dto`: **API Data Model**
    *   Defines the structure of data for API requests and responses.

*   `exception`: **Error Handling**
    *   Contains custom exception classes and a global exception handler.

*   `mapper`: **Object Conversion**
    *   Utility classes for mapping between `Entity` and `DTO` objects.

## 4. Core API Endpoints

The service exposes the following primary endpoints:

| Method | Endpoint                               | Description                                     |
|:-------|:---------------------------------------|:------------------------------------------------|
| `POST` | `/api/create`                          | Creates a new customer and an associated account. |
| `GET`  | `/api/fetch?mobileNumber={number}`     | Fetches account details for a given mobile number. |
| `PUT`  | `/api/update`                          | Updates existing customer and account details.  |
| `DELETE`| `/api/delete?mobileNumber={number}`    | Deletes a customer and their account.           |

---

This summary provides a solid foundation for understanding the `accounts` microservice. It can be used as a reference for developers and as a base for more detailed documentation.