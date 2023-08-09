import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path = require('path');
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';



export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new lambda.Function(this, 'Lambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset(path.join(path.join(__dirname, '..', 'src'))),
      handler: 'cdk-lambda.handler',
      functionName: 'cdk-lambda',
    });


    const cloudWachange = new cloudwatch.Alarm(this, 'cdk-CloudWatchId', {
      metric: lambdaFunction.metricErrors(),
      threshold: 1,
      evaluationPeriods: 5,
    });
  }
}