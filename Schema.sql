create table Users(
 	UserId INT AUTO_INCREMENT PRIMARY KEY,
	 User_Role varchar(255),
	 username varchar(255),
	 user_password varchar(255)
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

CREATE TABLE Assessments (
  AsID INT AUTO_INCREMENT PRIMARY KEY,
  ExecId int ,
  Assessment_Category VARCHAR(255) NOT NULL,
  Assessment_Difficulty INT NOT NULL,
  Assessment_Creator VARCHAR(255) NOT NULL ,
  Assessment_Title VARCHAR(255), 
  QID VARCHAR(255) NOT NULL,
  CoAnID VARCHAR(255) NOT NULL,  /*check  for the function if needed to be able to have more than 1 correct anwser */
  WrAID VARCHAR(255) NOT NULL,
  FOREIGN KEY (ExecId) REFERENCES Quiz_excecutions(ExecId)
 
 );

CREATE TABLE categories
(
    description character varying(200) COLLATE pg_catalog."default",
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    CONSTRAINT categories_pkey PRIMARY KEY (id)
)

CREATE TABLE tags
(
    description character varying(200) COLLATE pg_catalog."default",
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    CONSTRAINT tags_pkey PRIMARY KEY (id)
)

CREATE TABLE questions
(
    difficulty character varying(200) COLLATE pg_catalog."default" NOT NULL,
    host character varying(200) COLLATE pg_catalog."default" NOT NULL,
    text character varying(200) COLLATE pg_catalog."default",
    id integer NOT NULL,
    correct_choice_pos smallint NOT NULL,
    category_id integer NOT NULL,
    CONSTRAINT questions_pkey PRIMARY KEY (id),
    CONSTRAINT que_cat_fk FOREIGN KEY (category_id)
        REFERENCES categories (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

CREATE TABLE question_choices
(
    text character varying(200) COLLATE pg_catalog."default" NOT NULL,
    que_id integer NOT NULL,
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "position" smallint NOT NULL,
    CONSTRAINT question_choices_pkey PRIMARY KEY (id),
    CONSTRAINT que_ch_que_fk FOREIGN KEY (que_id)
        REFERENCES questions (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

CREATE TABLE assesment_questions
(
    que_id integer NOT NULL,
    ass_id integer NOT NULL,
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    CONSTRAINT assesment_questions_pkey PRIMARY KEY (id),
    CONSTRAINT ass_q_ass_fk FOREIGN KEY (ass_id)
        REFERENCES assesment (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT ass_q_que_fk FOREIGN KEY (que_id)
        REFERENCES questions (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)