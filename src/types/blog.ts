export interface Blog {
    id: string
    title: string
    content: string
    date: Date
}

export interface BlogFormData {
    title: string
    content: string
    date: Date | undefined
}
