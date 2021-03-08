<template>
  <div>
    <el-tabs v-model="currentTab" type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-setting"></i> Create</span>
        <el-input
          v-model="question.meta.title"
          placeholder="Provide a title for the question"
          clearable
        />
        <component
          v-if="currentTab === '0'"
          :is="componentsMap[question.type].builder"
          :questionConfig="question"
        ></component>
      </el-tab-pane>
      <el-tab-pane :disabled="true">
        <span slot="label"><i class="el-icon-view"></i> Preview</span>
        {{ question.meta.title }}
        <component
          v-if="currentTab === '1'"
          :is="componentsMap[question.type].preview"
          :questionConfig="question"
        ></component>
      </el-tab-pane>
    </el-tabs>
    <div class="buttons-group">
      <el-button
        type="warning"
        plain
        round
        @click="$emit('close-without-saving')"
      >
        Close without saving
      </el-button>
      <el-button
        v-if="currentTab === '0'"
        type="primary"
        plain
        round
        @click="validateAndPreview"
      >
        Preview
      </el-button>
      <el-button v-else type="primary" plain round @click="editQuestion">
        Edit
      </el-button>
      <el-button type="success" plain round @click="validateAndSave">
        Save question
      </el-button>
    </div>
  </div>
</template>
<script>
import { QUESTION_TYPES } from "../../../constants/QuestionFactory";
import RightOrderBuilder from "../../Questions/RightOrder/RightOrderBuilder";
import RightOrderPreview from "../../Questions/RightOrder/RightOrderPreview";

export default {
  props: ["testId", "questionPayload"],
  name: "QuestionFactoryContainer",
  data() {
    return {
      currentTab: "",
      titleErrorMessage: "",
      question: null,
      /* TODO: create new payload or copy the payload using Factory if editing mode here
      pass it inside the builder&preview components and use it inside them
      */
      componentsMap: {
        [QUESTION_TYPES.RightOrder]: {
          builder: RightOrderBuilder,
          preview: RightOrderPreview,
        },
      },
    };
  },
  created() {
    this.question = this.newQuestion(
      this.questionPayload.type,
      this.questionPayload.meta
    );
  },
  methods: {
    validateAndPreview() {
      if (this.validateQuestion()) {
        this.currentTab = "1";
      }
    },
    editQuestion() {
      this.currentTab = "0";
    },
    validateAndSave() {
      if (this.validateQuestion()) {
        this.$emit("save-question", { [this.question.meta.id]: this.question });
      }
    },
    validateQuestion() {
      return this.question.meta.title.length;
    },
  },
};
</script>
<style scoped>
.buttons-group {
  margin-top: 1rem;
}
</style>