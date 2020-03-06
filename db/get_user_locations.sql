SELECT * FROM locations l
JOIN users u ON l.user_id = u.user_id
WHERE l.user_id = $1