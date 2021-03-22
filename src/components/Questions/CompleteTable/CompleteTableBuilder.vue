<template>
  <div class="complete-table-builder">
    <el-row
      type="flex"
      class="complete-table-builder__group"
      v-for="(group, index) in questionConfig.meta.groups"
      :key="index"
    >
      <el-col :span="6">
        <el-input
          placeholder="Provide Group Name"
          v-model="group.name"
          @change="dropQuestionFormValidation"
          @blur="dropQuestionFormValidation"
        />
        <el-button
          @click="removeGroup(index)"
          icon="el-icon-delete"
          size="mini"
          circle
          plain
        ></el-button>
      </el-col>
      <el-col :span="18">
        <div class="complete-table-builder__group-list">
          <el-tag
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
        </div>
      </el-col>
    </el-row>
    <el-button @click="newGroup">+ New group</el-button>
  </div>
</template>
<script>
import CompleteTableGroupItemInput from "./components/CompleteTableGroupItemInput";

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
</style>