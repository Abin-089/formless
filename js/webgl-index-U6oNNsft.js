import{W as S,C as z,S as y,a as g,R as h,P as v,M as f,B as M,b as D,L as C,A as b,V as l,c as F,d as B,H as E,F as R,E as P,e as L,f as T,g as Y}from"./vendor-nPfpQV2Q.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();class X{constructor(){this.bus=document.createElement("fakeelement")}on(e,t){this.bus.addEventListener(e,t)}off(e,t){this.bus.removeEventListener(e,t)}emit(e,t={}){this.bus.dispatchEvent(new CustomEvent(e,{detail:t}))}}const A=new X;class V{constructor(e){this.props=e;const{left:t,top:i,width:s,height:r}=this.props.wrapper.getBoundingClientRect();this.left=t,this.top=i,this.width=s,this.height=r,this.aspect=this.width/this.height,this.isMobile=!1,this.breakpoint=768,this.fboWidth=null,this.fboHeight=null,this.resizeFunc=this.resize.bind(this),this.time=0,this.delta=0,this.init()}init(){this.pixelRatio=window.devicePixelRatio,this.resize(),this.renderer=new S({powerPreference:"high-performance",antialias:!1,stencil:!1,depth:!1}),this.renderer.autoClear=!1,this.renderer.setSize(this.width,this.height),this.renderer.setClearColor(0),this.renderer.setPixelRatio(Math.min(2,window.devicePixelRatio)),this.updateViewport(),this.clock=new z,this.clock.start()}resize(){const{left:e,top:t,width:i,height:s}=this.props.wrapper.getBoundingClientRect();this.left=e,this.top=t,this.width=i,this.height=s,this.aspect=this.width/this.height,this.landscape=this.width>this.height,this.renderer&&(this.renderer.setSize(this.width,this.height),this.updateViewport())}updateViewport(){this.offWidth=this.width*.06,this.offHeight=this.height*.06,this.renderer.setViewport(-this.offWidth,-this.offHeight,this.width+2*this.offWidth,this.height+2*this.offHeight)}update(){this.delta=this.clock.getDelta(),this.time+=this.delta;const{left:e,top:t,width:i,height:s}=this.props.wrapper.getBoundingClientRect();this.left=e,this.top=t}}class O{constructor(){this.options={blur_scale:150,film_grain:.4,iterations_poisson:16,mouse_force:3,resolution:.25,cursor_size:100,isBounce:!1,dt:.016666666,fluidDecay:.99,BFECC:!0},this.init()}init(){}}const o=new O;var d=`attribute vec3 position;
uniform vec2 px;
uniform vec2 boundarySpace;
varying vec2 uv;

precision highp float;

void main(){
    vec3 pos = position;
    vec2 scale = 1.0 - boundarySpace * 2.0;
    pos.xy = pos.xy * scale;
    uv = vec2(0.5)+(pos.xy)*0.5;
    gl_Position = vec4(pos, 1.0);
}`,U=`attribute vec3 position;
varying vec2 uv;
uniform vec2 px;

precision highp float;

void main(){
    vec3 pos = position;
    uv = 0.5 + pos.xy * 0.5;
    vec2 n = sign(pos.xy);
    pos.xy = abs(pos.xy) - px * 1.0;
    pos.xy *= n;
    gl_Position = vec4(pos, 1.0);
}`,x=`precision highp float;
uniform sampler2D velocity;
uniform float dt;
uniform bool isBFECC;

uniform vec2 fboSize;
uniform vec2 px;
varying vec2 uv;

