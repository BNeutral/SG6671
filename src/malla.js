function Malla(vertices, coloresVertices, indices)
{
    this.vertices; 
    this.coloresVertices;
    this.indices;
    
    if (vertices === null) 
    {
          this.vertices = [30.0, 0.0, 30.0, 30.0, 0.0, -30.0, -30.0 , 0.0 , -30.0, -30.0, 0.0 ,30.0];
    }
    else 
    {
        this.vertices = vertices;
    }
        
    if (indices === null) 
    {
        this.indices = [0,1,2,2,0,3];
    }
    else 
    {
        this.indices = indices;
    }

    if (coloresVertices === null)
    {
        this.coloresVertices = [];
        for (var j = 0.0; j < this.indices.length; ++j) 
        {
            this.coloresVertices.push([1.0,1.0,1.0,1.0]);
            /*this.coloresVertices.push(j/this.indices.length);
            this.coloresVertices.push(j/this.indices.length);
            this.coloresVertices.push(j/this.indices.length);*/
        }
    }
    else this.coloresVertices = coloresVertices;
}