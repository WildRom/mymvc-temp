<?php 
require_once __DIR__ . '/config.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Render the template
echo $twig->render('login.html', ['view' => $view]);



