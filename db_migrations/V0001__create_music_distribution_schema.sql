-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    artist_name VARCHAR(255),
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица релизов (треков/альбомов)
CREATE TABLE IF NOT EXISTS releases (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    title VARCHAR(500) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    release_type VARCHAR(50) DEFAULT 'single',
    status VARCHAR(50) DEFAULT 'draft',
    cover_url TEXT,
    audio_url TEXT,
    release_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица платформ для дистрибьюции
CREATE TABLE IF NOT EXISTS platforms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Связь релизов и платформ
CREATE TABLE IF NOT EXISTS release_platforms (
    id SERIAL PRIMARY KEY,
    release_id INTEGER NOT NULL REFERENCES releases(id),
    platform_id INTEGER NOT NULL REFERENCES platforms(id),
    status VARCHAR(50) DEFAULT 'pending',
    progress INTEGER DEFAULT 0,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(release_id, platform_id)
);

-- Таблица аналитики
CREATE TABLE IF NOT EXISTS analytics (
    id SERIAL PRIMARY KEY,
    release_id INTEGER NOT NULL REFERENCES releases(id),
    platform_id INTEGER NOT NULL REFERENCES platforms(id),
    date DATE NOT NULL,
    streams INTEGER DEFAULT 0,
    listeners INTEGER DEFAULT 0,
    revenue DECIMAL(10, 2) DEFAULT 0,
    country VARCHAR(2),
    age_group VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(release_id, platform_id, date, country, age_group)
);

-- Таблица выплат
CREATE TABLE IF NOT EXISTS payouts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    amount DECIMAL(10, 2) NOT NULL,
    method VARCHAR(100) NOT NULL,
    details VARCHAR(500),
    status VARCHAR(50) DEFAULT 'pending',
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP
);

-- Индексы для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_releases_user_id ON releases(user_id);
CREATE INDEX IF NOT EXISTS idx_release_platforms_release_id ON release_platforms(release_id);
CREATE INDEX IF NOT EXISTS idx_analytics_release_id ON analytics(release_id);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics(date);
CREATE INDEX IF NOT EXISTS idx_payouts_user_id ON payouts(user_id);

-- Заполняем начальные данные платформ
INSERT INTO platforms (name) VALUES
    ('Spotify'),
    ('Apple Music'),
    ('Яндекс.Музыка'),
    ('VK Музыка'),
    ('YouTube Music'),
    ('Amazon Music'),
    ('Deezer'),
    ('Tidal'),
    ('SoundCloud'),
    ('Boom')
ON CONFLICT (name) DO NOTHING;