<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request for OPTIONS method
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Send only the headers for preflight request and exit
    exit();
}

// Check if the request method is GET or POST (you can choose the one that suits your case)
if ($_SERVER['REQUEST_METHOD'] === 'GET' || $_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Establish a connection to your database
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "sod";

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check the connection and respond with a message
    if ($conn->connect_error) {
        // If connection fails, send an error message
        echo json_encode([
            "status" => "error",
            "message" => "Connection failed: " . $conn->connect_error
        ]);
    } else {
        // If connection is successful, send a success message
        echo json_encode([
            "status" => "success",
            "message" => "Connected successfully"
        ]);
    }

    // Close the database connection
    $conn->close();
}
?>