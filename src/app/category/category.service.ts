import {Category} from "@entity/Category";
import {Post} from "@entity/Post";
import {getConnection} from "typeorm";
import {CreateCatT, EditCatT} from "./types";


export const getAllCategories = async () => {
    return await Category.find()
}

export const getCatData = async (id: number) => {
    return await Category.findOne({id: id})
}

// export const getRelatedToCatPosts = async (id: number) => {
//     const cat = await Category.findOne({id: id})
//     if (cat) {
//         const posts = await getConnection()
//             .createQueryBuilder()
//             .select('post')
//             .from(Post, 'post')
//     }
// }

export const createCat = async (data: CreateCatT) => {
    const cat = new Category()
    cat.title = data.title
    cat.description = data.description ? data.description : ""
    await cat.save()
    return cat
}

export const editCat = async (id:number, data: EditCatT) => {
    const cat = await Category.findOne({id: id})
    if (cat) {
        cat.title = data.title
        cat.description = data.description ? data.description : cat.description
        await cat.save()
        return cat
    }
}

export const deleteCat = async (id: number) => {
    const cat = await Category.findOne({id: id})
    await cat?.remove()
}