/**
 * Retorna media esfera 2x2x1
 * @param {type} divisionesRadiales     Numero de divisiones radiales. Minimo 3 para un triangulo
 * @param {type} divisionesVerticales   Numero de divisiones verticales. Minimo 0
 * @param {type} txPath                 Path a textura
 * @returns {undefined}
 */
function SkyDome(divisionesRadiales, divisionesVerticales, txPath)
{
    divisionesVerticales += 2;   
    divisionesRadiales += 1;
    
    var vert = [];
    var uvCoord = [];
    var uvX;
    var uvY;
    
    for (var y = 0; y < divisionesVerticales; ++y)  
    {
        uvY = y / (divisionesVerticales - 1);
        var anguloY = Math.PI/2*(y/(divisionesVerticales - 1))
        var posY = Math.sin(anguloY);
        var r = Math.cos(anguloY);
        for (var x = 0; x < divisionesRadiales; ++x)
        {
            uvX = x/(divisionesRadiales - 1);
            uvCoord.push(uvX);
            uvCoord.push(uvY);
            var angulo = 2*Math.PI*(x/(divisionesRadiales - 1));
            vert.push(Math.cos(angulo)*r);
            vert.push(posY);
            vert.push(Math.sin(angulo)*r);
        }
    }
    
    var vNorm = [];
    var vTg = [];
    var vBn = [];
    for (var i = 0, count = vert.length; i < count; i+=3)
    {
        var v3 = vec3.fromValues(vert[i],vert[i+1],0);
        vec3.normalize(v3, v3);
        vNorm.push(v3[0]);
        vNorm.push(v3[1]);
        vNorm.push(v3[2]);
        v3 = vec3.fromValues(vert[i],0,vert[i+2]);
        vec3.normalize(v3, v3);
        vTg.push(v3[0]);
        vTg.push(v3[1]);
        vTg.push(v3[2]);
        v3 = vec3.fromValues(0,vert[i+1],vert[i+2]);
        vec3.normalize(v3, v3);
        vBn.push(v3[0]);
        vBn.push(v3[1]);
        vBn.push(v3[2]);
    }
        
    var indices = indicesGrilla(divisionesRadiales,divisionesVerticales); 
    var tex = new Textura(uvCoord, txPath);
    tex.colorAmbiente = vec3.fromValues(1,1,1);
    tex.colorIluminado = vec3.fromValues(0,0,0);
    
    Objeto.call(this, new Malla(vert, indices), tex, new NormalData(vNorm, vTg, vBn));
    this.setUpGL();
    mat4.scale(this.matrices, this.matrices, [50,50,50]);
}

heredarPrototype(SkyDome, Objeto);