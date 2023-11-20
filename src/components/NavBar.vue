<template>
    <div class="navbar">
        <div>Vue 3</div>
        <div class="navbar__btns">
            <my-button @click="$router.push('/posts')">Posts</my-button>
            <my-button @click="$router.push('/about')">About</my-button>
            <my-button @click="$router.push('/composition')">Composition</my-button>
        </div>

    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .navbar {
        height: 50px;
        background-color: rgb(175, 172, 172);
        box-shadow: 2px 2px 4px gray;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 35px;
        gap: 20px;
    }

    .navbar__btns {
        display: flex;
        gap: 25px;
    }
</style>