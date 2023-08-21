#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VPC_Stack } from '../lib/VPC_Stack';
import { ECS_Stack } from '../lib/ECS_Stack';
import { ALB_Stack } from '../lib/ALB_Stack';

const app = new cdk.App();


const VPC = new VPC_Stack(app, "ECS-VPC-id", "ECS", "VPC");

const ALB = new ALB_Stack(app, "ECS-ALB-id", "ECS", "ALB", VPC);

const ECS = new ECS_Stack(app, "ECS-ECS-id", "ECS", "ECS", VPC, ALB);



app.synth()