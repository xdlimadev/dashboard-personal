<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->email) && !empty($data->password)) {

    $query = "SELECT id FROM users WHERE username = :username OR email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":username", $data->username);
    $stmt->bindParam(":email", $data->email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(array("message" => "Username or email already exists."));
    } else {
        $password_hash = password_hash($data->password, PASSWORD_BCRYPT);

        $query = "INSERT INTO users (username, email, password) VALUES (:username, :email, :password)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":username", $data->username);
        $stmt->bindParam(":email", $data->email);
        $stmt->bindParam(":password", $password_hash);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(array("message" => "User registered successfully."));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Failed to register user."));
        }
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data. Please provide username, email, and password."));
}
