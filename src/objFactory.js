/**
 * Factory para crear objetos.
 * @param {type} options
 * @returns {Object}
 */
function ObjectFactory() {}
ObjectFactory.prototype.createObject = function createObject( options ) {
  
  var parentClass = null;
 
  if( options.type === 'piso' ) {
    parentClass = Piso;
  }
  if( parentClass === null ) {
    return false;
  }
  return new parentClass( options );
}


function normalesRadiales(vert)
{
    var vNorm = [];
    for (i = 0; i < vert.legth; i+=3)
    {
        var v3 = vec3.fromValues(i,i+1,i+2);
        vec3.normalize(v3, v3);
        vNorm.push(v3.x,v3.y, v3.z);
    }
    return vNorm;
}

function Cubo()
{
    var vert = [-1,-1,-1, -1,1,-1, 1,1,-1, 1,-1,-1, -1,-1,1, -1,1,1, 1,1,1, 1,-1,1];
    var ind = [0,1,3,2,6,1,5,0,4,3,7,6,4,5];  
    var vNorm = normalesRadiales(vert);
    var uv = [0,0, 0,1, 1,1, 1,0, 0,0, 0,1, 1,0, 1,1];
    return new Objeto(new Malla(vert, null, ind), new Textura(vNorm, uv));
}