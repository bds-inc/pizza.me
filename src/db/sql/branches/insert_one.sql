insert into branches(name, location, address, contact_info) values ($1, $1, $1, $1) returning id;
