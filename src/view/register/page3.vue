<template>
  <div>
    <!--<img src="../../assets/img/logo.png" class="primary-logo"/>-->
    <h2 class="logoHead"></h2>
    <ul class="formCom form-login form-mini">
      <li class="icon-clear">
        <label>
          <span>手机号</span>
          <input type="number" placeholder="请输入手机号" v-model.number='form.mobile'>
          <i @click='mobile = ""'></i>
        </label>
      </li>
      <li>
        <label>
          <span>验证码</span>
          <input type="number" placeholder="请输入短信验证码" v-model.number='form.smsCode'>
        </label>
        <sendSMS @sentAjax='smsAjax'></sendSMS>
      </li>
      <li>
        <span class="subBtn"  style="background-color: #43b800;" :class='{grayBg:!checked}' :disabled="buttonDisabled" @click='login'>免费申请</span>
      </li>
    </ul>
    <!--    <div class="btnWarp">
          <span class="subBtn"  :class='{grayBg:!checked}' :disabled="buttonDisabled" @click='login'>免费申请</span>
        </div>-->
    <div class="centImg"></div>
    <div class="lowImg"></div>
    <div class="agreeMent mt20" :class='{ no : !checked }' @click='checked = !checked'>
      我已阅读并同意<span class="blue" @click.stop="goAgreem('/agreement')">《个人信息授权及服务协议》</span>
      <input type="checkbox" v-model="checked">
    </div>
    <div class="font-b">
      <span>投资有风险，借贷需谨慎</span><br>
      <span>请根据个人偿还能力合理借款</span><br>
      <span>上海联帝信息科技有限公司</span><br>
      <span>贷款资金由正规金融持牌放款机构提供</span><br>
      <span>放款额度及放款时间以机构审批结果为准</span><br>
      <span>正规贷款平台，利息低，放款快，额度高达20万</span><br>
      <span>沪ICP备2021010277号-1</span><br>
    </div>
  </div>
</template>
<script>
  import { register, sendCode, isSuccess } from "../../data/getData";
  import { getCookie, setCookie } from "../../store/cookie";
  export default {
    data() {
      return {
        canvas: {}, //存放canvas DOM节点
        buttonDisabled: false,
        form: {
          smsCode: '',
          mark: '',
          mobile: '',
          back: ''
        },
        checked: true,      //是否同意协议
      }
    },
    created() {
      let mobile = getCookie('user_mobile');
      if(mobile){
        isSuccess(mobile).then(res => {
          if(!res.data){
            this.$router.push({
              path: '/success',
            });
          }
        })
      }
    },
    methods: {
      login: function () {
        this.buttonDisabled = true
        let checkSMS = /^[0-9]{4}$/;
        if (/^1[0-9]{10}$/.test(this.form.mobile) === false) this.$dialog('请输入正确手机号');
        else if (checkSMS.test(this.form.smsCode) === false) this.$dialog('短信验证码格式不正确');
        else {
          let mark = this.$route.query.channelId;
          localStorage.setItem("channel_mark", mark)
          let back = this.$route.query.mob_cid;
          if(back){
            localStorage.setItem("mob_cid", back)
            this.form.back = back;
          }
          register(this.form.mobile, this.form.smsCode, mark, this.form.back).then(res => {
            this.buttonDisabled = false
            if (res.code == 200) {
              //tuia
              if (res.userId == 8) {
                countLog.ready(function () {
                  countLog.init(function () {
                    // 如果需要跳转，在此处写入  window.location.href  =  跳转链接
                  }, {
                    isCopy: 0,
                    pageType: 0
                  })
                })
              }
              //bianxianmao
              if (res.userId == 33) {
                _bxmPlatformFn();
                let back = this.$route.query.bxm_id;
                if(back){
                  localStorage.setItem("bxm_id", back)
                  this.form.back = back;
                }
              }
                //gdt
                if (res.userId == 67) {
                    gdt('track', 'RESERVATION', {'key1': 'value1', 'key2': 'value2'});
                }
              //chubao
              if (res.userId == 50) {
                _CONVERGEMOB.track('35')
                let back = this.$route.query.mob_cid;
                if(back){
                  localStorage.setItem("mob_cid", back)
                  this.form.back = back;
                }
              }
                //doumeng
                if (res.userId == 67) {
//                    _ai_analysis()
                }
                //xiaomi
                if (res.userId == 72) {
                    mi_tracker.log("form", {conversionId : "6192"})
                }
              //vivo
              if (res.userId == 27) {
                var actName = 'submit';
                var actProp = {act: 'submit', name: '表单组件'};
                VAD_EVENT.sendAction(actName, actProp);
              }
              setCookie('user_mobile', this.form.mobile, 604800)
              setTimeout(() => {
                this.$router.push({
                  path: '/information',
                  query: {channelId: mark}
                });
              }, 350)
            } else {
              this.$dialog(res.message);
            }
          })
        }
      },
      smsAjax() {
        let mobile = this.form.mobile
        if (/^1[0-9]{10}$/.test(mobile) === false) this.$dialog('请输入正确手机号');
        else{
          sendCode(mobile).then(res => {
            if (res.code == 200) {
              this.$dialog(res.message);
            } else {
              this.$dialog(res.message);
            }
          })
        }
      },
      goCancel() {
        //根据情景不一样，跳转的页面也会不同，暂定跳到我的借款首页
        //...省略
        this.$router.push('/loan')
      }
    }
  }

