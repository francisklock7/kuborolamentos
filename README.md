# KUBO Rolamentos — landing page

Página única em HTML com Tailwind CSS (CDN) e ícones Lucide, no mesmo padrão da primeira versão. Todos os arquivos ficam na raiz.

## Publicar na Vercel

1. Suba a pasta para um repositório (GitHub).
2. Na Vercel: New Project → importe o repositório → Framework Preset: **Other** → Deploy.
3. Em Settings → Domains, adicione `kuborolamentos.com.br` e `www.kuborolamentos.com.br`.

## Onde editar

- **WhatsApp:** constante `WHATSAPP` no script no fim do `index.html` (DDI + DDD + número, só dígitos) e o texto do rodapé.
- **Catálogo:** cada SKU é um `<article class="sku-card">` no HTML (indexável pelo Google). A ficha do modal lê o objeto `SKUS` no script.
- **Telefone e domínio no SEO:** JSON-LD no `<head>`, canonical, og:url, og:image, `robots.txt` e `sitemap.xml`.

## Antes de ir ao ar

- [ ] Trocar número do WhatsApp, e-mail e horário.
- [ ] Geredi revisar a tabela de equivalências (SKF/FAG/NTN), as linhas de produto e o FAQ.
- [ ] Confirmar os compromissos dos KPIs: cotação em até 1 dia útil, lote gravado na peça, ISO 9001/IATF 16949 exigidas dos fabricantes.
- [ ] Google Search Console: verificar o domínio e enviar o `sitemap.xml`.
- [ ] GA4 (opcional): o script já dispara `search`, `calculator_cta` e `generate_lead` se o `gtag` estiver instalado.

## Evolução

- O Tailwind via CDN é ótimo para iterar; para produção, compilar o CSS com o Tailwind CLI deixa a página mais leve e tira o aviso do console.
- O cadastro de frota hoje abre o WhatsApp com os dados preenchidos (incluindo a simulação da calculadora). Para gravar direto em planilha ou CRM, o próximo passo é uma função `/api/cadastro` na Vercel.
