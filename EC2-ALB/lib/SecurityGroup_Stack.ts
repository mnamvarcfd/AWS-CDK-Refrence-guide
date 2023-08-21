
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { VPC_Stack } from './VPC_Stack';

export class SecurityGroup_Stack extends cdk.Stack {

    public readonly SecurityGroup: ec2.SecurityGroup; 
  
    constructor(scope: Construct, id: string, stackName: string, appName: string, VPC: VPC_Stack) {
        super(scope, id, {
            stackName: appName + '-' + stackName
          });

        const name = appName + '-' + stackName + 'SG_base';
        const SG_base = new ec2.SecurityGroup(this, name+'-id', {
            securityGroupName: name,
            vpc: VPC.vpc,
            description: 'Allow HTTP access to ec2 instances',
            allowAllOutbound: true,
            disableInlineRules: true
        });
        
        SG_base.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow HTTP traffic');
        // securityGroupALB.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), 'Allow HTTPS traffic');

        this.SecurityGroup = SG_base;
    }
}
