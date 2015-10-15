/**
 * Crea un objeto con toda la informacion de vertices para representar la geometría de un objeto
 * @param {type} vertices           Vertices, vector de XYZ float de largo multiplo de 3
 * @param {type} coloresVertices    Colores de los vertices, vector de RGBA float de largo vertices/3*4
 * @param {type} indices            Indices, vector de enteros de largo arbitrario. Considerar si el objeto se dibuja con triangle strips o no
 * @returns {Malla}
 */
function Malla(vertices, coloresVertices, indices)
{
    this.vertices; 
    this.coloresVertices;
    this.indices;
    
    if (vertices === null) 
    {
        this.vertices = [-1.0, -1.0, 0.0, -1.0, 1.0, 0.0, 1.0 , 1.0 , 0.0, 1.0, -1.0, 0.0];
    }
    else 
    {
        this.vertices = vertices;
    }
        
    if (indices === null) 
    {
        this.indices = [0,1,3,2];
    }
    else 
    {
        this.indices = indices;
    }

    if (coloresVertices === null)
    {
        this.coloresVertices = [];
        for (var j = 0.0; j < this.vertices.length/3; ++j) 
        {
            this.coloresVertices.push([1.0,1.0,1.0,1.0]);
        }
    }
    else this.coloresVertices = coloresVertices;
}