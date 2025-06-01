<?php

use Slim\Factory\AppFactory;
use DI\Container;

require __DIR__ . '/../vendor/autoload.php';

// Cargar variables de entorno
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// Crear contenedor
$container = new Container();
AppFactory::setContainer($container);

// Crear app
$app = AppFactory::create();

// Middleware
$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

// Inyectar conexión a DB
(require __DIR__ . '/../src/db.php')($container);

// Rutas
(require __DIR__ . '/../src/routes.php')($app);

$app->run();
