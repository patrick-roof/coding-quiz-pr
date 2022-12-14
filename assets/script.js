var startButton = document.getElementById('start-button');
var nextButton = document.getElementById('next-button');
var highscoreButton = document.getElementById('highscore-button');
var goBackButton = document.getElementById('go-back-button');
var submitButton = document.querySelector('#submit-button')

var userInitials = document.querySelector('#user-initials')
var userScore = document.querySelector('#user-score')

var highscoreElement = document.getElementById('highscore-screen');
var highscoreList = document.getElementById('highscore-list');

var quizIntro = document.getElementById('quiz-intro');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var quizResultElement = document.getElementById('quiz-result-screen');

var correctMessage = document.getElementById('correct-message')
var wrongMessage = document.getElementById('wrong-message')

let currentQuestionIndex;

var timerElement = document.querySelector(".counter");
var timerCount;
var timer;

var quizComplete = false;

var scoreElement = document.getElementById('score');

var highScores = []

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
highscoreButton.addEventListener('click', getHighscores);
goBackButton.addEventListener('click', goBack);

function getHighscores() {
    quizIntro.classList.add('hide');
    highscoreElement.classList.remove('hide');

    // gets the scores from local storage abd parses it
    var scores = JSON.parse(localStorage.getItem('scores'))
    // finds the highscore container
    var container = document.getElementById('highscore-list');
    // creates an ol
    var ol = document.createElement('ol')

    // clears highscore list when going back to the highscore page
    container.innerHTML = ''

    // creates the li items for the highscore ordered list
    for (i = 0; i < scores.length; i++) {
        // creates one li item
        var li = document.createElement('li')

        // adds the initials and score to the li
        li.innerHTML = ` ${scores[i].initials} - ${scores[i].score}`
        // adds the li item from the line above to the ordered list
        ol.appendChild(li)
    }
    // adds the ordered list to the DOM
    container.appendChild(ol)
}

function goBack () {
    highscoreElement.classList.add('hide');
    quizIntro.classList.remove('hide');
    timer = setInterval(function() {
        timerElement.textContent = timerCount;
    },);
    timerCount = 100;
}

function startGame() {
    quizComplete = false;
    timerCount = 100;
    console.log('started');
    quizIntro.classList.add('hide');
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    startTimer();
}

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (quizComplete) {
            clearInterval(timer);
        }
    }, 1000);
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
    if (currentQuestionIndex === 5) {
        quizComplete = true;
        questionContainerElement.classList.add('hide');
        quizResultElement.classList.remove('hide');
        scoreElement.textContent = timerCount;
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        } else {
            button.dataset.correct = false;
        }

        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct;

    console.log(correct)
    console.log(selectedButton)

    setStatusClass(correct)
    nextButton.classList.remove('hide')
}

function setStatusClass(correct) {
    if (correct === 'true') {
        wrongMessage.classList.add('hide');
        correctMessage.classList.remove('hide');
        timerCount +=5
    }   else {
        wrongMessage.classList.remove('hide');
        correctMessage.classList.add('hide');
        timerCount -=5
    }
}

submitButton.addEventListener('click', function(event) {
    event.preventDefault();

    var initials = document.querySelector('#initials').value;
    var score = timerCount
    
    highScores.push({initials: initials, score: score});

    localStorage.setItem('scores', JSON.stringify(highScores))

    console.log(highScores)

    getHighscores()
    quizResultElement.classList.add('hide')
})


var questions = [
    {
        question: "Commonly used data types do NOT include:",
        answers: 
        [
            { text:"strings", correct: false },
            { text:"booleans", correct: false },
            { text:"numbers", correct: false },
            { text: "alerts", correct: true },
        ]
    },
    {
        question: "What does CSS stand for?",
        answers:
        [
            { text:"Central Style Sheets", correct: false },
            { text:"Cascading Style Sheets", correct: true },
            { text:"Cascading Simple Sheets", correct: false },
            { text: "Cats Silk Stockings", correct: false }
        ]
    },
    {
        question: "Which language runs in a web browser?",
        answers:
        [
            { text:"javascript", correct: true },
            { text:"C", correct: false },
            { text:"Java", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "What does HTML stand for?",
        answers:
        [
            { text:"Hyperloop Machine Language", correct: false },
            { text:"H T M L", correct: false },
            { text:"Hypertext Markup Language", correct: true },
            { text: "Planes, Trains, and Automobiles", correct: false }
        ]
    },
    {
        question: "What year was Paul McCartney born?",
        answers:
        [
            { text:"1917", correct: false },
            { text:"2077", correct: false },
            { text:"1999", correct: false },
            { text: "1942", correct: true }
        ]
    },
    {
        question: "",
        answers:
        [
            { text:"", correct: false },
            { text:"", correct: false },
            { text:"", correct:  false},
            { text: "", correct:  false}
        ]
    },
]

