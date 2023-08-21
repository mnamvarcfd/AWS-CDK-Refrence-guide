import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { VPC_Stack } from './VPC_Stack';
import { SecurityGroup_Stack } from './SecurityGroup_Stack';

export class EC2_Stack extends cdk.Stack {
    
  public readonly EC2: ec2.Instance; 


  constructor(scope: Construct, id: string, stackName: string, appName: string, machinName: string, VPC: VPC_Stack, SG: SecurityGroup_Stack) {
    super(scope, id, {
        stackName: id,  
      });

    const instance = new ec2.Instance(this, id , {
        instanceName: machinName,
        vpc: VPC.vpc,   
        vpcSubnets: {
            subnetType: ec2.SubnetType.PUBLIC, // Associate the instance with a public subnet
        },
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.NANO),
        machineImage: new ec2.AmazonLinuxImage({ generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2 }),
        securityGroup: SG.SecurityGroup,   
    });
    
    instance.addUserData(
        '#!/bin/bash',
        '# Use this for your user data (script from top to bottom)',
        '# install httpd (Linux 2 version)',
        'yum update -y',
        'yum install -y httpd',
        'systemctl start httpd',
        'systemctl enable httpd',
        `echo "<h1>Hello from $(hostname -f)</h1>" > /var/www/html/index.html`
      );

      this.EC2 = instance;
      
  }
}