import AWS from 'aws-sdk/global';
import AWSDynamoDB from 'aws-sdk/clients/dynamodb';
import shortid from 'shortid';

import {
  DYNAMO_TABLE,
  REGION,
} from '../constants/aws';

export const getAllTags = (authInfo) => {
  const dynamo = new AWSDynamoDB({
    region: REGION,
    credentials: new AWS.CognitoIdentityCredentials(authInfo.params),
  });

  return dynamo.scan({
    TableName: DYNAMO_TABLE,
    ProjectionExpression: 'gif_id,tag,id',
  }).promise();
};

export const addTag = (tag, id, authInfo) => {
  const dynamo = new AWSDynamoDB({
    region: REGION,
    credentials: new AWS.CognitoIdentityCredentials(authInfo.params),
  });

  const uuid = shortid.generate();

  return dynamo.putItem({
    TableName: DYNAMO_TABLE,
    Item: {
      id: { S: uuid },
      gif_id: { S: id },
      tag: { S: tag },
    },
  }).promise()
    .then(() => ({
      // Data returned by dynamo.putItem is null, so just make it up
      id: uuid,
      gif_id: id,
      tag,
    }));
};

export const deleteTag = (id, authInfo) => {
  const dynamo = new AWSDynamoDB({
    region: REGION,
    credentials: new AWS.CognitoIdentityCredentials(authInfo.params),
  });

  return dynamo.deleteItem({
    TableName: DYNAMO_TABLE,
    Key: {
      id: { S: id },
    },
  }).promise()
    .then(() => id);
};