void main(){
    vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;

    if(isBFECC == false){
        vec2 vel = texture2D(velocity, uv).xy;
        vec2 uv2 = uv - vel * dt * ratio;
        vec2 newVel = texture2D(velocity, uv2).xy;
        gl_FragColor = vec4(newVel, 0.0, 0.0);
    } else {
        vec2 spot_new = uv;
        vec2 vel_old = texture2D(velocity, uv).xy;
        
        vec2 spot_old = spot_new - vel_old * dt * ratio;
        vec2 vel_new1 = texture2D(velocity, spot_old).xy;

        
        vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
        
        vec2 error = spot_new2 - spot_new;

        vec2 spot_new3 = spot_new - error / 2.0;
        vec2 vel_2 = texture2D(velocity, spot_new3).xy;

        
        vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
        
        
        vec2 newVel2 = texture2D(velocity, spot_old2).xy * 0.997;   
        gl_FragColor = vec4(newVel2, 0.0, 0.0);
    }
}`;class u{constructor(e){var t;this.props=e,this.uniforms=(t=this.props.material)==null?void 0:t.uniforms}init(){this.scene=new y,this.camera=new g,this.uniforms&&(this.material=new h(this.props.material),this.geometry=new v(2,2),this.plane=new f(this.geometry,this.material),this.scene.add(this.plane))}update(){this.props.common.renderer.setRenderTarget(this.props.output),this.props.common.renderer.render(this.scene,this.camera),this.props.common.renderer.setRenderTarget(null)}}class G extends u{constructor(e){super({common:e.common,material:{vertexShader:d,fragmentShader:x,uniforms:{boundarySpace:{value:e.cellScale},px:{value:e.cellScale},fboSize:{value:e.fboSize},velocity:{value:e.src.texture},dt:{value:e.dt},isBFECC:{value:!0}}},output:e.dst}),this.init()}init(){super.init(),this.createBoundary()}createBoundary(){const e=new M,t=new Float32Array([-1,-1,0,-1,1,0,-1,1,0,1,1,0,1,1,0,1,-1,0,1,-1,0,-1,-1,0]);e.setAttribute("position",new D(t,3));const i=new h({vertexShader:U,fragmentShader:x,uniforms:this.uniforms});this.line=new C(e,i),this.scene.add(this.line)}update({dt:e,isBounce:t,BFECC:i}){this.uniforms.dt.value=e,this.line.visible=t,this.uniforms.isBFECC.value=i,super.update()}}var w=`precision highp float;

attribute vec3 position;
attribute vec2 uv;
uniform vec2 center;
uniform vec2 scale;
uniform vec2 px;
varying vec2 vUv;

void main(){
    vec2 pos = position.xy * scale * 2.0 * px + center;
    vUv = uv;
    gl_Position = vec4(pos, 0.0, 1.0);
}`,_=`precision highp float;

uniform vec2 force;
uniform vec2 center;
uniform vec2 scale;
uniform vec2 px;
varying vec2 vUv;

void main(){
    vec2 circle = (vUv - 0.5) * 2.0;
    float d = 1.0 - min(length(circle), 1.0);
    d *= d;
    
    gl_FragColor = vec4(force, 0.0, d);         
}`;class I extends u{constructor(e){super({common:e.common,output:e.dst}),this.simProps=e,this.init(e)}init(e){super.init();const t=new v(1,1),i=new h({vertexShader:w,fragmentShader:_,blending:b,uniforms:{px:{value:e.cellScale},force:{value:new l(0,0)},center:{value:new l(0,0)},scale:{value:new l(e.cursor_size,e.cursor_size)}}});this.mouse=new f(t,i),this.scene.add(this.mouse)}update(e){let t=this.simProps.mouse.diff.x/2*e.mouse_force,i=this.simProps.mouse.diff.y/2*e.mouse_force;const s=e.cursor_size*e.cellScale.x,r=e.cursor_size*e.cellScale.y;let c=Math.min(Math.max(this.simProps.mouse.coords.x,-1+s+e.cellScale.x*2),1-s-e.cellScale.x*2),p=Math.min(Math.max(this.simProps.mouse.coords.y,-1+r+e.cellScale.y*2),1-r-e.cellScale.y*2);const a=this.mouse.material.uniforms;a.force.value.set(t,i),a.center.value.set(c,p),a.scale.value.set(e.cursor_size,e.cursor_size),super.update()}}var W=`precision highp float;
uniform sampler2D velocity;
uniform float dt;
uniform vec2 px;
varying vec2 uv;

void main(){
    float x0 = texture2D(velocity, uv-vec2(px.x, 0)).x;
    float x1 = texture2D(velocity, uv+vec2(px.x, 0)).x;
    float y0 = texture2D(velocity, uv-vec2(0, px.y)).y;
    float y1 = texture2D(velocity, uv+vec2(0, px.y)).y;
    float divergence = (x1-x0 + y1-y0) / 2.0;

    gl_FragColor = vec4(divergence / dt);
}`;let $=class extends u{constructor(e){super({common:e.common,material:{vertexShader:d,fragmentShader:W,uniforms:{boundarySpace:{value:e.boundarySpace},velocity:{value:e.src.texture},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst}),this.init()}update({vel:e}){this.uniforms.velocity.value=e.texture,super.update()}};var N=`precision highp float;
uniform sampler2D pressure;
uniform sampler2D divergence;
uniform vec2 px;
varying vec2 uv;

