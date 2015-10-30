 /**
 * Carro para la montaña rusa
 */
function Carro()
{
    var vert = [-1.0,0.0,-1.0, -1.0,1.8,-1.0, 1.0,0.0,-1.0, 1.0,1.8,-1.0, -1.0,0.0,1.0, -1.0,1.8,1.0, 1.0,0.0,1.0, 1.0,1.8,1.0,
                2.0,0.0,-1.0,  2.0,1.0,-1.0, 2.0,0.0,1.0,  2.0,1.0,1.0 ];
    var ind = [4,0,6,2,10,8,11,9,9,8,10,11,6,7,4,5,0,1,2,3,8,9,9,11,3,7];//[0,1,3,2,6,1,5,0,4,3,7,6,4,5];   
    var vNorm = normalesRadiales(vert);
    var uv = [0.0,0.0, 0.0,1, 0.5,1, 0.5,0.0, 0.5,1, 0.5,0.0, 0.0,0.0, 0.0,1
                , 1,0.0, 1,0.5, 1,0.0, 1,0.5];
    Objeto.call(this,new Malla(vert, ind), new Textura(vNorm, uv, "texturas/pixel.png"));
    this.textura.hueRamp(0, 0.8, 0.2);

    var s1 = new Silla(0.1);
    var s2 = new Silla(0.1);
    mat4.translate(s1.matrices, s1.matrices, [-0.5,1,0]);   
    mat4.translate(s2.matrices, s2.matrices, [0.25,1,0]);  
    mat4.rotate(s1.matrices, s1.matrices, Math.PI/2, [0,1,0]);
    mat4.rotate(s2.matrices, s2.matrices, Math.PI/2, [0,1,0]);
    mat4.scale(s1.matrices, s1.matrices, [0.95,0.5,0.25]);
    mat4.scale(s2.matrices, s2.matrices, [0.95,0.5,0.25]);
   
    this.hijos.push(s1);
    this.hijos.push(s2);
    
    //mat4.rotate(this.matrices, this.matrices, Math.PI/4, [0,1,0]);
}
heredarPrototype(Carro, Objeto);