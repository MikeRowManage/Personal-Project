SELECT * FROM locations
WHERE zipcode = $1
-- RETURNING location_name, street_address, city, state, zipcode, image, description, rating