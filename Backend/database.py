import sqlite3

# Database setup function
def setup_database():
    # Connect to SQLite database (it will create the file if it doesn't exist)
    conn = sqlite3.connect('asm_database.db')
    cursor = conn.cursor()

    # Create the 'Users' table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL CHECK(role IN ('admin', 'regular'))
        );
    ''')

    # Create the 'Programs' table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Programs (
            program_id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            start_time TEXT NOT NULL,
            end_time TEXT NOT NULL,
            priority INTEGER DEFAULT 0
        );
    ''')

    # Create the 'Notifications' table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Notifications (
            notification_id INTEGER PRIMARY KEY AUTOINCREMENT,
            program_id INTEGER NOT NULL,
            recipient TEXT NOT NULL,
            sent_at TEXT NOT NULL,
            FOREIGN KEY (program_id) REFERENCES Programs(program_id)
        );
    ''')

    # Create the 'ScheduleConflicts' table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ScheduleConflicts (
            conflict_id INTEGER PRIMARY KEY AUTOINCREMENT,
            program1_id INTEGER NOT NULL,
            program2_id INTEGER NOT NULL,
            conflict_reason TEXT,
            FOREIGN KEY (program1_id) REFERENCES Programs(program_id),
            FOREIGN KEY (program2_id) REFERENCES Programs(program_id)
        );
    ''')

    # Commit and close the connection
    conn.commit()
    conn.close()

# Run the setup function
if __name__ == '__main__':
    setup_database()
    print("Database and tables created successfully!")
