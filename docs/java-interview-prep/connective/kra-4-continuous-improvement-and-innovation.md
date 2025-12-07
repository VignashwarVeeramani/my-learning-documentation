---
title: KRA 4 – Continuous Improvement & Innovation
---

# KRA 4 – Continuous Improvement & Innovation

## Technical / Improvement Questions

### 1. Tell me about a performance improvement you implemented in a system.
*   **S:** On the **Online Statement** service, customers were experiencing slow response times when fetching large statements.
*   **T:** Improve response time while maintaining data integrity.
*   **A:** Implemented query optimization, caching frequently accessed statements, and added asynchronous processing for large requests.
*   **R:** Reduced response time by 60% and improved customer satisfaction.

---

### 2. What process or workflow have you automated in your team?
*   **S:** On the **BRDT File Loader** process, manual file routing and validation across 3 PAG systems caused delays.
*   **T:** Automate file validation and routing.
*   **A:** Built automation scripts to check file presence, identify the correct PAG, and trigger uploads. Integrated with monitoring for automatic alerts on failures.
*   **R:** Reduced manual intervention by 80% and cut incident resolution time by 50%.

---

### 3. How do you stay updated with new tools, frameworks, or technologies?
*   Follow industry blogs, tech newsletters, and community forums.
*   Participate in webinars and internal knowledge-sharing sessions.
*   Experiment with new tools in sandbox environments, e.g., Kafka updates, Spring Boot features.

---

### 4. What monitoring/observability tools have you used and how did you use them?
*   **CloudWatch & Prometheus:** Monitored microservice health and system metrics.
*   **Grafana:** Visualized key performance indicators for **Account Value Posting** and **BRDT File Loader**.
*   **New Relic:** Tracked API latency and error rates.
*   **Result:** Faster detection of anomalies, proactive resolution, and improved MTTR.

---

### 5. Describe an example where you introduced a new tool or library that improved efficiency.
*   **S:** Team struggled with repetitive deployments and inconsistent environment setups.
*   **T:** Standardize deployments and improve efficiency.
*   **A:** Introduced Docker-based containerization for local testing and CI/CD pipelines, automated deployments with Jenkins/Harness.
*   **R:** Reduced deployment errors by 40% and accelerated development velocity.

---

### 6. Have you used AI-assisted tools in development (GitHub Copilot, ChatGPT, etc.)?
*   **A:** Yes, I’ve used GitHub Copilot for code suggestions, boilerplate generation, and writing unit test stubs. Also experimented with ChatGPT for quick API integration examples and automation script templates.
*   **R:** Improved coding speed, reduced boilerplate errors, and enhanced team productivity.

---

### 7. What’s your approach to improving service reliability and resilience?
*   Implement retries, circuit breakers, and fallback strategies.
*   Set up automated alerts and dashboards for early anomaly detection.
*   Conduct post-incident reviews and implement preventive fixes.
*   Collaborate with DevOps to scale resources dynamically.
*   **Result:** Reduced recurring incidents by 60% across services like **Account Identifier MS** and **BRDT File Loader**.

---

## Innovation / Behavioural Questions

### 8. Tell me about a time you challenged an existing process and improved it.
*   **S:** The manual validation of BRDT files was slow and error-prone.
*   **T:** Improve efficiency and reliability.
*   **A:** Proposed and implemented automated file checking and routing across PAG systems.
*   **R:** Reduced manual effort by 80%, increased processing speed, and minimized errors.

---

### 9. How do you encourage innovation within your team?
*   Share knowledge about new frameworks, tools, and cloud capabilities.
*   Allocate time for small experiments or POCs.
*   Celebrate adoption of ideas that improve performance, automation, or code quality.

---

### 10. Tell me about a new technology you introduced to your team and its impact.
*   **S:** We faced inconsistencies in deployment environments for NPP services.
*   **T:** Standardize deployments and reduce integration issues.
*   **A:** Introduced Docker and containerized local environments along with CI/CD pipeline enhancements using Jenkins and Harness.
*   **R:** Faster, reliable deployments; improved testing confidence; reduced post-release incidents.
