const express = require('express');
const cors = require('cors');

const dbConnection  = require('../database/config');
const User = require('./user');
const Role = require('./role');

//-------------TratamienPo--
const Person = require('./person');
//const Vacation = require('./vacation');
const DetalleVenta = require('./detalleventa');
// const Treatment = require('./treatment');
const newRol = {
    name: 'ADMINISTRADOR',
    name: 'SECRETARIA',
    name: 'CAJERO',
};
const newPerson = {
    name: 'Rodriguez',
    last_name: 'Pérez',
    ci: 1234567,
    cellphone: 98765432,
    gender: 'M',
};
const newUser = {
    role_id: 1,// La ID del
    person_id: 1,
    email: 'admin@gmail.com',
    password: 'admin147',
    state: true
};


class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/users';
        this.authPath     = '/api/auth';
        this.rolesPath     = '/api/roles';
        this.personPath     = '/api/persons';
        this.platoPath = '/api/plato';
        this.ventaPath = '/api/venta';
        //this.ventaPath = '/api/ventas';
        this.reportePath = '/api/reporte';

        //----------------------------------------

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();
        this.app.use('/img', express.static('img'));
        // Rutas de mi aplicación
        this.routes();
    }

    // async conectarDB() {
    //     await dbConnection();
    // }

    async conectarDB(){
        try {
            await dbConnection.authenticate();
            // await dbConnection.sync();// para crear nuevos tablas general
            //await dbConnection.sync(DetalleVenta);// para crear nuevos tablas solas
            //await Role.create(TipoCita);
            await this.inicializarDatos();
            console.log("conectado a la base de datos");
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // this.app.use(cors({
        // origin: 'http://localhost:4200'
        // }));
        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usuariosPath, require('../routes/users'));
        this.app.use( this.rolesPath, require('../routes/roles'));
        this.app.use( this.personPath, require('../routes/persons'));
        //this.app.use( this.vacationPath, require('../routes/vacations'));
        // this.app.use( this.dentistPath, require('../routes/dentists'));
        //-----------------------------------------------------------
        this.app.use( this.platoPath, require('../routes/platos'));
        this.app.use( this.ventaPath, require('../routes/ventas'));
        //this.app.use( this.ventaPath, require('../routes/ventas'));
        this.app.use( this.reportePath, require('../routes/reportes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
    //----PARA INICIAR SESION POR PRIMERA VES--
    async inicializarDatos() {
        try {
            // Verificar si hay roles registrados
            const countRoles = await Role.count();
            if (countRoles === 0) {
                await Role.bulkCreate([
                    { name: "ADMINISTRADOR" },
                    { name: "SECRETARIA" },
                    { name: "CAJERO" },
                ]);
                console.log("Roles registrados correctamente.");
            }
    
            // Verificar si hay personas registradas
            const countPersons = await Person.count();
            if (countPersons === 0) {
                await Person.create({
                    name: "Rodriguez",
                    last_name: "Pérez",
                    ci: 1234567,
                    cellphone: 98765432,
                    gender: "M",
                });
                console.log("Persona registrada correctamente.");
            }
    
            // Verificar si hay usuarios registrados
            const countUsers = await User.count();
            if (countUsers === 0) {
                await User.create({
                    role_id: 1,
                    person_id: 1,
                    email: "admin@gmail.com",
                    password: "admin147",
                    state: true,
                });
                console.log("Usuario registrado correctamente.");
            }
    
        } catch (error) {
            console.error("Error al inicializar los datos:", error);
        }
    }

}

module.exports = Server;
