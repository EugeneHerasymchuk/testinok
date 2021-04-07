<template>
  <el-popconfirm
    confirm-button-text="Delete"
    cancel-button-text="No"
    icon="el-icon-info"
    icon-color="red"
    title="Are you sure to delete this attachment?"
    @confirm="() => $emit('remove')"
  >
    <el-button
      size="mini"
      slot="reference"
      type="danger"
      icon="el-icon-delete"
      circle
    ></el-button>
  </el-popconfirm>
</template>
<script>
export default {
  name: "RemoveAttachmentButton",
};
</script>