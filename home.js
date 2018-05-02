function changeImageBotas(str){
    switch(str){
        case 1:
            document.getElementById("imgBotas").src = "fotos/botas_moradoConAzul.jpg";
              break;
        case 2:
            document.getElementById("imgBotas").src = "fotos/botas_grisConVerde.jpg";
            break;
        case 3:
            document.getElementById("imgBotas").src = "fotos/botas_negroConAmarillo.jpg";
            break;
        case 4:
            document.getElementById("imgBotas").src = "fotos/botas_rojo.jpg";
            break;
        default:
           document.getElementById("imgBotas").src = "fotos/botas_moradoConAzul.jpg";
    }
}

function changeImageBufandas(str){
    switch(str){
        case 1:
            document.getElementById("imgBuf").src = "fotos/bufanda_azul.jpg";
              break;
        case 2:
            document.getElementById("imgBuf").src = "fotos/bufanda_cafe.jpg";
            break;
        default:
           document.getElementById("imgBuf").src = "fotos/bufanda_azul.jpg";
    }
}

function changeImageCapa(str){
    switch(str){
        case 1:
            document.getElementById("imgCapa").src = "fotos/capa_negra.jpg";
              break;
        case 2:
            document.getElementById("imgCapa").src = "fotos/capa_morada.jpg";
            break;
        default:
           document.getElementById("imgCapa").src = "fotos/capa_negra.jpg";
    }
}

function insertCapasToCart(id){
    var color = $("input[name='colorCapa']:checked").val();
    var item = id;
    var quant = $("input[name='quantCapa']").val();
    var total = 200 * parseInt(quant, 10);
    
    var jsonToSend = {
           "color" : color,
           "itemID" : item,
            "quant" : quant,
            "total" : total,
            "action" : "INSERT_TO_CART"
        };
        
        $.ajax({
            url: "login/user_app_layer.php",
            type: "POST",
            data: jsonToSend,
            dataType: "json",
            ContentType: "application/json",
            success: function(datacieved){
            },
            error: function(error){
                if(error.statusText == "OK"){
                    alert("SE AGREGÓ EL PRODUCTO A SU CARRITO!");
                }else{
                    alert(error.statusText);   
                }
            }
        });
    
}

function insertBotasToCart(id){
    var color = $("input[name='colorBotas']:checked").val();
    var item = id;
    var quant = $("input[name='quantBot']").val();
    var total = 200 * parseInt(quant, 10);
    
    var jsonToSend = {
           "color" : color,
           "itemID" : item,
            "quant" : quant,
            "total" : total,
            "action" : "INSERT_TO_CART"
        };
        
        $.ajax({
            url: "login/user_app_layer.php",
            type: "POST",
            data: jsonToSend,
            dataType: "json",
            ContentType: "application/json",
            success: function(datacieved){
            },
            error: function(error){
                if(error.statusText == "OK"){
                    alert("SE AGREGÓ EL PRODUCTO A SU CARRITO!");
                }else{
                    alert(error.statusText);   
                }
            }
        });
    
}

function insertBufandaToCart(id){
    var color = $("input[name='color']:checked").val();
    var item = id;
    var quant = $("input[name='quantBuf']").val();
    var total = 220 * parseInt(quant, 10);
    
    var jsonToSend = {
           "color" : color,
           "itemID" : item,
            "quant" : quant,
            "total" : total,
            "action" : "INSERT_TO_CART"
        };
        
        $.ajax({
            url: "login/user_app_layer.php",
            type: "POST",
            data: jsonToSend,
            dataType: "json",
            ContentType: "application/json",
            success: function(datacieved){ 
            },
            error: function(error){
                if(error.statusText == "OK"){
                    alert("SE AGREGÓ EL PRODUCTO A SU CARRITO!");
                }else{
                    alert(error.statusText);   
                }
            }
        });
    
}

