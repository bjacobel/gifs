import { AWS } from '../constants';
import shortid from 'shortid';

export const getAllTags = () => {
  return new Promise((resolve, reject) => {
    const dynamo = new AWS.API.DynamoDB();

    dynamo.scan({
      TableName: AWS.DYNAMO_TABLE,
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
    const dynamo = new AWS.API.DynamoDB({
      credentials: AWS.API.config.credentials
    });

    const uuid = shortid.generate();

    dynamo.putItem({
      TableName: AWS.DYNAMO_TABLE,
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
    const dynamo = new AWS.API.DynamoDB({
      credentials: AWS.API.config.credentials
    });
    dynamo.deleteItem({
      TableName: AWS.DYNAMO_TABLE,
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
