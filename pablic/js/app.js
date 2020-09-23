/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_question__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/question */ \"./src/js/lib/question.js\");\n\n\nconst url = 'https://opentdb.com/api.php?amount=10';\nconst startBtn = document.getElementById('js-start');\nconst homeBtn = document.getElementById('js-home');\nconst title = document.getElementById('js-title');\nconst sentence = document.getElementById('js-sentence');\nconst genre = document.getElementById('js-genre');\nconst difficulty = document.getElementById('js-difficulty');\nconst choicesForm = document.getElementById('js-choices-form');\nlet question = null;\nconst questionForm = {\n  title: title,\n  sentence: sentence,\n  genre: genre,\n  difficulty: difficulty,\n  choicesForm: choicesForm\n};\n\n//　初期描画\ninit(title, sentence, startBtn, homeBtn);\n\nstartBtn.addEventListener('click', function () {\n  startBtn.style.display = 'none';\n  title.textContent = '取得中';\n  sentence.textContent = '少々お待ちください'\n  fetch(url).then(function (response) {\n    if (!response.ok) {\n      throw new Error();\n    }\n\n    return response.json();\n  }).then(function (data) {\n    question = new _lib_question__WEBPACK_IMPORTED_MODULE_0__[\"default\"](data.results);\n    output(questionForm, question);\n  });\n});\n\nhomeBtn.addEventListener('click', function () {\n  clear(questionForm);\n  init(title, sentence, startBtn, homeBtn);\n})\n\nfunction output({ title, sentence, genre, difficulty, choicesForm }, question) {\n  const current = question.current();\n\n  if (!current) {\n    clear(questionForm);\n    viewResults(title, sentence, homeBtn, question);\n    question = null;\n    return;\n  }\n\n  title.textContent = `問題 ${question.currentQuestionNum + 1}`;\n  sentence.textContent = current.question;\n  genre.textContent = `[ジャンル] ${current.category}`;\n  difficulty.textContent = `[難易度] ${current.difficulty}`;\n\n  let choices = []\n  if (Array.isArray(current.incorrect_answers)) {\n    choices = [...current.incorrect_answers, current.correct_answer];\n  } else {\n    choices = [current.incorrect_answers, current.correct_answer];\n  }\n\n  for (let choice of shuffle(choices)) {\n    const btn = document.createElement('button');\n    btn.addEventListener('click', function () {\n      question.check(this.value);\n      clear(questionForm);\n      output(questionForm, question);\n    });\n\n    btn.style.display = 'block';\n    btn.textContent = choice;\n    btn.value = choice;\n    choicesForm.appendChild(btn);\n  }\n}\n\nfunction shuffle(array) {\n  for (let i = array.length - 1; i > 0; i--) {\n    let j = Math.floor(Math.random() * (i + 1));\n    let tmp = array[i];\n    array[i] = array[j];\n    array[j] = tmp;\n  }\n  return array;\n}\n\nfunction clear({ title, sentence, genre, difficulty, choicesForm }) {\n  title.textContent = '';\n  sentence.textContent = '';\n  genre.textContent = '';\n  difficulty.textContent = '';\n  choicesForm.innerHTML = '';\n}\n\nfunction init(title, sentence, startBtn, homeBtn) {\n  title.textContent = 'ようこそ';\n  sentence.textContent = '以下のボタンをクリック';\n  startBtn.style.display = 'inline';\n  homeBtn.style.display = 'none';\n}\n\nfunction viewResults(title, sentence, homeBtn, question) {\n  title.textContent = `あなたの正統数は${question.answerCount}です!!`;\n  sentence.textContent = '再度チャレンジしたい場合は以下をクリック';\n  homeBtn.style.display = 'inline';\n}\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/lib/question.js":
/*!********************************!*\
  !*** ./src/js/lib/question.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Question; });\nclass Question {\n  constructor(data) {\n    this.question = data;\n    this.currentQuestionNum = 0;\n    this.answerCount = 0;\n  }\n\n  /**\n   * 現在の問題を返す\n   */\n  current() {\n    return this.question[this.currentQuestionNum] || false;\n  }\n\n  _next() {\n    ++this.currentQuestionNum;\n  }\n\n  /**\n   * answerが正しい場合answerCountを１増やす\n   *\n   * @param {string} answer\n   */\n  check(answer) {\n    if (answer === this.current().correct_answer)++this.answerCount;\n    this._next();\n  }\n}\n\n//# sourceURL=webpack:///./src/js/lib/question.js?");

/***/ })

/******/ });