<template>
  <div>
    <el-input
      class="question"
      type="text"
      placeholder="Type sentence in correct order ( required )"
      v-model="questionConfig.meta.sentence"
      @change="onSentenceChange"
      clearable
    >
    </el-input>
  </div>
</template>
<script>
export default {
  name: "RightOrderBuilder",
  props: {
    questionConfig: {
      required: true,
      type: Object,
    },
  },
  methods: {
    onSentenceChange(value) {
      this.questionConfig.meta.sentence = this.trimSentence(value)
    },
  },
};
</script>
<style scoped>
.question {
  margin-top: 1rem;
}
</style>