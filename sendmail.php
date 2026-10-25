<?php
/** Traitement du formulaire de contact. L’hébergeur doit autoriser l’envoi d’e-mails PHP. */
function respond(int $status, string $title, string $message): void
{
    http_response_code($status);
    $safeTitle = htmlspecialchars($title, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $safeMessage = htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    echo '<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">';
    echo '<title>' . $safeTitle . '</title><style>body{font:16px/1.6 Arial,sans-serif;max-width:680px;margin:10vh auto;padding:24px;color:#222}a{color:#167ac6}</style></head><body>';
    echo '<h1>' . $safeTitle . '</h1><p>' . $safeMessage . '</p><p><a href="index.html#contact">Retour au formulaire</a></p></body></html>';
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, 'Méthode non autorisée', 'Veuillez utiliser le formulaire de contact du site.');
}
// Champ piège destiné à filtrer les robots les plus simples.
if (!empty($_POST['website'])) {
    respond(200, 'Merci', 'Votre message a bien été pris en compte.');
}
$name = trim((string)($_POST['name'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$subject = trim((string)($_POST['subject'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));
$length = static function (string $value): int {
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
};
if ($name === '' || $length($name) > 100 || $email === '' || $length($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL) || $subject === '' || $length($subject) > 150 || $message === '' || $length($message) > 5000) {
    respond(400, 'Formulaire incomplet', 'Vérifiez les champs et réessayez.');
}
if (preg_match('/[\r\n]/', $subject) || preg_match('/[\r\n]/', $email)) {
    respond(400, 'Données invalides', 'Vérifiez les champs et réessayez.');
}
$recipient = 'adlene@benabbess.com';
$encodedSubject = '=?UTF-8?B?' . base64_encode('Message du site : ' . $subject) . '?=';
$body = "Nom : {$name}\nAdresse e-mail : {$email}\nObjet : {$subject}\n\nMessage :\n{$message}";
$headers = [
    'From: Adlene - site web <adlene@benabbess.com>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];
if (!mail($recipient, $encodedSubject, $body, implode("\r\n", $headers))) {
    error_log('Échec de mail() pour le formulaire de contact du site.');
    respond(500, 'Envoi indisponible', 'Le message n’a pas pu être envoyé pour le moment. Vous pouvez écrire directement à adlene@benabbess.com.');
}
respond(200, 'Message envoyé', 'Merci, votre message a bien été envoyé.');

