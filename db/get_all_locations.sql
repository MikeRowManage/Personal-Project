SELECT * FROM users u
JOIN locations l ON u.user_id = l.user_id
WHERE l.location_zipcode = $1
