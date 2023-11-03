<template>  
    <div>
        <form @submit.prevent>
            <input 
                v-bind:value="name"
                @input="name = $event.target.value"
                type="text"
                placeholder="Name">
            <input 
                v-bind:value="description"
                @input="description = $event.target.value"
                type="text" 
                placeholder="Description">
            <button @click="addPost">Add post</button>
        </form>
        <div>
            <div class="post" v-for="post in posts" :key="post.id">
                <div><strong>Name</strong> {{ post.name }}</div>
                <div><strong>Description</strong> {{ post.description }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                posts: [
                    {id: 1, name: 'Js', description: 'Description'},
                    {id: 2, name: 'Js2', description: 'Description2'},
                    {id: 3, name: 'Js3', description: 'Description3'},
                ],
                name: '',
                description: '',

            }
        },

        methods: {
            addPost() {
                const newPost = {
                    id: Date.now(),
                    name: this.name,
                    description: this.description
                }

                this.posts.push(newPost);
                this.name = '';
                this.description = '';
            },
            

        }
       
    }
</script>

<style>
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.post {
    margin: 14px;
    padding: 15px;
    border: 2px solid teal;
}

</style>