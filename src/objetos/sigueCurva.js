function SigueCurva(curva, velocidad, objeto)
{
    Objeto.call(this,null,null);
    this.curva = curva;
    this.u = 0;
    
    this.velocidad = velocidad;
    this.hijos.push(objeto);
}

heredarPrototype(SigueCurva, Objeto);

/**
 * Rotacion de la rueda
 */
SigueCurva.prototype.update = function(deltaT) 
{
    this.u += deltaT * this.velocidad;
    this.u = this.u % 1;
    var pos = this.curva.evaluar(this.u);
    mat4.identity(this.matrices);
    mat4.translate(this.matrices, this.matrices, pos);
 
    mat4.mul(this.matrices, this.matrices, this.curva.matrizLocal(this.u));
    Objeto.prototype.update.call(this,deltaT);
};