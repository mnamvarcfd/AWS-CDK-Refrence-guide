
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class VPC_Stack extends cdk.Stack {

  public readonly vpc: ec2.Vpc; 

  constructor(scope: Construct, id: string, stackName: string) {
    super(scope, id, {
      stackName: stackName,  
    });

   
    this.vpc = new ec2.Vpc(this, 'cdk-vpc-id', {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),   
      maxAzs: 3,   
      subnetConfiguration: [
        {
          name: 'PublicSubnet',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24, //IPs in Range - 256
        },
        {
          name: "Private",
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
          cidrMask: 24, //IPs in Range - 256
        },
      ],
      vpcName: "ECS_VPC"
    });
 
    new cdk.CfnOutput(this, 'VpcId', {
      value: this.vpc.vpcId,
    });
  }
}