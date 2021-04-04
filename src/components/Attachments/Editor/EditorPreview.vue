<template>
  <editor-content class="editor__content" :editor="editor" />
</template>
<script>
import { Editor, EditorContent } from "tiptap";
import { Bold, Italic, Strike, Underline } from "tiptap-extensions";

export default {
  name: "EditorPreview",
  props: {
    attachmentConfig: {
      type: Object,
      required: true,
    },
  },
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: new Editor({
        extensions: [new Bold(), new Italic(), new Strike(), new Underline()],
        content: this.attachmentConfig.content,
        editable: false,
      }),
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>