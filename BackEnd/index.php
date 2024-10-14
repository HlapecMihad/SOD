<?php
// Establish a connection to your database
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "sod";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection and respond
if ($conn->connect_error) {
   // If connection fails, send an error message
   echo "Connection failed: " . $conn->connect_error;
} else {
   // If connection is successful, send a success message
   echo "Connection is stable!";
}

// Close the database connection
$conn->close();
?>
