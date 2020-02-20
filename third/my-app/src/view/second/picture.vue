<template>
  <div id="pictureDiv">
    <div id="imgDiv"><img :src="imgSrc" /></div>
    <div v-for="(value, key, index) in showDatas" :key="index">
      {{ key }}: {{ value }} - {{index}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showDatas: {
      type: Object,
      default: () => {
        return {};
      }
    },
    imgSrc: {
      type: String,
      deafalut: () => {
        return "../../assets/logo.png";
      }
    }
  },
  created(){
      console.log('showDatas==', this.showDatas);
      console.log('imgSrc==', this.imgSrc);
  }
};
</script>

<style>
    #pictureDiv{
        width: 200px;
        display: inline-block;
        border: 1px brown solid;
    }
    #imgDiv{
        width: 100px;
        height: 60px;
        margin: 5px auto;
    }
</style>
