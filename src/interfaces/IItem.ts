export interface IItem {
    id: string
    title: string,
    user: string,
    downloads: number,
    loves: number,
    file: {
        id: string,
        name: string,
        type: string,
        extention: string
    }
    date: string,

}