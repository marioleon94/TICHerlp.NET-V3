<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-6/12 px-4">
        <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-blueGray-400 text-center mb-3 font-bold">
              <small>regístrate</small>
            </div>
            <form @submit.prevent="register">
              <div class="relative w-full mb-3">
                <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="name"
                >
                  Nombre
                </label>
                <input
                    v-model="name"
                    type="text"
                    id="name"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Nombre"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="email"
                >
                  Email
                </label>
                <input
                    v-model="email"
                    type="email"
                    id="email"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Email"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="password"
                >
                  Contraseña
                </label>
                <input
                    v-model="password"
                    type="password"
                    id="password"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Crea tu contraseña"
                />
              </div>

              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                      id="customCheckLogin"
                      type="checkbox"
                      class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span class="ml-2 text-sm font-semibold text-blueGray-600">
                    Estoy de acuerdo con la
                    <a href="javascript:void(0)" class="text-emerald-500">
                      Política de Privacidad
                    </a>
                  </span>
                </label>
              </div>

              <div class="text-center mt-6">
                <button
                    type="submit"
                    class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                >
                  Crear cuenta
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="flex flex-wrap mt-6 relative">
          <div class="w-1/2 text-right">
            <router-link to="/login" class="text-blueGray-200">
              <small>Iniciar sesión</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import registerService from '@/services/register.service';
import Swal from "sweetalert2";

export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        const userData = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        await registerService(userData);
        await Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario registrado con éxito",
          showConfirmButton: false,
          timer: 1500
        });
        await this.$router.push('/auth/login');
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al registrar usuario:",
        });
      }
    }
  }
};
</script>
