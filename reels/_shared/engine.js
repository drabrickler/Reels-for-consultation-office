const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ease=x=>1-Math.pow(1-x,3);
const back=x=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
const scenes=[...document.querySelectorAll('.scene')];
const wA=document.getElementById('wipeA'), wB=document.getElementById('wipeB');
const prog=document.getElementById('progress');
const animEls=[...document.querySelectorAll('[data-t]')];
const kbEls=[...document.querySelectorAll('.kb')];

function render(t){
  scenes.forEach(s=>{s.style.visibility=(t>=+s.dataset.s && t<+s.dataset.e)?'visible':'hidden'});
  animEls.forEach(el=>{
    const t0=+el.dataset.t,d=+(el.dataset.d||.7),a=el.dataset.a||'rise';
    const p=clamp((t-t0)/d);
    if(p<=0){el.style.opacity=0;el.style.transform='';return}
    const e=ease(p);
    let op=e,tf='',fl='';
    if(a==='rise'){tf=`translateY(${(1-e)*70}px)`;fl=`blur(${(1-e)*14}px)`}
    else if(a==='pop'){op=Math.min(1,p*3.5);tf=`scale(${0.55+0.45*back(p)})`}
    else if(a==='grow'){op=1;tf=`scaleX(${e})`}
    else if(a==='cell'){op=Math.min(1,p*4);tf=`scale(${0.4+0.6*back(p)})`}
    el.style.opacity=op;el.style.transform=tf;el.style.filter=fl;
  });
  kbEls.forEach(el=>{
    const sc=el.closest('.scene'); const s=+sc.dataset.s,e=+sc.dataset.e;
    const [a,b]=el.dataset.kb.split(',').map(Number);
    const p=clamp((t-s)/(e-s));
    const dx=(el.classList.contains('bg')?(p-0.5)*-30:0);
    el.style.transform=`translateX(${dx}px) scale(${a+(b-a)*p})`;
  });
  if(window.extra) window.extra(t);
  let showW=false;
  window.BOUNDS.forEach(B=>{
    const p=(t-(B-0.35))/0.7;
    if(p>=0&&p<=1){
      showW=true;
      wA.style.display='block';wA.style.left=(-1500+p*(1500+1080+120))+'px';
      const p2=clamp(p-0.12)/(1-0.12);
      wB.style.display='block';wB.style.left=(-1500+p2*(1500+1080+120)-40)+'px';
    }
  });
  if(!showW){wA.style.display='none';wB.style.display='none'}
  prog.style.width=(clamp(t/window.TOTAL)*1080)+'px';
}
window.render=render; render(0);
