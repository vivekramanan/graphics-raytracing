var GameObject2D = function(mesh) {
  this.mesh = mesh;
  this.position = new Vec3(0, 0, 0);
  this.orientation = 0;
  this.scale = new Vec3(1, 1, 1);
  this.move = false;
  this.collided = false;
  this.axis = new Vec3(0,1,0);
  this.modelMatrix = new Mat4();
  this.updateModelTransformation();
};

GameObject2D.prototype.updateModelTransformation = function(){
  this.modelMatrix.set().
    scale(this.scale).
    rotate(this.orientation, this.axis).
    translate(this.position);
  if(this.parent) {
    this.modelMatrix.mul(this.parent.modelMatrix);
  }
};

GameObject2D.prototype.draw = function(camera, lights, quads){
  Material.shared.modelViewProjMatrix.set().
    mul(this.modelMatrix).
    mul(camera.viewProjMatrix);
  Material.shared.rayDirMatrix.set(camera.rayDirMatrix);
  Material.shared.eyePos.set(camera.position);
  for(var i = 0; i< 2; i++) {
    Material.shared.lightPos[i].set(lights[i].lightPosition);
    Material.shared.lightPowerDensity[i].set(lights[i].lightPowerDensity);
  }
  for(var i = 0; i<quads.length; i++) {
    Material.shared.quadrics[2*i].set(quads[i].surfaceCoeffMatrix);
    Material.shared.quadrics[2*i+1].set(quads[i].clipperCoeffMatrix);
    Material.shared.brdfs[i].set(quads[i].brdf);
  }
  this.mesh.draw();
};

