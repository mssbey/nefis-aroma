import puppeteer from 'puppeteer-core';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { findChrome } from './chrome-path.mjs';
const require = createRequire(import.meta.url);
const browser = await puppeteer.launch({executablePath:findChrome(),headless:true});
const page = await browser.newPage();
await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
await mkdir('artifacts/qa',{recursive:true});
const reports=[];
for(const width of [360,390,768,1024,1440,1920]) {
 await page.setViewport({width,height:900});
 for(const [name,path] of [['home','/'],['products','/urunler'],['detail','/urun/purple-mirage']]) {
  await page.goto('http://localhost:3111'+path,{waitUntil:'networkidle0'});
  await page.screenshot({path:'artifacts/qa/'+name+'-'+width+'.png',fullPage:true});
  if(width===390 || width===1440) {
   await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
   const result=await page.evaluate(async()=>{const r=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));});
   reports.push({width,path,violations:result});
   console.log(width,path,result.map(v=>v.id+":"+v.nodes.length).join(",") || "clean");
  }
 }
}
await writeFile('artifacts/qa/accessibility.json',JSON.stringify(reports,null,2));
await browser.close();
process.exitCode=reports.some(r=>r.violations.length)?1:0;
