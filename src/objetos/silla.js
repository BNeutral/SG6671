 
/**
 * Una silla para las sillas voladoras
 */
function Silla(color)
{
    Objeto.call(this, null, null);
    
    var respaldo= new Cubo("texturas/pixel.png");
    mat4.translate(respaldo.matrices, respaldo.matrices, [0,1,-0.9]); 
    //"Aplano" el cubo
    mat4.scale(respaldo.matrices, respaldo.matrices, [1,1,0.1]); 
    respaldo.textura.hueRamp(color, 0.2, 0.8);
    
    
    var asiento= new Cubo("texturas/pixel.png");
    

    mat4.scale(asiento.matrices, asiento.matrices, [1,0.1,1]); 
     
    asiento.textura.hueRamp(color, 1);
    
    this.hijos.push(respaldo);
    this.hijos.push(asiento);
}
heredarPrototype(Silla, Objeto);