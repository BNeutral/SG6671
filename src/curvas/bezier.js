var basesBezier = [];
var basesBezierDerivadas = [];

/**
 * Una curva de bezier con la cantidad de puntos deseados
 * @param {type} puntos         Array, 3 utens = 1 punto de control
 * @returns {Bezier}
 */
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
        
        if (!basesBezierDerivadas[this.grado]) basesBezierDerivadas[this.grado] = [];
        if (!basesBezierDerivadas[this.grado][v]) 
        {
            basesBezierDerivadas[this.grado][v] = (function(n, v) 
            {
                var n = n;
                var v = v; 
                var comb = nComb(n,v);
                return function(u)
                {
                   if (v === 0) return comb*-1*n*Math.pow(1-u,n-1); 
                   if (v === n) return comb*n*Math.pow(u,n-1); 
                   return comb*(v*Math.pow(u,v-1)*Math.pow(1-u,n-v)+Math.pow(u,v)*(-n+v)*Math.pow(1-u,n-v-1)); 
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
    
    this.fx = this.calcF(px, this.grado, basesBezier);
    this.fy = this.calcF(py, this.grado, basesBezier);
    this.fz = this.calcF(pz, this.grado, basesBezier);
    this.fx1 = this.calcF(px, this.grado, basesBezierDerivadas);
    this.fy1 = this.calcF(py, this.grado, basesBezierDerivadas);
    this.fz1 = this.calcF(pz, this.grado, basesBezierDerivadas);
    
}

heredarPrototype(Bezier, Curva);

/**
 * Ver curva.js
 */
Bezier.prototype.evaluar = function(u)
{
    return vec3.fromValues(this.fx(u), this.fy(u), this.fz(u));
}

/**
 * Ver curva.js
 */
Bezier.prototype.evaluarDerivada = function(u)
{
    return vec3.fromValues(this.fx1(u), this.fy1(u), this.fz1(u));
}

/**
 * Calcula el resultado de base * puntos para una componente dada y devuelve una funcion f(u)
 * @param {type} grado          Grado de la curva que se esta calculando
 * @param {type} puntos         Puntos en una sola componente
 * @param {type} bases          Bases a utilizar
 * @returns {Function}
 */
Bezier.prototype.calcF = function(puntos, grado, bases)
{
    var n = grado;
    var p = puntos;
    return function(u)
    { 
        var result = 0;
        for (var i = 0; i <= this.grado; ++i)
        {
            result += bases[n][i](u)*p[i];
        }
        return result;
    }
}