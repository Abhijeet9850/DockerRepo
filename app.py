from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from frontend

# Serve HTML Form
@app.route('/', methods=['GET'])
def index():
    return render_template_string("""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Flask Form</title>
        </head>
        <body>
            <h2>Submit Form</h2>
            <form id="dataForm">
                <label for="name">Name:</label><br>
                <input type="text" id="name" name="name" required><br><br>

                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email" required><br><br>

                <button type="submit">Submit</button>
            </form>

            <script>
                const form = document.getElementById('dataForm');
                form.addEventListener('submit', async function(e) {
                    e.preventDefault();

                    const formData = {
                        name: document.getElementById('name').value,
                        email: document.getElementById('email').value
                    };

                    const response = await fetch('/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    const result = await response.json();
                    alert(JSON.stringify(result));
                });
            </script>
        </body>
        </html>
    """)

# Handle form submission
@app.route('/submit', methods=['POST'])
def submit_form():
    data = request.json
    return jsonify({
        "message": "Data received successfully",
        "data": data
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
