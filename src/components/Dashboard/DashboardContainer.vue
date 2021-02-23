<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="end">
        <el-col :span="3">
          <el-button v-if="$auth.isAuthenticated" @click="logout" type="info">
            Log Out
          </el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px"
        ><el-menu
          :router="true"
          :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="/dashboard">
            <i class="el-icon-s-home"></i>
            <span slot="title">Home</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/students">
            <i class="el-icon-user-solid"></i>
            <span slot="title">Students</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/tests">
            <i class="el-icon-s-claim"></i>
            <span slot="title">Tests</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "DashboardContainer",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>