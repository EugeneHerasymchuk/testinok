<template>
  <div class="iterator">
    <div class="iterator_header text-left">
      <span>
        <i class="el-icon-question"></i>
        {{ questions[questionId].meta.title }}
      </span>
    </div>
    <keep-alive>
      <component
        :is="componentsMap[questions[questionId].type].preview"
        :questionConfig="questions[questionId]"
        :key="questionId"
      ></component>
    </keep-alive>

    <el-pagination
      background
      :current-page.sync="currentQuestionI"
      layout="prev, pager, next, slot"
      :total="questions.length"
      :page-size="1"
    >
    </el-pagination>
    <el-divider></el-divider>

    <el-button
      class="iterator__button"
      size="mini"
      type="success"
      plain
      round
      @click="checkAll"
      >Finish test and check results</el-button
    >
    <el-card v-if="attempt" class="iterator__result">
      <div slot="header" class="clearfix">
        <span>Test results {{ attempt.resultScore }}</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="attempt = null"
        >
          Clear
        </el-button>
      </div>
      <div v-for="(question, index) in attempt.questions" :key="index">
        {{ "Question Nr" + question.orderNumber }}
        <el-tag
          size="mini"
          round
          :type="!!question.result ? 'success' : 'danger'"
        >
          {{ !!question.result ? "Correct" : "Incorrect" }}
        </el-tag>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: ["questionsMap"],
  name: "QuestionIterator",
  data() {
    return {
      questions: [],
      currentQuestionI: 1,
      question: null,
      attempt: null,
    };
  },
  computed: {
    questionId() {
      return this.currentQuestionI - 1;
    },
  },
  created() {
    this.questions = Object.values(this.questionsMap).map((questionPayload) =>
      this.newQuestion(questionPayload.type, questionPayload.meta)
    );
  },
  methods: {
    checkAll() {
      this.attempt = {
        questions: {},
      };

      const result = this.questions.reduce((acc, question, index) => {
        const questionResult = question.check() ? 1 : 0;

        this.attempt.questions[question.meta.id] = {
          orderNumber: index + 1,
          result: questionResult,
        };

        return acc + questionResult;
      }, 0);

      this.attempt.resultScore = result;
    },
  },
};
</script>
<style scoped>
.iterator__button {
  margin-bottom: 1rem;
}
</style>