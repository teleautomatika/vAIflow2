# vAIflow

Plataforma visual de automação de workflows baseada em DAG com IA assistiva.

## Estrutura do Projeto
```
vAIflow/
├── packages/
│   ├── frontend/    # Editor visual (React + React Flow)
│   └── backend/     # Executor de workflows (Node.js + Express)
├── .gitignore
├── README.md
```

## Como Rodar Localmente

### 1. Clonar o Repositório
```bash
git clone https://github.com/teleautomatika/vAIflow.git
cd vAIflow
```

### 2. Instalar Dependências

**Frontend:**
```bash
cd packages/frontend
npm install
```

**Backend:**
```bash
cd ../backend
npm install
```

### 3. Rodar o Projeto

**Backend:**
```bash
cd packages/backend
npm run dev
```

**Frontend (em outro terminal):**
```bash
cd packages/frontend
npm run dev
```

### 4. Acessar
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3001](http://localhost:3001)

## Funcionalidades Atuais
- Editor visual com React Flow
- Execução de workflows baseados em DAG
- Integrações simuladas: Webhook, Slack, Email
- Salvar e carregar workflows (memória local)

## Próximos Passos
- Persistência real (Banco de Dados)
- Autenticação de usuários
- Execução assíncrona e monitoramento

---
Feito com 💡 e ⚡ por [Raphael Krás].
