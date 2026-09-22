# KUBO Rolamentos — landing page

Site estático (HTML + CSS + JS puro, sem build). Pronto para Vercel.

## Estrutura

```
/
├── index.html          página principal
├── 404.html            página de erro
├── styles.css
├── main.js             busca, filtro da tabela, WhatsApp e formulário
├── favicon.svg / favicon-32.png / apple-touch-icon.png
├── robots.txt
├── sitemap.xml
├── vercel.json         URLs limpas, cache e cabeçalhos de segurança
└── images/             logos, ilustrações técnicas e imagem de compartilhamento
```

## Publicar na Vercel

1. Suba a pasta para um repositório (GitHub).
2. Na Vercel: New Project → importe o repositório → Framework Preset: **Other** → Deploy.
3. Em Settings → Domains, adicione `kuborolamentos.com.br` e `www.kuborolamentos.com.br`.

## Antes de ir ao ar (placeholders)

- [ ] Número do WhatsApp: constante `WHATSAPP` no topo de `main.js` e o texto no rodapé do `index.html`.
- [ ] Telefone no JSON-LD (`contactPoint.telephone`), gerado dentro do `<head>` do `index.html`.
- [ ] Domínio: se não for `www.kuborolamentos.com.br`, troque em `index.html` (canonical, og:url, og:image, JSON-LD), `robots.txt` e `sitemap.xml`.
- [ ] E-mail de contato e horário de atendimento no rodapé.
- [ ] Conferir com o Geredi os textos técnicos (sinais de desgaste, séries mais comuns, FAQ) e a tabela de referências.
- [ ] Google Search Console: verificar o domínio e enviar o `sitemap.xml`.
- [ ] Google Analytics 4 (opcional): o `main.js` já dispara `search` e `generate_lead` se o `gtag` estiver instalado.

## Imagens

As ilustrações em `images/*.svg` são desenhos técnicos vetoriais próprios. Quando houver fotos reais (amostras dos fornecedores, frotas de clientes com autorização), use WebP com largura até 1600 px e mantenha `width`, `height` e `alt` descritivo.
