import "dotenv/config";

export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DOMAIN: process.env.DOMAIN,
  JWT_SECRET: process.env.JWT_SECRET,
  URL_MONGODB: process.env.URL_MONGODB,
};
