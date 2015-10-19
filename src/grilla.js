/**
 * Devuelve un objeto que es una grilla. La grilla es plana sobre X e Y, de dimensiones 2x2 (de -1 a 1 en ambos sentidos)
 * @param {type} divisionesHorizontales         Entero. 0 Divisiones = Cuadrado, 1 Division = |_|_|
 * @param {type} divisionesVerticales           Entero. Idem arriba
 * @param {type} txPath                         String con el path a una textura
 * @param {type} uvEscalaX                      Para multiplicar por las coord UV para crear tiling
 * @param {type} uvEscalaY                      Para multiplicar por las coord UV para crear tiling
 * @returns {undefined}
 */
function Grilla(divisionesHorizontales, divisionesVerticales, txPath, uvEscalaX, uvEscalaY)
{
    var vert = [];
    var uvCoord = [];
    var uvX;
    var uvY;
    divisionesHorizontales += 1;
    divisionesVerticales += 1;

    for (var y = 0; y <= divisionesVerticales; ++y)  
    {
        uvY = y / divisionesVerticales;
        for (var x = 0; x <= divisionesHorizontales; ++x)
        {
            uvX = x/divisionesHorizontales;
            uvCoord.push(uvX*uvEscalaX);
            uvCoord.push(uvY*uvEscalaY);
            vert.push(-1 + 2*uvX);
            vert.push(-1 + 2*uvY);
            vert.push(0);
        }
    }
    
    var vNorm = vectorRepetitivo(vert.length/3, [0, 0, 1]);
    
    divisionesVerticales += 1;
    divisionesHorizontales += 1;
    
    var indices = [];    
    var agregar = 1;
    var i = 0;
    var long = (divisionesHorizontales*2*(divisionesVerticales-1))/2;
    for (var contador = 0; contador < long; ++contador)
    {
        if ((contador != 0) && (contador % divisionesHorizontales == 0))
        {
            i += divisionesHorizontales - agregar;
            agregar = -agregar;
        }
        indices.push(i);
        indices.push(i+divisionesHorizontales);
        i += agregar;
    }

    Objeto.call(this, new Malla(vert, indices), new Textura(vNorm, uvCoord, txPath));
}

heredarPrototype(Grilla, Objeto);