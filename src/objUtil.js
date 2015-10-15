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
        var v3 = vec3.fromValues(i,i+1,i+2);
        vec3.normalize(v3, v3);
        vNorm.push(v3.x,v3.y, v3.z);
    }
    return vNorm;
}

/**
 * 
 * @param {type} vert                           Array de vertices, 3 indices por elemento
 * @param {type} nx                             x de la normal
 * @param {type} ny                             y de la normal
 * @param {type} nz                             z de la normal
 * @returns {normalesConstantes.vNorm|Array}    
 */
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

/**
 * Retorna un cubo de 2x2x2 (-1 a 1 en todo sentido)
 * TODO: Coordenadas uv y coloreo de vertices
 * @returns {Objeto}
 */
function Cubo()
{
    var vert = [-1.0,-1.0,-1.0, -1.0,1.0,-1.0, 1.0,1.0,-1.0, 1.0,-1.0,-1.0, -1.0,-1.0,1.0, -1.0,1.0,1.0, 1.0,1.0,1.0, 1.0,-1.0,1.0];
    var ind = [0,1,3,2,6,1,5,0,4,3,7,6,4,5];  
    var vNorm = normalesRadiales(vert);
    var uv = [0.0,0.0, 0.0,1.0, 1.0,1.0, 1.0,0.0, 0.0,0.0, 0.0,1.0, 1.0,0.0, 1.0,1.0];
    return new Objeto(new Malla(vert, null, ind), new Textura(vNorm, uv));
}



function Cilindro(divisionesHorizontales, color, textura, uvEscalaX, uvEscalaY)
{
    
}