/**
 * Retorna un cubo objeto de 2x2x2 (-1 a 1 en todo sentido)
 * La textura en este cubo queda mal mapeada por tener vertices compartidos, las normales tampoco son las esperadas
 * @returns {Objeto}
 */
function CuboMalTexturado(txPath)
{
    var vert = [-1.0,-1.0,-1.0, -1.0,1.0,-1.0, 1.0,1.0,-1.0, 1.0,-1.0,-1.0, -1.0,-1.0,1.0, -1.0,1.0,1.0, 1.0,1.0,1.0, 1.0,-1.0,1.0];
    var ind = [0,1,3,2,6,1,5,0,4,3,7,6,4,5];   
    var uv = [0.0,0.0, 0.0,1.0, 1.0,1.0, 1.0,0.0, 1.0,1.0, 1.0,0.0, 0.0,0.0, 0.0,1.0];
    Objeto.call(this,new Malla(vert, ind), new Textura(uv, txPath), normalDataRadial(vert));
}

heredarPrototype(CuboMalTexturado, Objeto);

/**
 * Retorna un cubo objeto de 2x2x2 (-1 a 1 en todo sentido)
 * @returns {Objeto}
 */
function Cubo(txPath)
{
    var vert = [    -1.0, -1.0,  1.0,   1.0, -1.0,  1.0,    1.0,  1.0,  1.0,    -1.0,  1.0,  1.0,   //adelante
                    -1.0, -1.0, -1.0,   -1.0,  1.0, -1.0,   1.0,  1.0, -1.0,    1.0, -1.0, -1.0,    //atras
                    -1.0,  1.0, -1.0,   -1.0,  1.0,  1.0,   1.0,  1.0,  1.0,    1.0,  1.0, -1.0,    //arriba
                    -1.0, -1.0, -1.0,   1.0, -1.0, -1.0,    1.0, -1.0,  1.0,    -1.0, -1.0,  1.0,   //abajo
                    1.0, -1.0, -1.0,    1.0,  1.0, -1.0,    1.0,  1.0,  1.0,    1.0, -1.0,  1.0,    //derecha
                    -1.0, -1.0, -1.0,   -1.0, -1.0,  1.0,   -1.0,  1.0,  1.0,   -1.0,  1.0, -1.0    //izquierda
    ];
    
    var ind =  [    0,  1,  2,      0,  2,  3,    // adelante
                    4,  5,  6,      4,  6,  7,    // atras
                    8,  9,  10,     8,  10, 11,   // arriba
                    12, 13, 14,     12, 14, 15,   // abajo
                    16, 17, 18,     16, 18, 19,   // derecha
                    20, 21, 22,     20, 22, 23    // izquierda
    ];
    
    var normales = [0,0,1, 0,0,1, 0,0,1, 0,0,1,
                    0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,
                    0,1,0, 0,1,0, 0,1,0, 0,1,0,
                    0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0,
                    1,0,0, 1,0,0, 1,0,0, 1,0,0,
                    -1,0,0, -1,0,0, -1,0,0, -1,0,0];
     
    var tangentes = [0,1,0, 0,1,0, 0,1,0, 0,1,0,
                    0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0,
                    0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,
                    0,0,1, 0,0,1, 0,0,1, 0,0,1,
                    0,1,0, 0,1,0, 0,1,0, 0,1,0,
                    0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0];
                      
    var uv = vectorRepetitivo(6, [0.0,0.0, 1.0,0.0, 1.0,1.0, 0.0,1.0]);
    
    Objeto.call(this,new Malla(vert, ind), new Textura(uv, txPath), new NormalData(normales, tangentes));
    this.modoRenderizado = gl.TRIANGLES;
}

heredarPrototype(Cubo, Objeto);
