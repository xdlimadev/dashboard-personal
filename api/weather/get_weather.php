<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Cargar secrets
$secrets = require_once '../config/secrets.php';
$apiKey = $secrets['weather_api_key'];

// Obtener parámetros
$lat = isset($_GET['lat']) ? $_GET['lat'] : null;
$lon = isset($_GET['lon']) ? $_GET['lon'] : null;
$city = isset($_GET['city']) ? $_GET['city'] : null;

if (!$lat && !$lon && !$city) {
    http_response_code(400);
    echo json_encode(array("message" => "Latitude/Longitude or City required"));
    exit();
}

// Construir URL de OpenWeatherMap
$baseUrl = "https://api.openweathermap.org/data/2.5/weather";

if ($city) {
    $url = $baseUrl . "?q=" . urlencode($city) . "&appid=" . $apiKey . "&units=metric&lang=es";
} else {
    $url = $baseUrl . "?lat=" . $lat . "&lon=" . $lon . "&appid=" . $apiKey . "&units=metric&lang=es";
}

// Hacer petición a OpenWeatherMap
$response = file_get_contents($url);

if ($response === false) {
    http_response_code(500);
    echo json_encode(array("message" => "Error fetching weather data"));
    exit();
}

// Devolver respuesta
http_response_code(200);
echo $response;
