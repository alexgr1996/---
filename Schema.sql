create table Users(
 	UserId INT AUTO_INCREMENT PRIMARY KEY,
	 User_Role varchar(255),
	 username varchar(255),
	 user_password varchar(255)
);

create table Quiz_Executions(
 	ExecId int AUTO_INCREMENT PRIMARY KEY,
	 UserId int FOREIGN KEY REFERENCES Users(UserId),
  AsID int FOREIGN KEY REFERENCES Assessments(AsID),
	 quiz_date timestamp,
	 quiz_sxore int not null
	 
);

CREATE TABLE Assessments (
  AsID INT AUTO_INCREMENT PRIMARY KEY,
  ExecId int FOREIGN KEY REFERENCES Quiz_excecutions(ExecId),
  Assessment_Category VARCHAR(255) NOT NULL,
  Assessment_Difficulty INT NOT NULL,
  Assessment_Creator VARCHAR(255) NOT NULL ,
  Assessment_Title VARCHAR(255), 
  QID VARCHAR(255) NOT NULL,
  CoAnID VARCHAR(255) NOT NULL,  /*check  for the function if needed to be able to have more than 1 correct anwser */
  WrAID VARCHAR(255) NOT NULL
  
 
 );
