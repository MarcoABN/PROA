from fastapi import APIRouter, Response
from app.models.procuracao_model import ProcuracaoRequest
from app.services.procuracao_service import gerar_procuracao

router = APIRouter(prefix="/procuracao", tags=["Procuracao"])

@router.post("/gerar")
def gerar(request: ProcuracaoRequest):
    print ('Iniciou a entrada no python')
    pdf = gerar_procuracao(request)
    return Response(content=pdf, media_type="application/pdf")
