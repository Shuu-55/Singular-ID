terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.34.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"
}


resource "aws_security_group" "singular_id_security_group" {
  name        = "singular_id_security_group"
  description = "Security group for singular id instance"

  ingress {
    from_port   = 4000
    to_port     = 4000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "singular_id_security_group"
  }
}

resource "aws_instance" "singular_id_instance" {
  ami                    = "ami-007020fd9c84e18c7"
  instance_type          = "t2.micro"
  vpc_security_group_ids = [aws_security_group.singular_id_security_group.id]
  # key_name               = "my-ssh-key"

  root_block_device {
    volume_size = 30
  }

  tags = {
    Name = "singular_id_instance"
  }
}

resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.singular_id_instance.id
  allocation_id = "eipalloc-03fd3c82d599070fd"
}
