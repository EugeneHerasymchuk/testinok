<template>
  <div>Video builder <RemoveAttachmentButton v-on="$listeners" /></div>
</template>
<script>
import RemoveAttachmentButton from "../components/RemoveAttachmentButton";

export default {
  name: "VideoBuilder",
  components: {
    RemoveAttachmentButton,
  },
  methods: {},
};
</script>