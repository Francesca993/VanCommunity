from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from backend.mock_groups import MOCK_GROUPS, Group

app = FastAPI(title="Van Trips API")

# CORS configuration - allow frontend origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite default port
        "http://localhost:3000",  # Alternative dev port
        "http://localhost:8080",  # Lovable dev port
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class SearchRequest(BaseModel):
    age: int
    date: Optional[str] = None
    styles: List[str]
    has_van: bool

class JoinRequest(BaseModel):
    name: str
    age: int

class JoinResponse(BaseModel):
    success: bool
    whatsappLink: str

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok"}

@app.post("/api/groups/search", response_model=List[Group])
async def search_groups(request: SearchRequest):
    """
    Search for compatible groups based on user preferences.
    Filters by age range, date, and styles.
    """
    filtered_groups = []
    
    for group in MOCK_GROUPS:
        # Check age compatibility
        if not (group.min_age <= request.age <= group.max_age):
            continue
        
        # Check date if provided
        if request.date and group.date != request.date:
            continue
        
        # Check styles - at least one match if styles provided
        if request.styles:
            if not any(style in group.styles for style in request.styles):
                continue
        
        # Only show groups with available spots
        if group.spots_free > 0:
            filtered_groups.append(group)
    
    return filtered_groups

@app.post("/api/groups/{group_id}/join", response_model=JoinResponse)
async def join_group(group_id: str, request: JoinRequest):
    """
    Join a specific group. Returns WhatsApp link if successful.
    """
    # Find the group
    group = None
    for g in MOCK_GROUPS:
        if g.id == group_id:
            group = g
            break
    
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    # Check if spots available
    if group.spots_free <= 0:
        return JoinResponse(success=False, whatsappLink="")
    
    # Decrement spots (in production this would be database operation)
    group.spots_free -= 1
    
    return JoinResponse(success=True, whatsappLink=group.whatsapp_link)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
