/**
 * Calcula normales "hacia fuera desde el centro". Las tangentes se hacen planas en XZ
 * @param {type} vert                       Array de vertices, 3 indices por elemento
 * @returns {NormalData}
 */
function normalDataRadial(vert)
{
    var vNorm = [];
    var vTg = [];
    var rotm = mat4.create();
    mat4.rotate(rotm, rotm, Math.PI/2, [0,1,0]);
    for (var i = 0; i < vert.length; i+=3)
    {
        var v3 = vec3.fromValues(vert[i],vert[i+1],vert[i+2]);
        vec3.normalize(v3, v3);
        vNorm.push(v3[0]);
        vNorm.push(v3[1]);
        vNorm.push(v3[2]);
        
        v3 = vec3.fromValues(vert[i],0,vert[i+2]);
        vec3.normalize(v3, v3);
        vec3.transformMat4(v3, v3, rotm);
        vTg.push(v3[0]);
        vTg.push(v3[1]);
        vTg.push(v3[2]);        
    }
    return new NormalData(vNorm, vTg);
}

/**
 * Calcula normales via producto vectorial de restas
 * @param {type} vert           Array de vertices
 * @returns {NormalData}
 */
function normalesAutomaticas(vert)
{
    var vNorm = [];
    var vTg = [];
    for (var i = 0; i < vert.length; i += 9)
    {
        var norm = vec3.create();
        var va = vec3.create();
        var vb = vec3.create();
        var v1 = vec3.fromValues(vert[i],vert[i+1],vert[i+2]);
        var v2 = vec3.fromValues(vert[i+3],vert[i+4],vert[i+5]);
        var v3 = vec3.fromValues(vert[i+6],vert[i+7],vert[i+8]);
        vec3.sub(va, v2, v1);
        vec3.sub(vb, v3, v1);
        vec3.cross(norm, va, vb);
        vec3.normalize(norm, norm);
        vec3.normalize(va, va);
        for (var j = 0; j < 3; ++j)
        {
            vNorm.push(norm[0]);
            vNorm.push(norm[1]);
            vNorm.push(norm[2]);
            vTg.push(va[0]);
            vTg.push(va[1]);
            vTg.push(va[2]);
        }
    }
    return new NormalData(vNorm, vTg);
}

/**
 * Crea un array del largo pedido repetiendo esa cantidad de instancias del array repeticion
 * @param {type} largo                      Cantidad de veces que se repetira la repeticion
 * @param {type} repeticion                 Array a repetir
 * @returns {vectorRepetitivo.vNorm|Array}
 */
function vectorRepetitivo(largo, repeticion)
{
    var rep = [];
    for (var i = 0, count = largo*repeticion.length; i < count; ++i)
    {
        rep.push(repeticion[i%repeticion.length]);
    }
    return rep;
}