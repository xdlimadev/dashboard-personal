<?php
session_start();

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');

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
    $query = 'DELETE FROM tasks WHERE id = :task_id AND user_id = :user_id';
    $stmt = $conn->prepare($query);

    $stmt->bindParam(':user_id', $_SESSION['user_id']);
    $stmt->bindParam(':task_id', $data->id);

    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array('message' => 'Task deleted successfully'));
    } else {
        http_response_code(500);
        echo json_encode(array('message' => 'Failed to delete task'));
    }
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'Incomplete data, task ID is required'));
}
