<?php 

use \RedBeanPHP\R as R;

require_once __DIR__ . '/config.php';

// dd($_POST);

if (!isset($_POST['email']) && isset($_POST['password']) || empty($_POST)) {
    // exit('Please fill in all fields');
    echo $twig->render('login.html', ['view' => $view, 'error' => 'Please fill in all fields', 'title' => 'Wrong login']);
} else {
    $data = ($_POST);
    $email = trim($data['email']);
    $password = $data['password'];
    $user = R::findOne('users', 'email = ?', [$email]);
    if ($user) {
        if (password_verify($password, $user->password)) {
            //success
            $_SESSION['logged_user'] = $user;
            echo $twig->render('main.html', ['title' => 'Main page', 'user' => $user]);
            exit();
        } else {
            echo $twig->render('login.html', ['view' => $view, 'title' => 'Login error', 'error' => 'Wrong email or password', 'email' => $email, 'password' => $password]);
            exit();
        }        
    } else {
        echo $twig->render('login.html', ['view' => $view, 'title' => 'Login error', 'error' => 'Wrong email or password', 'email' => $email, 'password' => $password]);
        exit();
    }
}   
