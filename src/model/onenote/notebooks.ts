export interface OneNoteNoteBooksResult {
    "@odata.context": string
    value: Value[]
}

export interface Value {
    id: string
    self: string
    createdDateTime: string
    displayName: string
    lastModifiedDateTime: string
    isDefault: boolean
    userRole: string
    isShared: boolean
    sectionsUrl: string
    sectionGroupsUrl: string
    createdBy: CreatedBy
    lastModifiedBy: LastModifiedBy
    links: Links
}

export interface CreatedBy {
    user: User
}

export interface User {
    id: string
    displayName: string
}

export interface LastModifiedBy {
    user: User
}

export interface Links {
    oneNoteClientUrl: OneNoteClientUrl
    oneNoteWebUrl: OneNoteWebUrl
}

export interface OneNoteClientUrl {
    href: string
}

export interface OneNoteWebUrl {
    href: string
}
