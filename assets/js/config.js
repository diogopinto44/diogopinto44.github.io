/* CONFIGURAÇÃO — caminhos relativos à raiz do site. Textos: editar os HTML em pt/ e en/.
   Contactos e CV confirmados no currículo enviado. Trabalhos académicos originais já incluídos. */
window.PORTFOLIO = {
  email: "diogomanuelvieirapinto@gmail.com",
  linkedin: "https://www.linkedin.com/in/diogopinto4480",
  cv: { pt: "assets/documents/Marketing_Digital_Diogo_Pinto.pdf", en: "assets/documents/Digital_Marketing_Diogo_Pinto.pdf" }, // Cada idioma descarrega o CV correspondente.
  portrait: "assets/images/personal/diogo-retrato.jpg", // Fotografia fornecida pelo autor.
  documents: {
    dissertation: "assets/documents/Dissertacao_Diogo_Pinto_Marketing_Digital.pdf",
    dems: "assets/documents/DEMS_Advanced_Cyclone_Systems.pdf",
    beesimple: "assets/documents/BeeSimple.pdf",
    abreu: "assets/documents/Agencia_Abreu.pdf",
    kamaly: "assets/documents/KAMALY.pdf",
    annualReport: "",
    communication: ""
  },
  /* Cada entrada pode incluir fotografias e vídeo locais. path = caminho; pt/en = legenda.
     Exemplo de foto: {path: "assets/images/eventos/evento-01.jpg", pt: "Evento", en: "Event"}
     Exemplo de vídeo: {type: "video", path: "assets/media/reabertura.mp4",
                         poster: "assets/images/gainstation/video-capa.jpg", pt: "Vídeo de reabertura", en: "Reopening video"}
     Adicionar estas entradas a galleries.events ou galleries.gainstation.
     A ausência de materiais mantém os espaços reservados, sem imagens inventadas.
     Retirar os restantes exemplos vazios: showPlaceholders: false. */
  showPlaceholders: false,
  galleries: { scouts: [], cenaculo: [], academic: [], events: [], gainstation: [], editorial: [] }
};
