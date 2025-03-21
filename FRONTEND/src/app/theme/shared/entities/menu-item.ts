export interface MenuItem {
    name: string;
    path?: string;
    icon?: string;
    hidden?: boolean;
    children?: MenuItem[]
}