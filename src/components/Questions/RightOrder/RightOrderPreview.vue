<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="20"
        ><drop-list
          :items="arrayLine"
          class="list"
          @insert="onInsert"
          @reorder="$event.apply(arrayLine)"
          :accepts-data="allowDropCurrentList"
        >
          <template v-slot:item="{ item }">
            <drag class="item" :key="item">
              <el-tag>{{ item }}</el-tag>
            </drag>
          </template>
        </drop-list></el-col
      >
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
  data() {
    return {
      arrayLine: [],
    };
  },
  computed: {},
  components: {
    Drag,
    DropList,
  },
  created() {
    this.arrayLine = [
      ...this.questionConfig.meta.sentence.split(" ").map((x) => x.trim()),
    ].reverse();
  },
  methods: {
    allowDropCurrentList(d) {
      return this.arrayLine.includes(d);
    },
    onInsert(event) {
      this.arrayLine.splice(event.index, 0, event.data);
    },
  },
};
</script>
<style>
.preview-container {
  text-align: left;
}

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