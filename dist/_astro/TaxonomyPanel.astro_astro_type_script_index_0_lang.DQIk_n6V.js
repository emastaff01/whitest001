import{c as Y}from"./admin.CLqtnOpU.js";import{e as Z,p as tt,k as et}from"./firestore.CRcbYFcT.js";import{o as at,a as nt}from"./firebase.DrE3Iwhb.js";const ot=r=>{const O=r.querySelector('[data-role="groups-config"]');let l=[];try{l=JSON.parse(O?.textContent??"[]")}catch{l=[]}if(l.length===0)return;const I=r.dataset.tabKey??"",y=new Map(l.map(t=>[t.group,t])),U=new Set(l.map(t=>t.group)),d=r.querySelector('[data-role="editor"]'),p=r.querySelector('[data-role="export"]'),x=r.querySelector('[data-role="status"]'),L=r.querySelector('[data-role="count"]');if(!d||!p||!x)return;const _=r.querySelector('[data-role="icon-list"]'),q=_?JSON.parse(_.textContent??"[]"):[],C=new Map(q.map(t=>[t.key,t.url])),B=C.get("default")??"",H=t=>C.get(t)??B;let i=[],k=new Set,v=new Map;const c=(t,e)=>`[data-ti="${t}"][data-field="${e}"]`,S=t=>{const e=d.querySelector(t);return e?e.value.trim():""},J=t=>{const e=d.querySelector(t);return e?e.checked:!1},b=(t,e)=>{const a=d.querySelector(t);a&&(a.value=e)},K=(t,e)=>{const a=d.querySelector(t);a&&(a.checked=e)},P=t=>{const e=S(c(t,"icon")),a=d.querySelector(`[data-ti="${t}"][data-role="icon-preview"]`),o=d.querySelector(`[data-ti="${t}"][data-role="icon-name"]`);a&&a.style.setProperty("--icon",`url('${H(e)}')`),o&&(o.textContent=e||"（既定アイコン）")},D=t=>JSON.stringify({id:t.id,group:t.group,label:t.label,icon:t.icon??null,isPublished:t.isPublished}),T=()=>{v=new Map(i.map(t=>[t.id,{content:D(t),label:t.label,groupLabel:y.get(t.group)?.groupLabel??""}]))},N=()=>{$();const t=[],e=new Set(i.map(a=>a.id));return i.forEach(a=>{const o=y.get(a.group)?.groupLabel??"",n=v.get(a.id);n?n.content!==D(a)&&t.push(`【修正】${o}：${a.label||"（無題）"}`):t.push(`【新規作成】${o}：${a.label||"（無題）"}`)}),v.forEach((a,o)=>{e.has(o)||t.push(`【削除】${a.groupLabel}：${a.label||o}`)}),t},R=t=>({...t,label:t.label??"",isPublished:t.isPublished??!1}),$=()=>{i.forEach((t,e)=>{const a=d.querySelector(c(e,"id"));if(a&&(t.id=a.value.trim(),t.label=S(c(e,"label")),t.isPublished=J(c(e,"isPublished")),y.get(t.group)?.withIcon)){const o=S(c(e,"icon"));t.icon=o===""?void 0:o}})},A=()=>{i.forEach((t,e)=>{b(c(e,"id"),t.id),b(c(e,"label"),t.label),K(c(e,"isPublished"),t.isPublished),y.get(t.group)?.withIcon&&(b(c(e,"icon"),t.icon??""),P(e))})},F=(t,e,a,o)=>`
      <section class="adm-card">
        <div class="adm-card__head">
          <h2>${a.groupLabel} ${o}</h2>
          <label class="adm-pub"><input type="checkbox" data-ti="${e}" data-field="isPublished" /> 公開する</label>
        </div>
        <div class="adm-card__body">
        <div class="adm-row">
          <label class="adm-field">
          <span class="adm-field-title">ID</span>
            
            <input type="text" data-ti="${e}" data-field="id"
              placeholder="${a.idPlaceholder??""}"
              ${a.idPrefix?"readonly":""} />
            <p>${a.idPrefix?"":"※英数字とハイフンのみ使用/重複不可"}</p>
          </label>
          <label class="adm-field">
          <span class="adm-field-title">ラベル名</span>
            <input type="text" data-ti="${e}" data-field="label" />
          </label>
        </div>
        ${a.withIcon?`
            <div class="adm-row">
        <div class="adm-field">
          <span class="adm-field-title">アイコン（任意）</span>
          <div class="adm-iconpick">
            <span class="adm-iconpick__preview" data-ti="${e}" data-role="icon-preview" aria-hidden="true"></span>
            <span class="adm-iconpick__name" data-ti="${e}" data-role="icon-name"></span>
            <!-- 実際に保存される値（アイコンキー）は hidden で持つ。空文字＝既定アイコン。 -->
            <input type="hidden" data-ti="${e}" data-field="icon" />
            <button type="button" class="adm-btn adm-btn--mini" data-action="pick-icon" data-ti="${e}">アイコンを選ぶ</button>
            <button type="button" class="adm-btn adm-btn--mini" data-action="clear-icon" data-ti="${e}">既定に戻す</button>
          </div>
        </div></div>
        <p class="adm-hint">用意されたアイコンから選択。「既定に戻す」で未設定（既定アイコン）に戻ります。</p>`:""}
        
        <button type="button" class="adm-btn adm-btn--danger" data-action="del-tax" data-ti="${e}">削除</button>
        </div>
      </section>`;let E=0;const M=t=>{const e=i.map((s,u)=>({t:s,ti:u})).filter(s=>s.t.group===t.group),a=e.map((s,u)=>F(s.t,s.ti,t,u+1)).join(""),o=e.filter(s=>s.t.isPublished).length,n=t.unitLabel??"選択肢";return`
      <div class="adm-taxgroup" data-group="${t.group}">
          <div class="adm-taxgroup__head">
            <h3 class="adm-taxgroup__title">${t.groupLabel}</h3>
            <span class="adm-count">公開 ${o} / 全 ${e.length}</span>
            <button type="button" class="adm-btn adm-btn--primary" data-action="add-tax" data-group="${t.group}">＋ 新規${n}を追加</button>
          </div>
          <div class="adm-taxgroup__body">${a||'<p class="adm-hint">まだありません。「＋ 新規…を追加」から作成してください。</p>'}</div>
        </div>`},G=()=>{if(l.length<=1)return l.map(a=>M(a)).join("");const t=l.map((a,o)=>{const n=i.filter(u=>u.group===a.group),s=n.filter(u=>u.isPublished).length;return`<button type="button" class="adm-innertab${o===E?" is-active":""}"
            data-action="switch-tab" data-cfg-index="${o}">
            ${a.groupLabel}
            <span class="adm-count">公開${s}/${n.length}</span>
          </button>`}).join(""),e=M(l[E]);return`<div class="adm-innertab-bar">${t}</div>${e}`},m=()=>{d.innerHTML=G(),A(),L&&(L.textContent=Y(i))},h=(t,e)=>{x.textContent=t,x.className="adm-status"+(e?" is-"+e:"")},z=t=>{const e=t.idPrefix;if(!e)return"";const a=i.filter(n=>n.id.startsWith(e)).map(n=>parseInt(n.id.slice(e.length),10)).filter(n=>!isNaN(n)),o=a.length>0?Math.max(...a):0;return e+String(o+1).padStart(3,"0")},V=t=>({id:z(t),group:t.group,label:"",isPublished:!1}),W=()=>{const t=[],e=new Set;return i.forEach((a,o)=>{const n=o+1;a.id===""?t.push(`${n}件目: ID が空です`):e.has(a.id)&&t.push(`${n}件目: ID「${a.id}」が重複しています`),e.add(a.id),a.label===""&&t.push(`${n}件目: ラベルが空です`)}),t},f=r.querySelector('[data-role="icon-picker"]'),w=r.querySelector('[data-role="icon-grid"]');let g=-1;w&&(w.innerHTML=q.filter(t=>t.key!=="default").map(t=>`
        <button type="button" class="adm-picker__item" data-pick-icon="${t.key}">
          <span class="adm-icon-mask" style="--icon: url('${t.url}')"></span>
          <span class="adm-picker__name">${t.key}</span>
        </button>`).join(""));const Q=t=>{f&&(g=t,f.hidden=!1)},j=()=>{f&&(f.hidden=!0,g=-1)};w&&w.addEventListener("click",t=>{const e=t.target;if(!(e instanceof Element))return;const a=e.closest("button[data-pick-icon]");!a||g<0||(b(c(g,"icon"),a.dataset.pickIcon??""),P(g),j())}),f&&f.addEventListener("click",t=>{const e=t.target;e instanceof Element&&e.closest("[data-picker-close]")&&j()}),d.addEventListener("click",t=>{const e=t.target;if(!(e instanceof Element))return;const a=e.closest("button[data-action]");if(!a)return;const o=a.dataset.action??"";if(o==="pick-icon"){const n=a.dataset.ti!==void 0?Number(a.dataset.ti):-1;n>=0&&Q(n);return}if(o==="clear-icon"){const n=a.dataset.ti!==void 0?Number(a.dataset.ti):-1;n>=0&&(b(c(n,"icon"),""),P(n));return}if(o==="switch-tab"){$(),E=a.dataset.cfgIndex!==void 0?Number(a.dataset.cfgIndex):0,m();return}if($(),o==="add-tax"){const n=a.dataset.group??"",s=l.find(u=>u.group===n);if(s){i.push(V(s)),m(),h("新しい選択肢を追加しました。下に入力してください。","ok");return}}else if(o==="del-tax"){const n=a.dataset.ti!==void 0?Number(a.dataset.ti):-1;n>=0&&window.confirm("この選択肢を削除します。よろしいですか？")&&i.splice(n,1)}m(),h("","")}),p.addEventListener("click",async()=>{$();const t=W();if(t.length>0&&(h("確認ポイントがあります（このまま保存することも可能）","warn"),!window.confirm(`入力に確認ポイントがあります。それでも保存しますか？

`+t.join(`
`))))return;const e=new Set(i.map(n=>n.id)),a=[...k].filter(n=>!e.has(n));if(a.length>0&&!window.confirm(`${a.length}件の選択肢を削除します（元に戻せません）。
${a.join(`
`)}

保存を続けますか？`))return;p.disabled=!0;const o=p.textContent;p.textContent="保存中…";try{for(const n of a)await Z(n);for(const n of i)await tt(n);k=new Set(i.map(n=>n.id)),T(),h(`保存しました（更新 ${i.length}件 / 削除 ${a.length}件）`,"ok")}catch(n){console.error(n),h("保存に失敗しました。通信状態やログイン状態を確認してください。","warn")}finally{p.disabled=!1,p.textContent=o}});const X=async()=>{i=(await et()).filter(t=>U.has(t.group)).map(R),k=new Set(i.map(t=>t.id)),T(),m()};if(I){const t=window;t.adminDirtyReporters=t.adminDirtyReporters??{},t.adminDirtyReporters[I]=N,window.addEventListener("beforeunload",e=>{N().length!==0&&e.preventDefault()})}at(nt,t=>{t?X():(i=[],v=new Map,m())})};document.querySelectorAll(".js-tax-panel").forEach(r=>ot(r));
