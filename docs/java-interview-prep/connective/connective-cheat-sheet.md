---
title: Interview Prep Cheat Sheet
---

# NAB Senior Backend Developer Interview Prep Cheat Sheet

## Candidate: Vignashwar Veeramani
**Focus Areas:** Java, Spring Boot, Microservices, Payments (NPP), Cloud (AWS/Azure), CI/CD, Backend Systems

---

# KRA 1 – Backend Development & Release Management

### Technical Questions

**1. How do you design and build a scalable backend service?**  
- Define service boundaries (e.g., **Account Identifier MS**, **Branch Info**).
- Use microservices with REST APIs, event-driven patterns, and async messaging (Kafka).
- Optimize database schemas, caching strategies, and horizontal scaling.
- Example: EMS platform services handling high-volume banking transactions.

**2. How do you handle performance bottlenecks in microservices?**  
- Profiling & monitoring (New Relic, CloudWatch).
- Optimize queries and indexes (**Online Statement**).
- Add caching, async processing, circuit breakers, retries.
- Load test endpoints and adjust resources dynamically.

**3. Explain your approach to debugging complex production issues.**  
- Gather logs, reproduce in staging, trace across dependent services.
- Example: **BRDT File Loader** – traced routing logic to identify missing files and automated alerts.

**4. How do you design secure APIs?**  
- HTTPS, JWT/OAuth2, input validation, rate limiting, logging.
- Example: **Account Value Posting API** with secure debit/credit posting.

**5. CI/CD experience & improvements**  
- Tools: Jenkins, Harness, Git-based pipelines.
- Improvements: added SonarQube quality gates, automated deployment scripts, rollback mechanisms.

**6. Ensuring service stability and resilience**  
- Monitoring, alerting, retries, circuit breakers, fallback strategies.
- Proactive RCA to prevent recurrence (**Online Statement** downtime reduced 60%).

**7. 2nd/3rd level production support experience**  
- Handled high-severity incidents for EMS & NPP services.
- Worked with DevOps, infrastructure, and QA for resolution.

**8. Ensuring backward compatibility & versioning**  
- Version APIs, maintain old contracts for clients.
- Example: **Account Identifier MS** endpoints maintained legacy keys alongside new features.

**9. Major incident example**  
- **BRDT File Loader failure**: performed RCA, applied hotfix, automated monitoring, prevented repeat issues.

### Behavioural / Delivery-Focused Questions

- **Tight sprints:** Break work into achievable milestones, communicate clearly, prioritize high-impact tasks.
- **Blockers:** Highlight early in stand-ups, propose mitigations, escalate if needed.
- **Balancing speed vs quality:** Automated testing, code reviews, incremental releases.

---

# KRA 2 – Technical Leadership & Mentoring

### Technical / Leadership Questions

**1. Mentoring junior developers**  
- Pair programming, code reviews, knowledge sharing.
- Example: NPP team onboarding, new developers delivered tested endpoints in 3 weeks.

**2. Enforcing coding standards**  
- Create common guides, shared libraries (error handling), and enforce via PR checks.
- Example: Standardized REST APIs during mainframe migration for consistency.

---

# KRA 3 – Collaboration & Solution Design

### Technical / Collaboration Questions

**1. Collaborate with architects**  
- Define service boundaries, schemas, caching.
- Example: **EMS project** for **Account Identifier MS** & **Branch Info**.

**2. Seamless integration with front-end**  
- Define contracts (Swagger/OpenAPI), versioning, mock endpoints.
- Example: **Online Statement** feature for mobile teams.

**3. Agile ceremonies**  
- Actively participate, highlight blockers & dependencies.
- Example: **NPP platform** for **BRDT File Loader**.

**4. Handle conflicts (backend/frontend)**  
- Propose alternative solutions (e.g., async processing).
- Example: **Online Statement** real-time vs. async processing.

### Behavioural / Delivery-Focused Questions

- **Improve cross-team collaboration:** Daily syncs, shared docs. Example: GCS mainframe migration.
- **Ensure architectural standards:** Design reviews, validate contracts.
- **Handle new tech evaluation:** Research, POCs. Example: AI-assisted monitoring for **BRDT File Loader**.

---

# KRA 4 – Continuous Improvement & Innovation

### Technical / Improvement Questions

**1. Performance improvement**  
- Query optimization, caching, async.
- Example: **Online Statement** service response time reduced by 60%.

**2. Automate workflow**  
- Scripts for validation/routing.
- Example: **BRDT File Loader** manual effort reduced by 80%.

**3. Stay updated**  
- Blogs, webinars, sandbox experiments.

**4. Monitoring/observability tools**  
- CloudWatch, Prometheus, Grafana, New Relic.
- Used for **Account Value Posting**, **BRDT File Loader**.

**5. Introduce new tool/library**  
- Docker for local testing, Jenkins/Harness for CI/CD.

**6. AI-assisted tools**  
- GitHub Copilot for boilerplate/tests, ChatGPT for examples.

### Innovation / Behavioural Questions

- **Challenge existing process:** Proposed automation for manual validation. Example: **BRDT File Loader**.
- **Encourage innovation:** Knowledge sharing, POC time.
- **Introduce new tech:** Docker and CI/CD enhancements for NPP services.
