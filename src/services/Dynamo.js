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

    dynamo.putItem({
      TableName: AWS.DYNAMO_TABLE,
      Item: {
        id: { S: shortid.generate() },
        gif_id: { S: id },
        tag: { S: tag }
      }
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const deleteTag = (tag, id) => {
  console.log(`deleting tag ${tag} from gif id ${id}`);
  return new Promise((resolve) => {
    resolve();
  });
};
