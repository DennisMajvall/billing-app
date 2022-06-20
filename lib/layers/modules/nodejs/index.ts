declare global {
  type File = unknown
  type Blob = unknown
}

export { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
export { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
export * from '@aws-sdk/lib-dynamodb';
