//Due to TSOA issues
type Category = {
    id: number,
    title: string,
    description: string
}

export type Paginate = {
    limit: number
    offset: number
}

export type PostCreateT = {
    title: string,
    content: string,
    categories: Category[]
}