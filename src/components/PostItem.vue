<template>
    <div class="post">
        <div>
            <div><strong>Name</strong> {{ post.name }}</div>
            <div><strong>Description</strong> {{ post.description }}</div>
        </div>
       <div>
            <my-button @click="$emit('remove', post)">Delete</my-button>
        </div>
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
    display: flex;
    justify-content: space-between;
}

</style>