import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import { spawn } from 'node:child_process';
import path from 'node:path';
const FPS=30, TOTAL=30;
const dir=process.cwd();
const only=process.argv[2]; // optional: single time in seconds -> png
const browser=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const page=await browser.newPage({viewport:{width:1080,height:1920}});
await page.goto('file://'+path.join(dir,'reel.html'));
await page.evaluate(()=>document.fonts.ready);
await page.waitForFunction(()=>[...document.images].every(i=>i.complete));
if(only){
  await page.evaluate(t=>window.render(t),+only);
  await page.screenshot({path:`frame_${only}.png`});
  await browser.close(); process.exit(0);
}
const ff=spawn('ffmpeg',['-y','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-',
 '-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-movflags','+faststart','reel1_candidiasis.mp4'],{stdio:['pipe','inherit','inherit']});
for(let f=0;f<FPS*TOTAL;f++){
  await page.evaluate(t=>window.render(t),f/FPS);
  const buf=await page.screenshot({type:'jpeg',quality:96});
  if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r));
}
ff.stdin.end();
await new Promise(r=>ff.on('close',r));
await browser.close();
