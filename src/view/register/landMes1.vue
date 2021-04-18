<template>
  <div>
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
    </ul>
    <div class="btnWarp">
      <span class="subBtn" :disabled="buttonDisabled" @click='login'>免费申请</span>
    </div>
    <div class="font-b">
      <span>上海联帝信息科技有限公司</span><br>
      <span>沪ICP备2021010277号-1</span><br>
    </div>
  </div>
</template>
<script src="./landMes.js"></script>
<style>
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
    width: 100%;
    height: 13.6875rem;
    /*margin: 1.25rem auto 1.25rem auto;*/
    background: url("../../assets/img/card.jpg") 0 0 no-repeat;
    background-size: 100%;
    text-indent: -999em;
  }

</style>