</script>
<style>
  .blue {
    color: #43b800; }
  .agreeMent {
    display: block;
    color: #666;
    font-size: 0.6875rem;
    text-align: center; }
  .agreeMent:before {
    display: block;
    font-family: 'icons';
    content: "";
    display: inline-block;
    color: #43b800;
    padding-right: 0.25rem; }
  .agreeMent.no:before {
    content: ""; }
  .agreeMent input {
    width: 0;
    height: 0;
    display: inline; }

  .code-sms {
    width: 5rem;
    height: 1.5625rem;
    line-height: 1.5625rem;
    font-size: 0.75rem;
    text-align: center;
    color: #fff;
    background: #43b800;
    -webkit-border-radius: 0.25rem;
    border-radius: 0.25rem;
    margin-top: -0.78125rem;
    position: absolute;
    top: 50%;
    right: 0.625rem;
    z-index: 4; }
  .font-b{
    margin: 0.1rem auto;
    text-align: center;
    color: 	#A0A0A0;
    font-size: 10px
  }
  .fontSty{
    margin-bottom: 0.3rem;
    margin-top: 0.5rem;
  }
  .fontSty1{
    margin-bottom: 0.3rem;
  }

  .li{
    display: inline-block;
    font-size: 0.2rem;
    width: 3.5rem;
    text-align: center;
    /*padding: 0.1rem 0;*/
    margin-right: 0.3rem;
    margin-bottom: 0.25rem;
    cursor: pointer;
    color: #979797;
    border-radius: 0.37rem;
  }
  .active {
    color: #fff;
    /*border: 1px solid #3f7afb;*/
    background: #3297FD;
  }
  .logoHead {
    margin-top:-2rem;
    width: 100%;
    height: 26.5rem;
    /*margin: 1.25rem auto 1.25rem auto;*/
    background: url("../../assets/img/landNo.jpg") 0 0 no-repeat;
    background-size: 100%;
    text-indent: -999em;
  }

  .primary-logo{
    width:2.0rem;
    height:auto;
    margin-top:0.2rem;
    margin-left: 0.2rem;
    position:absolute;
    z-index: 10;
  }

  .centImg{
    margin-top: -1rem;
    width: 100%;
    height: 12rem;
    background: url("../../assets/img/land2Centre.jpg") 0 0 no-repeat;
    background-size: 100%;
    text-indent: -999em;
  }
  .lowImg{
    width: 100%;
    height: 11rem;
    background: url("../../assets/img/land2Low.jpg") 0 0 no-repeat;
    background-size: 100%;
    text-indent: -999em;
  }
</style>
