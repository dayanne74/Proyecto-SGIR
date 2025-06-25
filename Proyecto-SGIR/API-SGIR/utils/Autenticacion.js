const bcrypt = requite('bcryptjs');
const SALT_ROUNDS = 10;

const contrasenaHash = await bcrypt.hash(body.contrasenaHash, SALT_ROUNDS).catch(err => {
    throw new Error('Error al hashear la contraseña');
});

let usuario = new usuario({
    correo: body.correo,
    contrasenaHash: contrasenaHash, //Guardar el hash en lugar de la contraseña real//
});