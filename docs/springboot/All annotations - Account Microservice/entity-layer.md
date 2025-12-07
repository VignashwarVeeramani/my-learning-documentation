# Entity Layer: Annotations

This document details the annotations used in the entity classes (`Accounts`, `Customer`, and `BaseEntity`), which are Java objects mapped to database tables. These annotations are from the Java Persistence API (JPA), now part of the Jakarta EE ecosystem, and Spring Data JPA.

## 1. JPA Annotations (from `jakarta.persistence.*`)

These annotations are used to define the mapping between the Java objects and the database tables.

### `@Entity`
Marks a class as a JPA entity, meaning it represents a table in a relational database. Each instance of the class corresponds to a row in the table.

**Sample Code (`Customer.java`):**
```java
import jakarta.persistence.Entity;

@Entity
public class Customer extends BaseEntity {
    // ...
}
```

### `@Id`
Specifies the primary key of an entity. This annotation is applied to the field that uniquely identifies each record in the database table.

**Sample Code (`Accounts.java`):**
```java
import jakarta.persistence.Id;

public class Accounts extends BaseEntity {
    @Id
    private Long accountNumber;
    // ...
}
```

### `@GeneratedValue`
Configures the way the primary key value is generated.

*   **`strategy = GenerationType.IDENTITY`**: Indicates that the database is responsible for auto-incrementing the primary key value. This is a common strategy for MySQL, PostgreSQL, and SQL Server.

**Sample Code (`Customer.java`):**
```java
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class Customer extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;
    // ...
}
```

### `@Column`
Specifies the mapping for a persistent entity attribute. It is optional if the field name and the column name are the same, but it provides explicit control over the column's properties.

*   **`name`**: Specifies the name of the database column.
*   **`updatable = false`**: Prevents the column from being included in SQL `UPDATE` statements. Used in `BaseEntity` for `createdAt` and `createdBy` fields.
*   **`insertable = false`**: Prevents the column from being included in SQL `INSERT` statements. Used in `BaseEntity` for `updatedAt` and `updatedBy` fields.

**Sample Code (`Accounts.java`):**
```java
import jakarta.persistence.Column;

public class Accounts extends BaseEntity {
    @Column(name="customer_id")
    private Long customerId;
    // ...
}
```

### `@MappedSuperclass`
Designates a class whose mapping information is applied to the entities that inherit from it. A mapped superclass itself is not an entity (it has no table of its own), but its fields are mapped to the tables of its subclasses. This is used here for the `BaseEntity` to provide common auditing fields to all other entities.

**Sample Code (`BaseEntity.java`):**
```java
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public class BaseEntity {
    // Auditing fields...
}
```

### `@EntityListeners`
Specifies a callback listener class to be used for an entity or mapped superclass. This is used to enable JPA Auditing.

*   **`AuditingEntityListener.class`**: A Spring Data JPA listener that automatically populates the fields annotated with `@CreatedBy`, `@CreatedDate`, `@LastModifiedBy`, and `@LastModifiedDate`.

**Sample Code (`BaseEntity.java`):**
```java
import jakarta.persistence.EntityListeners;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {
    // ...
}
```

## 2. Spring Data JPA Auditing Annotations (from `org.springframework.data.annotation.*`)

These annotations are used within a class listened to by `AuditingEntityListener` to automatically populate auditing information.

### `@CreatedDate` & `@LastModifiedDate`
*   **`@CreatedDate`**: Marks a field to be populated with the timestamp when the entity is first persisted.
*   **`@LastModifiedDate`**: Marks a field to be populated with the timestamp when the entity is last updated.

**Sample Code (`BaseEntity.java`):**
```java
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import java.time.LocalDateTime;

public class BaseEntity {
    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
    // ...
}
```

### `@CreatedBy` & `@LastModifiedBy`
*   **`@CreatedBy`**: Marks a field to be populated with the principal (user) who created the entity.
*   **`@LastModifiedBy`**: Marks a field to be populated with the principal (user) who last modified the entity.
The user information is provided by a bean that implements the `AuditorAware` interface (configured with `@EnableJpaAuditing`).

**Sample Code (`BaseEntity.java`):**
```java
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;

public class BaseEntity {
    @CreatedBy
    private String createdBy;

    @LastModifiedBy
    private String updatedBy;
    // ...
}
```

## 3. Lombok Annotations

These annotations from the Project Lombok library are used to reduce boilerplate code.

### `@Getter`, `@Setter`, `@ToString`, `@AllArgsConstructor`, `@NoArgsConstructor`
*   **`@Getter` / `@Setter`**: Automatically generates getter and setter methods for all fields in the class.
*   **`@ToString`**: Automatically generates a `toString()` method.
*   **`@AllArgsConstructor`**: Automatically generates a constructor with a parameter for every field.
*   **`@NoArgsConstructor`**: Automatically generates a no-argument constructor.

**Sample Code (`Customer.java`):**
```java
import lombok.*;

@Entity
@Getter @Setter @ToString @AllArgsConstructor @NoArgsConstructor
public class Customer extends BaseEntity {
    // ... fields
}
```