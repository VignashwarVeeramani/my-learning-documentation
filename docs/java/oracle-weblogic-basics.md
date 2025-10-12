# Oracle WebLogic Server Basics

This document provides a high-level overview of Oracle WebLogic's core concepts and lists common commands for basic server administration.

## What is WebLogic?

At its core, **Oracle WebLogic Server** is a powerful and widely-used **Java Application Server**. Think of it as a robust container and a set of services for running large-scale, multi-tier enterprise applications built in Java.

Its main job is to host and manage your Java applications, handling complex things like database connections, security, messaging, and transaction management so your developers can focus on writing business logic.

## Core Concepts

### 1. The Domain

The **Domain** is the most basic administrative unit in WebLogic. It's a collection of all the related servers, applications, services, and security configurations that you manage as a single unit.

### 2. The Admin Server

Every domain has exactly one **Admin Server**. This is the central brain of the domain. You use the Admin Server to:
*   Configure all other servers in the domain.
*   Deploy your applications.
*   Monitor the health and performance of the entire domain.

You typically interact with the Admin Server through a web-based interface called the **Administration Console**.

### 3. Managed Servers

While the Admin Server handles management, the **Managed Servers** do the actual work. These are the server instances where your Java applications (like `.war` or `.ear` files) are deployed and run. They host the business logic and services that your end-users interact with.

### 4. Clusters

A **Cluster** is a group of Managed Servers that work together. This is one of WebLogic's most powerful features. By clustering servers, you get:
*   **Scalability:** If your application gets more traffic, you can add more Managed Servers to the cluster to share the load.
*   **High Availability & Failover:** If one Managed Server in the cluster crashes, the others can take over its workload. This ensures your application stays online without interruption.

### 5. Node Manager

The **Node Manager** is a separate utility that runs on a physical or virtual machine. Its job is to look after the server instances on that machine. It's responsible for:
*   Starting, stopping, and restarting Admin and Managed Servers remotely.
*   Monitoring the health of servers and automatically restarting them if they fail.

---

## Common Commands & Operations

These commands are typically run from the command line within your WebLogic domain directory. The default location for domain scripts is usually `<ORACLE_HOME>/user_projects/domains/<YOUR_DOMAIN_NAME>/bin`.

### Starting the Admin Server

This script starts the central administration server for your domain.

*   **Linux/macOS**:
    ```bash
    ./startWebLogic.sh
    ```
*   **Windows**:
    ```bash
    startWebLogic.cmd
    ```

### Starting a Managed Server

This script starts a specific managed server, which will then contact the Admin Server.

*   **Linux/macOS**:
    ```bash
    ./startManagedWebLogic.sh <MANAGED_SERVER_NAME> http://<ADMIN_HOST>:<ADMIN_PORT>
    ```
*   **Windows**:
    ```bash
    startManagedWebLogic.cmd <MANAGED_SERVER_NAME> http://<ADMIN_HOST>:<ADMIN_PORT>
    ```

### Starting the Node Manager

The Node Manager must be running on a machine to allow the Admin Server to start/stop servers on it.

*   **Linux/macOS**:
    ```bash
    ./startNodeManager.sh
    ```
*   **Windows**:
    ```bash
    startNodeManager.cmd
    ```

### Accessing the Admin Console

Once the Admin Server is running, you can access the web console using the following URL format:

```
http://<ADMIN_HOST>:<ADMIN_PORT>/console
```