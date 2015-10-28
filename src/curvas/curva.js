/**
 * Clase abstracta base para implementar curvas
 * Todas las curvas ya sean segmentos o concatenaciones deben comportarse igual y responder al intervalo [0-1]
 * @param {type} puntos         Array con los puntos de la curva en formato [x1,y1,z1,x2,y2,z2,...]
 * @returns {undefined}
 */
function Curva(puntos, grado)
{
    this.fx; // Funcion para hallar los puntos de X
    this.fy; // Idem y
    this.fz; // Idem Z
    this.fx1; // Funcion para hallar los puntos de X de la derivada
    this.fy1; // Idem y
    this.fz1; // Idem Z
}

/**
 * Retorna un objeto que es una linea, más que nada para visualizar las curvas
 * @param {type} divisiones     Numero de divisiones
 * @returns {undefined}
 */
Curva.prototype.objLinea = function(divisiones)
{
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
    
    var obj = new Objeto(new Malla(vert, idx), new Textura(vNorm, uv, null));
    obj.modoRenderizado = gl.LINE_STRIP;
    return obj;
}

/**
 * Devuelve el valor de la curva en el punto como un vector [x,y,z]
 * @param {type} u              Parametro para recorrer la curva, entre 0 y 1
 * @returns {undefined}
 */
Curva.prototype.evaluar = function(u)
{
    return [this.fx(u), this.fy(u), this.fz(u)];
}

/**
 * Devuelve el valor de la derivada a la curva en el punto como un vec3 (x,y,z)
 * @param {type} u
 * @returns {undefined}
 */
Curva.prototype.evaluarDerivada = function(u)
{
   return [this.fx1(u), this.fy1(u), this.fz1(u)];
}