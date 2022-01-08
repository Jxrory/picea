<template>
  <div class="login-body">
    <div class="login-mask">
      <div class="login-box">
        <div class="title">Picea</div>
        <input
          id="login-id"
          class="jx-el-input"
          type="text"
          placeholder="用户名"
          v-model="username"
        />
        <input
          id="login-password"
          class="jx-el-input"
          type="password"
          placeholder="密码"
          v-model="password"
        />
        <div>
          <button id="submit-btn" @click="submit" @keyup.enter="submit">
            登 录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      username: "",
      password: "",
    };
  },

  methods: {
    submit() {
      // 登录成功跳转到主页面
      console.log("username:", this.username, "  password:", this.password);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/jx-el.scss";

.login-body {
  position: relative;
  @include full-all;
  min-width: 840px;
  min-height: 457px;
  box-sizing: border-box;

  background-image: url("~@/assets/bg/3.jpg");
  background-size: 100% 100%;

  .login-mask {
    @include full-all;
    background-color: rgba($color: #fff, $alpha: 0.5);
  }

  // 在最上层加了一层遮罩
  // &::after {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   content: "";
  //   background-color: #fff;
  //   opacity: 0.5;
  //   z-index: 1;
  //   width: 100%;
  //   height: 100%;
  // }
}

.login-box {
  width: 30%;
  min-width: 300px;
  height: 40%;
  min-height: 300px;
  border-radius: 7px;
  padding: 20px 30px;

  // 居中
  position: absolute;
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%);

  // 布局
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3fr 2fr 2fr 3fr;
  place-items: center center;

  background-color: rgba($color: #fff, $alpha: 0.9);
}

.login-box {
  .title {
    font-size: 2rem;
    font-weight: 600;
    color: #000;
  }

  #login-id {
    width: 70%;
  }
  #login-password {
    width: 70%;
  }

  // 仿造 element ui button
  #submit-btn {
    @extend .jx-el-button;
  }
}
</style>
