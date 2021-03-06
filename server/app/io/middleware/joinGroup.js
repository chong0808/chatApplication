'use strict';
const { userInfoKey } = require('./../../keys');
module.exports = app => {
  return async (ctx, next) => {
    const userInfoRedisKey = userInfoKey(ctx.socket.userInfo.userId);
    const userGroupsInfo = await app.redis.hget(userInfoRedisKey, 'groupInfo');
    const groupsId = userGroupsInfo ? JSON.parse(userGroupsInfo) : [];
    groupsId.forEach(item => {
      ctx.socket.join(item.groupId);
    });
    await next();
  };
};

