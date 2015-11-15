function meterVertices(lista,dest) 
{
    var largoarray = lista.length;
    for (var j=0 ; j<largoarray; j++) {
        dest.push(lista[j]);
    }    
};



/**
 * Retorna una superficie de revolucion
 * formada con los puntos pasados por parametro
 * IMPORTANTE: Si divAngulo=0, se rompe
 * si divAngulo es demasiado alto, empieza a dar 0 la division y dibuja mal
 * @returns {Objeto}
 */
function SuperficieRevolucion(txPath,puntos,divAngulo)
{
    var vert = [];
    
    var ind =  [];
   
    var largoarray = puntos.length;
    
    var pi=[0,0,0];
    var pimas=[0,0,0];
    var pir=[0,0,0];
    var pimasr=[0,0,0];
    var anguloNuevo=0;
    var anguloAnterior=0;

    var uv=[];
    
    var maximo=getMaxOfArray(puntos);
    
    var posActual=0;
    
    for (var j=1; j<=divAngulo; j++) {
      
      anguloNuevo=(2*(Math.PI)/(parseFloat(divAngulo)))*j;
      
      if (j==divAngulo) {
	anguloNuevo=0;
      }
      
      for (var i = 0; i < (largoarray-2); i=i+2) {
	  var x=puntos[i];
	  var y= puntos[i+1];
	  var xmas=puntos[i+2];
	  var ymas= puntos[i+3];
	  
	  pi=[x*Math.cos(anguloAnterior),y,x*Math.sin(anguloAnterior)];
	  pir=[x*Math.cos(anguloNuevo),y,x*Math.sin(anguloNuevo)];
	  pimas=[xmas*Math.cos(anguloAnterior),ymas,xmas*Math.sin(anguloAnterior)];
	  pimasr=[xmas*Math.cos(anguloNuevo),ymas,xmas*Math.sin(anguloNuevo)];
	  
	  //Forma de calcular coordenadas uv?? http://www.cs.toronto.edu/~kyros/courses/418/Notes/TextureMapping.pdf
	  //pi
	  uv.push(parseFloat(x)/maximo);
	  uv.push( (parseFloat(anguloAnterior))/(2*(Math.PI)) );
	  //pir
	  uv.push(parseFloat(x)/maximo);
	  uv.push( (parseFloat(anguloNuevo))/(2*(Math.PI)) );
	  //pimas
	  uv.push(parseFloat(xmas)/maximo);
	  uv.push( (parseFloat(anguloAnterior))/(2*(Math.PI)) );
	  //pimasr
	  uv.push(parseFloat(xmas)/maximo);
	  uv.push( (parseFloat(anguloNuevo))/(2*(Math.PI)) );

	  meterVertices(pi,vert);
	  meterVertices(pir,vert);
	  meterVertices(pimas,vert);
	  meterVertices(pimasr,vert);
	  
	  ind.push(0+posActual); //pi
	  ind.push(2+posActual); //pimas
	  ind.push(1+posActual); //pir
	  ind.push(1+posActual); //pir
	  ind.push(3+posActual); //pimasr
	  ind.push(2+posActual); //pimas
	  posActual=posActual+4;
      }
      anguloAnterior=anguloNuevo;
    }
    
    var normalData = normalDataRadial(vert);
    
    this.modoRenderizado = gl.TRIANGLES;
                        
    Objeto.call(this,new Malla(vert, ind), new Textura(uv, txPath), normalData);
    
    this.modoRenderizado = gl.TRIANGLES;
    
}

heredarPrototype(SuperficieRevolucion, Objeto); 
