# AS Drift Creative — Landing Page

Landing page institucional da **AS Drift Creative**, agência de marketing digital do Rio de Janeiro.
Página única, construída em HTML, CSS e JavaScript puro, sem framework, sem build step e sem dependências.

---

## Stack

- HTML5 semântico
- CSS3 (custom properties, grid, flexbox, `mask-image`, `clip-path`)
- JavaScript vanilla (IntersectionObserver, sem bibliotecas)
- Fontes: Saira Condensed e Barlow, via Google Fonts

Sem npm, sem bundler. O que está no repositório é exatamente o que vai para o ar.

---

## Rodando localmente

Abrir o `index.html` no navegador já funciona. Para desenvolvimento, prefira um servidor local:

**VS Code + Live Server**
Instale a extensão, clique com o botão direito no `index.html` e escolha *Open with Live Server*.

**Terminal**

```bash
python -m http.server 5500
# ou
npx serve .
```

Depois acesse `http://localhost:5500`.

---

## Seções

| Seção | ID | Observações |
|---|---|---|
| Hero | `#topo` | Logo com máscara radial, rastro de derrapagem em SVG, parallax no mouse |
| Faixa | — | Marquee infinito com os serviços |
| Serviços | `#servicos` | 7 cards, o primeiro em destaque |
| Pacotes | `#pacotes` | 4 planos numerados por marcha |
| Por que a Drift | `#drift` | Diferenciais e checklist |
| Sobre | `#sobre` | Alana, Samuel e a origem do nome | (SUSPENSO POR ENQUANTO)
| Cases | `#cases` | Estado vazio, aguardando resultados |
| Dúvidas | `#duvidas` | Acordeão |
| Contato | `#contato` | Formulário que abre o WhatsApp |

---

## Personalização

### Cores

Todas centralizadas no topo do `style.css`, em `:root`:

```css
--asphalt:   #04102A;   /* fundo base */
--asphalt-2: #071A3D;   /* seções alternadas */
--logo-bg:   #0C2560;   /* azul da logo */
--royal:     #1743A6;   /* brilho */
--chrome:    #EDF1F7;   /* texto claro */
--steel:     #8FA1BE;   /* texto de apoio */
--onca:      #F09A34;   /* laranja, cor de acento */
--flame:     #D53B2A;   /* vermelho, uso mínimo */
```

### Valores dos pacotes

Cada card tem `<div class="price">Valor sob consulta</div>`. Será Substituído pelo valor real, caso haja necessidade.

### Cases

A seção está com três `.case-slot` de placeholder. Quando houver resultados, será trocado cada um por um card com logo do cliente e o número alcançado.

### Contato

O número do WhatsApp aparece em quatro lugares do `index.html` no formato `wa.me/5521965746350`. Se mudar, busque e substitua em todas as ocorrências.

### Faixa de serviços

Os itens do marquee estão duplicados no HTML, e é isso que faz o loop parecer contínuo (a animação desliza exatamente 50% da faixa). Ao editar um item, edite também a cópia.

## Formulário

Não há back-end. Ao enviar, o formulário monta a mensagem com os dados preenchidos e abre o WhatsApp em nova aba.


## Acessibilidade e performance

- Navegação por teclado com `:focus-visible` visível em todos os elementos interativos
- Imagens em WebP, com PNG de reserva; nenhuma requisição de JS externo


## Licença

Projeto proprietário. A identidade visual, a logo e os textos pertencem à AS Drift Creative.
