<template>
        <form @submit.prevent class="form">
            <input 
                class="input"
                v-model="post.name"
                type="text"
                placeholder="Name"
            >
            <input 
                class="input"
                v-model="post.description"
                type="text" 
                placeholder="Description"
            >
            <my-button 
                @click="addPost"
                style="align-self: flex-end"
            >
                Create
            </my-button>
        </form>
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
    flex-direction: column;
    gap: 15px;
}

.input {
    padding: 10px;
    border: 1px solid teal;
}
</style>