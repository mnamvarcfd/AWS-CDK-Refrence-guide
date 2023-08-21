
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2'; 
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Construct } from 'constructs';
import { VPC_Stack } from './VPC_Stack';

export class TargetGroup_Stack extends cdk.Stack {

  public readonly targetGroup: elbv2.ApplicationTargetGroup;

  constructor(scope: Construct, id: string, stackName: string, appName: string, VPC: VPC_Stack) {
    super(scope, id, {
      stackName: appName + '-' + stackName,  
    });

    const name = appName + '-' + stackName + '-TargetGroup';
    const TG = new elbv2.ApplicationTargetGroup(this, name + '-id', {
      targetGroupName: name,
      vpc: VPC.vpc,
      port: 80, 
      targetType: elbv2.TargetType.INSTANCE,
      healthCheck: {
        path: '/', 
        port: '80', 
      },
    });
    
    this.targetGroup = TG;
}
}
