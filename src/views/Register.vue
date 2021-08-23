<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <p>Registro de usuarios</p>
          </div>
          <form role="form">

            <input
              class="input-group-alternative form-control my-3"
              placeholder="Nombre y Apellido"
              addon-left-icon="ni ni-email-83"
              v-model="model.name"
              focused
              type="text"
            />

            <input
              class="input-group-alternative form-control my-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="model.email"
              focused
              type="email"
            />
            <input
              class="input-group-alternative form-control"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            />
            <div class="text-center">
              <base-button type="primary" class="my-4"
                >Crear Cuenta</base-button
              >
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-1 text-right">
          <router-link to="/login" class="">
            <p>Login</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      model: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
};
</script>
<style></style>
