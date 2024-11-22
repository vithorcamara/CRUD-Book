CREATE DATABASE crud1_start;

USE crud1_start;

CREATE TABLE book(
	ID int PRIMARY KEY AUTO_INCREMENT, 
    TITLE varchar(45) NOT NULL,
    AUTHOR varchar(45) NOT NULL
);
