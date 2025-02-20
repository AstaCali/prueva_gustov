const { response } = require('express')


const esAdminRole = ( req, res = response, next ) => {
    
    if ( !req.usuario ) {
        //console.log('LLEGAAA:',req.usuario)
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }
    //const usuario = await User.findById();
    const { Role } = req.usuario;
    
    if ( Role !== 'Administrador' ) {
        return res.status(401).json({
            msg: `No eres administrador - No puedes hacer esto`
        });
    }
    // const { role_id, person_id } = req.usuario;
    
    // if ( role_id !== 1 ) {
    //     return res.status(401).json({
    //         msg: `${ person_id } no es administrador - No puede hacer esto`
    //     });
    // }

    next();
}


const tieneRole = ( ...roles  ) => {
    return (req, res = response, next) => {
        
        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.usuario.Role ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }
        // if ( !roles.includes( req.usuario.role_id ) ) {
        //     return res.status(401).json({
        //         msg: `El servicio requiere uno de estos roles ${ roles }`
        //     });
        // }


        next();
    }
}



module.exports = {
    esAdminRole,
    tieneRole
}