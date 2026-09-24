import bpy, math, pathlib, json
from mathutils import Vector

OUT=pathlib.Path("render_output/morphmint_005_probe")
OUT.mkdir(parents=True, exist_ok=True)

W,H=360,640
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
scene=bpy.context.scene
scene.render.engine='BLENDER_EEVEE'
scene.render.resolution_x=W
scene.render.resolution_y=H
scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG'
scene.world.color=(0.004,0.006,0.012)

def principled(name, base, metallic=0.0, rough=0.35, transmission=0.0, ior=1.45):
    m=bpy.data.materials.new(name)
    m.use_nodes=True
    bsdf=m.node_tree.nodes.get('Principled BSDF')
    bsdf.inputs['Base Color'].default_value=base
    bsdf.inputs['Metallic'].default_value=metallic
    bsdf.inputs['Roughness'].default_value=rough
    if 'Transmission Weight' in bsdf.inputs:
        bsdf.inputs['Transmission Weight'].default_value=transmission
    if 'IOR' in bsdf.inputs:
        bsdf.inputs['IOR'].default_value=ior
    return m

CERAMIC=principled("MM_Ceramic",(0.65,0.09,0.025,1),0.0,0.46)
CHROME=principled("MM_Chrome",(0.65,0.72,0.82,1),1.0,0.12)
CRYSTAL=principled("MM_Crystal",(0.05,0.32,0.95,1),0.0,0.08,1.0,1.46)

bpy.ops.mesh.primitive_cylinder_add(vertices=96, radius=1.55, depth=0.34, location=(0,0,0))
body=bpy.context.object
body.name="MorphMint_Body"
body.rotation_euler=(math.radians(90),0,0)
body.data.materials.append(CERAMIC)
bev=body.modifiers.new("BodyBevel","BEVEL"); bev.width=0.08; bev.segments=4
bpy.ops.object.shade_smooth()

bpy.ops.mesh.primitive_torus_add(major_radius=1.20,minor_radius=0.10,major_segments=96,minor_segments=20,location=(0,-0.20,0),rotation=(math.radians(90),0,0))
rim=bpy.context.object; rim.name="MorphMint_Rim"; rim.data.materials.append(CERAMIC)

bpy.ops.mesh.primitive_cube_add(location=(0,-0.24,0))
bar=bpy.context.object; bar.name="MorphMint_IdentityBar"; bar.scale=(0.12,0.07,0.70)
bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
bar.data.materials.append(CERAMIC)
bev2=bar.modifiers.new("BarBevel","BEVEL"); bev2.width=0.05; bev2.segments=4

# Ground
bpy.ops.mesh.primitive_plane_add(size=20, location=(0,2,-2.25))
floor=bpy.context.object
floor.data.materials.append(principled("FloorMat",(0.012,0.016,0.028,1),0.15,0.28))

# Reflection cards so chrome reads as real reflected environment
for x,z,sx,sz,val in [(-4,1.2,2.2,5.0,0.9),(4,0.6,1.5,4.0,0.5),(0,5,4.5,2.0,0.25)]:
    bpy.ops.mesh.primitive_plane_add(size=2, location=(x,1.5,z))
    card=bpy.context.object
    card.scale=(sx,sz,1)
    card.rotation_euler=(math.radians(90),0,0)
    card.data.materials.append(principled(f"Card_{x}_{z}",(val,val,val,1),0.0,0.55))

for loc,energy,size,color,name in [
    ((-3.5,-4.0,5.0),1700,4.5,(1.0,0.56,0.35),"Key"),
    ((3.8,-3.0,1.5),1300,4.0,(0.28,0.52,1.0),"Fill"),
    ((0,2.0,5.2),1100,3.0,(0.55,0.85,1.0),"Rim")
]:
    bpy.ops.object.light_add(type='AREA',location=loc)
    l=bpy.context.object; l.name=name; l.data.energy=energy; l.data.size=size; l.data.color=color
    l.rotation_euler=(Vector((0,0,0))-l.location).to_track_quat('-Z','Y').to_euler()

bpy.ops.object.camera_add(location=(0,-10.5,0.5))
cam=bpy.context.object; cam.data.lens=62
cam.rotation_euler=(Vector((0,0,0))-cam.location).to_track_quat('-Z','Y').to_euler()
scene.camera=cam

objects=(body,rim,bar)
states=[("ceramic",CERAMIC),("chrome",CHROME),("crystal",CRYSTAL)]
rendered=[]
for name,mat in states:
    for obj in objects:
        obj.data.materials.clear()
        obj.data.materials.append(mat)
    scene.render.filepath=str(OUT/f"{name}.png")
    bpy.ops.render.render(write_still=True)
    rendered.append(str(OUT/f"{name}.png"))

result={
  "marker":"MORPHMINT_005_PUBLIC_REMOTE_3STATE_PASS",
  "resolution":f"{W}x{H}",
  "engine":scene.render.engine,
  "renders":rendered,
  "note":"Execution/readability probe only; not final 90-point quality gate."
}
(OUT/"result.json").write_text(json.dumps(result,indent=2),encoding="utf-8")
print("MORPHMINT_005_PUBLIC_REMOTE_3STATE_PASS")
