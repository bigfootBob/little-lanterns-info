<?php
require_once __DIR__ . '/inc/mail-guard.php';

send_cors_headers();
handle_preflight();
require_post_method();

if (!rate_limit_ok('contact', 5, 600)) {
    reject_rate_limited();
}

$input   = read_json_body();
$name    = isset($input['name'])    ? trim($input['name'])    : '';
$email   = isset($input['email'])   ? trim($input['email'])   : '';
$message = isset($input['message']) ? trim($input['message']) : '';

if (honeypot_tripped($input)) {
    respond_fake_success();
}

if ($name === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Name and message are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

$to           = 'community@littlelanterns.info';
$subject      = 'New Contact Form Message';
$safe_name    = strip_header_injection($name);
$body         = "New message from the Little Lanterns contact form.\n\n"
              . "Name: {$safe_name}\n"
              . "Email: {$email}\n\n"
              . "Message:\n{$message}\n";
$safe_email   = strip_header_injection($email);
$headers      = "From: noreply@littlelanterns.info\r\nReply-To: {$safe_email}\r\nContent-Type: text/plain; charset=UTF-8";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message']);
}
