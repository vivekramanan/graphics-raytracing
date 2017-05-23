var Program = function(gl, vertexShader, fragmentShader) {
  this.gl = gl;
  this.sourceFileNames = {vs:vertexShader.sourceFileName, fs:fragmentShader.sourceFileName};
  this.glProgram = gl.createProgram();
  gl.attachShader(this.glProgram, vertexShader.glShader);
  gl.attachShader(this.glProgram, fragmentShader.glShader);

  gl.bindAttribLocation(this.glProgram, 0, 'vertexPosition');
  gl.bindAttribLocation(this.glProgram, 1, 'vertexNormal');  
  gl.bindAttribLocation(this.glProgram, 2, 'vertexTexCoord');  

  gl.linkProgram(this.glProgram);
  if (!gl.getProgramParameter(this.glProgram, gl.LINK_STATUS)) {
    throw new Error('Could not link shaders [vertex shader:' + vertexShader.sourceFileName + ']:[fragment shader: ' + fragmentShader.sourceFileName + ']\n' + gl.getProgramInfoLog(this.glProgram));
  }

  var textureUnitCount=0;
  this.uniforms = {};
  var nUniforms = gl.getProgramParameter(this.glProgram, gl.ACTIVE_UNIFORMS);
  for(var i=0; i<nUniforms; i++){
    var glUniform = gl.getActiveUniform(this.glProgram, i);
    var uniform = {
      type      : glUniform.type,
      arraySize : glUniform.size || 1,
      location  : gl.getUniformLocation(this.glProgram, glUniform.name)
    };
    if(glUniform.type === gl.SAMPLER_2D || glUniform.type === gl.SAMPLER_CUBE){ 
      uniform.textureUnit = textureUnitCount; 
      textureUnitCount += uniform.arraySize; 
    } 
    this.uniforms[glUniform.name.split('[')[0]] = uniform;
  }
};

Program.prototype.commit = function(){
	this.gl.useProgram(this.glProgram);
};

