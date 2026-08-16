const fs = require('fs');

// We parse the full official NEM data directly
const rawItems = [
  // FASE 2: PREESCOLAR (1°, 2°, 3°)
  // De lo Humano y lo Comunitario
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "1º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Construcción de la identidad personal a partir de su pertenencia a un territorio, su origen étnico, cultural y lingüístico, y la interacción con personas cercanas.",
    pdas: [
      "Descubre gustos, preferencias, posibilidades motrices y afectivas, en juegos y actividades que contribuyan al conocimiento de sí, en un ambiente que considere la diversidad.",
      "Describe cómo es físicamente, identifica sus rasgos familiares y se acepta como es.",
      "Representa la imagen que tiene de sí, a través del modelado, dibujo, pintura y otros recursos de los lenguajes artísticos, y respeta las producciones de sus pares."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "2º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Construcción de la identidad personal a partir de su pertenencia a un territorio, su origen étnico, cultural y lingüístico, y la interacción con personas cercanas.",
    pdas: [
      "Reconoce algunos rasgos de su identidad, dice cómo es físicamente, qué se le facilita, qué se le dificulta, qué le gusta, qué no le gusta, y los expresa en su lengua materna o con otros lenguajes.",
      "Distingue semejanzas y diferencias con las demás personas, a partir de distintos rasgos de identidad como su nombre, características físicas, formas de vestir, hablar, alimentarse, entre otros.",
      "Identifica que todas y todos pertenecen a familias que son diversas y muestra respeto a las formas de ser, de pensar y de relacionarse con las y los demás.",
      "Representa la imagen que tiene de sí y de sus pares con apoyo de diversos recursos de los lenguajes artísticos."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "3º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Construcción de la identidad personal a partir de su pertenencia a un territorio, su origen étnico, cultural y lingüístico, y la interacción con personas cercanas.",
    pdas: [
      "Identifica que la lengua que habla, las costumbres familiares y el lugar donde vive contribuyen a la formación de su identidad y pertenencia a una comunidad en la que participa y colabora.",
      "Aprecia las características y cualidades propias, así como las de sus pares y de otras personas.",
      "Muestra seguridad y confianza en sus formas de ser, actuar, pensar e interactuar en la casa, escuela y comunidad.",
      "Expresa y representa con recursos de los distintos lenguajes, la imagen que tiene de sí y de las y los demás."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "1º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Consumo de alimentos y bebidas que benefician la salud, de acuerdo con los contextos socioculturales.",
    pdas: [
      "Expresa gustos y preferencias de bebidas y alimentos que hay en su comunidad, al explorar aromas, colores, texturas y sabores, guardando medidas de seguridad e higiene.",
      "Reconoce, en las costumbres familiares, la preparación y consumo de alimentos y bebidas, e identifica los que son saludables y los que ponen en riesgo la salud.",
      "Practica hábitos de higiene y limpieza en el consumo y preparación de alimentos y bebidas."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "2º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Consumo de alimentos y bebidas que benefician la salud, de acuerdo con los contextos socioculturales.",
    pdas: [
      "Distingue alimentos y bebidas que son saludables, así como los que ponen en riesgo la salud, y reconoce que existen opciones alimentarias sanas que contribuyen a una mejor calidad de vida para todas las personas.",
      "Indaga acerca de la comida tradicional de su comunidad y otras regiones, y aprecia la diversidad de alimentos y platillos saludables que se consumen en el país.",
      "Cuida su salud al llevar a cabo medidas de seguridad, higiene y limpieza, en la preparación y consumo de alimentos y bebidas saludables."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "3º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Consumo de alimentos y bebidas que benefician la salud, de acuerdo con los contextos socioculturales.",
    pdas: [
      "Obtiene información de diversas fuentes, acerca de los factores que favorecen estilos de vida saludable, destacando el consumo de alimentos nutritivos y de agua simple potable, entre otros.",
      "Aprecia la cultura alimentaria mexicana, y descubre la diversidad de ingredientes que existen en el país, así como la influencia de otras culturas en el consumo y preparación de alimentos.",
      "Promueve el consumo de alimentos sanos propios de su comunidad y la creación de huertos para la siembra y cosecha de frutas y verduras."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "1º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Cuidado de la salud personal y colectiva, al llevar a cabo acciones de higiene, limpieza, y actividad física, desde los saberes prácticos de la comunidad y la información científica.",
    pdas: [
      "Practica hábitos de higiene personal y limpieza en los espacios físicos donde se desenvuelve y al usar objetos, como medidas de conservación de la salud y de prevención de enfermedades.",
      "Reconoce los beneficios que la actividad física, la alimentación y los hábitos de higiene personal y limpieza aportan al cuidado de la salud.",
      "Consulta, con ayuda, y dialoga con personas de la comunidad o especialistas en el cuidado de la salud infantil, las medidas de prevención de enfermedades y conservación de la salud."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "2º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Cuidado de la salud personal y colectiva, al llevar a cabo acciones de higiene, limpieza, y actividad física, desde los saberes prácticos de la comunidad y la información científica.",
    pdas: [
      "Se familiariza con diversas prácticas que favorecen el cuidado de la salud desde la experiencia y visión de otras culturas, sin ponerse en riesgo.",
      "Busca con ayuda, información en diversas fuentes científicas acerca de las acciones que están a su alcance, para el cuidado de la salud personal y colectiva, y las pone en práctica.",
      "Realiza acciones de higiene personal y limpieza, antes, durante y después de realizar sus actividades cotidianas.",
      "Disfruta de realizar actividades físicas y reconoce los beneficios para su salud.",
      "Sabe a dónde o con quién acudir para mantener su salud o cuando tiene algún malestar físico o enfermedad."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "3º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Cuidado de la salud personal y colectiva, al llevar a cabo acciones de higiene, limpieza, y actividad física, desde los saberes prácticos de la comunidad y la información científica.",
    pdas: [
      "Reconoce algunos factores que permiten conservar la salud y los que la perjudican.",
      "Propone acciones que contribuyen a mantener su salud y bienestar, relacionadas con higiene personal, limpieza y actividad física, considerando los saberes prácticos de la comunidad y las aportaciones científicas.",
      "Promueve acciones sobre el cuidado de la salud visual, auditiva, bucal, alimentaria y física, en la casa, escuela y comunidad.",
      "Dialoga con sus pares y toman acuerdos para el cuidado de la salud en beneficio de todas y todos."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "1º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Interacción con personas de diversos contextos, que contribuyan al establecimiento de relaciones positivas y a una convivencia basada en la aceptación de la diversidad.",
    pdas: [
      "Interactúa con diferentes compañeras y compañeros, para establecer relaciones de amistad, igualdad, empatía y colaboración.",
      "Identifica las consecuencias positivas o negativas de sus comportamientos ante distintas situaciones y fomenta con sus pares, aquellos que promueven una sana y positiva convivencia.",
      "Participa y respeta acuerdos de convivencia en juegos y actividades que implican compartir materiales, establecer turnos, seguir reglas, escuchar con atención, entre otros."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "2º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Interacción con personas de diversos contextos, que contribuyan al establecimiento de relaciones positivas y a una convivencia basada en la aceptación de la diversidad.",
    pdas: [
      "Interactúa con distintas personas en situaciones diversas, y establecen acuerdos para la participación, la organización y la convivencia.",
      "Se relaciona con respeto y colabora de manera asertiva para el logro de propósitos comunes en juegos y actividades.",
      "Manifiesta disposición para establecer acuerdos que beneficien a todas y todos a fin de convivir con respeto y tolerancia a las diferencias.",
      "Conoce distintas alternativas para colaborar con la comunidad e integrarse a ella, de acuerdo con sus condiciones."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "3º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Interacción con personas de diversos contextos, que contribuyan al establecimiento de relaciones positivas y a una convivencia basada en la aceptación de la diversidad.",
    pdas: [
      "Propone y lleva a cabo formas de convivencia libres de violencia en la casa, escuela y comunidad.",
      "Se integra con seguridad y confianza en actividades colectivas al interactuar con personas de otros lugares y culturas.",
      "Asume actitudes prosociales como compartir, ayudar y colaborar, al participar y mejorar las relaciones de convivencia con las demás personas."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "1º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Las emociones en la interacción con diversas personas y situaciones.",
    pdas: [
      "Identifica emociones como alegría, tristeza, sorpresa, miedo o enojo, al participar en juegos de representación.",
      "Expresa lo que siente o le provocan algunas situaciones, seres vivos o personas con las que interactúa en su vida cotidiana, usando diferentes recursos de los lenguajes.",
      "Escucha con empatía a sus pares, cuando hablan acerca de personas que les generan confianza o incomodidad, y de situaciones o seres vivos que les provocan agrado o desagrado.",
      "Reconoce o se percata cuando sus pares necesitan ayuda para recuperar la calma o mantener un estado de bienestar, y ofrece su apoyo."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "2º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Las emociones en la interacción con diversas personas y situaciones.",
    pdas: [
      "Percibe cambios corporales, y con ayuda, nombra las emociones que experimenta, como: alegría, tristeza, sorpresa, miedo o enojo, y reconoce las situaciones que las provocan.",
      "Manifiesta a una persona adulta, de manera verbal o con otros lenguajes, si alguien le hace sentir incomodidad, le provoca miedo o inseguridad.",
      "Indaga algunas medidas para aprender a pedir ayuda y ponerse a salvo, como gritar, correr, recurrir a una persona de confianza, entre otras.",
      "Muestra respeto y empatía hacia la expresión de emociones de las personas, comprende cuando alguien necesita ayuda y la ofrece."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "3º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Las emociones en la interacción con diversas personas y situaciones.",
    pdas: [
      "Establece vínculos afectivos y de empatía con sus pares y otras personas, a partir de la convivencia cotidiana.",
      "Intercambia experiencias y vivencias con sus pares y otras personas, acerca de las diferentes formas de actuar, expresar, nombrar y controlar las emociones.",
      "Dice lo que le molesta o incomoda para evitar reaccionar con gritos o agresión; dialoga y respeta las reglas para una mejor convivencia.",
      "Identifica situaciones en las que percibe que está en riesgo su integridad o la de otras personas.",
      "Conversa con sus pares acerca de lo que hacen para enfrentar situaciones de riesgo y buscan distintas alternativas para sentir seguridad y ponerse a salvo."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "1º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Medidas de prevención de accidentes y situaciones de riesgo de acuerdo con el contexto, para el cuidado de la integridad personal y colectiva.",
    pdas: [
      "Explora los espacios físicos de su casa, escuela y comunidad para identificar las zonas de seguridad que le permitan mantener su integridad en caso de situaciones de riesgo.",
      "Identifica acciones, situaciones y comportamientos en los que puede lastimarse o lastimar a las demás personas.",
      "Comparte con sus pares ideas acerca de cómo cuidar su integridad y la de las demás personas, y con ayuda, las pone en práctica.",
      "Propone de manera colaborativa y lleva a cabo, acuerdos que contribuyen a evitar accidentes o lesiones al manipular objetos y materiales, así como a usar con seguridad los espacios de juego y actividades en casa, escuela y comunidad."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "2º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Medidas de prevención de accidentes y situaciones de riesgo de acuerdo con el contexto, para el cuidado de la integridad personal y colectiva.",
    pdas: [
      "Expresa qué comportamientos, objetos, materiales y lugares pueden provocar accidentes y poner en riesgo la seguridad y el bienestar personal y colectivo.",
      "Lleva a cabo acciones para prevenir accidentes y salvaguardar su bienestar y seguridad, personales y colectivos.",
      "Reconoce las situaciones de riesgo provocadas por fenómenos naturales o por la acción humana, y sabe qué hacer y cómo reaccionar para salvaguardar su integridad.",
      "Atiende medidas de seguridad para aprender cómo actuar antes, durante y después de una emergencia y cuidar su integridad y la de las demás personas."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "3º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Medidas de prevención de accidentes y situaciones de riesgo de acuerdo con el contexto, para el cuidado de la integridad personal y colectiva.",
    pdas: [
      "Indaga en diferentes fuentes de consulta y con expertos, acerca de los posibles riesgos y daños que provocan algunos fenómenos naturales como: sismos, inundaciones, huracanes, entre otros.",
      "Propone y lleva a cabo, acciones de seguridad y formas de colaboración en situaciones de riesgo, accidentes o desastres, tomando en cuenta el bienestar de las personas y otros seres vivos de la comunidad.",
      "Colabora en acciones de difusión, al promover una cultura de prevención de accidentes y riesgos para el beneficio común."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "1º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Posibilidades de movimiento en diferentes espacios, para favorecer las habilidades motrices.",
    pdas: [
      "Explora las posibilidades de movimiento de su cuerpo, en juegos y actividades, de acuerdo con las características y condiciones personales.",
      "Imita y descubre movimientos y posturas, involucrando distintos segmentos corporales que favorecen el control y la lateralidad.",
      "Describe las sensaciones que percibe en su cuerpo al realizar movimientos o mantener ciertas posturas."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "2º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Posibilidades de movimiento en diferentes espacios, para favorecer las habilidades motrices.",
    pdas: [
      "Adapta sus movimientos y fortalece su lateralidad al desplazarse en espacios de la escuela, casa y comunidad en distintas direcciones y con velocidades variadas; descubre nuevas formas de moverse.",
      "Mantiene el control y equilibrio de los distintos segmentos corporales tanto en situaciones estáticas (sostenerse en un pie, hacer una figura con el cuerpo, entre otras) como en movimientos sin desplazamiento (girar, brincar, etcétera).",
      "Explica los cambios que experimenta su cuerpo cuando realiza actividad física, y con ayuda, reconoce señales de dolor o malestar."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "3º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Posibilidades de movimiento en diferentes espacios, para favorecer las habilidades motrices.",
    pdas: [
      "Combina movimientos que implican el control, equilibrio y estabilidad del cuerpo al realizar acciones individuales, en parejas o en colectivo.",
      "Incorpora en sus movimientos elementos de la estructura del espacio físico como la distancia, la dirección, la temporalidad, la velocidad, la posición y la lateralidad.",
      "Coordina movimientos con control y equilibrio al resolver situaciones cotidianas, participar en juegos tradicionales y representaciones individuales o colectivas en igualdad de oportunidades y sin distinción de género.",
      "Reconoce cuando realiza un sobreesfuerzo físico: dolor torácico, mareos, deshidratación o dificultad para respirar; pone en práctica estrategias que le ayudan a recuperar un estado de bienestar."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "1º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Precisión y coordinación en los movimientos al usar objetos, herramientas y materiales, de acuerdo con las condiciones, capacidades y características.",
    pdas: [
      "Explora y manipula objetos, herramientas y materiales de distintas formas, texturas y tamaños.",
      "Participa en juegos y actividades que involucran la coordinación de movimientos, usando los sentidos, en acciones como lanzar, amasar, patear, entre otras.",
      "Usa objetos, herramientas y materiales pertinentes que le ayudan a resolver situaciones específicas y cotidianas en casa y escuela."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "2º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Precisión y coordinación en los movimientos al usar objetos, herramientas y materiales, de acuerdo con las condiciones, capacidades y características.",
    pdas: [
      "Controla sus movimientos al usar objetos, herramientas y materiales en juegos y actividades de experimentación, creación personal y resolución de problemas, atendiendo las normas de seguridad.",
      "Descubre nuevas formas de coordinar sus movimientos al transportar objetos con alguna parte del cuerpo, caminar y lanzar una pelota, alternar el uso de manos y pies, entre otros.",
      "Controla cada vez con mayor precisión sus movimientos en coordinación con sus sentidos, al jugar y realizar actividades."
    ]
  },
  {
    fase: "Fase 2",
    nivel: "Preescolar",
    grado: "3º de Preescolar",
    campo_formativo: "De lo Humano y lo Comunitario",
    disciplina: "General",
    contenido: "Precisión y coordinación en los movimientos al usar objetos, herramientas y materiales, de acuerdo con sus condiciones, capacidades y características.",
    pdas: [
      "Resuelve situaciones cotidianas mediante el uso de objetos, herramientas y materiales que implican el control y precisión de movimientos para satisfacer necesidades personales y colectivas.",
      "Construye y modela objetos, con control y precisión de sus movimientos; selecciona objetos, herramientas y materiales apropiados para resolver situaciones diversas.",
      "Respeta y pone en práctica, medidas de seguridad al manipular objetos, herramientas y materiales en diferentes lugares."
    ]
  }
];

console.log('Sample raw items ready:', rawItems.length);
