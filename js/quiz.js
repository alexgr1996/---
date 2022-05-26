const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const rulesElement = document.getElementById('rules')

const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
});

function startGame() {
  startButton.classList.add('hide')
  rulesElement.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question 
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text // answer text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
    button.disabled = true
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'End Quiz'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: '2 + 2 = ?',
    answers: [
      { text: '4', correct: true },
      { text: '10', correct: false },
      { text: '2', correct: false },
      { text: '8', correct: false }
    ]
  },
  {
    question: '4 x 5 = ?',
    answers: [
      { text: '4', correct: false },
      { text: '20', correct: true },
      { text: '9', correct: false },
      { text: '18', correct: false }
    ]
  },
  {
    question: '0 / 100 = ?',
    answers: [
      { text: '4', correct: false },
      { text: '10', correct: false },
      { text: '2', correct: false },
      { text: '0', correct: true }
    ]
  }

]





/*  WILL SEE */

var skip = document.getElementById('skip');
var score = document.getElementById('score');
var totalScore = document.getElementById('totalScore');
var countdown = document.getElementById('countdown');
var count =0;
var scoreCount = 0;
var duration = 0;

var qaSet = document.querySelectorAll('.qa_set');
var qaAnsRow = document.querySelectorAll('.qa_set .qa_ans_row input');

skip.addEventListener('click', function(){
  step();
  duration= 10;
})


qaAnsRow.forEach( function(qaAnsRowSingle){
  qaAnsRowSingle.addEventListener('click', function(){
    setTimeout(function(){
      step();
      duration=10;
    },500)


var valid = this.getAttribute("valid");
    if(valid== "valid"){
      scoreCount +=20;
      score.innerHTML = scoreCount;
      totalScore.innerHTML = scoreCount;
    }else{
    scoreCount -=20;
    score.innerHTML = scoreCount;
    totalScore.innerHTML = scoreCount;
  }
  })
});

function step(){
  count +=1;
  for(var i=0; i < qaSet.length; i++) {
    qaSet[i].className= 'qa_set';
  }
  qaSet[count].className='qa_set active';
  if(count == 5){
    skip.style.display = 'none';
    clearInterval(durationTime);
    countdown.innerHTML =0;
  }
}


var durationTime = setInterval(function(){
  if(duration == 10){
  duration;
}
duration +=1;
countdown.innerHTML = duration;
  if(countdown.innerHTML == "10") {
    step()
  }
},1000);





/* const start_btn = document.querySelector(".start_btn button");  */
const info_box = document.querySelector(".info_box");
/*const exit_btn = info_box.querySelector(".buttons .quit");  
const continue_btn = info_box.querySelector(".buttons .restart");



exit_btn.onclick = () =>{
  info_box.classList.add("activeInfo");
}


continue_btn.onclick = () =>{
  info_box.classList.remove("activeInfo");
  quiz_box.classList.add("activeQuiz");
}
*/




