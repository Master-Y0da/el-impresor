<template>
  <div class="main-content">

    <!-- Header -->
    <div class="header pb-5">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6">
              <img class="img-fluid"  alt="Image placeholder"
                      src="img/logo.png"
                    />
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">

      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "auth-layout",
  data() {
    return {
      year: new Date().getFullYear(),
      showMenu: false,
    };
  },
};
</script>
<style></style>
