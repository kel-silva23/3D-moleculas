let viewer = $3Dmol.createViewer("viewer", {
    backgroundColor: "white"
});
console.log("JS FUNCIONANDO");
let atomos = [];
let selecionado = null; 
let configAtomos = {
    "H":  { cor: "white",  tamanho: 0.4 },
    "O":  { cor: "red",    tamanho: 0.5 },
    "C":  { cor: "black",  tamanho: 0.8 },
    "N":  { cor: "blue",   tamanho: 0.6 },
    "Cl": { cor: "green",  tamanho: 0.7 },
    "Na": { cor: "purple", tamanho: 0.9 },
    "Ca": { cor: "orange", tamanho: 1.0 },
    "S":  { cor: "yellow", tamanho: 0.7 },
    "P":  { cor: "orange", tamanho: 0.7 }
};


function posicaoValida(x, y, z) {

    for (let a of atomos) {
        let dx = a.x - x;
        let dy = a.y - y;
        let dz = a.z - z;

        let distancia = Math.sqrt(dx*dx + dy*dy + dz*dz);

        if (distancia < 1.5) {
            return false;
        }
    }

    return true;
}

// banco de dados simples- informações das plantas
let plantas = {
  "camomila": {
    nome: "Camomila",
    cientifico: "Matricaria chamomilla",
    finalidade: "Planta tradicionalmente utilizada em preparações medicinais e estudada por seus compostos naturais e possíveis atividades biológicas.",
    moleculas: [
        { nome: "Apigenina", cid: 5280443 },
        {  nome: "Alfa-bisabolol",cid: 1549992}
    ]
},

"acafrao": {
    nome: "Açafrão da terra",
    cientifico: "Curcuma longa",
    finalidade: "Planta utilizada como tempero e corante natural, cujo rizoma contém compostos estudados por suas propriedades químicas e atividades biológicas.",
    moleculas: [
        { nome: "Curcumina", cid: 969516 },
        { nome: "Demetoxicurcumina",cid: 5469424}
    ]
},

"quebra pedra": {
    nome: "Quebra pedra",
    cientifico: "Phyllanthus niruri",
    finalidade: "Planta utilizada tradicionalmente na medicina popular e investigada por seus compostos naturais e possíveis atividades biológicas.",
    moleculas: [
        { nome: "Filantina", cid: 9953821 },
        { nome: "Nirfilina",  cid: 5491556}
    ]
},

"jaborandi": {
    nome: "Jaborandi",
    cientifico: "Pilocarpus sp.",
    finalidade: "Planta conhecida por conter alcaloides de interesse farmacológico, incluindo a pilocarpina, utilizada em medicamentos específicos.",
    moleculas: [
        { nome: "Pilocarpina", cid: 5910 },
        { nome: "Epiisopiloturina",cid: 155306}
    ]
},

"goiaba": {
    nome: "Goiabeira",
    cientifico: "Psidium guajava",
    finalidade: "Árvore frutífera cujos frutos e folhas apresentam compostos de interesse nutricional e fitoquímico, investigados em diferentes pesquisas.",
    moleculas: [
        { nome: "Quercetina", cid: 5280343},
        { nome: "Guaijaverina",cid: 5481224} ]
},

"canela": {
    nome: "Canela",
    cientifico: "Cinnamomum verum",
    finalidade: "Árvore aromática utilizada como tempero e estudada por seus compostos naturais presentes na casca e nos óleos essenciais.",
    moleculas: [
        { nome: "Cinamaldeído", cid: 637511 },
        { nome:"Eugenol", cid:3314}
    ]
},

"boldo": {
    nome: "Boldo do Chile",
    cientifico: "Peumus boldus",
    finalidade: "Espécie tradicionalmente utilizada em preparações de plantas medicinais e estudada por seus alcaloides e outros compostos naturais.",
    moleculas: [
        { nome: "Boldina", cid: 10154 },
        { nome: "Isoboldina", cid: 133323,}
    ]
},

"alecrim": {
    nome: "Alecrim",
    cientifico: "Salvia rosmarinus",
    finalidade: "Planta aromática utilizada na alimentação e tradicionalmente em preparações vegetais, estudada por seus compostos fenólicos e óleos essenciais.",
    moleculas: [
        { nome: "Ácido rosmarínico", cid: 5281792 },
        { nome: "Ácido cornósico", cid: 65126}
    ]
},

"erva doce": {
    nome: "Erva-doce",
    cientifico: "Pimpinella anisum",
    finalidade: "Planta aromática utilizada na alimentação e em preparações tradicionais, conhecida por seus compostos voláteis e aroma característico.",
    moleculas: [
        { nome: "Anetol", cid: 637563 },
        { nome: "Beta-cariofileno",  cid: 5281515,}
    ]
},

"unha de gato": {
    nome: "Unha-de-gato",
    cientifico: "Uncaria guianensis",
    finalidade: "Espécie amazônica tradicionalmente utilizada na medicina popular e investigada por seus alcaloides e outros compostos naturais.",
    moleculas: [
        { nome: "Isomitraphyllic acid", cid: 101176445 },
        {  nome: "Mitrafilina",cid: 94160}
    ]
},

"andiroba": {
    nome: "Andiroba",
    cientifico: "Carapa guianensis",
    finalidade: "Árvore amazônica tradicionalmente utilizada na medicina popular, especialmente pelo óleo extraído de suas sementes, e estudada por seus compostos naturais.",
    moleculas: [
        { nome: "Gedunina", cid: "12004512" },
        { nome: "Ácido oleico", cid: "445639" }
    ]
},

"juca": {
    nome: "Jucá",
    cientifico: "Libidibia ferrea",
   finalidade: "Árvore nativa brasileira tradicionalmente utilizada na medicina popular e investigada por seus compostos fenólicos e possíveis atividades biológicas.",
    moleculas: [
        { nome: "Ácido gálico", cid: "370" },
        { nome: "Quercetina", cid: "5280343" }
    ]
},

"copaiba": {
    nome: "Copaíba",
    cientifico: "Copaifera spp.",
finalidade: "Árvore amazônica cujo óleo-resina é tradicionalmente utilizado na medicina popular e investigado por sua composição química e possíveis atividades biológicas.",
    moleculas: [
        { nome: "Beta-cariofileno", cid: "5281515" },
        { nome: "Ácido copálico", cid: "11162521" }
    ]
},

"castanheira do para": {
    nome: "Castanheira do Pará",
    cientifico: "Bertholletia excelsa",
   finalidade: "Árvore amazônica de importância alimentar, cujas sementes são ricas em lipídios e nutrientes e estudadas por sua composição química.",
    moleculas: [
        { nome: "Ácido oleico", cid: "445639" },
        { nome: "Vitamina E", cid: "14985" }
    ]
},

"puxuri": {
    nome: "Puxuri",
    cientifico: "Licaria puchury-major",
   finalidade: "Árvore amazônica cujas sementes são utilizadas tradicionalmente e estudadas por seus compostos aromáticos e sua composição química.",
    moleculas: [
        { nome: "Safrol", cid: "5144" },
        { nome: "Eugenol", cid: "3314" }
    ]
},

"urucum": {
    nome: "Urucum",
    cientifico: "Bixa orellana",
   finalidade: "Espécie vegetal utilizada tradicionalmente como corante natural, cujas sementes contêm pigmentos de interesse alimentar e científico.",
    moleculas: [
        { nome: "Bixina", cid: "5281226" },
        { nome: "Norbixina", cid: "5281247" }
    ]
},

"jambu": {
    nome: "Jambu",
    cientifico: "Acmella oleracea",
   finalidade: "Planta amazônica utilizada na alimentação regional e na medicina popular, conhecida pela sensação característica provocada por seus compostos naturais.",
    moleculas: [
        { nome: "Espilantol", cid: "5353001" },
        { nome: "Beta-cariofileno", cid: "5281515" }
    ]
},

"ipe roxo": {
    nome: "Ipê roxo",
    cientifico: "Handroanthus impetiginosus",
    finalidade: "Árvore nativa brasileira utilizada tradicionalmente na medicina popular e investigada por seus compostos naturais e possíveis atividades biológicas.",
    moleculas: [
        { nome: "Lapachol", cid: "3883" },
        { nome: "Beta-lapachona", cid: "3884" }
    ]
},

"babosa": {
    nome: "Babosa",
    cientifico: "Aloe vera",
    finalidade: "Planta utilizada tradicionalmente e em produtos cosméticos, conhecida pelo gel de suas folhas e estudada por seus diferentes constituintes químicos.",
    moleculas: [
        { nome: "Aloína", cid: "12305761" },
        { nome: "Aloe-emodina", cid: "10207" }
    ]
},

"gengibre": {
    nome: "Gengibre",
    cientifico: "Zingiber officinale",
    finalidade: "Planta utilizada na alimentação e na medicina tradicional, cujo rizoma contém compostos naturais investigados por suas propriedades químicas e atividades biológicas.",
    moleculas: [
        { nome: "Gingerol", cid: "442793" },
        { nome: "6-Shogaol", cid: "5281794" }
    ]
},

"capim marinho": {
    nome: "Capim marinho",
    cientifico: "Pectis brevipedunculata",
    finalidade: "Espécie aromática de interesse etnobotânico, cuja composição química e possíveis aplicações tradicionais podem contribuir para estudos sobre a diversidade vegetal amazônica.",
    moleculas: [
        { nome: "Ácido ferúlico", cid: "445858" },
        { nome: "Lignina", cid: "398089748" }
    ]
},

"algodao": {
    nome: "Algodão",
    cientifico: "Gossypium barbadense",
    finalidade: "Espécie cultivada por suas fibras e sementes, de importância econômica e científica, estudada por sua composição química e por seus diferentes constituintes naturais.",
    moleculas: [
        { nome: "Gossipol", cid: "3503" },
        { nome: "Celulose", cid: "5462328" }
    ]
},

"hortela-zinho": {
    nome: "Hortelãzinho",
    cientifico: "Mentha pulegium",
    finalidade: "Planta aromática tradicionalmente utilizada em diferentes preparações populares e estudada por seus compostos voláteis e sua composição química.",
    moleculas: [
        { nome: "Mentol", cid: "1254" },
        { nome: "Mentona", cid: "26447" }
    ]
}

};

