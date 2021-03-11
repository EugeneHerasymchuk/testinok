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
      this.questionConfig.meta.sentence = value
        .split(" ")
        .map((x) => x.trim())
        .filter((x) => x.length)
        .join(" ");
    },
  },
};
</script>
<style>
.question {
  margin-top: 1rem;
}
</style>