<?php 
// session_start();

	include("connection.php");
	include("functions.php");

    // if($_SERVER['REQUEST_METHOD'] == "POST") {
	 $ChosenCategory = $con->query("select description from categories");
     $ChosenDifficulty = $con->query("select difficulty from questions");
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
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="../css/test.css">
    <link rel="stylesheet" href="../css/info.css">

    <script type="text/javascript" src="../js/javascript.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossorigin="anonymous"></script>
     
    <title>Document</title>
</head>
<body>

    
    <div class="WebContainer">
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
        

        <div class="container">
            <!-- <div class="dropdown center-periexomena">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Περιεχόμενα
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" name="Category_Descriptions" href="#">Γεωγραφία</a></li>
                    <li><a class="dropdown-item" name="Category_Descriptions" href="#">Τεχνολογία</a></li>
                    <li><a class="dropdown-item" name="Category_Descriptions" href="#">Ιστορία</a></li>
                    <li><a class="dropdown-item" name="Category_Descriptions" href="#">Τέχνη</a></li>
                </ul>
            </div> -->

            <form method="post">
                <div>
                    <label for="Category_Descriptions">Περιεχόμενα:</label>
                    <select name="Category_Descriptions">
                    <?php
                     session_start();
                        while($rows = $ChosenCategory->fetch_assoc() ){
                            $category_name = $rows['description'];
                            echo "<option value='$category_name'>$category_name</option>";
                            $_SESSION['cname'] = $category_name;   
                        }
                        
                
    
                    ?>
                    </select>
                </div>
                <!-- <div>
                    <button type="submit">Submit</button>
                </div> -->
            </form>


            <br>

            <!-- <div class="btn-group-vertical absolute-menu center-diskolia" role="group" aria-label="Basic example">
                <h3 id="diskolia">Δυσκολία:</h3>
                <button type="button" class="btn btn-primary">Easy</button>
                <button type="button" class="btn btn-primary">Medium</button>
                <button type="button" class="btn btn-primary">Hard</button>
            </div> -->

            <form method="post">
                <div>
                    <label for="Difficulty">Δυσκολία:</label>
                    <select name="Difficulty">
                    <option value='1'>Εύκολο</option>
                    <option value='2'>Μέτριο</option>
                    <option value='3'>Δύσκολο</option>
                    </select>
                </div>
                <!-- <div>
                    <button type="submit">Submit</button>
                </div> -->
            </form>

            <div class="center">
           
                    <button onclick="window.location.href='quiz.php'" id="takeQuizButton" type="button">
                        <b>Take Quiz</b>
                    </button>
              
            </div>
        </div>
    </div>
    
</body>
</html>