<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json", "charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

if(!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode(array("message" => "Unauthorized, please login"));
    exit();
}

$database = new Database();
$conn = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->text)){

    $query = "INSERT INTO tasks (user_id, text, state, task_order) VALUES (:user_id, :text, :state, :task_order)";
    $stmt = $conn->prepare($query);

    $user_id = $_SESSION["user_id"];
    $text = $data->text;
    $state = isset($data->state) ? $data->state: 'pending';
    $task_order = isset($data->task_order) ? $data->task_order: 0;

    $stmt->bindParam(":user_id", $user_id);
    $stmt->bindParam(":text", $text);
    $stmt->bindParam(":state", $state);
    $stmt->bindParam(":task_order", $task_order);


    if($stmt -> execute()){
        $task_id = $conn -> lastInsertId();

        http_response_code(201);
        echo json_encode(array(
            "message" => "Task created successfully",
            "task" => array(
                "id" => $task_id,
                "text" => $text,
                "state" => $state,
                "task_order" => $task_order
            )
        ));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Failed to create task"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data, 'text' is required"));
}
