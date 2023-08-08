import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Fn } from 'aws-cdk-lib';
import { Bucket, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { AnyPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class InfraStack extends cdk.Stack {
  SpotPhotoBucket: any;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    
    // const s3bucket = new s3.Bucket(this, 'bucketmortezanam1402', {
    //   bucketName: 'my-bucketmortezanam1402',
    //   versioned: false,
    //   // publicReadAccess: false,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,      
    //   accessControl: s3.BucketAccessControl.PUBLIC_READ,
    //   publicReadAccess: true,
    //   blockPublicAccess: {
    //     blockPublicAcls: false,
    //     blockPublicPolicy: false,
    //     ignorePublicAcls: false,
    //     restrictPublicBuckets: false,
    //   },
    // });



    const s3bucket = new Bucket(this, "SpotPhotoBucket", {
      bucketName: "spot-photo-bucket-12311258887",
      cors: [{
          allowedMethods: [
              HttpMethods.PUT,
              HttpMethods.GET,
              HttpMethods.POST,
          ],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"]   
      }],
      publicReadAccess: true,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }
  });



  // Bucket policy to allow public read access
  s3bucket.addToResourcePolicy(
      new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['s3:GetObject'],
          principals: [new AnyPrincipal()],
          resources: [s3bucket.arnForObjects('*')],
      })
  );



  }
}
