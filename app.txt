/* Noxx catalog app. Data is maintained in plugins.js (window.NOXX_PLUGINS). */
(() => {
  const plugins = window.NOXX_PLUGINS || [];
  const categories = ['Essentials & Admin','Anticheat & Security','Economy & Shops','World Management & Protection','Performance','Chat & Social','Building & Schematic Tools','Minigames & Fun','Map & HUD','Developer/API'];
  const tabs = document.getElementById('platform-tabs');
  const grid = document.getElementById('grid');
  const search = document.getElementById('search');
  const category = document.getElementById('category');
  const price = document.getElementById('price');
  const sort = document.getElementById('sort');
  let platform = 'All';
  categories.forEach(c => { const o=document.createElement('option'); o.value=c; o.textContent=c; category.appendChild(o); });
  function render() {
    const term=search.value.trim().toLowerCase();
    let list=plugins.filter(p => (platform==='All'||p.platforms.includes(platform)) && (!term||p.name.toLowerCase().includes(term)) && (!category.value||p.category===category.value) && (!price.value||p.price===price.value));
    list.sort((a,b) => sort.value==='za' ? b.name.localeCompare(a.name) : sort.value==='category' ? a.category.localeCompare(b.category)||a.name.localeCompare(b.name) : a.name.localeCompare(b.name));
    document.getElementById('result-count').textContent=list.length;
    document.getElementById('active-line').textContent=`${platform==='All'?'ALL PLATFORMS':platform.toUpperCase()}  /  ${category.value||'ALL CATEGORIES'}  /  ${price.value||'ANY PRICE'}`;
    document.getElementById('empty').hidden=!!list.length;
    grid.innerHTML=list.map(p=>`<article class="card"><div class="card-top"><h2>${esc(p.name)}</h2><span class="price ${p.price==='Paid'?'paid':''}">${esc(p.price)}</span></div><p class="desc">${esc(p.description)}</p><div class="tags">${p.platforms.map(x=>`<span class="tag">${esc(x)}</span>`).join('')}<span class="tag cat">${esc(p.category)}</span></div><div class="links"><a href="${safeUrl(p.page)}" target="_blank" rel="noopener">Official page ↗</a><a href="${safeUrl(p.download)}" target="_blank" rel="noopener">Download ↗</a></div></article>`).join('');
  }
  function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function safeUrl(s){return /^https:\/\//.test(s||'')?esc(s):'#';}
  tabs.addEventListener('click',e=>{const b=e.target.closest('button[data-platform]');if(!b)return;platform=b.dataset.platform;tabs.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));render();});
  [search,category,price,sort].forEach(el=>el.addEventListener(el===search?'input':'change',render));
  render();
})();
