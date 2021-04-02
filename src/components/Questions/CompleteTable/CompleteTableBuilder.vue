<template>
  <div class="complete-table-builder">
    <el-row
      :gutter="24"
      type="flex"
      class="complete-table-builder__group flex-wrap"
      v-for="(group, index) in questionConfig.meta.groups"
      :key="index"
    >
      <el-col :span="6">
        <CompleteTableGroupNameInput
          :group="group"
          @groupNameInputChange="dropQuestionFormValidation"
        />
      </el-col>
      <el-col :span="17">
        <el-row type="flex" justify="start" class="flex-wrap">
          <el-tag
            class="complete-table-builder__group-item"
            v-for="(groupItem, groupItemIndex) in group.list"
            :label="groupItem"
            :key="groupItemIndex"
            closable
            :disable-transitions="true"
            @close="removeGroupItem(groupItemIndex, group.list)"
          >
            {{ groupItem }}
          </el-tag>
          <CompleteTableGroupItemInput
            @showItemInput="dropQuestionFormValidation"
            @groupItemInputChange="
              (value) => handleGroupItemInputConfirm(value, group.list)
            "
          />
        </el-row>
      </el-col>
      <el-col :span="1">
        <el-button
          @click="removeGroup(index)"
          icon="el-icon-delete"
          size="mini"
          circle
          type="danger"
          plain
          label="Remove group"
        >
        </el-button>
      </el-col>
      <el-divider />
    </el-row>
    <el-button @click="newGroup">+ New group</el-button>
  </div>
</template>
<script>
import CompleteTableGroupItemInput from "./components/CompleteTableGroupItemInput";
import CompleteTableGroupNameInput from "./components/CompleteTableGroupNameInput";

export default {
  name: "CompleteTableBuilder",
  props: {
    questionConfig: {
      required: true,
      type: Object,
    },
    parentForm: {
      required: true,
      type: Object,
    },
  },
  components: {
    CompleteTableGroupItemInput,
    CompleteTableGroupNameInput,
  },
  data() {
    return {
      inputForm: {
        form: {
          groupName: "",
        },
        rules: {
          groupName: [
            {
              required: true,
              message: "Please provide the name of the Group",
              trigger: "blur",
            },
          ],
        },
      },
    };
  },
  methods: {
    removeGroup(groupIndex) {
      this.questionConfig.meta.groups.splice(groupIndex, 1);
      this.dropQuestionFormValidation();
    },
    removeGroupItem(groupItemIndex, groupList) {
      groupList.splice(groupItemIndex, 1);
    },
    handleGroupItemInputConfirm(groupItemInput, groupList) {
      groupList.push(groupItemInput);
      this.dropQuestionFormValidation();
    },

    newGroup() {
      this.questionConfig.meta.groups.push({
        name: "",
        list: [],
      });

      this.dropQuestionFormValidation();
    },
    dropQuestionFormValidation() {
      this.parentForm.clearValidate();
    },
  },
};
</script>
<style lang="sass" scoped>
.complete-table-builder
  text-align: left

  &__group-item
    white-space: break-spaces
    min-height: 32px
    height: unset
    margin-right: 0.5rem
    margin-bottom: 0.5rem
</style>