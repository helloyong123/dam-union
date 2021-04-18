import { apply } from "../../data/getData";
export default {
  data() {
    return {
      canvas: {}, //存放canvas DOM节点
      buttonDisabled: false,
      form: {
        smsCode: '',
        mark: '',
        mobile: '',
        city: '',
      },
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
  created() {
    this.form.city='请选择'
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

  computed: {
    //判断是否全部选中
    isCheckAll(){
      if(this.checkbox.length==this.checkboxList.length){
        return true;
      }
      return false;
    }
  },

  methods: {
    login() {
      this.buttonDisabled = true
      let checkSMS = /^[0-9]{4,8}$/;
      if (new RegExp("[\\u4E00-\\u9FFF]").test(this.form.name) === false) this.$dialog('请输入正确中文姓名');
      else if (/^1[0-9]{10}$/.test(this.form.mobile) === false) this.$dialog('请输入正确手机号');
      // else if (checkSMS.test(this.form.smsCode) === false) this.$dialog('短信验证码格式不正确');
      else if (this.form.city == null) this.$dialog('请选择贷款城市');
      else if (this.form.loanAmount == null) this.$dialog('请选择贷款金额');
      else {
        this.form.loanAmount=this.radioList[this.selectedNum].replace('万','');
        let message =this.checkbox
        let mark = this.$route.query.mark;
        localStorage.setItem("channel_mark", mark)
        this.form.mark=mark;
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
        let params = JSON.stringify(this.form)
        console.log(params)
        apply(params).then(res => {
          this.buttonDisabled = false
          if (res.status_code == 0) {
            this.sendCode();
            this.$router.push({
              path: '/loan',
            });
          } else {
            this.ToastFun(res.message);
          }
        })
      }
    },
    smsAjax() {
      console.log('在此发送短信ajax--组件中已$emit该函数')
    },
    goCancel() {
      //根据情景不一样，跳转的页面也会不同，暂定跳到我的借款首页
      //...省略
      this.$router.push('/loan')
    },



    //单选
    select(i) {
      // alert(this.selectedNum)
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
