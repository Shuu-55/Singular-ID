
---
<p align="center"><h1>Minor Project: Singular-ID</h1></p>

## Overview

Singular-ID is a document storage system where users can store and access documents using unique user IDs. Users have the flexibility to change their unique IDs at will.

## Tech Stack

### Server-Side

- **Node.js**: Backend Runtime
- **Express.js**: Backend API
- **MongoDB**: Database

### Frontend

- **HTML**
- **CSS**
- **JavaScript**

### Docker Image

[Docker Image](https://hub.docker.com/repository/docker/vaibhavrawat/singular-id/)

## Infrastructure Provisioning

Before setting up the infrastructure, ensure that you have configured the AWS CLI and installed Terraform on your system. [Install Terraform](https://developer.hashicorp.com/terraform/downloads)

### Steps to Replicate Infrastructure:

1. Navigate to the `iac/terraform` directory:

    ```bash
    cd iac/terraform
    ```

2. Initialize the Terraform backend (use the latest version):

    ```bash
    terraform init
    ```

3. Check the resources to be created:

    ```bash
    terraform plan
    ```

4. Apply the changes and provision the infrastructure defined in `main.tf`:

    ```bash
    terraform apply
    ```

## Configuration Management

Before managing configurations, ensure that you have installed Ansible on your local system. [Install Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)

### Steps to Manage Configurations:

1. Navigate to the `iac/ansible` directory:

    ```bash
    cd iac/ansible
    ```

2. Manage the configurations using the following command:

    ```bash
    ansible-playbook -i hosts.ini to-do.yaml
    ```

## SSH Access

You can SSH into the instance to check the configurations:

```bash
ssh -i "Ansible_access.pem" ubuntu@ec2-13-201-200-179.ap-south-1.compute.amazonaws.com
```

---

