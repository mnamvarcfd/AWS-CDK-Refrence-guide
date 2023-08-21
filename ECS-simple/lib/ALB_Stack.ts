
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2'; 
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Construct } from 'constructs';
import { VPC_Stack } from './VPC_Stack';

export class ALB_Stack extends cdk.Stack {

  public readonly albSecurityGroup: ec2.SecurityGroup;

  constructor(scope: Construct, id: string, name: string, VPC: VPC_Stack) {
    super(scope, id);


    const securityGroupALB = new ec2.SecurityGroup(this, 'cdk-ALB-ECS-sg', {
      vpc: VPC.vpc,
      allowAllOutbound: true,
      description: "Security group for ALB",
      securityGroupName: "ALB-sg",
    });


    securityGroupALB.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow HTTP traffic');
    securityGroupALB.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), 'Allow HTTPS traffic');
  

    const alb = new elbv2.ApplicationLoadBalancer(this, 'ECS-ALB-id', {
        vpc: VPC.vpc,
        internetFacing: true,  
        loadBalancerName: "ECS-ALB",
        deletionProtection: false,
        securityGroup: securityGroupALB,
        vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      });

      const targetGroup = new elbv2.ApplicationTargetGroup(this, 'ECS-ALB-TargetGroup', {
        vpc: VPC.vpc,
        port: 80, 
        targetType: elbv2.TargetType.IP, 
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
        targetGroups: [targetGroup],
      });
  

      this.albSecurityGroup = securityGroupALB;
}
}
