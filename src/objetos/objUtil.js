/**
 * Calcula normales "hacia fuera desde el centro" para el 
 * @param {type} vert                       Array de vertices, 3 indices por elemento
 * @returns {Array|normalesRadiales.vNorm}
 */
function normalesRadiales(vert)
{
    var vNorm = [];
    for (var i = 0; i < vert.length; i+=3)
    {
        var v3 = vec3.fromValues(vert[i],vert[i+1],vert[i+2]);
        vec3.normalize(v3, v3);
        vNorm.push(v3[0]);
        vNorm.push(v3[1]);
        vNorm.push(v3[2]);
    }
    return vNorm;
}

/**
 * Calcula normales via producto vectorial de restas entre los primeros 3 elementos
 * @param {type} vert           Array de vertices
 * @param {type} numPorGrupo    Vertices consecutirvos que tendran la misma normal
 * @returns {Array|normalesAutomaticas.vNorm}
 */
function normalesAutomaticas(vert, numPorGrupo)
{
    var vNorm = [];
    for (var i = 0; i < vert.length; i += numPorGrupo*3)
    {
        var norm = vec3.create();
        var va = vec3.create();
        var vb = vec3.create();
        var v1 = vec3.fromValues(vert[i],vert[i+1],vert[i+2]);
        var v2 = vec3.fromValues(vert[i+3],vert[i+4],vert[i+5]);
        var v3 = vec3.fromValues(vert[i+6],vert[i+7],vert[i+8]);
        vec3.sub(va, v1, v2);
        vec3.sub(vb, v1, v3);
        vec3.cross(norm, va, vb);
        vec3.normalize(norm, norm);
        for (var j = 0; j < numPorGrupo; ++j)
        {
            vNorm.push(norm[0]);
            vNorm.push(norm[1]);
            vNorm.push(norm[2]);
        }
    }
    return vNorm;
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