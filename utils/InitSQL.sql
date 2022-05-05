create table Users(
    id_user serial primary key,
    user_email text not null unique,
    user_password text not null
);

create table Products(
	id_product serial primary key,
	product_name text not null unique
);

create table Barcode(
	id_product int references Products(id_product) on delete cascade,
	barcode_number text not null,
	constraint pk_bar_code primary key(id_product, barcode_number)
);