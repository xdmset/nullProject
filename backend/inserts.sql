-- 1. users_rol
INSERT INTO public.users_rol (id, nombre, descripcion) VALUES
(1, 'Administrador', 'Gestiona usuarios y contenido.'),
(2, 'Asesor', 'Sube material y ve progreso.'),
(3, 'Estudiante', 'Juega y aprende con la plataforma.');

-- 2. users_logro
INSERT INTO public.users_logro (id, nombre, descripcion, insignia_url) VALUES
(1, 'Explorador de la Playa', '¡Has completado todas las aventuras en la playa!', 'src/assets/insignias/explorador_playa.png'),
(2, 'Conquistador del Castillo', '¡Misión cumplida en el majestuoso castillo!', 'src/assets/insignias/conquistador_castillo.png'),
(3, 'Descubridor de la Jungla', '¡Has superado todos los desafíos selváticos!', 'src/assets/insignias/descubridor_jungla.png'),
(4, 'Héroe de la Ciudad', '¡Recorriste cada rincón de la ciudad y lo lograste!', 'src/assets/insignias/heroe_ciudad.png'),
(5, 'Maestro de la Playa', '¡Has dominado cada detalle de la playa!', 'src/assets/insignias/maestro_playa.png'),
(6, 'Señor del Castillo', '¡El castillo no guarda secretos para ti!', 'src/assets/insignias/señor_castillo.png'),
(7, 'Sabio de la Jungla', '¡Has perfeccionado la jungla como un verdadero experto!', 'src/assets/insignias/sabio_jungla.png'),
(8, 'Leyenda Urbana', '¡La ciudad está a tus pies, impecablemente conquistada!', 'src/assets/insignias/leyenda_urbana.png'),
(9, 'Gran Aventurero', '¡Eres un gran aventurero de todos los mundos!', 'src/assets/insignias/nombre.png'),
(10, 'Perfección Total', '¡Has conseguido la perfección total!', 'src/assets/insignias/nombre.png'),
(11, 'Explorador del Misterio', '¡Has descubierto todos los secretos del mundo misterioso!', 'src/assets/insignias/nombre.png'),
(12, 'Maestro Misterio', '¡Lo resolviste todo sin errores, como un verdadero maestro!', 'src/assets/insignias/nombre.png');

-- 3. lessons_categoria
INSERT INTO public.lessons_categoria (id, nombre, descripcion) VALUES
(1, 'Abecedario', 'Aprende las letras del alfabeto en LSM.'),
(2, 'Saludos', 'Formas básicas de saludar en LSM.'),
(3, 'Colores', 'Identifica y señala colores en LSM.'),
(4, 'Numeros', 'Cuenta del 1 al 10 y más en LSM.'),
(5, 'Animales', 'Nombres de animales usando LSM.'),
(6, 'Emociones', 'Expresa cómo te sientes en LSM.'),
(7, 'Familia', 'Nombra a los miembros de la familia.'),
(8, 'Preguntas', 'Aprende a hacer preguntas básicas en LSM.');

-- 4. lessons_mundo
INSERT INTO public.lessons_mundo (id, nombre, descripcion) VALUES
(1, 'Playa', 'Aprende las letras y saluda como un verdadero explorador costero.'),
(2, 'Ciudad', 'Recorre la ciudad mientras aprendes los colores y a contar.'),
(3, 'Jungla', 'Descubre criaturas salvajes y cómo se sienten en lo profundo de la jungla.'),
(4, 'Castillo', 'Conoce a la familia real y aprende a hacer preguntas como todo un caballero.'),
(5, 'Mundo Misterioso', 'Un mundo especial por descubrir.');

-- 5. lessons_nivel
INSERT INTO public.lessons_nivel (id, nombre, descripcion, mundo_id, cantidad_ejercicio) VALUES
(1, 'Nivel 1 Playa', 'Nivel 1 Abecedario.', 1, 12),
(2, 'Nivel 2 Playa', 'Nivel 2 Abecedario Avanzado', 1, 14),
(3, 'Nivel 3 Playa', 'Nivel 3 Saludos', 1, 14),
(4, 'Nivel 4 Playa', 'Nivel 4 Saludos y Abecedario', 1, 18),
(5, 'Nivel 1 Ciudad', 'Nivel 1 colores Ciudad', 2, 12),
(6, 'Nivel 2 Ciudad', 'Nivel 2 colores Ciudad', 2, 14),
(7, 'Nivel 3 Ciudad', 'Nivel 3 numeros Ciudad', 2, 14),
(8, 'Nivel 4 Ciudad', 'Nivel 4 numeros y colores Ciudad', 2, 18),
(9, 'Nivel 1 Castillo', 'Nivel 1 del mundo 4/familia', 4, 12),
(10, 'Nivel 2 Castillo', 'Nivel 2 del mundo 4/familia y preguntas', 4, 14),
(11, 'Nivel 3 Castillo', 'Nivel 3 del mundo 4/familia', 4, 14),
(12, 'Nivel 4 Castillo', 'Nivel 4 del mundo 4/familia y preguntas', 4, 18),
(13, 'Nivel 1 Misterio', 'Nivel ???', 5, 20),
(14, 'Nivel 1: Animales', 'Conoce los animales de la jungla.', 3, 12),
(15, 'Nivel 2: Más Animales', 'Descubre más criaturas salvajes.', 3, 14),
(16, 'Nivel 3: Emociones', 'Aprende a expresar cómo te sientes.', 3, 14),
(17, 'Nivel 4: Emociones Avanzadas', 'Expresa emociones más complejas.', 3, 18);

