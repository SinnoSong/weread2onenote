interface NoteBookTO {
    bookId: string,
    name: string,
    reviewCount: number,
    noteCount: number
}
interface MarkTO {
    chapterName: string,
    color: string,
    // 想法
    content: string,
    // 原文
    abstract: string
}

export { NoteBookTO, MarkTO }
