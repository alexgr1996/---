<?php 
session_start();

	include("connection.php");
	include("functions.php");

	$user_data = check_login($con);

?>




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="../css/bootstrap.css">
    <link rel="stylesheet" href="../css/test.css">
    <link rel="stylesheet" href="../css/info.css">

    <script type="text/javascript" src="../js/javascript.js">

    </script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" ></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossorigin="anonymous"></script>
    <title>Profile Menu</title>
  </head>
  <body>
  
    <div class="WebContainer">
        <header>
            <img class="logo circular--square" src="../html/lg.jpg" alt="logo">
            <nav>
            <ul class="nav_links">
                <li><a href="nikosTest.php">Home</a></li>
                <li><a href="nikosProfil.php">Profil</a></li>
            </ul>
            </nav>
            <a class="logoutButton" href="nikosLogin.php"><button>Logout</button></a>
        </header>

        <div class="container">
        <h2>
            <span>
                <?php echo $user_data['user_name']; ?>
            </span> info
        </h2>

        <table>
            <tr>
            <th>quiz</th>
            <th>difficulty</th>
            </tr>
            <tr>
            <td>quiz id</td>
            <td>difficulty</td>
            </tr>
        </table>
        </div>
    </div>

</body>
</html>