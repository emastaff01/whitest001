import{c as vt,m as yt}from"./admin.CLqtnOpU.js";import{b as $t,m as wt,h as _t,k as gt}from"./firestore.CRcbYFcT.js";import{o as St,a as At}from"./firebase.DrE3Iwhb.js";import{S as kt}from"./sortable.esm.rUYOJ6aL.js";const g="/images/noimage.jpg",Et=()=>{const d=document.querySelector("#news-editor"),E=document.querySelector("#news-add-btn"),f=document.querySelector("#news-export-btn"),P=document.querySelector("#news-status");if(!d||!E||!f||!P)return;let l=[],I=new Set,w=new Map,y=new Map,O="",D=[],S=null,u="list",o=-1,h=!1;const r=(t,e)=>`[data-ni="${t}"][data-field="${e}"]`,v=t=>{const e=d.querySelector(t);return e?e.value.trim():""},V=t=>{const e=d.querySelector(t);return e?e.value:""},m=(t,e)=>{const a=d.querySelector(t);a&&(a.value=e)},J=(t,e)=>{const a=d.querySelector(`[data-ni="${t}"][data-field="${e}"]:checked`);return a?a.value:""},B=(t,e,a)=>{d.querySelectorAll(`[data-ni="${t}"][data-field="${e}"]`).forEach(i=>{i.checked=i.value===a})},G=t=>{const e=v(t),a=Number(e);return e===""||Number.isNaN(a)?void 0:a},b=t=>t.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]??e),x="/test-whi".replace(/\/$/,""),M=t=>t?`${x}${t}`:"",Y=(t,e,a)=>{const s=d.querySelector(`[data-ni="${t}"][data-thumb-preview]`);s&&(e?(s.src=M(e),s.hidden=!1):(s.removeAttribute("src"),s.hidden=!0),s.alt=a)},K=t=>t.split("/").pop()??"",j=(t,e)=>{const a=e===""||e===g,s=d.querySelector(r(t,"thumbnailSrc"));s&&(s.value=a?"":K(e),s.dataset.fullpath=a?"":e),Y(t,a?"":e,"")},Q=t=>d.querySelector(r(t,"thumbnailSrc"))?.dataset.fullpath??"",L=t=>{const[e,a,s]=t.split("-");return!e||!a||!s?t:`${e}/${Number(a)}/${Number(s)}`},C=t=>{if(!t)return"";const[e,a]=t.split("T"),s=L(e??"");return a?`${s} ${a}`:s},W=t=>{const e=[];return t.publishStartAt&&e.push(`${C(t.publishStartAt)} 公開予定`),t.publishEndAt&&e.push(`${C(t.publishEndAt)} 非公開予定`),e.join(" / ")},X=t=>{const e=a=>{if(Array.isArray(a))return a.map(e);if(a!==null&&typeof a=="object"){const s=a,i={};for(const n of Object.keys(s).sort())i[n]=e(s[n]);return i}return a};return JSON.stringify(e(t))},F=t=>{const{sortOrder:e,thumbnail:a,...s}=t;return X({...s,thumbnail:a?{src:a.src}:void 0})},U=()=>{y=new Map(l.map(t=>[t.id,{content:F(t),title:t.title}])),O=l.map(t=>t.id).join(",")},q=()=>{_();const t=[],e=new Set(l.map(s=>s.id));return l.forEach(s=>{const i=y.get(s.id);i?i.content!==F(s)&&t.push(`【修正】${s.title||"（無題）"}`):t.push(`【新規作成】${s.title||"（無題）"}`)}),y.forEach((s,i)=>{e.has(i)||t.push(`【削除】${s.title||i}`)}),e.size===y.size&&[...e].every(s=>y.has(s))&&l.map(s=>s.id).join(",")!==O&&t.push("【並び替え】"),t},z=()=>{const t=q();if(t.length===0){c("","");return}c(`未保存の内容があります。
`+t.join(`
`),"warn")},Z=t=>({...t,title:t.title??"",body:t.body??"",publishedAt:t.publishedAt??"",isPublished:t.isPublished??!1}),tt=(t,e)=>{t.id=v(r(e,"id")),t.title=v(r(e,"title")),t.body=V(r(e,"body")).trim(),t.publishedAt=v(r(e,"publishedAt")),t.isPublished=v(r(e,"isPublished"))==="published";const a=J(e,"categoryId");t.categoryId=a===""?void 0:a,delete t.category;const s=v(r(e,"publishStartAt")),i=v(r(e,"publishEndAt"));t.publishStartAt=s===""?void 0:s,t.publishEndAt=i===""?void 0:i,t.publishedAt===""&&t.publishStartAt&&(t.publishedAt=t.publishStartAt.slice(0,10)),t.sortOrder=G(r(e,"sortOrder"));const n=Q(e);t.thumbnail=n===""||n===g?void 0:{src:n,alt:t.title}},_=()=>{if(u!=="edit"||o<0)return;const t=l[o];t&&tt(t,o)},et=(t,e)=>{m(r(e,"id"),t.id),m(r(e,"title"),t.title),m(r(e,"body"),t.body),m(r(e,"publishedAt"),t.publishedAt),B(e,"categoryId",t.categoryId??""),m(r(e,"isPublished"),t.isPublished?"published":"hidden"),m(r(e,"publishStartAt"),t.publishStartAt??""),m(r(e,"publishEndAt"),t.publishEndAt??""),m(r(e,"sortOrder"),t.sortOrder===void 0?"":String(t.sortOrder)),j(e,t.thumbnail?.src??"");const a=d.querySelector(`details[data-ni="${e}"]`);a&&(t.publishStartAt||t.publishEndAt)&&(a.open=!0)},at=t=>{const e=l[t];e&&et(e,t)},st=(t,e)=>{const a=`<label class="adm-radio"><input type="radio" name="news-cat-${e}" data-ni="${e}" data-field="categoryId" value="" /> なし</label>`+D.map(s=>`<label class="adm-radio"><input type="radio" name="news-cat-${e}" data-ni="${e}" data-field="categoryId" value="${s.id}" /> ${b(s.label)}</label>`).join("");return`
      <section class="adm-card">
        <div class="adm-card__head">
          <h2>No. ${e+1}</h2>
          <label class="adm-title"><span class="adm-title__title">タイトル</span>
            <input type="text" data-ni="${e}" data-field="title" />
          </label>
          <label class="adm-pub"><span class="adm-pub__title">公開状態</span>
            <select data-ni="${e}" data-field="isPublished">
              <option value="hidden">非表示</option>
              <option value="published">表示</option>
            </select>
          </label>
        </div>

        <label class="adm-id"><span class="adm-id__title">ID（自動発番・編集不可）</span>
          <input type="text" data-ni="${e}" data-field="id" readonly />
        </label>

        <div class="adm-card__body">
          <div class="adm-row">
            <div class="adm-card__first">
              <label class="adm-field adm-field--narrow"><span class="adm-field-title">公開日（必須）</span>
                <input type="date" data-ni="${e}" data-field="publishedAt" />
              </label>
              <div class="adm-field"><span class="adm-field-title">カテゴリー（任意・選択式）</span>
                <div class="adm-radios">${a}</div>
              </div>
              <p class="adm-hint">カテゴリーは「タグ／カテゴリー」タブで管理している選択肢から選びます（候補が無いときはそのタブで追加してください）。</p>
              <details class="adm-collapse" data-ni="${e}">
                <summary class="adm-collapse__summary">公開の予約（任意）</summary>
                <div class="adm-row">
                  <label class="adm-field adm-field--narrow">予約投稿日時
                    <input type="datetime-local" data-ni="${e}" data-field="publishStartAt" />
                  </label>
                  <label class="adm-field adm-field--narrow">予約非公開日時
                    <input type="datetime-local" data-ni="${e}" data-field="publishEndAt" />
                  </label>
                </div>
                <p class="adm-hint">予約投稿日時を入れると、その日時以降に公開されます（空なら即時／上の「公開状態」に従う）。予約非公開日時を入れると、その日時で自動的に非公開になります（記事データは残ります）。※静的サイトのため、実際に切り替わるのは予約日時より後にサイトを再ビルドしたタイミングです。</p>
              </details>

            </div>
            <div class="adm-card__second">
              <label class="adm-field"><span class="adm-field-title">キャッチ画像（任意）</span></label>
              <div class="adm-thumb">
                <img class="adm-thumb__preview" data-ni="${e}" data-thumb-preview alt="" hidden />
                <div class="adm-row">
                  <input type="text" data-ni="${e}" data-field="thumbnailSrc" readonly placeholder="（「画像を選ぶ」から選択）" />
                  <button type="button" class="adm-btn adm-btn--mini" data-action="pick-thumb" data-ni="${e}">画像を選ぶ</button>
                </div>
                <p class="adm-hint">画像は任意。「画像なし」を選ぶと公開サイトには画像を出しません。</p>
              </div>
            </div>
          </div>
          <label class="adm-field"><span class="adm-field-title">本文</span>
            <textarea rows="6" data-ni="${e}" data-field="body"></textarea>
          </label>
          <p class="adm-hint">本文の改行はそのまま表示されます。</p>

          <!-- 表示順は「並べ替え」で管理するので画面には出さない。
               ただし値の往復（populate→harvest）に input は必要なので hidden で残す。 -->
          <input type="hidden" data-ni="${e}" data-field="sortOrder" />
          <button type="button" class="adm-btn adm-btn--danger" data-action="del-news" data-ni="${e}">お知らせ削除</button>
        </div>
      </section>`},it=(t,e)=>{const a=M(t.thumbnail?.src||g),s=D.find(ht=>ht.id===t.categoryId)?.label||"未設定",i=t.publishedAt?L(t.publishedAt):"未設定",n=W(t),T=n?`<span class="fair-list__meta"><span class="fair-list__key">予約</span>${b(n)}</span>`:"";return`
      <li class="fair-list__row">
        <button type="button" class="fair-list__btn" data-action="edit-news" data-ni="${e}">
          <span class="fair-list__thumb">
            <img src="${b(a)}" alt="${b(t.title)}" loading="lazy" />
          </span>
          <span class="fair-list__main">
            <span class="fair-list__titlerow">
              <span class="fair-list__no">No. ${e+1}</span>
              <span class="fair-list__title">${b(t.title)||"（無題）"}</span>
              <span class="fair-list__badge ${t.isPublished?"is-pub":"is-unpub"}">${t.isPublished?"表示":"非表示"}</span>
            </span>
            <span class="fair-list__meta"><span class="fair-list__key">公開日</span>${b(i)}</span>
            <span class="fair-list__meta"><span class="fair-list__key">カテゴリー</span>${b(s)}</span>
            ${T}
          </span>
        </button>
      </li>`},nt=(t,e)=>`
      <li class="fair-reorder__item" data-reorder-index="${e}">
        <span class="fair-reorder__handle" aria-hidden="true">≡</span>
        <span class="fair-reorder__no">No. ${e+1}</span>
        <span class="fair-reorder__title">${b(t.title)||"（無題）"}</span>
      </li>`,lt=()=>{if(h)return`
        <div class="fair-list">
          <div class="fair-list__bar">
            <button type="button" class="adm-btn" data-action="toggle-reorder">並べ替えを終了</button>
            <span class="adm-hint">≡ をドラッグして表示順を入れ替え。終わったら「Firestore に保存」で確定します。</span>
          </div>
          <ul class="fair-reorder__list" id="news-reorder-list">${l.map((s,i)=>nt(s,i)).join("")}</ul>
        </div>`;const t=l.map((a,s)=>it(a,s)).join(""),e=l.length===0?'<p class="adm-hint">お知らせがありません。「＋ 新規お知らせを追加」から作成してください。</p>':"";return`
      <div class="fair-list">
        <div class="fair-list__bar">
          <button type="button" class="adm-btn" data-action="toggle-reorder" hidden>並べ替える</button>
        </div>
        <ul class="fair-list__items">${t}</ul>
        ${e}
      </div>`},rt=t=>`
      <div class="fair-edit">
        <div class="fair-edit__bar">
          <button type="button" class="adm-btn" data-action="back-to-list">← 一覧に戻る</button>
        </div>
        ${st(l[t],t)}
      </div>`,dt=()=>{const t=d.querySelector("#news-reorder-list");t&&(S?.destroy(),S=kt.create(t,{handle:".fair-reorder__handle",animation:150,onEnd:e=>{const a=e.oldIndex,s=e.newIndex;if(a===void 0||s===void 0||a===s)return;const i=l.splice(a,1)[0];i&&(l.splice(s,0,i),l.forEach((n,T)=>{n.sortOrder=T}),p())}}))},p=()=>{S?.destroy(),S=null,u==="edit"&&o>=0&&l[o]?(d.innerHTML=rt(o),at(o)):(u="list",o=-1,d.innerHTML=lt(),h&&dt()),E.hidden=u==="edit";const t=document.querySelector("#news-count");t&&(t.textContent=vt(l))},c=(t,e)=>{P.textContent=t,P.className="adm-status"+(e?" is-"+e:"")},ot=()=>{const t=new Date,e=new Date(t.getTime()+540*60*1e3),a=s=>String(s).padStart(2,"0");return`${e.getUTCFullYear()}-${a(e.getUTCMonth()+1)}-${a(e.getUTCDate())}`},ct=()=>({id:yt("n"),title:"",body:"",publishedAt:ot(),isPublished:!1}),ut=()=>{const t=[],e=new Set;return l.forEach((a,s)=>{const i=`No.${s+1}${a.title?`「${a.title}」`:"（無題）"}`;a.id===""?t.push(`${i}: ID が空です`):e.has(a.id)&&t.push(`${i}: ID「${a.id}」が重複しています`),e.add(a.id),a.title===""&&t.push(`${i}: タイトルが空です`),a.publishedAt===""&&t.push(`${i}: 公開日が未入力です（構造化データに必要）`),a.publishStartAt&&a.publishEndAt&&a.publishEndAt<=a.publishStartAt&&t.push(`${i}: 予約非公開日時が予約投稿日時より前（または同じ）です`)}),t},$=document.querySelector("#news-picker"),A=document.querySelector("#news-picker-grid");let k=-1;const H=document.querySelector("#news-image-list"),mt=H?JSON.parse(H.textContent??"[]"):[],bt=`
      <button type="button" class="adm-picker__item" data-pick-value="${g}">
        <img src="${x}${g}" alt="" loading="lazy" />
        <span class="adm-picker__name">画像なし</span>
      </button>`;A&&(A.innerHTML=bt+mt.map(t=>`
        <button type="button" class="adm-picker__item" data-pick-value="${t.value}">
          <img src="${t.url}" alt="" loading="lazy" />
          <span class="adm-picker__name">${t.value.split("/").pop()??""}</span>
        </button>`).join(""));const pt=t=>{$&&(k=t,$.hidden=!1)},R=()=>{$&&($.hidden=!0,k=-1)};A&&A.addEventListener("click",t=>{const e=t.target;if(!(e instanceof Element))return;const a=e.closest("button[data-pick-value]");if(!a||k<0)return;const s=a.dataset.pickValue??"";j(k,s),R()}),$&&$.addEventListener("click",t=>{const e=t.target;e instanceof Element&&e.closest("[data-picker-close]")&&R()});const N=window;N.adminDirtyReporters=N.adminDirtyReporters??{},N.adminDirtyReporters.news=q,window.addEventListener("beforeunload",t=>{q().length!==0&&t.preventDefault()}),d.addEventListener("click",t=>{const e=t.target;if(!(e instanceof Element))return;const a=e.closest("button[data-action]");if(!a)return;const s=a.dataset.action??"",i=a.dataset.ni!==void 0?Number(a.dataset.ni):-1;if(s==="pick-thumb"){pt(i);return}if(s==="edit-news"){i>=0&&(u="edit",o=i,p());return}if(s==="back-to-list"){_(),u="list",o=-1,p(),z();return}if(s==="toggle-reorder"){h=!h,p(),h?c("並べ替えモードです。≡ をドラッグしてください。",""):z();return}_(),s==="del-news"&&i>=0&&window.confirm("このお知らせを削除します。よろしいですか？")&&(l.splice(i,1),u="list",o=-1),p()}),E.addEventListener("click",()=>{_(),l.push(ct()),u="edit",o=l.length-1,p()}),f.addEventListener("click",async()=>{_();const t=ut();if(t.length>0&&!window.confirm(`入力に確認ポイントがあります。それでも保存しますか？

`+t.join(`
`))){c("保存を中止しました。","warn");return}const e=l.filter(n=>w.has(n.id)&&w.get(n.id)!==n.isPublished).map(n=>`${n.title||n.id}: ${n.isPublished?"非表示 → 表示":"表示 → 非表示"}`);if(e.length>0&&!window.confirm(`公開状態が変わるお知らせがあります。保存してよいですか？

`+e.join(`
`))){c("保存を中止しました。","warn");return}const a=new Set(l.map(n=>n.id)),s=[...I].filter(n=>!a.has(n));if(s.length>0&&!window.confirm(`次の ${s.length} 件を Firestore から削除します（元に戻せません）:
`+s.join(`
`))){c("保存を中止しました。","warn");return}f.disabled=!0;const i=f.textContent??"";f.textContent="保存中…",c("Firestore に保存しています…","");try{for(const n of s)await $t(n);for(const n of l)await wt(n);I=new Set(a),w=new Map(l.map(n=>[n.id,n.isPublished])),U(),c(`保存しました（更新 ${l.length} 件 / 削除 ${s.length} 件）。`,"ok")}catch(n){console.error("保存失敗:",n),c("保存に失敗しました（ログイン状態・通信・ルールを確認してください）。","warn")}finally{f.disabled=!1,f.textContent=i}});const ft=async()=>{c("読み込み中…","");try{const[t,e]=await Promise.all([_t(),gt()]);D=e.filter(a=>a.group==="news-category"&&a.isPublished).sort((a,s)=>(a.sortOrder??0)-(s.sortOrder??0)).map(a=>({id:a.id,label:a.label})),l=t.map(Z),I=new Set(l.map(a=>a.id)),w=new Map(l.map(a=>[a.id,a.isPublished])),U(),u="list",o=-1,h=!1,p(),c("","")}catch(t){console.error("読み込み失敗:",t),c("読み込みに失敗しました（ログイン状態・通信を確認してください）。","warn")}};St(At,t=>{t?ft():(l=[],u="list",o=-1,h=!1,w=new Map,y=new Map,O="",p())})};Et();
