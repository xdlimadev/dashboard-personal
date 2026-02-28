<?php
session_start();

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; chart=UTF-8');
header('Access-Control-Allow-Methods: GET');

require_once '../config/database.php';

if(!isset($_SESSION['user_id'])){
    http_response_code(401);
    echo json_encode(array("message" => "Unauthorized, please login"));
    exit();
}

$database = new Database();
$conn = $database->getConnection();

$query ="SELECT id, title, content, color FROM notes WHERE user_id = :user_id ORDER BY created_at ASC";
$stmt = $conn->prepare($query);

$user_id = $_SESSION['user_id'];
$stmt-> bindParam(":user_id", $user_id);

$stmt-> execute();
$notes = $stmt->fetchAll(PDO::FETCH_ASSOC);

http_response_code(200);
echo json_encode(array("notes" => $notes));