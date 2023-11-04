<template>
    <div class="post">
        <div><strong>Name</strong> {{ post.name }}</div>
        <div><strong>Description</strong> {{ post.description }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            post: {
                type: Object,
                requiered: true
            }
        }
    }
</script>

<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
}

</style>