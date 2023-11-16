<template>  
   <div>
      <div class="app__btns">
         <my-button @click="showDialog">Создать пост</my-button>
         <my-select 
            :model-value="selectedSort" 
            :options="sortOptions"
            @update:model-value="setSelectedSort"
          />
      </div>
      <my-input v-model="searchQuery" placeholder="Search..." @update:model-value="setSearchQuery"></my-input>
      <post-list v-if="!isPostLoading" :posts="sortedAndSearchedPosts" @remove="removePost"></post-list>
      <div v-else>Loading...</div>
      <my-dialog v-model:show="dialogVisible">
          <post-form @create="addPost"></post-form>
      </my-dialog>
      
      <my-button @click="fetchPosts">Fetch</my-button></div>
      <!-- <div class="page__wrapper">
        <div v-for="pageNumber in totalPages" :key="pageNumber" class="page" :class="{
            'current-page': Number(pageNumber) === page
        }" @click="changePage(pageNumber)">
          {{pageNumber}}
       </div>
      </div> -->
      <div v-intersection="fetchMorePosts" class="observer"></div>
</template>

<script>
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

  

    export default {
        components: {
            PostList,
            PostForm
        },
      

        methods: {
            ...mapActions({
              fetchPosts: 'post/fetchPosts',
              fetchMorePosts: 'post/fetchMorePosts'
            }),
            ...mapMutations({
              setPage: 'post/setPage',
              setSearchQuery: 'post/setSearchQuery',
              setSelectedSort: 'post/setSelectedSort'
            }),
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

            changePage(pageNumber) {
                this.page = pageNumber
            },
            
        },

        mounted() {
            this.fetchPosts()
        },
       
        computed: {
            ...mapState({
              posts: state=>state.post.posts,
              isPostLoading: state=>state.post.isPostLoading,
              selectedSort: state=>state.post.selectedSort,
              searchQuery: state=>state.post.searchQuery,
              page: state=>state.post.page,
              limit: state=>state.post.limit,
              totalPages:state=>state.post.totalPages,
              sortOptions: state=>state.post.sortOptions
            }),
            ...mapGetters({
                sortedPost: 'post/sortedPost',
                sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
            })
        },

        watch: {
           /*  page() {
               this.fetchPosts() 
            }
         */
       }
    }
</script>

<style>


.app__btns {
    display: flex;
    justify-content: space-between;
}

.page__wrapper {
    display: flex;
    justify-content: center;
    gap: 10px;

}

.page {
    border: 1px solid black;
    padding: 5px;
}

.current-page {
    background-color: blueviolet;
}
</style>