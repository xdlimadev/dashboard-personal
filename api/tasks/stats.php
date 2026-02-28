<?php
session_start();

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

require_once '../config/database.php';

// 1. Verificar sesión
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(array('message' => 'Unauthorized'));
    exit();
}

$database = new Database();
$conn = $database->getConnection();
$user_id = $_SESSION['user_id'];

// 2. Contar tareas por estado
$query_states = "SELECT 
    SUM(CASE WHEN state = 'pending' THEN 1 ELSE 0 END) as pending,
    SUM(CASE WHEN state = 'progress' THEN 1 ELSE 0 END) as progress,
    SUM(CASE WHEN state = 'completed' THEN 1 ELSE 0 END) as completed
FROM tasks 
WHERE user_id = :user_id";

$stmt = $conn->prepare($query_states);
$stmt->execute([':user_id' => $user_id]);
$states = $stmt->fetch(PDO::FETCH_ASSOC);

// 3. Contar tareas completadas por día (últimos 7 días)
$query_timeline = "SELECT 
    DATE(completed_at) as date,
    COUNT(*) as count
FROM tasks 
WHERE user_id = :user_id
    AND state = 'completed' 
    AND completed_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY DATE(completed_at)
ORDER BY date ASC";

$stmt = $conn->prepare($query_timeline);
$stmt->bindParam(':user_id', $user_id);
$stmt->execute();
$timeline = $stmt->fetchAll(PDO::FETCH_ASSOC);

// 4. Construir respuesta
$response = array(
    'pending' => (int)$states['pending'],
    'progress' => (int)$states['progress'],
    'completed' => (int)$states['completed'],
    'timeline' => $timeline
);

http_response_code(200);
echo json_encode($response);
