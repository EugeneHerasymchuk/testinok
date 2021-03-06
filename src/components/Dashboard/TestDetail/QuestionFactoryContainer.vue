<template>
  <div>QuestionFactory</div>
</template>
<script>
export default {
  props: ["testId", "questionConfig"],
  name: "QuestionFactoryContainer",
  data() {
    return {
      questionTitle: ''
    };
  },
};
</script>