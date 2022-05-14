create table users(
 	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	 user_id BIGINT,
	 user_mail varchar(255),
	 user_name varchar(255),
	 password varchar(255),
	 date timestamp
);
CREATE TABLE codes (
    id int NOT NULL AUTO_INCREMENT,
    email varchar(100),
    code varchar(5),
    expire int(11),
    PRIMARY KEY (id),
    KEY FK_mail (email),
    CONSTRAINT FK_mail FOREIGN KEY (email)
    REFERENCES users(user_mail)
);

create table Quiz_Executions(
 	ExecId int AUTO_INCREMENT PRIMARY KEY,
	UserId int,
  	AsID int,
	quiz_date timestamp,
	quiz_sxore int not null,
	FOREIGN KEY (UserId) REFERENCES Users(UserId),
	FOREIGN KEY (AsID) REFERENCES Assessments(AsID) 
);

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `difficulty` smallint(6) NOT NULL DEFAULT 1,
  `question_text` varchar(4000) COLLATE utf8_unicode_ci NOT NULL,
  `category_id` int(11) NOT NULL,
  `correct_choise_pos` smallint(6) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `que_cate_fk` (`category_id`),
  CONSTRAINT `que_cate_fk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE IF NOT EXISTS `question_choices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `que_id` int(11) NOT NULL,
  `position` smallint(6) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `que_sc_que_fk` (`que_id`),
  CONSTRAINT `que_sc_que_fk` FOREIGN KEY (`que_id`) REFERENCES `questions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



CREATE TABLE IF NOT EXISTS `assesment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `title` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ass_cat_fk` (`category_id`),
  CONSTRAINT `ass_cat_fk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



CREATE TABLE IF NOT EXISTS `assestment_questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ass_id` int(11) NOT NULL,
  `ques_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `asse_que_asse_fk` (`ass_id`),
  KEY `asse_que_que_fk` (`ques_id`),
  CONSTRAINT `asse_que_asse_fk` FOREIGN KEY (`ass_id`) REFERENCES `assesment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `asse_que_que_fk` FOREIGN KEY (`ques_id`) REFERENCES `questions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

