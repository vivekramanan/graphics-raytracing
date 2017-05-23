var ClippedQuadric = function(surfaceCoeffMatrix, clipperCoeffMatrix, brdf) {
  this.surfaceCoeffMatrix = surfaceCoeffMatrix;
  this.clipperCoeffMatrix = clipperCoeffMatrix;
  this.brdf = brdf;
}

ClippedQuadric.prototype.transform = function(mat) {
  this.invMat = mat.clone().invert();
  this.invTransMat = this.invMat.clone().transpose();
  this.surfaceCoeffMatrix = this.invMat.clone().mul(this.surfaceCoeffMatrix).mul(this.invTransMat);
  this.clipperCoeffMatrix = this.invMat.clone().mul(this.clipperCoeffMatrix).mul(this.invTransMat);
};

ClippedQuadric.prototype.transformClipper = function(mat){
  this.invMat = mat.clone().invert();
  this.invTransMat = this.invMat.clone().transpose();
  this.clipperCoeffMatrix = this.invMat.clone().mul(this.clipperCoeffMatrix).mul(this.invTransMat);
}

ClippedQuadric.prototype.setClipper = function(mat) {
  this.clipperCoeffMatrix = mat;
}

ClippedQuadric.prototype.setUnitSphere = function(){
  this.surfaceCoeffMatrix.set(new Mat4(
  	[1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, -9]));
  this.clipperCoeffMatrix.set(new Mat4(
  	[0,0,0,0,
  	0,0,0,0,
  	0,0,0,0,
  	0,0,0,-1]));
}

ClippedQuadric.prototype.setUnitCylinder = function() {
	this.surfaceCoeffMatrix.set(new Mat4([
		1, 0,0,0,
		0,0,0,0,
		0,0,1,0,
		0,0,0,-1]));
	this.clipperCoeffMatrix.set(new Mat4(
  	[0,0,0,0,
  	0,1,0,0,
  	0,0,0,0,
  	0,0,0,-1]));
}

ClippedQuadric.prototype.setUnitCone = function(){
  this.surfaceCoeffMatrix.set(new Mat4(
    [1, 0, 0, 0,
    0, -1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 0]));
  this.clipperCoeffMatrix.set(new Mat4(
    [0,0,0,0,
    0,1,0,0,
    0,0,0,0,
    0,0,0,-1]));
}

