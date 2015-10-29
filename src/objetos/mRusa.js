function MRusa()
{
    Objeto.call(this,null,null);
    var grado = 3;
    var puntos = [-9,1,2, -8,1,0, -8,1,-2, -6,1,-3,
                        -4,1,-4,  -2,2,-3,  -2,4,-1,
                        -2,6,1,   0,8,2,   2,7,3,
                        4,6,4,   6,6,3,   8,6,3,
                        10,6,3,   11,6,1,  12,7,-1,
                        13,8,-3,   12,8,-5,   10,7,-5,
                        8,6,-5,   6,6,-4,   4,5,-3,
                        2,4,-2,   0,4,-2,  -1,4,0,
                        -2,4,2,   -2,4,4,  -4,4,5,
                        -6,4,5,   -8,1,4,  -9,1,2];
    this.curva = new BezierConcat(puntos,grado);
    this.hijos.push(this.curva.objLinea(128, null));
    for (var i = 0; i < puntos.length; i += 3*grado)
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
}

heredarPrototype(MRusa, Objeto);