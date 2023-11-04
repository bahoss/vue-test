<template>
        <form @submit.prevent class="form">
            <my-input 
                v-model="post.name"
                placeholder="Name"
            />
            <my-input 
                v-model="post.description"
                placeholder="Description"
            />
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


</style>