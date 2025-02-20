export interface RegisterFormUsuario {
  role_id:    number;
  email:      string;
  password:   string;
  name:    string;
  last_name: string;
  ci:    number;
  cellphone: number;// aumente esto
  //end_date:  Date;
  gender: string;
  createdAt:  Date;
  updatedAt:  Date;
}