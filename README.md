# Site Institucional | Ricardo Fernandes da Costa - Advocacia

Projeto completo em HTML5, CSS3, JavaScript e Node.js para o escritório do advogado Ricardo Fernandes da Costa (OAB/MT nº 18.765), com foco educativo e institucional em conformidade com o Provimento 205/2021 e o Código de Ética e Disciplina da OAB.

## Conteúdo do projeto

- Páginas institucionais: Home, Sobre, Áreas de Atuação, Blog, Contato e Política de Privacidade.
- Layout responsivo com menu hambúrguer para dispositivos móveis e tipografia sóbria.
- Estrutura otimizada para SEO local: meta tags, schema.org `LegalService`, sitemap.xml e robots.txt.
- Blog com carregamento dinâmico de artigos a partir de `assets/data/posts.json`.
- Formulário de contato integrado a API Node.js com envio de e-mail (via SMTP configurável) e registro das mensagens em SQLite.
- Política de privacidade e aviso de confidencialidade destacados, alinhados à LGPD.
- Cartilha informativa em PDF disponível para download, reforçando o caráter educativo do site.

## Pré-requisitos

- Node.js 18 ou superior
- NPM ou outro gerenciador compatível
- Servidor SMTP válido para envio de e-mails (opcional, porém recomendado)

## Como executar em ambiente local

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Configure as variáveis de ambiente:

   ```bash
   cp .env.example .env
   ```

   Preencha `.env` com os dados do seu servidor SMTP. Se não informar `MAIL_HOST`, o sistema armazenará as mensagens, mas não enviará e-mails.

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse `http://localhost:3000` no navegador. Os arquivos estáticos serão servidos pela aplicação Node.js, e o formulário de contato enviará os dados para `POST /api/contact`.

## Estrutura de diretórios

```text
ConsultoriaJuridica-MT/
├── assets/
│   ├── css/
│   │   └── main.css           # estilos globais e responsivos
│   ├── data/
│   │   └── posts.json         # conteúdo exibido no blog
│   ├── docs/
│   │   └── cartilha-orientacoes.pdf  # guia educativo disponível para download
│   └── js/
│       ├── contact.js         # envio assíncrono do formulário de contato
│       ├── main.js            # comportamentos globais (menu móvel, ano atual)
│       └── posts.js           # renderização dinâmica dos artigos
├── data/
│   └── contacts.db            # banco SQLite criado automaticamente (ignorado no Git)
├── index.html                 # página inicial
├── sobre.html                 # apresentação do advogado e do escritório
├── areas.html                 # áreas de atuação detalhadas
├── blog.html                  # listagem de artigos informativos
├── contato.html               # formulário e informações de contato
├── politica-privacidade.html  # política de privacidade e LGPD
├── sitemap.xml                # mapa do site para mecanismos de busca
├── robots.txt                 # orientações de indexação
├── server.js                  # API para receber contatos e enviar e-mails
├── package.json               # dependências e scripts
├── .env.example               # modelo de configuração de ambiente
├── .gitignore                 # arquivos ignorados pelo Git
└── README.md
```

## API do formulário de contato

- **Endpoint:** `POST /api/contact`
- **Payload esperado:**

  ```json
  {
    "name": "Nome completo",
    "email": "email@exemplo.com",
    "phone": "(65) 3333-0000",
    "subject": "Assunto da mensagem",
    "message": "Descrição da demanda"
  }
  ```

- **Respostas possíveis:**
  - `200` – `{"message":"Mensagem registrada com sucesso."}`
  - `400` – `{"message":"Preencha todos os campos obrigatórios."}`
  - `500` – `{"message":"Não foi possível registrar a mensagem no momento."}`

As mensagens são armazenadas na tabela `contacts` do banco SQLite `data/contacts.db`. Caso as variáveis SMTP estejam configuradas, um e-mail é enviado automaticamente para o endereço definido em `MAIL_TO` ou, em sua ausência, `MAIL_USER`.

## Observações sobre conformidade ética

- O conteúdo textual adota linguagem informativa, sem promessa de resultados ou comparação com outros profissionais.
- Os contatos recebidos via site não estabelecem vínculo contratual automático; a mensagem de confidencialidade reforça essa orientação.
- Todas as seções destacam a importância da análise individualizada e do atendimento responsável.

## Deploy

Este projeto pode ser publicado em qualquer serviço que suporte Node.js (Railway, Render, Vercel, etc.). Para hospedagem puramente estática, utilize apenas os arquivos HTML/CSS/JS e integre o formulário de contato a um serviço externo compatível com a política da OAB.
