CREATE TABLE users(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code TEXT NOT NULL,
    user_name VARCHAR(64) NOT NULL,
    pass_hash TEXT NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conversations(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_1 BIGINT NOT NULL,
    user_2 BIGINT NOT NULL,
    first_message_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE messages(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    conversation_id BIGINT NOT NULL,
    user_from BIGINT NOT NULL,   
    user_to BIGINT NOT NULL,
    content TEXT NOT NULL,
    send_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT message_conversation_fk FOREIGN KEY (conversation_id) REFERENCES conversations(id),
        CONSTRAINT from_user_fk FOREIGN KEY (user_from) REFERENCES users(id),
        CONSTRAINT to_user_fk FOREIGN KEY (user_to) REFERENCES users(id)
);