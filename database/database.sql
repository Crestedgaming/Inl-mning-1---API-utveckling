create table category(
    category_id int auto_increment primary key,
    category_name varchar(100) not null
);

create table product(
    product_id int auto_increment primary key,
    title varchar(200) not null,
    description text,
    stock int not null,
    price decimal(10, 2) not null,
    image varchar(255),
    created_date timestamp,
    category_id int,

    foreign key (category_id) 
        references category(category_id)

)


insert into category (category_name) values

(
    ('Gamingprodukter'),
    ('Kläder'),
    ('Elektronik'),
    ('Gaming'),
);

insert into product 
(title, description, stock, price, image, created_date, category_id) values

('Gamingmus pro', 'Ny version', 50, 599, 'pro.jpg', 1),
('Gamingmus', 'RGB-mus', 20, 499, 'gamingmus.jpg', 1),
('Gamingheadset', 'RGB-headset', 28, 899, 'gamingheadset.jpg', 1);
