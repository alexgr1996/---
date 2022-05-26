<?php 
session_start();

	include("connection.php");
	include("functions.php");

	$user_data = check_login($con);
    // ReturnAllUSerQuizzes($con,$user_data['user_id']);
    // ReturnScore($con,$Difficutly,$user_data['user_id'],$QuizID);
    // ReturnFullDoneQuiz($con,$QuizID);
    

?>




<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- MDB -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/4.1.0/mdb.min.css" rel="stylesheet"/>

    <link rel="stylesheet" href="../css/bootstrap.css">
    <link rel="stylesheet" href="../css/our.css"> 
    <link rel="stylesheet" href="../css/test.css">
    <link rel="stylesheet" href="../css/info.css">

    <script type="text/javascript" src="../js/javascript.js"> </script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" ></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossorigin="anonymous"></script>
    
    <title>Profile Menu</title>
  </head>
  <body>
  


  <header >
      <img class="logo circular--square" src="../html/lg.jpg" alt="logo">
      <nav>
        <ol class="nav_links" >
          <li><a href="ChooseTest.php"><button> Home Page </button></a></li>
          <li><a href="profile.html"><button> Profile </button></a></li>
          <!-- <li><a href="#"><button> Contact us </button></a></li> -->
          <li><a class="logoutButton" href="../html/welcome.html"><button>Logout</button></a></li>
        </ol>
      </nav>
    </header>


    <div class="container2" >
      <div class="row d-flex justify-content-center">
        <div class="col-md-8 mt-1 ">
         <div class="row z-depth-3">   

                <div class="col-sm-15  ">
                        <div class=" text-center text-white">
                          <!-- <i class="mt-5"></i>  -->
                            <h2 class="text-center font-weight-bold mt-3"></h2>
                            <p></p>
                            <!--  <i class="far fa-edit fa-2x mb-4"></i>    -->
                        </div>
                </div><br>
      
                        <!-- <div class="row"> -->
                        <div class="container1">
                            <h2>
                              <span>Information</span> 
                            </h2>            
                            <table>
                                <tr>
                                    <th>USERNAME</th>
                                    <td><?php echo $user_data['user_name']; ?></td>
                                </tr>

                                <tr>
                                    <th>ID</th>
                                    <td><?php echo $user_data['user_id']; ?></td>
                                </tr>

                                <tr>
                                    <th>EMAIL</th>
                                    <td><?php echo $user_data['user_mail']; ?></td>
                                </tr>

                                <tr>
                                    <th>DATE</th>
                                    <td><?php echo $user_data['date']; ?></td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-8 mt-5 pt-2"></div>

           </div>
        </div>
      </div>
    </div>

