/* CONFIGURAÇÃO — caminhos relativos à raiz do site. Textos: editar os HTML em pt/ e en/.
   Contactos e CV confirmados no currículo enviado. Os restantes materiais estão por adicionar. */
window.PORTFOLIO = {
  email: "diogomanuelvieirapinto@gmail.com",
  linkedin: "https://www.linkedin.com/in/diogopinto4480",
  cv: { pt: "assets/documents/Marketing_Digital_Diogo_Pinto.pdf", en: "assets/documents/Marketing_Digital_Diogo_Pinto.pdf" }, // O CV disponível está em português.
  portrait: "", // Ex.: "assets/images/diogo.jpg"
  documents: {
    dissertation: "", // Ex.: "assets/documents/dissertacao.pdf"
    dems: "",
    bachelor: "",
    annualReport: "",
    communication: ""
  },
  /* Cada entrada pode ter imagens reais. path = caminho; pt/en = legenda.
     Ex.: scouts: [{path: "assets/images/escuteiros-01.jpg",
       pt: "Atividade do agrupamento — local e ano", en: "Scout activity — location and year"}]
     Retirar os exemplos visuais: showPlaceholders: false. */
  showPlaceholders: true,
  galleries: { scouts: [], cenaculo: [], academic: [], events: [], editorial: [] }
};
