<template>
  <div class="crossout-builder">
    <el-radio
      class="crossout-builder__tag"
      v-model="questionConfig.meta.selection"
      v-for="(tag, index) in questionConfig.meta.list"
      :label="tag"
      :key="index"
      border
    >
      <el-tag closable :disable-transitions="false" @close="handleClose(tag)">
        {{ tag }}
      </el-tag>
    </el-radio>

    <div class="crossout-builder__new">
      <el-input
        size="medium"
        ref="optionInput"
        class="input input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
        placeholder="Type option and click Enter to add ( or click outside of the field )"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">
        + New Option
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "CrossOutBuilder",
  props: {
    questionConfig: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      inputVisible: false,
      inputValue: "",
    };
  },
  methods: {
    handleClose(tag) {
      this.questionConfig.meta.selection = "";

      this.questionConfig.meta.list.splice(
        this.questionConfig.meta.list.indexOf(tag),
        1
      );
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => this.$refs.optionInput.focus());
    },

    handleInputConfirm() {
      let inputValue = this.onInputChange(this.inputValue);

      if (inputValue) {
        this.questionConfig.meta.list.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    onInputChange(value) {
      return this.trimSentence(value);
    },
  },
};
</script>
<style lang="sass" scoped>
.crossout-builder
  &__tag
    padding: 3px

  &__new
    margin-top: 1rem
</style>