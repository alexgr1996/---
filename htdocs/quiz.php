<?php 
  session_start();

	include("connection.php");
	include("functions.php");
    // $user_data = check_login($con);
	include("ChooseDifficulty.php");
    include("ChooseTest.php");

    
    getQuestion($con,$ChosenDifficulty,$ChosenCategory); 


     
    
     
     $index=0;
     function sentQuestions($index,$QuestionResult){
        $QuestionNextText=[20][20];
   // $query= "select question_text  from  questions WHERE id= $index";//         ,CorrectAnswer,WrongAns,WrongAns2,WrongAns3 From questions q INNER JOIN "
   // $result = mysqli_query($con, $query);
    $QuestionNextText[$index]['question_text']  == $QuestionResult[$index]["id"];
    $index++;
    return $QuestionNextText[$index]['question_text'];//Next Question

     }
     StoreMetaData($con,$QuestionText,$CorrectAnswer,$WrongAns,$WrongAns2,$WrongAns3,$Difficutly,$Category,$quiz_user_id ,$QuizID,$UserAnswer);

    
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
    <title>Quiz</title>
  </head>
  <body>
  
    <div class="web_container">
        <div class="header">
            <header>
                <img class="logo circular--square" src="../html/lg.jpg" alt="logo">
                <nav>
                <ul class="nav_links">
                    <li><a href="ChooseTest.php">Home</a></li>
                    <li><a href="Profil.php">Profil</a></li>
                </ul>
                </nav>
                <a class="logoutButton" href="login.php"><button>Logout</button></a>
            </header>
        </div>
        

        <div class="container">
        <h2>
            <span>
                <?php echo $_SESSION['cname']; ?>
            </span> Quiz
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