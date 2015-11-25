/**
 * Devuelve un objeto que es un disco. Plana sobre X e Y, de dimensiones 2x2 (de -1 a 1 en ambos sentidos)
 * Las normales son hacia Z positivo
 * @param {type} divisionesRadiales         Entero. 3 Divisiones = Triangulo, numero minimo
 * @param {type} txPath                     String con el path a una textura
 * @returns {undefined}
 */
function Disco(divisionesRadiales, txPath)
{
    var vert = [0.0, 0.0, 0.0];
    var uvCoord = [0.5, 0.5];
    var uvX;
    var uvY;
    
    var vTg = [];
    var rotm = mat4.create();
    mat4.rotate(rotm, rotm, Math.PI/2, [0,0,1]);

    for (var w = 0; w <= divisionesRadiales; ++w)  
    {
        var angulo = 2*Math.PI*(w/divisionesRadiales)
        uvX = 0.5 * Math.cos(angulo) + 0.5;
        uvY = 0.5 * Math.sin(angulo) + 0.5;
        uvCoord.push(uvX, uvY);
        vert.push((uvX-0.5)*2, (uvY-0.5)*2, 0);
        
        var v3 = vec3.fromValues(vert[w*3],vert[w*3+1],0);
        vec3.normalize(v3, v3);
        vec3.transformMat4(v3, v3, rotm);
        vTg.push(v3[0]);
        vTg.push(v3[1]);
        vTg.push(v3[2]);        
    }
    
    var vNorm = vectorRepetitivo(vert.length/3, [0, 0, 1]);
            
    var indices = [];    

    for (var i = 0; i <= divisionesRadiales; ++i)
    {
        indices.push(i);
    }
    indices.push(1);

    Objeto.call(this, new Malla(vert, indices), new Textura(uvCoord, txPath), new NormalData(vNorm, vTg));
    this.modoRenderizado = gl.TRIANGLE_FAN;
}

heredarPrototype(Disco, Objeto);