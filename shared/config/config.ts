import dotenv from "dotenv";
dotenv.config();

const requireEnv = (name: string) => {
  const value = process.env[name];

  if (!value) {
    // throw new Error(`An Error occured${value}`);
    console.error(`An Error Occured: No value found`);
  }
  return value;
};

export const ENV = {
  PORT: requireEnv("PORT"),
  DB_URI: requireEnv("DB_URI"),
  DB_URI_PRODUCTION: requireEnv("DB_URI_PRODUCTION"),
  NODE_ENV: requireEnv("NODE_ENV"),
  CLOUD_NAME: requireEnv("CLOUD_NAME"),
  API_KEY: requireEnv("CLOUD_API_KEY"),
  API_SECRET: requireEnv("CLOUD_API_SECRET"),
  NODEMAILER_SERVICE: requireEnv("NODEMAILER_SERVICE"),
  NODEMAILER_USER: requireEnv("NODEMAILER_USER"),
  NODEMAILER_PASS: requireEnv("NODEMAILER_PASS"),
};
