from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///programs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

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


@app.route('/api/programs', methods=['GET'])
def get_programs():
    programs = Program.query.all()
    programs_list = [
        {
            'title': program.title,
            'dates': f"{program.start_date} - {program.end_date}",
            'duration': f"{program.end_time} - {program.start_time}"
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
        db.session.commit()  # Commit the transaction to save the data
        return jsonify({"message": "Program submitted successfully!"}), 201
    except Exception as e:
        return jsonify({"message": "Error saving data", "error": str(e)}), 500

def delete_program(id):
    program = Program.query.get(id)
    if not program:
        return jsonify({'error': 'Program not found'}), 404

    db.session.delete(program)
    db.session.commit()
    return jsonify({'message': 'Program deleted successfully'}), 200

CORS(app)

if __name__ == '__main__':
    app.run(debug=True)
