<template>
     <div>
            <div class="post" v-for="post in posts" :key="post.id">
                <div><strong>Name</strong> {{ post.name }}</div>
                <div><strong>Description</strong> {{ post.description }}</div>
            </div>
    </div>
</template>

<script>
export default {
    props: {
        posts: {
            type: Array,
            required: true
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