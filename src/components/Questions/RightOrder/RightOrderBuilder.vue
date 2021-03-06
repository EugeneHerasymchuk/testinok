<template>
  <div>
    <el-input
      label="Question text"
      :placeholder="questionLineDefault"
      v-model="questionLine"
      clearable
    >
    </el-input>
    <el-input
      class="question"
      placeholder="Type sentence in correct order ( required )"
      v-model="stringLine"
      clearable
    >
    </el-input>
    <el-button
      :disabled="stringLine.length < 3"
      class="button button-group"
      @click="saveAndPreview()"
      >Save and Preview</el-button
    >
  </div>
</template>
<script lang="ts">
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
      stringLine: "",
      questionLine: "",
      questionLineDefault: "Write the words in sentence in the correct order",
    };
  },
  methods: {
    saveAndPreview() {
      const arrayLine = this.stringLine.split(" ");
      this.questionConfig.content.arrayLine = [...arrayLine];
      this.questionConfig.content.questionLine =
        this.questionLine || this.questionLineDefault;

      this.questionConfig.content.key = "";

      this.$emit("saveAndPreview");
    },
  },
};
</script>
<style lang="sass">
.button-group.button, .question
    margin-top: 1rem
</style>