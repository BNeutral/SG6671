var basesBezier = [];
var basesBezierDerivadas = [];

function Bezier(puntos)
{
    if (puntos.length <= 0) throw(new Error("Minimo esperado de 1 punto"));
    if ((puntos.length % 3) !== 0) throw(new Error("Los puntos deben ser de la forma [x,y,z]"));
    
    this.grado = (puntos.length/3)-1;
    
    for (var v = 0; v <= this.grado; ++v)
    {
        if (!basesBezier[this.grado]) basesBezier[this.grado] = [];
        if (!basesBezier[this.grado][v]) 
        {
            basesBezier[this.grado][v] = (function(n, v) 
            {
                var n = n;
                var v = v; 
                var comb = nComb(n,v);
                return function(u)
                {
                   return comb*Math.pow(u,v)*Math.pow(1-u,n-v); 
                };
            })(this.grado,v);
        }
    }
    
    var px = [];
    var py = [];
    var pz = [];
    for (var i = 0; i < puntos.length; i += 3)
    {
        px.push(puntos[i]);
        py.push(puntos[i+1]);
        pz.push(puntos[i+2]);
    }
    
    this.fx = this.calcF(px, this.grado);
    this.fy = this.calcF(py, this.grado);
    this.fz = this.calcF(pz, this.grado);
}

heredarPrototype(Bezier, Curva);

/**
 * Calcula el resultado de base * puntos para una componente dada y devuelve una funcion f(u)
 * @param {type} grado          Grado de la curva que se esta calculando
 * @param {type} puntos         Puntos en una sola componente
 * @returns {undefined}
 */
Bezier.prototype.calcF = function(puntos, grado)
{
    var n = grado;
    var p = puntos;
    return function(u)
    { 
        var result = 0;
        for (var i = 0; i <= this.grado; ++i)
        {
            result += basesBezier[n][i](u)*p[i];
        }
        return result;
    }
}