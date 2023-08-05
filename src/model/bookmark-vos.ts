interface UpdatedVO {
    bookId: string
    bookVersion: number
    chapterName: string
    chapterUid: number
    colorStyle: number
    contextAbstract: string
    markText: string
    range: string
    style: number
    type: number
    createTime: number
    bookmarkId: string
}

interface Chapter {
    bookId: string
    chapterUid: number
    chapterIdx: number
    title: string
}

interface Color {
    key: string
    hex: string
}

interface DominateColor {
    hex: string
    hsv: Array<number>
}

interface CoverBoxInfo {
    blurhash: string
    colors: Array<Color>
    dominate_color: DominateColor
    custom_cover: string
    custom_rec_cover: string
}

interface BookVO {
    bookId: string
    version: number
    format: string
    soldout: number
    bookStatus: number
    cover: string
    title: string
    author: string
    coverBoxInfo: CoverBoxInfo
}

interface BookMarksResultVO {
    synckey: number
    updated: Array<UpdatedVO>
    removed: Array<undefined>
    chapters: Array<Chapter>
    book: BookVO
}


export { BookMarksResultVO, BookVO, Chapter, Color, DominateColor, CoverBoxInfo, UpdatedVO }