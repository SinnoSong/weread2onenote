export interface OneNoteSectionsResult {
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
    pagesUrl: string
    createdBy: CreatedBy
    lastModifiedBy: LastModifiedBy
    "parentNotebook@odata.context": string
    parentNotebook: ParentNotebook
    "parentSectionGroup@odata.context": string
    parentSectionGroup: any
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

export interface ParentNotebook {
    id: string
    displayName: string
    self: string
}
