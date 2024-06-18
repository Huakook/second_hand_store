CREATE TABLE if NOT exists `Account`(
    `AID` int AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(10) NOT NULL UNIQUE,
    `account` varchar(30) NOT NULL UNIQUE,
    `hash` varchar(255) NOT NULL,
    `picture` varchar(255) NOT NULL
); 

CREATE TABLE if NOT exists `Product`(  
    `PID` int AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(50) NOT NULL,
    `AID` int NOT NULL,
    FOREIGN KEY (AID) REFERENCES Account( AID ) ON UPDATE CASCADE ON DELETE CASCADE ,
    `image` varchar(255) NOT NULL,
    `condition` varchar(20) NOT NULL,
    `price` int NOT NULL,
    `year` int NOT NULL,
    `amount` int NOT NULL,
    `description` varchar(10000)
);

CREATE TABLE if NOT exists `Orders`(
    `OID` int AUTO_INCREMENT PRIMARY KEY,
    `VenderID` int NOT NULL,
    FOREIGN KEY (VenderID) REFERENCES Account( AID ) ON UPDATE CASCADE ON DELETE CASCADE ,
    `CustomerID` int NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Account( AID ) ON UPDATE CASCADE ON DELETE CASCADE ,
    `PID` int NOT NULL,
    FOREIGN KEY (PID) REFERENCES Product( PID )ON UPDATE CASCADE ON DELETE CASCADE ,
    `amount` int NOT NULL,
    `price` int NOT NULL,
    `date` DATE NOT NULL,
    `status` varchar(10)
);

CREATE TABLE if NOT exists `Cart`(
    `CID` int AUTO_INCREMENT PRIMARY KEY,
    `AID` int NOT NULL,
    FOREIGN KEY (AID) REFERENCES Account( AID ),
    `PID` int NOT NULL,
    FOREIGN KEY (PID) REFERENCES Product( PID )ON UPDATE CASCADE ON DELETE CASCADE , 
    `amount` int NOT NULL,
    `price` int NOT NULL 
);

CREATE TABLE if NOT exists `Chat`(
    `CID` int AUTO_INCREMENT PRIMARY KEY, 
    `VenderID` int NOT NULL,
    FOREIGN KEY (VenderID) REFERENCES Account( AID ) ON DELETE CASCADE,
    `CustomerID` int NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Account( AID ) ON DELETE CASCADE,
    `sender` varchar(1) NOT NULL,
    `message` varchar(1000) NOT NULL,
    `date` DATE NOT NULL,
    `time` TIME NOT NULL
);
