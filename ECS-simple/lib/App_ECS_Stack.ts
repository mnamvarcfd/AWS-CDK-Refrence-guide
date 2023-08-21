
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { VPC_Stack } from './VPC_Stack';
import * as ec2 from 'aws-cdk-lib/aws-ec2'; 
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { ECS_Stack } from './ECS_Stack';


export class App_ECS_Stack extends cdk.Stack {

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    // const VPC = new VPC_Stack(this, "ECS_Stack-VPC-id", "ECS-Stack-VPC");

    // const ECS = new ECS_Stack(this, "ECS-Stack-ECS-id", "ECS-Stack-ECS", VPC);

    
  }
}



