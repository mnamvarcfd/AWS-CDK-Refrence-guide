import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path = require('path');
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';


export class ApiLambdaS3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


  const s3bucket = new Bucket(this, "cdk-s3bucket-morteza-id", {
      bucketName: "cdk-s3bucket-morteza",
  });


  const iams3bucketRole = new iam.Role(this, "cdk-iam-s3bucket-morteza-id", {
    roleName: "cdk-iam-s3bucket-morteza",
    assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    description: "iam role for s3 bucket assumed by lambda function",
  });
  iams3bucketRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonS3FullAccess"));
  

  const lambdaFunction = new lambda.Function(this, 'cdk-lambda.handler-id', {
    runtime: lambda.Runtime.NODEJS_14_X,
    code: lambda.Code.fromAsset(path.join(path.join(__dirname, '..', 'src'))),
    handler: 'cdk-lambda.handler',
    functionName: 'cdk-lambda',
    role: iams3bucketRole,
  });


  const cdk_ApiGateWay = new apigateway.LambdaRestApi(this, "cdk_ApiGateWay-id",{
    handler: lambdaFunction,
    proxy: false,
    restApiName: "cdk_ApiGateWay",
    deploy: true
  });
  const apiName = cdk_ApiGateWay.root.addResource("lambdaFunction");
  apiName.addMethod("GET");




  }
}
