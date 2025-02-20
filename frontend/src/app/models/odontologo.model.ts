//import

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

interface TreatmentDetail {
    id: number;
    dentist_id: number;
    treatment_id: number;
    createdAt: Date;
    updatedAt: Date;
}

export class Odontologo{

    constructor(
        
        public id: number,
        public state: boolean,
        public person: Persona,
        public detalles: TreatmentDetail[]

    ){}
}