const d=n=>n.split(`
`).map(t=>t.trim()).filter(t=>t.length>0),g=n=>(n??[]).join(`
`);function h(n){const t=n.filter(e=>e.isPublished===!0).length,s=n.length-t;return`（公開：${t}件／非公開：${s}件）`}function $(n){const t=new Date,s=u=>String(u).padStart(2,"0"),e=t.getFullYear(),o=s(t.getMonth()+1),c=s(t.getDate()),r=s(t.getHours()),a=s(t.getMinutes()),i=s(t.getSeconds()),l=Math.random().toString(36).slice(2,4).padEnd(2,"0");return`${n}-${e}${o}${c}-${r}${a}${i}-${l}`}export{g as a,h as c,d as l,$ as m};
