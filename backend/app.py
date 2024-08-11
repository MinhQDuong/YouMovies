from flask import Flask, request, jsonify
from flask_cors import CORS
from model import perform_sentiment_analysis

app = Flask(__name__)
CORS(app)



@app.route('/sentiment_analysis', methods=['POST'])
def sentiment_analysis():
    data = request.get_json()
    comments = data['comments'] 
    positive_percentage, neutral_percentage, negative_percentage = perform_sentiment_analysis(comments)
    
    return jsonify({
        'positive_percentage': positive_percentage,
        'neutral_percentage': neutral_percentage,
        'negative_percentage': negative_percentage
    })

if __name__ == '__main__':
    app.run(debug = True)
