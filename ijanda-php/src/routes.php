<?php

use Slim\App;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function (App $app) {
    $app->addBodyParsingMiddleware();

    // Middleware para CORS
    $app->add(function ($request, $handler) {
        $response = $handler->handle($request);
        return $response
            ->withHeader('Access-Control-Allow-Origin', '*') // Puedes cambiar * por tu dominio en producción
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    });

    // Responder correctamente a OPTIONS (preflight)
    $app->options('/{routes:.+}', function ($request, $response, $args) {
        return $response;
    });

    $app->get('/', function (Request $request, Response $response, $args) {
        $response->getBody()->write('Hello, server up');
        return $response;
    });

    $app->get('/users', function (Request $request, Response $response, $args) {
        $db = $this->get('db');
        $stmt = $db->query("SELECT * FROM users");
        $usuarios = $stmt->fetchAll();

        $response->getBody()->write(json_encode($usuarios));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->post('/login', function (Request $request, Response $response, $args) {
        $db = $this->get('db');

        // Obtener datos JSON enviados
        $data = json_decode($request->getBody()->getContents(), true);
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        if (!$email || !$password) {
            $response->getBody()->write(json_encode(['error' => 'Email y contraseña son requeridos']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        // Preparar consulta segura para evitar inyección SQL
        $stmt = $db->prepare("SELECT * FROM users WHERE email = :email LIMIT 1");
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            $response->getBody()->write(json_encode(['error' => 'Usuario no encontrado']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        // Verificar contraseña con password_verify
        if (!password_verify($password, $user['password'])) {
            $response->getBody()->write(json_encode(['error' => 'Contraseña incorrecta']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        // Login exitoso: devolver datos básicos sin contraseña
        unset($user['password']); // no enviar la contraseña

        $response->getBody()->write(json_encode(['success' => true, 'user' => $user]));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->post('/users', function (Request $request, Response $response, $args) {
        $db = $this->get('db');
        $data = $request->getParsedBody();

        $stmt = $db->prepare("INSERT INTO users (username, email, password, registration_date) VALUES (:username, :email, :password, :registration_date)");
        $stmt->execute([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => password_hash($data['password'], PASSWORD_DEFAULT),
            'registration_date' => date('Y-m-d H:i:s'),
        ]);

        $response->getBody()->write(json_encode(['success' => true]));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->get('/categories', function (Request $request, Response $response, $args) {
        $db = $this->get('db');
        $stmt = $db->query("SELECT * FROM categories");
        $categories = $stmt->fetchAll();

        $response->getBody()->write(json_encode($categories));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->get('/places', function (Request $request, Response $response, $args) {
        $db = $this->get('db');
        $params = $request->getQueryParams();

        if (!isset($params['name'])) {
            $response->getBody()->write(json_encode(['error' => 'name is required']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $name = strtolower($params['name']);

        // Convertimos ambos lados a minúsculas para comparación
        $stmt = $db->prepare("SELECT id FROM categories WHERE LOWER(name) = :name");
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->execute();
        $category = $stmt->fetch();

        if (!$category) {
            $response->getBody()->write(json_encode(['error' => 'Category not found']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $category_id = $category['id'];

        $stmt = $db->prepare("SELECT * FROM places WHERE category_id = :category_id");
        $stmt->bindParam(':category_id', $category_id, PDO::PARAM_INT);
        $stmt->execute();
        $places = $stmt->fetchAll();

        $response->getBody()->write(json_encode($places));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->post('/places/by-ids', function (Request $request, Response $response, $args) {
        $db = $this->get('db');
        $data = $request->getParsedBody();

        if (!isset($data['ids']) || !is_array($data['ids']) || count($data['ids']) === 0) {
            $response->getBody()->write(json_encode(['error' => 'Array de IDs requerido']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $ids = $data['ids'];

        // Sanitizar IDs para consulta segura
        $placeholders = implode(',', array_fill(0, count($ids), '?'));

        $stmt = $db->prepare("
                        SELECT places.*, categories.name AS category_name
                        FROM places
                        JOIN categories ON places.category_id = categories.id
                        WHERE places.id IN ($placeholders)
                    ");

        $stmt->execute($ids);

        $places = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response->getBody()->write(json_encode($places));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->get('/place', function (Request $request, Response $response, $args) {
        $db = $this->get('db');
        $params = $request->getQueryParams();

        if (isset($params['id'])) {
            $stmt = $db->prepare("
            SELECT p.*, c.name AS category_name
            FROM places p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.id = :id
        ");
            $stmt->bindParam(':id', $params['id']);
            $stmt->execute();
            $place = $stmt->fetch();

            $response->getBody()->write(json_encode($place ?: []));
        } else {
            $response->getBody()->write(json_encode([]));
        }

        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->get('/favorites', function (Request $request, Response $response, $args) {
        $db = $this->get('db');
        $params = $request->getQueryParams();

        if (!isset($params['id'])) {
            $response->getBody()->write(json_encode(['error' => 'User ID is required']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $userId = $params['id'];

        $stmt = $db->prepare("SELECT places.* FROM places
                          INNER JOIN favorites ON places.id = favorites.place_id
                          WHERE favorites.user_id = :user_id");

        $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
        $stmt->execute();
        $favorites = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response->getBody()->write(json_encode($favorites));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->post('/favorites', function (Request $request, Response $response, $args) {
        $db = $this->get('db');
        $data = $request->getParsedBody();

        $stmt = $db->prepare("INSERT INTO favorites (user_id, place_id) VALUES (:user_id, :place_id)");
        $stmt->execute([
            'user_id' => $data['user_id'],
            'place_id' => $data['place_id'],
        ]);

        $response->getBody()->write(json_encode(['success' => true]));
        return $response->withHeader('Content-Type', 'application/json');
    });

    // Comprobar si un lugar es favorito
    $app->get('/favorites/check', function (Request $request, Response $response) {
        $params = $request->getQueryParams();
        $db = $this->get('db');

        $stmt = $db->prepare("SELECT COUNT(*) as total FROM favorites WHERE user_id = :user_id AND place_id = :place_id");
        $stmt->execute([
            'user_id' => $params['user_id'],
            'place_id' => $params['place_id'],
        ]);
        $result = $stmt->fetch();

        $isFavorite = $result && $result['total'] > 0;
        $response->getBody()->write(json_encode(['is_favorite' => $isFavorite]));
        return $response->withHeader('Content-Type', 'application/json');
    });

    // Eliminar favorito
    $app->delete('/favorites', function (Request $request, Response $response) {
        $data = $request->getParsedBody();
        $db = $this->get('db');

        $stmt = $db->prepare("DELETE FROM favorites WHERE user_id = :user_id AND place_id = :place_id");
        $stmt->execute([
            'user_id' => $data['user_id'],
            'place_id' => $data['place_id'],
        ]);

        $response->getBody()->write(json_encode(['success' => true]));
        return $response->withHeader('Content-Type', 'application/json');
    });


    $app->get('/events', function (Request $request, Response $response, $args) {
        $db = $this->get('db');
        $params = $request->getQueryParams();

        // Opción: filtrar por fecha si se pasa en query ?date=YYYY-MM-DD
        if (isset($params['date'])) {
            $date = $params['date'];
            $stmt = $db->prepare("SELECT events.*, places.name as place_name FROM events 
                              LEFT JOIN places ON events.place_id = places.id 
                              WHERE events.date = :date");
            $stmt->bindParam(':date', $date);
            $stmt->execute();
            $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            // Devuelve todos los eventos si no se especifica fecha
            $stmt = $db->query("SELECT events.*, places.name as place_name FROM events 
                            LEFT JOIN places ON events.place_id = places.id");
            $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        $response->getBody()->write(json_encode($events));
        return $response->withHeader('Content-Type', 'application/json');
    });
};
