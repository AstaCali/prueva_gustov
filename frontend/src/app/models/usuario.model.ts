//import

interface Roles {
    id: number;
    name: string;
    createdAt:  Date;
    updatedAt:  Date;
}
interface Persona {
    id: number;
    name: string;
    last_name: string;
    ci: number;
    celular: number;
    gender: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Usuario{

    constructor(
        
        public id: number,
        public email: string,
        public end_date: Date,
        public password: string, // solo por esX4a Vers para editar
        //public role: Roles,
        //public person: Persona,

        public name_role: string,
        public name: string,
        public last_name: string,
        public ci: number,
        public cellphone: number,
        public gender: string,
        public state: Boolean,
        public role_id: number,

        //---obcional pero la listar tienes que hacer asi: en el HtML 
        // public role?: Roles,
        // public person?: Persona,
        // <td>{{ usuario.person?.name }}</td>
        // <td>{{ usuario.person?.last_name }}</td>


        //public password: string,
        //public role_id: number, //--cambiar a number
        // public name?: string,
        // public last_name?: string,
        // public ci?: string, //--cambiar a number
        // public gender?: string

    ){}
}