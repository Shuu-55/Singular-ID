Minor Project : Singular-ID
We have creating a document storage where people can store and see other peoples documents using the unique id of the user which can be changed at the will of the document holder.

Server side tech stack- Node.js as Backend Runtime, Express.js for backend API and MongoDB as our Database

For frontend Html, css and Js 
For docker image click here

Setup for IaC
Infrastructure Provisioning
Before following the setups, first configure the aws-cli, and install terraform in your from here

Now, follow the steps below to replicate the infrastructure:

Go to the iac/terraform directory:

cd iac/terraform
Initialize the backend for terraform(use latest version):

terraform init
To check for the resources being created:

terraform plan
Finally, apply the changes and the infrastructure mentioned in the main.tf file:

terraform apply
Configuration Management
Before following the setups, first install ansible in your local system, from here

Now, follow the steps below to manage the latest configurations:

Go to the iac/ansible directory:

cd iac/anisble
Manage the configuration by this simple command:

ansible-playbook -i hosts.ini to-do.yaml
We can SSH into the instance, to check for the configurations:
ssh -i "Ansible_access.pem" ubuntu@ec2-13-201-200-179.ap-south-1.compute.amazonaws.com
