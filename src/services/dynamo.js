import AWS from 'aws-sdk-umd';
import shortid from 'shortid';

import {
  DYNAMO_TABLE,
  REGION
} from '../constants/aws';

export const getAllTags = (authInfo) => {
  return new Promise((resolve, reject) => {
    const dynamo = new AWS.DynamoDB({
      region: REGION,
      credentials: new AWS.CognitoIdentityCredentials(authInfo.params)
    });

    dynamo.scan({
      TableName: DYNAMO_TABLE,
      ProjectionExpression: 'gif_id,tag,id'
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const addTag = (tag, id, authInfo) => {
  return new Promise((resolve, reject) => {
    const dynamo = new AWS.DynamoDB({
      region: REGION,
      credentials: new AWS.CognitoIdentityCredentials(authInfo.params)
    });

    const uuid = shortid.generate();

    dynamo.putItem({
      TableName: DYNAMO_TABLE,
      Item: {
        id: { S: uuid },
        gif_id: { S: id },
        tag: { S: tag }
      }
    }, (err) => {
      if (err) {
        reject(err);
      } else {
        // Data returned by dynamo.putItem is null, so just make it up
        resolve({
          id: uuid,
          gif_id: id,
          tag
        });
      }
    });
  });
};

export const deleteTag = (id, authInfo) => {
  return new Promise((resolve, reject) => {
    const dynamo = new AWS.DynamoDB({
      region: REGION,
      credentials: new AWS.CognitoIdentityCredentials(authInfo.params)
    });
    dynamo.deleteItem({
      TableName: DYNAMO_TABLE,
      Key: {
        id: { S: id }
      }
    }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(id);
      }
    });
  });
};
