<?php
session_start();

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: PUT');

require_once '../config/database.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(array("message" => "Unauthorized, please login"));
    exit();
}

$database = new Database();
$conn = $database->getConnection();

$data = json_decode(file_get_contents('php://input'));
if (!empty($data->id)) {
    $query = "UPDATE notes SET title = :title, content = :content
        WHERE id = :note_id AND user_id = :user_id";

    $stmt = $conn->prepare($query);

    $stmt->bindParam(':user_id', $_SESSION['user_id']);
    $stmt->bindParam(':note_id', $data->id);
    $stmt->bindParam(':title', $data->title);
    $stmt->bindParam(':content', $data->content);


    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array('message' => 'Notes updated successfully'));
    } else {
        http_response_code(500);
        echo json_encode(array('message' => 'Failed to update note'));
    }
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'Incomplete data, note ID is required'));
}
