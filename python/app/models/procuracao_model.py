from pydantic import BaseModel


class ProcuracaoRequest(BaseModel):
    idCliente: int
