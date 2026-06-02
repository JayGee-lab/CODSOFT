let users = JSON.parse(localStorage.getItem("users")) || [];
let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

let currentUser = null;
let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let answers = [];

function showPage(id){

document.querySelectorAll(".page").forEach(page=>{
page.classList.remove("active");
});

document.getElementById(id).classList.add("active");

if(id==="quizListPage"){
loadQuizList();
}
}

function register(){

const user=document.getElementById("regUser").value;
const pass=document.getElementById("regPass").value;

users.push({user,pass});

localStorage.setItem("users",JSON.stringify(users));

alert("Registration Successful");

showPage("loginPage");
}

function login(){

const user=document.getElementById("loginUser").value;
const pass=document.getElementById("loginPass").value;

const found=users.find(
u=>u.user===user && u.pass===pass
);

if(found){

currentUser=user;

document.getElementById("currentUser").innerText=
"Welcome, "+user;

alert("Login Successful");

showPage("quizListPage");

}else{
alert("Invalid Login");
}
}

function logout(){

currentUser=null;

document.getElementById("currentUser").innerText="";

showPage("homePage");
}

function addQuestion(){

const container=document.getElementById("questionContainer");

const div=document.createElement("div");

div.className="question-box";

div.innerHTML=`
<input class="question" placeholder="Question">

<input class="opt" placeholder="Option A">
<input class="opt" placeholder="Option B">
<input class="opt" placeholder="Option C">
<input class="opt" placeholder="Option D">

<input class="correctAnswer"
placeholder="Correct Answer (A/B/C/D)">
`;

container.appendChild(div);
}

function saveQuiz(){

const title=document.getElementById("quizTitle").value;

const questionBoxes=
document.querySelectorAll(".question-box");

let questions=[];

questionBoxes.forEach(box=>{

const question=
box.querySelector(".question").value;

const options=
box.querySelectorAll(".opt");

questions.push({

question,

options:[
options[0].value,
options[1].value,
options[2].value,
options[3].value
],

correct:
box.querySelector(".correctAnswer")
.value.toUpperCase()

});
});

quizzes.push({
title,
questions
});

localStorage.setItem(
"quizzes",
JSON.stringify(quizzes)
);

alert("Quiz Saved");

showPage("quizListPage");
}

function loadQuizList(){

const list=document.getElementById("quizList");

list.innerHTML="";

quizzes.forEach((quiz,index)=>{

const btn=document.createElement("button");

btn.innerText=quiz.title;

btn.onclick=()=>startQuiz(index);

list.appendChild(btn);
});
}

function startQuiz(index){

currentQuiz=quizzes[index];

currentQuestionIndex=0;
score=0;
answers=[];

document.getElementById("takeQuizTitle")
.innerText=currentQuiz.title;

showPage("takeQuizPage");

displayQuestion();
}

function displayQuestion(){

const q=currentQuiz.questions[currentQuestionIndex];

let html=`<h3>${q.question}</h3>`;

["A","B","C","D"].forEach((letter,i)=>{

html+=`
<div class="option"
onclick="selectAnswer('${letter}')">
${letter}. ${q.options[i]}
</div>
`;
});

document.getElementById("quizQuestion")
.innerHTML=html;
}

function selectAnswer(answer){

answers.push(answer);

const correct=
currentQuiz.questions[currentQuestionIndex]
.correct;

if(answer===correct){
score++;
}
}

function nextQuestion(){

currentQuestionIndex++;

if(currentQuestionIndex <
currentQuiz.questions.length){

displayQuestion();

}else{
showResults();
}
}

function showResults(){

showPage("resultPage");

document.getElementById("scoreDisplay")
.innerText=
`Score: ${score} / ${currentQuiz.questions.length}`;

let review="";

currentQuiz.questions.forEach((q,i)=>{

review+=`
<p>
<b>${q.question}</b><br>
Correct Answer: ${q.correct}
</p><hr>
`;
});

document.getElementById("answerReview")
.innerHTML=review;
}