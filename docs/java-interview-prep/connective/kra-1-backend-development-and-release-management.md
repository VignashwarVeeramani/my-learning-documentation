---
title: KRA 1 – Backend Development & Release Management
---

# KRA 1 – Backend Development & Release Management

## Technical Questions

### 1. Can you walk me through how you design and build a scalable backend service?

*   **S:** When working on the Account Identifier Microservice, traffic increased due to downstream consumers requesting account details more frequently.
*   **T:** I had to redesign the service to handle higher throughput and ensure low-latency retrieval of accountId and accountKey information.
*   **A:** I introduced caching for frequently accessed account metadata, added pagination for bulk requests, applied asynchronous communication for heavy operations, and implemented horizontal autoscaling on Kubernetes.
*   **R:** The service handled 3× more traffic, improved average latency by 60%, and downstream consumers saw zero throttling.

### 2. How do you handle performance bottlenecks in a microservices environment?

*   **S:** The Online Statement service slowed down when customers queried large 2-year statement ranges.
*   **T:** Identify and fix the bottlenecks across multiple microservices.
*   **A:** I used distributed tracing to track delays across PDF generation, storage retrieval, and search filters. Then I added indexing for large date-range queries, batched PDF fetches, and applied Redis caching for recently accessed statements.
*   **R:** Query time dropped from 2–3 seconds to under 400ms, and mobile app timeouts disappeared.

### 3. Explain your approach to debugging complex production issues.

*   **S:** The BRDT File Loader was intermittently routing to the wrong PAG system.
*   **T:** Diagnose the root cause across the 3 dependent systems.
*   **A:** I analyzed logs, added trace IDs end-to-end, reviewed file validation logic, and recreated timing conditions in a lower environment. The issue was a race condition in file presence checks.
*   **R:** Fixing it eliminated routing failures entirely and improved file upload reliability to 100%.

### 4. How do you design secure APIs?

*   **Example referencing financial services:**
    *   Enforce OAuth2/JWT for APIs like Account Identifier MS and Account Value Posting.
    *   Validate all inputs (accountId, ledger codes, posting amounts).
    *   Mask sensitive fields.
    *   Apply rate limiting to sensitive endpoints (posting, account retrieval).
    *   Use mTLS between internal services.
*   **R:** Ensured compliance with bank-grade security and prevented unauthorised posting or data access.

### 5. What CI/CD tools and pipelines have you worked with, and how did you improve them?

*   **S:** Deployments for the Account Value Posting API were manual and risky due to dependencies on USL and Datapower.
*   **T:** Improve reliability and automate releases.
*   **A:** I created environment-specific pipelines, added automated contract tests, implemented smoke tests post-deployment, and added blue-green rollout to avoid downtime.
*   **R:** Release time reduced by 70%, and posting outages during deployments dropped to zero.

### 6. How do you ensure your services are stable and resilient?

*   **Examples using your services:**
    *   Circuit breakers between Account Value Posting → Datapower.
    *   Retry with backoff on BRDT file checks.
    *   Caching for Branch Info lookup.
    *   Liveness/readiness probes for all services.
    *   Graceful degradation (e.g., fallback to limited account info when downstream is slow).
*   **R:** High availability maintained even during partial system outages.

### 7. What’s your experience with 2nd/3rd level production support?

*   **S:** I handled Sev1 issues for Online Statement failures during peak month-end.
*   **T:** Restore service and prevent future failures.
*   **A:** I diagnosed storage throttling, increased concurrency limits, added caching for frequently accessed statements, and introduced better logging around PDF fetch times.
*   **R:** MTTR dropped from 2 hours to under 20 minutes, and repeat incidents reduced drastically.

### 8. How do you ensure backward compatibility when releasing API changes?

*   **Example:**
    *   For Account Identifier MS, I added a new response field for account category but:
        *   Versioned the response.
        *   Kept old schema active.
        *   Added feature flags.
*   **R:** Zero impact on existing consumers.

### 9. What’s your strategy for versioning microservices?

*   **Applied to services like Branch Info and Online Statement:**
    *   Semantic versioning.
    *   Deprecation timeline published early.
    *   Canary deployments.
    *   Routing based on version in API gateway.
*   **Outcome:** Safe incremental rollout with zero disruptions.

### 10. Explain a situation where you fixed a major incident — what was your approach?

*   **S:** A major outage occurred when Account Value Posting stopped forwarding credit postings to Datapower.
*   **T:** Quickly restore transaction posting.
*   **A:** I checked USL and Datapower logs, validated payloads, discovered an upstream schema mismatch, and created a temporary mapping layer to unblock posting. Worked with the integration team for the permanent fix.
*   **R:** Posting restored in 15 minutes, preventing backlog and financial reconciliation issues.

## Behavioural / Delivery Questions

### 1. Tell me about a time you had tight sprint deadlines — how did you deliver?

*   **S:** The Online Statement feature for 2-year downloads had a regulatory deadline.
*   **T:** Deliver backend search + retrieval enhancements quickly.
*   **A:** I prioritised core functionality first, coordinated early with mobile teams, and removed blockers through quick technical spikes.
*   **R:** Delivered on time with zero post-release issues.

### 2. How do you communicate blockers to your team?

*   **Example:** During BRDT loader enhancements, I immediately flagged dependency delays on one PAG system, provided alternate solutions, and adjusted sprint scope.
*   **R:** Team stayed aligned and delivery remained predictable.

### 3. Tell me about a high-severity issue you resolved under pressure.

*   **S:** The Account Identifier MS started returning incorrect accountKey mappings.
*   **T:** Fix quickly to avoid downstream transaction failures.
*   **A:** I traced incorrect data to a corrupted cache layer and rebuilt the cache with guardrails.
*   **R:** Issue resolved in 10 minutes, no consumer impact.

### 4. How do you balance speed vs quality during sprint work?

*   **Example:** For Branch Info API enhancements, I delivered quickly while maintaining test coverage, added automated regression tests, and ensured contract tests ran on PRs.
*   **R:** Fast delivery with consistently high quality.