void main(){    
    
    float p0 = texture2D(pressure, uv+vec2(px.x * 2.0,  0)).r;
    float p1 = texture2D(pressure, uv-vec2(px.x * 2.0, 0)).r;
    float p2 = texture2D(pressure, uv+vec2(0, px.y * 2.0 )).r;
    float p3 = texture2D(pressure, uv-vec2(0, px.y * 2.0 )).r;
    float div = texture2D(divergence, uv).r;
    
    float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
    gl_FragColor = vec4(newP);
}`;let Q=class extends u{constructor(e){super({common:e.common,material:{vertexShader:d,fragmentShader:N,uniforms:{boundarySpace:{value:e.boundarySpace},pressure:{value:e.dst_.texture},divergence:{value:e.src.texture},px:{value:e.cellScale}}},output:e.dst,output0:e.dst_,output1:e.dst}),this.init()}update({iterations:e}){let t,i;for(var s=0;s<e;s++)s%2==0?(t=this.props.output0,i=this.props.output1):(t=this.props.output1,i=this.props.output0),this.uniforms.pressure.value=t.texture,this.props.output=i,super.update();return i}};var H=`precision highp float;
uniform sampler2D pressure;
uniform sampler2D velocity;
uniform vec2 px;
uniform float dt;
varying vec2 uv;

