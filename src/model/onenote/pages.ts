export interface OneNotePagesResult {
    "@odata.context": string
    value: Value[]
}

export interface Value {
    id: string
    self: string
    createdDateTime: string
    title: string
    createdByAppId: string
    contentUrl: string
    lastModifiedDateTime: string
    links: Links
    "parentSection@odata.context": string
    parentSection: ParentSection
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

export interface ParentSection {
    id: string
    displayName: string
    self: string
}
