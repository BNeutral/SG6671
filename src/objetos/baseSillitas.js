var BaseSillitas = function() 
{  
    vertices=[];
    
    var y=7;
    var x=1;
    var divisiones=20;
    
    //base
    vertices.push(0);
    vertices.push(0);
    vertices.push(1);
    vertices.push(0);
    
    for (var j=1; j<=divisiones; j++) {
      y=(parseFloat(7))*j/divisiones;
      
      if(y<2.6){ x=1 }
      if(y>=2.6) { x=0.9 }
      if(y>3.6) { x=0.8 }
      if(y>3.8) { x=0.8 }
      
      
      vertices.push(x);
      vertices.push(y);
    }
    
    //techo
    vertices.push(0.8);
    vertices.push(7);
    vertices.push(0);
    vertices.push(7);

    SuperficieRevolucion.call(this,"texturas/debug.jpg",vertices,600);
    //SuperficieRevolucion.call(this,"texturas/debug.jpg",[0,0,1,0,1,2,0.9,2.6,0.9,3.6,0.8,3.8,0.8,7,0,7],1500);
    //mat4.rotate(this.matrices,this.matrices, Math.PI/2, [1, 0, 0]);
    //mat4.scale(this.matrices, this.matrices, [1.2,1.2,1.2]);
};

heredarPrototype(BaseSillitas,SuperficieRevolucion); 