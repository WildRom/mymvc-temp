<?php 
require_once __DIR__ . '/config.php';

if(!isset($_SESSION['logged_user'])) {
    echo $twig->render('login.html', ['view' => $view, 'title' => 'Login page']);
    exit();
}

session_unset();
session_destroy();
echo $twig->render('login.html', ['view' => $view, 'title' => 'Login page']);
exit();