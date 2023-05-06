CREATE DATABASE  IF NOT EXISTS `meal-sharing`;
USE `meal-sharing`;
--
-- Table structure for table `meals`
--

DROP TABLE IF EXISTS `meals`;
CREATE TABLE `meals` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NULL,
  `location` varchar(255) NULL,
  `when` datetime NOT NULL,
  `max_reservations` int(10) NULL,
  `price` decimal(10,2) NOT NULL,
  `created_date` date NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6;

--
-- Dumping data for table `meals`
--

LOCK TABLES `meals` WRITE;
/*!40000 ALTER TABLE `meals` DISABLE KEYS */;
-- Add a new meal
INSERT INTO meal (title, description, location, `when`, max_reservations, price, created_date) 
VALUES ('Spaghetti Bolognese', 'A classic Italian dish made with pasta and meat sauce', 'Ristorante Italiano', '2022-01-15 19:00:00', 10, 30.33, '2022-01-30');

INSERT INTO meal (title, description, location, `when`, max_reservations, price, created_date) 
VALUES ('Pad Thai', 'A popular Thai dish made with stir-fried noodles, vegetables, and peanuts', 'Thai Kitchen', '2022-03-20 18:30:00', 3, 18.99, '2022-02-28');

INSERT INTO meal (title, description, location, `when`, max_reservations, price, created_date) 
VALUES ('Vegan Burrito Bowl', 'A healthy and flavorful dish made with rice, beans, and veggies', 'The Green Bowl', '2022-04-11 12:00:00', 6, 12.50, '2022-04-15');

INSERT INTO meal (title, description, location, `when`, max_reservations, price, created_date) 
VALUES ('Steak and Lobster', '8 oz. filet mignon and 6 oz. lobster tail', 'The Steakhouse at the Ritz', '2022-10-01 19:30:00', 4, 89.99, '2022-10-28');

INSERT INTO meal (title, description, location, `when`, max_reservations, price, created_date) 
VALUES ('Sushi Platter', 'Assortment of fresh sushi rolls and sashimi', 'Sakura Japanese Restaurant', '2022-11-12 20:00:00', 6, 42.50, '2022-11-20');

INSERT INTO meal (title, description, location, `when`, max_reservations, price, created_date) 
VALUES ('Roasted Chicken and Vegetables', 'A hearty and healthy dish made with roasted chicken and seasonal vegetables', 'The Rustic Kitchen', '2023-01-10 18:30:00', 5, 24.99, '2023-01-18');

INSERT INTO meal (title, description, location, `when`, max_reservations, price, created_date) 
VALUES ('Shrimp Scampi', 'A delicious and easy-to-make Italian dish made with garlic, butter, and shrimp', 'Bella Vita', '2023-01-12 20:00:00', 8, 29.99, '2023-01-30');

INSERT INTO meal (title, description, location, `when`, max_reservations, price, created_date) 
VALUES ('Taco Tuesday', 'A fun and flavorful Mexican-inspired meal with tacos, chips, and guacamole', 'La Taqueria', '2023-02-22 17:00:00', 10, 19.99, '2023-02-25');
/*!40000 ALTER TABLE `meals` ENABLE KEYS */;
UNLOCK TABLES;
