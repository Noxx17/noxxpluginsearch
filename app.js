/* Noxx catalog. Existing Java entries are maintained in plugins.js.
 * Bedrock entries below were verified on Minecraft Marketplace and Bedrock Tweaks.
 * Unknown = no price stated by the official source. */
(() => {
  const resource = 'https://bedrocktweaks.net/resource-packs';
  const crafting = 'https://bedrocktweaks.net/crafting-tweaks';
  const packs = [
    {name:'Another Furniture Add-On',description:'Craft vanilla-style furniture to decorate your Bedrock world.',price:'Free',category:'Bedrock mods / add-ons',group:'mods',page:'https://www.minecraft.net/en-us/marketplace/pdp/starfish-studios/another-furniture-add--on/62742ae5-5a69-4fa2-97b4-1208c812308a'},
    {name:'Spark Pets Add-On (Lite)',description:'Add cute pets to your worlds as adorable companions.',price:'Free',category:'Bedrock mods / add-ons',group:'mods',page:'https://www.minecraft.net/en-us/marketplace/pdp/spark-universe/spark-pets-add--on-(lite)/991399be-4969-46c1-a08f-ed4fa2d159b5'},
    {name:'ALL THE WOOL Add-On',description:'Expand your builds with hundreds of colours of wool.',price:'Free',category:'Bedrock mods / add-ons',group:'mods',page:'https://www.minecraft.net/en-us/marketplace/pdp/jigarbov-productions/all-the-wool-add--on/d8a20ca0-7c7d-4ce0-bfdb-82606751db49'},
    {name:'Bedrock Tweaks Resource Packs',description:'Build a custom resource pack by choosing visual tweaks in the official selector.',price:'Unknown',category:'Resource packs',group:'resources',page:resource},
    {name:'Back to Blocks',description:'Craft full blocks from stairs and slabs.',price:'Unknown',category:'Behaviour packs',group:'behaviour',page:crafting},
    {name:'Double Slabs',description:'Craft two slabs from a single block.',price:'Unknown',category:'Behaviour packs',group:'behaviour',page:crafting},
    {name:'Rotten Flesh to Leather',description:'Smelt rotten flesh into leather.',price:'Unknown',category:'Behaviour packs',group:'behaviour',page:crafting},
    {name:'Black Nether Bricks',description:'Change Nether Bricks to a black texture.',price:'Unknown',category:'Texture packs',group:'textures',page:resource},
    {name:'Clean Wool',description:'Give all wool blocks a clean texture.',price:'Unknown',category:'Texture packs',group:'textures',page:resource},
    {name:'Softer Wool',description:'Lower contrast and smooth the textures of all wool blocks.',price:'Unknown',category:'Texture packs',group:'textures',page:resource}
  ].map(p => ({...p, platforms:['Bedrock']}));
  const java = window.NOXX_PLUGINS || [];
  const all = [...java, ...packs];
  const $ = id => document.getElementById(id);
  const tabs = $('platform-tabs'), search = $('search'), category = $('category'), price = $('price'), sort = $('sort');
  let platform = 'All';
  const categories = ['Essentials & Admin','Anticheat & Security','Economy & Shops','World Management & Protection','Performance','Chat & Social','Building & Schematic Tools','Minigames & Fun','Map & HUD','Developer/API','Bedrock mods / add-ons','Resource packs','Behaviour packs','Texture packs'];
  categories.forEach(c => {const o=document.createElement('option');o.value=c;o.textContent=c;category.appendChild(o);});
  function esc(s) {return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function safeUrl(s) {
    try {
      const u = new URL(s);
      // Never create placeholder links or restore a removed source.
      if (u.protocol !== 'https:' || /(^|\.)modrinth\.com$/i.test(u.hostname)) return '';
      return esc(u.href);
    } catch {return '';}
  }
  function card(p) {
    const page = safeUrl(p.page), download = safeUrl(p.download);
    const links = (page ? `<a href="${page}" target="_blank" rel="noopener noreferrer">Official page ↗</a>` : '') +
      (download && download !== page ? `<a href="${download}" target="_blank" rel="noopener noreferrer">Download ↗</a>` : '');
    return `<article class="card"><div class="card-top"><h2>${esc(p.name)}</h2><span class="price ${p.price==='Paid'?'paid':''}">${esc(p.price || 'Unknown')}</span></div><p class="desc">${esc(p.description)}</p><div class="tags">${p.platforms.map(x=>`<span class="tag">${esc(x)}</span>`).join('')}<span class="tag cat">${esc(p.category)}</span></div><div class="links">${links || '<span class="source-note">Official link not yet verified.</span>'}</div></article>`;
  }
  function render() {
    const term = search.value.trim().toLowerCase();
    const list = all.filter(p => (platform==='All' || p.platforms.includes(platform)) && (!term || p.name.toLowerCase().includes(term)) && (!category.value || p.category===category.value) && (!price.value || p.price===price.value));
    list.sort((a,b) => sort.value==='za' ? b.name.localeCompare(a.name) : sort.value==='category' ? a.category.localeCompare(b.category)||a.name.localeCompare(b.name) : a.name.localeCompare(b.name));
    $('result-count').textContent = list.length;
    $('active-line').textContent = `${platform==='All'?'ALL PLATFORMS':platform.toUpperCase()} / ${category.value || 'ALL CATEGORIES'} / ${price.value || 'ANY PRICE'}`;
    $('empty').hidden = !!list.length;
    $('grid').innerHTML = list.filter(p => !p.group).map(card).join('');
    $('java-catalog').hidden = platform==='Bedrock';
    $('bedrock').hidden = platform!=='All' && platform!=='Bedrock';
    ['mods','resources','behaviour','textures'].forEach(g => {
      const entries = list.filter(p => p.group===g);
      $(g+'-grid').innerHTML = entries.length ? entries.map(card).join('') : '<p class="source-note">No matches in this section for the current filters.</p>';
    });
  }
  function setPlatform(p) {
    platform=p;
    tabs.querySelectorAll('button').forEach(b => {const selected=b.dataset.platform===p;b.classList.toggle('active',selected);b.setAttribute('aria-selected',String(selected));});
    render();
  }
  tabs.addEventListener('click',e => {const b=e.target.closest('button[data-platform]');if(b)setPlatform(b.dataset.platform);});
  [search,category,price,sort].forEach(el => el.addEventListener(el===search?'input':'change',render));
  document.querySelector('.catalog-index').addEventListener('click',e => {
    const a=e.target.closest('a');if(!a)return;
    search.value='';category.value='';price.value='';
    setPlatform(a.hash==='#java-catalog'?'All':'Bedrock');
  });
  render();
})();
