//Para el manejo de estos ejercicios por backend es recomiendado mantenerlo como está y crear un servicio adicional 
// para mapear esta data con el backend cuando sea necesario (Metadata).
export const exercises = {
  /// == Nivel 1 == ///
  pantalla1: [
  {
    id: 1,
    type: "multiple-choice",
    image: "/src/assets/game/icons-castillo/familia/Abuela.png",
    question: "¿Qué familiar se representa en la imagen?",
    correctAnswer: "Abuela",
    options: ["Abuela", "Madre", "Tía", "Hermana"],
    points: 1
  },
  {
    id: 2,
    type: "multiple-choice",
    image: "/src/assets/game/icons-castillo/familia/Padre.png",
    question: "¿Qué familiar se representa en la imagen?",
    correctAnswer: "Padre",
    options: ["Abuelo", "Padre", "Hermano", "Tío"],
    points: 1
  },
  {
    id: 3,
    type: "multiple-choice",
    image: "/src/assets/game/icons-castillo/familia/Hermana.png",
    question: "¿Qué familiar se representa en la imagen?",
    correctAnswer: "Hermana",
    options: ["Madre", "Hermana", "Tía", "Prima"],
    points: 1
  },
  {
    id: 4,
    type: "multiple-choice",
    image: "/src/assets/game/icons-castillo/familia/Abuelo.png",
    question: "¿Qué familiar se representa en la imagen?",
    correctAnswer: "Abuelo",
    options: ["Padre", "Tío", "Abuelo", "Hermano"],
    points: 1
  },
  {
    id: 5,
    type: "multiple-choice",
    image: "/src/assets/game/icons-castillo/familia/Madre.png",
    question: "¿Qué familiar se representa en la imagen?",
    correctAnswer: "Madre",
    options: ["Tía", "Madre", "Hermana", "Abuela"],
    points: 1
  },
  {
    id: 6,
    type: "multiple-choice",
    image: "/src/assets/game/icons-castillo/familia/Tio.png",
    question: "¿Qué familiar se representa en la imagen?",
    correctAnswer: "Tío",
    options: ["Padre", "Tío", "Abuelo", "Primo"],
    points: 1
  },
        {
        id: 7,
        type: "drag-drop",
        background: "/src/assets/game/icons-castillo/escenarios/parque.jpg",
        elements: [
          { id: "tio", image: "/src/assets/game/icons-castillo/familia/Tio.png", correctPosition: "banco" },
          { id: "primo", image: "/src/assets/game/icons-castillo/familia/Primo.png", correctPosition: "pasamanos" },
          { id: "perro", image: "/src/assets/game/icons-castillo/familia/Hija.png", correctPosition: "resbaladilla" }
        ],
        question: "Ubica a cada familiar en el parque",
        points: 2
      },
      {
        id: 8,
        type: "drag-drop",
        background: "/src/assets/game/icons-castillo/escenarios/familia.png",
        elements: [
          { id: "abuelos", image: "/src/assets/game/icons-castillo/familia/Abuelo.png", correctPosition: "extremoizq" },
          { id: "padres", image: "/src/assets/game/icons-castillo/familia/Madre.png", correctPosition: "centro" },
          { id: "hijos", image: "/src/assets/game/icons-castillo/familia/Nieta.png", correctPosition: "extremoder" }
        ],
        question: "Organiza a los familiares con su imagen",
        points: 2
      },

      // ========== MATCHING (4 ejercicios) ==========
      {
        id: 9,
        type: "matching",
        leftItems: [
          { id: "img1", image: "/src/assets/game/icons-castillo/familia/Abuelo.png" },
          { id: "img2", image: "/src/assets/game/icons-castillo/familia/Abuela.png" },
          { id: "img3", image: "/src/assets/game/icons-castillo/familia/Nieto.png" }
        ],
        rightItems: [
          { id: "text1", text: "Abuelo" },
          { id: "text3", text: "Nieto" },
          { id: "text2", text: "Abuela" }
        ],
        question: "Empareja cada imagen con su respectivo miembro familiar",
        points: 2
      },
      {
        id: 10,
        type: "matching",
        leftItems: [
          { id: "img1", image: "/src/assets/game/icons-castillo/familia/Tio.png" },
          { id: "img2", image: "/src/assets/game/icons-castillo/familia/Tia.png" },
          { id: "img3", image: "/src/assets/game/icons-castillo/familia/Primo.png" }
        ],
        rightItems: [
          { id: "text1", text: "Tio" },
          { id: "text2", text: "Tia" },
          { id: "text3", text: "Primo" }
        ],
        question: "Relaciona las imágenes con los parentescos",
        points: 2
      },
      {
        id: 11,
        type: "matching",
        leftItems: [
          { id: "img1", image: "/src/assets/game/icons-castillo/familia/Hermano.png" },
          { id: "img2", image: "/src/assets/game/icons-castillo/familia/Hermana.png" },
          { id: "img3", image: "/src/assets/game/icons-castillo/familia/Hijo.png" }
        ],
        rightItems: [
          { id: "text2", text: "Hermana" },
          { id: "text3", text: "Hijo" },
          { id: "text1", text: "Hermano" }
        ],
        question: "Une cada imagen con su relación familiar",
        points: 2
      },
      {
        id: 12,
        type: "matching",
        leftItems: [
          { id: "img1", image: "/src/assets/game/icons-castillo/familia/Padre.png" },
          { id: "img2", image: "/src/assets/game/icons-castillo/familia/Madre.png" },
          { id: "img3", image: "/src/assets/game/icons-castillo/familia/Bebe.png" }
        ],
        rightItems: [
          { id: "text3", text: "Bebe" },
          { id: "text1", text: "Padre" },
          { id: "text2", text: "Madre" }
        ],
        question: "Asocia cada imagen con su rol familiar",
        points: 2
      },
  ],
  /// == Nivel 2 == ///
  pantalla2: [
      {
        id: 13,
        type: "multiple-choice",
        image: "/src/assets/game/icons-castillo/familia/Tio.png",
        question: "¿Qué parentesco familiar representa la imagen?",
        correctAnswer: "Tío",
        options: ["Tío", "Padre", "Abuelo", "Hermana"],
        points: 1
      },
      {
        id: 14,
        type: "multiple-choice",
        image: "/src/assets/game/icons-castillo/familia/Bisnieto.png",
        question: "Identifica al familiar en la imagen",
        correctAnswer: "Bisnieto",
        options: ["Bisnieto", "Primo", "Abuelo", "Nieto"],
        points: 1
      },
      {
        id: 15,
        type: "multiple-choice",
        image: "/src/assets/game/icons-castillo/preguntas/cuando.png",
        question: "¿Que pregunta se representa la imagen?",
        correctAnswer: "cuando",
        options: ["cuantos", "cuando", "porque", "donde"],
        points: 1
      },
      {
        id: 16,
        type: "multiple-choice",
        image: "/src/assets/game/icons-castillo/preguntas/Quepaso.png",
        question: "Selecciona la pregunta correcta correspondiente a la imagen",
        correctAnswer: "Quepaso",
        options: ["Quien", "Como", "Quepaso", "Donde"],
        points: 1
      },

      // ========== MATCHING (4 ejercicios - Familia) ==========
      {
        id: 17,
        type: "matching",
        leftItems: [
          { id: "img1", image: "/src/assets/game/icons-castillo/familia/Tio.png" },
          { id: "img2", image: "/src/assets/game/icons-castillo/familia/Sobrino.png" },
          { id: "img3", image: "/src/assets/game/icons-castillo/familia/Nieta.png" }
        ],
        rightItems: [
          { id: "text1", text: "Tio" },
          { id: "text2", text: "Sobrino" },
          { id: "text3", text: "Nieta" }
        ],
        question: "Empareja cada imagen con su parentesco familiar",
        points: 2
      },
      {
        id: 18,
        type: "matching",
        leftItems: [
          { id: "img1", image: "/src/assets/game/icons-castillo/familia/Bisnieto.png" },
          { id: "img2", image: "/src/assets/game/icons-castillo/familia/Madre.png" },
          { id: "img3", image: "/src/assets/game/icons-castillo/familia/Compadre.png" }
        ],
        rightItems: [
          { id: "text2", text: "Madre" },
          { id: "text1", text: "Bisnieto" },
          { id: "text3", text: "Compadre" }
        ],
        question: "Relaciona las imágenes con los parentescos",
        points: 2
      },
      {
        id: 19,
        type: "matching",
        leftItems: [
          { id: "img1", image: "/src/assets/game/icons-castillo/preguntas/como.png" },
          { id: "img2", image: "/src/assets/game/icons-castillo/preguntas/Cual.png" },
          { id: "img3", image: "/src/assets/game/icons-castillo/preguntas/que.png" }
        ],
        rightItems: [
          { id: "text1", text: "como" },
          { id: "text3", text: "que" },
          { id: "text2", text: "Cual" }
        ],
        question: "Empareja cada imagen con su respectiva pregunta",
        points: 2
      },
      {
        id:20,
        type: "matching",
        leftItems: [
          { id: "img1", image: "/src/assets/game/icons-castillo/preguntas/porque.png" },
          { id: "img2", image: "/src/assets/game/icons-castillo/preguntas/cuando.png" },
          { id: "img3", image: "/src/assets/game/icons-castillo/preguntas/que.png" }
        ],
        rightItems: [
          { id: "text2", text: "cuando" },
          { id: "text1", text: "porque" },
          { id: "text3", text: "que" }
        ],
        question: "Relaciona las imágenes con las preguntas correctas",
        points: 2
      },

      // ========== DUAL CHOICE (6 ejercicios - Preguntas) ==========
      {
        id: 21,
        type: "dual-choice",
        context: "Pregunta usada para saber de una persona",
        correctAnswers: {
          image: "/src/assets/game/icons-castillo/preguntas/Quien.png",
          text: "¿Quién?"
        },
        options: {
          images: [
            "/src/assets/game/icons-castillo/preguntas/Quien.png",
            "/src/assets/game/icons-castillo/preguntas/Cual.png"
          ],
          texts: [
            "¿Quién?",
            "¿Cuál?"
          ]
        },
        question: "Selecciona la imagen y texto correctos",
        points: 2
      },
      {
        id: 22,
        type: "dual-choice",
        context: "Pregunta usada para saber sobre lugares",
        correctAnswers: {
          image: "/src/assets/game/icons-castillo/preguntas/Donde.png",
          text: "¿Dónde?"
        },
        options: {
          images: [
            "/src/assets/game/icons-castillo/preguntas/Cuando.png",
            "/src/assets/game/icons-castillo/preguntas/Donde.png"
          ],
          texts: [
            "¿Dónde?",
            "¿Cuándo?"
          ]
        },
        question: "Selecciona la imagen y texto correctos",
        points: 2
      },
      {
        id: 23,
        type: "dual-choice",
        context: "Pregunta usada para saber tu nombre",
        correctAnswers: {
          image: "/src/assets/game/icons-castillo/preguntas/comotellamas.png",
          text: "¿Cómo te llamas?"
        },
        options: {
          images: [
            "/src/assets/game/icons-castillo/preguntas/comotellamas.png",
            "/src/assets/game/icons-castillo/preguntas/porque.png"
          ],
          texts: [
            "¿Por qué?",
            "¿Cómo te llamas?"
          ]
        },
        question: "Selecciona la imagen y texto correctos",
        points: 2
      },
      {
        id: 24,
        type: "dual-choice",
        context: "Empareja solo el parentesco correcto",
        correctAnswers: {
          image: "/src/assets/game/icons-castillo/familia/Bebe.png",
          text: "Bebe"
        },
        options: {
          images: [
            "/src/assets/game/icons-castillo/familia/Bebe.png",
            "/src/assets/game/icons-castillo/familia/Hermano.png"
          ],
          texts: [
            "Bisnieto",
            "Bebe"
          ]
        },
        question: "Selecciona la imagen y texto correctos",
        points: 2
      },
      {
        id: 25,
        type: "dual-choice",
        context: "Empareja solo el parentesco correcto",
        correctAnswers: {
          image: "/src/assets/game/icons-castillo/familia/Padre.png",
          text: "Padre"
        },
        options: {
          images: [
            "/src/assets/game/icons-castillo/familia/Padre.png",
            "/src/assets/game/icons-castillo/familia/Tio.png"
          ],
          texts: [
            "Tia",
            "Padre"
          ]
        },
        question: "Selecciona la imagen y texto correctos",
        points: 2
      },
      {
        id: 26,
        type: "dual-choice",
        context: "Empareja el parentesco correcto",
        correctAnswers: {
          image: "/src/assets/game/icons-castillo/familia/Hermana.png",
          text: "Hermana"
        },
        options: {
          images: [
            "/src/assets/game/icons-castillo/familia/Hermana.png",
            "/src/assets/game/icons-castillo/familia/Hermano.png"
          ],
          texts: [
            "Hermana",
            "Bisnieto"
          ]
        },
        question: "Selecciona la imagen y texto correctos",
        points: 2
      }
    ],

  /// == Nivel 3 == ///
  pantalla3: [
      // ========== SINGLE IMAGE (8 ejercicios - Familia) ==========
      {
        id: 27,
        type: "single-image",
        image: "/src/assets/game/icons-castillo/familia/Abuela.png",
        question: "¿Qué familiar se representa en la imagen?",
        correctAnswer: "Abuela",
        points: 1
      },
      {
        id: 28,
        type: "single-image",
        image: "/src/assets/game/icons-castillo/familia/Hermano.png",
        question: "Identifica al familiar en la imagen",
        correctAnswer: "Hermano",
        points: 1
      },
      {
        id: 29,
        type: "single-image",
        image: "/src/assets/game/icons-castillo/familia/Cuñada.png",
        question: "¿Cómo se llama este miembro de la familia?",
        correctAnswer: "Cuñada",
      },
      {
        id: 30,
        type: "single-image",
        image: "/src/assets/game/icons-castillo/familia/Prima.png",
        question: "¿Qué parentesco familiar representa la imagen?",
        correctAnswer: "Prima",
      },
      {
        id: 31,
        type: "single-image",
        image: "/src/assets/game/icons-castillo/familia/Tio.png",
        question: "Escribe el parentesco correcto",
        correctAnswer: "Tio",
      },
      {
        id: 32,
        type: "single-image",
        image: "/src/assets/game/icons-castillo/familia/Sobrino.png",
        question: "¿Qué familiar se muestra?",
        correctAnswer: "Sobrino",
      },
      {
        id: 33,
        type: "single-image",
        image: "/src/assets/game/icons-castillo/familia/Nieta.png",
        question: "Identifica al familiar en la imagen",
        correctAnswer: "Nieta",
      },
      {
        id: 34,
        type: "single-image",
        image: "/src/assets/game/icons-castillo/familia/Compadre.png",
        question: "¿Cómo se llama este miembro de la familia?",
        correctAnswer: "Compadre",
      },

      // ========== DUAL CHOICE (3 ejercicios - Familia) ==========
      {
        id: 35,
        type: "dual-choice",
        context: "Selecciona la imagen y texto que representen al papá de tu papá",
        correctAnswers: {
          image: "/src/assets/game/icons-castillo/familia/Abuelo.png",
          text: "Abuelo"
        },
        options: {
          images: [
            "/src/assets/game/icons-castillo/familia/Abuelo.png",
            "/src/assets/game/icons-castillo/familia/Tio.png"
          ],
          texts: [
            "Abuelo",
            "Tío"
          ]
        },
        question: "Selecciona la opción correcta",
      },
      {
        id: 36,
        type: "dual-choice",
        context: "Selecciona la imagen y texto que representen a la hermana de tu mamá",
        correctAnswers: {
          image: "/src/assets/game/icons-castillo/familia/Tia.png",
          text: "Tía"
        },
        options: {
          images: [
            "/src/assets/game/icons-castillo/familia/Prima.png",
            "/src/assets/game/icons-castillo/familia/Tia.png"
          ],
          texts: [
            "Tía",
            "Prima"
          ]
        },
        question: "Selecciona la opción correcta",
        points: 2
      },
      {
        id: 37,
        type: "dual-choice",
        context: "Selecciona la imagen y texto que representen al hijo de tu hermano",
        correctAnswers: {
          image: "/src/assets/game/icons-castillo/familia/Sobrino.png",
          text: "Sobrino"
        },
        options: {
          images: [
            "/src/assets/game/icons-castillo/familia/Hijo.png",
            "/src/assets/game/icons-castillo/familia/Sobrino.png"
          ],
          texts: [
            "Sobrino",
            "Hijo"
          ]
        },
        question: "Selecciona la opción correcta",
        points: 2
      },

      // ========== IMAGE OPTIONS (3 ejercicios - Familia) ==========
      {
        id: 38,
        type: "multiple-choice",
        text: "Cuñado",
        correctAnswer: "/src/assets/game/icons-castillo/familia/Cuñado.png",
        options: [
          "/src/assets/game/icons-castillo/familia/Abuela.png",
          "/src/assets/game/icons-castillo/familia/Padre.png",
          "/src/assets/game/icons-castillo/familia/Cuñado.png",
          "/src/assets/game/icons-castillo/familia/Hermana.png"
        ],
        question: "Selecciona al familiar que coincida con el texto",
        points: 1
      },
      {
        id: 39,
        type: "multiple-choice",
        text: "Primo",
        correctAnswer: "/src/assets/game/icons-castillo/familia/Primo.png",
        options: [
          "/src/assets/game/icons-castillo/familia/Tio.png",
          "/src/assets/game/icons-castillo/familia/Hermana.png",
          "/src/assets/game/icons-castillo/familia/Primo.png",
          "/src/assets/game/icons-castillo/familia/Sobrino.png"
        ],
        question: "Selecciona la imagen que coincida con el familiar",
        points: 1
      },
      {
        id: 40,
        type: "multiple-choice",
        text: "Nieta",
        correctAnswer: "/src/assets/game/icons-castillo/familia/Nieta.png",
        options: [
          "/src/assets/game/icons-castillo/familia/Nieta.png",
          "/src/assets/game/icons-castillo/familia/Hija.png",
          "/src/assets/game/icons-castillo/familia/Sobrino.png",
          "/src/assets/game/icons-castillo/familia/Prima.png"
        ],
        question: "Selecciona la imagen correcta",
        points: 1
      }
    ],

  /// == Nivel 4 (Final) == ///
  pantalla4: [
      // ========== SINGLE IMAGE (6 ejercicios) - 3 Familia / 3 Preguntas ==========
      {
        id: 41,
        type: "single-image",
        image: "/src/assets/game/icons-castillo/familia/Bisnieto.png",
        question: "¿Qué familiar se representa en la imagen?",
        correctAnswer: "bisnieto",
        points: 1
      },
      {
        id: 42,
        type: "single-image",
        image: "/src/assets/game/icons-castillo/preguntas/porque.png",
        question: "¿Qué pregunta representa esta seña?",
        correctAnswer: "porque",
        points: 1
      },
      {
        id: 43,
        type: "single-image",
        image: "/src/assets/game/icons-castillo/familia/Yerno.png",
        question: "Identifica al familiar en la imagen",
        correctAnswer: "yerno",
        points: 1
      },
      {
        id: 44,
        type: "single-image",
        image: "/src/assets/game/icons-castillo/preguntas/comotellamas.png",
        question: "¿Qué pregunta representa esta seña?",
        correctAnswer: "¿Cómo te llamas?",
        points: 1
      },
      {
        id: 45,
        type: "single-image",
        image: "/src/assets/game/icons-castillo/familia/Hijastra.png",
        question: "Escribe el parentesco correcto",
        correctAnswer: "hijastra",
        points: 1
      },
      {
        id: 46,
        type: "single-image",
        image: "/src/assets/game/icons-castillo/preguntas/porque.png",
        question: "¿Qué pregunta se muestra en la imagen?",
        correctAnswer: "porque",
        points: 1
      },

      // ========== MULTIPLE CHOICE (6 ejercicios) - 3 con texto / 3 con imágenes ==========
      // Texto como opciones
      {
        id: 47,
        type: "multiple-choice",
        image: "/src/assets/game/icons-castillo/familia/Cuñada.png",
        question: "¿Qué relación familiar representan esta imagen?",
        correctAnswer: "Cuñada",
        options: ["Primo", "Hermana", "Tia", "Cuñada"],
        points: 1
      },
      {
        id: 48,
        type: "multiple-choice",
        image: "/src/assets/game/icons-castillo/preguntas/Donde.png",
        question: "¿Qué tipo de pregunta es esta?",
        correctAnswer: "De Ubicación",
        options: ["De Tiempo", "De Persona", "De Ubicación", "De Cantidad"],
        points: 1
      },
      {
        id: 49,
        type: "multiple-choice",
        image: "/src/assets/game/icons-castillo/familia/Hijastra.png",
        question: "Selecciona la relación familiar correcta",
        correctAnswer: "Hijastra",
        options: ["Abuelo", "Madre", "Padre", "Hijastra"],
        points: 1
      },
      // Imágenes como opciones
      {
        id: 50,
        type: "multiple-choice",
        text: "¿Qué imagen representa 'Ahijado'?",
        correctAnswer: "/src/assets/game/icons-castillo/familia/Ahijado.png",
        options: [
          "/src/assets/game/icons-castillo/familia/Tia.png",
          "/src/assets/game/icons-castillo/familia/Primo.png",
          "/src/assets/game/icons-castillo/familia/Ahijado.png",
          "/src/assets/game/icons-castillo/familia/Hermana.png"
        ],
        points: 1
      },
      {
        id: 51,
        type: "multiple-choice",
        text: "¿Qué imagen representa la pregunta '¿Cuándo?'?",
        correctAnswer: "/src/assets/game/icons-castillo/preguntas/cuando.png",
        options: [
          "/src/assets/game/icons-castillo/preguntas/como.png",
          "/src/assets/game/icons-castillo/preguntas/cuando.png",
          "/src/assets/game/icons-castillo/preguntas/Quien.png",
          "/src/assets/game/icons-castillo/preguntas/porque.png"
        ],
        points: 1
      },
      {
        id: 52,
        type: "multiple-choice",
        text: "Selecciona la imagen del familiar 'Nieto'",
        correctAnswer: "/src/assets/game/icons-castillo/familia/Nieto.png",
        options: [
          "/src/assets/game/icons-castillo/familia/Nieto.png",
          "/src/assets/game/icons-castillo/familia/Hija.png",
          "/src/assets/game/icons-castillo/familia/Tio.png",
          "/src/assets/game/icons-castillo/familia/Prima.png"
        ],
        points: 1
      },

      // ========== MATCHING (2 ejercicios) - 1 Familia / 1 Preguntas ==========
      {
        id: 53,
        type: "matching",
        leftItems: [
          { id: "img1", image: "/src/assets/game/icons-castillo/familia/Hijastra.png" },
          { id: "img2", image: "/src/assets/game/icons-castillo/familia/Hija.png" },
          { id: "img3", image: "/src/assets/game/icons-castillo/familia/Primo.png" }
        ],
        rightItems: [
          { id: "text2", text: "Hija" },
          { id: "text1", text: "Hijastra" },
          { id: "text3", text: "Primo" }
        ],
        question: "Empareja cada imagen con su parentesco familiar",
        points: 2
      },
      {
        id: 54,
        type: "matching",
        leftItems: [
          { id: "img1", image: "/src/assets/game/icons-castillo/preguntas/porque.png" },
          { id: "img2", image: "/src/assets/game/icons-castillo/preguntas/Cual.png" },
          { id: "img3", image: "/src/assets/game/icons-castillo/preguntas/como.png" }
        ],
        rightItems: [
          { id: "text1", text: "porque" },
          { id: "text3", text: "como" },
          { id: "text2", text: "Cual" }
        ],
        question: "Relaciona las señas con las preguntas correspondientes",
        points: 2
      },

      // ========== DUAL CHOICE (2 ejercicios) - 1 Familia / 1 Preguntas ==========
      {
        id: 55,
        type: "dual-choice",
        context: "Selecciona la imagen y texto que representen al esposo de una hija para una mama",
        correctAnswers: {
          image: "/src/assets/game/icons-castillo/familia/Yerno.png",
          text: "Yerno"
        },
        options: {
          images: [
            "/src/assets/game/icons-castillo/familia/Abuelo.png",
            "/src/assets/game/icons-castillo/familia/Yerno.png"
          ],
          texts: [
            "Yerno",
            "Yerna"
          ]
        },
        question: "Selecciona la opción correcta",
        points: 2
      },
      {
        id: 56,
        type: "dual-choice",
        context: "Selecciona la imagen y texto que usas para preguntar sobre el motivo de una acción",
        correctAnswers: {
          image: "/src/assets/game/icons-castillo/preguntas/porque.png",
          text: "¿Por qué?"
        },
        options: {
          images: [
            "/src/assets/game/icons-castillo/preguntas/porque.png",
            "/src/assets/game/icons-castillo/preguntas/comotellamas.png"
          ],
          texts: [
            "¿Por qué?",
            "¿Cómo?"
          ]
        },
        question: "Selecciona la opción correcta",
        points: 2
      },

      // ========== DRAG & DROP (2 ejercicios) - 1 Familia / 1 Preguntas ==========
      {
        id: 55,
        type: "drag-drop",
        background: "/src/assets/game/icons-castillo/escenarios/casa.png",
        elements: [
          { id: "hermano", image: "/src/assets/game/icons-castillo/familia/Hermano.png", correctPosition: "habitacionazul" },
          { id: "hermana", image: "/src/assets/game/icons-castillo/familia/Hermana.png", correctPosition: "habitacionrosa" },
          { id: "bebe", image: "/src/assets/game/icons-castillo/familia/Bebe.png", correctPosition: "cuna" }
        ],
        question: "Coloca a cada familiar en su habitación",
        points: 2
      },
      {
        id: 56,
        type: "drag-drop",
        background: "/src/assets/game/icons-castillo/escenarios/preguntas.png",
        elements: [
          { id: "que", image: "/src/assets/game/icons-castillo/preguntas/que.png", correctPosition: "celular" },
          { id: "quien", image: "/src/assets/game/icons-castillo/preguntas/Quien.png", correctPosition: "persona" },
          { id: "donde", image: "/src/assets/game/icons-castillo/preguntas/Donde.png", correctPosition: "plaza" }
        ],
        question: "Ubica cada pregunta según su categoría (cosa, persona, lugar)",
        points: 2
      }
    ],
};