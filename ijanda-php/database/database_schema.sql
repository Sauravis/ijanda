-- Create database
CREATE DATABASE IF NOT EXISTS ijanda CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE ijanda;

-- Table users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Table places
CREATE TABLE places (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    image LONGTEXT,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories (id)
);

-- Table favorites
CREATE TABLE favorites (
    favorite_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    place_id INT,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (place_id) REFERENCES places (id)
);

-- Table events
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    date DATE,
    place_id INT,
    FOREIGN KEY (place_id) REFERENCES places (id)
);

-- Insertar usuarios de prueba
INSERT INTO
    users (username, password, email)
VALUES (
        'Jose Diego',
        '$2y$12$B4KAfaElDi6m9Rik35OVIOnOjinerAXpdQ4.pP4ChAMCsKQU3k9iW',
        'josediego@example.com'
    ),
    (
        'testing',
        '$2y$12$B4KAfaElDi6m9Rik35OVIOnOjinerAXpdQ4.pP4ChAMCsKQU3k9iW',
        'testing@example.com'
    );

-- Insertar categorías
INSERT INTO
    categories (name)
VALUES ('Senderos'),
    ('Playas'),
    ('Monumentos'),
    ('Gastronomía'),
    ('Fiestas'),
    ('Alojamiento');

-- Insertar lugares
INSERT INTO
    places (
        name,
        description,
        location,
        image,
        category_id
    )
