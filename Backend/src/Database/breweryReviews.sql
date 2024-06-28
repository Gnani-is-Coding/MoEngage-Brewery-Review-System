
 CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE
    );

--   // Breweries table

    CREATE TABLE breweries (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT 
    );

--   // Reviews table
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY NOT NULL,
      brewery_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      review TEXT,
      rating INTEGER,
      FOREIGN KEY (brewery_id) REFERENCES breweries(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );