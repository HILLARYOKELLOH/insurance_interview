import { UserInfo } from "../../auth/entities/user"

export interface Upload {
    id?: number
    name: string
    email: string
    document_url: string
    user: UserInfo
    created_at?: Date
    created_by: string
}