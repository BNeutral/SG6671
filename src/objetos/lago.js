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
    this.hijos.push(LagoRodea(curvaParam, 128, 0.2));
    this.contador = 0;
    this.hijos[0].textura.glossiness = 50;
    this.hijos[0].textura.colorEspecular = vec3.fromValues(0.6,0.8,1);
    this.hijos[0].textura.porcentajeEspejo = 0.4;
    this.hijos[0].textura.kNormalMap = 0.1;
}

heredarPrototype(Lago, Objeto);

Lago.prototype.update = function(deltaT) 
{
    this.contador += deltaT;
    this.hijos[0].textura.offsetUV[1] = this.contador / 50;
}

function LagoTope(curvaParam, divisiones, separacion)
{
    var obj = curvaParam.objLinea(divisiones, "texturas/agua.jpg", "texturas/normal_ondas.png");
    obj.malla.vertices.unshift(0,0,0);
    for (var i = 0; i < obj.malla.indices.length; ++i) 
        obj.malla.indices[i] += 1;
    obj.malla.indices.unshift(0);
    obj.normalData.vNormals.unshift(0, 1, 0);
    obj.normalData.vTg.unshift(1, 0, 0);
    obj.normalData.vBinormals.unshift(0, 0, 1);
    obj.textura.uvCoord.unshift(0.5, 0.5);
    
    var uMax = Number.NEGATIVE_INFINITY;
    var uMin = Number.POSITIVE_INFINITY;
    var vMax = Number.NEGATIVE_INFINITY;
    var vMin = Number.POSITIVE_INFINITY;
    for (var i = 0; i < obj.malla.vertices.length; i += 3) 
    {
        var u = obj.malla.vertices[i];
        var v = obj.malla.vertices[i+2];
        if (u > uMax) uMax = u;
        if (u < uMin) uMin = u;
        if (v > vMax) vMax = v;
        if (v < vMin) vMin = v;
    }
    var difU = uMax - uMin;
    var difV = vMax - vMin;
    var j = 0;
    for (var i = 0; i < obj.malla.vertices.length; i += 3) 
    {
        obj.textura.uvCoord[j] = (obj.malla.vertices[i] - uMin)/difU;
        obj.textura.uvCoord[j+1] = (obj.malla.vertices[i+2] - vMin)/difV;
        j += 2;
    }
    obj.modoRenderizado = gl.TRIANGLE_FAN;
    obj.setUpGL();
    mat4.translate(obj.matrices, obj.matrices, [0,separacion,0]);
    return obj;
}

function LagoMedio(curvaParam, divisiones, separacion)
{
    var obj = curvaParam.objLinea(divisiones, "texturas/pixel.png");    
    var translateMat = mat4.create();
    mat4.translate(translateMat, translateMat, [0,separacion,0]);
    for (var i = 0, count = obj.malla.vertices.length; i < count; i += 3)
        vertTransformPush(obj.malla.vertices, obj.malla.vertices, i, translateMat);
    obj.malla.indices = indicesGrilla(divisiones+1,2);
    obj.normalData = normalDataRadial(obj.malla.vertices);
    for (var i = 0, count = obj.textura.uvCoord.length/2; i < count; ++i)
    {
        obj.textura.uvCoord.push(obj.textura.uvCoord[i*2], 1);
    }
    obj.modoRenderizado = gl.TRIANGLE_STRIP;
    
    obj.textura.hueRamp(0.55,0.5);
    obj.setUpGL();
    return obj;
}

function LagoRodea(curvaParam, divisiones, separacion)
{
    var obj = curvaParam.objLinea(divisiones, "texturas/pixel.png", "texturas/ladrillos.jpg");    
    var largoSet = obj.malla.vertices.length;
    
    var translateMat = mat4.create();
    mat4.translate(translateMat, translateMat, [0,separacion,0]);
    for (var i = 0; i < largoSet; i += 3)
        vertTransformPush(obj.malla.vertices, obj.malla.vertices, i, translateMat);
    for (var i = largoSet; i < 2*largoSet; i += 3)
        vertTransformPush(obj.malla.vertices, obj.malla.vertices, i, mIdentidad);
    
    var scaleMat = mat4.create();
    mat4.scale(scaleMat, scaleMat, [1.05,1,1.05]);
    for (var i = 2*largoSet; i < 3*largoSet; i += 3)
        vertTransformPush(obj.malla.vertices, obj.malla.vertices, i, scaleMat);
    for (var i = 3*largoSet; i < 4*largoSet; i += 3)
        vertTransformPush(obj.malla.vertices, obj.malla.vertices, i, mIdentidad);
    
    mat4.scale(scaleMat, mIdentidad, [1.01,1,1.01]);
    mat4.translate(translateMat, scaleMat, [0,-separacion,0]);
    for (var i = 4*largoSet; i < 5*largoSet; i += 3)
        vertTransformPush(obj.malla.vertices, obj.malla.vertices, i, translateMat);
    
    obj.malla.indices = indicesGrilla(divisiones+1,6);

    obj.textura.uvCoord = []

    for (var x = 0; x <= divisiones; ++x)
        obj.textura.uvCoord.push(x/divisiones, 0);
    for (var w = 0; w < 2; ++w)
        for (var x = 0; x <= divisiones; ++x)
            obj.textura.uvCoord.push(x/divisiones, 1/3);
    for (var w = 0; w < 2; ++w)
        for (var x = 0; x <= divisiones; ++x)
            obj.textura.uvCoord.push(x/divisiones, 2/3);
    for (var x = 0; x <= divisiones; ++x)
        obj.textura.uvCoord.push(x/divisiones, 1);

    obj.textura.escalarUV(30,1);
    obj.modoRenderizado = gl.TRIANGLE_STRIP;
    
    var vNorm = [];
    var vTg = [];
    
    for (var i = 0; i < 2*largoSet; i += 3)
    {
        var v = arrayV3(obj.malla.vertices, i);
        vec3.negate(v,v);
        vec3.normalize(v,v);
        vNorm.push(v[0],v[1],v[2]);
        vTg.push(0,1,0);
    }
    for (var i = 2*largoSet; i < 4*largoSet; i += 3)
    {
        var v = arrayV3(obj.malla.vertices, i);
        v[1] = 0;
        vec3.negate(v,v);
        vec3.normalize(v,v);
        vTg.push(v[0],v[1],v[2]);
        vNorm.push(0,1,0);
    }
    for (var i = 4*largoSet; i < 6*largoSet; i += 3)
    {
        var v = arrayV3(obj.malla.vertices, i);
        vec3.normalize(v,v);
        vNorm.push(v[0],v[1],v[2]);
        vTg.push(0,-1,0);
    }
    
    obj.normalData = new NormalData(vNorm, vTg);
    obj.textura.kEspecular = 0.2;
    obj.textura.colorDifuso = vec3.fromValues(0.6,0.5,0.5)
    
    obj.setUpGL();
    return obj;
}