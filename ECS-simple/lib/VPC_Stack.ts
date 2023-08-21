import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class VPC_Stack extends cdk.Stack {

  public readonly vpc: ec2.Vpc; 

  constructor(scope: Construct, id: string, stackName: string, appName: string) {
    super(scope, id, {
      stackName: appName + '-' + stackName,  
    });

    const name = appName + '-' + stackName + 'VPC';

    this.vpc = new ec2.Vpc(this, name + '-id', {
      cidr: '10.0.0.0/16',
      maxAzs: 3,
      subnetConfiguration: [
        {
          name: 'PublicSubnet',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: 'PrivateSubnet',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED, 
          cidrMask: 24,
        },
      ],
      natGateways: 1,
      vpcName: name
    });

    new cdk.CfnOutput(this, 'VpcId', {
      value: this.vpc.vpcId,
    });
  }
}
