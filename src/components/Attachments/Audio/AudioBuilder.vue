<template>
  <div>Audio builder <RemoveAttachmentButton v-on="$listeners" /></div>
</template>
<script>
import RemoveAttachmentButton from '../components/RemoveAttachmentButton';
export default {
  name: "AudioBuilder",
  components: {
    RemoveAttachmentButton
  },
  methods: {},
};
</script>