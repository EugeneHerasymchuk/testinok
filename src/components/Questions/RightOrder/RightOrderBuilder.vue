<template>
  <div>
    <el-input
      class="question"
      type="text"
      placeholder="Type sentence in correct order ( required )"
      v-model="questionConfig.meta.sentence"
      @change="(value) => (questionConfig.meta.sentence = value.trim())"
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
};
</script>
<style>
.question {
  margin-top: 1rem;
}
</style>