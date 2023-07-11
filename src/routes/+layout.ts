import { Amplify } from 'aws-amplify';
import { PUBLIC_APP_REGION, PUBLIC_USER_POOL_CLIENT_ID, PUBLIC_USER_POOL_ID } from '$env/static/public';

let userPoolId = PUBLIC_USER_POOL_ID;
if (!/^[\w-]+_[0-9a-zA-Z]+$/.test(userPoolId)) {
    userPoolId = 'temp_poolId';
}

Amplify.configure({
    Auth: {
        region: PUBLIC_APP_REGION,
        userPoolId: userPoolId,
        userPoolWebClientId: PUBLIC_USER_POOL_CLIENT_ID,
    },
});