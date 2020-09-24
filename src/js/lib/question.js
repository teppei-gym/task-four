export default class Question {
  constructor(data) {
    this.question = data;
    this.currentQuestionNum = 0;
    this.answerCount = 0;
  }

  /**
   * 現在の問題を返す
   */
  current() {
    return this.question[this.currentQuestionNum] || false;
  }

  _next() {
    ++this.currentQuestionNum;
  }

  /**
   * answerが正しい場合answerCountを１増やす
   *
   * @param {string} answer
   */
  check(answer) {
    if (answer === this.current().correct_answer)++this.answerCount;
    this._next();
  }
}