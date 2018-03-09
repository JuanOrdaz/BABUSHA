<?php
    
    session_start();
	header('Content-type: application/json');
	header('Accept: application/json');

    
    function loging_user($uName){
        	$servername = "localhost";
            $username = "root";
            $pass = "root";
            $DB = "BABUSHA";

            $port = 8889;


            $conn = new mysqli($servername, $username, $pass, $DB);

            if ($conn -> connect_error){
                header("HTTP/1.1 500 Portal down");
                die("The server is down, the connection to the database could not be established");
            }else{
                $connection = 1;
                $sql = "SELECT *
				  FROM Users
				  WHERE username = '$uName'";
                $result = $conn -> query($sql);
                return $result;
            }
    }
    
    function registering_user($firstName,$lastName,$email,$uName,$uPassword,$gender,$address,$tel){
            $servername = "localhost";
            $username = "root";
            $pass = "root";
            $DB = "BABUSHA";

            $port = 8889;


            $conn = new mysqli($servername, $username, $pass, $DB);

            if ($conn -> connect_error){
                header("HTTP/1.1 500 Portal down");
                die("The server is down, the connection to the database could not be established");
            }else{
                $connection = 1;
                
                $sql = "SELECT *
				  FROM Users
				  WHERE username = '$uName'
				  OR correo = '$email'
				  ";

                $result = $conn -> query($sql);
                if ($result -> num_rows > 0){
                    header("HTTP/1.1 406 Username or email already used");
                    $row = $result->fetch_assoc();
                    $response = array("username" => $row["username"], "email" => $row["correo"],"check" => 406);
                    echo json_encode($response);
                    //die("The Username or email is already taken");
                }
                else{
                    $sql = "INSERT INTO Users (fName, lName, username, passwrd, correo,gender,direccion,tel) VALUES ('$firstName','$lastName','$uName','$uPassword', '$email','$gender','$address', '$tel')";
                    if (mysqli_query($conn, $sql)) {
                        $_SESSION['user_id'] = mysqli_insert_id($conn);
                        $_SESSION['username'] = $uName;
                        echo json_encode(array("userID" => $_SESSION['user_id'], "check" => 200));
                        exit();
                    } 
                    else {
                        header("HTTP/1.1 500 Bad DB Connection");
                        die("DB not working.");
                    }

                }
            }
        
    }


    
?>