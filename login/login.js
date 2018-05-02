
function redirectHome(){
    var url = "../home.html";    
    $(location).attr('href',url);
}

function redirectHomeAdmin(){
    var url = "../homeAdmin.html";    
    $(location).attr('href',url);
}

function validateLoginForm(){
    var error = false;
    var username = $("#loginForm input[name=userName]").val();
    var psw = $("#loginForm input[name=psw]").val();
    console.log(username);

    if (username == "") {
        $('#userValid').show();
        error = true;
    }else{
        $('#userValid').hide();
    }
    if (psw == "") {
        $('#pswValid').show();
        error = true;
    }else{
        $('#pswValid').hide();
    }
    
    if(error == true){
        return false;
    }else{
        var jsonToSend = {
           "username" : username,
           "password" : psw,
            "action" : "LOGIN"
        };
        
        $.ajax({
            url: "user_app_layer.php",
            type: "POST",
            data: jsonToSend,
            dataType: "json",
            ContentType: "application/json",
            success: function(datacieved){
                console.log(datacieved);
                if(datacieved == "Admin"){
                    redirectHomeAdmin();
                }else{
                    redirectHome();
                }     
            },
            error: function(error){
                alert(error.statusText);
            }
        });
    }
}

function validateRegiForm() {
    var error = false;
    var fname = $("#regiForm input[name=fName]").val();
    var lname = $("#regiForm input[name=lName]").val();
    var username = $("#regiForm input[name=userName]").val();
    var email = $("#regiForm input[name=email]").val();
    var password = $("#regiForm input[name=password]").val();
    var passwordConf = $("#regiForm input[name=conf]").val();
    var address = $("#regiForm input[name=address]").val();
    var tel = $("#regiForm input[name=tel]").val();
    if (fname == "") {
        $('#nameValid').show();
        error = true;
    }else{
        $('#nameValid').hide();
    }
    if (lname == "") {
        $('#lnameValid').show();
        error = true;
    }else{
        $('#lnameValid').hide();
    }
    if (username == "") {
        $('#usernameValid').show();
        error = true;
    }else{
        $('#usernameValid').hide();
    }
    if (email == "") {
        $('#emailValid').show();
        error = true;
    }else{
        $('#emailValid').hide();
    }
    if (password == "") {
        $('#passValid').show();
        error = true;
    }else{
        $('#passValid').hide();
    }
    if (passwordConf == "") {
        $('#confValid2').show();
        error = true;
    }else{
        $('#confValid2').hide();
    }
    if(passwordConf != password && passwordConf != ""){
        $('#confValid').show();
        error = true;
    }else{
        $('#confValid').hide();
    }
    if (address == "") {
        $('#addressValid').show();
        error = true;
    }else{
        $('#addressValid').hide();
    }
    if (tel == "") {
        $('#tellValid').show();
        error = true;
    }else{
        $('#tellValid').hide();
    }
    if($('[name="gender"]').is(':checked')){
        $('#gendValid').hide();
    }else{
        $('#gendValid').show();
        error = true;
    }
    if(error == true){
        return false;
    }else{
        var gendVal = $("input[name='gender']:checked").val();
        var jsonToSend = {
            "firstName" : fname,
            "lastName" : lname,
            "username" : username,
            "email" : email,
            "password" : password,
            "gender" : gendVal,
            "address" : address,
            "tel" : tel,
            "action" : "REGISTER"
        };
        
        $.ajax({
            url: "user_app_layer.php",
            type: "POST",
            data: jsonToSend,
            dataType: "json",
            ContentType: "application/json",
            success: function(datacieved){
                redirectHome();     
            },
            error: function(error){
                alert(error.statusText);
            }
        });
    }
}