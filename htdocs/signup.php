<?php 
session_start();

	include("connection.php");
	include("functions.php");
    $Error = "";

	if($_SERVER['REQUEST_METHOD'] == "POST")
	{
		//something was posted
		$user_name = $_POST['user_name'];
		$password = $_POST['password'];
		$user_mail = $_POST['user_mail'];
		$con_pass = $_POST['confirm_password'];

		$sname = mysqli_query($con, "SELECT * FROM users WHERE user_name = '". $_POST['user_name']."'");
		$smail = mysqli_query($con, "SELECT * FROM users WHERE user_mail = '". $_POST['user_mail']."'");
	
		if(!preg_match("/^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/",$user_mail)) {
			$Error = "Please enter a valid email";
		}
		
		elseif(mysqli_num_rows($sname)) {
			echo "This username already exists";
		}
		
		elseif(mysqli_num_rows($smail)) {
			echo "This email already exists";
		}
		
		
		elseif($con_pass !== $password) {
			echo "Password and confirm Password are not the same!";
		}

		elseif(!empty($user_name) && !empty($password) && !empty($user_mail) && !is_numeric($user_name))
		{


			//save to database
			$user_id = random_num(20);
			//$password = password_hash($password, PASSWORD_DEFAULT); for pass hashing
			$query = "insert into users(user_id,user_name,password,user_mail) values('$user_id','$user_name','$password','$user_mail')";

			mysqli_query($con,$query);

			header("Location: login.php");
			die;
		}else
		{
			echo "Please enter some valid information!";
		}
	}
?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">

  <link rel="stylesheet" href="../css/bootstrap.css">
  <link rel="stylesheet" href="../css/our.css">
  <link rel="stylesheet" href="../css/test.css">
  <link rel="stylesheet" href="../css/info.css">

  <script type="text/javascript" src="../js/javascript.js"></script>

  <title>Sign Up</title>
</head>
<body>

  <header>
    <img class="logo circular--square" src="../html/lg.jpg" alt="logo">
  </header>
<br>

  <div class="center">
    <h2>Sing Up</h2>
    <p style="text-align: center;">Σύνδεση στο σύστημα squiz</p>
	<!-- action= index.html or login.html-->
    <form class="" method="post">
	<div><?php 
				if(isset($Error) && $Error != "")
				{
					echo $Error;
				}
			?></div>


			<div class="txt_field"> <br>
              <label class="label">Email:</label>
              <input type="text" id="name" name="user_mail"  >
            </div><br>

            <div class="txt_field"> <br>
              <label class="label">Username:</label>
              <input type="text"  id="name" name="user_name"  >
            </div><br>

            <div class="txt_field">
              <label>Password</label>
              <input type="password" id="password" name="password" >
            </div><br>

            <div class="txt_field">
              <label>Confirm Password:</label>
              <input type="password"  name="confirm_password" >
            </div><br>

        <input id="button" type="submit" value="Signup" class="btn btn-primary"> 
    </form>
  </div>




</body>
</html>


	<!-- <div id="box">
		
	<form method="post">
			<div>

			</div>
			<div style="font-size: 20px;margin: 10px;color: white;">Signup</div>
			<input id="text" type="email" name="user_mail" placeholder="Email"><br><br>
            <input id="text" type="text" name="user_name" placeholder="Username"><br><br>
			<input id="text" type="password" name="password" placeholder="Password"><br><br>
			<input id="text" type="password" name="confirm_password" placeholder="Confirm Password"><br><br>

			<input id="button" type="submit" value="Signup"><br><br>

			<a href="login.php">Click to Login</a><br><br>
		</form>
	</div>
</body>
</html> -->