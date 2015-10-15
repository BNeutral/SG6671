/**
 * Retorna un cubo objeto de 2x2x2 (-1 a 1 en todo sentido)
 * TODO: Coordenadas uv y coloreo de vertices
 * @returns {Objeto}
 */
function Cubo()
{
    var vert = [-1.0,-1.0,-1.0, -1.0,1.0,-1.0, 1.0,1.0,-1.0, 1.0,-1.0,-1.0, -1.0,-1.0,1.0, -1.0,1.0,1.0, 1.0,1.0,1.0, 1.0,-1.0,1.0];
    var ind = [0,1,3,2,6,1,5,0,4,3,7,6,4,5];  
    var vNorm = normalesRadiales(vert);
    var uv = [0.0,0.0, 0.0,1.0, 1.0,1.0, 1.0,0.0, 0.0,0.0, 0.0,1.0, 1.0,0.0, 1.0,1.0];
    Objeto.call(this,new Malla(vert, vectorRepetitivo(vert.length,[1.0,1.0,1.0,1.0]), ind), new Textura(vNorm, uv, null));
    mat4.translate(this.matrices, this.matrices, [0,1,0]);
}

heredarPrototype(Cubo, Objeto);