void main(){
    float step = 1.0;

    float p0 = texture2D(pressure, uv+vec2(px.x * step, 0)).r;
    float p1 = texture2D(pressure, uv-vec2(px.x * step, 0)).r;
    float p2 = texture2D(pressure, uv+vec2(0, px.y * step)).r;
    float p3 = texture2D(pressure, uv-vec2(0, px.y * step)).r;

    vec2 v = texture2D(velocity, uv).xy;
    vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
    v = v - gradP * dt;
    gl_FragColor = vec4(v, 0.0, 1.0);
}`;class q extends u{constructor(e){super({common:e.common,material:{vertexShader:d,fragmentShader:H,uniforms:{boundarySpace:{value:e.boundarySpace},pressure:{value:e.src_p.texture},velocity:{value:e.src_v.texture},px:{value:e.cellScale},dt:{value:e.dt}}},output:e.dst}),this.init()}update({vel:e,pressure:t}){this.uniforms.velocity.value=e.texture,this.uniforms.pressure.value=t.texture,super.update()}}class k extends u{constructor(e){super({common:e.common,output:e.dst}),this.simProps=e,this.init(e)}init(e){super.init();const t=new v(1,1),i=new h({vertexShader:w,fragmentShader:_,blending:b,uniforms:{px:{value:e.cellScale},force:{value:new l(0,0)},center:{value:new l(0,0)},scale:{value:new l(e.cursor_size,e.cursor_size)}}});this.mouse=new f(t,i),this.scene.add(this.mouse),this.x=0,this.y=0,this.radians=5,this.velocity=.02,this.forceXMult=0,this.forceYMult=0}update(e){let t=this.simProps.mouse.diff.x/2*e.mouse_force,i=this.simProps.mouse.diff.y/2*e.mouse_force;this.simProps.mouse.diff.x>0?this.forceXMult-=.02:this.forceXMult+=.002,this.forceXMult=this.forceXMult>1?1:this.forceXMult<0?0:this.forceXMult,this.simProps.mouse.diff.y>0?this.forceYMult-=.02:this.forceYMult+=.002,this.forceYMult=this.forceYMult>1?1:this.forceYMult<0?0:this.forceYMult;const s=e.cursor_size*e.cellScale.x,r=e.cursor_size*e.cellScale.y;let c=Math.min(Math.max(this.simProps.mouse.coords.x,-1+s+e.cellScale.x*2),1-s-e.cellScale.x*2),p=Math.min(Math.max(this.simProps.mouse.coords.y,-1+r+e.cellScale.y*2),1-r-e.cellScale.y*2);const a=this.mouse.material.uniforms;this.radians+=this.velocity;const m=F.pingpong(this.simProps.common.time*.01,.03);this.x=0+Math.cos(this.radians)*(.1-m),this.y=0+Math.sin(this.radians)*(.1-m),c=this.x,p=this.y,t=this.x*.5*this.forceXMult,i=this.y*.5*this.forceYMult,a.force.value.set(t,i),a.center.value.set(c,p*this.simProps.common.aspect),a.scale.value.set(e.cursor_size,e.cursor_size),super.update()}}class j{constructor(e){this.props=e,this.fbos={vel_0:null,vel_1:null,dye_1:null,dye_2:null,div:null,pressure_0:null,pressure_1:null},this.fboSize=new l,this.cellScale=new l,this.boundarySpace=new l,this.init()}init(){this.calcSize(),this.createAllFBO(),this.createShaderPass()}createAllFBO(){const e=/(iPad|iPhone|iPod)/g.test(navigator.userAgent)?E:R;for(let t in this.fbos)this.fbos[t]=new B(this.fboSize.x,this.fboSize.y,{type:e})}createShaderPass(){this.advection=new G({common:this.props.common,cellScale:this.cellScale,fboSize:this.fboSize,dt:o.options.dt,src:this.fbos.vel_0,dst:this.fbos.vel_1}),this.circularMotion=new k({mouse:this.props.mouse,common:this.props.common,cellScale:this.cellScale,cursor_size:o.options.cursor_size,dst:this.fbos.vel_1}),this.props.allowCursor&&(this.externalForce=new I({mouse:this.props.mouse,common:this.props.common,cellScale:this.cellScale,cursor_size:o.options.cursor_size,dst:this.fbos.vel_1})),this.divergence=new $({common:this.props.common,cellScale:this.cellScale,boundarySpace:this.boundarySpace,dt:o.options.dt,src:this.fbos.vel_1,dst:this.fbos.div}),this.poisson=new Q({common:this.props.common,cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.div,dst:this.fbos.pressure_1,dst_:this.fbos.pressure_0}),this.pressure=new q({common:this.props.common,cellScale:this.cellScale,boundarySpace:this.boundarySpace,src_p:this.fbos.pressure_0,src_v:this.fbos.vel_1,dst:this.fbos.vel_0,dt:o.options.dt})}calcSize(){const e=Math.round(o.options.resolution*this.props.common.width),t=Math.round(o.options.resolution*this.props.common.height),i=1/e,s=1/t;this.cellScale.set(i,s),this.fboSize.set(e,t)}resize(){this.calcSize();for(let e in this.fbos)this.fbos[e].setSize(this.fboSize.x,this.fboSize.y)}update(){o.options.isBounce?this.boundarySpace.set(0,0):this.boundarySpace.copy(this.cellScale),this.advection.update(o.options),this.props.allowCursor&&this.externalForce.update({cursor_size:o.options.cursor_size,mouse_force:o.options.mouse_force,cellScale:this.cellScale}),this.circularMotion.update({cursor_size:o.options.cursor_size,mouse_force:o.options.mouse_force,cellScale:this.cellScale});let e=this.fbos.vel_1;this.divergence.update({vel:e});const t=this.poisson.update({iterations:o.options.iterations_poisson});this.pressure.update({vel:e,pressure:t})}}var K=`precision highp float;
uniform sampler2D velocity;
uniform float colorScale;
varying vec2 uv;

