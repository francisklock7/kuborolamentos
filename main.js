/* KUBO Rolamentos — interações da landing page (sem dependências) */
(function () {
  'use strict';

  // >>> Troque pelo número oficial (DDI + DDD + número, só dígitos) <<<
  var WHATSAPP = '5551999999999';

  function waLink(msg) {
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg || '');
  }

  // Links de WhatsApp com mensagem contextual
  document.querySelectorAll('.js-wa').forEach(function (a) {
    a.href = waLink(a.getAttribute('data-msg'));
    a.target = '_blank';
    a.rel = 'noopener';
  });

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  // Menu mobile
  var btnMenu = document.querySelector('.abre-menu');
  var menu = document.getElementById('menu');
  if (btnMenu && menu) {
    btnMenu.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto');
      btnMenu.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('aberto');
        btnMenu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Filtro da tabela ----------
  var linhas = Array.prototype.slice.call(document.querySelectorAll('#rolamentos tbody tr'));
  var botoesFiltro = document.querySelectorAll('.filtros button');
  function filtrar(serie) {
    botoesFiltro.forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-filtro') === serie ? 'true' : 'false');
    });
    linhas.forEach(function (tr) {
      tr.hidden = !(serie === 'todas' || tr.getAttribute('data-serie') === serie);
    });
  }
  botoesFiltro.forEach(function (b) {
    b.addEventListener('click', function () { filtrar(b.getAttribute('data-filtro')); });
  });

  function destacarLinha(tr) {
    filtrar('todas');
    linhas.forEach(function (l) { l.classList.remove('destaque'); });
    tr.classList.add('destaque');
    tr.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Âncoras diretas para códigos (#rolamento-32218) destacam a linha
  function tratarHash() {
    var h = location.hash.slice(1);
    if (h.indexOf('rolamento-') === 0) {
      var tr = document.getElementById(h);
      if (tr) setTimeout(function () { destacarLinha(tr); }, 60);
    }
  }
  window.addEventListener('hashchange', tratarHash);
  tratarHash();

  // ---------- Busca universal ----------
  function norm(s) {
    return (s || '').toString().toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[\s\-\/\.]/g, '');
  }

  var indice = [];
  linhas.forEach(function (tr) {
    var cod = tr.getAttribute('data-codigo');
    indice.push({ rotulo: cod, tipo: 'Rolamento cônico', chave: norm(cod), mono: true, acao: function () { destacarLinha(tr); } });
  });
  document.querySelectorAll('.marca-item').forEach(function (el) {
    var nome = el.getAttribute('data-marca');
    var modelos = el.querySelector('p').textContent;
    indice.push({
      rotulo: nome + ' (' + modelos + ')', tipo: 'Caminhão', chave: norm(nome + ' ' + modelos),
      acao: function () { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    });
  });
  [
    ['Cubo de roda', 'cubo-de-roda', 'cubo roda roda dianteira traseira ponta de eixo'],
    ['Diferencial e pinhão', 'diferencial', 'diferencial pinhao coroa eixo traseiro meritor dana spicer'],
    ['Caixa de câmbio', 'transmissao', 'cambio caixa transmissao zf eaton'],
    ['Carretas e semirreboques', 'caminhoes', 'carreta semirreboque randon librelato facchini']
  ].forEach(function (a) {
    indice.push({
      rotulo: a[0], tipo: 'Aplicação', chave: norm(a[0] + ' ' + a[2]),
      acao: function () { document.getElementById(a[1]).scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  var form = document.getElementById('busca');
  var campo = document.getElementById('busca-campo');
  var lista = document.getElementById('sugestoes');
  var atuais = [];
  var sel = -1;

  function fechar() {
    lista.hidden = true; campo.setAttribute('aria-expanded', 'false'); sel = -1;
  }

  function render(q) {
    var n = norm(q);
    lista.innerHTML = '';
    if (!n) { fechar(); return; }
    atuais = indice.filter(function (i) { return i.chave.indexOf(n) !== -1; }).slice(0, 7);
    atuais.push({
      rotulo: 'Perguntar ao especialista sobre "' + q.trim() + '"', tipo: 'WhatsApp',
      acao: function () { window.open(waLink('Olá! Procuro rolamento para: ' + q.trim()), '_blank', 'noopener'); }
    });
    atuais.forEach(function (item, i) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#'; a.id = 'sug-' + i; a.setAttribute('role', 'option');
      var r = document.createElement('span'); r.textContent = item.rotulo; if (item.mono) r.className = 'cod';
      var t = document.createElement('span'); t.className = 'tipo'; t.textContent = item.tipo;
      a.appendChild(r); a.appendChild(t);
      a.addEventListener('mousedown', function (e) { e.preventDefault(); escolher(i); });
      li.appendChild(a); lista.appendChild(li);
    });
    lista.hidden = false; campo.setAttribute('aria-expanded', 'true'); sel = -1;
  }

  function marcar(i) {
    var itens = lista.querySelectorAll('a');
    itens.forEach(function (a, k) { a.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
    sel = i;
    if (itens[i]) campo.setAttribute('aria-activedescendant', itens[i].id);
  }

  function escolher(i) {
    var item = atuais[i];
    fechar();
    if (item) item.acao();
    if (window.gtag) window.gtag('event', 'search', { search_term: campo.value });
  }

  if (form) {
    campo.addEventListener('input', function () { render(campo.value); });
    campo.addEventListener('keydown', function (e) {
      if (lista.hidden) return;
      var total = atuais.length;
      if (e.key === 'ArrowDown') { e.preventDefault(); marcar((sel + 1) % total); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); marcar((sel - 1 + total) % total); }
      else if (e.key === 'Escape') { fechar(); }
    });
    campo.addEventListener('blur', function () { setTimeout(fechar, 120); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!campo.value.trim()) { campo.focus(); return; }
      if (lista.hidden) render(campo.value);
      escolher(sel >= 0 ? sel : 0);
    });
  }

  // ---------- Formulário de perfil da frota -> WhatsApp ----------
  var ff = document.getElementById('form-frota');
  if (ff) {
    ff.addEventListener('submit', function (e) {
      e.preventDefault();
      var obrig = ['nome', 'empresa', 'veiculos'];
      var ok = true;
      obrig.forEach(function (n) {
        var el = ff.elements[n];
        var erro = document.getElementById('e-' + n);
        var vazio = !el.value.trim();
        el.setAttribute('aria-invalid', vazio ? 'true' : 'false');
        erro.textContent = vazio ? 'Preencha este campo para continuar.' : '';
        if (vazio && ok) { el.focus(); ok = false; }
      });
      if (!ok) return;
      var v = function (n) { return ff.elements[n].value.trim(); };
      var msg = [
        'Olá! Quero enviar o perfil da minha frota para a KUBO.',
        '',
        'Nome: ' + v('nome'),
        'Empresa: ' + v('empresa'),
        v('cidade') ? 'Cidade/UF: ' + v('cidade') : null,
        'Perfil: ' + v('perfil'),
        'Veículos: ' + v('veiculos'),
        'Rodagem média: ' + v('km'),
        'Objetivo: ' + v('objetivo')
      ].filter(function (l) { return l !== null; }).join('\n');
      if (window.gtag) window.gtag('event', 'generate_lead', { method: 'whatsapp_form' });
      window.open(waLink(msg), '_blank', 'noopener');
    });
  }
})();
