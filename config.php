<?php

date_default_timezone_set('Europe/London');

//composer
require_once __DIR__. '/vendor/autoload.php';

//Carbon datetime helper
use Carbon\Carbon;

//dotenv .env file helper
$dotEnv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotEnv->load();

$string = "mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_NAME']}";

//RedBeanPHP Mysql ORM helper
// require_once __DIR__.'/libs/rb.php';
use \RedBeanPHP\R as R;
R::setup($string, $_ENV['DB_USER'], $_ENV['DB_PASSWORD']);
if (!R::testConnection()) {
  die('Error connecting to the database');
}
R::freeze(false);

//twig template helper
// $default = 'animated';
// $default = 'thecodefather';
$default = 'coding2go';
$view = 'view/' . $default;

$loader = new \Twig\Loader\FilesystemLoader($view);
// $twig = new \Twig\Environment($loader, ['cache' => 'view/cache']);
$twig = new \Twig\Environment($loader, ['cache' => false]);
