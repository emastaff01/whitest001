import{c as bt,m as ht}from"./admin.CLqtnOpU.js";import{a as vt,l as gt,f as $t,k as _t}from"./firestore.CRcbYFcT.js";import{o as yt,a as wt}from"./firebase.DrE3Iwhb.js";import{S as kt}from"./sortable.esm.rUYOJ6aL.js";const D="/images/noimage.jpg",St=()=>{const o=document.querySelector("#plan-editor"),T=document.querySelector("#plan-add-btn"),b=document.querySelector("#plan-export-btn"),E=document.querySelector("#plan-status");if(!o||!T||!b||!E)return;let r=[],x=new Set,w=new Map,g=new Map,F="",$=[],_=[],P=null,u="list",d=-1,h=!1;const l=(t,e)=>`[data-pi="${t}"][data-field="${e}"]`,k=t=>{const e=o.querySelector(t);return e?e.value.trim():""},G=t=>{const e=o.querySelector(t);return e?e.value:""},L=t=>{const e=o.querySelector(t);return e?e.checked:!1},p=(t,e)=>{const s=o.querySelector(t);s&&(s.value=e)},M=(t,e)=>{const s=o.querySelector(t);s&&(s.checked=e)},v=t=>t.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]??e),K="/test-whi".replace(/\/$/,""),B=t=>t?`${K}${t}`:"",Q=(t,e,s)=>{const a=o.querySelector(`[data-pi="${t}"][data-thumb-preview]`);a&&(e?(a.src=B(e),a.hidden=!1):(a.removeAttribute("src"),a.hidden=!0),a.alt=s)},W=t=>t.split("/").pop()??"",A=(t,e)=>{const s=o.querySelector(l(t,"thumbnailSrc"));s&&(s.value=W(e),s.dataset.fullpath=e),Q(t,e,"")},X=t=>o.querySelector(l(t,"thumbnailSrc"))?.dataset.fullpath??"",N=t=>{const e=k(t),s=Number(e);return e===""||Number.isNaN(s)?void 0:s},Y=t=>{const e=s=>{if(Array.isArray(s))return s.map(e);if(s!==null&&typeof s=="object"){const a=s,i={};for(const n of Object.keys(a).sort())i[n]=e(a[n]);return i}return s};return JSON.stringify(e(t))},H=t=>{const{sortOrder:e,thumbnail:s,...a}=t;return Y({...a,thumbnail:{src:s.src}})},z=()=>{g=new Map(r.map(t=>[t.id,{content:H(t),title:t.title}])),F=r.map(t=>t.id).join(",")},q=()=>{S();const t=[],e=new Set(r.map(a=>a.id));return r.forEach(a=>{const i=g.get(a.id);i?i.content!==H(a)&&t.push(`【修正】${a.title||"（無題）"}`):t.push(`【新規作成】${a.title||"（無題）"}`)}),g.forEach((a,i)=>{e.has(i)||t.push(`【削除】${a.title||i}`)}),e.size===g.size&&[...e].every(a=>g.has(a))&&r.map(a=>a.id).join(",")!==F&&t.push("【並び替え】"),t},V=()=>{const t=q();if(t.length===0){c("","");return}c(`未保存の内容があります。
`+t.join(`
`),"warn")},Z=t=>{const e={...t};return delete e.includes,delete e.styleIds,{...e,title:e.title??"",description:e.description??"",thumbnail:{src:e.thumbnail?.src||D,alt:e.thumbnail?.alt??""},priceFrom:e.priceFrom??0,isPublished:e.isPublished??!1}},tt=(t,e)=>{t.id=k(l(e,"id")),t.title=k(l(e,"title")),t.description=G(l(e,"description")).trim(),t.thumbnail={src:X(e)||D,alt:t.title};const s=k(l(e,"priceFrom")),a=Number(s);t.priceFrom=s===""||Number.isNaN(a)?0:a,t.priceTo=N(l(e,"priceTo")),t.guestCountBase=N(l(e,"guestCountBase")),t.sortOrder=N(l(e,"sortOrder")),t.isPublished=k(l(e,"isPublished"))==="published";const i=$.map(m=>m.id).filter(m=>L(l(e,"includeIds")+`[data-include-id="${m}"]`));t.includeIds=i.length?i:void 0;const n=_.map(m=>m.id).filter(m=>L(l(e,"tagIds")+`[data-tag-id="${m}"]`));t.tagIds=n.length?n:void 0},S=()=>{if(u!=="edit"||d<0)return;const t=r[d];t&&tt(t,d)},et=(t,e)=>{p(l(e,"id"),t.id),p(l(e,"title"),t.title),p(l(e,"description"),t.description),A(e,t.thumbnail.src),p(l(e,"priceFrom"),String(t.priceFrom)),p(l(e,"priceTo"),t.priceTo===void 0?"":String(t.priceTo)),p(l(e,"guestCountBase"),t.guestCountBase===void 0?"":String(t.guestCountBase)),p(l(e,"sortOrder"),t.sortOrder===void 0?"":String(t.sortOrder)),p(l(e,"isPublished"),t.isPublished?"published":"hidden");const s=new Set(t.includeIds??[]);$.forEach(i=>{M(l(e,"includeIds")+`[data-include-id="${i.id}"]`,s.has(i.id))});const a=new Set(t.tagIds??[]);_.forEach(i=>{M(l(e,"tagIds")+`[data-tag-id="${i.id}"]`,a.has(i.id))})},st=t=>{const e=r[t];e&&et(e,t)},at=(t,e)=>`
      <section class="adm-card">
        <div class="adm-card__head">
          <h2>No. ${e+1}</h2>
          <label class="adm-title"><span class="adm-title__title">プランタイトル</span>
            <input type="text" data-pi="${e}" data-field="title" placeholder="（タイトル）"/>
          </label>
          <label class="adm-pub"><span class="adm-pub__title">公開状態</span>
            <select data-pi="${e}" data-field="isPublished">
              <option value="hidden">非表示</option>
              <option value="published">表示</option>
            </select>
          </label>
        </div>
        <label class="adm-id"><span class="adm-id__title">ID（自動発番・編集不可）</span>
          <input type="text" data-pi="${e}" data-field="id" readonly />
        </label>

        <div class="adm-card__body">
          <div class="adm-row">
            <div class="adm-card__first">
              <label class="adm-field"><span class="adm-field-title">説明文</span>
                <textarea rows="3" data-pi="${e}" data-field="description"></textarea>
              </label>
              <div class="adm-row">
                <label class="adm-field adm-field--narrow"><span class="adm-field-title">最低価格（円・必須）</span>
                  <input type="number" data-pi="${e}" data-field="priceFrom" placeholder="1920000" />
                </label>
                <label class="adm-field adm-field--narrow"><span class="adm-field-title">上限価格（円・任意）</span>
                  <input type="number" data-pi="${e}" data-field="priceTo" placeholder="3000000" />
                </label>
                <label class="adm-field adm-field--narrow"><span class="adm-field-title">基準人数（任意）</span>
                  <input type="number" data-pi="${e}" data-field="guestCountBase" placeholder="100" />
                </label>
              </div>
              <!-- 表示順は「並べ替え」で管理するので画面には出さない。
                   ただし値の往復（populate→harvest）に input は必要なので hidden で残す。 -->
              <input type="hidden" data-pi="${e}" data-field="sortOrder" />
              <p class="adm-hint">価格は総額（円）。上限価格を入れると「価格帯」、空なら単価として表示されます（詳細ページの出し分け）。</p>
            </div>

            <div class="adm-card__second">
              <label class="adm-field">
                <span class="adm-field-title">サムネイル画像</span>
              </label>
              <div class="adm-thumb">
                <img class="adm-thumb__preview" data-pi="${e}" data-thumb-preview alt="" hidden />
                <div class="adm-row">
                  <input type="text" data-pi="${e}" data-field="thumbnailSrc" readonly placeholder="（「画像を選ぶ」から選択）" />
                  <button type="button" class="adm-btn adm-btn--mini" data-action="pick-thumb" data-pi="${e}">画像を選ぶ</button>
                </div>
              </div>
            </div>
          </div>

          <div class="adm-row">
            <div class="adm-field"><span class="adm-field-title">含まれるもの（「タグ／カテゴリー管理」のマスターから選択・複数可）</span>
              <div class="adm-radios">
                ${$.length?$.map(s=>`
                <label class="adm-radio"><input type="checkbox" data-pi="${e}" data-field="includeIds" data-include-id="${s.id}" /> ${s.label}</label>`).join(""):'<p class="adm-hint">選択肢がまだありません。「タグ／カテゴリー管理」タブの「プランに含まれるもの」で追加してください。</p>'}
              </div>
            </div>
          </div>
          <div class="adm-row">
            <div class="adm-field"><span class="adm-field-title">対象スタイル（「タグ／カテゴリー管理」のマスターから選択・複数可）</span>
              <div class="adm-radios">
                ${_.length?_.map(s=>`
                <label class="adm-radio"><input type="checkbox" data-pi="${e}" data-field="tagIds" data-tag-id="${s.id}" /> ${s.label}</label>`).join(""):'<p class="adm-hint">選択肢がまだありません。「タグ／カテゴリー管理」タブの「プランの対象スタイル」で追加してください。</p>'}
              </div>
            </div>
          </div>
          <button type="button" class="adm-btn adm-btn--danger" data-action="del-plan" data-pi="${e}">プラン削除</button>
        </div>
      </section>`,J=(t,e)=>!t||t.length===0?[]:t.map(s=>e.find(a=>a.id===s)?.label).filter(s=>!!s),C=t=>`${t.toLocaleString("ja-JP")}円`,it=t=>t.priceFrom<=0?"未設定":t.priceTo!==void 0?`${C(t.priceFrom)}〜${C(t.priceTo)}`:C(t.priceFrom),nt=(t,e)=>{const s=B(t.thumbnail.src),a=it(t),i=J(t.includeIds,$).join("、")||"未設定",n=J(t.tagIds,_).join("、")||"未設定";return`
      <li class="fair-list__row">
        <button type="button" class="fair-list__btn" data-action="edit-plan" data-pi="${e}">
          <span class="fair-list__thumb">
            <img src="${v(s)}" alt="${v(t.title)}" loading="lazy" />
          </span>
          <span class="fair-list__main">
            <span class="fair-list__titlerow">
              <span class="fair-list__no">No. ${e+1}</span>
              <span class="fair-list__title">${v(t.title)||"（無題）"}</span>
              <span class="fair-list__badge ${t.isPublished?"is-pub":"is-unpub"}">${t.isPublished?"表示":"非表示"}</span>
            </span>
            <span class="fair-list__meta"><span class="fair-list__key">価格</span>${v(a)}</span>
            <span class="fair-list__meta"><span class="fair-list__key">含まれるもの</span>${v(i)}</span>
            <span class="fair-list__meta"><span class="fair-list__key">対象スタイル</span>${v(n)}</span>
          </span>
        </button>
      </li>`},rt=(t,e)=>`
      <li class="fair-reorder__item" data-reorder-index="${e}">
        <span class="fair-reorder__handle" aria-hidden="true">≡</span>
        <span class="fair-reorder__no">No. ${e+1}</span>
        <span class="fair-reorder__title">${v(t.title)||"（無題）"}</span>
      </li>`,lt=()=>{if(h)return`
        <div class="fair-list">
          <div class="fair-list__bar">
            <button type="button" class="adm-btn" data-action="toggle-reorder">並べ替えを終了</button>
            <span class="adm-hint">≡ をドラッグして表示順を入れ替え。終わったら「Firestore に保存」で確定します。</span>
          </div>
          <ul class="fair-reorder__list" id="plan-reorder-list">${r.map((a,i)=>rt(a,i)).join("")}</ul>
        </div>`;const t=r.map((s,a)=>nt(s,a)).join(""),e=r.length===0?'<p class="adm-hint">プランがありません。「＋ 新規プランを追加」から作成してください。</p>':"";return`
      <div class="fair-list">
        <div class="fair-list__bar">
          <button type="button" class="adm-btn" data-action="toggle-reorder">並べ替える</button>
        </div>
        <ul class="fair-list__items">${t}</ul>
        ${e}
      </div>`},dt=t=>`
      <div class="fair-edit">
        <div class="fair-edit__bar">
          <button type="button" class="adm-btn" data-action="back-to-list">← 一覧に戻る</button>
        </div>
        ${at(r[t],t)}
      </div>`,ot=()=>{const t=o.querySelector("#plan-reorder-list");t&&(P?.destroy(),P=kt.create(t,{handle:".fair-reorder__handle",animation:150,onEnd:e=>{const s=e.oldIndex,a=e.newIndex;if(s===void 0||a===void 0||s===a)return;const i=r.splice(s,1)[0];i&&(r.splice(a,0,i),r.forEach((n,m)=>{n.sortOrder=m}),f())}}))},f=()=>{P?.destroy(),P=null,u==="edit"&&d>=0&&r[d]?(o.innerHTML=dt(d),st(d)):(u="list",d=-1,o.innerHTML=lt(),h&&ot()),T.hidden=u==="edit";const t=document.querySelector("#plan-count");t&&(t.textContent=bt(r))},c=(t,e)=>{E.textContent=t,E.className="adm-status"+(e?" is-"+e:"")},ct=()=>({id:ht("p"),title:"",description:"",thumbnail:{src:D,alt:""},priceFrom:0,isPublished:!1}),ut=()=>{const t=[],e=new Set;return r.forEach((s,a)=>{const i=`No.${a+1}${s.title?`「${s.title}」`:"（無題）"}`;s.id===""?t.push(`${i}: ID が空です`):e.has(s.id)&&t.push(`${i}: ID「${s.id}」が重複しています`),e.add(s.id),s.title===""&&t.push(`${i}: タイトルが空です`),s.thumbnail.src===""&&t.push(`${i}: サムネイル画像が未選択です`),s.priceFrom<=0&&t.push(`${i}: 最低価格が未入力（または0）です`),s.priceTo!==void 0&&s.priceTo<s.priceFrom&&t.push(`${i}: 上限価格が最低価格より小さくなっています`)}),t},y=document.querySelector("#plan-picker"),I=document.querySelector("#plan-picker-grid");let O=-1;const U=document.querySelector("#plan-image-list"),mt=U?JSON.parse(U.textContent??"[]"):[];I&&(I.innerHTML=mt.map(t=>`
        <button type="button" class="adm-picker__item" data-pick-value="${t.value}">
          <img src="${t.url}" alt="" loading="lazy" />
          <span class="adm-picker__name">${t.value.split("/").pop()??""}</span>
        </button>`).join(""));const pt=t=>{y&&(O=t,y.hidden=!1)},R=()=>{y&&(y.hidden=!0,O=-1)};I&&I.addEventListener("click",t=>{const e=t.target;if(!(e instanceof Element))return;const s=e.closest("button[data-pick-value]");if(!s||O<0)return;const a=s.dataset.pickValue??"";A(O,a),R()}),y&&y.addEventListener("click",t=>{const e=t.target;e instanceof Element&&e.closest("[data-picker-close]")&&R()});const j=window;j.adminDirtyReporters=j.adminDirtyReporters??{},j.adminDirtyReporters.plan=q,window.addEventListener("beforeunload",t=>{q().length!==0&&t.preventDefault()}),o.addEventListener("click",t=>{const e=t.target;if(!(e instanceof Element))return;const s=e.closest("button[data-action]");if(!s)return;const a=s.dataset.action??"",i=s.dataset.pi!==void 0?Number(s.dataset.pi):-1;if(a==="pick-thumb"){pt(i);return}if(a==="edit-plan"){i>=0&&(u="edit",d=i,f());return}if(a==="back-to-list"){S(),u="list",d=-1,f(),V();return}if(a==="toggle-reorder"){h=!h,f(),h?c("並べ替えモードです。≡ をドラッグしてください。",""):V();return}S(),a==="del-plan"&&i>=0&&window.confirm("このプランを削除します。よろしいですか？")&&(r.splice(i,1),u="list",d=-1),f()}),T.addEventListener("click",()=>{S(),r.push(ct()),u="edit",d=r.length-1,f()}),b.addEventListener("click",async()=>{S();const t=ut();if(t.length>0&&!window.confirm(`入力に確認ポイントがあります。それでも保存しますか？

`+t.join(`
`))){c("保存を中止しました。","warn");return}const e=r.filter(n=>w.has(n.id)&&w.get(n.id)!==n.isPublished).map(n=>`${n.title||n.id}: ${n.isPublished?"非表示 → 表示":"表示 → 非表示"}`);if(e.length>0&&!window.confirm(`公開状態が変わるプランがあります。保存してよいですか？

`+e.join(`
`))){c("保存を中止しました。","warn");return}const s=new Set(r.map(n=>n.id)),a=[...x].filter(n=>!s.has(n));if(a.length>0&&!window.confirm(`次の ${a.length} 件を Firestore から削除します（元に戻せません）:
`+a.join(`
`))){c("保存を中止しました。","warn");return}b.disabled=!0;const i=b.textContent??"";b.textContent="保存中…",c("Firestore に保存しています…","");try{for(const n of a)await vt(n);for(const n of r)await gt(n);x=new Set(s),w=new Map(r.map(n=>[n.id,n.isPublished])),z(),c(`保存しました（更新 ${r.length} 件 / 削除 ${a.length} 件）。`,"ok")}catch(n){console.error("保存失敗:",n),c("保存に失敗しました（ログイン状態・通信・ルールを確認してください）。","warn")}finally{b.disabled=!1,b.textContent=i}});const ft=async()=>{c("読み込み中…","");try{const[t,e]=await Promise.all([$t(),_t()]);$=e.filter(s=>s.group==="plan-includes"&&s.isPublished).sort((s,a)=>(s.sortOrder??0)-(a.sortOrder??0)),_=e.filter(s=>s.group==="plan-tags"&&s.isPublished).sort((s,a)=>(s.sortOrder??0)-(a.sortOrder??0)),r=t.map(Z),x=new Set(r.map(s=>s.id)),w=new Map(r.map(s=>[s.id,s.isPublished])),z(),u="list",d=-1,h=!1,f(),c("","")}catch(t){console.error("読み込み失敗:",t),c("読み込みに失敗しました（ログイン状態・通信を確認してください）。","warn")}};yt(wt,t=>{t?ft():(r=[],u="list",d=-1,h=!1,w=new Map,g=new Map,F="",f())})};St();
