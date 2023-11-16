import Main from '@/pages/Main'
import Posts from '@/pages/Posts'
import About from '@/pages/About'
import Post from '@/pages/Post'
import PostWithStorage from '@/pages/PostWithStorage'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: Posts
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: Post
    },
    {
        path: '/store',
        component: PostWithStorage
    }
]

const router = createRouter({ routes, history: createWebHistory(process.env.BASE_URL)})

export default router