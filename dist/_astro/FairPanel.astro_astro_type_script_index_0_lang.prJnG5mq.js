import{c as Ut,m as Vt,l as rt,a as ct}from"./admin.CLqtnOpU.js";import{d as zt,s as Jt,g as Gt,k as Kt}from"./firestore.CRcbYFcT.js";import{o as Yt,a as Qt}from"./firebase.DrE3Iwhb.js";import{S as Wt}from"./sortable.esm.rUYOJ6aL.js";const z="/images/noimage.jpg",C=3,J=d=>d<=0?"full":d<=2?"few":"available",Xt=()=>{const d=document.querySelector("#fair-editor"),A=document.querySelector("#fair-add-btn"),k=document.querySelector("#fair-export-btn"),D=document.querySelector("#fair-status");if(!d||!A||!k||!D)return;let o=[],L=new Set,x=new Map,N=new Map,H="";const ut=t=>{const a=e=>{if(Array.isArray(e))return e.map(a);if(e!==null&&typeof e=="object"){const s=e,i={};for(const n of Object.keys(s).sort())i[n]=a(s[n]);return i}return e};return JSON.stringify(a(t))},G=t=>{const{sortOrder:a,thumbnail:e,...s}=t;return ut({...s,thumbnail:{src:e.src}})},K=()=>{N=new Map(o.map(t=>[t.id,{content:G(t),title:t.title}])),H=o.map(t=>t.id).join(",")},B=()=>{E();const t=[],a=new Set(o.map(s=>s.id));return o.forEach(s=>{const i=N.get(s.id);i?i.content!==G(s)&&t.push(`【修正】${s.title||"（無題）"}`):t.push(`【新規作成】${s.title||"（無題）"}`)}),N.forEach((s,i)=>{a.has(i)||t.push(`【削除】${s.title||i}`)}),a.size===N.size&&[...a].every(s=>N.has(s))&&o.map(s=>s.id).join(",")!==H&&t.push("【並び替え】"),t},Y=()=>{const t=B();if(t.length===0){f("","");return}f(`未保存の内容があります。
`+t.join(`
`),"warn")};let F=[],T=[],P=null,h="list",u=-1,S=!1;const l=(t,a)=>`[data-fi="${t}"][data-field="${a}"]`,Q=(t,a,e)=>`[data-fi="${t}"][data-di="${a}"][data-sfield="${e}"]`,_=(t,a,e,s)=>`[data-fi="${t}"][data-di="${a}"][data-si="${e}"][data-sfield="${s}"]`,m=t=>{const a=d.querySelector(t);return a?a.value.trim():""},R=t=>{const a=d.querySelector(t);return a?a.value:""},p=(t,a)=>{const e=d.querySelector(t);e&&(e.value=a)},y=t=>t.replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]??a),pt="/test-whi".replace(/\/$/,""),W=t=>t?`${pt}${t}`:"",mt=(t,a,e)=>{const s=d.querySelector(`[data-fi="${t}"][data-thumb-preview]`);s&&(a?(s.src=W(a),s.hidden=!1):(s.removeAttribute("src"),s.hidden=!0),s.alt=e)},bt=t=>t.split("/").pop()??"",X=(t,a)=>{const e=d.querySelector(l(t,"thumbnailSrc"));e&&(e.value=bt(a),e.dataset.fullpath=a),mt(t,a,"")},ft=t=>d.querySelector(l(t,"thumbnailSrc"))?.dataset.fullpath??"",ht=(t,a)=>{t.id=m(l(a,"id")),t.title=m(l(a,"title"));const e=m(l(a,"catchCopy"));t.catchCopy=e===""?void 0:e,t.description=R(l(a,"description")).trim(),t.thumbnail={src:ft(a)||z,alt:t.title};const s=m(l(a,"duration"));t.duration=s===""?void 0:s;const i=m(l(a,"reservationFormId"));t.reservationFormId=i===""||i===t.id?void 0:i;const n=m(l(a,"sortOrder")),c=Number(n);t.sortOrder=n===""||Number.isNaN(c)?void 0:c,t.isPublished=m(l(a,"isPublished"))==="published";const r=Array.from(d.querySelectorAll(`input[type="checkbox"][data-fi="${a}"][data-tag-id]`)).filter(b=>b.checked).map(b=>b.dataset.tagId??"");t.tagIds=r.length?r:void 0;const $=rt(R(l(a,"benefits")));t.benefits=$.length?$:void 0;const O=rt(R(l(a,"contractBenefits")));t.contractBenefits=O.length?O:void 0;const M=Array.from(d.querySelectorAll(`input[type="checkbox"][data-fi="${a}"][data-content-id]`)).filter(b=>b.checked).map(b=>b.dataset.contentId??"");t.contentIds=M.length?M:void 0,t.schedule.forEach((b,w)=>{b.date=m(Q(a,w,"date")),b.times.forEach((v,V)=>{v.time=m(_(a,w,V,"time"));const it=m(_(a,w,V,"capacity")),ot=m(_(a,w,V,"booked")),lt=Number(it),dt=Number(ot);v.capacity=it===""||Number.isNaN(lt)?C:Math.max(0,Math.floor(lt)),v.booked=ot===""||Number.isNaN(dt)?0:Math.max(0,Math.floor(dt)),v.status=J(v.capacity-v.booked)})})},E=()=>{if(h!=="edit"||u<0)return;const t=o[u];t&&ht(t,u)},$t=(t,a)=>{p(l(a,"id"),t.id),p(l(a,"title"),t.title),p(l(a,"catchCopy"),t.catchCopy??""),p(l(a,"description"),t.description),X(a,t.thumbnail.src),p(l(a,"duration"),t.duration??""),p(l(a,"reservationFormId"),t.reservationFormId??t.id),p(l(a,"sortOrder"),t.sortOrder===void 0?"":String(t.sortOrder)),p(l(a,"isPublished"),t.isPublished?"published":"hidden");{const e=new Set(t.tagIds??[]);d.querySelectorAll(`input[type="checkbox"][data-fi="${a}"][data-tag-id]`).forEach(s=>{s.checked=e.has(s.dataset.tagId??"")})}p(l(a,"benefits"),ct(t.benefits)),p(l(a,"contractBenefits"),ct(t.contractBenefits));{const e=new Set(t.contentIds??[]);d.querySelectorAll(`input[type="checkbox"][data-fi="${a}"][data-content-id]`).forEach(s=>{s.checked=e.has(s.dataset.contentId??"")})}t.schedule.forEach((e,s)=>{p(Q(a,s,"date"),e.date),e.times.forEach((i,n)=>{p(_(a,s,n,"time"),i.time),p(_(a,s,n,"capacity"),String(i.capacity??C)),p(_(a,s,n,"booked"),String(i.booked??0)),et(a,s,n)})})},vt=t=>{const a=o[t];a&&$t(a,t)},yt=t=>{if(F.length===0)return'<p class="adm-hint">選択肢がありません。「タグ／カテゴリー管理」→「フェアのタグ」で追加してください。</p>';const a=F.map(e=>`
          <label class="adm-radio">
            <input type="checkbox" data-fi="${t}" data-tag-id="${e.id}" />
            <span>${e.label}</span>
          </label>`).join("");return`<div class="adm-radios" data-fi="${t}" data-field="tags">${a}</div>`},_t=t=>{if(T.length===0)return'<p class="adm-hint">選択肢がありません。「タグ／カテゴリー管理」→「フェアの体験できること」で追加してください。</p>';const a=T.map(e=>`
          <label class="adm-radio">
            <input type="checkbox" data-fi="${t}" data-content-id="${e.id}" />
            <span>${e.label}</span>
          </label>`).join("");return`<div class="adm-radios" data-fi="${t}" data-field="contents">${a}</div>`},gt=["約1時間","約1時間15分","約1時間30分","約1時間45分","約2時間","約2時間15分","約2時間30分","約2時間45分","約3時間","約3時間15分","約3時間30分"],kt=()=>['<option value="">（指定しない）</option>'].concat(gt.map(t=>`<option value="${t}">${t}</option>`)).join(""),St=(()=>{const t=[];for(let a=10;a<=18;a++)for(let e=0;e<60&&!(a===18&&e>0);e+=15)t.push(`${a}:${String(e).padStart(2,"0")}`);return t})(),wt=()=>['<option value="">（時間を選択）</option>'].concat(St.map(t=>`<option value="${t}">${t}</option>`)).join(""),Nt=(t,a,e)=>`
      <div class="adm-slot">
        <select data-fi="${t}" data-di="${a}" data-si="${e}" data-sfield="time">${wt()}</select>
        <label class="adm-slot__num">定員
          <input type="number" min="0" step="1" data-fi="${t}" data-di="${a}" data-si="${e}" data-sfield="capacity" />
        </label>
        <label class="adm-slot__num">予約済
          <input type="number" min="0" step="1" data-fi="${t}" data-di="${a}" data-si="${e}" data-sfield="booked" />
        </label>
        <span class="adm-slot__status" data-fi="${t}" data-di="${a}" data-si="${e}">残り <span data-slot-remaining>-</span> 組 <span class="fair-list__mark" data-slot-mark>&#9678;</span></span>
        <button type="button" class="adm-btn adm-btn--mini" data-action="del-slot" data-fi="${t}" data-di="${a}" data-si="${e}">削除</button>
      </div>`,It=(t,a,e)=>{const s=Array.from({length:e},(i,n)=>Nt(t,a,n)).join("");return`
      <div class="adm-day">
        <div class="adm-day__head">
          <label>開催日 <input type="date" data-fi="${t}" data-di="${a}" data-sfield="date" /></label>
          <button type="button" class="adm-btn adm-btn--mini" data-action="del-day" data-fi="${t}" data-di="${a}">この日を削除</button>
        </div>
        <div class="adm-slots">${s}</div>
        <button type="button" class="adm-btn adm-btn--mini" data-action="add-slot" data-fi="${t}" data-di="${a}">＋ 時間枠を追加</button>
      </div>`},xt=(t,a)=>{const e=t.schedule.map((i,n)=>It(a,n,i.times.length)).join(""),s=t.reservationFormId!==void 0&&t.reservationFormId!==""&&t.reservationFormId!==t.id;return`
      <section class="adm-card">
        <div class="adm-card__head">
          <h2>No. ${a+1}</h2>
          <label class="adm-title"><span class="adm-title__title">フェアタイトル</span>
            <input type="text" data-fi="${a}" data-field="title" placeholder="（タイトル）"/>
          </label>
          <label class="adm-pub"><span class="adm-pub__title">公開状態</span>
            <select data-fi="${a}" data-field="isPublished">
              <option value="hidden">非表示</option>
              <option value="published">表示</option>
            </select>
          </label>
          
        </div>
        <label class="adm-id"><span class="adm-id__title">ID（自動発番・編集不可）</span>
          <input type="text" data-fi="${a}" data-field="id" readonly placeholder="（保存時に自動で付与されます）" />
        </label>
        <div class="adm-card__body">
        <div class="adm-row">
          <div class="adm-card__first">
            
            <label class="adm-field">
              <span class="adm-field-title">キャッチコピー（任意）</span>
              <input type="text" data-fi="${a}" data-field="catchCopy" />
            </label>
            <label class="adm-field">
              <span class="adm-field-title">説明文
              </span><textarea rows="3" data-fi="${a}" data-field="description"></textarea>
            </label>
            <label class="adm-field">
            <span class="adm-field-title">所要時間（任意）</span>
              <select data-fi="${a}" data-field="duration">${kt()}</select>
            </label>
          </div>
          <div class="adm-card__second">
            <label class="adm-field">
              <span class="adm-field-title">サムネイル画像</span>
            </label>
              <div class="adm-thumb">
                <img class="adm-thumb__preview" data-fi="${a}" data-thumb-preview alt="" hidden />
                <div class="adm-row">
                <input type="text" data-fi="${a}" data-field="thumbnailSrc" readonly placeholder="（「画像を選ぶ」から選択）" />
                <button type="button" class="adm-btn adm-btn--mini" data-action="pick-thumb" data-fi="${a}">画像を選ぶ</button>
                </div>
              </div>
            </label>
          </div>
        </div>
        <!-- 表示順は「並べ替え」で管理するので画面には出さない。
             ただし値の往復（populate→harvest）に input は必要なので hidden で残す。 -->
        <input type="hidden" data-fi="${a}" data-field="sortOrder" />

        <div class="adm-row">
        <label class="adm-field">
        <span class="adm-field-title">タグ（複数選択／任意）</span>
          ${yt(a)}
        </label>
        <label class="adm-field">
        <span class="adm-field-title">来館特典（1行に1つ／任意）</span>
            <textarea rows="3" data-fi="${a}" data-field="benefits"></textarea>
          </label>
          <label class="adm-field">
          <span class="adm-field-title">成約特典（1行に1つ／任意）</span>
            <textarea rows="3" data-fi="${a}" data-field="contractBenefits"></textarea>
          </label>
        </div>

        <label class="adm-field">
        <span class="adm-field-title">体験できること（複数選択／任意）</span>
          ${_t(a)}
        </label>

        <div class="adm-sched">
          <h3>開催日程</h3>
          ${e}
          <button type="button" class="adm-btn" data-action="add-day" data-fi="${a}">＋ 開催日を追加</button>
        </div>

        <details class="adm-collapse" ${s?"open":""}>
          <summary class="adm-collapse__summary">予約フォームID（通常は変更不要・クリックで開く）</summary>
          <div class="adm-collapse__body">
            <input type="text" data-fi="${a}" data-field="reservationFormId" />
            <span class="adm-hint">予約フォームに渡す識別子。初期値はこのフェアのID。分かりやすい名前（例: winter-fair）にしたいときだけ変更してください。</span>
          </div>
        </details>
        <button type="button" class="adm-btn adm-btn--danger" data-action="del-fair" data-fi="${a}">フェア削除</button>
        </div>
        
      </section>`},Z=(t,a)=>!t||t.length===0?[]:t.map(e=>a.find(s=>s.id===e)?.label).filter(e=>!!e),Et=t=>{const a=t.split("-"),e=a[1],s=a[2];return!e||!s?t:`${Number(e)}/${Number(s)}`},tt={available:"◎",few:"△",full:"×"},at={available:"is-available",few:"is-few",full:"is-full"},Ot=t=>{const a=tt[t.status]??"◎",e=at[t.status]??"is-available";return`<span class="fair-list__slot">${y(t.time)}<span class="fair-list__mark ${e}">${a}</span></span>`},et=(t,a,e)=>{const s=m(_(t,a,e,"capacity")),i=m(_(t,a,e,"booked")),n=Number(s),c=Number(i),r=s===""||Number.isNaN(n)?C:Math.max(0,Math.floor(n)),$=i===""||Number.isNaN(c)?0:Math.max(0,Math.floor(c)),O=r-$,M=J(O),b=`.adm-slot__status[data-fi="${t}"][data-di="${a}"][data-si="${e}"]`,w=d.querySelector(`${b} [data-slot-remaining]`);w&&(w.textContent=String(Math.max(0,O)));const v=d.querySelector(`${b} [data-slot-mark]`);v&&(v.textContent=tt[M]??"◎",v.className=`fair-list__mark ${at[M]??"is-available"}`)},Mt=t=>{const a=t.date?y(Et(t.date)):"",e=t.times.filter(s=>s.time!=="").map(Ot).join("");return`<span class="fair-list__day"><span class="fair-list__md">${a}</span>${e}</span>`},Ct=t=>{const a=t.filter(i=>i.date!=="");if(a.length===0)return"未設定";const e=a.slice(0,3).map(Mt).join(""),s=a.length-3;return e+(s>0?`<span class="fair-list__more">ほか${s}件</span>`:"")},Ft=(t,a)=>{const e=W(t.thumbnail.src),s=Ct(t.schedule),i=t.duration??"未設定",n=Z(t.tagIds,F).join("、")||"未設定",c=Z(t.contentIds,T).join("、")||"未設定";return`
      <li class="fair-list__row">
        <button type="button" class="fair-list__btn" data-action="edit-fair" data-fi="${a}">
          <span class="fair-list__thumb">
            <img src="${y(e)}" alt="${y(t.title)}" loading="lazy" />
          </span>
          <span class="fair-list__main">
            <span class="fair-list__titlerow">
              <span class="fair-list__no">No. ${a+1}</span>
              <span class="fair-list__title">${y(t.title)||"（無題）"}</span>
              <span class="fair-list__badge ${t.isPublished?"is-pub":"is-unpub"}">${t.isPublished?"表示":"非表示"}</span>
            </span>
            <span class="fair-list__meta"><span class="fair-list__key">開催日</span>${s}</span>
            <span class="fair-list__meta"><span class="fair-list__key">所要時間</span>${y(i)}</span>
            <span class="fair-list__meta"><span class="fair-list__key">タグ</span>${y(n)}</span>
            <span class="fair-list__meta"><span class="fair-list__key">体験</span>${y(c)}</span>
          </span>
        </button>
      </li>`},Tt=(t,a)=>`
      <li class="fair-reorder__item" data-reorder-index="${a}">
        <span class="fair-reorder__handle" aria-hidden="true">≡</span>
        <span class="fair-reorder__no">No. ${a+1}</span>
        <span class="fair-reorder__title">${y(t.title)||"（無題）"}</span>
      </li>`,Pt=()=>{if(S)return`
        <div class="fair-list">
          <div class="fair-list__bar">
            <button type="button" class="adm-btn" data-action="toggle-reorder">並べ替えを終了</button>
            <span class="adm-hint">≡ をドラッグして表示順を入れ替え。終わったら「Firestore に保存」で確定します。</span>
          </div>
          <ul class="fair-reorder__list" id="fair-reorder-list">${o.map((s,i)=>Tt(s,i)).join("")}</ul>
        </div>`;const t=o.map((e,s)=>Ft(e,s)).join(""),a=o.length===0?'<p class="adm-hint">フェアがありません。「＋ 新規フェアを追加」から作成してください。</p>':"";return`
      <div class="fair-list">
        <div class="fair-list__bar">
          <button type="button" class="adm-btn" data-action="toggle-reorder">並べ替える</button>
        </div>
        <ul class="fair-list__items">${t}</ul>
        ${a}
      </div>`},jt=t=>`
      <div class="fair-edit">
        <div class="fair-edit__bar">
          <button type="button" class="adm-btn" data-action="back-to-list">← 一覧に戻る</button>
        </div>
        ${xt(o[t],t)}
      </div>`,qt=()=>{const t=d.querySelector("#fair-reorder-list");t&&(P?.destroy(),P=Wt.create(t,{handle:".fair-reorder__handle",animation:150,onEnd:a=>{const e=a.oldIndex,s=a.newIndex;if(e===void 0||s===void 0||e===s)return;const i=o.splice(e,1)[0];i&&(o.splice(s,0,i),o.forEach((n,c)=>{n.sortOrder=c}),g())}}))},g=()=>{P?.destroy(),P=null,h==="edit"&&u>=0&&o[u]?(d.innerHTML=jt(u),vt(u)):(h="list",u=-1,d.innerHTML=Pt(),S&&qt()),A.hidden=h==="edit";const t=document.querySelector("#fair-count");t&&(t.textContent=Ut(o))},f=(t,a)=>{D.textContent=t,D.className="adm-status"+(a?" is-"+a:"")},At=()=>({id:Vt("f"),title:"",description:"",thumbnail:{src:z,alt:""},schedule:[],isPublished:!1}),Dt=()=>{const t=[],a=new Set;return o.forEach((e,s)=>{const i=s+1;e.id===""?t.push(`${i}件目: ID が空です`):a.has(e.id)&&t.push(`${i}件目: ID「${e.id}」が重複しています`),a.add(e.id),e.title===""&&t.push(`${i}件目: タイトルが空です`),e.thumbnail.src===""&&t.push(`${i}件目: サムネイル画像が未選択です`)}),t},I=document.querySelector("#fair-picker"),j=document.querySelector("#fair-picker-grid");let q=-1;const st=document.querySelector("#fair-image-list"),Lt=st?JSON.parse(st.textContent??"[]"):[];j&&(j.innerHTML=Lt.map(t=>`
        <button type="button" class="adm-picker__item" data-pick-value="${t.value}">
          <img src="${t.url}" alt="" loading="lazy" />
          <span class="adm-picker__name">${t.value.split("/").pop()??""}</span>
        </button>`).join(""));const Ht=t=>{I&&(q=t,I.hidden=!1)},nt=()=>{I&&(I.hidden=!0,q=-1)};j&&j.addEventListener("click",t=>{const a=t.target;if(!(a instanceof Element))return;const e=a.closest("button[data-pick-value]");if(!e||q<0)return;const s=e.dataset.pickValue??"";X(q,s),nt()}),I&&I.addEventListener("click",t=>{const a=t.target;a instanceof Element&&a.closest("[data-picker-close]")&&nt()});const U=window;U.adminDirtyReporters=U.adminDirtyReporters??{},U.adminDirtyReporters.fair=B,window.addEventListener("beforeunload",t=>{B().length!==0&&t.preventDefault()}),d.addEventListener("input",t=>{const a=t.target;if(!(a instanceof HTMLInputElement))return;const e=a.dataset.sfield;if(e!=="capacity"&&e!=="booked")return;const s=Number(a.dataset.fi),i=Number(a.dataset.di),n=Number(a.dataset.si);Number.isNaN(s)||Number.isNaN(i)||Number.isNaN(n)||et(s,i,n)}),d.addEventListener("click",t=>{const a=t.target;if(!(a instanceof Element))return;const e=a.closest("button[data-action]");if(!e)return;const s=e.dataset.action??"",i=e.dataset.fi!==void 0?Number(e.dataset.fi):-1;if(s==="pick-thumb"){Ht(i);return}if(s==="edit-fair"){i>=0&&(h="edit",u=i,g());return}if(s==="back-to-list"){E(),h="list",u=-1,g(),Y();return}if(s==="toggle-reorder"){S=!S,g(),S?f("並べ替えモードです。≡ をドラッグしてください。",""):Y();return}const n=e.dataset.di!==void 0?Number(e.dataset.di):-1,c=e.dataset.si!==void 0?Number(e.dataset.si):-1;E();const r=i>=0?o[i]:void 0;if(s==="del-fair")i>=0&&window.confirm("このフェアを削除します。よろしいですか？")&&(o.splice(i,1),h="list",u=-1);else if(s==="add-day"&&r)r.schedule.push({date:"",times:[]});else if(s==="del-day"&&r&&n>=0)r.schedule.splice(n,1);else if(s==="add-slot"&&r&&n>=0){const $=r.schedule[n];$&&$.times.push({time:"",status:"available",capacity:C,booked:0})}else if(s==="del-slot"&&r&&n>=0&&c>=0){const $=r.schedule[n];$&&$.times.splice(c,1)}g()}),A.addEventListener("click",()=>{E(),o.push(At()),h="edit",u=o.length-1,g()}),k.addEventListener("click",async()=>{E();const t=Dt();if(t.length>0&&!window.confirm(`入力に確認ポイントがあります。それでも保存しますか？

`+t.join(`
`))){f("保存を中止しました。","warn");return}const a=o.filter(n=>x.has(n.id)&&x.get(n.id)!==n.isPublished).map(n=>`${n.title||n.id}: ${n.isPublished?"非表示 → 表示":"表示 → 非表示"}`);if(a.length>0&&!window.confirm(`公開状態が変わるフェアがあります。保存してよいですか？

`+a.join(`
`))){f("保存を中止しました。","warn");return}const e=new Set(o.map(n=>n.id)),s=[...L].filter(n=>!e.has(n));if(s.length>0&&!window.confirm(`次の ${s.length} 件を Firestore から削除します（元に戻せません）:
`+s.join(`
`))){f("保存を中止しました。","warn");return}k.disabled=!0;const i=k.textContent??"";k.textContent="保存中…",f("Firestore に保存しています…","");try{for(const n of s)await zt(n);for(const n of o)await Jt(n);L=new Set(e),x=new Map(o.map(n=>[n.id,n.isPublished])),K(),f(`保存しました（更新 ${o.length} 件 / 削除 ${s.length} 件）。`,"ok")}catch(n){console.error("保存失敗:",n),f("保存に失敗しました（ログイン状態・通信・ルールを確認してください）。","warn")}finally{k.disabled=!1,k.textContent=i}});const Bt=t=>{const{tags:a,contents:e,...s}=t;return{...s,title:s.title??"",description:s.description??"",thumbnail:{src:s.thumbnail?.src||z,alt:s.thumbnail?.alt??""},schedule:(s.schedule??[]).map(i=>({...i,times:(i.times??[]).map(n=>{const c=typeof n.capacity=="number"?n.capacity:C,r=typeof n.booked=="number"?n.booked:0;return{...n,capacity:c,booked:r,status:J(c-r)}})}))}},Rt=async()=>{f("読み込み中…","");try{const[t,a]=await Promise.all([Gt(),Kt()]);F=a.filter(e=>e.group==="fair-tags"&&e.isPublished).sort((e,s)=>(e.sortOrder??0)-(s.sortOrder??0)),T=a.filter(e=>e.group==="fair-contents"&&e.isPublished).sort((e,s)=>(e.sortOrder??0)-(s.sortOrder??0)),o=t.map(Bt),L=new Set(o.map(e=>e.id)),x=new Map(o.map(e=>[e.id,e.isPublished])),K(),h="list",u=-1,S=!1,g(),f("","")}catch(t){console.error("読み込み失敗:",t),f("読み込みに失敗しました（ログイン状態・通信を確認してください）。","warn")}};Yt(Qt,t=>{t?Rt():(o=[],h="list",u=-1,S=!1,x=new Map,N=new Map,H="",g())})};Xt();
