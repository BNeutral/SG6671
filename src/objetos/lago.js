function Lago()
{
    Objeto.call(this,null,null);
    var cVerts = [-3,0,3, -2,0,5, 2,0,5, 3,0,3,
                    4,0,1,  8,0,0,  8,0,-3,
                    6,0,-5,   4,0,-7,   1,0,-7,
                    -2,0,-7,   -5,0,-5,   -4,0,-3,
                    -2,0,-2,  -4,0,1,   -3,0,3];
    var curva = new BezierConcat(cVerts,3).objLinea(128, "texturas/pixel.png");
    curva.malla.vertices.unshift(0);
    curva.malla.vertices.unshift(0);
    curva.malla.vertices.unshift(0);
    for (var i = 0; i < curva.malla.indices.length; ++i) curva.malla.indices[i] += 1;
    curva.malla.indices.unshift(0);
    curva.textura.vNormals.push(0);
    curva.textura.vNormals.push(0);
    curva.textura.vNormals.push(1);
    curva.textura.uvCoord.push(1);
    curva.textura.uvCoord.push(1);
    curva.modoRenderizado = gl.TRIANGLE_FAN;
    curva.textura.hueRamp(0.55,0.8,0.2);
    curva.setUpGL();
    mat4.translate(curva.matrices, curva.matrices, [0,0.1,0]);
    this.hijos.push(curva);
}

heredarPrototype(Lago, Objeto);