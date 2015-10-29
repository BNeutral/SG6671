
function Sillitas()
{
    Objeto.call(this, null, null);
    
    var base = new BaseSillitas();   
     
    var techo = new TechoSillitasCompleto();
    mat4.translate(techo.matrices, techo.matrices, [0,6,0]);
    //mat4.rotate(techo.matrices, techo.matrices, Math.PI/12, [1,0,0]);


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
    var velocidadAngular=2;

    mat4.rotate(this.hijos[1].matrices, this.hijos[1].matrices, velocidadAngular*deltaT, [0.0,-1.0,0.0]);
 
    Objeto.prototype.update.call(this,deltaT);
};
