export interface IPerson {
    fullname: string;
    age: number;
    abilities: IPersonAblility[];
}

export interface IPersonAblility {
    ability: string;
}
