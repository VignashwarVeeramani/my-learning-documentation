---
title: KRA 3 – Collaboration & Solution Design
---

# KRA 3 – Collaboration & Solution Design

## Technical / Collaboration Questions

### 1. How do you collaborate with architects to design scalable backend solutions?
*   **S:** During the EMS project at NAB, we were designing middleware services for mobile and internet banking.
*   **T:** Ensure services like **Account Identifier MS** and **Branch Info** scale to millions of requests.
*   **A:** I worked closely with the architecture team to define service boundaries, database schemas, message queues, caching strategies, and event-driven patterns. We used design reviews and diagrams to validate solutions.
*   **R:** Services were highly scalable, handled peak traffic with &lt;500ms response times, and adhered to enterprise architecture standards.

---

### 2. How do you ensure seamless integration with front-end teams?
*   **S:** For the **Online Statement** feature, mobile teams required APIs to fetch 2-year statements efficiently.
*   **T:** Provide APIs that are reliable, documented, and easy to consume.
*   **A:** I collaborated with front-end developers to define contract specifications, implemented Swagger/OpenAPI documentation, added versioning, and set up mock endpoints for parallel development.
*   **R:** Smooth integration, zero delays, and front-end teams could start development before backend was fully implemented.

---

### 3. How do you participate in sprint planning and agile ceremonies effectively?
*   **S:** On the NPP platform, multiple services had dependencies across teams.
*   **T:** Ensure accurate estimation and clear understanding of dependencies.
*   **A:** I actively participated in planning, retrospectives, and backlog grooming, highlighting potential blockers, inter-service dependencies, and required testing support for services like **BRDT File Loader**.
*   **R:** Sprint commitments were met consistently, and cross-team collaboration improved.

---

### 4. How do you handle conflicts between backend and frontend requirements?
*   **S:** Front-end team wanted real-time response for large statements, but backend processing for **Online Statement** could take time.
*   **T:** Balance technical feasibility with user experience.
*   **A:** Proposed async processing with notifications, caching frequently accessed statements, and pagination for large queries. Conducted demo to show benefits.
*   **R:** Solution accepted, satisfied front-end requirements without compromising backend stability.

---

### 5. How do you collaborate with other teams to resolve production issues?
*   **S:** A high-severity incident occurred where **BRDT File Loader** failed for a batch.
*   **T:** Resolve quickly while minimizing business impact.
*   **A:** Coordinated with infrastructure, QA, and DevOps teams, tracked logs end-to-end, applied a hotfix, and validated routing logic across 3 PAG systems.
*   **R:** Incident resolved in 20 minutes, and repeat incidents were prevented by automated monitoring and alerting.

---

### 6. How do you contribute to solution design and architecture?
*   Provide input on data models, service boundaries, and messaging patterns.
*   Suggest enhancements for scalability and reliability (e.g., retries, circuit breakers in **Account Value Posting**).
*   Document APIs, event flows, and integration points for cross-team clarity.
*   **R:** Designs were robust, easy to maintain, and reduced downstream defects.

---

## Behavioural / Delivery-Focused Questions

### 7. Tell me about a time you improved cross-team collaboration.
*   **S:** During the migration of legacy mainframe services to microservices for GCS, teams worked in silos.
*   **T:** Improve collaboration and reduce integration errors.
*   **A:** Established daily syncs, shared design documents, and introduced shared Slack channels for instant communication.
*   **R:** Integration errors reduced by 50%, and teams could deliver features faster.

---

### 8. How do you ensure delivered features meet architectural standards?
*   Conduct design reviews before implementation.
*   Validate service contracts against enterprise patterns.
*   Collaborate with architecture team for feedback loops.
*   **R:** All microservices adhered to architecture guidelines and were easy to maintain.

---

### 9. How do you handle new technology evaluation or innovation?
*   **S:** NAB explored AI-assisted monitoring for **BRDT File Loader**.
*   **T:** Evaluate feasibility and integrate improvements.
*   **A:** Researched AI tools for anomaly detection, implemented POC in sandbox, shared results with stakeholders.
*   **R:** Increased early detection of failed file uploads by 30%, and team adopted AI-enhanced monitoring across other services.
