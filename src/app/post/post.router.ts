import {Body, Controller, Delete, Get, Header, Path, Post, Put, Query, Route, Tags} from "tsoa";
import {
    allPosts,
    createCommentOnPost,
    createPost,
    deleteLike,
    deletePost,
    editPost,
    getCategoriesById,
    getLikesById,
    postById,
    postCommentsById,
    setLike
} from "./post.service";
import {Paginate, PostCreateT} from "./types";

@Tags('Post')
@Route('/api/posts')
export class PostController extends Controller {
    @Get('/')
    public async postsEndpoint(
        @Query('limit') limit: number,
        @Query('offset') offset: number
    ) {
        const pagination: Paginate = {limit: limit, offset: offset}
        return await allPosts(pagination)
    }

    @Get('/{id}')
    public async postByIdEndpoint(
        @Path('id') id: number
    ) {
        return await postById(id)
    }

    @Get('/{id}/comments')
    public async postCommentsByIdEndpoint(
        @Path('id') id: number
    ) {
        return await postCommentsById(id)
    }

    @Post('/{id}/comments')
    public async makePostCommentByIdEndpoint(
        @Path('id') id: number,
        @Body() body: { content: string },
        @Header('Authorization') authHeader: any
    ) {
        return await createCommentOnPost(id, body.content, authHeader)
    }

    @Get('/{id}/categories')
    public async getCategoriesEndpoint(
        @Path('id') id: number,
    ) {
        return await getCategoriesById(id)
    }

    @Get('/{id}/like')
    public async getLikesEndpoint(
        @Path('id') id: number
    ) {
        return await getLikesById(id)
    }

    @Post('/')
    public async createPostEndpoint(
        @Body() body: PostCreateT,
        @Header('Authorization') authHeader: any
    ) {
        const result = await createPost(body, authHeader)
        return result
    }

    @Post('/{id}/like')
    public async likeEndpoint(
        @Path('id') id: number,
        @Header('Authorization') authHeader: any
    ) {
        const result = await setLike(id, authHeader)
        return result
    }

    @Put('/{id}')
    public async editPostEndpoint(
        @Path('id') id: number,
        @Body() body: PostCreateT,
        @Header('Authorization') authHeader: any
    ) {
        const result = await editPost(id, body, authHeader)
        if (typeof result === 'number') {
            this.setStatus(400)
            return
        }
        return result
    }

    @Delete('/{id}')
    public async deletePostEndpoint(
        @Path('id') id: number,
        @Header('Authorization') authHeader: any
    ) {
        const result = await deletePost(id, authHeader)
        if (typeof result === 'number') {
            this.setStatus(400)
            return
        }
    }

    @Delete('/{id}/like')
    public async deleteLikeEndpoint(
        @Path('id') id: number,
        @Header('Authorization') authHeader: any
    ) {
        const result = await deleteLike(id, authHeader)
        if (typeof result === 'number') {
            this.setStatus(400)
            return
        }
    }
}