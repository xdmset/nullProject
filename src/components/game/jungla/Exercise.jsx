// exercise.jsx

export const exercises = {
  pantalla1: [
    // ========== EJERCICIOS DE MEMORAMA (3) ==========
    {
      id: 1,
      type: "memory",
      pairs: [
        { image: "/src/assets/game/icons-jungla/animales/almeja.png", text: "Almeja" },
        { image: "/src/assets/game/icons-jungla/animales/cisne.png", text: "Cisne" },
        { image: "/src/assets/game/icons-jungla/animales/jirafa.png", text: "Jirafa" }
      ],
      question: "Encuentra el animal que corresponde a cada nombre"
    },
    {
      id: 2,
      type: "memory",
      pairs: [
        { image: "/src/assets/game/icons-jungla/animales/tigre.png", text: "Tigre" },
        { image: "/src/assets/game/icons-jungla/animales/oso.png", text: "Oso" },
        { image: "/src/assets/game/icons-jungla/animales/vaca.png", text: "Vaca" }
      ],
      question: "Relaciona la imagen con el nombre del animal"
    },
    {
      id: 3,
      type: "memory",
      pairs: [
        { image: "/src/assets/game/icons-jungla/animales/chango.png", text: "Chango" },
        { image: "/src/assets/game/icons-jungla/animales/hipopotamo.png", text: "Hipopótamo" },
        { image: "/src/assets/game/icons-jungla/animales/rinoceronte.png", text: "Rinoceronte" }
      ],
      question: "Une cada animal con su nombre correcto"
    },

    // ========== EJERCICIOS DE TEXTO (8) ==========
    {
      id: 4,
      type: "choice",
      image: "/src/assets/game/icons-jungla/animales/leon.png",
      question: "¿Qué animal se muestra en la imagen?",
      correctAnswer: "León",
      options: ["León", "Tigre", "Jirafa", "Elefante"]
    },
    {
      id: 5,
      type: "choice",
      image: "/src/assets/game/icons-jungla/animales/elefante.png",
      question: "Selecciona el nombre correcto para este animal",
      correctAnswer: "Elefante",
      options: ["Rinoceronte", "Hipopótamo", "Elefante", "Oso"]
    },
    {
      id: 6,
      type: "choice",
      image: "/src/assets/game/icons-jungla/animales/jirafa.png",
      question: "¿Cómo se llama este animal?",
      correctAnswer: "Jirafa",
      options: ["Zebra", "Jirafa", "Caballo", "Venado"]
    },
    {
      id: 7,
      type: "choice",
      image: "/src/assets/game/icons-jungla/animales/tigre.png",
      question: "Identifica correctamente este animal",
      correctAnswer: "Tigre",
      options: ["León", "Tigre", "Leopardo", "Jaguar"]
    },
    {
      id: 8,
      type: "choice",
      image: "/src/assets/game/icons-jungla/animales/oso.png",
      question: "¿Qué animal es?",
      correctAnswer: "Oso",
      options: ["Oso", "Panda", "Koala", "Mono"]
    },
    {
      id: 9,
      type: "choice",
      image: "/src/assets/game/icons-jungla/animales/lobo.png",
      question: "Selecciona la opción correcta",
      correctAnswer: "Lobo",
      options: ["Caballo", "Lobo", "Burro", "Vaca"]
    },

    // ========== EJERCICIOS DE IMAGEN (3) ==========
    {
      id: 10,
      type: "choice",
      text: "León",
      question: "Selecciona la imagen que corresponde al texto",
      correctAnswer: "/src/assets/game/icons-jungla/animales/leon.png",
      options: [
        "/src/assets/game/icons-jungla/animales/tigre.png",
        "/src/assets/game/icons-jungla/animales/leon.png",
        "/src/assets/game/icons-jungla/animales/oso.png",
        "/src/assets/game/icons-jungla/animales/jirafa.png"
      ]
    },
    {
      id: 11,
      type: "choice",
      text: "Caracol",
      question: "¿Cuál es la imagen relacionada al texto?",
      correctAnswer: "/src/assets/game/icons-jungla/animales/caracol.png",
      options: [
        "/src/assets/game/icons-jungla/animales/caracol.png",
        "/src/assets/game/icons-jungla/animales/hipopotamo.png",
        "/src/assets/game/icons-jungla/animales/elefante.png",
        "/src/assets/game/icons-jungla/animales/oso.png"
      ]
    },
    {
      id: 12,
      type: "choice",
      text: "Gusano",
      question: "Selecciona la imagen con relacion al texto correcta",
      correctAnswer: "/src/assets/game/icons-jungla/animales/gusano.png",
      options: [
        "/src/assets/game/icons-jungla/animales/gusano.png",
        "/src/assets/game/icons-jungla/animales/jirafa.png",
        "/src/assets/game/icons-jungla/animales/caballo.png",
        "/src/assets/game/icons-jungla/animales/pez.png"
      ]
    }
  ],

  pantalla2: [
    // ========== EJERCICIOS DE MEMORAMA (6) ==========
    {
      id: 1,
      type: "memory",
      pairs: [
        { image: "/src/assets/game/icons-jungla/emociones/alegre.png", text: "Alegre" },
        { image: "/src/assets/game/icons-jungla/emociones/triste.png", text: "Triste" },
        { image: "/src/assets/game/icons-jungla/emociones/enojado.png", text: "Enojado" }
      ],
      question: "Encuentra la emoción que corresponde a cada nombre"
    },
    {
      id: 2,
      type: "memory",
      pairs: [
        { image: "/src/assets/game/icons-jungla/animales/pollo.png", text: "Pollo" },
        { image: "/src/assets/game/icons-jungla/animales/pato.png", text: "Pato" },
        { image: "/src/assets/game/icons-jungla/animales/tortuga.png", text: "Tortuga" }
      ],
      question: "Relaciona la imagen con el nombre del animal"
    },
    {
      id: 3,
      type: "memory",
      pairs: [
        { image: "/src/assets/game/icons-jungla/emociones/asustado.png", text: "Asustado" },
        { image: "/src/assets/game/icons-jungla/emociones/sorprendido.png", text: "Sorprendido" },
        { image: "/src/assets/game/icons-jungla/emociones/enamorado.png", text: "Enamorado" }
      ],
      question: "Une cada emoción con su nombre correcto"
    },
    {
      id: 4,
      type: "memory",
      pairs: [
        { image: "/src/assets/game/icons-jungla/animales/raton.png", text: "Raton" },
        { image: "/src/assets/game/icons-jungla/animales/pulpo.png", text: "Pulpo" },
        { image: "/src/assets/game/icons-jungla/animales/murcielago.png", text: "Murcielago" }
      ],
      question: "Encuentra el animal que corresponde a cada nombre"
    },
    {
      id: 5,
      type: "memory",
      pairs: [
        { image: "/src/assets/game/icons-jungla/emociones/alegre.png", text: "Alegre" },
        { image: "/src/assets/game/icons-jungla/emociones/contento.png", text: "Contento" },
        { image: "/src/assets/game/icons-jungla/emociones/triste.png", text: "Triste" }
      ],
      question: "Relaciona la imagen con la emoción"
    },
    {
      id: 6,
      type: "memory",
      pairs: [
        { image: "/src/assets/game/icons-jungla/animales/perico.png", text: "Perico" },
        { image: "/src/assets/game/icons-jungla/animales/rinoceronte.png", text: "Rinoceronte" },
        { image: "/src/assets/game/icons-jungla/animales/borrego.png", text: "Borrego" }
      ],
      question: "Une cada animal con su nombre correcto"
    },

    // ========== EJERCICIOS DE MATCHING (4) ==========
    {
      id: 7,
      type: "matching",
      leftItems: [
        { id: 1, image: "/src/assets/game/icons-jungla/emociones/alegre.png" },
        { id: 2, image: "/src/assets/game/icons-jungla/emociones/triste.png" },
        { id: 3, image: "/src/assets/game/icons-jungla/emociones/enojado.png" }
      ],
      rightItems: [
        { id: 1, text: "Alegre" },
        { id: 3, text: "Enojado" },
        { id: 2, text: "Triste" }
      ],
      question: "Empareja cada emoción con su nombre"
    },
    {
      id: 8,
      type: "matching",
      leftItems: [
        { id: 1, image: "/src/assets/game/icons-jungla/animales/vaca.png" },
        { id: 2, image: "/src/assets/game/icons-jungla/animales/leon.png" },
        { id: 3, image: "/src/assets/game/icons-jungla/animales/tigre.png" }
      ],
      rightItems: [
        { id: 2, text: "Leon" },
        { id: 3, text: "Tigre" },
        { id: 1, text: "Vaca" }
      ],
      question: "Empareja cada animal con su nombre"
    },
    {
      id: 9,
      type: "matching",
      leftItems: [
        { id: 1, image: "/src/assets/game/icons-jungla/emociones/furioso.png" },
        { id: 2, image: "/src/assets/game/icons-jungla/emociones/sorprendido.png" },
        { id: 3, image: "/src/assets/game/icons-jungla/emociones/arrepentido.png" }
      ],
      rightItems: [
        { id: 1, text: "Furioso" },
        { id: 2, text: "Sorprendido" },
        { id: 3, text: "Arrepentido" }
      ],
      question: "Une cada imagen de emoción con su nombre"
    },
    {
      id: 10,
      type: "matching",
      leftItems: [
        { id: 1, image: "/src/assets/game/icons-jungla/animales/jirafa.png" },
        { id: 2, image: "/src/assets/game/icons-jungla/animales/hormiga.png" },
        { id: 3, image: "/src/assets/game/icons-jungla/animales/vaca.png" }
      ],
      rightItems: [
        { id: 3, text: "Vaca" },
        { id: 2, text: "hormiga" },
        { id: 1, text: "Jirafa" }
      ],
      question: "Relaciona cada animal con su nombre"
    },

    // ========== EJERCICIOS DE SELECCIÓN DE IMAGEN (4) ==========
    {
      id: 11,
      type: "choice",
      text: "Alegria",
      question: "Selecciona la imagen que corresponde a esta emoción",
      correctAnswer: "/src/assets/game/icons-jungla/emociones/alegre.png",
      options: [
        "/src/assets/game/icons-jungla/emociones/nervioso.png",
        "/src/assets/game/icons-jungla/emociones/alegre.png",
        "/src/assets/game/icons-jungla/emociones/enfermo.png",
        "/src/assets/game/icons-jungla/emociones/preocupado.png"
      ]
    },
    {
      id: 12,
      type: "choice",
      text: "León",
      question: "Selecciona la imagen que corresponde a este animal",
      correctAnswer: "/src/assets/game/icons-jungla/animales/leon.png",
      options: [
        "/src/assets/game/icons-jungla/animales/perro.png",
        "/src/assets/game/icons-jungla/animales/tigre.png",
        "/src/assets/game/icons-jungla/animales/leon.png",
        "/src/assets/game/icons-jungla/animales/pollo.png"
      ]
    },
    {
      id: 13,
      type: "choice",
      text: "Cansancio",
      question: "¿Cuál es la imagen relacionada a esta emoción?",
      correctAnswer: "/src/assets/game/icons-jungla/emociones/cansado.png",
      options: [
        "/src/assets/game/icons-jungla/emociones/aburrido.png",
        "/src/assets/game/icons-jungla/emociones/cansado.png",
        "/src/assets/game/icons-jungla/emociones/enamorado.png",
        "/src/assets/game/icons-jungla/emociones/contento.png"
      ]
    },
    {
      id: 14,
      type: "choice",
      text: "Rana",
      question: "Selecciona la imagen correcta para este animal",
      correctAnswer: "/src/assets/game/icons-jungla/animales/rana.png",
      options: [
        "/src/assets/game/icons-jungla/animales/hipopotamo.png",
        "/src/assets/game/icons-jungla/animales/foca.png",
        "/src/assets/game/icons-jungla/animales/rana.png",
        "/src/assets/game/icons-jungla/animales/elefante.png"
      ]
    }
  ],

  pantalla3: [
    // ========== EJERCICIOS DE MATCHING (6) ==========
    {
      id: 1,
      type: "matching",
      leftItems: [
        { id: 1, image: "/src/assets/game/icons-jungla/animales/pulpo.png" },
        { id: 2, image: "/src/assets/game/icons-jungla/animales/buho.png" },
        { id: 3, image: "/src/assets/game/icons-jungla/animales/alacran.png" }
      ],
      rightItems: [
        { id: 1, text: "Pulpo" },
        { id: 3, text: "Alacran" },
        { id: 2, text: "Buho" }
      ],
      question: "Empareja cada animal con su nombre"
    },
    {
      id: 2,
      type: "matching",
      leftItems: [
        { id: 1, image: "/src/assets/game/icons-jungla/animales/jirafa.png" },
        { id: 2, image: "/src/assets/game/icons-jungla/animales/pato.png" },
        { id: 3, image: "/src/assets/game/icons-jungla/animales/rana.png" }
      ],
      rightItems: [
        { id: 2, text: "Pato" },
        { id: 3, text: "Rana" },
        { id: 1, text: "Jirafa" }
      ],
      question: "Relaciona cada imagen con el animal correcto"
    },
    {
      id: 3,
      type: "matching",
      leftItems: [
        { id: 1, image: "/src/assets/game/icons-jungla/animales/vaca.png" },
        { id: 2, image: "/src/assets/game/icons-jungla/animales/pollo.png" },
        { id: 3, image: "/src/assets/game/icons-jungla/animales/perro.png" }
      ],
      rightItems: [
        { id: 1, text: "Vaca" },
        { id: 2, text: "Pollo" },
        { id: 3, text: "Perro" }
      ],
      question: "Une cada animal con su nombre"
    },
    {
      id: 4,
      type: "matching",
      leftItems: [
        { id: 1, image: "/src/assets/game/icons-jungla/animales/chango.png" },
        { id: 2, image: "/src/assets/game/icons-jungla/animales/canguro.png" },
        { id: 3, image: "/src/assets/game/icons-jungla/animales/hipopotamo.png" }
      ],
      rightItems: [
        { id: 1, text: "Chango" },
        { id: 3, text: "Hipopotamo" },
        { id: 2, text: "Canguro" }
      ],
      question: "Empareja las imágenes con los nombres"
    },
    {
      id: 5,
      type: "matching",
      leftItems: [
        { id: 1, image: "/src/assets/game/icons-jungla/animales/pato.png" },
        { id: 2, image: "/src/assets/game/icons-jungla/animales/tortuga.png" },
        { id: 3, image: "/src/assets/game/icons-jungla/animales/pez.png" }
      ],
      rightItems: [
        { id: 2, text: "Tortuga" },
        { id: 1, text: "Pato" },
        { id: 3, text: "Pez" }
      ],
      question: "Relaciona cada animal acuático con su nombre"
    },
    {
      id: 6,
      type: "matching",
      leftItems: [
        { id: 1, image: "/src/assets/game/icons-jungla/animales/lobo.png" },
        { id: 2, image: "/src/assets/game/icons-jungla/animales/leon.png" },
        { id: 3, image: "/src/assets/game/icons-jungla/animales/oso.png" }
      ],
      rightItems: [
        { id: 1, text: "Lobo" },
        { id: 2, text: "Leon" },
        { id: 3, text: "Oso" }
      ],
      question: "Une cada animal salvaje con su nombre"
    },

    // ========== EJERCICIOS DE DUAL CHOICE (4) ==========
    {
      id: 7,
      type: "dual",
      context: "Selecciona el animal correcto y su hábitat",
      questionImage: "/src/assets/game/icons-jungla/dual/leon.jpg",
      correctAnswers: {
        colorImage: "/src/assets/game/icons-jungla/habitats/sabana.jpg",
        numberImage: "/src/assets/game/icons-jungla/animales/leon.png"
      },
      options: {
        colorImages: [
          "/src/assets/game/icons-jungla/habitats/sabana.jpg",
          "/src/assets/game/icons-jungla/habitats/oceano.jpg"
        ],
        numberImages: [
          "/src/assets/game/icons-jungla/animales/leon.png",
          "/src/assets/game/icons-jungla/animales/oso.png"
        ]
      }
    },
    {
      id: 8,
      type: "dual",
      context: "Selecciona el animal correcto y su hábitat",
      questionImage: "/src/assets/game/icons-jungla/dual/pescado.jpg",
      correctAnswers: {
        colorImage: "/src/assets/game/icons-jungla/habitats/oceano.jpg",
        numberImage: "/src/assets/game/icons-jungla/animales/pez.png"
      },
      options: {
        colorImages: [
          "/src/assets/game/icons-jungla/habitats/jungla.jpg",
          "/src/assets/game/icons-jungla/habitats/oceano.jpg"
        ],
        numberImages: [
          "/src/assets/game/icons-jungla/animales/pez.png",
          "/src/assets/game/icons-jungla/animales/oso.png"
        ]
      }
    },
    {
      id: 9,
      type: "dual",
      context: "Selecciona el animal correcto y su hábitat",
      questionImage: "/src/assets/game/icons-jungla/dual/oso.jpg",
      correctAnswers: {
        colorImage: "/src/assets/game/icons-jungla/habitats/bosque.jpg",
        numberImage: "/src/assets/game/icons-jungla/animales/oso.png"
      },
      options: {
        colorImages: [
          "/src/assets/game/icons-jungla/habitats/desierto.jpg",
          "/src/assets/game/icons-jungla/habitats/bosque.jpg"
        ],
        numberImages: [
          "/src/assets/game/icons-jungla/animales/oso.png",
          "/src/assets/game/icons-jungla/animales/caballo.png"
        ]
      }
    },
    {
      id: 10,
      type: "dual",
      context: "Selecciona el animal correcto y su hábitat",
      questionImage: "/src/assets/game/icons-jungla/dual/alacran.jpg",
      correctAnswers: {
        colorImage: "/src/assets/game/icons-jungla/habitats/desierto.jpg",
        numberImage: "/src/assets/game/icons-jungla/animales/alacran.png"
      },
      options: {
        colorImages: [
          "/src/assets/game/icons-jungla/habitats/desierto.jpg",
          "/src/assets/game/icons-jungla/habitats/oceano.jpg"
        ],
        numberImages: [
          "/src/assets/game/icons-jungla/animales/oso.png",
          "/src/assets/game/icons-jungla/animales/alacran.png"
        ]
      }
    },

    // ========== EJERCICIOS DE SINGLE IMAGE (4) ==========
    {
      id: 11,
      type: "singleImage",
      image: "/src/assets/game/icons-jungla/animales/jirafa.png",
      question: "¿Qué animal se muestra en la imagen?",
      correctAnswer: "jirafa"
    },
    {
      id: 12,
      type: "singleImage",
      image: "/src/assets/game/icons-jungla/animales/alacran.png",
      question: "¿Qué animal se muestra en la imagen?",
      correctAnswer: "alacran"
    },
    {
      id: 13,
      type: "singleImage",
      image: "/src/assets/game/icons-jungla/animales/perro.png",
      question: "¿Qué animal se muestra en la imagen?",
      correctAnswer: "perro"
    },
    {
      id: 14,
      type: "singleImage",
      image: "/src/assets/game/icons-jungla/animales/pez.png",
      question: "¿Qué animal se muestra en la imagen?",
      correctAnswer: "pez"
    }
  ],

  pantalla4: [
    // ========== EJERCICIOS DE CHOICE (2 de texto + 2 de imagen) ==========
    // Choice de texto (animales)
    {
      id: 1,
      type: "choice",
      image: "/src/assets/game/icons-jungla/animales/perro.png",
      question: "¿Qué animal se muestra en la imagen?",
      correctAnswer: "Perro",
      options: ["Perro", "Tigre", "Jirafa", "Elefante"]
    },
    // Choice de texto (emociones)
    {
      id: 2,
      type: "choice",
      image: "/src/assets/game/icons-jungla/emociones/alegre.png",
      question: "¿Qué emoción representa esta imagen?",
      correctAnswer: "Alegre",
      options: ["Feliz", "Triste", "Alegre", "Asustado"]
    },
    // Choice de imagen (animales)
    {
      id: 3,
      type: "choice",
      text: "Elefante",
      question: "Selecciona la imagen que corresponde al animal",
      correctAnswer: "/src/assets/game/icons-jungla/animales/elefante.png",
      options: [
        "/src/assets/game/icons-jungla/animales/leon.png",
        "/src/assets/game/icons-jungla/animales/elefante.png",
        "/src/assets/game/icons-jungla/animales/perro.png",
        "/src/assets/game/icons-jungla/animales/vaca.png"
      ]
    },
    // Choice de imagen (emociones)
    {
      id: 4,
      type: "choice",
      text: "Sorprendido",
      question: "Selecciona la imagen que corresponde a esta emoción",
      correctAnswer: "/src/assets/game/icons-jungla/emociones/sorprendido.png",
      options: [
        "/src/assets/game/icons-jungla/emociones/enojado.png",
        "/src/assets/game/icons-jungla/emociones/sorprendido.png",
        "/src/assets/game/icons-jungla/emociones/triste.png",
        "/src/assets/game/icons-jungla/emociones/cansado.png"
      ]
    },

    // ========== EJERCICIOS DE DUALCHOICE (2) ==========
    // Dualchoice (animales + hábitat)
    {
      id: 5,
      type: "dual",
      context: "Selecciona el animal y su hábitat correcto",
      questionImage: "/src/assets/game/icons-jungla/dual/perro.jpeg",
      correctAnswers: {
        colorImage: "/src/assets/game/icons-jungla/habitats/casa.jpg",
        numberImage: "/src/assets/game/icons-jungla/animales/perro.png"
      },
      options: {
        colorImages: [
          "/src/assets/game/icons-jungla/habitats/casa.jpg",
          "/src/assets/game/icons-jungla/habitats/bosque.jpg"
        ],
        numberImages: [
          "/src/assets/game/icons-jungla/animales/caracol.png",
          "/src/assets/game/icons-jungla/animales/perro.png"
        ]
      }
    },
    // Dualchoice (emociones + intensidad)
    {
      id: 6,
      type: "dual",
      context: "Selecciona la emoción y su nivel de intensidad",
      questionImage: "/src/assets/game/icons-jungla/emociones/enojado.jpg",
      correctAnswers: {
        colorImage: "/src/assets/game/icons-jungla/dual/altaIntensidad.jpg",
        numberImage: "/src/assets/game/icons-jungla/emociones/enojado.png"
      },
      options: {
        colorImages: [
          "/src/assets/game/icons-jungla/dual/altaIntensidad.jpg",
          "/src/assets/game/icons-jungla/dual/bajaIntensidad.jpg"
        ],
        numberImages: [
          "/src/assets/game/icons-jungla/emociones/enojado.png",
          "/src/assets/game/icons-jungla/emociones/asustado.png"
        ]
      }
    },

    // ========== EJERCICIOS DE SINGLEIMAGE (4) ==========
    // SingleImage (animales)
    {
      id: 7,
      type: "singleImage",
      image: "/src/assets/game/icons-jungla/animales/jirafa.png",
      question: "¿Qué animal se muestra en la imagen?",
      correctAnswer: "jirafa"
    },
    {
      id: 8,
      type: "singleImage",
      image: "/src/assets/game/icons-jungla/animales/perro.png",
      question: "Escribe el nombre de este animal",
      correctAnswer: "perro"
    },
    // SingleImage (emociones)
    {
      id: 9,
      type: "singleImage",
      image: "/src/assets/game/icons-jungla/emociones/triste.png",
      question: "¿Qué emoción representa esta imagen?",
      correctAnswer: "triste"
    },
    {
      id: 10,
      type: "singleImage",
      image: "/src/assets/game/icons-jungla/emociones/nervioso.png",
      question: "Identifica esta emoción",
      correctAnswer: "nervioso"
    },

    // ========== EJERCICIOS DE MATCHING (4) ==========
    // Matching (animales)
    {
      id: 11,
      type: "matching",
      leftItems: [
        { id: 1, image: "/src/assets/game/icons-jungla/animales/hormiga.png" },
        { id: 2, image: "/src/assets/game/icons-jungla/animales/tigre.png" },
        { id: 3, image: "/src/assets/game/icons-jungla/animales/jabali.png" }
      ],
      rightItems: [
        { id: 3, text: "Jabali" },
        { id: 1, text: "Hormiga" },
        { id: 2, text: "Tigre" }
      ],
      question: "Empareja cada animal con su nombre"
    },
    // Matching (emociones)
    {
      id: 12,
      type: "matching",
      leftItems: [
        { id: 1, image: "/src/assets/game/icons-jungla/emociones/alegre.png" },
        { id: 2, image: "/src/assets/game/icons-jungla/emociones/asustado.png" },
        { id: 3, image: "/src/assets/game/icons-jungla/emociones/furioso.png" }
      ],
      rightItems: [
        { id: 2, text: "Asustado" },
        { id: 1, text: "Alegre" },
        { id: 3, text: "Furioso" }
      ],
      question: "Relaciona cada emoción con su nombre"
    },
    // Matching (animales)
    {
      id: 13,
      type: "matching",
      leftItems: [
        { id: 1, image: "/src/assets/game/icons-jungla/animales/gato.png" },
        { id: 2, image: "/src/assets/game/icons-jungla/animales/camello.png" },
        { id: 3, image: "/src/assets/game/icons-jungla/animales/cocodrilo.png" }
      ],
      rightItems: [
        { id: 1, text: "Gato" },
        { id: 2, text: "Camello" },
        { id: 3, text: "Cocodrilo" }
      ],
      question: "Une cada animal acuático con su nombre"
    },
    // Matching (emociones)
    {
      id: 14,
      type: "matching",
      leftItems: [
        { id: 1, image: "/src/assets/game/icons-jungla/emociones/contento.png" },
        { id: 2, image: "/src/assets/game/icons-jungla/emociones/enamorado.png" },
        { id: 3, image: "/src/assets/game/icons-jungla/emociones/alegre.png" }
      ],
      rightItems: [
        { id: 1, text: "Contento" },
        { id: 3, text: "Alegre" },
        { id: 2, text: "Enamorado" }
      ],
      question: "Empareja cada emoción con su nombre"
    },

    // ========== EJERCICIOS DE MEMORYGAME (imagen-imagen) (4) ==========
    // Memory (imagen-imagen) - Animales
    {
      id: 15,
      type: "memory",
      mode: "image-image",
      pairs: [
        { 
          text: "León",
          image: "/src/assets/game/icons-jungla/animales/leon.png",
          image2: "/src/assets/game/icons-jungla/memory/leon.jpg" 
        },
        { 
          text: "Cocodrilo",
          image: "/src/assets/game/icons-jungla/animales/cocodrilo.png",
          image2: "/src/assets/game/icons-jungla/memory/cocodrilo.jpg"
        },
        { 
          text: "Caracol",
          image: "/src/assets/game/icons-jungla/animales/caracol.png",
          image2: "/src/assets/game/icons-jungla/memory/caracol.jpg"
        }
      ],
      question: "Encuentra los pares de imágenes del mismo animal"
    },
    // Memory (imagen-imagen) - Emociones
    {
      id: 16,
      type: "memory",
      mode: "image-image",
      pairs: [
        { 
          text: "Alegre",
          image: "/src/assets/game/icons-jungla/emociones/alegre.png",
          image2: "/src/assets/game/icons-jungla/memory/alegre.jpg" 
        },
        { 
          text: "Triste",
          image: "/src/assets/game/icons-jungla/emociones/triste.png",
          image2: "/src/assets/game/icons-jungla/memory/triste.jpg"
        },
        { 
          text: "Enojado",
          image: "/src/assets/game/icons-jungla/emociones/enojado.png",
          image2: "/src/assets/game/icons-jungla/memory/enojado.jpg"
        }
      ],
      question: "Empareja las imágenes que muestran la misma emoción"
    },
    // Memory (imagen-imagen) - Animales
    {
      id: 17,
      type: "memory",
      mode: "image-image",
      pairs: [
        { 
          text: "Oso",
          image: "/src/assets/game/icons-jungla/animales/oso.png",
          image2: "/src/assets/game/icons-jungla/memory/oso.jpg" 
        },
        { 
          text: "Jabali",
          image: "/src/assets/game/icons-jungla/animales/jabali.png",
          image2: "/src/assets/game/icons-jungla/memory/jabali.jpg"
        },
        { 
          text: "Gato",
          image: "/src/assets/game/icons-jungla/animales/gato.png",
          image2: "/src/assets/game/icons-jungla/memory/gato.jpg"
        }
      ],
      question: "Encuentra los pares de imágenes del mismo animal"
    },
    // Memory (imagen-imagen) - Emociones
    {
      id: 18,
      type: "memory",
      mode: "image-image",
      pairs: [
        { 
          text: "Cansado",
          image: "/src/assets/game/icons-jungla/emociones/cansado.png",
          image2: "/src/assets/game/icons-jungla/memory/cansado.jpg" 
        },
        { 
          text: "Sorprendido",
          image: "/src/assets/game/icons-jungla/emociones/sorprendido.png",
          image2: "/src/assets/game/icons-jungla/memory/sorprendido.jpg"
        },
        { 
          text: "Enamorado",
          image: "/src/assets/game/icons-jungla/emociones/enamorado.png",
          image2: "/src/assets/game/icons-jungla/memory/enamorado.jpg"
        }
      ],
      question: "Empareja las imágenes que muestran la misma emoción"
    },
  ]
};
