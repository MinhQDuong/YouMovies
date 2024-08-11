# YouMovies
- A web application that displays official movie trailers from YouTube with a model finetuned from the Twitter-roBERTa-base model to perform Sentiment Analysis on the comments. 
- The motivation for this web is that many people watch movie trailers on YouTube and read the comments from other people to decide which movie is worth spending money and time to watch. However, many comments could contain spoilers about the movie, potentially ruining people's experience. 
- Watching from this website allows users to watch the trailers without the risk of being spoiled, while still being able to know other people opinions' on the movie through sentiment analysis. 

## Code and resources used
- Python version: 3.12.5
- Packages: torch, transformers, flask, flask-cors, numpy
- Framework used: React, Flask
- Dataset used for finetuning: [finkztah/youtube_trailer_comment_sentiment](https://huggingface.co/datasets/finkztah/youtube_trailer_comment_sentiment)
- Model used for finetuning: [cardiffnlp/twitter-roberta-base-sentiment-latest](https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment-latest)

## Finetuned model performance:
| Metric | Validation Set | Test Set |
| --- | --- | --- |
| Accuracy | 85.05% | 82.39% |
| F1-Score (Positive) | 89.22% | 88.11% |
| F1-Score (Neutral) | 79.16% | 75.37% |
| F1-Score (Negative) | 83.68% | 81.06% |
| Recall (Positive) | 91.45% | 89.84% |
| Recall (Neutral) | 73.62% | 72.61% |
| Recall (Negative) | 86.77% | 81.88% |
| Precision (Positive) | 87.10% | 86.44% |
| Precision (Neutral) | 85.61% | 78.35% |
| Precision (Negative) | 80.80% | 80.26% |

## Web page:
### Home page:
![Homepage](Images\Homepage.png)

### Video page:
![Videopage](Images\WatchVideopage.png)

