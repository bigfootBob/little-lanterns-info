<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$email    = isset($input['email'])   ? trim($input['email'])   : '';
$honeypot = isset($input['website']) ? trim($input['website']) : '';

if ($honeypot !== '') {
    // Silently succeed so bots don't know they were caught
    echo json_encode(['success' => true]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

$to      = 'community@littlelanterns.info';
$subject = 'New Newsletter Subscriber';
$body    = "A new subscriber has signed up for the Little Lanterns newsletter.\n\nEmail: {$email}\n";
$safe_email = str_replace(["\r", "\n", "%0a", "%0d"], '', $email);
$headers = "From: noreply@littlelanterns.info\r\nReply-To: {$safe_email}\r\nContent-Type: text/plain; charset=UTF-8";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
