export interface user {
    id: string,
    firstName:string,
    lastName: string,
}

let Users: Array<user> = [
    {
        id:"user-0",
        firstName: "John",
        lastName:"Doe"
    },
    {
        id:"user-1",
        firstName: "Maria",
        lastName:"Smith"
    },
]

export {Users};