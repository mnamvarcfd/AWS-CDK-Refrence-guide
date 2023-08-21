
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2'; 
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Construct } from 'constructs';
import { VPC_Stack } from './VPC_Stack';
import { SecurityGroup_Stack } from './SecurityGroup_Stack';

export class ALB_Stack extends cdk.Stack {

  public readonly targetGroup: elbv2.ApplicationTargetGroup;

  public readonly albSecurityGroup: ec2.SecurityGroup;

  constructor(scope: Construct, id: string, stackName: string, appName: string, VPC: VPC_Stack, SG: SecurityGroup_Stack) {
    super(scope, id, {
      stackName: appName + '-' + stackName,  
    });

    const name = appName + '-' + stackName + 'ALB';
    const alb = new elbv2.ApplicationLoadBalancer(this, name + '-ALB-id', {
        vpc: VPC.vpc,
        vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
        internetFacing: true,  
        loadBalancerName: name,
        deletionProtection: false,
        securityGroup: SG.SecurityGroup,
      });

      const TG = new elbv2.ApplicationTargetGroup(this, name + '-TargetGroup-id', {
        targetGroupName: name,
        vpc: VPC.vpc,
        port: 80, 
        targetType: elbv2.TargetType.INSTANCE,
        healthCheck: {
          path: '/', 
          port: '80', 
        },
      });



      const httplistener = alb.addListener('httplistener', {
        port: 80,
        open: true,
      });
  

      httplistener.addTargetGroups('TargetGroups', {
        targetGroups: [TG],
      });
  
      this.targetGroup = TG;
}
}
