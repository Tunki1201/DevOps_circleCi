-- Mysql
CREATE TABLE `courses` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `file` varchar(255),
    PRIMARY KEY (`id`)
);
INSERT INTO `courses` (`name`, `file`)
VALUES ('Cardinal', 'Tom B. Erichsen');

-- Postgres
DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
	id serial PRIMARY KEY,
	name VARCHAR ( 50 ) NOT NULL,
	file VARCHAR ( 50 )
);
INSERT INTO courses(name, file)
VALUES ('test', 'File url')
RETURNING *;