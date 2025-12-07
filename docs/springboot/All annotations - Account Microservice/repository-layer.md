# Repository Layer: Annotations

This document details the annotations used in the repository interfaces of the Accounts microservice, which are responsible for data access and manipulation.

## 1. `@Repository`

This annotation is used to mark a Java class or interface as a Data Access Object (DAO). It is a specialization of `@Component` and serves a few key purposes:

*   It clearly marks the role of the interface as a data repository.
*   It enables Spring's exception translation feature, which converts technology-specific exceptions (like a `SQLException` from JPA) into Spring's unified, unchecked `DataAccessException` hierarchy. This makes exception handling more consistent.

### Sample Code (`CustomerRepository`):

```java
import com.eazybytes.accounts.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByMobileNumber(String mobileNumber);
}
```

### Sample Code (`AccountsRepository`):

```java
import com.eazybytes.accounts.entity.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AccountsRepository extends JpaRepository<Accounts, Long> {

    Optional<Accounts> findByCustomerId(Long customerId);
    
    // ... other methods
}
```

## 2. `@Transactional`

This annotation is used to define the scope of a single database transaction. When applied to a method, Spring ensures that the method executes within a transactional context. If the method completes successfully, the transaction is committed. If an unhandled exception is thrown, the transaction is rolled back.

In the `AccountsRepository`, it is used on a custom `delete` method to ensure the delete operation is atomic.

### Sample Code (`AccountsRepository`):

```java
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;

public interface AccountsRepository extends JpaRepository<Accounts, Long> {

    @Transactional
    @Modifying
    void deleteByCustomerId(Long customerId);
}
```

## 3. `@Modifying`

This annotation is required for any query method that modifies the state of the database (i.e., `INSERT`, `UPDATE`, or `DELETE` operations). It tells Spring Data JPA that the query defined by the method is not for fetching data but for changing it. It should be used in conjunction with `@Transactional`.

### Sample Code (`AccountsRepository`):

```java
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;

public interface AccountsRepository extends JpaRepository<Accounts, Long> {

    @Transactional
    @Modifying
    void deleteByCustomerId(Long customerId);
}
```

By extending `JpaRepository<Entity, Id>`, both repositories automatically inherit a full set of CRUD (Create, Read, Update, Delete) methods without needing any implementation, such as `save()`, `findById()`, and `delete()`. Spring Data JPA provides the implementation at runtime.