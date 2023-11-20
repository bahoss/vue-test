<template>  
    <div>
        <div class="app__btns">
         <my-select 
            v-model="selectedSort" 
            :options="sortOptions"
          />
          
      </div>
      <my-input v-model="searchQuery" placeholder="Search..."></my-input>
      <post-list v-if="!isPostLoading" :posts="sortedAndSearchedPosts" @remove="removePost"></post-list>
      <div v-else>Loading...</div>
      <my-dialog v-model:show="dialogVisible">
          <post-form @create="addPost"></post-form>
      </my-dialog>
      <my-button @click="fetchPosts">Fetch</my-button></div>
</template>

<script>
    import PostList from '@/components/PostList.vue';
    import PostForm from '@/components/PostForm.vue';
    import { usePosts } from '@/hooks/usePosts'
    import { useSortedPost } from '@/hooks/useSortedPosts'
    import { useSortedAndSearchedPosts } from '@/hooks/useSortedAndSearchedPosts'
    export default {

        components: {
            PostList,
            PostForm
        },
        data() {
            return {
               
                dialogVisible: false,
                sortOptions: [
                    { name: 'By name', value: 'name' },
                    { name: 'By description', value: 'description' }
                ],
            }
        },
        setup(props){
            const { posts, isPostLoading} = usePosts(10)
            const { selectedSort, sortedPosts} = useSortedPost(posts)
            const { searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)
           
            return {selectedSort, searchQuery, sortedAndSearchedPosts, isPostLoading}
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