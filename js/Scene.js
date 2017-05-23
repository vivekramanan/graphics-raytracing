var Scene = function(gl) {
  // Basics defined
  this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, "idle_vs.essl");
  this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "solid_fs.essl");
  this.fsReflect = new Shader(gl, gl.FRAGMENT_SHADER, "reflect_fs.essl");
  this.vsEnvMap = new Shader(gl, gl.VERTEX_SHADER, "envmap_vs.essl");
  this.fsEnvMap = new Shader(gl, gl.FRAGMENT_SHADER, "envmap_fs.essl");

  this.solidProgram = new Program(gl, this.vsIdle, this.fsSolid);
  this.reflectProgram = new Program(gl, this.vsIdle, this.fsReflect);
  this.envProgram = new Program(gl, this.vsEnvMap, this.fsEnvMap);

  this.quadGeometry = new QuadGeometry(gl);
  this.gameObjects = [];
  this.counter = 0;
  this.animateCount = 0;

  // Materials
  this.materials = [];
  this.quads = []

  this.cubeMat = new Material(gl, this.reflectProgram);
  /*this.cubeTex = new TextureCube(gl, [
    'skysky.jpg', 'skysky.jpg', 'skysky.jpg',
    'skysky.jpg', 'skysky.jpg', 'skysky.jpg']);*/
  this.cubeTex = new TextureCube(gl, [
    'envmap/ss_ft.jpg', 'envmap/ss_bk.jpg', 'envmap/ss_up.jpg',
    'envmap/ss_dn.jpg', 'envmap/ss_rt.jpg', 'envmap/ss_lf.jpg']);
  this.cubeMat.envTexture.set(this.cubeTex);

  this.environment = new Material(gl, this.envProgram);
  this.environment.envTexture.set(this.cubeTex);
      
  this.beachball = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(1,0,0,1));
  this.beachball.setUnitSphere();
  this.beachball.transform(new Mat4(
  	[0.5,0,0,0,
  	0,0.5,0,0,
  	0,0,0.5,0,
  	-9,-4,-10,1]));
  this.quads.push(this.beachball);

  this.beach = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(.8,.8,0.4,1));
  this.beach.setUnitSphere();
  this.beach.transform(new Mat4(
  	[15,0,0,0,
  	0,2,0,0,
  	0,0,8,0,
  	0,-10,-25,1]));
  this.beach.setClipper(new Mat4([
    0, 0, 0, 0,
    0, 0, 0, -2.5,
    0, 0, 0, 0,
    0, 0, 0, 1]));
  this.beach.transformClipper(new Mat4(
    [1,0,0,0,
    0,1,0,4,
    0,0,1,0,
    0,-5.5,0,-1]));
  this.quads.push(this.beach);

  this.column = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(1,0,0,1));
  this.column.setUnitCylinder();
  this.column.transform(new Mat4(
  	[0.5,0,0,0,
  	0,5,0,0,
  	0,0,.5,0,
  	10,-2,-10,1]));
  this.quads.push(this.column);

  this.parasol = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(0,0,1,1));
  this.parasol.setUnitSphere();
  this.parasol.transform(new Mat4().scale(2,1,1).translate(10, 2, -10));
  this.parasol.setClipper(new Mat4([
    0, 0, 0, 0,
    0, 0, 0, 0.3,
    0, 0, 0, 0,
    0, 0, 0, 1]));
  this.parasol.transformClipper(new Mat4([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0.3, 0, -1]));
  this.quads.push(this.parasol);

  this.castleCol1 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(1,1,0,1));
  this.castleCol1.setUnitCylinder();
  this.castleCol1.transform(new Mat4().scale(0.8,1.5,1).translate(0,-5,-7));
  this.quads.push(this.castleCol1);

  this.castleCol2 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(1,1,0,1));
  this.castleCol2.setUnitCylinder();
  this.castleCol2.transform(new Mat4().scale(.6,.6,.6).translate(1.5,-6,-5));
  this.quads.push(this.castleCol2);

  this.castleCol3 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(1,1,0,1));
  this.castleCol3.setUnitCylinder();
  this.castleCol3.transform(new Mat4().scale(.6,.6,.6).translate(-1.5,-6,-5));
  this.quads.push(this.castleCol3);

  this.castleCol4 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(1,1,0,1));
  this.castleCol4.setUnitCylinder();
  this.castleCol4.transform(new Mat4().scale(.6,.8,.6).translate(-1.25,-5,-9));
  this.quads.push(this.castleCol4);

  this.castleCol5 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(1,1,0,1));
  this.castleCol5.setUnitCylinder();
  this.castleCol5.transform(new Mat4().scale(.6,.8,.6).translate(1.25,-5,-9));
  this.quads.push(this.castleCol5);

  this.castleCol6 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(1,1,0,1));
  this.castleCol6.setUnitCylinder();
  this.castleCol6.transform(new Mat4().scale(0.6,0.5,1).translate(0,-6,-5));
  this.quads.push(this.castleCol6);

  this.cone = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(.8,.8,0,1));
  this.cone.setUnitCone();
  this.cone.transformClipper(new Mat4(
  	[0.5,0,0,0,
    0,.5,0,0,
    0,0,.5,0,
    0,.5,0,-1]));
  this.cone.transform(new Mat4().scale(1,1,1).translate(0,-2.5,-7));
  this.quads.push(this.cone);

  this.cone1 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(.8,.8,0,1));
  this.cone1.setUnitCone();
  this.cone1.transformClipper(new Mat4(
    [0.5,0,0,0,
    0,.5,0,0,
    0,0,.5,0,
    0,.5,0,-1]));
  this.cone1.transform(new Mat4().scale(.6,.6,.6).translate(1.5,-4.8,-5));
  this.quads.push(this.cone1);
  
  this.cone2 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(.8,.8,0,1));
  this.cone2.setUnitCone();
  this.cone2.transformClipper(new Mat4(
    [0.5,0,0,0,
    0,.5,0,0,
    0,0,.5,0,
    0,.5,0,-1]));
  this.cone2.transform(new Mat4().scale(.6,.6,.6).translate(-1.5,-4.8,-5));
  this.quads.push(this.cone2);
 
  this.cone3 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(.8,.8,0,1));
  this.cone3.setUnitCone();
  this.cone3.transformClipper(new Mat4(
    [0.5,0,0,0,
    0,.5,0,0,
    0,0,.5,0,
    0,.5,0,-1]));
  this.cone3.transform(new Mat4().scale(.8,.8,.8).translate(-1.25,-3.5,-9));
  this.quads.push(this.cone3);
  
  this.cone4 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(.8,.8,0,1));
  this.cone4.setUnitCone();
  this.cone4.transformClipper(new Mat4(
    [0.5,0,0,0,
    0,.5,0,0,
    0,0,.5,0,
    0,.5,0,-1]));
  this.cone4.transform(new Mat4().scale(.8,.8,.8).translate(1.25,-3.5,-9));
  this.quads.push(this.cone4);

  this.cone5 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(.8,.8,0,1));
  this.cone5.setUnitCone();
  this.cone5.transformClipper(new Mat4(
    [0.5,0,0,0,
    0,.5,0,0,
    0,0,.5,0,
    0,.5,0,-1]));
  this.cone5.transform(new Mat4().scale(.6,.6,.6).translate(0,-4.9,-5));
  this.quads.push(this.cone5);

  this.palm1 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(0.4, 0.2, 0.1, 1));
  this.palm1.setUnitCone();
  this.palm1.transformClipper(new Mat4(
    [0.5,0,0,0,
    0,.5,0,0,
    0,0,.5,0,
    0,.5,0,-1]));
  this.palm1.transform(new Mat4().scale(1.5, 7.0, 1.5).translate(-15, 0, -10));
  this.quads.push(this.palm1);

  this.palm2 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(0.4, 0.2, 0.1, 1));
  this.palm2.setUnitCone();
  this.palm2.transformClipper(new Mat4(
    [0.5,0,0,0,
    0,.5,0,0,
    0,0,.5,0,
    0,.5,0,-1]));
  this.palm2.transform(new Mat4().scale(1.2, 6.0, 1.2).translate(-15, 2, -10));
  this.quads.push(this.palm2);

  this.palm3 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(0.4, 0.2, 0.1, 1));
  this.palm3.setUnitCone();
  this.palm3.transformClipper(new Mat4(
    [0.5,0,0,0,
    0,.5,0,0,
    0,0,.5,0,
    0,.5,0,-1]));
  this.palm3.transform(new Mat4().scale(1.0, 5.0, 1.0).translate(-15, 3, -10));
  this.quads.push(this.palm3);

  this.palm4 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(0.4, 0.2, 0.1, 1));
  this.palm4.setUnitCone();
  this.palm4.transformClipper(new Mat4(
    [0.5,0,0,0,
    0,.5,0,0,
    0,0,.5,0,
    0,.5,0,-1]));
  this.palm4.transform(new Mat4().scale(.8, 4.0, .8).translate(-15, 4.2, -10));
  this.quads.push(this.palm4);

  this.leaf1 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(0,1,0,1));
  this.leaf1.setUnitSphere();
  this.leaf1.transform(new Mat4([
    .7, 0, 0, 0,
    0, .2, 0, 0,
    0, 0, .2, 0,
    -13, 4, -10, 1]));
  this.leaf1.setClipper(new Mat4([
    0, 0, 0, 0,
    0, 0, 0, 2.2,
    0, 0, 0, 0,
    0, 0, 0, 1]));
  this.leaf1.transformClipper(new Mat4([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, -3.8, 0, -1]));
  this.quads.push(this.leaf1);

  this.leaf2 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(0,1,0,1));
  this.leaf2.setUnitSphere();
  this.leaf2.transform(new Mat4([
    .7, 0, 0, 0,
    0, .2, 0, 0,
    0, 0, .2, 0,
    -17, 4, -10, 1]));
  this.leaf2.setClipper(new Mat4([
    0, 0, 0, 0,
    0, 0, 0, 2.2,
    0, 0, 0, 0,
    0, 0, 0, 1]));
  this.leaf2.transformClipper(new Mat4([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, -3.8, 0, -1]));
  this.quads.push(this.leaf2);

  this.leaf3 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(0,1,0,1));
  this.leaf3.setUnitSphere();
  this.leaf3.transform(new Mat4([
    .2, 0, 0, 0,
    0, .2, 0, 0,
    0, 0, .7, 0,
    -15, 4, -12, 1]));
  this.leaf3.setClipper(new Mat4([
    0, 0, 0, 0,
    0, 0, 0, 2.2,
    0, 0, 0, 0,
    0, 0, 0, 1]));
  this.leaf3.transformClipper(new Mat4([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, -3.8, 0, -1]));
  this.quads.push(this.leaf3);

  this.leaf4 = new ClippedQuadric(new Mat4(), new Mat4(),new Vec4(0,1,0,1));
  this.leaf4.setUnitSphere();
  this.leaf4.transform(new Mat4([
    .2, 0, 0, 0,
    0, .2, 0, 0,
    0, 0, .7, 0,
    -15, 4, -8, 1]));
  this.leaf4.setClipper(new Mat4([
    0, 0, 0, 0,
    0, 0, 0, 2.2,
    0, 0, 0, 0,
    0, 0, 0, 1]));
  this.leaf4.transformClipper(new Mat4([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, -3.8, 0, -1]));
  this.quads.push(this.leaf4);

  this.ocean = new ClippedQuadric(new Mat4([
  	0,0,0,0,
  	0,1,0,0,
  	0,0,0,0,
  	0,0,0,-9]), new Mat4([0,0,0,0,
  	0,0,0,0,
  	0,0,0,0,
  	0,0,0,0]), new Vec4(.15,.8,.9,1));
  this.ocean.transform(new Mat4().scale(1.0, 1.0, 1.0).translate(0, -10.5, 0));
  this.quads.push(this.ocean);  

  // Mesh
  this.envMesh = new Mesh(this.quadGeometry, this.environment);

  //Sky
  this.envMap = new GameObject2D(this.envMesh);
  this.envMap.updateModelTransformation();

  //Light Source
  this.lightSource1 = new lightSource(new Vec3(20,20,20), new Vec3(1,1,1));
  this.lightSource2 = new lightSource(new Vec3(-20, -20, -20), new Vec3(1,1,1));
  this.lightSource3 = new lightSource(new Vec3(0, 10, 10), new Vec3(1,1,1));
  this.lights = [this.lightSource1, this.lightSource2, this.lightSource3];

  // Camera
  this.camera = new PerspectiveCamera();
  this.camera.position.set(0, -3, 20);
  this.camera.updateViewMatrix();

  gl.enable(gl.DEPTH_TEST);
};

