<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Inicie Sesion</small>
          </div>
          <form >
            <input
              class="input-group-alternative mb-3 form-control"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="email"
              required
            >
            <input
              class="input-group-alternative mb-3 form-control"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="password"
              required
              type="password"
            >

            <div class="text-center">
              <button  @click = "onSubmit" class="my-4 btn btn-primary" :disabled = "loading">
                <i class="fa fa-spinner fa-pulse fa-lg fa-fw " v-if="loading"></i>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-dark"><small>Olvido su contraseña?</small></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  name: "login",
  inject: ["$idb"],
  data() {
    return {
      loading: false,
      email: "",
      password: "",      
    };
  },
  methods: {
      onSubmit(){
          this.loading = true;

          this.axios.post(process.env.VUE_APP_API_URL+'auth/login', {"email": this.email, "password": this.password})
          .then((response)=>{
              this.$idb.set('user',  response.data.response)

              toast.success("Login exitoso!...Por favor espere.", {
                timeout: 4000
              });

              setTimeout(()=> this.$router.push({name: 'dashboard'}), 4000)
          })
          .catch((error)=>{              
              if(error.response){
                toast.error(error.response.data.response, {
                timeout: 5000
              });
              this.loading = false;
              }
          })
      }
  }
};
</script>
<style></style>
