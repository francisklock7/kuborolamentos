# KUBO Rolamentos — landing page

Site estático (HTML + CSS + JS puro, sem build). Pronto para Vercel.

## Estrutura

```
/
├── index.html          página principal
├── 404.html            página de erro
├── styles.css
├── main.js             busca, filtro, calculadora, WhatsApp e cadastro de frota
├── favicon.svg / favicon-32.png / apple-touch-icon.png
├── robots.txt
├── sitemap.xml
├── vercel.json         URLs limpas, cache e cabeçalhos de segurança
├── *.svg / *.png       logos, ilustrações técnicas e imagem de compartilhamento
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
- [ ] Conferir com o Geredi a tabela de equivalências (SKF/FAG/NTN), as linhas de produto e o FAQ.
- [ ] Confirmar os compromissos dos KPIs antes de publicar: cotação em até 1 dia útil, lote gravado na peça e na embalagem, ISO 9001/IATF 16949 exigidas dos fabricantes.
- [ ] Google Search Console: verificar o domínio e enviar o `sitemap.xml`.
- [ ] Google Analytics 4 (opcional): o `main.js` já dispara `search`, `calculator_cta` e `generate_lead` se o `gtag` estiver instalado.

## Cadastro de frota

Hoje o formulário do Programa de Parceiros B2B monta a mensagem e abre o WhatsApp (inclui a simulação da calculadora, se o visitante usou). Para gravar os cadastros direto em planilha ou CRM, o próximo passo é uma função serverless na Vercel (`/api/cadastro`).

## Imagens

As ilustrações (`*.svg`) são desenhos técnicos vetoriais próprios. Quando houver fotos reais (amostras dos fornecedores, frotas de clientes com autorização), use WebP com largura até 1600 px e mantenha `width`, `height` e `alt` descritivo.
