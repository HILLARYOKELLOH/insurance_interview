export interface Employee {
    id?: number
    employer_id: number
    first_name: string
    last_name: string
    email: string
    dob: string
    is_internal: boolean
    ext_organization: string
    created_at: Date
}