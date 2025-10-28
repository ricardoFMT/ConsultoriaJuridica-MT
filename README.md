\# \\# Consultoria Jurídica MT



\# 



\# Projeto front-end moderno criado para posicionar a Consultoria Jurídica MT como hub de inovação jurídica. O site apresenta a proposta de valor do escritório, destaca especialistas por área e oferece um painel simples para acompanhar a captação de clientes.



\# 



\# \\## ✨ Principais recursos



\# 



\# \\- \\\*\\\*Landing page premium\\\*\\\* com hero impactante, diferenciais, áreas de atuação e cases de sucesso.



\# \\- \\\*\\\*Catálogo dinâmico de especialistas\\\*\\\* com formulário para inserir novos advogados e respectivos cases.



\# \\- \\\*\\\*Painel de captação\\\*\\\* com indicadores rápidos, filtros por status/área e registro de novos leads.



\# \\- \\\*\\\*Inteligência de mercado\\\*\\\* com insights estratégicos e gráfico de oportunidades usando Chart.js.



\# \\- \\\*\\\*Formulários de contato e health-check\\\*\\\* para nutrir o funil comercial.



\# 



\# \\## 🚀 Como executar



\# 



\# 1\\. Clone o repositório:



\# \&nbsp;  ```bash



\# \&nbsp;  git clone <url-do-repo>



\# \&nbsp;  ```



\# 2\\. Acesse a pasta do projeto e abra o arquivo `index.html` no navegador.



\# 



\# Não há dependências adicionais além do Chart.js carregado via CDN.



\# 



\# \\### Se preferir baixar manualmente (sem git)



\# 



\# 1\\. Entre na página do repositório no GitHub (botão \\\*\\\*Código\\\*\\\* acima da listagem de arquivos).



\# 2\\. Clique no botão verde \\\*\\\*Code\\\*\\\* e escolha \\\*\\\*Download ZIP\\\*\\\*. O GitHub fará o download de um arquivo `ConsultoriaJuridica-MT-main.zip`.



\# 3\\. Extraia o ZIP em qualquer pasta do seu computador. Dentro dela você verá exatamente a estrutura listada em \\\[Onde encontrar os arquivos](#-onde-encontrar-os-arquivos).



\# 4\\. Abra a pasta extraída e dê duplo clique no `index.html` para visualizar o site.



\# 



\# > 💡 Dica: se estiver na interface web e não enxergar os arquivos, confirme se a branch selecionada no seletor acima da lista (campo "branch") é `main`/`principal`. Todos os arquivos estão versionados nessa branch.



\# 



\# \\### Download direto (arquivos prontos para publicar)



\# 



\# Agora o repositório oferece \\\*\\\*dois links diretos\\\*\\\* para baixar todos os arquivos do site em um único pacote ZIP:



\# 



\# \\- \\\[`consultoria-juridica-site.zip`](consultoria-juridica-site.zip)



\# \\- \\\[`downloads/consultoria-juridica-site.zip`](downloads/consultoria-juridica-site.zip)



\# 



\# Ao abrir qualquer um desses arquivos no GitHub, clique em \\\*\\\*Download raw file\\\*\\\* para salvar o pacote completo em seu computador. Ambos contêm exatamente esta estrutura:



\# 



\# ```text



\# index.html



\# assets/css/style.css



\# assets/js/app.js



\# assets/js/data.js



\# ```



\# 



\# Depois do download, extraia o ZIP e abra o `index.html` para visualizar o site.



\# 



\# \\## 📦 Onde encontrar os arquivos



\# 



\# Todos os arquivos do site já estão na raiz do repositório. Caso baixe o código em formato ZIP, basta extrair o conteúdo e você encontrará exatamente esta estrutura:



\# 



\# ```text



\# ConsultoriaJuridica-MT/



\# ├── index.html              # página principal com toda a marcação do site



\# ├── assets/



\# │   ├── css/



\# │   │   └── style.css       # estilos completos da interface



\# │   └── js/



\# │       ├── data.js        # conteúdo simulado (áreas, advogados, leads)



\# │       └── app.js         # scripts responsáveis por renderizar e controlar os modais



\# └── README.md



\# ```



\# 



\# Se abrir a pasta `assets`, verá também subpastas organizadas por tipo de arquivo (CSS e JS). Não há outros diretórios ocultos.



\# 



\# \\## 🌐 Como publicar rapidamente



\# 



\# Caso queira verificar se tudo está funcionando online, publique os arquivos em qualquer serviço de hospedagem estática (GitHub Pages, Netlify, Vercel, etc.). A forma mais rápida usando GitHub Pages é:



\# 



\# 1\\. Faça fork ou envie o repositório para o seu GitHub.



