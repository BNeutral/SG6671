var TechoSillitas = function() 
{  
    vertices=[0,0,0.8,0,5,0.5,5,1.4,0,1.4];

    SuperficieRevolucion.call(this,"texturas/debug.jpg",vertices,200);
    
};

heredarPrototype(TechoSillitas,SuperficieRevolucion); 
 
var TechoSillitasCompleto = function() 
{  
    Objeto.call(this, null, null);
    
    var techo = new TechoSillitas();

    var anguloRot=Math.PI/4;
    
    //Cuantas sillitas voy a tener
    var numSillitas=5;
    
    this.hijos.push(techo);

    for (var j=1; j<=numSillitas; j++) {
      
      var angulo=(2*(Math.PI)/(parseFloat(numSillitas)))*j;
      
      var posicion=[Math.cos(angulo),Math.sin(angulo)];
     
      var soga = new SillitasSoga();
      
      mat4.translate(soga.matrices, soga.matrices, [5*posicion[0],-1,5*posicion[1]]);
      mat4.rotate(soga.matrices, soga.matrices, Math.PI/2, [1,0,0]);
      
      mat4.rotate(soga.matrices, soga.matrices, anguloRot, [-posicion[1],posicion[0],0]);
      
      this.hijos.push(soga);
    }
 
};

heredarPrototype(TechoSillitasCompleto,Objeto); 
 


var SillitasSoga = function()
{
  Objeto.call(this, null, null);
  //soga ""larga""
  var sogap = new Cilindro(12, 0, "texturas/pixel.png" );
  mat4.scale(sogap.matrices, sogap.matrices, [0.1,0.1,2]); 
  
  var soga2 = new Cilindro(12, 0, "texturas/pixel.png" );
  mat4.translate(soga2.matrices, soga2.matrices, [-0.35,0,2.25]);
  mat4.rotate(soga2.matrices, soga2.matrices, -Math.PI/4, [0,1,0]);
  mat4.scale(soga2.matrices, soga2.matrices, [0.1,0.1,0.5]); 
  
  var soga3 = new Cilindro(12, 0, "texturas/pixel.png" );
  mat4.translate(soga3.matrices, soga3.matrices, [0.35,0,2.25]);
  mat4.rotate(soga3.matrices, soga3.matrices, Math.PI/4, [0,1,0]);
  mat4.scale(soga3.matrices, soga3.matrices, [0.1,0.1,0.5]); 
  
  this.hijos.push(sogap);
  this.hijos.push(soga2);
  this.hijos.push(soga3);
};


heredarPrototype(SillitasSoga,Objeto); 