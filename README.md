# NAGP Kubernetes DevOps FinOps Assignment

# NAGP Kubernetes Assignment

## Overview

This project demonstrates deployment of a Node.js Employee API and PostgreSQL database on Google Kubernetes Engine (GKE) using Kubernetes best practices.

The solution includes:

* Dockerized Node.js application
* PostgreSQL database
* Kubernetes Deployments
* Kubernetes Services
* ConfigMaps
* Secrets
* Persistent Volumes
* Horizontal Pod Autoscaler (HPA)
* Ingress for external access
* Rolling Update strategy
* Self-Healing capability
* FinOps resource optimization using Requests and Limits

---

## Repository

GitHub Repository:

https://github.com/learnerabrol/nagp-k8s-assignment

---

## Docker Image

Docker Hub Repository:

https://hub.docker.com/repository/docker/manasabrol/employee-api

Docker Image:

```bash
manasabrol/employee-api:v1
```

---

## Service API URL

Employee API Endpoint:

http://8.233.145.206/employees

Sample Response:

```json
[
  {
    "id": 1,
    "name": "John Smith",
    "department": "Engineering",
    "salary": "85000.00"
  },
  {
    "id": 2,
    "name": "Alice Johnson",
    "department": "HR",
    "salary": "65000.00"
  },
  {
    "id": 3,
    "name": "Robert Brown",
    "department": "Finance",
    "salary": "72000.00"
  },
  {
    "id": 4,
    "name": "Emily Davis",
    "department": "Marketing",
    "salary": "68000.00"
  },
  {
    "id": 5,
    "name": "Michael Wilson",
    "department": "Engineering",
    "salary": "92000.00"
  }
]
```

---

## Architecture

```text
Internet
    |
    v
Ingress (GKE Load Balancer)
    |
    v
Employee API Service
    |
    v
Employee API Pods (4 Replicas)
    |
    v
PostgreSQL Service
    |
    v
PostgreSQL Pod
    |
    v
Persistent Volume Claim
```

---

## Kubernetes Components

### Namespace

```text
nagp
```

### Deployments

* employee-api (4 replicas)
* postgres (1 replica)

### Services

* employee-api-service
* postgres-service

### Storage

* PersistentVolumeClaim (postgres-pvc)

### Configuration

* ConfigMap (app-config)
* Secret (app-secret)
* Secret (postgres-secret)

### Autoscaling

* Horizontal Pod Autoscaler
* Min Replicas: 4
* Max Replicas: 10
* Target CPU Utilization: 50%

### Ingress

* GKE HTTP Load Balancer
* External Access Enabled

---

## FinOps Considerations

Resource requests and limits are configured for the API deployment.

### Requests

```yaml
cpu: 100m
memory: 128Mi
```

### Limits

```yaml
cpu: 500m
memory: 512Mi
```

Benefits:

* Prevents resource overconsumption
* Improves cluster utilization
* Controls cloud costs
* Supports predictable scaling

---

## Deployment Strategy

The application uses Kubernetes Rolling Updates.

Benefits:

* Zero or minimal downtime
* Controlled deployment rollout
* Automatic replacement of old pods
* Increased application availability

Verification Command:

```bash
kubectl rollout status deployment/employee-api -n nagp
```

---

## Self-Healing Demonstration

Application pod deletion automatically triggers pod recreation.

Example:

```bash
kubectl delete pod <employee-api-pod> -n nagp
```

Kubernetes automatically creates a replacement pod to maintain desired replica count.

---

## Persistence Demonstration

PostgreSQL uses Persistent Volume Claims (PVC).

Verification Steps:

1. Insert/View data in PostgreSQL
2. Delete PostgreSQL pod
3. Wait for pod recreation
4. Verify data still exists

Example:

```bash
kubectl delete pod <postgres-pod> -n nagp
```

Data remains intact after pod recreation.

---

## Screen Recording Video

The screen recording demonstrates:

* Connection from VM to GKE Cluster
* All Kubernetes objects deployed and running
* Deployments, Pods, Services, PVC, HPA, Ingress
* API call retrieving records from PostgreSQL
* Self-healing by deleting Employee API pod
* Automatic pod regeneration
* Persistence by deleting PostgreSQL pod
* Database recovery with retained records
* Rolling deployment strategy
* FinOps resource requests and limits
* End-to-end Kubernetes deployment

Video Link:

```text
https://tinyurl.com/5n7kuyez
```

---

## Useful Commands

### View Deployments

```bash
kubectl get deployment -n nagp
```

### View Pods

```bash
kubectl get pods -n nagp
```

### View Services

```bash
kubectl get svc -n nagp
```

### View HPA

```bash
kubectl get hpa -n nagp
```

### View Ingress

```bash
kubectl get ingress -n nagp
```

### View PVC

```bash
kubectl get pvc -n nagp
```

### Test API

```bash
curl http://8.233.145.206/employees
```

---

## Author

Manas Abrol

NAGP Kubernetes Assignment
