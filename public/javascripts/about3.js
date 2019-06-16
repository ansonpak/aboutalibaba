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
    this.load.image('weibo', '/assets/新浪微薄.png');
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
    var background = "Internet community software :";
    var questionText = this.add.text(150, 150, background, textConfig);


    // cria botoes das respostas
    var weibo = this.add.sprite(400, 350, 'weibo');
    weibo.setDisplaySize(400,180);
    var weiboText = this.add.text(400, 450, 'Weibo', textConfig1);

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
        location.href = "about4.ejs";
    });

    // faz interacao do botao VOLTAR
    prevButton.setInteractive({useHandCursor: true}).on('pointerdown', () => {
        location.href = "about2.ejs";
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
