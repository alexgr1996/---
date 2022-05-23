<?php 

session_start();

	include("connection.php");
	include("functions.php");


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
						header("Location: index.php");
						die;
					}
				}
			}
			
			echo "wrong username or password!";
		}else
		{
			echo "wrong username or password!";
		}
	}

?>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="../css/bootstrap.css">
  <link rel="stylesheet" href="../css/our.css">
  <link rel="stylesheet" href="../css/test.css">
  <link rel="stylesheet" href="../css/info.css">
  <!-- <script type="text/javascript" src="../js/javascript.js" > -->

	<title>Login</title>
</head>
<body>

<header>
    <img class="logo circular--square" src="../html/lg.jpg" alt="logo">
  </header>

  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h2>Login:</h2>
      <h3 style="text-align: center;">Σύνδεση στο σύστημα squiz</h3>
    </div>
  </div>

  <div class="row center">
    <div class="col-md-6 offset-md-3">
      <form method="post" class="" action="main.html" method="post">
        <input type="text" id="user_name" name="user_name" placeholder="USERNAME..."><br>
        <input type="text" id="password" name="password" placeholder="PASSWORD..."><br>

        <input id="button" type="submit" value="Login"><br><br>
        
        <a href="index.php">
        <button type="submit" name="logInButton" class="btn btn-myButton" >
          <b>LOGIN</b>
        </button>
        </a>
        <br><br>

        <a href="signUp.php">
            <button type="button" name="logInButton" class="btn btn-myButton">
            <b>SIGN UP</b>
            </button>
            <br><br>
        </a>
      </form>
      <br>
     

      <a href="forgotPassword.html">
        <button type="button" name="forgotPasswordButton" class="btn btn-myButton">
          <b>FORGOT MY PASSWORD</b>
        </button>
      </a>
    </div>
  </div>

</body>
</html>