/**
 * Una curva de bspline con la cantidad de puntos deseados, mapeada a u entre 0 y 1
 * @param {type} puntos         Array, 3 items x,y,z = 1 punto de control
 * @returns {BSplineConcat}
 */
function BSplineConcat(puntos)
{
    if (puntos.length/3 < 4) throw(new Error("Minimo esperado de "+4+" puntos (x,y,z)"));

    this.segmentos = puntos.length/3-3;
    this.curvas = [];
    
    for (var i = 0; i < this.segmentos; ++i)
    {
        var cPuntos = [];
        for (var j = 0; j <= 3; ++j)
        {
            var indice = (i+j)*3;
            cPuntos.push(puntos[indice]);
            cPuntos.push(puntos[indice+1]);
            cPuntos.push(puntos[indice+2]);
        }
        this.curvas.push(new BSpline(cPuntos));
    }    
}

heredarPrototype(BSplineConcat, Curva);

/**
 * Devuelve el valor de la curva en el punto como un vector [x,y,z]
 * @param {type} u              Parametro para recorrer la curva, entre 0 y 1
 * @returns {undefined}
 */
BSplineConcat.prototype.evaluar = function(u)
{
    var idx = parseInt(u*this.segmentos);
    if (idx >= this.segmentos) idx = this.segmentos-1;
    return this.curvas[idx].evaluar(u*this.segmentos-idx);
}

/**
 * Devuelve el valor de la derivada de la curva en el punto como un vector [x,y,z]
 * @param {type} u              Parametro para recorrer la curva, entre 0 y 1
 * @returns {undefined}
 */
BSplineConcat.prototype.evaluarDerivada = function(u)
{
    var idx = parseInt(u*this.segmentos);
    if (idx >= this.segmentos) idx = this.segmentos-1;
    return this.curvas[idx].evaluarDerivada(u*this.segmentos-idx);
}