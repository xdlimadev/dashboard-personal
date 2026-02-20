<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

require_once '../config/database.php';

// Verificar sesión
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(array("message" => "Unauthorized"));
    exit();
}

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->tasks) && is_array($data->tasks)) {

    $success = true;

    // Actualizar cada tarea
    foreach ($data->tasks as $taskData) {
        $query = "UPDATE tasks SET task_order = :task_order WHERE id = :id AND user_id = :user_id";
        $stmt = $db->prepare($query);

        $stmt->bindParam(":task_order", $taskData->task_order);
        $stmt->bindParam(":id", $taskData->id);
        $stmt->bindParam(":user_id", $_SESSION['user_id']);

        if (!$stmt->execute()) {
            $success = false;
            break;
        }
    }

    if ($success) {
        http_response_code(200);
        echo json_encode(array("message" => "Tasks order updated successfully"));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Failed to update tasks order"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Invalid data"));
}
