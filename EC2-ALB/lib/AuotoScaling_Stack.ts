import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { VPC_Stack } from './VPC_Stack';
import { SecurityGroup_Stack } from './SecurityGroup_Stack';
import { AutoScalingGroup } from 'aws-cdk-lib/aws-autoscaling';
import { Duration } from 'aws-cdk-lib';

export class AuotoScaling_Stack extends cdk.Stack {
    
  public readonly autoScalingGroup: AutoScalingGroup; 

  constructor(scope: Construct, id: string, stackName: string, appName: string, machinName: string, VPC: VPC_Stack) {
    super(scope, id, {
        stackName: appName + '-' + stackName,  
      });

    const ASG  = new AutoScalingGroup(this, 'ASG-id', {
      autoScalingGroupName: appName + '-' + machinName + '-ASG',
      vpc: VPC.vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.NANO),
      machineImage: new ec2.AmazonLinuxImage({ generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2 }),
      allowAllOutbound: true,
      maxCapacity: 2,
      minCapacity: 2,
      desiredCapacity: 2,
    });
    
    ASG.scaleOnCpuUtilization("CpuScaling", {
      targetUtilizationPercent: 50,
      cooldown: Duration.minutes(1),
      estimatedInstanceWarmup: Duration.minutes(1),
    });
      
    this.autoScalingGroup = ASG;
  }
}