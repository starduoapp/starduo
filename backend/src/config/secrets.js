import dotenv from "dotenv";

dotenv.config();

export const user = process.env.USER;
export const password = process.env.PASSWORD;
export const host = process.env.HOST;
export const port = process.env.PORT;
export const database = process.env.DATABASE;
