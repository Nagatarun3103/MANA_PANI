CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    password_reset_token VARCHAR(255),
    password_reset_token_expiry TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS goals (
    id BIGSERIAL PRIMARY KEY,
    goal_name VARCHAR(255) NOT NULL,
    description TEXT,
    deadline TIMESTAMP WITHOUT TIME ZONE,
    type VARCHAR(255),
    status VARCHAR(255),
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS health_records (
    id BIGSERIAL PRIMARY KEY,
    category VARCHAR(255),
    title VARCHAR(255),
    content TEXT,
    image_url VARCHAR(255),
    disease_association VARCHAR(255),
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS schedules (
    id BIGSERIAL PRIMARY KEY,
    date DATE NOT NULL,
    start_time TIME WITHOUT TIME ZONE,
    end_time TIME WITHOUT TIME ZONE,
    description TEXT,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS suggestions (
    id BIGSERIAL PRIMARY KEY,
    content TEXT,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Insert initial roles
INSERT INTO roles (name) VALUES ('ROLE_USER');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN');

-- Insert initial user (ensure IDs are handled if not using IDENTITY for the table)
-- Note: Assuming the first user inserted will get id = 1
INSERT INTO users (username, email, password) VALUES ('GRS', 'grs@example.com', '$2a$10$V.V.8t3C/T5uStBASICs1..xLw27.h9.k8w.1.Nl2Nl1Nl2Nl2Nl2');

-- Assign role to initial user
-- Note: Assuming user_id 1 and role_id 2 (for ROLE_ADMIN, as inserted above)
INSERT INTO user_roles (user_id, role_id) VALUES (1, 2);
