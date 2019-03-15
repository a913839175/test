<template>
    <div class="login-wrap">
        <div class="login-bg"></div>
        <div class="login-container container">
            <div class="line bouncein">
                <div class="xs6 xm4 xs3-move xm4-move">
                    <div style="height:170px;"></div>                  
                    <el-form>
                        <div class="panel loginbox">
                            <div class="text-center margin-big padding-big-top"><h1>至元通用框架</h1></div>
                            <div class="panel-body" style="padding:30px; padding-bottom:10px; padding-top:10px;">
                                <div class="form-group">
                                    <div class="field field-icon-right">
                                        <input type="text" class="input input-big" name="name"  placeholder="登录账号" v-model="username" />
                                        <span class="icon icon-user margin-small"><i class="fa fa-key "></i></span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="field field-icon-right">
                                        <input type="password" class="input input-big" name="password" placeholder="登录密码" v-model="password" @keyup.enter='submitForm'/>
                                         <span class="icon icon-user margin-small"><i class="fa fa-unlock"></i></span>
                                        <span class="icon icon-key margin-small"></span>
                                    </div>
                                </div>
                            </div>
                            <div style="padding:30px;">
                                <button type="button" class="button button-block bg-main text-big input-big" @click="submitForm">登录</button>
                            </div>
                        </div>
                    </el-form>          
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import storage from '@/utils/storage'
import authApi from '@/api'
    export default {
        data: function () {
            return {
                username: '',
                password: '',
            }
        },
        mounted() {
            this.init()
            // this.testApi()
        },
        methods: {
            // 页面加载时
            init() {
            },
            // 测试api接口
            testApi() {
            },
            submitForm() {
                var self = this;
                let username = this.username
                // RSA加密
                let password = this.password
                if (username == '' || password == '') {
                    this.$message.error('账号名或密码不能为空')
                } else {
                    let params={
                        username:this.username,
                        password:this.password
                    }
                    self.$store.dispatch('Logins',params).then(res => {
                        console.log("login的rens")
                        console.log(res)
                        if (res.code === 0) {
                            console.log("进入了code==0")
                            this.$router.push({
                                path: '/user'
                            })
                        } else {
                            const data = res.code
                            if (data === 100) {
                                self.$message.error('用户名或密码错误，请重新输入')
                            } else {
                                self.$message.error('登陆失败，请重新输入')
                            }
                        }
                        }).catch(response => {
                            self.$alert('网络繁忙，请稍后再试！','系统提示'); 
                        });
                }
            }
        }
    }

</script>

<style lang="css">
    @import './login';

</style>
