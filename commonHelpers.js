var q=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot "+r)};var h=(e,t,r)=>(q(e,t,"read from private field"),r?r.call(e):t.get(e)),m=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)};import{a as S,S as P,i as p}from"./assets/vendor-f365bc20.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();var d,f;class H{constructor(){m(this,d,"18667452-b6cf3b15ecb06490e1251bb0b");m(this,f,"https://pixabay.com/api");this.searchQuery="",this.perPage=40,this.page=1,this.imageType="photo",this.orientation="horizontal",this.safeSearch=!0}async fetchPhotos(){const t={q:this.query,image_type:this.imageType,orientation:this.orientation,per_page:this.perPage,key:h(this,d),page:this.page};try{const r=await S.get(`${h(this,f)}/`,{params:t});return this.incrementPage(),r.data}catch(r){throw console.error("Error fetching photos:",r),r}}resetPage(){this.page=1}incrementPage(){this.page+=1}get query(){return this.searchQuery.trim()}set query(t){this.searchQuery=t}}d=new WeakMap,f=new WeakMap;const k=document.querySelector(".search-form"),l=document.querySelector(".gallery"),n=document.querySelector('[data-action="load-more"]'),L=document.querySelector(".spinner"),s=new H;k.addEventListener("submit",_);n.addEventListener("click",w);s.query===""&&(u(),v(),g(),l.innerHTML="");async function _(e){if(e.preventDefault(),s.query=e.target.elements.query.value,s.query===""){u(),g(),l.innerHTML="",B("Sorry, there are no images matching your search query. Please try again.");return}l.innerHTML="",s.resetPage(),await w()}async function w(){E(),O(),g();try{const e=await s.fetchPhotos();e.totalHits===0&&(u(),b("Sorry, there are no images matching your search query. Please try again.")),s.page===2&&A(`Hooray! We found ${e.totalHits} images.`),(s.page-1)*s.perPage>=e.totalHits&&(u(),W("We're sorry, but you've reached the end of search results."));const t=$(e.hits);l.insertAdjacentHTML("beforeend",t);const r=new P(".gallery a")}catch(e){b(`${e.message}`)}finally{v(),M()}}function $(e){return e.map(({largeImageURL:t,tags:r,likes:c,views:o,comments:i,downloads:a})=>`
    <div class="photo-card">
      <a class="card_link" href="${t}">
        <img class="card_img" src="${t}" alt="${r}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes<br>${c}</b>
        </p>
        <p class="info-item">
          <b>Views<br>${o}</b>
        </p>
        <p class="info-item">
          <b>Comments<br>${i}</b>
        </p>
        <p class="info-item">
          <b>Downloads<br>${a}</b>
        </p>
      </div>
    </div>`)}function E(){n.classList.remove("is-hidden")}function u(){n.classList.add("is-hidden"),n.innerHTML=""}function M(){n.removeAttribute("disabled"),n.innerHTML="Load more"}function g(){n.setAttribute("disabled","true"),n.innerHTML="Loading"}function O(){L.classList.remove("is-hidden")}function v(){L.classList.add("is-hidden")}function B(e){p.warning({title:"Warning",message:e,position:"topRight",color:"yellow"})}function b(e){p.error({title:"Error",message:e,position:"topRight",color:"red"})}function A(e){p.success({title:"Success",message:e,position:"topRight",color:"green"})}function W(e){p.info({title:"Info",message:e,position:"topRight",color:"blue"})}function x(){var e=window.pageYOffset,t=document.documentElement.clientHeight;e>t&&y.classList.add("back_to_top-show"),e<t&&y.classList.remove("back_to_top-show")}function T(){window.pageYOffset>0&&(window.scrollBy(0,-80),setTimeout(T,0))}var y=document.querySelector(".back_to_top");window.addEventListener("scroll",x);y.addEventListener("click",T);
//# sourceMappingURL=commonHelpers.js.map
