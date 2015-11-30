function initGL(canvas) {
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

/**
 * Inicializa los shaders
 * @returns {undefined}
 */
function initShaders()
{
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);
    
    // Alpha blending
    //gl.enable(gl.BLEND);
    //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    //Backface culling
    //gl.enable(gl.CULL_FACE);
    //gl.cullFace(gl.BACK);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

    shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    
    shaderProgram.vertexTangentAttribute = gl.getAttribLocation(shaderProgram, "aVertexTangent");
    gl.enableVertexAttribArray(shaderProgram.vertexTangentAttribute);
    
    shaderProgram.vertexBinormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexBinormal");
    gl.enableVertexAttribArray(shaderProgram.vertexBinormalAttribute);

    shaderProgram.posCamara = gl.getUniformLocation(shaderProgram, "uWorldCamPos");

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.ViewMatrixUniform = gl.getUniformLocation(shaderProgram, "uViewMatrix");
    shaderProgram.ModelMatrixUniform = gl.getUniformLocation(shaderProgram, "uModelMatrix");
    shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    shaderProgram.normalMapSamplerUniform = gl.getUniformLocation(shaderProgram, "uNSampler");
    
    shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor"); // Color ambiente
    shaderProgram.lightingDirectionUniform = gl.getUniformLocation(shaderProgram, "uLightDirection"); // Direccion de la luz
    shaderProgram.directionalColorUniform = gl.getUniformLocation(shaderProgram, "uDirectionalColor"); // Color de la luz
    
    //Materiales
    shaderProgram.shadelessColorUniform = gl.getUniformLocation(shaderProgram, "uColShadeless");
    shaderProgram.ambientKUniform = gl.getUniformLocation(shaderProgram, "uKAmbiente");
    shaderProgram.diffuseColorUniform = gl.getUniformLocation(shaderProgram, "uColDifuso");
    shaderProgram.diffuseKUniform = gl.getUniformLocation(shaderProgram, "uKDifuso");
    shaderProgram.specularColorUniform = gl.getUniformLocation(shaderProgram, "uColEspecular");
    shaderProgram.specularKUniform = gl.getUniformLocation(shaderProgram, "uKEspecular");
    shaderProgram.specularGlossinessUniform = gl.getUniformLocation(shaderProgram, "uGlossiness");    
    shaderProgram.alphaUniform = gl.getUniformLocation(shaderProgram, "uAlpha");    
    shaderProgram.mirrorPercentUniform = gl.getUniformLocation(shaderProgram, "uMirrorPercent");    
    shaderProgram.mirrorColorUniform = gl.getUniformLocation(shaderProgram, "uMirrorColor");    
    
    shaderProgram.uvOffsetUniform = gl.getUniformLocation(shaderProgram, "aUVOffset");
    
    shaderProgram.cubeMap = gl.getUniformLocation(shaderProgram, "cubeMapSampler");
}