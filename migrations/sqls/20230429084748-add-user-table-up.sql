/* Replace with your SQL commands */
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    type VARCHAR(100) NOT NULL
);
INSERT INTO users (firstname,lastname,username,password,email,type) VALUES ('Mohamed','Khamis','user1','$2b$10$i5J0C.cgEmNB3foCbuwTQOMSTc4ulew8hUZLm9QshEkQ8cyv6cus2','Exampl1@gmail.com','SuperAdmin');
