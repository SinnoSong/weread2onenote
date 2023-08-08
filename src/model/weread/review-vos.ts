interface ReviewBookVO {
    bookId: string
    format: string
    version: number
    soldout: number
    bookStatus: number
    type: number
    cover: string
    title: string
    author: string
    payType: number
}

interface MedalInfo {
    id: string
    desc: string
    title: string
    levelIndex: number
}

interface Author {
    userVid: number
    name: string
    avatar: string
    isFollowing: number
    isFollower: number
    isHide: number
    medalInfo: MedalInfo
}

interface ReviewDetail {
    abstract: string
    atUserVids: Array<undefined>
    bookId: string
    bookVersion: number
    chapterUid: number
    content: string
    friendship: number
    htmlContent: string
    isPrivate: number
    range: string
    createTime: number
    title: string
    type: number
    reviewId: string
    userVid: number
    topics: Array<undefined>
    isLike: number
    isReposted: number
    book: ReviewBookVO
    chapterIdx: number
    chapterName: string
    chapterTitle: string
    author: Author
}

interface ReviewWithComment {
    reviewId: string
    review: ReviewDetail
    commentsCount: number
    comments: Array<undefined>
    likesCount: number
    likes: Array<undefined>
}

interface ReviewsResult {
    synckey: number
    totalCount: number
    reviews: Array<ReviewWithComment>
    removed: Array<undefined>
    atUsers: Array<undefined>
    refUsers: Array<undefined>
    columns: Array<undefined>
    hasMore: number
}

export { ReviewBookVO, MedalInfo, Author, ReviewDetail, ReviewWithComment, ReviewsResult }
