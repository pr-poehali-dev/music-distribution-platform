-- Добавление демо-данных для тестирования
INSERT INTO users (email, name, artist_name) 
VALUES ('demo@musicflow.ru', 'Демо Пользователь', 'DJ Demo')
ON CONFLICT (email) DO NOTHING;

-- Получить ID пользователя и добавить релизы
INSERT INTO releases (user_id, title, artist, release_type, status, release_date)
SELECT id, 'Summer Vibes', 'DJ Demo', 'single', 'published', '2024-06-15'
FROM users WHERE email = 'demo@musicflow.ru'
ON CONFLICT DO NOTHING;

INSERT INTO releases (user_id, title, artist, release_type, status, release_date)
SELECT id, 'Night Drive', 'DJ Demo', 'single', 'published', '2024-08-20'
FROM users WHERE email = 'demo@musicflow.ru'
ON CONFLICT DO NOTHING;

INSERT INTO releases (user_id, title, artist, release_type, status, release_date)
SELECT id, 'First Track', 'DJ Demo', 'single', 'published', '2024-05-01'
FROM users WHERE email = 'demo@musicflow.ru'
ON CONFLICT DO NOTHING;

INSERT INTO releases (user_id, title, artist, release_type, status, release_date)
SELECT id, 'Autumn Mix', 'DJ Demo', 'album', 'moderation', '2024-11-10'
FROM users WHERE email = 'demo@musicflow.ru'
ON CONFLICT DO NOTHING;

INSERT INTO releases (user_id, title, artist, release_type, status, release_date)
SELECT id, 'Winter Chill', 'DJ Demo', 'single', 'draft', NULL
FROM users WHERE email = 'demo@musicflow.ru'
ON CONFLICT DO NOTHING;

INSERT INTO releases (user_id, title, artist, release_type, status, release_date)
SELECT id, 'Spring Awakening', 'DJ Demo', 'single', 'published', '2024-03-15'
FROM users WHERE email = 'demo@musicflow.ru'
ON CONFLICT DO NOTHING;

-- Добавить связи релизов с платформами
INSERT INTO release_platforms (release_id, platform_id, status, progress, published_at)
SELECT r.id, p.id, 'published', 100, '2024-06-16'
FROM releases r, platforms p
WHERE r.title = 'Summer Vibes' AND p.name IN ('Spotify', 'Apple Music', 'Яндекс.Музыка', 'VK Музыка', 'YouTube Music')
ON CONFLICT DO NOTHING;

INSERT INTO release_platforms (release_id, platform_id, status, progress, published_at)
SELECT r.id, p.id, 'published', 100, '2024-08-21'
FROM releases r, platforms p
WHERE r.title = 'Night Drive' AND p.name IN ('Spotify', 'Apple Music', 'Deezer')
ON CONFLICT DO NOTHING;

INSERT INTO release_platforms (release_id, platform_id, status, progress, published_at)
SELECT r.id, p.id, 'published', 100, '2024-05-02'
FROM releases r, platforms p
WHERE r.title = 'First Track' AND p.name IN ('Spotify', 'SoundCloud')
ON CONFLICT DO NOTHING;

INSERT INTO release_platforms (release_id, platform_id, status, progress)
SELECT r.id, p.id, 'processing', 65
FROM releases r, platforms p
WHERE r.title = 'Autumn Mix' AND p.name IN ('Spotify', 'Apple Music', 'Яндекс.Музыка')
ON CONFLICT DO NOTHING;

-- Добавить аналитику
INSERT INTO analytics (release_id, platform_id, date, streams, listeners, revenue, country, age_group)
SELECT r.id, p.id, '2024-11-01', 15420, 8234, 1250.50, 'RU', '25-34'
FROM releases r, platforms p
WHERE r.title = 'Summer Vibes' AND p.name = 'Spotify'
ON CONFLICT DO NOTHING;

INSERT INTO analytics (release_id, platform_id, date, streams, listeners, revenue, country, age_group)
SELECT r.id, p.id, '2024-11-01', 9850, 5123, 780.30, 'RU', '18-24'
FROM releases r, platforms p
WHERE r.title = 'Summer Vibes' AND p.name = 'Apple Music'
ON CONFLICT DO NOTHING;

INSERT INTO analytics (release_id, platform_id, date, streams, listeners, revenue, country, age_group)
SELECT r.id, p.id, '2024-11-01', 12345, 6789, 950.20, 'UA', '25-34'
FROM releases r, platforms p
WHERE r.title = 'Night Drive' AND p.name = 'Spotify'
ON CONFLICT DO NOTHING;

INSERT INTO analytics (release_id, platform_id, date, streams, listeners, revenue, country, age_group)
SELECT r.id, p.id, '2024-11-01', 18500, 9250, 1420.80, 'RU', '35-44'
FROM releases r, platforms p
WHERE r.title = 'First Track' AND p.name = 'Spotify'
ON CONFLICT DO NOTHING;

INSERT INTO analytics (release_id, platform_id, date, streams, listeners, revenue, country, age_group)
SELECT r.id, p.id, '2024-11-01', 7890, 4123, 600.40, 'KZ', '18-24'
FROM releases r, platforms p
WHERE r.title = 'Summer Vibes' AND p.name = 'Яндекс.Музыка'
ON CONFLICT DO NOTHING;

-- Добавить данные по выплатам
INSERT INTO payouts (user_id, amount, method, details, status, requested_at, processed_at)
SELECT id, 12500.00, 'Банковская карта', '1234 **** **** 5678', 'completed', '2024-11-01', '2024-11-04'
FROM users WHERE email = 'demo@musicflow.ru'
ON CONFLICT DO NOTHING;

INSERT INTO payouts (user_id, amount, method, details, status, requested_at, processed_at)
SELECT id, 18200.00, 'ЮMoney', '410011234567890', 'completed', '2024-10-15', '2024-10-18'
FROM users WHERE email = 'demo@musicflow.ru'
ON CONFLICT DO NOTHING;

INSERT INTO payouts (user_id, amount, method, details, status, requested_at, processed_at)
SELECT id, 15800.00, 'Банковская карта', '1234 **** **** 5678', 'completed', '2024-10-01', '2024-10-03'
FROM users WHERE email = 'demo@musicflow.ru'
ON CONFLICT DO NOTHING;