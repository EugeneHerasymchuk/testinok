<template>
  <div>
    <el-input
      class="question"
      placeholder="Type sentence in correct order ( required )"
      v-model="questionConfig.meta.sentence"
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
  data() {
    return {
      questionLine: "",
      questionLineDefault: "Write the words in sentence in the correct order",
    };
  }
};
</script>
<style>
.question {
  margin-top: 1rem;
}
</style>