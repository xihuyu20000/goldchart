<template>
  <div class="login-page">
    <form @submit.prevent="handleLogin">
      <div class="login-form">
        <el-input v-model="eusername" placeholder="用户名"></el-input>

        <el-input v-model="epassword" type="password" placeholder="密码"></el-input>

        <button class="submit-btn" type="submit">登录</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const eusername = ref("");
const epassword = ref("");
const handleLogin = async () => {
  // 这里应该是一个调用后端API的登录请求
  // 假设登录成功后返回一个token
  const resp = await $post("/api/login", {
    username: eusername.value,
    password: epassword.value,
  });
  if (resp.code === 200) {
    sessionStorage.setItem(utils.StorageKeys.token, resp.data.token);
    sessionStorage.setItem("user", JSON.stringify(resp.data.user));
    // 登录成功，跳转到主页或者之前尝试访问的页面
    router.push("/Home");
  } else {
    ElMessage({
      type: "error",
      message: "登录失败",
    });
  }
};
// import { ElLoading } from "element-plus";
// ElLoading.service({ fullscreen: true, text: "加载中..." });
</script>
<style lang="less" scoped>
.login-page {
  width: 100%;
  height: 100vh;
  background: url("/bg.jpg") no-repeat center center fixed;
}
.login-form {
  width: 400px;
  height: 300px;
  background-color: rgba(250, 250, 250, 0.6);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 60px 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.submit-btn {
  height: 40px;
  background-image: linear-gradient(to right, #f902ff, #00dbde);
  border: 0;
  border-radius: 5px;
  color: #fff;
  font-size: 1.1em;
  text-indent: 35px;
  letter-spacing: 20px;
  text-align: center;
  cursor: pointer;
}
</style>
