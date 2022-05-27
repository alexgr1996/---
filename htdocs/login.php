<?php 

session_start();

	include("connection.php");
	include("functions.php");
	$Error = "";


	if($_SERVER['REQUEST_METHOD'] == "POST")
	{
		//something was posted
		$user_name = $_POST['user_name'];
		$password =  $_POST['password'];
		if(!empty($user_name) && !empty($password) && !is_numeric($user_name))
		{

			//read from database
			$query = "select * from users where user_name = '$user_name' limit 1";
			$result = mysqli_query($con, $query);

			if($result)
			{
				if($result && mysqli_num_rows($result) > 0)
				{

					$user_data = mysqli_fetch_assoc($result);
					
					if($user_data['password'] === $password)
					{
						$_SESSION['user_id'] = $user_data['user_id'];
						header("Location: ChooseTest.php");
						die;
					}
				}
			}
			
			$Error = "wrong username or password!";
		}else
		{
			$Error = "wrong username or password!";
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
  <title>Login</title>
  <style>
    a{
      color: red ;
    }

  </style>
</head>
<body>

  <header>
    <img class="logo circular--square" src="../html/lg.jpg" alt="logo">
  </header>

  <br>
  <div class="center">
    <h2>Login</h2>
    <p style="text-align: center;">Σύνδεση στο σύστημα squiz</p>
    <form class="" method="post">
      <div class="txt_field"> 
	  <span style="font-size: 12px;color:red;">
		<?php 
				if(isset($Error) && $Error != "")
				{
					echo $Error;
				}
		?>
		</span>
		<br>
        <label class="label">Username:</label>
        <input type="text"  id="name" name="user_name"  >
      </div><br>
      <div class="txt_field">
        <label>Password</label>
        <input type="password" id="password" name="password" >
      </div><br>

      
<!-- class="btn btn-myButton" -->
      <div class="pass" name="forgotPasswordButton"><a href="forgot.php">Forgot Password?</a></div>
      <input type="submit" value="Login"> 
     
<!-- class="btn btn-myButton"  -->
      <div class="signup_link" name="logInButton" ><br>
        Not a member? <a href="signup.php">Sign Up</a>
      </div>

    </form>
  </div>

</body>
</html>

	<!-- <div id="box">
		
		<form method="post">
			<div style="font-size: 20px;margin: 10px;color: white;">Login</div>

			<input id="text" type="text" name="user_name" placeholder="Username"><br><br>
			<input id="text" type="password" name="password" placeholder="Password"><br><br>
			<input id="button" type="submit" value="Login"><br><br>
			<a href="signup.php">Click to Signup</a>
			<a style="margin: 40px;" href="forgot.php">Forgot password?</a>
		</form>
	</div>
</body>
</html> -->