function buscarPlanta() {
   let input = document.getElementById("inputPlanta").value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

    if (plantas[input]) {
        let dados = plantas[input];

        document.getElementById("nomePlanta").innerText = "Nome da planta: " + dados.nome;
        document.getElementById("Caracteristicas").innerText ="Função: " + dados.finalidade;
        document.getElementById("nomeMolecula").innerText ="Escolha a molécula que deseja ver:"; 
        
        let area = document.getElementById("botoesMoleculas");

area.innerHTML = "";

dados.moleculas.forEach(m => {

    let botao = document.createElement("button");

    botao.innerText = m.nome;

    botao.onclick = function() {
        carregarMolecula(m.cid);
    };

    area.appendChild(botao);
});

    } else {
        document.getElementById("nomePlanta").innerText = "Planta não encontrada 😢";
        document.getElementById("nomeMolecula").innerText = "";
        viewer.clear();
    }
}
// informações das moleculas 
function carregarMolecula(cid) {
    viewer.clear();

    const informacoesMoleculas = {
//camomila
 5280443: {
    cid: 5280443,
    nome: "Apigenina",
    formula: "C15H10O5",
    massa: "270.24 g/mol",
    classe: "Flavonoide",
    descricao: "Composto fenólico da classe dos flavonoides, encontrado em diferentes plantas. É estudado por suas propriedades químicas e atividades biológicas."
},
1549992: {
    cid: 1549992,
    nome: "Alfa-bisabolol",
    formula: "C15H26O",
    massa: "222.37 g/mol",
    classe: "Sesquiterpeno",
    descricao: "Composto orgânico da classe dos sesquiterpenoides, encontrado em óleos essenciais de diferentes plantas. É investigado por suas propriedades químicas e atividades biológicas."
},

//açafrão
969516: {
    cid: 969516,
    nome: "Curcumina",
    formula: "C21H20O6",
    massa: "368.38 g/mol",
    classe: "Polifenol",
    descricao: "Pigmento natural amarelo encontrado no rizoma da Curcuma longa, conhecida como açafrão-da-terra. É um composto fenólico estudado pela ciência."
},
5469424: {
    cid: 5469424,
    nome: "Demetoxicurcumina",
    formula: "C20H18O5",
    massa: "338.36 g/mol",
    classe: "Polifenol",
    descricao: "Composto fenólico relacionado à curcumina e pertencente ao grupo dos curcuminoides. É investigado em estudos fitoquímicos e experimentais sobre suas propriedades biológicas."
},
//quebra pedra
9953821: {
    cid: 9953821,
    nome: "Filantina",
    formula: "C24H34O6",
    massa: "418.53 g/mol",
    classe: "Lignana",
    descricao: "Composto natural identificado em espécies do gênero Phyllanthus, incluindo Phyllanthus niruri, conhecida popularmente como quebra-pedra."
},
5491556: {
    cid: 5491556,
    nome: "Nirfilina",
    formula: "C24H32O8",
    massa: "448.51 g/mol",
    classe: "Composto fenólico",
    descricao: "Composto natural registrado em Phyllanthus niruri, espécie conhecida como quebra-pedra. Sua estrutura química é caracterizada por diferentes grupos funcionais contendo oxigênio."
},
//jaborandi
5910: {
    cid: 5910,
    nome: "Pilocarpina",
    formula: "C11H16N2O2",
    massa: "208.26 g/mol",
    classe: "Alcaloide",
    descricao: "Alcaloide encontrado em plantas do gênero Pilocarpus, conhecido pela presença de substâncias naturais nitrogenadas."
},
155306: {
    cid: 155306,
    nome: "Epiisopiloturina",
    formula: "C16H18N2O3",
    massa: "286.33 g/mol",
    classe: "Alcaloide",
    descricao: "Composto nitrogenado identificado em Pilocarpus microphyllus, espécie do gênero Pilocarpus. É investigado em pesquisas fitoquímicas e farmacológicas."
},

// canela
637511: {
    cid: 637511,
    nome: "Cinamaldeído",
    formula: "C9H8O",
    massa: "132.16 g/mol",
    classe: "Aldeído aromático",
    descricao: "Composto responsável por grande parte do aroma característico da canela, encontrado na casca de espécies do gênero Cinnamomum."
},
3314: {
    cid: 3314,
    nome: "Eugenol",
    formula: "C10H12O2",
    massa: "164.20 g/mol",
    classe: "Fenilpropanoide",
    descricao: "Composto aromático encontrado em óleos essenciais de diversas plantas. É investigado por suas propriedades químicas e possíveis atividades biológicas, mas sua ocorrência em Cinnamomum verum precisa ser confirmada."
},
//boldo do chile
10154: {
    cid: 10154,
    nome: "Boldina",
    formula: "C19H21NO4",
    massa: "327.38 g/mol",
    classe: "Alcaloide",
    descricao: "Alcaloide natural encontrado no boldo-do-Chile (Peumus boldus), pertencente a uma classe de compostos orgânicos que contém nitrogênio."
},
133323: {
    cid: 133323,
    nome: "Isoboldina",
    formula: "C19H21NO4",
    massa: "327.38 g/mol",
    classe: "Alcaloide aporfínico",
    descricao: "Alcaloide da classe das aporfinas, caracterizado por uma estrutura orgânica com nitrogênio. Sua associação específica com Peumus boldus precisa ser confirmada em fonte fitoquímica."
},

//alecrim 
5281792: {
    cid: 5281792,
    nome: "Ácido rosmarínico",
    formula: "C18H16O8",
    massa: "360.31 g/mol",
    classe: "Polifenol",
    descricao: "Composto fenólico encontrado em diferentes plantas aromáticas, incluindo espécies do gênero Salvia. É estudado por suas propriedades químicas."
},
65126: {
    cid: 65126,
    nome: "Ácido carnósico",
    formula: "C20H28O4",
    massa: "332.44 g/mol",
    classe: "Diterpeno fenólico",
    descricao: "Diterpeno fenólico identificado no alecrim e em outras plantas. É estudado por suas propriedades antioxidantes e por seu papel na química dos produtos naturais."
},
//erva doce 
637563: {
    cid: 637563,
    nome: "Anetol",
    formula: "C10H12O",
    massa: "148.20 g/mol",
    classe: "Composto aromático",
    descricao: "Substância aromática associada ao aroma característico da erva-doce e do anis, presente em óleos essenciais de plantas."
},
5281515: {
    cid: 5281515,
    nome: "Beta-cariofileno",
    formula: "C15H24",
    massa: "204.36 g/mol",
    classe: "Sesquiterpeno",
    descricao: "Sesquiterpeno encontrado em óleos essenciais de diversas plantas. É estudado por suas propriedades químicas e atividades biológicas. Sua ocorrência em Pimpinella anisum precisa ser confirmada."
},

//unha de gato
101176445: {
    cid: 101176445,
    nome: "Ácido isomitrafílico",
    formula: "C20H22N2O4",
    massa: "354.40 g/mol",
    classe: "Alcaloide",
    descricao: "Composto natural identificado em espécies do gênero Uncaria, incluindo Uncaria guianensis, conhecida como unha-de-gato."
},
94160: {
    cid: 94160,
    nome: "Mitrafilina",
    formula: "C21H24N2O4",
    massa: "368.43 g/mol",
    classe: "Alcaloide",
    descricao: "Alcaloide indólico identificado em espécies vegetais, incluindo Uncaria tomentosa. A ocorrência na espécie Uncaria guianensis precisa ser confirmada antes de estabelecer essa associação."
},

// RESTANTE 
//goiaba
5280343: {
    cid: 5280343,
    nome: "Quercetina",
    formula: "C15H10O7",
    massa: "302.23 g/mol",
    classe: "Flavonoide",
   descricao: "Flavonoide presente em diversas espécies vegetais, investigado por suas propriedades antioxidantes e anti-inflamatórias, principalmente em estudos experimentais."
},
5481224: {
    cid: 5481224,
    nome: "Guaijaverina",
    formula: "C20H18O11",
    massa: "434.35 g/mol",
    classe: "Flavonoide glicosilado",
    descricao: "Flavonoide glicosilado relacionado à quercetina. Apresenta uma estrutura formada por uma porção flavonoídica ligada a um açúcar."
},


12004512: {
    cid: 12004512,
    nome: "Gedunina",
    formula: "C28H34O7",
    massa: "482.57 g/mol",
    classe: "Limonoide",
   descricao: "Triterpenoide da classe dos limonoides, investigado em pesquisas sobre atividades antineoplásicas e antimaláricas e sobre a inibição da proteína Hsp90. Sua ocorrência na andiroba precisa ser confirmada."
},

445639: {
    cid: 445639,
    nome: "Ácido oleico",
    formula: "C18H34O2",
    massa: "282.46 g/mol",
    classe: "Ácido graxo insaturado",
    descricao: "Ácido graxo monoinsaturado encontrado em diversos óleos e sementes vegetais. É estudado por seu papel na composição dos lipídios e na alimentação."
},

370: {
    cid: 370,
    nome: "Ácido gálico",
    formula: "C7H6O5",
    massa: "170.12 g/mol",
    classe: "Ácido fenólico",
    descricao: "Composto fenólico encontrado em diversas plantas, investigado por sua atividade antioxidante e por outras propriedades biológicas em estudos experimentais."
},

5281515: {
    cid: 5281515,
    nome: "Beta-cariofileno",
    formula: "C15H24",
    massa: "204.36 g/mol",
    classe: "Sesquiterpeno",
    descricao: "Sesquiterpeno encontrado em óleos essenciais de diversas plantas, incluindo espécies de Copaifera. É investigado por suas propriedades anti-inflamatórias e outras atividades biológicas."
},

11162521: {
    cid: 11162521,
    nome: "Ácido copálico",
    formula: "C20H32O2",
    massa: "304.47 g/mol",
    classe: "Diterpeno",
   descricao: "Diterpeno associado à composição química da oleorresina de espécies de Copaifera, investigado em estudos fitoquímicos sobre produtos naturais."
},

14985: {
    cid: 14985,
    nome: "Alfa-tocoferol (vitamina E)",
    formula: "C29H50O2",
    massa: "430.71 g/mol",
    classe: "Tocoferol",
    descricao: "Forma de vitamina E presente em alimentos vegetais, com função antioxidante no organismo. Sua presença e quantidade variam conforme a espécie e a composição do alimento."
},

5144: {
    cid: 5144,
    nome: "Safrol",
    formula: "C10H10O2",
    massa: "162.19 g/mol",
    classe: "Éter aromático",
   descricao: "Composto orgânico aromático encontrado em determinados óleos essenciais vegetais. Apresenta interesse fitoquímico, mas também preocupações toxicológicas importantes."
},

3314: {
    cid: 3314,
    nome: "Eugenol",
    formula: "C10H12O2",
    massa: "164.20 g/mol",
    classe: "Fenilpropanoide",
    descricao: "Composto aromático da classe dos fenilpropanoides, encontrado em diferentes plantas. É investigado por suas propriedades químicas e possíveis atividades antimicrobianas e anti-inflamatórias."
},

5281226: {
    cid: 5281226,
    nome: "Bixina",
    formula: "C25H30O4",
    massa: "394.51 g/mol",
    classe: "Carotenoide",
   descricao: "Pigmento natural da classe dos carotenoides, encontrado nas sementes do urucum e responsável por grande parte de sua coloração característica. É estudado por suas propriedades químicas e antioxidantes."
},

5281247: {
    cid: 5281247,
    nome: "Norbixina",
    formula: "C24H28O4",
    massa: "380.48 g/mol",
    classe: "Carotenoide",
   descricao: "Pigmento natural relacionado à bixina, associado à coloração do urucum e utilizado como corante em aplicações alimentícias. Suas propriedades químicas são investigadas cientificamente."
},

5353001: {
    cid: 5353001,
    nome: "Espilantol",
    formula: "C14H23NO",
    massa: "221.34 g/mol",
    classe: "Alcamida",
    descricao: "Alcamida encontrada no jambu e responsável por parte da sensação de formigamento característica da planta. É investigada por suas propriedades químicas e atividades biológicas."
},

3883: {
    cid: 3883,
    nome: "Lapachol",
    formula: "C15H14O3",
    massa: "242.27 g/mol",
    classe: "Naftoquinona",
   descricao: "Composto natural da classe das naftoquinonas, investigado em estudos fitoquímicos e pesquisas experimentais sobre atividades biológicas. Seus efeitos ainda precisam ser avaliados conforme o tipo de estudo."
},

3884: {
    cid: 3884,
    nome: "Beta-lapachona",
    formula: "C15H14O3",
    massa: "242.27 g/mol",
    classe: "Naftoquinona",
    descricao: "Composto da classe das naftoquinonas estudado em pesquisas sobre processos celulares e possíveis atividades antitumorais. Os resultados experimentais não comprovam, por si só, eficácia como tratamento em seres humanos."
},

12305761: {
    cid: 12305761,
    nome: "Aloína",
    formula: "C21H22O9",
    massa: "418.40 g/mol",
    classe: "Antraquinona glicosilada",
   descricao: "Composto natural da classe das antraquinonas glicosiladas, encontrado principalmente no látex de espécies de Aloe. É estudado por suas propriedades químicas e efeitos biológicos, mas apresenta riscos associados à ingestão."
},

10207: {
    cid: 10207,
    nome: "Aloe-emodina",
    formula: "C15H10O5",
    massa: "270.24 g/mol",
    classe: "Antraquinona",
   descricao: "Composto da classe das antraquinonas associado a espécies de Aloe e investigado em pesquisas fitoquímicas e estudos experimentais sobre atividades biológicas."
},

442793: {
    cid: 442793,
    nome: "Gingerol",
    formula: "C17H26O4",
    massa: "294.39 g/mol",
    classe: "Fenol",
    descricao: "Composto fenólico associado ao gengibre, responsável por parte de seu sabor característico. É investigado por suas possíveis atividades antioxidantes e anti-inflamatórias em estudos experimentais."
},

5281794: {
    cid: 5281794,
    nome: "6-Shogaol",
    formula: "C17H24O3",
    massa: "276.37 g/mol",
    classe: "Fenol",
    descricao: "Composto relacionado ao gingerol, encontrado especialmente no gengibre submetido a processos de aquecimento ou secagem. É investigado por suas propriedades químicas e atividades biológicas."
},

445858: {
    cid: 445858,
    nome: "Ácido ferúlico",
    formula: "C10H10O4",
    massa: "194.18 g/mol",
    classe: "Ácido fenólico",
   descricao: "Composto fenólico encontrado em diferentes espécies vegetais. É investigado por suas propriedades antioxidantes e por seu papel na química dos vegetais."
},

398089748: {
    cid: 398089748,
    nome: "Lignina",
    formula: "(C10H12O4)n",
    massa: "Variável",
    classe: "Polímero natural",
    descricao: "Polímero natural complexo que contribui para a rigidez e sustentação dos tecidos vegetais. Diferentemente das moléculas pequenas, possui estrutura variável e pode não ser adequado à visualização molecular convencional em 3D."
},

3503: {
    cid: 3503,
    nome: "Gossipol",
    formula: "C30H30O8",
    massa: "518.56 g/mol",
    classe: "Polifenol",
   descricao: "Composto polifenólico encontrado em espécies de algodoeiro, especialmente associado às sementes e a outros tecidos da planta. É investigado por suas atividades biológicas, mas apresenta toxicidade relevante."
},

5462328: {
    cid: 5462328,
    nome: "Celulose",
    formula: "(C6H10O5)n",
    massa: "Variável",
    classe: "Polissacarídeo",
   descricao: "Polissacarídeo formado por unidades de glicose, componente fundamental da parede celular vegetal e importante constituinte das fibras de algodão. Por ser um polímero, apresenta massa molar variável."
},

1254: {
    cid: 1254,
    nome: "Mentol",
    formula: "C10H20O",
    massa: "156.27 g/mol",
    classe: "Álcool monoterpênico",
   descricao: "Composto orgânico da classe dos álcoois monoterpênicos, encontrado em óleos essenciais de algumas plantas aromáticas. É conhecido pela sensação de frescor que proporciona."
},

26447: {
    cid: 26447,
    nome: "Mentona",
    formula: "C10H18O",
    massa: "154.25 g/mol",
    classe: "Cetona monoterpênica",
    descricao: "Composto orgânico da classe das cetonas monoterpênicas, presente em óleos essenciais de determinadas espécies vegetais. Contribui para o aroma característico de algumas plantas do gênero Mentha."
}

    };

    const dados = informacoesMoleculas[cid];

    if (dados) {

        document.getElementById("tituloMolecula").innerText =
            dados.nome;

        document.getElementById("formulaMolecula").innerText =
            dados.formula;

        document.getElementById("massaMolecula").innerText =
            dados.massa;

        document.getElementById("cidMolecula").innerText =
            dados.cid;

        document.getElementById("classeMolecula").innerText =
            dados.classe;

        document.getElementById("descricaoMolecula").innerText =
            dados.descricao;
    }

    $3Dmol.download("cid:" + cid, viewer, {}, function() {

        viewer.setStyle({}, {
            stick: {}
        });

        viewer.zoomTo();
        viewer.render();

    });
}

