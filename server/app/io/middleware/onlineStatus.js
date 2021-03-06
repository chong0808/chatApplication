'use strict';
const { userInfoKey } = require('./../../keys');
module.exports = app => {
  return async (ctx, next) => {
    console.log('middleware');
    const userInfoRedisKey = userInfoKey(ctx.socket.userInfo.userId);
    const socketId = ctx.socket.id;
    await app.redis.hset(userInfoRedisKey, 'status', 1);
    await app.redis.hset(userInfoRedisKey, 'socketId', socketId);
    await next();
    // status = 0 the socket is disconnect
    app.redis.hset(userInfoRedisKey, 'status', 0);
  };
};

