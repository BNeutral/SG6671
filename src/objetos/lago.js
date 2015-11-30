function Lago()
{
    Objeto.call(this,null,null);
    var cVerts = [-3,0,3, -2,0,5, 2,0,5, 3,0,3,
                    4,0,1,  8,0,0,  8,0,-3,
                    8,0,-6,   4,0,-7,   1,0,-7,
                    -2,0,-7,   -5,0,-5,   -4,0,-3,
                    -3,0,-1,  -4,0,1,   -3,0,3];
    var curvaParam = new BezierConcat(cVerts,3);
    this.hijos.push(LagoTope(curvaParam, 128, 0.1));
    this.hijos.push(LagoMedio(curvaParam, 128, 0.1));
}

heredarPrototype(Lago, Objeto);

Lago.prototype.update = function(deltaT) 
{
    this.hijos[0].textura.offsetUV[1] += deltaT / 10;
    this.hijos[0].textura.offsetUV[1] %= 1;
}

function LagoTope(curvaParam, divisiones, separacion)
{
    var obj = curvaParam.objLinea(divisiones, "texturas/debug.jpg");
    obj.malla.vertices.unshift(0,0,0);
    for (var i = 0; i < obj.malla.indices.length; ++i) obj.malla.indices[i] += 1;
    obj.malla.indices.unshift(0);
    obj.normalData.vNormals.unshift(0, 1, 0);
    obj.normalData.vTg.unshift(1, 0, 0);
    obj.normalData.vBinormals.unshift(0, 0, 1);
    obj.textura.uvCoord.unshift(0.5, 1);
    obj.modoRenderizado = gl.TRIANGLE_FAN;
    obj.textura.hueRamp(0.55,1);
    obj.setUpGL();
    mat4.translate(obj.matrices, obj.matrices, [0,separacion,0]);
    return obj;
}

function LagoMedio(curvaParam, divisiones, separacion)
{
    var obj = curvaParam.objLinea(divisiones, "texturas/pixel.png");
    obj.malla.vertices = obj.malla.vertices.concat(obj.malla.vertices);
    for (var i = divisiones+1; i < obj.malla.vertices.length/3; ++i)
    {
        obj.malla.vertices[i*3+1] += separacion;
    }
    obj.malla.indices = indicesGrilla(divisiones+1,2)
    obj.normalData = normalDataRadial(obj.malla.vertices);
    for (var i = 0, count = obj.textura.uvCoord.length/2; i < count; ++i)
    {
        obj.textura.uvCoord.push(obj.textura.uvCoord[i*2], 1);
    }
    obj.modoRenderizado = gl.TRIANGLE_STRIP;
    
    obj.textura.hueRamp(0.55,0.8,0.2);
    obj.setUpGL();
    return obj;
}
