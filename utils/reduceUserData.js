const _ = require('lodash');
module.exports = function reduceUserData(userDetails) {
  return {
    ..._.pick(userDetails, [
      'id',
      'accessToken',
      'refreshToken',
      'dormantUser',
      'isAdmin',
      'firstName',
      'lastName',
      'role',
      'profilePicture',
      'bio',
      'timings',
      'contactNo',
      'address',
    ])
  };
};

