const usuariosBD = require("./conexion").usuarios;
const Usuario = require("../modelos/UsuarioModelo");
const {encriptarPassword,validarPassword,usuarioAutorizado,adminAutorizado}=require("../middlewares/funcionesPassword");

function validarDatos(usuario){
    var valido = false;
    if(usuario.nombre!=undefined && usuario.usuario!=undefined && usuario.password!=undefined){
        valido=true;
    }
    return valido;
}


async function mostrarUsuarios(){
    //sale de java y entra a firebase para los datos
    const usuarios= await usuariosBD.get();
    //console.log(usuarios);
    usuariosValidos=[];
    usuarios.forEach(usuario => {
        const usuario1=new Usuario({id:usuario.id,...usuario.data()}); //spread

        if(validarDatos(usuario1.getUsuario)){
            usuariosValidos.push(usuario1.getUsuario);
        }
        //listaUsuarios.push({id:usuario.id,...usuario.data()});
    });
    
    //console.log(usuariosValidos);
    return usuariosValidos;
}

async function buscarPorID(id) {
    //obtener el id del usuario
    const usuario=await usuariosBD.doc(id).get();
    const usuario1=new Usuario({id:usuario.id,...usuario.data()});
    var usuarioValido;
    if(validarDatos(usuario1.getUsuario)){
        usuarioValido=usuario1.getUsuario;
    }
    console.log(usuarioValido);
    return usuarioValido;
    //console.log(usuario1.getUsuario); //get usuario entrega los datos
}

async function nuevoUsuario(data) {
const {salt,hash}=encriptarPassword(data.password);
    data.password=hash;
    data.salt=salt;
    data.tipoUsuario="usuario";
    const usuario1=new Usuario(data);
    //console.log(usuario1.getUsuario); //saber si llega la informacion
    var usuarioValido=false;
    if(validarDatos(usuario1.getUsuario)){
        await usuariosBD.doc().set(usuario1.getUsuario);
        usuarioValido=true;
    }
    return usuarioValido
}

async function borrarUsuario(id) {
    var usuarioValido = await buscarPorID(id);
    var usuarioBorrado = false;
    if (usuarioValido){
        await usuariosBD.doc(id).delete();
        usuarioBorrado = true;
    }
    return usuarioBorrado;
}

module.exports={
    mostrarUsuarios, 
    nuevoUsuario, 
    borrarUsuario, 
    buscarPorID
}
//valdiar datos es interna

//revisar cuando si existe el usuario, pero el usuario es incorrecto
//borrarUsuario("1QfoNbLHYsfqL3xbEjMD");

/*data={
    nombre:"bethoveen",
    usuario:"musica clasica",
    password:"xyz"
}

async function prueba() {
    console.log(await nuevoUsuario(data));
    
}

//prueba(); */
//nuevoUsuario(data);

//buscarPorID("1QfoNbLHYsfqL3xbEjMD");
//console.log(usuarios);
//mostrarUsuarios();