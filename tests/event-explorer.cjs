const fs=require('fs'),vm=require('vm'),assert=require('assert');
const {parseHTML}=require('linkedom');
const html=fs.readFileSync(require('path').join(__dirname,'../index.html'),'utf8');
const {window}=parseHTML(html), {document}=window;
const svg=document.getElementById('chart');
svg.createSVGPoint=()=>({x:0,y:0,matrixTransform(){return this}});
svg.getBoundingClientRect=()=>({width:1200});
svg.getScreenCTM=()=>({inverse:()=>({})});
let nextTask=1;const frames=new Map(),timers=new Map();
const raf=fn=>{const id=nextTask++;frames.set(id,fn);return id};
const timeout=fn=>{const id=nextTask++;timers.set(id,fn);return id};
function flushFrames(){const jobs=[...frames.values()];frames.clear();jobs.forEach(fn=>fn());}
function settle(){flushFrames();const jobs=[...timers.values()];timers.clear();jobs.forEach(fn=>fn());flushFrames();}
const ctx=vm.createContext({document,window,console,setTimeout:timeout,clearTimeout:id=>timers.delete(id),requestAnimationFrame:raf});
vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],ctx);
const click=b=>b.dispatchEvent(new window.Event('click'));
const btn=t=>[...document.querySelectorAll('button')].find(b=>b.textContent===t);
const search=document.querySelector('input[type=search]');
function query(q){search.value=q;search.dispatchEvent(new window.Event('input'));}
assert(document.getElementById('event-status').textContent.includes('Choose categories'));
click(btn('Banking & credit'));
assert(document.getElementById('event-list').textContent.includes('LTCM'));
assert(document.getElementById('event-list').textContent.includes('Fitch'));
assert(btn('Select all'));
click(btn('Select all'));
assert.equal(document.querySelectorAll('.event-item').length,189);
click(btn('Clear'));assert.equal(document.querySelectorAll('.event-item').length,0);
query('Lehman');assert.equal(document.querySelectorAll('.event-item').length,1);
click(document.querySelector('.event-item'));
assert(document.getElementById('event-detail').textContent.includes('Lehman'));
click(btn('Focus chart on this period'));
assert(document.getElementById('view-summary').textContent.includes('2006'));
query('not-a-real-event');assert(document.getElementById('event-status').textContent.includes('No matching'));
query('');click(btn('Select all'));click(btn('Reset view'));
assert.equal(document.querySelectorAll('.event-item').length,189);
assert(document.querySelectorAll('.evt-label').length<=12);
svg.getBoundingClientRect=()=>({width:390});click(btn('Reset view'));
assert.equal(document.querySelectorAll('.evt-label').length,0);
assert.equal(document.querySelectorAll('.event-item').length,189);
const data=JSON.parse(document.getElementById('event-data').textContent);
assert.deepEqual(data,JSON.parse(fs.readFileSync(require('path').join(__dirname,'../events.json'),'utf8')));
assert.equal(new Set(data.map(e=>e[6].id)).size,189);
console.log('PASS: initial state, credit mappings, select all/clear, search, details, focus, reset, label budget, narrow-screen list and data parity.');

// Regression: mouse-wheel zoom needs no modifier and updates the visible count before settling.
svg.getBoundingClientRect=()=>({width:1200});query('');click(btn('Select all'));click(btn('Reset view'));
const hit=svg.parentNode,status=document.getElementById('event-status');
function fire(target,type,props){const e=new window.Event(type,{bubbles:true,cancelable:true});Object.assign(e,props);target.dispatchEvent(e);return e;}
function currentRange(){return [+status.getAttribute('data-period-start'),+status.getAttribute('data-period-end')];}
function checkCount(){const [start,end]=currentRange();assert.equal(+status.getAttribute('data-visible-count'),data.filter(e=>e[0]>=start&&e[0]<=end).length);}
const fullCount=+status.getAttribute('data-visible-count');
const wheel=fire(hit,'wheel',{deltaY:-900,deltaX:0,clientX:900,clientY:300,ctrlKey:false,metaKey:false});
assert(wheel.defaultPrevented);flushFrames();checkCount();
assert(+status.getAttribute('data-visible-count')<fullCount);settle();checkCount();
// Selection stays visually identified after a redraw, with one active ring only.
query('1988: stocks');click(document.querySelector('.event-item'));click(btn('Focus chart on this period'));
let active=svg.querySelector('[data-event][aria-pressed="true"]');assert(active);assert.equal(active.getAttribute('data-event'),'event-152');assert(active.querySelector('.event-ring'));
assert(document.getElementById('event-detail').textContent.includes('กำไรบริษัท'));
assert.equal(document.querySelectorAll('.detail-sources a').length,2);
assert.equal(document.querySelectorAll('.event-item').length,1);
click(btn('+'));active=svg.querySelector('[data-event][aria-pressed="true"]');assert(active);assert.equal(svg.querySelectorAll('[aria-pressed="true"]').length,1);
// Two-finger touch updates the count during its GPU transform and commits the same range.
query('');click(btn('Select all'));click(btn('Reset view'));const before=currentRange();
fire(hit,'touchstart',{touches:[{clientX:500,clientY:300},{clientX:700,clientY:300}]});
fire(hit,'touchmove',{touches:[{clientX:300,clientY:300},{clientX:900,clientY:300}]});
const during=currentRange();assert(during[1]-during[0]<before[1]-before[0]);assert(+status.getAttribute('data-visible-count')<fullCount);checkCount();
fire(hit,'touchend',{touches:[]});const after=currentRange();assert(Math.abs(after[0]-during[0])<0.00001);assert(Math.abs(after[1]-during[1])<0.00001);checkCount();
// All events have individual Thai summaries, with explicit source scope where supplied.
assert(data.every(e=>e[6].summaryTh.length>60));assert.equal(new Set(data.map(e=>e[6].summaryTh)).size,189);
assert(data.every(e=>e[6].sources.every(s=>s.url.startsWith('https://')&&s.scope)));
query('กำแพงเบอร์ลิน');assert(document.querySelectorAll('.event-item').length>=2);
console.log('PASS: plain mouse-wheel zoom, live visible-period count, persistent selection ring, Thai detail/source rendering, touch-pinch live/committed range, 189 unique summaries and Thai search.');
