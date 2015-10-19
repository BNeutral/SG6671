/**
 * Retorna un cilindro sin tapas objeto de 2x2x2
 * La textura en este cilindo se repite en X para que quede bien mapeada
 * @param {type} divisionesRadiales     Numero de divisiones radiales. Minimo 3 para un triangulo
 * @param {type} divisionesVerticales   Numero de divisiones verticales. Minimo 0
 * @param {type} txPath                 Path a textura
 * @returns {undefined}
 */
function CilindroSinTapa(divisionesRadiales, divisionesVerticales, txPath)
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
    for (var i = 0, count = vert.length; i < count; i+=3)
    {
        var v3 = vec3.fromValues(vert[i],0,vert[i+2]);
        vec3.normalize(v3, v3);
        vNorm.push(v3.x,v3.y, v3.z);
    }
    
    /*var indices = [];    
    var agregar = 1;
    var i = 0;
    var long = divisionesRadiales*divisionesVerticales;
    for (var i = 0; i < long; i += divisionesRadiales)
    {
        for (var j = 0; j < (divisionesRadiales+1); ++j)
        {
            indices.push(i+j);
            indices.push(i+j+divisionesRadiales+1);
        }
        ndices.push(i);
        indices.push(i+divisionesRadiales);
    }*/
    
    var indices = [];    
    var agregar = 1;
    var i = 0;
    var long = (divisionesRadiales*2*(divisionesVerticales-1))/2;
    for (var contador = 0; contador < long; ++contador)
    {
        if ((contador != 0) && (contador % divisionesRadiales == 0))
        {
            i += divisionesRadiales - agregar;
            agregar = -agregar;
        }
        indices.push(i);
        indices.push(i+divisionesRadiales);
        i += agregar;
    }
    
    Objeto.call(this, new Malla(vert, indices), new Textura(vNorm, uvCoord, txPath));
    this.setUpGL();
}

heredarPrototype(CilindroSinTapa, Objeto);

/**
 * Crea un cilindo que es un cilindro sin tapa más dos tapas. Ver la documentacion de las otras funciones para entender
 * @param {type} divisionesRadiales     Numero de divisiones radiales. Minimo 3 para un triangulo
 * @param {type} divisionesVerticales   Numero de divisiones verticales. Minimo 0
 * @param {type} txPath                 Path a textura
 * @returns {undefined}
 */
function Cilindro(divisionesRadiales, divisionesVerticales, txPath)
{
    Objeto.call(this, null, null);
    
    this.hijos.push(new Disco(divisionesRadiales, txPath));
    mat4.translate(this.hijos[0].matrices, this.hijos[0].matrices, [0,0,1]);
    
    this.hijos.push(new Disco(divisionesRadiales, txPath));
    mat4.translate(this.hijos[1].matrices, this.hijos[1].matrices, [0,0,-1]);  
    this.hijos[1].textura.flipNormales();
    this.hijos[1].setUpGL();
    
    this.hijos.push(new CilindroSinTapa(divisionesRadiales, divisionesVerticales, txPath));
}

heredarPrototype(Cilindro, Objeto);