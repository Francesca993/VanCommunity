# Van Trips Backend

Backend API per Van Trips, costruito con Python e FastAPI.

## Setup

### Requisiti
- Python 3.9+
- pip

### Installazione

1. Crea un virtual environment:
```bash
python -m venv venv
```

2. Attiva il virtual environment:

**Su macOS/Linux:**
```bash
source venv/bin/activate
```

**Su Windows:**
```bash
venv\Scripts\activate
```

3. Installa le dipendenze:
```bash
pip install -r backend/requirements.txt
```

### Avvio del server

Dalla root del progetto, esegui:

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Il backend sarà disponibile su `http://localhost:8000`

### Documentazione API

Una volta avviato il server, puoi accedere alla documentazione interattiva:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Endpoints

### GET /health
Health check endpoint.

### POST /api/groups/search
Cerca gruppi compatibili in base a età, data e stili.

**Request Body:**
```json
{
  "age": 28,
  "date": "2025-05-20",
  "styles": ["Tranquillo", "Natura"],
  "has_van": true
}
```

### POST /api/groups/{group_id}/join
Unisciti a un gruppo specifico.

**Request Body:**
```json
{
  "name": "Mario",
  "age": 28
}
```

## Sviluppo

I mock groups sono definiti in `backend/mock_groups.py`. In produzione, questi verrebbero sostituiti con un database reale.

## CORS

Il backend è configurato per accettare richieste da:
- http://localhost:5173 (Vite)
- http://localhost:3000
- http://localhost:8080 (Lovable)
