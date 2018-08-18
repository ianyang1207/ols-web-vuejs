<template>
  <div class="form-container">
    <div class="form">
        <div style="height: 130px;" >
          <div style="margin: 32px; font-size:32px; color: #999999; cursor: pointer;" @click="back">&lt;</div>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="65px" label-position="top">
          <el-form-item label="用户名：" prop="userName">
            <el-col>
              <el-input v-model="ruleForm.userName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-col>
              <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="确认密码：" prop="password2">
            <el-col>
              <el-input type="password" v-model="ruleForm.password2"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="center">
              <button class="button" @click="submitForm('ruleForm')">注册</button>
            </el-row>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
  import api from '@/api'

  export default {
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length<6){
          callback(new Error('密码不可少于6位'));
        } else {
          if (this.ruleForm.password2 !== '') {
            this.$refs.ruleForm.validateField('password2');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          userName: '',
          password: '',
          password2: '',
        },
        rules: {
          userName: [
            {validator: validateUsername, trigger: 'onsubmit'},
          ],
          password: [
            {validator: validatePass, trigger: 'onsubmit'}
          ],
          password2: [
            {validator: validatePass2, trigger: 'onsubmit'}
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate( valid => {
          if(valid){
            api.register({
              username: this.ruleForm.userName,
          password: this.ruleForm.password,
        }).then( ({ status }) => {
          if(status === 200){
            this.$router.push('/');
            this.$notify({
              title: `成功`,
                message: '注册成功，请登录...',
                type: 'success'
              });
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
                message: '用户名已存在，请重新输入...',
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
        );;
          }
        });
      },
      back(){
        this.$router.push('/')
      }
    }
  }
</script>
