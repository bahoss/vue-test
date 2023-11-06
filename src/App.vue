<template>  
    <div class="wrapper">
      <post-list v-if="!isPostLoading" :posts="posts" @remove="removePost"></post-list>
      <div v-else>Loading...</div>
      <my-dialog v-model:show="dialogVisible">
          <post-form @create="addPost"></post-form>
      </my-dialog>
      <div class="app__btns">
         <my-button @click="showDialog">Создать пост</my-button>
         <my-select 
            v-model="selectedSort" 
            :options="sortOptions"
          />
      </div>
     
      <my-button @click="fetchPosts">Fetch</my-button></div>

</template>

<script>
    import PostList from './components/PostList.vue';
    import PostForm from './components/PostForm.vue';
    import axios from 'axios'

    export default {
        components: {
            PostList,
            PostForm
        },
        data() {
            return {
                posts: [ ],
                dialogVisible: false,
                isPostLoading: false,
                selectedSort: '',
                sortOptions: [
                    { name: 'By name', value: 'title' },
                    { name: 'By description', value: 'body' }
                ]
            }
        },

        methods: {
            addPost(newPost) {
                this.posts.push(newPost);
                this.dialogVisible = false
              
            },
            removePost(post) {
                this.posts = this.posts.filter(p => p.id !== post.id)
            },

            showDialog () {
                this.dialogVisible = true
            },
            
            async fetchPosts() {
                try {
                    this.isPostLoading = true
                   const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
                   this.posts = response.data.map(post=> {
                       return {
                           id: post.id,
                           name: post.title,
                           description: post.body
                       }
                   })
                   console.log({response})
                } catch (error) {
                    
                } finally {
                    this.isPostLoading = false
                }
            }
            

        },

        mounted() {
            this.fetchPosts()
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
.app__btns {
    display: flex;
    justify-content: space-between;
}
</style>