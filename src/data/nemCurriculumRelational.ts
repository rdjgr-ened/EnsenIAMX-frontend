// Catálogo Curricular Oficial de la Nueva Escuela Mexicana (NEM) extraído de Supabase
// Plan de Estudios 2022-2026 - Fases 2, 3, 4, 5 y 6 (Total: 922 Contenidos limpios, 2029 PDAs)

export interface NemPdaRelacional {
  pda_id: string;
  descripcion: string;
  orden: number;
}

export interface NemContenidoRelacional {
  fase: string;
  nivel: string;
  campo_formativo: string;
  disciplina?: string;
  grado: string;
  contenido_id: string;
  contenido: string;
  pdas: NemPdaRelacional[];
}

export const NEM_CURRICULUM_DATA: NemContenidoRelacional[] = [
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_1",
    "contenido": "Construcción de la identidad personal a partir de su pertenencia a un territorio, su origen étnico, cultural y lingüístico, y la interacción con personas cercanas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_1_1",
        "descripcion": "Descubre gustos, preferencias, posibilidades motrices y afectivas, en juegos y actividades que contribuyan al conocimiento de sí, en un ambiente que considere la diversidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_1_2",
        "descripcion": "Describe cómo es físicamente, identifica sus rasgos familiares y se acepta como es.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_1_3",
        "descripcion": "Representa la imagen que tiene de sí, a través del modelado, dibujo, pintura y otros recursos de los lenguajes artísticos, y respeta las producciones de sus pares.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_2",
    "contenido": "Consumo de alimentos y bebidas que benefician la salud, de acuerdo con los contextos socioculturales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_2_1",
        "descripcion": "Expresa gustos y preferencias de bebidas y alimentos que hay en su comunidad, al explorar aromas, colores, texturas y sabores, guardando medidas de seguridad e higiene.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_2_2",
        "descripcion": "Reconoce, en las costumbres familiares, la preparación y consumo de alimentos y bebidas, e identifica los que son saludables y los que ponen en riesgo la salud.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_2_3",
        "descripcion": "Practica hábitos de higiene y limpieza en el consumo y preparación de alimentos y bebidas.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_3",
    "contenido": "Cuidado de la salud personal y colectiva, al llevar a cabo acciones de higiene, limpieza, y actividad física, desde los saberes prácticos de la comunidad y la información científica.",
    "pdas": [
      {
        "pda_id": "PDA_SB_3_1",
        "descripcion": "Practica hábitos de higiene personal y limpieza en los espacios físicos donde se desenvuelve y al usar objetos, como medidas de conservación de la salud y de prevención de enfermedades.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_3_2",
        "descripcion": "Reconoce los beneficios que la actividad física, la alimentación y los hábitos de higiene personal y limpieza aportan al cuidado de la salud.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_3_3",
        "descripcion": "Consulta, con ayuda, y dialoga con personas de la comunidad o especialistas en el cuidado de la salud infantil, las medidas de prevención de enfermedades y conservación de la salud.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_4",
    "contenido": "Interacción con personas de diversos contextos, que contribuyan al establecimiento de relaciones positivas y a una convivencia basada en la aceptación de la diversidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_4_1",
        "descripcion": "Interactúa con diferentes compañeras y compañeros, para establecer relaciones de amistad, igualdad, empatía y colaboración.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_4_2",
        "descripcion": "Identifica las consecuencias positivas o negativas de sus comportamientos ante distintas situaciones y fomenta con sus pares, aquellos que promueven una sana y positiva convivencia.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_4_3",
        "descripcion": "Participa y respeta acuerdos de convivencia en juegos y actividades que implican compartir materiales, establecer turnos, seguir reglas, escuchar con atención, entre otros.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_5",
    "contenido": "Las emociones en la interacción con diversas personas y situaciones.",
    "pdas": [
      {
        "pda_id": "PDA_SB_5_1",
        "descripcion": "Identifica emociones como alegría, tristeza, sorpresa, miedo o enojo, al participar en juegos de representación.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_5_2",
        "descripcion": "Expresa lo que siente o le provocan algunas situaciones, seres vivos o personas con las que interactúa en su vida cotidiana, usando diferentes recursos de los lenguajes.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_5_3",
        "descripcion": "Escucha con empatía a sus pares, cuando hablan acerca de personas que les generan confianza o incomodidad, y de situaciones o seres vivos que les provocan agrado o desagrado.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_5_4",
        "descripcion": "Reconoce o se percata cuando sus pares necesitan ayuda para recuperar la calma o mantener un estado de bienestar, y ofrece su apoyo.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_6",
    "contenido": "Medidas de prevención de accidentes y situaciones de riesgo de acuerdo con el contexto, para el cuidado de la integridad personal y colectiva.",
    "pdas": [
      {
        "pda_id": "PDA_SB_6_1",
        "descripcion": "Explora los espacios físicos de su casa, escuela y comunidad para identificar las zonas de seguridad que le permitan mantener su integridad en caso de situaciones de riesgo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_6_2",
        "descripcion": "Identifica acciones, situaciones y comportamientos en los que puede lastimarse o lastimar a las demás personas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_6_3",
        "descripcion": "Comparte con sus pares ideas acerca de cómo cuidar su integridad y la de las demás personas, y con ayuda, las pone en práctica.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_6_4",
        "descripcion": "Propone de manera colaborativa y lleva a cabo, acuerdos que contribuyen a evitaraccidentes o lesiones al manipular objetos y materiales, así como a usar con seguridad los espacios de juego y actividades en casa, escuela y comunidad.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_7",
    "contenido": "Posibilidades de movimiento en diferentes espacios, para favorecer las habilidades motrices.",
    "pdas": [
      {
        "pda_id": "PDA_SB_7_1",
        "descripcion": "Explora las posibilidades de movimiento de su cuerpo, en juegos y actividades, de acuerdo con las características y condiciones personales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_7_2",
        "descripcion": "Imita y descubre movimientos y posturas, involucrando distintos segmentos corporales que favorecen el control y la lateralidad.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_7_3",
        "descripcion": "Describe las sensaciones que percibe en su cuerpo al realizar movimientos o mantener ciertas posturas.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_8",
    "contenido": "Precisión y coordinación en los movimientos al usar objetos, herramientas y materiales, de acuerdo con las condiciones, capacidades y características.",
    "pdas": [
      {
        "pda_id": "PDA_SB_8_1",
        "descripcion": "Explora y manipula objetos, herramientas y materiales de distintas formas, texturas y tamaños.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_8_2",
        "descripcion": "Participa en juegos y actividades que involucran la coordinación de movimientos, usando los sentidos, en acciones como lanzar, amasar, patear, entre otras.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_8_3",
        "descripcion": "Usa objetos, herramientas y materiales pertinentes que le ayudan a resolver situaciones específicas y cotidianas en casa y escuela.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_9",
    "contenido": "Comunicación oral de necesidades, emociones, gustos, ideas y saberes, a través de los diversos lenguajes, desde una perspectiva comunitaria.",
    "pdas": [
      {
        "pda_id": "PDA_SB_9_1",
        "descripcion": "Emplea palabras, gestos, señas, imágenes, sonidos o movimientos corporales que aprende en su comunidad, para expresar necesidades, ideas, emociones y gustos que reflejan su forma de interpretar y actuar en el mundo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_9_2",
        "descripcion": "Reconoce que cuando juega y socializa con sus pares, se expresan desde sus posibilidades, vivencias y cultura.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_9_3",
        "descripcion": "Espera su turno al participar en una conversación con sus compañeras o compañeros",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_10",
    "contenido": "Expresión de emociones y experiencias, en igualdad de oportunidades, apoyándose de recursos gráficos personales y de los lenguajes artísticos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_10_1",
        "descripcion": "Representa emociones y experiencias de manera gráfica, haciendo uso de dibujos o recursos de los lenguajes artísticos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_10_2",
        "descripcion": "Presta atención a las producciones que comparten sus pares, y expresa lo que le provocan.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_10_3",
        "descripcion": "Describe, en su producción gráfica: cómo se siente, por qué se siente así, lo que le provoca, o bien, relata lo que le sucedió.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_10_4",
        "descripcion": "Reconoce que las producciones gráficas, son una forma de establecer comunicación o vínculos con otras personas.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_11",
    "contenido": "Narración de historias mediante diversos lenguajes, en un ambiente donde todas las niñas y todos los niños, participen y se apropien de la cultura, a través de los diferentes textos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_11_1",
        "descripcion": "Evoca y narra fragmentos de diferentes textos literarios leyendas, cuentos, fábulas, historias y relatos de la comunidad, que escucha en voz de otras personas que las narran o leen. Comparte las emociones que le provocan.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_11_2",
        "descripcion": "Describe lugareso personajes de las historias o textos literarios que conoce y los relaciona con personas, paisajes y otros elementos de su comunidad.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_11_3",
        "descripcion": "Explica lo que interpreta y entiendede las historias y textos literarios que conoce o escucha.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_12",
    "contenido": "Producciones gráficas dirigidas a diversas destinatarias y diversos destinatarios, para establecer vínculos sociales y acercarse a la cultura escrita.",
    "pdas": [
      {
        "pda_id": "PDA_SB_12_1",
        "descripcion": "Elabora producciones gráficas (mensajes, avisos, recados, entre otros) con marcas propias, dibujos o por medio del dictado, para informar algo a diferentes personas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_12_2",
        "descripcion": "Identifica su nombre escrito y otras palabras en distintos objetos personales del aula o su casa.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_12_3",
        "descripcion": "Encuentra semejanzas, ya sea por las grafías o los sonidos, con los nombres de sus pares.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_13",
    "contenido": "Producción de expresiones creativas con los distintos elementos de los lenguajes artísticos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_13_1",
        "descripcion": "Experimenta con los diversos elementos de los lenguajes artísticos y descubre sus posibilidades de creación y expresión.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_13_2",
        "descripcion": "Produce expresiones creativas para representar el mundo cercano, experiencias de su vida personal, familiar, la naturaleza que lo rodea o creaciones de su imaginación, recurriendo a los distintos recursos de las artes.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_13_3",
        "descripcion": "Muestra sensibilidad hacia las producciones de sus pares.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_14",
    "contenido": "Reconocimiento de ideas o emociones en la interacción con manifestaciones culturales y artísticas, y con la naturaleza, a través de diversos lenguajes.",
    "pdas": [
      {
        "pda_id": "PDA_SB_14_1",
        "descripcion": "Describe características de manifestaciones culturales y artísticas de la comunidad, como los colores, texturas, tamaños, sonidos, posturas que reconoce, entre otros elementos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_14_2",
        "descripcion": "Comenta lo que le gusta, le provocan o le hacen sentir las manifestaciones artísticas o culturales de la comunidad (esculturas, pinturas, obras de teatro, entre otras).",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_14_3",
        "descripcion": "Identifica emociones a partir de los elementos que componen las manifestaciones culturales y artísticas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_14_4",
        "descripcion": "Interpreta manifestaciones artísticas y culturales diversas (fotografías, música, regional, murales, danzas, entre otras) a partir de los elementos que las componen.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_15",
    "contenido": "Reconocimiento y aprecio de la diversidad lingüística, al identificar las formas en que se comunican las distintas personas de la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_15_1",
        "descripcion": "Reconoce que hay personas que se comunican en lenguas distintas a la propioa.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_15_2",
        "descripcion": "Identifica los distintos lenguajes que usan las personas a su alrededor.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_16",
    "contenido": "Recursos y juegos del lenguaje que fortalecen la diversidad de formas de expresión oral, y que rescatan la o las lenguas de la comunidad y de otros lugares.",
    "pdas": [
      {
        "pda_id": "PDA_SB_16_1",
        "descripcion": "Participa en juegos del lenguaje de la tradición oral de las familias o la comunidad y los expresa con fluidez.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_16_2",
        "descripcion": "Combina recursos de los lenguajes, tales como movimientos corporales, gestos, velocidades, ritmos, entre otros, al decir rimas, poemas, canciones, retahílas, trabalenguas, adivinanzas y otros juegos del lenguaje.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_16_3",
        "descripcion": "Descubre en los juegos del lenguaje, palabras nuevas y se interesa por saber su significado.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_17",
    "contenido": "Representación gráfica de ideas y descubrimientos, al explorar los diversos textos que hay en su comunidad y otros lugares.",
    "pdas": [
      {
        "pda_id": "PDA_SB_17_1",
        "descripcion": "Explora y descubre diversos textos de su hogar y escuela, como cuentos, carteles, letreros o mensajes, e interpreta qué dicen a partir de las imágenes y marcas gráficas, e identifica para qué sirven.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_17_2",
        "descripcion": "Relaciona el contenido de los diversos textos de su hogar y escuela con sus experiencias de vida.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_18",
    "contenido": "Características de objetos y comportamiento de los materiales del entorno sociocultural",
    "pdas": [
      {
        "pda_id": "PDA_SB_18_1",
        "descripcion": "Observa y explora los materiales con los que están hechos los objetos, a través de juegos y actividades diversas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_18_2",
        "descripcion": "Reconoce en los objetos y elementos, algunas características de consistencia, forma, tamaño, color, textura o maleabilidad y si provienen de la naturaleza o los fabricó el ser humano.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_18_3",
        "descripcion": "Escucha los sonidos que producen los objetos de su entorno y los reproduce con algunas partes del cuerpo u objetos.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_19",
    "contenido": "Clasificación y experimentación con objetos y elementos del entorno que reflejan la diversidad de la comunidad o región.",
    "pdas": [
      {
        "pda_id": "PDA_SB_19_1",
        "descripcion": "Identifica de manera intuitiva la forma en que se organizan los objetos en su hogar y escuela: lo que hay en la cocina, en la sala, en los estantes de su escuela, en el espacio escolar, entre otros",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_19_2",
        "descripcion": "Explora las características de elementos y objetos de su entorno y establece con sus pares, semejanzas y diferencias; usa materiales del arte para representarlas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_19_3",
        "descripcion": "Observa y manipula objetos a su alcance para explorar sus características y experimentar con ellos, siguiendo normas de seguridad.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_20",
    "contenido": "El dominio del espacio y reconocimiento de formas en el entorno desde diversos puntos de observación y mediante desplazamientos o recorridos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_20_1",
        "descripcion": "Usa en el espacio inmediato al desplazarse y hacer recorridos en los que ubica, de manera intuitiva, la posición de objetos y personas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_20_2",
        "descripcion": "Reconoce algunas características del paisaje geográfico y usa referencias personales para ubicar elementos, objetos y lugares.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_20_3",
        "descripcion": "Visualiza y describe con su propio lenguaje y en su lengua materna algunas características de forma en objetos cotidianos y las asocia con cuerpos geométricos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_20_4",
        "descripcion": "Reconoce patrones de repetición y crecimiento.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_20_5",
        "descripcion": "Construye y reproduce objetos, figuras y escenarios (una torre, una casa, un monumento o un paisaje, entre otros) con bloques, materiales de arte y del entorno.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_21",
    "contenido": "Exploración de la diversidad natural que existe en la comunidad y en otros lugares.",
    "pdas": [
      {
        "pda_id": "PDA_SB_21_1",
        "descripcion": "Usa sus sentidos para percibir en su entorno cercano plantas que le llaman la atención y describe características tales como: olor, color, forma, textura o tamaño, si tienen hojas, flores o frutos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_21_2",
        "descripcion": "Socializa lo que sabe sobre su entorno natural y hace nuevos descubrimientos con sus pares.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_21_3",
        "descripcion": "Indaga sobre los cuidados que necesitan las plantas y los animales de su comunidad.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_21_4",
        "descripcion": "Experimenta con elementos de la naturaleza para observar los cambios que ocurren y comunica a otros lo que sucedió.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_22",
    "contenido": "Las magnitudes de longitud, peso, capacidad y tiempo en situaciones cotidianas del hogar y del entorno sociocultural.",
    "pdas": [
      {
        "pda_id": "PDA_SB_22_1",
        "descripcion": "Compara “a ojo” y de manera perceptiva, la longitud de dos objetos y dice cuál es más largo o corto.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_22_2",
        "descripcion": "Estima y expresa si un camino es más largo o corto que otro.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_22_3",
        "descripcion": "Distingue objetos pesados y ligeros.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_22_4",
        "descripcion": "Trasvasa líquidos con diferentes propósitos y se familiariza con lo que le cabe a un recipiente.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_22_5",
        "descripcion": "Ordena actividades cotidianas y juegos que lleva a cabo en su casa y escuela, para identificar el paso del tiempo (desde que se levanta hasta que llega a la escuela o secuencias en los juegos).",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_23",
    "contenido": "Los saberes numéricos como herramienta para resolver situaciones del entorno, en diversos contextos socioculturales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_23_1",
        "descripcion": "Reconoce números en su contexto sociocultural e interpreta su significado (saber la dirección de su casa, su peso o talla, hacer compras, entre otros).",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_23_2",
        "descripcion": "Dice en su lengua materna, números en canciones o juegos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_23_3",
        "descripcion": "Usa números en juegos y situaciones cotidianas de su entorno.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_23_4",
        "descripcion": "Interpreta situaciones numéricas que se le plantean y estima sus resultados.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_23_5",
        "descripcion": "Cuenta objetos de su hogar y escuela con diferentes propósitos.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_24",
    "contenido": "Los seres vivos: elementos, procesos y fenómenos naturales que ofrecen oportunidades para entender y explicar hechos cotidianos, desde distintas perspectivas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_24_1",
        "descripcion": "Hace preguntas sobre elementos de la naturaleza que le dan curiosidad, y las enriquece con las de sus pares..",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_24_2",
        "descripcion": "Examina el entorno natural con sus sentidos, de manera guiada, para resolver sus dudas y aprender cosas nuevas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_24_3",
        "descripcion": "Comparte sus descubrimientos, ideas y opiniones sobre los seres vivos, y escucha las de sus pares.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_24_4",
        "descripcion": "Dice sus ideas acerca de cómo suceden y por qué ocurren algunos fenómenos naturales de su entorno: lluvia, el arcoiris, la neblina o las olas, entre otros.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_24_5",
        "descripcion": "Observa y nombra en su lengua materna las partes de su cuerpo, en situaciones cotidianas e intuye su funcionamiento.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_25",
    "contenido": "Objetos y artefactos tecnológicos que mejoran y facilitan la vida familiar y de la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_25_1",
        "descripcion": "Usa en su vida diaria juguetes y artefactos tecnológicos que se encuentran en su hogar o escuela, observa cómo se usan: carritos, muñecos, tijeras, mecedoras, utensilios de cocina, entre otros.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_25_2",
        "descripcion": "Plantea ideas acerca de cómo supone que funcionan los juguetes o artefactos tecnológicos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_25_3",
        "descripcion": "Encuentra formas creativas de usar juguetes, objetos y artefactos tecnológicos que tiene a su alcance.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_26",
    "contenido": "Saberes familiares y comunitarios que resuelven situaciones y necesidades en el hogar y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_26_1",
        "descripcion": "Identifica saberes familiares que son útiles para la vida, sin poner en riesgo su integridad física y la de las otras personas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_26_2",
        "descripcion": "Comparte algunos saberes familiares con sus pares y descubre similitudes con los de otras familias.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_26_3",
        "descripcion": "Se familiariza con historias, mitos y leyendas de la tradición oral de la comunidad que explican fenómenos de la naturaleza.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_27",
    "contenido": "Cambios que ocurren en los lugares, objetos, costumbres y formas de vida de las distintas familias y comunidades con el paso del tiempo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_27_1",
        "descripcion": "Recuerda y comparte acontecimientos importantes en su historia personal con apoyo de fotografías, objetos y narraciones de integrantes de su familia, y se percata de cómo ha cambiado.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_27_2",
        "descripcion": "Observa las similitudes y diferencias entre los sucesos importantes de las distintas familias en la convivencia diaria, como cumpleaños, celebraciones o eventos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_28",
    "contenido": "Construcción de la identidad y pertenencia a una comunidad y país a partir del conocimiento de su historia, sus celebraciones, conmemoraciones tradicionales y obras del patrimonio artístico y cultural.",
    "pdas": [
      {
        "pda_id": "PDA_SB_28_1",
        "descripcion": "Comparte con sus pares lo que entiende del significado de algunas celebraciones y conmemoraciones de su comunidad en las que participa o ha participado.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_28_2",
        "descripcion": "Participa, disfruta y aprecia las celebraciones y eventos culturales y artísticos de su comunidad.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_28_3",
        "descripcion": "Se interesa en elementos característicos de su comunidad, como la música, la danza, el baile o los objetos tradicionales.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_29",
    "contenido": "Interacción, cuidado, conservación y regeneración de la naturaleza, que favorece la construcción de una conciencia ambiental.",
    "pdas": [
      {
        "pda_id": "PDA_SB_29_1",
        "descripcion": "Convive con su entorno natural, con plantas y animales; expresa lo que percibe y disfruta acerca de ellos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_29_2",
        "descripcion": "Manifiesta actitudes de cuidado y empatía hacia los seres vivos y evita modificar sus condiciones naturales de vida al interactuar con ellos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_29_3",
        "descripcion": "Intuya que, al cuidar a la naturaleza, cuida de sí y de las demás personas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_29_4",
        "descripcion": "Identifica acciones que detererioram la naturaleza las evita, e invita a sus paresa a cuidarla.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_30",
    "contenido": "La cultura de paz como una forma de relacionarse con otras personas para promover la inclusión y el respeto a la diversidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_30_1",
        "descripcion": "Establece acuerdos de convivencia en su salón y escuela para desenvolverse en un ambiente seguro y respetuoso.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_30_2",
        "descripcion": "Conversa con sus pares acerca de lo que para ella o él significa la paz, y nutre su concepción a partir de ello.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_30_3",
        "descripcion": "Colabora con la cultura de paz en su hogar y escuela, al convivir de manera respetuosa y armónica.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_31",
    "contenido": "La diversidad de personas y familias en la comunidad y su convivencia, en un ambiente de equidad, libertad, inclusión y respeto a los derechos humanos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_31_1",
        "descripcion": "Comparte con sus pares información personal acerca de sus gustos, familia, emociones, identidad, entre otros.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_31_2",
        "descripcion": "Reconoce que es diferente a las y los demás y que esas diferencias enriquecen la convivencia.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_32",
    "contenido": "Labores y servicios que contribuyen al bien común de las distintas familias y comunidades.",
    "pdas": [
      {
        "pda_id": "PDA_SB_32_1",
        "descripcion": "Observa y conoce las labores y actividades que desarrollan los integrantes de su familia, e identifica que tienen un impacto en la comunidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_32_2",
        "descripcion": "Conoce a través de sus pares, las labores y actividades que desarrollan los integrantes de otras familias.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_32_3",
        "descripcion": "Se involucra gradualmente en las labores de su hogar y escuela en condiciones de equidad y se da cuenta de los beneficios que aporta.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_33",
    "contenido": "Los derechos de niñas y niños como base para el bienestar integral y el establecimiento de acuerdos que favorecen la convivencia pacífica.",
    "pdas": [
      {
        "pda_id": "PDA_SB_33_1",
        "descripcion": "Se familiariza con algunos de sus derechos, como vivir en una familia, derecho a la protección, a la salud, a jugar, a tener un nombre, una vivienda y acudir a la escuela, los cuales se manifiestan en situaciones cotidianas de su vida.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_33_2",
        "descripcion": "Reconoce algunos de sus derechos en voz de las personas adultas que le rodean y que garantizan su ejercicio, para todas las niñas y todos los niños sin distinción.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Preescolar",
    "contenido_id": "CONT_SB_34",
    "contenido": "Transformación responsable del entorno al satisfacer necesidades básicas de alimentación, vestido y vivienda.",
    "pdas": [
      {
        "pda_id": "PDA_SB_34_1",
        "descripcion": "Identifica objetos, prendas de vestir o alimentos que provienen de la naturaleza y los usa o consume de manera racional..",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_34_2",
        "descripcion": "Asocia los alimentos que consume, con los animales o plantas de los que provienen y evita el desperdicio.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_34_3",
        "descripcion": "Relaciona las prendas de vestir con los materiales utilizados para su elaboración, tales como algodón, seda, cuero o piel, y cuida sus prendas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_34_4",
        "descripcion": "Cuida los bienes que provienen de la naturaleza al satisfacer necesidades y promueve que las demás personas también lo hagan.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_35",
    "contenido": "Construcción de la identidad personal a partir de su pertenencia a un territorio, su origen étnico, cultural y lingüístico, y la interacción con personas cercanas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_35_1",
        "descripcion": "Reconoce algunos rasgos de su identidad, dice cómo es físicamente, qué se le facilita, qué se le dificulta, qué le gusta, qué no le gusta, y los expresa en su lengua materna o con otros lenguajes.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_35_2",
        "descripcion": "Distingue semejanzas y diferencias con las demás personas, a partir de distintos rasgos de identidad como su nombre, características físicas, formas de vestir, hablar, alimentarse, entre otros.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_35_3",
        "descripcion": "Identifica que todas y todos pertenecen a familias que son diversas y muestra respeto a las formas de ser, de pensar y de relacionarse con las y los demás.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_35_4",
        "descripcion": "Representa la imagen que tiene de sí y de sus pares con apoyo de diversos recursos de los lenguajes artísticos.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_36",
    "contenido": "Consumo de alimentos y bebidas que benefician la salud, de acuerdo con los contextos socioculturales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_36_1",
        "descripcion": "Distingue alimentos y bebidas que son saludables, así como los que ponen en riesgo la salud, y reconoce que existen opciones alimentarias sanas que contribuyen a una mejor calidad de vida para todas las personas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_36_2",
        "descripcion": "Indaga acerca de la comida tradicional de su comunidad y otras regiones, y aprecia la diversidad de alimentos y platillos saludables que se consumen en el país.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_36_3",
        "descripcion": "Cuida su salud al llevar a cabo medidas de seguridad, higiene y limpieza, en la preparación y consumo de alimentos y bebidas saludables.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_37",
    "contenido": "Cuidado de la salud personal y colectiva, al llevar a cabo acciones de higiene, limpieza, y actividad física, desde los saberes prácticos de la comunidad y la información científica.",
    "pdas": [
      {
        "pda_id": "PDA_SB_37_1",
        "descripcion": "Se familiariza con diversas prácticas que favorecen el cuidado de la salud desde la experiencia y visión de otras culturas, sin ponerse en riesgo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_37_2",
        "descripcion": "Busca con ayuda, información en diversas fuentes científicas acerca de las acciones que están a su alcance, para el cuidado de la salud personal y colectiva, y las pone en práctica.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_37_3",
        "descripcion": "Realiza acciones de higiene personal y limpieza, antes, durante y después de realizar sus actividades cotidianas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_37_4",
        "descripcion": "Disfruta de realizar actividades físicas y reconoce los beneficios para su salud.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_37_5",
        "descripcion": "Sabe a dónde o con quién acudir para mantener su salud o cuando tiene algún malestar físico o enfermedad.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_38",
    "contenido": "Interacción con personas de diversos contextos, que contribuyan al establecimiento de relaciones positivas y a una convivencia basada en la aceptación de la diversidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_38_1",
        "descripcion": "Interactúa con distintas personas en situaciones diversas, y establecen acuerdos para la participación, la organización y la convivencia.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_38_2",
        "descripcion": "Se relaciona con respeto y colabora de manera asertiva para el logro de propósitos comunes en juegos y actividades.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_38_3",
        "descripcion": "Manifiesta disposición para establecer acuerdos que beneficien a todas y todos a fin de convivir con respeto y tolerancia a las diferencias.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_38_4",
        "descripcion": "Conoce distintas alternativas para colaborar con la comunidad e integrarse a ella, de acuerdo con sus condiciones.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_39",
    "contenido": "Las emociones en la interacción con diversas personas y situaciones.",
    "pdas": [
      {
        "pda_id": "PDA_SB_39_1",
        "descripcion": "Percibe cambios corporales, y con ayuda, nombra las emociones que experimenta, como: alegría, tristeza, sorpresa, miedo o enojo, y reconoce las situaciones que las provocan.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_39_2",
        "descripcion": "Manifiesta a una persona adulta, de manera verbal o con otros lenguajes, si alguien le hace sentir incomodidad, le provoca miedo o inseguridad.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_39_3",
        "descripcion": "Indaga algunas medidas para aprender a pedir ayuda y ponerse a salvo, como gritar, correr, recurrir a una persona de confianza, entre otras.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_39_4",
        "descripcion": "Muestra respeto y empatía hacia la expresión de emociones de las personas, comprende cuando alguien necesita ayuda y la ofrece.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_40",
    "contenido": "Medidas de prevención de accidentes y situaciones de riesgo de acuerdo con el contexto, para el cuidado de la integridad personal y colectiva.",
    "pdas": [
      {
        "pda_id": "PDA_SB_40_1",
        "descripcion": "Expresa qué comportamientos, objetos, materiales y lugares pueden provocar accidentes y poner en riesgo la seguridad y el bienestar personal y colectivo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_40_2",
        "descripcion": "Lleva a cabo acciones para prevenir accidentes y salvaguardar su bienestar y seguridad, personales y colectivos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_40_3",
        "descripcion": "Reconoce las situaciones de riesgo provocadas por fenómenos naturales o por la acción humana, y sabe qué hacer y cómo reaccionar para salvaguardar su integridad.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_40_4",
        "descripcion": "Atiende medidas de seguridad para aprender cómo actuar antes, durante y después de una emergencia y cuidar su integridad y la de las demás personas.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_41",
    "contenido": "Posibilidades de movimiento en diferentes espacios, para favorecer las habilidades motrices.",
    "pdas": [
      {
        "pda_id": "PDA_SB_41_1",
        "descripcion": "Adapta sus movimientos y fortalece su lateralidad al desplazarse en espacios de la escuela, casa y comunidad en distintas direcciones y con velocidades variadas; descubre nuevas formas de moverse.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_41_2",
        "descripcion": "Mantiene el control y equilibrio de los distintos segmentos corporales tanto en situaciones estáticas (sostenerse en un pie, hacer una figura con el cuerpo, entre otras) como en movimientos sin desplazamiento (girar, brincar, etcétera).",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_41_3",
        "descripcion": "Explica los cambios que experimenta su cuerpo cuando realiza actividad física, y con ayuda, reconoce señales de dolor o malestar.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_42",
    "contenido": "Precisión y coordinación en los movimientos al usar objetos, herramientas y materiales, de acuerdo con las condiciones, capacidades y características.",
    "pdas": [
      {
        "pda_id": "PDA_SB_42_1",
        "descripcion": "Controla sus movimientos al usar objetos, herramientas y materiales en juegos y actividades de experimentación, creación personal y resolución de problemas, atendiendo las normas de seguridad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_42_2",
        "descripcion": "Descubre nuevas formas de coordinar sus movimientos al transportar objetos con alguna parte del cuerpo, caminar y lanzar una pelota, alternar el uso de manos y pies, entre otros.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_42_3",
        "descripcion": "Controla cada vez con mayor precisión sus movimientos en coordinación con sus sentidos, al jugar y realizar actividades.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_43",
    "contenido": ".",
    "pdas": [
      {
        "pda_id": "PDA_SB_43_1",
        "descripcion": "Muestra interés por indagar significados de palabras, frases o señas, y las incorpora a su comunicación como una forma de enriquecerla.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_44",
    "contenido": "Comunicación oral de necesidades, emociones, gustos, ideas y saberes, a través de los diversos lenguajes, desde una perspectiva comunitaria.",
    "pdas": [
      {
        "pda_id": "PDA_SB_44_1",
        "descripcion": "Manifiesta oralmente y de manera clara necesidades, emociones, gustos, preferencias e ideas, que construye en la convivencia diaria, y se da a entender apoyándose de distintos lenguajes.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_44_2",
        "descripcion": "Escucha con atención a sus pares y espera su turno para hablar.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_44_3",
        "descripcion": "Se interesa por lo que otras personas expresan, sienten y saben e intercambia sus puntos de vista.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_45",
    "contenido": "Expresión de emociones y experiencias, en igualdad de oportunidades, apoyándose de recursos gráficos personales y de los lenguajes artísticos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_45_1",
        "descripcion": "Elige algunos recursos gráficos, como marcas propias, símbolos, dibujos o algunos otrosde los lenguajes artísticos, al representar emociones y experiencias.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_45_2",
        "descripcion": "Observa las producciones de sus pares y expresa su opinión.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_45_3",
        "descripcion": "Intercambia ideas acerca de las producciones de sus compañeras y compañeros, y encuentra semejanzas con las propias.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_45_4",
        "descripcion": "Explica a otras personas lo que representan sus producciones gráficas (alguna emoción, experiencia, paisaje, ser vivo o persona).",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_46",
    "contenido": "Narración de historias mediante diversos lenguajes, en un ambiente donde todas las niñas y todos los niños, participen y se apropien de la cultura, a través de los diferentes textos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_46_1",
        "descripcion": "Lee con apoyo y narra con una secuencia lógica, diferentes textos literarios como leyendas, cuentos, fábulas, historias, y relatos de la comunidad, en las que aprecia otras formas de vida, de pensamiento y de comportamiento.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_46_2",
        "descripcion": "Narra con secuencia lógica, historias que conoce o inventa, y las acompaña con recursos de los lenguajes artísticos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_46_3",
        "descripcion": "Modifica eventos, lugares o personajes de distintas narraciones y textos literarios, utilizando recursos de los lenguajes que reflejan experiencias, emociones y vivencias propias relacionadas con su cultura.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_47",
    "contenido": "Producciones gráficas dirigidas a diversas destinatarias y diversos destinatarios, para establecer vínculos sociales y acercarse a la cultura escrita.",
    "pdas": [
      {
        "pda_id": "PDA_SB_47_1",
        "descripcion": "Reconoce que las producciones gráficas son importantes para mantener comunicación con su comunidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_47_2",
        "descripcion": "Produce textos o mensajes de interés, con formas gráficas personales, copiando textos o dictando a alguien, con distintos propósitos y destinatarios.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_47_3",
        "descripcion": "Representa su nombre y otras palabras comunes, con recursos propios y con distintos propósitos, tales como marcar sus producciones, registrar su asistencia, entre otros.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_47_4",
        "descripcion": "Distingue semejanzas y diferencias con los nombres de sus pares, por los sonidos, marcas gráficas o letras.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_48",
    "contenido": "Producción de expresiones creativas con los distintos elementos de los lenguajes artísticos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_48_1",
        "descripcion": "Combina elementos de los lenguajes artísticos, tales como formas, colores, texturas, tamaños, líneas, sonidos, música, voces, entre otros, en producciones creativas, para representar el mundo cercano, experiencias personales, situaciones imaginarias o algún cuento.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_48_2",
        "descripcion": "Aprecia con empatía las expresiones de otras personas.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_49",
    "contenido": "Reconocimiento de ideas o emociones en la interacción con manifestaciones culturales y artísticas, y con la naturaleza, a través de diversos lenguajes.",
    "pdas": [
      {
        "pda_id": "PDA_SB_49_1",
        "descripcion": "Interpreta manifestaciones artísticas y culturales diversas (fotografías, música regional, murales, danzas, entre otras) a partir de los elementos que las componen.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_49_2",
        "descripcion": "Explica lo que le provocan las manifestaciones artísticas y culturales; y escucha lo que sus pares comparten.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_49_3",
        "descripcion": "Comparte su experiencia estética con sus pares, al mencionar lo que le gusta, disgusta, lo que le provocan ciertos colores, formas, figuras, rostros, sonidos, posturas, entre otros elementos de las manifestaciones artísticas y culturales de su comunidad u otros lugares.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_49_4",
        "descripcion": "Relaciona en las manifestaciones artísticas culturales, sucesos, experiencias o emociones personales.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_49_5",
        "descripcion": "Reconoce que existen opiniones diferentes en torno a la diversidad de manifestaciones artísticas y culturales.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_50",
    "contenido": "Reconocimiento y aprecio de la diversidad lingüística, al identificar las formas en que se comunican las distintas personas de la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_50_1",
        "descripcion": "Se familiariza con lenguas distintas a la suya que escucha en su comunidad e incorpora a su comunicación, expresiones de origen indígena, extranjero o de las lenguas de señas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_51",
    "contenido": "Recursos y juegos del lenguaje que fortalecen la diversidad de formas de expresión oral, y que rescatan la o las lenguas de la comunidad y de otros lugares.",
    "pdas": [
      {
        "pda_id": "PDA_SB_51_1",
        "descripcion": "Participa en juegos del lenguaje de la tradición oral de la comunidad o de otros lugares, los dice con fluidez, ritmo y claridad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_51_2",
        "descripcion": "Utiliza distintos recursos de los lenguajes, tales como sonido, ritmo, música, velocidad y movimientos corporales, gestos o señas, para acompañar y modificar adivinanzas, canciones, trabalenguas, retahílas, coplas, entre otros, y con ello crea otras formas de expresión.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_51_3",
        "descripcion": "Interpreta el significado de palabras desconocidas en los juegos del lenguaje, a partir de su contexto.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_52",
    "contenido": "Representación gráfica de ideas y descubrimientos, al explorar los diversos textos que hay en su comunidad y otros lugares.",
    "pdas": [
      {
        "pda_id": "PDA_SB_52_1",
        "descripcion": "Interpreta, a partir de experiencias y referentes culturales, el contenido de diversos textos que le interesan y sabe para qué son.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_52_2",
        "descripcion": "Representa gráficamente, con recursos personales, ideas y descubrimientos del entorno mediante textos conocidos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_52_3",
        "descripcion": "Comunica a diversas personas, mensajes con distintos propósitos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_52_4",
        "descripcion": "Comparte con sus pares los diversos textos de su interés, explica qué le gusta y por qué, e identiica su contenido.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_53",
    "contenido": "Características de objetos y comportamiento de los materiales del entorno sociocultural",
    "pdas": [
      {
        "pda_id": "PDA_SB_53_1",
        "descripcion": "Percibe y describe cómo cambian los objetos y materiales de la naturaleza y de su entorno, al manipularlos o modificar sus condiciones, al modelar con masa, al observar cómo se derrite un helado si se deja al sol o cómo se mezclan los ingredientes para hacer un pastel.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_53_2",
        "descripcion": "Explora las características de los materiales, para identificar su comportamiento al combinar los recursos artísticos, en actividades tales como modelar, construir, dibujar, colorear o pintar.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_53_3",
        "descripcion": "Identifica otros usos que sus pares y las demás personas le dan a los objetos y materiales, en función de sus características y el contexto de uso.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_53_4",
        "descripcion": "Identifica de dónde provienen algunos sonidos de su entorno y cuál es la fuente sonora, los imita y reproduce.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_54",
    "contenido": "Clasificación y experimentación con objetos y elementos del entorno que reflejan la diversidad de la comunidad o región.",
    "pdas": [
      {
        "pda_id": "PDA_SB_54_1",
        "descripcion": "Compara y organiza elementos del entorno, como objetos cotidianos o artesanías de su comunidad, de acuerdo con uno o dos criterios definidos con sus pares: color, forma, tamaño, textura o uso.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_54_2",
        "descripcion": "Organiza por sus semejanzas, objetos y elementos de su entorno, con un propósito definido y los representa mediante dibujos, símbolos, pictogramas en cuadros y tablas sencillas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_54_3",
        "descripcion": "Mezcla o combina elementos de su entorno e identifica reacciones diversas, siguiendo normas de seguridad.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_55",
    "contenido": "El dominio del espacio y reconocimiento de formas en el entorno desde diversos puntos de observación y mediante desplazamientos o recorridos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_55_1",
        "descripcion": "Ubica personas, objetos y elementos de su entorno con referentes personales y los comunica a sus pares y otras personas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_55_2",
        "descripcion": "Establece relaciones de orientación y direccionalidad al interactuar y desplazarse en su entorno (hacia, desde, atrás, arriba, da vuelta).",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_55_3",
        "descripcion": "Reconoce a partir de puntos de referencias personales de interioridad y proximidad, a las personas, objetos y elementos de su comunidad.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_55_4",
        "descripcion": "Toma en cuenta que sus pares tienen otros referentes que debe considerar, ya que tienen otro punto de vista espacial.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_55_5",
        "descripcion": "Reconoce semejanzas y diferencias entre las formas de los objetos de su entorno, explora y describe algunas características geométricas.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_55_6",
        "descripcion": "Identifica formas geométricas en objetos de su entorno y los representa con dibujos y líneas.",
        "orden": 6
      },
      {
        "pda_id": "PDA_SB_55_7",
        "descripcion": "Distingue y reproduce patrones de repetición o crecimiento en una secuencia.",
        "orden": 7
      },
      {
        "pda_id": "PDA_SB_55_8",
        "descripcion": "Crea formas y composiciones geométricas con materiales de arte y construcción.",
        "orden": 8
      },
      {
        "pda_id": "PDA_SB_55_9",
        "descripcion": "Juega con el tangram para hacer composiciones y arma rompecabezas.",
        "orden": 9
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_56",
    "contenido": "Exploración de la diversidad natural que existe en la comunidad y en otros lugares.",
    "pdas": [
      {
        "pda_id": "PDA_SB_56_1",
        "descripcion": "Observa y describe en su lengua materna, animales de su entorno: cómo son, cómo crecen, dónde viven, qué comen, los cuidados que necesitan y otros aspectos que le causan curiosidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_56_2",
        "descripcion": "Amplía su conocimiento acerca de las plantas: su proceso de crecimiento, lo que necesitan para vivir, los lugares donde crecen, entre otros.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_56_3",
        "descripcion": "Explica en su lengua materna y con sus palabras, cómo y por qué suceden algunos procesos naturales.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_56_4",
        "descripcion": "Realiza experimentos para poner a prueba sus ideas y supuestos sobre lo que observa en su entorno.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_56_5",
        "descripcion": "Consulta diferentes fuentes de información, digitales o impresas, para ampliar lo que sabe o intuye.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_56_6",
        "descripcion": "Representa de manera gráfica lo que sabe de la naturaleza.",
        "orden": 6
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_57",
    "contenido": "Las magnitudes de longitud, peso, capacidad y tiempo en situaciones cotidianas del hogar y del entorno sociocultural.",
    "pdas": [
      {
        "pda_id": "PDA_SB_57_1",
        "descripcion": "Compara la longitud de dos o más objetos de uso cotidiano de manera directa o por superposición, contrasta sus ideas con sus pares.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_57_2",
        "descripcion": "Estima si un lugar está más cerca o lejos que otro, y propone formas de medirlo para comprobarlo.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_57_3",
        "descripcion": "Sopesa dos o más objetos para comparar su peso y dice cuál es más pesado o ligero que otro.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_57_4",
        "descripcion": "Organiza actividades y juegos con sus pares, estableciendo una secuencia en su duración al llevarlas a cabo.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_57_5",
        "descripcion": "Utiliza palabras relacionadas con el paso del tiempo que aprende en su contexto social, tales como: antes, después, primero, al final, temprano, en la mañana, en la tarde, en la noche, entre otras.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_58",
    "contenido": "Los saberes numéricos como herramienta para resolver situaciones del entorno, en diversos contextos socioculturales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_58_1",
        "descripcion": "Usa números con distintos propósitos y en distintas situaciones.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_58_2",
        "descripcion": "Dice en orden los números que conoce y gradualmente amplía su rango de conteo.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_58_3",
        "descripcion": "Cuenta objetos y elementos de su entorno.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_58_4",
        "descripcion": "Compara colecciones de pocos elementos y las representa con dibujos o símbolos personales.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_58_5",
        "descripcion": "Propone códigos personales para representar datos en forma gráfica.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_58_6",
        "descripcion": "Resuelve de manera colaborativa situaciones sencillas que involucran números y que implican juntar, agregar, separar o quitar elementos.",
        "orden": 6
      },
      {
        "pda_id": "PDA_SB_58_7",
        "descripcion": "Se familiariza con el uso de monedas y billetes en diversas situaciones e intuye su valor.",
        "orden": 7
      },
      {
        "pda_id": "PDA_SB_58_8",
        "descripcion": "Intercambia con sus pares lo que ha aprendido sobre los números, para reconocer maneras más eficientes de usarlos en su entorno sociocultural en diversas situaciones.",
        "orden": 8
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_59",
    "contenido": "Los seres vivos: elementos, procesos y fenómenos naturales que ofrecen oportunidades para entender y explicar hechos cotidianos, desde distintas perspectivas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_59_1",
        "descripcion": "Hace preguntas sobre la naturaleza y, en colaboración con sus pares, pone a prueba ideas para encontrar respuestas que tengan sentido.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_59_2",
        "descripcion": "Expresa en su lengua materna ideas acerca de por qué se producen algunos fenómenos naturales como el calor, el frío, un huracán o el rocío, e indaga en diferentes fuentes de consulta.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_59_3",
        "descripcion": "Muestra interés sobre lo que sus pares saben acerca de fenómenos y procesos de la naturaleza, y reconoce que todas y todos pueden participar en la resolución de dudas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_59_4",
        "descripcion": "Describe los cambios físicos que percibe al crecer.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_60",
    "contenido": "Objetos y artefactos tecnológicos que mejoran y facilitan la vida familiar y de la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_60_1",
        "descripcion": "Observa y explica cómo entiende que funcionan los juguetes, objetos o artefactos tecnológicos del hogar, la escuela y la comunidad, por qué son útiles, y qué beneficios aportan a las personas y a la comunidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_60_2",
        "descripcion": "Reconoce en su entorno sociocultural, diferentes usos que las personas le dan a los juguetes, objetos y artefactos tecnológicos, y comparte sus descubrimientos con sus pares para crear nuevas formas de usarlos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_61",
    "contenido": "Saberes familiares y comunitarios que resuelven situaciones y necesidades en el hogar y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_61_1",
        "descripcion": "Selecciona saberes familiares y comunitarios útiles, para resolver situaciones diversas, los compara con los de sus pares y cuida su integridad y la de los demás.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_61_2",
        "descripcion": "Reconoce que los saberes familiares se comparten, modifican y enriquecen entre las personas de una comunidad.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_61_3",
        "descripcion": "Explica en su lengua materna y con sus palabras, fenómenos naturales a partir de leyendas e historias de la comunidad, y con ayuda, los contrasta con otras fuentes de consulta.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_62",
    "contenido": "Cambios que ocurren en los lugares, objetos, costumbres y formas de vida de las distintas familias y comunidades con el paso del tiempo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_62_1",
        "descripcion": "Evoca, con apoyo de sus familiares, acontecimientos y sucesos personales relevantes de su historia de vida y los comparte con sus pares, mediante narraciones y fotografías.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_62_2",
        "descripcion": "Se da cuenta de que al pasar el tiempo se producen cambios en sus rasgos físicos, en los lugares que frecuenta, en los objetos y en las costumbres de las distintas familias y de la comunidad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_63",
    "contenido": "Construcción de la identidad y pertenencia a una comunidad y país a partir del conocimiento de su historia, sus celebraciones, conmemoraciones tradicionales y obras del patrimonio artístico y cultural.",
    "pdas": [
      {
        "pda_id": "PDA_SB_63_1",
        "descripcion": "Construye de manera informal un sentido de pertenencia a su comunidad, al interpretar el significado de sus celebraciones y conmemoraciones.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_63_2",
        "descripcion": "Intercambia con sus pares, experiencias y vivencias al participar en eventos, celebraciones y conmemoraciones de su comunidad, y las representa con recursos artísticos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_63_3",
        "descripcion": "Reconoce que los eventos, celebraciones y conmemoraciones son parte de la historia de su comunidad y país.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_63_4",
        "descripcion": "Conoce y disfruta lugares de relevancia natural, cultural e histórica de su comunidad y país, como monumentos, zonas arqueológicas, áreas naturales protegidas, museos o casas de cultura.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_63_5",
        "descripcion": "Explica con sus propias palabras, lo que siente y disfruta acerca de las tradiciones, celebraciones y elementos culturales y artísticos de su comunidad.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_64",
    "contenido": "Interacción, cuidado, conservación y regeneración de la naturaleza, que favorece la construcción de una conciencia socioambiental.",
    "pdas": [
      {
        "pda_id": "PDA_SB_64_1",
        "descripcion": "Se relaciona con la naturaleza y considera la importancia de sus elementos para la vida (aire, sol, agua y suelo).",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_64_2",
        "descripcion": "Aprecia la diversidad de características de los seres vivos y no vivos que hay en la naturaleza y sugiere formas de cuidarlos y preservarlos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_64_3",
        "descripcion": "Promueve actitudes y acciones de cuidado hacia la naturaleza e involucra a las personas de su familia y escuela para colaborar en ellas.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_65",
    "contenido": "La cultura de paz como una forma de relacionarse con otras personas para promover la inclusión y el respeto a la diversidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_65_1",
        "descripcion": "Construye acuerdos para una convivencia pacífica en su hogar y escuela, al escuchar y expresar con respeto ideas y opiniones propias y de las demás personas, que fortalezcan una cultura de paz.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_65_2",
        "descripcion": "Acuerda con su familia, pares y otras personas, las responsabilidades que tendrá en su hogar y escuela, y explica por qué es importante cumplirlas.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_66",
    "contenido": "La diversidad de personas y familias en la comunidad y su convivencia, en un ambiente de equidad, libertad, inclusión y respeto a los derechos humanos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_66_1",
        "descripcion": "Expresa algunas de sus costumbres y rutinas familiares, y las compara con las de sus pares, encontrando similitudes.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_66_2",
        "descripcion": "Se da cuenta de que las familias son diversas y distintas entre sí, y que esto favorece la convivencia en un entorno de inclusión y respeto.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_67",
    "contenido": "Labores y servicios que contribuyen al bien común de las distintas familias y comunidades.",
    "pdas": [
      {
        "pda_id": "PDA_SB_67_1",
        "descripcion": "Identifica que las personas realizan actividades diversas y ofrecen distintos servicios que contribuyen a lograr metas comunes.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_67_2",
        "descripcion": "Comparte con sus pares la importancia de los trabajos y servicios que las y los integrantes de las familias desarrollan en sus hogares y la comunidad, en condiciones de igualdad y equidad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_68",
    "contenido": "Los derechos de niñas y niños como base para el bienestar integral y el establecimiento de acuerdos que favorecen la convivencia pacífica.",
    "pdas": [
      {
        "pda_id": "PDA_SB_68_1",
        "descripcion": "Expresa dudas acerca del significado de algunos de sus derechos a personas adultas, y los relaciona con situaciones cotidianas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_68_2",
        "descripcion": "Identifica algunas situaciones en las que sus derechos y los de otras niñas y otros niños, no son respetados.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_68_3",
        "descripcion": "Expresa lo que entiende acerca de los derechos de niñas y niños, dice cómo los vive y disfruta en situaciones cotidianas, y escucha cómo lo hacen sus pares.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_68_4",
        "descripcion": "Reconoce que todas las niñas y todos los niños tienen derechos, sin importar su origen étnico, condición, color de piel, género, edad, discapacidad o lengua y que deben respetarse en cualquier contexto y lugar..",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_68_5",
        "descripcion": "Establece acuerdos con sus pares y otras personas para mejorar la convivencia en beneficio común.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Preescolar",
    "contenido_id": "CONT_SB_69",
    "contenido": "Transformación responsable del entorno al satisfacer necesidades básicas de alimentación, vestido y vivienda.",
    "pdas": [
      {
        "pda_id": "PDA_SB_69_1",
        "descripcion": "Observa que las personas transforman la naturaleza al interactuar con ella para satisfacer sus necesidades.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_69_2",
        "descripcion": "Distingue acciones que son benéficas para su entorno, tales como sembrar y cuidar el crecimiento de las plantas, cuidar a los animales, respetar las reservas naturales, entre otras.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_69_3",
        "descripcion": "Reconoce que todas las personas tienen necesidades básicas, como la alimentación, el vestido y la vivienda, y que estas se satisfacen con recursos de la naturaleza, como el agua simple potable para beber; frutas y verduras para comer, el algodón, la seda y el lino para hacer algunas prendas de ropa.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_69_4",
        "descripcion": "Propone acciones para cuidar y preservar su entorno natural, como evitar el consumo de desechables y empaques no necesarios; el reciclado y reúso de materiales, el ahorro de agua y de energía eléctrica, entre otras.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_69_5",
        "descripcion": "Promueve con la colaboración de las familias, el uso responsable de los recursos de la naturaleza al satisfacer necesidades de alimentación, vestido y vivienda.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_70",
    "contenido": "Construcción de la identidad personal a partir de su pertenencia a un territorio, su origen étnico, cultural y lingüístico, y la interacción con personas cercanas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_70_1",
        "descripcion": "Identifica que la lengua que habla, las costumbres familiares y el lugar donde vive contribuyen a la formación de su identidad y pertenencia a una comunidad en la que participa y colabora.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_70_2",
        "descripcion": "Aprecia las características y cualidades propias, así como las de sus pares y de otras personas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_70_3",
        "descripcion": "Muestra seguridad y confianza en sus formas de ser, actuar, pensar e interactuar en la casa, escuela y comunidad.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_70_4",
        "descripcion": "Expresa y representa con recursos de los distintos lenguajes, la imagen que tiene de sí y de las y los demás.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_71",
    "contenido": "Consumo de alimentos y bebidas que benefician la salud, de acuerdo con los contextos socioculturales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_71_1",
        "descripcion": "Obtiene información de diversas fuentes, acerca de los factores que favorecen estilos de vida saludable, destacando el consumo de alimentos nutritivos y de agua simple potable, entre otros.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_71_2",
        "descripcion": "Aprecia la cultura alimentaria mexicana, y descubre la diversidad de ingredientes que existen en el país, así como la influencia de otras culturas en el consumo y preparación de alimentos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_71_3",
        "descripcion": "Promueve el consumo de alimentos sanos propios de su comunidad y la creación de huertos para la siembra y cosecha de frutas y verduras.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_72",
    "contenido": "Cuidado de la salud personal y colectiva, al llevar a cabo acciones de higiene, limpieza, y actividad física, desde los saberes prácticos de la comunidad y la información científica.",
    "pdas": [
      {
        "pda_id": "PDA_SB_72_1",
        "descripcion": "Reconoce algunos factores que permiten conservar la salud y los que la perjudican.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_72_2",
        "descripcion": "Propone acciones que contribuyen a mantener su salud y bienestar, relacionadas con higiene personal, limpieza y actividad física, considerando los saberes prácticos de la comunidad y las aportaciones científ icas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_72_3",
        "descripcion": "Promueve acciones sobre el cuidado de la salud visual, auditiva, bucal, alimentaria y física, en la casa, escuela y comunidad.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_72_4",
        "descripcion": "Dialoga con sus pares y toman acuerdos para el cuidado de la salud en beneficio de todas y todos.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_73",
    "contenido": "Las emociones en la interacción con diversas personas y situaciones.",
    "pdas": [
      {
        "pda_id": "PDA_SB_73_1",
        "descripcion": "Establece vínculos afectivos y de empatía con sus pares y otras personas, a partir de la convivencia cotidiana.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_73_2",
        "descripcion": "Intercambia experiencias y vivencias con sus pares y otras personas, acerca de las diferentes formas de actuar, expresar, nombrar y controlar las emociones.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_73_3",
        "descripcion": "Dice lo que le molesta o incomoda para evitar reaccionar con gritos o agresión; dialoga y respeta las reglas para una mejor convivencia.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_73_4",
        "descripcion": "Identifica situaciones en las que percibe que está en riesgo su integridad o la de otras personas.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_73_5",
        "descripcion": "Conversa con sus pares acerca de lo que hacen para enfrentar situaciones de riesgo y buscan distintas alternativas para sentir seguridad y ponerse a salvo.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_74",
    "contenido": "Medidas de prevención de accidentes y situaciones de riesgo de acuerdo con el contexto, para el cuidado de la integridad personal y colectiva.",
    "pdas": [
      {
        "pda_id": "PDA_SB_74_1",
        "descripcion": "Indaga en diferentes fuentes de consulta y con expertos, acerca de los posibles riesgos y daños que provocan algunos fenómenos naturales como: sismos, inundaciones, huracanes, entre otros.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_74_2",
        "descripcion": "Propone y lleva a cabo, acciones de seguridad y formas de colaboración en situaciones de riesgo, accidentes o desastres, tomando en cuenta el bienestar de las personas y otros seres vivos de la comunidad.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_74_3",
        "descripcion": "Colabora en acciones de difusión, al promover una cultura de prevención de accidentes y riesgos para el beneficio común.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_75",
    "contenido": "Posibilidades de movimiento en diferentes espacios, para favorecer las habilidades motrices.",
    "pdas": [
      {
        "pda_id": "PDA_SB_75_1",
        "descripcion": "Combina movimientos que implican el control, equilibrio y estabilidad del cuerpo al realizar acciones individuales, en parejas o en colectivo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_75_2",
        "descripcion": "Incorpora en sus movimientos elementos de la estructura del espacio físico como la distancia, la dirección, la temporalidad, la velocidad, la posición y la lateralidad.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_75_3",
        "descripcion": "Coordina movimientos con control y equilibrio al resolver situaciones cotidianas, participar en juegos tradicionales y representaciones individuales o colectivas en igualdad de oportunidades y sin distinción de género.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_75_4",
        "descripcion": "Reconoce cuando realiza un sobreesfuerzo físico: dolor torácico, mareos, deshidratación o dificultad para respirar; pone en práctica estrategias que le ayudan a recuperar un estado de bienestar.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_76",
    "contenido": "Precisión y coordinación en los movimientos al usar objetos, herramientas y materiales, de acuerdo con sus condiciones, capacidades y características.",
    "pdas": [
      {
        "pda_id": "PDA_SB_76_1",
        "descripcion": "Resuelve situaciones cotidianas mediante el uso de objetos, herramientas y materiales que implican el control y precisión de movimientos para satisfacer necesidades personales y colectivas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_76_2",
        "descripcion": "Construye y modela objetos, con control y precisión de sus movimientos; selecciona objetos, herramientas y materiales apropiados para resolver situaciones diversas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_76_3",
        "descripcion": "Respeta y pone en práctica, medidas de seguridad al manipular objetos, herramientas y materiales en diferentes lugares.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_77",
    "contenido": "Interacción con personas de diversos contextos, que contribuyan al establecimiento de relaciones positivas y a una convivencia basada en la aceptación de la diversidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_77_1",
        "descripcion": "Propone y lleva a cabo formas de convivencia libres de violencia en la casa, escuela y comunidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_77_2",
        "descripcion": "Se integra con seguridad y confianza en actividades colectivas al interactuar con personas de otros lugares y culturas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_77_3",
        "descripcion": "Asume actitudes prosociales como compartir, ayudar y colaborar, al participar y mejorar las relaciones de convivencia con las demás personas.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_78",
    "contenido": ".",
    "pdas": [
      {
        "pda_id": "PDA_SB_78_1",
        "descripcion": "Identifica que algunos nombres propios son de origen indígena y extranjero.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_78_2",
        "descripcion": "Indaga, en distintas fuentes, el significado de términos o palabras que se utilizan en diferentes contextos o regiones.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_79",
    "contenido": "Comunicación oral de necesidades, emociones, gustos, ideas y saberes, a través de los diversos lenguajes, desde una perspectiva comunitaria.",
    "pdas": [
      {
        "pda_id": "PDA_SB_79_1",
        "descripcion": "De manera oral, expresa ideas completas sobre necesidades, vivencias, emociones, gustos, preferencias y saberes a distintas personas, combinando los lenguajes.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_79_2",
        "descripcion": "Comprende, al interactuar con las demás personas, que existen diversas formas de comunicarse.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_79_3",
        "descripcion": "Conversa y opina sobre diferentes temas y con varias personas interlocutoras.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_80",
    "contenido": "Expresión de emociones y experiencias, en igualdad de oportunidades, apoyándose de recursos gráficos personales y de los lenguajes artísticos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_80_1",
        "descripcion": "Combina recursos gráficos y de los lenguajes artísticos, en la representación de emociones y experiencias.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_80_2",
        "descripcion": "Explica y comparte sus producciones con las y los demás, dice o señala qué quiso representar y describe detalles para enfatizar ciertas emociones o experiencias.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_80_3",
        "descripcion": "Argumenta su opinión acerca de las producciones de sus pares.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_80_4",
        "descripcion": "Compara sus producciones con las de sus pares, para encontrar semejanzas en los elementos artísticos utilizados y en algunas emociones y experiencias.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_80_5",
        "descripcion": "Reconoce que las demás personas tienen el mismo derecho para expresarse.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_81",
    "contenido": "Narración de historias mediante diversos lenguajes, en un ambiente donde niñas y niños participen y se apropien de la cultura, a través de diferentes textos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_81_1",
        "descripcion": "Narra historias que inventa considerando los momentos de inicio, desarrollo y final, de manera individual o colectiva.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_81_2",
        "descripcion": "Describe detalles de personajes y lugares, los comparte con sus pares para evocarlos y enriquecerlos, e incorpora nuevos elementos a partir de los rasgos de su cultura y de otras regiones.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_82",
    "contenido": "Producciones gráficas dirigidas a diversas destinatarias y diversos destinatarios, para establecer vínculos sociales y acercarse a la cultura escrita.",
    "pdas": [
      {
        "pda_id": "PDA_SB_82_1",
        "descripcion": "Planifica producciones gráficas, tales como avisos, recomendaciones de libros, recados, letreros, entre otros, de forma individual o en pequeños equipos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_82_2",
        "descripcion": "Recurre a diversos textos para copiar palabras, combinar letras del nombre propio, el de sus pares o dicta a alguna persona adulta, para establecer vínculos con las familias, la escuela y la comunidad.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_82_3",
        "descripcion": "Usa grafías para representar su nombre y otras palabras conocidas con diversos propósitos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_82_4",
        "descripcion": "Reconoce las letras de su nombre en textos impresos y digitales.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_83",
    "contenido": "Producción de expresiones creativas con los distintos elementos de los lenguajes artísticos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_83_1",
        "descripcion": "Enriquece sus producciones creativas de expresión gráfica o corporal, al incluir o retomar elementos, tales como líneas, combinación de colores, formas, imágenes, gestos, posturas, sonidos, entre otros, de las manifestaciones artísticas y culturales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_83_2",
        "descripcion": "Aprecia y opina sobre las creaciones de sus pares y otros artistas de la comunidad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_84",
    "contenido": "Reconocimiento de ideas o emociones en la interacción con manifestaciones culturales y artísticas, y con la naturaleza, a través de diversos lenguajes.",
    "pdas": [
      {
        "pda_id": "PDA_SB_84_1",
        "descripcion": "Explica lo que le gusta o disgusta, lo que se imagina y le provocan las manifestaciones culturales y artísticas (pinturas, zonas arqueológicas, poemas, artesanías, entre otras), a partir de sus elementos, como formas, trazos, personas, objetos o sonidos y ritmos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_84_2",
        "descripcion": "Aprecia y expresa gusto por ciertas manifestaciones o por alguna o algún artista.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_84_3",
        "descripcion": "Relaciona en algunas manifestaciones artísticas y culturales, sucesos personales o familiares, así como lo que pasa en su comunidad.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_84_4",
        "descripcion": "Escucha lo que le comparten sus pares y reconoce que hay diversidad de opiniones, gustos o disgustos alrededor de una misma manifestación artística o cultural.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_85",
    "contenido": "Reconocimiento y aprecio de la diversidad lingüística, al identificar las formas en que se comunican las distintas personas de la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_85_1",
        "descripcion": "Identifica y utiliza algunas palabras, frases o señas de la diversidad lingüística.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_85_2",
        "descripcion": "Reconoce que algunos objetos se nombran de distinta manera, en diferentes regiones.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_86",
    "contenido": "Recursos y juegos del lenguaje que fortalecen la diversidad de formas de expresión oral, y que rescatan la o las lenguas de la comunidad y de otros lugares.",
    "pdas": [
      {
        "pda_id": "PDA_SB_86_1",
        "descripcion": "Propone y organiza con ayuda, juegos del lenguaje para invitar a sus pares a participar.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_86_2",
        "descripcion": "Experimenta con los recursos de los lenguajes para crear, en lo individual y lo colectivo, juegos del lenguaje como adivinanzas, trabalenguas, canciones, rimas, coplas u otros.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_86_3",
        "descripcion": "Combina e inventa nuevas palabras y las integra a su expresión.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_87",
    "contenido": "Representación gráfica de ideas y descubrimientos, al explorar los diversos textos que hay en su comunidad y otros lugares.",
    "pdas": [
      {
        "pda_id": "PDA_SB_87_1",
        "descripcion": "Utiliza distintos textos (carteles, avisos, periódico mural, revistas, hojas, cuadernos) para representar gráficamente ideas que descubre del entorno de manera vivencial y al consultar libros, revistas y otras fuentes impresas y digitales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_87_2",
        "descripcion": "Expresa sus preferencias hacia ciertos textos e identifica algunas de sus funciones, como obtener información y disfrutar historias, entre otras.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_87_3",
        "descripcion": "Interpreta y elabora algunas señalizaciones, símbolos y letreros a partir de entender sus características, elementos gráficos y contexto.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_88",
    "contenido": "Características de objetos y comportamiento de los materiales del entorno sociocultural",
    "pdas": [
      {
        "pda_id": "PDA_SB_88_1",
        "descripcion": "Describe las características de los objetos y materiales de su entorno.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_88_2",
        "descripcion": "Experimenta con distintos objetos para reconocer sus características y propiedades al manipularlos, combinarlos o transformarlos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_88_3",
        "descripcion": "Explica los resultados de sus experimentos y los contrasta con los hallazgos de sus pares, confirma o modifica sus suposiciones iniciales.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_88_4",
        "descripcion": "Reconoce que las comunidades usan de diferente manera los objetos y materiales propios de su cultura: elaboran artesanías con papel, barro o arcilla, elaboran textiles, ropa y hacen bordados con diferentes materiales.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_88_5",
        "descripcion": "Distingue los materiales de la naturaleza, de los fabricados por el ser humano.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_88_6",
        "descripcion": "Experimenta con diversos objetos o instrumentos musicales, para producir y combinar diferentes sonidos.",
        "orden": 6
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_89",
    "contenido": "Clasificación y experimentación con objetos y elementos del entorno que reflejan la diversidad de la comunidad o región.",
    "pdas": [
      {
        "pda_id": "PDA_SB_89_1",
        "descripcion": "Recolecta objetos y elementos de su entorno para observarlos, hacer preguntas y explorar sus características y comportamiento.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_89_2",
        "descripcion": "Dialoga con sus pares para definir criterios de clasificación de objetos y elementos del entorno natural y sociocultural, que respondan a distintos propósitos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_89_3",
        "descripcion": "Elabora e interpreta registros para organizar objetos y elementos del entorno mediante dibujos, tablas, símbolos o pictogramas; los explica a otras personas, en su lengua materna y con sus palabras.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_89_4",
        "descripcion": "Experimenta, de manera colaborativa, con elementos y objetos del entorno y reconoce si hay cambios o transformaciones en ellos, manteniendo normas de seguridad.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_89_5",
        "descripcion": "Usa herramientas diversas en situaciones experimentales: lupas, microscopios, goteros, vasos medidores, balanzas, termómetro, lámparas, cernidores, entre otros.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_90",
    "contenido": "El dominio del espacio y reconocimiento de formas en el entorno desde diversos puntos de observación y mediante desplazamientos o recorridos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_90_1",
        "descripcion": "Expresa la posición y ubicación de objetos, lugares y personas con respecto a su cuerpo y a otros objetos; usa gradualmente referentes convencionales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_90_2",
        "descripcion": "Interpreta y comunica en su lengua materna, recorridos y trayectorias con referentes espaciales de orientación y proximidad (cerca, lejos, arriba, abajo, delante, detrás, derecha, izquierda).",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_90_3",
        "descripcion": "Planifica y dibuja recorridos, de su comunidad y de otros espacios, que contribuyen a reconocer el lugar donde vive.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_90_4",
        "descripcion": "Observa y reconoce atributos geométricos en objetos y elementos de su entorno, y los describe con sus palabras y con términos convencionales.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_90_5",
        "descripcion": "Representa y reproduce objetos, animales y plantas con el tangram, bloques de construcción, modelado, doblado de papel o con dibujos.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_90_6",
        "descripcion": "Crea patrones de repetición y crecimiento para hacer secuencias.",
        "orden": 6
      },
      {
        "pda_id": "PDA_SB_90_7",
        "descripcion": "Imagina y anticipa los cambios que ocurrirán al manipular, apilar, rasgar y transformar objetos, haciendo composiciones geométricas.",
        "orden": 7
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_91",
    "contenido": "Exploración de la diversidad natural que existe en la comunidad y en otros lugares.",
    "pdas": [
      {
        "pda_id": "PDA_SB_91_1",
        "descripcion": "Distingue algunas características del entorno natural: plantas, animales, cuerpos de agua, clima, entre otras.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_91_2",
        "descripcion": "Se apoya en recursos impresos y digitales como fotografías, imágenes o videos para profundizar en sus conocimientos acerca de la diversidad de la naturaleza en su comunidad y otras regiones.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_91_3",
        "descripcion": "Establece con sus pares, formas de organizar a los seres vivos y elementos de la naturaleza para establecer semejanzas y diferencias a la vez que aprecia su diversidad.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_91_4",
        "descripcion": "Observa y experimenta con elementos de la naturaleza, comunica y registra sus hallazgos.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_91_5",
        "descripcion": "Explica con sus palabras y en su lengua materna, procesos, fenómenos naturales y experimentos; los representa con recursos gráficos.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_92",
    "contenido": "Las magnitudes de longitud, peso, capacidad y tiempo en situaciones cotidianas del hogar y del entorno sociocultural.",
    "pdas": [
      {
        "pda_id": "PDA_SB_92_1",
        "descripcion": "Estima y compara la longitud de dos o más objetos con apoyo de un intermediario, y expresa cuál es más largo, más corto, más ancho, más angosto o si son iguales; con trasta sus ideas con las de sus pares y las representa de manera gráfica.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_92_2",
        "descripcion": "Mide objetos, áreas o distancias con unidades no convencionales que tiene al alcance y explica por qué son apropiadas; las representa de manera gráfica.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_92_3",
        "descripcion": "Usa balanzas o básculas para comparar el peso de dos o más objetos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_92_4",
        "descripcion": "rasvasa arena o líquidos entre recipientes de distintos tamaños y formas para medir su capacidad, y dice en cuál cabe más o menos.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_92_5",
        "descripcion": "Percibe el paso del tiempo mediante eventos y procesos, con apoyo de la observación de cambios en la naturaleza, como el día y la noche, las estaciones del año, las temporadas de cosecha, el crecimiento de seres vivos o cualquier evento importante de la comunidad.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_92_6",
        "descripcion": "Hace uso de instrumentos que miden el paso del tiempo, tales como calendarios, relojes de arena, solares, digitales y análogos.",
        "orden": 6
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_93",
    "contenido": "Los saberes numéricos como herramienta para resolver situaciones del entorno, en diversos contextos socioculturales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_93_1",
        "descripcion": "Dice la serie numérica en orden y amplía su rango de conteo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_93_2",
        "descripcion": "Cuenta objetos y elementos de su entorno en su lengua materna con diversos propósitos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_93_3",
        "descripcion": "Construye colecciones y las compara mediante distintas estrategias para determinar cuál tiene más o menos elementos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_93_4",
        "descripcion": "Representa cantidades, con dibujos, símbolos personales y numerales e interpreta los registros de sus pares.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_93_5",
        "descripcion": "Construye y compara colecciones, usando distintas estrategias.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_93_6",
        "descripcion": "Ordena elementos de una serie y usa números ordinales para expresar el lugar que ocupa cada elemento.",
        "orden": 6
      },
      {
        "pda_id": "PDA_SB_93_7",
        "descripcion": "Organiza y registra información en tablas o cuadros sencillos.",
        "orden": 7
      },
      {
        "pda_id": "PDA_SB_93_8",
        "descripcion": "Propone, de manera colaborativa, formas de resolver situaciones cotidianas e imaginarias que involucran acciones de agregar, jun-tar, quitar, separar, comparare igualar cantidades.",
        "orden": 8
      },
      {
        "pda_id": "PDA_SB_93_9",
        "descripcion": "Reconoce el valor de monedas y billetes al usarlos en situaciones reales y de juego y estima para qué le alcanza.",
        "orden": 9
      },
      {
        "pda_id": "PDA_SB_93_10",
        "descripcion": "Intercambia con sus pares, saberes numéricos para plantear problemas y encontrar distintas estrategias para resolverlos de formas diversas y equitativas.",
        "orden": 10
      },
      {
        "pda_id": "PDA_SB_93_11",
        "descripcion": "Conoce formas de contar en otras culturas, como la maya, que usa rayas y puntos para representar los números.",
        "orden": 11
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_94",
    "contenido": "Los seres vivos: elementos, procesos y fenómenos naturales que ofrecen oportunidades para entender y explicar hechos cotidianos, desde distintas perspectivas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_94_1",
        "descripcion": "Planifica de manera colaborativa indagaciones para ampliar sus conocimientos sobre la naturaleza, el planeta y el universo: hace preguntas, explora su entorno, expone sus ideas, busca información, compara lo que sabe, registra datos y explica sus hallazgos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_94_2",
        "descripcion": "Explica con sus palabras y en su lengua materna, la importancia del aire, el agua, el suelo y el sol para todos los seres vivos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_94_3",
        "descripcion": "Expresa lo que supone sucedería si se alteran las condiciones de la naturaleza por las acciones de las personas, por ejemplo, al contaminarla o dañarla.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_94_4",
        "descripcion": "Explica con sus palabras cómo suceden y por qué se producen los fenómenos naturales de su entorno o de otros lugares: la actividad de un volcán, la nieve, una cascada, el granizo, un eclipse, entre otros.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_94_5",
        "descripcion": "Se apoya de diversos recursos para ampliar lo que sabe.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_94_6",
        "descripcion": "Indaga acerca de cómo funciona su cuerpo, sus cambios físicos, y explica lo que entiende.",
        "orden": 6
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_95",
    "contenido": "Objetos y artefactos tecnológicos que mejoran y facilitan la vida familiar y de la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_95_1",
        "descripcion": "Indaga acerca del funcionamiento de juguetes, objetos y artefactos tecnológicos de distintos contextos y reconoce su benef icio.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_95_2",
        "descripcion": "Imagina y propone con sus pares, nuevas formas de usar los objetos y artefactos tecnológicos para aprovecharlos de manera sustentable: usar una cuchara para comer, medir ingredientes o remover tierra para sembrar.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_95_3",
        "descripcion": "Reconoce que las personas utilizan diferentes objetos o artefactos tecnológicos para desarrollar su oficio o profesión, en beneficio propio y de la comunidad.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_96",
    "contenido": "Saberes familiares y comunitarios que resuelven situaciones y necesidades en el hogar y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_96_1",
        "descripcion": "Propone algunos saberes familiares y comunitarios, para resolver necesidades y situaciones en su hogar, escuela y comunidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_96_2",
        "descripcion": "Distingue, con ayuda de otras personas, situaciones en las que los saberes comunitarios son útiles y cuándo deben complementarse y/o contrastarse con otros conocimientos; cuidando su integridad y la de los demás.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_96_3",
        "descripcion": "Indaga en distintas fuentes de consulta, incluyendo medios impresos y digitales, saberes y prácticas de otros lugares para cuidar la naturaleza.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_97",
    "contenido": "Cambios que ocurren en los lugares, entornos, objetos, costumbres y formas de vida de las distintas familias y comunidades con el paso del tiempo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_97_1",
        "descripcion": "Identifica, con ayuda, y a través de narraciones, cartas, fotografías, objetos, ropa y otros elementos, acontecimientos y sucesos importantes ocurridos en su familia a lo largo del tiempo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_97_2",
        "descripcion": "Comprende que, con el paso del tiempo, se modifican los paisajes, los objetos, las costumbres y las formas de vida de la comunidad, por lo que se debe actuar con responsabilidad para el bienestar individual y colectivo.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_98",
    "contenido": "Construcción de la identidad y pertenencia a una comunidad y país a partir del conocimiento de su historia, sus celebraciones, conmemoraciones tradicionales y obras del patrimonio artístico y cultural.",
    "pdas": [
      {
        "pda_id": "PDA_SB_98_1",
        "descripcion": "Aprecia la riqueza de la historia de su comunidad a través de relatos, historias, leyendas, mitos, conmemoraciones, celebraciones tradicionales, obras culturales y artísticas",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_98_2",
        "descripcion": "Se interesa, junto con sus pares, por conocer la diversidad cultural y artística de otras regiones del país, así como otras costumbres y tradiciones que enriquecen su visión del país y del mundo.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_98_3",
        "descripcion": "Entiende que los símbolos patrios representan los valores y la historia de México y los explica con sus propias palabras; reconoce los lugares y momentos apropiados para usarlos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_98_4",
        "descripcion": "Reconoce que algunas tradiciones surgen de situaciones, eventos o vivencias comunitarias relevantes y que se modifican con el paso del tiempo.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_99",
    "contenido": "Interacción, cuidado, conservación y regeneración de la naturaleza, que favorece la construcción de una conciencia socioambiental.",
    "pdas": [
      {
        "pda_id": "PDA_SB_99_1",
        "descripcion": "Interactúa con respeto y empatía en la naturaleza, e identifica algunos elementos y cuidados que necesitan los seres vivos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_99_2",
        "descripcion": "Manifiesta interés por cuidar a la naturaleza y encuentra formas creativas de resolver problemas socioambientales de su comunidad, como la contaminación, la deforestación, el cambio climático, el deshielo o la sobreexplotación de los recursos naturales.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_99_3",
        "descripcion": "Reconoce algunas condiciones ambientales de su comunidad y dice cómo afectan a plantas, animales y personas; en colaboración, hace propuestas para mejorarlas.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_100",
    "contenido": "La cultura de paz como una forma de relacionarse con otras personas para promover la inclusión y el respeto a la diversidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_100_1",
        "descripcion": "Se expresa y participa con libertad y respeto en diversas situaciones y contextos, favoreciendo una cultura de paz y la convivencia pacífica en un marco de inclusión y diversidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_100_2",
        "descripcion": "Reconoce los desacuerdos como oportunidades para construir un ambiente de equidad e inclusión.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_101",
    "contenido": "La diversidad de personas y familias en la comunidad y su convivencia, en un ambiente de equidad, libertad, inclusión y respeto a los derechos humanos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_101_1",
        "descripcion": "Reconoce las distintas formas de ser y actuar de sus pares para convivir en armonía.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_101_2",
        "descripcion": "Conversa con sus pares acerca de lo que significa pertenecer a una familia, los cuidados que reciben, las reglas que deben seguir, algunas de sus costumbres, y reconoce que se conforman de diferente manera, sin que una tenga más valor que otra.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_102",
    "contenido": "Labores y servicios que contribuyen al bien común de las distintas familias y comunidades.",
    "pdas": [
      {
        "pda_id": "PDA_SB_102_1",
        "descripcion": "Aprecia las labores y servicios que existen en la comunidad y valora el impacto que tienen para el bienestar común.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_102_2",
        "descripcion": "Utiliza lo que sabe de los trabajos y servicios que existen en su comunidad, para proponer nuevas formas de colaborar y contribuir al bienestar de todas las personas.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_103",
    "contenido": "Los derechos de niñas y niños como base para el bienestar integral y el establecimiento de acuerdos que favorecen la convivencia pacífica.",
    "pdas": [
      {
        "pda_id": "PDA_SB_103_1",
        "descripcion": "Explica con sus palabras y mediante otros lenguajes, lo que entiende de cada uno de los derechos de niñas y niños, y escucha las opiniones de sus pares.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_103_2",
        "descripcion": "Difunde los derechos de las niñas y los niños en su escuela y entorno cercano, para favorecer que todas las personas los respeten y contribuyan a su ejercicio..",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_103_3",
        "descripcion": "Reconoce que una convivencia pacífica se basa en el respeto de los derechos de todas y todos.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 2",
    "nivel": "Preescolar",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Preescolar",
    "contenido_id": "CONT_SB_104",
    "contenido": "Transformación responsable del entorno al satisfacer necesidades básicas de alimentación, vestido y vivienda.",
    "pdas": [
      {
        "pda_id": "PDA_SB_104_1",
        "descripcion": "Asocia los recursos naturales de donde provienen algunos alimentos y explica con sus palabras, cómo cambia la naturaleza al obtenerlos y producirlos, así como al elaborar o fabricar prendas de vestir.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_104_2",
        "descripcion": "Indaga los materiales con los que se construyen las viviendas y reconoce que se obtienen de la naturaleza.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_104_3",
        "descripcion": "Sugiere y lleva a cabo algunas acciones sustentables a su alcance, para cuidar el ambiente natural y fomentar el buen vivir de las personas de la comunidad.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_105",
    "contenido": "Acciones individuales que repercuten en la conservación y mejora de la salud.",
    "pdas": [
      {
        "pda_id": "PDA_SB_105_1",
        "descripcion": "Reconoce la importancia de la práctica de hábitos de higiene y limpieza en el cuidado personal, así como de otros seres vivos, con la intención de contribuir a la prevención de problemas de salud.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_105_2",
        "descripcion": "Explica la importancia de incluir alimentos saludables de los distintos grupos para colaborar en la modificación de hábitos de consumo personales y familiares que favorecen la salud.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_105_3",
        "descripcion": "Intercambia experiencias acerca de situaciones de riesgo, para compartir acciones encaminadas a su prevención.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_106",
    "contenido": "Actitudes y prácticas que prevalecen entre los hombres y las mujeres en las familias, la escuela y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_106_1",
        "descripcion": "Platica acerca de la organización de las responsabilidades y tareas en su familia.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_106_2",
        "descripcion": "Identifica la importancia de la participación equilibrada entre hombres y mujeres, adultos, niñas y niños en la cotidianeidad familiar.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_107",
    "contenido": "Apoyos mutuos para favorecer los aprendizajes en el aula diversa.",
    "pdas": [
      {
        "pda_id": "PDA_SB_107_1",
        "descripcion": "Identifica y valora la presencia de diferentes lenguas y lenguajes en el aula y ofrece apoyos a sus pares, si es necesario.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_108",
    "contenido": "Aproximación a las tecnologías de la información y la comunicación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_108_1",
        "descripcion": "Reconoce las tecnologías que se utilizan en su entorno y los beneficios que proporcionan en la comunicación y el aprendizaje.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_109",
    "contenido": "Capacidades y habilidades motrices.",
    "pdas": [
      {
        "pda_id": "PDA_SB_109_1",
        "descripcion": "Utiliza patrones básicos de movimiento ante situaciones que implican explorar los diferentes espacios, el tiempo y los objetos, para favorecer el conocimiento de sí.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_110",
    "contenido": "Construcción del proyecto de vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_110_1",
        "descripcion": "Explica situaciones cotidianas que se presentan en la escuela y la casa, con la intención de proponer acuerdos que generen una mejor convivencia.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_110_2",
        "descripcion": "Identifica las necesidades y logros que ha tenido en diferentes momentos de su historia, para comparar cambios que inciden en el desarrollo de la autonomía y una mayor participación.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_111",
    "contenido": "Educación Integral en Sexualidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_111_1",
        "descripcion": "Reflexiona acerca de las diversas formas de ser y actuar de hombres y mujeres a partir de distintas situaciones cotidianas, para reconocer manifestaciones en favor de una interacción respetuosa y convivencia sana.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_112",
    "contenido": "Efectos de la pandemia de COVID- 19 en las familias, la escuela y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_112_1",
        "descripcion": "Comenta y reflexiona con sus compañeras y compañeros, acerca de los cambios que se produjeron durante la pandemia, en las actividades familiares, escolares y comunitarias, como: el uso de los espacios, el tiempo, las formas de comunicación, entre otros.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_113",
    "contenido": "Estilos de vida activos y saludables.",
    "pdas": [
      {
        "pda_id": "PDA_SB_113_1",
        "descripcion": "Participa en diferentes juegos para explorar alternativas que le permitan mantener una vida activa y saludable.Participa en diferentes juegos para explorar alternativas que le permitan mantener una vida activa y saludable.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_114",
    "contenido": "Formas de ser, pensar, actuar y relacionarse.",
    "pdas": [
      {
        "pda_id": "PDA_SB_114_1",
        "descripcion": "Reconoce y descubre sus características y cambios (corporales, gustos, intereses, habilidades, necesidades y capacidades) que le hacen una persona única, con la finalidad de valorar y respetar la diversidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_115",
    "contenido": "Historia personal y familiar.",
    "pdas": [
      {
        "pda_id": "PDA_SB_115_1",
        "descripcion": "Platica sobre sucesos de su historia personal y familiar y los ordena en antes, después y ahora.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_116",
    "contenido": "Interacción motriz.",
    "pdas": [
      {
        "pda_id": "PDA_SB_116_1",
        "descripcion": "Colabora en la definición de normas básicas de convivencia para reconocer su influencia en la interacción presente en juegos y situaciones cotidianas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_117",
    "contenido": "La comunidad como el espacio en el que se vive y se encuentra la escuela.",
    "pdas": [
      {
        "pda_id": "PDA_SB_117_1",
        "descripcion": "Ubica algunos referentes del lugar donde vive y se encuentra la escuela.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_117_2",
        "descripcion": "Platica sobre las características geográficas, climáticas, ambientales, socioculturales y lingüísticas de su comunidad y escuela.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_118",
    "contenido": "Los afectos y su influencia en el bienestar.",
    "pdas": [
      {
        "pda_id": "PDA_SB_118_1",
        "descripcion": "Conoce las emociones básicas, su función y reacciones fisiológicas, para interactuar con sus pares.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_118_2",
        "descripcion": "Reconoce emociones básicas en él o ella y en las demás personas, con el fin de identificar situaciones donde se necesite pedir u ofrecer ayuda.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_119",
    "contenido": "Pensamiento lúdico, divergente y creativo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_119_1",
        "descripcion": "Busca distintas soluciones ante una misma situación de juego o cotidiana, con la intención de poner en práctica la creatividad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_120",
    "contenido": "Posibilidades cognitivas, expresivas, motrices, creativas y de relación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_120_1",
        "descripcion": "Explora acciones motrices y expresivas en juegos y situaciones cotidianas que implican equilibrio, orientación espacialtemporal y coordinación motriz, para mejorar el conocimiento de sí.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_121",
    "contenido": "Prácticas de prevención y respuesta ante desastres ambientales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_121_1",
        "descripcion": "Participa en las prácticas familiares de prevención y respuesta ante fenómenos naturales que ponen en riesgo su integridad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_122",
    "contenido": "Sentido de comunidad y satisfacción de necesidades humanas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_122_1",
        "descripcion": "Indaga acerca de ideas, conocimientos, prácticas culturales, formas de organización y acuerdos familiares, para compartir su importancia.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_122_2",
        "descripcion": "Compara necesidades de las familias en diferentes contextos y las formas de utilizar el cuerpo u organizarse en su satisfacción, para explicar cambios y mejoras que se han presentado.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_123",
    "contenido": "Sentido de pertenencia a la familia y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_123_1",
        "descripcion": "Identifica aspectos de la historia familiar y de la comunidad compartidos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_123_2",
        "descripcion": "Reconoce y comparte valores, como: la solidaridad, la participación, la reciprocidad, el respeto, entre otros, así como estilos socioculturales propios de su familia y comunidad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_124",
    "contenido": "Situaciones de riesgo social en las familias, escuela y comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_124_1",
        "descripcion": "Reconoce situaciones de riesgos sociales en las familias, la escuela y la comunidad, así como la importancia del autocuidado, la no violencia y la convivencia pacíf ica.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_125",
    "contenido": "Apreciación de canciones, rondas infantiles, arrullos y cuentos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_125_1",
        "descripcion": "Escucha y canta diversas canciones, rondas infantiles y arrullos, elige las que son de su agrado y explica las razones de su elección.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_125_2",
        "descripcion": "Sigue la letra impresa de las canciones, rondas infantiles y arrullos conocidos, mientras la o el docente u otra persona los canta, e identifica la relación entre algunas palabras y frases que sigue en la letra impresa y las que escucha.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_125_3",
        "descripcion": "Sigue el ritmo y melodía de canciones, rondas infantiles y arrullos al cantarlas con la o el docente, y reflexiona sobre las características sonoras convencionales de las letras, palabras y frases que incluyen.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_126",
    "contenido": "Comunicación a distancia con familiares u otras personas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_126_1",
        "descripcion": "Participa con ideas en la elaboración de un texto para alguien que vive en otro lugar, a través del dictado a la o el docente o de la escritura autónoma.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_126_2",
        "descripcion": "Comprende los elementos y procedimientos necesarios para enviar un mensaje a personas que viven lejos, ya sea por medios físicos o electrónicos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_127",
    "contenido": "Conversaciones o entrevistas con personas de la comunidad y otros lugares.",
    "pdas": [
      {
        "pda_id": "PDA_SB_127_1",
        "descripcion": "Formula preguntas acordes al tema que abordará una persona invitada y escucha de manera atenta la información.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_127_2",
        "descripcion": "Recupera con sus palabras la información que escuchó sobre el tema que abordó una persona invitada.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_128",
    "contenido": "Descripción de objetos, lugares y seres vivos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_128_1",
        "descripcion": "Describe de manera oral y/o escrita, en su lengua materna, objetos, lugares y seres vivos reales o ficticios.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_128_2",
        "descripcion": "Representa objetos, lugares y seres vivos de forma plástica, sonora, corporal, teatral y/o por medio de otros lenguajes artísticos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_129",
    "contenido": "Elaboración y difusión de notas informativas en la escuela y el resto de la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_129_1",
        "descripcion": "Identifica las características de una nota informativa y sus funciones.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_129_2",
        "descripcion": "Reflexiona sobre la importancia de la veracidad en las notas informativas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_129_3",
        "descripcion": "Colabora en la escritura colectiva de notas informativas breves, respetando sus principales características y funciones.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_130",
    "contenido": "Empleo de textos con instrucciones para participar en juegos, usar o elaborar objetos, preparar alimentos u otros propósitos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_130_1",
        "descripcion": "Sigue instrucciones, orales o escritas, para preparar un alimento sencillo y saludable (receta), utilizar o construir un objeto y/o participar en un juego o alguna otra actividad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_130_2",
        "descripcion": "Explica a sus compañeras y compañeros las instrucciones que siguió y revisa el proceso, así como el resultado.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_131",
    "contenido": "Escritura colectiva por medio del dictado.",
    "pdas": [
      {
        "pda_id": "PDA_SB_131_1",
        "descripcion": "Reconoce espacios, alineación y direccionalidad, izquierda-derecha y arriba-abajo, entre palabras y enunciados.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_131_2",
        "descripcion": "DEscribe, aunque no de manera convencional, ideas que quiere comunicar y las verbaliza para colaborar en la escritura colectiva de diferentes tipos de texto por medio del dictado al docente.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_131_3",
        "descripcion": "Identifica palabras que se repiten en distintos textos o en diferentes partes de un mismo texto y descubre que se escriben de la misma forma.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_131_4",
        "descripcion": "Descubre el valor sonoro convencional de las letras y lo utiliza como criterio para organizar su escritura.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_131_5",
        "descripcion": "Establece correspondencias entre la oralidad y la escritura.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_132",
    "contenido": "Escritura de nombres en la lengua materna.",
    "pdas": [
      {
        "pda_id": "PDA_SB_132_1",
        "descripcion": "DEscribe su nombre y lo comparacon los nombres de sus compañeros, lo usa para indicar la autoría de sus trabajos, marcar sus útiles escolares, registrar su asistencia, entre otros.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_132_2",
        "descripcion": "Identifica nombres más largos o cortos que el suyo, nombres que empiezan o terminan con la misma letra que el propio, sus iniciales, el diminutivo de su nombre, etcétera",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_133",
    "contenido": "Experimentación con elementos sonoros en composiciones literarias.",
    "pdas": [
      {
        "pda_id": "PDA_SB_133_1",
        "descripcion": "Escucha y lee poemas, trabalenguas y adivinanzas, para disfrutarlos y conocer algunos recursos lingüísticos, como la rima, la onomatopeya y el calambur.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_133_2",
        "descripcion": "Reconoce la función y características de la rima (sonoridad, ritmo, musicalidad), así como la semejanza gráfica entre las palabras que riman.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_133_3",
        "descripcion": "Produce rimas sencillas a partir de situaciones cotidianas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_133_4",
        "descripcion": "Interactúa con distintos poemas, trabalenguas y adivinanzas, para reconocer sus elementos sonoros.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_134",
    "contenido": "Exploración de testimonios escritos, fotográficos y audiovisuales del pasado familiar y comunitario.",
    "pdas": [
      {
        "pda_id": "PDA_SB_134_1",
        "descripcion": "Expresa lo que sabe de su familia o de alguna persona cercana, a través de fotografías, eventos, objetos, comidas, entre otros elementos que permitan reconocer sus identidades individual y colectiva en relación con el reconocimiento del pasado.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_134_2",
        "descripcion": "Reconoce diversos sucesos familiares y comunitarios que ocurrieron antes de que naciera y reflexiona sobre su relación con el presente.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_135",
    "contenido": "Interacción con manifestaciones culturales y artísticas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_135_1",
        "descripcion": "Interactúa con manifestaciones culturales y artísticas presentes en la comunidad, para reflexionar y dialogar sobre las emociones y sentimientos que le producen.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_135_2",
        "descripcion": "Reconoce que los seres humanos expresan sensaciones, emociones, sentimientos e ideas por medio de los lenguajes empleados en las manifestaciones culturales y artísticas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_135_3",
        "descripcion": "Identifica que las manifestaciones culturales y artísticas evidencian distintas formas de ser, estar y nombrar el mundo, haciendo uso de los elementos de los lenguajes artísticos; por ejemplo, formas, sonidos, colores, movimientos o gestos.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_136",
    "contenido": "Intervención del entorno familiar y escolar para imaginar y realizar propuestas de mejora.",
    "pdas": [
      {
        "pda_id": "PDA_SB_136_1",
        "descripcion": "Explora, desde la perspectiva de género, las cualidades del entorno familiar y escolar y las representa mediante el uso intencional de formas, colores, texturas, sonidos, movimientos y gestos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_136_2",
        "descripcion": "Experimenta creativamente con cambios en la disposición de objetos en el entorno escolar y lo interviene de manera temporal con imágenes, cantos, movimientos, producciones escritas y sonidos para resignificar la percepción del espacio.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_137",
    "contenido": "Lectura compartida en voz alta.Lectura compartida en voz alta.",
    "pdas": [
      {
        "pda_id": "PDA_SB_137_1",
        "descripcion": "Reconoce que se lee y escribe de izquierda a derecha y de arriba a abajo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_137_2",
        "descripcion": "Sigue la lectura en voz alta que hace la o el maestro (u otras personas alfabetizadas) de recados, cartas, cuentos, notas informativas, poemas, canciones, anuncios publicitarios, instructivos, etcétera.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_137_3",
        "descripcion": "Establece correspondencias entre oralidad y escritura.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_137_4",
        "descripcion": "Hace comentarios y preguntas sobre textos que escucha y acerca de palabras o ideas que no entiende.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_137_5",
        "descripcion": "Verifica o confirma información acerca del contenido de textos, mediante la relectura de fragmentos o textos completos.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_137_6",
        "descripcion": "Lee en voz alta letreros, carteles, recados, mensajes y otros textos de su elección.",
        "orden": 6
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_138",
    "contenido": "Lectura, escritura y otros tipos de interacción mediante lenguajes que ocurren en el contexto familiar.",
    "pdas": [
      {
        "pda_id": "PDA_SB_138_1",
        "descripcion": "Explora portadores de texto, como libros, revistas, documentos digitales, entre otros, quese encuentran en su ambiente familiar, si alguien los usa, con qué propósitos y en qué lengua están.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_139",
    "contenido": "Narración de actividades y eventos relevantes que tengan lugar en la familia, la escuela o el resto de la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_139_1",
        "descripcion": "Relata historias relacionadas con actividades y eventos que tienen lugar en su entorno inmediato, cuidando el orden lógico de los hechos y el volumen de voz.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_139_2",
        "descripcion": "Identifica la secuencia de acciones y a los protagonistas y otros personajes involucrados en una historia.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_139_3",
        "descripcion": "Reconoce que, para que una narración se entienda, debe cuidarse tanto la coherencia como la claridad de lo que se expresa.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_139_4",
        "descripcion": "Responde preguntas que le hacen sobre su narración.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_139_5",
        "descripcion": "Recrea y comparte una historia personal con viñetas conformadas de dibujo y texto, cuidando el orden lógico de los hechos.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_140",
    "contenido": "Producción de textos dirigidos a autoridades y personas de la comunidad, en relación con necesidades, intereses o actividades escolares.",
    "pdas": [
      {
        "pda_id": "PDA_SB_140_1",
        "descripcion": "Identifica necesidades de la escuela y de la localidad a partir de preguntas y observaciones que involucran a las compañeras y los compañeros, familiares, las vecinas y los vecinos, las y los docentes, autoridades y otras personas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_140_2",
        "descripcion": "Identifica a personas de la comunidad que pueden contribuir a la solución de necesidades previstas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_140_3",
        "descripcion": "Elabora, en colectivo, dibujos y textos que expliquen las necesidades identificadas y mediante los cuales soliciten la intervención de personas que podrían contribuir para satisfacerlas.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_141",
    "contenido": "Producción e interpretación de avisos, carteles, anuncios publicitarios y letreros en la vida cotidiana.",
    "pdas": [
      {
        "pda_id": "PDA_SB_141_1",
        "descripcion": "Identifica las características y funciones de letreros, carteles, avisos y otros textos públicos que se hallan en su contexto escolar y, en general, comunitario.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_141_2",
        "descripcion": "Propone ideas para la elaboración colectiva de letreros, carteles y/o avisos que contribuyan a lograr propósitos individuales y colectivos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_142",
    "contenido": "Reconocimiento de la diversidad lingüística y cultural en la familia, la escuela y el resto de la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_142_1",
        "descripcion": "Identifica distintas maneras de emplear la lengua materna en su familia, escuela y el resto de la comunidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_142_2",
        "descripcion": "Reflexiona sobre las diferencias al emplear la lengua materna en función de la edad y el lugar de procedencia de los hablantes.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_142_3",
        "descripcion": "Comprende y aprecia la diversidad lingüística y cultural de su comunidad por medio del reconocimiento de expresiones en su lengua materna empleadas en la familia y la escuela.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_143",
    "contenido": "Recreación de historias mediante el uso artístico de las palabras, del cuerpo, del espacio y del tiempo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_143_1",
        "descripcion": "Interpreta historias sencillas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_143_2",
        "descripcion": "Reconoce características principales de diferentes historias (nudo, personajes, tiempo y espacio), para imaginar otros finales.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_143_3",
        "descripcion": "Crea cómics a partir de una experiencia personal o de una lectura.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_143_4",
        "descripcion": "Emplea el cuerpo en una secuencia de movimientos para contar una historia sencilla o representar una narración de su interés.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_143_5",
        "descripcion": "Juega a hacer improvisaciones teatrales modificando el espacio y tiempo por medio de la ficción para crear historias propias.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_144",
    "contenido": "Reflexión sobre los medios de comunicación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_144_1",
        "descripcion": "Describe y opina sobre lo que ve o escucha cotidianamente en medios de comunicación, como radio y televisión.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_144_2",
        "descripcion": "Reflexiona sobre lo que ve, escucha y siente al interactuar con distintos medios de comunicación.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_145",
    "contenido": "Registro y/o resumen de información consultada en fuentes orales, escritas, audiovisuales, táctiles o sonoras, para estudiar y/o exponer.",
    "pdas": [
      {
        "pda_id": "PDA_SB_145_1",
        "descripcion": "Registra sobre un tema de su interés, por medio de la escritura, esquema, dibujo, fotografía y video, a partir de la escucha, lectura, observación u otra manera de interactuar con alguna fuente de información.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_145_2",
        "descripcion": "Comparte o expone la información registrada",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_146",
    "contenido": "Representación de distintas formas de ser y estar en el mundo a partir de la ficción.",
    "pdas": [
      {
        "pda_id": "PDA_SB_146_1",
        "descripcion": "Lee de forma individual y colectiva textos que contengan seres imaginarios, para representarlos empleando elementos de los lenguajes artísticos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_146_2",
        "descripcion": "Crea personajes ficticios, empleando formas, colores, texturas, movimientos, gestos y sonidos, a partir de una narración, poema, canción, pintura, escultura, película, historieta u obra de teatro.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_147",
    "contenido": "Uso de convenciones de la escritura presentes en la cotidianeidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_147_1",
        "descripcion": "Distingue letras de números, u otros signos o marcas gráficas que identifica y traza en textos de uso cotidiano.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_147_2",
        "descripcion": "Reconoce espacios, alineación y direccionalidad (izquierda-derecha y arriba-abajo) entre palabras y entre enunciados.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_147_3",
        "descripcion": "Comprende que cada letra tiene varias posibilidades de escritura: mayúsculas, minúsculas o variaciones de estilo.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_147_4",
        "descripcion": "Asocia los sonidos vocálicos con sus letras correspondientes, así como los sonidos consonánticos más significativos para ellos, o más usuales en su lengua",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_147_5",
        "descripcion": "Identifica de manera inicial otros signos que acompañan las letras en la escritura.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_147_6",
        "descripcion": "Conoce formas de organización de textos en otras lenguas: originarias, árabe, chino, hebreo, etcétera.",
        "orden": 6
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_148",
    "contenido": "Uso de elementos de los lenguajes artísticos en la vida cotidiana.",
    "pdas": [
      {
        "pda_id": "PDA_SB_148_1",
        "descripcion": "Reconoce que los movimientos, imágenes y sonidos constituyen lenguajes que permiten la comunicación.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_148_2",
        "descripcion": "Experimenta con formas, colores, sonidos, texturas, movimientos o gestos para expresar sensaciones, emociones, sentimientos e ideas que surgen en el entorno.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_148_3",
        "descripcion": "Imita sonidos o imágenes del entorno con su cuerpo o con objetos a su disposición.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_149",
    "contenido": "Uso de los lenguajes artísticos para expresar rasgos de las identidades personal y colectiva.",
    "pdas": [
      {
        "pda_id": "PDA_SB_149_1",
        "descripcion": "Representa lo que le significa su nombre; es decir, el sentido que le da, por medio de formas, colores, texturas, sonidos, movimientos y/o gestos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_149_2",
        "descripcion": "Recrea elementos de la naturaleza que le despiertan asombro mediante formas, colores, sonidos, movimientos y gestos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_149_3",
        "descripcion": "Crea una producción artística colectiva, como un mural, video, exposición de dibujos o fotografías, en la que se compartan y expresen gustos e intereses personales y colectivos.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_150",
    "contenido": "Uso del dibujo y/o la escritura para recordar actividades y acuerdos escolares.",
    "pdas": [
      {
        "pda_id": "PDA_SB_150_1",
        "descripcion": "DEscribe y/o dibuja para realizar tareas en casa, recordar mensajes, llevar materiales a clase, registrar acuerdos, etcétera.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_151",
    "contenido": "Beneficios del consumo de alimentos saludables, de agua simple potable, y de la práctica de actividad física.",
    "pdas": [
      {
        "pda_id": "PDA_SB_151_1",
        "descripcion": "Indaga, registra y compara el tipo, la frecuencia y la cantidad de bebidas y alimentos que consume de manera personal en casa y la escuela.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_151_2",
        "descripcion": "Explica y representa los beneficios de consumir alimentos saludables (frutas, verduras, cereales, leguminosas y de origen animal), y agua simple potable, al compararlos con alimentos con alto contenido de azúcar, grasa y sal, y bebidas azucaradas; toma decisiones a favor de una alimentación saludable.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_151_3",
        "descripcion": "Describe los alimentos y bebidas saludables que consume en casa, escuela y comunidad, y que junto con la práctica de actividad física le ayudan a crecer y evitar enfermedades.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_152",
    "contenido": "Cambios y regularidades de fenómenos naturales y actividades de las personas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_152_1",
        "descripcion": "Reconoce la sucesión del día y la noche a partir de describir cronológicamente las actividades personales, familiares y comunitarias que se realizan, teniendo como referencia la presencia del Sol y la Luna, así como algunas de sus características perceptibles como forma, cambio de posición, y emisión de luz y calor.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_152_2",
        "descripcion": "Describe y registra de manera cronológica cambios y regularidades del entorno natural durante el día, la noche y a lo largo de una semana, utilizando términos, como ayer, hoy, mañana, los nombres y orden de los días de la semana y las relaciones temporales “antes de” y “después de”.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_153",
    "contenido": "Características del entorno natural y sociocultural.",
    "pdas": [
      {
        "pda_id": "PDA_SB_153_1",
        "descripcion": "Distingue, describe y registra, en su lengua materna, las características del entorno natural: plantas, animales, cuerpos de agua, si hace frío o calor, frecuencia de lluvias y sequías, entre otras.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_153_2",
        "descripcion": "Observa, compara y registra características de plantas y animales, como color, estructura y cubierta corporal, si son domésticos o silvestres; tienen flores, frutos o tienen espinas, raíces u hojas, entre otras, para clasificarlos a partir de criterios propios o consensuados.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_153_3",
        "descripcion": "Identifica y describe algunas prácticas socioculturales que forman parte de su entorno, relacionadas con el tipo de vivienda, vestido, juego, formas de hablar, medir, celebraciones y cuidado de la naturaleza, entre otras.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_153_4",
        "descripcion": "Representa en dibujos o croquis los componentes del entorno natural y sociocultural a partir de algunas referencias espaciales (enfrente, detrás, derecha, izquierda, cerca, lejos, entre otras) y el punto de referencia de la persona observadora.Representa en dibujos o croquis los componentes del entorno natural y sociocultural a partir de algunas referencias espaciales (enfrente, detrás, derecha, izquierda, cerca, lejos, entre otras) y el punto de referencia de la persona observadora.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_154",
    "contenido": "Características del sonido y la luz.",
    "pdas": [
      {
        "pda_id": "PDA_SB_154_1",
        "descripcion": "Indaga y describe los sonidos producidos en su entorno; experimenta con diversos objetos o instrumentos musicales, para identificar la fuente sonora y cómo se produce el sonido (golpear, rasgar o soplar).",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_154_2",
        "descripcion": "Distingue, clasifica y registra en tablas, algunas características del sonido a partir de percibir distintos sonidos, como intensidad o volumen (qué tan fuerte o débil es), tono (agudo o grave) y duración (largo o corto).",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_154_3",
        "descripcion": "Establece relaciones entre la intensidad del sonido, la generación de problemas auditivos y la contaminación auditiva; propone y difunde medidas para el cuidado de la salud.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_154_4",
        "descripcion": "Indaga cómo fabricar un juguete o instrumento musical que produzca sonido, construye uno y explica su funcionamiento y las características del sonido que produce.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_155",
    "contenido": "Construcción de la noción de suma y resta, y su relación como operaciones inversas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_155_1",
        "descripcion": "Reconoce, a partir de la resolución de situaciones que implican agregar, quitar, juntar, comparar y completar, que la suma es el total de dos o más cantidades y la resta, como la pérdida de elementos en una colección.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_155_2",
        "descripcion": "Resuelve problemas vinculados a su contexto que implican sumas o restas (sin hacer uso del algoritmo convencional) con cantidades de hasta dos dígitos; representa de diversas formas (material concreto, representaciones gráficas) sumas y restas, incluyendo los signos “+”, “−”, “=” y numerales.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_155_3",
        "descripcion": "Utiliza, explica y comprueba sus estrategias para calcular mentalmente sumas o restas con números naturales de una cifra.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_156",
    "contenido": "Cuerpo humano: estructura externa, acciones para su cuidado y sus cambios como parte del crecimiento.",
    "pdas": [
      {
        "pda_id": "PDA_SB_156_1",
        "descripcion": "Compara y representa las partes externas del cuerpo humano, explica su funcionamiento; propone y practica acciones para cuidarlo y argumenta la frecuencia con que es recomendable llevarlas a cabo y por qué.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_156_2",
        "descripcion": "Describe sus características físicas y las de sus pares para favorecer el autoconocimiento y reconocer que todos los cuerpos son especiales, únicos e irrepetibles y merecen ser respetados.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_156_3",
        "descripcion": "Identifica, representa cronológicamente y comunica cómo es ahora y cómo era antes con base en características físicas, gustos, intereses, o actividades que realiza, e infiere algunos cambios que tendrá en el futuro al compararse con personas mayores y reconoce que son parte del crecimiento.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_157",
    "contenido": "Cuerpos geométricos y sus características.",
    "pdas": [
      {
        "pda_id": "PDA_SB_157_1",
        "descripcion": "Observa y manipula objetos de su entorno para identificar y describir líneas rectas o curvas, caras planas o curvas; los representa mediante diversos procedimientos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_158",
    "contenido": "Efectos de la aplicación de fuerzas: movimiento y deformación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_158_1",
        "descripcion": "Observa de manera directa o en diversos medios, la trayectoria (recta, curva o circular) y rapidez (rápido o lento) de diferentes animales al desplazarse, como: mariposas, zopilotes, colibríes, hormigas, delfines, serpientes, entre otros, y registra sus conclusiones.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_158_2",
        "descripcion": "Experimenta con objetos al empujarlos y jalarlos para describir cómo se mueven, modifican su estado de reposo, se detiene, o cambian de sentido o rapidez; registra sus observaciones y conclusiones.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_158_3",
        "descripcion": "Caracteriza el movimiento con base en términos comunes, como “más lento que, más rápido que” y la descripción de diferentes trayectorias: recta, curva o circular.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_159",
    "contenido": "Estudio de los números.",
    "pdas": [
      {
        "pda_id": "PDA_SB_159_1",
        "descripcion": "Expresa oralmente la sucesión numérica en su lengua materna y en español, primero hasta 20, luego hasta 40, posteriormente hasta 60 y finalmente hasta 120 elementos, o hasta donde sea posible en su lengua materna, de manera ascendente y descendente a partir de un número dado.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_159_2",
        "descripcion": "A través de situaciones cotidianas, cuenta, ordena, representa de diferentes formas, interpreta, lee y escribe la cantidad de elementos de una colección, primero de hasta 5, después hasta de 10 y paulatinamente de hasta 100 elementos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_159_3",
        "descripcion": "Identifica regularidades en la sucesión numérica hasta 100.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_160",
    "contenido": "Figuras geométricas y sus características.",
    "pdas": [
      {
        "pda_id": "PDA_SB_160_1",
        "descripcion": "epresenta animales, plantas u objetos utilizando el tangram y otras figuras geométricas, para reconocer y describir oralmente y por escrito sus nombres y propiedades (forma y número de lados y vértices), utilizando paulatinamente un lenguaje formal para referirse a ellas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_161",
    "contenido": "Impacto de las actividades humanas en el entorno natural, así como acciones y prácticas socioculturales para su cuidado.",
    "pdas": [
      {
        "pda_id": "PDA_SB_161_1",
        "descripcion": "Identifica actividades personales, familiares y de la comunidad que impactan en la naturaleza y en la salud de las personas, las registra y clasifica como positivas o negativas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_161_2",
        "descripcion": "Propone y participa en acciones y prácticas socioculturales de su comunidad que favorecen el cuidado del entorno natural; expresa la importancia de establecer relaciones más armónicas con la naturaleza.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_162",
    "contenido": "Medición de longitud, masa y capacidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_162_1",
        "descripcion": "Compara la longitud de objetos de manera directa e indirecta con apoyo de un intermediario (objetos o partes de su cuerpo); determina cuál es el mayor, el menor o si son iguales y expresa el resultado de la comparación en su lengua materna y en español, con dibujos y numerales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_162_2",
        "descripcion": "Sopesa objetos para estimar cuál tiene mayor o menor masa; comprueba su estimación con el apoyo de una balanza.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_163",
    "contenido": "Medición del tiempo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_163_1",
        "descripcion": "Utiliza términos como antes, después, hoy, ayer, mañana, etc., en su lengua materna y en español, para describir y registrar cronológicamente actividades en un periodo determinado (día, semana, mes) con el apoyo de calendarios; reconoce que la semana está integrada por siete días que ocurren cíclicamente.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_164",
    "contenido": "Objetos del entorno: características, propiedades, estados físicos y usos en la vida cotidiana.",
    "pdas": [
      {
        "pda_id": "PDA_SB_164_1",
        "descripcion": "Observa, manipula y compara diversos objetos a partir de características como color, tamaño, olor, textura, material de qué están hechos (madera, vidrio, metal, plástico), entre otras, para clasificarlos con base en criterios propios o consensuados.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_164_2",
        "descripcion": "Explora y experimenta con diversos materiales para explicar sus propiedades: flexible (se puede doblar o no); ligero o pesado; elástico (regresa o no a su forma original después de haber sido estirado) y resistente (difícil o fácil de romper); los clasifica de acuerdo con ellas y argumenta sus conclusiones.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_164_3",
        "descripcion": "Establece relaciones entre las propiedades de los materiales con el uso que se les da al elaborar ciertos objetos, como el plástico con el cual se hacen bolsas, envases, sillas, cubiertos, juguetes, plumas, entre otros; diseña y construye un objeto o juguete con base en las propiedades físicas de los materiales.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_165",
    "contenido": "Organización e interpretación de datos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_165_1",
        "descripcion": "Elabora registros de datos mediante distintos recursos como pictogramas o tablas para responder preguntas de su interés.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_166",
    "contenido": "Atención a las necesidades básicas, como parte del ejercicio de los derechos humanos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_166_1",
        "descripcion": "Relaciona la atención de sus necesidades básicas (alimentación, salud, y vivienda, entre otras) que forman parte del eje cicio de sus derechos humanos y comprende la importancia de que todas las personas accedan a ellos y los ejerzan, independientemente del género, edad, pueblo y comunidad, lengua, nacionalidad, religión, discapacidad o cualquier otro origen o condición.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_167",
    "contenido": "Cambios en la naturaleza del lugar donde vive, y su relación con las actividades humanas cotidianas que tienen orden cronológico, asociadas a ciclos agrícolas y festividades, así como su vínculo con la noción de tiempo y espacio histórico (“antes, durante y después”).",
    "pdas": [
      {
        "pda_id": "PDA_SB_167_1",
        "descripcion": "Reconoce que existen diferentes formas de nombrar y entender, tanto a las actividades humanas como su orden cronológico y temporal, de acuerdo con el contexto social y cultural.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_168",
    "contenido": "Construcción de la paz mediante el diálogo: situaciones de conflicto o discrepancia como parte de la interacción de los seres humanos en la casa, el aula, la escuela y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_168_1",
        "descripcion": "Analiza situaciones de conflicto como parte de la interacción de los seres humanos, e identifica los que ha enfrentado o ha observado en su casa, el aula, la escuela y la comunidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_168_2",
        "descripcion": "Describe e identifica a personas que participan en situaciones de conflicto o discrepancia, y usa el diálogo para evitar trascender a la violencia. Reflexiona acerca de que la paz se construye en colectivo mediante el diálogo.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_169",
    "contenido": "Democracia como forma de vida: construcción participativa de normas, reglas y acuerdos para alcanzar metas colectivas y contribuir a una convivencia pacífica en nuestra casa, el aula, la escuela y la comunidad, así como las consecuencias de no respetar acuerdos, reglas y normas escolares y comunitarias.",
    "pdas": [
      {
        "pda_id": "PDA_SB_169_1",
        "descripcion": "Participa en la revisión y construcción de acuerdos y reglas que regulan la convivencia en la familia y el grupo escolar, con la finalidad de atender las necesidades comunes, alcanzar metas colectivas, distribuir las responsabilidades y organizar el tiempo de mejor manera para convivir de forma pacífica.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_170",
    "contenido": "Diversos contextos sociales, naturales y territoriales: cambios y continuidades.",
    "pdas": [
      {
        "pda_id": "PDA_SB_170_1",
        "descripcion": "Identifica que es parte de un barrio, colonia, vecindad, comunidad, pueblo o localidad, y describe las características y diversidad de su entorno, en términos naturales, sociales y territoriales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_170_2",
        "descripcion": "Ubica algunos sitios de interés del lugar donde vive y/o donde se encuentra la escuela con referencias básicas y los representa en dibujos y croquis.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_171",
    "contenido": "El derecho a la igualdad de género y vida sin violencia: estereotipos de género que pueden inducir a formas de violencia, desigualdad y discriminación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_171_1",
        "descripcion": "Analiza que niñas y niños tienen el derecho a participar con igualdad y pueden realizar las mismas actividades deportivas, artísticas y recreativas, tanto en casa como en la escuela.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_171_2",
        "descripcion": "Dialoga acerca de ideas sobre comportamientos de niñas y niños que limitan el derecho a la igualdad y la expresión de sentimientos y emociones, la participación en juegos y actividades.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_171_3",
        "descripcion": "Propone y participa de manera igualitaria en actividades en la casa y en la escuela.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_172",
    "contenido": "Funciones y responsabilidades de las autoridades, de la familia, la escuela y la comunidad para la organización de la convivencia, la resolución de conflictos y el cumplimiento de acuerdos y normas de manera participativa y pacífica.",
    "pdas": [
      {
        "pda_id": "PDA_SB_172_1",
        "descripcion": "Identifica funciones y responsabilidades de las autoridades de su casa, el aula, la escuela, las actividades que realizan, cómo toman las decisiones, cómo conocen las necesidades de los integrantes de su familia o escuela, cómo se distribuyen las tareas y responsabilidades; y establece compromisos para colaborar con las autoridades en favor de la convivencia pacíf ica.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_173",
    "contenido": "Historia de la vida cotidiana: cambios en el tiempo y el espacio ocurridos en la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_173_1",
        "descripcion": "Indaga en fuentes orales, escritas, fotográficas, testimoniales y digitales, los cambios en la vida cotidiana, en el tiempo y el espacio, ocurridos en la comunidad, con relación a las viviendas, los trabajos y las áreas verdes.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_174",
    "contenido": "Historia personal y familiar, diversidad de familias y el derecho a pertenecer a una.",
    "pdas": [
      {
        "pda_id": "PDA_SB_174_1",
        "descripcion": "Indaga en diversas fuentes orales, escritas, digitales, objetos y testimonios, para construir la historia personal y familiar y la representa por medio de dibujos y gráficos como la línea del tiempo; explica similitudes y diferencias con las historias de sus pares, identificando orígenes nacionales o migratorios, étnicos, actividades y trabajos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_175",
    "contenido": "Impacto de las actividades humanas en la naturaleza y sustentabilidad: actividades humanas que afectan a la naturaleza, y la necesidad de establecer compromisos que contribuyan a la preservación, prevención y disminución del impacto socioambiental.",
    "pdas": [
      {
        "pda_id": "PDA_SB_175_1",
        "descripcion": "Describe las actividades que se realizan de manera cotidiana en su casa, escuela y comunidad, e identifica en cada caso, la relación que dicha actividad guarda con la naturaleza, para reconocer situaciones que la benefician o dañan y así valorar sus acciones.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_176",
    "contenido": "Los seres humanos son diversos y valiosos, y tienen derechos humanos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_176_1",
        "descripcion": "Reconoce que todas las personas son únicas, valiosas y tienen el derecho humano de ser parte de familias, grupos escolares, comunidades y pueblos y que esto es parte de sus derechos humanos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_176_2",
        "descripcion": "Identifica acciones y reconoce su derecho a ejercer la libertad de manifestar opiniones, ideas, sentimientos, deseos y necesidades, expresiones que considera propias, así como de recibir cuidados por parte de su familia, comunidad y/o pueblos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_177",
    "contenido": "Manifestaciones culturales y símbolos que identifican a los diversos pueblos indígenas, afr descendientes y migrantes y a México como nación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_177_1",
        "descripcion": "Identifica y valora manifestaciones culturales y símbolos que identifican a la comunidad, pueblo o ciudad que incluyen distintas tradiciones, lenguas, fiestas, danzas, música, historia oral, rituales, gastronomía, artes y saberes, entre otras características. Reconoce sus vínculos con los pueblos indígenas, afromexicanos y/o migrantes, entre otros.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_178",
    "contenido": "Personas en situación de migración y sus derechos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_178_1",
        "descripcion": "Reconoce la necesidad que tienen algunas personas de cambiar de lugar de residencia, para buscar mejores condiciones de vida.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_178_2",
        "descripcion": "Dialoga acerca de experiencias propias o de otras personas de su comunidad que han migrado dentro del país o fuera de México.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_179",
    "contenido": "Respeto a la dignidad e integridad: límites corporales y situaciones de riesgo para prevenir y denunciar situaciones de acoso, abuso y violencia de carácter sexual en la casa, la escuela, la comunidad y con el uso de internet y redes sociales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_179_1",
        "descripcion": "Analiza la importancia del respeto a la dignidad e integridad a partir del cuidado de su cuerpo y reconocer sus límites corporales, diferenciando el contacto físico sano y reconfortante de aquél que nos causa incomodidad y amenaza nuestro bienestar físico o mental, para protección en la familia, en la escuela y la comunidad, considerando también el uso de internet y redes sociales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_179_2",
        "descripcion": "Identifica y rechaza situaciones de riesgo y conductas nocivas que afectan la dignidad e integridad de las personas.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_180",
    "contenido": "Respeto, cuidado y empatía hacia la naturaleza, como parte de un todo interdependiente.",
    "pdas": [
      {
        "pda_id": "PDA_SB_180_1",
        "descripcion": "Describe y reconoce la existencia de otros seres vivos (animales, plantas, hongos y microorganismos), y componentes de la naturaleza (ríos, mares, lagos, distintos suelos, montañas, valles y aire, entre otros) presentes en el lugar donde vive.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_180_2",
        "descripcion": "Analiza las formas de interactuar y explora las relaciones de cuidado y afectividad, con otros seres vivos y componentes de la naturaleza, los sentimientos que provocan, la importancia de promover el respeto y la empatía hacia todos los seres vivos y a la naturaleza.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_180_3",
        "descripcion": "Comprende cómo las acciones de los seres humanos pueden preservar, modificar o dañar los distintos componentes sociales y naturales del entorno.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_181",
    "contenido": "Responsabilidad compartida en el cuidado de sí y el de nuestro entorno con la familia, la escuela, la comunidad, el uso de internet y redes sociales, para generar espacios de bienestar e inclusión, equidad e igualdad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_181_1",
        "descripcion": "Identifica y describe las responsabilidades compartidas que tienen estudiantes, adultos, padres y autoridades, así como integran tes de la escuela y comunidad, para el cuidado de sí, articulado a la generación de espacios de bienestar e inclusión, equidad e igualdad y un uso responsable de internet y redes sociales.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_182",
    "contenido": "Situaciones de la vida diaria en las que niñas y niños pueden o no tomar decisiones, y en las que se requiere ayuda, valorando los límites y riesgos del entorno.",
    "pdas": [
      {
        "pda_id": "PDA_SB_182_1",
        "descripcion": "Reconoce y ejerce su capacidad para tomar decisiones, distinguiendo situaciones en las que niñas y niños pueden decidir, de aquellas en las que es necesario solicitar ayuda, para no ponerse en riesgo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_182_2",
        "descripcion": "Identifica que cada decisión conlleva una responsabilidad y un compromiso consigo mismo o misma, con la comunidad y la sociedad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "1° de Primaria",
    "contenido_id": "CONT_SB_183",
    "contenido": "Situaciones de violencia, injusticia o discriminación, que afectan a integrantes de nuestras familias, la escuela o la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_183_1",
        "descripcion": "Reconoce actos de violencia, injusticia, desventaja o discriminación que ocurren en diferentes espacios e instituciones (escuela, unidades médicas, servicios públicos, entre otros), y es sensible a la manera en que ello afecta a las personas, colectivos y comunidades que son excluidos por edad, identidad de género, orientación sexual, origen cultural o étnico, el idioma que hablan, su origen nacional, rasgos físicos, discapacidad, religión, condición social y económica, entre otras características.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_184",
    "contenido": "Acciones individuales que repercuten en la conservación y mejora de la salud.",
    "pdas": [
      {
        "pda_id": "PDA_SB_184_1",
        "descripcion": "Reflexiona acerca de situaciones y comportamientos que ponen en riesgo la salud, para promover acciones orientadas a los cuidados personales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_184_2",
        "descripcion": "Compara alimentos naturales y frescos, procesados y ultraprocesados que se consumen en su familia y la escuela, para valorar aquellos que contribuyen a mantener la salud.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_184_3",
        "descripcion": "Socializa alternativas de solución ante riesgo de accidentes, dependencias y formas de violencia, para valorar aquellas que puede llevar a cabo en su familia y la escuela.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_185",
    "contenido": "Actitudes y prácticas que prevalecen entre los hombres y las mujeres en las familias, la escuela y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_185_1",
        "descripcion": "Analiza las situaciones acerca de la participación de hombres y mujeres, en las actividades familiares, incluyendo el sostenimiento económico.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_185_2",
        "descripcion": "Reconoce la aportación de mujeres y hombres, en las actividades de la escuela y la comunidad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_186",
    "contenido": "Apoyos mutuos para favorecer los aprendizajes en el aula diversa.",
    "pdas": [
      {
        "pda_id": "PDA_SB_186_1",
        "descripcion": "Formula opciones de apoyo a sus pares, ante condiciones personales diferentes: lenguas, lenguajes, movilidad, entre otras.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_187",
    "contenido": "Aproximación a las tecnologías de la información y la comunicación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_187_1",
        "descripcion": "Utiliza las tecnologías de la información y la comunicación para investigar temas de su interés.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_187_2",
        "descripcion": "Comparte y organiza la información investigada con sus compañeras y compañeros.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_188",
    "contenido": "Capacidades y habilidades motrices.",
    "pdas": [
      {
        "pda_id": "PDA_SB_188_1",
        "descripcion": "Combina diversos patrones básicos de movimiento para actuar con base en las características de cada juego o situación.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_189",
    "contenido": "Construcción del proyecto de vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_189_1",
        "descripcion": "Explora necesidades e intereses al expresar lo que significan individual y colectivamente para definir metas a lograr, que contribuyan a su atención.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_189_2",
        "descripcion": "Reconoce logros al participar en diferentes situaciones familiares y escolares para replantear su actuación en favor de una mayor confianza, seguridad y bienestar.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_190",
    "contenido": "Educación Integral en Sexualidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_190_1",
        "descripcion": "Diferencia manifestaciones y prácticas presentes en distintos ámbitos (escolar, laboral, social, cultural u otros), para reconocer aquellas que inciden en la construcción de la identidad de género.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_191",
    "contenido": "Efectos de la pandemia de COVID- 19 en las familias, la escuela y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_191_1",
        "descripcion": "Expresa, mediante diferentes recursos, sus experiencias sobre los cambios en la vida y las actividades durante la pandemia en las familias, la escuela y la comunidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_191_2",
        "descripcion": "Reflexiona en torno a sus experiencias en cuanto al aprendizaje en línea, cambios en las relaciones con sus pares y nuevas formas de comunicación a través de las tecnologías digitales.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_192",
    "contenido": "Estilos de vida activos y saludables.",
    "pdas": [
      {
        "pda_id": "PDA_SB_192_1",
        "descripcion": "Reconoce propuestas lúdicas o expresivas que fomentan su disfrute y práctica cotidiana para favorecer una vida activa y saludable.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_193",
    "contenido": "Formas de ser, pensar, actuar y relacionarse.",
    "pdas": [
      {
        "pda_id": "PDA_SB_193_1",
        "descripcion": "Explora sus posibilidades y las de otras personas para mostrar empatía acerca de las situaciones y condiciones que inciden en el desarrollo personal y colectivo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_194",
    "contenido": "Historia personal y familiar.",
    "pdas": [
      {
        "pda_id": "PDA_SB_194_1",
        "descripcion": "DEscribe acerca de sucesos de su historia personal y familiar y los apoya con dibujos, fotografías o imágenes, ordenados cronológicamente.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_195",
    "contenido": "Interacción motriz.",
    "pdas": [
      {
        "pda_id": "PDA_SB_195_1",
        "descripcion": "Reflexiona acerca de las normas básicas de convivencia en el juego y las actividades cotidianas, con el propósito de asumir actitudes que fortalezcan la interacción.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_196",
    "contenido": "La comunidad como el espacio en el que se vive y se encuentra la escuela.",
    "pdas": [
      {
        "pda_id": "PDA_SB_196_1",
        "descripcion": "Identifica las ventajas que conlleva: la seguridad, el intercambio, el sentido de pertenencia, la afectividad, el ser parte de una comunidad, barrio, unidad habitacional u otros espacios y grupos sociales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_196_2",
        "descripcion": "Reconoce diferentes problemáticas sociales y ambientales de su comunidad, y reflexiona sobre algunas acciones para solucionarlas.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_197",
    "contenido": "Los afectos y su influencia en el bienestar.",
    "pdas": [
      {
        "pda_id": "PDA_SB_197_1",
        "descripcion": "Considera las reacciones emocionales para la toma de decisiones de forma asertiva ante situaciones de la vida diaria, con el fin de lograr bienestar individual y colectivo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_197_2",
        "descripcion": "Reflexiona sobre experiencias personales en las que las emociones le ayudaron en la resolución de situaciones cotidianas.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_198",
    "contenido": "Pensamiento lúdico, divergente y creativo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_198_1",
        "descripcion": "Propone soluciones ante retos y conflictos que se presentan en juegos y actividades, para promover la participación, el respeto y la colaboración.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_199",
    "contenido": "Posibilidades cognitivas, expresivas, motrices, creativas y de relación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_199_1",
        "descripcion": "Experimenta acciones que implican comunicación y expresión por medio del cuerpo, para asignar un carácter personal a sus movimientos y mejorar la interacción.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_200",
    "contenido": "Prácticas de prevención y respuesta ante desastres ambientales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_200_1",
        "descripcion": "Elabora y redacta acuerdos y normas, para actuar adecuadamente ante situaciones de desastres ambientales en su contexto.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_201",
    "contenido": "Sentido de comunidad y satisfacción de necesidades humanas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_201_1",
        "descripcion": "Reconoce ideas, conocimientos, prácticas culturales y formas de organización, para explicar el significado que tienen en su familia y comunidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_201_2",
        "descripcion": "Identifica las necesidades de su comunidad y las formas de satisfacerlas a partir del uso del cuerpo o los objetos y la organización de las personas para explorar otras alternativas de atenderlas.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_202",
    "contenido": "Sentido de pertenencia a la familia y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_202_1",
        "descripcion": "Entrevista a familiares o integrantes de su comunidad acerca de los aspectos que se comparten entre todas y todos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_202_2",
        "descripcion": "Responde sobre ¿quiénes somos?, ¿de dónde somos? y ¿qué tenemos en común?",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_203",
    "contenido": "Situaciones de riesgo social en las familias, escuela y comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_203_1",
        "descripcion": "Propone prácticas de autocuidado, de no violencia y convivencia pacífica.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_203_2",
        "descripcion": "Identifica personas e instituciones que pueden ayudar en situaciones de riesgo.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_204",
    "contenido": "Apreciación de canciones, rondas infantiles, arrullos y cuentos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_204_1",
        "descripcion": "Explora los elementos paratextuales de los libros (como portada, contraportada, título, ilustraciones, formato) que contienen los cuentos que escuchará y/o leerá, y anticipa su contenido.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_204_2",
        "descripcion": "Escucha y/o lee cuentos de libros explorados, y, al finalizar, verifica las anticipaciones realizadas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_204_3",
        "descripcion": "Emplea palabras cuya escritura conoce como pistas para la lectura de títulos y nombres de personajes y lugares donde se desarrollan las historias.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_204_4",
        "descripcion": "Identifica las historias y personajes principales de los cuentos escuchados y/o leídos, y representa algunos por medio de títeres, esculturas, dibujos u objetos cotidianos.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_205",
    "contenido": "Comunicación a distancia con familiares u otras personas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_205_1",
        "descripcion": "Conoce diversas formas de comunicación a distancia, explica cómo funcionan y utiliza al menos una, de acuerdo con las posibilidades de su contexto.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_206",
    "contenido": "Conversaciones o entrevistas con personas de la comunidad y otros lugares.",
    "pdas": [
      {
        "pda_id": "PDA_SB_206_1",
        "descripcion": "Formula y ajusta sus preguntas en función de la información que requiere.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_206_2",
        "descripcion": "Recupera la información que escuchó, para relacionarla con otra información, en textos escritos o en otros medios y contextos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_207",
    "contenido": "Descripción de objetos, lugares y seres vivos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_207_1",
        "descripcion": "Describe de forma oral y escrita, en su lengua materna, objetos, lugares y seres vivos de su entorno natural y social.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_207_2",
        "descripcion": "Representa objetos, lugares y seres vivos de forma plástica, sonora, corporal, teatral y/o por medio de otros lenguajes artísticos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_208",
    "contenido": "Elaboración y difusión de notas informativas en la escuela y el resto de la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_208_1",
        "descripcion": "Identifica las características de una nota informativa y sus funciones.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_208_2",
        "descripcion": "Indaga sobre hechos relevantes para su comunidad y elabora notas informativas escritas sobre estos, con o sin ilustraciones..",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_208_3",
        "descripcion": "Difunde notas informativas en portadores de texto impresos o electrónicos, como periódico mural, boletín comunitario, blogs, portales de internet.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_209",
    "contenido": "Empleo de textos con instrucciones para participar en juegos, usar o elaborar objetos, preparar alimentos u otros propósitos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_209_1",
        "descripcion": "Realiza actividades a partir de la lectura de instructivos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_209_2",
        "descripcion": "Explica a sus compañeras y compañeros el proceso a seguir para el uso o construcción de objetos y para llevar a cabo otra actividad.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_209_3",
        "descripcion": "DEscribe, con el apoyo opcional de imágenes, instrucciones para uso o construcción de objetos, realizar actividades o algún otro propósito.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_210",
    "contenido": "Escritura colectiva por medio del dictado.",
    "pdas": [
      {
        "pda_id": "PDA_SB_210_1",
        "descripcion": "Produce diferentes textos de manera colectiva, mediante el dictado, tomando en cuenta el propósito comunicativo, las y los destinatarios y los tipos de texto.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_210_2",
        "descripcion": "Elabora colectivamente cuentos, versos rimados y otros textos con secuencia lógica, descripción de personajes y lugares.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_210_3",
        "descripcion": "Reconoce distintas formas de organización en los diferentes tipos de texto.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_210_4",
        "descripcion": "Identifica otros signos que acompañan a las letras en la escritura (interrogación, exclamación, puntos, comas, vírgula, etcétera).",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_210_5",
        "descripcion": "Revisa y corrige el texto que dicta o le dictan, a fin de verificar que se entiende lo que se quiere comunicar; identifica palabras que se repiten y da sugerencias para sustituirlas.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_211",
    "contenido": "Escritura de nombres en la lengua materna.",
    "pdas": [
      {
        "pda_id": "PDA_SB_211_1",
        "descripcion": "DEscribe su nombre y apellidos y de sus de familiares, profesoras y profesores, pares y otras personas de su entorno para indicar autoría, pertenencia e identidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_211_2",
        "descripcion": "Compara características de c, s, z, b, v, h, g, j, i, y, ll, k, q, r, rr, w, x, etcétera.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_212",
    "contenido": "Experimentación con elementos sonoros en composiciones literarias.",
    "pdas": [
      {
        "pda_id": "PDA_SB_212_1",
        "descripcion": "Identifica rimas, onomatopeyas, calambures y otros elementos sonoros en diferentes composiciones literarias.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_212_2",
        "descripcion": "Participa lúdicamente en el dis frute y creación de juegos de palabras con cualidades sonoras, en las que se empleen recursos lingüísticos, como la rima, la onomatopeya y el calambur.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_212_3",
        "descripcion": "Crea una secuencia sonora en la que explore variaciones de intensidad, duración, tono y timbre, para representar las sensaciones, emociones, sentimientos e ideas que le provocan las composiciones literarias.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_213",
    "contenido": "Exploración de testimonios escritos, fotográficos y audiovisuales del pasado familiar y comunitario.",
    "pdas": [
      {
        "pda_id": "PDA_SB_213_1",
        "descripcion": "Expresa ideas y emociones del pasado familiar y comunitario a través de fotografías, eventos, objetos, comidas, entre otros elementos que permitan reconocer sus identidades individual y colectiva en relación con el reconocimiento del pasado.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_213_2",
        "descripcion": "Produce textos y dibujos sobre sucesos familiares y comunitarios que ocurrieron antes de que naciera y su relación con el presente.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_214",
    "contenido": "Interacción con manifestaciones culturales y artísticas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_214_1",
        "descripcion": "Explora manifestaciones culturales y artísticas y las relaciona con experiencias e ideas propias, para reconocerse como miembro de una comunidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_214_2",
        "descripcion": "Interactúa con manifestaciones culturales y artísticas de su comunidad, para identificar ras gos de su identidad colectiva.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_214_3",
        "descripcion": "Analiza elementos de los lenguajes presentes en manifestaciones culturales y artísticas de su comunidad, y les da un uso estético al representar rasgos de sus identidades personal y colectiva.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_215",
    "contenido": "Intervención del entorno familiar y escolar para imaginar y realizar propuestas de mejora.",
    "pdas": [
      {
        "pda_id": "PDA_SB_215_1",
        "descripcion": "Reconoce sensaciones, emociones, sentimientos e ideas que le produce el entorno familiar y escolar para expresarlas mediante el uso intencional del cuerpo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_215_2",
        "descripcion": "Imagina posibilidades de cambio y mejora, desde la perspectiva de género, en el entorno familiar y escolar, y las representa usando distintos formatos visuales, sonoros y corporales en una producción artística.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_215_3",
        "descripcion": "Interviene colectivamente el entorno escolar mediante cantos, producciones escritas, movimientos, bailes, objetos y figuras, partiendo de la toma de acuerdos, para identificar y plantear propuestas de solución a un problema.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_216",
    "contenido": "Lectura compartida en voz alta.Lectura compartida en voz alta.",
    "pdas": [
      {
        "pda_id": "PDA_SB_216_1",
        "descripcion": "Relee o pide que le relean en voz alta algún fragmento o pasaje para comprender mejor el significado de lo leído.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_216_2",
        "descripcion": "Comenta con otras personas el contenido de textos que ha escuchado: actitudes de los protagonistas de una historia; datos o situaciones interesantes; alternativas para resolver un problema o atender una necesidad; experiencias personales; reportes sobre noticias, etcétera.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_216_3",
        "descripcion": "Lee en voz alta, para otros y para sí, diversos textos, como cuentos, poemas, canciones, notas informativas, cartas, anuncios publicitarios, etcétera.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_217",
    "contenido": "Lectura, escritura y otros tipos de interacción mediante lenguajes que ocurren en el contexto familiar.",
    "pdas": [
      {
        "pda_id": "PDA_SB_217_1",
        "descripcion": "Realiza actividades de escritura con su familia y registra con quién escribe, qué escribe, para qué escribe, en qué lengua y con qué soporte (cuaderno, computadora, celular, entre otros).",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_218",
    "contenido": "Narración de actividades y eventos relevantes que tengan lugar en la familia, la escuela o el resto de la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_218_1",
        "descripcion": "Narra actividades y eventos que han tenido lugar en la escuela, empleando una organización temporal y causal.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_218_2",
        "descripcion": "Identifica la secuencia de acciones y a los protagonistas y otros personajes involucrados en una historia.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_218_3",
        "descripcion": "Regula, al narrar, las formas de expresarse, cuidando la claridad, secuencia de ideas y precisión.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_218_4",
        "descripcion": "Reconoce y respeta diferentes formas de interactuar, adecuadas a cada situación comunicativa, como la participación por turnos, la escucha activa, etcétera.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_218_5",
        "descripcion": "Recrea y comparte un evento de la escuela con viñetas constituidas por dibujo y texto, cuidando el orden temporal y causal.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_219",
    "contenido": "Producción de textos dirigidos a autoridades y personas de la comunidad, en relación con necesidades, intereses o actividades escolares.",
    "pdas": [
      {
        "pda_id": "PDA_SB_219_1",
        "descripcion": "ndaga sobre necesidades, inte reses y actividades de la escuela, así como sobre las formas en que personas de la comunidad podrían participar a favor de éstos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_219_2",
        "descripcion": "Redacta textos, de manera individual o colectiva, dirigidos a alguna persona o institución de la comunidad, a fin de solicitar su intervención para satisfacer alguna necesidad, interés o invitarle a participar en actividades escolares.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_219_3",
        "descripcion": "Da seguimiento a la solicitud realizada, con apoyo de la o el docente y familiares.Da seguimiento a la solicitud realizada, con apoyo de la o el docente y familiares.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_220",
    "contenido": "Producción e interpretación de avisos, carteles, anuncios publicitarios y letreros en la vida cotidiana.",
    "pdas": [
      {
        "pda_id": "PDA_SB_220_1",
        "descripcion": "Reconoce características y funciones de anuncios publicitarios, que se encuentran en su contexto escolar y, en general, comunitario.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_220_2",
        "descripcion": "Elabora en forma individual y colectiva avisos publicitarios, escribe textos breves con formato de letreros, carteles y avisos, a partir de un propósito comunicativo establecido.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_221",
    "contenido": "Reconocimiento de la diversidad lingüística y cultural en la familia, la escuela y el resto de la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_221_1",
        "descripcion": "Indaga sobre su lengua materna y otras lenguas, ya sean indígenas o extranjeras, que se hablan en su región.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_221_2",
        "descripcion": "Comprende y aprecia la diversidad lingüística y cultural de su comunidad por medio de la escucha y la lectura de textos diversos, como poemas, canciones, mitos y leyendas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_221_3",
        "descripcion": "Analiza y valora la importancia del uso y aprendizaje de su lengua materna.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_222",
    "contenido": "Recreación de historias mediante el uso artístico de las palabras, del cuerpo, del espacio y del tiempo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_222_1",
        "descripcion": "Lee algunas historietas de contenido sencillo y comenta sus impresiones.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_222_2",
        "descripcion": "Reconoce recursos gráficos de los cómics (viñetas, globos, planos) e identifica la función de las onomatopeyas, al emplearlos en la elaboración de cómics que cuentan historias.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_222_3",
        "descripcion": "Comprende la función comunicativa de las onomatopeyas en la lectura y escritura de cómics que publica en el periódico mural o comunitario.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_222_4",
        "descripcion": "Representa una historia inventada en colectivo, utilizando objetos cotidianos como personajes, a los cuales les crea voz y vestuario.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_223",
    "contenido": "Reflexión sobre los medios de comunicación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_223_1",
        "descripcion": "Comenta y cuestiona los contenidos de programas que ve o escucha en los medios de comunicación, para comenzar a construir un criterio propio.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_224",
    "contenido": "Registro y/o resumen de información consultada en fuentes orales, escritas, audiovisuales, táctiles o sonoras, para estudiar y/o exponer.",
    "pdas": [
      {
        "pda_id": "PDA_SB_224_1",
        "descripcion": "Registra información sobre un tema, a partir de la indagación en familia y el resto de la comunidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_224_2",
        "descripcion": "Expone con congruencia, de manera oral o, en su caso, lengua de señas, su registro del tema.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_224_3",
        "descripcion": "Registra y organiza información a través de la escritura, videograbación, esquematización, modelación, sobre temas de su interés, a partir de indagación en libros, revistas, periódicos, audiovisuales y con personas de la comunidad.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_224_4",
        "descripcion": "Expone información registrada y organizada, de manera oral o en lengua de señas, con apoyo de imágenes, sonidos, actuación u otros recursos.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_225",
    "contenido": "Representación de distintas formas de ser y estar en el mundo a partir de la ficción.",
    "pdas": [
      {
        "pda_id": "PDA_SB_225_1",
        "descripcion": "Construye personajes combinando distintas características de las personas y seres vivos de su entorno.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_225_2",
        "descripcion": "nvestiga sobre distintas formas de hablar, pensar, comer, moverse, vestirse y relacionarse de las personas de diferentes comunidades, para otorgarle características a un personaje creado por él.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_225_3",
        "descripcion": "Reconoce que el vestuario, el maquillaje y las máscaras, entre otros recursos, se usan en manifestaciones culturales y artísticas para enriquecer la caracterización de un personaje.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_226",
    "contenido": "Uso de convenciones de la escritura presentes en la cotidianeidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_226_1",
        "descripcion": "Identifica letras en textos escritos en español y en lengua(s) indígena(s).",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_226_2",
        "descripcion": "Diferencia convenciones de la escritura en español y en alguna(s) lengua(s) indígena(s).",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_226_3",
        "descripcion": "Reconoce letras que pueden relacionarse con sonidos diferentes, así como sonidos equivalentes que pueden relacionarse con letras distintas y asocia los sonidos vocálicos y consonánticos con sus letras correspondientes.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_226_4",
        "descripcion": "DEscribe nombres propios iniciando con una mayúscula, empleando espacios entre palabras y comienza a hacer uso de signos de puntuación en su escritura, reflexionando sobre la existencia de las convenciones de los lenguajes.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_227",
    "contenido": "Uso de elementos de los lenguajes artísticos en la vida cotidiana.",
    "pdas": [
      {
        "pda_id": "PDA_SB_227_1",
        "descripcion": "Representa situaciones cotidia nas relacionadas con el entorno natural y social, por medio de movimientos, sonidos e imágenes para comunicar sensaciones, emociones, sentimientos e ideas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_227_2",
        "descripcion": "Crea secuencias con formas, colores, sonidos, texturas, movimientos o gestos para crear una historia que tenga lugar en su vida cotidiana.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_227_3",
        "descripcion": "Experimenta lúdicamente mediante sonidos, movimientos y gestos distintas acciones que se llevan a cabo en la vida cotidiana, para imaginar otras formas de realizarlas.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_228",
    "contenido": "Uso de los lenguajes artísticos para expresar rasgos de las identidades personal y colectiva.",
    "pdas": [
      {
        "pda_id": "PDA_SB_228_1",
        "descripcion": "Reconoce y representa aspectos característicos de su identidad personal a través del uso de formas, colores, texturas, sonidos, movimientos y/o gestos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_228_2",
        "descripcion": "Reconoce aspectos que conforman la identidad colectiva con sus pares y representa rasgos identitarios que comparten mediante formas, colores, texturas, sonidos, movimientos y/o gestos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_228_3",
        "descripcion": "Representa por medio de formas, figuras, colores, texturas, sonidos, movimientos y/o gestos los elementos de la naturaleza que le despiertan distintas emociones, como curiosidad, temor, gusto y asombro.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_229",
    "contenido": "Uso del dibujo y/o la escritura para recordar actividades y acuerdos escolares.",
    "pdas": [
      {
        "pda_id": "PDA_SB_229_1",
        "descripcion": "Registra por escrito instrucciones breves para realizar actividades en casa, listas de materiales o datos, asentar normas, etcétera",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_230",
    "contenido": "Beneficios del consumo de alimentos saludables, de agua simple potable, y de la práctica de actividad física.",
    "pdas": [
      {
        "pda_id": "PDA_SB_230_1",
        "descripcion": "Reconoce y representa el tipo y la cantidad de alimentos que consume en comparación con el consumo de los adultos y con la actividad física que realizan.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_230_2",
        "descripcion": "Reconoce la importancia de una alimentación saludable, que responda a las necesidades y características de la edad y la actividad física de cada persona.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_230_3",
        "descripcion": "Reconoce y clasifica los alimentos y bebidas, que consume en la escuela y en su casa, en naturales, procesados y ultraprocesa dos; e infiere sus implicaciones en la salud.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_230_4",
        "descripcion": "Describe los alimentos y bebidas saludables que se producen localmente (frutas, verduras, carnes, lácteos, fermentados, entre otros) y se consumen en ciertos momentos del año, de acuerdo con su contexto y las prácticas socioculturales.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_231",
    "contenido": "Cambios y regularidades de fenómenos naturales y actividades de las personas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_231_1",
        "descripcion": "Indaga con personas de la comunidad u otros medios de información algunos fenómenos naturales que ocurren durante los meses y el año, y registra sus hallazgos, para establecer regularidades.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_231_2",
        "descripcion": "Observa los cambios en la forma de la Luna a lo largo de un mes, los registra con dibujos teniendo como guía una hoja del calendario que corresponda al mes en que realiza la observación, sin pretender que reconozca los nombres de las fases lunares.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_232",
    "contenido": "Características del entorno natural y sociocultural.",
    "pdas": [
      {
        "pda_id": "PDA_SB_232_1",
        "descripcion": "Compara y describe las características naturales de diferentes lugares de México como desiertos, selvas, arrecifes de coral, manglares, entre otros; a partir de identificar cómo son, si hace frío o calor, la frecuencia con que llueve, cómo son las plantas y los animales que viven en los lugares, o de qué se alimentan.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_232_2",
        "descripcion": "Observa, con apoyo de lupas y lentes de aumento, plantas y animales para comparar y representar sus características: forma y número de patas, lugar donde habitan, cómo se desplazan, qué comen o qué necesitan para vivir, textura y forma de las hojas, tallos, si son árboles, arbustos o yerbas; describe algunas interacciones de plantas y animales con otros componentes naturales (agua, suelo, aire, Sol).",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_232_3",
        "descripcion": "Reconoce y describe cómo las personas aprovechan los componentes naturales para satisfacer sus necesidades de vestido, alimentación y vivienda.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_233",
    "contenido": "Características del sonido y la luz.",
    "pdas": [
      {
        "pda_id": "PDA_SB_233_1",
        "descripcion": "Explora su entorno para distinguir y registrar fuentes naturales y artificiales de luz y su aprovechamiento en actividades cotidianas; indaga beneficios y riesgos de su uso, propone y difunde medidas para el cuidado de la salud.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_233_2",
        "descripcion": "Experimenta y describe características perceptibles de la luz, a partir de la interacción con diferentes fuentes luminosas y materiales (vidrio, madera, metal, papel o plástico) con los que están elaborados objetos transparentes, opacos o brillantes.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_233_3",
        "descripcion": "Experimenta con fuentes de luz y objetos de diferentes materiales para generar sombras e identificar las condiciones necesarias para su formación.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_234",
    "contenido": "Construcción de la noción de multiplicación y división, y su relación como operaciones inversas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_234_1",
        "descripcion": "Resuelve problemas vinculados a su contexto que requieren multiplicar con apoyo de material concreto, sumas iteradas o arreglos rectangulares, que involucran números menores o iguales a 10; reconoce a la multiplicación como la operación que resuelve problemas en los que siempre se suma la misma cantidad y utiliza el signo “×” (por) para representarla.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_234_2",
        "descripcion": "Distingue y explica diferencias entre problemas que se resuelven con sumas de sumandos diferentes y problemas que se resuelven con sumas de sumandos iguales.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_234_3",
        "descripcion": "Utiliza y explica diversas estrategias para calcular mentalmente multiplicaciones de números naturales menores que 10.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_234_4",
        "descripcion": "Resuelve, mediante diversos procedimientos, problemas que implican repartos con divisores menores que 10 y dividendo de dos cifras.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_235",
    "contenido": "Construcción de la noción de suma y resta, y su relación como operaciones inversas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_235_1",
        "descripcion": "Representa con diferentes expresiones aditivas (suma y resta) cantidades menores a 1000.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_235_2",
        "descripcion": "Resuelve problemas que implican avanzar (suma) y retroceder (resta) en la recta numérica.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_235_3",
        "descripcion": "Resuelve situaciones problemáticas vinculadas a su contexto que implican sumas utilizando agrupamientos y el algoritmo convencional con números de hasta dos cifras.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_235_4",
        "descripcion": "Utiliza, explica y comprueba sus estrategias para calcular mentalmente sumas o restas con números naturales de hasta dos cifras.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_236",
    "contenido": "Cuerpo humano: estructura externa, acciones para su cuidado y sus cambios como parte del crecimiento.",
    "pdas": [
      {
        "pda_id": "PDA_SB_236_1",
        "descripcion": "Reconoce y describe los órganos de los sentidos y su función; explica y representa acciones que los ponen en riesgo, así como aquellas que previenen accidentes y que favorecen su cuidado.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_236_2",
        "descripcion": "Identifica los órganos sexuales externos como una característica natural de las personas, utiliza los nombres correctos para referirse a ellos (vulva, pene y testículos), y reconoce la importancia de practicar hábitos de higiene.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_236_3",
        "descripcion": "Reconoce que los órganos sexuales son partes privadas que no deben ser tocadas por otras personas, para propiciar el autoconocimiento, el autocuidado y el respeto.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_237",
    "contenido": "Cuerpos geométricos y sus características.",
    "pdas": [
      {
        "pda_id": "PDA_SB_237_1",
        "descripcion": "Clasifica objetos de su entorno o cuerpos geométricos de acuerdo con distintos criterios (caras planas o curvas, caras iguales); los construye usando cajas, bloques o cubos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_238",
    "contenido": "Efectos de la aplicación de fuerzas: movimiento y deformación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_238_1",
        "descripcion": "Experimenta con objetos de diversos materiales para identificar cómo se deforman al empujarlos, jalarlos, ejercer una presión sobre ellos o hacerlos chocar.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_238_2",
        "descripcion": "Reconoce la deformación de objetos como resultado de la aplicación de una fuerza y su relación con las propiedades de los materiales con los que están hechos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_239",
    "contenido": "Estudio de los números.",
    "pdas": [
      {
        "pda_id": "PDA_SB_239_1",
        "descripcion": "Expresa oralmente la sucesión numérica hasta 1000, en español y hasta donde sea posible en su lengua materna, de manera ascendente y descendente a partir de un número dado.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_239_2",
        "descripcion": "A través de situaciones cotidianas cuenta, ordena, representa de diferentes formas, interpreta, lee y escribe la cantidad de elementos de colecciones con menos de 1000 elementos; identifica regularidades en los números que representan unidades, decenas y centenas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_239_3",
        "descripcion": "Utiliza los símbolos “<”, “>” o “=” para comparar u ordenar dos números.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_240",
    "contenido": "Figuras geométricas y sus características.",
    "pdas": [
      {
        "pda_id": "PDA_SB_240_1",
        "descripcion": "Construye composiciones geométricas cada vez más complejas, por el tipo de figuras o por el número de “piezas”, con el uso del tangram y geoplano",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_240_2",
        "descripcion": "Clasifica y describe polígonos por el número de lados en triángulos, cuadriláteros, pentágonos, hexágonos y octágonos, utilizando paulatinamente un lenguaje formal para referirse a sus propiedades (número de vértices y lados); los construye sobre retículas de cuadrados o puntos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_241",
    "contenido": "Impacto de las actividades humanas en el entorno natural, así como acciones y prácticas socioculturales para su cuidado.",
    "pdas": [
      {
        "pda_id": "PDA_SB_241_1",
        "descripcion": "Describe y representa el efecto que tienen las actividades humanas en plantas, animales, agua, suelo y aire; reflexiona en torno a la manera en cómo se aprovechan y toma decisiones que tengan un menor impacto en el entorno natural y la salud.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_241_2",
        "descripcion": "Identifica, describe y participa en acciones y prácticas socioculturales para disminuir el impacto en plantas, animales, agua, suelo y aire y cuidar el entorno natural.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_242",
    "contenido": "Medición de longitud, masa y capacidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_242_1",
        "descripcion": "Estima, mide, compara, ordena y registra longitudes, usando unidades arbitrarias (objetos o instrumentos de medida) de su comunidad y las representa en rectas numéricas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_242_2",
        "descripcion": "Compara capacidades y masas, usando unidades de medida de la comunidad, o unidades arbitrarias; representa los resultados con dibujos y numerales.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_243",
    "contenido": "Medición del tiempo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_243_1",
        "descripcion": "Describe y registra cronológicamente en tablas, pictogramas o calendarios, hechos y fenómenos naturales y sociales en periodos (día, semana, mes y año), utilizando los términos de su comunidad (actividad recurrente durante todo el ciclo escolar); reconoce que el año está integrado por doce meses que ocurren cíclicamente.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_244",
    "contenido": "Objetos del entorno: características, propiedades, estados físicos y usos en la vida cotidiana.",
    "pdas": [
      {
        "pda_id": "PDA_SB_244_1",
        "descripcion": "Experimenta y compara la temperatura de diversos objetos con el uso de sus sentidos y del termómetro para proponer una escala en la que ubique los objetos de los más fríos a los más calientes; reconoce que este instrumento permite realizar mediciones de temperatura más precisas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_244_2",
        "descripcion": "Identifica los materiales con que están hechos algunos objetos que hay en casa y que le protegen de las quemaduras o que permiten manipular objetos calientes; reconoce la importancia de prevenir quemaduras y propone acciones para evitarlas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_244_3",
        "descripcion": "Identifica los estados físicos del agua a partir de experimentar con la variación de la temperatura y establecer relaciones causa-efecto; reconoce las características de sólidos y líquidos, (si tienen o no una forma definida) y extrapola dichas características a otros materiales.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_245",
    "contenido": "Organización e interpretación de datos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_245_1",
        "descripcion": "Recolecta, organiza, representa e interpreta datos en tablas o pictogramas para responder preguntas de su interés.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_246",
    "contenido": "Atención a las necesidades básicas, como parte del ejercicio de los derechos humanos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_246_1",
        "descripcion": "Vincula la atención de sus necesidades con el ejercicio de sus derechos humanos, y conoce la responsabilidad de las instituciones e instancias encargadas de protegerlos, así como el derecho de todas las personas a ejercerlos sin distingos de género, edad, pueblo y comunidad, lengua, nacionalidad, religión, discapacidad u otro.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_247",
    "contenido": "Cambios en la naturaleza del lugar donde vive, y su relación con las actividades humanas cotidianas que tienen orden cronológico, asociadas a ciclos agrícolas y festividades, así como su vínculo con la noción de tiempo y espacio histórico (“antes, durante y después”).",
    "pdas": [
      {
        "pda_id": "PDA_SB_247_1",
        "descripcion": "Identifica cambios en la naturaleza del lugar donde vive, y comprende su relación con las actividades humanas cotidianas, usando nociones como “antes, ahora y después” y en orden cronológico (semanas, meses, años, décadas, estaciones asociadas a ciclos agrícolas y festividades), reconociendo que existen diferentes formas de nombrarlas y entenderlas de acuerdo con el contexto.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_247_2",
        "descripcion": "Analiza aquellas actividades de los seres humanos que pueden tener un efecto negativo en la naturaleza, planteando la posib lidad de realizar cambios en las actividades individuales, familiares y comunitarias, para promover el cuidado responsable, la preservación de los seres vivos, el agua, el aire y el suelo en su entorno inmediato y lejano.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_248",
    "contenido": "Construcción de la paz mediante el diálogo: situaciones de conflicto o discrepancia como parte de la interacción de los seres humanos en la casa, el aula, la escuela y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_248_1",
        "descripcion": "Analiza situaciones de conflicto o discrepancia en su casa, el aula, la escuela y la comunidad; habla de ellas, distingue a las personas participantes y afectadas, así como el motivo del conflicto o discrepancia.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_248_2",
        "descripcion": "Comprende y propone formas de solución a través del diálogo y la negociación en la que se beneficien las partes; reflexiona acerca de que al rechazar formas violentas para abordar los conflictos se construye la paz.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_249",
    "contenido": "Democracia como forma de vida: construcción participativa de normas, reglas y acuerdos para alcanzar metas colectivas y contribuir a una convivencia pacífica en nuestra casa, el aula, la escuela y la comunidad, así como las consecuencias de no respetar acuerdos, reglas y normas escolares y comunitarias.",
    "pdas": [
      {
        "pda_id": "PDA_SB_249_1",
        "descripcion": "Participa en la revisión y construcción de acuerdos, reglas y normas que sirven para atender necesidades compartidas, alcanzar metas comunes, resolver conflictos y promover la convivencia pacífica en el aula, la escuela y la comunidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_249_2",
        "descripcion": "Comprende las consecuencias personales y colectivas de no respetar acuerdos, reglas y normas escolares y comunitarias.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_250",
    "contenido": "Diversos contextos sociales, naturales y territoriales: cambios y continuidades.",
    "pdas": [
      {
        "pda_id": "PDA_SB_250_1",
        "descripcion": "Comprende que, tanto de forma individual como colectiva, es parte de un contexto social, natural y territorial que se distingue de otros contextos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_250_2",
        "descripcion": "Describe algunos cambios y continuidades de su entorno, y se ubica espacialmente a través de croquis y mapas.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_251",
    "contenido": "El derecho a la igualdad de género y vida sin violencia: estereotipos de género que pueden inducir a formas de violencia, desigualdad y discriminación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_251_1",
        "descripcion": "Analiza estereotipos de género que pueden inducir formas de violencia, desigualdad y discriminación y argumenta por qué niñas y niños tienen el derecho de participar con igualdad en actividades educativas, deportivas, artísticas y lúdicas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_251_2",
        "descripcion": "Dialoga sobre estereotipos de niñas y niños asociados al género que pueden inducir a formas de violencia, desigualdad y discriminación.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_251_3",
        "descripcion": "Promueve y participa en actividades igualitarias en su casa, la escuela y la comunidad.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_252",
    "contenido": "Funciones y responsabilidades de las autoridades, de la familia, la escuela y la comunidad para la organización de la convivencia, la resolución de conflictos y el cumplimiento de acuerdos y normas de manera participativa y pacífica.",
    "pdas": [
      {
        "pda_id": "PDA_SB_252_1",
        "descripcion": "Analiza las responsabilidades de las autoridades de su escuela y comunidad, los asuntos que atienden, las acciones que realizan, cómo conocen las necesidades comunitarias, cómo toman decisiones, cómo intervienen ante los conflictos, y cuál es su papel en la construcción y el cumplimiento de acuerdos y normas; y establece compromisos para colaborar con las autoridades en favor de la convivencia pacíf ica.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_253",
    "contenido": "Historia de la vida cotidiana: cambios en el tiempo y el espacio ocurridos en la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_253_1",
        "descripcion": "Indaga en fuentes orales, escritas, fotográficas, testimoniales y digitales, los cambios y permanencias en la vida cotidiana en el tiempo y el espacio ocurridos en la comunidad, con relación a las comunicaciones y los transportes, el uso de la tecnología en los trabajos, los centros de reunión, centros educativos, zonas de cultivo, parques, entre otros, y los representa por medio de dibujos, líneas del tiempo, croquis y mapas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_254",
    "contenido": "Historia personal y familiar, diversidad de familias y el derecho a pertenecer a una.",
    "pdas": [
      {
        "pda_id": "PDA_SB_254_1",
        "descripcion": "Valora la diversidad de familias y promueve el respeto entre las y los integrantes de estas, para el cuidado de sí, de su familia y de las familias de su comunidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_254_2",
        "descripcion": "Reconoce el derecho de pertenecer a una familia que le cuide, proteja y brinde afecto para su bienestar físico, emocional y afectivo.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_255",
    "contenido": "Impacto de las actividades humanas en la naturaleza y sustentabilidad: actividades humanas que afectan a la naturaleza, y la necesidad de establecer compromisos que contribuyan a la preservación, prevención y disminución del impacto socioambiental.",
    "pdas": [
      {
        "pda_id": "PDA_SB_255_1",
        "descripcion": "Relaciona las actividades humanas con la naturaleza, al identificar aquellas que pueden tener un efecto negativo, planteando la posibilidad de realizar cambios en las actividades y acciones individuales, familiares y comunitarias, para promover el cuidado responsable, la regeneración y la preservación de los seres vivos, el agua, el aire y el suelo en su entorno inmediato y lejano.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_256",
    "contenido": "Los seres humanos son diversos y valiosos, y tienen derechos humanos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_256_1",
        "descripcion": "Valora la importancia de pertenecer a una familia, grupo escolar, comunidad y/o pueblo donde niñas y niños sientan cuidado y protección; las manifestaciones socioculturales que considera propias y relevantes de su pueblo y comunidad, así como la relevancia de ejercer sus derechos humanos con un sentido de corresponsabilidad y reciprocidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_257",
    "contenido": "Manifestaciones culturales y símbolos que identifican a los diversos pueblos indígenas, afr descendientes y migrantes y a México como nación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_257_1",
        "descripcion": "Reconoce y valora símbolos nacionales que nos identifican como parte de México (el himno, el escudo y la bandera).",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_257_2",
        "descripcion": "Representa por medio de dibujos, líneas del tiempo, croquis con el uso de referencias básicas espaciales y de símbolos propios, los cambios y permanencias en la vida cotidiana de la comunidad, comparando tres generaciones: abuelos, padres y actual.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_258",
    "contenido": "Personas en situación de migración y sus derechos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_258_1",
        "descripcion": "Reconoce algunos problemas que enfrentan las personas que migran, qué sucede en el lugar que dejan y qué pasa en el lugar al que llegan.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_258_2",
        "descripcion": "Dialoga acerca de experiencias propias o de otras personas de su comunidad que han migrado dentro del país o fuera de México, cuáles son los motivos que los impulsan a tomar la decisión de migrar. Dialogan acerca de los derechos de las personas en situación de migración.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_259",
    "contenido": "Respeto a la dignidad e integridad: límites corporales y situaciones de riesgo para prevenir y denunciar situaciones de acoso, abuso y violencia de carácter sexual en la casa, la escuela, la comunidad y con el uso de internet y redes sociales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_259_1",
        "descripcion": "Identifica y expresa su rechazo frente a comportamientos violentos y conductas de acoso o abuso sexual, que amenazan su integridad física y emocional de manera directa o con el uso de internet y redes sociales, y solicita apoyo y protección de integrantes de la familia, la escuela o la comunidad para su acompañamiento y, en caso de ser necesario, su denuncia.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_260",
    "contenido": "Respeto, cuidado y empatía hacia la naturaleza, como parte de un todo interdependiente.",
    "pdas": [
      {
        "pda_id": "PDA_SB_260_1",
        "descripcion": "Se reconoce a sí mismo o a sí misma como parte del lugar donde vive y en relación con otros seres vivos (animales, plantas, hongos y microorganismos) y componentes de la naturaleza (cuerpos de agua, suelos, aire, desiertos, bosques, arrecifes e islas, entre otros); y dialoga acerca de los sentimientos que le provoca esa relación.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_260_2",
        "descripcion": "Dialoga acerca de las responsabilidades hacia la naturaleza y muestra respeto, cuidado y empatía hacia sus componentes, proponiendo acciones a favor de la naturaleza, en general, y de los seres vivos, en particular en la medida de sus posibilidades.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_261",
    "contenido": "Responsabilidad compartida en el cuidado de sí y el de nuestro entorno con la familia, la escuela, la comunidad, el uso de internet y redes sociales, para generar espacios de bienestar e inclusión, equidad e igualdad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_261_1",
        "descripcion": "Comprende la importancia de la responsabilidad compartida de los padres, autoridades y los pares, en la escuela y en la comunidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_261_2",
        "descripcion": "Aporta elementos para el cuidado de sí, articulado a la creación de espacios de bienestar e inclusión, equidad e igualdad y un uso responsable de internet y redes sociales.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_262",
    "contenido": "Situaciones de la vida diaria en las que niñas y niños pueden o no tomar decisiones, y en las que se requiere ayuda, valorando los límites y riesgos del entorno.",
    "pdas": [
      {
        "pda_id": "PDA_SB_262_1",
        "descripcion": "Valora su capacidad para tomar decisiones, distinguiendo las situaciones en las que puede tomar decisiones de aquellas en las que requiere ayuda, considerando los límites y riesgos del entorno.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_262_2",
        "descripcion": "Comprende que las decisiones conllevan responsabilidades y compromisos consigo mismo o misma, con la comunidad y la sociedad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 3",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "2° de Primaria",
    "contenido_id": "CONT_SB_263",
    "contenido": "Situaciones de violencia, injusticia o discriminación, que afectan a integrantes de nuestras familias, la escuela o la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_263_1",
        "descripcion": "Dialoga sobre los efectos de la violencia, injusticia y la discriminación hacia personas y grupos por características como edad, identidad de género, orientación sexual, origen cultural o étnico, el idioma que hablan, su origen nacional, características físicas, discapacidad, religión, condición social, económica o migratoria, entre otras.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_263_2",
        "descripcion": "Propone acciones y establece compromisos para favorecer el respeto a los derechos de todas las personas y los comparte con su familia y la comunidad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_264",
    "contenido": "Capacidades y habilidades motrices.",
    "pdas": [
      {
        "pda_id": "PDA_SB_264_1",
        "descripcion": "Adapta sus movimientos, de acuerdo con los elementos básicos de los juegos, para responder a las condiciones que se presentan.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_265",
    "contenido": "Construcción del proyecto de vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_265_1",
        "descripcion": "Reflexiona acerca de logros cotidianos, académicos y emocionales, así como los aspectos que inciden en estos y los retos que tiene, para valorar su nivel de independencia y replantear sus metas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_265_2",
        "descripcion": "Explora las influencias de su familia, comunidad y cultura en la historia personal, para visualizar oportunidades y dificultades a superar en el planteamiento y logro de metas.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_266",
    "contenido": "Educación Integral en Sexualidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_266_1",
        "descripcion": "Explora formas de vivir y sentir el cuerpo, así como de los afectos, para identificar la diversidad de expresiones que agradan, incomodan y/o ponen en riesgo la integridad de las personas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_267",
    "contenido": "Efectos en la vida de las personas, derivados de cambios sociales, culturales y en la salud.",
    "pdas": [
      {
        "pda_id": "PDA_SB_267_1",
        "descripcion": "Reflexiona sobre hechos y sucesos que han afectado a su familia, para proponer posibles alternativas que permitan afrontarlos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_268",
    "contenido": "Entendimiento mutuo en la escuela.",
    "pdas": [
      {
        "pda_id": "PDA_SB_268_1",
        "descripcion": "Participa en distintas situaciones para acordar reglas en su familia, escuela y comunidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_268_2",
        "descripcion": "Reflexiona sobre el seguimiento de reglas para expresar las semejanzas y diferencias.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_268_3",
        "descripcion": "Expresa la importancia del entendimiento, para la convivencia pacífica.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_269",
    "contenido": "Equidad de género en las familias, la escuela y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_269_1",
        "descripcion": "Analiza prácticas equitativas que favorecen la convivencia en diversos contextos, como la distribución de las tareas y responsabilidades cotidianas para identificar y proponer mejores formas de relación entre hombres y mujeres.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_270",
    "contenido": "Estilos de vida activos y saludables.",
    "pdas": [
      {
        "pda_id": "PDA_SB_270_1",
        "descripcion": "Socializa actividades físicas que practica de manera cotidiana, con la intención de valorar su incidencia en el bienestar y cuidado de la salud.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_271",
    "contenido": "Formas de ser, pensar, actuar y relacionarse.",
    "pdas": [
      {
        "pda_id": "PDA_SB_271_1",
        "descripcion": "Reconoce características que le hacen a una persona diferente y a la vez única, para favorecer la construcción de su identidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_272",
    "contenido": "Higiene para una vida saludable.",
    "pdas": [
      {
        "pda_id": "PDA_SB_272_1",
        "descripcion": "Reflexiona acerca de distintos hábitos y costumbres de higiene que se realizan en la vida cotidiana en su comunidad, para mejorar prácticas de higiene con sus compañeras y compañeros de clase.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_273",
    "contenido": "Hábitos saludables, para promover el bienestar en los seres vivos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_273_1",
        "descripcion": "Distingue alimentos saludables y no saludables para preparar alimentos y promover la alimentación saludable.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_273_2",
        "descripcion": "Reconoce la importancia de la hidratación en el desarrollo del cuerpo de los seres vivos, para promover hábitos y actitudes saludables y de bienestar en la escuela y la comunidad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_274",
    "contenido": "Interacción motriz.",
    "pdas": [
      {
        "pda_id": "PDA_SB_274_1",
        "descripcion": "Establece acuerdos ante situaciones de juego y cotidianas, a partir de la interacción, para valorar su aplicación y los resultados alcanzados.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_275",
    "contenido": "La comunidad como el espacio en el que se vive y se encuentra la escuela.",
    "pdas": [
      {
        "pda_id": "PDA_SB_275_1",
        "descripcion": "Indaga acerca de ideas, conocimientos, prácticas culturales, formas de organización y acuerdos familiares, escolares y comunitarios, para compartir su importancia en la socialización.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_276",
    "contenido": "La escuela como espacio de convivencia, colaboración y aprendizaje.",
    "pdas": [
      {
        "pda_id": "PDA_SB_276_1",
        "descripcion": "Participa en la organización del aula y en la generación de normas, para el uso y disfrute de los materiales de apoyo y otros recursos existentes en la escuela, como el patio, el jardín y las canchas deportivas, entre otros.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_276_2",
        "descripcion": "Platica con docentes y compañeras o compañeros sobre la importancia de reconocer situaciones interpersonales, sociales y ambientales problemáticas en su contexto, y sobre la posibilidad de contribuir para el logro de un mayor bienestar personal y colectivo.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_277",
    "contenido": "Las familias como espacio de protección, cuidado, afecto y sustento para el desarrollo personal.",
    "pdas": [
      {
        "pda_id": "PDA_SB_277_1",
        "descripcion": "Identifica formas de convivencia y socialización en las familias, para distinguir formas de participación y colaboración.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_277_2",
        "descripcion": "Identifica los valores que posee y que han sido heredados de su familia, para fomentar cuidados afectivos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_278",
    "contenido": "Los afectos y su influencia en el bienestar.",
    "pdas": [
      {
        "pda_id": "PDA_SB_278_1",
        "descripcion": "Reconoce los factores presentes en el contexto que influyen en la expresión de las emociones para favorecer reacciones asertivas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_278_2",
        "descripcion": "Analiza situaciones previas y resultados obtenidos para adecuar su reacción emocional a favor del bienestar personal y social.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_279",
    "contenido": "Pensamiento lúdico, estratégico y creativo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_279_1",
        "descripcion": "Toma decisiones estratégicas a partir de las características de las situaciones de juego y cotidianas, con el fin de solucionarlas asertivamente.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_280",
    "contenido": "Posibilidades cognitivas, expresivas, motrices, creativas y de relación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_280_1",
        "descripcion": "Elabora propuestas de códigos de comunicación por medio del cuerpo, para otorgarle una intención a sus movimientos al jugar e interactuar con las demás personas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_281",
    "contenido": "Reconocimiento de las necesidades y características propias y de las demás personas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_281_1",
        "descripcion": "Valora las características cognitivas, motrices, afectivas y sociales, así como las necesidades de sus compañeras y compañeros para expresar lo que les une como grupo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_281_2",
        "descripcion": "Expresa con que personas se identifica, para reconocer la identidad del grupo.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_281_3",
        "descripcion": "Expresa lo que puede hacer para tener la oportunidad de reconocer a otras personas.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_282",
    "contenido": "Sentido de pertenencia, identidad personal y social.",
    "pdas": [
      {
        "pda_id": "PDA_SB_282_1",
        "descripcion": "Identifica eventos importantes de la historia de la comunidad: fundación, logros, personas o lugares destacados, entre otros, que son motivos de orgullo compartido, para fortalecer la identidad individual y colectiva.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_282_2",
        "descripcion": "Observa y describe prácticas socioculturales de su entorno; actividades productivas, comerciales, profesionales, de servicios, entre otras, para identificar concepciones, valores y proyectos compartidos por las personas que integran las familias y la comunidad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_283",
    "contenido": "Situaciones de riesgo social en la comunidad y región donde vive.",
    "pdas": [
      {
        "pda_id": "PDA_SB_283_1",
        "descripcion": "Distingue situaciones de riesgo social en la región, y propone algunas medidas para el autocuidado.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_283_2",
        "descripcion": "Analiza situaciones de riesgo social en la comunidad y el contexto donde vive, como la violencia doméstica y el vandalismo, y analiza estrategias de prevención.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_284",
    "contenido": "Análisis e intercambio de comentarios sobre empaques de productos y anuncios publicitarios.",
    "pdas": [
      {
        "pda_id": "PDA_SB_284_1",
        "descripcion": "Reconoce y reflexiona sobre información que contienen los empaques y otros recursos publicitarios de productos diversos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_284_2",
        "descripcion": "Comprende de manera particular la relevancia de leer advertencias en el etiquetado de los productos por consumir y/o adquirir.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_284_3",
        "descripcion": "Identifica mensajes, recursos gráficos y audiovisuales utilizados en diversos anuncios publicitarios.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_284_4",
        "descripcion": "Analiza y comenta mensajes publicitarios para identificar beneficios y perjuicios derivados del consumo de los productos publicitados.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_284_5",
        "descripcion": "Reflexiona acerca de las ventajas del consumo responsable y de la toma de decisiones con base en la información que se señala en los productos.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_285",
    "contenido": "Búsqueda y manejo reflexivo de información.",
    "pdas": [
      {
        "pda_id": "PDA_SB_285_1",
        "descripcion": "Formula preguntas para realizar la búsqueda de información y las responde luego de localizar la información correspondiente. Emplea los signos de interrogación al elaborar preguntas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_285_2",
        "descripcion": "Usa variadas fuentes de consulta, entre ellas medios de comunicación y personas, recupera información pertinente, en función del propósito de búsqueda: resolver dudas, profundizar en un tema, escribir un texto, preparar una exposición, generar contenido en las redes sociales, etcétera.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_285_3",
        "descripcion": "Reflexiona sobre el orden alfabético en diccionarios e índices de otras obras de consulta y lo emplea para localizar información.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_285_4",
        "descripcion": "Comprende el sentido general de un texto informativo.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_286",
    "contenido": "Comprensión y producción de cuentos para su disfrute.",
    "pdas": [
      {
        "pda_id": "PDA_SB_286_1",
        "descripcion": "Escucha y lee cuentos de distintos orígenes y autores.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_286_2",
        "descripcion": "Reconoce relaciones causa-efecto entre las partes de los cuentos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_286_3",
        "descripcion": "Desarrolla una historia con una secuencia causal de hechos derivados de un conflicto inicial que se soluciona al final.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_286_4",
        "descripcion": "Planea, escribe, revisa, corrige y comparte cuentos sobre temas de su interés.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_286_5",
        "descripcion": "Reconoce semejanzas y diferencias entre los cuentos y los eventos de la vida cotidiana, para darles un sentido y significado propios.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_287",
    "contenido": "Comprensión y producción de resúmenes.",
    "pdas": [
      {
        "pda_id": "PDA_SB_287_1",
        "descripcion": "Reflexiona sobre las funciones y características del resumen, como un tipo de texto conciso, cuyo objetivo principal es exponer de forma clara, precisa y breve las ideas más importantes de la fuente consultada y no como un producto de una tarea mecánica, alejada de la comprensión de las ideas expuestas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_287_2",
        "descripcion": "Determina cuál considera que es la información más relevante del texto por resumir, en función de sus propósitos, y la registra con sus propias palabras.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_287_3",
        "descripcion": "Establece diferencias entre paráfrasis y síntesis.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_287_4",
        "descripcion": "Emplea el punto y aparte para organizar un texto por párrafos.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_288",
    "contenido": "Comprensión y producción de textos discontinuos para organizar actividades y ordenar información.",
    "pdas": [
      {
        "pda_id": "PDA_SB_288_1",
        "descripcion": "Identifica características y funciones de los textos discontinuos, en particular de esquemas de partes de seres vivos y objetos, así como de la programación y/o calendarización de actividades.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_288_2",
        "descripcion": "Reflexiona sobre la utilidad de los formatos para organizar actividades e información.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_288_3",
        "descripcion": "Usa mayúsculas al comienzo de nombres propios y oraciones.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_289",
    "contenido": "Comprensión y producción de textos expositivos en los que se planteen: problema solución, comparacióncontraste, causaconsecuencia y enumeración.",
    "pdas": [
      {
        "pda_id": "PDA_SB_289_1",
        "descripcion": "Recurre a diversos soportes que contienen textos expositivos, para ampliar sus conocimientos sobre algún tema, así como a diccionarios para consultar definiciones.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_289_2",
        "descripcion": "Comprende textos expositivos que plantean un problema y la solución al mismo.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_289_3",
        "descripcion": "Reconoce semejanzas y diferencias entre textos de comparación y de contraste.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_289_4",
        "descripcion": "Reconoce antecedentes y consecuentes en el cuerpo de un texto expositivo, del tipo causeconsecuencia.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_289_5",
        "descripcion": "Se apoya en la enumeración para identificar los principales elementos del tema que trata.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_289_6",
        "descripcion": "Participa en la planeación y escritura de algún texto expositivo, así como en su revisión y corrección, haciendo sugerencias de mejora. Reflexiona sobre palabras y frases que impliquen comparación: algunos, otros, en cambio.",
        "orden": 6
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_290",
    "contenido": "Comprensión y producción de textos instructivos para realizar actividades escolares y participar en diversos juegos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_290_1",
        "descripcion": "Identifica y reflexiona sobre la función de los textos instructivos y sus características genéricas: organización de los datos; uso de numerales para ordenar cronológicamente los pasos de un procedimiento; brevedad y secuencia de la información; y precisión en las indicaciones.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_290_2",
        "descripcion": "Comprende la utilidad de los recursos gráficos empleados en textos instructivos: diagramas de procesos, ilustraciones, cuadros y símbolos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_290_3",
        "descripcion": "Identifica y reflexiona respecto del vocabulario empleado en los instructivos: verbos en infinitivo o en imperativo para redactar instrucciones y términos secuenciales, como primero, después, antes de, enseguida, finalmente.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_290_4",
        "descripcion": "Emplea signos de puntuación, como la coma, el punto y seguido, el punto y aparte, dos puntos.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_291",
    "contenido": "Comunicación a distancia con personas y propósitos diversos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_291_1",
        "descripcion": "Lee y comenta cartas reales y/o literarias.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_291_2",
        "descripcion": "Identifica características y funciones de las cartas y otros textos epistolares enviados o recibidos por vía postal o electrónica.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_291_3",
        "descripcion": "Intercambia mensajes epistolares, por vía postal y/o electrónica, con otras personas a partir de propósitos determinados, como saludar, invitar, felicitar, dar recados, informar, entre otros.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_291_4",
        "descripcion": "Reflexiona, al comunicarse a distancia, sobre la necesidad de proteger sus datos personales y propone medidas para salvaguardar su integridad física y moral.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_292",
    "contenido": "Creación de propuestas con intención artística para mejorar la escuela y el resto de la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_292_1",
        "descripcion": "Identifica aspectos por mejorar de la escuela o del resto de la comunidad a partir de gustos e intereses propios, para generar ideas sobre distintas posibilidades de transformación y las representa mediante descripciones, dibujos, bocetos o maquetas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_292_2",
        "descripcion": "Dialoga sobre las transformaciones que han tenido distintos espacios escolares y del resto de la comunidad a partir de cambios impulsados a través de los lenguajes artísticos, como murales, esculturas, teatro callejero, recitales o bailes al aire libre.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_292_3",
        "descripcion": "Explora y emplea movimientos, sonidos, formas, colores, texturas, gestos, objetos y palabras, para representar situaciones del espacio escolar o de la localidad.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_292_4",
        "descripcion": "Crea producciones con distintos lenguajes, oral, escrito, musical, visual, teatral, dancístico, en las que destaque aspectos valiosos de la escuela o la comunidad.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_292_5",
        "descripcion": "Construye propuestas artísticas de manera colectiva, a partir del uso de formas, colores, texturas, sonidos, movimientos y gestos, que permitan generar una mejora para el bien común.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_293",
    "contenido": "Descripción de personas, lugares, hechos y procesos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_293_1",
        "descripcion": "Comprende, a partir de la lectura de textos descriptivos, que hay formas detalladas para describir a las personas y los lugares, señalando características que van más allá de su apariencia.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_293_2",
        "descripcion": "Reflexiona sobre el uso de palabras y frases para describir personas, lugares y hechos: adjetivos, adverbios y frases adverbiales.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_293_3",
        "descripcion": "Planea, escribe, revisa y corrige textos en los que describe hechos en orden cronológico.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_293_4",
        "descripcion": "Reflexiona sobre el uso de la coma al enumerar cosas o elementos y la emplea.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_293_5",
        "descripcion": "Usa mayúsculas al inicio de las oraciones y de los nombres propios.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_294",
    "contenido": "Diálogo para la toma de acuerdos y el intercambio de puntos de vista.",
    "pdas": [
      {
        "pda_id": "PDA_SB_294_1",
        "descripcion": "Reconoce y usa pautas que norman los intercambios orales, como respetar el turno para hacer uso de la palabra, prestar atención, adecuar el volumen de voz, emplear fórmulas de cortesía, mantener el interés, plantear preguntas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_294_2",
        "descripcion": "Escucha las ideas de otras y otros, y expresa las propias con respeto.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_294_3",
        "descripcion": "Reconoce que expresar sus ideas con claridad y acompañadas de las razones que las sustentan, son aspectos que ayudan a que otras personas las comprendan.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_294_4",
        "descripcion": "Participa activamente en diálogos para tomar acuerdos, dando razones de sus preferencias o puntos de vista.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_295",
    "contenido": "Entrevistas con personas de la comunidad para conocer diversos temas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_295_1",
        "descripcion": "Reconoce las características de la entrevista y sus propósitos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_295_2",
        "descripcion": "Observa, lee y comenta entrevistas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_295_3",
        "descripcion": "Comprende la utilidad de elaborar cuestionarios para obtener la información que desea, y reconoce la diferencia entre plantear preguntas cerradas y abiertas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_295_4",
        "descripcion": "Entrevista a personas de la comunidad, o externas, con conocimiento sobre el tema y con propósitos y preguntas definidos previamente.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_295_5",
        "descripcion": "Respeta turnos para hablar y escuchar, presta atención a la persona entrevistada, adecua tono y volumen de voz, plantea preguntas elaboradas con antelación.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_296",
    "contenido": "Experimentación con elementos visuales y sonoros en producciones colectivas artísticas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_296_1",
        "descripcion": "Utiliza elementos de los lenguajes artísticos para representar experiencias significativas de su vida cotidiana; por ejemplo, un paseo familiar, puesta de sol, comida deliciosa.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_297",
    "contenido": "Exposición sobre temas diversos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_297_1",
        "descripcion": "Reconoce características de la oralidad: recursos expresivos (estilo) y paralingüísticos o no lingüísticos, como movimiento corporal y gestos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_297_2",
        "descripcion": "Expone sobre diversos temas considerando: Como presentador o presentadora -Planear su exposición, lo cual incluye la elaboración de materiales de apoyo. -Realizar apuntes para usar como guía. -Usar pronombres y nexos. -Valorar el interés del auditorio Como audiencia -Escuchar o atender lo que se comunica, siguiendo el hilo de lo que se dice. -Tomar nota de lo que se quiere recordar.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_298",
    "contenido": "Identificación del uso de la fantasía y la realidad en diferentes manifestaciones culturales y artísticas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_298_1",
        "descripcion": "Distingue la fantasía de la realidad en manifestaciones culturales y artísticas de su comunidad, y de otros lugares del mundo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_298_2",
        "descripcion": "Aprecia el uso intencional de formas, colores, sonidos, texturas, movimientos, gestos u objetos, que expresan la realidad y la fantasía en manifestaciones culturales y artísticas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_298_3",
        "descripcion": "Comenta impresiones y sensaciones, a partir de la identificación del uso intencional de formas, colores, sonidos, texturas, movimientos o gestos, en las manifestaciones culturales y artísticas de su interés.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_299",
    "contenido": "Indagación sobre la diversidad lingüística en su comunidad y el resto del país.",
    "pdas": [
      {
        "pda_id": "PDA_SB_299_1",
        "descripcion": "Reconoce nombres de lugares, objetos y otras palabras cotidianas que tienen raíces en lenguas indígenas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_299_2",
        "descripcion": "Emplea, en forma oral y escrita, expresiones lingüísticas identificadas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_299_3",
        "descripcion": "Identifica expresiones variantes de su lengua materna en comunidades diferentes.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_299_4",
        "descripcion": "Conoce lenguas diferentes a la suya, que se hablan en su localidad y en otras regiones del país.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_300",
    "contenido": "Indagación, reelaboración y difusión de notas informativas con opiniones sobre hechos que afectan a la escuela y/o a la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_300_1",
        "descripcion": "Interactúa con medios de comunicación y comenta hechos noticiosos o noticias de su interés.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_300_2",
        "descripcion": "Identifica qué, quién, cómo, cuándo, dónde y por qué en una nota informativa o reporte de noticia.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_300_3",
        "descripcion": "Distingue entre notas informativas sobre noticias y opiniones acerca de las mismas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_300_4",
        "descripcion": "Discute y comparte noticias y opiniones sobre éstas a través de medios a su alcance, como periódico mural o boletín escolar.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_301",
    "contenido": "Lectura dramatizada y representación teatral.",
    "pdas": [
      {
        "pda_id": "PDA_SB_301_1",
        "descripcion": "Reconoce características de los textos dramáticos, como diálogos, acotaciones, listado de personajes, espacio y temporalidad, al realizar una lectura comprensiva de los mismos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_301_2",
        "descripcion": "Transforma objetos y recursos a su alcance de manera creativa, para utilizarlos en la representación de personajes, al realizar una lectura dramatizada.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_301_3",
        "descripcion": "Improvisa con el uso del cuerpo y la voz algunas situaciones significativas, identificadas en distintas narraciones.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_301_4",
        "descripcion": "Participa en juegos de roles en los que representa diferentes personajes, en espacios y tiempos definidos.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_301_5",
        "descripcion": "Explora posibilidades expresivas del cuerpo, el espacio y el tiempo, en la construcción de historias narrativas.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_302",
    "contenido": "Lectura y creación de poemas, canciones y juegos de palabras para su disfrute.",
    "pdas": [
      {
        "pda_id": "PDA_SB_302_1",
        "descripcion": "Lee y escucha poemas, canciones y juegos de palabras, de acuerdo con sus gustos e intereses, para propiciar su disfrute.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_302_2",
        "descripcion": "Reconoce la rima y la aliteración como elementos rítmicos de poemas, canciones y juegos de palabras.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_302_3",
        "descripcion": "Explora y combina sonidos y palabras para jugar con su acomodo y entonación, y modifica las palabras o la letra de una canción, siguiendo el ritmo original.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_302_4",
        "descripcion": "Reconoce el contenido de distintos poemas y canciones y lo relaciona con experiencias personales o colectivas, para otorgarles un sentido propio.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_302_5",
        "descripcion": "Realiza inferencias de sentido y significado, a partir de la lectura y socialización de trabalenguas, chistes, adivinanzas, refranes y acertijos.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_303",
    "contenido": "Narración de sucesos del pasado y del presente.",
    "pdas": [
      {
        "pda_id": "PDA_SB_303_1",
        "descripcion": "Identifica y comprende la función y las características principales de la narración.Identifica y comprende la función y las características principales de la narración.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_303_2",
        "descripcion": "Reconoce y usa las estructuras narrativas: lineal, circular, in media res y otras, de acuerdo con su propia cultura y gusto para narrar.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_303_3",
        "descripcion": "Identifica y establece relaciones causa-efecto en una narración.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_303_4",
        "descripcion": "Usa el punto y el punto y seguido para separar oraciones en un párrafo.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_304",
    "contenido": "Reconocimiento y reflexión sobre el uso de elementos de los lenguajes artísticos, en manifestaciones culturales y artísticas de la comunidad y del resto del mundo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_304_1",
        "descripcion": "Realiza recreaciones orales o escritas, acompañadas de una representación gráfica, como dibujos, cómics, historietas, secuencias de dibujos que realizan movimientos (“folioscopio” o flip books), a partir de la observación de videos o de la asistencia a lugares en donde se lleven a cabo manifestaciones culturales y artísticas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_304_2",
        "descripcion": "Compara movimientos, sonidos, formas, colores, gestos y objetos de manifestaciones culturales y artísticas de su comunidad con los de otros lugares.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_304_3",
        "descripcion": "Expresa sus gustos e intereses hacia las manifestaciones culturales y artísticas, y realiza descripciones orales o escritas, para agruparlas de acuerdo con sus similitudes en un collage de dibujos, fotografías o recortes.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_305",
    "contenido": "Reflexión y uso de los lenguajes artísticos, para recrear experiencias estéticas que tienen lugar en la vida cotidiana.",
    "pdas": [
      {
        "pda_id": "PDA_SB_305_1",
        "descripcion": "Utiliza elementos de los lenguajes artísticos para representar experiencias significativas de su vida cotidiana; por ejemplo, un paseo familiar, puesta de sol, comida deliciosa.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_305_2",
        "descripcion": "Identifica y recrea mediante el uso de formas, colores, texturas y sonidos, sensaciones, emociones, sentimientos e ideas que surgen de distintas experiencias significativas que tienen lugar en la vida cotidiana.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_306",
    "contenido": "Representación de hechos y experiencias significativas mediante el empleo de recursos textuales, visuales, corporales y sonoros.",
    "pdas": [
      {
        "pda_id": "PDA_SB_306_1",
        "descripcion": "Representa lúdicamente una experiencia significativa con el uso de movimientos, formas, gestos, sonidos, colores y objetos para construir nuevos significados.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_306_2",
        "descripcion": "Reelabora acciones cotidianas al jugar con movimientos rápidos o lentos, fuertes o débiles, con pausas o acentos, imaginando distintos espacios donde se llevan a cabo para descubrir nuevas maneras de realizarlas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_306_3",
        "descripcion": "Contrasta lúdicamente el lenguaje figurado y el literal, por medio de preguntas retóricas, comparaciones y metáforas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_306_4",
        "descripcion": "Describe un hecho significativo mediante la estructura narrativa de su elección, estableciendo para cada parte una secuencia de movimientos, con acompañamiento musical, lo cual complementa con desplazamientos, pausas, acentos y velocidades corporales.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_307",
    "contenido": "Uso de croquis y mapas para describir trayectos o localizar lugares.",
    "pdas": [
      {
        "pda_id": "PDA_SB_307_1",
        "descripcion": "Observa croquis e identifica sus características y función.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_307_2",
        "descripcion": "Identifica convenciones gráficas usadas en croquis.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_307_3",
        "descripcion": "Reconoce y usa palabras para dar indicaciones sobre lugares o trayectos, como esquina, derecha, izquierda, al lado, paralelo.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_307_4",
        "descripcion": "Elabora croquis para representar trayectos.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_307_5",
        "descripcion": "Describe trayectos a partir de la información contenida en croquis.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_308",
    "contenido": "Uso de textos formales para atender diversos asuntos personales o del bienestar común.",
    "pdas": [
      {
        "pda_id": "PDA_SB_308_1",
        "descripcion": "Explora y reconoce características de documentos personales, como acta de nacimiento, credenciales, cartilla de vacunación y comprobantes de estudio.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_308_2",
        "descripcion": "Reflexiona sobre las funciones que tienen los documentos personales.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_308_3",
        "descripcion": "Reconoce situaciones en las que los documentos personales son necesarios y/o útiles.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_308_4",
        "descripcion": "Comprende la utilidad y el significado de las siglas de las instituciones que expiden los documentos, así como el valor de los sellos y firmas de autorización.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_309",
    "contenido": "Alimentación saludable, con base en el Plato del Bien Comer, así como prácticas culturales y la toma de decisiones encaminadas a favorecer la salud y el medio ambiente y la economía familiar.",
    "pdas": [
      {
        "pda_id": "PDA_SB_309_1",
        "descripcion": "Explica la importancia del consumo de una alimentación higiénica y variada que incluya verduras y frutas; cereales y tubérculos; leguminosas y alimentos de origen animal acorde con el Plato del Bien Comer y sus prácticas culturales, para el buen funcionamiento del cuerpo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_309_2",
        "descripcion": "Propone y practica acciones para favorecer una alimentación saludable, como consumir alimentos naturales, de la localidad y de temporada, en la cantidad recomendada para su edad, beber agua simple potable; disminuir el consumo de alimentos con exceso de grasas, azúcares y sal, entre otras.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_309_3",
        "descripcion": "Comprende que las personas tienen diferentes necesidades alimentarias, de acuerdo con su edad y actividad física, y que satisfacerlas impacta en la economía familiar.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_310",
    "contenido": "Cuerpos geométricos y sus características.",
    "pdas": [
      {
        "pda_id": "PDA_SB_310_1",
        "descripcion": "Identifica las figuras geométricas que componen diversos objetos (edificios, casas, cajas, muebles, y cuerpos geométricos); construye prismas rectos a partir de reconocer la configuración de cuadrados y rectángulos que lo componen.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_311",
    "contenido": "Efectos de la aplicación de fuerzas y del calor sobre los objetos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_311_1",
        "descripcion": "Describe y representa los movimientos de personas, objetos y animales, considera la dirección (izquierda a derecha, de arriba a abajo), la rapidez (lento o rápido), y su trayectoria (recta, curva o zigzag), así como los puntos de referencia.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_311_2",
        "descripcion": "Describe el efecto de las fuerzas sobre los objetos: movimiento y reposo, al experimentar con los cambios en la rapidez o la dirección del movimiento, sin llegar a la noción de intensidad de la fuerza.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_311_3",
        "descripcion": "Experimenta con la aplicación de fuerzas y el movimiento, con base en el diseño de distintos recorridos (circuitos), en los que interaccionan diversos objetos que chocan, son jalados o empujados, además de considerar diferentes distancias.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_312",
    "contenido": "Estructura y funcionamiento del cuerpo humano: sistema sexual; cambios en la pubertad e implicaciones socioculturales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_312_1",
        "descripcion": "Describe semejanzas y diferencias entre los órganos sexuales de las personas, sus nombres correctos y en su lengua materna, e identifica que estos determinan el sexo biológico; propone o practica acciones y hábitos de higiene para su cuidado como parte de la salud sexual.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_312_2",
        "descripcion": "Comprende que los cuerpos cambian a lo largo del tiempo, al reconocer la variabilidad en tamaño, forma, funciones y características; explica que todas las culturas tienen maneras diferentes de ver los cuerpos y que todos merecen respeto, incluido el de las personas con discapacidad, como parte del derecho a una vida libre de violencia.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_313",
    "contenido": "Estructura y funcionamiento del cuerpo humano: sistemas locomotor y digestivo, así como prácticas para su cuidado, desde su contexto sociocultural.",
    "pdas": [
      {
        "pda_id": "PDA_SB_313_1",
        "descripcion": "Identifica y describe que el sistema locomotor está conformado por el sistema óseo (huesos y columna vertebral), y el sistema muscular (músculos y articulaciones), y que sus funciones se relacionan con el soporte, protección y movimiento del cuerpo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_313_2",
        "descripcion": "Explica y representa el funcionamiento del sistema locomotor, con modelos que muestran la acción coordinada de los sistemas óseo, muscular y nervioso, en el movimiento del cuerpo.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_313_3",
        "descripcion": "Describe acciones y prácticas socioculturales para el cuidado del sistema locomotor y la prevención de accidentes y lesiones, reconoce la importancia de la postura correcta, de acudir a los servicios de salud y evitar la automedicación.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_314",
    "contenido": "Estudio de los números.",
    "pdas": [
      {
        "pda_id": "PDA_SB_314_1",
        "descripcion": "Expresa oralmente la sucesión numérica hasta cuatro cifras, en español y hasta donde sea posible, en su lengua materna, de manera ascendente y descendente a partir de un número natural dado.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_314_2",
        "descripcion": "Identifica y usa los números ordinales, en español y en su lengua materna para ordenar objetos o para indicar el lugar que ocupan dentro de una colección de hasta diez elementos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_314_3",
        "descripcion": "A través de situaciones cotidianas cuenta, representa de diferentes formas, interpreta, ordena, lee y escribe números naturales de hasta cuatro cifras; identifica regularidades en los números que representan decenas, centenas y millares.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_314_4",
        "descripcion": "Representa, con apoyo de material concreto y modelos gráficos, fracciones: medios, cuartos, octavos, dieciseisavos, para expresar el resultado de mediciones y repartos en situaciones vinculadas a su contexto.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_314_5",
        "descripcion": "Identifica la unidad de referencia en representaciones de medios, cuartos, octavos, dieciseisavos que expresan el resultado de mediciones y repartos.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_314_6",
        "descripcion": "Propone expresiones aditivas equivalentes de medios, cuartos, octavos o dieciseisavos; también compara fracciones (con igual numerador o igual denominador) utilizando los signos > (mayor que), < (menor que) o = (igual).",
        "orden": 6
      },
      {
        "pda_id": "PDA_SB_314_7",
        "descripcion": "Conoce y usa las fracciones 1/10 y 1/100 con el apoyo del metro graduado.",
        "orden": 7
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_315",
    "contenido": "Figuras geométricas y sus características.",
    "pdas": [
      {
        "pda_id": "PDA_SB_315_1",
        "descripcion": "A partir de retículas de triángulos, cuadrados o puntos, construye, analiza y clasifica figuras geométricas a partir de sus lados y su simetría, en particular a los triángulos; explica los criterios utilizados para la clasificación.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_316",
    "contenido": "Formación de mezclas y sus propiedades.",
    "pdas": [
      {
        "pda_id": "PDA_SB_316_1",
        "descripcion": "Identifica al agua como disolvente a partir de experimentar con distintos materiales como aceite, talco, azúcar, sal, arena, y los clasifica en solubles o insolubles en agua.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_316_2",
        "descripcion": "Describe la aplicación de la solubilidad del agua en actividades cotidianas y en la industria.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_317",
    "contenido": "Impacto de las actividades humanas en la naturaleza y en la salud.",
    "pdas": [
      {
        "pda_id": "PDA_SB_317_1",
        "descripcion": "Indaga y describe el impacto de las actividades humanas del entorno natural del lugar donde vive, y establece relaciones causaefecto en la naturaleza y en la salud de las personas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_317_2",
        "descripcion": "Indaga saberes y prácticas de diversos pueblos y culturas, para cuidar la naturaleza y establecer una relación armónica.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_317_3",
        "descripcion": "Propone y practica acciones que favorecen el cuidado de la naturaleza, la salud de las personas y el bienestar animal.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_318",
    "contenido": "Interacciones entre plantas, animales y el entorno natural: nutrición y locomoción.",
    "pdas": [
      {
        "pda_id": "PDA_SB_318_1",
        "descripcion": "Indaga y describe la locomoción de animales, a partir de reconocer las formas en las que se mueven y desplazan en la búsqueda de alimento, agua o refugio y su relación con las características del lugar donde viven.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_318_2",
        "descripcion": "Clasifica animales en vertebrados e invertebrados, a partir de sus características, y reconoce que los seres humanos pertenecen al grupo de los vertebrados, con base en similitudes y diferencias en la locomoción de otros animales.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_318_3",
        "descripcion": "Explica el movimiento y desplazamiento de algún animal vertebrado de su interés, con modelos que muestran la acción coordinada de los sistemas óseo y muscular.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_319",
    "contenido": "Medición de longitud, masa y capacidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_319_1",
        "descripcion": "Resuelve situaciones problemáticas vinculadas a su contexto que impliquen, medición, estimación y comparación, de longitudes, masas y capacidades, con el uso del metro, kilogramo, litro, medios y cuartos de estas unidades; en el caso de la longitud, el decímetro y centímetro.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_320",
    "contenido": "Medición del tiempo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_320_1",
        "descripcion": "Lee relojes de manecillas y digitales; compara y ordena la duración de diferentes actividades cotidianas o acontecimientos de la comunidad, usando la hora, media hora, cuarto de hora y los minutos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_321",
    "contenido": "Multiplicación y división, su relación como operaciones inversas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_321_1",
        "descripcion": "Resuelve multiplicaciones cuyo producto es un número natural de tres cifras, mediante diversos procedimientos (suma de multiplicaciones parciales, multiplicaciones por 10, 20, 30, entre otros).",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_321_2",
        "descripcion": "Resuelve situaciones problemáticas vinculadas a su contexto que implican divisiones (reparto y agrupamiento), mediante diversos procedimientos, en particular con la multiplicación; representa la división como: a ÷ b = c.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_321_3",
        "descripcion": "Construye y usa un repertorio multiplicativo de factores de una cifra, para resolver multiplicaciones y divisiones (cuántas veces está contenido el divisor en el dividendo).",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_321_4",
        "descripcion": "Utiliza, explica y comprueba sus estrategias para calcular mentalmente productos de números naturales de una cifra.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_322",
    "contenido": "Organización e interpretación de datos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_322_1",
        "descripcion": "Recolecta, organiza, representa e interpreta datos en tablas de frecuencias o pictogramas para responder preguntas de su interés.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_323",
    "contenido": "Propiedades de los materiales: masa y longitud; relación entre estados físicos y la temperatura.",
    "pdas": [
      {
        "pda_id": "PDA_SB_323_1",
        "descripcion": "Describe la masa y la longitud como propiedades medibles de los materiales, a partir de experimentar con distintos objetos y materiales y el uso de instrumentos como balanza y regla, y establece relaciones entre el material, tamaño y forma.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_323_2",
        "descripcion": "Reconoce al kilogramo (kg) como la unidad básica de medida de la masa, y al metro (m) como la unidad básica de medición de la longitud (distancia entre dos puntos), así como otras unidades que se utilizan en su comunidad para medir la masa y la longitud.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_324",
    "contenido": "Relaciones entre los factores físicos y biológicos que conforman los ecosistemas y favorecen la preservación de la vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_324_1",
        "descripcion": "Describe la importancia del aire, el agua, el suelo y el Sol para todos los seres vivos, a partir de representar las relaciones que establecen para su alimentación y protección.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_324_2",
        "descripcion": "Reconoce y describe las condiciones en las que se encuentra el aire, el suelo y el agua en el lugar en donde vive; y argumenta acerca del impacto de dichas condiciones en la vida de plantas, animales y personas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_324_3",
        "descripcion": "Identifica y valora la presencia del aire, agua, suelo y Sol en las expresiones culturales de diversas personas y grupos.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_325",
    "contenido": "Sistema Tierra-Luna-Sol: interacciones, cambios y regularidades; diversas explicaciones acerca del movimiento de estos astros y su relación con algunos fenómenos naturales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_325_1",
        "descripcion": "Indaga y representa con modelos, los movimientos de rotación y traslación de la Tierra, y los asocia con la sucesión del día y la noche, con las estaciones del año y el cambio del punto de aparición y ocultamiento del Sol en el horizonte.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_325_2",
        "descripcion": "Describe y representa mediante modelos el movimiento de rotación y traslación de la Luna y su relación con sus fases.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_325_3",
        "descripcion": "Indaga aportaciones de diversas culturas en relación con el movimiento de la Tierra, la Luna y el Sol, y su influencia en aspectos socioculturales.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_326",
    "contenido": "Suma y resta, su relación como operaciones inversas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_326_1",
        "descripcion": "Resuelve situaciones problemáticas vinculadas a su contexto que implican sumas de números naturales de hasta tres cifras utilizando el algoritmo convencional.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_326_2",
        "descripcion": "Resuelve situaciones problemáticas vinculadas a su contexto que implican restas de números naturales de hasta tres cifras utilizando agrupamientos y el algoritmo convencional.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_326_3",
        "descripcion": "Utiliza, explica y comprueba sus estrategias para calcular mentalmente sumas o restas de números naturales de hasta tres cifras",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_326_4",
        "descripcion": "Resuelve problemas de suma o resta vinculados a su contexto, que impliquen el uso de fracciones (medios, cuartos, octavos, dieciseisavos), con el apoyo de material concreto o representaciones gráficas.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_327",
    "contenido": "Acciones de prevención ante peligros o amenazas de fenómenos naturales y acciones humanas y la importancia de actuar y participar en la escuela, barrio, pueblo, comunidad, entidad y país; promover la cultura de prevención, autoprotección, empatía y solidaridad con las personas afectadas y el entorno socioambiental.",
    "pdas": [
      {
        "pda_id": "PDA_SB_327_1",
        "descripcion": "Indaga en fuentes orales, bibliográficas, hemerográficas, y en medios digitales, desastres ocurridos en la localidad o en la entidad, localiza en mapas los lugares en los que ocurrieron los desastres y los relaciona con los fenómenos naturales, muestra empatía y solidaridad con las personas afectadas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_327_2",
        "descripcion": "Participa en acciones individuales y colectivas, en la escuela, barrio, pueblo, comunidad y entidad como parte de una cultura de prevención y autoprotección.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_327_3",
        "descripcion": "Identifica zonas de seguridad o albergues ante peligros o amenazas en la localidad donde vive, asociados a fenómenos naturales como: sismos, huracanes, deslaves, inundaciones, tsunamis e incendios, entre otros. Elabora croquis y mapas para localizarlos y describe las rutas para llegar a ellos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_327_4",
        "descripcion": "Comprende la necesidad de participar en acciones individuales y colectivas, encaminadas a la prevención de riesgos, al autocuidado y cuidado de la familia, y otras personas en la casa, la escuela y la comunidad, como la implementación de una mochila de emergencia.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_328",
    "contenido": "Caracterización y localización del territorio donde vive, la entidad y México; identificación de los tipos de suelo, clima, vegetación, fauna, cuerpos de agua (ríos, lagos, cenotes, humedales), así como las formas culturales que se desarrollan, vinculadas al patrimonio biocultural de la entidad y región; reconocimiento de su organización política y cambios históricos, hasta su conformación actual.",
    "pdas": [
      {
        "pda_id": "PDA_SB_328_1",
        "descripcion": "Identifica las características de la comunidad y la entidad como suelo, clima, animales y plantas, cuerpos de agua, relieve; las representa en dibujos, croquis y mapas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_328_2",
        "descripcion": "Localiza y reconoce la forma, extensión y límites territoriales, la organización política de la comunidad y la entidad, como parte de México.organización política de la comunidad y la entidad, como parte de México.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_328_3",
        "descripcion": "Indaga sobre los cambios en la conformación territorial, poblacional e histórica de la comunidad y la entidad.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_328_4",
        "descripcion": "Identifica formas culturales que se desarrollan vinculadas al patrimonio biocultural de la entidad y región tales como la milpa y la chinampaIdentifica formas culturales que se desarrollan vinculadas al patrimonio biocultural de la entidad y región tales como la milpa y la chinampa",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_329",
    "contenido": "Composición sociocultural de la entidad federativa y de México, y su configuración a través de la historia como un país pluricultural, integrado por pueblos originarios, af romexicanos, migrantes y diversas comunidades con características y necesidades, quienes han luchado por el reconocimiento de la igualdad en dignidad y derechos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_329_1",
        "descripcion": "Dialoga acerca de las aportaciones de pueblos originarios, afromexicanos, migrantes y diversas comunidades, entre otros, al patrimonio cultural y a la memoria colectiva de la comunidad y entidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_329_2",
        "descripcion": "Identifica formas de pensar, hablar, convivir, vestir, celebrar y compartir en su comunidad y la entidad.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_329_3",
        "descripcion": "Reconoce que las leyes garantizan el derecho a vivir con igualdad y dignidad, así como a expresar sus prácticas culturales y lingüísticas, y a respetar y valorar las prácticas de otras personas o grupos.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_330",
    "contenido": "Cuidado de los ecosistemas para su regeneración, preservación responsable y sustentable.",
    "pdas": [
      {
        "pda_id": "PDA_SB_330_1",
        "descripcion": "Reflexiona situaciones de riesgo o amenazas a la preservación de los ecosistemas, y sus posibles causas locales.Reflexiona situaciones de riesgo o amenazas a la preservación de los ecosistemas, y sus posibles causas locales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_330_2",
        "descripcion": "Indaga y analiza cómo se puede contribuir a regenerar y preservar los ecosistemas, y argumenta la importancia de que las personas actuemos con responsabilidad y colaboración, disminuyendo el deterioro de los ecosistemas, a partir de prácticas para la preservación de la vida y el bienestar de la comunidad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_331",
    "contenido": "Democracia en la vida cotidiana: construcción, cumplimiento y aplicación justa de acuerdos, normas y leyes que contribuyen a la protección de los derechos de todas las personas, individuales y colectivos, y a la convivencia conforme a los principios de igualdad, justicia y responsabilidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_331_1",
        "descripcion": "Comprende que la democracia se ejerce en la vida cotidiana al participar en la construcción, el cumplimiento y la aplicación justa y honesta de los acuerdos y las normas, en los espacios de convivencia como la escuela y la familia.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_331_2",
        "descripcion": "Dialoga acerca de la importancia de participar y contribuir a la protección de los derechos de todas las personas, conforme a los principios democráticos de igualdad, justicia y responsabilidad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_332",
    "contenido": "Desigualdades por diferencias de género: causas y consecuencias en la vida cotidiana pasada y presente, para proponer acciones en favor de la igualdad, basadas en el reconocimiento y el respeto de los derechos de todas las personas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_332_1",
        "descripcion": "Analiza en la casa, la escuela y la comunidad desigualdades de género, así como sus causas y consecuencias.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_332_2",
        "descripcion": "Identifica casos en los que expresan desigualdades en el acceso a servicios educativos, de salud, recreación, deporte o cultura.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_332_3",
        "descripcion": "Propone acciones en favor de la igualdad, en las que se respeten los derechos de todas las personas y colectivos con los que convive.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_333",
    "contenido": "El derecho a la protección de la integridad propia y la de todas las personas, reconociendo situaciones de riesgo, como el maltrato, el abuso, bullying o la explotación de tipo sexual y la importancia de su prevención, al conocer las instancias para solicitar ayuda y/o denunciar.",
    "pdas": [
      {
        "pda_id": "PDA_SB_333_1",
        "descripcion": "Identifica situaciones y personas que representan un riesgo para la protección de la dignidad y la integridad física y mental de niñas y niños.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_333_2",
        "descripcion": "Reconoce que tiene derecho a la protección ante situaciones que ponen en riesgo su integridad como maltrato, abuso o explotación de tipo sexual y expresa lo que siente al respecto.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_333_3",
        "descripcion": "Propone acciones individuales y colectivas para ejercer su derecho a la protección y minimizar situaciones de riesgo en el aula, la escuela y la comunidad.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_334",
    "contenido": "Experiencias de organización comunitaria del pasado y del presente, y las acciones de colaboración, reciprocidad, cuidado mutuo y trabajo por el bienestar de la escuela, barrio, comunidad, pueblo y colectivo social, para configurar ambientes seguros e igualitarios, con equidad y justicia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_334_1",
        "descripcion": "Indaga en fuentes orales o escritas acerca de formas de organización participativa, en el pasado y el presente de su comunidad, e identifica la importancia de la colaboración, la reciprocidad, el respeto y el cuidado mutuo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_334_2",
        "descripcion": "Propone para su aplicación en la escuela formas de organización participativa, que contribuyan al bienestar de la colectividad escolar.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_335",
    "contenido": "Formas y procedimientos mediante las que se eligen a las autoridades de gobierno, y los cambios que han tenido a través del tiempo, en función del bienestar colectivo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_335_1",
        "descripcion": "Indaga y analiza sobre cuáles son las autoridades de gobierno de su comunidad, municipio y entidad, cómo se eligen, cuáles son sus funciones y cómo colaboran con las personas y comunidad, empleando diversas formas de organización local para contribuir al bienestar colectivo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_335_2",
        "descripcion": "Indaga acerca de cómo se desiganaban o elegían las autoridades que gobernaban algunos pueblos que habitaban el territorio de México antes de la llegada de los españoles, así como cuáles eran sus funciones y cómo se relacionaban estas formas con una visión cultural diversa.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_336",
    "contenido": "Interculturalidad y sustentabilidad: formas en las que los pueblos originarios y otras culturas del país se relacionan con la naturaleza para contribuir a reducir el impacto negativo de la humanidad en el medio natural y social, así como acciones colectivas para promover el bienestar con respeto y protección, a fin de preservar la naturaleza y fortalecer la conciencia geográf ica.",
    "pdas": [
      {
        "pda_id": "PDA_SB_336_1",
        "descripcion": "Reconoce y analiza otras cosmovisiones o formas de relación de la sociedad con la naturaleza de pueblos originarios, campesinos y de otras culturas del país, que han establecido patrones de uso de los ecosistemas, sustentados en valores que tienen como principio una relación de respeto, equilibrio y reciprocidad con los ecosistemas de la Tierra y los otros seres vivos, así como su contribución en un manejo responsable o sustentable de su riqueza natural y en su preservación.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_336_2",
        "descripcion": "Comprende que algunas de esas prácticas las puede desarrollar de manera personal y colectiva desde el ámbito escolar, reconociendo que con ello ayuda en el cuidado de la vida y de la Tierra, de sí mismo y de otras personas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_336_3",
        "descripcion": "Identifica que hay leyes que protegen los derechos humanos a la salud y a un medio ambiente sano para el desarrollo y bienestar.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_337",
    "contenido": "La construcción colectiva de la paz: situaciones que generan diferencias y conflictos que afectan la convivencia entre las personas y grupos de pertenencia, causas y formas de resolverlo a través del diálogo, la comunicación y la empatía, para contribuir a la convivencia y la resolución de conflictos sin violencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_337_1",
        "descripcion": "Reconoce que la paz se cons-truye al dialogar sobre tensiones surgidas por diferencias de intereses, puntos de vista, formas de vida y de organización, acceso a servicios, entre otros, que dan lugar a conflictos entre las personas con las que se convive, en los ámbitos escolar, con los pares, miembros de la familia y otras personas del entorno, e identifica las causas y formas de resolverlos sin violencia mediante la comunicación y la empatía sus tentada en los derechos humanos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_338",
    "contenido": "La toma de decisiones ante situaciones cotidianas y de riesgos, con base en el cuidado de la dignidad de todas y todos, considerando posibles consecuencias de las acciones, para actuar con responsabilidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_338_1",
        "descripcion": "Analiza críticamente y distingue situaciones cotidianas en las que se ejerce la capacidad para tomar decisiones, empleando los criterios de valoración de los riesgos del entorno.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_338_2",
        "descripcion": "Dialoga y analiza posibles consecuencias de las acciones, para actuar con responsabilidad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_339",
    "contenido": "La vida cotidiana antes de la primera invasión europea y en el México colonial: personas y grupos sociales que incidieron en la historia de la comunidad, entidad y el país, para reconocer sus aportes en lo social, cultural, político y económico.",
    "pdas": [
      {
        "pda_id": "PDA_SB_339_1",
        "descripcion": "Indaga en fuentes primarias o secundarias bibliográficas, orales, hemerográficas, digitales, iconográficas, materiales (objetos de uso cotidiano, edificaciones), sobre pueblos originarios que habitaron lo que hoy es el territorio nacional, antes de la primera invasión europea, por ejemplo, Olmecas, Teotihuacanos, Mayas, Zapotecas, Toltecas, Mixtecas y Mexicas. Si es el caso, identifica los pueblos originarios que habitaban el territorio que hoy ocupa su entidad antes de la primera invasión europea.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_339_2",
        "descripcion": "Reconoce la ubicación de pueblos originarios en mapas, códices y narraciones, analiza algunos aspectos de la vida cotidiana: ¿cómo vivían?, ¿cómo eran sus casas y a qué se dedicaban?, ¿cómo se alimentaban y vestían?, ¿cómo se organizaban y trabajaban en la familia y la comunidad?, ¿cuáles eran sus creencias?, ¿cómo se divertían?, ¿cómo educaban a sus hijas e hijos?, ¿cuáles eran las tareas de las mujeres?",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_339_3",
        "descripcion": "Identifica personas y grupos relevantes que incidieron en la historia de los pueblos que habitaban el territorio que hoy conocemos como México, antes de la primera invasión europea.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_340",
    "contenido": "Origen histórico de algunos símbolos (territorio, lugares sagrados, figuras y colores, banderas, escudos, himnos, entre otros), que identifican a las comunidades, pueblos, la entidad y a México como país, en tanto referentes que dan sentido de identidad y pertenencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_340_1",
        "descripcion": "Indaga acerca de los símbolos de identidad y pertenencia en la comunidad, localidad o pueblo y en la entidad federativa, para comprender que la identidad nacional es un conjunto de identidades plurales, que pueden convivir respetuosamente, en la medida que exista igualdad de condiciones sociales, culturales, educativas, entre otras.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_340_2",
        "descripcion": "Dialoga acerca de la importancia de los símbolos para las comunidades, la entidad y para México, y reconoce la forma en que se representan.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_341",
    "contenido": "Representaciones cartográficas de la localidad y/o comunidad; su ubicación dentro de la entidad y del país, con relación al conocimiento, función y cuidados de los ecosistemas como sustento de la vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_341_1",
        "descripcion": "Elabora representaciones cartográficas de la localidad o pueblo donde vive, considerando los puntos cardinales dentro de la entidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_341_2",
        "descripcion": "Indaga sobre los ecosistemas locales y sus características, y los concibe como espacios vivos y complejos de la naturaleza.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_341_3",
        "descripcion": "Comprende las relaciones e interdependencias de sus componentes, como sustento de la vida en la Tierra y de los seres vivos que la habitamos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_341_4",
        "descripcion": "Reflexiona situaciones de riesgo o amenazas a la preservación de los ecosistemas, y sus posibles causas locales.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_341_5",
        "descripcion": "Conoce cómo se puede contribuir a preservar los ecosistemas, así como sobre la importancia del respeto, responsabilidad y colaboración en su cuidado y aprovechamiento sustentable, a través del tiempo, con equidad y justicia social.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_342",
    "contenido": "Retos en el reconocimiento y ejercicio de los derechos humanos y la satisfacción de las necesidades básicas, físicas, sociales, de seguridad, emocionales y cognitivas de niñas, niños y adolescentes; así como situaciones injustas en el pasado y el presente, en las que no se respetan los derechos para satisfacer las necesidades básicas de todas las personas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_342_1",
        "descripcion": "Analiza las necesidades básicas: físicas, sociales, de seguridad, emocionales y cognitivas de niñas, niños y adolescentes, las relaciona con el ejercicio de sus derechos, comparte experiencias sobre cómo éstas son satisfechas en las familias y en la comunidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_342_2",
        "descripcion": "Dialoga acerca de lo que ocurre cuando esas necesidades no son satisfechas, identifica a quiénes corresponde generar condiciones para que todas las personas satisfagan sus necesidades y garantizar que puedan ejercer sus derechos humanos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_343",
    "contenido": "Situaciones de discriminación en el aula, la escuela, la comunidad, la entidad y el país, sobre la diversidad de género, cultural, étnica, lingüística, social, así como sobre rasgos físicos, desarrollo cognitivo y barreras de aprendizaje, y participación en ámbitos de convivencia, para la promoción de ambientes igualitarios, de respeto a la dignidad humana y a los derechos de todas las personas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_343_1",
        "descripcion": "Analiza e identifica en el aula, la escuela, la comunidad y la entidad, situaciones de discriminación y exclusión por motivo de diversidad de género, física, sensorial, intelectual, mental, cultural, étnica, lingüística o social.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_343_2",
        "descripcion": "Promueve en su entorno próximo de convivencia, acciones de trato igualitario, de respeto a la dignidad humana, a la diversidad cultural y a los derechos de niñas y niños.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "3° de Primaria",
    "contenido_id": "CONT_SB_344",
    "contenido": "Valoración de los ecosistemas: características del territorio como espacio de vida y las interacciones de la comunidad con los ecosistemas, para su preservación responsable y sustentable.",
    "pdas": [
      {
        "pda_id": "PDA_SB_344_1",
        "descripcion": "Representa cartográficamente las características del territorio de su comunidad, como espacio de vida.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_344_2",
        "descripcion": "Indaga las interacciones de la comunidad con los ecosistemas del territorio, reconociendo: rasgos físicos, altitud, biodiversidad local (tipo de animales y plantas), tipos de suelo, tipos de cultivos, aire, agua (de dónde llega el agua que toman en su comunidad, manantiales, ríos, lagunas, barrancas).",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_344_3",
        "descripcion": "Analiza críticamente cómo interactúa con ellos cotidianamente, así como los beneficios que obtiene para su supervivencia junto con su comunidad (alimentación, salud, vestido, economía, bienestar), su buen manejo (valores culturales de bienestar y conservación del territorio y sus ecosistemas en la vida cotidiana), su manejo inadecuado (valores culturales que degradan el territorio, sus ecosistemas, la vida, la salud y la tradición cultural de la comunidad), y evalúa los impactos positivos y negativos de sus interacciones y de la sociedad con la naturaleza.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_344_4",
        "descripcion": "Comprende la importancia de que las personas actuemos con responsabilidad, disminuyendo el deterioro de los ecosistemas, a partir de prácticas para la preservación de la vida y el bienestar de la comunidad.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_345",
    "contenido": "Capacidades y habilidades motrices.",
    "pdas": [
      {
        "pda_id": "PDA_SB_345_1",
        "descripcion": "Pone en práctica sus habilidades motrices en situaciones lúdicas, individuales y colectivas, para valorar la diversidad de posibilidades que contribuyen a mejorar su actuación.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_346",
    "contenido": "Construcción del proyecto de vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_346_1",
        "descripcion": "Reconoce cambios en sus necesidades, intereses y logros, para ajustar metas y diseñar estrategias que permitan cumplirlas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_346_2",
        "descripcion": "Reflexiona acerca de los factores culturales, sociales u otros presentes en la conformación de las ideas, preferencias, necesidades y circunstancias, para determinar aspectos que posibilitan o limitan el desarrollo personal y colectivo.Reflexiona acerca de los factores culturales, sociales u otros presentes en la conformación de las ideas, preferencias, necesidades y circunstancias, para determinar aspectos que posibilitan o limitan el desarrollo personal y colectivo.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_347",
    "contenido": "Educación Integral en Sexualidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_347_1",
        "descripcion": "Valora y aprecia las formas de expresar el carácter y los afectos para tomar decisiones orientadas a salvaguardar su integridad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_348",
    "contenido": "Efectos en la vida de las personas, derivados de cambios sociales, culturales y en la salud.",
    "pdas": [
      {
        "pda_id": "PDA_SB_348_1",
        "descripcion": "Dialoga acerca de situaciones que conoce o ha vivido en su familia o comunidad, para comprender causas y efectos en la vida de las personas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_349",
    "contenido": "Entendimiento mutuo en la escuela.",
    "pdas": [
      {
        "pda_id": "PDA_SB_349_1",
        "descripcion": "Comparte ideas y experiencias sobre diferentes temas, para aprender la importancia de escuchar.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_349_2",
        "descripcion": "Conoce distintos puntos de vista, para favorecer el entendimiento y la negociación con las demás personas.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_350",
    "contenido": "Equidad de género en las familias, la escuela y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_350_1",
        "descripcion": "Reflexiona acerca de los estilos de relación y distribución de responsabilidades, para tomar decisiones respecto de aquellos que inciden positivamente en el bienestar de todas y todos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_351",
    "contenido": "Estilos de vida activos y saludables.",
    "pdas": [
      {
        "pda_id": "PDA_SB_351_1",
        "descripcion": "Organiza juegos y otras actividades físicas, para analizar avances y logros personales o grupales, en favor de asumir una vida saludable.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_352",
    "contenido": "Formas de ser, pensar, actuar y relacionarse.",
    "pdas": [
      {
        "pda_id": "PDA_SB_352_1",
        "descripcion": "Comparte los cambios que afronta en sus capacidades y las formas de ser, pensar, actuar y relacionarse para valorar la manera en que las demás personas inciden en la construcción de su identidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_353",
    "contenido": "Higiene para una vida saludable.",
    "pdas": [
      {
        "pda_id": "PDA_SB_353_1",
        "descripcion": "Comparte experiencias para mejorar la higiene en su escuela y su comunidad, y organiza campañas de higiene en la escuela y la comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_354",
    "contenido": "Hábitos saludables, para promover el bienestar en los seres vivos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_354_1",
        "descripcion": "Analiza las características de una alimentación saludable, para diseñar estrategias que mejoren sus hábitos alimentarios en el contexto escolar.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_354_2",
        "descripcion": "Realiza prácticas de hidratación saludable para promover prácticas de alimentación, vinculadas con la salud en su escuela y comunidad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_355",
    "contenido": "Interacción motriz.",
    "pdas": [
      {
        "pda_id": "PDA_SB_355_1",
        "descripcion": "Experimenta situaciones caracterizadas por la cooperación y oposición, con el fin de reconocer sus implicaciones en la interacción y el logro de metas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_356",
    "contenido": "La comunidad como el espacio en el que se vive y se encuentra la escuela.",
    "pdas": [
      {
        "pda_id": "PDA_SB_356_1",
        "descripcion": "Reconoce ideas, conocimientos, prácticas culturales y formas de organización, para explicar el significado que tienen en su familia, escuela y comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_357",
    "contenido": "La escuela como espacio de convivencia, colaboración y aprendizaje.",
    "pdas": [
      {
        "pda_id": "PDA_SB_357_1",
        "descripcion": "Participa en la toma de decisiones sobre el funcionamiento de la escuela, y la relación escue la comunidad, para favorecer la colaboración.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_357_2",
        "descripcion": "Propone alternativas que favorezcan la colaboración entre las personas que integran la escuela y su comunidad para enriquecer sus experiencias, saberes y conocimientos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_358",
    "contenido": "Las familias como espacio de protección, cuidado, afecto y sustento para el desarrollo personal.",
    "pdas": [
      {
        "pda_id": "PDA_SB_358_1",
        "descripcion": "Reflexiona sobre el valor de la familia y de la aportación de sus integrantes, para favorecer su desarrollo personal y afectivo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_358_2",
        "descripcion": "Describe los valores que distinguen a su familia, para entenderlos como elementos de desarrollo social y personal.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_359",
    "contenido": "Los afectos y su influencia en el bienestar.",
    "pdas": [
      {
        "pda_id": "PDA_SB_359_1",
        "descripcion": "Utiliza conocimientos previos sobre las diferentes expresiones emocionales para aprovechar su función en situaciones cotidianas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_359_2",
        "descripcion": "Considera las reacciones emocionales ante situaciones comunes e identifica las más adecuadas para lograr sus metas y el bien común.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_360",
    "contenido": "Pensamiento lúdico, estratégico y creativo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_360_1",
        "descripcion": "Diseña estrategias para atender situaciones o resolver problemas y conflictos que se presentan en el juego y en actividades cotidianas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_361",
    "contenido": "Posibilidades cognitivas, expresivas, motrices, creativas y de relación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_361_1",
        "descripcion": "Reconoce sus capacidades y habilidades motrices, al representar con el cuerpo situaciones e historias, a fin de favorecer la construcción de la imagen corporal.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_362",
    "contenido": "Reconocimiento de las necesidades y características propias y de las demás personas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_362_1",
        "descripcion": "Aprecia lo que las personas le aportan en la atención de sus necesidades e intereses para reconocer la importancia del enriquecimiento mutuo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_362_2",
        "descripcion": "Invita a otras personas a participar en una representación dramatizada, sobre la importancia del reconocimiento de todas y todos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_363",
    "contenido": "Sentido de pertenencia, identidad personal y social.",
    "pdas": [
      {
        "pda_id": "PDA_SB_363_1",
        "descripcion": "Reconstruye la historia de su familia, escuela y comunidad, a partir de narraciones y/o documentos en los que respondan a cuestionamientos como ¿quiénes somos?, y ¿de dónde vinieron nuestros antepasados?, para descubrir los diversos aportes socioculturales y lingüísticos que pueden ser parte de su identidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_363_2",
        "descripcion": "Consulta, por diversos medios físicos y electrónicos, información para entender la articulación de su comunidad local con la región, alcaldía, estado, según se trate de contextos rurales o urbanos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_364",
    "contenido": "Situaciones de riesgo social en la comunidad y región donde vive.",
    "pdas": [
      {
        "pda_id": "PDA_SB_364_1",
        "descripcion": "Analiza situaciones de riesgo social en la comunidad y región donde vive.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_364_2",
        "descripcion": "Distingue situaciones de riesgo social en la región, y propone algunas medidas para el autocuidado.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_364_3",
        "descripcion": "Reconoce que la violencia doméstica y el vandalismo son situaciones que ponen en riesgo la sana convivencia, y analiza estrategias de prevención al respecto.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_364_4",
        "descripcion": "Organiza campañas en su grupo y escuela, para prevenir problemas sociales, como la violencia escolar, el vandalismo, las adicciones, entre otros.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_364_5",
        "descripcion": "Investiga problemas sociales en su contexto y país, para analizar sus causas y efectos.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_365",
    "contenido": "Análisis e intercambio de comentarios sobre empaques de productos y anuncios publicitarios.",
    "pdas": [
      {
        "pda_id": "PDA_SB_365_1",
        "descripcion": "Comprende advertencias e instrucciones incluidas en empaques y etiquetas de productos, así como la finalidad de sus anuncios publicitarios.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_365_2",
        "descripcion": "Identifica emisor, receptor y propósito de anuncios publicitarios difundidos en diferentes medios y reflexiona sobre su veracidad.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_365_3",
        "descripcion": "Reflexiona y comenta sobre la función persuasiva del lenguaje publicitario y el desarrollo del pensamiento crítico ante la publicidad.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_366",
    "contenido": "Búsqueda y manejo reflexivo de información.",
    "pdas": [
      {
        "pda_id": "PDA_SB_366_1",
        "descripcion": "Elabora preguntas para localizar la información que requiere y reflexiona sobre el uso de acentos gráficos en palabras que se usan para preguntar: qué, cómo, cuándo, dónde, por qué, para qué.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_366_2",
        "descripcion": "Emplea elementos de los textos que organizan el contenido: títulos, subtítulos, viñetas, tipografía, palabras clave, para localizar información.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_366_3",
        "descripcion": "Hace anticipaciones sobre el contenido de un libro, a partir de la información de la portada y contraportada.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_366_4",
        "descripcion": "Diversifica el uso de fuentes de consulta en función del propósito y el tema, y reconoce la organización de materiales informativos y sus elementos.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_366_5",
        "descripcion": "Parafrasea y/o ejemplifica planteamientos que expone un texto informativo.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_366_6",
        "descripcion": "Consulta diccionarios y glosarios para resolver dudas relacionadas con el uso de ciertos términos.",
        "orden": 6
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_367",
    "contenido": "Comprensión y producción de cuentos para su disfrute.",
    "pdas": [
      {
        "pda_id": "PDA_SB_367_1",
        "descripcion": "Selecciona, lee y escucha cuentos de distintos orígenes y autores.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_367_2",
        "descripcion": "Reflexiona sobre el uso de los tiempos pretérito y copretérito para narrar sucesos pasados, y sobre el empleo del presente en diálogos directos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_367_3",
        "descripcion": "Planea, escribe, revisa, corrige y comparte cuentos sobre diversos temas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_367_4",
        "descripcion": "DEscribe un cuento de manera colectiva y elabora los personajes con objetos cotidianos y realiza una presentación frente a un público.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_368",
    "contenido": "Comprensión y producción de resúmenes.",
    "pdas": [
      {
        "pda_id": "PDA_SB_368_1",
        "descripcion": "Explora y analiza el contenido de los textos por resumir.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_368_2",
        "descripcion": "Relaciona el contenido del texto por resumir y los recursos complementarios: recuadros, tablas, gráficas e imágenes.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_368_3",
        "descripcion": "Registra, con sus propias palabras, la información más relevante del texto por resumir, en función de los propósitos predeterminados; por ejemplo: escribir un texto informativo o presentar una exposición.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_368_4",
        "descripcion": "Usa signos de interrogación y exclamación para distinguir una pregunta de la expresión de una emoción.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_368_5",
        "descripcion": "evisa y corrige errores de concordancia de género y número.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_369",
    "contenido": "Comprensión y producción de textos discontinuos para organizar actividades y ordenar información.",
    "pdas": [
      {
        "pda_id": "PDA_SB_369_1",
        "descripcion": "Identifica características y funciones de los textos discontinuos, en particular de líneas del tiempo, tablas de doble entrada y gráficas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_369_2",
        "descripcion": "Reflexiona sobre el uso de textos discontinuos, para resumir y ordenar información.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_369_3",
        "descripcion": "Produce textos discontinuos para organizar información que expone a otras personas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_369_4",
        "descripcion": "Emplea signos de puntuación como el punto y la coma.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_370",
    "contenido": "Comprensión y producción de textos expositivos en los que se planteen: problema-solución, comparacióncontraste, causaconsecuencia y enumeración.",
    "pdas": [
      {
        "pda_id": "PDA_SB_370_1",
        "descripcion": "Identifica los efectos de una situación o fenómeno planteados en la información que presenta un texto expositivo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_370_2",
        "descripcion": "Planea, escribe, revisa y corrige sus propios textos expositivos del tipo: problema-solución, comparación-contraste, causa-consecuencia y enumeración.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_370_3",
        "descripcion": "Es capaz de seleccionar fuentes y obtener información para proponer soluciones a problemas de su entorno.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_370_4",
        "descripcion": "Utiliza nexos, adverbios y frases adverbiales de secuencia como luego, más adelante, después, antes, más temprano, así como nexos para establecer comparaciones: en cambio, por un lado, por otro lado, a diferencia de, al igual que.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_371",
    "contenido": "Comprensión y producción de textos instructivos para realizar actividades escolares y participar en diversos juegos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_371_1",
        "descripcion": "Analiza las características de diversos textos instructivos, como reglamentos, recetas médicas y de cocina, indicaciones para participar en un juego de mesa o de patio, e interpreta la información que presentan.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_371_2",
        "descripcion": "Emplea verbos en infinitivo o imperativo, así como términos secuenciales, para escribir instrucciones.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_371_3",
        "descripcion": "Describe el orden secuencial de un procedimiento.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_371_4",
        "descripcion": "Reflexiona sobre la ortografía de palabras homónimas.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_371_5",
        "descripcion": "Emplea signos de puntuación como el punto, la coma y los dos puntos.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_372",
    "contenido": "Comunicación a distancia con personas y propósitos diversos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_372_1",
        "descripcion": "Lee y analiza cartas reales y/o literarias.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_372_2",
        "descripcion": "Usa convenciones de cartas y otros textos epistolares, como lugar, fecha, destinatario, dirección, en el intercambio postal y/o electrónico de mensajes.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_372_3",
        "descripcion": "Mantiene comunicación a distancia con interlocutores y propósitos diversos, usando invitaciones, felicitaciones, recados, tarjetas postales y documentos adjuntos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_372_4",
        "descripcion": "Reflexiona sobre la necesidad de proteger sus datos personales y acuerda medidas y acciones para salvaguardar su integridad física y moral.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_373",
    "contenido": "Creación de propuestas con intención artística para mejorar la escuela y el resto de la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_373_1",
        "descripcion": "Crea producciones con distintos lenguajes, oral, escrito, musical, visual, teatral, dancístico, que representen vínculos respetuosos con la diversidad para su participación en la mejora comunitaria.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_373_2",
        "descripcion": "Elabora una propuesta con intención artística, en colectivo, mediante movimientos, sonidos, formas, colores, gestos y objetos, para ofrecer propuestas de solución a situaciones o problemas identificados, ya sea en la escuela o en el resto de la comunidad.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_373_3",
        "descripcion": "Opina de manera oral y escrita sobre propuestas realizadas por sus pares, así como de los elementos y recursos de los lenguajes que emplearon, y de qué manera consideran que éstas mejoran los espacios escolares y comunitarios.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_373_4",
        "descripcion": "Experimenta con una variedad de formas, colores, texturas, sonidos, movimientos, gestos y objetos, para crear una propuesta artística colectiva que mejore el espacio que habita.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_374",
    "contenido": "Descripción de personas, lugares, hechos y procesos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_374_1",
        "descripcion": "Planea, escribe, revisa y corrige textos donde describe, de manera lógica, procesos con los que tiene cierta familiaridad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_374_2",
        "descripcion": "Reflexiona sobre el uso de palabras y frases adjetivas y adverbiales para describir procesos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_374_3",
        "descripcion": "Utiliza algunos conectores secuenciales, como en primer lugar, posteriormente, finalmente; y temporales, como al mismo tiempo, simultáneamente, más tarde, antes, cuando describe un proceso, a fin de dar claridad al texto.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_374_4",
        "descripcion": "Revisa y corrige las descripciones que realiza, para transmitir ideas de forma clara, evitando repeticiones innecesarias.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_374_5",
        "descripcion": "Reconoce el uso del punto y coma y los dos puntos, y los emplea al enumerar diferentes elementos o aspectos.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_375",
    "contenido": "Diálogo para la toma de acuerdos y el intercambio de puntos de vista.",
    "pdas": [
      {
        "pda_id": "PDA_SB_375_1",
        "descripcion": "Indica de manera respetuosa cuando no ha comprendido los puntos de vista o ideas de otros.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_375_2",
        "descripcion": "Utiliza información de varias fuentes orales y escritas, para explicar y argumentar sus propias ideas y puntos de vista.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_375_3",
        "descripcion": "Recupera de forma explícita experiencias y conocimientos, para tomar decisiones o asumir una postura.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_375_4",
        "descripcion": "Intercambia información, practica la escucha activa, empatía y/o negociación y toma acuerdos.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_376",
    "contenido": "Entrevistas con personas de la comunidad para conocer diversos temas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_376_1",
        "descripcion": "Participa en entrevistas a distintos personajes de la comunidad acerca de condiciones problemáticas que padecen y posibilidades de solución.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_376_2",
        "descripcion": "Elabora preguntas pertinentes que recaben la información deseada y evita plantear redundantes.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_376_3",
        "descripcion": "Usa signos de interrogación y puntuación para escribir las preguntas y respuestas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_376_4",
        "descripcion": "Planifica entrevistas: define propósito(s), identifica persona(s) por entrevistar, plantea pregunta(s), duración, lugar, fecha.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_376_5",
        "descripcion": "Usa pautas que norman intercambios orales: respetar turno para hacer uso de la palabra, prestar atención, adecuar tono y volumen de voz, emplear fórmulas de cortesía, plantear preguntas, exponer opiniones.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_377",
    "contenido": "Experimentación con elementos visuales y sonoros en producciones colectivas artísticas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_377_1",
        "descripcion": "Crea un cortometraje colectivo, utilizando objetos cotidianos en animaciones con secuencias fotográficas y lo sonoriza para compartir ideas y experiencias.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_377_2",
        "descripcion": "Recrea una experiencia colectiva mediante la intervención o transformación de un objeto significativo, con el uso de colores, telas, materiales reciclados y elementos de la naturaleza, entre otros.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_378",
    "contenido": "Exposición sobre temas diversos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_378_1",
        "descripcion": "Expone sobre diversos temas, considerando: Como presentador o presentadora -Planear su exposición, lo cual incluye la elaboración de materiales de apoyo. -Realizar apuntes para usar como guía. -Reflexionar sobre el uso de sinónimos y antónimos. -Mantener el interés del auditorio, ajustando el volumen de voz y usando elementos paralingüísticos. -Responder dudas y atender inquietudes. Como audiencia -Escuchar atenta y comprensivamente, tomando notas. -Plantear preguntas o comentar sobre lo expuesto.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_379",
    "contenido": "Identificación del uso de la fantasía y la realidad en diferentes manifestaciones culturales y artísticas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_379_1",
        "descripcion": "Analiza la representación de distintas formas de ser y estar en el mundo, incluyendo al género, en manifestaciones culturales y artísticas que sean de su interés.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_379_2",
        "descripcion": "Crea un personaje, empleando elementos de los lenguajes artísticos, que retome aspectos reales y fantásticos de una manifestación cultural o artística, para expresar sus gustos e intereses.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_379_3",
        "descripcion": "DEscribe comentarios críticos sobre manifestaciones culturales y artísticas, y los comparte por medio de una publicación física y/o electrónica elaborada con sus compañeras y compañeros.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_380",
    "contenido": "Indagación sobre la diversidad lingüística en su comunidad y el resto del país.",
    "pdas": [
      {
        "pda_id": "PDA_SB_380_1",
        "descripcion": "Observa y reproduce expresiones, orales y escritas, con raíces en lenguas originarias, que son usuales en su comunidad y en otras.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_380_2",
        "descripcion": "Identifica lenguas que se hablan en su municipio y en su entidad, y en qué contextos y ocasiones.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_380_3",
        "descripcion": "Reflexiona acerca de la relevancia que tiene para la vida social hablar y escribir según el contexto y los interlocutores e interlocutoras.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_380_4",
        "descripcion": "Identifica variantes de su lengua materna que se usan en comunidades diferentes.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_381",
    "contenido": "Indagación, reelaboración y difusión de notas informativas con opiniones sobre hechos que afectan a la escuela y/o a la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_381_1",
        "descripcion": "Conoce hechos noticiosos o noticias por medio de noticieros de radio y/o televisión.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_381_2",
        "descripcion": "Compara cómo se presenta una misma noticia en distintos medios de comunicación e identifica diferencias y semejanzas en su tratamiento.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_381_3",
        "descripcion": "Comenta y comparte sus impresiones sobre diferencias y semejanzas identificadas en el tratamiento de una noticia.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_382",
    "contenido": "Lectura dramatizada y representación teatral.",
    "pdas": [
      {
        "pda_id": "PDA_SB_382_1",
        "descripcion": "Explora en colectivo el movimiento, el gesto, la forma, el color y el sonido, para recrear fragmentos de una lectura de su interés, por medio del teatro de títeres, sombras o papel.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_382_2",
        "descripcion": "Realiza, en colectivo, una lectura dramatizada o teatro de atril de un texto dramático, jugando con combinaciones de secuencias de sonidos rápidos, lentos, agudos, graves, fuertes, débiles, con pausa y con acentos variados.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_382_3",
        "descripcion": "Identifica la estructura externa del texto dramático, conformada por diálogos, listado de personajes y acotaciones.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_382_4",
        "descripcion": "Conoce otros tipos de textos en los que se puede realizar una lectura dramatizada: historieta, cómic, manga, que contienen onomatopeyas, símbolos, viñetas, etcétera.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_383",
    "contenido": "Lectura y creación de poemas, canciones y juegos de palabras para su disfrute.",
    "pdas": [
      {
        "pda_id": "PDA_SB_383_1",
        "descripcion": "Reconoce algunas características del contexto de creación de un poema, canción o juego de palabras, para realizar interpretaciones de su significado.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_383_2",
        "descripcion": "Establece relaciones entre el texto y las experiencias de vida, a partir de lo que le sugiere su lectura (figuras de significación).",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_383_3",
        "descripcion": "Identifica y reflexiona sobre los elementos rítmicos y melódicos de los textos poéticos: ritmos y duraciones, repetición de frases, palabras, sílabas, etcétera, en los poemas, canciones y juegos de palabras.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_383_4",
        "descripcion": "Revisa de manera lúdica las variaciones que se dan en la lectura en voz alta, en cuanto a los tonos, pausas y acentos posibles. Asi mismo, interpreta los diferentes tonos, pausas y acentos que realiza cada persona al leer en voz alta.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_383_5",
        "descripcion": "Experimenta con la creación de poemas en verso y prosa, canciones o juegos de palabras, a partir del establecimiento de un tema que le sea significativo.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_384",
    "contenido": "Narración de sucesos del pasado y del presente.",
    "pdas": [
      {
        "pda_id": "PDA_SB_384_1",
        "descripcion": "Reconoce y usa diversos estilos, recursos y estrategias narrativas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_384_2",
        "descripcion": "Establece relaciones causales y temporales entre acontecimientos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_384_3",
        "descripcion": "Reflexiona sobre los tiempos presente, pretérito y copretérito, para narrar sucesos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_384_4",
        "descripcion": "Infiere el significado de las palabras, a partir de la información contextual de un texto.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_385",
    "contenido": "Reconocimiento y reflexión sobre el uso de elementos de los lenguajes artísticos, en manifestaciones culturales y artísticas de la comunidad y del resto del mundo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_385_1",
        "descripcion": "Distingue movimientos, vestuarios, aromas, gestos, sonidos u objetos, en las manifestaciones culturales y artísticas de su comunidad y otros lugares del mundo, para reflexionar sobre su sentido y signif icado.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_385_2",
        "descripcion": "nteractúa con manifestaciones culturales y artísticas de su comunidad y las compara con las de otros lugares, compartiendo sus conclusiones, mediante fotografías o dibujos comentados, o bien, mediante un escrito.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_385_3",
        "descripcion": "Aprecia la diversidad cultural y lingüística en su país y el mundo mediante la reflexión sobre algunas manifestaciones culturales y artísticas de su interés para conocer su contexto.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_386",
    "contenido": "Reflexión y uso de los lenguajes artísticos, para recrear experiencias estéticas que tienen lugar en la vida cotidiana.",
    "pdas": [
      {
        "pda_id": "PDA_SB_386_1",
        "descripcion": "Utiliza formas, colores, texturas, sonidos y movimientos para recrear, mediante diferentes producciones artísticas, obras de arte que le han causado interés e impacto.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_386_2",
        "descripcion": "Reconoce las formas, líneas, colores y texturas de su entorno natural y social, y lo recrea mediante distintas producciones artísticas individuales y colectivas para reflexionar sobre la presencia de los lenguajes artísticos en la vida cotidiana.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_387",
    "contenido": "Representación de hechos y experiencias significativas mediante el empleo de recursos textuales, visuales, corporales y sonoros.",
    "pdas": [
      {
        "pda_id": "PDA_SB_387_1",
        "descripcion": "Selecciona los recursos textuales que le permiten recrear un hecho significativo, de acuerdo con el énfasis que busca comunicar.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_387_2",
        "descripcion": "Reflexiona sobre una experiencia significativa que ha transformado su manera de ser o vivir, y la recrea por medio de una historia, que representa con objetos animados y sonidos corporales.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_387_3",
        "descripcion": "Realiza un cortometraje con imágenes de su entorno, o elabora un folioscopio (flip book), para narrar un acontecimiento significativo de la comunidad.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_388",
    "contenido": "Uso de croquis y mapas para describir trayectos o localizar lugares.",
    "pdas": [
      {
        "pda_id": "PDA_SB_388_1",
        "descripcion": "Observa mapas e identifica sus características y función.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_388_2",
        "descripcion": "Identifica convenciones gráficas usadas en mapas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_388_3",
        "descripcion": "Comprende y usa vocabulario adecuado para dar indicaciones a fin de localizar lugares en un mapa.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_388_4",
        "descripcion": "Elabora mapas para representar lugares.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_389",
    "contenido": "Uso de textos formales para atender diversos asuntos personales o del bienestar común.",
    "pdas": [
      {
        "pda_id": "PDA_SB_389_1",
        "descripcion": "Identifica formularios que se emplean en la gestión de determinados trámites personales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_389_2",
        "descripcion": "Comprende el contenido de documentos de uso en trámites personales.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_389_3",
        "descripcion": "Reflexiona sobre las características gráficas y de diseño de dichos documentos: tipografía, logotipos, recuadros, subrayados.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_389_4",
        "descripcion": "Reconoce la relación entre los documentos personales, su identidad y el ejercicio de sus derechos.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_390",
    "contenido": "Alimentación saludable, con base en el Plato del Bien Comer, así como prácticas culturales y la toma de decisiones encaminadas a favorecer la salud y el medio ambiente y la economía familiar.",
    "pdas": [
      {
        "pda_id": "PDA_SB_390_1",
        "descripcion": "Indaga y describe los nutrimentos que proporcionan los alimentos que consume e identifica los que necesita incluir en su alimentación, así como los beneficios para su salud y para realizar sus actividades diarias.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_390_2",
        "descripcion": "Identifica y analiza la influencia de diversos medios de comunicación o redes sociales en el consumo de alimentos con alto contenido de grasa, azúcares y sal, así como su impacto en la salud, y toma decisiones que mejoren tanto su alimentación como la economía personal y familiar.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_390_3",
        "descripcion": "Reconoce y valora las prácticas culturales, relacionadas con la alimentación saludable presentes en su comunidad, como la milpa, y la rotación de cultivos, que favorecen la producción y consumo responsable, la obtención de una variedad de alimentos y el cuidado del medio ambiente.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_390_4",
        "descripcion": "Indaga y explica qué productos y alimentos son convenientes adquirir o consumir en su familia, por su costo económico y el impacto medio ambiental que provocan.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_391",
    "contenido": "Cuerpos geométricos y sus características.",
    "pdas": [
      {
        "pda_id": "PDA_SB_391_1",
        "descripcion": "Reconoce y describe las características de distintos prismas rectos (números de vértices y aristas, número y formas de caras); reconoce los desarrollos planos que permiten construir los, en particular el cubo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_392",
    "contenido": "Cálculo de perímetro y área.",
    "pdas": [
      {
        "pda_id": "PDA_SB_392_1",
        "descripcion": "Distingue entre contorno y superficie de caras de objetos de su entorno y de figuras y cuerpos geométricos; reconoce al perímetro como la suma de las longitudes de sus lados y área como la medida de la superficie; estima y compara áreas de manera directa, con unidades no convencionales y con retículas de cuadrados.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_393",
    "contenido": "Efectos de la aplicación de fuerzas y del calor sobre los objetos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_393_1",
        "descripcion": "Comprende algunas formas de generar calor, como la fricción y el contacto, e indaga su importancia en la vida cotidiana.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_393_2",
        "descripcion": "Describe los efectos del calor sobre los objetos, a partir de experimentar con ellos al frotarlos unos con otros; reconoce que la transferencia de calor va del objeto de mayor al de menor temperatura.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_393_3",
        "descripcion": "Diseña y construye un dispositivo o juguete sencillo que funcione con calor, y explica su funcionamiento.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_394",
    "contenido": "Estructura y funcionamiento del cuerpo humano: sistema sexual; cambios en la pubertad e implicaciones socioculturales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_394_1",
        "descripcion": "Indaga, describe y representa mediante modelos, los caracteres sexuales primarios y secundarios, al comparar los cuerpos de niñas y niños con los de adolescentes; establece relaciones entre los cambios que se presentan durante la pubertad y la adolescencia, con el desarrollo biológico del ser humano.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_394_2",
        "descripcion": "Comprende la importancia de llevar a cabo hábitos de higiene de los sistemas sexuales; practica acciones de autocuidado y toma decisiones para fortalecerlas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_394_3",
        "descripcion": "Comprende que la menstruación es un ciclo natural de desa rrollo físico de las niñas a partir de describir y representar sus fases; explica la diversidad de síntomas físicos y sensaciones que se pueden experimentar, algunas creencias y tabúes alrededor de ésta, así como medidas de cuidado e higiene personal.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_394_4",
        "descripcion": "Indaga y comunica ideas, valores, prácticas, costumbres y estereotipos que existen en las familias y la comunidad, en torno a los cambios anatómicos y fisiológicos que se presentan tanto en la pubertad como en la adolescencia, para distinguir entre las niñas y los niños, de las y los adolescentes.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_395",
    "contenido": "Estructura y funcionamiento del cuerpo humano: sistemas locomotor y digestivo, así como prácticas para su cuidado, desde su contexto sociocultural.",
    "pdas": [
      {
        "pda_id": "PDA_SB_395_1",
        "descripcion": "Identifica y describe la estructura y funciones del sistema digestivo, así como su relación con el sistema circulatorio, a partir de representar la ruta de los alimentos durante la ingestión, digestión, absorción y transporte de nutrimentos, y los órganos que participan en estos procesos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_395_2",
        "descripcion": "Describe la participación de la saliva y los jugos gástricos en la transformación de los alimentos, a partir de experimentar con agua, vinagre, jugo de limón y diversos alimentos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_395_3",
        "descripcion": "Reconoce prácticas socioculturales como la herbolaria, para la atención de malestares e infecciones del sistema digestivo, y practica acciones para su cuidado.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_396",
    "contenido": "Estudio de los números.",
    "pdas": [
      {
        "pda_id": "PDA_SB_396_1",
        "descripcion": "Expresa oralmente la sucesión numérica hasta cinco cifras, en español y hasta donde sea posible, en su lengua materna, de manera ascendente y descendente a partir de un número natural dado.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_396_2",
        "descripcion": "Identifica y usa los números ordinales, en español y en su lengua materna para ordenar objetos, o para indicar el lugar que ocupan dentro de una colección de hasta veinte elementos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_396_3",
        "descripcion": "A través de situaciones cotidianas y de diversos contextos, cuenta, representa de diferentes formas, interpreta, ordena, lee y escribe números naturales de hasta cinco cifras; identifica regularidades en los números.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_396_4",
        "descripcion": "A partir de situaciones vinculadas a diferentes contextos, representa, interpreta, lee, escribe y ordena números decimales hasta centésimos en notación decimal y con letras apoyándose en modelos gráficos; comprende la equivalencia entre décimos, centésimos y la unidad.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_396_5",
        "descripcion": "Representa, con el apoyo de material concreto y modelos gráficos, fracciones: tercios, quintos, sextos, novenos y décimos, para expresar el resultado de mediciones y repartos en diversos contextos.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_396_6",
        "descripcion": "Propone expresiones aditivas equivalentes de tercios, quintos, sextos, novenos y décimos; también compara fracciones (con igual numerador o igual denominador) utilizando los signos > (mayor que), < (menor que) o = (igual).",
        "orden": 6
      },
      {
        "pda_id": "PDA_SB_396_7",
        "descripcion": "Identifica y representa la unidad de referencia, a partir de una fracción dada de esta en la resolución de situaciones problemáticas.",
        "orden": 7
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_397",
    "contenido": "Figuras geométricas y sus características.",
    "pdas": [
      {
        "pda_id": "PDA_SB_397_1",
        "descripcion": "Con el apoyo de instrumentos geométricos, construye, analiza y clasifica cuadriláteros a partir de sus lados, ángulos y diagonales; explica los criterios utilizados para la clasificación.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_398",
    "contenido": "Formación de mezclas y sus propiedades.",
    "pdas": [
      {
        "pda_id": "PDA_SB_398_1",
        "descripcion": "Comprende que una mezcla está formada por diversos materiales en diferentes proporciones, a partir de experimentar con mezclas de materiales como agua y arena, agua y aceite, semillas y clips.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_398_2",
        "descripcion": "Experimenta con mezclas de diversos materiales y proporciones, para identificar sus propiedades de color y sabor.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_399",
    "contenido": "Impacto de las actividades humanas en la naturaleza y en la salud.",
    "pdas": [
      {
        "pda_id": "PDA_SB_399_1",
        "descripcion": "Indaga y describe los problemas de contaminación de agua, aire y suelo, y generación de residuos sólidos en su comunidad; establece relaciones causa-efecto en los ecosistemas, así como en la salud de las personas y en el bienestar de pueblos y culturas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_399_2",
        "descripcion": "Propone y practica acciones de consumo responsable para prevenir o mitigar la contaminación de agua, aire y suelo, así como la generación de residuos sólidos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_400",
    "contenido": "Interacciones entre plantas, animales y el entorno natural: nutrición y locomoción.",
    "pdas": [
      {
        "pda_id": "PDA_SB_400_1",
        "descripcion": "Identifica y clasifica animales, con base en su tipo de alimentación: herbívoros, carnívoros y omnívoros, y su relación con el lugar donde viven.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_400_2",
        "descripcion": "Identifica, representa y explica el proceso de nutrición de plantas, en el que intervienen la luz solar, el agua, las sales minerales y el dióxido de carbono, sin llegar al uso de fórmulas químicas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_400_3",
        "descripcion": "Analiza y describe la estructura de cadenas alimentarias: productores (plantas), consumidores (animales), y descomponedores (hongos y bacterias), así como su relación con el lugar donde habitan.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_400_4",
        "descripcion": "Explica las condiciones del entorno propicias para la existencia y sobrevivencia de plantas y animales, entre ellos el ser humano; reconociendo su compromiso para cuidarlo.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_401",
    "contenido": "Medición del tiempo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_401_1",
        "descripcion": "Resuelve situaciones problemáticas que implican el uso de equivalencias entre diferentes escalas de tiempo: día, hora, minuto y segundo; reconoce al segundo como unidad básica de tiempo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_401_2",
        "descripcion": "Comprende y utiliza expresiones que indican temporalidad como quincena, bimestre, semestre, novenario, lustro, quinquenio, siglo, milenio, decenio, sexenio.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_402",
    "contenido": "Multiplicación y división, su relación como operaciones inversas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_402_1",
        "descripcion": "Resuelve situaciones problemáticas vinculadas a su contexto que implican multiplicaciones de números naturales de hasta tres por dos cifras, a partir de diversas descomposiciones aditivas y el algoritmo convencional.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_402_2",
        "descripcion": "Resuelve situaciones problemáticas vinculadas a su contexto que impliquen el uso de un algoritmo para dividir números naturales de hasta tres cifras entre un número de una o dos cifras; reconoce al cociente y al residuo como resultado de una división.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_402_3",
        "descripcion": "Utiliza, explica y comprueba sus estrategias para calcular mentalmente el doble o el triple de un número natural de dos cifras y la mitad de un número natural par de dos cifras.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_403",
    "contenido": "Organización e interpretación de datos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_403_1",
        "descripcion": "Interpreta tablas de frecuencias y gráficas de barras, y reconoce la moda de un conjunto de datos para responder preguntas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_404",
    "contenido": "Propiedades de los materiales: masa y longitud; relación entre estados físicos y la temperatura.",
    "pdas": [
      {
        "pda_id": "PDA_SB_404_1",
        "descripcion": "Describe y representa los cambios físicos del ciclo del agua: evaporación, condensación, solidificación, y su relación con la variación de la temperatura.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_404_2",
        "descripcion": "Indaga y describe los cambios de estado físico de los materiales, a partir de experimentar con la variación de la temperatura y sus efectos en diversos materiales (chocolate, mantequilla, agua, hielo, vela, cera, alcohol, gelatina, otros).",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_404_3",
        "descripcion": "Reconoce los avances tecnológicos en el diseño de termómetros más precisos y su aplicación en la vida cotidiana, la industria, la medicina y la investigación",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_405",
    "contenido": "Relaciones entre los factores físicos y biológicos que conforman los ecosistemas y favorecen la preservación de la vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_405_1",
        "descripcion": "Identifica, representa y explica las interacciones entre los factores biológicos (plantas, animales, incluido el ser humano, hongos y organismos microscópicos como bacterias), y los factores físicos (agua, aire, suelo y Sol) en la conformación de los ecosistemas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_405_2",
        "descripcion": "Compara y describe la dinámica de distintos ecosistemas de México, a partir de la diversidad de seres vivos que habitan en ellos y las características de los factores físicos que los conforman.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_405_3",
        "descripcion": "Reconoce y explica la importancia de los ecosistemas en la vida cotidiana de las personas y pueblos, así como en sus manifestaciones culturales.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_406",
    "contenido": "Sistema Tierra-Luna-Sol: interacciones, cambios y regularidades; diversas explicaciones acerca del movimiento de estos astros y su relación con algunos fenómenos naturales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_406_1",
        "descripcion": "Indaga la formación de eclipses de Sol y de Luna, y describe las similitudes y diferencias entre ellos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_406_2",
        "descripcion": "Describe y representa con modelos, la formación de eclipses solares y lunares, en los que considera los movimientos de la Tierra y la Luna con respecto al Sol, los tamaños de los cuerpos celestes, las distancias a las que se encuentran, las propiedades de la luz, en particular su propagación rectilínea, así como el punto de referencia del observador.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_406_3",
        "descripcion": "Reconoce que hay diversas maneras de explicar los fenómenos naturales, al recuperar narraciones y descripciones desde otras perspectivas culturales, alrededor de las causas y consecuencias de la formación de eclipses.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_407",
    "contenido": "Suma y resta, su relación como operaciones inversas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_407_1",
        "descripcion": "Resuelve situaciones problemáticas vinculadas a su contexto que implican sumas o restas de números naturales de hasta cuatro cifras utilizando los algoritmos convencionales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_407_2",
        "descripcion": "Resuelve situaciones problemáticas vinculadas a su contexto que implican sumas o restas de dos números decimales hasta centésimos, con apoyo de material concreto y representaciones gráficas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_407_3",
        "descripcion": "Resuelve situaciones problemáticas que implican sumas o restas de fracciones con diferente denominador (tercios, quintos, sextos, novenos y décimos) vinculados a su contexto, mediante diversos procedimientos, en particular, la equivalencia.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_408",
    "contenido": "Acciones de prevención ante peligros o amenazas de fenómenos naturales y acciones humanas y la importancia de actuar y participar en la escuela, barrio, pueblo, comunidad, entidad y país; promover la cultura de prevención, autoprotección, empatía y solidaridad con las personas afectadas y el entorno socioambiental.",
    "pdas": [
      {
        "pda_id": "PDA_SB_408_1",
        "descripcion": "Indaga en fuentes orales, bibliográficas, hemerográficas, digitales algunos desastres asociados a fenómenos naturales y/o generados por acciones humanas ocurridos en la entidad y el país, a lo largo de la historia; utiliza entrevistas generacionales como recursos para obtener los testimonios.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_408_2",
        "descripcion": "Elabora mapas para localizar los lugares en los que ocurrieron los desastres y los relaciona con los fenómenos naturales o con acciones humanas. Identifica qué desastres han ocurrido en algunas entidades que no se presentan en otras y argumenta acerca de las causas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_408_3",
        "descripcion": "Indaga sobre planes y protocolos de emergencia, (sismos, terremotos, huracanes, inundaciones, tsunamis, entre otros); participa acciones colectivas encaminadas a una cultura de prevención y autoprotección y muestra empatía por las personas afectadas por un desastre para proponer acciones de ayuda solidaria.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_409",
    "contenido": "Caracterización y localización del territorio donde vive, la entidad y México; identificación de los tipos de suelo, clima, vegetación, fauna, cuerpos de agua (ríos, lagos, cenotes, humedales), así como las formas culturales que se desarrollan, vinculadas al patrimonio biocultural de la entidad y región; reconocimiento de su organización política y cambios históricos, hasta su conformación actual.",
    "pdas": [
      {
        "pda_id": "PDA_SB_409_1",
        "descripcion": "Localiza y reconoce características del territorio de México, como suelo, clima, regiones naturales, relieve, cuerpos de agua, extensión, límites terrestres, marítimos y aéreos, así como las entidades federativas que lo integran.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_409_2",
        "descripcion": "Elabora representaciones cartográficas del territorio nacional y su diversidad natural.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_409_3",
        "descripcion": "Indaga sobre los cambios en la conformación territorial de México, y reconoce pérdidas y anexiones territoriales, así como continuidades de pueblos originarios, más allá de las fronteras políticas actuales (comparaciones en imágenes y mapas).",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_410",
    "contenido": "Composición sociocultural de la entidad federativa y de México, y su configuración a través de la historia como un país pluricultural, integrado por pueblos originarios, af romexicanos, migrantes y diversas comunidades con características y necesidades, quienes han luchado por el reconocimiento de la igualdad en dignidad y derechos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_410_1",
        "descripcion": "Analiza la conformación pluricultural y plurilingüe de México que se expresa en pueblos originarios, afromexicanos, migrantes y diversas comunidades que habitan México, que tienen prácticas culturales e historias que se manifiestan en formas de pensar, hablar, convivir, vestir, celebrar y compartir, apreciando sus aportaciones al patrimonio cultural del país y reconociendo los problemas y dificultades que enf rentan.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_410_2",
        "descripcion": "Representa en mapas la ubicación de los pueblos originarios y afromexicanos que habitan en su entidad y el territorio nacional.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_410_3",
        "descripcion": "Reconoce que en la Constitución Política de los Estados Unidos Mexicanos se garantiza el derecho a vivir con igualdad y dignidad, así como a expresar prácticas culturales y lingüísticas de los pueblos originarios y afromexicanos, y a respetar y valorar las prácticas de diversos grupos y personas.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_411",
    "contenido": "Cuidado de los ecosistemas para su regeneración, preservación responsable y sustentable.",
    "pdas": [
      {
        "pda_id": "PDA_SB_411_1",
        "descripcion": "Indaga y analiza formas diversas en que las mujeres de diversas culturas contribuyen en el cuidado, la regeneración y la preservación del ambiente y la salud, así como acciones sociales y políticas que se orientan a recuperar prácticas que ayuden a reducir el deterioro en la naturaleza.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_411_2",
        "descripcion": "Construye juicios éticos y dialoga respecto de la importancia del respeto y colaboración en el cuidado y aprovechamiento sustentable de los ecosistemas, con equidad y justicia.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_411_3",
        "descripcion": "Propone y lleva a la práctica acciones para contribuir en la regeneración y preservación de los ecosistemas, de manera personal y comunitaria en la convivencia cotidiana.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_411_4",
        "descripcion": "Reconoce que muchas de las especies endémicas que se han ido perdiendo fueron producto de desarrollos históricos de largo tiempo; identifica la relación de esos procesos con la historia de las personas y los pueblos.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_412",
    "contenido": "Democracia en la vida cotidiana: construcción, cumplimiento y aplicación justa de acuerdos, normas y leyes que contribuyen a la protección de los derechos de todas las personas, individuales y colectivos, y a la convivencia conforme a los principios de igualdad, justicia y responsabilidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_412_1",
        "descripcion": "Comprende y argumenta sobre la importancia de la participación democrática en la construcción, el cumplimiento y la aplicación justa de acuerdos, normas y leyes en el ámbito de la escuela, la comunidad, el barrio, la colonia, la vecindad, el pueblo o la localidad, entre otros, para contribuir a la protección de los derechos humanos de todas las personas y colectivos, como los pueblos indígenas, afromexicanos, grupos LGBTTTIQ+, religiosos, migrantes, entre otros, así como a la sana convivencia, conforme a los principios democráticos que nos rigen.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_413",
    "contenido": "Desigualdades por diferencias de género: causas y consecuencias en la vida cotidiana pasada y presente, para proponer acciones en favor de la igualdad, basadas en el reconocimiento y el respeto de los derechos de todas las personas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_413_1",
        "descripcion": "Analiza críticamente situaciones de desigualdad de género, en los ámbitos educativo, laboral, cultural o de participación política, comparando cómo ocurrían en el pasado y el presente.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_413_2",
        "descripcion": "Argumenta en favor de la igualdad, con base en el reconocimiento y el respeto de la dignidad y los derechos de todas las personas.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_414",
    "contenido": "El derecho a la protección de la integridad propia y la de todas las personas, reconociendo situaciones de riesgo, como el maltrato, el abuso, bullying o la explotación de tipo sexual y la importancia de su prevención, al conocer las instancias para solicitar ayuda y/o denunciar.",
    "pdas": [
      {
        "pda_id": "PDA_SB_414_1",
        "descripcion": "Dialoga acerca del derecho a que la niñez sea protegida contra toda forma de maltrato, abuso o explotación de tipo sexual.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_414_2",
        "descripcion": "Propone y practica algunas medidas preventivas ante situaciones o personas que representan un riesgo para la protección de la integridad",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_414_3",
        "descripcion": "Analiza situaciones de maltrato, abuso o explotación de tipo sexual, que puedan ocurrir en el aula, la escuela y la comunidad, y propone acciones para su denuncia y erradicación.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_415",
    "contenido": "Experiencias de organización comunitaria del pasado y del presente, y las acciones de colaboración, reciprocidad, cuidado mutuo y trabajo por el bienestar de la escuela, barrio, comunidad, pueblo y colectivo social, para configurar ambientes seguros e igualitarios, con equidad y justicia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_415_1",
        "descripcion": "Analiza críticamente el papel que juegan los valores y actitudes, así como las capacidades y responsabilidades de las personas en los procesos de organización participativa, para la conformación de ambientes igualitarios que permitan contribuir al bienestar de la comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_416",
    "contenido": "Formas y procedimientos mediante las que se eligen a las autoridades de gobierno, y los cambios que han tenido a través del tiempo, en función del bienestar colectivo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_416_1",
        "descripcion": "Indaga cómo se designaron las autoridades que gobernaban en el México colonial, cuáles eran sus funciones, cuáles son las características de la monarquía, qué eran los ayuntamientos, las encomiendas y cuáles fueron sus funciones en la Nueva España.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_416_2",
        "descripcion": "Compara y analiza críticamente cómo se eligen actualmente las autoridades de gobierno en nuestro país, y nuestra comunidad y/o pueblo, bajo el régimen democrático y/o de asambleas comunitarias, qué son los ayuntamientos o alcaldías en la actualidad y cuáles son sus funciones, reconoce las formas tradicionales de organización que se emplean en su contexto.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_417",
    "contenido": "Interculturalidad y sustentabilidad: formas en las que los pueblos originarios y otras culturas del país se relacionan con la naturaleza para contribuir a reducir el impacto negativo de la humanidad en el medio natural y social, así como acciones colectivas para promover el bienestar con respeto y protección, a fin de preservar la naturaleza y fortalecer la conciencia geográf ica.",
    "pdas": [
      {
        "pda_id": "PDA_SB_417_1",
        "descripcion": "Indaga y analiza formas diversas en que las mujeres contribuyen en el cuidado y la preservación del ambiente y la salud, así como acciones sociales y políticas que se orientan a recuperar prácticas tradicionales que ayuden a reducir y a transformar el deterioro que ocasiona la cultura capitalista dominante en la naturaleza y la sociedad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_417_2",
        "descripcion": "Comprende la importancia de una alimentación saludable y revalora la cultura de la Milpa y el Maíz en México, desarrollando acciones colectivas colaborativas en su escuela, involucrando a la comunidad, para socializar sus beneficios en la alimentación nacional.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_417_3",
        "descripcion": "Identifica cómo se ejerce el derecho humano a un ambiente sano y adecuado, para el desarrollo y bienestar planetario, y se compromete a respetar los ecosistemas, actuar con reciprocidad, cuidándolos y contribuyendo en su preservación, mediante acciones personales, colectivas y comunitarias críticas, para contribuir al consumo sustentable.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_418",
    "contenido": "La construcción colectiva de la paz: situaciones que generan diferencias y conflictos que afectan la convivencia entre las personas y grupos de pertenencia, causas y formas de resolverlo a través del diálogo, la comunicación y la empatía, para contribuir a la convivencia y la resolución de conflictos sin violencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_418_1",
        "descripcion": "Comprende que la paz es una construcción colectiva que demanda analizar críticamente las causas, desarrollo y consecuencias, de conflictos entre personas y/o grupos de pertenencia, y realiza propuestas para enfrentar las tensiones sin violencia, mediante la comunicación dialógica y la empatía.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_419",
    "contenido": "La toma de decisiones ante situaciones cotidianas y de riesgos, con base en el cuidado de la dignidad de todas y todos, considerando posibles consecuencias de las acciones, para actuar con responsabilidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_419_1",
        "descripcion": "Analiza situaciones cotidianas para la toma de decisiones, con base en criterios que priorizan el cuidado de la dignidad propia, así como de otras personas y colectivos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_419_2",
        "descripcion": "Comprende y valora los riesgos del entorno y las posibles consecuencias de las acciones, para actuar con responsabilidad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_420",
    "contenido": "La vida cotidiana antes de la primera invasión europea y en el México colonial: personas y grupos sociales que incidieron en la historia de la comunidad, entidad y el país, para reconocer sus aportes en lo social, cultural, político y económico.",
    "pdas": [
      {
        "pda_id": "PDA_SB_420_1",
        "descripcion": "Indaga en fuentes primarias o secundarias bibliográficas, hemerográficas, digitales, orales sobre la invasión española, y analiza algunos de sus impactos en las poblaciones originarias.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_420_2",
        "descripcion": "Identifica, en el período de la conquista, cómo contribuyeron los diversos grupos sociales y cuáles fueron los que tuvieron más poder y mejores condiciones, en contraste a la situación de injusticia y dialoga acerca de la desigualdad que vivieron mujeres, hombres, niñas y niños de los pueblos originarios, afrodescendientes y personas esclavizadas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_420_3",
        "descripcion": "Reflexiona de manera intercultural crítica sobre el 12 de octubre para desmontar la idea del “encuentro de dos mundos o día de la raza” y la resistencia de los pueblos originarios y af rodescendientes.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_420_4",
        "descripcion": "Indaga en diversas fuentes bibliográficas, hemerográficas o digitales sobre el México colonial, ¿cómo era la vida cotidiana?, ¿qué eran las castas y qué implicaciones tuvieron en la vida de las personas?, ¿en qué trabajaban?, ¿cómo educaban a sus hijas e hijos?, ¿qué papel tuvo la religión en la vida de las personas y los pueblos?",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_420_5",
        "descripcion": "Relaciona las leyes de castas del periodo colonial como organización social que ayuda a explicar el racismo mexicano como fenómeno histórico y contemporáneo.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_421",
    "contenido": "Origen histórico de algunos símbolos (territorio, lugares sagrados, figuras y colores, banderas, escudos, himnos, entre otros), que identifican a las comunidades, pueblos, la entidad y a México como país, en tanto referentes que dan sentido de identidad y pertenencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_421_1",
        "descripcion": "Reconoce los símbolos nacionales que identifican a México como país (himno, escudo y bandera); indaga sobre su significado, cómo y dónde surgieron, los elementos que los conforman, así como su transformación histórica, para comprender cómo ayudaron a construir una identidad nacional.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_421_2",
        "descripcion": "Dialoga sobre la importancia que tiene reconocer a la diversidad de símbolos, como el territorio, los lugares sagrados, las banderas, los himnos, entre otros, para respetar la diversidad de identidades socioculturales que conforman al país.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_421_3",
        "descripcion": "Analiza de manera crítica posibles efectos negativos de los nacionalismos en las sociedades multiculturales como México.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_422",
    "contenido": "Representaciones cartográficas de la localidad y/o comunidad; su ubicación dentro de la entidad y del país, con relación al conocimiento, función y cuidados de los ecosistemas como sustento de la vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_422_1",
        "descripcion": "Elabora representaciones cartográficas de la entidad y el territorio nacional, considerando los puntos cardinales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_422_2",
        "descripcion": "Indaga sobre los cambios en los componentes del ecosistema (suelo, agua, aire y seres vivos, entre otros), por causas físicas o sociales.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_422_3",
        "descripcion": "Comprende que las personas de distintas culturas interactúan de diferente manera con los ecosistemas, distinguiendo las formas de trabajo en que las mujeres y las personas de los pueblos originarios, afrodescendientes y otras culturas de su entidad o país, conviven de manera más armónica con los ecosistemas, protegiéndolos y preservándolos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_422_4",
        "descripcion": "Valora la importancia del respeto y colaboración en su cuidado y aprovechamiento sustentable, con equidad y justicia social",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_422_5",
        "descripcion": "Propone acciones para contribuir en la preservación de los ecosistemas, de manera personal y comunitaria, desde el trabajo y en la convivencia cotidiana de la comunidad, el barrio, el pueblo o la ciudad.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_423",
    "contenido": "Retos en el reconocimiento y ejercicio de los derechos humanos y la satisfacción de las necesidades básicas, físicas, sociales, de seguridad, emocionales y cognitivas de niñas, niños y adolescentes; así como situaciones injustas en el pasado y el presente, en las que no se respetan los derechos para satisfacer las necesidades básicas de todas las personas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_423_1",
        "descripcion": "Comprende y analiza críticamente sobre las condiciones de diversos grupos sociales del país, que en el presente y el pasado no han podido satisfacer sus necesidades básicas, cómo los distintos colectivos históricamente demandaron que sus necesidades fueran satisfechas y por el reconocimiento de sus derechos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_423_2",
        "descripcion": "Dialoga y elabora conclusiones acerca de las causas por las que determinados grupos no han cubierto sus necesidades, y reconoce que esta situación es injusta.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_423_3",
        "descripcion": "Propone alternativas para superar la desigualdad y favorecer la justicia, desde la comprensión de los derechos humanos, cuyo ejercicio no está condicionado y el Estado tiene la obligación a garantizarlos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_423_4",
        "descripcion": "Identifica a quiénes corresponde generar condiciones para que todas las personas satisfagan sus necesidades.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_424",
    "contenido": "Situaciones de discriminación en el aula, la escuela, la comunidad, la entidad y el país, sobre la diversidad de género, cultural, étnica, lingüística, social, así como sobre rasgos físicos, desarrollo cognitivo y barreras de aprendizaje, y participación en ámbitos de convivencia, para la promoción de ambientes igualitarios, de respeto a la dignidad humana y a los derechos de todas las personas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_424_1",
        "descripcion": "Conoce y analiza críticamente situaciones de discriminación y exclusión por género, física, sensorial, intelectual, mental, cultural, étnica, lingüística o social.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_424_2",
        "descripcion": "Analiza las causas de la discriminación y exclusión, y propone acciones para promover ambientes igualitarios, de respeto a la dignidad humana, a las diversidades y a los derechos de todas las personas, en la comunidad, entidad y en el país.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 4",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "4° de Primaria",
    "contenido_id": "CONT_SB_425",
    "contenido": "Valoración de los ecosistemas: características del territorio como espacio de vida y las interacciones de la comunidad con los ecosistemas, para su preservación responsable y sustentable.",
    "pdas": [
      {
        "pda_id": "PDA_SB_425_1",
        "descripcion": "Representa la visión de su comunidad respecto a su relación con la naturaleza y las tradiciones culturales construidas, a partir de su interacción con los ecosistemas del territorio.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_425_2",
        "descripcion": "Analiza críticamente otras formas de interacción de las sociedades con la naturaleza, que afectan los sistemas de vida en su territorio y en su comunidad, reconociendo que la vida humana y la de otros seres vivos depende de que se establezcan prácticas que reduzcan el impacto negativo, no sólo en la naturaleza, sino también en la sociedad, tales como el consumo sustentable, el comercio justo o economía solidaria, la agroecología y la protección del patrimonio biocultural.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_425_3",
        "descripcion": "Dialoga sobre el derecho humano a un ambiente sano, adecuado para su desarrollo y bienestar y cómo es posible ejercerlo.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_426",
    "contenido": "Acciones individuales que repercuten en la conservación y mejora de la salud.",
    "pdas": [
      {
        "pda_id": "PDA_SB_426_1",
        "descripcion": "Construye alternativas saludables y sostenibles asociadas con hábitos de higiene personal y limpieza de los espacios, para promover la toma de conciencia sobre su impacto en el bienestar personal y social.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_426_2",
        "descripcion": "Analiza los hábitos alimentarios presentes en la familia y comunidad, para valorar su impacto en favor de un consumo responsable.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_426_3",
        "descripcion": "Practica diversas estrategias que permiten reaccionar a cambios o afrontar situaciones de riesgo relacionadas con accidentes, adicciones y formas de violencia, para favorecer el bienestar personal y colectivo.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_427",
    "contenido": "Alternativas ante conflictos y problemas de la vida en la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_427_1",
        "descripcion": "Reflexiona sobre los conflictos que tiene en la escuela y la familia, para valorar las posibles alternativas de solución.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_427_2",
        "descripcion": "Valora la pertinencia del diálogo, para solucionar los conflictos interpersonales.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_428",
    "contenido": "Capacidades, habilidades y destrezas motrices.",
    "pdas": [
      {
        "pda_id": "PDA_SB_428_1",
        "descripcion": "Reconoce posibilidades y límites al participar en situaciones de juego e iniciación deportiva, individuales y colectivas, para valorar su desempeño y determinar posibles mejoras.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_429",
    "contenido": "Construcción del proyecto de vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_429_1",
        "descripcion": "Replantea las formas de satisfacer las necesidades e intereses, para promover la autodeterminación orientada al cumplimiento de metas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_429_2",
        "descripcion": "Analiza los intereses individuales y aquellos que comparte, para identificar situaciones en las que se requiere pedir apoyo y en las que se pueden acordar propuestas conjuntas.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_430",
    "contenido": "Educación Integral en Sexualidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_430_1",
        "descripcion": "Intercambia experiencias acerca de sensaciones de placer o displacer que se presentan en la interacción, para argumentar las causas, prever situaciones de riesgo y realizar prácticas seguras.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_431",
    "contenido": "Equidad de género.",
    "pdas": [
      {
        "pda_id": "PDA_SB_431_1",
        "descripcion": "Reflexiona sobre situaciones asociadas con la diversidad de identidades y género, para proponer acciones en contra de la discriminación.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_432",
    "contenido": "Estilos de vida activos y saludables.",
    "pdas": [
      {
        "pda_id": "PDA_SB_432_1",
        "descripcion": "Plantea alternativas de actividades físicas que puede practicar dentro y fuera de la escuela, con la intención de desarrollar un estilo de vida activo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_433",
    "contenido": "Formas de ser, pensar, actuar y relacionarse.",
    "pdas": [
      {
        "pda_id": "PDA_SB_433_1",
        "descripcion": "Reflexiona acerca de las formas de ser, pensar, actuar y relacionarse que tienen las personas y los factores que las originan para propiciar el entendimiento mutuo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_434",
    "contenido": "Interacción motriz.",
    "pdas": [
      {
        "pda_id": "PDA_SB_434_1",
        "descripcion": "Promueve ambientes de participación en situaciones de juego, iniciación deportiva y cotidianas, para valorar posibles interacciones en favor de una sana convivencia.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_435",
    "contenido": "La comunidad, como espacio para el aprendizaje y el bienestar común.",
    "pdas": [
      {
        "pda_id": "PDA_SB_435_1",
        "descripcion": "Argumenta la pertinencia y vigencia de las ideas, conocimientos y prácticas culturales de su comunidad, para valorar sus beneficios en el bienestar común.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_435_2",
        "descripcion": "Experimenta diferentes tipos de organización, medios, recursos y procesos, para contribuir en el desarrollo sustentable de su comunidad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_436",
    "contenido": "La escuela como ventana hacia el futuro.",
    "pdas": [
      {
        "pda_id": "PDA_SB_436_1",
        "descripcion": "Intercambia experiencias de estudio, para visualizar las opciones que tiene en su futuro.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_436_2",
        "descripcion": "Reflexiona sobre sus preferencias, para imaginar sus proyectos de vida.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_437",
    "contenido": "Las familias como espacio para el desarrollo del sentido de pertenencia y autonomía, para una sana convivencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_437_1",
        "descripcion": "Participa en distintas formas de convivencia en la familia, para fortalecer su sentido de pertenencia y afecto.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_437_2",
        "descripcion": "Reflexiona acerca de los valores heredados de la familia, para el desarrollo de una sana convivencia en la escuela y la comunidad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_438",
    "contenido": "Los afectos y su influencia en el bienestar.",
    "pdas": [
      {
        "pda_id": "PDA_SB_438_1",
        "descripcion": "Distingue los factores que influyen en el estado de ánimo y la vida cotidiana, para mejorar la convivencia y el autocuidado.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_438_2",
        "descripcion": "Explora las reacciones emocionales ante diversas situaciones y contextos para mejorar la convivencia.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_439",
    "contenido": "Pensamiento lúdico, estratégico y creativo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_439_1",
        "descripcion": "Planifica e implementa estrategias ante situaciones de juego y cotidianas, para contar con opciones que incrementen la efectividad de su actuación.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_440",
    "contenido": "Potencialidades cognitivas, expresivas, motrices, creativas y de relación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_440_1",
        "descripcion": "Integra sus capacidades y habilidades en situaciones lúdicas y expresivas (individuales y colectivas), para lograr mayor seguridad y confianza.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_441",
    "contenido": "Sentido de comunidad y satisfacción de necesidades humanas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_441_1",
        "descripcion": "Argumenta acerca de la pertinencia de ideas, conocimientos y prácticas culturales de la comunidad, para valorar sus beneficios y áreas de oportunidad en favor del bienestar individual y colectivo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_441_2",
        "descripcion": "Experimenta formas de organización y representación gráfica, así como medios, recursos y procesos empleados en la satisfacción de necesidades, con el fin de proponer mejoras orientadas a fomentar el desarrollo sostenible.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_442",
    "contenido": "Toma de decisiones y creatividad, ante problemas de la vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_442_1",
        "descripcion": "Describe los problemas que se presentan en su vida, para reflexionar sobre posibles soluciones.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_442_2",
        "descripcion": "Reflexiona sobre las posibles alternativas de solución ante problemas para analizar la toma de decisiones.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_442_3",
        "descripcion": "Valora si en la toma de decisiones interviene causaefecto para establecer causalidades del problema o se sustenta en el juicio crítico.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_443",
    "contenido": "Análisis de cuentos y poemas para su disfrute y comprensión.",
    "pdas": [
      {
        "pda_id": "PDA_SB_443_1",
        "descripcion": "Lee y selecciona cuentos y poemas mexicanos a partir de sus intereses y gustos, y comparte los motivos de su elección.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_443_2",
        "descripcion": "Analiza cuentos y poemas, y expresa oralmente sus interpretaciones de estos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_443_3",
        "descripcion": "Distingue las características tanto de cuentos como de poemas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_443_4",
        "descripcion": "Organiza y participa en un recital literario en el que lee en voz alta cuentos y poemas para la comunidad escolar.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_443_5",
        "descripcion": "Crea poemas y cuentos en colectivo a partir de historias propias, familiares o populares.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_444",
    "contenido": "Análisis y representación de guiones teatrales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_444_1",
        "descripcion": "Lee y analiza guiones teatrales de su elección, para reflexionar en colectivo sobre sus argumentos o tramas, las características de los personajes, así como los temas y conflictos que abordan.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_444_2",
        "descripcion": "Realiza lecturas en voz alta de guiones teatrales y los representa en colectivo, mediante el empleo del cuerpo, procurando respetar los elementos que le permiten ser escenificados, tales como la presencia de acción, el conflicto, los diálogos, los personajes, las acotaciones y la tipografía empleada para distinguirlos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_444_3",
        "descripcion": "Crea personajes y escenografías para la historia de una obra de teatro infantil y la sonoriza para representarla ante la comunidad.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_445",
    "contenido": "Apropiación e intervención artística en el espacio comunitario.",
    "pdas": [
      {
        "pda_id": "PDA_SB_445_1",
        "descripcion": "Plantea propuestas creativas de atención y/o solución, al identificar y socializar necesidades, intereses y problemas de la comunidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_445_2",
        "descripcion": "Representa problemas detectadas en su comunidad, por medio de historietas, maquetas, improvisaciones teatrales, una secuencia dancística o una canción popular donde modifique su letra para compartir su perspectiva con otras personas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_445_3",
        "descripcion": "Planea e interviene un espacio de la escuela o la comunidad, utilizando objetos y materiales a su alcance, así como su cuerpo, sonidos y gestos.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_446",
    "contenido": "Combinación de elementos visuales, sonoros y corporales, en composiciones artísticas colectivas, para expresar rasgos de sus identidades personal y colectiva.",
    "pdas": [
      {
        "pda_id": "PDA_SB_446_1",
        "descripcion": "Relaciona movimientos corporales con sonidos producidos con objetos del entorno, el cuerpo y/o la voz, en secuencias colectivas que narran una historia propia que les es significativa.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_446_2",
        "descripcion": "Explora sonidos graves, agudos, rápidos, lentos, fuertes, débiles, largos, cortos, con pausas y acentos, para relacionarlos con la voz y características de un personaje, que crea a partir de objetos cotidianos y de sus rasgos de identidad personal.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_446_3",
        "descripcion": "Recrea colectivamente una misma escena o paisaje de su entorno natural o social, con mientos corporales y sonidos, y posteriormente con objetos en una secuencia animada (stop motion) o una historieta.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_446_4",
        "descripcion": "Construye propuestas artísticas de manera grupal, a partir del uso de formas, colores, texturas, sonidos, movimientos y gestos, que representen su identidad colectiva.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_447",
    "contenido": "Combinación de la realidad y la ficción en elementos simbólicos de las manifestaciones culturales y artísticas, que dan identidad y sentido de pertenencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_447_1",
        "descripcion": "Aprecia movimientos, gestos y formas que crean los objetos y los cuerpos en una manifestación cultural o artística, para reflexionar sobre aquello que simbolizan.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_447_2",
        "descripcion": "Aprecia colores, sonidos y silencios en una manifestación cultural o artística de su interés, y los contrasta con el significado que representan.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_447_3",
        "descripcion": "Combina intencionalmente secuencias de formas, colores, texturas, sonidos, silencios, movimientos, gestos y objetos, para recrear un fragmento de una manifestación cultural o artística con elementos simbólicos propios.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_448",
    "contenido": "Comparación y producción de documentos que regulan la convivencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_448_1",
        "descripcion": "Analiza varios reglamentos escolares, e identifica características como brevedad o concisión y uso de verbos y numerales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_448_2",
        "descripcion": "Comprende y explica la función de los reglamentos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_448_3",
        "descripcion": "Participa en la elaboración del reglamento del aula.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_448_4",
        "descripcion": "Revisa y corrige errores de concordancia y ortografía en el texto.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_449",
    "contenido": "Comprensión y producción de textos argumentativos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_449_1",
        "descripcion": "Lee textos sobre temas polémicos, y distingue las opiniones de los datos y hechos concretos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_449_2",
        "descripcion": "Compara distintas formas de construir y expresar argumentos, siempre en un marco de respeto.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_449_3",
        "descripcion": "Expresa sus opiniones oralmente, basado en argumentos, sobre textos que incluyen temas polémicos.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_450",
    "contenido": "Comprensión y producción de textos discontinuos, para organizar y presentar información.",
    "pdas": [
      {
        "pda_id": "PDA_SB_450_1",
        "descripcion": "Reconoce, mediante el análisis, las características y funciones de los textos discontinuos, en particular de tablas de doble entrada, líneas del tiempo y cuadros cronológicos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_450_2",
        "descripcion": "Reflexiona sobre la utilidad de los textos discontinuos para organizar y presentar información.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_450_3",
        "descripcion": "Selecciona información para organizarla y presentarla por medio de textos discontinuos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_450_4",
        "descripcion": "Produce textos discontinuos, considerando al destinatario y tomando en cuenta aspectos gráficos como el tamaño de la letra empleada, a fin de garantizar su legibilidad.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_451",
    "contenido": "Comprensión y producción de textos explicativos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_451_1",
        "descripcion": "Lee distintos tipos de textos explicativos y reflexiona sobre sus características y funciones.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_451_2",
        "descripcion": "Expone las diferencias entre una descripción y una explicación, y entre un texto descriptivo y uno explicativo.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_451_3",
        "descripcion": "Recupera información de distintas fuentes, como artículos de divulgación, libros de texto, reportes de investigación, para producir un texto explicativo sobre temas diversos y con propósitos particulares.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_451_4",
        "descripcion": "Establece relaciones causales y emplea expresiones como en consecuencia, por lo tanto, debido a, a causa de, porque, por consiguiente.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_451_5",
        "descripcion": "Distingue sus propias palabras de la paráfrasis y citas textuales, y registra la información bibliográfica de las fuentes consultadas: autor, título, editorial, lugar y fecha de publicación, páginas consultadas, etcétera.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_452",
    "contenido": "Comprensión y producción de textos informativos, para ampliar sus conocimientos sobre temas de interés tanto colectivo como individual.",
    "pdas": [
      {
        "pda_id": "PDA_SB_452_1",
        "descripcion": "Selecciona y lee textos informativos sobre temas de su interés.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_452_2",
        "descripcion": "Formula preguntas para guiar la búsqueda de información específica, para lo cual usa los signos de interrogación.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_452_3",
        "descripcion": "Reconoce el tema central de los textos leídos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_452_4",
        "descripcion": "DEscribe textos informativos, empleando signos de puntuación: coma, dos puntos, punto y seguido, y punto y aparte, para organizar las ideas dentro de los párrafos.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_453",
    "contenido": "Comprensión y producción de textos para gestionar servicios públicos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_453_1",
        "descripcion": "Explora distintos formularios para gestionar servicios públicos: los que brinda la escuela, la biblioteca o, en general, la comunidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_453_2",
        "descripcion": "Reflexiona tanto sobre la utilidad de esta clase de documentos como sobre sus características y funciones.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_453_3",
        "descripcion": "Llena diferentes formularios e identifica el tipo de información que incluyen y solicitan.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_453_4",
        "descripcion": "Reconoce la utilidad de los formularios para gestionar servicios públicos.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_454",
    "contenido": "Creación y representación de narrativas a partir de acontecimientos relevantes de la comunidad, empleando recursos literarios, visuales, corporales y sonoros.",
    "pdas": [
      {
        "pda_id": "PDA_SB_454_1",
        "descripcion": "Combina secuencias de movimientos, gestos, formas, sonidos, colores y objetos, a partir de cuentos que lee o escucha.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_454_2",
        "descripcion": "Desarrolla relatos escritos o crea narrativas corporales a partir del significado de su nombre y la historia familiar de cómo y por qué eligieron ese nombre.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_454_3",
        "descripcion": "Narra y representa teatral o dancísticamente historias o situaciones cotidianas de su comunidad que sean trágicas, cómicas, románticas, etcétera.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_455",
    "contenido": "Elaboración de un tríptico informativo sobre la prevención de algún problema colectivo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_455_1",
        "descripcion": "Recopila y analiza distintos trípticos informativos para conocer sus características y funciones.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_455_2",
        "descripcion": "Determina, por medio del diálogo con sus compañeras y compañeros, algún problema colectivo que pueda prevenirse, relacionado con la salud, la violencia, el bienestar.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_455_3",
        "descripcion": "Investiga en varias fuentes sobre el problema colectivo que quieren prevenir y, en común acuerdo con sus pares, integra la información más relevante en un texto breve que incluya nexos que ayuden a que las ideas se presenten de manera ordenada y coherente.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_455_4",
        "descripcion": "Organiza la información textual y gráfica en un tríptico en el que se defina el problema que quieren prevenir y las razones para hacerlo, así como las medidas de prevención y las personas, fuentes o instituciones a las cuales es posible recurrir para profundizar en el asunto o buscar ayuda.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_456",
    "contenido": "Elaboración e intercambio de reseñas de diversos textos y/o audiovisuales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_456_1",
        "descripcion": "Reconoce las características y función de las reseñas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_456_2",
        "descripcion": "Describe un texto leído y construye una opinión acerca del mismo, explicando su parecer.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_456_3",
        "descripcion": "Usa expresiones como creo que, en mi opinión, pienso que, de acuerdo con, desde mi punto de vista, considero que, para organizar y compartir su opinión.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_456_4",
        "descripcion": "Registra datos de identificación del texto: título, autor, editorial y lugar y fecha de publicación, número de páginas.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_456_5",
        "descripcion": "Revisa y corrige reiteraciones innecesarias en la escritura de la reseña: errores de concordancia y de ortografía en general.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_457",
    "contenido": "Exposición sobre temas relacionados con el cuidado de la salud.",
    "pdas": [
      {
        "pda_id": "PDA_SB_457_1",
        "descripcion": "Como presentador o presentadora -Recupera e integra información de diversas fuentes, gráficas, orales y/o escritas, para preparar su presentación. -Escribe palabras clave y/o notas breves para usarlas como guía y exponer de manera lógica y secuenciada, empleando un léxico formal. -Elabora cuadros sinópticos, esquemas, tablas de doble entrada u otros recursos gráficos, como material de apoyo para la exposición. -Conserva la atención de las espectadoras y los espectadores, resuelve dudas y hace comentarios acerca de lo que le plantean. Como audiencia -Mantiene la atención en lo que presenta la expositora o el expositor, toma notas sobre lo que le parece más relevante, le causa duda o quiere comentar, y pide y hace uso de la palabra para plantear preguntas, hacer comentarios o compartir su opinión.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_458",
    "contenido": "Expresión, mediante el uso de los lenguajes artísticos, de experiencias estéticas que tienen lugar en la naturaleza.",
    "pdas": [
      {
        "pda_id": "PDA_SB_458_1",
        "descripcion": "Comparte sensaciones, emociones, sentimientos e ideas, a partir del asombro generado por la interacción con la naturaleza y representa su experiencia en una producción artística.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_458_2",
        "descripcion": "Reconoce formas, colores, texturas, sonidos y movimientos algunos componentes de la naturaleza y los recrea por medio de los lenguajes artísticos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_459",
    "contenido": "Interpretación y producción de anuncios publicitarios de productos o servicios ofrecidos en la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_459_1",
        "descripcion": "Analiza anuncios publicitarios impresos y electrónicos, e identifica sus características y funciones.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_459_2",
        "descripcion": "Reflexiona sobre los recursos empleados para persuadir a los consumidores, como las imágenes que utilizan y, en particular, las características del lenguaje escrito; por ejemplo, uso de adjetivos, rimas, juegos de palabras, metáforas y comparaciones, así como la brevedad.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_459_3",
        "descripcion": "Identifica los productos y servicios ofrecidos en su comunidad que desea publicitar.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_459_4",
        "descripcion": "Elabora anuncios publicitarios en los que emplea distintas estrategias textuales para persuadir a su público objetivo, cuidando la distribución gráfica; por ejemplo, el tamaño y colocación de texto e imagen, así como la claridad.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_459_5",
        "descripcion": "Difunde con las personas de la comunidad los anuncios publicitarios elaborados.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_460",
    "contenido": "Interpretación y valoración de manifestaciones culturales y artísticas de México y del mundo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_460_1",
        "descripcion": "Explora manifestaciones culturales y artísticas de diversos orígenes, e identifica sus elementos, para recrearlos mediante textos y otras producciones artísticas, que amplíen sus concepciones de ser y estar en el mundo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_460_2",
        "descripcion": "Relaciona el uso de textos, imágenes, colores, objetos, sonidos, silencios, aromas y movimientos, presentes en manifestaciones culturales y artísticas, con los que infiere su significado, a partir de intereses, perspectivas y creencias propias.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_460_3",
        "descripcion": "Construye significados en lo individual y colectivo, a partir de la observación y comprensión de sonidos, gestos, formas, colores, texturas, objetos, aromas, movimientos, así como del contexto de creación de manifestaciones culturales y artísticas.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_461",
    "contenido": "Lectura y análisis de mitos y leyendas, para su disfrute y valoración.",
    "pdas": [
      {
        "pda_id": "PDA_SB_461_1",
        "descripcion": "Lee mitos y leyendas de México e identifica las características y funciones de cada tipo de texto.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_461_2",
        "descripcion": "Investiga sobre el origen de los mitos y leyendas leídos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_461_3",
        "descripcion": "Identifica elementos de realidad y fantasía tanto en mitos como en leyendas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_461_4",
        "descripcion": "Indaga, con las personas adultas mayores de su comunidad, para conocer los mitos y leyendas que forman parte de la cultura de su región.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_461_5",
        "descripcion": "Escenifica un mito o leyenda de su interés frente a público.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_461_6",
        "descripcion": "Reflexiona sobre la riqueza cultural que encierran los mitos y las leyendas.",
        "orden": 6
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_462",
    "contenido": "Narración de sucesos autobiográficos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_462_1",
        "descripcion": "Lee textos autobiográficos y reflexiona sobre las razones por las que suelen estar narrados en primera persona del singular.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_462_2",
        "descripcion": "Determina los sucesos autobiográficos que desea narrar y los organiza lógicamente, resaltando los aspectos más significativos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_462_3",
        "descripcion": "DEscribe la narración de los hechos autobiográficos, haciendo uso de comas, puntos y seguido, puntos y aparte y dos puntos, para dar claridad y orden a las ideas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_462_4",
        "descripcion": "Describe personas, lugares y hechos a través del uso de reiteraciones, frases adjetivas, símiles e imágenes, y mantiene la referencia a los mismos en toda la narración por medio de pronombres y sinónimos.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_462_5",
        "descripcion": "Hace y recibe sugerencias sobre aspectos de mejora, y comparte con la comunidad educativa las versiones finales.Hace y recibe sugerencias sobre aspectos de mejora, y comparte con la comunidad educativa las versiones finales.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_463",
    "contenido": "Participación en debates sobre temas de interés común.",
    "pdas": [
      {
        "pda_id": "PDA_SB_463_1",
        "descripcion": "Reconoce que hay temas donde las opiniones se dividen, y es necesario sustentar las propias.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_463_2",
        "descripcion": "Conoce la función y organización de un debate.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_463_3",
        "descripcion": "Investiga y toma notas de las ideas centrales y otros datos significativos con relación al tema del debate, con la intención de construir sus argumentos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_463_4",
        "descripcion": "Identifica la función de los nexos de subordinación en textos argumentativos.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_463_5",
        "descripcion": "Hace su presentación, opina sobre lo que dicen otros y otras participantes y reconoce que es posible cambiar de opinión, a partir de las opiniones argumentadas de las demás personas.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_464",
    "contenido": "Producción y envío de cartas personales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_464_1",
        "descripcion": "Lee distintas cartas personales reales y literarias.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_464_2",
        "descripcion": "Reflexiona sobre las características y funciones de las cartas personales enviadas por correo postal y electrónico.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_464_3",
        "descripcion": "Expresa sentimientos, ideas y experiencias por medio de cartas, pensando en destinatarias y destinatarios específicos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_464_4",
        "descripcion": "Reconoce palabras y expresiones que señalan tiempo y espacio en las cartas personales: allá, aquí, ahí, acá, hace tiempo.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_464_5",
        "descripcion": "Envía las cartas que escribe a través del correo postal y/o electrónico.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_465",
    "contenido": "Reconocimiento de la diversidad lingüística de México.",
    "pdas": [
      {
        "pda_id": "PDA_SB_465_1",
        "descripcion": "Investiga en fuentes impresas y/o electrónicas sobre la diversidad lingüística en México y sobre la influencia de las lenguas originarias en el español en México.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_465_2",
        "descripcion": "verigua por medio de entrevistas con personas adultas mayores y la consulta de diccionarios, algunas palabras usuales en el español mexicano que provienen de lenguas originarias.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_465_3",
        "descripcion": "Registra las palabras sobre las que averiguó, comprende su significado y, de ser posible, indaga en su historia. Comparte el resultado de su investigación.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_465_4",
        "descripcion": "Reflexiona sobre la diversidad lingüística en México y valora su riqueza.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_466",
    "contenido": "Seguimiento crítico de noticias en diferentes medios de comunicación escrita.",
    "pdas": [
      {
        "pda_id": "PDA_SB_466_1",
        "descripcion": "Expresa interés por una noticia particular y busca notas informativas relacionadas en distintos medios de comunicación escrita: periódicos, revistas, portales de internet.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_466_2",
        "descripcion": "Da seguimiento a las noticias de su interés en diferentes medios de comunicación escrita.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_466_3",
        "descripcion": "Analiza los elementos que componen las notas informativas sobre noticias de su interés en los diferentes medios de comunicación escrita: títulos, balazos, entradillas, tipografías, usos de espacios, puntuación, elementos gráficos, formas de referirse a las personas o lugares involucrados.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_466_4",
        "descripcion": "Compara las diferencias y similitudes en las distintas formas de presentar las noticias de su interés.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_466_5",
        "descripcion": "Comparte sus reflexiones sobre los hechos noticiosos de su interés y sobre la experiencia de darles seguimiento en diferentes medios de comunicación escrita.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_467",
    "contenido": "Alimentación saludable: características de la dieta correcta, costumbres de la comunidad, riesgos del consumo de alimentos ultraprocesados, y acciones para mejorar la alimentación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_467_1",
        "descripcion": "Explica las características de la dieta correcta: variada, completa, equilibrada, inocua, suficiente, y las contrasta con sus hábitos de alimentación para tomar decisiones en beneficio de su salud.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_467_2",
        "descripcion": "Indaga posibles riesgos de los hábitos de alimentación personales y familiares, como diabetes, hipertensión, colesterol elevado, entre otros; propone posibles cambios en su alimentación a partir de las alternativas que están disponibles en su localidad y en las prácticas de higiene relacionadas con la preparación y consumo de alimentos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_467_3",
        "descripcion": "Describe de dónde provienen y cómo se producen o procesan los alimentos que consume y los beneficios nutrimentales que estos tienen; diseña distintos menús basados en las características de la dieta correcta.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_467_4",
        "descripcion": "Comprende que su alimentación está relacionada con las costumbres de la familia y los productos de consumo disponibles en su comunidad, a partir de compararla con otras formas de alimentación en diferentes regiones del país y con otros países.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_467_5",
        "descripcion": "Analiza y explica la relación que tiene mantener una dieta correcta con el crecimiento y funcionamiento adecuado del organismo, así como para prevenir enfermedades no transmisibles como la diabetes o la hipertensión.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_468",
    "contenido": "Cambios permanentes en los materiales y sus implicaciones en la vida diaria.",
    "pdas": [
      {
        "pda_id": "PDA_SB_468_1",
        "descripcion": "Describe que, un cambio temporal, implica la transformación de la forma e incluso de las propiedades de los materiales, pero no de su composición, mientras que, en un cambio permanente, las propiedades y composición de los materiales se modifican, por lo que no vuelven a su estado original, ya que se transforman en otros diferentes.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_468_2",
        "descripcion": "Describe a la cocción y descomposición de los alimentos como cambios permanentes, a partir de experimentar con alimentos y la variación de la temperatura.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_468_3",
        "descripcion": "Indaga y describe los beneficios de la cocción de alimentos, en función de las variables de temperatura y tiempo; así como, los factores que aceleran o retardan la descomposición de los alimentos y las implicaciones para la salud.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_468_4",
        "descripcion": "Reconoce y valora las técnicas utilizadas por diferentes pueblos y culturas relacionados con la cocción y conservación de alimentos.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_469",
    "contenido": "Costos y beneficios del consumo de agua, energía eléctrica y combustibles en la satisfacción de necesidades personales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_469_1",
        "descripcion": "Indaga y analiza la cantidad de agua que se consume en diversas actividades en la casa, compara su consumo diario e identifica en qué actividades se utiliza una mayor o menor cantidad de agua.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_469_2",
        "descripcion": "Analiza problemas relacionados con el agua presentes en la casa, escuela y comunidad; reconoce la importancia de su consumo y practica acciones para aprovecharla de manera responsable.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_469_3",
        "descripcion": "Reconoce y calcula la cantidad de “agua virtual” que se utiliza en la producción de satisfactores (productos y servicios) y reflexiona acerca del consumo de aquellos productos que son necesarios y aquellos que no lo son, para tomar decisiones de consumo responsable y favorecer el cuidado del medio ambiente.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_470",
    "contenido": "Cuerpos geométricos y sus características.",
    "pdas": [
      {
        "pda_id": "PDA_SB_470_1",
        "descripcion": "Reconoce y describe semejanzas y diferencias entre un prisma y una pirámide; propone desarrollos planos para construir prismas rectos cuadrangulares o rectangulares.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_471",
    "contenido": "Efecto del magnetismo y de la fuerza de gravedad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_471_1",
        "descripcion": "Comprende que el magnetismo es una fuerza que actúa a distancia en los objetos, a partir de experimentar con imanes y el movimiento de objetos de diversos materiales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_471_2",
        "descripcion": "Describe las características de los imanes: polos (norte y sur) y sus efectos de atracción y repulsión; establece relaciones entre el tipo de materiales y el efecto de los imanes.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_471_3",
        "descripcion": "Reconoce que la interacción de fuerzas magnéticas es la base de tecnologías modernas, incluidos motores eléctricos y generadores; indaga los cambios que su introducción ha significado en actividades humanas como la comunicación (celulares y WiFi) y el transporte.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_472",
    "contenido": "Estructura y funcionamiento del cuerpo humano: sistemas circulatorio, respiratorio e inmunológico, y su relación con la salud ambiental, así como acciones para su cuidado.",
    "pdas": [
      {
        "pda_id": "PDA_SB_472_1",
        "descripcion": "Describe y representa mediante modelos, la relación de la nariz, tráquea y pulmones, como parte del sistema respiratorio, con el intercambio de gases.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_472_2",
        "descripcion": "Indaga y explica con modelos, la función general del corazón y los vasos sanguíneos (arterias y venas), que forman parte del sistema circulatorio y su relación con el intercambio de gases.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_472_3",
        "descripcion": "Comprende que la frecuencia cardiaca es el número de latidos del corazón en un minuto, que se puede medir en los puntos en los que se ubican arterias (muñecas, cuello, tobillos) a través del pulso cardíaco; establece relaciones entre la actividad física y la frecuencia cardiaca.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_472_4",
        "descripcion": "Indaga los factores del medio ambiente que inciden en la salud de los sistemas circulatorio y respiratorio; propone y practica acciones para prevenir infecciones y enfermedades y favorecer su cuidado.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_473",
    "contenido": "Estudio de los números.",
    "pdas": [
      {
        "pda_id": "PDA_SB_473_1",
        "descripcion": "Expresa oralmente la sucesión numérica hasta seis cifras, en español y hasta donde sea posible, en su lengua materna, de manera ascendente y descendente a partir de un número natural dado.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_473_2",
        "descripcion": "A través de situaciones vinculadas a diferentes contextos ordena, lee, escribe e identifica regularidades en números naturales de hasta nueve cifras.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_473_3",
        "descripcion": "Lee, escribe y ordena números decimales hasta diezmilésimos en notación decimal y letra, y los interpreta en diferentes contextos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_473_4",
        "descripcion": "Resuelve situaciones problemáticas que implican comparar y ordenar fracciones a partir de construir fracciones equivalentes al multiplicar o dividir al numerador y al denominador por un mismo número.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_473_5",
        "descripcion": "Reconoce, interpreta y utiliza las fracciones 1/2, 1/4, 3/4, 1/5 y 1/8 expresados en notación decimal y viceversa en diferentes contextos.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_474",
    "contenido": "Etapas del desarrollo humano: proceso de reproducción y prevención de infecciones de transmisión sexual (ITS) y embarazos en adolescentes, en el marco de la salud sexual y reproductiva.",
    "pdas": [
      {
        "pda_id": "PDA_SB_474_1",
        "descripcion": "Describe a la infancia, adolescencia, madurez y vejez como parte del desarrollo humano, así como las características, necesidades, responsabilidades, formas de pensar y cuidados generales en cada una de ellas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_474_2",
        "descripcion": "Comprende que el embarazo es resultado de una relación sexual, a partir de describir y representar con modelos el proceso general de la reproducción en los seres humanos: fecundación, embarazo y parto, que implica la toma de decisiones libres e informadas y su prevención y planificación es responsabilidad tanto de hombres como de mujeres, y que forma parte de sus derechos sexuales y reproductivos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_474_3",
        "descripcion": "Analiza diversas situaciones acordes a su contexto relacionadas con el ejercicio de la sexualidad para reconocerlo como un derecho de todas las personas, y de vivirla de manera libre, informada, segura como parte de la salud sexual.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_474_4",
        "descripcion": "Argumenta acerca de la importancia de los vínculos afectivos, la igualdad, el respeto, la responsabilidad, y la comunicación en las relaciones de pareja, con la finalidad de prevenir violencia en el noviazgo y embarazos en la adolescencia, considerando su proyecto de vida y el inicio de la actividad sexual.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_475",
    "contenido": "Factores que conforman la biodiversidad y el medio ambiente, la riqueza natural de México y su relevancia como parte del patrimonio biocultural de la humanidad, y la importancia de su conservación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_475_1",
        "descripcion": "Comprende que la biodiversidad es la cantidad y variedad de ecosistemas y de seres vivos (animales, plantas, hongos y bacterias); e identifica la cantidad total de especies identificadas hasta el momento por la ciencia a nivel mundial.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_475_2",
        "descripcion": "Indaga los factores que favorecen la presencia en México de una variedad de ecosistemas y seres vivos, que lo hacen megadiverso; valora la importancia natural y sociocultural de su conservación.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_475_3",
        "descripcion": "Describe los servicios ambientales de la biodiversidad: producción de oxígeno, regulación de climas, abastecimiento de agua, moderación en el impacto de fenómenos naturales, control de plagas, obtención de materias primas, espacios vitales para plantas y animales, espacios para actividades recreativas y culturales, entre otros.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_476",
    "contenido": "Figuras geométricas y sus características.",
    "pdas": [
      {
        "pda_id": "PDA_SB_476_1",
        "descripcion": "Con el apoyo de instrumentos geométricos, construye círculos a partir de distintos datos (longitud del diámetro o del radio, a partir de dos puntos); distingue la diferencia entre circunferencia y círculo e identifica el diámetro y el radio.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_477",
    "contenido": "Funciones vitales que caracterizan a plantas y animales como seres vivos, y su relación con el entorno natural, así como sus cambios a través del tiempo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_477_1",
        "descripcion": "Explica la reproducción en plantas por semillas, tallos, hojas, raíces y su interacción con otros seres vivos y el entorno natural; identifica y representa las estructuras de una flor que participan en la reproducción.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_477_2",
        "descripcion": "Describe interacciones que ocurren entre los factores físicos y biológicos que intervienen en el proceso de reproducción de las plantas: polinización, dispersión de semillas y frutos, o germinación.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_477_3",
        "descripcion": "Indaga el tipo de desarrollo y nacimiento de diversos animales (insectos, arácnidos, moluscos, aves, mamíferos, reptiles, peces y anfibios) para clasificarlos en vivíparos y ovíparos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_477_4",
        "descripcion": "Comprende que la reproducción es una función que caracteriza a todas las plantas y los animales como seres vivos.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_478",
    "contenido": "Medición de longitud, masa y capacidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_478_1",
        "descripcion": "Resuelve situaciones problemáticas vinculadas a diferentes contextos que requieren calcular longitudes, masas o capacidades utilizando unidades convencionales, además del kilómetro y la tonelada.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_479",
    "contenido": "Multiplicación y división, su relación como operaciones inversas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_479_1",
        "descripcion": "Resuelve situaciones problemáticas vinculadas a diferentes contextos que implican multiplicar números fraccionarios y números decimales, con un número natural como multiplicador.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_479_2",
        "descripcion": "Resuelve situaciones problemáticas vinculadas a diferentes contextos que implican dividir números naturales y el cociente resulte un número decimal.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_480",
    "contenido": "Nociones de probabilidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_480_1",
        "descripcion": "Identifica situaciones de distintos contextos en las que interviene o no el azar; registra resultados de experiencias aleatorias en tablas de frecuencias y expresa la frecuencia absoluta y la relativa.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_481",
    "contenido": "Organización e interpretación de datos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_481_1",
        "descripcion": "Construye tablas y gráficas de barras, e interpreta información cuantitativa y cualitativa contenida en ellas; interpreta la moda para responder preguntas vinculadas a diferentes contextos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_482",
    "contenido": "Perímetro, área y noción de volumen.",
    "pdas": [
      {
        "pda_id": "PDA_SB_482_1",
        "descripcion": "Distingue unidades lineales de cuadráticas, al calcular, con el apoyo de retículas cuadriculadas, el perímetro y área de diferentes polígonos para reconocer que existen: a) figuras diferentes con el mismo perímetro y diferente área; b) figuras diferentes con la misma área y diferente perímetro; c) figuras diferentes con el mismo perímetro y con la misma área.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_482_2",
        "descripcion": "Construye y usa fórmulas para calcular el perímetro de cualquier polígono, a partir de sumar la longitud de todos sus lados o multiplicar el número de lados por la medida de uno de ellos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_482_3",
        "descripcion": "Construye y usa fórmulas para calcular el área de rectángulos, romboides y triángulos; utiliza unidades convencionales (m2 y cm2) para expresar sus resultados.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_483",
    "contenido": "Propiedades de los materiales: dureza, flexibilidad y permeabilidad y su aplicación en la satisfacción de necesidades; caracterización de los gases con base en sus propiedades.",
    "pdas": [
      {
        "pda_id": "PDA_SB_483_1",
        "descripcion": "Experimenta con diversos materiales las propiedades de durezaresistencia que tiene al rayado y el corte en su superficie, flexibilidad -cambio de forma al doblarse sin romperse y permeabilidad paso de un líquido a través de él sin que se altere su composición.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_483_2",
        "descripcion": "Relaciona las propiedades de dureza, flexibilidad y permeabilidad de los materiales con su uso, para la satisfacción de algunas necesidades; toma decisiones sobre cuál es el más adecuado y de las consecuencias de su uso excesivo para el medio ambiente.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_483_3",
        "descripcion": "Diseña y construye objetos con base en las propiedades de dureza, flexibilidad y permeabilidad de algunos materiales (vidrio, papel, cartón, plástico, unicel o metales).",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_483_4",
        "descripcion": "Analiza la relevancia de los materiales como aporte de la ciencia y la tecnología en la satisfacción de necesidades, así como los efectos de su uso inadecuado o poco ético en el medio ambiente.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_484",
    "contenido": "Pérdida de biodiversidad, problemas medio ambientales en la comunidad, México y el mundo, acciones orientadas a fortalecer estilos de vida sustentables.",
    "pdas": [
      {
        "pda_id": "PDA_SB_484_1",
        "descripcion": "Analiza y explica el impacto de las actividades humanas en la biodiversidad, en particular sobre la variedad y cantidad de seres vivos que habitan en la comunidad, y en la salud.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_484_2",
        "descripcion": "Analiza situaciones relacionadas con la pérdida de biodiversidad a nivel local y nacional, reconoce las causas y las consecuencias para la salud y la dinámica de los ecosistemas; identifica y explica prácticas locales y estrategias estatales o nacionales para el cuidado de la biodiversidad.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_484_3",
        "descripcion": "Comprende la importancia que tiene la biodiversidad y el valor del cuidado de los seres vivos y las condiciones naturales que favorecen su existencia; propone y practica acciones, como el consumo responsable que favorecen su cuidado.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_485",
    "contenido": "Relaciones de proporcionalidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_485_1",
        "descripcion": "Resuelve situaciones problemáticas de proporcionalidad en las que determina valores faltantes de números naturales, a partir de diferentes estrategias (cálculo del valor unitario, de dobles, triples o mitades).",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_485_2",
        "descripcion": "Resuelve situaciones problemáticas vinculadas a diferentes contextos que implican comparar razones expresadas con dos números naturales.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_485_3",
        "descripcion": "Identifica que los porcentajes de 50%, 25%, 20%, 10% tienen relación con las fracciones 1/2, 1/4, 1/5, 1/10, a partir de resolver situaciones problemáticas que implican el cálculo de porcentajes.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_486",
    "contenido": "Sistema Solar y Universo: características de sus componentes, y aportaciones culturales, científicas y tecnológicas que han favorecido su conocimiento.",
    "pdas": [
      {
        "pda_id": "PDA_SB_486_1",
        "descripcion": "Indaga, describe y representa con modelos las características de forma, ubicación, color, tamaño, distancia al Sol, temperatura, masa, número de satélites naturales y anillos, entre otras, de los componentes del Sistema Solar: Sol, planetas, satélites y asteroides.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_486_2",
        "descripcion": "Identifica y explica las características del movimiento de rotación y de traslación de los planetas y otros componentes del Sistema Solar: velocidad, dirección y trayectoria.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_486_3",
        "descripcion": "Describe y valora diversas aportaciones culturales, científicas y tecnológicas, entre ellas, la invención del telescopio, para el conocimiento del Sistema Solar.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_487",
    "contenido": "Suma y resta, su relación como operaciones inversas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_487_1",
        "descripcion": "Propone y resuelve situaciones problemáticas que implican sumas y restas con números decimales utilizando el algoritmo convencional y fracciones con diferentes denominadores.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_487_2",
        "descripcion": "Utiliza, explica y comprueba sus estrategias para calcular mentalmente sumas y restas de dos números múltiplos de 100 y dos fracciones cuyos denominadores son múltiplos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_488",
    "contenido": "Transformaciones de la energía térmica y eléctrica, así como su aplicación tecnológica.",
    "pdas": [
      {
        "pda_id": "PDA_SB_488_1",
        "descripcion": "Comprende que el calor es una forma de energía, que fluye entre objetos con diferente temperatura al ponerlos en contacto, siempre del objeto de mayor al de menor temperatura.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_488_2",
        "descripcion": "Describe, experimenta y representa diferentes tipos de transferencia de energía térmica: conducción y convección; identifica su aplicación en las actividades humanas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_488_3",
        "descripcion": "Analiza los beneficios y riesgos generados en el medio ambiente y en la salud por la generación y consumo de energía térmica.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_489",
    "contenido": "Ubicación espacial.",
    "pdas": [
      {
        "pda_id": "PDA_SB_489_1",
        "descripcion": "Elabora e interpreta croquis para comunicar la ubicación de seres vivos, objetos, trayectos o lugares.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_490",
    "contenido": "Construcción de la cultura de paz: análisis de conflictos vecinales y/o territoriales del pasado y del presente entre personas, grupos, comunidades y pueblos para identificar sus causas, cómo se desarrollaron y cómo se resolvieron, destacando el diálogo, la negociación y la tolerancia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_490_1",
        "descripcion": "Indaga en fuentes orales, escritas o digitales acerca de conflictos vecinales entre personas y/o grupos de su comunidad, barrio, colonia o ciudad que han ocurrido en años recientes. Analiza críticamente las causas, desarrollo y resolución del conflicto.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_490_2",
        "descripcion": "Representa de forma gráfica o artística el proceso que ha seguido el conflicto.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_490_3",
        "descripcion": "Identifica la negociación, la mediación, el diálogo y la empatía, como formas pacíficas para resolver conflictos, y las aplica en algunos ejemplos de conflictos cotidianos de su escuela o comunidad.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_490_4",
        "descripcion": "Argumenta por qué es necesario resolver los conflictos, privilegiando el diálogo, la empatía, la negociación y la mediación para erradicar la violencia y promover la cultura de paz.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_491",
    "contenido": "Contribuciones al bienestar colectivo: servicios públicos e infraestructura para satisfacer las necesidades de salud, educación, esparcimiento, comunicación, seguridad y justicia de las personas que habitan la comunidad y el país, así como la rendición de cuentas y el uso transparente de los recursos como parte de una sociedad democrática.",
    "pdas": [
      {
        "pda_id": "PDA_SB_491_1",
        "descripcion": "Indaga acerca de las necesidades de salud, esparcimiento, comunicación, seguridad y justicia de las personas de su comunidad, e identifica la infraestructura y servicios públicos que se requieren para satisfacerlas y alcanzar el bienestar colectivo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_491_2",
        "descripcion": "Identifica de qué manera las personas contribuyen con sus aportaciones y trabajo al funcionamiento de los servicios públicos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_491_3",
        "descripcion": "Dialoga acerca del derecho al acceso a la información pública: en qué consiste, por qué es importante y cómo se puede ejercer.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_492",
    "contenido": "Cultura democrática: principios éticos que subyacen en los acuerdos, normas y leyes democráticas, importancia de su cumplimiento y evaluación de su aplicación justa, equitativa e igualitaria en la vida cotidiana.",
    "pdas": [
      {
        "pda_id": "PDA_SB_492_1",
        "descripcion": "Comprende que la cultura democrática se sustenta en acuerdos, normas y leyes que expresan los principios éticos de igualdad, respeto, responsabilidad, libertad, justicia, honestidad, legalidad, interculturalidad, inclusión, entre otros. Analiza críticamente algunos ejemplos de acuerdos, normas y leyes que expresan los principios democráticos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_492_2",
        "descripcion": "Argumenta en favor del cumplimiento de los principios éticos y analiza, de forma crítica, los beneficios que aportan en los ámbitos personal y colectivo, así como en la interrelación de la sociedad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_493",
    "contenido": "Cumplimiento de los derechos humanos: estudio de casos de actos de discriminación, racismo o violencias que suceden actualmente en México y el mundo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_493_1",
        "descripcion": "Analiza críticamente un caso de racismo, discriminación o violencias en México, identificando las causas y las consecuencias culturales, económicas, políticas y sociales que se derivan del análisis, y propone acciones solidarias que favorezcan el respeto y el cumplimiento de los derechos humanos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_494",
    "contenido": "Derechos humanos: a un ambiente sano y acceso al agua potable.",
    "pdas": [
      {
        "pda_id": "PDA_SB_494_1",
        "descripcion": "Dialoga acerca del derecho humano a un ambiente sano y adecuado para su desarrollo y bienestar.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_494_2",
        "descripcion": "Investiga la relación entre el derecho a un ambiente sano y las soluciones locales basadas en el trabajo colectivo, crítico y justo, para restaurar o reducir la destrucción de la biodiversidad y promover en la escuela, barrio, pueblo o ciudad, su respeto, con responsabilidad y colaboración para protegerla, y aprovecharla de manera sustentable, con equidad y justicia social.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_495",
    "contenido": "Desafíos para la construcción de sociedades inclusivas y equitativas: la violencia de género como un problema estructural, con un peso social, cultural e histórico, a fin de visibilizar sus causas y consecuencias, para erradicarlas, buscando la equidad como derecho.",
    "pdas": [
      {
        "pda_id": "PDA_SB_495_1",
        "descripcion": "Analiza críticamente las causas y consecuencias sociales, culturales e históricas de la violencia de género, asociadas a estereotipos o prejuicios sobre la feminidad y la masculinidad en sociedades y comunidades patriarcales, que pueden llevar a un trato desigual.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_495_2",
        "descripcion": "Dialoga sobre cómo transformar los estereotipos o prejuicios de género, para desarrollar masculinidades positivas, que contribuyan a la construcción de comunidades y sociedades inclusivas, equitativas y libres de violencias.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_496",
    "contenido": "El derecho a la protección de la integridad física y mental, ante cualquier forma de maltrato, abuso o explotación de tipo sexual o laboral, así como, la identificación de personas e instituciones que pueden apoyar para el ejercicio de ese derecho.",
    "pdas": [
      {
        "pda_id": "PDA_SB_496_1",
        "descripcion": "Reconoce el derecho de niñas, niños y adolescentes a la protección, al respeto de su integridad y de sus datos personales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_496_2",
        "descripcion": "Identifica la importancia de hacer valer sus derechos, así como a las personas, instituciones y leyes que promueven el respeto a los derechos de todas las personas para su bienestar.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_497",
    "contenido": "La democracia como forma de gobierno en México y su construcción a través de la historia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_497_1",
        "descripcion": "Indaga acerca de las transformaciones en las formas de gobierno de nuestro país, durante el siglo XIX, destacando las luchas entre federalistas y centralistas, mismas que sentaron las bases para la constitución de una República representativa, democrática, laica y federal; así como la participación política de las mujeres en México en el siglo XIX.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_497_2",
        "descripcion": "Argumenta por qué se requiere de la participación de todas las personas y pueblos que integran una sociedad, considerando el carácter pluricultural y lingüístico del país, para que la democracia sea una forma de vida, en los distintos ámbitos de convivencia.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_498",
    "contenido": "La lucha por el reconocimiento de los derechos humanos: la protección de la dignidad de todas las personas y grupos sociales para vivir con gozo y armonía, sin importar las diferencias.",
    "pdas": [
      {
        "pda_id": "PDA_SB_498_1",
        "descripcion": "Indaga en fuentes primarias y secundarias, orales, escritas, bibliográficas, hemerográficas, digitales, objetos, entre otras situaciones del pasado y del presente que den cuenta de demandas y luchas sociales de personas y grupos por el reconocimiento de sus derechos humanos como el derecho al voto de las mujeres, los derechos de los trabajadores, el reconocimiento de los grupos LGBTTTIQ+, pueblos originarios entre otros. Identifica las consecuencias de no respetar los derechos de las personas y se compromete a promover su respeto en sus distintos ámbitos de convivencia (familia, escuela y comunidad).",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_499",
    "contenido": "La responsabilidad compartida, el respeto y el consumo sustentable: acciones colectivas a favor de la protección, regeneración y preservación de la biodiversidad y el bienestar socioambiental.",
    "pdas": [
      {
        "pda_id": "PDA_SB_499_1",
        "descripcion": "Comprende el largo camino que recorren los productos para llegar a sus hogares, los medios que se utilizan para imponer patrones de consumo y la importancia de consumir lo local, eligiendo lo que compramos de manera responsable y consciente.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_500",
    "contenido": "Migración y derechos humanos: migración interna y externa, causas y consecuencias sociales, económicas, culturales, políticas y ambientales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_500_1",
        "descripcion": "Reconoce los procesos de migración que se realizan en el territorio nacional (interna) y de México hacia otros países (externa).",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_500_2",
        "descripcion": "Analiza noticias, documentales y testimonios de personas migrantes, que le permitan identificar algunos de los motivos (sociales, económicos, políticos, culturales y/o ambientales), que originaron su desplazamiento, así como las características del lugar del destino al que pretende llegar.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_500_3",
        "descripcion": "Ubica en mapas, las rutas que siguen los migrantes, desde su lugar de origen, hasta su destino.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_500_4",
        "descripcion": "Reflexiona acerca de los impactos de las migraciones en la identidad y pertenencia de las personas, así como, los prejuicios que generan aspectos como la discriminación.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_500_5",
        "descripcion": "Dialoga acerca de las dificultades que enfrentan las personas migrantes, para ejercer sus derechos humanos.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_500_6",
        "descripcion": "Identifica algunos tratados internacionales que protegen los derechos de todas las personas, sin distinción de su condición migratoria.",
        "orden": 6
      },
      {
        "pda_id": "PDA_SB_500_7",
        "descripcion": "Describe las acciones que se podrían implementar para la protección de los derechos de las personas migrantes.",
        "orden": 7
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_501",
    "contenido": "Movimientos sociales en el México de los siglos XIX y XX: la Independencia y la Revolución Mexicana.",
    "pdas": [
      {
        "pda_id": "PDA_SB_501_1",
        "descripcion": "Indaga en fuentes bibliográficas, hemerográficas, digitales y fotográficas, las causas del movimiento de independencia, la injusticia social, las confrontaciones ideológicas entre grupos de criollos y peninsulares.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_501_2",
        "descripcion": "Dialoga acerca de los ideales que impulsaron el movimiento independentista, tales como la libertad, la justicia, la abolición de la esclavitud, la igualdad de derechos y la defensa de la soberanía.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_501_3",
        "descripcion": "Analiza la participación de las y los protagonistas del movimiento de independencia, por ejemplo: Miguel Hidalgo y Costilla, Josefa Ortiz de Domínguez, José María Morelos y Pavón, Ignacio Allende, Leona Vicario, Vicente Guerrero y Agustín de Iturbide.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_501_4",
        "descripcion": "Analiza la participación de grupos no visibilizados: personas esclavizadas, pueblos originarios, afrodescendientes, migrantes, mujeres, niñas, niños, jóvenes y personas adultas mayores, entre otros.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_501_5",
        "descripcion": "Identifica acontecimientos, personas y lugares representativos desde el inicio hasta la consumación de la independencia de México, reconociendo los cambios en el territorio de lo que aún se denominaba la Nueva España.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_501_6",
        "descripcion": "Dialoga acerca de cómo la construcción de una identidad nacional, denominada mexicana, impactó en la constitución de las identidades culturales de los pueblos originarios y afrodescendientes que habitaban nuestro territorio.",
        "orden": 6
      },
      {
        "pda_id": "PDA_SB_501_7",
        "descripcion": "Representa en mapas, los lugares estratégicos y emblemáticos de las luchas por la independencia, así como, las rutas seguidas por los personajes que encabezaron este movimiento.",
        "orden": 7
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_502",
    "contenido": "México independiente: la vida cotidiana, las intervenciones extranjeras durante el siglo XIX, causas y consecuencias de conflictos territoriales, la defensa de la soberanía nacional y la conformación del estado laico. (Quinto grado)",
    "pdas": [
      {
        "pda_id": "PDA_SB_502_1",
        "descripcion": "Indaga en fuentes bibliográficas, hemerográficas, iconográficas, objetos y construcciones acerca de la vida cotidiana en el México independiente, qué estragos dejó la guerra en las familias, comunidades y pueblos, cómo vivían las personas, cómo eran los pueblos y ciudades donde vivían, cuáles eran los principales trabajos y oficios, cómo era la educación de niñas y niños, cómo se divertían las personas, entre otros aspectos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_502_2",
        "descripcion": "Indaga acerca de los inicios del México independiente, cuáles eran las condiciones sociales, económicas, políticas y culturales, por qué se designó a Iturbide como emperador, identificar el contexto internacional, qué países querían dominar a México y el impacto en el territorio nacional de las invasiones extranjeras.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_502_3",
        "descripcion": "Analiza causas y consecuencias de las invasiones al territorio mexicano por los Estados Unidos de América: la Guerra de Texas y la apropiación del territorio, así como las implicaciones del Tratado de Guadalupe-Hidalgo en la modificación de los límites territoriales de nuestro país.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_502_4",
        "descripcion": "Dialoga acerca del papel de las instituciones, como el de la Marina en la intervención de la defensa del puerto de Veracruz, y de los grupos sociales que lucharon por la defensa de la soberanía nacional ante las invasiones extranjeras.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_502_5",
        "descripcion": "Indaga sobre las causas y las implicaciones sociales de la intervención francesa, así como de la constitución del segundo imperio mexicano, con Maximiliano de Habsburgo.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_502_6",
        "descripcion": "Indaga sobre las causas y las implicaciones sociales en la restauración de la República.",
        "orden": 6
      },
      {
        "pda_id": "PDA_SB_502_7",
        "descripcion": "Reconoce el papel de Benito Juárez en la construcción y el establecimiento de las Leyes de Reforma (1859), mismas que sentaron las bases para la constitución de un estado laico en México.",
        "orden": 7
      },
      {
        "pda_id": "PDA_SB_502_8",
        "descripcion": "Conoce y dialoga acerca de las implicaciones de una educación laica, crítica y sin dogmas.",
        "orden": 8
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_503",
    "contenido": "Pueblos y culturas de América y el mundo: el respeto a las costumbres, tradiciones y formas de vivir de diferentes culturas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_503_1",
        "descripcion": "Explora la vida cotidiana de pueblos originarios, comunidades y grupos sociales de diferentes lugares del Continente Americano, del pasado y el presente.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_503_2",
        "descripcion": "Identifica cambios y permanencias de diversas identidades culturales y cosmovisiones, que expresan formas de relacionarse con los demás, con la naturaleza, con el cosmos y consigo mismo.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_503_3",
        "descripcion": "Localiza el Continente Americano y describe las características (clima, relieve, aguas continentales y oceánicas, poblaciones, diversidad sociocultural y lingüística).",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_503_4",
        "descripcion": "Reconoce los criterios a partir de los cuales el Continente Americano se subdivide en regiones geográficas de América del Norte, América Central, las Antillas y Sudamérica o América del Sur, así como sus rasgos culturales y algunos procesos históricos vividos en lo que se ha denominado América anglosajona y América Latina, identificando algunas causas de las desigualdades sociales, económicas y educativas entre ambas regiones.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_504",
    "contenido": "Riesgos de desastre y crisis humanitarias, asociados a fenómenos naturales y generados por acciones humanas: sus causas y consecuencias, para contribuir, de manera solidaria, a minimizar sus efectos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_504_1",
        "descripcion": "Comprende que los desastres no son naturales, sino eventos repentinos que ocasionan daños materiales, humanos y sociales, y que sus efectos pueden ser prevenidos o mitigados.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_504_2",
        "descripcion": "Identifica algunos componentes de un desastre, tales como los agentes perturbadores, que pueden ser de origen natural o humano; los agentes afectables, representados por la infraestructura y la comunidad; y los agentes reguladores, que son las instituciones encargadas de dar protección y ayuda a las personas afectadas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_504_3",
        "descripcion": "Identifica en mapas de la localidad y la entidad, zonas de seguridad, y describe las rutas para llegar a ellas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_504_4",
        "descripcion": "Comprende que los efectos de los desastres dependen de las decisiones que las personas tomen, tanto en sus vidas como para su entorno; por ejemplo, cómo y dónde se producen los alimentos y se construyen las viviendas, lo que puede constituir un riesgo, así como cuáles son los programas de gobierno destinados a la prevención, atención y reconstrucción en caso de desastre.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_504_5",
        "descripcion": "Reflexiona y dialoga acerca de las responsabilidades compartidas, para la reducción del riesgo de desastres, con relación a qué le corresponde a la ciudadanía, a las autoridades, al gobierno, a empresarias y empresarios, a las organizaciones de la sociedad civil, así como, la importancia de participar en acciones individuales y colectivas encaminadas a la prevención en su comunidad.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_504_6",
        "descripcion": "Promueve la empatía con personas que han vivido una situación de desastre, y organiza acciones de ayuda.",
        "orden": 6
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_505",
    "contenido": "Sustentabilidad de la biodiversidad y humanismo: rasgos de los estilos de vida y modelos de desarrollo dominantes y su impacto en la biodiversidad, implicaciones socioambientales de la preservación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_505_1",
        "descripcion": "Analiza críticamente estilos de vida y modelos de desarrollo dominantes en las sociedades del mundo y de México a través del tiempo, así como su impacto desfavorable en la biodiversidad y el ambiente de su comunidad y del país (plantas, animales, suelos, aire, cuerpos de agua, manglares, agricultura, salud humana, entre otros).",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_505_2",
        "descripcion": "Argumenta críticamente cómo es que, bajo el ideal de satisfacer las necesidades humanas, los patrones de producción y venta de consumibles se vinculan con la extracción de los bienes naturales, el consumo irracional de energíaArgumenta críticamente cómo es que, bajo el ideal de satisfacer las necesidades humanas, los patrones de producción y venta de consumibles se vinculan con la extracción de los bienes naturales, el consumo irracional de energía en su procesamiento y desecho, y los riesgos ambientales locales y globales.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_505_3",
        "descripcion": "Reflexiona acerca de los valores e implicaciones socioambientales de la mercantilización de la biodiversidad, e identifica otros valores y formas de relación con la naturaleza, cuya prioridad sea la de cuidar su estabilidad y construir un mundo más seguro y humanista.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_506",
    "contenido": "Valoración de la biodiversidad en el territorio donde se ubica la localidad, entidad, México y el mundo, valores y acciones sustentables.",
    "pdas": [
      {
        "pda_id": "PDA_SB_506_1",
        "descripcion": "Comprende la biodiversidad, su función como elemento vital en la Tierra y en el equilibrio de la biosfera, así como la importancia para la vida humana y de las demás especies.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_506_2",
        "descripcion": "Compara e interpreta representaciones cartográficas de la biodiversidad de México, su entidad y localidad, reconociendo su distribución y los elementos que la hacen posible (características y dinámica del suelo, tipo de clima, altitud, latitud y continentalidad, entre otros).",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_506_3",
        "descripcion": "Indaga cómo y por qué está desapareciendo la biodiversidad, incluyendo los cambios del clima global y sus riesgos para la vida.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_506_4",
        "descripcion": "Propone y realiza acciones que ayuden a proteger la biodiversidad, de acuerdo con sus posibilidades, desde una perspectiva crítica.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_507",
    "contenido": "Valoración de la megadiversidad mexicana: megadiversidad en México, diversidad cultural, relaciones ser humano-naturaleza y representaciones distintas de las diferentes culturas o grupos sociales, sobre la biodiversidad y su manejo, acorde a sus contextos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_507_1",
        "descripcion": "Comprende por qué México es un país biodiverso y biocultural, así como la biodiversidad local y su influencia en las tradiciones culturales de la comunidad (cultivos, alimentos, indumentaria, herbolaria, fiestas, ritos, entre otras).",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_507_2",
        "descripcion": "Reconoce que los grupos sociales generan conocimientos distintos sobre la biodiversidad y su manejo, acorde a sus contextos y que éstos influyen en la conformación de culturas diversas con formas propias de representar el mundo, la vida y sus relaciones con la naturaleza, entre sí y con los otros.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_508",
    "contenido": "Valores y prácticas de los pueblos originarios y afromexicanos: el respeto, la reciprocidad y el beneficio mutuo como valores fundamentales de la relación con la naturaleza y con otras personas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_508_1",
        "descripcion": "Dialoga acerca de las características de la convivencia, sustentada en la práctica del respeto, la reciprocidad y el beneficio mutuo, en la relación armónica con la naturaleza, y con otros seres humanos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_508_2",
        "descripcion": "Identifica experiencias de convivencia en algunos pueblos originarios, afromexicanos o grupos urbanos, a fin de valorar los beneficios de esta forma de interacción, para practicar el buen vivir.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "5° de Primaria",
    "contenido_id": "CONT_SB_509",
    "contenido": "Ética y biodiversidad: factores sociales que propician la convivencia armónica con el medio ambiente basada en el respeto, responsabilidad, justicia social y equidad con la naturaleza.",
    "pdas": [
      {
        "pda_id": "PDA_SB_509_1",
        "descripcion": "Dialoga acerca de los valores que necesitamos promover para conservar y proteger a la biodiversidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_509_2",
        "descripcion": "Elige y pone en práctica, de manera crítica, acciones de bienestar común para la regeneración y preservación de su biodiversidad en la vida cotidiana, promoviendo que autoridades, personas y familias de su comunidad, colaboren responsablemente para el logro de tal fin.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_509_3",
        "descripcion": "Dialoga y construye juicios éticos acerca de los derechos de los seres vivos, y establece compromisos para su trato respetuoso y digno, así como su protección y preservación.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_510",
    "contenido": "Acciones individuales que repercuten en la conservación y mejora de la salud.",
    "pdas": [
      {
        "pda_id": "PDA_SB_510_1",
        "descripcion": "Promueve alternativas de hábitos de higiene personal y limpieza de los espacios en la comunidad, para impulsar la toma de decisiones informadas que contribuyan a asumir prácticas saludables y sostenibles.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_510_2",
        "descripcion": "Comprende los riesgos del consumo de alimentos procesados y ultraprocesados en la salud y el medio ambiente, para favorecer la adopción de prácticas alimentarias saludables y sostenibles.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_510_3",
        "descripcion": "Diseña alternativas que contribuyen a afrontar cambios o situaciones de riesgo relacionadas con accidentes, adicciones y formas de violencia, para valorar su pertinencia y determinar su viabilidad.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_511",
    "contenido": "Alternativas ante conflictos y problemas de la vida en la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_511_1",
        "descripcion": "Reflexiona y comparte los problemas y conflictos que se presentan en su comunidad, para proponer alternativas de solución viables.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_511_2",
        "descripcion": "Valora propuestas de alternativas que plantea para valorar su viabilidad en su comunidad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_512",
    "contenido": "Capacidades, habilidades y destrezas motrices.",
    "pdas": [
      {
        "pda_id": "PDA_SB_512_1",
        "descripcion": "Aplica sus capacidades, habilidades y destrezas motrices al organizar y participar en situaciones de juego e iniciación deportiva, para favorecer su disponibilidad corporal.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_513",
    "contenido": "Construcción del proyecto de vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_513_1",
        "descripcion": "Valora sus logros y retos afrontados en la historia personal para definir aspiraciones y acciones a realizar ante nuevas etapas de la vida.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_513_2",
        "descripcion": "Valora logros y cambios en gustos, necesidades, intereses y habilidades actuales, para reestructurar metas que favorezcan el desarrollo personal y social.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_514",
    "contenido": "Educación Integral en Sexualidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_514_1",
        "descripcion": "Reflexiona acerca de la importancia de expresar su consentimiento o rechazo ante situaciones que le generan placeres y displaceres para valorar las implicaciones en su bienestar.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_515",
    "contenido": "Equidad de género.",
    "pdas": [
      {
        "pda_id": "PDA_SB_515_1",
        "descripcion": "Analiza situaciones de discriminación asociadas con la identidad o género en la escuela, la comunidad y otros ámbitos, para reconocer formas de violencia y participar en acciones de prevención.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_516",
    "contenido": "Estilos de vida activos y saludables.",
    "pdas": [
      {
        "pda_id": "PDA_SB_516_1",
        "descripcion": "Evalúa los factores que limitan la práctica constante de actividades físicas, para implementar opciones que permitan superarlos a lo largo de la vida.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_517",
    "contenido": "Formas de ser, pensar, actuar y relacionarse.",
    "pdas": [
      {
        "pda_id": "PDA_SB_517_1",
        "descripcion": "Valora sus experiencias acerca de las formas de ser, pensar, actuar y relacionarse en determinadas situaciones, para favorecer su comprensión, el ejercicio de la empatía y el logro de metas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_518",
    "contenido": "Interacción motriz.",
    "pdas": [
      {
        "pda_id": "PDA_SB_518_1",
        "descripcion": "Organiza e implementa situaciones de juego e iniciación deportiva, para favorecer la convivencia en la escuela y la comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_519",
    "contenido": "La comunidad, como espacio para el aprendizaje y el bienestar común.",
    "pdas": [
      {
        "pda_id": "PDA_SB_519_1",
        "descripcion": "Profundiza acerca de ideas, conocimientos y prácticas culturales, para proponer alternativas orientadas a promover, preservar y difundir para el bien común.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_519_2",
        "descripcion": "Diseña, bajo los principios de respeto, y tolerancia, estrategias de organización ante diferentes situaciones, para la prevención de conflictos, la satisfacción de necesidades comunes y el desarrollo sustentable de su comunidad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_520",
    "contenido": "La escuela como ventana hacia el futuro.",
    "pdas": [
      {
        "pda_id": "PDA_SB_520_1",
        "descripcion": "Indaga sobre experiencias de estudio y comunidades de práctica, para ampliar sus horizontes de formación.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_520_2",
        "descripcion": "Se informa acerca de la oferta educativa en su región, para identificar sus posibilidades de ingreso al nivel de educación media.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_521",
    "contenido": "Las familias como espacio para el desarrollo del sentido de pertenencia y autonomía, para una sana convivencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_521_1",
        "descripcion": "Diseña e interactúa en distintos escenarios de convivencia, para fortalecer su autonomía y su participación en la familia.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_521_2",
        "descripcion": "Promueve los valores familiares, para la resolución de conflictos y el desarrollo personal.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_522",
    "contenido": "Los afectos y su influencia en el bienestar.",
    "pdas": [
      {
        "pda_id": "PDA_SB_522_1",
        "descripcion": "Reflexiona sobre hábitos que afectan positiva o negativamente en el estado de ánimo para lograr el bienestar personal y social.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_522_2",
        "descripcion": "Crea estrategias que ayudan a la expresión adecuada de las emociones, y que favorecen la interacción y el bienestar personal y social.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_523",
    "contenido": "Pensamiento lúdico, estratégico y creativo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_523_1",
        "descripcion": "Emplea el pensamiento estratégico y divergente ante situaciones de juego o cotidianas, para valorar la actuación, individual y colectiva, y adaptarla de acuerdo con el contexto.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_524",
    "contenido": "Potencialidades cognitivas, expresivas, motrices, creativas y de relación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_524_1",
        "descripcion": "Diseña propuestas de actividades lúdicas y expresivas a partir de sus intereses, capacidades y habilidades, para fortalecer su imagen corporal.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_525",
    "contenido": "Sentido de comunidad y satisfacción de necesidades humanas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_525_1",
        "descripcion": "Diseña alternativas orientadas a promover, preservar y, en caso necesario, replantear ideas, conocimientos y prácticas culturales, para impulsar una mayor difusión y participación.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_525_2",
        "descripcion": "Diseña de manera consensuada, estrategias de organización ante diferentes situaciones que impliquen cambios que pueden generar resistencia, para la prevención de problemas y satisfacción de necesidades, así como el aprovechamiento responsable y sostenible de recursos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_526",
    "contenido": "Toma de decisiones y creatividad, ante problemas de la vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_526_1",
        "descripcion": "Describe los problemas de vida que ha enfrentado para reflexionar sobre su resolución con base en el juicio crítico.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_526_2",
        "descripcion": "Valora su capacidad creadora para la solución de problemas en la vida y en su comunidad con base en el juicio crítico.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_526_3",
        "descripcion": "Evalúa la asertividad para expresar sus emociones sin perjudicar a otra persona.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_526_4",
        "descripcion": "Dramatiza una propuesta de juicio crítico en la de toma de decisiones para discernir la solución de los problemas de la vida.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_527",
    "contenido": "Análisis de cuentos y poemas para su disfrute y comprensión.",
    "pdas": [
      {
        "pda_id": "PDA_SB_527_1",
        "descripcion": "Selecciona y lee cuentos y poemas del mundo a partir de sus intereses y gustos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_527_2",
        "descripcion": "Intercambia con sus pares los cuentos y poemas que más le gustaron, y discute sobre su signif icado.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_527_3",
        "descripcion": "Reconoce las características tanto de cuentos como de poemas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_527_4",
        "descripcion": "Elabora una antología con los cuentos y poemas seleccionados, así como con cuentos de producción propia, que incluya título, portada, portadilla, índice, ilustraciones, comentarios sobre la interpretación de cada texto y nombres de las y los participantes.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_527_5",
        "descripcion": "Comparte la antología con la comunidad educativa y deja un ejemplar en la biblioteca escolar.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_528",
    "contenido": "Análisis y representación de guiones teatrales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_528_1",
        "descripcion": "Formula comentarios críticos respecto de un guion teatral de su elección, para expresar sus gustos, intereses e ideas, así como para desarrollar la argumentación.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_528_2",
        "descripcion": "Realiza una representación teatral en colectivo, jugando con combinaciones de secuencias de sonidos y movimientos rápidos, lentos, agudos, graves, fuertes, débiles, pausas y con acentos variados.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_528_3",
        "descripcion": "Emplea diversos elementos de los lenguajes artísticos, para crear escenografía, vestuario y maquillaje en la escenificación de una obra de teatro infantil o una situación improvisada a la que se invite a familiares y otros miembros de la comunidad como espectadores y espectadoras.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_529",
    "contenido": "Apropiación e intervención artística en el espacio comunitario.",
    "pdas": [
      {
        "pda_id": "PDA_SB_529_1",
        "descripcion": "Reflexiona en colectivo acerca de las maneras en que un espacio puede ser mejorado, y lo lleva a cabo mediante la planeación de expresiones artísticas, tales como performance, videoarte, instalación, escultura, o teatro comunitario.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_529_2",
        "descripcion": "Representa en colectivo problemas de la comunidad para visibilizarlas mediante propuestas artísticas ante los demás.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_529_3",
        "descripcion": "Crea producciones artísticas con distintos lenguajes: oral, escrito, alternativo, musical, visual, teatral o dancístico, para transformar de manera efímera, o incluso permanentemente, un espacio público de la comunidad, a favor del bienestar social.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_530",
    "contenido": "Combinación de elementos visuales, sonoros y corporales, en composiciones artísticas colectivas, para expresar rasgos de sus identidades personal y colectiva.",
    "pdas": [
      {
        "pda_id": "PDA_SB_530_1",
        "descripcion": "Combina formas, colores, texturas, sonidos, movimientos y gestos para representar personajes, lugares y situaciones y los guarda en video o los presenta en vivo al montar una exposición en la que se invite a familiares y el resto de la comunidad escolar, para su apreciación y disfrute.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_530_2",
        "descripcion": "Recrea lugares y experiencias significativas, a partir de una composición visual colectiva que sonoriza con objetos a su alcance, mientras la narra en un audiovisual.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_530_3",
        "descripcion": "Combina secuencias de formas, colores, texturas, sonidos, movimovimientos, gestos y objetos, para explorar distintas maneras de expresar, en colectivo, una misma experiencia con distintos elementos.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_531",
    "contenido": "Combinación de la realidad y la ficción en elementos simbólicos de las manifestaciones culturales y artísticas, que dan identidad y sentido de pertenencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_531_1",
        "descripcion": "Explora diversos elementos simbólicos que se encuentran en el entorno, a través del uso del color y las formas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_531_2",
        "descripcion": "Infiere la intención del autor o autora al utilizar los siguientes elementos: movimiento, gesto, forma, sonido y/o color en una manifestación cultural y artística, y compara sus ideas con las de sus pares.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_531_3",
        "descripcion": "Reinterpreta una manifestación cultural o artística con un lenguaje artístico distinto al que se utilizó en su creación, para crear nuevas formas de simbolización.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_531_4",
        "descripcion": "Aprecia y recrea una danza ritual colectiva, con elementos simbólicos propios de cada participante.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_532",
    "contenido": "Comparación y producción de documentos que regulan la convivencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_532_1",
        "descripcion": "Reconoce la función e importancia de cumplir las pautas o normas establecidas en reglamentos para regular la convivencia.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_532_2",
        "descripcion": "Reflexiona y comprende la concisión de las reglas, el empleo de verbos (modo y tiempo) y el uso de numerales.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_532_3",
        "descripcion": "DEscribe las reglas para lograr una convivencia respetuosa, incluyente, equitativa e igualitaria en la escuela, tomando en consideración sus experiencias a lo largo de la primaria.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_532_4",
        "descripcion": "Utiliza oraciones breves y decide si debe emplear subtítulos, viñetas o incisos.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_532_5",
        "descripcion": "Revisa y corrige errores en cuanto al contenido, concordancia y ortografía en el texto, hasta que logra la versión final del reglamento escolar.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_533",
    "contenido": "Comprensión y producción de textos argumentativos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_533_1",
        "descripcion": "Lee textos sobre temas polémicos, e identifica los argumentos que sustentan cada postura.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_533_2",
        "descripcion": "Registra los principales argumentos y las conclusiones de las autoras y los autores de los textos leídos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_533_3",
        "descripcion": "Reflexiona sobre la relación entre los argumentos principales y las conclusiones",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_533_4",
        "descripcion": "DEscribe un texto, a partir de las ideas que registró, en el que expresa sus propias opiniones sobre los temas tratados, y en el que emplea nexos que anteceden los argumentos, como porque, ya que, si bien, en consecuencia.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_534",
    "contenido": "Comprensión y producción de textos discontinuos, para organizar y presentar información.",
    "pdas": [
      {
        "pda_id": "PDA_SB_534_1",
        "descripcion": "Reconoce, mediante el análisis, las características y funciones de los textos discontinuos, en particular de gráficas, cuadros sinópticos y mapas conceptuales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_534_2",
        "descripcion": "Reflexiona sobre las posibilidades de los textos discontinuos para organizar la información que expone a otras personas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_534_3",
        "descripcion": "Sintetiza información, sin perder el significado original, para organizarla y presentarla por medio de textos discontinuos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_534_4",
        "descripcion": "Produce textos discontinuos, considerando al destinatario y empleando elementos gráficos útiles para organizar y presentar información, como tipografía, viñetas, espacios de la página, interlineado, signos de puntuación, mayúsculas y minúsculas.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_535",
    "contenido": "Comprensión y producción de textos explicativos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_535_1",
        "descripcion": "Localiza y lee textos explicativos de temas variados.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_535_2",
        "descripcion": "Expresa con sus palabras las ideas que comprende de los textos que lee y elabora resúmenes que le permitan reconstruir las ideas principales y los elementos de los textos explicativos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_535_3",
        "descripcion": "Reconoce y emplea relaciones de causaconsecuencia.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_535_4",
        "descripcion": "Emplea palabras como primero, finalmente, luego, después, posteriormente, durante, para organizar las oraciones.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_535_5",
        "descripcion": "Utiliza palabras nuevas y/o técnicas en el texto explicativo que produce para compartir.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_536",
    "contenido": "Comprensión y producción de textos informativos, para ampliar sus conocimientos sobre temas de interés tanto colectivo como individual.",
    "pdas": [
      {
        "pda_id": "PDA_SB_536_1",
        "descripcion": "Lee textos informativos y reflexiona sobre su organización.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_536_2",
        "descripcion": "Identifica información específica sobre asuntos de su interés, y comprende el tema central.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_536_3",
        "descripcion": "Reconoce vínculos entre el contenido de textos informativos, respecto del contraste, la complementariedad y la causa-consecuencia del tema abordado.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_536_4",
        "descripcion": "DEscribe textos informativos en los que registra, de manera convencional, los datos de las fuentes consultadas: autor, título, editorial, fecha y lugar de publicación, páginas consultadas, etcétera.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_537",
    "contenido": "Comprensión y producción de textos para gestionar servicios públicos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_537_1",
        "descripcion": "Dialoga con sus pares sobre los servicios públicos que podrían gestionar para mejorar su entorno natural y social, define con sus compañeras y compañeros cuál gestionarán y averiguan a qué persona o institución deben dirigirse.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_537_2",
        "descripcion": "Reflexiona sobre las características de las cartas formales.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_537_3",
        "descripcion": "DEscribe con sus compañeras y compañeros una carta formal, en la que explican, por un lado, el servicio público que solicitan, y, por otro, las razones.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_537_4",
        "descripcion": "Emplea mayúsculas al inicio de los párrafos y de los nombres propios, así como punto y seguido, punto y aparte, dos puntos y coma para ordenar las oraciones y los párrafos.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_537_5",
        "descripcion": "Envía, con apoyo del profesor o profesora, la carta formal y le da seguimiento a la solicitud.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_538",
    "contenido": "Creación y representación de narrativas a partir de acontecimientos relevantes de la comunidad, empleando recursos literarios, visuales, corporales y sonoros.",
    "pdas": [
      {
        "pda_id": "PDA_SB_538_1",
        "descripcion": "Representa un acontecimiento de la comunidad, experimentando con movimientos suaves, fuertes, rápidos, lentos, fluidos o pausados en distintas trayectorias, desplazamientos y con acompañamiento musical.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_538_2",
        "descripcion": "Explora, en colectivo, movimientos, gestos, formas, colores, sonidos y silencios, y acuerda una estructura creativa para crear un acontecimiento improvisado (flashmoob) en su escuela o en la comunidad, donde se invite a todas las personas a participar en el momento en que se está llevando a cabo.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_539",
    "contenido": "Elaboración de un tríptico informativo sobre la prevención de algún problema colectivo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_539_1",
        "descripcion": "Indaga y reflexiona sobre las características y funciones de los trípticos informativos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_539_2",
        "descripcion": "Investiga en diferentes fuentes impresas y electrónicas, y por medio de entrevistas con personas de la comunidad, sobre algún problema colectivo que pueda prevenirse y sobre las maneras de lograrlo.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_539_3",
        "descripcion": "Comparte con sus compañeras y compañeros la información investigada y dialoga para que, entre todos y todas, reflexionen sobre la relevancia de la prevención y elijan el problema colectivo sobre el que harán un tríptico informativo.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_539_4",
        "descripcion": "Investiga con mayor profundidad sobre el problema colectivo que hayan elegido e integran la información en un texto breve que incluirán en un tríptico que contenga portada, imágenes, gráficas, tablas, cuadros, fuentes de consulta, datos de personas o instituciones de apoyo, etcétera.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_539_5",
        "descripcion": "Presenta y difunde el tríptico con la comunidad.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_540",
    "contenido": "Elaboración e intercambio de reseñas de diversos textos y/o audiovisuales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_540_1",
        "descripcion": "Explica la utilidad de las reseñas y comenta sus características.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_540_2",
        "descripcion": "Describe el material audiovisual consultado y registra los datos de identificación de este: título, tema, director, protagonistas, institución o empresa productora, fecha de realización, etcétera.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_540_3",
        "descripcion": "Elabora una opinión sustentada acerca de un material reseñado.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_540_4",
        "descripcion": "Usa conectores como porque, ya que, puesto que, por, debido a, etcétera, con los que apoya la argumentación de sus opiniones.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_540_5",
        "descripcion": "Revisa y corrige reiteraciones innecesarias, y errores de concordancia y ortografía en general.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_541",
    "contenido": "Exposición sobre temas relacionados con el cuidado de la salud.",
    "pdas": [
      {
        "pda_id": "PDA_SB_541_1",
        "descripcion": "Como presentador o presentadora -Elabora un guion para presentar de manera ordenada la información que investigó en diversas fuentes, gráficas, orales y/o escritas, y usó para construir su exposición. -Prepara diversos materiales de apoyo para enriquecer su presentación. -Usa un léxico formal y mantiene o recupera la atención de la audiencia haciendo inflexiones de voz, ademanes, gestos, preguntas. -Aclara las dudas que le plantean y, en general, atiende los comentarios u opiniones que le comparten acerca de lo expuesto. Como audiencia -Comprende lo que escucha, apunta lo que le interesa, pregunta y comenta sobre lo expuesto, y argumenta sus opiniones y divergencias.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_542",
    "contenido": "Expresión, mediante el uso de los lenguajes artísticos, de experiencias estéticas que tienen lugar en la naturaleza.",
    "pdas": [
      {
        "pda_id": "PDA_SB_542_1",
        "descripcion": "Utiliza formas, colores, texturas, sonidos y movimientos, para expresar las emociones que surgen de una experiencia significativa en el entorno natural y las representa en colectivo mediante un mural o performance.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_542_2",
        "descripcion": "Aprecia la disposición de formas, colores, texturas, sonidos y movimientos en el entorno natural y usa elementos de los lenguajes artísticos para representar una experiencia significativa de sus vínculos con la naturaleza.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_543",
    "contenido": "Interpretación y producción de anuncios publicitarios de productos o servicios ofrecidos en la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_543_1",
        "descripcion": "Recopila y analiza anuncios publicitarios elaborados con distintos fines; por ejemplo, comerciales, políticos y sociales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_543_2",
        "descripcion": "Reflexiona sobre las características y funciones de las frases publicitarias empleadas en anuncios publicados en medios impresos y electrónicos, y analiza el uso de estereotipos, frases sugestivas, juegos de palabras y demás recursos lingüísticos y gráficos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_543_3",
        "descripcion": "Adopta una postura crítica ante los mensajes publicitarios y discute sobre ella con sus compañeras y compañeros.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_543_4",
        "descripcion": "Elabora anuncios publicitarios sobre los productos y servicios ofrecidos en su comunidad, en los que considera la disposición gráfica y el uso de adjetivos, frases adjetivas, adverbios y figuras retóricas como analogías, metáforas, comparaciones, rimas, hipérboles y demás juegos de palabras.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_543_5",
        "descripcion": "Difunde con las personas de la comunidad los anuncios publicitarios elaborados, así como su postura crítica ante los mensajes publicitarios analizados.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_544",
    "contenido": "Interpretación y valoración de manifestaciones culturales y artísticas de México y del mundo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_544_1",
        "descripcion": "Reconoce ideales y temáticas sociales que se imprimieron en ciertas manifestaciones culturales y artísticas, en un tiempo y espacio determinados.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_544_2",
        "descripcion": "Analiza las partes y elementos que conforman una manifestación cultural o artística, y reconoce la multiplicidad de significados, puntos de vista y concepciones del mundo en ella.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_544_3",
        "descripcion": "Reconoce símbolos presentes en manifestaciones culturales y artísticas, a partir del análisis e interpretación de formas, colores, texturas, sonidos, objetos, aromas, movimientos y gestos, que contienen.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_545",
    "contenido": "Lectura y análisis de mitos y leyendas, para su disfrute y valoración.",
    "pdas": [
      {
        "pda_id": "PDA_SB_545_1",
        "descripcion": "Lee mitos y leyendas de México y del mundo, y reconoce las características y funciones de cada tipo de texto.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_545_2",
        "descripcion": "Analiza mitos y leyendas de México y del mundo, y discute sobre su significado.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_545_3",
        "descripcion": "Distingue las diferencias y similitudes entre los mitos y leyendas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_545_4",
        "descripcion": "Recupera mitos y leyendas con las personas de su comunidad y de libros, y las compila.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_545_5",
        "descripcion": "Elabora un compendio de mitos y leyendas para compartir, que incluye título, portada, portadilla, introducción e índice.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_545_6",
        "descripcion": "Representa un mito o leyenda de su interés mediante una escultura, cómic, performance, entre otros.",
        "orden": 6
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_546",
    "contenido": "Narración de sucesos autobiográficos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_546_1",
        "descripcion": "Lee textos autobiográficos e identifica las relaciones temporales de secuencia, simultaneidad y duración.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_546_2",
        "descripcion": "Analiza distintos sucesos de su vida para elegir los más significativos y organizarlos de manera coherente en una narración.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_546_3",
        "descripcion": "Determina al destinatario y la forma en que desea narrar sucesos autobiográficos significativos, para causar efectos particulares.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_546_4",
        "descripcion": "Usa reflexivamente adverbios, frases adverbiales y nexos temporales, para indicar secuencia, simultaneidad y duración en los sucesos narrados.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_546_5",
        "descripcion": "Colabora en la edición de un libro de textos autobiográficos, y sugiere formas de reproducirlo para que cada alumna y alumno tenga el suyo.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_547",
    "contenido": "Participación en debates sobre temas de interés común.",
    "pdas": [
      {
        "pda_id": "PDA_SB_547_1",
        "descripcion": "Prepara su participación en un debate y formula los argumentos por presentar, cuidando que la exposición del tema por discutir resulte coherente y suficiente, los argumentos claros, pertinentes y fundamentados, y se expliciten las referencias bibliográficas y citas textuales que dan soporte a la información que se comparte.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_547_2",
        "descripcion": "Identifica la función de los conectivos causales, temporales y lógicos en textos argumentativos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_547_3",
        "descripcion": "Escucha y opina de manera crítica durante su desempeño como participante, moderador, moderadora o público en un debate.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_548",
    "contenido": "Producción y envío de cartas personales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_548_1",
        "descripcion": "Lee distintas cartas personales reales y literarias y analiza sus características.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_548_2",
        "descripcion": "Discute sobre las similitudes y diferencias, así como sobre las ventajas y desventajas del correo postal y el electrónico.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_548_3",
        "descripcion": "Reconoce la estructura de la información de las direcciones postales y electrónicas de destinatarias, destinatarios y remitentes.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_548_4",
        "descripcion": "Expresa sentimientos, ideas y experiencias por medio de cartas, en función de las destinatarias y los destinatarios y empleando adverbios de tiempo y lugar: ayer, hoy, mañana, anoche, ahora, después, luego, nunca, jamás, aquí, allá, allí, arriba, abajo.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_548_5",
        "descripcion": "Envía las cartas que escribe a través del correo postal y/o electrónico.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_549",
    "contenido": "Reconocimiento de la diversidad lingüística de México.",
    "pdas": [
      {
        "pda_id": "PDA_SB_549_1",
        "descripcion": "Identifica qué lenguas se hablan en su familia, localidad y/o región.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_549_2",
        "descripcion": "Investiga sobre las lenguas que se hablan en su familia, localidad y/o región, por medio entrevistas y fuentes impresas y electrónicas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_549_3",
        "descripcion": "DEscribe un texto sobre los resultados de su investigación, empleando comillas para diferenciar las palabras de otras y otros de las suyas, e incluyendo las referencias de las fuentes consultadas. Comparte el resultado de su investigación.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_549_4",
        "descripcion": "Reflexiona sobre las diferentes formas de valorar las lenguas en diversos contextos y sobre las posibles razones por las que esto ocurre.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_550",
    "contenido": "Seguimiento crítico de noticias en diferentes medios de comunicación escrita.",
    "pdas": [
      {
        "pda_id": "PDA_SB_550_1",
        "descripcion": "Consulta distintos medios de comunicación escrita y selecciona noticias de su interés, justificando las razones de su elección.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_550_2",
        "descripcion": "Da seguimiento a las noticias de su interés en distintos medios de comunicación escrita e identifica las fuentes de las que proviene la información: testimonios, agencias de noticias, otros diarios y revistas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_550_3",
        "descripcion": "Identifica relaciones de contraste, complementariedad, causaconsecuencia y temporalidad entre las diferentes notas informativas sobre el mismo hecho noticioso.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_550_4",
        "descripcion": "Reflexiona sobre las diferentes formas de expresar y abordar el mismo hecho noticioso en diferentes medios de comunicación escrita: extensión, manera de presentarlo, opiniones de las autoras y los autores, tipo de información que se revela.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_550_5",
        "descripcion": "DEscribe y comparte sus conclusiones sobre el hecho noticioso y sus reflexiones sobre las razones por las que pueden presentarse de diferente manera en cada medio de comunicación escrita.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_551",
    "contenido": "Alimentación saludable: características de la dieta correcta, costumbres de la comunidad, riesgos del consumo de alimentos ultraprocesados, y acciones para mejorar la alimentación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_551_1",
        "descripcion": "Establece relaciones entre problemas asociados a la alimentación: sobrepeso, obesidad y desnutrición con factores de riesgo como consumo de alimentos y bebidas ultraprocesadas; analiza las causas y riesgos de trastornos de la alimentación como la anorexia y la bulimia.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_551_2",
        "descripcion": "Analiza etiquetas de diversos productos que consume regularmente para conocer los ingredientes que los componen, así como su contenido y aporte nutrimental, y tomar decisiones a favor de una alimentación saludable.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_551_3",
        "descripcion": "Propone platillos para el consumo familiar en los que incorpora alimentos regionales y de temporada que brinden una alimentación saludable a bajo costo.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_551_4",
        "descripcion": "Propone y practica acciones para prevenir enfermedades no transmisibles como sobrepeso, obesidad y desnutrición, vinculadas con factores protectores como actividad física diaria, alimentación baja en azúcares, sal y grasas, además de beber agua simple potable.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_552",
    "contenido": "Cambios permanentes en los materiales y sus implicaciones en la vida diaria.",
    "pdas": [
      {
        "pda_id": "PDA_SB_552_1",
        "descripcion": "Explica la combustión y la oxidación de diferentes materiales como cambios permanentes, los factores que intervienen en ellos e identifica sus implicaciones en la vida diaria.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_552_2",
        "descripcion": "Plantea y comprueba hipótesis relacionadas con la combustión, al experimentar con diversos materiales como madera o papel, y describir el cambio en sus propiedades, antes y después del proceso (trasformación de las propiedades originales).",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_552_3",
        "descripcion": "Identifica y describe la oxidación de materiales en su entorno, como la de los alimentos (manzanas, plátanos o aguacate), y de metales (hierro), así como, las sustancias o materiales que se utilizan para evitar la oxidación.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_552_4",
        "descripcion": "Indaga y describe las implicaciones medio ambientales, económicas y sociales de los procesos de combustión y oxidación, y acciones que pueden realizarse para disminuir su efecto.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_553",
    "contenido": "Costos y beneficios del consumo de agua, energía eléctrica y combustibles en la satisfacción de necesidades personales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_553_1",
        "descripcion": "Describe en qué actividades de la casa y la escuela, se utilizan recursos energéticos: energía eléctrica y diversos combustibles (madera, petróleo, carbón, gas), y analiza cómo impactan en el medio ambiente.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_553_2",
        "descripcion": "Indaga y calcula el consumo de energía eléctrica, de gas o carbón que se utiliza en cada actividad; reconoce y practica acciones concretas para disminuir su consumo en casa y escuela.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_553_3",
        "descripcion": "Analiza el costo ambiental que implica el uso de combustibles y energía eléctrica para tomar decisiones de consumo responsable en casa, escuela y comunidad, y disminuir el impacto en el medio ambiente.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_554",
    "contenido": "Cuerpos geométricos y sus características.",
    "pdas": [
      {
        "pda_id": "PDA_SB_554_1",
        "descripcion": "Explora y reconoce las características del cilindro y cono; anticipa y comprueba desarrollos planos que permiten construirlos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_555",
    "contenido": "Efecto del magnetismo y de la fuerza de gravedad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_555_1",
        "descripcion": "Describe el efecto de la fuerza gravitacional sobre los cuerpos, a partir de experimentar con la caída y reposo de objetos, explica y representa con modelos los cambios ocurridos en la caída de objetos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_555_2",
        "descripcion": "Comprende que la masa es la cantidad de materia de un cuerpo, a diferencia del peso, que es la fuerza con la que la Tierra atrae dicho cuerpo por acción de la gravedad, a partir de actividades prácticas o simuladores que ejemplifiquen la caída de diversos objetos con masas iguales y diferentes, e identifica que el tiempo de caída es independiente de la masa.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_556",
    "contenido": "Estructura y funcionamiento del cuerpo humano: sistemas circulatorio, respiratorio e inmunológico, y su relación con la salud ambiental, así como acciones para su cuidado.",
    "pdas": [
      {
        "pda_id": "PDA_SB_556_1",
        "descripcion": "Explica la participación del sistema inmunológico en la defensa y protección del cuerpo humano ante infecciones y enfermedades, algunas de las células y órganos que lo conforman, sin profundizar en características y funciones específicas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_556_2",
        "descripcion": "Describe los beneficios y practica acciones para fortalecer y cuidar el sistema inmunológico: vacunación, higiene, alimentación saludable, consumo de agua simple potable, descanso, actividades físicas y recreativas.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_556_3",
        "descripcion": "Argumenta la importancia de las vacunas como aportes científicos y tecnológicos para prevenir enfermedades transmisibles y de la Cartilla Nacional de Salud para dar seguimiento a su estado de salud, así como de prácticas culturales para prevenirlas.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_556_4",
        "descripcion": "Explica los factores que ponen en riesgo la salud y aquellos que la favorecen al analizar diversas situaciones y propone acciones para reducir la propagación de enfermedades transmisibles en los entornos familiar, escolar y comunitario.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_557",
    "contenido": "Estudio de los números.",
    "pdas": [
      {
        "pda_id": "PDA_SB_557_1",
        "descripcion": "Expresa oralmente la sucesión numérica hasta billones, en español y hasta donde sea posible, en su lengua materna, de manera ascendente y descendente a partir de un número natural dado.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_557_2",
        "descripcion": "Ordena, lee y escribe números naturales de más de nueve cifras e interpreta números decimales en diferentes contextos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_557_3",
        "descripcion": "Identifica semejanzas y diferencias entre el sistema de numeración decimal y otros sistemas como el maya y el romano.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_558",
    "contenido": "Etapas del desarrollo humano: proceso de reproducción y prevención de infecciones de transmisión sexual (ITS) y embarazos en adolescentes, en el marco de la salud sexual y reproductiva.",
    "pdas": [
      {
        "pda_id": "PDA_SB_558_1",
        "descripcion": "Analiza y argumenta las implicaciones y riesgos del embarazo a temprana edad o en adolescentes, y las consecuencias en los ámbitos de salud, personal, familiar, educativo, social y económico.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_558_2",
        "descripcion": "Toma decisiones responsables e informadas relacionadas con la salud sexual y reproductiva, a partir de comprender que el ejercicio de la sexualidad es una decisión propia, en la que permean los valores, formas de pensar de cada persona y la cultura, y forma parte de los derechos sexuales.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_558_3",
        "descripcion": "Compara y argumenta ventajas y desventajas de llevar a cabo conductas sexuales responsables para evitar embarazos e ITS, incluido el VIH: uso del condón, retraso de la actividad sexual o la abstención.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_558_4",
        "descripcion": "Analiza creencias e ideas falsas en torno a las ITS, con base en las vías de transmisión y prevención, el uso de métodos anticonceptivos (variedad, efectividad y accesibilidad) y las conductas de autocuidado.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_558_5",
        "descripcion": "Reconoce que el consumo de alcohol y otras sustancias adictivas, el rechazo al uso de métodos anticonceptivos, entre otros, son factores que propician conductas violentas vinculadas al ejercicio de la sexualidad: abuso sexual, hostigamiento, violación, violencia infantil y de género.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_559",
    "contenido": "Factores que conforman la biodiversidad y el medio ambiente, la riqueza natural de México y su relevancia como parte del patrimonio biocultural de la humanidad, y la importancia de su conservación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_559_1",
        "descripcion": "Comprende que el medio ambiente es el conjunto de componentes naturales (factores biológicos: seres vivos, y factores físicos: agua, aire, suelo, Sol, clima, entre otros) en interacción con los componentes sociales (aspectos culturales, económicos, científicos, tecnológicos y políticos).",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_559_2",
        "descripcion": "Analiza situaciones que se relacionan con problemas medio ambientales de la comunidad y el impacto que tienen en la salud ambiental.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_559_3",
        "descripcion": "Propone y practica acciones que favorecen el cuidado del medio ambiente; comprende el estrecho vínculo que tiene con el bienestar común, por lo que se requiere establecer una relación armónica con el medio ambiente.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_560",
    "contenido": "Figuras geométricas y sus características.",
    "pdas": [
      {
        "pda_id": "PDA_SB_560_1",
        "descripcion": "Identifica y comprueba en diferentes objetos y dibujos con forma circular, la relación que existe entre la circunferencia y el diámetro (valor aproximado de π).",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_560_2",
        "descripcion": "Utiliza instrumentos geométricos para trazar polígonos regulares.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_561",
    "contenido": "Funciones vitales que caracterizan a plantas y animales como seres vivos, y su relación con el entorno natural, así como sus cambios a través del tiempo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_561_1",
        "descripcion": "Indaga y explica cambios en los seres vivos y en el entorno natural a través del tiempo, a partir de reconocer causas y consecuencias de su extinción hace más de 10 000 años y en la actualidad, en México y el mundo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_561_2",
        "descripcion": "Comprende y explica la importancia de los fósiles como evidencia para la reconstrucción de la vida en el pasado, su relación con organismos y entornos actuales, y la evolución de los seres vivos; describe cómo se lleva a cabo el proceso de fosilización a partir de construir modelos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_561_3",
        "descripcion": "Propone y practica acciones para cuidar a los seres vivos actuales y prevenir su extinción.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_561_4",
        "descripcion": "Comprende que las funciones vitales de nutrición, reproducción y relación con el entorno natural caracterizan a los seres vivos, incluido el ser humano.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_562",
    "contenido": "Multiplicación y división, su relación como operaciones inversas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_562_1",
        "descripcion": "Resuelve situaciones problemáticas vinculadas a diferentes contextos que implican dividir números decimales entre naturales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_562_2",
        "descripcion": "Resuelve situaciones problemáticas vinculadas a diferentes contextos que implican dividir números fraccionarios entre números naturales.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_563",
    "contenido": "Nociones de probabilidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_563_1",
        "descripcion": "Clasifica eventos de diversos contextos utilizando términos como seguro, imposible, probable, muy probable o poco probable que sucedan.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_563_2",
        "descripcion": "A partir de distintas situaciones azarosas, determina los resultados posibles y los representa en tablas de doble entrada o en diagramas de árbol.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_564",
    "contenido": "Organización e interpretación de datos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_564_1",
        "descripcion": "Interpreta información cuantitativa y cualitativa contenida en tablas, gráficas de barras y circulares para responder preguntas vinculadas a diferentes contextos; construye gráficas de barras.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_564_2",
        "descripcion": "Genera y organiza datos, determina la moda, la media aritmética y el rango para responder preguntas vinculadas a diferentes contextos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_565",
    "contenido": "Perímetro, área y noción de volumen.",
    "pdas": [
      {
        "pda_id": "PDA_SB_565_1",
        "descripcion": "Resuelve situaciones que requieren ubicar puntos en el primer cuadrante del plano cartesiano.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_565_2",
        "descripcion": "Resuelve situaciones problemáticas que implican calcular el perímetro y área de figuras compuestas por triángulos y cuadriláteros; utiliza unidades convencionales (m, cm, m2 y cm2) para expresar sus resultados.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_566",
    "contenido": "Propiedades de los materiales: dureza, flexibilidad y permeabilidad y su aplicación en la satisfacción de necesidades; caracterización de los gases con base en sus propiedades.",
    "pdas": [
      {
        "pda_id": "PDA_SB_566_1",
        "descripcion": "Comprende que el aire es un gas, a partir de describir sus características: color, olor, sabor y si se puede comprimir, asir o introducir a un recipiente.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_566_2",
        "descripcion": "Describe propiedades de los gases al contrastarlos con sólidos y líquidos, con base en el volumen -espacio que ocupan, la compresibilidad propiedad de reducir su volumen y la fluidezpropiedad de ocupar todo el espacio del recipiente que los contiene-.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_566_3",
        "descripcion": "Comprende que los gases, al igual que los líquidos y los sólidos, tienen masa a partir de medirla con ayuda de una balanza.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_566_4",
        "descripcion": "Describe los cambios de volumen que presenta un gas a partir de experimentar con la variación de la temperatura; comprende que lo ocurrido es por la expansión del gas y no por el aumento de la cantidad de materia de este.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_567",
    "contenido": "Pérdida de biodiversidad, problemas medio ambientales en la comunidad, México y el mundo, acciones orientadas a fortalecer estilos de vida sustentables.",
    "pdas": [
      {
        "pda_id": "PDA_SB_567_1",
        "descripcion": "Analiza y explica algunos problemas medio ambientales de la comunidad, México y el mundo, sus causas y consecuencias en la salud ambiental.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_567_2",
        "descripcion": "Comprende que el efecto invernadero es un proceso natural que favorece la vida en el planeta; establece relaciones entre su alteración, la contaminación del aire y el cambio climático, así como las consecuencias en el medio ambiente y la salud.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_567_3",
        "descripcion": "Indaga y propone acciones orientadas a promover el consumo responsable en la escuela, familia y comunidad para favorecer estilos de vida sustentables y el bienestar común.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_567_4",
        "descripcion": "Indaga proyectos de mejora del medio ambiente desarrollados por diversos pueblos, culturas, grupos y organizaciones de la sociedad civil, dependencias estatales o nacionales; y, reconoce el papel que desempeñan en la prevención y mitigación de diferentes problemáticas medio ambientales.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_568",
    "contenido": "Relaciones de proporcionalidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_568_1",
        "descripcion": "A partir de situaciones problemáticas de proporcionalidad vinculadas a diferentes contextos, determina valores faltantes en las que en ocasiones se conoce el valor unitario y en otras no.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_568_2",
        "descripcion": "Resuelve situaciones problemáticas vinculadas a diferentes contextos que implican comparar razones expresadas con dos números naturales y con una fracción.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_568_3",
        "descripcion": "Utiliza, explica y comprueba sus estrategias para calcular mentalmente los porcentajes: 50%, 25%, 10% y 1%, de un número natural.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_568_4",
        "descripcion": "Resuelve situaciones problemáticas vinculadas a diferentes contextos que implican calcular el tanto por ciento de una cantidad o el porcentaje que representa una cantidad de otra.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_569",
    "contenido": "Sistema Solar y Universo: características de sus componentes, y aportaciones culturales, científicas y tecnológicas que han favorecido su conocimiento.",
    "pdas": [
      {
        "pda_id": "PDA_SB_569_1",
        "descripcion": "Describe características de forma, ubicación, tamaño, distancia, color y temperatura de algunos componentes del Universo: galaxias y estrellas.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_569_2",
        "descripcion": "Describe las características principales de la Vía Láctea, y la reconoce como la galaxia en la que se ubica el Sistema Solar.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_569_3",
        "descripcion": "Indaga, argumenta y valora la importancia de diversas aportaciones culturales, científicas y tecnológicas, entre ellas, los telescopios, satélites artificiales y sondas espaciales en la investigación y conocimiento del Universo.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_570",
    "contenido": "Suma y resta, su relación como operaciones inversas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_570_1",
        "descripcion": "A partir de situaciones problemáticas vinculadas a diferentes contextos, suma y resta números decimales y fracciones con diferentes denominadores.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_570_2",
        "descripcion": "Utiliza, explica y comprueba sus estrategias para calcular mentalmente sumas y restas de dos números decimales hasta centésimos.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_571",
    "contenido": "Transformaciones de la energía térmica y eléctrica, así como su aplicación tecnológica.",
    "pdas": [
      {
        "pda_id": "PDA_SB_571_1",
        "descripcion": "Comprende que la electricidad es una forma de energía que se caracteriza por el movimiento o acumulación de cargas eléctricas, y experimenta con las propiedades de conducción o aislamiento eléctrico, para identificar algunos materiales, como los metales que poseen conductividad eléctrica.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_571_2",
        "descripcion": "Describe que hay dos tipos de cargas eléctricas, “positiva (+)” y “negativa (-)”, a partir de las cuales se determinan las interacciones entre los objetos; cuando dos objetos cargados eléctricamente se atraen, significa que sus cargas eléctricas son diferentes (+ -), y si se repelen significa que sus cargas eléctricas son iguales (++; --).",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_571_3",
        "descripcion": "Reconoce las propiedades que tienen los materiales para conducir la corriente eléctrica (conductores) y aquellos que no la conducen (aislantes), y los aplica en un circuito eléctrico; experimenta y describe interacciones de atracción y repulsión eléctrica (electricidad estática) de objetos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_571_4",
        "descripcion": "Reflexiona acerca del uso de la energía eléctrica para satisfacer necesidades y el impacto negativo en el medio ambiente que produce su generación y consumo.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_572",
    "contenido": "Ubicación espacial.",
    "pdas": [
      {
        "pda_id": "PDA_SB_572_1",
        "descripcion": "Lee, interpreta y elabora planos para comunicar la ubicación de seres vivos y objetos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_572_2",
        "descripcion": "Resuelve situaciones que requieren ubicar puntos en el primer cuadrante del plano cartesiano.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_573",
    "contenido": "Construcción de la cultura de paz: análisis de conflictos vecinales y/o territoriales del pasado y del presente entre personas, grupos, comunidades y pueblos para identificar sus causas, cómo se desarrollaron y cómo se resolvieron, destacando el diálogo, la negociación y la tolerancia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_573_1",
        "descripcion": "Analiza críticamente algunos ejemplos de conflictos territoriales en México en el pasado o el presente vinculados con la disposición, obtención, despojo de recursos, diferencias económicas, políticas, culturales, indefinición de límites territoriales, para valorar las relaciones de justicia, respeto, colaboración, reciprocidad y convivencia armónica, que deben existir entre las personas y países para promover la cultura de paz.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_573_2",
        "descripcion": "Indaga en fuentes bibliográficas, hemerográficas o en narraciones orales, cómo se desarrolló el conflicto, así como los recursos que se usaron para abordarlo.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_573_3",
        "descripcion": "Realiza propuestas para promover la cultura de paz en distintos ámbitos de convivencia.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_574",
    "contenido": "Contribuciones al bienestar colectivo: servicios públicos e infraestructura para satisfacer las necesidades de salud, educación, esparcimiento, comunicación, seguridad y justicia de las personas que habitan la comunidad y el país, así como la rendición de cuentas y el uso transparente de los recursos como parte de una sociedad democrática.",
    "pdas": [
      {
        "pda_id": "PDA_SB_574_1",
        "descripcion": "Analiza los servicios públicos y la infraestructura que benefician a las personas de su comunidad y del país, e identifica cómo es posible contribuir en su mantenimiento y cuidado, con un manejo transparente de los recursos, desde los ámbitos de la sociedad, como el pago de impuestos, trabajo comunitario, tequio, entre otros.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_574_2",
        "descripcion": "Comprende qué es la rendición de cuentas y la transparencia en el manejo de los recursos públicos, por qué es importante que los ciudadanos la demanden a sus gobernantes y cómo pueden hacerlo.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_575",
    "contenido": "Cultura democrática: principios éticos que subyacen en los acuerdos, normas y leyes democráticas, importancia de su cumplimiento y evaluación de su aplicación justa, equitativa e igualitaria en la vida cotidiana.",
    "pdas": [
      {
        "pda_id": "PDA_SB_575_1",
        "descripcion": "Evalúa la aplicación justa, equitativa e igualitaria de acuerdos, normas y leyes en situaciones cotidianas del ámbito local o nacional, comprende que esto favorece la cultura democrática.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_575_2",
        "descripcion": "Argumenta en favor del cumplimiento de los principios de igualdad, respeto, inclusión, responsabilidad, libertad, justicia, legalidad, honestidad, interculturalidad, entre otros, y analiza, de forma crítica, los beneficios de llevarlos a cabo, en los ámbitos personal y colectivo, así como en la interrelación de la sociedad.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_576",
    "contenido": "Cumplimiento de los derechos humanos: estudio de casos de actos de discriminación, racismo o violencias que suceden actualmente en México y el mundo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_576_1",
        "descripcion": "Analiza críticamente un caso de racismo, discriminación o violencias en el continente americano o en otros países del mundo, e identifica las causas y las consecuencias culturales, económicas, políticas y sociales que derivan del caso analizado, y propone acciones solidarias que favorezcan el respeto y el cumplimiento de los derechos humanos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_577",
    "contenido": "Derechos humanos: a un ambiente sano y acceso al agua potable.",
    "pdas": [
      {
        "pda_id": "PDA_SB_577_1",
        "descripcion": "Indaga, comprende y dialoga sobre la importancia del agua y su balance con otros elementos del ecosistema global, para garantizar la supervivencia de la biodiversidad, incluido el ser humano.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_577_2",
        "descripcion": "Comprende que la Constitución Política de los Estados Unidos Mexicanos, las leyes nacionales y los tratados internacionales suscritos por México, garantizan los derechos a la salud, a un medio ambiente sano, y el acceso a agua potable.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_577_3",
        "descripcion": "Dialoga y argumenta acerca de cómo ejerce sus derechos humanos a la salud, al agua potable y a un ambiente sano y adecuado para su desarrollo y bienestar, y se compromete a respetar la biodiversidad, actuar con reciprocidad, cuidándola y contribuyendo en su regeneración y preservación.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_578",
    "contenido": "Desafíos para la construcción de sociedades inclusivas y equitativas: la violencia de género como un problema estructural, con un peso social, cultural e histórico, a fin de visibilizar sus causas y consecuencias, para erradicarlas, buscando la equidad como derecho.",
    "pdas": [
      {
        "pda_id": "PDA_SB_578_1",
        "descripcion": "Analiza críticamente las causas y consecuencias de la violencia de género en México y el mundo, como un problema estructural, social, cultural e histórico.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_578_2",
        "descripcion": "Identifica cómo se naturaliza la desigualdad de género, lo que contribuye a su reproducción.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_578_3",
        "descripcion": "Identifica algunas formas en las que está presente la desigualdad en las relaciones de pares, en la escuela y la comunidad; por ejemplo, en los juegos, en los deportes, en las TIC’S, entre otras, y propone cómo transformarlas en nuevas formas de relación, que favorezcan la equidad, respeten y aprecien la diversidad.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_579",
    "contenido": "El derecho a la protección de la integridad física y mental, ante cualquier forma de maltrato, abuso o explotación de tipo sexual o laboral, así como, la identificación de personas e instituciones que pueden apoyar para el ejercicio de ese derecho.",
    "pdas": [
      {
        "pda_id": "PDA_SB_579_1",
        "descripcion": "Ejerce el derecho a la protección de la dignidad, integridad y los datos personales contra cualquier forma de maltrato, abuso o explotación de tipo sexual o laboral, de manera presencial o a través de medios electrónicos, en los distintos ámbitos de convivencia (familia, escuela y comunidad).",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_579_2",
        "descripcion": "Identifica Instituciones que brindan protección a niñas, niños y adolescentes ante situaciones de maltrato, abuso o explotación de tipo sexual y laboral y propone acciones de defensa y protección a los derechos de todas las personas.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_580",
    "contenido": "La democracia como forma de gobierno en México y su construcción a través de la historia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_580_1",
        "descripcion": "Analiza críticamente las transformaciones en la forma de gobierno en México durante el siglo XX: el fin del porfiriato, la Revolución Mexicana y la promulgación de la Constitución de 1917, que reafirma el sistema federal, la separación y equilibrio de Poderes; las posteriores reformas legales que garantizan la participación política equitativa e igualitaria, tales como la reforma constitucional de 1953 que reconoce el derecho al voto de las mujeres.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_580_2",
        "descripcion": "Identifica cómo se retomaron las demandas históricas y los conflictos en la construcción de la República representativa, democrática, laica, federal, pluricultural y plurilingüe, que hoy nos rige como país.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_580_3",
        "descripcion": "Indaga y analiza críticamente algunas experiencias de organización de pueblos originarios, afromexicanos y migrantes, así como otros pueblos y colectivos que dan cuenta de la toma de decisiones conjuntas, para el ejercicio de la autoridad y la corresponsabilidad en la búsqueda del bienestar común.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_581",
    "contenido": "La lucha por el reconocimiento de los derechos humanos: la protección de la dignidad de todas las personas y grupos sociales para vivir con gozo y armonía, sin importar las diferencias.",
    "pdas": [
      {
        "pda_id": "PDA_SB_581_1",
        "descripcion": "Comprende que los logros de las luchas históricas por el reconocimiento a los derechos humanos se han plasmado en la constitución y los tratados internacionales.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_581_2",
        "descripcion": "Reconoce que los derechos humanos son universales, indivisibles, interdependie tes, progresivos, inalienables, irrenunciables.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_581_3",
        "descripcion": "Dialoga acerca de que las leyes y los tratados internacionales son instrumentos que podemos utilizar para la demanda y ejercicio de los derechos humanos.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_581_4",
        "descripcion": "Investiga sobre grupos y organizaciones, que en la actualidad luchan por el reconocimiento de sus derechos y por la justicia social.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_581_5",
        "descripcion": "Dialoga acerca de por qué los derechos a la memoria colectiva, la verdad y la justicia son importantes contra la impunidad y la no repetición de actos que violentan la dignidad y los derechos humanos.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_582",
    "contenido": "La responsabilidad compartida, el respeto y el consumo sustentable: acciones colectivas a favor de la protección, regeneración y preservación de la biodiversidad y el bienestar socioambiental.",
    "pdas": [
      {
        "pda_id": "PDA_SB_582_1",
        "descripcion": "Investiga acciones de consumo sustentable del agua y la biodiversidad, para contribuir a mitigar el impacto negativo de la sociedad en estos sistemas de la naturaleza.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_583",
    "contenido": "Migración y derechos humanos: migración interna y externa, causas y consecuencias sociales, económicas, culturales, políticas y ambientales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_583_1",
        "descripcion": "Reconoce los flujos migratorios en los que hay mayor cantidad de emigrantes en el mundo, identificando países de origen y de destino.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_583_2",
        "descripcion": "Explica causas y consecuencias sociales, culturales, económicas, políticas y ambientales de la migración, en casos específicos en el mundo, mediante el análisis de noticias, documentales y algunos testimonios de migrantes internacionales.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_583_3",
        "descripcion": "Ubica en mapas, las rutas que siguen los migrantes, desde su lugar de origen, hasta su destino.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_583_4",
        "descripcion": "Reflexiona acerca de los impactos de las migraciones en la identidad y pertenencia de las personas, así como, los prejuicios que generan aspectos como la discriminación.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_583_5",
        "descripcion": "Dialoga acerca de cómo cada país establece sus reglas para reconocer y otorgar la ciudada nía, así como las acciones que se podrían implementar para la protección de los derechos de las personas migrantes.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_583_6",
        "descripcion": "Dialoga y elabora juicios éticos acerca de los derechos de las personas migrantes.",
        "orden": 6
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_584",
    "contenido": "Movimientos sociales en el México de los siglos XIX y +A68:C70XX: la Independencia y la Revolución Mexicana.",
    "pdas": [
      {
        "pda_id": "PDA_SB_584_1",
        "descripcion": "Indaga en fuentes bibliográficas, hemerográficas y digitales, así como en fotografías y objetos, las principales características sociales, económicas, políticas y culturales del Porf iriato.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_584_2",
        "descripcion": "Indaga acerca de las causas que dieron origen al movimiento revolucionario de 1910, como las injusticias, entre las que se encuentran: el despojo de las tierras comunales de campesinos y pueblos originarios, la explotación laboral por las compañías extranjeras, casos como las huelgas de los trabajadores de Cananea, Sonora (1906) y de Río Blanco, Veracruz (1907), y la apropiación y control de diversas extensiones de tierras, bosques y aguas en pocas manos.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_584_3",
        "descripcion": "Indaga sobre procesos y luchas por la justicia, que ocurren actualmente en diversas partes del país.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_584_4",
        "descripcion": "Investiga sobre la participación de distintos grupos en la búsqueda por la justicia social, el reconocimiento y la garantía de los derechos sociales, además de cómo estos ideales se plasmaron en la Constitución Política de los Estados Unidos Mexicanos de 1917.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_584_5",
        "descripcion": "Investiga en fuentes bibliográficas, hemerográficas e iconográficas, sobre los debates del constituyente de 1917, para lograr el reconocimiento y la garantía de los derechos sociales.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_584_6",
        "descripcion": "Analiza los artículos 3o., 27 y 123 de la Constitución Política de los Estados Unidos Mexicanos referentes a la educación, la propiedad de las tierras y el trabajo, indaga los debates que se dieron en el constituyente para su reconocimiento y garantía.",
        "orden": 6
      },
      {
        "pda_id": "PDA_SB_584_7",
        "descripcion": "Investiga el impacto que tuvo en la entidad el movimiento revolucionario.",
        "orden": 7
      },
      {
        "pda_id": "PDA_SB_584_8",
        "descripcion": "Analiza la participación en el movimiento revolucionario de personajes como Francisco I. Madero, Emiliano Zapata, Francisco Villa, Venustiano Carranza, entre otros, destacando sus ideales, así como su origen social y cultural.",
        "orden": 8
      },
      {
        "pda_id": "PDA_SB_584_9",
        "descripcion": "Reconoce la participación de las mujeres en la lucha revolucionaria, tales como María de la Luz Espinoza Barrera, Carmen Vélez “La Generala”, María Quinteras de Meras, Petra Herrera, las “adelitas”, entre otras.",
        "orden": 9
      },
      {
        "pda_id": "PDA_SB_584_10",
        "descripcion": "Destaca y compara la participación actual de mujeres mexicanas entre las que se identifican indígenas y afromexicanas, en diversos ámbitos de la vida política, social y cultural del país.",
        "orden": 10
      },
      {
        "pda_id": "PDA_SB_584_11",
        "descripcion": "Representa en mapas, los lugares estratégicos y emblemáticos de la lucha por la Revolución Mexicana, y las rutas seguidas por los personajes que encabezaron este movimiento.",
        "orden": 11
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_585",
    "contenido": "México posrevolucionario (1917-1940): la vida cotidiana, los procesos que implicaron la reconf iguración del país en los ámbitos social, económico, político, religioso y cultural, así como el impacto en el ambiente.",
    "pdas": [
      {
        "pda_id": "PDA_SB_585_1",
        "descripcion": "Indaga en fuentes bibliográficas, hemerográficas, iconográficas, objetos y construcciones acerca de la vida cotidiana en el México posrevolucionario, qué estragos dejó la guerra en las familias, comunidades y pueblos, cómo se modificó la vida cotidiana después de la lucha armada del movimiento de revolución, cómo cambiaron los pueblos y ciudades donde vivían, cuáles eran los principales trabajos y oficios, cómo era la educación de niñas y niños y qué es la escuela rural mexicana, cómo se divertían las personas, cuáles eran las expresiones culturales y artísticas, entre otros aspectos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_585_2",
        "descripcion": "Indaga acerca de cómo se vivió el movimiento revolucionario en diferentes regiones del país.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_585_3",
        "descripcion": "Indaga en fuentes bibliográficas, hemerográficas y digitales, así como en fotografías y objetos, las características sociales, económicas, políticas, religiosas y culturales en el México posrevolucionario (1917-1940).",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_585_4",
        "descripcion": "Analiza el proceso que implicó la reconfiguración del país, tras la lucha revolucionaria, para la cimentación de un régimen político democrático, acorde con lo plasmado en la Constitución de 1917.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_585_5",
        "descripcion": "Identifica las tensiones y conflictos entre caudillos revolucionarios y grupos políticos con diferentes intereses e ideologías, del periodo posrevolucionario.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_585_6",
        "descripcion": "Analiza el proceso denominado Maximato (1928-1934), en la búsqueda de la estabilidad política que requería la República.",
        "orden": 6
      },
      {
        "pda_id": "PDA_SB_585_7",
        "descripcion": "Indaga las causas, desarrollo y consecuencias de la rebelión cristera, e identifica cómo se dio la negociación del conflicto que reafirmó la libertad de creencias y el estado laico.",
        "orden": 7
      },
      {
        "pda_id": "PDA_SB_585_8",
        "descripcion": "Representa en mapas, los lugares y zonas de confrontación de la lucha cristera.",
        "orden": 8
      },
      {
        "pda_id": "PDA_SB_585_9",
        "descripcion": "Identifica algunas acciones que se impulsaron durante el Cardenismo, como la expropiación petrolera y el reparto agrario a campesinos y comunidades indígenas.",
        "orden": 9
      },
      {
        "pda_id": "PDA_SB_585_10",
        "descripcion": "Dialoga acerca de cómo los procesos históricos han cambiado la vida de las personas y sus comunidades.",
        "orden": 10
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_586",
    "contenido": "Pueblos y culturas de América y el mundo: el respeto a las costumbres, tradiciones y formas de vivir de diferentes culturas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_586_1",
        "descripcion": "Indaga algunos momentos en los que las culturas del mundo han interactuado, producto de las migraciones, de la búsqueda e intercambio de productos y materiales, de las relaciones comerciales, así como de la exploración y la expansión territorial.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_586_2",
        "descripcion": "Reconoce que las culturas actuales en diferentes partes del mundo se han formado a través del tiempo y tienen distintos orígenes.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_586_3",
        "descripcion": "Valora semejanzas y diferencias como parte de la diversidad humana y su riqueza cultural.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_586_4",
        "descripcion": "Localiza y describe las características (zonas climáticas, relieve y aguas continentales) de algunos pueblos y culturas de los continentes: África, América, Antártida, Asia, Europa y Oceanía, así como sus relaciones y formas de vida.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_586_5",
        "descripcion": "Reconoce algunos efectos globales en la vida cotidiana de pueblos, comunidades y países que se encuentran distantes del lugar donde se originan las situaciones de afectación socioambiental, y sus derivaciones económicas, políticas, sociales, culturales, ecológicas, entre otras.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_586_6",
        "descripcion": "Identifica puntos y líneas imaginarias del planeta Tierra, y localiza lugares en México y el mundo, utilizando las coordenadas geográficas.",
        "orden": 6
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_587",
    "contenido": "Riesgos de desastre y crisis humanitarias, asociados a fenómenos naturales y generados por acciones humanas: sus causas y consecuencias, para contribuir, de manera solidaria, a minimizar sus efectos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_587_1",
        "descripcion": "Investiga en noticias, lecturas o narraciones, desastres ocurridos en México y otros países del mundo.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_587_2",
        "descripcion": "ndaga sobre riesgos de desastre en el territorio nacional, asociados a fenómenos naturales, los representa de manera cartográfica y localiza las zonas de seguridad.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_587_3",
        "descripcion": "nvestiga, en distintas fuentes, acerca de las crisis humanitarias actuales, causadas por desastres de tipo natural o antrópico, y que generan desplazamiento de grandes grupos de personas, considerando las razones por las que tuvieron que desplazarse de esa región, ¿a qué lugar llegaron a refugiarse?, ¿cuáles son las situaciones de peligro que enfrentan en su camino?, ¿por qué se les considera refugiados?; y a ¿quién le corresponde proporcionarles ayuda?",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_587_4",
        "descripcion": "Dialoga acerca de cómo se sienten las personas al ser obligadas a abandonar su lugar de origen, dejando atrás su patrimonio y su forma de vida, ¿qué pasa con las familias?, ¿cómo viven niñas, niños y adolescentes?, y ¿cómo afecta esta situación a las mujeres y personas con discapacidad?",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_587_5",
        "descripcion": "Identifica los mecanismos de prevención que se utilizan en México y otros países, tales como la alerta sísmica, la alerta temprana para ciclones, la alerta temprana para tsunamis, el monitoreo de volcanes, entre otros, que permiten mitigar el impacto económico y social derivado de dichas eventualidades.",
        "orden": 5
      },
      {
        "pda_id": "PDA_SB_587_6",
        "descripcion": "Indaga acerca de los organismos internacionales que proporcionan ayuda humanitaria, así como cuáles son sus funciones y qué tipo de ayuda proporciona.",
        "orden": 6
      },
      {
        "pda_id": "PDA_SB_587_7",
        "descripcion": "Comprende que las crisis humanitarias precisan de la colaboración de otros países, aportando ayuda humanitaria.",
        "orden": 7
      },
      {
        "pda_id": "PDA_SB_587_8",
        "descripcion": "Propone acciones que pueden llevar a cabo las personas o comunidades, para minimizar los efectos de las crisis humanitarias en su entidad, país o en otra parte del mundo.",
        "orden": 8
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_588",
    "contenido": "Sustentabilidad de la biodiversidad y humanismo: rasgos de los estilos de vida y modelos de desarrollo dominantes y su impacto en la biodiversidad, implicaciones socioambientales de la preservación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_588_1",
        "descripcion": "Valora las causas y los factores sociales que impactan en la problemática ambiental, en la salud de los ecosistemas, en los seres humanos y demás seres vivos, entre otros riesgos que amenazan la continuidad de la vida en la Tierra.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_588_2",
        "descripcion": "Analiza críticamente las implicaciones socioambientales de la mercantilización de la biodiversidad, y propone alternativas sustentables para favorecer la estabilidad y seguridad de la convivencia humana con la naturaleza.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_588_3",
        "descripcion": "Propone y realiza acciones de consumo sustentable en su casa, escuela y comunidad para proteger y contribuir a regenerar y preservar la biodiversidad.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_588_4",
        "descripcion": "Dialoga acerca de qué manera, los posibles efectos del cambio climático pueden afectar a la biodiversidad y a las personas de acuerdo con el género y la edad o si viven en zona urbana o rural.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_589",
    "contenido": "Valoración de la biodiversidad en el territorio donde se ubica la localidad, entidad, México y el mundo, valores y acciones sustentables.",
    "pdas": [
      {
        "pda_id": "PDA_SB_589_1",
        "descripcion": "Comprende la biodiversidad en la Tierra, su sistema de relaciones e interdependencia global.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_589_2",
        "descripcion": "Interpreta representaciones cartográficas de la riqueza en biodiversidad de continentes (África, América, Antártida, Asia, Europa, Oceanía), aguas oceánicas y continentales.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_589_3",
        "descripcion": "Explica los procesos ecosistémicos de la biodiversidad, en relación con la circulación de energía, mediante las interacciones entre los seres humanos, otros seres vivos, el agua, el aire y el suelo, así como sus beneficios ambientales.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_589_4",
        "descripcion": "Comprende relaciones sociales económicas, culturales y políticas en diversas interacciones mediadas por intereses (formas de producción, abastecimiento, distribución, estilos de consumo en el mundo, percepciones del entorno, tradiciones alimenticias, culturales, identidad cultural, sentido de pertenencia, inspiración estética o espiritual), así como formas de concebir la naturaleza, que favorecen relaciones armónicas o desfavorecen su integridad y su función para la vida incidiendo en el desbalance de la biósfera como lo evidencia el cambio climático.",
        "orden": 4
      },
      {
        "pda_id": "PDA_SB_589_5",
        "descripcion": "Analiza críticamente formas de cuidar, respetar y proteger la biodiversidad sustentablemente.",
        "orden": 5
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_590",
    "contenido": "Valoración de la megadiversidad mexicana: megadiversidad en México, diversidad cultural, relaciones ser humano-naturaleza y representaciones distintas de las diferentes culturas o grupos sociales, sobre la biodiversidad y su manejo, acorde a sus contextos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_590_1",
        "descripcion": "Investiga sobre las características geográficas y las regiones biogeográficas que hacen de México un país megadiverso y biocultural, relacionándolas con las zonas climáticas, los espacios económicos, la distribución de la población en México y los países con mayor biodiversidad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_590_2",
        "descripcion": "Analiza y argumenta cómo la biodiversidad local influye en las tradiciones culturales de la comunidad (cultivos, alimentos, indumentaria, herbolaria, fiestas, ritos, entre otras).",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_590_3",
        "descripcion": "Argumenta por qué la megadiversidad de México es parte de su patrimonio biocultural, para comprender su estrecha vinculación con el desarrollo social, la salud y el bienestar de la población, y ejemplifica elementos del patrimonio biocultural de México reconocidos a nivel mundial.",
        "orden": 3
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_591",
    "contenido": "Valores y prácticas de los pueblos originarios y afromexicanos: el respeto, la reciprocidad y el beneficio mutuo como valores fundamentales de la relación con la naturaleza y con otras personas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_591_1",
        "descripcion": "Indaga acerca de experiencias de convivencia en algunos pueblos originarios, afromexicanos o grupos urbanos de México y del Continente Americano, que se sustentan en respeto, la reciprocidad y el beneficio mutuo, en la relación armónica con la naturaleza, y con otros seres humanos.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_591_2",
        "descripcion": "Reconoce que su convivencia se sustenta en el trabajo colectivo, la reciprocidad, el aprovechamiento sustentable de la naturaleza en el territorio, la búsqueda del beneficio mutuo, y valora los beneficios que ello implica, para practicar el buen vivir.",
        "orden": 2
      }
    ]
  },
  {
    "fase": "Fase 5",
    "nivel": "Primaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "General",
    "grado": "6° de Primaria",
    "contenido_id": "CONT_SB_592",
    "contenido": "Ética y biodiversidad: factores sociales que propician la convivencia armónica con el medio ambiente basada en el respeto, responsabilidad, justicia social y equidad con la naturaleza.",
    "pdas": [
      {
        "pda_id": "PDA_SB_592_1",
        "descripcion": "Valorar la importancia del respeto y la colaboración en el cuidado y aprovechamiento sustentable de la biodiversidad, considerándola como parte imprescindible para la vida humana, y cuya protección debe promover la justicia social, desde la equidad y la solidaridad.",
        "orden": 1
      },
      {
        "pda_id": "PDA_SB_592_2",
        "descripcion": "Indaga y evalúa situaciones que impactan la biodiversidad de México, considerando los valores, las interacciones y acciones personales, familiares, comuni tarias y de otras sociedades.",
        "orden": 2
      },
      {
        "pda_id": "PDA_SB_592_3",
        "descripcion": "Propone y pone en práctica, de manera crítica, con juicio ético y de acuerdo con sus posibilidades, acciones de bienestar común para la regeneración y preservación de la biodiversidad en la vida cotidiana; reflexionando acerca de los derechos de la naturaleza.",
        "orden": 3
      },
      {
        "pda_id": "PDA_SB_592_4",
        "descripcion": "Argumenta sobre la responsabilidad de todos los sectores sociales, para llevar a cabo medidas necesarias y solidarias que protejan a la megadiversidad del país y del mundo, bajo un enfoque ético y comprometido con la sustentabilidad, para garantizar su regeneración, preservación, el bienestar común y el derecho humano a un ambiente sano de las presentes y futuras generaciones.",
        "orden": 4
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_593",
    "contenido": "Comunicación y representación técnica.",
    "pdas": [
      {
        "pda_id": "PDA_SB_593_1",
        "descripcion": "Explora la importancia del lenguaje técnico y el consenso en su uso desde diferentes contextos, para proponer formas de representación y comunicar sus ideas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_594",
    "contenido": "Evaluación de sistemas tecnológicos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_594_1",
        "descripcion": "Comprende la importancia de la evaluación de los procesos como parte de la innovación y mejora continua, para el logro de la eficiencia, eficacia, fiabilidad y factibilidad de los sistemas técnicos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_595",
    "contenido": "Factores que inciden en los procesos técnicos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_595_1",
        "descripcion": "Comprende la satisfacción de necesidades como la base de la creación e innovación técnica para reflexionar acerca de la influencia de intereses, prejuicios, estereotipos y aspiraciones, que favorecen o limitan la igualdad de oportunidades, en el desarrollo de procesos técnicos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_596",
    "contenido": "Herramientas, máquinas e instrumentos, como extensión corporal, en la satisfacción continua de intereses y necesidades humanas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_596_1",
        "descripcion": "Explora las posibilidades corporales y la delegación de funciones en herramientas, máquinas, instrumentos y formas de organización para identificar sus funciones y procesos de cambio técnico, en la satisfacción de intereses y necesidades de diversas sociedades.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_597",
    "contenido": "Materiales, procesos técnicos y comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_597_1",
        "descripcion": "Distingue el origen, transformación y características tecnológicas de los materiales que comparten técnicas similares, para utilizarlos desde una perspectiva local, eficiente y sustentable.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_598",
    "contenido": "Pensamiento estratégico y creativo en la resolución de problemas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_598_1",
        "descripcion": "Analiza necesidades del entorno cercano para plantear un problema, investigar alternativas de solución y seleccionar la que mejor se adapte a los criterios y condiciones contextuales.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_599",
    "contenido": "Procesos técnicos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_599_1",
        "descripcion": "Describe los elementos que interactúan en los sistemas técnicos (formas de organización, medios, materiales, energía, conocimientos, saberes, experiencias) para comprender su vínculo con la sociedad, la cultura y la naturaleza.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_601",
    "contenido": "Usos e implicaciones de la energía en los procesos técnicos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_601_1",
        "descripcion": "Comprende la función de la energía en los sistemas técnicos y sus implicaciones en el desarrollo tecnológico para la toma de decisiones responsables, que permitan prever y disminuir riesgos personales, sociales y naturales.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tutoría / Educación Socioemocional",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_602",
    "contenido": "Construcción del proyecto de vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_602_1",
        "descripcion": "Reconoce cambios presentes a lo largo de la vida y en la adolescencia para definir metas personales y en colectivo, a alcanzar en un corto, mediano y largo plazo. Valora metas individuales y de otras personas a partir de identificar situaciones y fomar de actuar que las afectan, para favorecer su logro y el bienestar colectivo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tutoría / Educación Socioemocional",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_603",
    "contenido": "Educación integral en Sexualidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_603_1",
        "descripcion": "Identifica las dimensiones de la sexualidad: biológica, psicológica, social, cultural, entre otras en distintos momentos de su vida, para establecer relaciones en favor del bienestar.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tutoría / Educación Socioemocional",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_604",
    "contenido": "Formas de ser, pensar, actuar y relacionarse",
    "pdas": [
      {
        "pda_id": "PDA_SB_604_1",
        "descripcion": "Reconoce ideas, gustos, necesidades, posibilidades, intereses, deseos y experiencias, para favorecer el autoconocimiento y descubrimiento de nuevas potencialidades.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tutoría / Educación Socioemocional",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_605",
    "contenido": "Los sentimientos y su influencia en la toma de decisiones.",
    "pdas": [
      {
        "pda_id": "PDA_SB_605_1",
        "descripcion": "Distingue entre emociones, estados de ánimo y sentimientos como elementos que contribuyen a la construcción de relaciones afectivas inclusivas y equitativas. Reconoce que los sentimientos son resultado de las vivencias y la cultura.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tutoría / Educación Socioemocional",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_606",
    "contenido": "Prevención de sistuaciones de riesgo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_606_1",
        "descripcion": "Incorpora prácticas que inciden en la prevención de situaciones de riesgo ante accidentes, adicciones, formas de violencia y fenómenos naturales, para favorecer el desarrollo personal, familiar y comunitario, así como el cuidado del medio ambiente.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_609",
    "contenido": "Creaciones artísticas que tienen su origen en textos literarios.",
    "pdas": [
      {
        "pda_id": "PDA_SB_609_1",
        "descripcion": "Explora con formas, colores, movimientos, sonidos, entre otros elementos de las artes, para reinterpretar textos literarios de la comunidad u otros lugares, haciendo uso de diversos lenguajes artísticos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_610",
    "contenido": "Diversidad de lenguajes artísticos en la riqueza pluricultural de México y del mundo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_610_1",
        "descripcion": "Reconoce en manifestaciones artísticas de México y del mundo el uso del cuerpo, del espacio y del tiempo, para valorarlas como parte de la riqueza pluricultural.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_611",
    "contenido": "Elementos de las artes y recursos estéticos apreciados en el entorno natural y social, así como en diversas manifestaciones artísticas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_611_1",
        "descripcion": "Identifica el uso intencional del cuerpo, del espacio y del tiempo en manifestaciones artísticas, para apreciar e interpretar sus sentidos y significados. Percibe cualidades estéticas en el entorno natural y social, para interpretar sus sentidos y significados.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_612",
    "contenido": "Expresión artística de sensaciones, emociones, sentimientos e ideas, a partir de experiencias familiares, escolares o comunitarias.",
    "pdas": [
      {
        "pda_id": "PDA_SB_612_1",
        "descripcion": "Recrea lúdicamente sensaciones, emociones, sentimientos e ideas, mediante el uso del cuerpo, del espacio y del tiempo, para expresar la relación con su entorno familiar.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_613",
    "contenido": "Identidad y sentido de pertenencia en manifestaciones artísticas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_613_1",
        "descripcion": "Aprecia la intención expresiva en diversas manifestaciones artísticas, para la construcción crítica de las identidades personale y colectiva.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_614",
    "contenido": "Los lenguajes artísticos en la expresión de problemas de la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_614_1",
        "descripcion": "Usa intencionalmente formas, colores, movimientos y sonidos, entre otros elementos de las artes, para recrear una situación problemática de su contexto y manifestar una postura crítica.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_615",
    "contenido": "Manifestaciones artísticas que emplean sistemas alternativos y aumentativos de comunicación, elaboradas por personas en condición de discapacidad y/o diseñadas para ellas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_615_1",
        "descripcion": "Reconoce los valores estéticos y creativos de las manifestaciones artísticas realizadas por personas con alguna discapacidad, para fomentar la inclusión.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_616",
    "contenido": "Manifestaciones culturales y artísticas que conforman la diversidad étnica, cultural y lingüística.",
    "pdas": [
      {
        "pda_id": "PDA_SB_616_1",
        "descripcion": "Identifica diferentes manifestaciones culturales y artísticas de pueblos indígenas y afrodescendientes de México y del mundo, para interpretar significados que permitan fomentar una sociedad intercultural.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_617",
    "contenido": "Memoria colectiva representada por medios artísticos, para registrar experiencias comunitarias.",
    "pdas": [
      {
        "pda_id": "PDA_SB_617_1",
        "descripcion": "Recupera de la memoria colectiva acontecimientos significativos de las familias, escuela o comunidad, para representarlos de manera creativa.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_618",
    "contenido": "Patrimonio cultural de la comunidad en manifestaciones artísticas que fomentan la identidad y el sentido de pertenencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_618_1",
        "descripcion": "Interpreta manifestaciones artísticas del patrimonio cultural de la comunidad y de México, para fomentar las identidades personal y colectiva, así como el sentido de pertenencia.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_619",
    "contenido": "Procesos creativos que ponen en práctica la comunicación dialógica, como estrategia para erradicar expresiones de violencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_619_1",
        "descripcion": "Expresa, mediante elementos de las artes como las formas, colores, movimientos y sonidos, la relevancia del diálogo como una alternativa a las manifestaciones de violencia presentes en la familia, escuela y comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_620",
    "contenido": "Sistemas alternativos y aumentativos de comunicación, como herramientas creativas que favorecen la inclusión.",
    "pdas": [
      {
        "pda_id": "PDA_SB_620_1",
        "descripcion": "Identifica algunas características sensoriales de la Lengua de Señas Mexicana, el código Braille, los tableros de comunicación y otros sistemas alternativos y aumentativos, parafomentar la interacción, sensibilización y empatía con la diversidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_621",
    "contenido": "Valor estético de la naturaleza, de la vida cotidiana y de diferentes manifestaciones culturales y artísticas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_621_1",
        "descripcion": "Disfruta de manifestaciones culturales y artísticas de la comunidad y de otros lugares, para reconocer sus gustos e intereses estéticos. Disfruta los valores estéticos presentes en la naturaleza, para apreciarla y expresarla.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_622",
    "contenido": "Vida saludable expresada a través de mensajes construidos con elementos de las artes, para difundirlos por distintos medios de comunicación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_622_1",
        "descripcion": "Emplea intencionalmente formas, colores, movimientos, sonidos, entre otros elementos de las artes, para representar una vida saludable y la difunde por un medio de comunicación escolar.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_623",
    "contenido": "Comunicación asertiva y dialógica para erradicar expresiones de violencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_623_1",
        "descripcion": "Realiza, de maneracolectiva, una propuesta oral o por escrito, para promover acciones que posibiliten erradicar la violencia en las familias y la escuela. Elabora solicitudes de gestión de espacios y recursos para dar a conocer la propuesta.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_624",
    "contenido": "Creaciones literarias tradicionales y contemporáneas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_624_1",
        "descripcion": "Recupera y clasifica creaciones literarias de la comunidad o de un lugar de interés, como mitos, leyendas, fábulas, epopeyas, cantares de gesta, refranes, coplas, canciones, corridos, juegos de palabras, entre otras, para promover de manera creativa su lectura.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_626",
    "contenido": "El dinamismo de las lenguas y su relevancia como patrimonio cultural.",
    "pdas": [
      {
        "pda_id": "PDA_SB_626_1",
        "descripcion": "Identifica y expresa la relevancia de valorar las lenguas como legado de la comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_627",
    "contenido": "La diversidad de lenguas y su uso en la comunicación familiar, escolar y comunitaria.",
    "pdas": [
      {
        "pda_id": "PDA_SB_627_1",
        "descripcion": "Reconoce la riqueza lingüística de México y el mundo, a partir de obras literarias procedentes de distintas culturas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_628",
    "contenido": "La diversidad étnica, cultural y lingüística de México a favor de una sociedad intercultural.",
    "pdas": [
      {
        "pda_id": "PDA_SB_628_1",
        "descripcion": "Comprende las ideas centrales y secundarias de textos relacionados con la diversidad étnica, cultural y lingüística, que favorecen una sociedad intercultural, para comentarlas en forma oral y escrita.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_629",
    "contenido": "La función creativa del español en la expresión de necesidades e intereses comunitarios.",
    "pdas": [
      {
        "pda_id": "PDA_SB_629_1",
        "descripcion": "Identifica una situación problemática de la comunidad, haciendo uso del pensamiento crítico, para plantear diversas formas creativas de resolverla, por ejemplo, con un cuento.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_630",
    "contenido": "Las lenguas como manifestación de la identidad y del sentido de pertenencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_630_1",
        "descripcion": "Describe en un texto cómo el lenguaje oral manifiesta las identidades personal y colectiva, para reconocer lo común y lo diferente.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_631",
    "contenido": "Los elementos y los recursos estéticos de la lengua española en la literatura oral y escrita.",
    "pdas": [
      {
        "pda_id": "PDA_SB_631_1",
        "descripcion": "Reconoce los recursos estéticos en textos literarios líricos, orales y escritos, y disfruta de poemas, canciones, juegos de palabras, entre otros.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_632",
    "contenido": "Los géneros periodísticos y sus recursos para comunicar sucesos significativos familiares, escolares, comunitarios y sociales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_632_1",
        "descripcion": "Identifica sucesos significativos familiares, escolares, comunitarios y sociales que forman parte de la memoria colectiva y los comunica haciendo uso de las características de los géneros periodísticos informativos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_633",
    "contenido": "Manifestaciones culturales y artísticas que favorecen una sociedad incluyente.",
    "pdas": [
      {
        "pda_id": "PDA_SB_633_1",
        "descripcion": "Reconoce manifestacionesculturales y artísticas creadas o ejecutadas por personas con alguna discapacidad, para distinguir sus valores estéticos y creativos y las comparte en forma oral o escrita con la comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_634",
    "contenido": "Mensajes para promover una vida saludable, expresados en medios comunitarios o masivos de comunicación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_634_1",
        "descripcion": "Identifica las características y recursos de mensajes que promueven una vida saludable a través de los diferentes medios comunitarios o masivos de comunicación impresos o audiovisuales.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_635",
    "contenido": "Recursos literarios en lengua española para expresar sensaciones, emociones, sentimientos e ideas vinculados con las familias, la escuela y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_635_1",
        "descripcion": "Identifica recursosliterarios en lengua española y los emplea en la elaboración de cartas personales y biografías, para expresar sensaciones, emociones, sentimientos e ideas que experimenta en su entorno familiar, escolar o comunitario.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_636",
    "contenido": "Textos de divulgación científica.",
    "pdas": [
      {
        "pda_id": "PDA_SB_636_1",
        "descripcion": "Identifica las características del texto de divulgación científica y elabora uno.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_637",
    "contenido": "Textos literarios escritos en español o traducidos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_637_1",
        "descripcion": "Reconoce el valor estético de diversos géneros literarios en textos de su libre elección, para elaborar comentarios y promover su lectura.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_638",
    "contenido": "Comunicación asertiva y dialógica en inglés, para sensibilizar sobre la erradicación de la violencia en las familias y la escuela.",
    "pdas": [
      {
        "pda_id": "PDA_SB_638_1",
        "descripcion": "Recupera de distintos textos en inglés, expresiones de violencia presentes en las familias y las escuelas. Reflexiona y comunica de forma oral y escrita una postura de rechazo a la violencia, mediante la comunicación asertiva y dialógica.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_639",
    "contenido": "Creaciones literarias tradicionales y contemporáneas en inglés.",
    "pdas": [
      {
        "pda_id": "PDA_SB_639_1",
        "descripcion": "Selecciona textos literarios en inglés que aborden temas de la comunidad o de algún lugar de interés, los resume y difunde por distintos medios.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_640",
    "contenido": "El inglés para expresar sensaciones, emociones, sentimientos e ideas vinculados con las familias, la escuela y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_640_1",
        "descripcion": "Lleva a cabo juegos del lenguaje en inglés para expresar senciones, emociones, sentimientos e ideas sobre las familias y la escuela.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_641",
    "contenido": "El uso del inglés en la construcción de mensajes a favor de la inclusión.",
    "pdas": [
      {
        "pda_id": "PDA_SB_641_1",
        "descripcion": "Investiga en diversas fuentes en inglés sobre las características de los mensajes que presentan información a favor de la interacción, sensibilización y empatía con la diversidad y expone su punto de vista.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_642",
    "contenido": "El uso del inglés en las manifestaciones culturales y artísticas que favorecen la construcción de una sociedad incluyente",
    "pdas": [
      {
        "pda_id": "PDA_SB_642_1",
        "descripcion": "Elabora semblanzas en inglés sobre personas en condición de discapacidad, destacadas por contribuir a la cultural y las artes, y las difunde.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_643",
    "contenido": "El uso del inglés para expresar necesidades, intereses y problemas de la comunidad",
    "pdas": [
      {
        "pda_id": "PDA_SB_643_1",
        "descripcion": "Investiga en textos en inglés soluciones implementadas sobre problemas de una comunidad, e informa de manera oral o escrita sus hallazgos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_644",
    "contenido": "Elementos y recursos estéticos del inglés.",
    "pdas": [
      {
        "pda_id": "PDA_SB_644_1",
        "descripcion": "Recupera de distintos tipos de textos literarios en inglés, expresiones, elementos y recursos estéticos y elabora un glosario.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_646",
    "contenido": "La diversidad lingüística y sus formas de expresión en México y el mundo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_646_1",
        "descripcion": "Hace uso del alfabeto, los números y las expresiones básicas en inglés, para nombrar y recuperar datos factuales y características básicas de lenguas reconocidas en México y el mundo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_647",
    "contenido": "La identidad y cultura de pueblos de habla inglesa.",
    "pdas": [
      {
        "pda_id": "PDA_SB_647_1",
        "descripcion": "Recupera información para llevar a cabo presentaciones en inglés, orales y escritas, que describan rasgos étnicos, culturales e identitarios de hablantes de lengua inglesa.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_648",
    "contenido": "Las manifestaciones culturales, lingüísticas y artísticas en inglés, a favor de la interculturalidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_648_1",
        "descripcion": "Elabora un cómic o manga en inglés sobre situaciones donde se rescata la importancia de la interculturalidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_649",
    "contenido": "Manifestaciones artísticas y culturales del inglés.",
    "pdas": [
      {
        "pda_id": "PDA_SB_649_1",
        "descripcion": "Realiza una lectura crítica y emite su opinión en inglés sobre diversas manifestaciones culturales y artísticas de pueblos de habla inglesa.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_650",
    "contenido": "Mensajes en inglés en medios de comunicación masiva, que promuevan una vida saludable.",
    "pdas": [
      {
        "pda_id": "PDA_SB_650_1",
        "descripcion": "Recupera en inglés mensajes que promuevan una vida saludables y los difunde de manera oral o escrita, a través de distintos medios de comunicación.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_651",
    "contenido": "Relatos en inglés para expresa sucesos significativos familiares, escolares, comunitarios y sociales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_651_1",
        "descripcion": "Entrevista y narra en inglés sucesos significativos familiares, escolares, comunitarios o sociales recuperados de la memoria colectiva.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_652",
    "contenido": "Uso de diversos textos en inglés que promueven la preservación y conservación de las lenguas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_652_1",
        "descripcion": "Recupera textos informativos y científicos en inglés, que refieran formas de conservación y preservación de las lenguas, y las difunde.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Biología",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_654",
    "contenido": "El calentamiento global como una consecuencia de la alteración de los ciclos biogeoquímicos en los ecosistemas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_654_1",
        "descripcion": "Representa la transferencia de materia y energía entre los organismos de un ecosistema mediante redes y pirámides tróficas; elabora explicaciones, inferencias y predicciones consistentes con los modelos generados acerca de la perdida o incremento de organismos en los eslabones. Identifica interacciones de competencia e interdependencia en el ecosistema local, explica cómo regulan el funcionamiento y mantenimiento en la dinámica general del ecosistema. Analiza las prácticas de consumo que han alterado los ciclos biogeoquímicos del carbono y nitrógeno, sus efectos asociados al calentamiento global y sus impactos en el medio ambiente y la salud.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Biología",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_655",
    "contenido": "Funcionamiento del cuerpo humano coordinado por los sistemas nervioso y endocrino.",
    "pdas": [
      {
        "pda_id": "PDA_SB_655_1",
        "descripcion": "Explica la participación de los sistemas nervioso y endocrino en la coordinación de las funciones del cuerpo humano, reconoce el papel general de las hormonas y sus efectos en la maduración sexual y en la reproducción. Explica los efectos del consumo de sustancias adictivas en el sistema nervioso y en el funcionamiento integral del cuerpo humano argumenta la importancia de evitar su consumo a partir del análisis de sus implicaciones en la salud, la sexualidad, la economía y la sociedad; comparte sus aprendizajes por distintos medios.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Biología",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_656",
    "contenido": "Importancia del microscopio para el conocimiento de la unidad y la diversidad de los seres vivos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_656_1",
        "descripcion": "Compara cómo han cambiado las primeras observaciones microscópicas respecto a las actuales, valora el avance en el conocimiento de las bacterias, las células y los virus. Describe las estructuras y funciones básicas de la célula a partir de modelos, explica la participación de la membrana y el citoplasma en las funciones de nutrición y relación, y del núcleo en la reproducción y herencia. Formula preguntas y contrasta explicaciones acerca de la manipulación genética, comparte sus hallazgos respecto de sus beneficios y riesgos en los ámbitos de la salud y el medio ambiente, participa en debates en los que defiende su postura.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Biología",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_657",
    "contenido": "La biodiversidad como expresión del cambio de los seres vivos en el tiempo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_657_1",
        "descripcion": "Analiza información acerca del estado de la biodiversidad local a partir de fuentes directas, orales, escritas, audiovisuales o internet, expone razones sobre su importancia cultural, biológica, estética y ética, propone acciones para su cuidado. Indaga las principales aportaciones de Darwin y Wallace, las identifica como una de las explicaciones más fundamentadas acerca del origen de la biodiversidad, reflexiona acerca de cómo han cambiado, reconoce que los conocimientos científicos son un proceso en construcción permanente.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Biología",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_658",
    "contenido": "La diversidad de saberes e intercambio de conocimientos acerca de los seres vivos y las relaciones con el medio ambiente.",
    "pdas": [
      {
        "pda_id": "PDA_SB_658_1",
        "descripcion": "Reconoce la importancia de los conocimientos, prácticas e innovaciones de los pueblos originarios acerca de los seres vivos, intercambia vivencias y experiencias asociadas al aprovechamiento y la protección como el uso de la herbolaria, la milpa o la conservación de los bosques. Explica por qué los saberes de los pueblos originarios han aportado al aprovechamiento de los recursos naturales en el ecosistema local, analiza sus contribuciones a la agricultura, el pastoreo y la pesca sustentables, comunica sus hallazgos usando diferentes lenguajes y representaicones.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Biología",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_659",
    "contenido": "Las vacunas: su relevancia en el control de algunas enfermedades infecciosas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_659_1",
        "descripcion": "Describe las características generales de las bacterias y los virus, formula hipótesis en torno al por qué de la rápida propagación de las enfermedades infecciosas que causan, y las contrasta con evidencias reportadas en fuentes con sustento científico. Valora la importancia y la necesidad de proteger la salud con el uso de las vacunas para el control de algunas enfermedades infecciosas; evalua sus riesgos y beneficios sociales y ecnonómicos; reconoce la interacción de los conocimientos científicos y tecnológicos, sus alcances y limitaciones.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Biología",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_660",
    "contenido": "Los procesos vitales de los seres vivos: nutrición, relación con el medio y reproducción.",
    "pdas": [
      {
        "pda_id": "PDA_SB_660_1",
        "descripcion": "Compara las características comunes de los seres vivos, identifica que todos tienen estructuras especializadas asociadas a la nutrición, la relación con el medio y la reproducción y los distingue como rasgos adaptativos que favorecen la sobrevivencia de las especies. Clasifica organismos de acuerdo con características comunes asociadas a la nutrición y reproducción, propone hipótesis en torno a posibles relaciones de parentesco entre ellos y las contrasta con fuentes de consulta, reconoce que todas las clasificaciones tienen alcances y limitaciones.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Biología",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_661",
    "contenido": "Prevención de enfermedades relacionadas con la alimentación y el consumo de alimentos ultra procesados.",
    "pdas": [
      {
        "pda_id": "PDA_SB_661_1",
        "descripcion": "Identifica causas de la obesidad y la diabetes relacionadas con la dieta y el sedentarismo a fin de formular su proyecto de vida saludable, incluye factores protectores y propone acciones para reducir factores de riesgo, incluyendo su entorno familiar y comunitario. Formula hipótesis acerca de las consecuencias de carencia o exceso de nutrimentos en la dieta; interpreta datos que muestran la correlación entre la incidencia de enfermedades como la caries e hipertensión y el consumo de exceso de sal, azúcar y grasas saturadas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Biología",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_662",
    "contenido": "Salud sexual y reproductivas, prevención de infecciones de transmisión sexual y del embarazo en adolescentes.",
    "pdas": [
      {
        "pda_id": "PDA_SB_662_1",
        "descripcion": "Compara las maneras en que la cultura influye en el concepto de sexualidad; reconoce que todas las culturas tienen maneras distintas de comprender el género, la sexualidad y la reproducción; y reflexiona acerca de que el inicio de la actividad sexual debe ser de manera consensuada. Cuestiona los mitos, estereotipos y costumbres que impactan negativamente en la salud de las niñas y mujeres, reconoce la importancia de la igualdad de género y la responsabilidad compartida del hombre y la mujer en la crianza, como base para la toma de decisiones en la prevención del embarazo adolescente. Valora el uso consistente del condón para disminuir el riesgo de infecciones de transmisión sexual, compara la efectividad de los métodos anticonceptivos como una ayuda para prevenir o planificar el embarazo en la perspectiva de su proyecto de vida.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_663",
    "contenido": "Capacidades, habilidades y destrezas motrices.",
    "pdas": [
      {
        "pda_id": "PDA_SB_663_1",
        "descripcion": "Explora las capacidades, habilidades y destrezas motrices, para enriquecer y ampliar el potencial propio y de las demás personas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_664",
    "contenido": "E. FÍSICA",
    "pdas": [
      {
        "pda_id": "PDA_SB_664_1",
        "descripcion": "1° GRADO",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_665",
    "contenido": "Estilos de vida activos y saludables.",
    "pdas": [
      {
        "pda_id": "PDA_SB_665_1",
        "descripcion": "Implementa acciones que le permiten mantenerse físicamente activo en diferentes momentos del día, para favorecer la práctica de estilos de vida saludables.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_666",
    "contenido": "Interacción motriz.",
    "pdas": [
      {
        "pda_id": "PDA_SB_666_1",
        "descripcion": "Pone a prueba la interacción motriz en situaciones de juego, iniciación deportiva y deporte educativo, con el fin de alcanzar metas comunes y obtener satisfacción al colaborar con las demás personas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_667",
    "contenido": "Pensamiento lúdico, estratégico y creativo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_667_1",
        "descripcion": "Toma decisiones individuales y colectivas en situaciones de juego (defensivas u ofensivas), con el propósito de valorar su efectividad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_668",
    "contenido": "Potencialidades cognitivas, expresivas, motrices, creativas y de relación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_668_1",
        "descripcion": "Pone en práctica los elementos de la condición física en actividades motrices y recreativas, para reconocerlas como alternativas que fomentan el bienestar individual y colectivo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_669",
    "contenido": "Azar y probabilidad",
    "pdas": [
      {
        "pda_id": "PDA_SB_669_1",
        "descripcion": "Compara cualitativamente dos o más eventos a partir de sus resultados posibles, usa relaciones como:“es más probable que…”, “es menos probable que…”.Identifica eventos en los que interviene el azar,determina el espacio muestral y experimenta. Identifica diversos procedimientos de conteo y resuelve problemas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_670",
    "contenido": "Circunferencia, círculo y esfera.",
    "pdas": [
      {
        "pda_id": "PDA_SB_670_1",
        "descripcion": "Identifica y traza las rectas notables en la circunferencia y las relaciones entre ellas. Investiga figuras relacionadas con círculos y propiedades de los círculos. Construye circunferencias a partir de distinta información. Verifica los criterios de existencia y unicidad de estas figuras.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_671",
    "contenido": "Construcción y propiedades de las figuras planas y cuerpos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_671_1",
        "descripcion": "Utiliza la regla y el compás para trazar: punto medio, mediatriz de un segmento, segmentos y ángulos congruentes, bisectriz de un ángulo, rectas perpendiculares, rectas paralelas. Identifica y traza las rectas notables en triángulos y cuadriláteros. Construye y clasifica triángulos y cuadriláteros a partir del análisis de distinta información.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_672",
    "contenido": "Ecuaciones lineales y cuadráticas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_672_1",
        "descripcion": "Resuelve ecuaciones de la forma Ax=B, Ax+B=C, Ax+B=Cx+D con el uso de las propiedades de la igualdad. Modela y resuelve problemas cuyo planteamiento es una ecuación lineal. Resuelve problemas de porcentajes en diversas situaciones.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_673",
    "contenido": "Expresión de fracciones como decimales y de decimales como fracciones.",
    "pdas": [
      {
        "pda_id": "PDA_SB_673_1",
        "descripcion": "Usa diversas estrategias al convertir números fraccionarios a decimales y viceversa.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_674",
    "contenido": "Extensión de los números a positivos y negativos y su orden.",
    "pdas": [
      {
        "pda_id": "PDA_SB_674_1",
        "descripcion": "Reconoce la necesidad de los números negativos a partir de usar cantidades que tienen al cero como referencia. Compara y ordena números con signo (enteros, fracciones y decimales) en la recta numérica y analiza en qué casos se cumple la propiedad de densidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_675",
    "contenido": "Extensión del significado de las operaciones y sus relaciones inversas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_675_1",
        "descripcion": "Reconoce el significado de las cuatro operaciones básicas y sus relaciones inversas al resolver problemas que impliquen el uso de números con signo. Comprueba y argumenta si cada una de estas operaciones cumple las propiedades: conmutativa, asociativa y distributiva. Identifica y aplica la jerarquía de operaciones y símbolos de agrupación al realizar cálculos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_676",
    "contenido": "Funciones.",
    "pdas": [
      {
        "pda_id": "PDA_SB_676_1",
        "descripcion": "Relaciona e interpreta relaciones proporcional y no proporcional a partir de su representación tabular, gráfica y con diagramas. Modela y resuelve diversas situaciones a través de ecuaciones proporcionales con constante positiva y negativa.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_677",
    "contenido": "Interpretación de la información a través de medidas de tendencia central y de dispersión.",
    "pdas": [
      {
        "pda_id": "PDA_SB_677_1",
        "descripcion": "Determina e interpreta la frecuencia absoluta, la frecuencia relativa, la media, la mediana y la moda en un conjunto de datos. Usa e interpreta las medidas de tendencia central (moda, media aritmética y mediana) y el rango de un conjunto de datos, y justifica con base en ellas sus decisiones.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_678",
    "contenido": "Introducción al álgebra.",
    "pdas": [
      {
        "pda_id": "PDA_SB_678_1",
        "descripcion": "Interpreta y plantea diversas situaciones del lenguaje común al lenguaje algebraico y viceversa. Representa algebraicamente perímetros de figuras.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_680",
    "contenido": "Medición y cálculo en diferentes contextos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_680_1",
        "descripcion": "Introduce la idea de distancia entre dos puntos como la longitud del segmento que los une. Encuentra la distancia de un punto a una recta y la distancia entre dos rectas paralelas. Explora la desigualdad del triángulo. Obtiene y aplica fórmulas o usa otras estrategias para calcular el perímetro y el área de polígonos regulares e irregulares y del círculo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_681",
    "contenido": "Obtención y representación de información.",
    "pdas": [
      {
        "pda_id": "PDA_SB_681_1",
        "descripcion": "Usa tablas, gráficas de barras y circulares para el análisis de información.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_682",
    "contenido": "Rectas y ángulos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_682_1",
        "descripcion": "Explora las figuras básicas como rectas y ángulos y su notación. Encuentra y calcula los ángulos que se forman al intersecar dos segmentos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_683",
    "contenido": "Regularidades y Patrones.",
    "pdas": [
      {
        "pda_id": "PDA_SB_683_1",
        "descripcion": "Representa algebraicamente una sucesión con progresión aritmética de figuras y números.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_684",
    "contenido": "Consecuencias de la desigualdad en la calidad de vida de las personas y comunidades.",
    "pdas": [
      {
        "pda_id": "PDA_SB_684_1",
        "descripcion": "Analiza las causas que dan origen a las diferencias en la calidad de vida de la población en México y el mundo y las compara con su derecho a la igualdad sustantiva y a una vida digna.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_685",
    "contenido": "Defensa del derecho al acceso a la protección de datos personales, a la información, la transparencia y la rendición de cuentas en un gobierno democrático.",
    "pdas": [
      {
        "pda_id": "PDA_SB_685_1",
        "descripcion": "Destaca la importancia de que las servidora y los servidores públicos y representantes populares desempeñen sus funciones con apego a la ley de manera honesta, transparente y limitada, utilizando los recursos públicos para beneficio de la sociedad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_686",
    "contenido": "El conflicto en la convivencia humana desde la cultura de paz.",
    "pdas": [
      {
        "pda_id": "PDA_SB_686_1",
        "descripcion": "Analiza distintos tipos de conflictos en sus espacios de convivencia, su estructura y formas de solucionarlos desde la cultura de paz como una oportunidad de crecimiento personal y social.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_687",
    "contenido": "El derecho a la salud y la prevención en el consumo de drogas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_687_1",
        "descripcion": "Reconoce que el consumo de drogas afecta el derecho a la dignidad y la salud de las personas, y demanda la aplicación de medidas que contribuyan a la prevención y protección.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_689",
    "contenido": "Grupos sociales yculturales en laconformación de las identidades juveniles.",
    "pdas": [
      {
        "pda_id": "PDA_SB_689_1",
        "descripcion": "Valora la diversidad de grupos e identidades juveniles en la escuela y en la comunidad y fortalece el respeto a formas de ser, pensar y expresarse en el marco de los derechos humanos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_690",
    "contenido": "Igualdad sustantiva en el marco de la interculturalidad, la inclusión y la perspectiva de género.",
    "pdas": [
      {
        "pda_id": "PDA_SB_690_1",
        "descripcion": "Aprecia la interculturalidad y el respeto al derecho a la igualdad sustantiva para establecer relaciones incluyentes y respetuosas de la diversidad, rechazando la discriminación y el racismo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_691",
    "contenido": "Instituciones, organizaciones y mecanismos de representación democrática.",
    "pdas": [
      {
        "pda_id": "PDA_SB_691_1",
        "descripcion": "Aprecia la función de las instituciones y organizaciones sociales y políticas, así como de los mecanismos de participación y representación ciudadana, que fortalecen la vida democrática.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_692",
    "contenido": "La cultura de paz y la creación de ambientes que garanticen el respeto a la vida y la dignidad del ser humano.",
    "pdas": [
      {
        "pda_id": "PDA_SB_692_1",
        "descripcion": "Comprende la influencia que tiene la cultura de paz en la convivencia escolar, familiar y comunitaria, para favorecer ambientes libres de discriminación y racismo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_693",
    "contenido": "Los derechos humanos en México y en el mundo como valores compartidos por las sociedades actuales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_693_1",
        "descripcion": "Asume una postura crítica acerca de la vigencia de los derechos humanos como valores compartidos por distintas sociedades del mundo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_694",
    "contenido": "Medidas de protección y mecanismos de denuncia en el rechazo a la violencia de género, sexual y la trata de personas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_694_1",
        "descripcion": "Analiza situaciones de violencia escolar, de género, sexual y la trata de personas, con base en la perspectiva de género y demanda la aplicación de medidas de protección para garantizar el derecho a una vida libre de violencia.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_695",
    "contenido": "Movimientos sociales y políticos por los derechos humanos en el mundo y en México.",
    "pdas": [
      {
        "pda_id": "PDA_SB_695_1",
        "descripcion": "Asume una postura ética acerca de los movimientos sociales y políticos que originaron los derechos humanos en el mundo y su influencia en México.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_696",
    "contenido": "Normas, leyes, instituciones y organizaciones encargadas de proteger, defender y exigir la aplicación de los derechos humanos en la convivencia diaria.",
    "pdas": [
      {
        "pda_id": "PDA_SB_696_1",
        "descripcion": "Aprecia los beneficios de participar en la comunidad y el país, en la construcción y aplicación de normas y leyes para garantizar la convivencia y el ejercicio de los derechos humanos en la comunidad y el país.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_697",
    "contenido": "Personas, grupos y organizaciones a favor de la cultura de paz.",
    "pdas": [
      {
        "pda_id": "PDA_SB_697_1",
        "descripcion": "Aprecia las acciones de personas, grupos u organizaciones en México a favor de la cultura de paz para promover ambientes libres de violencia.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_698",
    "contenido": "Principios y valores de la cultura democrática como forma de gobierno y de vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_698_1",
        "descripcion": "Aprecia en los principios y valores de la democracia una forma de vida y de gobierno, para tomar decisiones que fortalezcan la convivencia en los espacios donde participa.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_699",
    "contenido": "Principios éticos como referente para un desarrollo sustentable.",
    "pdas": [
      {
        "pda_id": "PDA_SB_699_1",
        "descripcion": "Reflexiona éticamente acerca de la relación de las comunidades con su contexto socionatural para impulsar acciones que promuevan el desarrollo sustentable así como actitudes de cuidado y respeto a otros seres vivos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_700",
    "contenido": "Proyectos como un recurso para atender problemáticas de la comunidad desde una ciudadanía democrática.",
    "pdas": [
      {
        "pda_id": "PDA_SB_700_1",
        "descripcion": "Participa en actividades y proyectos en su entorno escolar y social, en donde aplica mecanismos de participación democrática y los rasgos de la ciudadanía responsable y crítica.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Geografía",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_701",
    "contenido": "Crecimiento, distribución, composición y migración de la población.",
    "pdas": [
      {
        "pda_id": "PDA_SB_701_1",
        "descripcion": "Analiza las implicaciones sociales, ambientales y económicas del crecimiento, distribución y composición de la población en diferentes países, con base en información estadística y cartográfica. Emplea las nociones de concentración y dispersión de la población para explicar los rasgos y problemas del espacio urbano y el rural. Distingue la movibilidad como un derecho humano, los tipos de migración y los principales flujos migratorios para comprender los efectos socioeconómicos y culturales en los lugares de atracción y expulsión de población.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Geografía",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_702",
    "contenido": "El espacio geográfico como un producto social y colectiva.",
    "pdas": [
      {
        "pda_id": "PDA_SB_702_1",
        "descripcion": "Comprende que el espacio geográfico se conforma de interrelaciones sociedadnaturaleza. Reconoce que el patrimonio biocultural es resultado de la relación entre las formas de organización económico-social, la cultura y la biodiversidad a través del tiempo. Distingue la distribución de las regiones bioculturales principales en México y el mundo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Geografía",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_703",
    "contenido": "El reto del cambio climático.",
    "pdas": [
      {
        "pda_id": "PDA_SB_703_1",
        "descripcion": "Reconoce las relaciones e interacciones entre los elementos y los factores del clima como base para comprender, de manera general, la distribución de las regiones naturales en la Tierra, y analizar la biodiversidad en el mundo. Indaga y analiza de manera crítica los cambios ocurridos en el clima, sus causas y consecuencias en México y el mundo. Asume una postura crítica y activa ante los fenómenos derivados del calentamiento global y el cambio climático.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Geografía",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_704",
    "contenido": "El suelo, recurso estratégico para la seguridad alimentaria y la vida en el planeta.",
    "pdas": [
      {
        "pda_id": "PDA_SB_704_1",
        "descripcion": "Indaga sobre el origen, los usos y los problemas del suelo en la localidad. Reflexiona acerca de la contradicción que existe entre los países con suelo de vocación agrícola y la poca productividad asociada con los problemas del suelo (sobreexplotación, degradación, pérdida, entre otros). Comparte alternativas para la protección y recuperación del suelo y colabora de manera organizada y solidaria en acciones comunitarias orientadas a ese fin en la localidad donde vive.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Geografía",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_706",
    "contenido": "La distribución y dinámica de las aguas continentales y oceánicas en la Tierra.",
    "pdas": [
      {
        "pda_id": "PDA_SB_706_1",
        "descripcion": "Analiza la distribución de las aguas continentales en México y el Mundo: principales ríos, lagos, aguas subterráneas, llanuras inundables y humedales. Reconoce la importancia de las cuencas hidrográficas para el desarrollo económico en México, así como para la conservación del agua y la tierra. Valora el mar territorial, la zona económica exclusiva de México y sus litorales, como recursos que contribuyen al desarrollo del país, lo que fortalece la conciencia marítima.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Geografía",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_707",
    "contenido": "La diversidad de grupos sociales y culturales en México.",
    "pdas": [
      {
        "pda_id": "PDA_SB_707_1",
        "descripcion": "Reconoce la diversidad de pueblos originarios, afromexicanos, migrantes, grupos urbanos, grupos sociales en México, como parte de la identidad nacional pluricultural y la compara con la diversidad social y cultural en el mundo. Valora la importancia del espacio en la conformación de las identidades juveniles.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Geografía",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_708",
    "contenido": "La relación de las placas tectónicas conel relieve, la sismicidad y el vulcanismo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_708_1",
        "descripcion": "Identifica qué son las placas tectónicas, cuáles son sus características y dinámica. Argumenta la relación entre las placas tectónicas con las regiones sísmicas y volcánicas en México y el mundo, para fortalecer la cultura de la prevención. Relaciona los movimientos de las placas tectónicas con la distribución del relieve de la superficie terrestre y reconoce otros agentes que lo modelan.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Geografía",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_709",
    "contenido": "Las categorías de análisis espacial y representaciones del espacio geográfico.",
    "pdas": [
      {
        "pda_id": "PDA_SB_709_1",
        "descripcion": "Reconoce saberes ancestrales acerca del espacio geográfico, formas de ubicación y representaciones en México y el mundo. Comprende las categorías de análisis espacial para explicar las características del espacio geográfico: lugar, región, paisaje y territorio. Utiliza los conceptos de localización, distribución, diversidad, temporalidad y cambio e interacción para el estudio del espacio geográfico.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Geografía",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_710",
    "contenido": "Las desigualdades socioeconómicas en México y el mundo, y sus efectos en la calidad de vida de las personas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_710_1",
        "descripcion": "Comprende qué son las desigualdades socioeconómicas e identifica sus efectos y repercusiones en la vida de las personas. Argumenta las desigualdades socioeconómicas en México y el mundo, mediante la interpretación del Índice de Desarrollo Humano (IDH) y el Índice para una vida mejor, para explicar sus efectos en la calidad de vida. Propone acciones para reducir las desigualdades socioeconómicas en la comunidad, México y el mundo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Geografía",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_711",
    "contenido": "Las prácticas deproducción, distribución y consumo sustentables como alternativas para preservar el medio ambiente y asegurar el bienestar de las generaciones presentes y futuras.",
    "pdas": [
      {
        "pda_id": "PDA_SB_711_1",
        "descripcion": "Comprende qué es la sustentabilidad e identifica prácticas de producción, distribución y consumo sustentables. Argumenta sobre prácticas sustentables de producción, distribución y consumo que pueden contribuir al bienestar de la comunidad y de México. Propone alternativas sustentables de desarrollo social para la preservación del medio ambiente y el bienestar de las generaciones presentes y futuras.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Geografía",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_712",
    "contenido": "Los conflictos territoriales actuales en México y el mundo, y sus implicaciones ambientales y sociales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_712_1",
        "descripcion": "Debate acerca de la multicausalidad de los conflictos territoriales en México y el mundo, la importancia de la ubicación geográfica de las partes involucradas y las consecuencias ambientales, sociales, económicas y políticas en México y el mundo. Promueve alternativas de resolución justas y pacíficas a los conflictos territoriales que afectan a la comunidad, a México y al mundo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Geografía",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_713",
    "contenido": "Los procesos productivos y sus consecuencias ambientales y sociales en la comunidad México y el mundo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_713_1",
        "descripcion": "Compara procesos productivos y espacios económicos en México y el mundo, para reconocer sus implicaciones sociales, económicas y ambientales. Analiza y relaciona distintos procesos productivos sustantivos en la conformación social, económica y espacial de las sociedades a nivel mundial, para identificar sus contradicciones y desigualdades.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Geografía",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_714",
    "contenido": "Los retos sociales y ambientales en la comunidad, en México y el mundo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_714_1",
        "descripcion": "Reconoce cómo las problemáticas sociales y ambientales afectan a la comunidad. Asume responsabilidad como agente de cambio para encontrar soluciones a las problemáticas sociales y ambientales de la comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Geografía",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_715",
    "contenido": "Los riesgos de desastre, su relación con los procesos naturales y la vulnerabilidad de la población en lugares específicos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_715_1",
        "descripcion": "Identifica que los desastres pueden ser originados por procesos naturales o por las actividades humanas. Relaciona los efectos ambientales, sociales y económicos de los desastres recientes en México y el mundo, tomando en cuenta la vulnerabilidad de la población. Valora la importancia de consolidar una cultura de prevención de desastres con la participación de instituciones, organismos y sociedad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_716",
    "contenido": "Amor, amistad, familias y relaciones entre las personas en la historia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_716_1",
        "descripcion": "Comprende que la forma en la que las personas piensan y actúan en relación con el amor, la amistad y las familias se construyen en la sociedad y cambian históricamente. Explica los cambios que las concepciones sobre el amor, la amistad y las familias han tenido a lo largo del tiempo y en diversos contextos sociales y geográficos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_717",
    "contenido": "Discriminación, racismo y prejuicios como construcciones históricas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_717_1",
        "descripcion": "Identifica las causas históricas del racismo y la xenofobia y las relaciona críticamente con sus consecuencias. Analiza la relevancia histórica del racismo en la justificación de actos que atentaron contra la vida de personas o grupos. Comprende las causas y consecuencias históricas del racismo y propone acciones en su vida cotidiana y en la de su comunidad escolar para combatirlo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_719",
    "contenido": "La conformación de las metrópolis y los sistemas de dominación",
    "pdas": [
      {
        "pda_id": "PDA_SB_719_1",
        "descripcion": "Formula preguntas, recopila información y comparte sus hallazgos entorno a los pueblos originarios de México ¿cuántos pueblos son? ¿dónde están? ¿de dónde llegaron? ¿cómo vivían antes? ¿Cómo viven ahora? ¿qué permanece? ¿qué cambió? ¿se reconoce en él? Construye una línea del tiempo con la historia de algún pueblo originario que le sea entrañable. Indaga los orígenes de la población afromexicana, sus aportaciones sociales y a la cultura de nuestro país. Identifica representaciones asumidas de los pueblos indígenas y afromexicanos sobre el nacimiento, la vida, la muerte, la tierra, la naturaleza, la tierra, la agua, el territorio en su comunidad. Investiga el arribo a largo de la historia a nuestro país, a lo largo de la historia y lo expone a sus pares en la organización cronológica que considere más adecuada.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_720",
    "contenido": "La construcción histórica de las ideas sobre las juventudes e infancias.",
    "pdas": [
      {
        "pda_id": "PDA_SB_720_1",
        "descripcion": "Identifica las ideas y representaciones de las personas de acuerdo con su edad en diversos momentos históricos. Comprende los cambios y permanencias en las características y tareas que las sociedades asignan a las personas, de acuerdo con su edad. Explica, con base en fuentes, las actividades asignadas a las personas según su edad en sociedades y momentos históricos diversos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_721",
    "contenido": "Las gestas de resistencia y los movimientos independentistas",
    "pdas": [
      {
        "pda_id": "PDA_SB_721_1",
        "descripcion": "Indaga sobre rebeliones y levantamientos de pueblos indígenas y afromexicanos en la historia de nuestro país y se acerca a comprender sus causas. Emite juicios acerca de agravios o crímenes a los que han sido sujetos los pueblos indígenas y afromexicanos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_722",
    "contenido": "Las luchas de las mujeres por sus derechos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_722_1",
        "descripcion": "Identifica los orígenes históricos de movimientos y organizaciones de mujeres en la lucha por la igualdad y el reconocimiento de sus derechos. Comprende los cambios y permanencias en las luchas de las mujeres por una vida igualitaria y libre de violencia. Analiza las causas de los movimientos feministas en la actualidad en México y el mundo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_723",
    "contenido": "Las mujeres y sus historias.",
    "pdas": [
      {
        "pda_id": "PDA_SB_723_1",
        "descripcion": "Revisa fuentes históricas para identificar la participación de las mujeres en la sociedad en diversos momentos históricos. Indaga sobre el protagonismo social de las mujeres en diferentes procesos históricos, para reconocer la relevancia de su participación. Contrasta fuentes históricas para identificar cambios y permanencias en la participación de las mujeres en diversos momentos históricos. Analiza los testimonios producidos por las mujeres en distintos momentos históricos. Argumenta las causas de los principales cambios históricos que ha tenido la participación social de las mujeres. Argumenta cómo el “deber ser” de las mujeres ha cambiado a través del tiempo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_724",
    "contenido": "Los albores de la humanidad: los pueblos antiguos del mundo y su devenir",
    "pdas": [
      {
        "pda_id": "PDA_SB_724_1",
        "descripcion": "Busca, localiza y estudia con sus pares fuentes que dan cuenta de mitos fundacionales de pueblos antiguos. Reflexiona acerca de la importancia de las fuentes históricas para la interpretación de hechos y procesos. Compara y encuentra lo común y lo diverso entre mitos fundacionales de pueblos antiguos de México y de otras partes del mundo. Reflexiona y toma postura en torno a las teorías que explican el poblamiento original de América. Distingue y clasifica evidencias históricas que le permiten acercarse al conocimiento de del poblamiento original de América. Investiga acerca de restos fósiles humanos encontrados en los que hoy es el territorio de nuestro país. Reflexiona en torno al caso del llamado Hombre de Tepexpan y la necesidad de una historia inclusiva que recupere las aportaciones de las mujeres. Reconozca que la Historia es una reconstrucción científica del pasado que se hace desde el presente y que al igual que otras ciencias, la ideología y la metodología del historiador determinan su mirada del pasado. Conoce sistemas que tienen como propósito abordar la historia de los primeros pueblos en el territorio de lo que ahora es nuestro país. Emplea alguno de estos sistemas para ubicar en el espacio y en el tiempo aspectos de la vida cotidiana de los pueblos antiguos que surgieron en Mesoamérica, Aridoamérica y Oasisamérica. Vincula y compara sus representaciones e ideas sobre el nacimiento, la vida o la muerte con las que construyeron los antiguos pueblos de México. Pone en juego su capacidad de convertirse en integrante de una cultura mesoamericana para exponer la razón y el sentido de los sacrificios rituales. Desarrolla teóricamente el entramado de causas de diverso tipo que dieron lugar a la agricultura mesoamericana y el impacto civilizatorio de ésta en las sociedades que la practicaron. Reconoce el significado en su vida de la práctica histórica del cultivo del maíz como unaconsecuencia de larga duración. Reconstruye aspectos de la vida cotidiana en los ámbitos de la economía, la cultura, sociedad y la política de los pueblos de Mesoamérica. Recopila información histórica sobre los pueblos aridoamericanos y oasisamericanos y la organiza en un friso cronológico. Compara el desarrollo histórico de pueblos originarios de Norteamérica y Sudamérica y comprende sus semejanzas y diferencias.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_725",
    "contenido": "Movilidades humanas, migraciones y nuevos escenarios para la vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_725_1",
        "descripcion": "Comprende procesos históricos relevantes en los que grupos humanos se desplazaron por los territorios a lo largo del tiempo. Explica procesos históricos relevantes en los que grupos humanos se desplazaron por territorios en periodos de tiempo de corta o larga duración",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "1° de Secundaria",
    "contenido_id": "CONT_SB_726",
    "contenido": "Relaciones de poder y lucha por los derechos de grupos históricamente discriminados o subrepresentados.",
    "pdas": [
      {
        "pda_id": "PDA_SB_726_1",
        "descripcion": "Identifica las problemáticas de violencia hacia pueblos originarios, afrodescendientes, migrantes y comunidad LGBTTTQ+ en distintos procesos históricos. Argumenta sobre los cambios y permanencias en la lucha por erradicar la violencia hacia pueblos originarios, afrodescendientes, migrantes y comunidad LGBTTTQ+ en distintos procesos históricos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_727",
    "contenido": "Comunicación y representación técnica.",
    "pdas": [
      {
        "pda_id": "PDA_SB_727_1",
        "descripcion": "Elabora representaciones gráficas de sus ideas con respecto a la operación, funcionamiento y diseño de las producciones técnicas, para ampliar las posibilidades de comunicación.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_728",
    "contenido": "Evaluación de sistemas tecnológicos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_728_1",
        "descripcion": "Analiza las implicaciones de los procesos, productos o servicios en la naturaleza y la sociedad, para desarrollar sistemas técnicos sustentables.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_729",
    "contenido": "Factores que inciden en los procesos técnicos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_729_1",
        "descripcion": "Analiza factores sociales, económicos, culturales y naturales a tomar en cuenta en la definición de criterios para el desarrollo de soluciones técnicas que mejoran la calidad de vida.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_730",
    "contenido": "Herramientas, máquinas e instrumentos, como extensión corporal, en la satisfacción continua de intereses y necesidades humanas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_730_1",
        "descripcion": "Analiza las herramientas, máquinas, instrumentos y formas de organización, como una extensión de las posibilidades corporales para solucionar problemas en diversos contextos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_731",
    "contenido": "Materiales, procesos técnicos y comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_731_1",
        "descripcion": "Explora el uso y transformación de los materiales, de acuerdo con sus características en los procesos técnicos de distintas comunidades, para prevenir daños sociales o a la naturaleza.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_732",
    "contenido": "Pensamiento estratégico y creativo en la resolución de problemas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_732_1",
        "descripcion": "Planifica y organiza acciones, medios técnicos e insumos, para el desarrollo de alternativas de solución a diversos problemas identificados.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_733",
    "contenido": "Procesos técnicos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_733_1",
        "descripcion": "Analiza los diferentes sistemas técnicos: artesanales, industriales y automatizados para reconocer sus características y procesos, además de su vínculo con la ciencia, la sociedad, la cultura, la economía y la naturaleza.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_735",
    "contenido": "Usos e implicaciones de la energía en los procesos técnicos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_735_1",
        "descripcion": "Explora las principales fuentes de energía en los procesos técnicos para su uso óptimo, así como las alternativas de prevención de riesgos personales, sociales y naturales.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tutoría / Educación Socioemocional",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_736",
    "contenido": "Construcción del proyecto de vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_736_1",
        "descripcion": "Analiza intereses y necesidades, así como logros y metas personales y compartidas de acuerdo con conocimientos, capacidades y habilidades desarrolladas hasta el momento para proponer ideas acerca de un proyecto de vida personal. Replantea sus metas a partir del análisis de logros y situaciones afrontadas para favorecer el bienestar personal y comunitario.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tutoría / Educación Socioemocional",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_737",
    "contenido": "Educación integral en Sexualidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_737_1",
        "descripcion": "Valora la identidad y la diversidad de formas de expresión de género para comprender la manera en que favorece la interacción con las personas y el desarrollo integral.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tutoría / Educación Socioemocional",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_738",
    "contenido": "Formas de ser, pensar, actuar y relacionarse",
    "pdas": [
      {
        "pda_id": "PDA_SB_738_1",
        "descripcion": "Analiza las formas de ser, pensar, actuar e interactuar, para comprender las diversas maneras de vivenciar situaciones cotidianas y lograr el bienestar personal y social.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tutoría / Educación Socioemocional",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_739",
    "contenido": "Los sentimientos y su influencia en la toma de decisiones.",
    "pdas": [
      {
        "pda_id": "PDA_SB_739_1",
        "descripcion": "Reflexiona sobre cómo los sentimientos se construyen a partir de ideas y experiencias, para la toma de decisiones asertivas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tutoría / Educación Socioemocional",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_740",
    "contenido": "Prevención de sistuaciones de riesgo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_740_1",
        "descripcion": "Participa en la construcción de alternativas personales, familiares y comunitarias, que favorezcan la prevención de situaciones de riesgo ante accidentes, adicciones, formas de violencia y fenómenos naturales, para lograr el bien común.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_743",
    "contenido": "Creaciones artísticas que tienen su origen en textos literarios.",
    "pdas": [
      {
        "pda_id": "PDA_SB_743_1",
        "descripcion": "Adapta textos literarios provenientes de culturas indígenas o afrodescendientes, experimentando con elementos de las artes y recursos estéticos como la repetición, ritmo, armonía, contraste y variación, para sensibilizar a la comunidad sobre las formas de expresión de los pueblos originarios.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_744",
    "contenido": "Diversidad de lenguajes artísticos en la riqueza pluricultural de México y del mundo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_744_1",
        "descripcion": "Explora la creación de secuencias y patrones al identificar el uso de formas, colores, movimientos y sonidos, entre otros elementos de las artes, en manifestaciones artísticas de México y del mundo, para apreciar la riqueza pluricultural.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_745",
    "contenido": "Elementos de las artes y recursos estéticos apreciados en el entorno natural y social, así como en diversas manifestaciones artísticas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_745_1",
        "descripcion": "Analiza el uso intencional de elementos de las artes y recursos estéticos como ritmo, repetición, armonía, contraste y variación, en manifestaciones artísticas, para emplearlos en una creación personal. Reinterpreta los sentidos y significados de las cualidades estéticas del entorno natural y social en creaciones artísticas personales.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_746",
    "contenido": "Expresión artística de sensaciones, emociones, sentimientos e ideas, a partir de experiencias familiares, escolares o comunitarias.",
    "pdas": [
      {
        "pda_id": "PDA_SB_746_1",
        "descripcion": "Explora con técnicas artísticas y elige una para apreciar, simbolizar y compartir sensaciones, emociones, sentimientos e ideas relacionados con el entorno escolar.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_747",
    "contenido": "Identidad y sentido de pertenencia en manifestaciones artísticas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_747_1",
        "descripcion": "Reflexiona sobre la manera en que las artes fortalecen la identidad, dan sentido de pertenencia y resultan esenciales para favorecer la interculturalidad crítica.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_748",
    "contenido": "Los lenguajes artísticos en la expresión de problemas de lacomunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_748_1",
        "descripcion": "Investiga propuestas artísticas colectivas de entornos rurales y urbanos a favor de la inclusión, para presentar una postura crítica sobre un problema de la comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_749",
    "contenido": "Manifestaciones artísticas que emplean sistemas alternativos y aumentativos de comunicación, elaboradas por personas en condición de discapacidad y/o diseñadas para ellas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_749_1",
        "descripcion": "Aprecia y reflexiona acerca del uso de sistemas alternativos y aumentativos en manifestaciones artísticas diseñadas para personas en condición de discapacidad, a fin de favorecer el tránsito a una sociedad incluyente.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_750",
    "contenido": "Manifestaciones culturales y artísticas que conforman la diversidad étnica, cultural y lingüística.",
    "pdas": [
      {
        "pda_id": "PDA_SB_750_1",
        "descripcion": "Compara el uso de formas, colores, movimientos, sonidos, entre otros elementos de las artes, en manifestaciones culturales y artísticas de diferentes épocas y orígenes culturales, para fomentar una sociedad intercultural.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_751",
    "contenido": "Memoria colectiva representada por medios artísticos, para registrar experiencias comunitarias.",
    "pdas": [
      {
        "pda_id": "PDA_SB_751_1",
        "descripcion": "Reinterpreta, mediante características de algunos géneros artísticos, un acontecimiento familiar, escolar o comunitario significativo de la memoria colectiva.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_752",
    "contenido": "Patrimonio cultural de la comunidad en manifestaciones artísticas que fomentan la identidad y el sentido de pertenencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_752_1",
        "descripcion": "Expresa, mediante lenguajes artísticos, la relevancia de valorar, conservar y preservar el patrimonio cultural, como legado que le otorga identidad y sentido de pertenencia.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_753",
    "contenido": "Procesos creativos que ponen en práctica la comunicación dialógica, como estrategia para erradicar expresiones de violencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_753_1",
        "descripcion": "Imagina y comparte propuestas artísticas de acción para contribuir en la erradicación de la violencia en la familia, escuela y comunidad, haciendo uso de una comunicación abierta, respetuosa y empática con la diversidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_754",
    "contenido": "Sistemas alternativos y aumentativos de comunicación, como herramientas creativas que favorecen la inclusión.",
    "pdas": [
      {
        "pda_id": "PDA_SB_754_1",
        "descripcion": "Experimenta con sistemas alternativos y aumentativos de comunicación al usar artísticamente el cuerpo, espacio, tiempo, entre otros elementos de las artes, en una propuesta comunitaria que visibilice la diversidad y fomente la inclusión social.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_755",
    "contenido": "Valor estético de la naturaleza, de la vida cotidiana y de diferentes manifestaciones culturales y artísticas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_755_1",
        "descripcion": "Investiga diversas manifestaciones culturales y artísticas, para expresar un juicio estético y lo difunde en la comunidad escolar. Emite un juicio estético sobre un episodio significativo de la vida cotidiana y lo difunde en la comunidad escolar.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_756",
    "contenido": "Vida saludable expresada a través de mensajes construidos con elementos de las artes, para difundirlos por distintos medios de comunicación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_756_1",
        "descripcion": "Crea mensajes que promuevan una vida saludable, utilizando artísticamente formas, colores, movimientos y sonidos, entre otros elementos de las artes, para difundirlos por distintos medios de comunicación.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_757",
    "contenido": "Comunicación asertiva y dialógica para erradicar expresiones de violencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_757_1",
        "descripcion": "Participa en un debate acerca de algunas expresiones de violencia —como la de género—presentes en las familias y la escuela, para argumentar una postura de rechazo. Elabora invitaciones a expertos y redacta oficios de gestión para obtener recursos y espacios donde tendrá lugar el encuentro.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_758",
    "contenido": "Creaciones literarias tradicionales y contemporáneas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_758_1",
        "descripcion": "Valora textos literarios tradicionales y contemporáneos, como cuentos, novelas, poemas, textos dramáticos; los adapta a otros lenguajes para sensibilizar a la comunidad acerca de la relevancia social y cultural de la literatura.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_760",
    "contenido": "El dinamismo de las lenguas y su relevancia como patrimonio cultural.",
    "pdas": [
      {
        "pda_id": "PDA_SB_760_1",
        "descripcion": "Reconoce cambios temporales y geográficos del español en la comunidad, país o mundo hispano.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_761",
    "contenido": "La diversidad de lenguas y su uso en la comunicación familiar, escolar y comunitaria.",
    "pdas": [
      {
        "pda_id": "PDA_SB_761_1",
        "descripcion": "Comprende las características y recursos lingüísticos de la lengua española, para usarlos y valorarlos como parte de la riqueza pluricultural de México y del mundo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_762",
    "contenido": "La diversidad étnica, cultural y lingüística de México a favor de una sociedad intercultural.",
    "pdas": [
      {
        "pda_id": "PDA_SB_762_1",
        "descripcion": "Compara y contrasta textos sobre las tensiones y conflictos en las sociedades contemporáneas y manifiesta, de manera oral o escrita, la necesidad de practicar la comunicación asertiva. Analiza textos sobre las sociedades multiculturales y manifiesta la función que tiene el diálogo intercultural para la construcción democrática y la interacción en sociedad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_763",
    "contenido": "La función creativa del español en la expresión de necesidades e intereses comunitarios.",
    "pdas": [
      {
        "pda_id": "PDA_SB_763_1",
        "descripcion": "Expresa, mediante un ensayo, una postura crítica sobre necesidades, intereses y problemas de la comunidad, e investiga acciones colectivas a favor de la inclusión.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_764",
    "contenido": "Las lenguas como manifestación de la identidad y del sentido de pertenencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_764_1",
        "descripcion": "Comprende y redacta textos narrativos sobre la construcción de la identidad y el sentido de pertenencia, a partir del análisis de variantes del español.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_765",
    "contenido": "Los elementos y los recursos estéticos de la lengua española en la literatura oral y escrita.",
    "pdas": [
      {
        "pda_id": "PDA_SB_765_1",
        "descripcion": "Analiza las características y recursos estéticos de los textos narrativos, e interpreta y disfruta de cuentos y novelas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_766",
    "contenido": "Los géneros periodísticos y sus recursos para comunicar sucesos significativos familiares, escolares, comunitarios y sociales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_766_1",
        "descripcion": "Investiga un evento familiar, escolar o comunitario significativo de la memoria colectiva, para comunicarlo utilizando las características de los géneros periodísticos de opinión.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_767",
    "contenido": "Manifestaciones culturales y artísticas que favorecen una sociedad incluyente.",
    "pdas": [
      {
        "pda_id": "PDA_SB_767_1",
        "descripcion": "Elabora un texto oral o escrito acerca de las manifestaciones culturales y artísticas, que promuevan una sociedad incluyente.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_768",
    "contenido": "Mensajes para promover una vida saludable, expresados en medios comunitarios o masivos de comunicación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_768_1",
        "descripcion": "Elabora un mensaje impreso empleando imágenes, textos, colores y otros recursos gráficos para favorecer una vida saludable y lo comparte en la comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_769",
    "contenido": "Recursos literarios en lengua española para expresar sensaciones, emociones, sentimientos e ideas vinculados con las familias, la escuela y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_769_1",
        "descripcion": "Analiza recursos literarios en lengua española, para expresar sensaciones, emociones, sentimientos e ideas al elaborar una autobiografía con respecto a los vínculos consigo mismo y con el entorno familiar, escolar o comunitario.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_770",
    "contenido": "Textos de divulgación científica.",
    "pdas": [
      {
        "pda_id": "PDA_SB_770_1",
        "descripcion": "Analiza las características del texto de divulgación científica, para elaborar y dar a conocer diversos textos científicos orales o escritos, que traten sobre un tema de interés personal o colectivo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_771",
    "contenido": "Textos literarios escritos en español o traducidos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_771_1",
        "descripcion": "Analiza diversos textos literarios de su libre elección para expresar un juicio estético y lo comparte en la comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_772",
    "contenido": "Comunicación asertiva y dialógica en inglés, para sensibilizar sobre la erradicación de la violencia en las familias y la escuela.",
    "pdas": [
      {
        "pda_id": "PDA_SB_772_1",
        "descripcion": "Participa en un panel en inglés, sobre la importancia de la comunicación asertiva y dialógica, a fin de consensuar propuestas de acción para sensibilizar sobre la erradicación de la violencia en las familias y la escuela.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_773",
    "contenido": "Creaciones literarias tradicionales y contemporáneas en inglés.",
    "pdas": [
      {
        "pda_id": "PDA_SB_773_1",
        "descripcion": "Investiga en textos literarios en inglés sobre pueblos indígenas y/o afrodescendientes de México o el mundo. Elabora por escrito una apreciación sobre la relevancia y el valor social y cultural de los pueblos indígenas y/o afrodescendientes de México o el mundo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_774",
    "contenido": "El inglés para expresar sensaciones, emociones, sentimientos e ideas vinculados con las familias, la escuela y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_774_1",
        "descripcion": "Realiza entrevistas en inglés para recuperar opiniones acerca de emociones, sentimientos e ideas sobre la escuela y la comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_775",
    "contenido": "El uso del inglés en la construcción de mensajes a favor de la inclusión.",
    "pdas": [
      {
        "pda_id": "PDA_SB_775_1",
        "descripcion": "Analiza las características y recursos empleados en la comunicación asertiva en inglés, y sugiere su uso para favorecer una sociedad incluyente.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_776",
    "contenido": "El uso del inglés en las manifestaciones culturales y artísticas que favorecen la construcción de una sociedad incluyente",
    "pdas": [
      {
        "pda_id": "PDA_SB_776_1",
        "descripcion": "Investiga, reflexiona y expone en inglés acerca de los sistemas alternativos y aumentativos, que favorecen el tránsito a una sociedad incluyente.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_777",
    "contenido": "El uso del inglés para expresar necesidades, intereses y problemas de la comunidad",
    "pdas": [
      {
        "pda_id": "PDA_SB_777_1",
        "descripcion": "Elabora escritos argumentativos en inglés sobre acciones colectivas, que posibiliten la solución de problemas de una comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_778",
    "contenido": "Elementos y recursos estéticos del inglés.",
    "pdas": [
      {
        "pda_id": "PDA_SB_778_1",
        "descripcion": "Identifica y explica el uso de expresiones, elementos y recursos estéticos en manifestaciones culturales y artísticas de países de habla inglesa.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_780",
    "contenido": "La diversidad lingüística y sus formas de expresión en México y el mundo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_780_1",
        "descripcion": "Comprende textos narrativos y biográficos en inglés sobre la vida cotidiana, formas de interacción y comportamiento de hablantes de diversas lenguas de México y el mundo en el pasado, y lo expresa en organizadores gráficos , infografías y otras formas de presentación escrita y oral",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_781",
    "contenido": "La identidad y cultura de pueblos de habla inglesa.",
    "pdas": [
      {
        "pda_id": "PDA_SB_781_1",
        "descripcion": "Elabora fichas informativas eninglés, sobre rasgos identitarios de pueblos de habla inglesa (acento, grafía, vestimenta, comida, tradiciones, costumbres, entre otros).",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_782",
    "contenido": "Las manifestaciones culturales, lingüísticas y artísticas en inglés, a favor de la interculturalidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_782_1",
        "descripcion": "Interpreta juegos de roles en inglés, sobre situaciones que favorezcan la comunicación asertiva.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_783",
    "contenido": "Manifestaciones artísticas y culturales del inglés.",
    "pdas": [
      {
        "pda_id": "PDA_SB_783_1",
        "descripcion": "Selecciona alguna manifestación artística o cultural y la difunde en inglés, mediante diversos elementos y recursos artísticos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_784",
    "contenido": "Mensajes en inglés en medios de comunicación masiva, que promuevan una vida saludable.",
    "pdas": [
      {
        "pda_id": "PDA_SB_784_1",
        "descripcion": "Investiga en diversas fuentes en inglés sobre una vida saludable, para construir un texto informativo y difundirlo a través de medios de comunicación.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_785",
    "contenido": "Relatos en inglés para expresa sucesos significativos familiares, escolares, comunitarios y sociales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_785_1",
        "descripcion": "Investiga un acontecimiento familiar, escolar o comunitario significativo, recuperado de la memoria colectiva, para redactar una reflexión en inglés.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_786",
    "contenido": "Uso de diversos textos en inglés que promueven la preservación y conservación de las lenguas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_786_1",
        "descripcion": "Indaga y construye propuestas en inglés para conservar y preservar las lenguas, como el legado y sentido de pertenencia y las difunde por algún medio de comunicación.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_787",
    "contenido": "Capacidades, habilidades y destrezas motrices.",
    "pdas": [
      {
        "pda_id": "PDA_SB_787_1",
        "descripcion": "Integra sus capacidades, habilidades y destrezas motrices, para poner a prueba el potencial individual y de conjunto.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_788",
    "contenido": "Composición del Universo y el Sistema Solar.",
    "pdas": [
      {
        "pda_id": "PDA_SB_788_1",
        "descripcion": "Indaga algunos avances recientes en la comprensión sobre la evolución del Universo y su composición. Indaga cómo se lleva a cabo la exploración de los cuerpos celestes, por medio de la detección y procesamiento de las ondas electromagnéticas que emiten. Relaciona e interpreta las características y dinámica del Sistema Solar con la gravitación y el movimiento de los planetas, en particular el caso de la Tierra y la Luna.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_789",
    "contenido": "E. FÍSICA",
    "pdas": [
      {
        "pda_id": "PDA_SB_789_1",
        "descripcion": "2° GRADO",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_790",
    "contenido": "El pensamiento científico, una forma de plantear y solucionar problemas y su incidencia en la transformación de la sociedad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_790_1",
        "descripcion": "Describe problemas comunes de la vida cotidiana explicando cómo se procede para buscarles solución, conoce y caracteriza el pensamiento científico para plantearse y resolver problemas en la escuela y su cotidianeidad. Indaga en diferentes fuentes de consulta las aportaciones de mujeres y hombres en el desarrollo de la Física y su contribución al conocimiento científico y tecnológico a nivel nacional e internacional para valorar su influencia en la sociedad actual.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_791",
    "contenido": "Estados de agregación de la materia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_791_1",
        "descripcion": "Experimenta e interpreta los modelos atómicos y de partículas al proponer hipótesis que expliquen los tres estados de la materia, sus propiedades físicas como la temperatura de fusión, ebullición, densidad, entre otros. Interpreta la temperatura y el equilibrio térmico con base en el modelo de partículas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_792",
    "contenido": "Estilos de vida activos y saludables.",
    "pdas": [
      {
        "pda_id": "PDA_SB_792_1",
        "descripcion": "Reflexiona acerca de los factores que afectan la práctica sistemática de la actividad física, para proponer acciones que contribuyan a modificarlos o eliminarlos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_793",
    "contenido": "Estructura, propiedades y características de la materia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_793_1",
        "descripcion": "Indaga sobre los saberes y prácticas del uso de materiales y sus propiedades y características para construcción, vestimenta, artefactos de uso común. Relaciona e interpreta las teorías sobre estructura de la materia, a partir de los modelos atómicos y de partículas y los fenómenos que les dieron origen. Explora algunos avances recientes en la comprensión de la constitución de la materia y reconoce el proceso histórico de construcción de nuevas teorías.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_794",
    "contenido": "Fenómenos, procesos y factores asociados al cambio climático.",
    "pdas": [
      {
        "pda_id": "PDA_SB_794_1",
        "descripcion": "Formula hipótesis que relacionan la actividad humana con el aumento de temperatura en el planeta y la emisión de gases de efecto invernadero; diferencia entre calos radiación y temperatura al explicar los procesos que lo originan. Diferencia entre calor, radiación y temperatura al explicar los procesos que originan el efecto invernadero. Explica cómo la emisión de ciertos gases contribuye al efecto invernadero. Indaga sobre fenómenos que, a su vez, dan lugar a fenómenos meteorológicos extremos como olas de calor, ciclones tropicales, sequías y lluvias torrenciales, representa y explica su distribución en el mundo. Propone medidas de mitigación y adaptación, encaminadas al cuidado del medio ambiente y el bienestar común, viables para su aplicación en su escuela y comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_796",
    "contenido": "Interacciones de la electricidad y el magnetismo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_796_1",
        "descripcion": "Experimenta e interpreta algunas manifestaciones y aplicaciones de la electricidad, e identifica los cuidados que requiere su uso al revisar los protocolos de seguridad. Relaciona e interpreta fenómenos comunes del magnetismo y experimenta con la interacción entre imanes. Experimenta e interpreta el comportamiento de la luz como resultado de la interacción entre electricidad y magnetismo. Explica el funcionamiento de aparatos tecnológicos de comunicación, a partir de las ondas electromagnéticas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_797",
    "contenido": "Interacciones en fenómenos relacionados con la fuerza y el movimiento.",
    "pdas": [
      {
        "pda_id": "PDA_SB_797_1",
        "descripcion": "Experimenta e interpreta las interacciones de la fuerza y el movimiento, relacionados con las Leyes de Newton para explicar actividades cotidianas. Identifica los elementos y los diferentes tipos de movimiento relacionados con la velocidad y aceleración y realiza experimentos sencillos. Identifica y describe la presencia de fuerzas en interacciones cotidianas (fricción, fuerzas en equilibrio).",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_798",
    "contenido": "Interacción motriz.",
    "pdas": [
      {
        "pda_id": "PDA_SB_798_1",
        "descripcion": "Toma decisiones a favor de la participación colectiva en situaciones de iniciación deportiva y deporte educativo, para promover ambientes de aprendizaje y actitudes asertivas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_799",
    "contenido": "Pensamiento lúdico, estratégico y creativo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_799_1",
        "descripcion": "Valora las estrategias de juego que utiliza, ante distintas condiciones que se presentan, para reestructurarlas e incrementar su efectividad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_800",
    "contenido": "Potencialidades cognitivas, expresivas, motrices, creativas y de relación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_800_1",
        "descripcion": "Analiza el incremento de su condición física, al participar en actividades recreativas, de iniciación deportiva y deporte educativo, para reflexionar acerca de su relación con el bienestar.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_801",
    "contenido": "Principios de Pascal y de Arquímedes.",
    "pdas": [
      {
        "pda_id": "PDA_SB_801_1",
        "descripcion": "Experimenta e interpreta las interacciones de la fuerza y el movimiento relacionados con los principios de Pascal y de Arquímedes, para explicar actividades cotidianas. Identifica algunos dispositivos de uso cotidiano, en dónde se aplica el Principio de Pascal (sistemas de frenos hidráulicos, elevadores y gatos hidraúlicos) y de Arquímedes (flotación de barcos, submarinos y globos aerostáticos entre otros); colabora en equipo para proponer actividades experimentales y resolver problemas sencillos relativos a las propiedades de fluidos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_802",
    "contenido": "Saberes y prácticas para el aprovechamiento de energías y la sustentabilidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_802_1",
        "descripcion": "Analiza las características de la energía mecánica (cinética y potencial) y describe casos donde se conserva. Relaciona al calor como una forma de energía y describe los motores que funcionan con energía calorífica, los efectos del calor disipado, los gases expelidos y valora sus efectos en la atmósfera. Identifica saberes, prácticas y artefactos sobre el aprovechamiento de las diversas formas de energía renovables y no renovables, su empleo y origen en su comunidad (solar, eólica, hidráulica, geológica, mareomotriz, nuclear) y valora sus beneficios. Realiza experimentos en donde se aproveche la energía del sol ya sea considerando las propiedades de la luz (energía solar) o las de la materia (convección).",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_803",
    "contenido": "Unidades y medidas utilizados en Física.",
    "pdas": [
      {
        "pda_id": "PDA_SB_803_1",
        "descripcion": "Identifica las unidades de medición que se ocupan en su entorno escolar, familiar y en su comunidad. Identifica cuáles son, cómo se definen y cuál es la simbología de las unidades básicas y derivadas del Sistema Internacional de Unidades. Conoce los instrumentos de medición. y realiza conversiones con los múltiplos y submúltiplos al referirse a una magnitud.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_804",
    "contenido": "Azar y probabilidad",
    "pdas": [
      {
        "pda_id": "PDA_SB_804_1",
        "descripcion": "Realiza experimentos aleatorios y registra los resultados en una tabla de frecuencia como la transición de la probabilidad frecuencial a la teórica. Analiza las características de la medición de probabilidad y su equivalencia y representación en números decimales, fraccionarios y porcentajes.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_805",
    "contenido": "Circunferencia, círculo y esfera.",
    "pdas": [
      {
        "pda_id": "PDA_SB_805_1",
        "descripcion": "Determina la medidad de ángulos inscritos y centrales, así como de arcos de circunferencia. Explora las intersecciones entre círculos y figuras al calcular perímetros y áreas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_806",
    "contenido": "Construcción y propiedades de las figuras planas y cuerpos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_806_1",
        "descripcion": "Construye con regla y compás polígonos regulares con distinta información. Identifica y usa las relaciones entre figuras en la construcción de teselados.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_807",
    "contenido": "Ecuaciones lineales y cuadráticas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_807_1",
        "descripcion": "Resuelve desigualdades con expresiones algebraicas. Modela y soluciona sistemas de dos ecuaciones lineales con dos incógnitas por algún método para dar respuesta a un problema.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_808",
    "contenido": "Extensión del significado de las operaciones y sus relaciones inversas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_808_1",
        "descripcion": "Usa la notación cientifica al realizar cálculos con cantidades muy grandes o muy pequeñas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_809",
    "contenido": "Funciones.",
    "pdas": [
      {
        "pda_id": "PDA_SB_809_1",
        "descripcion": "Relaciona e interpreta la proporcionalidad inversa de dos magnitudes o cantidades, además usa una tabla, gráfica o representación algebraica en diversos contextos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_810",
    "contenido": "Interpretación de la información a través de medidas de tendencia central y de dispersión.",
    "pdas": [
      {
        "pda_id": "PDA_SB_810_1",
        "descripcion": "Usa e interpreta las medidas de tendencia central (moda, media aritmética y mediana) y de dispersión (rango y la desviación media) de un conjunto de datos, y justifica con base en ellas sus decisiones. Identifica tendencias en los datos centrándose en sus valores representativos y sus variaciones.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_811",
    "contenido": "Introducción al álgebra.",
    "pdas": [
      {
        "pda_id": "PDA_SB_811_1",
        "descripcion": "Representa algebraicamente áreas que generan una expresión cuadrática. Identifica y usa las propiedades de los exponentes al resolver distintas operaciones algebraicas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_813",
    "contenido": "Medición y cálculo en diferentes contextos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_813_1",
        "descripcion": "Resuelve problemas que implican conversiones en múltiplos y submúltiplos del metro, litro, kilogramo y de unidades del sistema inglés (yarda, pulgada, galón, onza y libra). Utiliza estrategias diversas para determinar el perímetro y el área de figuras compuestas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_814",
    "contenido": "Obtención y representación de información.",
    "pdas": [
      {
        "pda_id": "PDA_SB_814_1",
        "descripcion": "Recolecta, registra, lee y comunica información mediante histogramas, gráficas poligonales y de línea.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_815",
    "contenido": "Rectas y ángulos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_815_1",
        "descripcion": "Identifica y usa las relaciones entre los ángulos, lados y diagonales para construir a escala triángulos, cuadriláteros y polígonos regulares o irregulares.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_816",
    "contenido": "Regularidades y Patrones.",
    "pdas": [
      {
        "pda_id": "PDA_SB_816_1",
        "descripcion": "Representa algebraicamente una sucesión con progresión cuadrática de figuras y números.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_817",
    "contenido": "Consecuencias de la desigualdad en la calidad de vida de las personas y comunidades.",
    "pdas": [
      {
        "pda_id": "PDA_SB_817_1",
        "descripcion": "Explica las consecuencias de la desigualdad socioeconómica en la calidad de vida de la población y propone acciones que garanticen el derecho a una vida digna y justa.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_818",
    "contenido": "Defensa del derecho al acceso a la protección de datos personales, a la información, la transparencia y la rendición de cuentas en un gobierno democrático.",
    "pdas": [
      {
        "pda_id": "PDA_SB_818_1",
        "descripcion": "Aprecia la participación ciudadana para exigir a las autoridades que cumplan sus¿ funciones y administren los recursos públicos con honestidad, transparencia y legalidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_819",
    "contenido": "El conflicto en la convivencia humana desde la cultura de paz.",
    "pdas": [
      {
        "pda_id": "PDA_SB_819_1",
        "descripcion": "Propone distintas formas de resolver conflictos sociales y políticos ocurridos en México y América Latina, para generar estrategias de mediación desde la cultura de paz.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_820",
    "contenido": "El derecho a la salud y la prevención en el consumo de drogas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_820_1",
        "descripcion": "Promueve valores y habilidades para desarrollar la autoestima, la autorregulación, el autocuidado y la asertividad para prevenir el consumo de drogas y demanda el derecho a la salud integral.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_822",
    "contenido": "Grupos sociales y culturales en la conformación de las identidades juveniles.",
    "pdas": [
      {
        "pda_id": "PDA_SB_822_1",
        "descripcion": "Argumenta sobre el derecho a pertenecer a una cultura, grupo social, económico, ideológico, sexual o de género, entre otros, para exigir el respeto a las identidades juveniles.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_823",
    "contenido": "Igualdad sustantiva en el marco de la interculturalidad, la inclusión y la perspectiva de género.",
    "pdas": [
      {
        "pda_id": "PDA_SB_823_1",
        "descripcion": "Elabora juicios éticos sobre problemas de injusticia y discriminación que afectan la igualdad sustantiva y realiza propuestas congruentes con el respeto a la inclusión, la interculturalidad y la perspectiva de género.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_824",
    "contenido": "Instituciones, organizaciones y mecanismos de representación democrática.",
    "pdas": [
      {
        "pda_id": "PDA_SB_824_1",
        "descripcion": "Destaca la importancia de la participación ciudadana, organizaciones sociales y partidos políticos en México, para evaluar los alcances y límites del gobierno democrático.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_825",
    "contenido": "La cultura de paz y la creación de ambientes que garanticen el respeto a la vida y la dignidad del ser humano.",
    "pdas": [
      {
        "pda_id": "PDA_SB_825_1",
        "descripcion": "Aplica la cultura de paz para tomar decisiones responsables en contextos presenciales y virtuales que promuevan el respeto a la dignidad, la diversidad, la inclusión y la interculturalidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_826",
    "contenido": "Los derechos humanos en México y en el mundo como valores compartidos por las sociedades actuales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_826_1",
        "descripcion": "Propone acciones orientadas a fortalecer la igualdad de derechos, el bienestar colectivo y el respeto a la dignidad humana en poblaciones históricamente marginadas y vulneradas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_827",
    "contenido": "Medidas de protección y mecanismos de denuncia en el rechazo a la violencia de género, sexual y la trata de personas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_827_1",
        "descripcion": "Compara los tipos de violencia escolar, de género y la trata de personas e identifica medidas de protección y mecanismos de denuncia, así como acciones de organizaciones e instituciones que buscan garantizar el derecho a una vida libre de violencia.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_828",
    "contenido": "Movimientos sociales y políticos por los derechos humanos en el mundo y en México.",
    "pdas": [
      {
        "pda_id": "PDA_SB_828_1",
        "descripcion": "Explica la trascendencia de los movimientos sociales y políticos en México y América Latina, para garantizarel ejercicio de los derechos económicos, políticos y sociales de las personas y sociedades.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_829",
    "contenido": "Normas, leyes, instituciones y organizaciones encargadas de proteger, defender y exigir la aplicación de los derechos humanos en la convivencia diaria.",
    "pdas": [
      {
        "pda_id": "PDA_SB_829_1",
        "descripcion": "Participa en la creación y transformación de normas y leyes que aplican en distintos contextos, orientadas a favorecer la igualdad, la libertad, la justicia y los derechos humanos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_830",
    "contenido": "Personas, grupos y organizaciones a favor de la cultura de paz.",
    "pdas": [
      {
        "pda_id": "PDA_SB_830_1",
        "descripcion": "Analiza las acciones de personas grupos u organizaciones realizadas en México y América Latina para promover actitudes, valores y comportamientos basados en una cultura de paz.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_831",
    "contenido": "Principios y valores de la cultura democrática como forma de gobierno y de vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_831_1",
        "descripcion": "Propone acciones para fortalecer en su entorno los rasgos del Estado de derecho democrático como el imperio de la ley, la división de poderes, los contrapesos de poder y el respeto a los derechos humanos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_832",
    "contenido": "Principios éticos como referente para un desarrollo sustentable.",
    "pdas": [
      {
        "pda_id": "PDA_SB_832_1",
        "descripcion": "Evalúa la contribución de la ética en las prácticas de producción, distribución y consumo de bienes y servicios, para generar alternativas de desarrollo sustentables.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_833",
    "contenido": "Proyectos como un recurso para atender problemáticas de la comunidad desde una ciudadanía democrática.",
    "pdas": [
      {
        "pda_id": "PDA_SB_833_1",
        "descripcion": "Elabora proyectos orientados a resolver necesidades y problemas relacionados con la violencia escolar y de género, aprovechando los recursos de la ciudadanía digital.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_835",
    "contenido": "La conformación de las metrópolis y los sistemas de dominación",
    "pdas": [
      {
        "pda_id": "PDA_SB_835_1",
        "descripcion": "Indaga acerca del desarrollo del comercio y su impacto en la geografía y la navegación en Europa y Asia en el Siglo XV. Explica la consolidación del reino español alrededor de Isabel I de Castilla y Fernando II de Aragón como personajes históricos en este proceso. Busca información acerca de la expedición de 1492 de Cristóbal Colón y el descubrimiento de América. Revisa desde una perspectiva fundada en valores universales, como la libertad, la justicia, el respeto y la tolerancia, el contenido de las Bulas Alejandrinas y el Tratado de Tordesillas. Registra y extrae conclusiones con respecto al arribo de los españoles al nuevo mundo y la colonización de las Antillas. Indaga acerca de las tensiones y alianzas políticas entre los señoríos mesoamericanos, previo al arribo de los colonizadores españoles al territorio de lo que hoy es nuestro país. Revisa y contextualiza las campañas militares que Hernán Cortés llevo a cabo para someter a la población indígena. Problematiza sobre los factores políticos, económicos, culturales, tecnológicos, militares, religiosos que predominaban en los pueblos indígenas en el momento de su enfrentamiento con los españoles. Elabora teorías de posibles desenlaces a partir de una articulación diferente de los factores que se conjugaron en este evento histórico. Ubica a la conquista como un momento de ruptura en la Historia de nuestro país que generó cambios en la sociedad y en la vida cotidiana de las personas. Describe las formas de exacción a las que fueron sometidos la población y los territorios indígenas con el establecimiento del Virreinato de la Nueva España. Identifica elementos de las culturas indígenas que persistieron en la época colonial dentro del proceso de cohesión política de nuestro país. Problematiza el interés de la corona española en el desarrollo e intensificación de la minería en la Nueva España. Distingue las características de la forma de gobierno, la economía, la cultura y la sociedad en la Nueva España. Reflexiona y emite su opinión acerca del uso del trabajo esclavo de africanos y afrodescendientes en la Nueva España. Reflexiona en las implicaciones sociales del sistema de castas que se estableció en la sociedad novohispana.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_836",
    "contenido": "Las gestas de resistencia y los movimientos independentistas",
    "pdas": [
      {
        "pda_id": "PDA_SB_836_1",
        "descripcion": "Relaciona la revolución de independencia de 1810 en nuestro país con el agotamiento del imperio español para mantener la cohesión de sus colonias ultramarinas. Comprende la confluencia de procesos (p. ej. las reformas borbónicas) y hechos (p. ej. la invasión napoleónica en España) en la configuración de la lucha por la independencia de la Nueva España. Aplica conceptos organizadores para dar cuenta de las etapas en que se desarrolló la lucha por la Independencia de la Nueva España. Identifica los cambios de ritmo y de dirección en las diferentes etapas de la lucha por la Independencia de la Nueva España y teoriza al respecto. Reconoce la impronta que la participación popular o la ausencia de ésta le dio a la lucha por la independencia. Caracteriza la consumación de la independencia y el surgimiento del Primer Imperio. Comprende al acontecimiento de la revolución de independencia como parte de un proceso de la formación de un Estado nacional. Analiza las tensiones entre federalistas y centralistas con el advenimiento de la república durante la primera mitad del siglo XIX. Explica la debilidad estructural de la joven república mexicana para para enfrentar el asedio de los Estados Unidos y Francia: Independencia de Texas, Primera Invasión Francesa e Invasión Estadounidense de 1846-1848.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_837",
    "contenido": "Las revoluciones modernas y sus tendencias",
    "pdas": [
      {
        "pda_id": "PDA_SB_837_1",
        "descripcion": "Establece las características y el contexto en que se desarrolla la dictadura de Antonio López de Santa Anna y obtiene conclusiones. Identifica causas y consecuencias de corta y larga duración de la Revolución de Ayutla de 1854. Analiza las Leyes de Reforma expedidas entre 1859 y 1861, opina sobre ellas y estima su valor en la actualidad. Problematiza la relación liberales-conservadores en este periodo de la historia de México. Elabora una cronología con los acontecimientos más importantes que sucedieron durante la Guerra de Reforma, incorpora la información necesaria para su comprensión puntual. Pone en juego su capacidad de convertirse en un liberal o en un conservador y se posiciona documentadamente. Demuestra la intervención interesada de gobiernos extranjeros en la vida interna de México en esta etapa de la historia (tratados McLaneOcampo y Mon-Almonte, Alianza Tripartita, Convención de Londres). Comprende la relevancia histórica de la Segunda Invasión Francesa para nuestra vida actual. Identifica desde su imaginario la relevancia histórica de la Batalla del 5 de mayo de 1962. Elabora una cronología con los acontecimientos más importantes que sucedieron durante la restauración de la república y porfiriato, incorpora la información necesaria para su comprensión puntual; identifica cambios y permanencias en ambos procesos y los puntos de nflexión. Genera interpretaciones del porfiriato a partir de comparar el desarrollo económico y el desarrollo social generados durante este periodo histórico. Elabora hipótesis que explican el trato que Porfirio Díaz dio a la oposición política, a la prensa, al movimiento campesino y obrero, a los pueblos indígenas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "2° de Secundaria",
    "contenido_id": "CONT_SB_838",
    "contenido": "Las tensiones en siglo XX",
    "pdas": [
      {
        "pda_id": "PDA_SB_838_1",
        "descripcion": "Analiza y comprende la causalidad de la revolución mexicana de 1910, identifica la heterogeneidad en su composición y demandas. Pondera las demandas sociales que la orientaron y la participación de los diferentes grupos sociales en su conducción en diferentes momentos. Diseña periodos espaciotemporales y los organiza cronológicamente para dar cuenta del proceso revolucionario. Construye narrativas de los personajes históricos, los reconoce como expresión identitaria de grupos sociales en particular. Analiza y caracteriza el suceso conocido como la Decena Trágica. Argumenta desde el presente la relevancia que tiene pasa su vida le Revolución Mexicana y sus aportes. Recaba información de los eventos relevantes de los gobiernos postrevolucionarios y caracteriza el periodo conocido como Maximato. Analiza las causas, el origen, el lugar y el tiempo de la rebelión cristera. Reúne información acerca de las principales políticas de gobierno de Lázaro Cárdenas (reforma agraria, intervención del estado en la economía, nacionalización de industrias, educación socialista, apoyos a campesinos, reorganización del movimiento obrero) y la utiliza para estructurar una narrativa. Vincula desde el tiempo cronológico las acciones concretas del gobierno cardenista (p. ej. la expropiación petrolera) y las relaciona con eventos pasados o simultáneos acerca del mismo tópico (p. ej. la expedición de la Ley del Petróleo del 24 de diciembre de 1901 que reconoce que los dueños de los predios pueden explotar hidrocarburos sin necesidad de concesión alguna) para dimensionar la cualidad del tiempo histórico. Ubica en el gobierno de Manuel Ávila Camacho el origen y las circunstancias de la política de unidad nacional, las contextualiza internacionalmente y reconoce en esta política un elemento para la institucionalización y legitimación del estado mexicano durante el siglo XX. Reúne información acerca de las prioridades que impulsó el gobierno de Miguel Alemán Valdés, la contrasta con las representaciones sociales contenidas en la obra fílmica de la época por Alejandro Galindo. Explica las características, las prioridades y los sucesos importantes de los gobiernos de la época del desarrollo estabilizador. Dimensiona el tiempo histórico (vincula hechos pasados o simultáneos con los que tiene relación) del derecho de las mujeres a votar y ser votadas en las elecciones de 1955. Reconoce los costos sociales del milagro mexicano y el autoritario y represor con el que actuó el estado mexicano ante las demandas del movimiento magisterial (1958), la huelga ferrocarrilera (1959) y el movimiento médico (1964-1965). Indaga acerca de la influencia de la revolución cubana en México y evidencia su impacto. Recupera información de crónicas y narrativas de participantes del movimiento estudiantil de 1968, la analiza y construye hipótesis propias sobre sus causas y consecuencias. Reflexiona a partir de su condición de estudiante en la perspectiva histórica de las y los jóvenes que participaron en este movimiento. Emite juicios acerca del trato y la respuesta que el gobierno de Gustavo Díaz Ordaz dio al movimiento estudiantil de 1968. Analiza y caracteriza de las políticas de los gobiernos del periodo de las crisis económicas 1970-1982, ubica y permanencias con relación a los gobiernos anteriores. Identifica cambios que incorporaron los gobiernos neoliberales 1982- 2000 en la política, la economía y la sociedad con respecto a las políticas de los gobiernos del nacionalismo revolucionario. Explica las causas y el contexto en que se instauró el neoliberalismo en México. Describe como el neoliberalismo implica progreso para algunos segmentos sociales y retroceso para otros, asume una posición desde sus condiciones de vida. Reconoce cómo se gestan formas de organización alternativa en un escenario dominado por políticas neoliberales: la respuesta solidaria de la gente después del sismo de 1985 y la articulación del movimiento urbano popular, la movilización popular después del proceso electoral de 1988, el movimiento magisterial de 1989. Revisa la evolución de la política del estado mexicano hacia los pueblos indígenas desde el exterminio y eldespojo (siglo XIX) hasta la integración y la cultura dominante del mestizaje (siglo XX). Resignifica, visibiliza yreconoce la presencia de los pueblos indígenas y asume prácticas de convivencias inclusivas e igualitarias. Comprende la noción de territorio y naturaleza que poseen los pueblos indígenas, así como sus demandas por la autonomía, el autogobierno y la democracia. Analiza y comprende las causas del levantamiento zapatista de 1994 en Chiapas y sus repercusiones en los ámbitos nacional e internacional.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_839",
    "contenido": "Comunicación y representación técnica.",
    "pdas": [
      {
        "pda_id": "PDA_SB_839_1",
        "descripcion": "Difunde por diversos medios el funcionamiento y operación de sus proyectos, para dar a conocer sus alcances a distintas personas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_840",
    "contenido": "Evaluación de sistemas tecnológicos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_840_1",
        "descripcion": "Participa en la evaluación interna y externa de sistemas tecnológicos para mejorar su eficiencia, eficacia, fiabilidad y factibilidad desde un enfoque sustentable.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_841",
    "contenido": "Factores que inciden en los procesos técnicos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_841_1",
        "descripcion": "Implementa técnicas,procesos o formas deorganización en la comunidad, para favorecer la equidad, igualdad, inclusión y la sustentabilidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_842",
    "contenido": "Herramientas, máquinas e instrumentos, como extensión corporal, en la satisfacción continua de intereses y necesidades humanas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_842_1",
        "descripcion": "Amplía sus posibilidades corporales por medio del conocimiento y habilidades en el manejo de herramientas, máquinas, instrumentos y formas de organización en procesos técnicos comunitarios, para favorecer la inclusión y la sustentabilidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_843",
    "contenido": "Materiales, procesos técnicos y comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_843_1",
        "descripcion": "Implementa alternativas a situaciones que, por el origen, transformación, uso o desecho de los materiales, ponen en riesgo el entorno de la comunidad, para favorecer el desarrollo sustentable.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_844",
    "contenido": "Pensamiento estratégico y creativo en la resolución de problemas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_844_1",
        "descripcion": "Implementa, da seguimiento y evalúa las propuestas conforme a los criterios y condiciones establecidas en un plan para satisfacer las necesidades o intereses identificados.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_845",
    "contenido": "Procesos técnicos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_845_1",
        "descripcion": "Propone e implementa posibles emprendimientos artesanales o fabriles para atender una problemática local, considerando los elementos del sistema técnico, desde una perspectiva sustentable.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tecnología",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_847",
    "contenido": "Usos e implicaciones de la energía en los procesos técnicos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_847_1",
        "descripcion": "Analiza diversas fuentes deenergía en los procesos técnicos para considerar posibles alternativas sustentables en su funcionamiento.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tutoría / Educación Socioemocional",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_848",
    "contenido": "Construcción del proyecto de vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_848_1",
        "descripcion": "Visualiza un proyecto de vida para determinar posibles retos a superar, estrategias de apoyo mutuo y acciones a realizar en favor del bienestar personal y colectivo. Reconoce nuevos intereses, habilidades y necesidades, personales y de las demás personas, con la finalidad de replantear metas individuales y grupales en favor del bienestar común.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tutoría / Educación Socioemocional",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_849",
    "contenido": "Educación integral en Sexualidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_849_1",
        "descripcion": "Promueve estrategias en favor de una educación integral en sexualidad para incorporarlas permanentemente en su proyecto de vida.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tutoría / Educación Socioemocional",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_850",
    "contenido": "Formas de ser, pensar, actuar y relacionarse",
    "pdas": [
      {
        "pda_id": "PDA_SB_850_1",
        "descripcion": "Promueve el entendimiento mutuo y la toma de decisiones, considerando formas de ser, pensar, actuar y relacionarse ante diferentes situaciones y contextos, para lograr un mayor bienestar personal y social.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tutoría / Educación Socioemocional",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_851",
    "contenido": "Los sentimientos y su influencia en la toma de decisiones.",
    "pdas": [
      {
        "pda_id": "PDA_SB_851_1",
        "descripcion": "Gestiona los afectos para tomar decisiones asertivas y construir relaciones de convivencia inclusivas y equitativas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "De lo Humano y lo Comunitario",
    "disciplina": "Tutoría / Educación Socioemocional",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_852",
    "contenido": "Prevención de situaciones de riesgo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_852_1",
        "descripcion": "Reflexiona sobre las condiciones del contexto familiar y comunitario que representan situaciones de riesgo a la salud, a la seguridad y al medio ambiente para el autocuidado y el bienestar colectivo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_855",
    "contenido": "Creaciones artísticas que tienen su origen en textos literarios.",
    "pdas": [
      {
        "pda_id": "PDA_SB_855_1",
        "descripcion": "Construye una narrativa personal o colectiva, a partir de un texto literario de su interés, empleando en forma artística cuerpo, espacio y tiempo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_856",
    "contenido": "Diversidad de lenguajes artísticos en la riqueza pluricultural de México y del mundo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_856_1",
        "descripcion": "Experimenta con características de algunos estilos de los lenguajes artísticos, para representar la riqueza pluricultural de México y del mundo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_857",
    "contenido": "Elementos de las artes y recursos estéticos apreciados en el entorno natural y social, así como en diversas manifestaciones artísticas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_857_1",
        "descripcion": "Usa intencionalmente figuras retóricas como metáforas, hipérboles, sinécdoques, aliteraciones, en creaciones artísticas colectivas, para representar situaciones vinculadas a la comunidad. Interviene el entorno natural y social, mediante el uso de los lenguajes artísticos, para expresar un mensaje a favor del cuidado del medioambiente.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_858",
    "contenido": "Expresión artística de sensaciones, emociones, sentimientos e ideas, a partir de experiencias familiares, escolares o comunitarias.",
    "pdas": [
      {
        "pda_id": "PDA_SB_858_1",
        "descripcion": "Usa intencionalmente características y funciones de algunos géneros artísticos, para crear una obra original que simbolice sus vínculos con la comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_859",
    "contenido": "Identidad y sentido de pertenencia en manifestaciones artísticas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_859_1",
        "descripcion": "Crea propuestas artísticas utilizando intencionalmente características de algunos estilos artísticos, a favor de la interculturalidad crítica, para fortalecer las identidades personal y colectiva.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_860",
    "contenido": "Los lenguajes artísticos en la expresión de problemas de lacomunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_860_1",
        "descripcion": "Experimenta con técnicas artísticas y elige una que implemente en un proyecto escolar creativo, para imaginar y proponer posibles soluciones a problemas de la comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_861",
    "contenido": "Manifestaciones artísticas que emplean sistemas alternativos y aumentativos de comunicación, elaboradas por personas en condición de discapacidad y/o diseñadas para ellas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_861_1",
        "descripcion": "Presenta una creación artística en la que experimente con sistemas alternativos y aumentativos de comunicación, para favorecer el tránsito a una sociedad incluyente.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_862",
    "contenido": "Manifestaciones culturales y artísticas que conforman la diversidad étnica, cultural y lingüística.",
    "pdas": [
      {
        "pda_id": "PDA_SB_862_1",
        "descripcion": "Presenta una propuesta creativa, usando intencionalmente el cuerpo, espacio y tiempo, entre otros elementos de las artes, para valorar y promover la diversidad étnica, cultural y lingüística, a favor de una sociedad incluyente.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_863",
    "contenido": "Memoria colectiva representada por medios artísticos, para registrar experiencias comunitarias.",
    "pdas": [
      {
        "pda_id": "PDA_SB_863_1",
        "descripcion": "Manifiesta una postura crítica sobre la memoria colectiva, acerca de un acontecimiento relevante para la comunidad, al hacer uso de los lenguajes artísticos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_864",
    "contenido": "Patrimonio cultural de la comunidad en manifestaciones artísticas que fomentan la identidad y el sentido de pertenencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_864_1",
        "descripcion": "Reinterpreta de manera respetuosa manifestaciones artísticas del patrimonio cultural, para valorar su identidad y sentido de pertenencia.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_865",
    "contenido": "Procesos creativos que ponen en práctica la comunicación dialógica, como estrategia para erradicar expresiones de violencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_865_1",
        "descripcion": "Presenta al público una propuesta artística respetuosa y empática con la diversidad a fin desensibilizar a la comunidad acerca de la importancia del diálogo para erradicar la violencia en el entorno.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_866",
    "contenido": "Sistemas alternativos y aumentativos de comunicación, como herramientas creativas que favorecen la inclusión.",
    "pdas": [
      {
        "pda_id": "PDA_SB_866_1",
        "descripcion": "Crea códigos que favorezcan la inclusión, a través del uso artístico de formas, colores, texturas, movimientos, gestos, sonidos, entre otros recursos que incorporen características de los sistemas alternativos y aumentativos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_867",
    "contenido": "Valor estético de la naturaleza, de la vida cotidiana y de diferentes manifestaciones culturales artísticas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_867_1",
        "descripcion": "Identifica algunas categorías estéticas como lo bello, lo sublime, lo grotesco, lo trágico, lo cómico y lo siniestro, al apreciarlas en manifestaciones culturales y artísticas, para argumentar sus juicios estéticos y difundirlos en la comunidad. Identifica algunas categorías estéticas como lo bello, lo sublime, lo grotesco, lo trágico, lo cómico y lo siniestro, al apreciarlas en la naturaleza y en la vida cotidiana, para compartir sus juicios estéticos y difundirlos en la comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Artes",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_868",
    "contenido": "Vida saludable expresada a través de mensajes construidos con elementos de las artes, para difundirlos por distintos medios de comunicación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_868_1",
        "descripcion": "Construye una narrativa a favor de una vida saludable, mediante el uso artístico de distintos formatos como fotografía, historieta, secuencia corporal, secuencia sonora, entre otros, y la difunde por distintos medios de comunicación.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_869",
    "contenido": "Comunicación asertiva y dialógica para erradicar expresiones de violencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_869_1",
        "descripcion": "Discute de forma colectiva y diseña una estrategia sobre la importancia de sensibilizar a la comunidad acerca de la violencia. Redacta un texto informativo acerca de la importancia de erradicar la violencia y realiza de manera formal las gestiones necesarias para compartirlo con la comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_870",
    "contenido": "Creaciones literarias tradicionales y contemporáneas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_870_1",
        "descripcion": "Crea textos narrativos, poéticos, dramáticos, guiones para audiovisuales, entre otros, a partir del uso de recursos literarios, para exponer una situación real o ficticia.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_872",
    "contenido": "El dinamismo de las lenguas y su relevancia como patrimonio cultural.",
    "pdas": [
      {
        "pda_id": "PDA_SB_872_1",
        "descripcion": "Analiza en textos literarios neologismos, juegos de lenguajes, caló, jerga, préstamos lingüísticos, extranjerismos como parte del dinamismo de la lengua española.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_873",
    "contenido": "La diversidad de lenguas y su uso en la comunicación familiar, escolar y comunitaria.",
    "pdas": [
      {
        "pda_id": "PDA_SB_873_1",
        "descripcion": "Analiza y reconoce algunas variantes lingüísticas de la lengua española, para valorarla como riqueza cultural.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_874",
    "contenido": "La diversidad étnica, cultural y lingüística de México a favor de una sociedad intercultural.",
    "pdas": [
      {
        "pda_id": "PDA_SB_874_1",
        "descripcion": "Practica la comunicación asertiva y el diálogo intercultural en interacción con otras personas. Comparte una propuesta creativa propia en la que valore y promueva textos en lengua española a favor de una sociedad intercultural.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_875",
    "contenido": "La función creativa del español en la expresión de necesidades e intereses comunitarios.",
    "pdas": [
      {
        "pda_id": "PDA_SB_875_1",
        "descripcion": "Crea textos literarios de distintos géneros, para ofrecer una propuesta de solución a problemas de la comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_876",
    "contenido": "Las lenguas como manifestación de la identidad y del sentido de pertenencia.",
    "pdas": [
      {
        "pda_id": "PDA_SB_876_1",
        "descripcion": "Elabora textos argumentativos acerca de la interculturalidad crítica, para reconocer el valor de las lenguas, a fin de promoverlas y fortalecerlas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_877",
    "contenido": "Los elementos y los recursos estéticos de la lengua española en la literatura oral y escrita.",
    "pdas": [
      {
        "pda_id": "PDA_SB_877_1",
        "descripcion": "Usa creativa e intencionalmente las características y los recursos estéticos de textos dramáticos, para escenificar situaciones vinculadas con la comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_878",
    "contenido": "Los géneros periodísticos y sus recursos para comunicar sucesos significativos familiares, escolares, comunitarios y sociales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_878_1",
        "descripcion": "Recupera recursos literarios de la lengua española para crear un texto libre que describa los vínculos con el entorno familiar, escolar o comunitario.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_879",
    "contenido": "Manifestaciones culturales y artísticas que favorecen una sociedad incluyente.",
    "pdas": [
      {
        "pda_id": "PDA_SB_879_1",
        "descripcion": "Crea un texto literario que aborde un tema que promueva una sociedad incluyente.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_880",
    "contenido": "Mensajes para promover una vida saludable, expresados en medios comunitarios o masivos de comunicación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_880_1",
        "descripcion": "Construye narrativas acerca de una vida saludable, haciendo uso del lenguaje audiovisual y las transmite por medios comunitarios o masivos de comunicación.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_881",
    "contenido": "Recursos literarios en lengua española para expresar sensaciones, emociones, sentimientos e ideas vinculados con las familias, la escuela y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_881_1",
        "descripcion": "Recupera recursos literarios de la lengua española para crear un texto libre que describa los vínculos con el entorno familiar, escolar o comunitario.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_882",
    "contenido": "Textos de divulgación científica.",
    "pdas": [
      {
        "pda_id": "PDA_SB_882_1",
        "descripcion": "Elabora una propuesta de divulgación científica, con la participación de la comunidad escolar, para fomentar el conocimiento de las ciencias.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Español",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_883",
    "contenido": "Textos literarios escritos en español o traducidos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_883_1",
        "descripcion": "Elabora un ensayo acerca del tratamiento de un tema de su elección, con base en algún género literario de su preferencia, para argumentar un juicio estético sobre éste.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_884",
    "contenido": "Comunicación asertiva y dialógica en inglés, para sensibilizar sobre la erradicación de la violencia en las familias y la escuela.",
    "pdas": [
      {
        "pda_id": "PDA_SB_884_1",
        "descripcion": "Diseña y difunde en inglés propuestas escritas, para sensibilizar a la comunidad acerca de la importancia de erradicar la violencia.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_885",
    "contenido": "Creaciones literarias tradicionales y contemporáneas en inglés.",
    "pdas": [
      {
        "pda_id": "PDA_SB_885_1",
        "descripcion": "Crea textos breves en inglés, para exponer una situación o tema de interés con recursos narrativos, poéticos, visuales, escénicos o musicales.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_886",
    "contenido": "El inglés para expresar sensaciones, emociones, sentimientos e ideas vinculados con las familias, la escuela y la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_886_1",
        "descripcion": "Investiga y recupera manifestaciones culturales y artísticas de su comunidad, para difundirlas en inglés.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_887",
    "contenido": "El uso del inglés en la construcción de mensajes a favor de la inclusión.",
    "pdas": [
      {
        "pda_id": "PDA_SB_887_1",
        "descripcion": "Construye un proyecto en inglés para valorar la diversidad y fomentar la inclusión social en su entorno.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_888",
    "contenido": "El uso del inglés en las manifestaciones culturales y artísticas que favorecen la construcción de una sociedad incluyente",
    "pdas": [
      {
        "pda_id": "PDA_SB_888_1",
        "descripcion": "Crea en inglés alguna manifestación artística que aborde cómo los sistemas alternativos y aumentativos favorecen sociedades incluyentes.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_889",
    "contenido": "El uso del inglés para expresar necesidades, intereses y problemas de la comunidad",
    "pdas": [
      {
        "pda_id": "PDA_SB_889_1",
        "descripcion": "Organiza una campaña en inglés sobre soluciones a problemas de la comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_890",
    "contenido": "Elementos y recursos estéticos del inglés.",
    "pdas": [
      {
        "pda_id": "PDA_SB_890_1",
        "descripcion": "Emplea algunas figuras retóricas, elementos y recursos estéticos, para construir un texto literario corto, oral y escrito, para difundirlo en la comunidad escolar.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_892",
    "contenido": "La diversidad lingüística y sus formas de expresión en México y el mundo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_892_1",
        "descripcion": "Utiliza diversos tipos de texto y medios de comunicación, para expresar y difundir en inglés, prácticas culturales y lingüísticas diversas de sociedades en México y el mundo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_893",
    "contenido": "La identidad y cultura de pueblos de habla inglesa.",
    "pdas": [
      {
        "pda_id": "PDA_SB_893_1",
        "descripcion": "Construye una propuesta de comunicación en inglés oral y escrita, donde contraste, valore y promueva rasgos de una sociedad intercultural, identificados en pueblos de habla inglesa.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_894",
    "contenido": "Las manifestaciones culturales, lingüísticas y artísticas en inglés, a favor de la interculturalidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_894_1",
        "descripcion": "Elabora guiones en inglés y los dramatiza, sobre situaciones de conflicto resueltos mediante la comunicación asertiva e intercultural.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_895",
    "contenido": "Manifestaciones artísticas y culturales del inglés.",
    "pdas": [
      {
        "pda_id": "PDA_SB_895_1",
        "descripcion": "Crea poemas cortos a partir del uso de recursos estéticos del inglés en producciones orales y escritas, para difundirse en la comunidad escolar.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_896",
    "contenido": "Mensajes en inglés en medios de comunicación masiva, que promuevan una vida saludable.",
    "pdas": [
      {
        "pda_id": "PDA_SB_896_1",
        "descripcion": "Cuenta historias en inglés, sobre ejemplos de vida saludable y las difunde mediante el uso de medios de comunicación, para sensibilizar a la comunidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_897",
    "contenido": "Relatos en inglés para expresa sucesos significativos familiares, escolares, comunitarios y sociales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_897_1",
        "descripcion": "Recupera un acontecimiento histórico comunitario y elabora un texto oral y escrito en inglés,para expresar su postura, haciendo uso de recursos visuales o auditivos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Lenguajes",
    "disciplina": "Inglés",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_898",
    "contenido": "Uso de diversos textos en inglés que promueven la preservación y conservación de las lenguas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_898_1",
        "descripcion": "Participa en un debate en inglés, sobre los cambios lingüísticos y culturales de las lenguas en el transcurso del tiempo, y su impacto en la conformación de nuevas prácticas sociales.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_899",
    "contenido": "Capacidades, habilidades y destrezas motrices.",
    "pdas": [
      {
        "pda_id": "PDA_SB_899_1",
        "descripcion": "Valora las capacidades, habilidades y destrezas propias y de las demás personas, para mostrar mayor disponibilidad corporal y autonomía motriz.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_900",
    "contenido": "E. FÍSICA",
    "pdas": [
      {
        "pda_id": "PDA_SB_900_1",
        "descripcion": "3° GRADO",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_901",
    "contenido": "Estilos de vida activos y saludables.",
    "pdas": [
      {
        "pda_id": "PDA_SB_901_1",
        "descripcion": "Diseña alternativas que fomenten la práctica de estilos de vida activos y saludables, a partir del análisis de comportamientos que ponen en riesgo la salud, para hacer frente a problemas asociados con el sedentarismo.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_902",
    "contenido": "Interacción motriz.",
    "pdas": [
      {
        "pda_id": "PDA_SB_902_1",
        "descripcion": "Promueve relaciones asertivas con las demás personas en situaciones de juego, iniciación deportiva y deporte educativo, para fortalecer su autoestima y fomentar el juego limpio y la confrontación lúdica.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_903",
    "contenido": "Pensamiento lúdico, estratégico y creativo.",
    "pdas": [
      {
        "pda_id": "PDA_SB_903_1",
        "descripcion": "Emplea el pensamiento estratégico, para favorecer la colaboración y creatividad en la resolución de situaciones individuales y colectivas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Física",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_904",
    "contenido": "Potencialidades cognitivas, expresivas, motrices, creativas y de relación.",
    "pdas": [
      {
        "pda_id": "PDA_SB_904_1",
        "descripcion": "Diseña, organiza y participaen actividades recreativas, de iniciación deportiva y deporte educativo, con la intención de fomentar el bienestar personal y social.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_905",
    "contenido": "Azar y probabilidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_905_1",
        "descripcion": "Resuelve problemas donde se analicen las características de eventos complementarios y eventos mutuamente excluyentes e independientes. Resuelve problemas donde se calcule la probabilidad de ocurrencia de dos eventos mutuamente excluyentes y de eventos complementarios (regla de la suma). Resuelve problemas donde se calcule la probabilodad de ocurrencia de dos eventos independientes (regla del producto). Indaga las condiciones necesarias para que un juego de azar sea justo, can base en la noción de resultados equiprobables y no equiprobables.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_906",
    "contenido": "Circunferencia, circulo y esfera",
    "pdas": [
      {
        "pda_id": "PDA_SB_906_1",
        "descripcion": "Explora y construye desarrollos planos de esferas. Indaga la generación de esferas a partir de figuras planas. Encuentra relaciones de volumen de la esfera, el cono y el cilindro.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_907",
    "contenido": "Construcción y propiedades de las figuras planas y cuerpos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_907_1",
        "descripcion": "Aplica las propiedades de la congruencia y semejanza de triángulos al construir y resolver problemas. Reconoce las propiedades de los sólidos. Explora la generación de sólidos de revolución a partir de figuras planas. Explora y construye desarrollos planos de diferentes figuras tridimensionales, cilindros, pirámides y conos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_908",
    "contenido": "Ecuaciones lineales y cuadráticas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_908_1",
        "descripcion": "Resuelve ecuaciones de la forma Ax2+Bx+C=0 por factorización y fórmula general. Resuelve problemas cuyo planteamiento es una ecuación cuadrática.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_909",
    "contenido": "Funciones.",
    "pdas": [
      {
        "pda_id": "PDA_SB_909_1",
        "descripcion": "Relaciona e interpreta la variación de dos cantidades a partir de su representación tabular, gráfica y algebraica. Explora diversos procedimientos para resolver problemas de reparto proporcional.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_910",
    "contenido": "Interpretación de la información a través de medidas de tendencia central y de dispersión.",
    "pdas": [
      {
        "pda_id": "PDA_SB_910_1",
        "descripcion": "Determina y compara las medidas de tendencia central (media, mediana y moda) y de dispersión (rango y desviación media) de dos conjuntos de datos para tomar decisiones.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_911",
    "contenido": "Introducción al álgebra.",
    "pdas": [
      {
        "pda_id": "PDA_SB_911_1",
        "descripcion": "Representa algebraicamente áreas y volúmenes de cuerpos geométricos y calcula el valor de una variable en función de las otras.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_913",
    "contenido": "Medición y cálculo en diferentes contextos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_913_1",
        "descripcion": "Usa diferentes estrategias para calcular el volumen de prismas, pirámides y cilindros. Formula, justifica y usa el teorema de Pitágoras al resolver problemas. Resuelve problemas utilizando las razones trigonométricas seno, coseno y tangente. Encuentra relaciones de volumen de la esfera el cono y el cilindro.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Matemáticas",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_914",
    "contenido": "Obtención y representación de información.",
    "pdas": [
      {
        "pda_id": "PDA_SB_914_1",
        "descripcion": "Lee, interpreta y comunica información de cualquier tipo de gráficas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Química",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_915",
    "contenido": "Composición de las mezclas y su clasificación en homogéneas y heterogéneas, así como métodos de separación (evaporación, decantación, filtración, extracción, sublimación, cromatografía y cristalización) aplicados en diferentes contextos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_915_1",
        "descripcion": "Describe los componentes de una mezcla (soluto – disolvente; fase dispersa y fase dispersante) mediante actividades experimentales y las clasifica en homogéneas y heterogéneas en materiales de uso cotidiano. Analiza la concentración de sustancias de una mezcla expresadas en porcentajes en masa y en volumen de distintos productos (higiene personal, alimentos y limpieza, entre otros) como base para la toma de decisiones orientadas al cuidado de la salud y al consumo responsable. Deduce métodos para separar mezclas (evaporación, decantación, filtración, extracción, sublimación, cromatografía y cristalización) mediante actividades experimentales con base en las propiedades físicas de las sustancias involucradas, así como su funcionalidad en actividades humanas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Química",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_916",
    "contenido": "Importancia de la concentración de sustancias en mezclas de productos de uso cotidiano.",
    "pdas": [
      {
        "pda_id": "PDA_SB_916_1",
        "descripcion": "Analiza la concentración de sustancias de una mezcla expresadas en porcentaje en masa y porcentaje en volumen en productos de higiene personal, alimentos, limpieza, entre otros, para la toma de decisiones orientadas al cuidado de la salud y al consumo responsable. Relaciona la concentración de una mezcla con la efectividad o composición de diversos productos de uso cotidiano.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Química",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_917",
    "contenido": "La Tabla periódica: criterios de clasificación de los elementos químicos y sus propiedades (electronegatividad, energía de ionización y radio atómico).",
    "pdas": [
      {
        "pda_id": "PDA_SB_917_1",
        "descripcion": "Reconoce la presencia y predominancia de algunos elementos químicos que conforman a los seres vivos, la Tierra y el Universo, así como su ubicación en la Tabla periódica: metales, no metales y semimetales. Interpreta la información de la Tabla periódica ordenada por el número atómico, así como por grupos y periodos e identifica las propiedades periódicas de elementos representativos que permita inferir su comportamiento químico. Construye modelos atómicos de Bohr – distribución de electrones en órbitas– con base en el número atómico de los primeros elementos químicos, con la intención de representar su conformación: protones, neutrones y electrones. Representa los electrones de valencia de átomos de diferentes elementos químicos, por medio de diagramas de Lewis y los relaciona con el grupo al que pertenece en la Tabla periódica.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Química",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_918",
    "contenido": "Las propiedades extensivas e intensivas, como una forma de identificar sustancias y materiales de uso común, así como el aprovechamiento en actividades humanas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_918_1",
        "descripcion": "Formula hipótesis para diferenciar propiedades extensivas e intensivas, medianteactividades experimentales y, con base en el análisis de resultados, elabora conclusiones. Reconoce la importancia del uso de instrumentos de medición, para identificar y diferenciar propiedades de sustancias y materiales cotidianos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Química",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_919",
    "contenido": "Las reacciones de óxido-reducción (redox): identificación del número de oxidación y de agentes oxidantes y reductores.",
    "pdas": [
      {
        "pda_id": "PDA_SB_919_1",
        "descripcion": "Identifica reacciones de redox en su entorno y comprende su importancia en diferentes ámbitos. Analiza la transferencia de electrones entre reactivos y productos en reacciones de redox, con base en el cambio del número de oxidación, a partir de actividades experimentales. Valora los beneficios y el costo ambiental de procesos y productos derivados de las reacciones redox, por medio de debates y argumentando su postura a favor de la sustentabilidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Química",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_920",
    "contenido": "Las reacciones químicas: manifestaciones, propiedades e interpretación de las ecuaciones químicas con base en la Ley de conservación de la materia, así como la absorción o desprendimiento de energía en forma de calor.",
    "pdas": [
      {
        "pda_id": "PDA_SB_920_1",
        "descripcion": "Reconoce distintas reacciones químicas en su entorno y en actividades experimentales, a partir de sus manifestaciones y el cambio de propiedades de reactivos a productos. Representa reacciones mediante modelos tridimensionales y ecuaciones químicas, con base en el lenguaje científico y la Ley de la conservación de la materia. Explica y representa intercambios de materia y energía – endotérmicas y exotérmicas – de reactivos a productos y su aprovechamiento en actividades humanas. Explica lo que cambia y lo que permanece en una reacción química y valora su importancia, para producir nuevas sustancias y satisfacer necesidades humanas, así como solucionar problemas relacionados con la salud y el medio ambiente.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Química",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_921",
    "contenido": "Los alimentos como fuente de energía química: carbohidratos, proteínas y lípidos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_921_1",
        "descripcion": "Reconoce los saberes de pueblos y culturas acerca de la diversidad de los alimentos y su importancia en el diseño de menús, orientados a una dieta saludable, acorde al contexto. Explica cómo obtiene la energía el cuerpo humano, a partir de los nutrimentos e identifica los alimentos que los contienen. Valora la importancia de vitaminas, minerales y agua simple potable, para el adecuado funcionamiento del cuerpo humano, e identifica los impactos de su deficiencia. Analiza el aporte energético de los alimentos y lo relaciona con las actividades físicas personales, a fin de tomar decisiones vinculadas a una dieta saludable.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Química",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_922",
    "contenido": "Los compuestos iónicos y moleculares: propiedades y estructura, así como su importancia en diferentes ámbitos.",
    "pdas": [
      {
        "pda_id": "PDA_SB_922_1",
        "descripcion": "Experimenta y diferencia los compuestos iónicos y moleculares, a partir de las propiedades identificadas en actividades experimentales; eabora conclusiones, inferencias y predicciones con base en la evidencia obtenida. Analiza la formación y estructura de compuestos iónicos y moleculares, a partir de las propiedades de la Tabla periódica. Valora el aprovechamiento de propiedades de compuestos iónicos y moleculares en el cuerpo humano y en diferentes ámbitos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Química",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_923",
    "contenido": "Los hitos que contribuyeron al avance del conocimiento científico y tecnológico en el ámbito nacional e internacional, así como su relación en la satisfacción de necesidades humanas y sus implicaciones en la naturaleza.",
    "pdas": [
      {
        "pda_id": "PDA_SB_923_1",
        "descripcion": "Reconoce los aportes de saberes de diferentes pueblos y culturas en la satisfacciónde necesidades humanas en diversos ámbitos (medicina, construcción, artesanías, textiles y alimentos). Indaga en fuentes de consulta orales y escritas, las aportaciones de mujeres y hombres en el desarrollo del conocimiento científico y tecnológico, para valorar su influencia en la sociedad actual. Reflexiona acerca de los hábitos de consumo responsablea partir del análisis de las actividades relacionadas con el cuidado del medio ambientes a nivel personal, familiar y social, como base para la toma de decisiones orientadas a la sustentabilidad.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Química",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_924",
    "contenido": "Mezclas, compuestos y elementos representados con el modelo corpuscular de la materia en sólidos, líquidos y gases, así como su caracterización mediante actividades experimentales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_924_1",
        "descripcion": "Explica semejanzas y diferencias de mezclas, compuestos y elementos, a partir de actividades experimentales y los clasifica en materiales de uso cotidiano. Construye modelos corpusculares de mezclas, compuestos y elementos, a fin de comprender la estructura interna de los materiales en diferentes estados de agregación.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Química",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_925",
    "contenido": "Presencia de contaminantes y su concentración, relacionada con la degradación y contaminación ambiental en la comunidad.",
    "pdas": [
      {
        "pda_id": "PDA_SB_925_1",
        "descripcion": "Indaga situaciones problemáticas relacionadas con la degradación y contaminación en la comunidad, vinculadas con el uso de productos y procesos químicos. Sistematiza la información de diferentes fuentes de consulta, orales y escritas, acerca de la concentración de contaminantes (partes por millón, -ppm-) en aire, agua y suelo. Diseña y lleva a cabo proyectos comunitarios con la intención de proponer medidas preventivas o alternativas de solución, factibles y sustentables para el cuidado de la salud y el medio ambiente.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Saberes y Pensamiento Científico",
    "disciplina": "Química",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_926",
    "contenido": "Propiedades de ácidos y bases, reacciones de neutralización y modelo de Arrhenius.",
    "pdas": [
      {
        "pda_id": "PDA_SB_926_1",
        "descripcion": "Distingue las propiedades de ácidos y bases en su entorno, a partir de indicadores e interpreta la escala de acidez y basicidad. Deduce los productos de reacciones de neutralización sencillas, con base en el modelo de Arrhenius, mediante actividades experimentales. Diseña y lleva a cabo reacciones de neutralización, a fin de obtener productos útiles en la vida cotidiana, así como para el tratamiento de residuos. Evalúa los beneficios y riesgos a la salud y al medio ambiente, de ácidos y bases, en diversos ámbitos a través del pensamiento crítico.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_928",
    "contenido": "Consecuencias de la desigualdad en la calidad de vida de las personas y comunidades.",
    "pdas": [
      {
        "pda_id": "PDA_SB_928_1",
        "descripcion": "Actúa éticamente para reducir las desigualdades, fomentando el respeto y la solidaridad en los pueblos más vulnerados en su comunidad, México y América Latina.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_929",
    "contenido": "Defensa del derecho al acceso a la protección de datos personales, a la información, la transparencia y la rendición de cuentas en un gobierno democrático.",
    "pdas": [
      {
        "pda_id": "PDA_SB_929_1",
        "descripcion": "Analiza el actuar de partidos políticos, organizaciones, gobiernos y las servidoras y los servidores públicos, mediante el acceso a la información, transparencia y rendición de cuentas, para exigir una gestión que proteja los datos personales de la ciudadanía y fortalezca la cultura de la legalidad en México.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_930",
    "contenido": "El conflicto en la convivencia humana desde la cultura de paz.",
    "pdas": [
      {
        "pda_id": "PDA_SB_930_1",
        "descripcion": "Valora la resolución pacífica de conflictos sociales y políticos en México y el mundo y gestiona estrategias de participación y transformación social hacia una cultura de paz.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_931",
    "contenido": "El derecho a la salud y la prevención en el consumo de drogas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_931_1",
        "descripcion": "Toma decisiones autónomas, responsables y comprometidas para prevenir el consumo de drogas y denuncia situaciones que atentan contra la salud.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_933",
    "contenido": "Grupos sociales yculturales en laconformación de las identidades juveniles.",
    "pdas": [
      {
        "pda_id": "PDA_SB_933_1",
        "descripcion": "Promueve espacios de participación juvenil, presenciales o virtuales, para construir comunidades que promuevan la colaboración, el respeto y ejercicio de los derechos de NNA.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_934",
    "contenido": "Igualdad sustantiva en el marco de la interculturalidad, la inclusión y la perspectiva de género.",
    "pdas": [
      {
        "pda_id": "PDA_SB_934_1",
        "descripcion": "Participa en acciones dirigidas a reducir brechas de desigualdad para promover y fortalecer la interculturalidad, la inclusión y la perspectiva de género.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_935",
    "contenido": "Instituciones, organizaciones y mecanismos de representación democrática.",
    "pdas": [
      {
        "pda_id": "PDA_SB_935_1",
        "descripcion": "Valora los retos que enfrenta la democracia en México y el mundo para involucrarse en su fortalecimiento.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_936",
    "contenido": "La cultura de paz y la creación de ambientes que garanticen el respeto a la vida y la dignidad del ser humano.",
    "pdas": [
      {
        "pda_id": "PDA_SB_936_1",
        "descripcion": "Colabora con personas de la escuela, la comunidad, el país y el mundo, para rechazar y denunciar la violencia, así como fortalecer el tejido social mediante acciones orientadas hacia una cultura de paz.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_937",
    "contenido": "Los derechos humanos en México y en el mundo como valores compartidos por las sociedades actuales.",
    "pdas": [
      {
        "pda_id": "PDA_SB_937_1",
        "descripcion": "Debate acerca de la importancia de defender y exigir el respeto a los derechos humanos, como un reto de las sociedades actuales para vivir con dignidad, libertad, justicia e inclusión.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_938",
    "contenido": "Medidas de protección y mecanismos de denuncia en el rechazo a la violencia de género, sexual y la trata de personas.",
    "pdas": [
      {
        "pda_id": "PDA_SB_938_1",
        "descripcion": "Propone acciones de denuncia en contextos presenciales y en las redes sociales para garantizar el derecho a una vida libre de violencia de género, sexual y la trata de personas.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_939",
    "contenido": "Movimientos sociales y políticos por los derechos humanos en el mundo y en México.",
    "pdas": [
      {
        "pda_id": "PDA_SB_939_1",
        "descripcion": "Asume una postura ética sobre los movimientos sociales y políticos en la actualidad y participa en acciones para promover y defender los derechos humanos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_940",
    "contenido": "Normas, leyes, instituciones y organizaciones encargadas de proteger, defender y exigir la aplicación de los derechos humanos en la convivencia diaria.",
    "pdas": [
      {
        "pda_id": "PDA_SB_940_1",
        "descripcion": "Analiza la función de instituciones y organizaciones nacionales e internacionales, parademandar la aplicación de normas y leyes que defienden y exigen respeto a los derechos humanos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_941",
    "contenido": "Personas, grupos y organizaciones a favor de la cultura de paz.",
    "pdas": [
      {
        "pda_id": "PDA_SB_941_1",
        "descripcion": "Valora las acciones que personas, grupos u organizaciones han realizado en México y América Latina para resolver los conflictos territoriales, politicos y sociales de manera no violenta y a favor de la cultura de paz.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_942",
    "contenido": "Principios y valores de la cultura democrática como forma de gobierno y de vida.",
    "pdas": [
      {
        "pda_id": "PDA_SB_942_1",
        "descripcion": "Participa de manera activa, responsable e informada en la promoción, defensa y reivindicación de los principios y valores de la democracia.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_943",
    "contenido": "Principios éticos como referente para un desarrollo sustentable.",
    "pdas": [
      {
        "pda_id": "PDA_SB_943_1",
        "descripcion": "Implementa acciones de colaboración, reciprocidad, solidaridad y de participación igualitaria como valores para un desarrollo sustentable.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Formación Cívica y Ética",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_944",
    "contenido": "Proyectos como un recurso para atender problemáticas de la comunidad desde una ciudadanía democrática.",
    "pdas": [
      {
        "pda_id": "PDA_SB_944_1",
        "descripcion": "Colabora en proyectos con la comunidad para responder a necesidades colectivas en sus dimensiones política, civil y social, así como para transformar las condiciones que atentan contra los derechos humanos y la cultura democrática en diversos contextos.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_946",
    "contenido": "La conformación de las metrópolis y los sistemas de dominación",
    "pdas": [
      {
        "pda_id": "PDA_SB_946_1",
        "descripcion": "Indaga sobre el desarrollo de las ciudades en Italia y Flandes durante los siglos XII y XII. Asocia la transmutación del sistema feudal con el desarrollo del Humanismo en el marco del surgimiento los estados de nacionales y las monarquías absolutas. Reflexiona acerca de las causas que ocasionaron la búsqueda de rutas comerciales marítimos y su propagación y su generalización durante los siglos XV y XVI. Analiza la disputa entre los países hegemónicos por la posesión de territorios en América, África y Asia. Caracteriza las colonizaciones realizadas por españoles, portugueses, ingleses, franceses y holandeses en América y en Asia. Relaciona la expoliación de los recursos humanos y naturales de los territorios colonizados en América con la práctica de una política económica institucional de las naciones colonizadoras. Revisa las causas y obtiene conclusiones de la concentración de la actividad colonizadoradiferentes potencias ultramarinas como en la Cuenca del Mar caribe y el Sudeste Asiático. Obtiene información y formula conclusiones acerca del tráfico de pieles y su incremento durante la colonización del noreste de Norteamérica. Analiza las causas que llevaron a la intensificación del tráfico de esclavos y al uso del trabajo de éstos en los territorios colonizados de América. Investiga los lugares de origen y de destino de la población africana reducida a la esclavitud en este periodo. Problematiza la vida cotidiana de la población africana reducida a la esclavitud en América. Caracteriza el establecimiento de las colonias inglesas en América. Reflexiona y emite opiniones acerca del tipo de relaciones de todo tipo que los colonos ingleses establecieron con la población indígena. Compara y obtiene conclusiones acerca de la composición social que se conformó en las colonias inglesas en el Continente Americano.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_947",
    "contenido": "Las gestas de resistencia y los movimientos independentistas",
    "pdas": [
      {
        "pda_id": "PDA_SB_947_1",
        "descripcion": "Elabora una cronología de las luchas de independencia de los países de Latinoamérica; incorpora datos, fechas, nombres, lugares, y personajes históricos; aspectos sincrónicos y diacrónicos, aspectos que permanecen o cambian y la duración.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_948",
    "contenido": "Las revoluciones modernas y sus tendencias",
    "pdas": [
      {
        "pda_id": "PDA_SB_948_1",
        "descripcion": "Ubica la confluencia de causas para que la primerarevolución industrial suceda en Inglaterra y se desarrolle el sistema capitalista. Explica la relevancia historia de la revolución industrial en nuestras vidas. Analiza y comprende por separado, la causalidad y el sentido de la Independencia de los Estados Unidos y de la de la Revolución Francesa y el impacto que tuvieron en su momento en el mundo; identifica los elementos en común y los que marcan diferencias. Construye una narrativa de este proceso. Problematiza la irrupción de estas revoluciones con el uso de conceptos como cambios, permanencias, ruptura, viejo régimen, soberanía popular, esclavitud, igualdad, propiedad privada. Relaciona los que a su juicio son aportes relevantes de estas revoluciones. Analiza la Declaración de los Derechos del Hombre y del Ciudadano y genera hipótesis acerca de la ausencia explícita de las mujeres en el texto. Analiza la consolidación de Francia como nación moderna y capitalista y relaciona el aporte a este proceso de las campañas militares que llevó a cabo Napoleón Bonaparte. Explica cómo en el proceso de ascenso y consolidación del sistema capitalista y de la burguesía como clase dominante hubo segmentos sociales con una perspectiva diferente: socialistas utópicos, comunistas, anarquistas. Analiza el proceso de expansión territorial de los Estados Unidos y los modelos de desarrollo económico de los estados del norte y los estados del sur. Identifica desde que perspectiva estaba planteada la abolición de la esclavitud impulsada por los estados del norte. Analiza los resultados de guerra civil estadounidense y determina la perspectiva histórica de esta nación. Reflexiona en qué tanto se modificaron las condiciones de vida de la población de origen africano de los Estados Unidos. Relaciona la creciente industrialización de los países capitalistas y la colonización de África en la segunda mitad del siglo XIX. Analiza y comprende la causalidad de los procesos de integración nacional de Italia y Alemania y comprende como estos se convierten en causas de hechos más complejos. Reconoce en el establecimiento de la Comuna de París en 1871 la expresión de una forma de gobierno alternativo al de la burguesía.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_949",
    "contenido": "Las tensiones en siglo XX",
    "pdas": [
      {
        "pda_id": "PDA_SB_949_1",
        "descripcion": "Analiza y comprende las causas y consecuencias de la segunda revolución industrial y su aporte a la consolidación del capitalismo como sistema económico mundial. Explica las causas de la primera guerra mundial y las vincula históricamente con hechos o procesos pasados o que suceden simultáneamente con los que están relacionados. Amplía el alcance de este tiempo histórico al vincular las causas con hechos o sucesos posteriores con los que tengan relación. Elabora una cronología de los eventos que abarca la primera guerra mundial y la utiliza de base para entramar los hechos contenidos con las consecuencias de este conflicto bélico. Compara la situación en que se colocaron los países participantes al final de la guerra. Aborda la revolución rusa de 1917 como un punto de ruptura en la historia de esta nación y del mundo. Genera hipótesis acerca del surgimiento de la Unión Soviética como contrapeso del sistema capitalista. Explica la lógica en la que se desarrolla la crisis de 1929 y describe sus efectos. Problematiza acerca del surgimiento del fascismo y las características que adquirió en Alemania, Italia y España. Recaba información y genera hipótesis acerca de la Guerra Civil Española. Valora la actitud del gobierno de Lázaro Cárdenas al recibir al exilio español y el impacto de este en la sociedad mexicana. Explica las causas de la segunda guerra mundial y las vincula históricamente con causas o consecuencias de la primera guerra mundial. Diseña un organizador cronológico de los eventos que abarca la segunda guerra mundial y la utiliza para dar cuenta del desarrollo del conflicto. Establece similitudes y diferencias entre las consecuencias de la primera y la segunda guerra mundial. Indaga las causas de la incorporación de México en el conflicto y la forma en que lo hizo. Genera hipótesis acerca del periodo histórico conocido como posguerra, usa conceptos como mundo bipolar, conformación de bloques, guerra fría, sistemas de alianzas, conflictos regionales. Analiza el proceso en que los comunistas chinos toman el poder en este país y su inserción en el ámbito internacional. Indaga acerca de la descolonización de África y advierte cómo se inserta en proceso las tensiones de la posguerra. Analiza las causas y el sentido de la carrera armamentista nuclear desatada después de la segunda guerra mundial y advierte sus implicaciones en el presente. Indaga causas, desarrollo y desenlace de la guerra de Corea y establece su vinculación con la guerra fría. Indaga causas, desarrollo y desenlace de la guerra de Vietnam; reflexiona y obtiene conclusiones en la intervención de Francia y Estados en este conflicto. Genera hipótesis e interpretaciones de la postura estadounidense acerca de la revolución cubana y las razones para mantener bloqueo económico sobre la isla desde 1962. Elabora un organizador cronológico de la carrera espacia e inserta este proceso en el contexto del mundo bipolar. Analiza y comprende las causas de la desintegración del bloque socialista, interpreta el simbolismo de la caída del muro de Berlín. Ubica las causas, desarrollo y desenlace de la Guerra del Gofo Pérsico (1990-1991) y la contextualiza en un escenario unipolar. Analiza la elección de Nelson Mandela como presidente de Sudáfrica 10 de mayo de 1994 Analiza y comprende las causas de la creación de la Unión Europea.",
        "orden": 1
      }
    ]
  },
  {
    "fase": "Fase 6",
    "nivel": "Secundaria",
    "campo_formativo": "Ética, Naturaleza y Sociedades",
    "disciplina": "Historia",
    "grado": "3° de Secundaria",
    "contenido_id": "CONT_SB_950",
    "contenido": "Los albores de la humanidad: los pueblos antiguos del mundo y su devenir",
    "pdas": [
      {
        "pda_id": "PDA_SB_950_1",
        "descripcion": "Recupera las explicaciones de Charles Darwin acerca del origen y evolución de la biodiversidad y particulariza en el caso ser humano. Investiga acerca de restos fósiles de homínidos encontrados en todo el mundo y organiza la información. Explica cómo se construye la representación de la prehistoria a través de la manufactura de artefactos o estructuras. Aplica el eje organizador uso y gestión del agua y su impacto para analizar el desarrollo histórico de las antiguas civilizaciones mesopotámica, egipcia, hindú y china. Indaga a partir de la noción de espacio ecúmene aplicada a los antiguos pueblos fenicio, egipcio, cretense, cartaginés, griego y romano en la cuenca del mar mediterráneo, como una forma temprana de integración de la economía, la sociedad, la cultura y la política. Analiza el proceso de integración de los antiguos pueblos de la Cuenca del Mar Mediterráneo para explicarse las tensiones y conflictos entre persas y griegos. Genera hipótesis e interpretaciones propias sobre el esplendor de la Cultura Romana mediante el análisis de los conceptos: trabajo esclavo, ocupación militar de territorios y organización política. Problematiza la relación germánicos-romanos y la desintegración del Imperio Romano de Occidente. Establece relaciones de cambio, continuidad y/o ruptura en el surgimiento de los estados feudales y su generalización en Europa. Estructura a partir del espacio y el tiempo en que se desarrolló, formas para organizar y dar cuenta del desarrollo histórico de las sociedades feudales. Problematiza acerca de las causas, los fundamentos y el impacto del Imperio Musulmán en el mundo.",
        "orden": 1
      }
    ]
  }
];

export const NEM_CURRICULUM_RELATIONAL_DATA = NEM_CURRICULUM_DATA;
