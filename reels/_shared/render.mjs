// Uso (desde la carpeta del reel):
//   node ../_shared/render.mjs video salida.mp4
//   node ../_shared/render.mjs frame 2.2 portada.png
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import { spawn } from 'node:child_process';
import path from 'node:path';
const FPS=30;
const [mode,a,b]=process.argv.slice(2);
const browser=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const page=await browser.newPage({viewport:{width:1080,height:1920}});
await page.goto('file://'+path.join(process.cwd(),'reel.html'));
await page.evaluate(()=>document.fonts.ready);
await page.waitForFunction(()=>[...document.images].every(i=>i.complete));
if(mode==='frame'){
  await page.evaluate(t=>window.render(t),+a);
  await page.screenshot({path:b});
} else {
  const TOTAL=await page.evaluate(()=>window.TOTAL);
  const ff=spawn('ffmpeg',['-y','-v','error','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-',
   '-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-movflags','+faststart',a],{stdio:['pipe','inherit','inherit']});
  for(let f=0;f<FPS*TOTAL;f++){
    await page.evaluate(t=>window.render(t),f/FPS);
    const buf=await page.screenshot({type:'jpeg',quality:96});
    if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r));
  }
  ff.stdin.end(); await new Promise(r=>ff.on('close',r));
}
await browser.close();
