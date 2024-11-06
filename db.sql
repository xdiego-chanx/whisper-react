CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    code TEXT NOT NULL,
    user_name VARCHAR(64) NOT NULL,
    email TEXT NOT NULL,
    pass_hash TEXT NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_from INT NOT NULL,   
    user_to INT NOT NULL,
    content TEXT NOT NULL,
    send_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT from_user_fk FOREIGN KEY (user_from) REFERENCES users(id),
        CONSTRAINT to_user_fk FOREIGN KEY (user_to) REFERENCES users(id)
);

