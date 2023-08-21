#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VPC_Stack } from '../lib/VPC_Stack';
import { SecurityGroup_Stack } from '../lib/SecurityGroup_Stack';
import { EC2_Stack } from '../lib/EC2_Stack';
import { TargetGroup_Stack } from '../lib/TargetGroup_Stack';
import { ALB_Stack } from '../lib/ALB_Stack';
import * as elbv2_targets from 'aws-cdk-lib/aws-elasticloadbalancingv2-targets';

const app = new cdk.App();

const VPC = new VPC_Stack(app, "EC2ALB-VPC-id", "EC2ALB", "VPC");

const SG = new SecurityGroup_Stack(app, "EC2ALB-SG-id", "EC2ALB", "SG", VPC);

const EC2_first = new EC2_Stack(app, "EC2ALB-EC2-id1", "EC2ALB", "EC2", "first_EC2", VPC, SG);
const EC2_secnd = new EC2_Stack(app, "EC2ALB-EC2-id2", "EC2ALB", "EC2", "secnd_EC2", VPC, SG);
   
const ALB = new ALB_Stack(app, "EC2ALB-ALB-id", "EC2ALB", "ALB", VPC, SG);

const EC2_first_Target = new elbv2_targets.InstanceTarget(EC2_first.EC2, 80);
const EC2_secnd_Target = new elbv2_targets.InstanceTarget(EC2_secnd.EC2, 80);

ALB.targetGroup.addTarget(EC2_first_Target, { weight: 1 });
ALB.targetGroup.addTarget(EC2_secnd_Target, { weight: 1 });

   