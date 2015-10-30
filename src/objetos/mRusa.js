function MRusa()
{
    Objeto.call(this,null,null);
    var grado = 3;
    var puntos = [-9,1,4, -8,1,0, -8,1,-2, -6,1,-3,
                        -4,1,-4,  -2,2,-3,  -2,4,-1,
                        -2,6,1,   0,8,2,   2,7,3,
                        4,6,4,   6,6,3,   8,6,3,
                        10,6,3,   11,6,1,  12,7,-1,
                        13,8,-3,   12,8,-5,   10,7,-5,
                        8,6,-5,   6,6,-4,   4,5,-3,
                        2,4,-2,   0,4,-2,  -1,4,0,
                        -2,4,2,   -2,5,4,  -4,4,5,
                        -6,3,6,   -10,1,8,  -9,1,4];
    this.curva = new BezierConcat(puntos,grado);
    this.hijos.push(this.curva.objLinea(128, null));
    
    for (var i = 0; i < puntos.length; i += 3*grado) // Parantes
    {
        var cil = new Cilindro(8, 0, "texturas/pixel.png");
        mat4.translate(cil.matrices, cil.matrices, [puntos[i], puntos[i+1]/2, puntos[i+2]]);
        mat4.rotate(cil.matrices, cil.matrices, Math.PI/2, [1,0,0]);
        mat4.scale(cil.matrices, cil.matrices, [0.15,0.15,puntos[i+1]/2]);
        cil.hijos[0].textura.hueRamp(0.4,0.8,0.2);
        cil.hijos[1].textura.hueRamp(0.4,0.8,0.2);
        cil.hijos[2].textura.hueRamp(0.4,0.8,0.2);
        this.hijos.push(cil);
    }
    
    var pCirculoMedio = Circulo(8, 0.25, [0,0,0]);
    var pCirculoChico1 = Circulo(8, 0.1, [0,0.3,0.4]);
    var pCirculoChico2 = Circulo(8, 0.1, [0,0.3,-0.4]);
    var vNorm = normalesRadiales(pCirculoMedio);
    this.hijos.push(this.curva.supBarrido(pCirculoMedio, 128, vNorm));
    this.hijos.push(this.curva.supBarrido(pCirculoChico1, 128, vNorm));
    this.hijos.push(this.curva.supBarrido(pCirculoChico2, 128, vNorm));
    
    var triDer = [0,0,0, 0,0.3,0, 0,0.3, 0.4];
    var triIzq = [0,0,0, 0,0.3,0, 0,0.3, -0.4];
    var tid = [0,1,2];
    var tuv = [0,0,0,1,1,1];
    var tnorm = [1,0,0,1,0,0,1,0,0];
    this.hijos.push(this.curva.supRepetida(triDer, tid, tuv, tnorm,128));
    this.hijos.push(this.curva.supRepetida(triIzq, tid, tuv, tnorm,128));
    
    var carro = new Carro();
    mat4.translate(carro.matrices,carro.matrices,[0,0.4,0]);
    mat4.scale(carro.matrices,carro.matrices,[0.4,0.4,0.4]);
    var recorredor = new SigueCurva(this.curva, 0.03, carro);
    this.hijos.push(recorredor);
    
    var ejes = new Ejes();
    mat4.scale(ejes.matrices,ejes.matrices,[3,3,3]);
    this.hijos.push(new SigueCurva(this.curva, 0.05, ejes));
}

heredarPrototype(MRusa, Objeto);

/**
 * Devuelve un array de vertices [x1,y1,z1,x2,y2,z2,...] con puntos que forman un criculo en el plano YZ (repitiendo el ultimo)
 * @param {type} radio
 * @param {type} offset
 * @returns {undefined}
 */
function Circulo(divisiones, radio, offset)
{
    if (!offset) offset = [0,0,0];
    var vertices = [];
      
    for (var i = 0; i <= divisiones; ++i)
    {
        var angulo = 2*Math.PI*(i/divisiones);
        vertices.push(offset[0]);
        vertices.push(radio*Math.cos(angulo)+offset[1]);
        vertices.push(radio*Math.sin(angulo)+offset[2]);           
    }
    
    return vertices;
}