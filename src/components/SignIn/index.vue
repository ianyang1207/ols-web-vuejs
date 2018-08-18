<template>
  <div class="form-container">
    <div class="form">
      <div class="header">
        <img src="/static/img/fill.svg" alt="logo" />
        <div class="title">
          <div class="main">
            思沃学院
          </div>
          <div class="desc">
            线上学习系统
          </div>
        </div>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="65px" label-position="top">
        <el-form-item label="账号" prop="userName">
          <el-col>
            <el-input v-model="ruleForm.userName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-col>
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <button  class="button" @click="submitForm('ruleForm')">登入</button>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <router-link to="/signup" style="color: #666666;">新用户注册</router-link>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    </div>
</template>

<script>
  import api from '@/api'
  import './index.scss';

  export default {
    data() {
      
      return {
        ruleForm: {
          userName: '',
          password: '',
        },
        rules: {
          userName: [
            {message: '请输入用户名', trigger: 'onsubmit'},
          ],
          password: [
            {message: '请输入密码', trigger: 'onsubmit'}
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        api.login({
          username: this.ruleForm.userName,
          password: this.ruleForm.password
        }).then( ({ status, headers }) => {
          if(status === 200){
            this.$router.push('/dashboard');
            axios.default.headers.Token = headers.Token;
          }else{

          }

        }).catch( (e) => { 
          switch(e.response.status){
            case 404:
              this.$notify({
                title: `错误`,
                message: '找不到资源，请确认...',
                type: 'error'
              });
              break;
            case 400:
              this.$notify({
                title: `错误`,
                message: '用户名/密码错误，请重新输入！',
                type: 'error'
              });
              break;
            default:
              this.$notify({
                title: `错误`,
                message: '服务器连接失败，请稍后...',
                type: 'error'
              });
            }
          }
        );
      }
    }
  }
</script>
