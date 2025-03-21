export interface User {
    user: UserInfo
    token: string
}

export interface UserInfo {
    id: number
    account_type: string
    email: string
    admin: Admin
    employer: Employer
}

export interface Admin {
    id: number
    name: string
    email: string
}

export interface Employer {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string
    function: string
    billing_email: string
    kvk_number: string
    organization: string
    address: string
    location: string
    postcode: string
    created_at: string
}