function load_cart(){
        $.ajax({
        url: "login/user_app_Layer.php",
        type: "POST",
        data: {"action": "VIEW_CART"},
        dataType: "json",
        ContentType: "application/json",
        success: function(data){
            var table = document.getElementById("carrTable");
            for(var i = table.rows.length - 1; i > 0; i--){
                table.deleteRow(i);
            }
            var newHtml = "";
            var newHtml2 = "";
            for(var i = 0; i<data.length; i++){
                newHtml += '<tr>'
                newHtml += '<td>' + data[i].id + '</td>'
                newHtml += '<td>' + data[i].item + '</td>'
                newHtml += '<td>' + data[i].desc + '</td>'
                newHtml += '<td>' + data[i].color + '</td>'
                newHtml += '<td>' + data[i].quant + '</td>'
                newHtml += '<td>' + data[i].total + '</td>'
                newHtml += '<td><img src="fotos/trash.png" onclick="deleteItem('+data[i].carrItId+', this)"; height="25" width="25" "></td>'
                newHtml += '</tr>'
            }
            $("#carrTable").append(newHtml);
            newHtml2 += '<input id="carrID" name="prodId" type="hidden" value='+data[0].c_id+'>';
            $("#tableCont").append(newHtml2);
            
        },            
        error: function(error){
            var table = document.getElementById("carrTable");
            for(var i = table.rows.length - 1; i > 0; i--){
                table.deleteRow(i);
            }
        }
    })
}

function load_orders(){
    $.ajax({
        url: "login/user_app_Layer.php",
        type: "POST",
        data: {"action": "VIEW_ORDERS"},
        dataType: "json",
        ContentType: "application/json",
        success: function(data){
            var table = document.getElementById("orderTable");
            for(var i = table.rows.length - 1; i > 0; i--){
                table.deleteRow(i);
            }
            var newHtml = "";
            for(var i = 0; i<data.length; i++){
                newHtml += '<tr>'
                newHtml += '<td>' + data[i].id + '</td>'
                newHtml += '<td>' + data[i].cliente + '</td>'
                newHtml += '<td>' + data[i].dir + '</td>'
                newHtml += '<td><img data-toggle="modal" href="#detailModal"      src="fotos/detail.png" onclick="showDetail('+data[i].id_carr+')"; height="25" width="25" "></td>'
                newHtml += '<td><img src="fotos/trash.png" onclick="deletePedido('+data[i].id+', this)"; height="25" width="25" "></td>'
                newHtml += '</tr>'
            }
            $("#orderTable").append(newHtml);
            
        },            
        error: function(error){
            var table = document.getElementById("orderTable");
            for(var i = table.rows.length - 1; i > 0; i--){
                table.deleteRow(i);
            }
        }
    })
}

function deleteItem(id,elem){
    var carrItID = id;
        var jsonToSend = {
           "id" : carrItID,
            "action" : "DELETE_FROM_CART"
        };
        
    var table = elem.parentNode.parentNode.parentNode;
    var row = elem.parentNode.parentNode;
    var count = table.rows.length;
    
        $.ajax({
            url: "login/user_app_layer.php",
            type: "POST",
            data: jsonToSend,
            dataType: "json",
            ContentType: "application/json",
            success: function(datacieved){
                row.parentNode.removeChild(row);
            },
            error: function(error){
                if(error.statusText == "OK"){
                    row.parentNode.removeChild(row);
                }else{
                    alert(error.statusText);   
                }
                //alert(error.statusText);
            }
        });
    
}

function createOrder(){
    var carr_id = $('#carrID').val();
        var jsonToSend = {
           "id_carr" : carr_id,
            "action" : "CREATE_ORDER"
        };
        
        $.ajax({
            url: "login/user_app_layer.php",
            type: "POST",
            data: jsonToSend,
            dataType: "json",
            ContentType: "application/json",
            success: function(datacieved){
                
            },
            error: function(error){
                if(error.statusText == "OK"){
                    alert("SE HA CREADO LA ORDEN");
                }else{
                    alert(error.statusText);   
                }
                //alert(error.statusText);
            }
        });
    
}

