/* Shared behaviour for portfolio pages. Each block checks its element exists, so pages can omit any feature. */
(function(){
  // open a project at the top, never at the previous page's scroll position (unless the address has a #section)
  if (!document.querySelector('.hero') || !('scrollRestoration' in history)) return;
  history.scrollRestoration='manual';
  var top=function(){ if(!location.hash) window.scrollTo(0,0); };
  top(); window.addEventListener('pageshow', top);
})();
(function(){
  var lb=document.getElementById('lb'), lbi=document.getElementById('lb-img'); if(!lb||!lbi) return;
  document.querySelectorAll('.shot').forEach(function(s){
    s.addEventListener('click', function(){ var i=s.querySelector('img'); lbi.src=i.src; lbi.alt=i.alt; lb.hidden=false; });
  });
  lb.addEventListener('click', function(){ lb.hidden=true; lbi.src=''; });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ lb.hidden=true; } });
})();
(function(){
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els=[].slice.call(document.querySelectorAll('.hero h1, .hero .facts, .hero .lede')); if(!els.length) return;
  var ticking=false;
  function update(){
    var y=window.scrollY;
    els.forEach(function(el){
      var top=el.offsetTop, h=el.offsetHeight;
      var start=Math.max(top-window.innerHeight*0.35,0)*0+ Math.max(0, top - 180);
      var end=top+h;
      var p=Math.min(Math.max((y-start)/Math.max(end-start,1),0),1);
      el.style.opacity=(1-p).toFixed(3);
      el.style.filter='blur('+(p*10).toFixed(2)+'px)';
      el.style.transform='translateY('+(-p*40).toFixed(1)+'px) scale('+(1-p*0.04).toFixed(3)+')';
    });
    ticking=false;
  }
  window.addEventListener('scroll',function(){ if(!ticking){ requestAnimationFrame(update); ticking=true; } },{passive:true});
  window.addEventListener('resize',update);
  update();
})();
(function(){ var b=document.getElementById('sitebar'); if(!b) return;
  function u(){ b.classList.toggle('scrolled', window.scrollY>8); }
  window.addEventListener('scroll',u,{passive:true}); u(); })();
