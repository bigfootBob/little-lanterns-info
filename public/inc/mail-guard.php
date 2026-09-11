<?php
// Shared request guards for the site's mail-sending endpoints
// (subscribe.php, contact.php, waitlist.php).

// Origins allowed to read the JSON response via CORS. Requests from
// other origins still execute (CORS only blocks the browser from
// reading the response), so this is paired with rate limiting below,
// not relied on alone. Update this list if the production domain
// changes.
const ALLOWED_ORIGINS = [
    'https://littlelanterns.info',
    'https://www.littlelanterns.info',
];

function send_cors_headers(): void
{
    header('Content-Type: application/json');
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, ALLOWED_ORIGINS, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

function handle_preflight(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

function require_post_method(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        exit;
    }
}

// Simple sliding-window rate limit per client IP, backed by a file in
// the system temp dir. Fails open (allows the request) if the temp
// dir isn't writable, so storage problems never block legitimate mail.
function rate_limit_ok(string $bucket, int $maxRequests, int $windowSeconds): bool
{
    $ip  = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $dir = sys_get_temp_dir() . '/little-lanterns-ratelimit';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }
    $file = $dir . '/' . $bucket . '_' . md5($ip) . '.json';

    $fh = @fopen($file, 'c+');
    if (!$fh) {
        return true;
    }

    flock($fh, LOCK_EX);
    $raw  = stream_get_contents($fh);
    $data = $raw !== '' ? json_decode((string) $raw, true) : null;
    $now  = time();

    if (!is_array($data) || ($now - ($data['start'] ?? 0)) > $windowSeconds) {
        $data = ['start' => $now, 'count' => 0];
    }
    $data['count']++;
    $ok = $data['count'] <= $maxRequests;

    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($data));
    fflush($fh);
    flock($fh, LOCK_UN);
    fclose($fh);

    return $ok;
}

function reject_rate_limited(): void
{
    http_response_code(429);
    echo json_encode(['error' => 'Too many requests. Please try again later.']);
    exit;
}

// Strips characters that could be used for SMTP header injection if
// slipped into a header value (Reply-To, From, etc). Email addresses
// are also validated separately with FILTER_VALIDATE_EMAIL, which
// already rejects control characters — this is defense in depth.
function strip_header_injection(string $value): string
{
    return trim(preg_replace('/[\r\n\x00-\x1F]+/', '', $value));
}

function read_json_body(): array
{
    $input = json_decode((string) file_get_contents('php://input'), true);
    return is_array($input) ? $input : [];
}

// Honeypot field: bots that fill in this hidden field get a fake
// success response so they don't learn they were caught.
function honeypot_tripped(array $input): bool
{
    $value = isset($input['website']) ? trim((string) $input['website']) : '';
    return $value !== '';
}

function respond_fake_success(): void
{
    echo json_encode(['success' => true]);
    exit;
}
