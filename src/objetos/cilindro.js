/**
 * Retorna un cilindro sin tapas objeto de 2x2x2
 * @param {type} divisionesRadiales     Numero de divisiones radiales. Minimo 3 para un triangulo
 * @param {type} divisionesVerticales   Numero de divisiones verticales. Minimo 0
 * @param {type} txPath                 Path a textura
 * @returns {undefined}
 */
/*function CilindroSinTapa(divisionesRadiales, divisionesVerticales, txPath)
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
        for (var x = 0; x < divisionesRadiales; ++x)
        {
            uvX = x/(divisionesRadiales - 1);
            uvCoord.push(uvX);
            uvCoord.push(uvY);
            var angulo = 2*Math.PI*(x/(divisionesRadiales - 1));
            vert.push(Math.cos(angulo));
            vert.push(Math.sin(angulo));
            vert.push(-1+uvY*2);
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
    
    Objeto.call(this, new Malla(vert, indices), new Textura(uvCoord, txPath), new NormalData(vNorm, vTg, vBn));
    this.setUpGL();
}

heredarPrototype(CilindroSinTapa, Objeto);*/

/**
 * Retorna un cilindro sin tapas objeto de 2x2x2 recto en direccion Y
 * @param {type} divisionesRadiales     Numero de divisiones radiales. Minimo 3 para un triangulo
 * @param {type} divisionesVerticales   Numero de divisiones verticales. Minimo 0
 * @param {type} txPath                 Path a textura
 * @returns {undefined}
 */
function CilindroSinTapa(divisionesRadiales, divisionesVerticales, txPath)
{
    var vertices = [];
    var vNorm = [];
    var vTg = [];
    var vBn = [];
    ++divisionesVerticales;
    
    var step = 2/divisionesVerticales;
    for (var i = 0; i <= divisionesVerticales; ++i)
    {
        vertices.push(0, -1 + step*i, 1);
        vNorm.push(0,0,1);
        vTg.push(1,0,0);
        vBn.push(0,1,0);
    }
    
    SuperficieRevolucion.call(this, vertices, vNorm, vTg, vBn, divisionesRadiales, txPath);
}

heredarPrototype(CilindroSinTapa, SuperficieRevolucion);

/**
 * Crea un cilindo que es un cilindro sin tapa m�s dos tapas. Ver la documentacion de las otras funciones para entender
 * @param {type} divisionesRadiales     Numero de divisiones radiales. Minimo 3 para un triangulo
 * @param {type} divisionesVerticales   Numero de divisiones verticales. Minimo 0
 * @param {type} txPath                 Path a textura
 * @returns {undefined}
 */
function Cilindro(divisionesRadiales, divisionesVerticales, txPath)
{
    Objeto.call(this, null, null);
    
    this.hijos.push(new Disco(divisionesRadiales, txPath));
    mat4.rotate(this.hijos[0].matrices, this.hijos[0].matrices, Math.PI/2, [1,0,0]);
    mat4.translate(this.hijos[0].matrices, this.hijos[0].matrices, [0,0,1]);
    
    this.hijos.push(new Disco(divisionesRadiales, txPath));
    mat4.rotate(this.hijos[1].matrices, this.hijos[1].matrices, Math.PI/2*3, [1,0,0]);
    mat4.translate(this.hijos[1].matrices, this.hijos[1].matrices, [0,0,1]);  
    this.hijos[1].setUpGL();
    
    this.hijos.push(new CilindroSinTapa(divisionesRadiales, divisionesVerticales, txPath));
}

heredarPrototype(Cilindro, Objeto);