(function(){ var c=document.getElementById('cmp'), r=document.getElementById('cmp-range'); if(!c||!r) return;
  function set(v){ c.style.setProperty('--pos', v+'%'); }
  r.addEventListener('input', function(){ set(r.value); }); set(r.value);
  // gentle hint: sweep once when first scrolled into view
  if (!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) && 'IntersectionObserver' in window){
    var done=false, io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting && !done){ done=true; io.disconnect();
      var t0=null; function step(ts){ if(!t0) t0=ts; var k=Math.min((ts-t0)/1400,1); var v=50+28*Math.sin(k*Math.PI*2)*(1-k); r.value=v; set(v); if(k<1) requestAnimationFrame(step); else { r.value=50; set(50);} }
      requestAnimationFrame(step); } }); },{threshold:0.6}); io.observe(c); }
})();
(function(){
  var c=document.getElementById('waves'); if(!c) return;
  var gl=c.getContext('webgl',{premultipliedAlpha:false,antialias:false}); if(!gl) return;
  var vs='attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var fs=[
  'precision mediump float;',
  'uniform vec2 r;uniform float t;uniform vec3 bg;uniform vec3 c1;uniform vec3 c2;uniform vec3 c3;uniform float k;',
  'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
  'float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);',
  ' return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);}',
  'float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p=p*2.02+vec2(1.7,9.2);a*=.5;}return v;}',
  'void main(){',
  ' vec2 uv=gl_FragCoord.xy/r; vec2 q=vec2(uv.x*r.x/r.y,uv.y)*1.6;',
  ' float s=t*.045;',
  ' vec2 w=vec2(fbm(q+vec2(s,-s*.6)),fbm(q+vec2(-s*.8,s)+3.1));',
  ' float m=fbm(q+2.2*w+vec2(s*.5,0.));',
  ' float band=sin((uv.x*2.2+uv.y*1.4)+m*4.+t*.12)*.5+.5;',
  ' vec3 col=mix(c1,c2,smoothstep(.15,.85,m));',
  ' col=mix(col,c3,smoothstep(.55,1.,band)*.55);',
  ' float fade=smoothstep(.0,.75,uv.y);',      // stronger at top, gone at bottom
  ' float a=k*fade*(.55+.45*m);',
  ' gl_FragColor=vec4(mix(bg,col,a),1.);',
  '}'].join('\n');
  function sh(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return gl.getShaderParameter(s,gl.COMPILE_STATUS)?s:null;}
  var v=sh(gl.VERTEX_SHADER,vs), f=sh(gl.FRAGMENT_SHADER,fs); if(!v||!f) return;
  var pr=gl.createProgram();gl.attachShader(pr,v);gl.attachShader(pr,f);gl.linkProgram(pr);
  if(!gl.getProgramParameter(pr,gl.LINK_STATUS)) return; gl.useProgram(pr);
  var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  var loc=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  var U={}; ['r','t','bg','c1','c2','c3','k'].forEach(function(n){U[n]=gl.getUniformLocation(pr,n);});
  function rgb(s){var d=document.createElement('div');d.style.color=s;document.body.appendChild(d);var m=getComputedStyle(d).color.match(/[\d.]+/g);d.remove();return m.slice(0,3).map(function(x){return x/255;});}
  function colors(){
    var cs=getComputedStyle(document.documentElement);
    var dark=rgb(cs.getPropertyValue('--bg').trim()||'#fff')[0]<.5;
    gl.uniform3fv(U.bg,rgb(cs.getPropertyValue('--bg').trim()||'#ffffff'));
    gl.uniform3fv(U.c1,dark?[0.16,0.26,0.62]:[0.85,0.89,1.0]);   // soft blue
    gl.uniform3fv(U.c2,dark?[0.14,0.40,0.30]:[0.86,0.95,0.90]);  // soft green
    gl.uniform3fv(U.c3,dark?[0.30,0.40,0.95]:[0.70,0.77,1.0]);   // brighter blue ribbon
    gl.uniform1f(U.k,dark?.55:1.);
  }
  var dpr=Math.min(window.devicePixelRatio||1,1.5);
  function size(){var w=c.clientWidth,h=c.clientHeight; c.width=Math.max(1,w*dpr*.5|0); c.height=Math.max(1,h*dpr*.5|0); gl.viewport(0,0,c.width,c.height); gl.uniform2f(U.r,c.width,c.height);}
  var still=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var visible=true, t0=performance.now();
  function draw(now){ gl.uniform1f(U.t,(now-t0)/1000+20.); gl.drawArrays(gl.TRIANGLE_STRIP,0,4); }
  function loop(now){ if(visible){draw(now);} if(!still) requestAnimationFrame(loop); }
  colors(); size(); draw(performance.now()); c.classList.add('on');
  if(!still) requestAnimationFrame(loop);
  window.addEventListener('resize',function(){size();draw(performance.now());});
  if(window.matchMedia){var mq=window.matchMedia('(prefers-color-scheme: dark)'); (mq.addEventListener?mq.addEventListener('change',function(){colors();draw(performance.now());}):0);}
  if('IntersectionObserver' in window){ new IntersectionObserver(function(es){visible=es[0].isIntersecting;}).observe(c); }
})();
(function(){
  // home collage: pieces drift toward the pointer, each at its own depth (--d in the markup); CSS does the math from --mx/--my
  var st=document.getElementById('collage'); if(!st) return;
  if (!window.matchMedia || !window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var tx=0, ty=0, x=0, y=0, raf=0;
  function tick(){
    x+=(tx-x)*0.07; y+=(ty-y)*0.07;
    st.style.setProperty('--mx', x.toFixed(4)); st.style.setProperty('--my', y.toFixed(4));
    raf=(Math.abs(tx-x)>0.001||Math.abs(ty-y)>0.001)?requestAnimationFrame(tick):0;
  }
  function go(){ if(!raf) raf=requestAnimationFrame(tick); }
  window.addEventListener('pointermove', function(e){
    var r=st.getBoundingClientRect(); if(r.bottom<0||r.top>window.innerHeight){ return; }
    tx=(e.clientX/window.innerWidth-0.5)*2; ty=((e.clientY-(r.top+r.height/2))/window.innerHeight)*2;
    tx=Math.max(-1,Math.min(1,tx)); ty=Math.max(-1,Math.min(1,ty)); go();
  },{passive:true});
  document.documentElement.addEventListener('pointerleave', function(){ tx=0; ty=0; go(); });
})();
(function(){
  // about peeks: build the photo cards for each .peek word, open on hover, focus or tap
  var peeks=document.querySelectorAll('.peek[data-peek]'); if(!peeks.length) return;
  var rots=[-8,4,-3], step=0.85; // cards overlap: each sits 0.85 of a card width from the last
  peeks.forEach(function(p){
    var srcs=p.getAttribute('data-peek').trim().split(/\s+/).slice(0,3), n=srcs.length, pop=document.createElement('span');
    pop.className='peek-pop'; pop.setAttribute('aria-hidden','true');
    srcs.forEach(function(src,i){
      var img=new Image(); img.src=src; img.alt=''; img.decoding='async';
      img.style.setProperty('--tx','calc('+((i-(n-1)/2)*step-0.5).toFixed(3)+' * var(--pw))'); img.style.setProperty('--rot',rots[i]+'deg'); img.style.setProperty('--i',i);
      img.onerror=function(){ img.remove(); };
      pop.appendChild(img);
    });
    p.appendChild(pop); p.tabIndex=0;
    function open(){
      // keep the fan inside the viewport: shift its center if the word sits near an edge
      var r=p.getBoundingClientRect(), img=pop.querySelector('img'), w=img?img.offsetWidth:0;
      var half=((n-1)*step+1)*w/2+12, c=r.left+r.width/2, m=window.innerWidth<640?12:32, cc=Math.min(Math.max(c,half+m),window.innerWidth-half-m);
      pop.style.left=(cc-r.left)+'px'; p.classList.add('open');
    }
    function close(){ p.classList.remove('open'); }
    p.addEventListener('mouseenter',open); p.addEventListener('mouseleave',close);
    p.addEventListener('focus',open); p.addEventListener('blur',close);
    p.addEventListener('click',function(e){ if(window.matchMedia('(hover:none)').matches){ e.stopPropagation(); var o=p.classList.contains('open'); peeks.forEach(function(q){q.classList.remove('open');}); if(!o) open(); } });
  });
  document.addEventListener('click',function(){ peeks.forEach(function(q){q.classList.remove('open');}); });
})();
(function(){
  // home collage, optional soft edges: blur each piece by its distance from the screen center
  var st=document.querySelector('.collage.soft-edges'); if(!st) return;
  function update(){
    var vw=window.innerWidth;
    st.querySelectorAll('.ci').forEach(function(ci){
      var r=ci.getBoundingClientRect(), d=Math.abs(r.left+r.width/2-vw/2)/(vw/2);
      var b=Math.min(Math.max((d-0.6)/0.4,0),1)*4; // the outer 40% on each side blurs, up to 4px at the very edge
      ci.style.setProperty('--blur',(b<1.2?0:b).toFixed(1)+'px'); // no half-blurred pieces: sharp or clearly soft
    });
  }
  window.addEventListener('resize',update); update();
})();
