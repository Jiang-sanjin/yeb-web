<template>
  <div>
    <el-form v-loading="loading" element-loading-text="正在登录..." element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)" ref="loginFrom" :model="loginFrom" :rules="rules"
      class="loginContainer">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginFrom.username" auto-complete="false" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginFrom.password" auto-complete="false" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" v-model="loginFrom.code" auto-complete="false" placeholder="点击图片更换验证码"
          style="width:250px;margin-right: 5px"></el-input>
        <img :src="captchaUrl" @click="updateCaptcha" />
      </el-form-item>
      <!--<el-checkbox class="loginRemember" v-model="checked">记住我</el-checkbox>-->
      <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
</template>


<script>
//使用插件
// import { postRequest } from "../utils/api";   

export default {
  name: "login",
  data() {
    return {
      // 访问验证码    添加时间参数，确保验证码正常刷新
      captchaUrl: "/captcha?time=" + new Date(),

      loginFrom: {
        username: "admin",
        password: "123",
        code: "1"
      },
      loading: false, //判断是否显示加载动画
      // checked: true,
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //登录
    submitLogin() {
      this.$refs.loginFrom.validate(valid => {
        if (valid) {
          this.loading = true;
          this.postRequest("/login", this.loginFrom).then(resp => {
            if (resp) {
              this.loading = false;

              // alert(JSON.stringify(resp));
              //存储用户token   需要创建请求拦截器将token封装到请求中
              const tokenStr = resp.obj.tokenHead + resp.obj.token;
              window.sessionStorage.setItem("tokenStr", tokenStr);
              //清空菜单
              this.$store.commit("initRoutes", []);
              //页面跳转
              let path = this.$route.query.redirect;
              //replace 不可通过后退返回前一个页面
              // this.$router.replace("/home");
              this.$router.replace((path == '/' || path == undefined) ? '/home' : path)
            }
          });
        } else {
          this.$message.error("请输入所有字段");
          return false;
        }
      });
    },
    updateCaptcha() {
      //验证码
      this.captchaUrl = "/captcha?time=" + new Date();
    }
  }
};
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}

.el-form-item__content {
  display: flex;
  align-items: center;
}
</style>