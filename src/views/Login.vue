<template>
  <div class="app flex-row align-items-center bg" id="app" >
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h4>shopping后台</h4>
                <p class="text-muted">账号登录</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                  <input type="text" class="form-control" placeholder="username" v-model.trim="username">
                </b-input-group>
                <b-input-group class="mb-4">
                  <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                  <input type="password" class="form-control" placeholder="密码" v-model.trim="password">
                </b-input-group>
                <b-row>
                  <b-col cols="6">
                    <b-button variant="danger" class="px-4" @click="login" :disabled="isLoginBtnClicked">登录</b-button>
                  </b-col>
                </b-row>
              </b-card-body>
              <b-alert variant="danger" dismissible :show="hasError"  @dismissed="hasError=false">{{errmsg}}</b-alert>
              <div class="ddk-modal-content" v-show="modalVisible">
                <svg class="progress-circular">
                  <circle class="progress-circular__primary" cx="50%" cy="50%" r="40%" fill="none" stroke-width="10%" stroke-miterlimit="10"/>
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
            </b-card> -->
          </b-card-group>
        </b-col>
      </b-row>
    </div>
    <div>
      <b-modal id="loginErrModal" :title="'提示'">
        <pre>服务器连接超时、请确认后重试！</pre>
        <div slot="modal-footer" class="w-100">
          <p class="float-left"></p>
          <b-btn size="md" class="float-right" variant="primary" @click="closeLoginErrModal">
            知道了
          </b-btn>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        username: (this.$localStorage.get('login_username') !== null) ? this.$localStorage.get('login_username') : '',
        password: (this.$localStorage.get('login_psd') !== null) ? this.$localStorage.get('login_psd') : '',
        errmsg: '',
        hasError: false,
        selectedMonth: '',
        modalVisible: false,
        isLoginBtnClicked: false
      }
    },
    methods: {
      closeLoginErrModal () {
        this.$root.$emit('bv::hide::modal', 'loginErrModal')
      },
      login () {
        this.$router.push('/dashboard')
      }
    }
  }
</script>

<style>
  .svg-span{
    height: 37px;
    border:1px solid #ccc;
  }
  .svg-span:hover{
    cursor: pointer;
  }
  .svg-input{
    height: 37px;
  }
  .bg{
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
</style>
