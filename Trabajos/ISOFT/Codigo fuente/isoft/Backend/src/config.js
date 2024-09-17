import { config } from "dotenv";
config();

export default {
  port: process.env.port || 5000,
};

export const TOKEN_SECRET = "secrect key";
