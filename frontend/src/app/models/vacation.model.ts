export class Vacations{

    constructor(
        
        public id: number,
        public vacation_id: number,
        public start_date: Date,
        public end_date: Date,
        public total_day: number,
        public reason: string,
        public observations: string,
        public user_id: number,
        public name: string,
        public last_name: string,
        public ci: number,
        public cellphone: string,
        public gender: string,
        public email: string,
        public entry_date: number,
        public createdAt: Date,
        public updatedAt: Date

    ){}
}