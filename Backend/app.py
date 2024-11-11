from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask app and database
app = Flask(__name__)

# Configure the database (SQLite)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///programs.db'  # SQLite database file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Create a Program model for the database
class Program(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    start_date = db.Column(db.String(10), nullable=False)
    end_date = db.Column(db.String(10), nullable=False)
    start_time = db.Column(db.String(5), nullable=False)
    end_time = db.Column(db.String(5), nullable=False)
    priority = db.Column(db.Integer, nullable=False)
    about = db.Column(db.Text, nullable=True)
    speakers = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f"<Program {self.title}>"

# Create the database
with app.app_context():
    db.create_all()  # This creates the table if it doesn't exist

# Route to handle form submission
@app.route('/api/submit', methods=['POST'])
def submit_program():
    data = request.get_json()  # Get JSON data from the request

    # Extract data from the request
    title = data.get('title')
    start_date = data.get('startDate')
    end_date = data.get('endDate')
    start_time = data.get('startTime')
    end_time = data.get('endTime')
    priority = data.get('priority')
    about = data.get('about')
    speakers = data.get('speakers')

    # Validate the data
    if not title or not start_date or not end_date or not start_time or not end_time:
        return jsonify({"message": "All required fields must be provided!"}), 400

    # Create a new Program object
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

    # Add the new program to the database and commit
    db.session.add(new_program)
    db.session.commit()

    return jsonify({"message": "Program submitted successfully!", "program": data}), 201


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
