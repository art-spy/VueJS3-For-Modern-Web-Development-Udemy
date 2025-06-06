<template>

    <ScoreBoard :winCount="this.winCount" :loseCount="this.loseCount"/>

    <template v-if="this.question">
      <h1 v-html="this.question">
      </h1>

      <template v-if="this.answers">
        <template v-for="(answer, index) in this.answers" :key="index">
          <!-- colon before 'value="answer"' to make it interactive,
           otherwise it's a simple string -->
          <input :disabled="this.answerSubmitted"
                 type="radio"
                 name="options"
                 :value="answer"
                 v-model="this.chosenAnswer">
          <label v-html="answer"></label><br>
        </template>
      </template>

      <button @click="this.submitAnswer()" class="send" type="button">Send</button>

      <section class="result" v-if="this.answerSubmitted">
        <h4 v-if="this.chosenAnswer == this.correctAnswer"
          v-html="'&#9989; Congratulations, the answer ' + this.correctAnswer + ' is correct.'">
        </h4>
        <h4 v-else
            v-html="'&#10060; I´m sorry, you picked the wrong answer. The correct is ' + this.correctAnswer + '.'">
        </h4>
        <button @click="this.getNewQuestion()" class="send" type="button">Next question</button>
      </section>

    </template>

</template>

<script>

import ScoreBoard from '@/components/ScoreBoard.vue'

export default {
  name: 'App',
  components: {
    ScoreBoard
  },

  data() {

    return {
      question: undefined,
      incorrectAnswers: [],
      correctAnswer: undefined,
      chosenAnswer: undefined,
      answerSubmitted: false,
      winCount: 0,
      loseCount: 0,
    }
  },

  methods: {

    submitAnswer() {
      if (!this.chosenAnswer) {
        alert('Pick one of the options')
      } else {
        this.answerSubmitted = true;
        if (this.chosenAnswer === this.correctAnswer) {
          this.winCount++;
          console.log('You got it right :-)')
        } else {
          this.loseCount++;
          console.log('You got it wrong :-(')
        }
      }
    },

    getNewQuestion() {
      this.answerSubmitted = false;
      this.chosenAnswer = undefined;
      this.question = undefined;
      this.axios.get('https://opentdb.com/api.php?amount=1&category=15')
          .then((response) => {
            this.question = response.data.results[0].question;
            this.incorrectAnswers = response.data.results[0].incorrect_answers;
            this.correctAnswer = response.data.results[0].correct_answer;
            console.log(response.data.results[0])
          })
    }

  },

  created() {
    this.getNewQuestion()
  },

  // computed properties, just like methods
  computed: {

    answers() {
      // put the 'incorrectAnswers' into a new array
      var answers = [...this.incorrectAnswers];
      console.log('answers.lengts: ', answers.length);
      console.log('Math.random() * answers.length: ', Math.random() * answers.length);
      // put answers into a random position
      answers.splice(Math.round(Math.random() * answers.length), 0, this.correctAnswer)
      return answers;
    }
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;

}

h1 {
  margin-top: 40px;
}

input[type='radio'] {
  margin: 12px 4px;
}

button.send {
  margin-top: 12px;
  height: 40px;
  min-width: 120px;
  padding: 0 16px;
  color: #fff;
  background-color: #1867c0;
  border: 1px solid #1867c0;
  cursor: pointer;
}

</style>