VALUES (
        'Sendero Cala de Roche',
        'Travesía que inicia en el Faro de Roche, pasando por acantilados y calas escondidas, ofreciendo vistas del puerto pesquero de Conil y la Cala del Aceite.',
        'Conil de la Frontera',
        'Sendero de Roche Conil de la Frontera 2.jpg',
        1
    ),
    (
        'Sendero de la Torre del Tajo',
        'Ruta circular que atraviesa un frondoso pinar sobre los acantilados de Barbate hasta llegar a la Torre del Tajo, una torre vigía del siglo XVI con impresionantes vistas del océano Atlántico. Ideal para los amantes de la naturaleza y la historia, con miradores, vegetación autóctona y paneles informativos.',
        'Parque Natural de la Breña y Marismas del Barbate (Barbate, Cádiz)',
        'Sendero Torre del Tajo Barbate 2.jpg',
        1
    ),
    (
        'Ruta Tómbolo de Trafalgar',
        'Una ruta sencilla y muy pintoresca que bordea la costa desde la tranquila playa de Zahora hasta el histórico Tómbolo de Trafalgar, donde se encuentra el Faro de Trafalgar. El sendero combina tramos de arena y pasarelas de madera, con espectaculares vistas del mar y ocasional avistamiento de aves marinas.',
        'Zahora (Barbate), Cádiz',
        'Tombolo de Trafalgar Zahora 2.jpg',
        1
    ),
    (
        'Ruta por las Marismas de Barbate',
        'Sendero semicircular de aproximadamente 11 km que atraviesa las marismas de Barbate, un área crucial para la migración de aves, ofreciendo una experiencia única de biodiversidad.',
        'Parque Natural de La Breña y Marismas del Barbate',
        'Sendero Marismas de Barbate 2.jpg',
        1
    ),
    (
        'Playa de El Palmar',
        'Extensa playa de arena fina y dorada, muy apreciada por surfistas y amantes de la naturaleza. Ofrece puestas de sol espectaculares y un ambiente relajado, ideal para caminatas junto al mar.',
        'Vejer de la Frontera',
        'Playa el Palmar 1 Vejer.jpg',
        2
    ),
    (
        'Playa de Los Caños de Meca',
        'Famosa por sus acantilados, aguas cristalinas y ambiente bohemio. Punto de encuentro de senderistas y bañistas, conecta con rutas hacia el Faro de Trafalgar y el Parque Natural de La Breña.',
        'Barbate',
        'Playa Los Caños 2 Barbate.jpg',
        2
    ),
    (
        'Playa de Bolonia',
        'Playa salvaje y extensa con vistas a África, famosa por su duna móvil y las ruinas romanas de Baelo Claudia. Espacio natural de gran valor paisajístico, ideal para quienes buscan historia, naturaleza y tranquilidad en un solo lugar.',
        'Tarifa',
        'Playa Bolonia 2 Tarifa.jpg',
        2
    ),
    (
        'Playa del Carmen',
        'Playa urbana situada en pleno núcleo de Barbate, con fácil acceso y todos los servicios. Ideal para familias, combina el encanto de un paseo marítimo activo con la cercanía al Parque Natural de La Breña.',
        'Barbate',
        'Playa el Carmen 2 Barbate.jpg',
        2
    ),
    (
        'Castillo de Medina Sidonia',
        'Restos del castillo medieval sobre el cerro más alto de la ciudad, con vistas impresionantes y una gran carga histórica.',
        'Medina Sidonia',
        'Castillo de Medina Sidonia.jpg',
        3
    ),
    (
        'Acueducto romano de Santa Lucía',
        'Antiguo acueducto romano que abastecía agua a la zona. Todavía se conservan varios tramos en buen estado.',
        'Vejer de la Frontera',
        'Acueducto Romano de Santa Lucia Vejer.jpg',
        3
    ),
    (
        'Torre del Tajo',
        'Torre vigía del siglo XVI con vistas espectaculares a los acantilados y al océano Atlántico.',
        'Parque Natural de La Breña, Barbate',
        'Torre del Tajo Barbate.jpg',
        3
    ),
    (
        'Iglesia de San Mateo',
        'Templo gótico renacentista del siglo XVI, una joya del patrimonio religioso andaluz.',
        'Tarifa (próxima a La Janda, si decides ampliar)',
        'Iglesia de San Mateo Tarifa.jpg',
        3
    ),
    (
        'Ruta del Atún Rojo de Almadraba',
        'Actividades y degustaciones centradas en el atún rojo capturado con el tradicional arte de la almadraba. Incluye show-cookings, tapas innovadoras y visitas guiadas a almadrabas.',
        'Barbate, Zahara de los Atunes, Conil',
        'Ruta del Atún, Zahara de los atunes.jpg',
        4
    ),
    (
        'Feria del Retinto',
        'Evento dedicado a la carne de vaca retinta, autóctona de la zona. Se pueden degustar distintos platos en bares y restaurantes.',
        'Zahara de los Atunes',
        'Feria del Retinto Zahara de los atunes.jpg',
        4
    ),
    (
        'Degustación de dulces artesanos de Medina Sidonia',
        'Visita a obradores tradicionales para probar amarguillos, tortas pardas y alfajores, elaborados con recetas centenarias.',
        'Medina Sidonia',
        'Degustación de dulces artesanos Medina Sidonia 2.jpg',
        4
    ),
    (
        'Visita a bodegas y queserías locales',
        'Catas de vinos y quesos gaditanos, con opción de comprar productos directamente de los productores.',
        'Entre Vejer, La Muela y Alcalá de los Gazules',
        'Visita a Bodegas Vejer de la frontera.jpg',
        4
    ),
    (
        'Carnaval de Barbate',
        'Uno de los carnavales más divertidos de la comarca, con pasacalles, chirigotas, concursos de disfraces y actividades para niños.',
        'Barbate',
        'Carnaval de Barbate 2.jpg',
        5
    ),
    (
        'Feria de Vejer de la Frontera',
        'Feria local con casetas, actuaciones flamencas, caballos y atracciones. Uno de los eventos más esperados por los vecinos.',
        'Vejer de la Frontera',
        'Feria Vejer de la frontera.jpg',
        5
    ),
    (
        'Fiesta de San Juan',
        'Noche mágica con hogueras en la playa, música y quema de los “Juanillos”. Una de las fiestas más esperadas del verano.',
        'Barbate',
        'San Juan.jpg',
        5
    ),
    (
        'Fiesta del Gazpacho',
        'Fiesta gastronómica que celebra uno de los platos típicos de la zona. Degustación gratuita de gazpacho, música y eventos populares.',
        'Benalup-Casas Viejas',
        'Fiesta del Gazpacho Benalup.jpg',
        5
    ),
    (
        'Hotel Boutique V',
        'Situado en el casco antiguo, con vistas espectaculares, decoración tradicional andaluza y servicios de lujo.',
        'Vejer de la Frontera',
        'Hotel Boutique V Vejer de la frontera.jpg',
        6
    ),
    (
        'Camping La Rana Verde',
        'Alojamiento familiar con bungalows, piscina y actividades al aire libre, cerca de la playa de La Barrosa.',
        'Chiclana de la Frontera (próximo a la comarca, puede incluirse si amplías)',
        'Camping La Rana verde, Chiclana.jpg',
        6
    ),
    (
        'Alojamiento El Palomar de La Breña',
        'Antigua hacienda andaluza rehabilitada, situada entre pinares, perfecta para el turismo rural.',
        'Barbate (San Ambrosio)',
        'El Palomar de la Breña Barbate.jpg',
        6
    ),
    (
        'Hotel Costa Luz',
        'Alojamiento económico a pocos metros de la playa, perfecto para escapadas de fin de semana.',
        'Conil de la frontera',
        'Hotel Costa Luz Conil de la frontera 2.jpg',
        6
    );

-- Insertar favoritos
INSERT INTO
    favorites (user_id, place_id)
VALUES (1, 1), -- Juan: Sendero del Río
    (1, 2), -- Juan: Playa El Palmar
    (2, 3), -- María: Castillo de Medina
    (2, 4);
-- María: Restaurante Mar y Tierra

-- Insertar eventos
INSERT INTO
    events (
        name,
        description,
        date,
        place_id
    )
VALUES (
        'Concierto de Verano',
        'Música en directo junto al mar.',
        '2025-07-15',
        2
    ), -- Playa El Palmar
    (
        'Feria Gastronómica',
        'Degustación de platos típicos de la región.',
        '2025-06-10',
        4
    ), -- Restaurante Mar y Tierra
    (
        'Ruta Nocturna',
        'Excursión nocturna por el sendero.',
        '2025-08-01',
        1
    );
-- Sendero del Río