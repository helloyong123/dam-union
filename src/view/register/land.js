import { apply, sendCode, isSuccess } from "../../data/getData";
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
        insurance: ''
      },
      checked: true,      //是否同意协议

      selectedNum: null,
      radioList: ["5万", "10万", "15万", "20万"],
      checkbox:[],
      checkboxList:["有社保", "有公积金", "有房", "有车","有保单", "有微粒贷"],
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
    this.form.city='请选择'
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
      let checkSMS = /^[0-9]{4}$/;
      let checkAge = /^[0-9]{2}$/;
      if (new RegExp("[\\u4E00-\\u9FFF]").test(this.form.name) === false) this.$dialog('请输入正确中文姓名');
      else if (checkAge.test(this.form.age) === false) this.$dialog('请输入真实年龄');
      else if (/^1[0-9]{10}$/.test(this.form.mobile) === false) this.$dialog('请输入正确手机号');
      else if (checkSMS.test(this.form.smsCode) === false) this.$dialog('短信验证码格式不正确');
      else if (this.form.city == null || this.form.city == '请选择') this.$dialog('请选择贷款城市');
      else if (this.selectedNum == null) this.$dialog('请选择贷款金额');
      else {
        this.form.loanAmount=this.radioList[this.selectedNum].replace('万','');
        let message =this.checkbox
        let mark = this.$route.query.channelId;
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
        let params = JSON.stringify(this.form)
        apply(params).then(res => {
          this.buttonDisabled = false
          if (res.code == 200) {
            //tuia
            if(res.userId == 8){
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
            }
              //gdt
              if (res.userId == 67) {
                  gdt('track', 'RESERVATION', {'key1': 'value1', 'key2': 'value2'});
              }
              //xiaomi
              if (res.userId == 72) {
                  mi_tracker.log("form", {conversionId : "6192"})
              }
              //doumeng
       /*       if (res.userId == 67) {
                  _ai_analysis()
              }*/
            //chubao
            if(res.userId == 50){
              _CONVERGEMOB.track('35')
            }
            //vivo
            if(res.userId == 27){
              var actName = 'submit';
              var actProp = {act: 'submit', name: '表单组件'};
              VAD_EVENT.sendAction(actName, actProp);
            }
            setCookie('user_mobile', this.form.mobile, 604800)
            setTimeout(() =>{
              this.$router.push({
                path: '/success',
              });
            },350)
          } else {
            this.$dialog(res.message);
          }
        })
      }
    },
    smsAjax() {
      let mobile = this.form.mobile
      if(mobile){
        sendCode(mobile).then(res => {
          if (res.code == 200) {
            this.$dialog(res.message);
          } else {
            this.$dialog(res.message);
          }
        })
      }else {
        this.$dialog("请输入正确手机号");
      }
    },
    goCancel() {
      //根据情景不一样，跳转的页面也会不同，暂定跳到我的借款首页
      //...省略
      this.$router.push('/loan')
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
