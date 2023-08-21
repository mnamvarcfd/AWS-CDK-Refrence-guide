#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { App_ECS_Stack } from '../lib/App_ECS_Stack';
import { VPC_Stack } from '../lib/VPC_Stack';
import { ECS_Stack } from '../lib/ECS_Stack';
import { ALB_Stack } from '../lib/ALB_Stack';

const app = new cdk.App();


const VPC = new VPC_Stack(app, "ECS_Stack-VPC-id", "ECS-Stack-VPC", );

const ALB = new ALB_Stack(app, "ECS-Stack-ALB-id", "ECS-Stack-ALB", VPC);

const ECS = new ECS_Stack(app, "ECS-Stack-ECS-id", "ECS-Stack-ECS", VPC, ALB.albSecurityGroup);




app.synth()