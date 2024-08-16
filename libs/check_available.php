<?php 

require_once __DIR__. '/../vendor/autoload.php';
//dotenv .env file helper
$dotEnv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotEnv->load();

//connect to database by RedBeanPHP Mysql ORM helper
$string = "mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_NAME']}";

require_once 'rb.php';

//connect to database
R::setup($string, $_ENV['DB_USER'], $_ENV['DB_PASSWORD']);

if (!R::testConnection()) {
    die('Error connecting to the database');
}
R::freeze(false);

//check if username already exists
if(isset($_POST['username'])){
    

    $user = R::findOne('users', 'username = ?', [$_POST['username']]);
    if($user){
        // echo 'USER ALREADY EXISTS';
        echo 1;
    } else {
        // echo 'USER DOES NOT EXIST';
        echo 0;
    }
    // echo 'GOOOOOOODDD!!!';
};

//check if email already exists
if(isset($_POST['email'])){

    $email = R::findOne('users', 'email = ?', [$_POST['email']]);
    if($email){
        // echo 'email already exists';
        echo 1;
    } else {
        // echo 'email does not exist';
        echo 0;
    }
    // echo 'GOOOOOOODDD!!!';
}