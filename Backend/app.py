from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import bcrypt
import sqlite3
import csv
from twilio.rest import Client
from dotenv import load_dotenv
import os

# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///asm.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

#Twilio config
load_dotenv()

ACCOUNT_SID = os.getenv('ACCOUNT_SID')
AUTH_TOKEN = os.getenv('AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')

#DB model
class Program(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    start_date = db.Column(db.String(100), nullable=False)
    end_date = db.Column(db.String(100), nullable=False)
    start_time = db.Column(db.String(100), nullable=False)
    end_time = db.Column(db.String(100), nullable=False)
    priority = db.Column(db.Integer, nullable=False)
    about = db.Column(db.Text, nullable=True)
    speakers = db.Column(db.String(200), nullable=True)

# Route to get all programs
@app.route('/api/programs', methods=['GET'])
def get_programs():
    programs = Program.query.all()
    programs_list = [
        {
            'id': program.id, 
            'title': program.title,
            'dates': f"{program.start_date} - {program.end_date}",
            'duration': f"{program.start_time} - {program.end_time}",
            'speakers': program.speakers,
            'date': program.start_date,
            'priority':program.priority,
            'about':program.about
        }
        for program in programs
    ]
    return jsonify(programs_list), 200


@app.route('/api/submit', methods=['POST'])
def submit_program():
    data = request.get_json()
    title = data.get('title')
    start_date = data.get('startDate')
    end_date = data.get('endDate')
    start_time = data.get('startTime')
    end_time = data.get('endTime')
    priority = data.get('priority')
    about = data.get('about')
    speakers = data.get('speakers')

    new_program = Program(
        title=title,
        start_date=start_date,
        end_date=end_date,
        start_time=start_time,
        end_time=end_time,
        priority=priority,
        about=about,
        speakers=speakers
    )
    try:
        db.session.add(new_program)
        db.session.commit() 
        return jsonify({"message": "Program submitted successfully!"}), 201
    except Exception as e:
        return jsonify({"message": "Error saving data", "error": str(e)}), 500


def get_db_connection():
    conn = sqlite3.connect('asm.db')
    conn.row_factory = sqlite3.Row 
    return conn

@app.route('/api/login', methods=['POST'])
def login():
    
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    conn = get_db_connection()

   
    user = conn.execute('SELECT * FROM admin_users WHERE username = ?', (username,)).fetchone()

   
    if user is None:
        return jsonify({"error": "Invalid username or password"}), 401

    
    if bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({"message": "Login successful"}), 200  
    else:
        return jsonify({"error": "Invalid username or password"}), 401
@app.route('/api/programs/<int:id>', methods=['DELETE'])
def delete_program(id):
    program_to_delete = Program.query.get(id)
    if not program_to_delete:
        return jsonify({"error": "Program not found"}), 404

    try:
        db.session.delete(program_to_delete)
        db.session.commit()
        return jsonify({"message": "Program deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": "Error deleting program", "details": str(e)}), 500
    

@app.route('/api/send-notification', methods=['POST'])
def send_notification():
    program_title = request.form.get('programTitle')
    message = request.form.get('message')
    csv_file = request.files.get('csvFile')

    if not program_title or not message or not csv_file:
        return jsonify({"error": "Missing required fields"}), 400

    contacts = []
    try:
        # Open the file in text mode
        file_stream = csv_file.stream.read().decode('utf-8').splitlines()
        csv_reader = csv.reader(file_stream)

        for row in csv_reader:
            contacts.append(row[0])  # Assuming the phone numbers are in the second column

        # Send messages via Twilio
        client = Client(ACCOUNT_SID, AUTH_TOKEN)
        for contact in contacts:
            client.messages.create(
                body=f"{program_title}: {message}",
                from_=TWILIO_PHONE_NUMBER,
                to=contact
            )

        return jsonify({"message": "Notification sent successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

CORS(app)


if __name__ == '__main__':
    app.run(debug=True)
