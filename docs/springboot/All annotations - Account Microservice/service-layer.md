# Service Layer: Annotations

This document details the annotations used in the `AccountsServiceImpl` class, which contains the core business logic for the Accounts microservice.

## 1. `@Service`

This annotation marks the class as a Spring service component. It is a specialization of the `@Component` annotation, indicating that it holds the business logic. Classes annotated with `@Service` are automatically detected by Spring during component scanning and are registered as beans in the application context.

### Sample Code:

```java
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AccountsServiceImpl implements IAccountsService {

    private AccountsRepository accountsRepository;
    private CustomerRepository customerRepository;

    // ... method implementations
}
```

## 2. `@AllArgsConstructor`

This is a Lombok annotation that automatically generates a constructor with a parameter for every field in the class. In this context, it is used for constructor-based dependency injection. Spring will automatically supply instances of `AccountsRepository` and `CustomerRepository` when creating the `AccountsServiceImpl` bean.

### Sample Code:

```java
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor // Generates -> public AccountsServiceImpl(AccountsRepository a, CustomerRepository c)
public class AccountsServiceImpl implements IAccountsService {

    private AccountsRepository accountsRepository;
    private CustomerRepository customerRepository;

    // ...
}
```

## 3. `@Override`

This is a standard Java annotation that indicates that a method is intended to override a method declaration in a superclass or interface. It is used here to signify that the methods `createAccount`, `fetchAccount`, `updateAccount`, and `deleteAccount` are implementations of the methods defined in the `IAccountsService` interface. This helps prevent errors; for instance, the compiler will issue an error if the method signature does not correctly match a method in the interface.

### Sample Code:

```java
@Override
public void createAccount(CustomerDto customerDto) {
    // ... implementation
}

@Override
public CustomerDto fetchAccount(String mobileNumber) {
    // ... implementation
}
```