import axios from "axios";
import { ref, onMounted } from "vue";

export function usePosts(limit){
    const posts = ref([])
    const totalPages = ref(0)
    const isPostLoading = ref(false)

    const fetchPosts = async () => {
        try {
           isPostLoading.value = true
           const response = await axios.get('https://jsonplaceholder.typicode.com/posts', { params: {
               _page: 1,
               _limit: limit
           }})
           posts.value = response.data.map(post=> {
               return {
                   id: post.id,
                   name: post.title,
                   description: post.body
               }
           })
           totalPages.value= Math.ceil(response.headers['x-total-count'] / limit)
        } catch (error) {
            
        } finally {
            isPostLoading.value = false
        }
    }

    onMounted(fetchPosts)

    return {
        posts, totalPages, isPostLoading, 
    }
}