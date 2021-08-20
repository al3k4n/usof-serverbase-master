import {Post} from "@entity/Post";
import {Paginate, PostCreateT} from "./types";
import {Comment} from "@entity/Comment";
import {checkUserToken} from "../helpers";
import {EntityType, Like} from "@entity/Like";
import {ErrorType} from "../types";


export const allPosts = async (pagination: Paginate) => {
    return await Post.find({skip: pagination.offset, take: pagination.limit})
}

export const postById = async (id: number) => {
    return await Post.findOne({id: id})
}

export const postCommentsById = async (id: number) => {
    return await Comment.find({post: id})
}

export const createCommentOnPost = async (
    id: number,
    content: string,
    token: string
) => {
    const tokenData = checkUserToken(token)

    const post = await Post.findOne({id: id})
    if (post) {
        const comment = new Comment()
        comment.post = post.id
        comment.author = tokenData.id
        comment.content = content
        await comment.save()
        return comment
    }
}

export const getCategoriesById = async (id: number) => {
    const post = await Post.findOne({id: id})
    if (post) {
        return post.categories
    }
}

export const getLikesById = async (id: number) => {
    return await Like.find({entity_id: id, content: EntityType.post})
}

export const createPost = async (data: PostCreateT, token: string) => {
    const tokenData = checkUserToken(token)

    const post = new Post()
    post.title = data.title
    post.content = data.content
    post.author = tokenData.id
    // @ts-ignore
    post.categories = data.categories
    await post.save()
    return post
}

export const setLike = async (id: number, token: string) => {
    const tokenData = checkUserToken(token)

    const like = new Like()
    like.entity_id = id
    like.content = EntityType.post
    like.author = tokenData.id
    await like.save()
    return like
}

export const editPost = async (
    id: number,
    data: PostCreateT,
    token: string
) :Promise<ErrorType | Post> => {
    const tokenData = checkUserToken(token)

    const post = await Post.findOne({id: id})
    if (post) {
        if (post.author != tokenData.id) {
            return 1
        }
        post.title = data.title
        post.content = data.content
        // @ts-ignore
        post.categories = data.categories
        await post.save()
        return post
    }
    return 2
}

export const deletePost = async (
    id: number,
    token: string
) :Promise<ErrorType | undefined> => {
    const tokenData = checkUserToken(token)

    const post = await Post.findOne({id: id})
    if (post) {
        if (post.author !== tokenData.id) {
            return 1
        }
        await post.remove()
        return
    }
}

export const deleteLike = async (
    id: number,
    token: string
) :Promise<ErrorType | undefined> => {
    const tokenData = checkUserToken(token)

    const post = await Post.findOne({id: id})
    if (post) {
        if (post.author !== tokenData.id) {
            return 1
        }
        const like = await Like.findOne({content: EntityType.post, entity_id: post.id})
        if (like) {
            await like.remove()
            return
        }
        return 2
    }
    return 3
}