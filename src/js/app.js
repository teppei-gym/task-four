import Question from './lib/question'

const url = 'https://opentdb.com/api.php?amount=10';
const startBtn = document.getElementById('js-start');
const homeBtn = document.getElementById('js-home');
const title = document.getElementById('js-title');
const sentence = document.getElementById('js-sentence');
const genre = document.getElementById('js-genre');
const difficulty = document.getElementById('js-difficulty');
const choicesForm = document.getElementById('js-choices-form');
let question = null;
const questionForm = {
  title: title,
  sentence: sentence,
  genre: genre,
  difficulty: difficulty,
  choicesForm: choicesForm
};

//　初期描画
init(title, sentence, startBtn, homeBtn);

startBtn.addEventListener('click', async function () {
  startBtn.style.display = 'none';
  title.textContent = '取得中';
  sentence.textContent = '少々お待ちください'
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();

  question = new Question(data.results);
  output(questionForm, question);
});

homeBtn.addEventListener('click', function () {
  clear(questionForm);
  init(title, sentence, startBtn, homeBtn);
})

function output({ title, sentence, genre, difficulty, choicesForm }, question) {
  const current = question.current();

  if (!current) {
    clear(questionForm);
    viewResults(title, sentence, homeBtn, question);
    question = null;
    return;
  }

  title.textContent = `問題 ${question.currentQuestionNum + 1}`;
  sentence.textContent = current.question;
  genre.textContent = `[ジャンル] ${current.category}`;
  difficulty.textContent = `[難易度] ${current.difficulty}`;

  let choices = []
  if (Array.isArray(current.incorrect_answers)) {
    choices = [...current.incorrect_answers, current.correct_answer];
  } else {
    choices = [current.incorrect_answers, current.correct_answer];
  }

  for (let choice of shuffle(choices)) {
    const btn = document.createElement('button');
    btn.addEventListener('click', function () {
      question.check(this.value);
      clear(questionForm);
      output(questionForm, question);
    });

    btn.style.display = 'block';
    btn.textContent = choice;
    btn.value = choice;
    choicesForm.appendChild(btn);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
}

function clear({ title, sentence, genre, difficulty, choicesForm }) {
  title.textContent = '';
  sentence.textContent = '';
  genre.textContent = '';
  difficulty.textContent = '';
  choicesForm.innerHTML = '';
}

function init(title, sentence, startBtn, homeBtn) {
  title.textContent = 'ようこそ';
  sentence.textContent = '以下のボタンをクリック';
  startBtn.style.display = 'inline';
  homeBtn.style.display = 'none';
}

function viewResults(title, sentence, homeBtn, question) {
  title.textContent = `あなたの正統数は${question.answerCount}です!!`;
  sentence.textContent = '再度チャレンジしたい場合は以下をクリック';
  homeBtn.style.display = 'inline';
}