function showDetail(id_carr){
    $.ajax({
        url: "login/user_app_Layer.php",
        type: "POST",
        data: {"action": "VIEW_DETAIL","id_carr": id_carr},
        dataType: "json",
        ContentType: "application/json",
        success: function(data){
            var table = document.getElementById("detailTable");
            for(var i = table.rows.length - 1; i > 0; i--){
                table.deleteRow(i);
            }
            var newHtml = "";
            var newHtml2 = "";
            for(var i = 0; i<data.length; i++){
                newHtml += '<tr>'
                newHtml += '<td>' + data[i].id + '</td>'
                newHtml += '<td>' + data[i].item + '</td>'
                newHtml += '<td>' + data[i].desc + '</td>'
                newHtml += '<td>' + data[i].color + '</td>'
                newHtml += '<td>' + data[i].quant + '</td>'
                newHtml += '<td>' + data[i].total + '</td>'
                newHtml += '</tr>'
            }
            $("#detailTable").append(newHtml);
        },            
        error: function(error){
            var table = document.getElementById("detailTable");
            for(var i = table.rows.length - 1; i > 0; i--){
                table.deleteRow(i);
            }
        }
    })
}

function deletePedido(id,elem){
    var carrItID = id;
        var jsonToSend = {
           "id" : carrItID,
            "action" : "DELETE_FROM_ORDERS"
        };
        
    var table = elem.parentNode.parentNode.parentNode;
    var row = elem.parentNode.parentNode;
    var count = table.rows.length;
    
        $.ajax({
            url: "login/user_app_layer.php",
            type: "POST",
            data: jsonToSend,
            dataType: "json",
            ContentType: "application/json",
            success: function(datacieved){
                row.parentNode.removeChild(row);
            },
            error: function(error){
                if(error.statusText == "OK"){
                    row.parentNode.removeChild(row);
                }else{
                    alert(error.statusText);   
                }
                //alert(error.statusText);
            }
        });
    
}

function load_chat(){
    $.ajax({
        url: "login/user_app_Layer.php",
        type: "POST",
        data: {"action": "VIEW_CHAT"},
        dataType: "json",
        ContentType: "application/json",
        success: function(data){
            var table = document.getElementById("chatTable");
            for(var i = table.rows.length - 1; i > 0; i--){
                table.deleteRow(i);
            }
            var newHtml = "";
            var newHtml2 = "";
            for(var i = 0; i<data.length; i++){
                newHtml += '<tr>'
                newHtml += '<td>' + data[i].user + '</td>'
                newHtml += '<td>' + data[i].msg + '</td>'
                newHtml += '</tr>'
            }
            $("#chatTable").append(newHtml);
            newHtml2 += '<input id="user" name="prodId" type="hidden" value='+data[0].user+'>';
            $("#tableCont3").append(newHtml2);
        },            
        error: function(error){
            var table = document.getElementById("chatTable");
            for(var i = table.rows.length - 1; i > 0; i--){
                table.deleteRow(i);
            }
        }
    })
}

function createMsg_fromUser(){
        var user;
        var newHtml;
        newHtml = "";
        user = $('#user').val();
        var jsonToSend = {
            "msg" : $('#msgID').val(),
            "action" : "CREATE_MSG_USER"
        };
        
        $.ajax({
            url: "login/user_app_layer.php",
            type: "POST",
            data: jsonToSend,
            dataType: "json",
            ContentType: "application/json",
            success: function(datacieved){
                
            },
            error: function(error){
                if(error.statusText == "OK"){
                    newHtml += '<tr>'
                    newHtml += '<td>' + user + '</td>'
                    newHtml += '<td>' + $('#msgID').val() + '</td>'
                    newHtml += '</tr>'
                    $("#chatTable").append(newHtml);
                    //alert("SE HA CREADO LA ORDEN");
                }else{
                    alert(error.statusText);   
                }
                //alert(error.statusText);
            }
        });
}

