<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-blueGray-400 text-center mb-3 font-bold">
              <small>Iniciar sesión</small>
            </div>
            <form @submit.prevent="login">
              <div class="relative w-full mb-3">
                <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="email"
                >
                  Email
                </label>
                <input
                    v-model="email"
                    type="email"
                    id="email"
                    name="email"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Email"
                    required
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                    v-model="password"
                    type="password"
                    id="password"
                    name="password"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Ingresa tu contraseña"
                    required
                />
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                      id="rememberMe"
                      type="checkbox"
                      class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span class="ml-2 text-sm font-semibold text-blueGray-600">
                    Recuérdame
                  </span>
                </label>
              </div>

              <div class="text-center mt-6">
                <button
                    class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="flex flex-wrap mt-6 relative">
          <div class="w-1/2">
            <a href="javascript:void(0)" class="text-blueGray-200">
              <small>¿Olvidaste tu contraseña?</small>
            </a>
          </div>
          <div class="w-1/2 text-right">
            <router-link to="/register" class="text-blueGray-200">
              <small>Crear nueva cuenta</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {authService} from '@/services/auth.service';
import Swal from "sweetalert2";

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const userData = await authService.login(this.email, this.password);
        localStorage.setItem('token', userData.data.token);
        await this.$router.push('/admin/tickets');
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Valida el usuario o la contraseña",
        });
      }
    }
  }
};
</script>