\# 2\\. Acesse as configurações do repositório (`Settings > Pages`).



\# 3\\. Em \\\*\\\*Source\\\*\\\*, selecione a branch que contém estes arquivos (geralmente `main`) e mantenha a pasta `/ (root)`.



\# 4\\. Salve. Em poucos minutos o GitHub Pages disponibilizará um link público com todo o site.



\# 



\# Se já tiver configurado um domínio próprio, basta apontá-lo para o link fornecido pelo serviço escolhido.



\# 



\# \\## 🧭 Próximos passos sugeridos



\# 



\# \\- Integrar os formulários com um backend (ex: Firebase, Supabase) para persistir leads e especialistas.



\# \\- Adicionar autenticação para parceiros acompanharem seus indicadores em área logada.



\# \\- Conectar o painel de captação com uma ferramenta de CRM ou planilha dinâmica.



\# Site Institucional | Ricardo Fernandes da Costa - Advocacia



Projeto completo em HTML5, CSS3, JavaScript e Node.js para o escritório do advogado Ricardo Fernandes da Costa (OAB/MT nº 18.765), com foco educativo e institucional em conformidade com o Provimento 205/2021 e o Código de Ética e Disciplina da OAB.



\## Conteúdo do projeto



\- Páginas institucionais: Home, Sobre, Áreas de Atuação, Blog, Contato e Política de Privacidade.

\- Layout responsivo com menu hambúrguer para dispositivos móveis e tipografia sóbria.

\- Estrutura otimizada para SEO local: meta tags, schema.org `LegalService`, sitemap.xml e robots.txt.

\- Blog com carregamento dinâmico de artigos a partir de `assets/data/posts.json`.

\- Formulário de contato integrado a API Node.js com envio de e-mail (via SMTP configurável) e registro das mensagens em SQLite.

\- Política de privacidade e aviso de confidencialidade destacados, alinhados à LGPD.

\- Cartilha informativa em PDF disponível para download, reforçando o caráter educativo do site.



\## Pré-requisitos



\- Node.js 18 ou superior

\- NPM ou outro gerenciador compatível

\- Servidor SMTP válido para envio de e-mails (opcional, porém recomendado)



\## Como executar em ambiente local



1\. Instale as dependências:



&nbsp;  ```bash

&nbsp;  npm install

&nbsp;  ```



2\. Configure as variáveis de ambiente:



&nbsp;  ```bash

&nbsp;  cp .env.example .env

&nbsp;  ```



&nbsp;  Preencha `.env` com os dados do seu servidor SMTP. Se não informar `MAIL\_HOST`, o sistema armazenará as mensagens, mas não enviará e-mails.



3\. Inicie o servidor de desenvolvimento:



&nbsp;  ```bash

&nbsp;  npm run dev

&nbsp;  ```



4\. Acesse `http://localhost:3000` no navegador. Os arquivos estáticos serão servidos pela aplicação Node.js, e o formulário de contato enviará os dados para `POST /api/contact`.



\## Estrutura de diretórios



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



\## API do formulário de contato



\- \*\*Endpoint:\*\* `POST /api/contact`

\- \*\*Payload esperado:\*\*



&nbsp; ```json

&nbsp; {

&nbsp;   "name": "Nome completo",

&nbsp;   "email": "email@exemplo.com",

&nbsp;   "phone": "(65) 3333-0000",

&nbsp;   "subject": "Assunto da mensagem",

&nbsp;   "message": "Descrição da demanda"

&nbsp; }

&nbsp; ```



\- \*\*Respostas possíveis:\*\*

&nbsp; - `200` – `{"message":"Mensagem registrada com sucesso."}`

&nbsp; - `400` – `{"message":"Preencha todos os campos obrigatórios."}`

&nbsp; - `500` – `{"message":"Não foi possível registrar a mensagem no momento."}`



As mensagens são armazenadas na tabela `contacts` do banco SQLite `data/contacts.db`. Caso as variáveis SMTP estejam configuradas, um e-mail é enviado automaticamente para o endereço definido em `MAIL\_TO` ou, em sua ausência, `MAIL\_USER`.



\## Observações sobre conformidade ética



\- O conteúdo textual adota linguagem informativa, sem promessa de resultados ou comparação com outros profissionais.

\- Os contatos recebidos via site não estabelecem vínculo contratual automático; a mensagem de confidencialidade reforça essa orientação.

\- Todas as seções destacam a importância da análise individualizada e do atendimento responsável.



\## Deploy



Este projeto pode ser publicado em qualquer serviço que suporte Node.js (Railway, Render, Vercel, etc.). Para hospedagem puramente estática, utilize apenas os arquivos HTML/CSS/JS e integre o formulário de contato a um serviço externo compatível com a política da OAB.

