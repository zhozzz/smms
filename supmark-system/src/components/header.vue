<template>
<div>
  <p class="headerTitle">欢迎您 <span>{{username}}</span></p>
</div>
</template>


<script>
export default {
    data() {
        return {
            username:"快乐风男"
        }
    },
}
</script>

<style lang="less">
.headerTitle{
font-size: 18px;
font-weight: 600;
text-align: left;
height: 40px;
line-height: 10px;
}

</style>
