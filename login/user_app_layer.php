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
        case "INSERT_TO_CART": insert_item();
                                break;
        case "VIEW_CART": load_cart();
                            break;
        case "DELETE_FROM_CART": delete_item();
                                    break;
        case "CREATE_ORDER": create_order();
                                break;
        case "VIEW_ORDERS": loa_orders();
                                break;
        case "VIEW_DETAIL": load_detail();
                                break;
        case "DELETE_FROM_ORDERS": delete_order();
                                    break;
        case "VIEW_CHAT": load_chat();
                            break;
        case "CREATE_MSG_USER": create_user_msg();
                                    break;
        case "VIEW_USER_MSGS": load_msgs_users();
                                    break;
        case "VIEW_CHAT_ADMIN": load_chat_admin();
                            break;
        case "CREATE_MSG_ADMIN": create_admin_msg();
                                    break;
        case "UPDATE_SEEN": update_seen_msgs();
                                break;

        /*
        case "CREATE_ACCOUNT: <funcion>"
        */
    }
    
    function login_user(){
        session_start();
        $uName = $_POST["username"];
		$uPassword = $_POST["password"];
        
        $result =  loging_user($uName,$uPassword);
        if($result -> num_rows > 0){
            
            $user = $result->fetch_assoc();
            $_SESSION['username'] = $uName;
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
            $_SESSION['username'] = $uName;
            
            echo json_encode($_SESSION['username']);
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

    function insert_item(){
        $itemID = $_POST["itemID"];
        $color = $_POST["color"];
        $quant = $_POST["quant"];
        $total = $_POST["total"];
        $user = $_SESSION['username'];
        //echo($user);
        $cart = getCart($user);
        $unique_cart = $cart->fetch_assoc();
        $result = insert_item_cart($user,$itemID,$color,$quant,$total,$unique_cart["id"]);
    }

    function load_cart(){
        $user = $_SESSION['username'];
        $cart = getCart($user);
        $unique_cart = $cart->fetch_assoc();
        //$echo($unique_cart);
        $result = loading_cart($unique_cart["id"]);
    }

    function delete_item(){
        $id = $_POST["id"];
        
        $delete = delete_from_cart($id);
        $result = load_cart();
    }

    function create_order(){
        $carr_id = $_POST["id_carr"];
        $user = $_SESSION['username'];
        $result = order_creation($carr_id,$user);
        $delete_actual_cart = delete_cart($user);
        $create_new_cart = new_cart($user);
    }

    function loa_orders(){
        $user = $_SESSION['username'];
        
        $result = loading_orders($user);
    }

    function load_detail(){
        $id_carr = $_POST["id_carr"];
        
        $result = getDetail($id_carr);
    }
    
    function delete_order(){
        $id = $_POST["id"];
        
        $result = delete_from_orders($id);
    }

    function load_chat(){
        $user = $_SESSION['username'];
        
        $result = loading_messages($user);
    }

    function create_user_msg(){
        $user = $_SESSION['username'];
        $msg = $_POST['msg'];
        $result = create_user_msging($user,$msg);
    }

    function load_msgs_users(){
        $user = $_SESSION['username'];
        
        $result = load_user_msgs($user);
    }

    function load_chat_admin(){
        $userID = $_POST['user'];
        
        $result = loading_messages_admin($userID);
    }

    function create_admin_msg(){
        $user = $_SESSION['username'];
        $userID = $_POST['userID'];
        $msg = $_POST['msg'];
        $userIDToSend = getUserbyID($userID);
        $userToSend = $userIDToSend->fetch_assoc();
        //echo($userToSend["username"]);
        $result = create_admin_msging($user,$msg,$userToSend["username"]);
    }

    function update_seen_msgs(){
        $userID = $_POST["userID"];
        $userIDToSend = getUserbyID($userID);
        $userToSend = $userIDToSend->fetch_assoc();
        
        $result = update_seen_conv($userToSend["username"]);
    }

?>