let selecionados = [];

viewer.setClickable({}, true, function(atom, viewer, event, container) {

    if (!atom) return;

    console.log("CLICOU ÁTOMO");

    if (selecionados.includes(atom)) return;

    selecionados.push(atom);

    console.log("Selecionados:", selecionados);
});

console.log("NOVO SISTEMA ATIVO");

// carregar planta

function carregarPlantas() {

    const lista = document.getElementById("listaPlantas");

    lista.innerHTML = "";

    const nomesPlantas = Object.keys(plantas);

    nomesPlantas.forEach((chave, indice) => {

        const dados = plantas[chave];

        const card = document.createElement("div");
        card.className = "card-planta";

        // Esconde todas as plantas depois das 3 primeiras
        if (indice >= 3) {
            card.classList.add("planta-escondida");
        }

        card.innerHTML = `
            <div class="icone-planta">🌿</div>

            <h3>${dados.nome.split("-")[0]}</h3>

            <p class="nome-cientifico">
                ${dados.nome.includes("-") ? dados.nome.split("-")[1] : ""}
            </p>

            <p class="descricao-planta">
                ${dados.finalidade}
            </p>

            <button class="botao-planta">
                Explorar planta →
            </button>
        `;

        const botao = card.querySelector(".botao-planta");

        botao.onclick = function() {

            document.getElementById("inputPlanta").value = chave;

            buscarPlanta();

            document.getElementById("busca").scrollIntoView({
                behavior: "smooth"
            });
        };

        lista.appendChild(card);
    });

    // Botão Ver mais
    const botaoMais = document.createElement("button");

    botaoMais.id = "botaoVerMais";
    botaoMais.className = "botao-ver-mais";
    botaoMais.innerText = "Ver mais plantas ↓";

    botaoMais.onclick = function() {

        const plantasEscondidas =
            document.querySelectorAll(".planta-escondida");

        plantasEscondidas.forEach(card => {
            card.classList.toggle("mostrar-planta");
        });

        if (botaoMais.innerText === "Ver mais plantas ↓") {
            botaoMais.innerText = "Mostrar menos ↑";
        } else {
            botaoMais.innerText = "Ver mais plantas ↓";
        }
    };

    lista.parentElement.appendChild(botaoMais);
}
carregarPlantas();

document.getElementById("inputPlanta").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        buscarPlanta();
    }

});
