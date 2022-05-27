<?php 
	include("connection.php");
  include("functions.php");
  
//  $ChosenDifficulty = $_POST['Dname'];
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
  
  <title>Choose Level</title>
</head>
<body>

  <header >
    <img class="logo circular--square" src="../html/lg.jpg" alt="logo">
    <nav>
      <ol class="nav_links" >
        <li><a  href="ChooseTest.php"><button> Home Page </button></a></li>
        <li><a href="Profil.php"><button> Profile </button></a></li>
        <!-- <li><a href="#"><button> Contact us </button></a></li> -->
        <li><a class="logoutButton" href="../html/welcome.html"><button>Logout</button></a></li>
      </ol>
    </nav>
  </header>
 

 
    <br>
    
    <form method=POST>
   <div class="container"> <!--Πλαίσιο για E-M-Δ-->

    <section>
      <!--style="margin-right:5px;" -->
        <h3 style="margin-right:10px;" >Chose a level: <br>
              <div><button class="neon" Dname="1" ><a href="../html/quiz.html"> Easy </a></button> </div>
              <div><button class="neon" Dname="2"><a href="../html/quiz.html"> Medium </a></button> </div>
              <button class="neon" Dname="3"><a href="../html/quiz.html"> Hard </a></button> 
        </h3>
    </section>   
   </div>
   </form>

 
</body>
</html>