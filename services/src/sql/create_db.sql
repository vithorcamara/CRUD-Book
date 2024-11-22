CREATE DATABASE crud1_start;

USE crud1_start;

CREATE TABLE book(
	id int PRIMARY KEY AUTO_INCREMENT, 
    title varchar(45) NOT NULL,
    autHor varchar(45) NOT NULL
);
