import {Body, Controller, Delete, Get, Path, Post, Put, Route, Tags} from 'tsoa';
import {createCat, deleteCat, editCat, getAllCategories, getCatData} from "./category.service";
import {CreateCatT, EditCatT} from "./types";

@Tags('User')
@Route('/api/category')
export class CategoryController extends Controller {

    @Get('/')
    public async allCategoriesEndpoint() {
        return await getAllCategories()
    }

    @Get('/{id}')
    public async allCategoriesDataEndpoint(
        @Path('id') id: number,
    ) {
        return await getCatData(id)
    }

    // @Get('/{cat_id}/posts')
    // public async allPostsRelatedToCategoriesEndpoint(
    //     @Path('id') id: number,
    // ) {
    //     return await getCatData(id)
    // }

    @Post('/')
    public async createNewCatEndpoint(
        @Body() body: CreateCatT
    ) {
        const result = await createCat(body)
        return result
    }

    @Put('/{id}')
    public async editCatEndpoint(
        @Path('id') id: number,
        @Body() body: EditCatT
    ) {
        const result = await editCat(id, body)
        return result
    }

    @Delete('/{id}')
    public async deleteCatEndpoint(
        @Path('id') id: number,
    ) {
        return await deleteCat(id)
    }
}