void main(){
    vec2 vel = texture2D(velocity, uv).xy;
    float len = length(vel);
    vel = vel * 0.5 + 0.5;
    
    
    
    
    

    
    float r = 0.35 * (1.0 - vel.x); 
    float g = vel.y * 0.85; 
    float b = vel.x * 1.0; 
    vec3 color = vec3(r, g, b);

    color = mix(vec3(0.0), color * 2.0, len);      

    gl_FragColor = vec4(color,  1.0);

    
    
    
    
    
    
    
    
}`;class J{constructor(e){this.props=e,this.init()}init(){this.simulation=new j({common:this.props.common,mouse:this.props.mouse,allowCursor:this.props.allowCursor}),this.scene=new y,this.camera=new g,this.composer=null,this.mat=new h({vertexShader:d,fragmentShader:K,uniforms:{velocity:{value:this.simulation.fbos.vel_0.texture},boundarySpace:{value:new l},diffuse:{value:this.simulation.fbos.vel_0.texture},colorScale:{value:2}}}),this.output=new f(new v(2,2),this.mat),this.composer=new P(this.props.common.renderer),this.composer.addPass(new L(this.scene,this.camera)),this.blurPass=new T({uniforms:{tDiffuse:{value:null},resolution:{value:new l(this.props.common.width,this.props.common.height).multiplyScalar(window.devicePixelRatio)},blurSize:{value:o.blur_scale},blurDirection:{value:o.blur_direction},blurQuality:{value:o.blur_quality}},vertexShader:`varying vec2 v_uv;
    
                void main() {
                v_uv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                }`,fragmentShader:`
                uniform sampler2D tDiffuse;
                uniform vec2 resolution;
                uniform float blurSize;
                uniform float blurDirection;
                uniform float blurQuality;

                varying vec2 v_uv;

                vec4 blur(sampler2D tex){
                const float PI2 = 6.28318530718; // Pi*2
                
                // BLUR SETTINGS {{{
                // const float directions = blurDirection; // 16.0; // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
                // const float quality = blurQuality; // 3.0; // BLUR QUALITY (Default 3.0 - More is better but slower)
                // BLUR SETTINGS }}}
            
                vec2 radius = blurSize/resolution;
                
                // Normalized pixel coordinates (from 0 to 1)
                vec2 uv = gl_FragCoord.xy/resolution;
                // Pixel colour
                vec4 color = texture2D(tex, uv);
                
                // Blur calculations
                int count = 1;
                for( float theta=0.0; theta<PI2; theta+=PI2/blurDirection)
                {
                    vec2 dir = vec2(cos(theta), sin(theta)) * radius;
                    for(float i=1.0/blurQuality; i<=1.0; i+=1.0/blurQuality)
                    {
                        color += texture2D( tex, uv+dir*i);	
                        count++;
                    }
                }
                
                    color /= float(count);
                
                    return color;   
                }
                
                void main (void)
                {
                    gl_FragColor = blur(tDiffuse); 
                }`}),this.blurPass.renderToScreen=!0,this.composer.addPass(this.blurPass),this.film_grain=o.options.film_grain,this.effectFilm=new Y(this.film_grain,!1),this.composer.addPass(this.effectFilm),this.scene.add(this.output)}addScene(e){this.scene.add(e)}resize(){this.simulation.resize()}render(){this.common.renderer.setRenderTarget(null),this.common.renderer.render(this.scene,this.camera)}update(){this.simulation.update(),this.composer.render(),this.film_grain=o.options.film_grain,this.effectFilm.uniforms.intensity.value=this.film_grain,this.blurPass.uniforms.blurSize.value=o.options.blur_scale,this.blurPass.uniforms.blurDirection.value=o.options.blur_direction,this.blurPass.uniforms.blurQuality.value=o.options.blur_quality}}class Z{constructor(e){this.props=e,this.mouseMoved=!1,this.coords=new l,this.coords_old=new l,this.diff=new l,this.timer=null,this.count=0,this.init()}init(){document.body.addEventListener("mousemove",this.onMouseMove.bind(this),!1),document.body.addEventListener("touchstart",this.onTouchMove.bind(this),!1),document.body.addEventListener("touchmove",this.onTouchMove.bind(this),!1)}setCoords(e,t){this.timer&&clearTimeout(this.timer),this.coords.set(e,t),this.mouseMoved=!0,this.timer=setTimeout(()=>{this.mouseMoved=!1},100)}onTouchMove(e){const{clientX:t,clientY:i}=e.touches[0];this.onMove(t,i)}onMouseMove(e){const{x:t,y:i}=e;this.onMove(t,i)}onMove(e,t){const i=(e-this.props.common.left)/this.props.common.width*2-1,s=-((t-this.props.common.top)/this.props.common.height)*2+1;this.setCoords(i,s)}update(){this.diff.subVectors(this.coords,this.coords_old),this.coords_old.copy(this.coords),this.coords_old.x===0&&this.coords_old.y===0&&this.diff.set(0,0)}}class ee{constructor(e){this.props=e,this.common=new V({wrapper:this.props.$wrapper}),this.mouse=new Z({common:this.common}),this.init(),this.loop(),window.addEventListener("resize",this.resize.bind(this))}init(){this.props.$wrapper.appendChild(this.common.renderer.domElement),this.output=new J({common:this.common,mouse:this.mouse,allowCursor:this.props.allowCursor})}resize(){this.common.resize(),this.output.resize()}render(){this.mouse.update(),this.common.update(),this.output.update()}loop(){this.render(),requestAnimationFrame(this.loop.bind(this))}}window.EventBus=A;function te(n,e=!0){window.isDev||(window.isDev=!1);const t=n===""?document.body:document.getElementById(n);new ee({$wrapper:t,allowCursor:e})}window.animateContainer=te;
