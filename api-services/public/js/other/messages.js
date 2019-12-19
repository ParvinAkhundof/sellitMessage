
var user_id = "1300921";/////////it is user which is logged in
/////////////////////loading all connection with users and creating a list of user's matrical numbers.(begin)
var users = [];
req = new XMLHttpRequest();
req.open("GET", '/api/v1/chat/' + user_id, true);
req.send();
req.onload = function () {
    json = JSON.parse(req.responseText);
    var body = "";
    for (var i = json.rows.length - 1; i >= 0; i--) {
        body += "<div id='" + json.rows[i].matrikel_number + "' onclick='getAllMessages(" + json.rows[i].matrikel_number+")' class='chat_list active_chat'>\
             <div class='chat_people'>\
               <div class='chat_img'> <img src='https://ptetutorials.com/images/user-profile.png' alt='sunil'> </div>\
               <div class='chat_ib'>\
                 <h5>"+ json.rows[i].first_name + json.rows[i].last_name + "<span class='chat_date'>" + json.rows[i].created_date + "</span></h5>\
                 <p>"+ json.rows[i].first_name + json.rows[i].last_name + "</p>\
               </div>\
             </div>\
           </div>";
        users.push(json.rows[i].matrikel_number);
    }
    console.log(json.rows.length);
    document.getElementById('inbox_chat').innerHTML = body;
};
///////////////////(end)

////////////////////////when you click to any user to get all message history(begin)
function getAllMessages(secondUser_id) {
    console.log(user_id + "-" + secondUser_id);
    var params = 'receiver_id=' + secondUser_id + '&sender_id=' + user_id;



    req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        json = JSON.parse(req.responseText);
        var body = "";
        for (var i = 0; i < json.rows.length; i++) {
            if (json.rows[i].matrikel_number == secondUser_id) {

                body += "<div class='incoming_msg'>\
         <div class='incoming_msg_img'> <img src='https://ptetutorials.com/images/user-profile.png' alt='sunil'> </div>\
         <div class='received_msg'>\
           <div class='received_withd_msg'>\
             <p>"+ json.rows[i].message + "</p>\
             <span class='time_date'>"+ json.rows[i].created_date + "</span></div>\
         </div>\
       </div>"

            }
            else if (json.rows[i].matrikel_number == user_id) {

                body += "<div class='outgoing_msg'>\
         <div class='sent_msg'>\
           <p>"+ json.rows[i].message + "</p>\
           <span class='time_date'>"+ json.rows[i].created_date + "</span> </div>\
       </div>"

            }

        }
        document.getElementById('msg_history').innerHTML = body;
        var msg_send = "\
    <input id='write_msg' onkeypress='sendMessageEnter(event,"+ user_id + ", " + secondUser_id + "," + json.rows[0].product_id + ")' type='text' class='write_msg' placeholder='Type a message' />\
    <button onclick='sendMessage("+ user_id + ", " + secondUser_id + "," + json.rows[0].product_id + ")' class='msg_send_btn' type='button'><i class='fa fa-paper-plane-o' aria-hidden='true'></i></button>"

        document.getElementById('input_msg_write').innerHTML = msg_send;
    };
    req.open("POST", '/api/v1/chat/getAllMessages/', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    req.send(params);

///////////////it is going to use a list of users, matrikal number to change bacground colour, which is selected(begin)
    for (var i = 0; i < users.length; i++) {

        if (users[i] == secondUser_id) {
            console.log("users" + users[i])
            console.log(secondUser_id)
            document.getElementById(users[i]).style.background = '#7CCDF5';
        }
        else if (users[i] != secondUser_id) {
            document.getElementById(users[i]).style.background = '#EBEBEB';
        }
    }
    ////////////(end)

}

////////(end)

function sendMessageEnter(e, sender_id, receiver_id, product_id) {
    //See notes about 'which' and 'key'
    if (e.keyCode == 13) {
        sendMessage(sender_id, receiver_id, product_id);
    }
}

function sendMessage(sender_id, receiver_id, product_id) {

    var message = document.getElementById('write_msg').value;
    var currentdate = new Date();
    var created_date = "" + currentdate.getFullYear() + "-"
        + (currentdate.getMonth() + 1) + "-"
        + currentdate.getDate() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    var modified_date = created_date;

    var params = 'receiver_id=' + receiver_id + '&sender_id=' + sender_id + '&product_id=' + product_id + '&message=' + message + '&created_date=' + created_date + '&modified_date=' + modified_date;



    req = new XMLHttpRequest();
    req.open("POST", '/api/v1/chat/sendMessage/', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    req.send(params);

    var body = document.getElementById('msg_history').innerHTML;

    body += "<div class='outgoing_msg'>\
         <div class='sent_msg'>\
           <p>"+ message + "</p>\
           <span class='time_date'>"+ created_date + "</span> </div>\
       </div>"

    document.getElementById('msg_history').innerHTML = body;
    document.getElementById('write_msg').value = "";

    var messageBody = document.querySelector('#msg_history');
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

}

////////////////////messages for productPage , Chat with seller

function showMessageBox() { document.getElementById('messagesBox').style.display = 'contents'; }
function sendMessageP(sender_id, receiver_id, product_id) {

    var message = document.getElementById('message').value;
    var currentdate = new Date();
    var created_date = "" + currentdate.getFullYear() + "-"
        + (currentdate.getMonth() + 1) + "-"
        + currentdate.getDate() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    var modified_date = created_date;

    var params = 'receiver_id=' + receiver_id + '&sender_id=' + sender_id + '&product_id=' + product_id + '&message=' + message + '&created_date=' + created_date + '&modified_date=' + modified_date;



    req = new XMLHttpRequest();
    req.open("POST", '/api/v1/chat/sendMessage/', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    req.send(params);
    document.getElementById('message').value = "";
    document.getElementById('messagesBox').style.display = 'none';
}