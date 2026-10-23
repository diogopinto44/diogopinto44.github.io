# Portefólio — Diogo Pinto

Versão de trabalho do site, em HTML, CSS e JavaScript, pronta para GitHub Pages. Não exige instalação, compilação ou serviços externos. A navegação e as páginas funcionam ao abrir os ficheiros localmente; as galerias, contactos e documentos configurados usam JavaScript.

## Ver e experimentar

1. Extrair o ZIP e abrir `index.html` no navegador. A página de entrada abre a versão portuguesa.
2. Experimentar as quatro páginas, as etapas da timeline e o seletor PT/EN.
3. Nas galerias, selecionar uma miniatura para abrir a janela. Usar «Anterior», «Seguinte» e «Fechar»; a tecla Escape também fecha a janela.
4. Usar o botão de sol/lua junto a PT/EN para alternar entre os modos claro e escuro.

O ficheiro separado `Previsualizacao_Diogo_Pinto.html` permite experimentar a mesma versão num único ficheiro, sem extrair o ZIP, incluindo o download do CV. É uma fotografia desta versão; editar o site no ZIP não altera automaticamente essa pré-visualização.

## Estrutura

| Ficheiro/pasta | Finalidade |
| --- | --- |
| `index.html` | Entrada do site, abre a versão PT |
| `pt/index.html` e `en/index.html` | Homepage |
| `pt/sobre.html` e `en/sobre.html` | Narrativa pessoal em capítulos |
| `pt/formacao.html` e `en/formacao.html` | Formação, dissertação e projetos académicos |
| `pt/experiencia.html` e `en/experiencia.html` | Experiência profissional e exemplos de trabalho |
| `assets/css/style.css` | Cores, tamanhos, espaçamento e adaptação a telemóvel |
| `assets/css/theme.css` | Paletas dos modos claro/escuro e estilo do seletor |
| `assets/js/theme.js` | Seleção do tema e gravação da preferência |
| `assets/js/config.js` | Contactos, CV, documentos, retrato e fotografias |
| `assets/js/main.js` | Menu móvel, galeria e janelas de documentos |
| `assets/images/` | Fotografias e ícone do site |
| `assets/documents/` | CV e documentos em PDF |

## Alterar os textos

Editar diretamente os ficheiros HTML de cada idioma. Procurar os títulos e parágrafos que pretendes mudar. As páginas são HTML independente; os textos PT e EN devem ser atualizados separadamente.

Manter os IDs das secções, como `mestrado`, `licenciatura`, `escutismo` e `grupo-ramos-ferreira`: a timeline e as ligações entre idiomas usam esses identificadores. Para criar uma secção nova, dar-lhe o mesmo ID nos dois idiomas.

O cabeçalho e o rodapé têm o mesmo aspeto em todas as páginas. Se alterares os menus em HTML, repetir a alteração nas oito páginas. O estilo e as funcionalidades estão centralizados nos ficheiros CSS e JavaScript.

## Modo claro e modo escuro

O botão no cabeçalho permite alternar entre os dois temas em todas as páginas e nos dois idiomas. Na primeira visita, segue a preferência do dispositivo. Depois de escolheres um tema, o site guarda essa escolha no navegador e aplica-a nas visitas seguintes. A escolha manual tem prioridade sobre a definição do dispositivo.

O tema é aplicado antes de apresentar os estilos da página, para evitar um clarão de fundo claro ao entrar no modo escuro. Os controlos têm nomes acessíveis em PT/EN e funcionam com o teclado. Os fundos, cartões, textos, galerias e janelas acompanham a escolha; as fotografias mantêm as suas cores.

As cores podem ser ajustadas em `assets/css/theme.css`. Manter o carregamento de `theme.js` no cabeçalho, antes dos estilos. A persistência entre páginas funciona no site publicado; ao abrir ficheiros locais, depende das regras de armazenamento do navegador. A pré-visualização autónoma também mantém o tema ao navegar entre as suas páginas.

## Configurar contactos e currículo

Abrir `assets/js/config.js` e preencher os campos, por exemplo:

```js
email: "diogo@teu-dominio.pt",
linkedin: "https://www.linkedin.com/in/teu-perfil/",
cv: {
  pt: "assets/documents/CV_Diogo_Pinto_PT.pdf",
  en: "assets/documents/CV_Diogo_Pinto_EN.pdf"
},
portrait: "assets/images/diogo.jpg",
```

