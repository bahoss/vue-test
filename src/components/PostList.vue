<template>
    <div v-if="posts.length > 0">
        <div>
            <h3>User list</h3>
        </div>
        <post-item  
            v-for="post in posts"
            :post="post"
            :key="post.id"
            @remove="$emit('remove', post)"
        />
    </div>
    <h2 v-else style="color: red">List is empty</h2>
</template>

<script>
import PostItem from './PostItem.vue'
export default {
    components: {
        PostItem
    },
    props: {
        posts: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>


</style>