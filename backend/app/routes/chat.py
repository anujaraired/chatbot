from fastapi import APIRouter
from app.models.chat_model import ChatRequest
from app.services.chat_service import get_reply

router = APIRouter()

@router.post("/")
async def chat(req: ChatRequest):
    reply = get_reply(req.message)
    return {"reply": reply}