var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
var CognitoUserAttribute = AmazonCognitoIdentity.CognitoUserAttribute;

export const handler = (event, context, callback) => {
  const data = JSON.parse(event.body);

  let username = data.email;
  let password = data.password;


  // Define AWS Cognito User Pool
  var poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.USER_POOL_CLIENT_ID
  };
  var userPool = new CognitoUserPool(poolData);

  // Define User Attributes
  var attributeList = [];
  var dataEmail = {
    "Name": "email",
    "Value": username
  };
  var attributeEmail = new CognitoUserAttribute(dataEmail);
  attributeList.push(attributeEmail);

  // Create User via AWS Cognito
  userPool.signUp(username, password, attributeList, null, function (err, result) {
    if (err) {
      console.log('err:', err);
      context.done(err, null);
    } else {
      console.log('result:', result);
      context.done(null, result);
    }
  });

};