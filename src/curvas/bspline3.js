var basesBs3 = [function(u) { return (1-3*u+3*u*u-u*u*u)*1/6;}, function(u) { return (4-6*u*u+3*u*u*u)*1/6; },
                function(u) { return (1+3*u+3*u*u-3*u*u*u)*1/6} , function(u) { return (u*u*u)*1/6; }];
var basesBs3Deriv = [function(u) { return (-3 +6*u -3*u*u)/6 }, function(u) { return (-12*u+9*u*u)/6 },
                     function(u) { return (3+6*u-9*u*u)/6;}, function(u) { return (3*u*u)*1/6; }];

/**
 * Una curva de bspline de grado 3 con la cantidad de puntos deseados
 * @param {type} puntos         Array, 3 utens = 1 punto de control
 * @returns {BSpline}
 */
function BSpline(puntos)
{
    if (puntos.length <= 0) throw(new Error("Minimo esperado de 1 punto"));
    if ((puntos.length % 3) !== 0) throw(new Error("Los puntos deben ser de la forma [x,y,z]"));
    
    this.grado = 3;
    
    var px = [];
    var py = [];
    var pz = [];
    for (var i = 0; i < puntos.length; i += 3)
    {
        px.push(puntos[i]);
        py.push(puntos[i+1]);
        pz.push(puntos[i+2]);
    }
    
    this.fx = this.calcF(px, this.grado, basesBs3);
    this.fy = this.calcF(py, this.grado, basesBs3);
    this.fz = this.calcF(pz, this.grado, basesBs3);
    this.fx1 = this.calcF(px, this.grado, basesBs3Deriv);
    this.fy1 = this.calcF(py, this.grado, basesBs3Deriv);
    this.fz1 = this.calcF(pz, this.grado, basesBs3Deriv);
    
}

heredarPrototype(BSpline, Curva);

/**
 * Ver curva.js
 */
BSpline.prototype.evaluar = function(u)
{
    return vec3.fromValues(this.fx(u), this.fy(u), this.fz(u));
}

/**
 * Ver curva.js
 */
BSpline.prototype.evaluarDerivada = function(u)
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
BSpline.prototype.calcF = function(puntos, grado, bases)
{
    var n = grado;
    var p = puntos;
    return function(u)
    { 
        var result = 0;
        for (var i = 0; i <= n; ++i)
        {
            result += bases[i](u)*p[i];
        }
        return result;
    }
}