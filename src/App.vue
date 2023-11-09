<template>  
    <div class="wrapper">
      <my-input v-model="searchQuery" placeholder="Search..."></my-input>
      <post-list v-if="!isPostLoading" :posts="sortedAndSearchedPosts" @remove="removePost"></post-list>
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
      <!-- <div class="page__wrapper">
        <div v-for="pageNumber in totalPages" :key="pageNumber" class="page" :class="{
            'current-page': Number(pageNumber) === page
        }" @click="changePage(pageNumber)">
          {{pageNumber}}
       </div>
      </div> -->
      <div ref="scrollTarget" class="observer"></div>
      

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
                    { name: 'By name', value: 'name' },
                    { name: 'By description', value: 'description' }
                ],
                searchQuery: '',
                page: 1,
                limit: 10,
                totalPages: 0,
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

            changePage(pageNumber) {
                this.page = pageNumber
            },
            
            async fetchPosts() {
                try {
                    this.isPostLoading = true
                   const response = await axios.get('https://jsonplaceholder.typicode.com/posts', { params: {
                       _page: this.page,
                       _limit: this.limit
                   }})
                   this.posts = response.data.map(post=> {
                       return {
                           id: post.id,
                           name: post.title,
                           description: post.body
                       }
                   })
                   this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                } catch (error) {
                    
                } finally {
                    this.isPostLoading = false
                }
            },
            async fetchMorePosts() {
                try {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', { params: {
                       _page: this.page,
                       _limit: this.limit
                   }})
                   this.posts = [...this.posts, ...response.data.map(post=> {
                       return {
                           id: post.id,
                           name: post.title,
                           description: post.body
                       }
                   })]
                   this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                } catch (error) {
                    
                } finally {
                    
                }
            }
            

        },

        mounted() {
            this.fetchPosts()
            console.log(this.$refs.scrollTarget)
            let options = {
                rootMargin: "0px",
                threshold: 1.0,
            };

            const callback = (entries, observer) => {
                if (entries[0].isIntersecting && this.page < this.totalPages) {
                    this.page += 1
                    this.fetchMorePosts()
                }
            };

            let observer = new IntersectionObserver(callback, options);
            observer.observe(this.$refs.scrollTarget);
        },
       
        computed: {
            sortedPosts() {
                return [...this.posts].sort((post1, post2) => {
                    return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
                })
            },
            sortedAndSearchedPosts() {
                return this.sortedPosts.filter(post => post.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
            }
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