<?php

session_start();

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');

session_unset();

session_destroy();

http_response_code(200);
echo json_encode(array('message' => 'Logout successful'));
