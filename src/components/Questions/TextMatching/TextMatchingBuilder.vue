<template>
  <div class="textmatching-builder">
    <div
      class="textmatching-builder__list-item"
      v-for="(matchingGroup, index) in questionConfig.meta.list"
      :key="index"
    >
      <span>{{ matchingGroup[0] }}</span>
      <span>{{ matchingGroup[1] }}</span>
      <el-button
        @click="removeMatchingGroup(index)"
        icon="el-icon-delete"
        size="mini"
        circle
        plain
      ></el-button>
    </div>
    <div class="textmatching-builder__new">
      <el-form
        ref="matchingInputForm"
        v-if="inputVisible"
        class="textmatching-builder__input-container"
        :model="inputForm.form"
        :rules="inputForm.rules"
      >
        <el-form-item prop="option" :show-message="false">
          <el-input
            size="medium"
            ref="optionInput"
            class="input input-new-tag"
            v-model="inputForm.form.option"
            placeholder="Type main option (left side) ( click Enter or outside of the field )"
            @blur="handleInputConfirm"
            @keypress.enter.native="handleInputConfirm"
        /></el-form-item>
        <el-form-item prop="matching" :show-message="false">
          <el-input
            size="medium"
            class="input input-new-tag"
            v-model="inputForm.form.matching"
            placeholder="Type correct matching to the option (right side ) ( or click outside of the field )"
            @blur="handleInputConfirm"
            @keypress.enter.native="handleInputConfirm"
          >
          </el-input
        ></el-form-item>
      </el-form>
      <el-button
        size="mini"
        v-if="inputVisible"
        @click="removeInput"
        icon="el-icon-delete"
        circle
        plain
      ></el-button>
      <el-button size="mini" v-else class="button-new-tag" @click="showInput">
        + New Option
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "TextMatchingBuilder",
  props: {
    questionConfig: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      inputVisible: false,
      inputForm: {
        form: {
          option: "",
          matching: "",
        },
        rules: {
          option: [
            {
              required: true,
              message:
                "Please provide the option that will appear on the left side",
              trigger: "blur",
            },
          ],
          matching: [
            {
              required: true,
              message:
                "Please provide the matching option that will appear on the right side",
              trigger: "blur",
            },
          ],
        },
      },
    };
  },
  methods: {
    removeMatchingGroup(index) {
      this.questionConfig.meta.list.splice(index, 1);
    },
    removeInput() {
      this.inputVisible = false;
      this.$refs.matchingInputForm.resetFields();
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => this.$refs.optionInput.focus());
    },

    async handleInputConfirm() {
      try {
        await this.$refs.matchingInputForm.validate();
        const optionValue = this.onInputChange(this.inputForm.form.option);
        const matchingValue = this.onInputChange(this.inputForm.form.matching);

        if (optionValue && matchingValue) {
          this.questionConfig.meta.list.push([optionValue, matchingValue]);
        }
        this.inputVisible = false;
        this.$refs.matchingInputForm.resetFields();
      } catch (e) {
        return false;
      }
    },
    onInputChange(value) {
      return this.trimSentence(value);
    },
  },
};
</script>
<style lang="sass">
.input-new-tag .el-input-group__prepend
  background-color: #fff
</style>
<style lang="sass" scoped>
.textmatching-builder
  &__list-item
    display: flex
    align-items: center
    margin-bottom: 1rem
    & > span
      padding: 0 10px
      border: 1px solid #b3d8ff
      border-radius: 4px
      line-height: 30px
      color: #409eff
      margin: 0 1rem 0 0
      height: 32px
      box-sizing: border-box
      font-size: 12px
  &__new
    display: flex
    justify-content: space-between
    align-items: center
  &__input-container
    flex: auto
    padding-right: 1rem
    display: flex
    & > .el-form-item
      display: inline-block
      width: 100%
</style>