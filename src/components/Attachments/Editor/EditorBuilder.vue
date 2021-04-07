<template>
  <EditorWrapper
    :attachmentConfig="attachmentConfig"
    :editable="true"
    v-on="$listeners"
  />
</template>
<script>
import EditorWrapper from "../components/EditorWrapper";

export default {
  name: "EditorBuilder",
  props: {
    attachmentConfig: {
      type: Object,
      required: true,
    },
  },
  components: {
    EditorWrapper,
  },
};
</script>