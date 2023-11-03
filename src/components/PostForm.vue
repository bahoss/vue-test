<template>
    <div class="form">
        <form @submit.prevent>
            <input 
                v-model="post.name"
                type="text"
                placeholder="Name">
            <input 
                v-model="post.description"
                type="text" 
                placeholder="Description">
            <button @click="addPost">Add post</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            post: {
                name: '',
                description: ''
            }
        }
    },
    methods: {
        addPost() {
            this.post.id = Date.now();
            this.$emit('create', this.post)
            this.post = {
                name: '',
                description: ''
            }

        }
    }
}
    

</script>

<style scoped>
.form {
    display: flex;
    justify-content: center;
}
</style>