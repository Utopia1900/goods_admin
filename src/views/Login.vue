<template>
  <div class="app flex-row align-items-center bg" style="background-color: #29363d">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h4>登录</h4>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-user"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="用户名"
                    v-model.trim="username"
                  >
                </b-input-group>
                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-lock"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="密码"
                    v-model.trim="password"
                  >
                </b-input-group>
                <b-row>
                  <b-col cols="6">
                    <b-button
                      variant="success"
                      class="px-4"
                      @click="login"
                      :disabled="isLoginBtnClicked"
                    >登录</b-button>
                  </b-col>
                </b-row>
              </b-card-body>
              <b-alert
                variant="danger"
                dismissible
                :show="hasError"
                @dismissed="hasError=false"
              >{{errmsg}}</b-alert>
              <div class="ddk-modal-content" v-show="modalVisible">
                <svg class="progress-circular">
                  <circle
                    class="progress-circular__primary"
                    cx="50%"
                    cy="50%"
                    r="40%"
                    fill="none"
                    stroke-width="10%"
                    stroke-miterlimit="10"
                  ></circle>
                </svg>
                <br>
                <span class="modal-text">登录中...</span>
              </div>
            </b-card>
            <!-- <b-card no-body class="text-white bg-danger py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2></h2>
                </div>
              </b-card-body>
            </b-card>-->
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import md5 from 'blueimp-md5';
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      errmsg: "",
      hasError: false,
      modalVisible: false,
      isLoginBtnClicked: false
    };
  },
  methods: {
    login() {
      let _this = this
      if (this.hasError) this.hasError = !this.hasError
      if (this.username === '' || this.password === ''){
        this.errmsg = '用户名和密码不能为空';
        this.hasError = true
        return
      }
      this.isLoginBtnClicked = true
      let formData = {
        username: this.username,
        password: md5(this.password)
      }
      let options = {
        method: 'post',
        data: JSON.stringify(formData),
        url: '/adminLogin'
      }
      this.$http(options).then(res => {
        var data = res.data
        if (!data.errcode){
          window.sessionStorage.setItem('token', data.token);
          _this.$router.push("/dashboard");
        } else {
          _this.errmsg = data.errmsg;
          _this.hasError = true
        }
        _this.isLoginBtnClicked = false
      }).catch(e => {
        console.error(e)
        _this.isLoginBtnClicked = false
      })
    }
  }
};
</script>

<style>
.svg-span {
  height: 37px;
  border: 1px solid #ccc;
}
.svg-span:hover {
  cursor: pointer;
}
.svg-input {
  height: 37px;
}
.bg {
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
