// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What does HTML stand for?",
        imgSrc : "img/html.jpg",
        choiceA : "hyper Text Markup Language",
        choiceB : "Hyperlinks and Text Markup Languages",
        choiceC : "Home Tool Markup Language",
        correct : "A"

    },{
        question : "What does CSS stand for?",
        imgSrc : "img/css.png",
        choiceA : "Colorful System Style",
        choiceB : "Cascading Style sheets",
        choiceC : "Computer Style Sheet",
        correct : "B"
    },{
        question : "What does JS stand for?",
        imgSrc : "img/js.jpg",
        choiceA : "Javason",
        choiceB : "javasession",
        choiceC : "Javascript",
        correct : "C"
    },{
        question : "Which of the following statement is true about static function in C?",
        imgSrc : "img/C.png",
        choiceA : "Static function are global function",
        choiceB : "static function are restricted to the files where they are declared",
        choiceC : "There is no concept like static functions in C",
        correct : "B"
    },{
        question : "State True or False. In C, it is mandatory to declare a function before use?",
        imgSrc : "img/C.png",
        choiceA : "True",
        choiceB : "False",
        choiceC : "None",
        correct : "B"
    },{
        question : "The programming language Comal stand for",
        imgSrc : "img/comal.png",
        choiceA : "Common Algorithmic Language",
        choiceB : "Common arithmetic language",
        choiceC : "Common Algorithmic learning",
        correct : "A"
    },{
        question : "What is the only function all C++ programs must contain?",
        imgSrc : "img/c++.png",
        choiceA : "Start",
        choiceB : "System",
        choiceC : "Main",
        correct : "C"
    },{
        question : "The statement I++; is equivalent to?",
        imgSrc : "img/I++.jpg",
        choiceA : "i = i + i",
        choiceB : "i = i + 1",
        choiceC : "i = i - 1",
        correct : "B"
    },{
        question : "Which of the following is not OOP concept in Jca?",
        imgSrc : "img/java.jpg",
        choiceA : "Compilation",
        choiceB : "Encapsulation",
        choiceC : "Polymorphim",
        correct : "A"
    },{
        question : "What is default value of boolean variable?",
        imgSrc : "img/boolean.png",
        choiceA : "True",
        choiceB : "False",
        choiceC : "0",
        correct : "B"
    },{
        question : "which of the following is not a new feature of HTML?",
        imgSrc : "img/html.jpg",
        choiceA : "Cookies",
        choiceB : "Form Type",
        choiceC : "Local Storage",
        correct : "A"
    },{
        question : "which HTML tag is used for sidebar content?",
        imgSrc : "img/html.jpg",
        choiceA : "Aside",
        choiceB : "Sidebar",
        choiceC : "side",
        correct : "B"
    },{
        question : "Is Phython case sensitive when dealing with identities?",
        imgSrc : "img/python.png",
        choiceA : "Yes",
        choiceB : "No",
        choiceC : "Machine Dependent",
        correct : "A"
    },{
        question : "Who is the father of HTML?",
        imgSrc : "img/html.jpg",
        choiceA : "Braham Lee",
        choiceB : "Charles Babbage",
        choiceC : "Albert Einsten",
        correct : "A"
    },{
        question : "What is the full meaning of SQL?",
        imgSrc : "img/sql.jpg",
        choiceA : "Stuctured Querried Language",
        choiceB : "Structured Query Language",
        choiceC : "Structured Querry Language",
        correct : "B"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 30; // 30s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}


