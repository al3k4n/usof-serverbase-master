import {Body, Controller, Delete, Get, Header, Path, Post, Put, Route, Tags} from 'tsoa';
import {deleteComment, deleteLike, editComment, getCommentData, getCommentLikes, likeComment} from "./comment.service";
import {CommentEditT} from "./types";

@Tags('User')
@Route('/api/comment')
export class CommentController extends Controller {

    @Get('/{id}')
    public async getCommentDataEndpoint(
        @Path('id') id: number
    ) {
        return await getCommentData(id)
    }

    @Get('/{id}/like')
    public async getCommentLikesEndpoint(
        @Path('id') id: number
    ) {
        return await getCommentLikes(id)
    }

    @Post('/{id}/like')
    public async likeCommentEndpoint(
        @Path('id') id: number,
        @Header('Authorization') authHeader: any
    ) {
        return await likeComment(id, authHeader)
    }

    @Put('/{id}')
    public async updateCommentEndpoint(
        @Path('id') id: number,
        @Body() body: CommentEditT,
        @Header('Authorization') authHeader: any
    ) {
        const result = await editComment(id, body, authHeader)
        if (typeof result === 'number') {
            this.setStatus(400)
            return
        }
        return result
    }

    @Delete('/{id}')
    public async deleteCommentEndpoint(
        @Path('id') id: number,
        @Header('Authorization') authHeader: any
    ) {
        const result = await deleteComment(id, authHeader)
        if (typeof result === 'number') {
            this.setStatus(400)
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
        }
    }
}