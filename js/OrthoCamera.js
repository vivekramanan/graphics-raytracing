var OrthoCamera = function() {
  this.position = new Vec2(10, 0);
  this.rotation = 0;
  this.windowSize = new Vec2(18, 18);

  this.viewProjMatrix = new Mat4();
  this.updateViewProjMatrix();
};

OrthoCamera.prototype.updateViewProjMatrix = function(){
  this.viewProjMatrix.set().
    scale(this.windowSize).
    rotate(this.rotation).
    translate(this.position).
    invert();
};

OrthoCamera.prototype.setAspectRatio = function(ar)
{
  this.windowSize.x = this.windowSize.y * ar;
  this.updateViewProjMatrix();  
};

