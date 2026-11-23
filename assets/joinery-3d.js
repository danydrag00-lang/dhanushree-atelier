/* Dhanushree — genuinely interactive WebGL 3D joinery study.
   An illustrative study of geometry and joinery, not a model of stock for sale. */
(() => {
  'use strict';
  const canvas=document.getElementById('joinery-canvas');
  if(!canvas)return;
  const gl=canvas.getContext('webgl',{alpha:true,antialias:true,preserveDrawingBuffer:false,powerPreference:'low-power'});
  if(!gl){canvas.hidden=true;return;}
  const vert=`attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute float aPiece;
    uniform float uAngle; uniform float uTilt; uniform float uAspect;
    varying vec3 vNormal; varying vec3 vPos; varying float vPiece;
    void main(){
      float c=cos(uAngle),s=sin(uAngle),ct=cos(uTilt),st=sin(uTilt);
      mat3 yaw=mat3(c,0.,-s,0.,1.,0.,s,0.,c);
      mat3 tilt=mat3(1.,0.,0.,0.,ct,st,0.,-st,ct);
      vec3 p=tilt*yaw*aPosition;
      vNormal=normalize(tilt*yaw*aNormal); vPos=aPosition; vPiece=aPiece;
      float z=5.25-p.z;
      gl_Position=vec4(p.x*3.05/max(.73,uAspect),p.y*3.35,z*.98-.6,z);
    }`;
  const frag=`precision mediump float;
    varying vec3 vNormal; varying vec3 vPos; varying float vPiece;
    uniform vec3 uWood;
    float noise(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,37.719)))*43758.5453);}
    void main(){
      vec3 n=normalize(vNormal);
      vec3 key=normalize(vec3(-.55,.85,1.));
      float lambert=max(dot(n,key),0.);
      float fill=max(dot(n,normalize(vec3(.5,.15,-.8))),0.)*.18;
      float grain=sin(vPos.y*33.+sin(vPos.x*9.)*.8+sin(vPos.z*22.)*.3);
      float layered=sin(vPos.y*10.+sin(vPos.x*3.)*1.5);
      float micro=noise(floor(vPos*92.))*.028;
      vec3 wood=uWood * (0.88+grain*.075+layered*.045+micro);
      wood*= (vPiece<.5?1.0:(vPiece<1.5?.89:1.075));
      vec3 light=vec3(.28)+vec3(.72)*lambert+vec3(.2)*fill;
      float spec=pow(max(dot(reflect(-key,n),normalize(vec3(0.,.1,1.))),0.),32.)*.15;
      vec3 finalColor=wood*light+vec3(.93,.71,.49)*spec;
      finalColor=pow(finalColor,vec3(.94));
      gl_FragColor=vec4(finalColor,1.);
    }`;
  function shader(type,source){const sh=gl.createShader(type);gl.shaderSource(sh,source);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS)){console.warn('3D shader unavailable');return null;}return sh;}
  const vs=shader(gl.VERTEX_SHADER,vert),fs=shader(gl.FRAGMENT_SHADER,frag);
  if(!vs||!fs){canvas.hidden=true;return;}
  const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)){canvas.hidden=true;return;}
  gl.useProgram(program);
  canvas.parentElement.classList.add('webgl-ready');
  const data=[], normals=[], pieces=[];
  const box=(cx,cy,cz,sx,sy,sz,piece=0)=>{
    const x=sx/2,y=sy/2,z=sz/2;
    const faces=[
      {n:[0,0,1],v:[[-x,-y,z],[x,-y,z],[x,y,z],[-x,y,z]]},
      {n:[0,0,-1],v:[[x,-y,-z],[-x,-y,-z],[-x,y,-z],[x,y,-z]]},
      {n:[1,0,0],v:[[x,-y,z],[x,-y,-z],[x,y,-z],[x,y,z]]},
      {n:[-1,0,0],v:[[-x,-y,-z],[-x,-y,z],[-x,y,z],[-x,y,-z]]},
      {n:[0,1,0],v:[[-x,y,z],[x,y,z],[x,y,-z],[-x,y,-z]]},
      {n:[0,-1,0],v:[[-x,-y,-z],[x,-y,-z],[x,-y,z],[-x,-y,z]]}
    ];
    for(const f of faces) for(const i of [0,1,2,0,2,3]){
      const v=f.v[i];data.push(v[0]+cx,v[1]+cy,v[2]+cz);
      normals.push(...f.n);pieces.push(piece);
    }
  };
  // Sculptural timber portal with exposed mortise and tenon logic.
  box(-.94,-.03,0,.29,2.65,.33,0);
  box(.94,-.03,0,.29,2.65,.33,0);
  box(0,1.08,0,2.18,.3,.37,2);
  box(0,-.89,.015,1.68,.19,.30,1);
  box(0,.27,-.09,1.48,.13,.22,2);
  // Express the joinery: protruding tenon ends, visible caps and joint collars.
  box(-1.13,1.08,0,.19,.19,.23,1);
  box(1.13,1.08,0,.19,.19,.23,1);
  box(-.94,1.34,0,.19,.19,.19,2);
  box(.94,1.34,0,.19,.19,.19,2);
  box(-.94,-.89,0,.42,.12,.35,1);
  box(.94,-.89,0,.42,.12,.35,1);
  const createBuffer=(arr,attrib,size)=>{const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(arr),gl.STATIC_DRAW);const loc=gl.getAttribLocation(program,attrib);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,0,0);return buffer;};
  const buffers=[createBuffer(data,'aPosition',3),createBuffer(normals,'aNormal',3),createBuffer(pieces,'aPiece',1)];
  const uniforms={angle:gl.getUniformLocation(program,'uAngle'),tilt:gl.getUniformLocation(program,'uTilt'),aspect:gl.getUniformLocation(program,'uAspect'),wood:gl.getUniformLocation(program,'uWood')};
  const colors={walnut:[.53,.30,.17],teak:[.68,.45,.25],oak:[.76,.59,.41]};
  let finish='walnut',angle=-.39,tilt=-.14,drag=false,lastX=0,visible=true,raf=0,last=0;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  const maxDpr=()=>Math.min(window.devicePixelRatio||1,1.6);
  function resize(){const rect=canvas.getBoundingClientRect();const w=Math.max(1,Math.round(rect.width*maxDpr())),h=Math.max(1,Math.round(rect.height*maxDpr()));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}gl.viewport(0,0,canvas.width,canvas.height);}
  function render(t){raf=0;if(!visible||document.hidden)return;resize();
    if(!reduce.matches&&!drag&&last)angle+=Math.min(.02,(t-last)*.000028);
    last=t;
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.enable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);
    gl.uniform1f(uniforms.angle,angle);gl.uniform1f(uniforms.tilt,tilt);
    gl.uniform1f(uniforms.aspect,canvas.width/canvas.height);
    gl.uniform3fv(uniforms.wood,colors[finish]);gl.drawArrays(gl.TRIANGLES,0,data.length/3);
    if(!reduce.matches)raf=requestAnimationFrame(render);
  }
  function request(){if(!raf)raf=requestAnimationFrame(render);}
  if('IntersectionObserver' in window){const obs=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)request();else if(raf){cancelAnimationFrame(raf);raf=0;last=0;}},{threshold:.05});obs.observe(canvas);}
  canvas.addEventListener('pointerdown',e=>{drag=true;lastX=e.clientX;canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(!drag)return;angle+=(e.clientX-lastX)*.009;lastX=e.clientX;request();});
  canvas.addEventListener('pointerup',()=>{drag=false;request();});
  canvas.addEventListener('pointercancel',()=>{drag=false;request();});
  document.addEventListener('visibilitychange',()=>{last=0;if(!document.hidden)request();});
  window.addEventListener('resize',request,{passive:true});
  document.querySelectorAll('[data-wood-finish]').forEach(b=>b.addEventListener('click',()=>{finish=b.dataset.woodFinish;document.querySelectorAll('[data-wood-finish]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));request();}));
  request();
  window.addEventListener('pagehide',()=>{if(raf)cancelAnimationFrame(raf);buffers.forEach(b=>gl.deleteBuffer(b));gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);},{once:true});
})();
