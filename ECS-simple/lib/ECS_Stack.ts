import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { VPC_Stack } from './VPC_Stack';
import { ALB_Stack } from './ALB_Stack';


export class ECS_Stack extends cdk.Stack {
 
  constructor(scope: Construct, id: string, stackName: string, appName: string, VPC: VPC_Stack, ALB: ALB_Stack) {
    super(scope, id, {
        stackName: stackName, 
    });

    const cluster = new ecs.Cluster(this, 'ECSCluster-id', {
        clusterName: "ECSCluster",
        enableFargateCapacityProviders: true,
        vpc: VPC.vpc,
    });
   
    const taskDefinition = new ecs.FargateTaskDefinition(this, 'ECS-TaskDefinition-test-id');

    const container = taskDefinition.addContainer('ECS-Container-test', {
      image: ecs.ContainerImage.fromRegistry('nginxdemos/hello'),
      cpu: 256,
      memoryLimitMiB: 512,
      essential: true, 
    });
  

    container.addPortMappings({
      containerPort: 80, 
    });

    const ecsSG = new ec2.SecurityGroup(this, "ECS-SecurityGroup", {
      vpc: VPC.vpc,
      allowAllOutbound: true,
    });

    ecsSG.addIngressRule(
      ALB.albSecurityGroup,
      ec2.Port.tcp(80)
    );
 
    

    const service = new ecs.FargateService(this, 'ECS-FargateService-test', {
      cluster : cluster,
      taskDefinition: taskDefinition,
      securityGroups: [ecsSG],
    });

  }
}
