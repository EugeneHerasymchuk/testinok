<template>
  <div class="group-item-input">
    <el-input
      size="medium"
      :ref="inputRefName"
      v-if="groupItemInputVisible"
      v-model="inputGroupItemValue"
      @keyup.enter.native="handleGroupItemInputConfirm"
      @blur="handleGroupItemInputConfirm"
      placeholder="Provide group item"
    />
    <el-button v-else size="mini" @click="showItemInput()">
      + New Option
    </el-button>
  </div>
</template>
<script>
export default {
  name: "CompleteTableGroupItemInput",
  data() {
    return {
      inputRefName: "groupItemInput-" + Math.random(),
      groupItemInputVisible: false,
      inputGroupItemValue: "",
    };
  },
  methods: {
    handleGroupItemInputConfirm() {
      const trimmedValue = this.trimSentence(this.inputGroupItemValue);

      if (trimmedValue) {
        this.$emit("groupItemInputChange", trimmedValue);
      }

      this.inputGroupItemValue = "";
      this.groupItemInputVisible = false;
    },
    showItemInput() {
      this.groupItemInputVisible = true;

      this.$nextTick(() => {
        this.$emit("showItemInput");
        this.$refs[this.inputRefName].focus();
      });
    },
  },
};
</script>
<style lang="sass" scoped>
.group-item-input
  flex-basis: 100%
</style>