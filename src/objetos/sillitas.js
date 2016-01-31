/**
 * Crea el objeto de la estructura de las sillas voladoras
 * @param {type} numsillas
 * @param {type} velo
 * @returns {Sillitas}
 */
function Sillitas(numsillas,velo)
{
    Objeto.call(this, null, null);
    
    var base = new BaseSillitas(); 
    
    this.velocidad = velo;
     
    var techo = new TechoSillitasCompleto(numsillas);
    mat4.translate(techo.matrices, techo.matrices, [0,5.5,0]);
    mat4.rotate(techo.matrices, techo.matrices, Math.PI/12, [1,0,0]);


    this.hijos.push(base);
    this.hijos.push(techo);
}

heredarPrototype(Sillitas, Objeto);

/**
 * Rotacion
 */
Sillitas.prototype.update = function(deltaT) 
{
    //Velocidad de rotacion del techo
    var velocidadAngular=this.velocidad;

    mat4.rotate(this.matrices, this.matrices, -velocidadAngular*deltaT/4, [0.0,1.0,0.0]);
    mat4.rotate(this.hijos[0].matrices, this.hijos[0].matrices, velocidadAngular*deltaT/4, [0.0,1.0,0.0]);
    mat4.rotate(this.hijos[1].matrices, this.hijos[1].matrices, velocidadAngular*deltaT/8, [0.0,-1.0,0.0]);
 
    Objeto.prototype.update.call(this,deltaT);
};
