# Audit Layer: Annotations

This document details the annotations used in the `audit` layer of the Accounts microservice. This layer is responsible for providing information about the current "auditor" (the user or system responsible for changes) to the JPA Auditing framework.

## 1. `@Component`

This annotation marks the `AuditAwareImpl` class as a Spring component. This means that Spring will automatically detect this class during component scanning, create an instance of it, and manage it as a bean in the application context.

*   **`("auditAwareImpl")`**: This is the explicit name given to the bean. This name is referenced in the `@EnableJpaAuditing` annotation in the main `AccountsApplication` class (`@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")`) to tell Spring which bean to use for resolving auditor information.

### Sample Code:

```java
package com.eazybytes.accounts.audit;

import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;
import java.util.Optional;

@Component("auditAwareImpl")
public class AuditAwareImpl implements AuditorAware<String> {

    /**
     * Returns the current auditor of the application.
     * In this implementation, it is hardcoded as "ACCOUNTS_MS".
     * In a real-world application, this would typically be derived
     * from the security context (e.g., the logged-in user's name).
     *
     * @return the current auditor.
     */
    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.of("ACCOUNTS_MS");
    }
}
```

## 2. `@Override`

This is a standard Java annotation that indicates that the `getCurrentAuditor` method is intended to override a method from the `AuditorAware<String>` interface. The `AuditorAware` interface has a single method, and by implementing it, this class provides the logic to supply the current auditor's name to Spring Data JPA. This name will then be persisted in the `@CreatedBy` and `@LastModifiedBy` fields of the audited entities.