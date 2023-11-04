<template>  
    <div class="wrapper">
      <post-list :posts="posts"></post-list>
      <post-form @create="addPost"></post-form>
    </div>
</template>

<script>
    import PostList from './components/PostList.vue';
    import PostForm from './components/PostForm.vue';

    export default {
        components: {
            PostList,
            PostForm
        },
        data() {
            return {
                posts: [
                    {id: 1, name: 'Js', description: 'Description'},
                    {id: 2, name: 'Js2', description: 'Description2'},
                    {id: 3, name: 'Js3', description: 'Description3'},
                ],
            }
        },

        methods: {
            addPost(newPost) {
                this.posts.push(newPost);
              
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
.wrapper {
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
    gap: 25px;
}
</style>