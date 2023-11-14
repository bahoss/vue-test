<template>
    <div class="wrapper">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style  scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .wrapper {
        padding: 20px 40px;
        display: flex;
        flex-direction: column;
        gap: 25px;
    }
</style>