O email, o LinkedIn e o currículo já estão configurados com os dados do CV enviado. O ZIP inclui `assets/documents/Marketing_Digital_Diogo_Pinto.pdf`. O mesmo documento português é disponibilizado nas duas línguas; a opção inglesa indica «Download CV (PT)». Quando existir uma tradução do CV, atualizar o caminho `cv.en` e o texto dos botões nas páginas inglesas.

Colocar novos ficheiros reais nos caminhos indicados. Os documentos ainda sem ficheiro apresentam uma mensagem de indisponibilidade.

## Fotografias e galerias

As áreas visuais são espaços reservados, não fotografias reais. Em `galleries`, adicionar imagens às áreas `scouts`, `cenaculo`, `academic`, `events` e `editorial`:

```js
scouts: [
  {
    path: "assets/images/escuteiros-01.jpg",
    pt: "Atividade do agrupamento — local e ano",
    en: "Scout group activity — location and year"
  },
  {
    path: "assets/images/escuteiros-02.jpg",
    pt: "Outra fotografia — contexto",
    en: "Another photograph — context"
  }
],
```

Usar nomes simples, sem espaços, e respeitar maiúsculas/minúsculas. As legendas também são o texto alternativo das imagens. Comprimir as fotografias em JPEG/WebP antes de as colocar no repositório. Definir `showPlaceholders: false` para ocultar as galerias sem fotografias.

As imagens grandes da página «Sobre Mim» podem ser substituídas diretamente no HTML: trocar o bloco `chapter-photo` por uma imagem real com uma legenda e um texto alternativo. O retrato da homepage é configurável através de `portrait`.

## Documentos

Os campos `documents` correspondem aos botões já preparados:

```js
documents: {
  dissertation: "assets/documents/dissertacao.pdf",
  dems: "assets/documents/projeto-dems.pdf",
  bachelor: "assets/documents/projeto-licenciatura.pdf",
  annualReport: "assets/documents/relatorio-publico.pdf",
  communication: "assets/documents/sintese-comunicacao.pdf"
},
```

Os PDFs abrem num novo separador; o CV usa a opção de download. Ao adicionar um documento, ajustar o texto «Documento a adicionar» no respetivo HTML. Publicar apenas materiais que possas partilhar publicamente.

## Resultados e revisão final do conteúdo

Os textos foram preenchidos a partir do CV enviado em outubro de 2026, mantendo a apresentação profissional e distinguindo contributos pessoais e resultados das iniciativas. A homepage destaca dois planos trienais, a reestruturação do portfólio de mais de 360 obras e a liderança de uma equipa de 16 elementos no Cenáculo.

As datas da formação, os cargos e a experiência profissional seguem o CV: Grupo Ramos Ferreira, Luís Sousa Lopes Arquitetura Entretenimento e GainStation. O mestrado está concluído desde novembro de 2025, com 17 valores. Os capítulos sobre escutismo e voluntariado incluem as responsabilidades descritas no currículo.

Antes de desenvolver casos de estudo, completar: nomes e exemplos dos quatro relatórios; períodos de medição dos resultados digitais; contexto dos eventos; materiais da dissertação e do projeto DEMS; seleção de projetos académicos; histórias pessoais e fotografias. A métrica de aumento de até 133% nas sessões mensais não foi apresentada nesta versão, porque falta o período e a base de comparação. Os números de redes sociais mantêm-se separados, sem somar métricas diferentes nem os apresentar como pessoas únicas.

O prólogo tem uma apresentação curta; as memórias de infância e os motivos das escolhas pessoais aguardam o relato do Diogo. A revisão do texto e os exemplos de projetos podem ser feitos por página.

Remover as notas de «Versão de trabalho» e os espaços por preencher quando o conteúdo estiver finalizado.

## Colocar no GitHub Pages

1. Fazer uma cópia da versão atual do repositório.
2. Copiar o **conteúdo** da pasta `portfolio-diogo` para a raiz do repositório `diogopinto44.github.io`, substituindo o antigo `index.html`. Evitar colocar a pasta inteira dentro de outra pasta.
3. Fazer commit e push pelo teu fluxo habitual. A publicação usa a configuração GitHub Pages do repositório.
4. Depois de publicado, verificar a navegação, os dois idiomas e os downloads no computador e no telemóvel.

O código usa caminhos relativos para funcionar localmente e na raiz do GitHub Pages. As URLs canónicas e `hreflang` apontam para `https://diogopinto44.github.io/`; se mudares o domínio, atualizar essas etiquetas nos oito HTML.

Esta entrega não modifica nem publica o repositório GitHub existente.
