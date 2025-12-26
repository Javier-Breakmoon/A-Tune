export const STATIONS = [
  // Música generalista y Top 40
  {
    id: 1,
    name: "Los 40 Principales",
    info: "Éxitos de hoy",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/LOS40_SC",
    logoKey: "los40",
  },
  {
    id: 2,
    name: "Cadena 100",
    info: "Solo éxitos",
    stream: "https://cadena100-cope-rrcast.flumotion.com/cope/cadena100.mp3",
    logoKey: "cadena100",
  },
  {
    id: 3,
    name: "Europa FM",
    info: "La mejor música",
    stream: "https://str1.mediatelekom.net:9950/stream",
    logoKey: "europafm",
  },
  {
    id: 4,
    name: "Cadena Elite",
    info: "Música latina",
    stream: "https://streaming2.elitecomunicacion.es/proxy/elitegranada/stream",
    logoKey: "cadenaelite",

  },
  {
    id: 5,
    name: "Kiss FM",
    info: "Dance y electrónica",
    stream: "https://bbkissfm.kissfmradio.cires21.com:8443/bbkissfm/mp3/icecast.audio?wmsAuthSign=c2VydmVyX3RpbWU9MTIvMjMvMjAyNSAxMToxMToxMiBQTSZoYXNoX3ZhbHVlPUZRemgrUFNQY0ZtQjVrallWNGVSUXc9PSZ2YWxpZG1pbnV0ZXM9MTQ0MCZpZD03MTUyMDk1Mg==",
    logoKey: "kissfm",
  },
  
  // Radio pública
  {
    id: 6,
    name: "RNE Radio 1",
    info: "Noticias y actualidad",
    stream: "https://rtvelivestream.rtve.es/rtvesec/rne/rne_r1_main.m3u8",
    logoKey: "rne1",
  },
  {
    id: 7,
    name: "RNE Radio 3",
    info: "Música alternativa",
    stream: "https://rtvelivestream.rtve.es/rtvesec/rne/rne_r3_main.m3u8",
    logoKey: "rne3",
  },
  {
    id: 8,
    name: "RNE Radio Clásica",
    info: "Música clásica",
    stream: "https://rtvelivestream.rtve.es/rtvesec/rne/rne_r2_main.m3u8",
    logoKey: "rneclasica",
  },
  {
    id: 9,
    name: "RNE Radio 5",
    info: "Información 24h",
    stream: "https://rtvelivestream.rtve.es/rtvesec/rne/rne_r5_madrid_main.m3u8",
    logoKey: "rne5",
  },
  
  // Grupo COPE
  {
    id: 10,
    name: "COPE",
    info: "Noticias y tertulia",
    stream: "https://flucast11-o-cloud.flumotion.com/cope/net2.mp3",
    logoKey: "cope",
  },
  {
    id: 11,
    name: "Rock FM",
    info: "Rock en español",
    stream: "https://rockfm-cope-rrcast.flumotion.com/cope/rockfm.mp3",
    logoKey: "rockfm",
  },
  {
    id: 12,
    name: "MegaStar FM",
    info: "Éxitos latinos",
    stream: "https://megastar-cope.flumotion.com/l_11107_973032106_162172.aac",
    logoKey: "megastar",
  },
  
  // Grupo PRISA (SER)
  {
    id: 13,
    name: "Cadena SER",
    info: "Radio líder",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/CADENASERAAC_SC",
    logoKey: "cadenaser",
  },
  {
    id: 14,
    name: "Los 40 Classic",
    info: "Clásicos musicales",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/LOS40_CLASSIC_SC",
    logoKey: "los40classic",
  },
  {
    id: 15,
    name: "Los 40 Dance",
    info: "Música electrónica",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/LOS40_DANCE_SC",
    logoKey: "los40dance",
  },
  {
    id: 16,
    name: "Los 40 Urban",
    info: "Hip hop y urbano",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/LOS40_URBAN_SC",
    logoKey: "los40urban",
  },
  {
    id: 17,
    name: "Radiolé",
    info: "Música española",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/RADIOLE_SC",
    logoKey: "radiole",
  },
  
  // Onda Cero (Atresmedia)
  {
    id: 18,
    name: "Onda Cero",
    info: "Información y música",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/OCAAC.m3u8",
    logoKey: "ondacero",
  },
  {
    id: 19,
    name: "Melodía FM",
    info: "Música romántica",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/MELODIA_FMAAC.m3u8",
    logoKey: "melodiafm",
  },
  
  // esRadio
  {
    id: 20,
    name: "esRadio",
    info: "Noticias y opinión",
    stream: "https://libertaddigital-radio-live1.flumotion.com/libertaddigital/ld-live1-low.mp3",
    logoKey: "esradio",
  },
  
  // Radios autonómicas
  {
    id: 21,
    name: "Catalunya Ràdio",
    info: "Radio catalana",
    stream: "https://directes-radio-int.3catdirectes.cat/live-content/catalunya-radio-hls/bitrate_1.m3u8",
    logoKey: "catalunyaradio",
  },
  {
    id: 22,
    name: "RAC1",
    info: "Líder en Cataluña",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/RAC_1.mp3",
    logoKey: "rac1",
  },
  {
    id: 23,
    name: "Canal Sur Radio",
    info: "Radio andaluza",
    stream: "https://rtva-live-radio.flumotion.com/rtva/csr.mp3",
    logoKey: "canalsur",
  },
  {
    id: 24,
    name: "esRadio Valencia",
    info: "Actualidad valenciana",
    stream: "https://aequum821.dns-lcinternet.com:8200/stream",
    logoKey: "esradiovalencia",
  },
  {
    id: 25,
    name: "Radio Galega",
    info: "Radio gallega",
    stream: "https://crtvg-radiogalega-hls.flumotion.cloud/chunklist_DVR.m3u8",
    logoKey: "radiogalega",
  },
  
  // Radios temáticas música
  {
    id: 26,
    name: "Máxima FM",
    info: "Dance y electrónica",
    stream: "https://strw3.openstream.co/830?aw_0_1st.collectionid%3D6835%26stationId%3D6835%26publisherId%3D854%26k%3D1766533825",
    logoKey: "maximafm",
  },
  {
    id: 27,
    name: "Valencia Radio",
    info: "Música y actualidad",
    stream: "https://stream-177.zeno.fm/npdaawnfh1duv",
    logoKey: "valenciaradio",
  },
  {
    id: 28,
    name: "HappyFM",
    info: "Solo música feliz",
    stream: "https://happyfuerteventura.streaming-pro.com:6003/live",
    logoKey: "happyfm",
  },
  {
    id: 29,
    name: "Loca FM",
    info: "Música dance",
    stream: "http://locafm01.we4stream.com:8045/live",
    logoKey: "locafm",
  },
  {
    id: 30,
    name: "Hit FM",
    info: "Los mejores éxitos",
    stream: "http://hitfm.kissfmradio.cires21.com/hitfm.mp3",
    logoKey: "hitfm",
  },
  
  // Radios temáticas noticias/deportes
  {
    id: 31,
    name: "Radio Marca",
    info: "Deportes",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/RADIOMARCA_NACIONAL_SC",
    logoKey: "radiomarca",
  },
  {
    id: 32,
    name: "Onda Deportiva",
    info: "Deporte en directo",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/OCAAC.m3u8",
    logoKey: "ondadeportiva",
  },
  {
    id: 33,
    name: "Carrusel Deportivo",
    info: "Deportes SER",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/CADENASERAAC_SC",
    logoKey: "carrusel",
  },
  
  // Radios locales importantes
  {
    id: 34,
    name: "Radio Esport Valencia",
    info: "Todos sobre el Valencia",
    stream: "https://streaming.radioesport914.com:58000/stream",
    logoKey: "radiosportvalencia",
  },
  {
    id: 35,
    name: "Radio Intereconomía",
    info: "Economía y actualidad",
    stream: "https://intereconomia.emitironline.com/",
    logoKey: "intereconomia",
  },
  {
    id: 36,
    name: "Capital Radio",
    info: "Madrid",
    stream: "https://mdstrm.com/audio/67d2a8685ae4234de49e40f6/live.m3u8",
    logoKey: "capitalradio",
  },
  
  
  // Más emisoras generalistas
  {
    id: 41,
    name: "Radio Nacional",
    info: "Información RNE",
    stream: "https://rtvelivestream.rtve.es/rtvesec/rne/rne_r1_main.m3u8",
    logoKey: "radionacional",
  },
  {
    id: 43,
    name: "Canal Fiesta Radio",
    info: "Música latina",
    stream: "https://rtva-live-radio.flumotion.com/rtva/cfr.mp3",
    logoKey: "canalfiesta",
  },
  {
    id: 44,
    name: "Radio Exterior",
    info: "Internacional RNE",
    stream: "https://rtvelivestream.rtve.es/rtvesec/rne/rne_re_main_720.m3u8",
    logoKey: "radioexterior",
  },
  {
    id: 45,
    name: "Bikini FM",
    info: "Remember",
    stream: "https://eu1.lhdserver.es:9043/stream",
    logoKey: "bikinifm",
  },
  {
    id: 46,
    name: "Spektra FM",
    info: "Remember",
    stream: "https://stm2.emiteonline.com:9008/spektrafm",
    logoKey: "spektrafm",
  },
  {
    id: 47,
    name: "Dj Java",
    info: "Remember",
    stream: "https://stream.zenolive.com/6t6bmeznwtzuv.aac",
    logoKey: "djjava",
  },
  {
    id: 48,
    name: "Remember Last Radio",
    info: "Remember",
    stream: "https://stream.zeno.fm/5nvz43btqg8uv",
    logoKey: "rememberlastradio",
  },
    {
    id: 49,
    name: "Remember The Music",
    info: "Remember",
    stream: "https://eu1.lhdserver.es:9041/stream",
    logoKey: "rememberthemusic",
  },
];