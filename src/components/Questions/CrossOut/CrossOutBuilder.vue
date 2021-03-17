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

    <el-input
      class="input input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      size="mini"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput"
      >+ New Tag</el-button
    >
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
      this.questionConfig.meta.list.splice(
        this.questionConfig.meta.list.indexOf(tag),
        1
      );
    },

    showInput() {
      this.inputVisible = true;
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
      return value
        .split(" ")
        .map((x) => x.trim())
        .filter((x) => x.length)
        .join(" ");
    },
  },
};
</script>
<style scoped>
.crossout-builder__tag {
  padding: 3px;
}
</style>