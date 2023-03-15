<?php

use Devvime\Kiichi\Engine\Application;

$app = new Application();

$app->get('/', function($req, $res) {
    $res->json([
        'title'=>'Server side for SUSUMO API (Back-end).'
    ]);
});

$app->post('/register', 'UserController@store');

$app->group('/user', function() use($app) {
    $app->get('', 'UserController@index');
    $app->get('/:id', 'UserController@find');
    $app->post('', 'UserController@store');
    $app->put('/:id', 'UserController@update');
    $app->delete('/:id', 'UserController@destroy');
}, 'AuthMiddleware@index'); 

$app->group('/auth', function() use($app) {
    $app->post('', 'AuthController@index');
    $app->post('/recover-pass', 'RecoverPasswordController@index');
    $app->post('/recover-password', 'RecoverPasswordController@store');
    $app->get('/verify', function($req, $res) {}, 'AuthMiddleware@verify');    
});

$app->run();
