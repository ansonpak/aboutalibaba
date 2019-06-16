// DESAFIOS
// Mostrar premio se % de acertos >= 80%
//
//
//
///////////////////////////////////
// Estado do jogo
////////////////////////////////////

//Total de Perguntas

var initialGameState = {
    currentQuestion: 0,
    recordedAnswer: {}
};
var gameState = initialGameState;

function resetGameState()
{
    localStorage.clear();
    gameState = initialGameState;
}

function saveGameState()
{
    localStorage.setItem("gameState", JSON.stringify(gameState));
}

function loadGameState()
{
    var str = localStorage.getItem("gameState");

    if(str != null)
    {
        gameState = JSON.parse(str);
        // console.log(str)
    }
    else {
        // console.log("aqui")
    }
}
function resize()
{
    var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
    var wratio = width / height, ratio = canvas.width / canvas.height;

    if (wratio < ratio)
    {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
    } else
    {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
    }
}

////////////////////////////////////
// Tela de perguntas e respostas
////////////////////////////////////
var Question = new Phaser.Scene('Question');
Question.savedOption = 0;
Question.savedAnswer;

Question.preload = function()
{
    this.load.image('nextButton', '/assets/button_green.png');
    this.load.image('prevButton', '/assets/button_orange.png');
    this.load.image('nextButton1', '/assets/button_blue.png');
    this.load.image('prevButton1', '/assets/button_yellow.png');
    this.load.image('option', '/assets/option.png');
    this.load.image('selectedOption', '/assets/option_green.png');
    this.load.image('selectedOptionRed', '/assets/option_red.png');
    this.load.image('etao', '/assets/一淘.jpeg');
    this.load.image('tmall', '/assets/天貓.jpg');
    this.load.image('taobao', '/assets/掏寶網.png');
    this.load.json('questions', '/data/questions.json');
}

// obtem questao de numero questionID (0, 1, 2, ...)
Question.getQuestion = function(questionID)
{
    var questions = this.cache.json.get('questions');
    return questions[questionID]; // pode ser undefined

}
// verifica se existe questao de numero questionID
Question.questionExists = function(questionID)
{
    if(this.getQuestion(questionID) != undefined)
    return true;
    else
    return false;
}

Question.create = function()
{

    // carrega estado do jogo
    loadGameState();
    // variaveis
    //var questions = this.cache.json.get('questions');
    //var question = questions[gameState.currentQuestion];
    var question = this.getQuestion(gameState.currentQuestion);

    // opcao selecionada: undefined (nenhuma), 'a', 'b' ou 'c'
    var selectedAnswer = gameState.recordedAnswer[gameState.currentQuestion];
    var textConfig = { fontFamily: 'sans-serif', fontSize: '24px', color: '#000', wordWrap: { width: 600 } };
    var textConfig1 = { fontFamily: 'sans-serif', fontSize: '30px', color: '#000', wordWrap: { width: 600 } };

    // cria o enunciado da pergunta
    var title = "Alibaba group";
    var titleText = this.add.text(150, 100, title, textConfig);
    var background = "consumer-to-consumer (C2C), business-to-consumer (B2C), and business-to-business (B2B) sales services :";
    var questionText = this.add.text(150, 150, background, textConfig);


    // cria botoes das respostas
    var etao = this.add.sprite(200, 350, 'etao');
    var tmall = this.add.sprite(450, 350, 'tmall');
    var taobao = this.add.sprite(700, 350, 'taobao');
    etao.setDisplaySize(180,180);
    tmall.setDisplaySize(180,180);
    taobao.setDisplaySize(180,180);
    var etaoText = this.add.text(200, 450, 'Etao', textConfig1);
    var tmallText = this.add.text(450, 450, 'Tmall', textConfig1);
    var taobaoText = this.add.text(700, 450, 'Taobao', textConfig1);

    // botao AVANCAR
    var nextButton = this.add.sprite(600, 650, 'nextButton');
    var nextLabel = this.add.text(600, 650, 'Next', textConfig);
    nextLabel.setOrigin(0.5, 0.5);

    // botao VOLTAR
    var prevButton = this.add.sprite(250, 650, 'prevButton');
    var prevLabel = this.add.text(250, 650, 'Previous', textConfig);
    prevLabel.setOrigin(0.5, 0.5);

    // logica do botao AVANCAR
    nextButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
        location.href = "about2.ejs";
    });

    // faz interacao do botao VOLTAR
    prevButton.setInteractive({useHandCursor: true}).on('pointerdown', () => {
        location.href = "about.ejs";
    });
}

Question.update = function(time, delta)
{
}

//
// Cria novo jogo
//
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 700,
    backgroundColor: '#f4f4f4',
    plugins: {
      global: [{ key: 'GameScalePlugin', plugin: Phaser.Plugins.GameScalePlugin, mapping: 'gameScale' }]
    },
    scene: [  Question ]
};
var game = new Phaser.Game(config);


function create () {
    window.addEventListener('resize', resize);
    resize();
}

function resize() {
    var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
    var wratio = width / height, ratio = canvas.width / canvas.height;

    if (wratio < ratio) {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
    } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
    }
}
