 
var Piso = function() {
    Objeto.apply(this, arguments);
    
    this.malla;
    this.textura;
    
    if (this.constructor === Objeto ) {
      throw new Error("Can't instantiate abstract class!");
    }
    
    this.malla = new Malla(null, null, null);
    
    this.textura = new Textura(null, null, "texturas/pasto.jpg");
    
    this.matrices = mat4.create();
    mat4.identity(this.matrices);
    this.hijos = [];
    
    this.webgl_normal_buffer;
    this.webgl_texture_coord_buffer;
    this.webgl_position_buffer;
    this.webgl_index_buffer;
    
    this.setUpGL();
    
};

Piso.prototype = Object.create(Objeto.prototype);
Piso.prototype.constructor = Piso;

/* TODO: Borrar despues. */
Piso.prototype.logg = function() {
    console.log('pruebas');
}