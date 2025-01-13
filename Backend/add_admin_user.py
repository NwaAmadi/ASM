import sqlite3
import bcrypt

# Connect to the asm database
conn = sqlite3.connect('asm.db')
cursor = conn.cursor()


cursor.execute("""
CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);
""")
conn.commit()


username = 'Gospele' 
password = 'admin123e'


hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


try:
    cursor.execute("INSERT INTO admin_users (username, password) VALUES (?, ?)", (username, hashed_password))
    conn.commit()
    print("Admin user created successfully.")
except sqlite3.IntegrityError:
    print("Error: Username already exists.")

# Step 4: Close the database connection
conn.close()
