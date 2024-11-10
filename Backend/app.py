from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Database helper function to connect to SQLite
def connect_db():
    return sqlite3.connect('asm_database.db')

# Endpoint to fetch all programs
@app.route('/api/programs', methods=['GET'])
def get_programs():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Programs")
    programs = cursor.fetchall()
    conn.close()

    programs_list = [
        {
            "program_id": row[0],
            "title": row[1],
            "description": row[2],
            "start_time": row[3],
            "end_time": row[4],
            "priority": row[5]
        }
        for row in programs
    ]
    return jsonify(programs_list)

# Endpoint to add a new program
@app.route('/api/programs', methods=['POST'])
def add_program():
    data = request.json
    title = data.get("title")
    description = data.get("description")
    start_time = data.get("start_time")
    end_time = data.get("end_time")
    priority = data.get("priority", 0)

    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('''
    INSERT INTO Programs (title, description, start_time, end_time, priority)
    VALUES (?, ?, ?, ?, ?)
    ''', (title, description, start_time, end_time, priority))
    conn.commit()
    conn.close()
    return jsonify({"message": "Program added successfully!"}), 201

# Run Flask server
if __name__ == '__main__':
    app.run(debug=True)
