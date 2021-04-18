<template id="productList">
  <div>
    <div class="loan-list">
      <div class="loan-card" v-for="item of productList">
        <div class="loan-content">
          <div class="loan-logo">
            <span class="left">
              <img :src="item.logo">
              <span class="loan-name">{{item.name}}</span>
            </span>
            <span class="right">
              <span class="loan-success"><img src="../../assets/img/hot.png"></span>
              <span class="loan-num">{{item.dailyUv}}人申请</span>
            </span>
          </div>
          <div class="loan-info">
            <p>
              <span class="loan-money">{{item.description}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        mobile: '',
      }
    },
    props: {
      productList: Array
    },
    methods:{
    }
  }

</script>

<style lang="scss" scoped src="./list.scss">

</style>
