CREATE SCHEMA IF NOT EXISTS main;

CREATE TABLE IF NOT EXISTS main.users (
    user_id SERIAL PRIMARY KEY,
    balance DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS main.payments (
    payment_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES main.users(user_id),
    action VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO main.users (balance) VALUES
    (100.00),
    (200.50),
    (50.75);

INSERT INTO main.payments (user_id, action, amount) VALUES
    (1, 'DEBIT', 50.00),
    (2, 'DEBIT', 20.00),
    (3, 'DEBIT', 10.50);