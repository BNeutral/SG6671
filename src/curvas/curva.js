/**
 * Clase abstracta base para implementar curvas
 * Todas las curvas ya sean segmentos o concatenaciones deben comportarse igual y responder al intervalo [0-1]
 * @param {type} puntos         Array con los puntos de la curva en formato [x1,y1,z1,x2,y2,z2,...]
 * @returns {undefined}
 */
function Curva(puntos, grado)
{

}

/**
 * Retorna un objeto que es una linea, más que nada para visualizar las curvas
 * @param {int} divisiones      Numero de divisiones
 * @param {string} txImage      Path a la imagen si usa textura
 * @returns {Objeto|Curva.prototype.objLinea.obj}
 */
Curva.prototype.objLinea = function(divisiones, txImage)
{
    if (divisiones < 2) throw(new Error("Minimo esperado de 2 divisiones"));
    var vert = [];
    var idx = [];
    var vNorm = [];
    var uv = [];
    for (var i = 0; i <= divisiones; ++i)
    {
        var vertice = this.evaluar(i/divisiones);
        vert.push(vertice[0]);
        vert.push(vertice[1]);
        vert.push(vertice[2]);
        vNorm.push(0);
        vNorm.push(0);
        vNorm.push(1);
        uv.push(i/divisiones);
        uv.push(0);
        idx.push(i);
    }
    
    var obj = new Objeto(new Malla(vert, idx), new Textura(vNorm, uv, txImage));
    obj.modoRenderizado = gl.LINE_STRIP;
    return obj;
}

/**
 * Devuelve el valor de la curva en el punto como un vector [x,y,z]
 * @param {type} u              Parametro para recorrer la curva, entre 0 y 1
 * @returns {Vec3}
 */
Curva.prototype.evaluar = function(u) {}

/**
 * Devuelve el valor de la derivada a la curva en el punto como un vec3 (x,y,z)
 * @param {type} u              Parametro para recorrer la curva, entre 0 y 1
 * @returns {Vec3}
 */
Curva.prototype.evaluarDerivada = function(u) {}

/**
 * Devuelve un array de 3 vec3 con [derivada, yUp, binormal] de norma 1
 * @param {type} u
 * @returns {Array}         [xtg,ytg,ztg,0,1,0,bix,biy,biz]
 */
Curva.prototype.ternaYUp = function(u)
{
    var deriv = this.evaluarDerivada(u);
    vec3.normalize(deriv, deriv);
    var y = vec3.fromValues(0,1,0);
    var bin = vec3.create();
    vec3.cross(bin, y, deriv)
    vec3.normalize(bin, bin);
    vec3.cross(y, deriv, bin);
    vec3.normalize(y, y);
    return [deriv, y, bin];
}

/**
 * Devuelve una matriz de 4x4 para realizar el cambio de base
 * @param {type} u
 * @returns {mat4}         [xtg,ytg,ztg,0,1,0,bix,biy,biz]
 */
Curva.prototype.matrizLocal = function(u)
{
    var terna = this.ternaYUp(u);
    var matriz = mat4.create();
    matriz[0] = terna[0][0];
    matriz[4] = terna[0][1];
    matriz[8] = terna[0][2];
    matriz[1] = terna[1][0];
    matriz[5] = terna[1][1];
    matriz[9] = terna[1][2];
    matriz[2] = terna[2][0];
    matriz[6] = terna[2][1];
    matriz[10] = terna[2][2];
    return matriz;
}

/**
 * Devuelve un objeto resultado de barrer con una serie de puntos por la curva. Se espera que los puntos sean planos en XY
 * @param {Array} puntos         Array de puntos
 * @param {Int} pasos            Numero de segmentos + 1
 * @returns {undefined}
 */
Curva.prototype.supBarrido = function(puntos, pasos)
{
    var vert = [];
    var vNorm = [];
    var vUV = [];
    for (var i = 0; i <= pasos; ++i)
    {
        var puntoCurva = this.evaluar(i/pasos);
        var matriz = this.matrizLocal(i/pasos);
        for (var j = 0; j < puntos.length; j+=3)
        {
            var punto = vec4.fromValues(puntos[j], puntos[j+1], puntos[j+2], 1);
            vec4.transformMat4(punto, punto, matriz);
            vert.push(punto[0]+puntoCurva[0]);
            vert.push(punto[1]+puntoCurva[1]);
            vert.push(punto[2]+puntoCurva[2]);
            vUV.push(j/puntos.length/3);
            vUV.push(i/pasos);
        }
    }
    for (var i = 0; i <= pasos; ++i)
    {
        vNorm = normalesRadiales(vert);
    }
    
    var indices = indicesGrilla(puntos.length/3, pasos+1);
    return new Objeto(new Malla(vert, indices), new Textura(vNorm, vUV,"texturas/debug.jpg"));
}