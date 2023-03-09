<?php

require_once(__DIR__.'/../vendor/autoload.php');
require_once(__DIR__.'/../App/Config/Config.php');
require_once(__DIR__.'/../App/Config/Database.php');

use Devvime\Kiichi\Engine\HttpService;

HttpService::json();
HttpService::cors();

require_once('Routes.php');
