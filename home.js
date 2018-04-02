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
                alert(error.statusText);
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
                alert(error.statusText);
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
                alert(error.statusText);
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
            for(var i = 0; i<data.length; i++){
                newHtml += '<tr>'
                newHtml += '<td>' + data[i].id + '</td>'
                newHtml += '<td>' + data[i].item + '</td>'
                newHtml += '<td>' + data[i].desc + '</td>'
                newHtml += '<td>' + data[i].color + '</td>'
                newHtml += '<td>' + data[i].quant + '</td>'
                newHtml += '<td>' + data[i].total + '</td>'
                newHtml += '<td><img src="fotos/trash.png" onclick="deleteItem('+data[i].carrItId+')"; height="25" width="25" "></td>'
                newHtml += '</tr>'
            }
            $("#carrTable").append(newHtml);
        },            
        error: function(error){
            var table = document.getElementById("carrTable");
            for(var i = table.rows.length - 1; i > 0; i--){
                table.deleteRow(i);
            }
        }
    })
}

function deleteItem(id){
    var carrItID = id;
    console.log(carrItID);
        var jsonToSend = {
           "id" : carrItID,
            "action" : "DELETE_FROM_CART"
        };
        
        $.ajax({
            url: "login/user_app_layer.php",
            type: "POST",
            data: jsonToSend,
            dataType: "json",
            ContentType: "application/json",
            success: function(datacieved){
                location.reload();
            },
            error: function(error){
                alert(error.statusText);
            }
        });
    
}