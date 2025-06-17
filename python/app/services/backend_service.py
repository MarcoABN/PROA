import requests

BACKEND_URL = "http://localhost:8080/"  # Altere para seu backend Java

def obter_dados_cliente(idCliente):
    response = requests.get(f"{BACKEND_URL}ccliente/cliente/{idCliente}")
    response.raise_for_status()
    return response.json()

def obter_dados_embarcacao(idEmbarcacao):
    response = requests.get(f"{BACKEND_URL}cembarcacao/embarcacao/{idEmbarcacao}")
    response.raise_for_status()
    return response.json()


# 🔸 Motores da embarcação
def obter_motores(idEmbarcacao):
    response = requests.get(f"{BACKEND_URL}cmotor/embarcacao/{idEmbarcacao}")
    response.raise_for_status()
    return response.json()


# 🔸 Nota Fiscal vinculada à embarcação
def obter_nota_fiscal(idEmbarcacao):
    response = requests.get(f"{BACKEND_URL}cnotafiscal/embarcacao/{idEmbarcacao}")
    response.raise_for_status()
    dados = response.json()
    return dados[0] if dados else None


# 🔸 Organização Militar (se necessário futuramente)
def obter_org_militar(idOrgMilitar):
    response = requests.get(f"{BACKEND_URL}corgmilitar/orgmilitar/{idOrgMilitar}")
    response.raise_for_status()
    return response.json()
