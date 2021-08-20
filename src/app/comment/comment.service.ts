import {Comment} from "@entity/Comment";
import {EntityType, Like} from "@entity/Like";
import {checkUserToken} from "../helpers";
import {CommentEditT} from "./types";


export const getCommentData = async (id: number) => {
    return await Comment.findOne({id: id})
}

export const getCommentLikes = async (id: number) => {
    const comment = await Comment.findOne({id: id})
    if (comment) {
        const likes = await Like.findAndCount({
            where: {
                content: EntityType.comment,
                entity_id: comment.id
            }
        })
        return likes
    }
}

export const likeComment = async (id: number, token: string) => {
    const tokenData = checkUserToken(token)

    const comment = await Comment.findOne({id: id})
    if (comment) {
        const like = new Like()
        like.content = EntityType.comment
        like.entity_id = id
        like.author = tokenData.id
        await like.save()
        return like
    }
}

export const editComment = async (id: number, data: CommentEditT, token: string) => {
    const tokenData = checkUserToken(token)

    const comment = await Comment.findOne({id: id})
    if (comment) {
        if (tokenData.id !== comment.author) {
            return 1
        }
        comment.content = data.content
        await comment.save()
        return comment
    }
}

export const deleteComment = async (id: number, token: string) => {
    const tokenData = checkUserToken(token)

    const comment = await Comment.findOne({id: id})
    if (comment) {
        if (tokenData.id !== comment.author) {
            return 1
        }
        await comment.remove()
        return
    }
    return 1
}

export const deleteLike = async (id: number, token: string) => {
    const tokenData = checkUserToken(token)

    const comment = await Comment.findOne({id: id})
    if (comment) {
        const like = await Like.findOne({
            where: {
                content: EntityType.comment,
                entity_id: comment.id,
                author: tokenData.id
            }
        })
        if (!like) {return 1}
        await like.remove()
        return
    }
    return 2
}