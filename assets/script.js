var startButton = document.getElementById('start-button');
var nextButton = document.getElementById('next-button');
var highscoreButton = document.getElementById('highscore-button');
var goBackButton = document.getElementById('go-back-button');

var highscoreElement = document.getElementById('highscore-screen');
var quizIntro = document.getElementById('quiz-intro');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var quizResultElement = document.getElementById('quiz-result-screen');

//not working?
var correctMessage = document.getElementById('correct-message')
var wrongMessage = document.getElementById('wrong-message')

let currentQuestionIndex;

var timerElement = document.querySelector(".counter");
var timerCount;
var timer;

var quizComplete = false;

var scoreElement = document.getElementById('score');

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
}

function goBack () {
    highscoreElement.classList.add('hide');
    quizIntro.classList.remove('hide');
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

// function startTimer() {
//     function countdown() {
//         var seconds = 60;
//         function tick() {
//             var counter = document.getElementById('counter');
//             seconds--;
//             counter.innerHTML =
//                 "0:" + (seconds < 10 ? "0" : "") + String(seconds);
//             if (seconds > 0) {
//                 setTimeout(tick, 1000);
//             }   else {
                
//             }
//         }
//         tick();
//     }
//     countdown();
// }

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
    // if (currentQuestionIndex < questions.length) {
    //     setNextQuestion
    // }   else {
    //     questionContainerElement.classList.add('hide');
    //     quizResultElement.classList.remove('hide');
    //     quizComplete = true;
    // }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer;
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}

function resetState() {
    clearStatusClass(document.body)
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

    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    nextButton.classList.remove('hide')
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    // if (correct) {
    //     element.classList.add('correct')
    // } else {
    //     element.classList.add('wrong')
    // }
    if (correct) {
        correctMessage.classList.remove('hide')
    }   else {
        wrongMessage.classList.remove('hide')
    }
}

function clearStatusClass(element) {
    // element.classList.remove('correct')
    correctMessage.classList.add('hide')
    // element.classList.remove('wrong')
    wrongMessage.classList.add('hide')
}

var questions = [
    {
        question: "Commonly used data types do NOT include:",
        answers: 
        // [
        //     { text:"strings", correct: false },
        //     { text:"booleans", correct: false },
        //     { text:"numbers", correct: false },
        //     { text: "alerts", correct: true },
        // ]
        ['strings', 'booleans', 'numbers', 'alerts'],
        correct: 'alerts',
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text:"Central Style Sheets", correct: false },
            { text:"Cascading Style Sheets", correct: true },
            { text:"Cascading Simple Sheets", correct: false },
            { text: "Cats Silk Stockings", correct: false }
        ]
    },
    {
        question: "Which language runs in a web browser?",
        answers: [
            { text:"javascript", correct: true },
            { text:"C", correct: false },
            { text:"Java", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text:"Hyperloop Machine Language", correct: false },
            { text:"H T M L", correct: false },
            { text:"Hypertext Markup Language", correct: true },
            { text: "Planes, Trains, and Automobiles", correct: false }
        ]
    },
    {
        question: "What year was Paul McCartney born?",
        answers: [
            { text:"1917", correct: false },
            { text:"2077", correct: false },
            { text:"1999", correct: false },
            { text: "1942", correct: true }
        ]
    },
    {
        question: "",
        answers: [
            { text:"", correct: false },
            { text:"", correct: false },
            { text:"", correct:  false},
            { text: "", correct:  false}
        ]
    },
]

