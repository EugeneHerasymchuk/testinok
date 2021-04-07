<template>
  <EditorWrapper :attachmentConfig="attachmentConfig" :editable="false" />
</template>
<script>
import EditorWrapper from "../components/EditorWrapper";

export default {
  name: "EditorPreview",
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