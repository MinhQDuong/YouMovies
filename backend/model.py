import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer

# Determine the device to use
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load the pre-trained model
model = AutoModelForSequenceClassification.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment-latest")
model.to(device)  # Move the model to the appropriate device

# Load the model weights
file_path = "model/version1.pth"
try:
    model.load_state_dict(torch.load(file_path, map_location=device, weights_only=True))
except RuntimeError:
    # If the model was saved on a CUDA device, but no CUDA device is available,
    # try loading the model weights on the CPU
    model.load_state_dict(torch.load(file_path, map_location=torch.device('cpu'), weights_only=True))
model.eval()
# Load the tokenizer
tokenizer = AutoTokenizer.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment-latest")

def perform_sentiment_analysis(comments):
    # Initialize counters
    positive_count = 0
    neutral_count = 0
    negative_count = 0
    total_comments = len(comments)

    # Iterate through each comment
    for comment in comments:
        # Preprocess the comment
        input_id = tokenizer.encode(comment, return_tensors="pt", max_length=512, truncation=True)

        # Perform sentiment analysis
        outputs = model(input_id)
        logits = outputs.logits
        softmax = torch.nn.Softmax(dim=1)
        probabilities = softmax(logits)

        # Determine the sentiment class
        if probabilities[0, 2] > 0.5:
            positive_count += 1
        elif probabilities[0, 1] > 0.5:
            neutral_count += 1
        else:
            negative_count += 1

    # Calculate the sentiment percentages
    positive_percentage = round((positive_count / total_comments) * 100, 2)
    neutral_percentage = round((neutral_count / total_comments) * 100, 2)
    negative_percentage = round((negative_count / total_comments) * 100, 2)

    return positive_percentage, neutral_percentage, negative_percentage