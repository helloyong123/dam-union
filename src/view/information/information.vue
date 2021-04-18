<template>
  <div>
    <topComponent title='信息完善' :showLeft='false'></topComponent>
    <ul class="formCom form-login form-mini" style="padding-top: 3rem">
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
      <li class="icon-arrow">
        <span>性别</span>
        <p>{{ form.sex | optionTxt(optionSex) }}</p>
        <select v-model='form.sex'>
          <option v-for='option in optionSex' :value='option.val'>{{option.txt}}</option>
        </select>
      </li>
      <li class="icon-arrow">
        <listComponent v-for='data in datas' @click="$router.push(data.push)"  :title='data.tit' :show="form.city">
        </listComponent>
      </li>
      <div class="fontSty">
        <span style="font-size: 0.81rem;">贷款额度</span><br>
      </div>
      <li class="li" v-for="(item,index) in radioList" :key="index" :class="selectedNum==index?'active':''" @click="select(index)">{{item}}</li><br>
      <div class="fontSty1">
        <span style="font-size: 0.81rem;">补充资料(多选提高通过率!)</span>
      </div>
      <li class="li" v-for="(item,index) in checkboxList" :key="item" :class="checkbox.includes(index)?'active':''" @click="check(index)">{{item}}</li>
    </ul>
    <div class="btnWarp">
      <span class="subBtn" :disabled="buttonDisabled" @click='login'>{{buttonTitle}}</span>
    </div>
  </div>
</template>
<script>
  import { applyTwo, isSuccess } from "../../data/getData";
  import { getCookie, setCookie } from "../../store/cookie";
  export default {
    data() {
      return {
        canvas: {}, //存放canvas DOM节点
        buttonDisabled: false,
        buttonTitle: '提交',
        optionSex: [{
          val: '男',
          txt: '男'
        },
          {
            val: '女',
            txt: '女'
          }
        ],
        form: {
          mark: '',
          mobile: '',
          name: '',
          sex: '',
          age:'',
          city: '',
          loanAmount: '',
          security: '',
          fund: '',
          house: '',
          car: '',
          weiLiDai: '',
          insurance: '',
          creditCard: '',
          back:''
        },
        selectedNum: null,
        radioList: ["5万", "10万", "15万", "20万"],
        checkbox:[],
        checkboxList:["有社保", "有公积金", "有房", "有车", "有保单", "有微粒贷", "有信用卡"],
        datas: [
          {
            push: '/selectCity',
            isOk: false,
            tit: '贷款城市',
            param: 'userSB'
          }
        ]
      }
    },
    beforeMount() {
      this.form.city='请选择';
      let mobile = getCookie('user_mobile');
      this.form.mobile= mobile;
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
    mounted(){
      let mark = this.$route.query.channelId;
      let localMark = localStorage.getItem("channel_mark");
      if(localMark){
        this.form.mark = localMark;
      }else {
        this.form.mark = mark;
      }
      let back = localStorage.getItem("mob_cid");
      if(back){
        this.form.back = back;
      }
      let bxm = localStorage.getItem("bxm_id");
      if(bxm){
        this.form.back = bxm;
      }
    },


    beforeRouteEnter(to, from, next) {
      if(from.name=='selectCity'){
        to.meta.isBack=true;
      }
      next();
    },
    activated() {
      if(this.$route.meta.isBack){
        let city = localStorage.getItem('local_city')
        if(city){
          this.form.city=city
        }
      }
      this.$route.meta.isBack = false
    },

    methods: {
      login() {
        let checkSMS = /^[0-9]{2}$/;
        if (new RegExp("[\\u4E00-\\u9FFF]").test(this.form.name) === false) this.$dialog('请输入正确中文姓名');
        else if (checkSMS.test(this.form.age) === false) this.$dialog('请输入真实年龄');
        else if (this.form.sex == '') this.$dialog('请选择性别');
        else if (this.form.mobile == '') this.$dialog('请重新登录');
        else if (this.form.city == null || this.form.city == '请选择') this.$dialog('请选择贷款城市');
        else if (this.selectedNum == null) this.$dialog('请选择贷款金额');
        else {
          this.form.loanAmount=this.radioList[this.selectedNum].replace('万','');
          let message =this.checkbox;
          if(message.indexOf(0) != -1){
            this.form.security = 'Y'
          }else {
            this.form.security = 'N'
          }
          if(message.indexOf(1) != -1){
            this.form.fund = 'Y'
          }else {
            this.form.fund = 'N'
          }
          if(message.indexOf(2) != -1){
            this.form.house = 'Y'
          }else {
            this.form.house = 'N'
          }
          if(message.indexOf(3) != -1){
            this.form.car = 'Y'
          }else {
            this.form.car = 'N'
          }
          if(message.indexOf(4) != -1){
            this.form.weiLiDai = 'Y'
          }else {
            this.form.weiLiDai = 'N'
          }
          if(message.indexOf(5) != -1){
            this.form.insurance = 'Y'
          }else {
            this.form.insurance = 'N'
          }
          if(message.indexOf(6) != -1){
            this.form.creditCard = 'Y'
          }else {
            this.form.creditCard = 'N'
          }
          this.buttonTitle = '正在提交...'
          this.buttonDisabled = true
          let params = JSON.stringify(this.form)
          applyTwo(params).then(res => {
            this.buttonTitle = '提交'
          if (res.code == 200) {
            this.buttonDisabled = false
            this.$router.push({
              path: '/success',
            });
          } else {
            this.$dialog(res.message);
          }
        })
        }
      },
      //单选
      select(i) {
        this.selectedNum = i;
      },
      //多选
      check(i){
        var idx = this.checkbox.indexOf(i);
        //如果已经选中了，那就取消选中，如果没有，则选中
        if(idx>-1){
          this.checkbox.splice(idx,1);
        }else{
          this.checkbox.push(i);
        }
      },
      //选中全部
      checkAll(){
        var len = this.checkboxList.length;
        this.checkbox = [];
        for(var i=0;i<len;i++){
          this.checkbox.push(i);
        }
      },
      //清空选择
      clearCheckbox(){
        this.checkbox = [];
      },
    }
  }
</script>
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

</style>
