<template>
  <li @click='goClick'>
    <p v-html='title' style="padding-left: 0rem"></p>
    <p v-html='show'></p>
    <slot name="right"></slot>
  </li>
</template>
<script>
  export default {
    props: ['title','show'],
    methods: {
      goClick() {
        this.$emit('click')
      }
    }
  }
</script>
