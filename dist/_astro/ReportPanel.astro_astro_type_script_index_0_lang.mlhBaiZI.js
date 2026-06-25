import{c as St,m as kt}from"./admin.CLqtnOpU.js";import{c as Et,n as qt,i as Lt,k as Ot}from"./firestore.CRcbYFcT.js";import{o as xt,a as Nt}from"./firebase.DrE3Iwhb.js";import{S as Dt}from"./sortable.esm.rUYOJ6aL.js";const V="/images/noimage.jpg",Pt=()=>{const r=document.querySelector("#report-editor"),C=document.querySelector("#report-add-btn"),y=document.querySelector("#report-export-btn"),A=document.querySelector("#report-status");if(!r||!C||!y||!A)return;let n=[],M=new Set,E=new Map,_=new Map,T="",w=[],O=null,u="list",o=-1,v=!1;const d=(t,e)=>`[data-ri="${t}"][data-field="${e}"]`,b=t=>{const e=r.querySelector(t);return e?e.value.trim():""},G=t=>{const e=r.querySelector(t);return e?e.value:""},tt=t=>{const e=r.querySelector(t);return e?e.checked:!1},p=(t,e)=>{const a=r.querySelector(t);a&&(a.value=e)},et=(t,e)=>{const a=r.querySelector(t);a&&(a.checked=e)},m=t=>t.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]??e),c=(t,e)=>{A.textContent=t,A.className="adm-status"+(e?" is-"+e:"")},at="/test-whi".replace(/\/$/,""),R=t=>t?`${at}${t}`:"",st=(t,e,a)=>{const s=r.querySelector(`[data-ri="${t}"][data-thumb-preview]`);s&&(e?(s.src=R(e),s.hidden=!1):(s.removeAttribute("src"),s.hidden=!0),s.alt=a)},x=t=>t.split("/").pop()??"",B=(t,e)=>{const a=r.querySelector(d(t,"thumbnailSrc"));a&&(a.value=x(e),a.dataset.fullpath=e),st(t,e,"")},lt=t=>r.querySelector(d(t,"thumbnailSrc"))?.dataset.fullpath??"",U=t=>{if(t==="")return;const e=Number(t);return Number.isNaN(e)?void 0:e},J="/images/reports/",it=(t,e)=>t.split(`
`).map(a=>a.trim()).filter(a=>a.length>0).map((a,s)=>({src:a.startsWith("/")?a:`${J}${a}`,alt:`${e}（${s+1}枚目）`})),nt=t=>(t??[]).map(e=>x(e.src)).join(`
`),N=t=>{const e=r.querySelector(`[data-ri="${t}"][data-gallery-preview]`),a=r.querySelector(d(t,"gallery"));if(!e||!a)return;const s=a.value.split(`
`).map(l=>l.trim()).filter(l=>l!=="");e.innerHTML=s.map(l=>{const i=l.startsWith("/")?l:`${J}${l}`;return`<span class="adm-gallery-thumb">
          <img src="${m(R(i))}" alt="" loading="lazy" />
          <button type="button" class="adm-gallery-thumb__del" data-action="del-gallery" data-ri="${t}" data-gallery-name="${m(l)}" aria-label="この画像を外す">×</button>
        </span>`}).join(""),e.hidden=s.length===0},dt=t=>{const e=a=>{if(Array.isArray(a))return a.map(e);if(a!==null&&typeof a=="object"){const s=a,l={};for(const i of Object.keys(s).sort())l[i]=e(s[i]);return l}return a};return JSON.stringify(e(t))},K=t=>{const{sortOrder:e,thumbnail:a,gallery:s,...l}=t;return dt({...l,thumbnail:{src:a.src},gallery:(s??[]).map(i=>i.src)})},W=()=>{_=new Map(n.map(t=>[t.id,{content:K(t),title:t.title}])),T=n.map(t=>t.id).join(",")},z=()=>{q();const t=[],e=new Set(n.map(s=>s.id));return n.forEach(s=>{const l=_.get(s.id);l?l.content!==K(s)&&t.push(`【修正】${s.title||"（無題）"}`):t.push(`【新規作成】${s.title||"（無題）"}`)}),_.forEach((s,l)=>{e.has(l)||t.push(`【削除】${s.title||l}`)}),e.size===_.size&&[...e].every(s=>_.has(s))&&n.map(s=>s.id).join(",")!==T&&t.push("【並び替え】"),t},Y=()=>{const t=z();if(t.length===0){c("","");return}c(`未保存の内容があります。
`+t.join(`
`),"warn")},rt=t=>{const e={...t};return delete e.tags,{...e,title:e.title??"",body:e.body??"",thumbnail:{src:e.thumbnail?.src||V,alt:e.thumbnail?.alt??""},isPublished:e.isPublished??!1}},ot=(t,e)=>{t.id=b(d(e,"id")),t.title=b(d(e,"title"));const a=b(d(e,"coupleName"));t.coupleName=a===""?void 0:a;const s=b(d(e,"weddingDate"));t.weddingDate=s===""?void 0:s,t.guestCount=U(b(d(e,"guestCount"))),t.body=G(d(e,"body")).trim(),t.thumbnail={src:lt(e)||V,alt:t.title};const l=it(G(d(e,"gallery")),t.title);t.gallery=l.length?l:void 0;const i=w.map(L=>L.id).filter(L=>tt(d(e,"tagIds")+`[data-tag-id="${L}"]`));t.tagIds=i.length?i:void 0,t.isPublished=b(d(e,"isPublished"))==="published";const g=b(d(e,"publishedAt"));t.publishedAt=g===""?void 0:g,t.sortOrder=U(b(d(e,"sortOrder")))},q=()=>{if(u!=="edit"||o<0)return;const t=n[o];t&&ot(t,o)},ct=(t,e)=>{p(d(e,"id"),t.id),p(d(e,"title"),t.title),p(d(e,"coupleName"),t.coupleName??""),p(d(e,"weddingDate"),t.weddingDate??""),p(d(e,"guestCount"),t.guestCount===void 0?"":String(t.guestCount)),p(d(e,"body"),t.body),B(e,t.thumbnail.src),p(d(e,"gallery"),nt(t.gallery)),N(e);const a=new Set(t.tagIds??[]);w.forEach(s=>{et(d(e,"tagIds")+`[data-tag-id="${s.id}"]`,a.has(s.id))}),p(d(e,"isPublished"),t.isPublished?"published":"hidden"),p(d(e,"publishedAt"),t.publishedAt??""),p(d(e,"sortOrder"),t.sortOrder===void 0?"":String(t.sortOrder))},ut=t=>{const e=n[t];e&&ct(e,t)},pt=(t,e)=>`
      <section class="adm-card">
        <div class="adm-card__head">
          <h2>No. ${e+1}</h2>
          <label class="adm-title"><span class="adm-title__title">タイトル</span>
            <input type="text" data-ri="${e}" data-field="title" />
          </label>
          <label class="adm-pub"><span class="adm-pub__title">公開状態</span>
            <select data-ri="${e}" data-field="isPublished">
              <option value="hidden">非表示</option>
              <option value="published">表示</option>
            </select>
          </label>
        </div>

        <label class="adm-id"><span class="adm-id__title">ID（自動発番・編集不可）</span>
          <input type="text" data-ri="${e}" data-field="id" readonly />
        </label>

        <div class="adm-card__body">
          <div class="adm-row">
            <div class="adm-card__first">
              <label class="adm-field">
                <span class="adm-field-title">カップル名（任意・イニシャル等）</span>
                <input type="text" data-ri="${e}" data-field="coupleName" placeholder="K & A" />
              </label>
              <label class="adm-field">
                <span class="adm-field-title">挙式日（任意）</span>
                <input type="date" data-ri="${e}" data-field="weddingDate" />
              </label>
              <label class="adm-field adm-field--narrow">
                <span class="adm-field-title">招待人数（任意）</span>
                <input type="number" data-ri="${e}" data-field="guestCount" />
              </label>
              <label class="adm-field adm-field--narrow">
                <span class="adm-field-title">タグ（「タグ／カテゴリー管理」のマスターから選択・複数可）</span>
                <div class="adm-radios">
                ${w.length?w.map(a=>`
                <label class="adm-radio"><input type="checkbox" data-ri="${e}" data-field="tagIds" data-tag-id="${a.id}" /> ${a.label}</label>`).join(""):'<p class="adm-hint">選択肢がまだありません。「タグ／カテゴリー管理」タブの「レポートのタグ」で追加してください。</p>'}
                </div>
              </label>
            </div>
            <div class="adm-card__second">
              <label class="adm-field">
                <span class="adm-field-title">サムネイル画像</span>
                <div class="adm-thumb">
                  <img class="adm-thumb__preview" data-ri="${e}" data-thumb-preview alt="" hidden />
                  <input type="text" data-ri="${e}" data-field="thumbnailSrc" readonly placeholder="（「画像を選ぶ」から選択）" />
                  <button type="button" class="adm-btn adm-btn--mini" data-action="pick-thumb" data-ri="${e}">画像を選ぶ</button>
                </div>
              </label>
            </div>
          </div>
          <label class="adm-field">
            <span class="adm-field-title">本文（改行はそのまま表示されます）</span>
            <textarea rows="6" data-ri="${e}" data-field="body"></textarea>
          </label>
          <span class="adm-field-title">ギャラリー画像（1行に1枚／任意）</span>
          <label class="adm-field">
            
            <textarea rows="4" data-ri="${e}" data-field="gallery" placeholder="sample-report-01-01.jpg&#10;sample-report-01-02.jpg" hidden></textarea>
            </label>
            <!-- ギャラリーに入っている画像のサムネ一覧（テキストエリアの内容から自動生成・表示専用） -->
            <div class="adm-gallery-preview" data-ri="${e}" data-gallery-preview hidden></div>
            <p class="adm-hint">「＋ ギャラリーに画像を追加」から選べます。各サムネイルの × で外せます。代替テキスト(alt)はタイトルから自動で付きます。</p>
          <button type="button" class="adm-btn adm-btn--mini" data-action="add-gallery" data-ri="${e}">＋ ギャラリーに画像を追加</button>

          <div class="adm-row">
            <label class="adm-field">
              <span class="adm-field-title">公開日（任意・推奨）</span>
              <input type="date" data-ri="${e}" data-field="publishedAt" />
            </label>
          </div>
          <!-- 表示順は「並べ替え」で管理するので画面には出さない。
               ただし値の往復（populate→harvest）に input は必要なので hidden で残す。 -->
          <input type="hidden" data-ri="${e}" data-field="sortOrder" />

          <button type="button" class="adm-btn adm-btn--danger" data-action="del-report" data-ri="${e}">レポート削除</button>
        </div>
      </section>`,mt=(t,e)=>!t||t.length===0?[]:t.map(a=>e.find(s=>s.id===a)?.label).filter(a=>!!a),ft=(t,e)=>{const a=R(t.thumbnail.src),s=t.publishedAt||"未設定",l=t.coupleName||"未設定",i=mt(t.tagIds,w).join("、")||"未設定";return`
      <li class="fair-list__row">
        <button type="button" class="fair-list__btn" data-action="edit-report" data-ri="${e}">
          <span class="fair-list__thumb">
            <img src="${m(a)}" alt="${m(t.title)}" loading="lazy" />
          </span>
          <span class="fair-list__main">
            <span class="fair-list__titlerow">
              <span class="fair-list__no">No. ${e+1}</span>
              <span class="fair-list__title">${m(t.title)||"（無題）"}</span>
              <span class="fair-list__badge ${t.isPublished?"is-pub":"is-unpub"}">${t.isPublished?"表示":"非表示"}</span>
            </span>
            <span class="fair-list__meta"><span class="fair-list__key">公開日</span>${m(s)}</span>
            <span class="fair-list__meta"><span class="fair-list__key">カップル名</span>${m(l)}</span>
            <span class="fair-list__meta"><span class="fair-list__key">タグ</span>${m(i)}</span>
          </span>
        </button>
      </li>`},bt=(t,e)=>`
      <li class="fair-reorder__item" data-reorder-index="${e}">
        <span class="fair-reorder__handle" aria-hidden="true">≡</span>
        <span class="fair-reorder__no">No. ${e+1}</span>
        <span class="fair-reorder__title">${m(t.title)||"（無題）"}</span>
      </li>`,ht=()=>{if(v)return`
        <div class="fair-list">
          <div class="fair-list__bar">
            <button type="button" class="adm-btn" data-action="toggle-reorder">並べ替えを終了</button>
            <span class="adm-hint">≡ をドラッグして表示順を入れ替え。終わったら「Firestore に保存」で確定します。</span>
          </div>
          <ul class="fair-reorder__list" id="report-reorder-list">${n.map((s,l)=>bt(s,l)).join("")}</ul>
        </div>`;const t=n.map((a,s)=>ft(a,s)).join(""),e=n.length===0?'<p class="adm-hint">レポートがありません。「＋ 新規レポートを追加」から作成してください。</p>':"";return`
      <div class="fair-list">
        <div class="fair-list__bar">
          <button type="button" class="adm-btn" data-action="toggle-reorder">並べ替える</button>
        </div>
        <ul class="fair-list__items">${t}</ul>
        ${e}
      </div>`},gt=t=>`
      <div class="fair-edit">
        <div class="fair-edit__bar">
          <button type="button" class="adm-btn" data-action="back-to-list">← 一覧に戻る</button>
        </div>
        ${pt(n[t],t)}
      </div>`,yt=()=>{const t=r.querySelector("#report-reorder-list");t&&(O?.destroy(),O=Dt.create(t,{handle:".fair-reorder__handle",animation:150,onEnd:e=>{const a=e.oldIndex,s=e.newIndex;if(a===void 0||s===void 0||a===s)return;const l=n.splice(a,1)[0];l&&(n.splice(s,0,l),n.forEach((i,g)=>{i.sortOrder=g}),h())}}))},h=()=>{O?.destroy(),O=null,u==="edit"&&o>=0&&n[o]?(r.innerHTML=gt(o),ut(o)):(u="list",o=-1,r.innerHTML=ht(),v&&yt()),C.hidden=u==="edit";const t=document.querySelector("#report-count");t&&(t.textContent=St(n))},vt=()=>({id:kt("r"),title:"",body:"",thumbnail:{src:V,alt:""},isPublished:!1}),$t=()=>{const t=[],e=new Set;return n.forEach((a,s)=>{const l=`No.${s+1}${a.title?`「${a.title}」`:"（無題）"}`;a.id===""?t.push(`${l}: ID が空です`):e.has(a.id)&&t.push(`${l}: ID「${a.id}」が重複しています`),e.add(a.id),a.title===""&&t.push(`${l}: タイトルが空です`),a.body===""&&t.push(`${l}: 本文が空です`),a.thumbnail.src===""&&t.push(`${l}: サムネイル画像が未選択です`)}),t},S=document.querySelector("#report-picker"),k=document.querySelector("#report-picker-grid"),D=document.querySelector("#report-picker-foot"),P=document.querySelector("#report-picker-confirm");let $=-1,H="thumb",f=new Set;const Q=()=>{P&&(P.textContent=`選択した画像を追加（${f.size}）`)},X=document.querySelector("#report-image-list"),_t=X?JSON.parse(X.textContent??"[]"):[];k&&(k.innerHTML=_t.map(t=>`
        <button type="button" class="adm-picker__item" data-pick-value="${t.value}">
          <img src="${t.url}" alt="" loading="lazy" />
          <span class="adm-picker__name">${t.value.split("/").pop()??""}</span>
        </button>`).join(""));const Z=(t,e)=>{if(S){if($=t,H=e,f=new Set,k?.querySelectorAll(".is-selected").forEach(a=>a.classList.remove("is-selected")),e==="gallery"){const a=r.querySelector(d(t,"gallery")),s=new Set((a?.value??"").split(`
`).map(l=>l.trim()).filter(l=>l!==""));k?.querySelectorAll("button[data-pick-value]").forEach(l=>{const i=l.dataset.pickValue??"";s.has(x(i))&&(f.add(i),l.classList.add("is-selected"))})}D&&(D.hidden=e!=="gallery"),Q(),S.hidden=!1}},I=()=>{S&&(S.hidden=!0,$=-1,H="thumb",f=new Set,D&&(D.hidden=!0))};k&&k.addEventListener("click",t=>{const e=t.target;if(!(e instanceof Element))return;const a=e.closest("button[data-pick-value]");if(!a||$<0)return;const s=a.dataset.pickValue??"";if(H==="gallery"){f.has(s)?(f.delete(s),a.classList.remove("is-selected")):(f.add(s),a.classList.add("is-selected")),Q();return}B($,s),I()}),S&&S.addEventListener("click",t=>{const e=t.target;e instanceof Element&&e.closest("[data-picker-close]")&&I()}),P&&P.addEventListener("click",()=>{if($<0||f.size===0){I();return}const t=r.querySelector(d($,"gallery"));if(t){const e=t.value.split(`
`).map(s=>s.trim()).filter(s=>s!==""),a=[...f].map(s=>x(s)).filter(s=>!e.includes(s));t.value=[...e,...a].join(`
`),N($)}I()});const F=window;F.adminDirtyReporters=F.adminDirtyReporters??{},F.adminDirtyReporters.report=z,window.addEventListener("beforeunload",t=>{z().length!==0&&t.preventDefault()}),r.addEventListener("click",t=>{const e=t.target;if(!(e instanceof Element))return;const a=e.closest("button[data-action]");if(!a)return;const s=a.dataset.action??"",l=a.dataset.ri!==void 0?Number(a.dataset.ri):-1;if(s==="pick-thumb"){Z(l,"thumb");return}if(s==="add-gallery"){Z(l,"gallery");return}if(s==="del-gallery"){const i=a.dataset.galleryName??"",g=r.querySelector(d(l,"gallery"));if(g&&i){const L=g.value.split(`
`).map(j=>j.trim()).filter(j=>j!==""&&j!==i);g.value=L.join(`
`),N(l)}return}if(s==="edit-report"){l>=0&&(u="edit",o=l,h());return}if(s==="back-to-list"){q(),u="list",o=-1,h(),Y();return}if(s==="toggle-reorder"){v=!v,h(),v?c("並べ替えモードです。≡ をドラッグしてください。",""):Y();return}q(),s==="del-report"&&l>=0&&window.confirm("このレポートを削除します。よろしいですか？")&&(n.splice(l,1),u="list",o=-1),h()}),r.addEventListener("input",t=>{const e=t.target;if(e instanceof HTMLTextAreaElement&&e.dataset.field==="gallery"){const a=e.dataset.ri!==void 0?Number(e.dataset.ri):-1;a>=0&&N(a)}}),C.addEventListener("click",()=>{q(),n.push(vt()),u="edit",o=n.length-1,h()}),y.addEventListener("click",async()=>{q();const t=$t();if(t.length>0&&!window.confirm(`入力に確認ポイントがあります。それでも保存しますか？

`+t.join(`
`))){c("保存を中止しました。","warn");return}const e=n.filter(i=>E.has(i.id)&&E.get(i.id)!==i.isPublished).map(i=>`${i.title||i.id}: ${i.isPublished?"非表示 → 表示":"表示 → 非表示"}`);if(e.length>0&&!window.confirm(`公開状態が変わるレポートがあります。保存してよいですか？

`+e.join(`
`))){c("保存を中止しました。","warn");return}const a=new Set(n.map(i=>i.id)),s=[...M].filter(i=>!a.has(i));if(s.length>0&&!window.confirm(`次の ${s.length} 件を Firestore から削除します（元に戻せません）:
`+s.join(`
`))){c("保存を中止しました。","warn");return}y.disabled=!0;const l=y.textContent??"";y.textContent="保存中…",c("Firestore に保存しています…","");try{for(const i of s)await Et(i);for(const i of n)await qt(i);M=new Set(a),E=new Map(n.map(i=>[i.id,i.isPublished])),W(),c(`保存しました（更新 ${n.length} 件 / 削除 ${s.length} 件）。`,"ok")}catch(i){console.error("保存失敗:",i),c("保存に失敗しました（ログイン状態・通信・ルールを確認してください）。","warn")}finally{y.disabled=!1,y.textContent=l}});const wt=async()=>{c("読み込み中…","");try{const[t,e]=await Promise.all([Lt(),Ot()]);w=e.filter(a=>a.group==="report-tags"&&a.isPublished).sort((a,s)=>(a.sortOrder??0)-(s.sortOrder??0)),n=t.map(rt),M=new Set(n.map(a=>a.id)),E=new Map(n.map(a=>[a.id,a.isPublished])),W(),u="list",o=-1,v=!1,h(),c("","")}catch(t){console.error("読み込み失敗:",t),c("読み込みに失敗しました（ログイン状態・通信を確認してください）。","warn")}};xt(Nt,t=>{t?wt():(n=[],u="list",o=-1,v=!1,E=new Map,_=new Map,T="",h())})};Pt();
