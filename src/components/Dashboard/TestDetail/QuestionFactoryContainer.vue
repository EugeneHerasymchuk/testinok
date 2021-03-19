<template>
  <div>
    <el-tabs v-model="currentTab" type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-setting"></i> Create</span>
        <el-form
          :model="question"
          :rules="questionForm.rules"
          :ref="questionForm.name"
        >
          <el-form-item
            label="Question title"
            prop="meta.title"
            :rules="{
              required: true,
              message: 'Please provide title of the question',
              trigger: 'change',
            }"
          >
            <el-input v-model="question.meta.title" clearable />
          </el-form-item>

          <el-form-item prop="meta">
            <component
              v-if="currentTab === '0'"
              :is="componentsMap[question.type].builder"
              :questionConfig="question"
              :parentForm="this.$refs[this.questionForm.name]"
            ></component>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane :disabled="true">
        <span slot="label"><i class="el-icon-view"></i> Preview</span>
        <el-row type="flex" class="text-left">
          <el-col>
            <span>
              <el-tag round :type="isAttemptCorrect ? 'success' : 'danger'">{{
                isAttemptCorrect ? "Correct" : "Incorrect"
              }}</el-tag>
            </span>
            <span>
              <i class="el-icon-question"></i>
              {{ question.meta.title }}
            </span>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <component
          v-if="currentTab === '1'"
          :is="componentsMap[question.type].preview"
          :questionConfig="question"
          :parentForm="this.$refs[this.questionForm.name]"
        ></component>
        <el-divider></el-divider>
      </el-tab-pane>
    </el-tabs>
    <el-row type="flex" justify="space-between" class="buttons-group">
      <el-col>
        <el-button
          type="warning"
          plain
          round
          @click="$emit('close-without-saving')"
        >
          Close without saving
        </el-button>
      </el-col>
      <el-col>
        <el-button
          v-if="currentTab === '0'"
          type="primary"
          plain
          round
          @click="
            () => {
              validateAndPreview();
            }
          "
        >
          Preview
        </el-button>

        <el-button v-else type="primary" plain round @click="editQuestion">
          Edit
        </el-button>

        <el-button type="success" plain round @click="validateAndSave">
          Save question
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
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
      questionForm: {
        name: "factoryQuestionForm",
        rules: {},
      },
    };
  },
  computed: {
    isAttemptCorrect() {
      return this.question.check();
    },
    isQuestionValid() {
      return this.question.validate();
    },
  },
  created() {
    this.question = this.newQuestion(
      this.questionPayload.type,
      this.questionPayload.meta
    );

    this.questionForm.rules["meta"] = [
      {
        validator: this.question.validate,
        trigger: 'broken',
      },
    ];
  },
  methods: {
    async validateAndPreview() {
      if (await this.validateFactoryForm()) {
        this.currentTab = "1";
      }
    },
    editQuestion() {
      this.currentTab = "0";
    },
    async validateAndSave() {
      if (await this.validateFactoryForm()) {
        this.$emit("save-question", {
          [this.question.meta.id]: {
            meta: this.question.meta,
            type: this.question.type,
          },
        });
      }
    },
    async validateFactoryForm() {
      try {
        await this.$refs[this.questionForm.name].validate();
        return true;
      } catch (e) {
        return false;
      }
    },
  },
};
</script>
<style scoped>
.buttons-group {
  margin-top: 1rem;
}
.el-icon-question {
  margin-left: 1rem;
}
</style>