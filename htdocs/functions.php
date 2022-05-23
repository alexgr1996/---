<?php

function check_login($con)
{

	if(isset($_SESSION['user_id']))
	{

		$id = $_SESSION['user_id'];
		$query = "select * from users where user_id = '$id' limit 1";

		$result = mysqli_query($con,$query);
		if($result && mysqli_num_rows($result) > 0)
		{

			$user_data = mysqli_fetch_assoc($result);
			return $user_data;
		}
	}

	//redirect to login
	header("Location: login.php");
	die;

}

function random_num($length)
{

	$text = "";
	if($length < 5)
	{
		$length = 5;
	}

	$len = rand(4,$length);

	for ($i=0; $i < $len; $i++) { 
		# code...

		$text .= rand(0,9);
	}

	return $text;
}

	function send_email($con,$email){
		

		$expire = time() + (60 * 1);
		$code = rand(10000,99999);
		$email = addslashes($email);

		$query = "insert into codes (email,code,expire) value ('$email','$code','$expire')";
		mysqli_query($con,$query);

		//send email here
		send_mail($email,'Password reset',"Your code is " . $code);
	}
	
	function save_password($con,$password){
		

		$password = $password ;
		//$password = password_hash($password, PASSWORD_DEFAULT); for pass hashing
		$email = addslashes($_SESSION['forgot']['email']);

		$query = "update users set password = '$password' where user_mail = '$email' limit 1";
		mysqli_query($con,$query);

	}
	
	function valid_email($con,$email){

		$email = addslashes($email);

		$query = "select * from users where user_mail = '$email' limit 1";		
		$result = mysqli_query($con,$query);
		if($result){
			if(mysqli_num_rows($result) > 0)
			{
				return true;
 			}
		}

		return false;

	}

	function is_code_correct($con,$code){

		$code = addslashes($code);
		$expire = time();
		$email = addslashes($_SESSION['forgot']['email']);

		$query = "select * from codes where code = '$code' && email = '$email' order by id desc limit 1";
		$result = mysqli_query($con,$query);
		if($result){
			if(mysqli_num_rows($result) > 0)
			{
				$row = mysqli_fetch_assoc($result);
				if($row['expire'] > $expire){

					return "the code is correct";
				}else{
					return "the code is expired";
				}
			}else{
				return "the code is incorrect";
			}
		}

		return "the code is incorrect";
	}






	function getQuestion($con,$ChosenDifficulty,$ChosenCategory) {
		$query="select id  from questions Q JOIN  categories C ON Q.category_id=C.id  Where difficulty =  '$ChosenDifficulty' AND C.category_id ='$ChosenCategory'  " ;
		 $QuestionResult= mysqli_query($con,$query);
		 $numofrow = mysqli_num_rows($QuestionResult);
		 $SelectedQuestions = array(10);
		 
		  $chosenRAND = rand(1,$numofrow);
		  $i=1;
		  $QuestionResult[$chosenRAND]==$SelectedQuestions[1];
		  do{
			
				if($QuestionResult[$chosenRAND] ==$SelectedQuestions[$i])
				$chosenRAND = rand(1,$numofrow);
				else
				$SelectedQuestions[$i] = $QuestionResult[$chosenRAND];
				$i++;
			
		  }
		  while( $i=10 );
	
		  return $SelectedQuestions;
		}






	function sentQuestions($con,$index,$SelectedQuestions){

	     $query= "select question_text  from  questions WHERE id= $index"//         ,CorrectAnswer,WrongAns,WrongAns2,WrongAns3 From questions q INNER JOIN "
		 $result = mysqli_query($con, $query);

	}

	function ReturnMetaData($con,$QuestionText,$CorrectAnswer,$WrongAns,$WrongAns2,$WrongAns3,$Difficutly,$Category,$quiz_user_id ,$QuizID,$UserAnswer){
		$query = "insert into quiz_executons(QuestionText,CorrectAnswer,WrongAns,WrongAns2,WrongAns3,Difficutly,Category,user_id,QuizID,UserAnswer) values('$QuestionText','$CorrectAnswer','$WrongAns','$WrongAns2','$WrongAns3','$Difficutly','$Category','$quiz_user_id','$QuizID','$UserAnswer')";
		mysqli_query($con,$query);
		}



	function startTest() {
		header("location: nikosTest.php");
	}
	
