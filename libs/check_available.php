<?php 

require_once __DIR__. '/../vendor/autoload.php';
//dotenv .env file helper
$dotEnv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotEnv->load();

if(isset($_POST['username'])){
    
    $string = "mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_NAME']}";
    
    //RedBeanPHP Mysql ORM helper
    require_once 'rb.php';

    //connect to database
    R::setup($string, $_ENV['DB_USER'], $_ENV['DB_PASSWORD']);

    if (!R::testConnection()) {
        die('Error connecting to the database');
    }
    R::freeze(false);

    $user = R::findOne('users', 'username = ?', [$_POST['username']]);
    if($user){
        echo 'USER ALREADY EXISTS';
    } else {
        echo 'USER DOES NOT EXIST';
    }
    // echo 'GOOOOOOODDD!!!';
};