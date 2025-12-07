# Key Spring Boot Annotations for REST Services

This document, based on the course "Master Microservices with SpringBoot,Docker,Kubernetes" by EazyBytes, summarizes the essential annotations for building RESTful services, organized by architectural layer.

## 1. Controller/Presentation Layer

This layer is responsible for handling incoming HTTP requests and returning an HTTP response.

### `@RestController`
A convenience annotation that combines `@Controller` and `@ResponseBody`. It marks a class as a request handler and ensures that the return value of every method is automatically serialized into the response body (typically as JSON).

**When to use:** This is the standard annotation for creating REST API controllers.

```java
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    }
}
```

### `@Controller` and `@ResponseBody`
*   `@Controller`: A general-purpose annotation that marks a class as a Spring MVC controller. It's often used for applications that serve UI views.
*   `@ResponseBody`: This annotation is used on a method to tell Spring that the return value should be written directly to the HTTP response body, bypassing view resolution.

**When to use:** Use this combination if your controller needs to handle both REST API endpoints and traditional Spring MVC view-based endpoints within the same class.

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MixedController {

    // This method returns a JSON/text response
    @GetMapping("/api/data")
    @ResponseBody
    public String getApiData() {
        return "Some API Data";
    }

    // This method returns a view name (e.g., for Thymeleaf or JSP)
    @GetMapping("/home")
    public String getHomePage() {
        return "home-page"; // Renders home-page.html
    }
}
```

### `@RequestMapping`, `@GetMapping`, `@PostMapping`, etc.
These annotations map web requests to specific handler methods.
*   `@RequestMapping`: A general-purpose mapping annotation that can be configured for any HTTP method, path, headers, etc.
*   `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`: Shortcuts for `@RequestMapping` for the respective HTTP methods.

```java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts") // Base path for all methods in this class
public class AccountsController {

    @GetMapping("/{id}")
    public Account getAccount(@PathVariable Long id) {
        // ... logic to fetch account
        return new Account();
    }

    @PostMapping
    public void createAccount(@RequestBody Account account) {
        // ... logic to create account
    }
}
```

### `@RequestBody`
Binds the body of the HTTP request to a method parameter. Spring automatically deserializes the incoming JSON into the specified Java object.

```java
@PostMapping("/create")
public ResponseEntity<String> createCustomer(@RequestBody CustomerDto customerDto) {
    // The customerDto object is populated from the request's JSON body
    customerService.create(customerDto);
    return ResponseEntity.ok("Customer created");
}
```

### `ResponseEntity`
A class that represents the entire HTTP response. It allows you to control the status code, headers, and the response body.

**When to use:** Use it when you need to return a specific HTTP status code (e.g., `201 Created`) or custom headers.

```java
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@PostMapping("/create")
public ResponseEntity<Account> createAccount(@RequestBody Account account) {
    Account newAccount = accountService.create(account);
    // Return 201 Created status and the new account in the body
    return new ResponseEntity<>(newAccount, HttpStatus.CREATED);
}
```

## 2. Service/Business Layer

This layer contains the core business logic and orchestrates calls to the data layer.

### `@Service`
Marks a Java class as a service component. It's a specialization of `@Component`, but using `@Service` clearly indicates its role in the business layer.

```java
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements IAccountService {

    @Autowired
    private AccountRepository accountRepository;

    public Account createAccount(Account account) {
        // ... business logic before saving
        return accountRepository.save(account);
    }
}
```

## 3. Repository/Data Access Layer

This layer is responsible for all database interactions.

### `@Repository`
Marks a class or interface as a Data Access Object (DAO). It enables Spring's exception translation feature, which converts technology-specific exceptions (like `SQLException`) into Spring's unified `DataAccessException` hierarchy.

```java
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    // Spring Data JPA automatically implements basic CRUD methods
    // and allows you to define custom query methods.
    Optional<Account> findByAccountNumber(String accountNumber);
}
```

### `@Entity`, `@Id`, `@GeneratedValue`
These are JPA (Java Persistence API) annotations used to map a Java object to a database table.
*   `@Entity`: Specifies that the class is an entity and is mapped to a database table.
*   `@Id`: Designates a field as the primary key.
*   `@GeneratedValue`: Configures the way the primary key is generated (e.g., auto-increment).

```java
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    private String customerName;
    
    // ... other fields, getters, and setters
}
```

## 4. Global Exception Handling

This is a cross-cutting concern that centralizes exception-handling logic for the entire application.

### `@ControllerAdvice` / `@RestControllerAdvice`
Marks a class that contains global exception handling logic, to be shared across multiple controllers.
*   `@ControllerAdvice`: The standard annotation.
*   `@RestControllerAdvice`: A convenience annotation that combines `@ControllerAdvice` and `@ResponseBody`. It ensures the return value of any exception handler method is serialized to the response body.

### `@ExceptionHandler`
An annotation used within a `@ControllerAdvice` class to define a method that handles a specific type of exception.

```java
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> handleResourceNotFoundException(
            ResourceNotFoundException exception) {
        
        ErrorResponseDto errorResponse = new ErrorResponseDto(
            exception.getMessage(),
            HttpStatus.NOT_FOUND
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
}
```