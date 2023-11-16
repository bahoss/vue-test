import axios from "axios"

export const postModule = {
    state: () => ({
        posts: [ ],
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
    }),
    getters: {

        sortedPosts(state) {
            console.log({q:state.selectedSort})
            return [...state.posts].sort((post1, post2) => {
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            })
        },
        sortedAndSearchedPosts(state, getters) {
            console.log({s: state.searchQuery})
            return getters.sortedPosts.filter(post => post.name.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }

    },
    mutations: {
        setPosts(state, posts){
            state.posts = posts
        },
        setLoading(state, bool){
            state.isPostLoading = bool
        },
        setPage(state, page){
            state.page = page
        },
        setSelectedSort(state, sort){
            console.log({sort})
            state.selectedSort = sort
        },
        setTotalPages(state, pages){
            state.totalPages = pages
        },
        setSearchQuery(state, search){
            console.log({search})
            state.searchQuery = search
        },
    },
    actions: {
         async fetchPosts({state, commit}) {
            try {
                console.log('called')
                commit('setLoading', true)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', { params: {
                    _page: state.page,
                    _limit: state.limit
                }})
                const posts = response.data.map(post=> {
                    return {
                        id: post.id,
                        name: post.title,
                        description: post.body
                    }
                })
                commit('setPosts', posts)
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / this.limit))
            } catch (error) {
                console.log(error)
                
            } finally {
                commit('setLoading', false)
            }
        },
        async fetchMorePosts({state, commit}) {
                try {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', { params: {
                        _page: state.page,
                        _limit: state.limit
                    }})
                    const posts = [...state.posts, ...response.data.map(post=> {
                        return {
                            id: post.id,
                            name: post.title,
                            description: post.body
                        }
                    })]
                    commit('setPosts', posts)
                    commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / this.limit))
                } catch (error) {
                    console.log(error)
                } finally {
                    
                }
            }
    },
    namespaced: true
}