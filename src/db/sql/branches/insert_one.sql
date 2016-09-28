insert into branches(name, location, address, contact_info) values (${name}, ${location}, ${address}, ${contact_info}) returning id;
