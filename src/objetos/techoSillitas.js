var TechoSillitas = function() 
{  
    // Se repiten vertices para hacer el shadring "cortado" en vez de redondeado
    var vert =[0,0,0,   0,1,5,  0,1,5, 0,2,5, 0,2,5, 0,2,0];
    var norm =[0,-1, 0,  0,-0.196116, 0.980581, 0,0,1,  0,0,1,  0,1,0, 0,1,0];
    var tgs =[1,0,0,   1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0];

    SuperficieRevolucion.call(this,vert,norm,tgs,null,64, "texturas/sillastope.png", "texturas/sillastope_normal.png");
    this.textura.glossiness = 500;
    
};

heredarPrototype(TechoSillitas,SuperficieRevolucion); 
 
var TechoSillitasCompleto = function(numsillas) 
{  
    Objeto.call(this, null, null);
    
    var techo = new TechoSillitas();

    var anguloRot=Math.PI/4;
    
    //Cuantas sillitas voy a tener
    var numSillitas=numsillas;
    
    this.hijos.push(techo);

    for (var j=1; j<=numSillitas; j++) 
    {    
      var angulo=(2*(Math.PI)/(parseFloat(numSillitas)))*j;
      var posicion=[Math.cos(angulo),Math.sin(angulo)];
      var soga = new SistemaSillaSoga(angulo/(2*Math.PI));
      mat4.translate(soga.matrices, soga.matrices, [8*posicion[0],1,8*posicion[1]]);
      mat4.rotate(soga.matrices, soga.matrices, Math.PI/2, [1,0,0]);
      mat4.rotate(soga.matrices, soga.matrices, anguloRot, [-posicion[1],posicion[0],0]);
      mat4.rotate(soga.matrices, soga.matrices, angulo, [0,0,1]);
      mat4.rotate(soga.matrices, soga.matrices, -Math.PI/2, [1,0,0]);
      this.hijos.push(soga);
    }
 
};

heredarPrototype(TechoSillitasCompleto,Objeto); 
 


var SillitasSoga = function()
{
  Objeto.call(this, null, null);
  //soga ""larga""
  var sogap = new CilindroSinTapa(8, 0, "texturas/pixel.png" );
  mat4.translate(sogap.matrices, sogap.matrices, [0,2.8,0]); 
  mat4.scale(sogap.matrices, sogap.matrices, [0.01,2,0.01]); 
  
  var soga2 = new CilindroSinTapa(8, 0, "texturas/pixel.png" );
  mat4.translate(soga2.matrices, soga2.matrices, [0,0.8,0]);
  mat4.rotate(soga2.matrices, soga2.matrices, Math.PI/4, [0,0,1]);
  mat4.translate(soga2.matrices, soga2.matrices, [0,-0.2,0]);
  mat4.scale(soga2.matrices, soga2.matrices, [0.01,0.2,0.01]); 
  
  
  var soga3 = new CilindroSinTapa(8, 0, "texturas/pixel.png" );
  mat4.translate(soga3.matrices, soga3.matrices, [0,0.8,0]);
  mat4.rotate(soga3.matrices, soga3.matrices, -Math.PI/4, [0,0,1]);
  mat4.translate(soga3.matrices, soga3.matrices, [0,-0.2,0]);
  mat4.scale(soga3.matrices, soga3.matrices, [0.01,0.2,0.01]); 
  
  this.hijos.push(sogap);
  this.hijos.push(soga2);
  this.hijos.push(soga3);
};


heredarPrototype(SillitasSoga,Objeto); 


var SistemaSillaSoga = function(color)
{
  Objeto.call(this, null, null);

  var soga = new SillitasSoga();
  var silla= new Silla(color);
  
  mat4.translate(this.matrices,this.matrices,[0,-3.8,0]);
  mat4.translate(silla.matrices,silla.matrices,[0,0,0.25]);
  mat4.scale(silla.matrices,silla.matrices,[0.3,0.3,0.3]);
  
  this.hijos.push(soga);
  this.hijos.push(silla);
};


heredarPrototype(SistemaSillaSoga,Objeto); 

