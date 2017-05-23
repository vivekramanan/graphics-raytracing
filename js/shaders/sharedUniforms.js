Material.shared = {
  modelMatrix : new Mat4(),
  modelMatrixInverse : new Mat4(),
  modelViewProjMatrix : new Mat4(),
  rayDirMatrix : new Mat4(),
  eyePos : new Vec3(),
  texOffset : new Vec2(),
  lightPos : new Vec3Array(3),
  lightPowerDensity : new Vec3Array(3),
  quadrics: new Mat4Array(100),
  brdfs: new Vec4Array(50),
};

