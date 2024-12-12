CREATE DATABASE starduo;

CREATE TABLE users(
    email TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE
);

