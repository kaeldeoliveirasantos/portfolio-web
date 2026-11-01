'use strict';
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navegacao');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');}));
const booking=document.querySelector('#booking-dialog'),photos=document.querySelector('#photo-dialog');
function openDialog(dialog){dialog.showModal();document.body.classList.add('modal-open');}
document.querySelectorAll('[data-book]').forEach(button=>button.addEventListener('click',()=>{if(button.dataset.service)document.querySelector('#service').value=button.dataset.service;openDialog(booking);}));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('modal-open');});dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});});
const dateInput=document.querySelector('#preferred-day'),today=new Date();
dateInput.min=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
document.querySelector('#booking-form').addEventListener('submit',event=>{
 event.preventDefault();
 if(!event.currentTarget.reportValidity())return;
 let message='Olá, equipe Bilatti! Tenho interesse em '+document.querySelector('#service').value.toLowerCase()+'.';
 if(dateInput.value){const [year,month,day]=dateInput.value.split('-');message+=' Minha preferência é dia '+day+'/'+month+'/'+year+'.';}
 message+=' Podem me informar os valores e os horários disponíveis?';
 window.open('https://wa.me/5519998705748?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');
});
const galleryItems=[...document.querySelectorAll('.gallery-item')];
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(filter=>{const active=filter===button;filter.classList.toggle('active',active);filter.setAttribute('aria-pressed',String(active));});
 let count=0;galleryItems.forEach(item=>{const visible=button.dataset.filter==='todos'||item.dataset.category===button.dataset.filter;item.hidden=!visible;if(visible)count++;});
 document.querySelector('.gallery-count').textContent=count+' '+(count===1?'TRABALHO':'TRABALHOS');
}));
galleryItems.forEach(item=>item.addEventListener('click',()=>{const image=document.querySelector('#expanded-photo');image.src=item.dataset.photo;image.alt=item.dataset.caption;document.querySelector('#expanded-caption').textContent=item.dataset.caption;openDialog(photos);}));
const galleryTrack=document.querySelector('.gallery-grid');
document.querySelectorAll('[data-gallery-step]').forEach(button=>button.addEventListener('click',()=>{galleryTrack.scrollBy({left:Number(button.dataset.galleryStep)*galleryTrack.clientWidth*.85,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>galleryTrack.scrollTo({left:0,behavior:'instant'})));
const toolItems=[
 {image:'assets/tesoura-3d.webp',label:'TESOURA · PRECISÃO NO ACABAMENTO',alt:'Tesoura profissional em 3D com aço polido, ajuste dourado e anéis ergonômicos',detail:'Aço polido, ajuste de tensão e anéis ergonômicos.'},
 {image:'assets/maquina-3d.webp',label:'MÁQUINA · CONTORNOS QUE FAZEM A DIFERENÇA',alt:'Máquina de corte em 3D com dentes de aço, alavanca lateral e acabamento em cobre',detail:'Dentes de aço, alavanca de ajuste e acabamento em cobre.'},
 {image:'assets/pincel-3d.webp',label:'PINCEL · CUIDADO ATÉ O ÚLTIMO DETALHE',alt:'Pincel de barba em 3D com cerdas finas, madeira e anéis metálicos dourados',detail:'Cerdas finas, textura de madeira e anéis metálicos.'}
];
let toolIndex=0;
document.querySelectorAll('[data-tool-step]').forEach(button=>button.addEventListener('click',()=>{
 toolIndex=(toolIndex+Number(button.dataset.toolStep)+toolItems.length)%toolItems.length;
 const active=toolItems[toolIndex],previous=toolItems[(toolIndex+toolItems.length-1)%toolItems.length],next=toolItems[(toolIndex+1)%toolItems.length];
 for(const [selector,item]of [['#featured-tool',active],['#tool-previous',previous],['#tool-next',next]]){const image=document.querySelector(selector);image.src=item.image;image.alt=item.alt;}
 document.querySelector('.tool-name').textContent=active.label;
 document.querySelector('.tool-detail').textContent=active.detail;
 document.querySelector('.tool-count').textContent=String(toolIndex+1).padStart(2,'0')+' / 03';
}));
