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
 * Calcula normales via producto vectorial de restas. Asume centro en 0,0,0
 * @param {type} vert           Array de vertices
 * @returns {NormalData}
 */
function normalesAutomaticas(vert, indices)
{
    var vNorm = [];
    var vTg = [];
    for (var i = 0; i < vert.length; i += 9)
    {
        var norm = vec3.create();
        var va = vec3.create();
        var vb = vec3.create();
        var v1 = vec3.fromValues(vert[indices[i]*3],vert[indices[i]*3+1],vert[indices[i]*3+2]);
        var v2 = vec3.fromValues(vert[indices[i+1]*3],vert[indices[i+1]*3+4],vert[indices[i+1]*3+5]);
        var v3 = vec3.fromValues(vert[indices[i+2]*3+6],vert[indices[i+2]*3+7],vert[indices[i+2]*3+8]);
        vec3.sub(va, v2, v1);
        vec3.sub(vb, v3, v1);
        vec3.cross(norm, va, vb);
        vec3.normalize(norm, norm);
        vec3.normalize(va, va);
        var out = vec3.dot(norm, norm);
        if (out < 0) vec3.negate(norm, norm);
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
 * @param {type} numeroRepeticiones             Cantidad de veces que se repetira la repeticion
 * @param {type} array                          Array a repetir
 * @returns {vectorRepetitivo.vNorm|Array}
 */
function vectorRepetitivo(numeroRepeticiones, array)
{
    var rep = [];
    for (var i = 0, count = numeroRepeticiones*array.length; i < count; ++i)
    {
        rep.push(array[i%array.length]);
    }
    return rep;
}

/**
 * Dado un array de vertices [x1,y1,z1,x2,...] de origen, uno de destino y una matriz 4x4
 * Aplica la transformacion al vertice y pone el nuevo vertice en el array de destino
 * @param {type} origArray      Array de origen de vertices
 * @param {type} destArray      Array al cual se le agregara el elemento al final
 * @param {type} indice            Indice para obtener el vertice del array origne
 * @param {type} matriz         Matriz
 * @returns {undefined}
 */
function vertTransformPush(origArray, destArray, indice, matriz)
{
    var v3 = arrayV3(origArray,indice);
    vec3.transformMat4(v3, v3, matriz);
    v3toArray(v3, destArray);
}

/**
 * Pone un v3 al final de un array de vertices estilo [x1,y1,z1,x2,y2,z2,..etc]
 * @param {type} v3         Vec3
 * @param {type} destArray  Array de destino
 * @returns {undefined}
 */
function v3toArray(v3, destArray)
{
    destArray.push(v3[0]);
    destArray.push(v3[1]);
    destArray.push(v3[2]);
}
    
    
/**
 * Dado dos arrays de vertices [x1,y1,z1,x2,...] y 2 indices, calcula la distancia entre vectores
 * @param {type} array1     Array donde se usara el indice 1
 * @param {type} indice1
 * @param {type} array2     Array donde se usara el indice 2
 * @param {type} indice2
 * @returns {Number}        Distancia euclidea
 */
function arrayDist(array1, indice1, array2, indice2)
{
    var v1 = arrayV3(array1,indice1);
    var v2 = arrayV3(array2,indice2);
    return vec3.distance(v1,v2);
}

/**
 * Dado un array de vertices [x1,y1,z1,x2,...] y 1 indices, devuelve el vec3 asociado al indice
 * @param {type} array      Array de vertices
 * @param {type} indice     Indice
 * @returns {vec3}
 */
function arrayV3(array, indice)
{
    return vec3.fromValues(array[indice], array[indice+1], array[indice+2]);
}