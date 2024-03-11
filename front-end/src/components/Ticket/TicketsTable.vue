<template>
  <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
              class="font-semibold text-lg"
              :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
          >
            Tickets
          </h3>
        </div>
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <input
              type="text"
              v-model="searchQuery"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Search..."
          />
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
        <tr>
          <th
              v-for="(column, index) in columns"
              :key="index"
              :class="[
                'px-6',
                'align-middle',
                'border',
                'py-3',
                'text-xs',
                'uppercase',
                'whitespace-nowrap',
                'font-semibold',
                'text-left',
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700'
              ]"
          >
            {{ column }}
          </th>
          <th
              :class="[
                'px-6',
                'align-middle',
                'border',
                'py-3',
                'text-xs',
                'uppercase',
                'whitespace-nowrap',
                'font-semibold',
                'text-left',
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700'
              ]"
          >
            Acciones
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(ticket, index) in filteredTickets" :key="index" :class="getTicketColor(ticket)">
          <td
              v-for="(value, key) in ticket"
              :key="key"
              :class="[
                'border-t-0',
                'px-6',
                'align-middle',
                'border-l-0',
                'border-r-0',
                'text-xs',
                'whitespace-nowrap',
                'p-4'
              ]"
          >
            {{ value }}
          </td>
          <td
              :class="[
                'border-t-0',
                'px-6',
                'align-middle',
                'border-l-0',
                'border-r-0',
                'text-xs',
                'whitespace-nowrap',
                'p-4'
              ]"
          >
            <button @click="editTicket(ticket.id)"
                    class="bg-blueGray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Editar
            </button>
            <button @click="deleteTicket(ticket.id)"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
              Eliminar
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { deletedTicket } from "@/services/tickets.service";
import Swal from "sweetalert2";

export default {
  props: {
    color: {
      type: String,
      default: "light",
      validator: function (value) {
        // El valor debe coincidir con una de estas cadenas
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
    columns: {
      type: Array,
      default: () => [],
    },
    tickets: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      searchQuery: '',
    };
  },
  computed: {
    filteredTickets() {
      return this.tickets.filter(ticket => {
        return Object.values(ticket).some(value =>
            value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    }
  },
  methods: {
    editTicket(ticketId) {
      this.$router.push(`/admin/tickets/edit/${ticketId}`);
    },
    async deleteTicket(ticketId) {
      // Muestra el mensaje de confirmación utilizando SweetAlert
      const result = await Swal.fire({
        title: "Estás seguro?",
        text: "No podrás revertir este proceso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      });

      // Si el usuario confirma la eliminación
      if (result.isConfirmed) {
        try {
          // Elimina el ticket utilizando el servicio
          await deletedTicket(ticketId);
          // Muestra un mensaje de éxito después de eliminar el ticket
          await Swal.fire({
            title: "Eliminado!",
            text: "Tu ticket ha sido eliminado.",
            icon: "success"
          });
          // Emitir evento para notificar al componente padre sobre la eliminación del ticket
          this.$emit('ticketDeleted');
        } catch (error) {
          // Si ocurre algún error durante la eliminación del ticket, muestra un mensaje de error
          await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error eliminando el ticket: " + error.message,
          });
        }
      }
    },
    getTicketColor(ticket) {
      if (ticket.priority === 'low') {
        return 'prioridad-baja';
      } else if (ticket.priority === 'medium') {
        return 'prioridad-media';
      } else if (ticket.priority === 'high') {
        return 'prioridad-alta';
      }

      if (ticket.status === 'open') {
        return 'estado-abierto';
      } else if (ticket.status === 'closed') {
        return 'estado-cerrado';
      } else if (ticket.status === 'in_progress') {
        return 'estado-en-progreso';
      }
      return 'light';
    }
  }
};
</script>

<style>
.prioridad-baja {
  background-color: #fff1a3; /* Amarillo */
}

.prioridad-media {
  background-color: #ecccbc; /* Naranja */
}

.prioridad-alta {
  background-color: #ff8888; /* Rojo */
}

.estado-abierto {
  background-color: #10b981; /* Verde */
}

.estado-cerrado {
  background-color: #4b5563; /* Gris */
}

.estado-en-progreso {
  background-color: #2563eb; /* Azul */
}
</style>
