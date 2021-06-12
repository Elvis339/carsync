const config = {
  development: {
    app_host: process.env.APP_HOST || "127.0.0.1",
    app_port: process.env.APP_PORT || 5000,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || "3306",
    dialect: "mysql",
    logging: console.log,
    pool: {
      max: 10,
    },
  },
  production: {
    app_host: process.env.APP_HOST,
    app_port: process.env.APP_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: console.log,
    pool: {
      max: 10,
    },
  },
};

export default config;