function createMsg_fromAdmin(){
        var user;
        var newHtml;
        newHtml = "";
        user = "Admin";
        var jsonToSend = {
            "msg" : $('#msgID').val(),
            "userID": $('#userID').val(),
            "action" : "CREATE_MSG_ADMIN"
        };
        
        $.ajax({
            url: "login/user_app_layer.php",
            type: "POST",
            data: jsonToSend,
            dataType: "json",
            ContentType: "application/json",
            success: function(datacieved){
                
            },
            error: function(error){
                if(error.statusText == "OK"){
                    newHtml += '<tr>'
                    newHtml += '<td>' + user + '</td>'
                    newHtml += '<td>' + $('#msgID').val() + '</td>'
                    newHtml += '</tr>'
                    $("#chatTable").append(newHtml);
                    //alert("SE HA CREADO LA ORDEN");
                }else{
                    alert(error.statusText);   
                }
                //alert(error.statusText);
            }
        });
}

function load_users_chat(){
    $.ajax({
        url: "login/user_app_Layer.php",
        type: "POST",
        data: {"action": "VIEW_USER_MSGS"},
        dataType: "json",
        ContentType: "application/json",
        success: function(data){
            var table = document.getElementById("msgAdminTable");
            for(var i = table.rows.length - 1; i > 0; i--){
                table.deleteRow(i);
            }
            var newHtml = "";
            for(var i = 0; i<data.length; i++){
                newHtml += '<tr>'
                newHtml += '<td>' + data[i].user + '</td>'
                newHtml += '<td><img data-toggle="modal" href="#chatModal"      src="fotos/detail.png" onclick="showChat('+data[i].userID+')"; height="25" width="25" "></td>'
                newHtml += '<td><img src="fotos/eye.png" onclick="seenMsg('+data[i].userID+', this)"; height="25" width="25" "></td>'
                newHtml += '</tr>'
            }
            $("#msgAdminTable").append(newHtml);
            
        },            
        error: function(error){
            var table = document.getElementById("msgAdminTable");
            for(var i = table.rows.length - 1; i > 0; i--){
                table.deleteRow(i);
            }
        }
    })
}

function showChat(userID){
    $.ajax({
        url: "login/user_app_Layer.php",
        type: "POST",
        data: {"action": "VIEW_CHAT_ADMIN", "user": userID},
        dataType: "json",
        ContentType: "application/json",
        success: function(data){
            var table = document.getElementById("chatTable");
            for(var i = table.rows.length - 1; i > 0; i--){
                table.deleteRow(i);
            }
            var newHtml = "";
            var newHtml2 = "";
            for(var i = 0; i<data.length; i++){
                newHtml += '<tr>'
                newHtml += '<td>' + data[i].user + '</td>'
                newHtml += '<td>' + data[i].msg + '</td>'
                newHtml += '</tr>'
            }
            $("#chatTable").append(newHtml);
            newHtml2 += '<input id="userID" name="prodId" type="hidden" value='+userID+'>';
            $("#tableCont2").append(newHtml2);
        },            
        error: function(error){
            var table = document.getElementById("chatTable");
            for(var i = table.rows.length - 1; i > 0; i--){
                table.deleteRow(i);
            }
        }
    })
}

function seenMsg(userID,elem){
        var jsonToSend = {
           "userID" : userID,
            "action" : "UPDATE_SEEN"
        };
        
    var table = elem.parentNode.parentNode.parentNode;
    var row = elem.parentNode.parentNode;
    var count = table.rows.length;
    
        $.ajax({
            url: "login/user_app_layer.php",
            type: "POST",
            data: jsonToSend,
            dataType: "json",
            ContentType: "application/json",
            success: function(datacieved){
                row.parentNode.removeChild(row);
            },
            error: function(error){
                if(error.statusText == "OK"){
                    row.parentNode.removeChild(row);
                }else{
                    alert(error.statusText);   
                }
                //alert(error.statusText);
            }
        });
}