<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

function respond(int $status, array $payload): void {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: GET, POST');
    respond(405, ['error' => 'Method not allowed']);
}
if (!empty($_SERVER['HTTP_ORIGIN'])) {
    $originHost = parse_url($_SERVER['HTTP_ORIGIN'], PHP_URL_HOST);
    $requestHost = strtolower((string)($_SERVER['HTTP_HOST'] ?? ''));
    if (!$originHost || strtolower($originHost) !== preg_replace('/:\d+$/', '', $requestHost)) {
        respond(403, ['error' => 'Origin not allowed']);
    }
}

$visitorId = (string)($_COOKIE['adlene_genial_visitor'] ?? '');
if (!preg_match('/^[a-f0-9]{64}$/', $visitorId)) {
    $visitorId = bin2hex(random_bytes(32));
    $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || strtolower((string)($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '')) === 'https';
    setcookie('adlene_genial_visitor', $visitorId, [
        'expires' => time() + 31536000,
        'path' => '/',
        'secure' => $isHttps,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}
$visitorHash = hash('sha256', $visitorId);

$dataDirectory = __DIR__ . '/data';
if (!is_dir($dataDirectory) && !mkdir($dataDirectory, 0750, true) && !is_dir($dataDirectory)) {
    respond(503, ['error' => 'Counter storage unavailable']);
}
$storage = fopen($dataDirectory . '/genial-counter.json', 'c+');
if ($storage === false || !flock($storage, LOCK_EX)) {
    respond(503, ['error' => 'Counter storage unavailable']);
}
$raw = stream_get_contents($storage);
$data = $raw ? json_decode($raw, true) : null;
if (!is_array($data) || !isset($data['count']) || !isset($data['voters']) || !is_array($data['voters'])) {
    $data = ['count' => 0, 'voters' => []];
}
$voted = isset($data['voters'][$visitorHash]);
$added = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !$voted) {
    $data['voters'][$visitorHash] = true;
    $data['count'] = (int)$data['count'] + 1;
    $voted = true;
    $added = true;
    $json = json_encode($data, JSON_UNESCAPED_SLASHES);
    rewind($storage);
    ftruncate($storage, 0);
    fwrite($storage, $json);
    fflush($storage);
}
$count = (int)$data['count'];
flock($storage, LOCK_UN);
fclose($storage);
respond(200, ['count' => $count, 'voted' => $voted, 'added' => $added]);
