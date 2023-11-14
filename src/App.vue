<template>
    <nav-bar></nav-bar>
    <div class="wrapper">
        <router-view></router-view>
    </div>
</template>

<script>
    import NavBar from '@/components/NavBar.vue'
    export default {
        components: {
            NavBar
        }
    }
</script>

<style>
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