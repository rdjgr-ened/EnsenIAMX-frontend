/**
 * BASE DE DATOS CURRICULAR INTEGRADA DE LA NUEVA ESCUELA MEXICANA (NEM)
 * FASE 2 (Preescolar: 1°, 2°, 3°)
 * FASE 3 (Primaria: 1°, 2°)
 * FASE 4 (Primaria: 3°, 4°)
 * FASE 5 (Primaria: 5°, 6°)
 * FASE 6 (Secundaria: 1°, 2°, 3°)
 * Estructura jerárquica: Nivel / Grado -> Campos Formativos -> Asignaturas / Disciplinas -> Contenidos -> PDA
 */

export interface PdaMap {
  [grado: string]: string[];
}

export interface NemContenido {
  id: string;
  contenido: string;
  pdas: PdaMap;
}

export interface NemAsignatura {
  id: string;
  nombre: string;
  grados?: string[];
  contenidos: NemContenido[];
}

export interface NemCampoFormativo {
  id: string;
  nombre: string;
  asignaturas: NemAsignatura[];
}

export interface NemFase {
  fase: string;
  nivel: "Preescolar" | "Primaria" | "Secundaria";
  grados: string[];
  camposFormativos: NemCampoFormativo[];
}

// -------------------------------------------------------------
// FASE 6: EDUCACIÓN SECUNDARIA (1°, 2°, 3°)
// -------------------------------------------------------------
export const FASE_6_SECUNDARIA: NemFase = {
  fase: "Fase 6",
  nivel: "Secundaria",
  grados: ["Primer Grado", "Segundo Grado", "Tercer Grado"],
  camposFormativos: [
    {
      id: "lenguajes",
      nombre: "Lenguajes",
      asignaturas: [
        {
          id: "ESPAÑOL",
          nombre: "Español",
          grados: ["Primer Grado", "Segundo Grado", "Tercer Grado"],
          contenidos: [
            {
              id: "esp-1",
              contenido: "La diversidad de lenguas y su uso en la comunicación familiar, escolar y comunitaria.",
              pdas: {
                "Primer Grado": [
                  "Reconoce la riqueza lingüística de México y el mundo, a partir de obras literarias procedentes de distintas culturas."
                ],
                "Segundo Grado": [
                  "Comprende las características y recursos lingüísticos de la lengua española, para usarlos y valorarlos como parte de la riqueza pluricultural de México y del mundo."
                ],
                "Tercer Grado": [
                  "Analiza y reconoce algunas variantes lingüísticas de la lengua española, para valorarla como riqueza cultural."
                ]
              }
            },
            {
              id: "esp-2",
              contenido: "La diversidad étnica, cultural y lingüística de México a favor de una sociedad intercultural.",
              pdas: {
                "Primer Grado": [
                  "Comprende las ideas centrales y secundarias de textos relacionados con la diversidad étnica, cultural y lingüística, que favorecen una sociedad intercultural, para comentarlas en forma oral y escrita."
                ],
                "Segundo Grado": [
                  "Compara y contrasta textos sobre las tensiones y conflictos en las sociedades contemporáneas y manifiesta, de manera oral o escrita, la necesidad de practicar la comunicación asertiva.",
                  "Analiza textos sobre las sociedades multiculturales y expresa la función que tiene el diálogo intercultural para la construcción democrática y la interacción en sociedad."
                ],
                "Tercer Grado": [
                  "Practica la comunicación asertiva y el diálogo intercultural en interacción con otras personas.",
                  "Comparte una propuesta creativa propia en la que valore y promueva textos en español a favor de una sociedad intercultural."
                ]
              }
            },
            {
              id: "esp-3",
              contenido: "Las lenguas como manifestación de la identidad y del sentido de pertenencia.",
              pdas: {
                "Primer Grado": [
                  "Describe en un texto cómo el lenguaje oral manifiesta las identidades personal y colectiva, para reconocer lo común y lo diferente."
                ],
                "Segundo Grado": [
                  "Comprende y redacta textos narrativos sobre la construcción de la identidad y el sentido de pertenencia, a partir del análisis de variantes del español."
                ],
                "Tercer Grado": [
                  "Elabora textos argumentativos acerca de la interculturalidad crítica, para reconocer el valor de las lenguas, a fin de promoverlas y fortalecerlas."
                ]
              }
            },
            {
              id: "esp-4",
              contenido: "El dinamismo de las lenguas y su relevancia como patrimonio cultural.",
              pdas: {
                "Primer Grado": [
                  "Identifica y expresa la relevancia de valorar las lenguas como legado de la comunidad."
                ],
                "Segundo Grado": [
                  "Reconoce cambios temporales y geográficos del español en la comunidad, el país o el mundo hispano."
                ],
                "Tercer Grado": [
                  "Analiza en textos literarios neologismos, juegos de lenguajes, caló, jerga, préstamos lingüísticos y extranjerismos como parte del dinamismo de la lengua española."
                ]
              }
            },
            {
              id: "esp-5",
              contenido: "La función creativa del español en la expresión de necesidades e intereses comunitarios.",
              pdas: {
                "Primer Grado": [
                  "Identifica una situación problemática de la comunidad, haciendo uso del pensamiento crítico, para plantear diversas formas creativas de resolverla, por ejemplo, con un cuento."
                ],
                "Segundo Grado": [
                  "Expresa, mediante un ensayo, una postura crítica sobre necesidades, intereses y problemas de la comunidad."
                ],
                "Tercer Grado": [
                  "Crea textos literarios de distintos géneros para ofrecer una propuesta de solución a problemas de la comunidad."
                ]
              }
            },
            {
              id: "esp-6",
              contenido: "Los elementos y los recursos estéticos de la lengua española en la literatura oral y escrita.",
              pdas: {
                "Primer Grado": [
                  "Reconoce los recursos estéticos en textos literarios líricos, orales y escritos, y disfruta de poemas, canciones y juegos de palabras, entre otros."
                ],
                "Segundo Grado": [
                  "Analiza las características y recursos estéticos de los textos narrativos, e interpreta y disfruta de cuentos y novelas."
                ],
                "Tercer Grado": [
                  "Usa creativa e intencionalmente las características y los recursos estéticos de textos dramáticos, para escenificar situaciones vinculadas con la comunidad."
                ]
              }
            },
            {
              id: "esp-7",
              contenido: "Textos literarios escritos en español o traducidos.",
              pdas: {
                "Primer Grado": [
                  "Reconoce el valor estético de diversos géneros literarios en textos de su elección, para elaborar comentarios y promover su lectura."
                ],
                "Segundo Grado": [
                  "Analiza diversos textos literarios de su elección para expresar un juicio estético y lo comparte en la comunidad."
                ],
                "Tercer Grado": [
                  "Elabora un ensayo acerca del tratamiento de un tema de su elección, con base en algún género literario de su preferencia, para argumentar un juicio estético sobre éste."
                ]
              }
            },
            {
              id: "esp-8",
              contenido: "Creaciones literarias tradicionales y contemporáneas.",
              pdas: {
                "Primer Grado": [
                  "Recupera y clasifica creaciones literarias de la comunidad o de un lugar de interés, como mitos, leyendas, fábulas, epopeyas, cantares de gesta, refranes, coplas, canciones, corridos y juegos de palabras, para promover de manera creativa su lectura."
                ],
                "Segundo Grado": [
                  "Valora textos literarios tradicionales y contemporáneos, como cuentos, novelas, poemas y textos dramáticos; los adapta a otros lenguajes para sensibilizar a la comunidad acerca de la relevancia social y cultural de la literatura."
                ],
                "Tercer Grado": [
                  "Crea textos narrativos, poéticos, dramáticos y guiones para audiovisuales, entre otros, a partir del uso de recursos literarios, para exponer una situación real o ficticia."
                ]
              }
            },
            {
              id: "esp-9",
              contenido: "Recursos literarios en lengua española para expresar sensaciones, emociones, sentimientos e ideas vinculados con las familias, la escuela y la comunidad.",
              pdas: {
                "Primer Grado": [
                  "Identifica recursos literarios en lengua española y los emplea en la elaboración de cartas personales y biografías, para expresar sensaciones, emociones, sentimientos e ideas que experimenta en su entorno familiar, escolar o comunitario."
                ],
                "Segundo Grado": [
                  "Analiza recursos literarios en lengua española para expresar sensaciones, emociones, sentimientos e ideas al elaborar una autobiografía con respecto a los vínculos consigo mismo y con el entorno familiar, escolar o comunitario."
                ],
                "Tercer Grado": [
                  "Recupera recursos literarios de la lengua española para crear un texto libre que describa los vínculos con el entorno familiar, escolar o comunitario."
                ]
              }
            },
            {
              id: "esp-10",
              contenido: "Los géneros periodísticos y sus recursos para comunicar sucesos significativos familiares, escolares, comunitarios y sociales.",
              pdas: {
                "Primer Grado": [
                  "Identifica sucesos significativos familiares, escolares, comunitarios y sociales que forman parte de la memoria colectiva y los comunica haciendo uso de las características de los géneros periodísticos informativos."
                ],
                "Segundo Grado": [
                  "Investiga un evento familiar, escolar o comunitario significativo de la memoria colectiva, para comunicarlo utilizando las características de los géneros periodísticos de opinión."
                ],
                "Tercer Grado": [
                  "Analiza los sucesos más significativos de la comunidad y los comunica empleando las características de los géneros periodísticos de interpretación, para preservar la memoria colectiva."
                ]
              }
            },
            {
              id: "esp-11",
              contenido: "Comunicación asertiva y dialógica para erradicar expresiones de violencia.",
              pdas: {
                "Primer Grado": [
                  "Realiza, de manera colectiva, una propuesta oral o por escrito, para promover acciones que posibiliten erradicar la violencia en las familias y la escuela.",
                  "Elabora solicitudes de gestión de espacios y recursos para dar a conocer la propuesta."
                ],
                "Segundo Grado": [
                  "Participa en un debate acerca de algunas expresiones de violencia -como la de género y la sexual- para argumentar una postura de rechazo.",
                  "Elabora invitaciones a expertos y redacta oficios de gestión para obtener recursos y espacios donde tendrá lugar el encuentro."
                ],
                "Tercer Grado": [
                  "Discute de forma colectiva y diseña una estrategia sobre la importancia de sensibilizar a la comunidad acerca de la violencia.",
                  "Redacta un texto informativo acerca de la importancia de erradicar la violencia y realiza de manera formal las gestiones necesarias para compartirlo con la comunidad."
                ]
              }
            },
            {
              id: "esp-12",
              contenido: "Mensajes para promover una vida saludable, expresados en medios comunitarios o masivos de comunicación.",
              pdas: {
                "Primer Grado": [
                  "Identifica las características y recursos de mensajes que promueven una vida saludable a través de los diferentes medios comunitarios o masivos de comunicación impresos o audiovisuales."
                ],
                "Segundo Grado": [
                  "Elabora un mensaje impreso empleando imágenes, textos, colores y otros recursos gráficos, para favorecer una vida saludable, y lo comparte en la comunidad."
                ],
                "Tercer Grado": [
                  "Construye narrativas acerca de una vida saludable, haciendo uso del lenguaje audiovisual y las transmite por medios comunitarios o masivos de comunicación."
                ]
              }
            },
            {
              id: "esp-13",
              contenido: "Textos de divulgación científica.",
              pdas: {
                "Primer Grado": [
                  "Identifica las características del texto de divulgación científica y elabora uno."
                ],
                "Segundo Grado": [
                  "Analiza las características del texto de divulgación científica, para elaborar y dar a conocer diversos textos científicos orales o escritos que traten sobre un tema de interés personal o colectivo."
                ],
                "Tercer Grado": [
                  "Elabora una propuesta de divulgación científica, con la participación de la comunidad escolar, para fomentar el conocimiento de las ciencias."
                ]
              }
            },
            {
              id: "esp-14",
              contenido: "Manifestaciones culturales y artísticas que favorecen una sociedad incluyente.",
              pdas: {
                "Primer Grado": [
                  "Reconoce manifestaciones culturales y artísticas creadas o ejecutadas por personas con alguna discapacidad, para distinguir sus valores estéticos y creativos y las comparte en forma oral o escrita con la comunidad."
                ],
                "Segundo Grado": [
                  "Elabora un texto oral o escrito acerca de las manifestaciones culturales y artísticas que promuevan una sociedad incluyente."
                ],
                "Tercer Grado": [
                  "Crea un texto literario que aborde un tema que promueva una sociedad incluyente."
                ]
              }
            }
          ]
        },
        {
          id: "INGLES",
          nombre: "Inglés",
          grados: ["Primer Grado", "Segundo Grado", "Tercer Grado"],
          contenidos: [
            {
              id: "ing-1",
              contenido: "La diversidad lingüística y sus formas de expresión en México y el mundo.",
              pdas: {
                "Primer Grado": [
                  "Hace uso del alfabeto, los números y las expresiones básicas en inglés, para nombrar y recuperar datos factuales y características básicas de lenguas reconocidas en México y el mundo."
                ],
                "Segundo Grado": [
                  "Comprende textos narrativos y biográficos en inglés sobre la vida cotidiana, formas de interacción y comportamiento de hablantes de diversas lenguas de México y el mundo en el pasado, y lo expresa en organizadores gráficos, infografías u otras formas de presentación escrita y oral."
                ],
                "Tercer Grado": [
                  "Utiliza diversos tipos de texto y medios de comunicación para expresar y difundir en inglés prácticas culturales y lingüísticas diversas de sociedades en México y el mundo."
                ]
              }
            },
            {
              id: "ing-2",
              contenido: "La identidad y cultura de pueblos de habla inglesa.",
              pdas: {
                "Primer Grado": [
                  "Recupera información para llevar a cabo presentaciones en inglés, orales y escritas, que describan rasgos étnicos, culturales e identitarios de hablantes de lengua inglesa."
                ],
                "Segundo Grado": [
                  "Elabora fichas informativas en inglés sobre rasgos identitarios de pueblos de habla inglesa (acento, grafía, vestimenta, comida, tradiciones, costumbres, entre otros)."
                ],
                "Tercer Grado": [
                  "Construye una propuesta de comunicación en inglés, oral y escrita, donde contraste, valore y promueva rasgos de una sociedad intercultural identificados en pueblos de habla inglesa."
                ]
              }
            },
            {
              id: "ing-3",
              contenido: "Las manifestaciones culturales, lingüísticas y artísticas en inglés a favor de la interculturalidad.",
              pdas: {
                "Primer Grado": [
                  "Elabora un cómic o manga en inglés sobre situaciones donde se rescata la importancia de la interculturalidad."
                ],
                "Segundo Grado": [
                  "Interpreta juegos de roles en inglés sobre situaciones que favorezcan la comunicación asertiva."
                ],
                "Tercer Grado": [
                  "Elabora guiones en inglés que aborden situaciones de conflicto resueltas mediante la comunicación asertiva e intercultural, y los dramatiza."
                ]
              }
            },
            {
              id: "ing-4",
              contenido: "El uso del inglés para expresar necesidades, intereses y problemas de la comunidad.",
              pdas: {
                "Primer Grado": [
                  "Investiga en textos en inglés soluciones implementadas sobre problemas de una comunidad, e informa de manera oral o escrita sus hallazgos."
                ],
                "Segundo Grado": [
                  "Elabora escritos argumentativos en inglés sobre acciones colectivas que posibiliten la solución de problemas de una comunidad."
                ],
                "Tercer Grado": [
                  "Organiza una campaña en inglés sobre soluciones a problemas de la comunidad."
                ]
              }
            },
            {
              id: "ing-5",
              contenido: "Elementos y recursos estéticos del inglés.",
              pdas: {
                "Primer Grado": [
                  "Recupera de distintos tipos de textos literarios en inglés, expresiones, elementos y recursos estéticos y elabora un glosario."
                ],
                "Segundo Grado": [
                  "Identifica y explica el uso de expresiones, elementos y recursos estéticos en manifestaciones culturales y artísticas de países de habla inglesa."
                ],
                "Tercer Grado": [
                  "Emplea algunas figuras retóricas, elementos y recursos estéticos, para construir un texto literario corto, oral y escrito, para difundirlo en la comunidad escolar."
                ]
              }
            },
            {
              id: "ing-6",
              contenido: "Comunicación asertiva y dialógica en inglés, para sensibilizar sobre la erradicación de la violencia en las familias y la escuela.",
              pdas: {
                "Primer Grado": [
                  "Recupera de distintos textos en inglés, expresiones de violencia presentes en las familias y las escuelas. Reflexiona y comunica de forma oral y escrita una postura de rechazo a la violencia, mediante la comunicación asertiva y dialógica."
                ],
                "Segundo Grado": [
                  "Participa en un panel o debate en inglés, sobre la importancia de la comunicación asertiva y dialógica, a fin de consensuar propuestas de acción para sensibilizar sobre la erradicación de la violencia en las familias y la escuela."
                ],
                "Tercer Grado": [
                  "Diseña y difunde en inglés propuestas escritas para sensibilizar a la comunidad acerca de la importancia de erradicar la violencia."
                ]
              }
            }
          ]
        },
        {
          id: "ARTES",
          nombre: "Artes",
          grados: ["Primer Grado", "Segundo Grado", "Tercer Grado"],
          contenidos: [
            {
              id: "art-1",
              contenido: "Diversidad de lenguajes artísticos en la riqueza pluricultural de México y del mundo.",
              pdas: {
                "Primer Grado": [
                  "Reconoce en manifestaciones artísticas de México y del mundo el uso del cuerpo, del espacio y del tiempo, para valorarlas como parte de la riqueza pluricultural."
                ],
                "Segundo Grado": [
                  "Explora la creación de secuencias y patrones al identificar el uso de formas, colores, movimientos y sonidos, entre otros elementos de las artes, en manifestaciones artísticas de México y del mundo, para apreciar la riqueza pluricultural."
                ],
                "Tercer Grado": [
                  "Experimenta con características de algunos estilos de los lenguajes artísticos, para representar la riqueza pluricultural de México y del mundo."
                ]
              }
            },
            {
              id: "art-2",
              contenido: "Manifestaciones culturales y artísticas que conforman la diversidad étnica, cultural y lingüística.",
              pdas: {
                "Primer Grado": [
                  "Identifica diferentes manifestaciones culturales y artísticas de pueblos indígenas y afrodescendientes de México y del mundo, para interpretar significados que permitan fomentar una sociedad intercultural."
                ],
                "Segundo Grado": [
                  "Compara el uso de formas, colores, movimientos y sonidos, entre otros elementos de las artes, en manifestaciones culturales y artísticas de diferentes épocas y orígenes culturales, para fomentar una sociedad intercultural."
                ],
                "Tercer Grado": [
                  "Presenta una propuesta creativa, usando intencionalmente el cuerpo, espacio y tiempo, entre otros elementos de las artes, para valorar y promover la diversidad étnica, cultural y lingüística, a favor de una sociedad intercultural."
                ]
              }
            },
            {
              id: "art-3",
              contenido: "Identidad y sentido de pertenencia en manifestaciones artísticas.",
              pdas: {
                "Primer Grado": [
                  "Aprecia la intención expresiva en diversas manifestaciones artísticas, para la construcción crítica de las identidades personal y colectiva."
                ],
                "Segundo Grado": [
                  "Reflexiona sobre la manera en que las artes fortalecen la identidad, dan sentido de pertenencia y resultan esenciales para favorecer la interculturalidad crítica."
                ],
                "Tercer Grado": [
                  "Crea propuestas artísticas utilizando intencionalmente características de algunos estilos artísticos, a favor de la interculturalidad crítica, para fortalecer las identidades personal y colectiva."
                ]
              }
            },
            {
              id: "art-4",
              contenido: "Los lenguajes artísticos en la expresión de problemas de la comunidad.",
              pdas: {
                "Primer Grado": [
                  "Usa intencionalmente formas, colores, movimientos y sonidos, entre otros elementos de las artes, para recrear una situación problemática de su contexto y manifestar una postura crítica."
                ],
                "Segundo Grado": [
                  "Investiga propuestas artísticas colectivas de entornos rurales y urbanos a favor de la inclusión, para presentar una postura crítica sobre un problema de la comunidad."
                ],
                "Tercer Grado": [
                  "Experimenta con técnicas artísticas y elige una que implemente en un proyecto escolar creativo, para imaginar y proponer posibles soluciones a problemas de la comunidad."
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "SABERES",
      nombre: "Saberes y Pensamiento Científico",
      asignaturas: [
        {
          id: "MATEM",
          nombre: "Matemáticas",
          grados: ["Primer Grado", "Segundo Grado", "Tercer Grado"],
          contenidos: [
            {
              id: "mat-1",
              contenido: "Expresión de fracciones como decimales y de decimales como fracciones.",
              pdas: {
                "Primer Grado": [
                  "Usa diversas estrategias al convertir números fraccionarios a decimales y viceversa."
                ],
                "Segundo Grado": [
                  "Usa diversas estrategias al convertir números fraccionarios a decimales y viceversa en problemas de comparación y equivalencia."
                ],
                "Tercer Grado": [
                  "Aplica conversiones entre fracciones y decimales en el planteamiento y resolución de ecuaciones y expresiones algebraicas."
                ]
              }
            },
            {
              id: "mat-2",
              contenido: "Extensión de los números a positivos y negativos y su orden.",
              pdas: {
                "Primer Grado": [
                  "Reconoce la necesidad de los números negativos a partir de usar cantidades que tienen al cero como referencia.",
                  "Compara y ordena números con signo (enteros, fracciones y decimales) en la recta numérica y analiza en qué casos se cumple la propiedad de densidad."
                ],
                "Segundo Grado": [
                  "Resuelve operaciones con números enteros, fracciones y decimales positivos y negativos."
                ],
                "Tercer Grado": [
                  "Modela y resuelve problemas complejos que involucran números reales y operaciones con signo."
                ]
              }
            },
            {
              id: "mat-3",
              contenido: "Extensión del significado de las operaciones y sus relaciones inversas.",
              pdas: {
                "Primer Grado": [
                  "Reconoce el significado de las cuatro operaciones básicas y sus relaciones inversas al resolver problemas que impliquen el uso de números con signo.",
                  "Comprueba y argumenta si cada una de estas operaciones cumple las propiedades: conmutativa, asociativa y distributiva.",
                  "Identifica y aplica la jerarquía de operaciones y símbolos de agrupación al realizar cálculos."
                ],
                "Segundo Grado": [
                  "Usa criterios de divisibilidad y números primos al resolver problemas que implican calcular el máximo común divisor y el mínimo común múltiplo.",
                  "Calcula potencias con exponente entero y la raíz cuadrada. Usa la notación científica.",
                  "Usa la notación científica al realizar cálculos con cantidades muy grandes o muy pequeñas."
                ],
                "Tercer Grado": [
                  "Aplica relaciones inversas y propiedades de las operaciones en problemas algebraicos y geométricos avanzados."
                ]
              }
            },
            {
              id: "mat-4",
              contenido: "Regularidades y Patrones.",
              pdas: {
                "Primer Grado": [
                  "Representa algebraicamente una sucesión con progresión aritmética de figuras y números."
                ],
                "Segundo Grado": [
                  "Representa algebraicamente una sucesión con progresión cuadrática de figuras y números."
                ],
                "Tercer Grado": [
                  "Generaliza patrones y regularidades en fenómenos matemáticos y de la naturaleza utilizando funciones."
                ]
              }
            },
            {
              id: "mat-5",
              contenido: "Introducción al álgebra.",
              pdas: {
                "Primer Grado": [
                  "Interpreta y plantea diversas situaciones del lenguaje común al lenguaje algebraico y viceversa.",
                  "Representa algebraicamente perímetros de figuras."
                ],
                "Segundo Grado": [
                  "Representa algebraicamente áreas que generan una expresión cuadrática.",
                  "Identifica y usa las propiedades de los exponentes al resolver distintas operaciones algebraicas."
                ],
                "Tercer Grado": [
                  "Representa algebraicamente áreas y volúmenes de cuerpos geométricos y calcula el valor de una variable en función de las otras."
                ]
              }
            },
            {
              id: "mat-6",
              contenido: "Ecuaciones lineales y cuadráticas.",
              pdas: {
                "Primer Grado": [
                  "Resuelve ecuaciones de la forma Ax=B, Ax+B=C, Ax+B=Cx+D con el uso de las propiedades de la igualdad.",
                  "Modela y resuelve problemas cuyo planteamiento es una ecuación lineal.",
                  "Resuelve problemas de porcentajes en diversas situaciones."
                ],
                "Segundo Grado": [
                  "Resuelve desigualdades con expresiones algebraicas.",
                  "Modela y soluciona sistemas de dos ecuaciones lineales con dos incógnitas por algún método para dar respuesta a un problema."
                ],
                "Tercer Grado": [
                  "Resuelve ecuaciones de la forma Ax²+Bx+C=0 por factorización y fórmula general.",
                  "Resuelve problemas cuyo planteamiento es una ecuación cuadrática."
                ]
              }
            },
            {
              id: "mat-7",
              contenido: "Funciones.",
              pdas: {
                "Primer Grado": [
                  "Relaciona e interpreta relaciones proporcional y no proporcional a partir de su representación tabular, gráfica y con diagramas.",
                  "Modela y resuelve diversas situaciones a través de ecuaciones proporcionales con constante positiva y negativa."
                ],
                "Segundo Grado": [
                  "Relaciona e interpreta la proporcionalidad inversa de dos magnitudes o cantidades, además usa una tabla, gráfica o representación algebraica en diversos contextos."
                ],
                "Tercer Grado": [
                  "Relaciona e interpreta la variación de dos cantidades a partir de su representación tabular, gráfica y algebraica.",
                  "Explora diversos procedimientos para resolver problemas de reparto proporcional."
                ]
              }
            },
            {
              id: "mat-8",
              contenido: "Construcción y propiedades de las figuras planas y cuerpos.",
              pdas: {
                "Primer Grado": [
                  "Utiliza la regla y el compás para trazar: punto medio, mediatriz de un segmento, segmentos y ángulos congruentes, bisectriz de un ángulo, rectas perpendiculares y rectas paralelas.",
                  "Identifica y traza las rectas notables en triángulos y cuadriláteros.",
                  "Construye y clasifica triángulos y cuadriláteros a partir del análisis de distinta información."
                ],
                "Segundo Grado": [
                  "Construye con regla y compás polígonos regulares con distinta información.",
                  "Identifica y usa las relaciones entre figuras en la construcción de teselados."
                ],
                "Tercer Grado": [
                  "Aplica las propiedades de la congruencia y semejanza de triángulos al construir y resolver problemas.",
                  "Reconoce las propiedades de los sólidos.",
                  "Explora la generación de sólidos de revolución a partir de figuras planas.",
                  "Explora y construye desarrollos planos de diferentes figuras tridimensionales, cilindros, pirámides y conos."
                ]
              }
            },
            {
              id: "mat-9",
              contenido: "Medición y cálculo en diferentes contextos.",
              pdas: {
                "Primer Grado": [
                  "Introduce la idea de distancia entre dos puntos como la longitud del segmento que los une.",
                  "Encuentra la distancia de un punto a una recta y la distancia entre dos rectas paralelas.",
                  "Explora la desigualdad del triángulo.",
                  "Obtiene y aplica fórmulas o usa otras estrategias para calcular el perímetro y el área de polígonos regulares e irregulares y del círculo."
                ],
                "Segundo Grado": [
                  "Resuelve problemas que implican conversiones en múltiplos y submúltiplos del metro, litro, kilogramo y de unidades del sistema inglés (yarda, pulgada, galón, onza y libra).",
                  "Utiliza estrategias diversas para determinar el perímetro y el área de figuras compuestas."
                ],
                "Tercer Grado": [
                  "Usa diferentes estrategias para calcular el volumen de prismas, pirámides y cilindros.",
                  "Formula, justifica y usa el teorema de Pitágoras al resolver problemas.",
                  "Resuelve problemas utilizando las razones trigonométricas seno, coseno y tangente."
                ]
              }
            },
            {
              id: "mat-10",
              contenido: "Azar y probabilidad.",
              pdas: {
                "Primer Grado": [
                  "Compara cualitativamente dos o más eventos a partir de sus resultados posibles, usa relaciones como: 'es más probable que...', 'es menos probable que...'.",
                  "Identifica eventos en los que interviene el azar, determina el espacio muestral y experimenta.",
                  "Identifica diversos procedimientos de conteo y resuelve problemas."
                ],
                "Segundo Grado": [
                  "Realiza experimentos aleatorios y registra los resultados en una tabla de frecuencia como la transición de la probabilidad frecuencial a la teórica.",
                  "Analiza las características de la medida de la probabilidad y su equivalencia y representación en números decimales, fraccionarios y porcentajes."
                ],
                "Tercer Grado": [
                  "Resuelve problemas donde se analicen las características de eventos complementarios y eventos mutuamente excluyentes e independientes.",
                  "Resuelve problemas donde se calcule la probabilidad de ocurrencia de dos eventos mutuamente excluyentes y de eventos complementarios (regla de la suma).",
                  "Resuelve problemas donde se calcule la probabilidad de ocurrencia de dos eventos independientes (regla del producto)."
                ]
              }
            }
          ]
        },
        {
          id: "BIOLOGIA",
          nombre: "Biología",
          grados: ["Primer Grado"],
          contenidos: [
            {
              id: "bio-1",
              contenido: "Funcionamiento del cuerpo humano coordinado por los sistemas nervioso y endocrino.",
              pdas: {
                "Primer Grado": [
                  "Explica la participación de los sistemas nervioso y endocrino en la coordinación de las funciones del cuerpo humano; reconoce el papel general de las hormonas y sus efectos en la maduración sexual y en la reproducción.",
                  "Explica los efectos del consumo de sustancias adictivas en el sistema nervioso y en el funcionamiento integral del cuerpo humano; argumenta la importancia de evitar su consumo a partir del análisis de sus implicaciones en la salud, la sexualidad, la economía y la sociedad."
                ]
              }
            },
            {
              id: "bio-2",
              contenido: "Salud sexual y reproductiva: prevención de infecciones de transmisión sexual y del embarazo en adolescentes.",
              pdas: {
                "Primer Grado": [
                  "Compara las maneras en que la cultura influye en el concepto de sexualidad; reconoce que todas las culturas tienen maneras distintas de comprender el género, la sexualidad y la reproducción; y reflexiona acerca de que el inicio de la actividad sexual debe ser de manera consensuada.",
                  "Cuestiona creencias, estereotipos y costumbres que impactan negativamente la salud sexual y reproductiva de niñas y mujeres; reconoce la importancia de la igualdad de género y la responsabilidad compartida del hombre y la mujer en la prevención del embarazo en la adolescencia.",
                  "Compara la efectividad de los métodos anticonceptivos como apoyo para planificar el embarazo desde la perspectiva del proyecto de vida; valora la efectividad del condón por su doble protección."
                ]
              }
            },
            {
              id: "bio-3",
              contenido: "Prevención de enfermedades relacionadas con la alimentación y el consumo de alimentos ultraprocesados.",
              pdas: {
                "Primer Grado": [
                  "Identifica causas de la obesidad y la diabetes relacionadas con la dieta y el sedentarismo, a fin de formular su proyecto de vida saludable; incluye factores protectores y propone acciones para reducir factores de riesgo.",
                  "Formula hipótesis acerca de las consecuencias de carencia o exceso de nutrimentos en la dieta; interpreta datos que muestran la correlación entre la incidencia de enfermedades como la caries e hipertensión y el consumo de exceso de sal, azúcar y grasas saturadas."
                ]
              }
            },
            {
              id: "bio-4",
              contenido: "La biodiversidad como expresión del cambio de los seres vivos en el tiempo.",
              pdas: {
                "Primer Grado": [
                  "Analiza información acerca del estado de la biodiversidad local a partir de fuentes directas, orales, escritas, audiovisuales o Internet, expone razones sobre su importancia cultural, biológica, estética y ética; propone acciones para su cuidado.",
                  "Indaga las principales aportaciones de Darwin y Wallace, las identifica como una de las explicaciones más fundamentadas acerca del origen de la biodiversidad y reflexiona acerca de cómo han cambiado."
                ]
              }
            },
            {
              id: "bio-5",
              contenido: "El calentamiento global como una consecuencia de la alteración de los ciclos biogeoquímicos en los ecosistemas.",
              pdas: {
                "Primer Grado": [
                  "Representa la transferencia de materia y energía entre los organismos de un ecosistema mediante redes y pirámides tróficas; elabora explicaciones, inferencias y predicciones consistentes.",
                  "Identifica interacciones de competencia e interdependencia en el ecosistema local y explica cómo regulan el funcionamiento y mantenimiento en la dinámica general del ecosistema.",
                  "Analiza las prácticas de consumo que han alterado los ciclos biogeoquímicos del carbono y el nitrógeno, sus efectos asociados al calentamiento global y sus impactos en el medio ambiente y la salud."
                ]
              }
            },
            {
              id: "bio-6",
              contenido: "Las vacunas: su relevancia en el control de algunas enfermedades infecciosas.",
              pdas: {
                "Primer Grado": [
                  "Describe las características generales de las bacterias y los virus; formula hipótesis en torno al por qué de la rápida propagación de las enfermedades infecciosas que causan, y las contrasta con evidencias con sustento científico.",
                  "Valora la importancia y la necesidad de proteger la salud con el uso de las vacunas para el control de algunas enfermedades infecciosas; evalúa sus riesgos y beneficios sociales y económicos."
                ]
              }
            }
          ]
        },
        {
          id: "FISICA",
          nombre: "Física",
          grados: ["Segundo Grado"],
          contenidos: [
            {
              id: "fis-1",
              contenido: "El pensamiento científico, una forma de plantear y solucionar problemas y su incidencia en la transformación de la sociedad.",
              pdas: {
                "Segundo Grado": [
                  "Describe problemas comunes de la vida cotidiana explicando cómo se procede para buscarles solución; conoce y caracteriza el pensamiento científico para plantearse y resolver problemas en la escuela y su cotidianeidad.",
                  "Indaga en diferentes fuentes de consulta las aportaciones de mujeres y hombres en el desarrollo de la Física y su contribución al conocimiento científico y tecnológico."
                ]
              }
            },
            {
              id: "fis-2",
              contenido: "Unidades y medidas utilizados en Física.",
              pdas: {
                "Segundo Grado": [
                  "Identifica las unidades de medición que se ocupan en su entorno escolar, familiar y en su comunidad.",
                  "Identifica cuáles son, cómo se definen y cuál es la simbología de las unidades básicas y derivadas del Sistema Internacional de Unidades.",
                  "Conoce los instrumentos de medición y realiza conversiones con los múltiplos y submúltiplos al referirse a una magnitud."
                ]
              }
            },
            {
              id: "fis-3",
              contenido: "Estructura, propiedades y características de la materia.",
              pdas: {
                "Segundo Grado": [
                  "Indaga sobre los saberes y prácticas del uso de materiales y sus propiedades y características para construcción, vestimenta y artefactos de uso común.",
                  "Relaciona e interpreta las teorías sobre estructura de la materia, a partir de los modelos atómicos y de partículas y los fenómenos que les dieron origen."
                ]
              }
            },
            {
              id: "fis-4",
              contenido: "Interacciones en fenómenos relacionados con la fuerza y el movimiento.",
              pdas: {
                "Segundo Grado": [
                  "Experimenta e interpreta las interacciones de la fuerza y el movimiento relacionados con las Leyes de Newton para explicar actividades cotidianas.",
                  "Identifica los elementos y los diferentes tipos de movimiento relacionados con la velocidad y aceleración y realiza experimentos sencillos.",
                  "Identifica y describe la presencia de fuerzas en interacciones cotidianas (fricción y fuerzas en equilibrio)."
                ]
              }
            },
            {
              id: "fis-5",
              contenido: "Principios de Pascal y de Arquímedes.",
              pdas: {
                "Segundo Grado": [
                  "Experimenta e interpreta las interacciones de la fuerza y el movimiento relacionados con los principios de Pascal y de Arquímedes, para explicar actividades cotidianas.",
                  "Identifica algunos dispositivos de uso cotidiano en los cuales se aplica el Principio de Pascal y de Arquímedes; colabora en equipo para resolver problemas de fluidos."
                ]
              }
            },
            {
              id: "fis-6",
              contenido: "Saberes y prácticas para el aprovechamiento de energías y la sustentabilidad.",
              pdas: {
                "Segundo Grado": [
                  "Analiza las características de la energía mecánica (cinética y potencial) y describe casos donde se conserva.",
                  "Relaciona al calor como una forma de energía y describe los motores térmicos, los efectos del calor disipado y los gases expelidos.",
                  "Identifica saberes, prácticas y artefactos sobre el aprovechamiento de las diversas formas de energía renovables y no renovables."
                ]
              }
            },
            {
              id: "fis-7",
              contenido: "Interacciones de la electricidad y el magnetismo.",
              pdas: {
                "Segundo Grado": [
                  "Experimenta e interpreta algunas manifestaciones y aplicaciones de la electricidad e identifica los cuidados que requiere su uso.",
                  "Relaciona e interpreta fenómenos comunes del magnetismo y experimenta con la interacción entre imanes.",
                  "Explica el funcionamiento de aparatos tecnológicos de comunicación, a partir de las ondas electromagnéticas."
                ]
              }
            },
            {
              id: "fis-8",
              contenido: "Fenómenos, procesos y factores asociados al cambio climático.",
              pdas: {
                "Segundo Grado": [
                  "Formula hipótesis que relacionan la actividad humana con el aumento de temperatura en el planeta y la emisión de gases de efecto invernadero; diferencia entre calor, radiación y temperatura.",
                  "Indaga sobre fenómenos meteorológicos extremos y propone medidas de mitigación y adaptación viables para su escuela y comunidad."
                ]
              }
            }
          ]
        },
        {
          id: "QUIMICA",
          nombre: "Química",
          grados: ["Tercer Grado"],
          contenidos: [
            {
              id: "qui-1",
              contenido: "Los hitos que contribuyeron al avance del conocimiento científico y tecnológico en el ámbito nacional e internacional.",
              pdas: {
                "Tercer Grado": [
                  "Reconoce los aportes de saberes de diferentes pueblos y culturas en la satisfacción de necesidades humanas en diversos ámbitos (medicina, construcción, artesanías, textiles y alimentos).",
                  "Indaga en fuentes de consulta orales y escritas las aportaciones de mujeres y hombres en el desarrollo del conocimiento científico y tecnológico."
                ]
              }
            },
            {
              id: "qui-2",
              contenido: "Las propiedades extensivas e intensivas, como una forma de identificar sustancias y materiales de uso común.",
              pdas: {
                "Tercer Grado": [
                  "Formula hipótesis para diferenciar propiedades extensivas e intensivas mediante actividades experimentales y elabora conclusiones.",
                  "Reconoce la importancia del uso de instrumentos de medición para identificar y diferenciar propiedades de sustancias y materiales cotidianos."
                ]
              }
            },
            {
              id: "qui-3",
              contenido: "Composición de las mezclas y su clasificación en homogéneas y heterogéneas, así como métodos de separación.",
              pdas: {
                "Tercer Grado": [
                  "Describe los componentes de una mezcla (soluto-disolvente; fase dispersa y fase dispersante) mediante actividades experimentales.",
                  "Analiza la concentración de sustancias de una mezcla expresadas en porcentajes en masa y en volumen en productos de uso cotidiano.",
                  "Deduce métodos para separar mezclas (evaporación, decantación, filtración, extracción, sublimación, cromatografía y cristalización)."
                ]
              }
            },
            {
              id: "qui-4",
              contenido: "La Tabla periódica: criterios de clasificación de los elementos químicos y sus propiedades.",
              pdas: {
                "Tercer Grado": [
                  "Reconoce la presencia y predominancia de algunos elementos químicos en los seres vivos, la Tierra y el Universo (metales, no metales y semimetales).",
                  "Interpreta la información de la Tabla periódica ordenada por número atómico, grupos y periodos.",
                  "Construye modelos atómicos de Bohr y representa los electrones de valencia por medio de diagramas de Lewis."
                ]
              }
            },
            {
              id: "qui-5",
              contenido: "Los compuestos iónicos y moleculares: propiedades y estructura, así como su importancia en diferentes ámbitos.",
              pdas: {
                "Tercer Grado": [
                  "Experimenta y diferencia los compuestos iónicos y moleculares, a partir de las propiedades identificadas en actividades experimentales.",
                  "Valora el aprovechamiento de propiedades de compuestos iónicos y moleculares en el cuerpo humano y en diferentes ámbitos."
                ]
              }
            },
            {
              id: "qui-6",
              contenido: "Las reacciones químicas: manifestaciones, propiedades e interpretación de las ecuaciones químicas.",
              pdas: {
                "Tercer Grado": [
                  "Reconoce distintas reacciones químicas en su entorno a partir de sus manifestaciones y cambio de propiedades de reactivos a productos.",
                  "Representa reacciones mediante modelos tridimensionales y ecuaciones químicas con base en la Ley de conservación de la materia.",
                  "Explica y representa intercambios de materia y energía -endotérmicas y exotérmicas- de reactivos a productos."
                ]
              }
            },
            {
              id: "qui-7",
              contenido: "Propiedades de ácidos y bases, reacciones de neutralización y modelo de Arrhenius.",
              pdas: {
                "Tercer Grado": [
                  "Distingue las propiedades de ácidos y bases en su entorno a partir de indicadores e interpreta la escala de acidez y basicidad.",
                  "Deduce los productos de reacciones de neutralización sencillas con base en el modelo de Arrhenius mediante actividades experimentales."
                ]
              }
            },
            {
              id: "qui-8",
              contenido: "Las reacciones de óxido-reducción (redox): identificación del número de oxidación y de agentes oxidantes y reductores.",
              pdas: {
                "Tercer Grado": [
                  "Identifica reacciones de redox en su entorno y comprende su importancia en diferentes ámbitos.",
                  "Analiza la transferencia de electrones entre reactivos y productos en reacciones redox con base en el cambio del número de oxidación."
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "ETICA",
      nombre: "Ética, Naturaleza y Sociedades",
      asignaturas: [
        {
          id: "GEO",
          nombre: "Geografía",
          grados: ["Primer Grado"],
          contenidos: [
            {
              id: "geo-1",
              contenido: "El espacio geográfico como una construcción social y colectiva.",
              pdas: {
                "Primer Grado": [
                  "Comprende que el espacio geográfico se conforma de interrelaciones sociedad-naturaleza.",
                  "Reconoce que el patrimonio biocultural es resultado de la relación entre las formas de organización económico-social, la cultura y la biodiversidad a través del tiempo.",
                  "Distingue la distribución de las principales regiones bioculturales en México y el mundo."
                ]
              }
            },
            {
              id: "geo-2",
              contenido: "Las categorías de análisis espacial y representaciones del espacio geográfico.",
              pdas: {
                "Primer Grado": [
                  "Reconoce saberes ancestrales acerca del espacio geográfico, formas de ubicación y representaciones en México y el mundo.",
                  "Comprende las categorías de análisis espacial para explicar las características del espacio geográfico: lugar, región, paisaje y territorio.",
                  "Utiliza los conceptos de localización, distribución, diversidad, temporalidad y cambio e interacción para el estudio del espacio geográfico."
                ]
              }
            },
            {
              id: "geo-3",
              contenido: "La distribución y dinámica de las aguas continentales y oceánicas en la Tierra.",
              pdas: {
                "Primer Grado": [
                  "Analiza la distribución de las aguas continentales en México y el mundo: principales ríos, lagos, aguas subterráneas, llanuras inundables y humedales.",
                  "Reconoce la importancia de las cuencas hidrográficas como un sistema para el desarrollo económico en México, así como para la conservación del agua y la tierra.",
                  "Valora el mar territorial, la zona económica exclusiva de México y sus litorales, fortaleciendo la conciencia marítima."
                ]
              }
            },
            {
              id: "geo-4",
              contenido: "La relación de las placas tectónicas con el relieve, la sismicidad y el vulcanismo.",
              pdas: {
                "Primer Grado": [
                  "Identifica qué son las placas tectónicas, cuáles son sus características y dinámica.",
                  "Argumenta la relación entre las placas tectónicas con las regiones sísmicas y volcánicas en México y el mundo para fortalecer la cultura de la prevención.",
                  "Relaciona los movimientos de las placas tectónicas con la distribución del relieve terrestre."
                ]
              }
            },
            {
              id: "geo-5",
              contenido: "Los riesgos de desastre, su relación con los procesos naturales y la vulnerabilidad de la población.",
              pdas: {
                "Primer Grado": [
                  "Identifica que los desastres pueden ser originados por procesos naturales o por las actividades humanas.",
                  "Relaciona los efectos ambientales, sociales y económicos de los desastres recientes tomando en cuenta la vulnerabilidad de la población.",
                  "Valora la importancia de consolidar una cultura de prevención de desastres."
                ]
              }
            },
            {
              id: "geo-6",
              contenido: "El reto del cambio climático.",
              pdas: {
                "Primer Grado": [
                  "Reconoce las relaciones e interacciones entre los elementos y los factores del clima como base para comprender la distribución de las regiones naturales y la biodiversidad.",
                  "Indaga y analiza de manera crítica los cambios ocurridos en el clima, sus causas y consecuencias en México y el mundo.",
                  "Asume una postura crítica y activa ante los fenómenos derivados del calentamiento global y el cambio climático."
                ]
              }
            }
          ]
        },
        {
          id: "HIST",
          nombre: "Historia",
          grados: ["Primer Grado", "Segundo Grado", "Tercer Grado"],
          contenidos: [
            {
              id: "hist-1",
              contenido: "Los albores de la humanidad: los pueblos antiguos del mundo y su devenir.",
              pdas: {
                "Primer Grado": [
                  "Busca, localiza y estudia fuentes que dan cuenta de mitos fundacionales de pueblos antiguos y reflexiona sobre las fuentes históricas.",
                  "Reflexiona y toma postura en torno a las teorías que explican el poblamiento original de América.",
                  "Conoce sistemas para abordar la historia de los primeros pueblos en el territorio de lo que ahora es nuestro país (Mesoamérica, Aridoamérica y Oasisamérica)."
                ],
                "Segundo Grado": [
                  "Indaga sobre el poblamiento de América y el surgimiento de las civilizaciones mesoamericanas.",
                  "Analiza la vida cotidiana, economía y organización social de los pueblos indígenas prehispánicos."
                ],
                "Tercer Grado": [
                  "Recupera explicaciones de Charles Darwin sobre el origen y evolución de la biodiversidad en el caso humano.",
                  "Aplica el eje organizador uso y gestión del agua para analizar el desarrollo histórico de las antiguas civilizaciones (mesopotámica, egipcia, hindú, china, griega y romana)."
                ]
              }
            },
            {
              id: "hist-2",
              contenido: "La conformación de las metrópolis y los sistemas de dominación.",
              pdas: {
                "Primer Grado": [
                  "Formula preguntas y recopila información en torno a los pueblos originarios de México y la población afromexicana."
                ],
                "Segundo Grado": [
                  "Indaga acerca del desarrollo del comercio y navegación en Europa y Asia en el siglo XV y la expedición de 1492 de Cristóbal Colón.",
                  "Revisa y contextualiza las campañas militares de Hernán Cortés para someter a la población indígena y el establecimiento del Virreinato de la Nueva España."
                ],
                "Tercer Grado": [
                  "Caracteriza las colonizaciones realizadas por españoles, portugueses, ingleses, franceses y holandeses en América y Asia.",
                  "Analiza las causas de la intensificación del tráfico de esclavos y el uso del trabajo de la población africana en América."
                ]
              }
            },
            {
              id: "hist-3",
              contenido: "Las gestas de resistencia y los movimientos independentistas.",
              pdas: {
                "Primer Grado": [
                  "Indaga sobre rebeliones y levantamientos de pueblos indígenas y afromexicanos en la historia de nuestro país."
                ],
                "Segundo Grado": [
                  "Relaciona la Revolución de Independencia de 1810 en México con el contexto internacional y analiza sus etapas, protagonistas y desenlace.",
                  "Analiza las tensiones entre federalistas y centralistas durante la primera mitad del siglo XIX."
                ],
                "Tercer Grado": [
                  "Elabora una cronología de las luchas de independencia de los países de Latinoamérica.",
                  "Explica causas y consecuencias de las invasiones extranjeras y guerras de intervención en el siglo XIX."
                ]
              }
            },
            {
              id: "hist-4",
              contenido: "Las revoluciones modernas y sus tendencias.",
              pdas: {
                "Primer Grado": [
                  "Identifica las ideas y representaciones de las personas y los cambios en las sociedades en distintos momentos históricos."
                ],
                "Segundo Grado": [
                  "Identifica causas y consecuencias de la Revolución de Ayutla de 1854 y analiza las Leyes de Reforma (1859-1861).",
                  "Elabora una cronología de la Guerra de Reforma, la Segunda Invasión Francesa y el Porfiriato."
                ],
                "Tercer Grado": [
                  "Ubica las causas de la Revolución Industrial, la Independencia de los Estados Unidos y la Revolución Francesa.",
                  "Analiza la Declaración de los Derechos del Hombre y del Ciudadano y reflexiona sobre el surgimiento del capitalismo y las ideologías del siglo XIX."
                ]
              }
            },
            {
              id: "hist-5",
              contenido: "Las tensiones en el siglo XX.",
              pdas: {
                "Primer Grado": [
                  "Comprende procesos históricos relevantes del siglo XX en relación con la defensa de los derechos humanos."
                ],
                "Segundo Grado": [
                  "Analiza la causalidad de la Revolución Mexicana de 1910 y los gobiernos postrevolucionarios (Maximato, Cardenismo y Milagro Mexicano).",
                  "Recupera información de crónicas y narrativas del movimiento estudiantil de 1968 y la transición democrática."
                ],
                "Tercer Grado": [
                  "Explica las causas y consecuencias de la Primera y Segunda Guerra Mundial, la Revolución Rusa de 1917, la Guerra Fría y la caída del Muro de Berlín.",
                  "Analiza la descolonización de África, la Revolución Cubana y el mundo unipolar contemporáneo."
                ]
              }
            }
          ]
        },
        {
          id: "FCYE",
          nombre: "Formación Cívica y Ética",
          grados: ["Primer Grado", "Segundo Grado", "Tercer Grado"],
          contenidos: [
            {
              id: "fcye-1",
              contenido: "Grupos sociales y culturales en la conformación de las identidades juveniles.",
              pdas: {
                "Primer Grado": [
                  "Valora la diversidad de grupos e identidades juveniles en la escuela y en la comunidad y fortalece el respeto a formas de ser, pensar y expresarse en el marco de los derechos humanos."
                ],
                "Segundo Grado": [
                  "Argumenta sobre el derecho a pertenecer a una cultura, grupo social, económico, ideológico, sexual o de género, para exigir el respeto a las identidades juveniles."
                ],
                "Tercer Grado": [
                  "Promueve espacios de participación juvenil, presenciales o virtuales, para construir comunidades que promuevan la colaboración, el respeto y el ejercicio de los derechos."
                ]
              }
            },
            {
              id: "fcye-2",
              contenido: "Los derechos humanos en México y en el mundo como valores compartidos por las sociedades actuales.",
              pdas: {
                "Primer Grado": [
                  "Asume una postura crítica acerca de la vigencia de los derechos humanos como valores compartidos por distintas sociedades del mundo."
                ],
                "Segundo Grado": [
                  "Propone acciones orientadas a fortalecer la igualdad de derechos, el bienestar colectivo y el respeto a la dignidad humana en poblaciones históricamente marginadas."
                ],
                "Tercer Grado": [
                  "Debate acerca de la importancia de defender y exigir el respeto a los derechos humanos, como un reto de las sociedades actuales para vivir con dignidad, libertad y justicia."
                ]
              }
            },
            {
              id: "fcye-3",
              contenido: "El conflicto en la convivencia humana desde la cultura de paz.",
              pdas: {
                "Primer Grado": [
                  "Analiza distintos tipos de conflictos en sus espacios de convivencia, su estructura y formas de solucionarlos desde la cultura de paz como una oportunidad de crecimiento personal y social."
                ],
                "Segundo Grado": [
                  "Propone distintas formas de resolver conflictos sociales y políticos ocurridos en México y América Latina, para generar estrategias de mediación desde la cultura de paz."
                ],
                "Tercer Grado": [
                  "Valora la resolución pacífica de conflictos sociales y políticos en México y el mundo y gestiona estrategias de participación y transformación social hacia una cultura de paz."
                ]
              }
            },
            {
              id: "fcye-4",
              contenido: "Igualdad sustantiva en el marco de la interculturalidad, la inclusión y la perspectiva de género.",
              pdas: {
                "Primer Grado": [
                  "Aprecia la interculturalidad y el respeto al derecho a la igualdad sustantiva para establecer relaciones incluyentes y respetuosas de la diversidad, rechazando la discriminación y el racismo."
                ],
                "Segundo Grado": [
                  "Elabora juicios éticos sobre problemas de injusticia y discriminación que afectan la igualdad sustantiva y realiza propuestas congruentes con la inclusión y la perspectiva de género."
                ],
                "Tercer Grado": [
                  "Participa en acciones dirigidas a reducir brechas de desigualdad para promover y fortalecer la interculturalidad, la inclusión y la perspectiva de género."
                ]
              }
            },
            {
              id: "fcye-5",
              contenido: "Principios y valores de la cultura democrática como forma de gobierno y de vida.",
              pdas: {
                "Primer Grado": [
                  "Aprecia en los principios y valores de la democracia una forma de vida y de gobierno, para tomar decisiones que fortalezcan la convivencia en los espacios donde participa."
                ],
                "Segundo Grado": [
                  "Propone acciones para fortalecer en su entorno los rasgos del Estado de derecho democrático como el imperio de la ley, la división de poderes y los derechos humanos."
                ],
                "Tercer Grado": [
                  "Participa de manera activa, responsable e informada en la promoción, defensa y reivindicación de los principios y valores de la democracia."
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "HUMANO",
      nombre: "De lo Humano y lo Comunitario",
      asignaturas: [
        {
          id: "TECNO",
          nombre: "Tecnología",
          grados: ["Primer Grado", "Segundo Grado", "Tercer Grado"],
          contenidos: [
            {
              id: "tec-1",
              contenido: "Herramientas, máquinas e instrumentos, como extensión corporal, en la satisfacción continua de intereses y necesidades humanas.",
              pdas: {
                "Primer Grado": [
                  "Explora las posibilidades corporales y la delegación de funciones en herramientas, máquinas, instrumentos y formas de organización para identificar sus funciones y procesos de cambio técnico."
                ],
                "Segundo Grado": [
                  "Analiza las herramientas, máquinas, instrumentos y formas de organización, como una extensión de las posibilidades corporales para solucionar problemas en diversos contextos."
                ],
                "Tercer Grado": [
                  "Amplía sus posibilidades corporales por medio del conocimiento y habilidades en el manejo de herramientas, máquinas e instrumentos en procesos técnicos comunitarios."
                ]
              }
            },
            {
              id: "tec-2",
              contenido: "Materiales, procesos técnicos y comunidad.",
              pdas: {
                "Primer Grado": [
                  "Distingue el origen, transformación y características tecnológicas de los materiales que comparten técnicas similares, para utilizarlos desde una perspectiva local, eficiente y sustentable."
                ],
                "Segundo Grado": [
                  "Explora el uso y transformación de los materiales, de acuerdo con sus características en los procesos técnicos de distintas comunidades, para prevenir daños sociales o a la naturaleza."
                ],
                "Tercer Grado": [
                  "Implementa alternativas a situaciones que, por el origen, transformación, uso o desecho de los materiales, ponen en riesgo el entorno de la comunidad, para favorecer el desarrollo sustentable."
                ]
              }
            },
            {
              id: "tec-3",
              contenido: "Usos e implicaciones de la energía en los procesos técnicos.",
              pdas: {
                "Primer Grado": [
                  "Comprende la función de la energía en los sistemas técnicos y sus implicaciones en el desarrollo tecnológico para la toma de decisiones responsables."
                ],
                "Segundo Grado": [
                  "Explora las principales fuentes de energía en los procesos técnicos para su uso óptimo, así como las alternativas de prevención de riesgos."
                ],
                "Tercer Grado": [
                  "Analiza diversas fuentes de energía en los procesos técnicos para considerar posibles alternativas sustentables en su funcionamiento."
                ]
              }
            },
            {
              id: "tec-4",
              contenido: "Pensamiento estratégico y creativo en la resolución de problemas.",
              pdas: {
                "Primer Grado": [
                  "Analiza necesidades del entorno cercano para plantear un problema, investigar alternativas de solución y seleccionar la que mejor se adapte a los criterios y condiciones contextuales."
                ],
                "Segundo Grado": [
                  "Planifica y organiza acciones, medios técnicos e insumos, para el desarrollo de alternativas de solución a diversos problemas identificados."
                ],
                "Tercer Grado": [
                  "Implementa, da seguimiento y evalúa las propuestas conforme a los criterios y condiciones establecidas en un plan para satisfacer las necesidades o intereses identificados."
                ]
              }
            }
          ]
        },
        {
          id: "TUTORIA",
          nombre: "Educación Socioemocional / Tutoría",
          grados: ["Primer Grado", "Segundo Grado", "Tercer Grado"],
          contenidos: [
            {
              id: "tut-1",
              contenido: "Formas de ser, pensar, actuar y relacionarse.",
              pdas: {
                "Primer Grado": [
                  "Reconoce ideas, gustos, necesidades, posibilidades, intereses, deseos y experiencias, para favorecer el autoconocimiento y descubrimiento de nuevas potencialidades."
                ],
                "Segundo Grado": [
                  "Analiza las formas de ser, pensar, actuar e interactuar, para comprender las diversas maneras de vivenciar situaciones cotidianas y lograr el bienestar personal y social."
                ],
                "Tercer Grado": [
                  "Promueve el entendimiento mutuo y la toma de decisiones, considerando formas de ser, pensar, actuar y relacionarse ante diferentes situaciones y contextos."
                ]
              }
            },
            {
              id: "tut-2",
              contenido: "Los sentimientos y su influencia en la toma de decisiones.",
              pdas: {
                "Primer Grado": [
                  "Distingue entre emociones, estados de ánimo y sentimientos como elementos que contribuyen a la construcción de relaciones afectivas inclusivas y equitativas.",
                  "Reconoce que los sentimientos son resultado de las vivencias y la cultura."
                ],
                "Segundo Grado": [
                  "Reflexiona sobre cómo los sentimientos se construyen a partir de ideas y experiencias, para la toma de decisiones asertivas."
                ],
                "Tercer Grado": [
                  "Gestiona los afectos para tomar decisiones asertivas y construir relaciones de convivencia inclusivas y equitativas."
                ]
              }
            },
            {
              id: "tut-3",
              contenido: "Construcción del proyecto de vida.",
              pdas: {
                "Primer Grado": [
                  "Reconoce cambios presentes a lo largo de la vida y en la adolescencia para definir metas personales y en colectivo, a alcanzar en un corto, mediano y largo plazo.",
                  "Valora metas individuales y de otras personas a partir de identificar situaciones y formas de actuar que las afectan."
                ],
                "Segundo Grado": [
                  "Analiza intereses y necesidades, así como logros y metas personales y compartidas de acuerdo con conocimientos, capacidades y habilidades desarrolladas para proponer ideas de su proyecto de vida.",
                  "Replantea sus metas a partir del análisis de logros y situaciones afrontadas."
                ],
                "Tercer Grado": [
                  "Visualiza un proyecto de vida para determinar posibles retos a superar, estrategias de apoyo mutuo y acciones a realizar en favor del bienestar personal y colectivo.",
                  "Reconoce nuevos intereses, habilidades y necesidades para replantear metas individuales y grupales."
                ]
              }
            },
            {
              id: "tut-4",
              contenido: "Prevención de situaciones de riesgo.",
              pdas: {
                "Primer Grado": [
                  "Incorpora prácticas que inciden en la prevención de situaciones de riesgo ante accidentes, adicciones, formas de violencia y fenómenos naturales, para favorecer el desarrollo personal, familiar y comunitario."
                ],
                "Segundo Grado": [
                  "Participa en la construcción de alternativas personales, familiares y comunitarias que favorezcan la prevención de situaciones de riesgo."
                ],
                "Tercer Grado": [
                  "Reflexiona sobre las condiciones del contexto familiar y comunitario que representan situaciones de riesgo a la salud, a la seguridad y al medio ambiente."
                ]
              }
            }
          ]
        },
        {
          id: "ED_FIS",
          nombre: "Educación Física",
          grados: ["Primer Grado", "Segundo Grado", "Tercer Grado"],
          contenidos: [
            {
              id: "ef-1",
              contenido: "Capacidades, habilidades y destrezas motrices.",
              pdas: {
                "Primer Grado": [
                  "Explora las capacidades, habilidades y destrezas motrices, para enriquecer y ampliar el potencial propio y de las demás personas."
                ],
                "Segundo Grado": [
                  "Integra sus capacidades, habilidades y destrezas motrices, para poner a prueba el potencial individual y de conjunto."
                ],
                "Tercer Grado": [
                  "Valora las capacidades, habilidades y destrezas propias y de las demás personas, para mostrar mayor disponibilidad corporal y autonomía motriz."
                ]
              }
            },
            {
              id: "ef-2",
              contenido: "Potencialidades cognitivas, expresivas, motrices, creativas y de relación.",
              pdas: {
                "Primer Grado": [
                  "Pone en práctica los elementos de la condición física en actividades motrices y recreativas, para reconocerlas como alternativas que fomentan el bienestar individual y colectivo."
                ],
                "Segundo Grado": [
                  "Analiza el incremento de su condición física, al participar en actividades recreativas, de iniciación deportiva y deporte educativo."
                ],
                "Tercer Grado": [
                  "Diseña, organiza y participa en actividades recreativas, de iniciación deportiva y deporte educativo, con la intención de fomentar el bienestar personal y social."
                ]
              }
            },
            {
              id: "ef-3",
              contenido: "Estilos de vida activos y saludables.",
              pdas: {
                "Primer Grado": [
                  "Implementa acciones que le permiten mantenerse físicamente activo en diferentes momentos del día, para favorecer la práctica de estilos de vida saludables."
                ],
                "Segundo Grado": [
                  "Reflexiona acerca de los factores que afectan la práctica sistemática de actividad física, para proponer acciones que contribuyan a modificarlos o eliminarlos."
                ],
                "Tercer Grado": [
                  "Diseña alternativas que fomenten la práctica de estilos de vida activos y saludables, a partir del análisis de comportamientos que ponen en riesgo la salud."
                ]
              }
            },
            {
              id: "ef-4",
              contenido: "Pensamiento lúdico, estratégico y creativo.",
              pdas: {
                "Primer Grado": [
                  "Toma decisiones individuales y colectivas en situaciones de juego (defensivas u ofensivas), con el propósito de valorar su efectividad."
                ],
                "Segundo Grado": [
                  "Valora las estrategias de juego que utiliza ante distintas condiciones que se presentan, para reestructurarlas e incrementar su efectividad."
                ],
                "Tercer Grado": [
                  "Emplea el pensamiento estratégico para favorecer la colaboración y creatividad en la resolución de situaciones individuales y colectivas."
                ]
              }
            },
            {
              id: "ef-5",
              contenido: "Interacción motriz.",
              pdas: {
                "Primer Grado": [
                  "Pone a prueba la interacción motriz en situaciones de juego, iniciación deportiva y deporte educativo, con el fin de alcanzar metas comunes."
                ],
                "Segundo Grado": [
                  "Toma decisiones a favor de la participación colectiva en situaciones de iniciación deportiva y deporte educativo."
                ],
                "Tercer Grado": [
                  "Promueve relaciones asertivas con las demás personas en situaciones de juego, iniciación deportiva y deporte educativo, para fortalecer su autoestima."
                ]
              }
            }
          ]
        }
      ]
    }
  ]
};

// -------------------------------------------------------------
// FASE 5: EDUCACIÓN PRIMARIA (5° y 6° Grado)
// -------------------------------------------------------------
export const FASE_5_PRIMARIA: NemFase = {
  fase: "Fase 5",
  nivel: "Primaria",
  grados: ["Quinto Grado", "Sexto Grado"],
  camposFormativos: [
    {
      id: "lenguajes",
      nombre: "Lenguajes",
      asignaturas: [
        {
          id: "LENGUAJES_P5",
          nombre: "Lenguajes",
          grados: ["Quinto Grado", "Sexto Grado"],
          contenidos: [
            {
              id: "f5-len-1",
              contenido: "Narración de sucesos autobiográficos.",
              pdas: {
                "Quinto Grado": [
                  "Lee textos autobiográficos y reflexiona sobre las razones por las que suelen estar narrados en primera persona del singular.",
                  "Determina los sucesos autobiográficos que desea narrar y los organiza lógicamente, resaltando los aspectos más significativos.",
                  "Escribe la narración de los hechos autobiográficos, haciendo uso de comas, puntos y seguido, puntos y aparte y dos puntos."
                ],
                "Sexto Grado": [
                  "Lee textos autobiográficos e identifica las relaciones temporales de secuencia, simultaneidad y duración.",
                  "Analiza distintos sucesos de su vida para elegir los más significativos y organizarlos de manera coherente en una narración.",
                  "Usa reflexivamente adverbios, frases adverbiales y nexos temporales para indicar secuencia y simultaneidad."
                ]
              }
            },
            {
              id: "f5-len-2",
              contenido: "Comprensión y producción de textos explicativos.",
              pdas: {
                "Quinto Grado": [
                  "Lee distintos tipos de textos explicativos y reflexiona sobre sus características y funciones.",
                  "Expone las diferencias entre una descripción y una explicación, y entre un texto descriptivo y uno explicativo.",
                  "Recupera información de distintas fuentes para producir un texto explicativo sobre temas diversos."
                ],
                "Sexto Grado": [
                  "Localiza y lee textos explicativos de temas variados. Expresa con sus palabras las ideas principales y elabora resúmenes.",
                  "Reconoce y emplea relaciones de causa-consecuencia y conectores de secuencia lógica (primero, finalmente, luego, después)."
                ]
              }
            },
            {
              id: "f5-len-3",
              contenido: "Participación en debates sobre temas de interés común.",
              pdas: {
                "Quinto Grado": [
                  "Reconoce que hay temas donde las opiniones se dividen, y es necesario sustentar las propias.",
                  "Conoce la función y organización de un debate e investiga argumentos fundamentados.",
                  "Identifica la función de los nexos de subordinación en textos argumentativos."
                ],
                "Sexto Grado": [
                  "Prepara su participación en un debate y formula argumentos claros, pertinentes y fundamentados con citas y referencias.",
                  "Identifica conectivos causales, temporales y lógicos en textos argumentativos.",
                  "Escucha y opina de manera crítica durante su desempeño como participante o moderador."
                ]
              }
            },
            {
              id: "f5-len-4",
              contenido: "Comprensión y producción de textos argumentativos.",
              pdas: {
                "Quinto Grado": [
                  "Lee textos sobre temas polémicos y distingue las opiniones de los datos y hechos concretos.",
                  "Expresa sus opiniones oralmente, basado en argumentos y en un marco de respeto."
                ],
                "Sexto Grado": [
                  "Lee textos polémicos, identifica los argumentos que sustentan cada postura y reflexiona sobre la relación entre argumentos y conclusiones.",
                  "Escribe un texto en el que expresa sus propias opiniones con nexos argumentativos (porque, ya que, si bien, en consecuencia)."
                ]
              }
            },
            {
              id: "f5-len-5",
              contenido: "Comprensión y producción de textos discontinuos, para organizar y presentar información.",
              pdas: {
                "Quinto Grado": [
                  "Reconoce las características y funciones de textos discontinuos (tablas de doble entrada, líneas del tiempo, cuadros cronológicos).",
                  "Produce textos discontinuos considerando al destinatario y la legibilidad gráfica."
                ],
                "Sexto Grado": [
                  "Analiza características de gráficas, cuadros sinópticos y mapas conceptuales.",
                  "Sintetiza información sin perder el significado original para presentarla en formatos gráficos y digitales."
                ]
              }
            },
            {
              id: "f5-len-6",
              contenido: "Elaboración de un tríptico informativo sobre la prevención de algún problema colectivo.",
              pdas: {
                "Quinto Grado": [
                  "Recopila y analiza trípticos informativos para conocer sus características y funciones.",
                  "Organiza información textual y gráfica en un tríptico sobre un problema colectivo de salud, violencia o bienestar y lo difunde."
                ],
                "Sexto Grado": [
                  "Investiga a profundidad sobre un problema comunitario y diseña un tríptico completo con portada, imágenes, tablas y datos de apoyo.",
                  "Presenta y difunde el tríptico con la comunidad escolar y local."
                ]
              }
            },
            {
              id: "f5-len-7",
              contenido: "Reconocimiento de la diversidad lingüística de México.",
              pdas: {
                "Quinto Grado": [
                  "Investiga en fuentes sobre la diversidad lingüística en México y la influencia de lenguas originarias en el español mexicano.",
                  "Averigua mediante entrevistas palabras usuales en español que provienen de lenguas indígenas y reflexiona sobre su riqueza."
                ],
                "Sexto Grado": [
                  "Identifica qué lenguas se hablan en su familia, localidad o región mediante entrevistas e investigación.",
                  "Escribe un texto reflexivo sobre las diferentes formas de valorar las lenguas y la preservación del patrimonio lingüístico."
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "SABERES",
      nombre: "Saberes y Pensamiento Científico",
      asignaturas: [
        {
          id: "SABERES_P5",
          nombre: "Saberes y Pensamiento Científico",
          grados: ["Quinto Grado", "Sexto Grado"],
          contenidos: [
            {
              id: "f5-sab-1",
              contenido: "Estructura y funcionamiento del cuerpo humano: sistemas circulatorio, respiratorio e inmunológico, y su relación con la salud ambiental.",
              pdas: {
                "Quinto Grado": [
                  "Describe y representa con modelos el sistema respiratorio (nariz, tráquea, pulmones) y el intercambio de gases.",
                  "Indaga y explica la función del corazón y vasos sanguíneos en el sistema circulatorio.",
                  "Comprende la frecuencia cardiaca y propone acciones para prevenir enfermedades cardiorrespiratorias."
                ],
                "Sexto Grado": [
                  "Explica la participación del sistema inmunológico en la defensa y protección del cuerpo humano.",
                  "Describe beneficios de la vacunación, higiene y alimentación saludable para fortalecer el sistema inmunológico.",
                  "Argumenta la importancia de la Cartilla Nacional de Salud para la prevención comunitaria."
                ]
              }
            },
            {
              id: "f5-sab-2",
              contenido: "Etapas del desarrollo humano: proceso de reproducción y prevención de ITS y embarazos en adolescentes.",
              pdas: {
                "Quinto Grado": [
                  "Describe a la infancia, adolescencia, madurez y vejez como parte del desarrollo humano.",
                  "Comprende el proceso de reproducción humana (fecundación, embarazo y parto) y los derechos sexuales y reproductivos.",
                  "Argumenta sobre la importancia de la igualdad, respeto y prevención de violencia en el noviazgo."
                ],
                "Sexto Grado": [
                  "Analiza y argumenta implicaciones y riesgos del embarazo en adolescentes en ámbitos de salud, personal y educativo.",
                  "Compara y argumenta conductas responsables para evitar ITS y embarazos (uso del condón, abstención, proyecto de vida)."
                ]
              }
            },
            {
              id: "f5-sab-3",
              contenido: "Alimentación saludable: características de la dieta correcta, costumbres de la comunidad y riesgos de ultraprocesados.",
              pdas: {
                "Quinto Grado": [
                  "Explica las características de la dieta correcta (variada, completa, equilibrada, inocua, suficiente) y contrasta sus hábitos.",
                  "Indaga riesgos de la alimentación inadecuada (diabetes, hipertensión, sobrepeso) y diseña menús saludables."
                ],
                "Sexto Grado": [
                  "Establece relaciones entre sobrepeso, obesidad, desnutrición y el consumo de alimentos ultraprocesados; analiza trastornos alimentarios.",
                  "Analiza etiquetas de productos procesados y propone platillos saludables de temporada y bajo costo."
                ]
              }
            },
            {
              id: "f5-sab-4",
              contenido: "Estudio de los números.",
              pdas: {
                "Quinto Grado": [
                  "Expresa oralmente y escribe la sucesión numérica hasta seis cifras y regularidades de números naturales hasta nueve cifras.",
                  "Lee, escribe y ordena números decimales hasta diezmilésimos y resuelve situaciones con fracciones equivalentes."
                ],
                "Sexto Grado": [
                  "Expresa oralmente y escribe números naturales de más de nueve cifras hasta billones.",
                  "Identifica semejanzas y diferencias entre el sistema de numeración decimal y otros sistemas como el maya y romano."
                ]
              }
            },
            {
              id: "f5-sab-5",
              contenido: "Suma y resta, su relación como operaciones inversas.",
              pdas: {
                "Quinto Grado": [
                  "Propone y resuelve problemas de suma y resta con números decimales y fracciones con diferentes denominadores.",
                  "Utiliza y explica estrategias de cálculo mental de sumas y restas de múltiplos de 100 y fracciones."
                ],
                "Sexto Grado": [
                  "Suma y resta números decimales hasta centésimos y fracciones con diferentes denominadores en situaciones complejas.",
                  "Comprueba estrategias de cálculo mental con operaciones inversas."
                ]
              }
            },
            {
              id: "f5-sab-6",
              contenido: "Multiplicación y división, su relación como operaciones inversas.",
              pdas: {
                "Quinto Grado": [
                  "Resuelve problemas de multiplicación de fraccionarios y decimales por un número natural.",
                  "Resuelve problemas de división de números naturales con cociente decimal."
                ],
                "Sexto Grado": [
                  "Resuelve situaciones problemáticas de división de decimales entre naturales y fracciones entre naturales."
                ]
              }
            },
            {
              id: "f5-sab-7",
              contenido: "Relaciones de proporcionalidad.",
              pdas: {
                "Quinto Grado": [
                  "Resuelve problemas de proporcionalidad directa determinando valores faltantes (valor unitario, dobles, triples).",
                  "Identifica la relación entre porcentajes (50%, 25%, 20%, 10%) y fracciones (1/2, 1/4, 1/5, 1/10)."
                ],
                "Sexto Grado": [
                  "Calcula porcentajes (50%, 25%, 10%, 1%) y tanto por ciento en situaciones contextuales complejas."
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "ETICA",
      nombre: "Ética, Naturaleza y Sociedades",
      asignaturas: [
        {
          id: "ETICA_P5",
          nombre: "Ética, Naturaleza y Sociedades",
          grados: ["Quinto Grado", "Sexto Grado"],
          contenidos: [
            {
              id: "f5-et-1",
              contenido: "Valoración de la biodiversidad en el territorio donde se ubica la localidad, entidad, México y el mundo.",
              pdas: {
                "Quinto Grado": [
                  "Comprende la biodiversidad y su función en el equilibrio de la biósfera.",
                  "Compara representaciones cartográficas de la biodiversidad de México y propone acciones críticas para protegerla."
                ],
                "Sexto Grado": [
                  "Explica los procesos ecosistémicos de la biodiversidad en relación con la energía, agua, aire y suelo.",
                  "Analiza críticamente formas de cuidar y proteger la biodiversidad sustentablemente."
                ]
              }
            },
            {
              id: "f5-et-2",
              contenido: "Derechos humanos: a un ambiente sano y acceso al agua potable.",
              pdas: {
                "Quinto Grado": [
                  "Dialoga acerca del derecho humano a un ambiente sano y adecuado para su bienestar y busca soluciones locales colectivas."
                ],
                "Sexto Grado": [
                  "Comprende que la Constitución Política de los Estados Unidos Mexicanos y tratados internacionales garantizan derechos al agua y ambiente sano."
                ]
              }
            },
            {
              id: "f5-et-3",
              contenido: "Movimientos sociales en el México de los siglos XIX y XX: la Independencia y la Revolución Mexicana.",
              pdas: {
                "Quinto Grado": [
                  "Indaga causas, ideales y protagonistas del movimiento de Independencia (Hidalgo, Josefa Ortiz, Morelos, Allende, Guerrero).",
                  "Analiza la participación de grupos históricamente no visibilizados (mujeres, indígenas, afrodescendientes)."
                ],
                "Sexto Grado": [
                  "Indaga las características del Porfiriato y las causas de la Revolución Mexicana de 1910.",
                  "Analiza el debate del Constituyente de 1917 y los artículos 3o., 27 y 123 constitucionales."
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "HUMANO",
      nombre: "De lo Humano y lo Comunitario",
      asignaturas: [
        {
          id: "HUMANO_P5",
          nombre: "De lo Humano y lo Comunitario",
          grados: ["Quinto Grado", "Sexto Grado"],
          contenidos: [
            {
              id: "f5-hum-1",
              contenido: "Las familias como espacio para el desarrollo del sentido de pertenencia y autonomía, para una sana convivencia.",
              pdas: {
                "Quinto Grado": [
                  "Participa en distintas formas de convivencia en la familia para fortalecer su sentido de pertenencia y afecto.",
                  "Reflexiona acerca de los valores heredados de la familia para una sana convivencia en la comunidad."
                ],
                "Sexto Grado": [
                  "Diseña e interactúa en distintos escenarios de convivencia para fortalecer su autonomía y participación familiar.",
                  "Promueve los valores familiares para la resolución pacífica de conflictos."
                ]
              }
            },
            {
              id: "f5-hum-2",
              contenido: "Formas de ser, pensar, actuar y relacionarse.",
              pdas: {
                "Quinto Grado": [
                  "Reflexiona acerca de las formas de ser, pensar, actuar y relacionarse que tienen las personas para propiciar el entendimiento mutuo."
                ],
                "Sexto Grado": [
                  "Valora sus experiencias acerca de las formas de ser, pensar y relacionarse para favorecer la empatía y el logro de metas."
                ]
              }
            },
            {
              id: "f5-hum-3",
              contenido: "Capacidades, habilidades y destrezas motrices.",
              pdas: {
                "Quinto Grado": [
                  "Reconoce posibilidades y límites al participar en situaciones de juego e iniciación deportiva para determinar posibles mejoras."
                ],
                "Sexto Grado": [
                  "Aplica sus capacidades, habilidades y destrezas motrices al organizar y participar en situaciones de juego para favorecer su disponibilidad corporal."
                ]
              }
            },
            {
              id: "f5-hum-4",
              contenido: "Estilos de vida activos y saludables.",
              pdas: {
                "Quinto Grado": [
                  "Plantea alternativas de actividades físicas que puede practicar dentro y fuera de la escuela para desarrollar un estilo de vida activo."
                ],
                "Sexto Grado": [
                  "Evalúa factores que limitan la práctica constante de actividades físicas para implementar opciones y superar el sedentarismo."
                ]
              }
            }
          ]
        }
      ]
    }
  ]
};

// -------------------------------------------------------------
// FASE 4: EDUCACIÓN PRIMARIA (3° y 4° Grado)
// -------------------------------------------------------------
export const FASE_4_PRIMARIA: NemFase = {
  fase: "Fase 4",
  nivel: "Primaria",
  grados: ["Tercer Grado", "Cuarto Grado"],
  camposFormativos: [
    {
      id: "lenguajes",
      nombre: "Lenguajes",
      asignaturas: [
        {
          id: "LENGUAJES_P4",
          nombre: "Lenguajes",
          grados: ["Tercer Grado", "Cuarto Grado"],
          contenidos: [
            {
              id: "f4-len-1",
              contenido: "Narración de sucesos del pasado y del presente.",
              pdas: {
                "Tercer Grado": [
                  "Identifica y comprende la función y las características principales de la narración.",
                  "Reconoce y usa estructuras narrativas (lineal, circular, in media res) e identifica relaciones causa-efecto.",
                  "Usa el punto y seguido para separar oraciones en un párrafo."
                ],
                "Cuarto Grado": [
                  "Reconoce y usa diversos estilos, recursos y estrategias narrativas.",
                  "Establece relaciones causales y temporales entre acontecimientos y reflexiona sobre tiempos verbales (presente, pretérito, copretérito)."
                ]
              }
            },
            {
              id: "f4-len-2",
              contenido: "Descripción de personas, lugares, hechos y procesos.",
              pdas: {
                "Tercer Grado": [
                  "Comprende textos descriptivos detallados de personas y lugares usando adjetivos, adverbios y frases adverbiales.",
                  "Planea, escribe, revisa y corrige textos cronológicos usando mayúsculas y comas."
                ],
                "Cuarto Grado": [
                  "Planea, escribe y revisa textos donde describe de manera lógica procesos familiares con conectores secuenciales (en primer lugar, posteriormente, finalmente).",
                  "Emplea el punto y coma y los dos puntos al enumerar elementos."
                ]
              }
            },
            {
              id: "f4-len-3",
              contenido: "Diálogo para la toma de acuerdos y el intercambio de puntos de vista.",
              pdas: {
                "Tercer Grado": [
                  "Reconoce y usa pautas de intercambio oral (turnos de palabra, escucha activa, respeto y claridad de ideas).",
                  "Participa activamente en diálogos para tomar acuerdos fundamentados."
                ],
                "Cuarto Grado": [
                  "Utiliza información de varias fuentes orales y escritas para argumentar sus propias ideas y puntos de vista.",
                  "Practica la escucha activa, empatía y negociación en la toma de acuerdos."
                ]
              }
            },
            {
              id: "f4-len-4",
              contenido: "Comprensión y producción de textos expositivos (problema-solución, comparación-contraste, causa-consecuencia y enumeración).",
              pdas: {
                "Tercer Grado": [
                  "Recurre a textos expositivos y diccionarios para ampliar conocimientos y reconoce esquemas de problema-solución y causa-consecuencia."
                ],
                "Cuarto Grado": [
                  "Planea, escribe y corrige sus propios textos expositivos estructurados con nexos de comparación (en cambio, por otro lado, a diferencia de)."
                ]
              }
            },
            {
              id: "f4-len-5",
              contenido: "Búsqueda y manejo reflexivo de información.",
              pdas: {
                "Tercer Grado": [
                  "Formula preguntas usando signos de interrogación y localiza información en diccionarios e índices."
                ],
                "Cuarto Grado": [
                  "Elabora preguntas con acentos gráficos (qué, cómo, cuándo, dónde) y emplea títulos, subtítulos, viñetas y palabras clave."
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "SABERES",
      nombre: "Saberes y Pensamiento Científico",
      asignaturas: [
        {
          id: "SABERES_P4",
          nombre: "Saberes y Pensamiento Científico",
          grados: ["Tercer Grado", "Cuarto Grado"],
          contenidos: [
            {
              id: "f4-sab-1",
              contenido: "Estructura y funcionamiento del cuerpo humano: sistemas locomotor y digestivo, y prácticas para su cuidado.",
              pdas: {
                "Tercer Grado": [
                  "Identifica que el sistema locomotor está conformado por el sistema óseo y muscular, y explica su coordinación con el sistema nervioso.",
                  "Describe prácticas para el cuidado del cuerpo, postura correcta y prevención de lesiones."
                ],
                "Cuarto Grado": [
                  "Identifica y describe estructura y funciones del sistema digestivo y su relación con el sistema circulatorio.",
                  "Reconoce el papel de jugos gástricos y prácticas de autocuidado como la herbolaria."
                ]
              }
            },
            {
              id: "f4-sab-2",
              contenido: "Alimentación saludable, con base en el Plato del Bien Comer y prácticas culturales.",
              pdas: {
                "Tercer Grado": [
                  "Explica la importancia de una alimentación variada e higiénica acorde con el Plato del Bien Comer y propone hábitos de consumo de agua simple potable."
                ],
                "Cuarto Grado": [
                  "Indaga los nutrimentos que proporcionan los alimentos y analiza la influencia de la publicidad en el consumo de comida chatarra."
                ]
              }
            },
            {
              id: "f4-sab-3",
              contenido: "Estudio de los números.",
              pdas: {
                "Tercer Grado": [
                  "Expresa la sucesión numérica hasta cuatro cifras, lee, escribe y representa números naturales y fracciones (medios, cuartos, octavos, dieciseisavos)."
                ],
                "Cuarto Grado": [
                  "Expresa y ordena números naturales hasta cinco cifras y decimales hasta centésimos, reconociendo tercios, quintos y décimos."
                ]
              }
            },
            {
              id: "f4-sab-4",
              contenido: "Suma y resta, su relación como operaciones inversas.",
              pdas: {
                "Tercer Grado": [
                  "Resuelve problemas de suma y resta con números naturales de hasta tres cifras con algoritmo convencional y fracciones con denominadores comunes."
                ],
                "Cuarto Grado": [
                  "Resuelve problemas de suma y resta de hasta cuatro cifras, números decimales hasta centésimos y fracciones con diferente denominador."
                ]
              }
            },
            {
              id: "f4-sab-5",
              contenido: "Multiplicación y división, su relación como operaciones inversas.",
              pdas: {
                "Tercer Grado": [
                  "Resuelve multiplicaciones de hasta tres cifras mediante diversos procedimientos y divisiones con reparto y agrupamiento."
                ],
                "Cuarto Grado": [
                  "Resuelve multiplicaciones de tres por dos cifras y divisiones con algoritmo convencional reconociendo cociente y residuo."
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "ETICA",
      nombre: "Ética, Naturaleza y Sociedades",
      asignaturas: [
        {
          id: "ETICA_P4",
          nombre: "Ética, Naturaleza y Sociedades",
          grados: ["Tercer Grado", "Cuarto Grado"],
          contenidos: [
            {
              id: "f4-et-1",
              contenido: "Representaciones cartográficas de la localidad y comunidad; ubicación y cuidados de los ecosistemas.",
              pdas: {
                "Tercer Grado": [
                  "Elabora representaciones cartográficas de la localidad considerando los puntos cardinales y comprende la interdependencia de los ecosistemas."
                ],
                "Cuarto Grado": [
                  "Elabora representaciones cartográficas de la entidad y del territorio nacional y propone acciones para la preservación de los ecosistemas."
                ]
              }
            },
            {
              id: "f4-et-2",
              contenido: "La vida cotidiana antes de la primera invasión europea y en el México colonial.",
              pdas: {
                "Tercer Grado": [
                  "Indaga sobre pueblos originarios prehispánicos (Olmecas, Teotihuacanos, Mayas, Mexicas) y su vida cotidiana."
                ],
                "Cuarto Grado": [
                  "Analiza los impactos de la invasión española, la desigualdad vivida por pueblos originarios y afrodescendientes, y la vida en la época novohispana."
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "HUMANO",
      nombre: "De lo Humano y lo Comunitario",
      asignaturas: [
        {
          id: "HUMANO_P4",
          nombre: "De lo Humano y lo Comunitario",
          grados: ["Tercer Grado", "Cuarto Grado"],
          contenidos: [
            {
              id: "f4-hum-1",
              contenido: "La comunidad como el espacio en el que se vive y se encuentra la escuela.",
              pdas: {
                "Tercer Grado": [
                  "Indaga acerca de ideas, conocimientos y formas de organización comunitaria para compartir su importancia en la socialización."
                ],
                "Cuarto Grado": [
                  "Reconoce ideas, prácticas culturales y formas de organización para explicar el significado que tienen en su familia, escuela y comunidad."
                ]
              }
            },
            {
              id: "f4-hum-2",
              contenido: "Capacidades y habilidades motrices.",
              pdas: {
                "Tercer Grado": [
                  "Adapta sus movimientos de acuerdo con los elementos básicos de los juegos para responder a las condiciones presentadas."
                ],
                "Cuarto Grado": [
                  "Pone en práctica sus habilidades motrices en situaciones lúdicas individuales y colectivas para mejorar su actuación."
                ]
              }
            }
          ]
        }
      ]
    }
  ]
};

// -------------------------------------------------------------
// FASE 3: EDUCACIÓN PRIMARIA (1° y 2° Grado)
// -------------------------------------------------------------
export const FASE_3_PRIMARIA: NemFase = {
  fase: "Fase 3",
  nivel: "Primaria",
  grados: ["Primer Grado", "Segundo Grado"],
  camposFormativos: [
    {
      id: "lenguajes",
      nombre: "Lenguajes",
      asignaturas: [
        {
          id: "LENGUAJES_P3",
          nombre: "Lenguajes",
          grados: ["Primer Grado", "Segundo Grado"],
          contenidos: [
            {
              id: "f3-len-1",
              contenido: "Escritura de nombres en la lengua materna.",
              pdas: {
                "Primer Grado": [
                  "Escribe su nombre y lo compara con los nombres de sus compañeros para indicar autoría de sus trabajos y registrar asistencia.",
                  "Identifica nombres más largos o cortos que el suyo, iniciales y diminutivos."
                ],
                "Segundo Grado": [
                  "Escribe su nombre y apellidos y de familiares o docentes para indicar autoría, pertenencia e identidad.",
                  "Compara características de grafías (c, s, z, b, v, g, j, etc.)."
                ]
              }
            },
            {
              id: "f3-len-2",
              contenido: "Lectura compartida en voz alta.",
              pdas: {
                "Primer Grado": [
                  "Reconoce que se lee y escribe de izquierda a derecha y de arriba a abajo.",
                  "Sigue la lectura en voz alta de recados, cuentos, notas informativas y canciones y establece correspondencias entre oralidad y escritura."
                ],
                "Segundo Grado": [
                  "Relee pasajes para comprender mejor el significado de lo leído y comenta el contenido con otras personas.",
                  "Lee en voz alta para otros diversos textos como poemas, cartas y cuentos."
                ]
              }
            },
            {
              id: "f3-len-3",
              contenido: "Narración de actividades y eventos relevantes que tengan lugar en la familia, la escuela o la comunidad.",
              pdas: {
                "Primer Grado": [
                  "Relata historias de su entorno inmediato cuidando el orden lógico de los hechos y volumen de voz.",
                  "Recrea una historia personal con viñetas constituidas por dibujo y texto."
                ],
                "Segundo Grado": [
                  "Narra eventos escolares con organización temporal y causal y escucha activamente las narraciones de sus pares."
                ]
              }
            },
            {
              id: "f3-len-4",
              contenido: "Descripción de objetos, lugares y seres vivos.",
              pdas: {
                "Primer Grado": [
                  "Describe de manera oral y escrita en su lengua materna objetos, lugares y seres vivos reales o ficticios.",
                  "Representa seres vivos de forma plástica, sonora o corporal."
                ],
                "Segundo Grado": [
                  "Describe de forma oral y escrita seres vivos de su entorno natural y social con mayor detalle y vocabulario."
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "SABERES",
      nombre: "Saberes y Pensamiento Científico",
      asignaturas: [
        {
          id: "SABERES_P3",
          nombre: "Saberes y Pensamiento Científico",
          grados: ["Primer Grado", "Segundo Grado"],
          contenidos: [
            {
              id: "f3-sab-1",
              contenido: "Cuerpo humano: estructura externa, acciones para su cuidado y sus cambios como parte del crecimiento.",
              pdas: {
                "Primer Grado": [
                  "Compara y representa las partes externas del cuerpo humano, explica su funcionamiento y propone hábitos de cuidado.",
                  "Describe sus características físicas reconociendo que todos los cuerpos son únicos y merecen respeto."
                ],
                "Segundo Grado": [
                  "Reconoce y describe los órganos de los sentidos y su función, así como acciones que previenen accidentes.",
                  "Identifica órganos sexuales externos (vulva, pene, testículos) y comprende el valor del autocuidado y respeto a partes privadas."
                ]
              }
            },
            {
              id: "f3-sab-2",
              contenido: "Beneficios del consumo de alimentos saludables, de agua simple potable, y de la práctica de actividad física.",
              pdas: {
                "Primer Grado": [
                  "Indaga y compara el tipo y frecuencia de alimentos saludables (frutas, verduras, cereales) frente a comida con alto contenido de azúcar y grasa."
                ],
                "Segundo Grado": [
                  "Clasifica los alimentos en naturales, procesados y ultraprocesados e infiere sus implicaciones en la salud."
                ]
              }
            },
            {
              id: "f3-sab-3",
              contenido: "Estudio de los números.",
              pdas: {
                "Primer Grado": [
                  "Expresa oralmente la sucesión numérica hasta 100 y cuenta, ordena y escribe colecciones de objetos hasta 100."
                ],
                "Segundo Grado": [
                  "Expresa la sucesión numérica hasta 1000 y utiliza los símbolos '<', '>' o '=' para comparar u ordenar dos cantidades."
                ]
              }
            },
            {
              id: "f3-sab-4",
              contenido: "Construcción de la noción de suma y resta, y su relación como operaciones inversas.",
              pdas: {
                "Primer Grado": [
                  "Reconoce que la suma es juntar o agregar y la resta es quitar o comparar con cantidades de hasta dos dígitos."
                ],
                "Segundo Grado": [
                  "Resuelve sumas y restas de números menores a 1000 y en la recta numérica con algoritmo convencional."
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "ETICA",
      nombre: "Ética, Naturaleza y Sociedades",
      asignaturas: [
        {
          id: "ETICA_P3",
          nombre: "Ética, Naturaleza y Sociedades",
          grados: ["Primer Grado", "Segundo Grado"],
          contenidos: [
            {
              id: "f3-et-1",
              contenido: "Diversos contextos sociales, naturales y territoriales: cambios y continuidades.",
              pdas: {
                "Primer Grado": [
                  "Identifica que es parte de un barrio, comunidad o localidad y describe características naturales y sociales."
                ],
                "Segundo Grado": [
                  "Describe cambios y continuidades de su entorno y se ubica espacialmente a través de croquis y mapas."
                ]
              }
            },
            {
              id: "f3-et-2",
              contenido: "Respeto, cuidado y empatía hacia la naturaleza, como parte de un todo interdependiente.",
              pdas: {
                "Primer Grado": [
                  "Describe y reconoce la existencia de seres vivos y componentes naturales (ríos, suelos, aire) presentes en su lugar de vida."
                ],
                "Segundo Grado": [
                  "Se reconoce como parte de la naturaleza y dialoga sobre acciones concretas a favor del cuidado de los seres vivos."
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "HUMANO",
      nombre: "De lo Humano y lo Comunitario",
      asignaturas: [
        {
          id: "HUMANO_P3",
          nombre: "De lo Humano y lo Comunitario",
          grados: ["Primer Grado", "Segundo Grado"],
          contenidos: [
            {
              id: "f3-hum-1",
              contenido: "La comunidad como el espacio en el que se vive y se encuentra la escuela.",
              pdas: {
                "Primer Grado": [
                  "Ubica referentes del lugar donde vive y platica sobre características climáticas, ambientales y culturales de su escuela."
                ],
                "Segundo Grado": [
                  "Identifica las ventajas de pertenecer a una comunidad (seguridad, afecto, convivencia) y reflexiona sobre soluciones a problemas locales."
                ]
              }
            },
            {
              id: "f3-hum-2",
              contenido: "Capacidades y habilidades motrices.",
              pdas: {
                "Primer Grado": [
                  "Utiliza patrones básicos de movimiento al explorar espacios, tiempo y objetos para favorecer el conocimiento de sí."
                ],
                "Segundo Grado": [
                  "Combina diversos patrones básicos de movimiento para actuar en juegos y situaciones motrices compartidas."
                ]
              }
            }
          ]
        }
      ]
    }
  ]
};

// -------------------------------------------------------------
// FASE 2: EDUCACIÓN PREESCOLAR (1°, 2°, 3° de Preescolar)
// -------------------------------------------------------------
export const FASE_2_PREESCOLAR: NemFase = {
  fase: "Fase 2",
  nivel: "Preescolar",
  grados: ["1º de Preescolar", "2º de Preescolar", "3º de Preescolar"],
  camposFormativos: [
    {
      id: "lenguajes",
      nombre: "Lenguajes",
      asignaturas: [
        {
          id: "LENGUAJES_PRE",
          nombre: "Lenguajes (Preescolar)",
          grados: ["1º de Preescolar", "2º de Preescolar", "3º de Preescolar"],
          contenidos: [
            {
              id: "f2-len-1",
              contenido: "Comunicación oral de necesidades, emociones, gustos, ideas y saberes, a través de los diversos lenguajes, desde una perspectiva comunitaria.",
              pdas: {
                "1º de Preescolar": [
                  "Emplea palabras, gestos, señas, imágenes o movimientos corporales para expresar necesidades, ideas y emociones.",
                  "Espera su turno al participar en una conversación con sus compañeras o compañeros."
                ],
                "2º de Preescolar": [
                  "Manifiesta oralmente y de manera clara necesidades, emociones, gustos y preferencias apoyándose de distintos lenguajes.",
                  "Escucha con atención a sus pares y espera su turno para hablar e intercambia puntos de vista."
                ],
                "3º de Preescolar": [
                  "De manera oral, expresa ideas completas sobre vivencias, emociones y saberes combinando los lenguajes.",
                  "Conversa y opina sobre diferentes temas con varias personas interlocutoras."
                ]
              }
            },
            {
              id: "f2-len-2",
              contenido: "Narración de historias mediante diversos lenguajes, en un ambiente donde niñas y niños participen y se apropien de la cultura.",
              pdas: {
                "1º de Preescolar": [
                  "Evoca y narra fragmentos de cuentos, leyendas y fábulas que escucha en voz de otras personas y describe lugares o personajes."
                ],
                "2º de Preescolar": [
                  "Lee con apoyo y narra con una secuencia lógica diferentes textos literarios y relatos de la comunidad.",
                  "Modifica eventos, lugares o personajes utilizando recursos artísticos."
                ],
                "3º de Preescolar": [
                  "Narra historias que inventa considerando momentos de inicio, desarrollo y final de manera individual o colectiva."
                ]
              }
            },
            {
              id: "f2-len-3",
              contenido: "Producciones gráficas dirigidas a diversas destinatarias y destinatarios para establecer vínculos sociales y acercarse a la cultura escrita.",
              pdas: {
                "1º de Preescolar": [
                  "Reconoce que las producciones gráficas son una forma de comunicación y elabora marcas propias o dibujos.",
                  "Identifica su nombre escrito en objetos personales del aula o su casa."
                ],
                "2º de Preescolar": [
                  "Produce mensajes con formas gráficas personales o dictando a alguien y representa su nombre con recursos propios."
                ],
                "3º de Preescolar": [
                  "Planifica producciones gráficas (avisos, recados, letreros) y usa grafías para representar su nombre y palabras conocidas."
                ]
              }
            },
            {
              id: "f2-len-4",
              contenido: "Producción de expresiones creativas con los distintos elementos de los lenguajes artísticos.",
              pdas: {
                "1º de Preescolar": [
                  "Experimenta con colores, formas, texturas, sonidos y movimientos y produce expresiones creativas para representar su entorno."
                ],
                "2º de Preescolar": [
                  "Combina elementos de los lenguajes artísticos (líneas, música, gestos) en producciones para representar situaciones imaginarias o cuentos."
                ],
                "3º de Preescolar": [
                  "Enriquece sus producciones artísticas al incluir elementos visuales, dancísticos y sonoros de su cultura y comunidad."
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "SABERES",
      nombre: "Saberes y Pensamiento Científico",
      asignaturas: [
        {
          id: "SABERES_PRE",
          nombre: "Saberes y Pensamiento Científico (Preescolar)",
          grados: ["1º de Preescolar", "2º de Preescolar", "3º de Preescolar"],
          contenidos: [
            {
              id: "f2-sab-1",
              contenido: "Exploración de la diversidad natural que existe en la comunidad y en otros lugares.",
              pdas: {
                "1º de Preescolar": [
                  "Usa sus sentidos para percibir plantas y animales cercanos y describe características como color, olor, forma y tamaño.",
                  "Indaga sobre los cuidados que necesitan las plantas y los animales de su comunidad."
                ],
                "2º de Preescolar": [
                  "Observa y describe cómo crecen los seres vivos, qué comen y realiza experimentos sencillos sobre su entorno."
                ],
                "3º de Preescolar": [
                  "Distingue características del entorno natural, establece formas de organizar a los seres vivos y comunica y registra hallazgos."
                ]
              }
            },
            {
              id: "f2-sab-2",
              contenido: "Los saberes numéricos como herramienta para resolver situaciones del entorno, en diversos contextos socioculturales.",
              pdas: {
                "1º de Preescolar": [
                  "Reconoce números en su contexto (edad, talla, canciones) y cuenta objetos de su hogar y escuela con distintos propósitos."
                ],
                "2º de Preescolar": [
                  "Dice en orden los números que conoce, amplía su rango de conteo y resuelve colaborativamente situaciones de juntar o quitar."
                ],
                "3º de Preescolar": [
                  "Dice la serie numérica en orden, construye y compara colecciones, y usa números ordinales para expresar posiciones."
                ]
              }
            },
            {
              id: "f2-sab-3",
              contenido: "El dominio del espacio y reconocimiento de formas en el entorno desde diversos puntos de observación.",
              pdas: {
                "1º de Preescolar": [
                  "Usa el espacio inmediato al desplazarse y asocia formas cotidianas con figuras geométricas básicas."
                ],
                "2º de Preescolar": [
                  "Ubica objetos con referentes personales (arriba, abajo, adelante, atrás) e identifica figuras geométricas en el entorno."
                ],
                "3º de Preescolar": [
                  "Interpreta y comunica recorridos y trayectorias espaciales (cerca, lejos, derecha, izquierda) y construye figuras con tangram."
                ]
              }
            },
            {
              id: "f2-sab-4",
              contenido: "Las magnitudes de longitud, peso, capacidad y tiempo en situaciones cotidianas del hogar y del entorno.",
              pdas: {
                "1º de Preescolar": [
                  "Compara a ojo la longitud de objetos (más largo/corto), distingue pesados/ligeros y trasvasa líquidos."
                ],
                "2º de Preescolar": [
                  "Compara longitud por superposición directa, sopesa objetos y usa palabras de tiempo (antes, después, hoy, mañana)."
                ],
                "3º de Preescolar": [
                  "Estima y mide con unidades no convencionales, usa balanzas y percibe el paso del tiempo con calendarios y relojes."
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "ETICA",
      nombre: "Ética, Naturaleza y Sociedades",
      asignaturas: [
        {
          id: "ETICA_PRE",
          nombre: "Ética, Naturaleza y Sociedades (Preescolar)",
          grados: ["1º de Preescolar", "2º de Preescolar", "3º de Preescolar"],
          contenidos: [
            {
              id: "f2-et-1",
              contenido: "Interacción, cuidado, conservación y regeneración de la naturaleza, que favorece la construcción de una conciencia socioambiental.",
              pdas: {
                "1º de Preescolar": [
                  "Convive con su entorno natural, manifiesta actitudes de cuidado hacia seres vivos y evita acciones que dañen a las plantas."
                ],
                "2º de Preescolar": [
                  "Reconoce la importancia de elementos como aire, sol, agua y suelo para la vida y promueve acciones de cuidado en familia."
                ],
                "3º de Preescolar": [
                  "Interactúa con respeto y empatía con la naturaleza y propone soluciones creativas ante problemas como la basura y contaminación."
                ]
              }
            },
            {
              id: "f2-et-2",
              contenido: "Construcción de la identidad y pertenencia a una comunidad y país a partir del conocimiento de su historia y celebraciones.",
              pdas: {
                "1º de Preescolar": [
                  "Comparte lo que entiende del significado de celebraciones y conmemoraciones de su comunidad y disfruta de su música y danza."
                ],
                "2º de Preescolar": [
                  "Construye un sentido de pertenencia al interpretar tradiciones y conocer lugares históricos o culturales de su localidad."
                ],
                "3º de Preescolar": [
                  "Aprecia la historia de su comunidad a través de leyendas y relatos y explica el significado de los símbolos patrios."
                ]
              }
            },
            {
              id: "f2-et-3",
              contenido: "Los derechos de niñas y niños como base para el bienestar integral y el establecimiento de acuerdos de convivencia pacífica.",
              pdas: {
                "1º de Preescolar": [
                  "Se familiariza con sus derechos básicos (familia, salud, juego, nombre y escuela) en situaciones cotidianas."
                ],
                "2º de Preescolar": [
                  "Reconoce que todas las niñas y niños tienen derechos sin distinción y establece acuerdos para mejorar la convivencia."
                ],
                "3º de Preescolar": [
                  "Explica con sus palabras qué son los derechos de las niñas y los niños y difunde el valor de la convivencia pacífica."
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: "HUMANO",
      nombre: "De lo Humano y lo Comunitario",
      asignaturas: [
        {
          id: "HUMANO_PRE",
          nombre: "De lo Humano y lo Comunitario (Preescolar)",
          grados: ["1º de Preescolar", "2º de Preescolar", "3º de Preescolar"],
          contenidos: [
            {
              id: "f2-hum-1",
              contenido: "Construcción de la identidad personal a partir de su pertenencia a un territorio, su origen étnico, cultural y lingüístico.",
              pdas: {
                "1º de Preescolar": [
                  "Descubre gustos, preferencias y posibilidades afectivas y motrices en juegos que favorecen el autoconocimiento."
                ],
                "2º de Preescolar": [
                  "Reconoce rasgos de su identidad (físicos, gustos, nombre) y respeta las diversas formas de ser de sus compañeros."
                ],
                "3º de Preescolar": [
                  "Identifica que su lengua, costumbres familiares y comunidad forman su identidad y muestra confianza al interactuar."
                ]
              }
            },
            {
              id: "f2-hum-2",
              contenido: "Posibilidades de movimiento en diferentes espacios, para favorecer las habilidades motrices.",
              pdas: {
                "1º de Preescolar": [
                  "Explora posibilidades de movimiento de su cuerpo en juegos variados y descubre nuevas formas de desplazamiento."
                ],
                "2º de Preescolar": [
                  "Mantiene el control y equilibrio de distintos segmentos corporales (girar, brincar, pararse en un pie)."
                ],
                "3º de Preescolar": [
                  "Coordina movimientos con control y precisión en juegos tradicionales y actividades colectivas sin distinción de género."
                ]
              }
            },
            {
              id: "f2-hum-3",
              contenido: "Las emociones en la interacción con diversas personas y situaciones.",
              pdas: {
                "1º de Preescolar": [
                  "Identifica emociones básicas como alegría, tristeza, miedo o enojo al participar en juegos y expresa lo que siente."
                ],
                "2º de Preescolar": [
                  "Nombra las emociones que experimenta, reconoce las situaciones que las provocan y pide ayuda cuando la necesita."
                ],
                "3º de Preescolar": [
                  "Establece vínculos afectivos y de empatía con sus pares y dialoga para resolver desacuerdos sin recurrir a la agresividad."
                ]
              }
            },
            {
              id: "f2-hum-4",
              contenido: "Cuidado de la salud personal y colectiva, al llevar a cabo acciones de higiene, limpieza y actividad física.",
              pdas: {
                "1º de Preescolar": [
                  "Practica hábitos de higiene personal y limpieza en los espacios físicos como medida de prevención de enfermedades."
                ],
                "2º de Preescolar": [
                  "Realiza acciones de higiene antes, durante y después de sus actividades y disfruta de hacer ejercicio físico."
                ],
                "3º de Preescolar": [
                  "Propone acciones que contribuyen a su salud (lavado de manos, cepillado dental, hidratación) y acuerdos saludables."
                ]
              }
            }
          ]
        }
      ]
    }
  ]
};

// -------------------------------------------------------------
// COLECCIÓN COMPLETA DE TODAS LAS FASES DE LA NEM
// -------------------------------------------------------------
export const TODAS_LAS_FASES: NemFase[] = [
  FASE_2_PREESCOLAR,
  FASE_3_PRIMARIA,
  FASE_4_PRIMARIA,
  FASE_5_PRIMARIA,
  FASE_6_SECUNDARIA,
];

// -------------------------------------------------------------
// FUNCIONES AUXILIARES PARA MENÚS DESPLEGABLES EN CASCADA
// -------------------------------------------------------------

/**
 * Obtiene la fase correspondiente según el nivel educativo y grado.
 */
export function getFaseByNivelGrado(nivel: string, grado: string): NemFase | undefined {
  if (nivel === "Preescolar") return FASE_2_PREESCOLAR;
  if (nivel === "Secundaria") return FASE_6_SECUNDARIA;
  if (nivel === "Primaria") {
    if (grado === "Primer Grado" || grado === "Segundo Grado") return FASE_3_PRIMARIA;
    if (grado === "Tercer Grado" || grado === "Cuarto Grado") return FASE_4_PRIMARIA;
    return FASE_5_PRIMARIA;
  }
  return FASE_6_SECUNDARIA;
}

/**
 * Obtiene la lista de grados válidos según el nivel educativo.
 */
export function getGradosPorNivel(nivel: string): string[] {
  if (nivel === "Preescolar") {
    return ["1º de Preescolar", "2º de Preescolar", "3º de Preescolar"];
  }
  if (nivel === "Primaria") {
    return ["Primer Grado", "Segundo Grado", "Tercer Grado", "Cuarto Grado", "Quinto Grado", "Sexto Grado"];
  }
  // Secundaria
  return ["Primer Grado", "Segundo Grado", "Tercer Grado"];
}

/**
 * Obtiene los campos formativos disponibles para un nivel y grado.
 */
export function getCamposFormativos(nivel: string, grado: string): NemCampoFormativo[] {
  const fase = getFaseByNivelGrado(nivel, grado);
  return fase ? fase.camposFormativos : FASE_6_SECUNDARIA.camposFormativos;
}

/**
 * Obtiene las asignaturas/disciplinas disponibles para un nivel, grado y campo formativo.
 */
export function getAsignaturasPorCampo(nivel: string, grado: string, campoId: string): NemAsignatura[] {
  const campos = getCamposFormativos(nivel, grado);
  const campoEncontrado = campos.find((c) => c.id === campoId);
  if (!campoEncontrado) return [];

  // Filtrar asignaturas que tengan contenidos para ese grado
  return campoEncontrado.asignaturas.filter((asig) => {
    if (asig.grados && asig.grados.length > 0) {
      return asig.grados.includes(grado);
    }
    return true;
  });
}

import { getOficialContenidos, getOficialPdas, normalizeCampoFormativo, normalizeDisciplina } from "./nemCurriculumService";

/**
 * Obtiene la lista de contenidos de un campo/asignatura para un grado específico.
 * Garantiza la carga del 100% del catálogo oficial de la NEM.
 */
export function getContenidosPorFiltro(
  nivel: string,
  grado: string,
  campoId: string,
  asignaturaId: string
): NemContenido[] {
  // Primero consultar el servicio integral oficial
  const official = getOficialContenidos(nivel, grado, campoId, asignaturaId);
  if (official && official.length > 0) {
    return official.map((item) => ({
      id: item.id,
      contenido: item.contenido,
      pdas: {
        [grado]: item.pdas
      }
    }));
  }

  // Respaldo sobre estructura estática
  const asignaturas = getAsignaturasPorCampo(nivel, grado, campoId);
  const asig = asignaturas.find((a) => a.id === asignaturaId) || asignaturas[0];
  if (!asig) return [];

  return asig.contenidos.filter((cont) => {
    const pdaGrado = cont.pdas[grado];
    return Array.isArray(pdaGrado) && pdaGrado.length > 0;
  });
}

/**
 * Obtiene los Procesos de Desarrollo de Aprendizaje (PDA) específicos vinculados a un contenido y grado.
 * Garantiza la recuperación de todos los PDAs sin omisiones.
 */
export function getPdasPorContenido(
  nivel: string,
  grado: string,
  campoId: string,
  asignaturaId: string,
  contenidoTexto: string
): string[] {
  const officialPdas = getOficialPdas(nivel, grado, campoId, asignaturaId, contenidoTexto);
  if (officialPdas && officialPdas.length > 0) {
    return officialPdas;
  }

  const contenidos = getContenidosPorFiltro(nivel, grado, campoId, asignaturaId);
  const match = contenidos.find((c) => c.contenido === contenidoTexto);
  if (!match) return [];
  return match.pdas[grado] || [];
}

export const CAMPO_FORMATIVO_LABELS: Record<string, string> = {
  "lenguajes": "Lenguajes",
  "SABERES": "Saberes y Pensamiento Científico",
  "ETICA": "Ética, Naturaleza y Sociedades",
  "ETICA NyS": "Ética, Naturaleza y Sociedades",
  "HUMANO": "De lo Humano y lo Comunitario",
  "HUMANO Y C": "De lo Humano y lo Comunitario"
};

export const DISCIPLINA_LABELS: Record<string, string> = {
  "ESPAÑOL": "Lengua Materna: Español",
  "INGLES": "Lengua Extranjera: Inglés",
  "ARTES": "Artes",
  "MATEMATICAS": "Matemáticas",
  "BIOLOGIA": "Ciencias I: Biología",
  "FISICA": "Ciencias II: Física",
  "QUIMICA": "Ciencias III: Química",
  "GEOGRAFIA": "Geografía",
  "HISTORIA": "Historia",
  "FCYE": "Formación Cívica y Ética",
  "TECNOLOGIA": "Tecnología",
  "TUTORIA": "Educación Socioemocional / Tutoría",
  "EDUCACION_FISICA": "Educación Física",
  "CAMPOS_INTEGRADOS": "Campos Integrados",
  "PREESCOLAR": "Educación Preescolar",
  "PRIMARIA": "Educación Primaria"
};

