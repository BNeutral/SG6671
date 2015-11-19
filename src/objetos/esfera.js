/**
 * Retorna media esfera de 2x2x2
 * @param {type} divisionesRadiales     Numero de divisiones radiales. Minimo 3 para un triangulo
 * @param {type} divisionesVerticales   Numero de divisiones verticales. Minimo 0
 * @param {type} txPath                 Path a textura
 * @param {type} rangoAnguloVertical    Por si se quiere media esfera o similar. Valor entre 0 y PI
 * @returns {undefined}
 */
function Esfera(divisionesRadiales, divisionesVerticales, txPath, rangoAnguloVertical)
{
    divisionesVerticales += 2;   
    divisionesRadiales += 1;
    
    var vert = [];
    var uvCoord = [];
    var uvX;
    var uvY;
    var anguloVertical = Math.PI;
    if (rangoAnguloVertical)
        anguloVertical = rangoAnguloVertical;
    
    var vNorm = [];
    var vTg = [];
    var vBn = [];
    
    for (var y = 0; y < divisionesVerticales; ++y)  
    {
        var anguloY = anguloVertical*(y/(divisionesVerticales - 1));
        uvY = 1 - (anguloY / anguloVertical) * (anguloVertical / Math.PI);
        if (uvY > 0.99) uvY = 0.99; // Error de redondeo
        var siny = Math.sin(anguloY);
        var cosy = Math.cos(anguloY);
        for (var x = 0; x < divisionesRadiales; ++x)
        {
            uvX = x/(divisionesRadiales - 1);
            uvCoord.push(uvX);
            uvCoord.push(uvY);
            var angulo = 2*Math.PI*(x/(divisionesRadiales - 1));
            var cosx = Math.cos(angulo);
            var sinx = Math.sin(angulo);
            var v3 = vec3.fromValues(cosx*siny, cosy, sinx*siny);
            vert.push(v3[0]);
            vert.push(v3[1]);
            vert.push(v3[2]);
            vec3.normalize(v3, v3);
            vNorm.push(v3[0]);
            vNorm.push(v3[1]);
            vNorm.push(v3[2]);
            v3 = vec3.fromValues(-sinx*siny, 0, cosx*siny); // Derivada en angulo
            vec3.normalize(v3, v3);
            vTg.push(v3[0]);
            vTg.push(v3[1]);
            vTg.push(v3[2]);
            v3 = vec3.fromValues(cosx*cosy, -siny, sinx*cosy); // Derivada en anguloY
            vec3.normalize(v3, v3);
            vBn.push(v3[0]);
            vBn.push(v3[1]);
            vBn.push(v3[2]);
        }
    }
            
    var indices = indicesGrilla(divisionesRadiales,divisionesVerticales); 
    var tex = new Textura(uvCoord, txPath);    
    Objeto.call(this, new Malla(vert, indices), tex, new NormalData(vNorm,vTg,vBn));
    this.setUpGL();
}

heredarPrototype(Esfera, Objeto);