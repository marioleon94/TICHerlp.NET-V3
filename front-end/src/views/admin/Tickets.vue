<template>
  <div>
    <TicketsTable
        :columns="['#', 'Titulo', 'Descripcion', 'Estado','Prioridad','Asignado a','Creado']"
        :tickets="formattedTicketsData"
        @ticketDeleted="refreshTickets"
    />
  </div>
</template>

<script>
import TicketsTable from "@/components/Ticket/TicketsTable.vue";
import { getAllTickets } from "@/services/tickets.service";
import Swal from "sweetalert2";

export default {
  components: {
    TicketsTable,
  },
  data() {
    return {
      ticketsData: [],
      isCreateModalOpen: false,
    };
  },
  async created() {
    await this.refreshTickets();
  },
  computed: {
    formattedTicketsData() {
      return this.ticketsData.map(ticket => {
        return {
          ...ticket,
          createdAt: this.formatDate(ticket.createdAt)
        };
      });
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}/${month}/${day}`;
    },
    async refreshTickets() {
      try {
        this.ticketsData = await getAllTickets();
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error fetching tickets",
        });
      }
    },
  },
};
</script>
