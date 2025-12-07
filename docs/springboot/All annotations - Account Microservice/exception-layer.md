# Exception Layer: Annotations

This document details the annotations used in the `GlobalExceptionHandler` class, which provides centralized exception handling for the entire Accounts microservice.

## 1. `@ControllerAdvice`

This annotation marks the class as a global exception handler. Spring detects classes annotated with `@ControllerAdvice` and uses them to handle exceptions thrown by any controller in the application. This allows you to define your exception handling logic in a single place, rather than scattering it across individual controllers.

### Sample Code:

```java
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    // ... exception handler methods
}
```

## 2. `@ExceptionHandler`

This annotation is used within a `@ControllerAdvice` class to define a method that handles a specific type of exception. When an exception of the specified class (or one of its subclasses) is thrown by a controller method, this annotated method will be invoked to handle it and generate a custom HTTP response.

The `GlobalExceptionHandler` has three such methods:

*   **`handleGlobalException(Exception.class)`**: A generic handler that catches any exception that doesn't have a more specific handler. It returns a `500 Internal Server Error` response.
*   **`handleResourceNotFoundException(ResourceNotFoundException.class)`**: Handles cases where a requested resource (like a customer or account) is not found. It returns a `404 Not Found` response.
*   **`handleCustomerAlreadyExistsException(CustomerAlreadyExistsException.class)`**: Handles the specific case where a new customer cannot be created because they already exist. It returns a `400 Bad Request` response.

### Sample Code:

```java
import com.eazybytes.accounts.dto.ErrorResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> handleResourceNotFoundException(
            ResourceNotFoundException exception, WebRequest webRequest) {
        
        ErrorResponseDto errorResponseDTO = new ErrorResponseDto(
                webRequest.getDescription(false),
                HttpStatus.NOT_FOUND,
                exception.getMessage(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CustomerAlreadyExistsException.class)
    public ResponseEntity<ErrorResponseDto> handleCustomerAlreadyExistsException(
            CustomerAlreadyExistsException exception, WebRequest webRequest){
        
        ErrorResponseDto errorResponseDTO = new ErrorResponseDto(
                webRequest.getDescription(false),
                HttpStatus.BAD_REQUEST,
                exception.getMessage(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
    }
    
    // Generic exception handler
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDto> handleGlobalException(
            Exception exception, WebRequest webRequest) {
            
        ErrorResponseDto errorResponseDTO = new ErrorResponseDto(
                webRequest.getDescription(false),
                HttpStatus.INTERNAL_SERVER_ERROR,
                exception.getMessage(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

## 3. `@Override`

This standard Java annotation is used here to indicate that the `handleMethodArgumentNotValid` method is overriding a method from its superclass, `ResponseEntityExceptionHandler`. This specific method is invoked when an argument annotated with `@Valid` fails validation (e.g., a required field in a request body is missing). It is customized to return a `400 Bad Request` response with a map of all validation errors.

### Sample Code:

```java
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;

public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        
        // Logic to extract and format validation errors
        
        return new ResponseEntity<>(/*...formatted errors...*/, HttpStatus.BAD_REQUEST);
    }
}
```