<template>
  <div class="container">
    <topComponent title='申请成功' :showLeft='false'></topComponent>
    <div class="indexBanner" style="background-color: white;height: 10.0rem">
      <p class="tip">申请成功，请耐心等待信贷员与您联系!</p>
      <div class="suImg">
        <img style="height: 8rem" src="../../assets/img/success1.png">
      </div>
      <p class="warn">金额获批之前请勿支付任何费用，谨防诈骗!!!</p>
    </div>
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container mt-list" v-model="active" swipeable>
        <mt-tab-container-item id="successList" >
          <list :productList="loanList"></list>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
  import { TabContainer, TabContainerItem } from 'mint-ui'
  import list from 'src/components/list/list'
  import { successProduct } from "../../data/getData";
  import { getCookie, setCookie } from "../../store/cookie";
  export default {
    data() {
      return {
        active: 'successList',
        loanList:[]
      }
    },
    created() {
      let mobile = getCookie('user_mobile');
      if(mobile){
        successProduct(mobile).then(res => {
          if(res.data){
            this.loanList=res.data;
          }
        })
      }
    },
    components:{
      TabContainer,
      TabContainerItem,
      list
    },

  }
</script>
<style>
  .suImg{
    width: 3.5rem;
    height: 0.2rem;
    margin-left: 4.5rem;
  }
  .warn{
    font-size: 0.8rem;
    color: red;
    margin-top: 6.6rem;
    margin-left: 0.3rem;
  }
  .tip{
    font-size: 0.8rem;
    color: #1665fd;
    margin-top: 0.2rem;
    margin-left: 0.3rem;
  }
  .page-tabbar-tab-container{
    background: #F2F6FC;
    padding-bottom: 25rem;
  }
  .mt-list{
    float:left;
    width:100%;
  }
</style>
