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

export const addTag = (tag, id) => {
  console.log(`adding tag ${tag} to gif id ${id}`);
  return new Promise((resolve, reject) => {
    resolve();
  });
};

export const deleteTag = (tag, id) => {
  console.log(`deleting tag ${tag} from gif id ${id}`);
  return new Promise((resolve, reject) => {
    resolve();
  });
};
