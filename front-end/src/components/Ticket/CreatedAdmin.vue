<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">Crear un nuevo Ticket</h6>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form @submit.prevent="createTicket">
        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Información del ticket</h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="title">
                Asunto
              </label>
              <input v-model="ticket.title" type="text" id="title" name="title"
                     class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="description">
                Descripción
              </label>
              <input v-model="ticket.description" type="text" id="description" name="description"
                     class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="status">
                Estado
              </label>
              <input v-model="ticket.status" type="text" id="status" name="status"
                     class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                     disabled
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="priority">
                Prioridad
              </label>
              <select v-model="ticket.priority" id="priority" name="priority"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="assigned_to">
                Asignado a
              </label>
              <input v-model="ticket.assigned_to" type="text" id="assigned_to" name="assigned_to"
                     class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
            </div>
          </div>
        </div>
        <div class="mt-6">
          <button type="submit"
                  class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
            Crear ticket
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {createTicket} from "@/services/tickets.service";
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      ticket: {
        title: '',
        description: '',
        status: 'open',
        priority: 'low',
        assigned_to: '1'
      }
    };
  },
  methods: {
    async createTicket() {
      try {
        await createTicket(this.ticket);
        await Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Ticket creado",
          showConfirmButton: false,
          timer: 1500
        });
        await this.$router.push('/admin/tickets');
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: 'Error al crear el ticket, por favor diligencie todos los campos:',
        });
      }
    }
  }
};
</script>
