<template>
    <div class="loading-wrapper" v-if="isloading" >
        <div class="loading"></div>
        <div class="loading-txt">正在加载中</div>
    </div>
</template>
<script>
    /*eslint-disable */
    export default{
        props: {
            isloading: {
                type: Boolean,
                default: true
            }
        }
    }
</script>
<style scoped lang="less">
    .loading {
    position: absolute;
    top: 0;
    left: 50%;
    background: #fff;
    width: 2.5rem;
    height: 2.5rem;
    margin-top: 70%;
    margin-left: -1.25rem;
    background: url('../../../static/rage_loading.png') no-repeat;
    background-size: cover;
    -webkit-animation: rotating 5s  linear infinite;
    animation: rotating 5s linear infinite;
  }
  .loading-txt {
    position: absolute;
    top:0;
    color: #4a4a4a;
    margin-top: 87%;
    width: 100%;
    text-align:center;
  }
</style>