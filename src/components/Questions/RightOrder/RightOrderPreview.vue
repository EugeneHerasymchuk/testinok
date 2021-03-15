<template>
  <div>
    <el-row>
      <el-col :span="20">
        <drop-list
          :items="questionConfig.attempt.arrayLine"
          class="list"
          @insert="onInsert"
          @reorder="$event.apply(questionConfig.attempt.arrayLine)"
          :accepts-data="allowDropCurrentList"
        >
          <template v-slot:item="{ item, reorder }">
            <drag class="item" :key="item + Math.random()">
              <el-tag :type="reorder ? 'success' : ''">{{ item }}</el-tag>
            </drag>
          </template>

          <template v-slot:feedback="{ data }">
            <el-tag :key="item + Math.random()">{{ data }}</el-tag>
          </template>
        </drop-list>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { Drag, DropList } from "vue-easy-dnd";

export default {
  name: "RightOrderPreview",
  props: {
    questionConfig: {
      required: true,
      type: Object,
    },
  },
  components: {
    Drag,
    DropList,
  },
  created() {
    this.questionConfig.attempt.arrayLine = [
      ...this.questionConfig.meta.sentence
        .split(" ")
        .map((x) => x.trim())
        .filter((x) => x.length),
    ].reverse();
  },
  methods: {
    allowDropCurrentList(d) {
      return this.questionConfig.attempt.arrayLine.includes(d);
    },
    onInsert(event) {
      this.questionConfig.attempt.arrayLine.splice(event.index, 0, event.data);
    },
  },
};
</script>
<style scoped>
.drop-in {
  box-shadow: 0 0 10px rgba(0, 0, 255, 0.3);
}

.list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.item {
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>