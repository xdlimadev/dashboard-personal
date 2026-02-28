<?php
session_start();

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST');

require_once '../config/database.php';

if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode(array("message" => "Unauthorized, please login"));
    exit();
}

$database = new Database();
$conn = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));
if (!empty($data->title)) {
    $query = "INSERT INTO notes (user_id, title, content, color) VALUES (:user_id, :title, :content, :color)";
    $stmt = $conn->prepare($query);

    $user_id = $_SESSION["user_id"];
    $title = $data->title;
    $content = $data->content;
    $color = $data->color;

    $stmt->bindParam(":user_id", $user_id);
    $stmt->bindParam(":title", $title);
    $stmt->bindParam(":content", $content);
    $stmt->bindParam(":color", $color);

    if ($stmt->execute()) {
        $note_id = $conn->lastInsertId();

        http_response_code(201);
        echo json_encode(array(
            "message" => "Note created successfully",
            "note" => array(
                "id" => $note_id,
                "title" => $title,
                "content" => $content,
                "color" => $color
            )
        ));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Failed to create note"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data, title is required"));
}
