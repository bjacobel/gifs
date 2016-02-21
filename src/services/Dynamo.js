import { AWS } from '../constants';

export const getAllTags = () => {
  const dynamo = new AWS.API.DynamoDB();

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

// export const getIdsForTag = (tag) => {
// };

// export const addTag = (id, tag) => {
// };

// export const removeTag = (id, tag) => {
// };
