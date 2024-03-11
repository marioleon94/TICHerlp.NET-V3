<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <CreatedAdmin/>
    </div>
  </div>
</template>
<script>
import CreatedAdmin from "@/components/Ticket/CreatedAdmin.vue";

export default {
  components: {
    CreatedAdmin,
  },
};
</script>
