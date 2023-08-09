# AWS CI-CD by CDK:

1- Bootstrap AWS environment:
To use the AWS Cloud Development Kit (CDK) to bootstrap your environment for deploying infrastructure.

`npx cdk bootstrap aws://<account_number>/<region> --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess`

2- Initialize project:

`git clone <github-clone-url> <your-project-name>'
git clone https://github.com/mnamvarcfd/AWS-CDK-Refrence-guide.git CI_CD_cdk
