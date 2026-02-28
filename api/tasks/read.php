<?php

session_start();


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

require_once "../config/database.php";

if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode(array("message" => "Unauthorized, please login"));
    exit();
}

$database = new Database();
$conn = $database->getConnection();

$query = "SELECT id, text, state, task_order FROM tasks WHERE user_id = :user_id ORDER BY task_order ASC";
$stmt = $conn->prepare($query);

$user_id = $_SESSION["user_id"];
$stmt->bindParam(":user_id", $user_id);

$stmt->execute();
$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

http_response_code(200);
echo json_encode(array("tasks" => $tasks));
