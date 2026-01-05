INSERT INTO roles (name) VALUES ('ROLE_USER');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN');

INSERT INTO users (username, email, password) VALUES ('GRS', 'grs@example.com', '$2a$10$V.V.8t3C/T5uStBASICs1..xLw27.h9.k8w.1.Nl2Nl1Nl2Nl2Nl2');
INSERT INTO user_roles (user_id, role_id) VALUES (1, 2);
