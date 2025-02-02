# Backend FAQ API

This is a backend project to manage FAQs with multilingual support and caching using Node.js and Redis. The API allows you to fetch FAQs in different languages, with the ability to add new FAQs, update them, and cache translations for improved performance.

## Features

- **Multilingual Support**: FAQ questions and answers can be translated dynamically based on the `lang` query parameter.
- **Caching**: Translations are cached in Redis to improve performance and reduce the number of requests to the translation service.
- **API Endpoints**: Exposes API endpoints to manage FAQs and fetch them in different languages.

## Tech Stack

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **Redis**: In-memory data store for caching translations.
- **Google Translate API**: Used for translating FAQ content.
- **Mongoose**: MongoDB object modeling.
  
## Prerequisites

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Redis](https://redis.io/)

Additionally, you will need a Google Translate API key (can be replaced by a different translation service if needed).

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Subbu-chowdary/FAQ-backend
    cd backend-faq
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file at the root of the project and add your Google Translate API key and Redis configuration:

    ```env
    MONGO_URI=MONGO_URI=mongodb+srv://<your-username>:<your-password>@portfolio.znzoq.mongodb.net/faqdb
    REDIS_HOST=127.0.0.1
    REDIS_PORT=6379
    
    ```

4. **Start the server:**

    ```bash
    npm start
    ```

    The server should now be running at `http://localhost:5000`.

## API Endpoints

### 1. Fetch FAQs

  Example:
  ```bash
  # Fetch FAQs in English (default)
  curl http://localhost:8000/api/faqs/

  # Fetch FAQs in Hindi
  curl http://localhost:8000/api/faqs/?lang=hi

  # Fetch FAQs in Bengali
  curl http://localhost:8000/api/faqs/?lang=bn
  ```
  
