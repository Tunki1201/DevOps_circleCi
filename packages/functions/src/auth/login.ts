const AWS = require('aws-sdk');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
var AuthenticationDetails = AmazonCognitoIdentity.AuthenticationDetails;
var CognitoUser = AmazonCognitoIdentity.CognitoUser;

export const handler = (event, context, callback) => {
  const data = JSON.parse(event.body);

  let username = data.email;
  let password = data.password;


  var poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.USER_POOL_CLIENT_ID
  };
  var userPool = new CognitoUserPool(poolData);

  AWS.config.region = 'ap-southeast-1';
  // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  //   IdentityPoolId: identity_pool_id,
  // });

  var authenticationData = {
    Username: username,
    Password: password
  };
  var authenticationDetails = new AuthenticationDetails(authenticationData);

  var userData = {
    Username: username,
    Pool: userPool
  };

  var cognitoUser = new CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      console.log('access token + ' + result.getAccessToken().getJwtToken());
      context.done(null, result);
    },

    onFailure: function (err) {
      console.log('Login error: ' + err);
      context.done(err, null);
    }
  });

}        