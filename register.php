<?php 
require_once __DIR__ . '/config.php';
use \RedBeanPHP\R as R;

// Register
if(isset($_POST['register-btn'])){ 
    $data = ($_POST);    
    $name = htmlspecialchars($data['username']);
    $email = htmlspecialchars($data['email']);
    $password = htmlspecialchars($data['password']);
    $password2 = htmlspecialchars($data['password2']);

    if(empty($name) || empty($email) || empty($password) || empty($password2)){
        // echo "Please fill in all fields";
        echo $twig->render('register.html', ['view' => $view, 'error' => 'Please fill in all fields', 'name' => $name, 'email' => $email, 'password' => $password, 'password2' => $password2]);
        exit('empty fields');
    } 
    elseif(strlen($name) < 3){
        // echo "Username must be at least 3 characters";
        echo $twig->render('register.html', ['view' => $view, 'error' => 'Username must be at least 3 characters', 'name' => $name, 'email' => $email, 'password' => $password, 'password2' => $password2]);
        exit('username too short');        
    }
    elseif(!preg_match("/^[a-zA-Z0-9]*$/",$name)){
        // echo "Username must be letters and numbers only";
        echo $twig->render('register.html', ['view' => $view, 'error' => 'Username must be letters and numbers only', 'name' => $name, 'email' => $email, 'password' => $password, 'password2' => $password2]);
        exit('username not valid');    
    } 
    elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        // echo "Email is not valid";
        echo $twig->render('register.html', ['view' => $view, 'error' => 'Email is not valid', 'name' => $name, 'email' => $email, 'password' => $password, 'password2' => $password2]);
        exit('email not valid');
    }
    elseif($password !== $password2){
        // echo "Passwords do not match";
        echo $twig->render('register.html', ['view' => $view, 'error' => 'Passwords do not match', 'name' => $name, 'email' => $email, 'password' => $password, 'password2' => $password2]);
        exit('passwords do not match');
    // } 
    // elseif(!isset($data['agree'])){
    //     // echo "You must agree to the terms and conditions";
    //     echo $twig->render('login.html', ['view' => $view, 'error' => 'You must agree to the terms and conditions', 'name' => $name, 'email' => $email, 'password' => $password, 'password2' => $password2]);
    //     exit();
    } 
    // if everythink are ok create user:
    $user = R::dispense('users');

    $user->username = $name;
    $user->email = $email;
    $user->password = $password;
    $user->created_at = time();
    $user->updated_at = time();

    // dd($user);
    
    try {
        $id = R::store( $user );
    } catch (Exception $e) {
        // echo $e->getMessage();
        echo $twig->render('register.html', ['view' => $view, 'title' => 'Register error', 'error' => 'Username or email already exists', 'name' => $name, 'email' => $email, 'password' => $password, 'password2' => $password2]);
        exit();
    }

    //TODO after successfuly created user session_start and redirect to game.html
    //TODO create game.html page

    session_start();
    $_SESSION['user_id'] = $id;
    $_SESSION['username'] = $name;

    //temporary goto login page
    echo $twig->render('login.html', ['view' => $view, 'success' => 'Registered successfully']);
    exit();
}

// Render the template
echo $twig->render('register.html', ['view' => $view, 'title' => 'Please Register']);