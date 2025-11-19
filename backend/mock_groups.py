from pydantic import BaseModel
from typing import List

class Group(BaseModel):
    id: str
    name: str
    location: str
    date: str
    min_age: int
    max_age: int
    styles: List[str]
    spots_free: int
    whatsapp_link: str
    image: str = ""

# Mock groups data for Van Trips
MOCK_GROUPS = [
    Group(
        id="1",
        name="Lago di Braies Weekend",
        location="Dolomiti, Alto Adige",
        date="2025-05-20",
        min_age=28,
        max_age=34,
        styles=["Tranquillo", "Lago", "Natura"],
        spots_free=3,
        whatsapp_link="https://wa.me/1234567890?text=Ciao!%20Mi%20unisco%20al%20gruppo%20Lago%20di%20Braies",
        image="/src/assets/braies.jpg"
    ),
    Group(
        id="2",
        name="Toscana Colline",
        location="Chianti, Toscana",
        date="2025-05-21",
        min_age=25,
        max_age=32,
        styles=["Fotografico", "Sociale"],
        spots_free=2,
        whatsapp_link="https://wa.me/1234567890?text=Ciao!%20Mi%20unisco%20al%20gruppo%20Toscana",
        image="/src/assets/tuscany.jpg"
    ),
    Group(
        id="3",
        name="Cinque Terre Mare",
        location="Liguria",
        date="2025-05-22",
        min_age=30,
        max_age=40,
        styles=["Avventura", "Sociale"],
        spots_free=4,
        whatsapp_link="https://wa.me/1234567890?text=Ciao!%20Mi%20unisco%20al%20gruppo%20Cinque%20Terre",
        image="/src/assets/cinqueterre.jpg"
    ),
    Group(
        id="4",
        name="Alpi Svizzere",
        location="Canton Ticino, Svizzera",
        date="2025-05-23",
        min_age=26,
        max_age=35,
        styles=["Avventura", "Tranquillo", "Natura"],
        spots_free=3,
        whatsapp_link="https://wa.me/1234567890?text=Ciao!%20Mi%20unisco%20al%20gruppo%20Alpi",
        image=""
    ),
    Group(
        id="5",
        name="Costiera Amalfitana",
        location="Campania",
        date="2025-05-24",
        min_age=24,
        max_age=38,
        styles=["Fotografico", "Sociale", "Avventura"],
        spots_free=2,
        whatsapp_link="https://wa.me/1234567890?text=Ciao!%20Mi%20unisco%20al%20gruppo%20Amalfi",
        image=""
    ),
]
