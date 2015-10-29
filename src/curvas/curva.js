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
        uv.push(i/divisiones);
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
 * Devuelve un objeto resultado de barrer con una serie de puntos por la curva
 * @param {Array} puntos         Array de puntos
 * @param {Int} divisiones       Numero de divisiones
 * @returns {undefined}
 */
Curva.prototype.supBarrido = function(puntos, paso)
{
    
}