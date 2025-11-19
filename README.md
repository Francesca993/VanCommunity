# Project info

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```


# Backend
```sh
# Crea virtual environment
python -m venv venv

# Attiva (macOS/Linux)
source venv/bin/activate

# Attiva (Windows)
venv\Scripts\activate

# Installa dipendenze
pip install -r backend/requirements.txt

# Avvia il server
uvicorn backend.main:app --reload --port 8000
```
