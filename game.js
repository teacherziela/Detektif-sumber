const objects = [
  {id:"coin",name:"syiling lama",type:"first",x:25,y:76,why:"Syiling lama ialah bahan asal yang wujud pada zaman yang dikaji."},
  {id:"pottery",name:"tembikar/artifak",type:"first",x:47,y:74,why:"Artifak ialah tinggalan asal manusia pada masa lalu."},
  {id:"manuscript",name:"manuskrip asal",type:"first",x:39,y:65,why:"Manuskrip asal merupakan dokumen yang datang daripada zaman berkenaan."},
  {id:"inscription",name:"batu bersurat",type:"first",x:72,y:72,why:"Batu bersurat ialah bukti asal yang mengandungi catatan daripada masa lalu."},
  {id:"oldphoto",name:"foto asal",type:"first",x:76,y:28,why:"Foto asal yang dirakam pada waktu kejadian ialah sumber pertama."},
  {id:"textbook",name:"buku teks sejarah",type:"second",x:56,y:67,why:"Buku teks disusun kemudian berdasarkan kajian dan pelbagai sumber."},
  {id:"encyclopedia",name:"ensiklopedia",type:"second",x:18,y:55,why:"Ensiklopedia menghimpunkan maklumat yang telah dikaji dan ditulis semula."},
  {id:"article",name:"artikel kajian",type:"second",x:83,y:65,why:"Artikel kajian ialah hasil penyelidikan dan tafsiran penulis."},
  {id:"documentary",name:"dokumentari sejarah",type:"second",x:66,y:31,why:"Dokumentari sejarah dihasilkan kemudian berdasarkan kajian dan sumber lain."},
  {id:"historybook",name:"buku sejarah moden",type:"second",x:32,y:62,why:"Buku sejarah moden ialah penulisan kemudian yang mentafsir sumber asal."},

  // Distractors: deliberately tempting, but not answers for the source-classification missions.
  {id:"plant",name:"pokok hiasan",type:"distractor",x:89,y:39,why:"Ini hanya hiasan muzium, bukan bahan sumber bagi misi ini."},
  {id:"lamp",name:"lampu galeri",type:"distractor",x:54,y:19,why:"Lampu galeri bukan sumber sejarah bagi misi ini."},
  {id:"chair",name:"kerusi moden",type:"distractor",x:86,y:78,why:"Kerusi moden ini ialah barang pengalih perhatian."},
  {id:"frame",name:"bingkai hiasan",type:"distractor",x:12,y:29,why:"Bingkai hiasan ini bukan bahan sumber yang diminta."},
  {id:"vase",name:"pasu hiasan moden",type:"distractor",x:91,y:68,why:"Jangan tertipu—ini pasu hiasan moden."}
];

const missions = [
  {type:"first",text:"Cari satu SUMBER PERTAMA — bahan asal daripada zaman yang dikaji."},
  {type:"second",text:"Sekarang cari satu SUMBER KEDUA — bahan yang dihasilkan berdasarkan kajian sumber asal."},
  {type:"first",text:"Profesor perlukan bukti asal. Cari satu lagi SUMBER PERTAMA."},
  {type:"second",text:"Cari bahan yang mengandungi tafsiran atau penulisan kemudian: SUMBER KEDUA."},
  {type:"first",text:"Cari tinggalan atau rekod asal yang boleh menjadi SUMBER PERTAMA."},
  {type:"second",text:"Cari satu hasil penyelidikan moden: SUMBER KEDUA."},
  {type:"first",text:"Misi semakin sukar! Cari satu lagi bukti asal, iaitu SUMBER PERTAMA."},
  {type:"second",text:"Jangan tertipu dengan barang hiasan. Cari SUMBER KEDUA."},
  {type:"first",text:"Misi 9: cari SUMBER PERTAMA yang masih belum kamu temui."},
  {type:"second",text:"Misi terakhir! Cari SUMBER KEDUA yang masih belum ditemui."}
];

let score=0,lives=3,step=0,toastTimer;
const used=new Set();
const $=s=>document.querySelector(s);
const hotspots=$("#hotspots");

objects.forEach(o=>{
  const b=document.createElement("button");
  b.type="button"; b.className="hotspot"; b.dataset.id=o.id;
  b.style.left=o.x+"%"; b.style.top=o.y+"%";
  b.setAttribute("aria-label",o.name);
  b.title="";
  b.addEventListener("click",()=>choose(o,b));
  hotspots.appendChild(b);
});

function current(){return missions[step]}
function render(){
  $("#score").textContent=score;
  $("#lives").textContent=lives;
  $("#progress").textContent=step;
  if(step<missions.length) $("#missionText").innerHTML=`<b>Misi ${step+1}:</b> ${current().text}`;
}
function showToast(msg,kind=""){
  const t=$("#toast"); clearTimeout(toastTimer);
  t.className="toast show "+kind; t.innerHTML=msg;
  toastTimer=setTimeout(()=>t.className="toast",2600);
}
function choose(o,b){
  if(step>=missions.length||lives<=0)return;
  document.querySelectorAll(".hotspot").forEach(x=>x.classList.remove("hint"));
  if(o.type===current().type && !used.has(o.id)){
    score+=10; used.add(o.id); b.classList.add("found");
    showToast(`✅ BETUL! +10 — <b>${o.name}</b><br>${o.why}`,"good");
    step++;
    if(step===missions.length){render();setTimeout(()=>finish(true),900)} else render();
  }else{
    score=Math.max(0,score-5); lives--;
    showToast(`❌ SALAH! −5 — <b>${o.name}</b><br>${o.why}`,"bad");
    render();
    if(lives<=0)setTimeout(()=>finish(false),900);
  }
}
function hint(){
  if(step>=missions.length||lives<=0)return;
  const candidates=objects.filter(o=>o.type===current().type&&!used.has(o.id));
  if(!candidates.length)return;
  const o=candidates[Math.floor(Math.random()*candidates.length)];
  const b=document.querySelector(`[data-id="${o.id}"]`);
  b.classList.add("hint");
  showToast("💡 Perhatikan objek yang berkilau. Hint tidak menolak markah.");
  setTimeout(()=>b.classList.remove("hint"),1800);
}
function finish(win){
  $("#endTitle").textContent=win?"🏆 Misi Selesai!":"💥 Nyawa Habis";
  $("#endText").innerHTML=win
    ?`Syabas, Detektif! Skor akhir kamu <b>${score}</b>. Kamu telah berlatih membezakan sumber pertama dan sumber kedua.`
    :`Skor kamu <b>${score}</b>. Ingat: bahan asal = sumber pertama; hasil kajian/tafsiran = sumber kedua. Cuba lagi!`;
  $("#endModal").classList.remove("hidden");
}
function restart(){
  score=0;lives=3;step=0;used.clear();
  document.querySelectorAll(".hotspot").forEach(b=>b.classList.remove("found","hint"));
  $("#endModal").classList.add("hidden"); render();
  showToast("🔎 Misi dimulakan semula. Jangan tekan semua barang ya! 😆");
}
$("#hintBtn").addEventListener("click",hint);
$("#restartBtn").addEventListener("click",restart);
$("#playAgain").addEventListener("click",restart);
render();