-- 6. lessons_materialdidactico
INSERT INTO public.lessons_materialdidactico (id, descripcion, tipo, url, categoria_id) VALUES
(1, 'Abecedario 1', 'Video', 'https://www.youtube.com/embed/vXSSgzXJy1Q', 1),
(2, 'Abecedario 2', 'Video', 'https://www.youtube.com/embed/BXD1wu6yEOQ', 1),
(3, 'Saludos 1', 'Video', 'https://www.youtube.com/embed/YNBeHPcxlR0', 2),
(4, 'Saludos 2', 'Video', 'https://www.youtube.com/embed/PCHx3s-cwLU', 2),
(5, 'Colores 1', 'Video', 'https://www.youtube.com/embed/pRYRjk2Bw_A', 3),
(6, 'Colores 2', 'Video', 'https://www.youtube.com/embed/ecPvbRd2a-4', 3),
(7, 'Números 1', 'Video', 'https://www.youtube.com/embed/Uc150cylYOQ', 4),
(8, 'Números 2', 'Video', 'https://www.youtube.com/embed/5TCARa8YGAU', 4),
(9, 'Animales 1', 'Video', 'https://www.youtube.com/embed/Xkkl28JPA5A', 5),
(10, 'Animales 2', 'Video', 'https://www.youtube.com/embed/H16vT56UKzs', 5),
(11, 'Emociones 1', 'Video', 'https://www.youtube.com/embed/i88Gs2hJ_q8', 6),
(12, 'Emociones 2', 'Video', 'https://www.youtube.com/embed/q81r6iVedh0', 6),
(13, 'Familia 1', 'Video', 'https://www.youtube.com/embed/TzfEPqQtYFc', 7),
(14, 'Familia 2', 'Video', 'https://www.youtube.com/embed/58cEXqR_e4A', 7),
(15, 'Preguntas 1', 'Video', 'https://www.youtube.com/embed/N-XVPcig0LE', 8),
(16, 'Preguntas 2', 'Video', 'https://www.youtube.com/embed/3usTf2-u05M', 8),
(17, 'PDF Didáctico del Abecedario', 'PDF', 'AbecedarioLSM.pdf', 1),
(18, 'PDF Didáctico de Animales', 'PDF', 'AnimalesLSM.pdf', 5),
(19, 'PDF Didáctico de Colores', 'PDF', 'ColoresLSM.pdf', 3),
(20, 'PDF Didáctico de la Familia', 'PDF', 'FamiliaLSM.pdf', 7),
(21, 'PDF Didáctico de Números', 'PDF', 'NumerosLSM.pdf', 4),
(22, 'PDF Didáctico de Preguntas', 'PDF', 'PreguntasLSM.pdf', 8),
(23, 'PDF Didáctico de Saludos', 'PDF', 'SaludosLSM.pdf', 2),
(24, 'PDF Didáctico de Sentimientos', 'PDF', 'SentimientosLSM.pdf', 6);

-- 7. rewards_recompensa
INSERT INTO public.rewards_recompensa (id, nombre, url, nivel_id) VALUES
(1, 'Chango Tenis', 'avatar1.png', 1),
(2, 'Chango Flow', 'avatar2.png', 1),
(3, 'Chango Rayo', 'avatar3.png', 1),
(4, 'Dj Monkin', 'avatar4.png', 1),
(5, 'Chango Cariñoso', 'avatar5.png', 2),
(6, 'Chango Galáctico', 'avatar6.png', 2),
(7, 'Chango Rockero', 'avatar7.png', 3),
(8, 'Code-Chango', 'avatar8.png', 4),
(9, 'Sueñín Chango', 'avatar9.png', 4),
(10, 'Rey Plátano', 'avatar10.png', 5);

-- 8. rewards_progreso
INSERT INTO public.rewards_progreso (id, porcentaje_avance, intentos_realizados, fecha_fin, usuario_id, fecha_inicio, mundo_id, niveles_completados) VALUES
(1, 50.00, 2, NULL, 3, '2025-08-02', 2, 2),
(2, 25.00, 1, NULL, 3, '2025-08-02', 4, 1),
(3, 25.00, 1, NULL, 3, '2025-08-02', 3, 1),
(4, 25.00, 1, NULL, 3, '2025-08-02', 1, 1);
