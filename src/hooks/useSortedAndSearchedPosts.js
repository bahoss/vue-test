import { computed, ref } from "vue"

export function useSortedAndSearchedPosts(sortedPosts){
    const searchQuery = ref('')
    const sortedAndSearchedPosts = computed(() => {
        return sortedPosts.value.filter(post => post.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })

    return {
        searchQuery, sortedAndSearchedPosts
    }
}