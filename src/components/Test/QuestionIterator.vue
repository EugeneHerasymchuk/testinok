<template>
  <div>
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
      layout="prev, pager, next"
      :total="questions.length"
      :page-size="1"
    >
    </el-pagination>
    <el-button size="mini" @click="checkAll">Check All</el-button>
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
      attempt: {},
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
      const result = this.questions.reduce((acc, question) => {
        const result = question.check() ? 1 : 0;
        return acc + result;
      }, 0);

      this.$notify({
        message: "Your result: " + result,
        type: "info",
      });
    },
  },
};
</script>
<style scoped>
</style>