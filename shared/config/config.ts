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
  NODE_ENV: requireEnv("NODE_ENV"),
};
