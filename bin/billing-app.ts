#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BillingAppStack } from '../lib/billing-app-stack';

const app = new cdk.App();
new BillingAppStack(app, 'BillingAppStack', {


});