export interface NotebookVO {
    bookId: string
    title: string
    author: string
    cover: string
    version: number
    format: string
    type: number
    price: number
    originalPrice: number
    soldout: number
    bookStatus: number
    payType: number
    centPrice: number
    finished: number
    maxFreeChapter: number
    free: number
    mcardDiscount: number
    ispub: number
    extra_type: number
    cpid: number
    publishTime: string
    categories: Array<Category>
    hasLecture: number
    lastChapterIdx: number
    paperBook: PaperBook
    blockSaveImg: number
    language: string
    hideUpdateTime: boolean
}

export interface PaperBook {
    skuId: string
}
export interface Category {
    categoryId: number
    subCategoryId: number
    categoryType: number
    title: string
}

export interface BookWithReviewAndMark {
    bookId: string
    book: NotebookVO
    reviewCount: number
    reviewLikeCount: number
    reviewCommentCount: number
    noteCount: number
    bookmarkCount: number
    sort: number
}

export interface NotebooksPageVO {
    books: Array<BookWithReviewAndMark>
    noBookReviewCount: number
    synckey: number
    totalBookCount: number
}