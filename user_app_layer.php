<?php
    
    header('Content-type: application/json');
    header('Accept: application/json');
    include('user_data_layer.php');
    
    $action = $_POST["action"];

    switch($action){
        case "LOGIN": login_user();
                        break;
        case "REGISTER": register_user();
                        break;
        case "LOGOUT": logout_user();
                        break;
    }
    
    function login_user(){
        session_start();
        $uName = $_POST["username"];
		$uPassword = $_POST["password"];
        
        $result =  loging_user($uName);
        if($result -> num_rows > 0){
            
            $user = $result->fetch_assoc();
            $_SESSION['username'] = $uName;
            $_SESSION['user_id'] = $user["userID"];
            echo json_encode($_SESSION['username']);
            die();   
        }else{
			header("HTTP/1.1 406 User not found.");
			die("Your username or password is incorrect.");
		}
        
    }
    
    function register_user(){
        session_start();
        $firstName = $_POST["firstName"];
        $lastName = $_POST["lastName"];
        $email = $_POST["email"];
		$uName = $_POST["username"];
		$uPassword = $_POST["password"];
		$gender = $_POST["gender"];
        $address = $_POST["address"];
        $tel = $_POST["tel"];
        $result = registering_user($firstName,$lastName,$email,$uName,$uPassword,$gender,$address,$tel);
        if($result["check"] == 406){
            //echo("406");
            header("HTTP/1.1 406 Username or email already used");
			$row = $result["resultant"];
			$response = array("username" => $row["username"], "email" => $row["email"]);
			echo json_encode($response);
			die("The Username or email is already taken");
        }else{
            $_SESSION['user_id'] = $result["userID"];
            $_SESSION['username'] = $uName;
            
            echo json_encode($_SESSION['user_id']);
        }
        
    }
    
    function logout_user(){
        
        if(session_status() == PHP_SESSION_NONE){
            header("HTTP/1.1 406 No user logged");
            die();
        }else{
            session_destroy();
            die();
        }
    }
    
    

?>