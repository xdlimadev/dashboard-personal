<?php
session_start();

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');

require_once '../config/database.php';

if(!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(array('message' => 'Unauthorized, please login'));
    exit();
}

$database = new Database();
$conn = $database->getConnection();

$data = json_decode(file_get_contents('php://input'));

if(!empty($data->id)) {
    $query = 'UPDATE tasks SET text = :text, state = :state, task_order = :task_order WHERE id = :task_id AND user_id = :user_id';
    $stmt = $conn->prepare($query);

    $stmt->bindParam(':user_id', $_SESSION['user_id']);
    $stmt->bindParam(':task_id', $data->id);
    $stmt->bindParam(':text', $data->text);
    $stmt->bindParam(':state', $data->state);
    $stmt->bindParam(':task_order', $data->task_order);

    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array('message' => 'Task updated successfully'));
    } else {
        http_response_code(500);
        echo json_encode(array('message' => 'Failed to update task'));
    }
}
else {
    http_response_code(400);
    echo json_encode(array('message' => 'Incomplete data, task ID is required'));
}
