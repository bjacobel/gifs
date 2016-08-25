import AWS from 'aws-sdk-umd';
import shortid from 'shortid';

import DYNAMO_TABLE from '../constants/aws';

export const getAllTags = () => {
  return new Promise((resolve, reject) => {
    const dynamo = new AWS.DynamoDB();

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

export const addTag = (tag, id) => {
  return new Promise((resolve, reject) => {
    const dynamo = new AWS.DynamoDB({
      credentials: AWS.config.credentials
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

export const deleteTag = (id) => {
  return new Promise((resolve, reject) => {
    const dynamo = new AWS.DynamoDB({
      credentials: AWS.config.credentials
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
