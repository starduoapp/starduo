CREATE DATABASE starduo IF NOT EXISTS starduo;

CREATE TABLE users (
    email TEXT PRIMARY KEY NOT NULL UNIQUE,
    password TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    id UUID NOT NULL UNIQUE
);

