const config = require("config");
const jwt = require("jsonwebtoken");

class jwtService {
  constructor(accessKey, refreshKey, accessTime, refreshTime) {
    this.accessKey = accessKey;
    this.refreshKey = refreshKey;
    this.accessTime = accessTime;
    this.refreshTime = refreshTime;
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, this.accessKey, {
      expiresIn: this.accessTime,
    });

    const refreshToken = jwt.sign(payload, this.refreshKey, {
      expiresIn: this.refreshTime,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, this.accessKey);
  }

  async verifyRefreshToken(token) {
    return jwt.verify(token, this.refreshKey);
  }
}
const authJwtService = new jwtService(
  config.get("access_key"),
  config.get("refresh_key"),
  config.get("access_time"),
  config.get("cookie_refresh_time")
);

const userJwtService = new jwtService(
  config.get("access_keyUser"),
  config.get("refresh_keyUser"),
  config.get("access_timeUser"),
  config.get("cookie_refresh_timeUser")
);
const adminJwtService = new jwtService(
  config.get("access_keyAdmin"),
  config.get("refresh_keyAdmin"),
  config.get("access_timeAdmin"),
  config.get("cookie_refresh_timeAdmin")
);
const topicJwtService = new jwtService(
  config.get("access_keyTopic"),
  config.get("refresh_keyTopic"),
  config.get("access_timeTopic"),
  config.get("cookie_refresh_timeTopic")
);

const dictJwtService = new jwtService(
  config.get("access_keyDict"),
  config.get("refresh_keyDict"),
  config.get("access_timeDict"),
  config.get("cookie_refresh_timeDict")
);

module.exports = {
  authJwtService,
  userJwtService,
  adminJwtService,
  topicJwtService,
  dictJwtService,
};
