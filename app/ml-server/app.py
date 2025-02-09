from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
import joblib

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

class SocialServiceClassifier:
    def __init__(self):
        self.categories = [
            'FOOD_BANK', 'SHELTER', 'MEDICAL', 'EDUCATION',
            'RECREATION', 'COMMUNITY_CENTER', 'OTHER'
        ]
        self.pipeline = Pipeline([
            ('tfidf', TfidfVectorizer(
                max_features=5000,
                ngram_range=(1, 2),
                stop_words='english'
            )),
            ('classifier', LogisticRegression(
                max_iter=1000  # Remove the multi_class parameter
            ))
        ])

    def train(self, X_train, y_train):
        self.pipeline.fit(X_train, y_train)

    def predict(self, text):
        prediction = self.pipeline.predict([text])[0]
        probabilities = self.pipeline.predict_proba([text])[0]
        return {
            'category': prediction,
            'probabilities': dict(zip(self.categories, probabilities.tolist()))
        }

# Initialize training data as an empty list
training_data = []

# Add examples to the training data
training_data += [
    # Food Bank examples
    ("Where can I get free meals", "FOOD_BANK"),
    ("Food distribution locations", "FOOD_BANK"),
    ("Nutrition assistance programs", "FOOD_BANK"),
    ("Food help for low-income families", "FOOD_BANK"),
    ("Local food drives", "FOOD_BANK"),
    
    # Shelter examples
    ("Shelters for women and children", "SHELTER"),
    ("Veteran housing assistance", "SHELTER"),
    ("Low-cost temporary shelters", "SHELTER"),
    ("Transitional housing programs", "SHELTER"),
    ("Cold weather shelters", "SHELTER"),
    
    # Medical examples
    ("Low-cost dental clinics", "MEDICAL"),
    ("Mental health services", "MEDICAL"),
    ("Immunization clinics", "MEDICAL"),
    ("Health services for uninsured", "MEDICAL"),
    ("Affordable eye care", "MEDICAL"),
    
    # Education examples
    ("Scholarship programs", "EDUCATION"),
    ("Job readiness training", "EDUCATION"),
    ("Online learning resources", "EDUCATION"),
    ("Reading and literacy programs", "EDUCATION"),
    ("Trade school options", "EDUCATION"),
    
    # Recreation examples
    ("Free fitness classes", "RECREATION"),
    ("Community gardening programs", "RECREATION"),
    ("Art and craft workshops", "RECREATION"),
    ("Music and dance classes", "RECREATION"),
    ("Sports leagues for kids", "RECREATION"),
    
    # Community Center examples
    ("Family resource centers", "COMMUNITY_CENTER"),
    ("Youth leadership programs", "COMMUNITY_CENTER"),
    ("Volunteer opportunities", "COMMUNITY_CENTER"),
    ("Community education classes", "COMMUNITY_CENTER"),
    ("Local social events", "COMMUNITY_CENTER"),
    
    # Other examples
    ("Disaster relief services", "OTHER"),
    ("Affordable childcare", "OTHER"),
    ("Veteran support services", "OTHER"),
    ("Assistance with utility bills", "OTHER"),
    ("Substance abuse programs", "OTHER")
]

# Initialize and train the classifier
classifier = SocialServiceClassifier()
texts, labels = zip(*training_data)
classifier.train(texts, labels)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        result = classifier.predict(text)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
