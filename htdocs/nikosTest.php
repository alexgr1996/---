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
                <li><a href="nikosTest.php">Home</a></li>
                <li><a href="nikosProfil.php">Profil</a></li>
            </ul>
            </nav>
            <a class="logoutButton" href="nikosLogin.php"><button>Logout</button></a>
        </header>
        

        <div class="container">
            <!-- <div class="dropdown center-periexomena">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Περιεχόμενα
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#">Γεωγραφία</a></li>
                    <li><a class="dropdown-item" href="#">Τεχνολογία</a></li>
                    <li><a class="dropdown-item" href="#">Ιστορία</a></li>
                    <li><a class="dropdown-item" href="#">Φαγητό</a></li>
                </ul>
            </div> -->

            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']) ?>" method="post">
                <div>
                    <label for="colors">Περιεχόμενα:</label>
                    <select name="colors[]" id="colors">
                        <option value="red">Γεωγραφία</option>
                        <option value="green">Τεχνολογία</option>
                        <option value="blue">Ιστορία</option>
                        <option value="purple">Φαγητό</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>


            <br>

            <!-- <div class="btn-group-vertical absolute-menu center-diskolia" role="group" aria-label="Basic example">
                <h3 id="diskolia">Δυσκολία:</h3>
                <button type="button" class="btn btn-primary">Easy</button>
                <button type="button" class="btn btn-primary">Medium</button>
                <button type="button" class="btn btn-primary">Hard</button>
            </div> -->

            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']) ?>" method="post">
                <div>
                    <label for="colors">Δυσκολία:</label>
                    <select name="colors[]" id="colors">
                        <option value="red">Εύκολο</option>
                        <option value="green">Μέτριο</option>
                        <option value="blue">Δύσκολο</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>

            <div class="center">
                <a href="quiz.html">
                    <button id="takeQuizButton" type="button">
                        <b>Take Quiz</b>
                    </button>
                </a>
            </div>
        </div>
    </div>
    
</body>
</html>