export interface CurriculumItem {
  id: number;
  campoFormativo: string;
  disciplina: string;
  grado: string;
  contenido: string;
  pda: string;
  nivel?: string;
}

export const CAMPO_FORMATIVO_LABELS: Record<string, string> = {
  "lenguajes": "Lenguajes",
  "SABERES": "Saberes y Pensamiento Científico",
  "ETICA NyS": "Ética, Naturaleza y Sociedades",
  "HUMANO Y C": "De lo Humano y lo Comunitario"
};

export const DISCIPLINA_LABELS: Record<string, string> = {
  "ESPAÑOL": "Español",
  "ARTES": "Artes",
  "INGLES": "Inglés",
  "MATEM": "Matemáticas",
  "BIOLOGIA": "Biología",
  "FISICA": "Física",
  "QUIMICA": "Química",
  "GEO": "Geografía",
  "HIST": "Historia",
  "FCyE": "Formación Cívica y Ética",
  "TECNO": "Tecnología",
  "TUTORIA": "Tutoría y Educación Socioemocional",
  "ED. FIS": "Educación Física",
  "PREESCOLAR": "Educación Preescolar",
  "PRIMARIA": "Educación Primaria"
};

export const curriculumData: CurriculumItem[] = [
  // LENGUAJES - ESPAÑOL
  {
    id: 1,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Primer Grado",
    contenido: "La diversidad de lenguas y su uso en la comunicación familiar, escolar y comunitaria",
    pda: "Reconoce la riqueza lingüística de México y el mundo, a partir de obras literarias provenientes de distintas culturas."
  },
  {
    id: 2,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Primer Grado",
    contenido: "Textos literarios escritos en español o traducidos",
    pda: "Reconoce el valor estético de diversos géneros literarios en textos de su elección, para elaborar comentarios y promover su lectura."
  },
  {
    id: 3,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Primer Grado",
    contenido: "El dinamismo de las lenguas y su relevancia como patrimonio cultural",
    pda: "Identifica y expresa la relevancia de valorar las lenguas como legado de la comunidad."
  },
  {
    id: 4,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Primer Grado",
    contenido: "Los elementos y los recursos estéticos de la lengua española en la literatura oral y escrita",
    pda: "Reconoce los recursos estéticos in textos literarios líricos, orales y escritos, y disfruta de poemas, canciones y juegos de palabras, entre otros."
  },
  {
    id: 5,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Primer Grado",
    contenido: "Creaciones literarias tradicionales y contemporáneas",
    pda: "Recupera y clasifica creaciones literarias de la comunidad o de un lugar de interés, como mitos, leyendas, fábulas, epopeyas, cantares de gesta, refranes, coplas, canciones, corridos y juegos de palabras, para promover de manera creativa su lectura."
  },
  {
    id: 6,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Primer Grado",
    contenido: "La diversidad étnica, cultural y lingüística de México a favor de una sociedad intercultural",
    pda: "Comprende las ideas centrales y secundarias de textos relacionados con la diversidad étnica, cultural y lingüística, que favorecen una sociedad intercultural, para comentarlas de manera oral y escrita."
  },
  {
    id: 7,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Primer Grado",
    contenido: "Las lenguas como manifestación de la identidad y el sentido de pertenencia",
    pda: "Describe en un texto cómo el lenguaje oral manifiesta las identidades personal y colectiva, para reconocer lo común y lo diferente."
  },
  {
    id: 8,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Primer Grado",
    contenido: "La función creativa del español en la expresión de necesidades e intereses comunitarios",
    pda: "Identifica una situación problemática de la comunidad, haciendo uso del pensamiento crítico, para plantear diversas formas creativas de resolverla, por ejemplo, con un cuento."
  },
  {
    id: 9,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Primer Grado",
    contenido: "Recursos literarios en lengua española para expresar sensaciones, emociones, sentimientos e ideas vinculados con las familias, la escuela y la comunidad",
    pda: "Identifica recursos literarios en lengua española y los emplea en la elaboración de cartas personales y biografías, para expresar sensaciones, emociones, sentimientos e ideas que experimenta en su entorno familiar, escolar o comunitario."
  },
  {
    id: 10,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Primer Grado",
    contenido: "Los géneros periodísticos y sus recursos para comunicar sucesos significativos familiares, escolares, comunitarios y sociales",
    pda: "Identifica sucesos significativos familiares, escolares, comunitarios y sociales que forman parte de la memoria colectiva y los comunica haciendo uso de las características de los géneros periodísticos informativos."
  },
  {
    id: 11,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Primer Grado",
    contenido: "Comunicación asertiva y dialógica para erradicar expresiones de violencia",
    pda: "Realiza, de manera colectiva, una propuesta oral o por escrito, para promover acciones que posibiliten erradicar la violencia en las familias y la escuela."
  },
  {
    id: 12,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Primer Grado",
    contenido: "Comunicación asertiva y dialógica para erradicar expresiones de violencia",
    pda: "Elabora solicitudes de gestión de espacios y recursos para dar a conocer la propuesta."
  },
  {
    id: 13,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Primer Grado",
    contenido: "Mensajes para promover una vida saludable, expresados en medios comunitarios o masivos de comunicación",
    pda: "Identifica las características y recursos de mensajes que promueven una vida saludable a través de los diferentes medios comunitarios o masivos de comunicación impresos o audiovisuales."
  },
  {
    id: 14,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Primer Grado",
    contenido: "Textos de divulgación científica",
    pda: "Identifica las características del texto de divulgación científica y elabora uno."
  },
  {
    id: 15,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Primer Grado",
    contenido: "Manifestaciones culturales y artísticas que favorecen una sociedad incluyente",
    pda: "Reconoce manifestaciones culturales y artísticas creadas o ejecutadas por personas con alguna discapacidad, para distinguir sus valores estéticos y creativos y las comparte en forma oral o escrita con la comunidad."
  },
  // LENGUAJES - ESPAÑOL - SEGUNDO GRADO
  {
    id: 16,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Segundo Grado",
    contenido: "La diversidad de lenguas y su uso en la comunicación familiar, escolar y comunitaria",
    pda: "Comprende las características y recursos lingüísticos de la lengua española, para usarlos y valorarlos como parte de la riqueza pluricultural de México y del mundo."
  },
  {
    id: 17,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Segundo Grado",
    contenido: "La diversidad étnica, cultural y lingüística de México a favor de una sociedad intercultural",
    pda: "Compara y contrasta textos sobre las tensiones y conflictos en las sociedades contemporáneas y manifiesta, de manera oral o escrita, la necesidad de practicar la comunicación asertiva."
  },
  {
    id: 18,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Segundo Grado",
    contenido: "La diversidad étnica, cultural y lingüística de México a favor de una sociedad intercultural",
    pda: "Analiza textos sobre las sociedades multiculturales y expresa la función que tiene el diálogo intercultural para la construcción democrática y la interacción en sociedad."
  },
  {
    id: 19,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Segundo Grado",
    contenido: "Las lenguas como manifestación de la identidad y el sentido de pertenencia",
    pda: "Comprende y redacta textos narrativos sobre la construcción de la identidad y el sentido de pertenencia, a partir del análisis de variantes del español."
  },
  {
    id: 20,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Segundo Grado",
    contenido: "El dinamismo de las lenguas y su relevancia como patrimonio cultural",
    pda: "Reconoce cambios temporales y geográficos del español en la comunidad, el país o el mundo hispano."
  },
  {
    id: 21,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Segundo Grado",
    contenido: "La función creativa del español en la expresión de necesidades e intereses comunitarios",
    pda: "Expresa, mediante un ensayo, una postura crítica sobre necesidades, intereses y problemas de la comunidad."
  },
  {
    id: 22,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Segundo Grado",
    contenido: "Textos literarios escritos en español o traducidos",
    pda: "Analiza diversos textos literarios de su elección para expresar un juicio estético y lo comparte en la comunidad."
  },
  // LENGUAJES - ESPAÑOL - TERCER GRADO
  {
    id: 31,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Tercer Grado",
    contenido: "La diversidad de lenguas y su uso en la comunicación familiar, escolar y comunitaria",
    pda: "Analiza y reconoce algunas variantes lingüísticas de la lengua española, para valorarla como riqueza cultural."
  },
  {
    id: 32,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Tercer Grado",
    contenido: "La diversidad étnica, cultural y lingüística de México a favor de una sociedad intercultural",
    pda: "Practica la comunicación asertiva y el diálogo intercultural en interacción con otras personas."
  },
  {
    id: 33,
    campoFormativo: "lenguajes",
    disciplina: "ESPAÑOL",
    grado: "Tercer Grado",
    contenido: "La función creativa del español en la expresión de necesidades e intereses comunitarios",
    pda: "Crea textos literarios de distintos géneros para ofrecer una propuesta de solución a problemas de la comunidad."
  },

  // LENGUAJES - ARTES - PRIMER GRADO
  {
    id: 41,
    campoFormativo: "lenguajes",
    disciplina: "ARTES",
    grado: "Primer Grado",
    contenido: "Diversidad de lenguajes artísticos en la riqueza pluricultural de México y del mundo.",
    pda: "Reconoce en manifestaciones artísticas de México y del mundo el uso del cuerpo, del espacio y del tiempo, para valorarlas como parte de la riqueza pluricultural."
  },
  {
    id: 42,
    campoFormativo: "lenguajes",
    disciplina: "ARTES",
    grado: "Primer Grado",
    contenido: "Manifestaciones culturales y artísticas que conforman la diversidad étnica, cultural y lingüística.",
    pda: "Identifica diferentes manifestaciones culturales y artísticas de pueblos indígenas y afrodescendientes de México y del mundo, para interpretar significados que permitan fomentar una sociedad intercultural."
  },
  {
    id: 43,
    campoFormativo: "lenguajes",
    disciplina: "ARTES",
    grado: "Primer Grado",
    contenido: "Los lenguajes artísticos en la expresión de problemas de la comunidad.",
    pda: "Usa intencionalmente formas, colores, movimientos y sonidos, entre otros elementos de las artes, para recrear una situación problemática de su contexto y manifestar una postura crítica."
  },
  // LENGUAJES - ARTES - SEGUNDO GRADO
  {
    id: 51,
    campoFormativo: "lenguajes",
    disciplina: "ARTES",
    grado: "Segundo Grado",
    contenido: "Patrimonio cultural de la comunidad en manifestaciones artísticas que fomentan la identidad y el sentido de pertenencia.",
    pda: "Expresa, mediante lenguajes artísticos, la relevancia de valorar, conservar y preservar el patrimonio cultural, como legado que le otorga identidad y sentido de pertenencia."
  },
  {
    id: 52,
    campoFormativo: "lenguajes",
    disciplina: "ARTES",
    grado: "Segundo Grado",
    contenido: "Vida saludable expresada a través de mensajes construidos con elementos de las artes, para difundirlos por distintos medios de comunicación.",
    pda: "Crea mensajes que promuevan una vida saludable, utilizando artísticamente formas, colores, movimientos y sonidos, entre otros elementos de las artes, para difundirlos por distintos medios de comunicación."
  },

  // LENGUAJES - INGLES - PRIMER GRADO
  {
    id: 61,
    campoFormativo: "lenguajes",
    disciplina: "INGLES",
    grado: "Primer Grado",
    contenido: "La diversidad lingüística y sus formas de expresión en México y el mundo.",
    pda: "Hace uso del alfabeto, los números y las expresiones básicas en inglés, para nombrar y recuperar datos factuales y características básicas de lenguas reconocidas en México y el mundo."
  },
  {
    id: 62,
    campoFormativo: "lenguajes",
    disciplina: "INGLES",
    grado: "Primer Grado",
    contenido: "Las manifestaciones culturales, lingüísticas y artísticas en inglés a favor de la interculturalidad.",
    pda: "Elabora un cómic o manga en inglés sobre situaciones donde se rescata la importancia de la interculturalidad."
  },
  // LENGUAJES - INGLES - SEGUNDO GRADO
  {
    id: 71,
    campoFormativo: "lenguajes",
    disciplina: "INGLES",
    grado: "Segundo Grado",
    contenido: "La diversidad lingüística y sus formas de expresión en México y el mundo.",
    pda: "Comprende textos narrativos y biográficos en inglés sobre la vida cotidiana, formas de interacción y comportamiento de hablantes de diversas lenguas de México y el mundo en el pasado, y lo expresa en organizadores gráficos, infografías u otras formas de presentación escrita y oral."
  },
  {
    id: 72,
    campoFormativo: "lenguajes",
    disciplina: "INGLES",
    grado: "Segundo Grado",
    contenido: "La identidad y cultura de pueblos de habla inglesa.",
    pda: "Elabora fichas informativas en inglés sobre rasgos identitarios de pueblos de habla inglesa (acento, grafía, vestimenta, comida, tradiciones, costumbres, entre otros)."
  },

  // SABERES Y PENSAMIENTO CIENTIFICO - MATEMATICAS
  {
    id: 81,
    campoFormativo: "SABERES",
    disciplina: "MATEM",
    grado: "Primer Grado",
    contenido: "Expresión de fracciones como decimales y de decimales como fracciones",
    pda: "Usa diversas estrategias al convertir números fraccionarios a decimales y viceversa."
  },
  {
    id: 82,
    campoFormativo: "SABERES",
    disciplina: "MATEM",
    grado: "Primer Grado",
    contenido: "Extensión de los números a positivos y negativos y su orden",
    pda: "Compara y ordena números con signo (enteros, fracciones y decimales) en la recta numérica y analiza en qué casos se cumple la propiedad de densidad."
  },
  {
    id: 83,
    campoFormativo: "SABERES",
    disciplina: "MATEM",
    grado: "Primer Grado",
    contenido: "Regularidades y patrones",
    pda: "Representa algebraicamente una sucesión con progresión aritmética de figuras y números."
  },
  {
    id: 84,
    campoFormativo: "SABERES",
    disciplina: "MATEM",
    grado: "Primer Grado",
    contenido: "Ecuaciones lineales y cuadráticas",
    pda: "Modela y resuelve problemas cuyo planteamiento es una ecuación lineal."
  },
  {
    id: 85,
    campoFormativo: "SABERES",
    disciplina: "MATEM",
    grado: "Segundo Grado",
    contenido: "Ecuaciones lineales y cuadráticas",
    pda: "Modela y soluciona sistemas de dos ecuaciones lineales con dos incógnitas por algún método para dar respuesta a un problema."
  },
  {
    id: 86,
    campoFormativo: "SABERES",
    disciplina: "MATEM",
    grado: "Tercer Grado",
    contenido: "Ecuaciones lineales y cuadráticas",
    pda: "Resuelve ecuaciones de la forma Ax²+Bx+C=0 por factorización y fórmula general."
  },

  // SABERES Y PENSAMIENTO CIENTIFICO - BIOLOGIA (PRIMER GRADO)
  {
    id: 91,
    campoFormativo: "SABERES",
    disciplina: "BIOLOGIA",
    grado: "Primer Grado",
    contenido: "Funcionamiento del cuerpo humano coordinado por los sistemas nervioso y endocrino.",
    pda: "Explica la participación de los sistemas nervioso y endocrino en la coordinación de las funciones del cuerpo humano; reconoce el papel general de las hormonas y sus efectos en la maduración sexual y en la reproducción."
  },
  {
    id: 92,
    campoFormativo: "SABERES",
    disciplina: "BIOLOGIA",
    grado: "Primer Grado",
    contenido: "Salud sexual y reproductiva: prevención de infecciones de transmisión sexual y del embarazo en adolescentes.",
    pda: "Compara la efectividad de los métodos anticonceptivos como apoyo para planificar el embarazo desde la perspectiva del proyecto de vida, con acompañamiento de los servicios amigables; valora la efectividad del condón por su doble protección."
  },
  {
    id: 93,
    campoFormativo: "SABERES",
    disciplina: "BIOLOGIA",
    grado: "Primer Grado",
    contenido: "La biodiversidad como expresión del cambio de los seres vivos in el tiempo.",
    pda: "Analiza información acerca del estado de la biodiversidad local a partir de fuentes directas, orales, escritas, audiovisuales o Internet, expone razones sobre su importancia cultural, biológica, estética y ética; propone acciones para su cuidado."
  },

  // SABERES Y PENSAMIENTO CIENTIFICO - FISICA (SEGUNDO GRADO)
  {
    id: 101,
    campoFormativo: "SABERES",
    disciplina: "FISICA",
    grado: "Segundo Grado",
    contenido: "El pensamiento científico, una forma de plantear y solucionar problemas y su incidencia en la transformación de la sociedad.",
    pda: "Describe problemas comunes de la vida cotidiana explicando cómo se procede para buscarles solución; conoce y caracteriza el pensamiento científico para plantearse y resolver problemas en la escuela y su cotidianeidad."
  },
  {
    id: 102,
    campoFormativo: "SABERES",
    disciplina: "FISICA",
    grado: "Segundo Grado",
    contenido: "Saberes y prácticas para el aprovechamiento de energías y la sustentabilidad.",
    pda: "Identifica saberes, prácticas y artefactos sobre el aprovechamiento de las diversas formas de energía renovables y no renovables, su empleo y origen en su comunidad (solar, eólica, hidráulica, geológica, mareomotriz y nuclear) y valora sus beneficios."
  },

  // SABERES Y PENSAMIENTO CIENTIFICO - QUIMICA (TERCER GRADO)
  {
    id: 111,
    campoFormativo: "SABERES",
    disciplina: "QUIMICA",
    grado: "Tercer Grado",
    contenido: "Las propiedades extensivas e intensivas, como una forma de identificar sustancias y materiales de uso común, así como el aprovechamiento en actividades humanas.",
    pda: "Formula hipótesis para diferenciar propiedades extensivas e intensivas mediante actividades experimentales y, con base en el análisis de resultados, elabora conclusiones."
  },
  {
    id: 112,
    campoFormativo: "SABERES",
    disciplina: "QUIMICA",
    grado: "Tercer Grado",
    contenido: "Composición de las mezclas y su clasificación en homogéneas y heterogéneas, así como métodos de separación aplicados en diferentes contextos.",
    pda: "Deduce métodos para separar mezclas (evaporación, decantación, filtración, extracción, sublimación, cromatografía y cristalización) mediante actividades experimentales con base en las propiedades físicas de las sustancias involucradas."
  },

  // ETICA, NATURALEZA Y SOCIEDADES - GEOGRAFIA (PRIMER GRADO)
  {
    id: 121,
    campoFormativo: "ETICA NyS",
    disciplina: "GEO",
    grado: "Primer Grado",
    contenido: "El espacio geográfico como una construcción social y colectiva.",
    pda: "Comprende que el espacio geográfico se conforma de interrelaciones sociedad-naturaleza y reconoce que el patrimonio biocultural es resultado de esta relación a través del tiempo."
  },
  {
    id: 122,
    campoFormativo: "ETICA NyS",
    disciplina: "GEO",
    grado: "Primer Grado",
    contenido: "Los retos sociales y ambientales en la comunidad, en México y el mundo.",
    pda: "Asume responsabilidad como agente de cambio para encontrar soluciones a las problemáticas sociales y ambientales de la comunidad."
  },

  // ETICA, NATURALEZA Y SOCIEDADES - HISTORIA
  {
    id: 131,
    campoFormativo: "ETICA NyS",
    disciplina: "HIST",
    grado: "Primer Grado",
    contenido: "Los albores de la humanidad: los pueblos antiguos del mundo y su devenir.",
    pda: "Reflexiona acerca de la importancia de las fuentes históricas para la interpretación de hechos y procesos y compara lo común y lo diverso de los mitos fundacionales."
  },
  {
    id: 132,
    campoFormativo: "ETICA NyS",
    disciplina: "HIST",
    grado: "Segundo Grado",
    contenido: "La conformación de las metrópolis y los sistemas de dominación.",
    pda: "Problematiza sobre los factores políticos, económicos, culturales, tecnológicos, militares y religiosos que predominaban en los pueblos indígenas en el momento de su enfrentamiento con los españoles."
  },
  {
    id: 133,
    campoFormativo: "ETICA NyS",
    disciplina: "HIST",
    grado: "Tercer Grado",
    contenido: "Las revoluciones modernas y sus tendencias",
    pda: "Ubica la confluencia de causas para que la primera Revolución Industrial suceda en Inglaterra y se desarrolle el sistema capitalista, explicando su relevancia en nuestras vidas."
  },

  // ETICA, NATURALEZA Y SOCIEDADES - FORMACION CIVICA Y ETICA
  {
    id: 141,
    campoFormativo: "ETICA NyS",
    disciplina: "FCyE",
    grado: "Primer Grado",
    contenido: "El conflicto en la convivencia humana desde la cultura de paz.",
    pda: "Analiza distintos tipos de conflictos en sus espacios de convivencia, su estructura y formas de solucionarlos desde la cultura de paz como una oportunidad de crecimiento personal y social."
  },
  {
    id: 142,
    campoFormativo: "ETICA NyS",
    disciplina: "FCyE",
    grado: "Segundo Grado",
    contenido: "La cultura de paz y la creación de ambientes que garanticen el respeto a la vida y la dignidad del ser humano.",
    pda: "Aplica la cultura de paz para tomar decisiones responsables en contextos presenciales y virtuales que promuevan el respeto a la dignidad, la diversidad, la inclusión y la interculturalidad."
  },

  // DE LO HUMANO Y LO COMUNITARIO - TECNOLOGIA
  {
    id: 151,
    campoFormativo: "HUMANO Y C",
    disciplina: "TECNO",
    grado: "Primer Grado",
    contenido: "Pensamiento estratégico y creativo en la resolución de problemas",
    pda: "Analiza necesidades del entorno cercano para plantear un problema, investigar alternativas de solución y seleccionar la mejor opción."
  },
  {
    id: 152,
    campoFormativo: "HUMANO Y C",
    disciplina: "TECNO",
    grado: "Segundo Grado",
    contenido: "Procesos técnicos",
    pda: "Analiza los diferentes sistemas técnicos: artesanales, industriales y automatizados, reconociendo sus características y vínculos con la ciencia, la sociedad, la cultura, la economía y la naturaleza."
  },

  // DE LO HUMANO Y LO COMUNITARIO - TUTORIA
  {
    id: 161,
    campoFormativo: "HUMANO Y C",
    disciplina: "TUTORIA",
    grado: "Primer Grado",
    contenido: "Construcción del proyecto de vida",
    pda: "Reconoce cambios presentes a lo largo de la vida y en la adolescencia para definir metas personales y en colectivo, a alcanzar en un corto, mediano y largo plazo."
  },

  // DE LO HUMANO Y LO COMUNITARIO - EDUCACION FISICA
  {
    id: 171,
    campoFormativo: "HUMANO Y C",
    disciplina: "ED. FIS",
    grado: "Primer Grado",
    contenido: "Estilos de vida activos y saludables",
    pda: "Implementa acciones que le permiten mantenerse físicamente activo en diferentes momentos del día, para favorecer la práctica de estilos de vida saludables."
  },

  // PREESCOLAR - LENGUAJES
  {
    id: 1001,
    nivel: "Preescolar",
    campoFormativo: "lenguajes",
    disciplina: "PREESCOLAR",
    grado: "1º de Preescolar",
    contenido: "Comunicación oral de necesidades, emociones, gustos, ideas y saberes, a través de los diversos lenguajes, desde una perspectiva comunitaria.",
    pda: "Emplea palabras, gestos, señas, imágenes, sonidos o movimientos corporales que aprende en su comunidad, para expresar necesidades, ideas, emociones y gustos que reflejan su forma de interpretar y actuar en el mundo."
  },
  {
    id: 1002,
    nivel: "Preescolar",
    campoFormativo: "lenguajes",
    disciplina: "PREESCOLAR",
    grado: "2º de Preescolar",
    contenido: "Comunicación oral de necesidades, emociones, gustos, ideas y saberes, a través de los diversos lenguajes, desde una perspectiva comunitaria.",
    pda: "Manifiesta oralmente y de manera clara necesidades, emociones, gustos, preferencias e ideas, que construye en la convivencia diaria, y se da a entender usando distintos lenguajes."
  },
  {
    id: 1003,
    nivel: "Preescolar",
    campoFormativo: "lenguajes",
    disciplina: "PREESCOLAR",
    grado: "3º de Preescolar",
    contenido: "Comunicación oral de necesidades, emociones, gustos, ideas y saberes, a través de los diversos lenguajes, desde una perspectiva comunitaria.",
    pda: "De manera oral y con seguridad, expresa ideas completas sobre necesidades, vivencias, emociones, gustos, preferencias y saberes a distintas personas, combinando los lenguajes en su vida diaria."
  },
  {
    id: 1004,
    nivel: "Preescolar",
    campoFormativo: "lenguajes",
    disciplina: "PREESCOLAR",
    grado: "1º de Preescolar",
    contenido: "Narración de historias mediante diversos lenguajes, en un ambiente donde niñas y niños participen y se apropien de la cultura escrita.",
    pda: "Describe lugares o personajes de las historias o textos literarios que conoce y relaciona con personas y hechos de su comunidad."
  },
  {
    id: 1005,
    nivel: "Preescolar",
    campoFormativo: "lenguajes",
    disciplina: "PREESCOLAR",
    grado: "2º de Preescolar",
    contenido: "Narración de historias mediante diversos lenguajes, en un ambiente donde niñas y niños participen y se apropien de la cultura escrita.",
    pda: "Lee de manera colectiva narraciones e historias, y realiza secuencias de imágenes o dibujos para representar el orden de los acontecimientos."
  },
  {
    id: 1006,
    nivel: "Preescolar",
    campoFormativo: "lenguajes",
    disciplina: "PREESCOLAR",
    grado: "3º de Preescolar",
    contenido: "Narración de historias mediante diversos lenguajes, en un ambiente donde niñas y niños participen y se apropien de la cultura escrita.",
    pda: "Inventa y narra historias, personajes y lugares que imagina o asocia con su contexto, utilizando recursos de los lenguajes, para compartirlas con sus pares."
  },
  {
    id: 1007,
    nivel: "Preescolar",
    campoFormativo: "lenguajes",
    disciplina: "PREESCOLAR",
    grado: "1º de Preescolar",
    contenido: "Expresión de emociones y experiencias de manera gráfica y con recursos de los lenguajes.",
    pda: "Representa emociones y vivencias cotidianas usando recursos gráficos personales o de los lenguajes artísticos."
  },
  {
    id: 1008,
    nivel: "Preescolar",
    campoFormativo: "lenguajes",
    disciplina: "PREESCOLAR",
    grado: "2º de Preescolar",
    contenido: "Expresión de emociones y experiencias de manera gráfica and con recursos de los lenguajes.",
    pda: "Elige recursos gráficos de su preferencia para plasmar emociones, ideas o vivencias y los comparte con sus pares."
  },
  {
    id: 1009,
    nivel: "Preescolar",
    campoFormativo: "lenguajes",
    disciplina: "PREESCOLAR",
    grado: "3º de Preescolar",
    contenido: "Expresión de emociones y experiencias de manera gráfica y con recursos de los lenguajes.",
    pda: "Elabora producciones gráficas que expresan sus gustos, miedos, alegrías y otras emociones de forma detallada y creativa."
  },

  // PREESCOLAR - SABERES
  {
    id: 1021,
    nivel: "Preescolar",
    campoFormativo: "SABERES",
    disciplina: "PREESCOLAR",
    grado: "1º de Preescolar",
    contenido: "Exploración de la diversidad natural que existe en la comunidad y en otros lugares.",
    pda: "Observa y describe, en su lengua materna, animales, plantas, cuerpos de agua y otros elementos de la naturaleza de su entorno."
  },
  {
    id: 1022,
    nivel: "Preescolar",
    campoFormativo: "SABERES",
    disciplina: "PREESCOLAR",
    grado: "2º de Preescolar",
    contenido: "Exploración de la diversidad natural que existe en la comunidad y en otros lugares.",
    pda: "Compara y registra información sobre las características de plantas y animales de su entorno y de otros lugares."
  },
  {
    id: 1023,
    nivel: "Preescolar",
    campoFormativo: "SABERES",
    disciplina: "PREESCOLAR",
    grado: "3º de Preescolar",
    contenido: "Exploración de la diversidad natural que existe en la comunidad y en otros lugares.",
    pda: "Distingue y explica algunas características del entorno natural, como el clima, las plantas, los animales, los cuerpos de agua, etc., proponiendo acciones de cuidado."
  },
  {
    id: 1024,
    nivel: "Preescolar",
    campoFormativo: "SABERES",
    disciplina: "PREESCOLAR",
    grado: "1º de Preescolar",
    contenido: "Los saberes familiares y comunitarios que resuelven situaciones y necesidades en el hogar y la comunidad.",
    pda: "Comparte saberes familiares sobre el uso de herramientas o técnicas en actividades de la casa o de la comunidad."
  },
  {
    id: 1025,
    nivel: "Preescolar",
    campoFormativo: "SABERES",
    disciplina: "PREESCOLAR",
    grado: "2º de Preescolar",
    contenido: "Los saberes familiares y comunitarios que resuelven situaciones y necesidades en el hogar y la comunidad.",
    pda: "Identifica y describe cómo se utilizan algunos objetos y herramientas en actividades cotidianas del hogar y de la escuela."
  },
  {
    id: 1026,
    nivel: "Preescolar",
    campoFormativo: "SABERES",
    disciplina: "PREESCOLAR",
    grado: "3º de Preescolar",
    contenido: "Los saberes familiares y comunitarios que resuelven situaciones y necesidades en el hogar y la comunidad.",
    pda: "Propone y aplica saberes de su familia y comunidad para resolver problemas cotidianos, explicando cómo funcionan ciertos objetos o procesos."
  },

  // PREESCOLAR - ETICA NyS
  {
    id: 1041,
    nivel: "Preescolar",
    campoFormativo: "ETICA NyS",
    disciplina: "PREESCOLAR",
    grado: "1º de Preescolar",
    contenido: "Interacción, cuidado y conservación de la naturaleza, que favorece la construcción de una conciencia ambiental.",
    pda: "Convive con el entorno natural, plantas y animales, expresando lo que percibe y siente de ellos, y participa en su cuidado."
  },
  {
    id: 1042,
    nivel: "Preescolar",
    campoFormativo: "ETICA NyS",
    disciplina: "PREESCOLAR",
    grado: "2º de Preescolar",
    contenido: "Interacción, cuidado y conservación de la naturaleza, que favorece la construcción de una conciencia ambiental.",
    pda: "Reconoce que las personas dependen de la naturaleza y que algunas actividades humanas la dañan, identificando acciones de cuidado y respeto."
  },
  {
    id: 1043,
    nivel: "Preescolar",
    campoFormativo: "ETICA NyS",
    disciplina: "PREESCOLAR",
    grado: "3º de Preescolar",
    contenido: "Interacción, cuidado y conservación de la naturaleza, que favorece la construcción de una conciencia ambiental.",
    pda: "Manifiesta interés y asume responsabilidades para cuidar y preservar su entorno natural local, promoviendo acciones sustentables con sus pares."
  },
  {
    id: 1044,
    nivel: "Preescolar",
    campoFormativo: "ETICA NyS",
    disciplina: "PREESCOLAR",
    grado: "1º de Preescolar",
    contenido: "La cultura de paz como una forma de relacionarse con otras personas y promover la convivencia sana.",
    pda: "Establece relaciones amistosas basadas en el respeto y el diálogo con sus compañeras y compañeros, evitando la agresión física o verbal."
  },
  {
    id: 1045,
    nivel: "Preescolar",
    campoFormativo: "ETICA NyS",
    disciplina: "PREESCOLAR",
    grado: "2º de Preescolar",
    contenido: "La cultura de paz como una forma de relacionarse con otras personas y promover la convivencia sana.",
    pda: "Identifica y valora situaciones de injusticia, exclusión o violencia, y propone soluciones pacíficas mediante el diálogo grupal."
  },
  {
    id: 1046,
    nivel: "Preescolar",
    campoFormativo: "ETICA NyS",
    disciplina: "PREESCOLAR",
    grado: "3º de Preescolar",
    contenido: "La cultura de paz como una forma de relacionarse con otras personas y promover la convivencia sana.",
    pda: "Colabora en la construcción de acuerdos y normas para la convivencia en el aula y la escuela, y actúa con apego a la cultura de paz."
  },

  // PREESCOLAR - HUMANO Y C
  {
    id: 1061,
    nivel: "Preescolar",
    campoFormativo: "HUMANO Y C",
    disciplina: "PREESCOLAR",
    grado: "1º de Preescolar",
    contenido: "Construcción de la identidad personal a partir de su origen étnico, cultural y lingüístico, y la interacción con personas cercanas.",
    pda: "Describe quién es, cómo se llama, qué le gusta, expresando sentimientos que tiene hacia sí mismo y su familia."
  },
  {
    id: 1062,
    nivel: "Preescolar",
    campoFormativo: "HUMANO Y C",
    disciplina: "PREESCOLAR",
    grado: "2º de Preescolar",
    contenido: "Construcción de la identidad personal a partir de su origen étnico, cultural y lingüístico, y la interacción con personas cercanas.",
    pda: "Reconoce características personales, físicas y de personalidad, valorando lo que comparte con otros y lo que lo hace único."
  },
  {
    id: 1063,
    nivel: "Preescolar",
    campoFormativo: "HUMANO Y C",
    disciplina: "PREESCOLAR",
    grado: "3º de Preescolar",
    contenido: "Construcción de la identidad personal a partir de su origen étnico, cultural y lingüístico, y la interacción con personas cercanas.",
    pda: "Expresa orgullo de su origen, lengua y cultura, identificando elementos que comparte con personas de su entorno y del país."
  },
  {
    id: 1064,
    nivel: "Preescolar",
    campoFormativo: "HUMANO Y C",
    disciplina: "PREESCOLAR",
    grado: "1º de Preescolar",
    contenido: "Cuidado de la salud personal y colectiva, a partir de acciones de higiene, limpieza y actividad física.",
    pda: "Practica hábitos de higiene personal, lavado de manos y limpieza de sus espacios de juego y aprendizaje, con apoyo."
  },
  {
    id: 1065,
    nivel: "Preescolar",
    campoFormativo: "HUMANO Y C",
    disciplina: "PREESCOLAR",
    grado: "2º de Preescolar",
    contenido: "Cuidado de la salud personal y colectiva, a partir de acciones de higiene, limpieza y actividad física.",
    pda: "Reconoce la importancia de la alimentación saludable, el consumo de agua simple potable y la higiene, adoptándolos de forma autónoma."
  },
  {
    id: 1066,
    nivel: "Preescolar",
    campoFormativo: "HUMANO Y C",
    disciplina: "PREESCOLAR",
    grado: "3º de Preescolar",
    contenido: "Cuidado de la salud personal y colectiva, a partir de acciones de higiene, limpieza y actividad física.",
    pda: "Propone y lleva a cabo acciones de cuidado personal y colectivo, como la actividad física constante, alimentación nutritiva e higiene general."
  },

  // PRIMARIA - LENGUAJES
  {
    id: 2001,
    nivel: "Primaria",
    campoFormativo: "lenguajes",
    disciplina: "PRIMARIA",
    grado: "Primer Grado",
    contenido: "Escritura de nombres en la lengua materna.",
    pda: "Escribe su nombre y lo compara con los nombres de sus compañeros, usa su nombre para indicar la autoría de sus trabajos de clase."
  },
  {
    id: 2002,
    nivel: "Primaria",
    campoFormativo: "lenguajes",
    disciplina: "PRIMARIA",
    grado: "Segundo Grado",
    contenido: "Escritura de nombres en la lengua materna.",
    pda: "Escribe su nombre completo y el de sus familiares o amigos con diversos propósitos sociales y de comunicación."
  },
  {
    id: 2003,
    nivel: "Primaria",
    campoFormativo: "lenguajes",
    disciplina: "PRIMARIA",
    grado: "Primer Grado",
    contenido: "Lectura, escritura y otros tipos de interacción con emisiones orales y escritas en su entorno familiar y comunitario.",
    pda: "Explora libros, revistas o carteles de su interés y comparte sus hallazgos de forma oral empleando ilustraciones."
  },
  {
    id: 2004,
    nivel: "Primaria",
    campoFormativo: "lenguajes",
    disciplina: "PRIMARIA",
    grado: "Segundo Grado",
    contenido: "Lectura, escritura y otros tipos de interacción con emisiones orales y escritas en su entorno familiar y comunitario.",
    pda: "Realiza lecturas conjuntas y registros escritos breves sobre temas de interés general relacionados con la vida cotidiana en el hogar."
  },
  {
    id: 2005,
    nivel: "Primaria",
    campoFormativo: "lenguajes",
    disciplina: "PRIMARIA",
    grado: "Tercer Grado",
    contenido: "Descripción de personas, lugares, hechos y procesos.",
    pda: "Reflexiona sobre el uso de adjetivos, frases adjetivas y adverbios para detallar descripciones de procesos y lugares cercanos."
  },
  {
    id: 2006,
    nivel: "Primaria",
    campoFormativo: "lenguajes",
    disciplina: "PRIMARIA",
    grado: "Cuarto Grado",
    contenido: "Descripción de personas, lugares, hechos y procesos.",
    pda: "Planea, escribe, revisa y comparte textos descriptivos sobre procesos naturales o hechos históricos empleando nexos temporales."
  },
  {
    id: 2007,
    nivel: "Primaria",
    campoFormativo: "lenguajes",
    disciplina: "PRIMARIA",
    grado: "Tercer Grado",
    contenido: "Búsqueda y manejo reflexivo de información.",
    pda: "Formula preguntas para localizar información de interés y emplea tablas, notas o esquemas para registrar lo que encuentra."
  },
  {
    id: 2008,
    nivel: "Primaria",
    campoFormativo: "lenguajes",
    disciplina: "PRIMARIA",
    grado: "Cuarto Grado",
    contenido: "Búsqueda y manejo reflexivo de información.",
    pda: "Emplea elementos de apoyo como índices, títulos, glosarios y notas al pie de página para localizar y sintetizar información compleja."
  },
  {
    id: 2009,
    nivel: "Primaria",
    campoFormativo: "lenguajes",
    disciplina: "PRIMARIA",
    grado: "Quinto Grado",
    contenido: "Comprensión y producción de textos argumentativos.",
    pda: "Lee textos sobre temas polémicos y distingue las opiniones de los datos y hechos concretos que sustentan la argumentación del autor."
  },
  {
    id: 2010,
    nivel: "Primaria",
    campoFormativo: "lenguajes",
    disciplina: "PRIMARIA",
    grado: "Sexto Grado",
    contenido: "Comprensión y producción de textos argumentativos.",
    pda: "Escribe textos argumentativos en los que expresa su opinión fundamentada en datos duros de fuentes confiables, debatiendo con respeto."
  },
  {
    id: 2011,
    nivel: "Primaria",
    campoFormativo: "lenguajes",
    disciplina: "PRIMARIA",
    grado: "Quinto Grado",
    contenido: "Análisis y representación de textos dramáticos.",
    pda: "Analiza obras teatrales breves y representa historias que abordan temáticas sociales de su interés mediante títeres o actuación."
  },
  {
    id: 2012,
    nivel: "Primaria",
    campoFormativo: "lenguajes",
    disciplina: "PRIMARIA",
    grado: "Sexto Grado",
    contenido: "Análisis y representación de textos dramáticos.",
    pda: "Crea y representa una obra teatral original que visibilice un problema de la escuela o comunidad, aportando posibles alternativas creativas."
  },

  // PRIMARIA - SABERES
  {
    id: 2031,
    nivel: "Primaria",
    campoFormativo: "SABERES",
    disciplina: "PRIMARIA",
    grado: "Primer Grado",
    contenido: "Estudio de los números.",
    pda: "Expresa oralmente la sucesión numérica en su lengua materna y en español, de manera ascendente y descendente hasta el 100."
  },
  {
    id: 2032,
    nivel: "Primaria",
    campoFormativo: "SABERES",
    disciplina: "PRIMARIA",
    grado: "Segundo Grado",
    contenido: "Estudio de los números.",
    pda: "Expresa oralmente la sucesión numérica de forma progresiva y regresiva de diversas maneras hasta el 1000, identificando regularidades."
  },
  {
    id: 2033,
    nivel: "Primaria",
    campoFormativo: "SABERES",
    disciplina: "PRIMARIA",
    grado: "Tercer Grado",
    contenido: "Estudio de los números.",
    pda: "Expresa de forma oral y escrita la sucesión numérica hasta el 10,000 de manera ascendente y descendente, y comprende las fracciones de uso común."
  },
  {
    id: 2034,
    nivel: "Primaria",
    campoFormativo: "SABERES",
    disciplina: "PRIMARIA",
    grado: "Cuarto Grado",
    contenido: "Estudio de los números.",
    pda: "Aplica la sucesión numérica hasta de cinco cifras e interpreta números decimales y fracciones equivalentes en diferentes contextos cotidianos."
  },
  {
    id: 2035,
    nivel: "Primaria",
    campoFormativo: "SABERES",
    disciplina: "PRIMARIA",
    grado: "Quinto Grado",
    contenido: "Estudio de los números.",
    pda: "Ordena, lee, escribe y compara números de hasta seis cifras, así como fracciones y números decimales en situaciones prácticas."
  },
  {
    id: 2036,
    nivel: "Primaria",
    campoFormativo: "SABERES",
    disciplina: "PRIMARIA",
    grado: "Sexto Grado",
    contenido: "Estudio de los números.",
    pda: "Resuelve problemas que implican la lectura, escritura y comparación de números naturales, fraccionarios y decimales de cualquier orden de magnitud."
  },
  {
    id: 2037,
    nivel: "Primaria",
    campoFormativo: "SABERES",
    disciplina: "PRIMARIA",
    grado: "Primer Grado",
    contenido: "Estructura y funcionamiento del cuerpo humano.",
    pda: "Identifica y describe la localización de los órganos de los sentidos y sus funciones principales, proponiendo acciones de higiene y cuidado."
  },
  {
    id: 2038,
    nivel: "Primaria",
    campoFormativo: "SABERES",
    disciplina: "PRIMARIA",
    grado: "Segundo Grado",
    contenido: "Estructura y funcionamiento del cuerpo humano.",
    pda: "Describe los cambios físicos que experimenta su cuerpo al crecer, comparándolos con los de sus compañeros para favorecer el autoconocimiento."
  },
  {
    id: 2039,
    nivel: "Primaria",
    campoFormativo: "SABERES",
    disciplina: "PRIMARIA",
    grado: "Tercer Grado",
    contenido: "Estructura y funcionamiento del cuerpo humano.",
    pda: "Identifica y explica la estructura y funcionamiento del sistema locomotor y el sistema digestivo, proponiendo prácticas alimentarias saludables."
  },
  {
    id: 2040,
    nivel: "Primaria",
    campoFormativo: "SABERES",
    disciplina: "PRIMARIA",
    grado: "Cuarto Grado",
    contenido: "Estructura y funcionamiento del cuerpo humano.",
    pda: "Explica la estructura del sistema respiratorio, circulatorio e inmunológico, y comprende la relación entre estos sistemas para la conservación de la salud."
  },
  {
    id: 2041,
    nivel: "Primaria",
    campoFormativo: "SABERES",
    disciplina: "PRIMARIA",
    grado: "Quinto Grado",
    contenido: "Estructura y funcionamiento del cuerpo humano.",
    pda: "Describe el funcionamiento del sistema reproductor masculino y femenino, y comprende las etapas de desarrollo humano y la importancia de la higiene sexual."
  },
  {
    id: 2042,
    nivel: "Primaria",
    campoFormativo: "SABERES",
    disciplina: "PRIMARIA",
    grado: "Sexto Grado",
    contenido: "Estructura y funcionamiento del cuerpo humano.",
    pda: "Analiza el funcionamiento del sistema nervioso y endocrino en la coordinación de las funciones corporales y su relación con el cuidado integral de la salud."
  },

  // PRIMARIA - ETICA NyS
  {
    id: 2061,
    nivel: "Primaria",
    campoFormativo: "ETICA NyS",
    disciplina: "PRIMARIA",
    grado: "Primer Grado",
    contenido: "Valoración de la biodiversidad: en el territorio local, la entidad, México y el mundo.",
    pda: "Describe la diversidad de plantas y animales de su entorno inmediato y asume compromisos para cuidarlos en la vida diaria."
  },
  {
    id: 2062,
    nivel: "Primaria",
    campoFormativo: "ETICA NyS",
    disciplina: "PRIMARIA",
    grado: "Segundo Grado",
    contenido: "Valoración de la biodiversidad: en el territorio local, la entidad, México y el mundo.",
    pda: "Compara los ecosistemas cercanos a su comunidad y propone acciones cooperativas para reducir el impacto de la acumulación de plásticos en la escuela."
  },
  {
    id: 2063,
    nivel: "Primaria",
    campoFormativo: "ETICA NyS",
    disciplina: "PRIMARIA",
    grado: "Tercer Grado",
    contenido: "Valoración de la biodiversidad: en el territorio local, la entidad, México y el mundo.",
    pda: "Reconoce la relevancia de proteger la biodiversidad local y explica cómo el cuidado ambiental previene el desequilibrio ecológico."
  },
  {
    id: 2064,
    nivel: "Primaria",
    campoFormativo: "ETICA NyS",
    disciplina: "PRIMARIA",
    grado: "Cuarto Grado",
    contenido: "Valoración de la biodiversidad: en el territorio local, la entidad, México y el mundo.",
    pda: "Analiza los factores de deterioro de la biodiversidad en México y argumenta sobre la importancia de promover un desarrollo sustentable sustentado en leyes ambientales."
  },
  {
    id: 2065,
    nivel: "Primaria",
    campoFormativo: "ETICA NyS",
    disciplina: "PRIMARIA",
    grado: "Quinto Grado",
    contenido: "Valoración de la biodiversidad: en el territorio local, la entidad, México y el mundo.",
    pda: "Valora la megadiversidad mexicana y explica la importancia de los saberes tradicionales indígenas para conservar los recursos bioculturales del territorio."
  },
  {
    id: 2066,
    nivel: "Primaria",
    campoFormativo: "ETICA NyS",
    disciplina: "PRIMARIA",
    grado: "Sexto Grado",
    contenido: "Valoración de la biodiversidad: en el territorio local, la entidad, México y el mundo.",
    pda: "Investiga los principales retos de conservación ambiental global y formula una propuesta colectiva escolar para contrarrestar los efectos del cambio climático."
  },
  {
    id: 2067,
    nivel: "Primaria",
    campoFormativo: "ETICA NyS",
    disciplina: "PRIMARIA",
    grado: "Primer Grado",
    contenido: "Derechos humanos: a un ambiente sano, al desarrollo integral, a la igualdad de género.",
    pda: "Conoce sus derechos fundamentales y los de sus compañeros, participando activamente en la construcción de un aula con trato igualitario."
  },
  {
    id: 2068,
    nivel: "Primaria",
    campoFormativo: "ETICA NyS",
    disciplina: "PRIMARIA",
    grado: "Segundo Grado",
    contenido: "Derechos humanos: a un ambiente sano, al desarrollo integral, a la igualdad de género.",
    pda: "Identifica situaciones cotidianas en las que se vulneran los derechos de los niños y niñas, y dialoga sobre cómo prevenirlas y buscar apoyo."
  },
  {
    id: 2069,
    nivel: "Primaria",
    campoFormativo: "ETICA NyS",
    disciplina: "PRIMARIA",
    grado: "Tercer Grado",
    contenido: "Derechos humanos: a un ambiente sano, al desarrollo integral, a la igualdad de género.",
    pda: "Analiza los derechos de los niños a una vida libre de violencia y a la salud integral, valorando la inclusión y la equidad."
  },
  {
    id: 2070,
    nivel: "Primaria",
    campoFormativo: "ETICA NyS",
    disciplina: "PRIMARIA",
    grado: "Cuarto Grado",
    contenido: "Derechos humanos: a un ambiente sano, al desarrollo integral, a la igualdad de género.",
    pda: "Reconoce las instituciones encargadas de velar por los derechos humanos en su comunidad y estado, proponiendo canales de denuncia escolar."
  },
  {
    id: 2071,
    nivel: "Primaria",
    campoFormativo: "ETICA NyS",
    disciplina: "PRIMARIA",
    grado: "Quinto Grado",
    contenido: "Derechos humanos: a un ambiente sano, al desarrollo integral, a la igualdad de género.",
    pda: "Asume compromisos para promover la igualdad sustantiva de género y la prevención de cualquier forma de discriminación en el espacio escolar."
  },
  {
    id: 2072,
    nivel: "Primaria",
    campoFormativo: "ETICA NyS",
    disciplina: "PRIMARIA",
    grado: "Sexto Grado",
    contenido: "Derechos humanos: a un ambiente sano, al desarrollo integral, a la igualdad de género.",
    pda: "Diseña un proyecto escolar solidario encaminado a difundir, respetar y garantizar el cumplimiento de los derechos humanos y la cultura de paz."
  },

  // PRIMARIA - HUMANO Y C
  {
    id: 2091,
    nivel: "Primaria",
    campoFormativo: "HUMANO Y C",
    disciplina: "PRIMARIA",
    grado: "Primer Grado",
    contenido: "La comunidad como el espacio en el que se vive y se encuentra la escuela.",
    pda: "Identifica elementos que comparte con las personas de su vecindario y escuela, reconociendo la importancia de la ayuda mutua en situaciones cotidianas."
  },
  {
    id: 2092,
    nivel: "Primaria",
    campoFormativo: "HUMANO Y C",
    disciplina: "PRIMARIA",
    grado: "Segundo Grado",
    contenido: "La comunidad como el espacio en el que se vive y se encuentra la escuela.",
    pda: "Describe el entorno de su escuela y cómo este se vincula con la comunidad para resolver problemas comunes relacionados con la basura o vialidad."
  },
  {
    id: 2093,
    nivel: "Primaria",
    campoFormativo: "HUMANO Y C",
    disciplina: "PRIMARIA",
    grado: "Tercer Grado",
    contenido: "La comunidad como el espacio en el que se vive y se encuentra la escuela.",
    pda: "Participa en la planeación y desarrollo de actividades comunitarias orientadas a mejorar los espacios públicos cercanos a su plantel escolar."
  },
  {
    id: 2094,
    nivel: "Primaria",
    campoFormativo: "HUMANO Y C",
    disciplina: "PRIMARIA",
    grado: "Cuarto Grado",
    contenido: "La comunidad como el espacio en el que se vive y se encuentra la escuela.",
    pda: "Analiza problemas sociales comunes de su comunidad escolar y propone alternativas viables bajo la metodología de Aprendizaje Servicio."
  },
  {
    id: 2095,
    nivel: "Primaria",
    campoFormativo: "HUMANO Y C",
    disciplina: "PRIMARIA",
    grado: "Quinto Grado",
    contenido: "La comunidad como el espacio en el que se vive y se encuentra la escuela.",
    pda: "Reflexiona sobre las formas de organización familiar y escolar que favorecen el bienestar colectivo, el desarrollo de la empatía y la resiliencia."
  },
  {
    id: 2096,
    nivel: "Primaria",
    campoFormativo: "HUMANO Y C",
    disciplina: "PRIMARIA",
    grado: "Sexto Grado",
    contenido: "La comunidad como el espacio en el que se vive y se encuentra la escuela.",
    pda: "Diseña, implementa y evalúa de manera colaborativa proyectos de servicio social escolar que promuevan la equidad, el cuidado mutuo y el sentido de pertenencia."
  }
];
