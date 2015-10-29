/**
 * Una curva de bezier con la cantidad de puntos deseados, mapeada a u entre 0 y 1
 * @param {type} puntos         Array, 3 items x,y,z = 1 punto de control
 * @returns {BezierConcat}
 */
function BezierConcat(puntos, grado)
{
    if (puntos.length/3 < (grado+1)) throw(new Error("Minimo esperado de "+(grado+1)+" puntos (x,y,z)"));
    if (((puntos.length/3-(grado+1)) % grado) !== 0) throw(new Error("La cantidad de puntos debe ser apropiada"));
    
    this.grado = grado;
    this.segmentos = (puntos.length/3-(grado+1))/grado+1;
    this.curvas = [];
    
    for (var i = 0; i < this.segmentos; ++i)
    {
        var cPuntos = [];
        for (var j = 0; j <= grado; ++j)
        {
            var indice = (i*grado+j)*3;
            cPuntos.push(puntos[indice]);
            cPuntos.push(puntos[indice+1]);
            cPuntos.push(puntos[indice+2]);
        }
        this.curvas.push(new Bezier(cPuntos));
    }    
}

heredarPrototype(BezierConcat, Curva);

BezierConcat.prototype.asegurarDerivadaContinua = function()
{
    
}

/**
 * Devuelve el valor de la curva en el punto como un vector [x,y,z]
 * @param {type} u              Parametro para recorrer la curva, entre 0 y 1
 * @returns {undefined}
 */
BezierConcat.prototype.evaluar = function(u)
{
    var idx = parseInt(u*this.segmentos);
    if (idx === this.segmentos) idx = this.segmentos-1;
    return this.curvas[idx].evaluar(u*this.segmentos-idx);
}

/**
 * Devuelve el valor de la derivada de la curva en el punto como un vector [x,y,z]
 * @param {type} u              Parametro para recorrer la curva, entre 0 y 1
 * @returns {undefined}
 */
BezierConcat.prototype.evaluarDerivada = function(u)
{
    var idx = parseInt(u*this.segmentos);
    if (idx === this.segmentos) idx = this.segmentos-1;
    return this.curvas[idx].evaluarDerivada(u*this.segmentos-idx);
}