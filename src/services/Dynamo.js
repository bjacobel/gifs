import { AWS } from '../constants';

const dynamo = new AWS.API.DynamoDB();

export const getAllTags = () => {
  const queryParams = {
    TableName: AWS.DYNAMO_TABLE,
    ProjectionExpression: 'gif_id,tag,id'
  };

  return new Promise((resolve, reject) => {
    dynamo.scan(queryParams, (err, data) => {
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
    dynamo.putItem({
      TableName: AWS.DYNAMO_TABLE,
      Item: {
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
