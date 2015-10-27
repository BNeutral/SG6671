var TechoSillitas = function() 
{  
    vertices=[0,0,0.8,0,4,0.5,4,1.4,0,1.4];

    SuperficieRevolucion.call(this,"texturas/debug.jpg",vertices,200);
    
};

heredarPrototype(TechoSillitas,SuperficieRevolucion); 
 
