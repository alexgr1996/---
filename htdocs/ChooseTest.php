<?php 
// session_start();

	include("connection.php");
	include("functions.php");
  $ChosenCategory =  $_POST['Cname'];
    
  
  
  
  
  // if($_SERVER['REQUEST_METHOD'] == "POST") {
    
    //  getQuestion($con,$ChosenDifficulty,$ChosenCategory); // int int 
    //  $index=0;
    // function sentQuestions($con,$index,$QuestionResult){
		
    //    $query= "select question_text  from  questions WHERE id= $index";//         ,CorrectAnswer,WrongAns,WrongAns2,WrongAns3 From questions q INNER JOIN "
    //     $result = mysqli_query($con, $query);
    //     $index++;
    //     return $NextQuestions=$QuestionResult[$index]['question_text'];

    // }
    // StoreMetaData($con,$QuestionText,$CorrectAnswer,$WrongAns,$WrongAns2,$WrongAns3,$Difficutly,$Category,$quiz_user_id ,$QuizID,$UserAnswer);

    // }
    
    
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

  <script type="text/javascript" src="../js/javascript.js"> </script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" ></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossorigin="anonymous"></script>
  
  <title>Menu</title>
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

<form method=POST> 
<div class="container"> <section ></section>
    <ul>
    <div class="choose-a-category">Choose a category</div>
      <br><br>
        <li>
          <a href="ChooseDifficulty.php">
            <span Cname= "1">Geography</span>
          </a>
        </li>

        <li>
          <a href="ChooseDifficulty.php">
            <span Cname="2" >Tecnology</span>
          </a>
        </li>

        <li>
          <a href="ChooseDifficulty.php">
            <span  Cname="3" >History</span>
          </a>
        </li>

        <li>
          <a href="ChooseDifficulty.php">
            <span Cname="4" >Arts</span>
          </a>
        </li>
    </ul>
  <br><br>
  <br><br>
</div>
</form>






</body>
</html>
