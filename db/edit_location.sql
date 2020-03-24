UPDATE locations SET location_name = $1, street_address = $2, city = $3, state = $4, location_zipcode = $5, image = $6, description = $7, rating = $8
WHERE location_id = $9