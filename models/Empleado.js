class Empleado {
    constructor(cc, nombresyApellidos, direccion, email, telefono, sueldoBase, tipoEmpleado, tipoBonificacion) {
        this.cc = cc;
        this.nombresyApellidos = nombresyApellidos;
        this.direccion = direccion;
        this.email = email;
        this.telefono = telefono;
        this.sueldoBase = sueldoBase;
        this.tipoEmpleado = tipoEmpleado;
        this.tipoBonificacion = tipoBonificacion;
    }
}

class Contrato extends Empleado {
    constructor(tiempoContrato) {
        super();
        this.tiempoContrato = tiempoContrato;
    }
}