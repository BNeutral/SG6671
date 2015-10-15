/**
 * Calcula normales "hacia fuera desde el centro" para el 
 * @param {type} vert                       Array de vertices, 3 indices por elemento
 * @returns {Array|normalesRadiales.vNorm}
 */
function normalesRadiales(vert)
{
    var vNorm = [];
    for (var i = 0, count = vert.length; i < count; i+=3)
    {
        var v3 = vec3.fromValues(vert[i],vert[i+1],vert[i+2]);
        vec3.normalize(v3, v3);
        vNorm.push(v3.x,v3.y, v3.z);
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