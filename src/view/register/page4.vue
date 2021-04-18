<template>
  <div>
    <!--<img src="../../assets/img/xue.png" class="primary-logo"/>-->
    <h2 class="logoHead"></h2>
    <ul class="formCom form-login form-mini">
      <li class="icon-clear">
        <label>
          <span>姓名</span>
          <input placeholder="请输入姓名" v-model.number='form.name'>
          <i @click='form.name = ""'></i>
        </label>
      </li>
      <li class="icon-clear">
        <label>
          <span>年龄</span>
          <input placeholder="请输入年龄" v-model.number='form.age'>
          <i @click='form.age = ""'></i>
        </label>
      </li>
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
      <li class="icon-arrow">
        <listComponent v-for='data in datas' @click="$router.push(data.push)"  :title='data.tit' :show="form.city">
        </listComponent>
      </li>
      <div class="fontSty">
      <span style="font-size: 0.81rem;">贷款额度</span><br>
      </div>
      <li class="li" v-for="(item,index) in radioList" :key="index" :class="selectedNum==index?'active':''" @click="select(index)">{{item}}</li><br>
  <!--    <div class="fontSty1">
        <span style="font-size: 0.81rem;">补充资料(多选提高通过率!)</span>
      </div>
      <li class="li" v-for="(item,index) in checkboxList" :key="item" :class="checkbox.includes(index)?'active':''" @click="check(index)">{{item}}</li>-->
        <span class="subBtn"  :class='{grayBg:!checked}' :disabled="buttonDisabled" @click='login'>免费申请</span>
    </ul>
      <!--<div class="centImg"></div>-->
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
      <span>沪ICP备2021010277号-1</span>
    </div>
  </div>
</template>
<script src="./page.js"></script>
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
    height: 14.4875rem;
    /*margin: 1.25rem auto 1.25rem auto;*/
    background: url("../../assets/img/landTop.jpg") 0 0 no-repeat;
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
      background: url("../../assets/img/land1Centre.jpg") 0 0 no-repeat;
      background-size: 100%;
      text-indent: -999em;
  }
  .lowImg{
      width: 100%;
      height: 10rem;
      background: url("../../assets/img/land1Low.jpg") 0 0 no-repeat;
      background-size: 100%;
      text-indent: -999em;
  }

</style>
