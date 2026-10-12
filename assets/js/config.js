/* CONFIGURAÇÃO — caminhos relativos à raiz do site. Textos: editar os HTML em pt/ e en/.
   Os exemplos abaixo estão desligados até adicionares os teus ficheiros reais. */
window.PORTFOLIO = {
  email: "", // Ex.: "diogo@dominio.pt"
  linkedin: "", // URL completo do teu perfil, depois de confirmado
  cv: { pt: "", en: "" }, // Ex.: "assets/documents/CV_Diogo_Pinto.pdf"
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
