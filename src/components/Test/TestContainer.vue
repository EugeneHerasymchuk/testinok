<template>
  <div>
    Please provide code {{ testId }} then we will fetch the test using the ID
    test
  </div>
</template>
<script>
export default {
  props: ["testId"],
  name: "TestContainer",
};
</script>