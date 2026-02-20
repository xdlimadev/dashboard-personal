<?php
session_start();

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');

if(isset($_SESSION['user_id'])) {
    http_response_code(200);
    echo json_encode(array(
        'authenticated' => true,
        'user' => array(
            'id' => $_SESSION['user_id'],
            'username' => $_SESSION['username']
        )
    ));
} else {
    http_response_code(401);
    echo json_encode(array('authenticated' => false));
}
