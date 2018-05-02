<?php
    
    session_start();
	header('Content-type: application/json');
	header('Accept: application/json');

    
    function loging_user($uName,$uPassword){
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
                  AND passwrd = '$uPassword'";
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

    function getCart($user){
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
				  FROM Carrito
				  WHERE user = '$user'";
                $result = $conn -> query($sql);
                return $result;
            }
    }

    function insert_item_cart($user,$itemID,$color,$quant,$total,$cartID){
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
                $sql = "INSERT INTO CarrIt (c_id,i_id,cantidad,color,precioTotal)
                VALUES('$cartID','$itemID','$quant','$color','$total')";
                return mysqli_query($conn,$sql);
            }
    }

    function loading_cart($cartID){
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
            FROM CarrIt ct
            LEFT JOIN Item it
            ON ct.i_id = it.id
            WHERE ct.c_id = '$cartID'";
            $result = $conn -> query($sql);
            
            $jsonData = array();

            if ($result -> num_rows > 0){
                while ($row = $result->fetch_assoc()){
                    $response = array( "id" => $row["i_id"],"item" => $row["nombre"], "desc" => $row["descripcion"], "color" => $row["color"], "quant" => $row["cantidad"], "total" => $row["precioTotal"], "carrItId" => $row["carrItID"], "c_id" => $row["c_id"]);
                    array_push($jsonData,$response);
                }

                echo json_encode($jsonData);

            }
            return $result;
        }
    }

    function delete_from_cart($id){
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
                $sql = "DELETE FROM CarrIt WHERE carrItID = '$id' ";
                return mysqli_query($conn,$sql);
            }
    }

    function order_creation($carr_id,$user){
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
                $sql = "INSERT INTO Orden (comprador,c_id,status_p)
                VALUES('$user','$carr_id','S/P')";
                return mysqli_query($conn,$sql);
            }
    }

    function delete_cart($user){
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
            $sql = "DELETE FROM Carrito where user = '$user'";
            return mysqli_query($conn,$sql);
        }
    }

    function new_cart($user){
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
                $sql = "INSERT INTO Carrito (user)
                VALUES('$user')";
                return mysqli_query($conn,$sql);
            }
    }

    function loading_orders($user){
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
            FROM Orden ord
            LEFT JOIN Users us
            ON ord.comprador = us.username";
            $result = $conn -> query($sql);
            
            $jsonData = array();

            if ($result -> num_rows > 0){
                while ($row = $result->fetch_assoc()){
                    $response = array( "id" => $row["id"],"cliente" => $row["comprador"],"dir" => $row["direccion"], "id_carr" => $row["c_id"]);
                    array_push($jsonData,$response);
                }

                echo json_encode($jsonData);

            }
            return $result;
        }
    }

    function getDetail($cartID){
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
            FROM CarrIt ct
            LEFT JOIN Item it
            ON ct.i_id = it.id
            WHERE ct.c_id = '$cartID'";
            $result = $conn -> query($sql);
            
            $jsonData = array();

            if ($result -> num_rows > 0){
                while ($row = $result->fetch_assoc()){
                    $response = array( "id" => $row["i_id"],"item" => $row["nombre"], "desc" => $row["descripcion"], "color" => $row["color"], "quant" => $row["cantidad"], "total" => $row["precioTotal"], "carrItId" => $row["carrItID"], "c_id" => $row["c_id"]);
                    array_push($jsonData,$response);
                }

                echo json_encode($jsonData);

            }
            return $result;
        }
    }

    function delete_from_orders($id){
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
            $sql = "DELETE FROM Orden where id = '$id'";
            return mysqli_query($conn,$sql);
        }
    }

    function loading_messages($user){
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
            FROM Mensaje m
            WHERE user1 = '$user' OR user2 = '$user' ";
            $result = $conn -> query($sql);
            
            $jsonData = array();

            if ($result -> num_rows > 0){
                while ($row = $result->fetch_assoc()){
                    $response = array( "user" => $row["user1"],"msg" => $row["msj"]);
                    array_push($jsonData,$response);
                }

                echo json_encode($jsonData);

            }
            return $result;
        }
    }

    function create_user_msging($user,$msg){
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
                $sql = "INSERT INTO Mensaje (user1,user2,msj,seen)
                VALUES('$user', 'Admin', '$msg', 0)";
                return mysqli_query($conn,$sql);
            }
    }

    function load_user_msgs($user){
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
            FROM Mensaje m
            LEFT JOIN Users us
            ON m.user1 = us.username
            WHERE m.user2 = '$user' AND seen = 0
            GROUP BY m.user1";
            $result = $conn -> query($sql);
            
            $jsonData = array();

            if ($result -> num_rows > 0){
                while ($row = $result->fetch_assoc()){
                    $response = array( "user" => $row["user1"], "userID" => $row["userID"]);
                    array_push($jsonData,$response);
                }

                echo json_encode($jsonData);

            }
            return $result;
        }
    }

    function loading_messages_admin($userID){
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
            FROM Mensaje m
            LEFT JOIN Users us
            ON m.user1 = us.username OR m.user2 = us.username
            WHERE us.userID = '$userID'";
            $result = $conn -> query($sql);
            
            $jsonData = array();

            if ($result -> num_rows > 0){
                while ($row = $result->fetch_assoc()){
                    $response = array( "user" => $row["user1"],"msg" => $row["msj"]);
                    array_push($jsonData,$response);
                }

                echo json_encode($jsonData);

            }
            return $result;
        }
    }

    function create_admin_msging($user,$msg,$userToSend){
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
                $sql = "INSERT INTO Mensaje (user1,user2,msj,seen)
                VALUES('$user', '$userToSend', '$msg', 1)";
                return mysqli_query($conn,$sql);
            }
    }

    function getUserbyID($userID){
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
				  WHERE userID = '$userID'";
                $result = $conn -> query($sql);
                return $result;
            }
    }

    function update_seen_conv($user){
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
                $sql = "UPDATE Mensaje
                        SET seen=1
                        WHERE user1 = '$user' AND seen = 0";
                return mysqli_query($conn,$sql);
            }
    }


    
?>