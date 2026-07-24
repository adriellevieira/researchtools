# Calculadora de Métricas - Research Ops

Uma aplicação web para calcular e gerenciar métricas de pesquisa com integração ao Firebase.

## 🎯 Funcionalidades

- **Execução de Pesquisa**: Rastreie duração média por fase (Planejamento, Execução, Análise, Documentação)
- **Métricas em Tempo Real**: Cálculos automáticos de médias e percentuais
- **Banco de Dados Firebase**: Armazene todas as pesquisas na nuvem
- **Interface Responsiva**: Funciona em desktop e mobile
- **Visualização de Dados**: Gráficos e distribuições claros

## 📋 Estrutura do Projeto

```
.
├── index.html      # Arquivo principal HTML
├── styles.css      # Estilos CSS responsivos
├── config.js       # Configuração do Firebase
├── app.js          # Lógica da aplicação
└── README.md       # Este arquivo
```

## 🚀 Como Usar

### Pré-requisitos

- Conta no [Firebase](https://firebase.google.com/)
- Projeto criado no Firebase Console

### Instalação

1. Clone ou faça fork deste repositório
2. Abra `config.js` e substitua as credenciais do Firebase:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

3. Configure as regras de segurança do Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /researches/{document=**} {
      allow read, write: if true;
    }
  }
}
```

4. Abra `index.html` em um navegador ou hospede em um servidor web

## 📊 Estrutura de Dados Firebase

Coleção: `researches`

```json
{
  "name": "OTT_EST_041",
  "planning": 2,
  "execution": 10,
  "analysis": 5,
  "documentation": 5,
  "timestamp": "2024-07-24T10:30:00Z"
}
```

## 🎨 Interface

### Tabs Disponíveis

1. **01 EXECUÇÃO DE PESQUISA** ✅
   - Duração média por pesquisa
   - Pesquisas registradas
   - Distribuição por fase
   - Adicionar nova pesquisa
   - Lista de pesquisas

2. **02 TEMPO DE RECRUTAMENTO** 🔄 (Em desenvolvimento)
3. **03 TAXA DE NÃO COMPARECIMENTO** 🔄 (Em desenvolvimento)

## 🔧 Tecnologias

- **Frontend**: HTML, CSS, JavaScript Vanilla
- **Backend**: Firebase Firestore
- **SDK**: Firebase 9.23.0

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- Desktop
- Tablet
- Mobile

## 🐛 Troubleshooting

### Erro: "Missing or insufficient permissions"
Verifique as regras de segurança do Firestore.

### Erro: "Firebase is not defined"
Certifique-se de que os scripts do Firebase estão carregados antes de `app.js`.

### Dados não aparecem
1. Verifique a conexão com a internet
2. Confirme as credenciais do Firebase em `config.js`
3. Abra o Console do Navegador (F12) para ver mensagens de erro

## 📝 Licença

MIT

## 👤 Autor

Criado por Adrielle Vieira
