INSERT INTO users (username, first_name, last_name, email, profile_pic, zipcode, password)
VALUES ($1, $2, $3, $4, $5, $6, $7)
returning user_id, username, first_name, last_name, email, profile_pic, zipcode