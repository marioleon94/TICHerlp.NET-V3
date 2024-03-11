<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <EditTicket/>
    </div>
  </div>
</template>
<script>
import EditTicket from "@/components/Ticket/EditTicket.vue";

export default {
  components: {
    EditTicket,
  },
};
</script>