Scene.prototype.update = function(gl, keysPressed) {

  var timeAtThisFrame = new Date().getTime();
  var dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;
  this.timeDiff = (timeAtThisFrame - this.timeStart ) / 1000.0;

  gl.clearColor(0.0, 0.0, .3, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  this.envMap.draw(this.camera, this.lights, this.quads);

  if(this.animateCount >= 0) {
    this.beachball.transform(new Mat4().translate(0,0.1,0));
    this.parasol.transform(new Mat4().translate(0.02,0.,0.));
    this.animateCount +=1;
    if(this.animateCount == 15) {
      this.animateCount = -15;
    }
  }
  else {
    this.beachball.transform(new Mat4().translate(0,-0.1,0));
    this.parasol.transform(new Mat4().translate(-0.02,0.,0.));
    this.animateCount += 1;
  }


  this.camera.move(dt, keysPressed);
  this.camera.updateViewMatrix();
  this.camera.updateProjMatrix();
  this.camera.updateRayDirMatrix();

};

Scene.prototype.mouseDown = function(event) { 
  this.camera.mouseDown();
}; 
  
Scene.prototype.mouseMove = function(event) { 
  this.camera.mouseMove(event);
}; 
  
Scene.prototype.mouseUp = function(event) { 
  this.camera.mouseUp();
}; 


