
const TOTAL_LESSONS = 30;
let lessonUnlocked = 1;
try{
  const saved = localStorage.getItem('hsk1_progress');
  if(saved){ const n = parseInt(saved, 10); if(n >= 1) lessonUnlocked = n; }
}catch(e){}
function saveProgress(){
  try{ localStorage.setItem('hsk1_progress', String(lessonUnlocked)); }catch(e){}
}

/* ---------- Audио: TTS ---------- */
let zhVoice = null;
function loadVoices(){
  const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  zhVoice = voices.find(v => v.lang === 'zh-CN') || voices.find(v => v.lang && v.lang.startsWith('zh')) || null;
}
if(window.speechSynthesis){
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}
function speak(text){
  if(!window.speechSynthesis){
    alert('Браузери шумо садоро дастгирӣ намекунад. Chrome ё Edge-ро истифода баред.');
    return;
  }
  const btn = window.event ? window.event.currentTarget : null;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'zh-CN';
  if(zhVoice) u.voice = zhVoice;
  u.rate = 0.85;
  if(btn){
    document.querySelectorAll('.playbtn.playing').forEach(b=>b.classList.remove('playing'));
    u.onstart = () => btn.classList.add('playing');
    u.onend = () => btn.classList.remove('playing');
    u.onerror = () => btn.classList.remove('playing');
  }
  window.speechSynthesis.speak(u);
}

/* ---------- Audио: садоҳои шахсии шумо (аз файл) ----------
   Барои ҳар як пиньин метавонед файли mp3-и худро гузоред.
   Файлро дар папкаи "audio/" (дар паҳлӯи ин HTML) бо ҳамин ном гузоред —
   система худ онро истифода мебарад; агар файл набошад, овози
   автоматии браузер (TTS) кор мекунад. */
const audioMap = {
  ni3:   'audio/ni3.mp3',
  hao3:  'audio/hao3.mp3',
  nin2:  'audio/nin2.mp3',
  men0:  'audio/men0.mp3',
  dui4:  'audio/dui4.mp3',
  bu0:   'audio/bu0.mp3',
  qi3:   'audio/qi3.mp3',
  mei2:  'audio/mei2.mp3',
  guan1: 'audio/guan1.mp3',
  xi0:   'audio/xi0.mp3',
  ma1: 'audio/ma1.mp3', ma2: 'audio/ma2.mp3', ma3: 'audio/ma3.mp3', ma4: 'audio/ma4.mp3',
  nihao: 'audio/nihao.mp3', ninhao: 'audio/ninhao.mp3', nimenhao: 'audio/nimenhao.mp3',
  nimen: 'audio/nimen.mp3', duibuqi: 'audio/duibuqi.mp3', meiguanxi: 'audio/meiguanxi.mp3',
  drill_nihao: 'audio/drill_nihao.mp3', drill_keyi: 'audio/drill_keyi.mp3', drill_fudao: 'audio/drill_fudao.mp3',
  drill_xiaojie: 'audio/drill_xiaojie.mp3', drill_kouyu: 'audio/drill_kouyu.mp3', drill_yufa: 'audio/drill_yufa.mp3',
  drill_taohao: 'audio/drill_taohao.mp3', drill_liaojie: 'audio/drill_liaojie.mp3',
  shangke: 'audio/shangke.mp3', xiake: 'audio/xiake.mp3', xianzaixiuxi: 'audio/xianzaixiuxi.mp3',
  kanheiban: 'audio/kanheiban.mp3', genwodu: 'audio/genwodu.mp3',
  s_heng: 'audio/s_heng.mp3', s_shu: 'audio/s_shu.mp3', s_pie: 'audio/s_pie.mp3',
  s_dian: 'audio/s_dian.mp3', s_na: 'audio/s_na.mp3',
  num_yi: 'audio/num_yi.mp3', num_er: 'audio/num_er.mp3', num_san: 'audio/num_san.mp3',
  num_shi: 'audio/num_shi.mp3', num_ba: 'audio/num_ba.mp3', num_liu: 'audio/num_liu.mp3',
  xie4: 'audio/xie4.mp3', xie0: 'audio/xie0.mp3', bu4: 'audio/bu4.mp3', bu2: 'audio/bu2.mp3',
  ke4: 'audio/ke4.mp3', qi0: 'audio/qi0.mp3', zai4: 'audio/zai4.mp3', jian4: 'audio/jian4.mp3',
  xiexie: 'audio/xiexie.mp3', buxie: 'audio/buxie.mp3', xiexieni: 'audio/xiexieni.mp3',
  bukeqi: 'audio/bukeqi.mp3', zaijian: 'audio/zaijian.mp3',
  l2_mama: 'audio/l2_mama.mp3', l2_yeye: 'audio/l2_yeye.mp3', l2_nainai: 'audio/l2_nainai.mp3', l2_baba: 'audio/l2_baba.mp3',
  l2_drill_zhuozi: 'audio/l2_drill_zhuozi.mp3', l2_drill_fangzi: 'audio/l2_drill_fangzi.mp3',
  l2_drill_women: 'audio/l2_drill_women.mp3', l2_drill_didi: 'audio/l2_drill_didi.mp3',
  l2_drill_xihuan: 'audio/l2_drill_xihuan.mp3', l2_drill_rensi: 'audio/l2_drill_rensi.mp3',
  l2_drill_xiansheng: 'audio/l2_drill_xiansheng.mp3', l2_drill_pengyou: 'audio/l2_drill_pengyou.mp3',
  l2_dakaishu: 'audio/l2_dakaishu.mp3', l2_qingdashengdu: 'audio/l2_qingdashengdu.mp3',
  l2_zaiduyibian: 'audio/l2_zaiduyibian.mp3', l2_yiqidu: 'audio/l2_yiqidu.mp3', l2_youwentima: 'audio/l2_youwentima.mp3',
  s_hengzhe: 'audio/s_hengzhe.mp3', s_shuzhe: 'audio/s_shuzhe.mp3', s_shugou: 'audio/s_shugou.mp3',
  sc_kou: 'audio/sc_kou.mp3', sc_jian: 'audio/sc_jian.mp3', sc_shan: 'audio/sc_shan.mp3', sc_xiao: 'audio/sc_xiao.mp3', sc_bu: 'audio/sc_bu.mp3',
  jiao4: 'audio/jiao4.mp3', shenme: 'audio/shenme.mp3', mingzi: 'audio/mingzi.mp3', wo3: 'audio/wo3.mp3',
  shi4: 'audio/shi4.mp3', laoshi: 'audio/laoshi.mp3', ma_q: 'audio/ma_q.mp3', xuesheng: 'audio/xuesheng.mp3',
  ren2: 'audio/ren2.mp3', zhongguo: 'audio/zhongguo.mp3', meiguo: 'audio/meiguo.mp3',
  zhongguoren: 'audio/zhongguoren.mp3', meiguoren: 'audio/meiguoren.mp3', liyue: 'audio/liyue.mp3',
  l3_q1: 'audio/l3_q1.mp3', l3_a1: 'audio/l3_a1.mp3', l3_q2: 'audio/l3_q2.mp3', l3_a2: 'audio/l3_a2.mp3',
  l3_q3: 'audio/l3_q3.mp3', l3_a3: 'audio/l3_a3.mp3',
  l3_drill_xiuxi: 'audio/l3_drill_xiuxi.mp3', l3_drill_jiaqi: 'audio/l3_drill_jiaqi.mp3',
  l3_drill_xingqi: 'audio/l3_drill_xingqi.mp3', l3_drill_xingqu: 'audio/l3_drill_xingqu.mp3',
  l3_drill_zaoshang: 'audio/l3_drill_zaoshang.mp3', l3_drill_caochang: 'audio/l3_drill_caochang.mp3',
  l3_drill_hanzi: 'audio/l3_drill_hanzi.mp3', l3_drill_zuotian: 'audio/l3_drill_zuotian.mp3',
  s_hengzhegou: 'audio/s_hengzhegou.mp3', s_wogou: 'audio/s_wogou.mp3',
  sc_yue: 'audio/sc_yue.mp3', sc_xin: 'audio/sc_xin.mp3', sc_zhong: 'audio/sc_zhong.mp3',
  ta1: 'audio/ta1.mp3', shei2: 'audio/shei2.mp3', de5: 'audio/de5.mp3', hanyu: 'audio/hanyu.mp3',
  na3: 'audio/na3.mp3', guo2: 'audio/guo2.mp3', ne5: 'audio/ne5.mp3', ta1m: 'audio/ta1m.mp3',
  tongxue: 'audio/tongxue.mp3', pengyou: 'audio/pengyou.mp3',
  l4_q1: 'audio/l4_q1.mp3', l4_a1: 'audio/l4_a1.mp3', l4_q2: 'audio/l4_q2.mp3', l4_a2: 'audio/l4_a2.mp3',
  l4_a2b: 'audio/l4_a2b.mp3', l4_q3: 'audio/l4_q3.mp3', l4_a3: 'audio/l4_a3.mp3', l4_q3b: 'audio/l4_q3b.mp3', l4_a3b: 'audio/l4_a3b.mp3',
  l4_drill_zhishi: 'audio/l4_drill_zhishi.mp3', l4_drill_renshi: 'audio/l4_drill_renshi.mp3',
  l4_drill_shengri: 'audio/l4_drill_shengri.mp3', l4_drill_changshi: 'audio/l4_drill_changshi.mp3',
  l4_drill_yizhang: 'audio/l4_drill_yizhang.mp3', l4_drill_yiding: 'audio/l4_drill_yiding.mp3',
  l4_drill_diyi: 'audio/l4_drill_diyi.mp3', l4_drill_shiyi: 'audio/l4_drill_shiyi.mp3',
  s_shuwangou: 'audio/s_shuwangou.mp3', s_hengzhewangou: 'audio/s_hengzhewangou.mp3',
  sc_qi: 'audio/sc_qi.mp3', sc_er: 'audio/sc_er.mp3', sc_ji: 'audio/sc_ji.mp3', sc_jiu: 'audio/sc_jiu.mp3',
  jia1: 'audio/jia1.mp3', you3: 'audio/you3.mp3', kou3: 'audio/kou3.mp3', nver: 'audio/nver.mp3',
  ji3: 'audio/ji3.mp3', sui4: 'audio/sui4.mp3', le5: 'audio/le5.mp3', jinnian: 'audio/jinnian.mp3',
  duo1: 'audio/duo1.mp3', da4: 'audio/da4.mp3',
  l5_q1: 'audio/l5_q1.mp3', l5_a1: 'audio/l5_a1.mp3', l5_q2: 'audio/l5_q2.mp3', l5_a2: 'audio/l5_a2.mp3',
  l5_q3: 'audio/l5_q3.mp3', l5_a3: 'audio/l5_a3.mp3', l5_q3b: 'audio/l5_q3b.mp3', l5_a3b: 'audio/l5_a3b.mp3',
  l5_drill_xiaohair: 'audio/l5_drill_xiaohair.mp3', l5_drill_xiaoniaor: 'audio/l5_drill_xiaoniaor.mp3',
  l5_drill_fanguanr: 'audio/l5_drill_fanguanr.mp3', l5_drill_xiangshuir: 'audio/l5_drill_xiangshuir.mp3',
  l5_num_shi: 'audio/l5_num_shi.mp3', l5_num_ershi: 'audio/l5_num_ershi.mp3', l5_num_ershisan: 'audio/l5_num_ershisan.mp3',
  l5_num_wushi: 'audio/l5_num_wushi.mp3', l5_num_wushiliu: 'audio/l5_num_wushiliu.mp3', l5_num_jiushijiu: 'audio/l5_num_jiushijiu.mp3',
  s_hengpie: 'audio/s_hengpie.mp3', s_piedian: 'audio/s_piedian.mp3',
  sc_shui: 'audio/sc_shui.mp3', sc_nv: 'audio/sc_nv.mp3', sc_le: 'audio/sc_le.mp3', sc_da: 'audio/sc_da.mp3',
  hui4: 'audio/hui4.mp3', shuo1: 'audio/shuo1.mp3', mama5: 'audio/mama5.mp3', cai4: 'audio/cai4.mp3',
  hen3: 'audio/hen3.mp3', haochi3: 'audio/haochi3.mp3', zuo4: 'audio/zuo4.mp3', xie3: 'audio/xie3.mp3',
  hanzi4: 'audio/hanzi4.mp3', zi4: 'audio/zi4.mp3', zenme3: 'audio/zenme3.mp3', du2: 'audio/du2.mp3',
  l6_q1: 'audio/l6_q1.mp3', l6_a1: 'audio/l6_a1.mp3', l6_q1b: 'audio/l6_q1b.mp3', l6_a1b: 'audio/l6_a1b.mp3',
  l6_q2: 'audio/l6_q2.mp3', l6_a2: 'audio/l6_a2.mp3', l6_q2b: 'audio/l6_q2b.mp3', l6_a2b: 'audio/l6_a2b.mp3',
  l6_q3: 'audio/l6_q3.mp3', l6_a3: 'audio/l6_a3.mp3', l6_q3b: 'audio/l6_q3b.mp3', l6_a3b: 'audio/l6_a3b.mp3',
  l6_drill_kafei: 'audio/l6_drill_kafei.mp3', l6_drill_gongyuan: 'audio/l6_drill_gongyuan.mp3',
  l6_drill_jichang: 'audio/l6_drill_jichang.mp3', l6_drill_chezhan: 'audio/l6_drill_chezhan.mp3',
  l6_drill_jintian: 'audio/l6_drill_jintian.mp3', l6_drill_gongsi: 'audio/l6_drill_gongsi.mp3',
  l6_drill_jidan: 'audio/l6_drill_jidan.mp3', l6_drill_kaishi: 'audio/l6_drill_kaishi.mp3',
  s_piezhe: 'audio/s_piezhe.mp3', s_xiegou: 'audio/s_xiegou.mp3', s_ti: 'audio/s_ti.mp3',
  sc_dong: 'audio/sc_dong.mp3', sc_wo: 'audio/sc_wo.mp3', sc_xi: 'audio/sc_xi.mp3',
  qing3: 'audio/qing3.mp3', wen4: 'audio/wen4.mp3', jintian: 'audio/jintian.mp3', hao4: 'audio/hao4.mp3',
  yue4: 'audio/yue4.mp3', xingqi: 'audio/xingqi.mp3', zuotian: 'audio/zuotian.mp3', mingtian: 'audio/mingtian.mp3',
  qu4: 'audio/qu4.mp3', xuexiao: 'audio/xuexiao.mp3', kan4: 'audio/kan4.mp3', shu1: 'audio/shu1.mp3',
  l7_q1: 'audio/l7_q1.mp3', l7_a1: 'audio/l7_a1.mp3', l7_q1b: 'audio/l7_q1b.mp3', l7_a1b: 'audio/l7_a1b.mp3',
  l7_q2: 'audio/l7_q2.mp3', l7_a2: 'audio/l7_a2.mp3', l7_q2b: 'audio/l7_q2b.mp3', l7_a2b: 'audio/l7_a2b.mp3',
  l7_q3: 'audio/l7_q3.mp3', l7_a3: 'audio/l7_a3.mp3', l7_q3b: 'audio/l7_q3b.mp3', l7_a3b: 'audio/l7_a3b.mp3',
  m01: 'audio/m01.mp3', m02: 'audio/m02.mp3', m03: 'audio/m03.mp3', m04: 'audio/m04.mp3',
  m05: 'audio/m05.mp3', m06: 'audio/m06.mp3', m07: 'audio/m07.mp3', m08: 'audio/m08.mp3',
  m09: 'audio/m09.mp3', m10: 'audio/m10.mp3', m11: 'audio/m11.mp3', m12: 'audio/m12.mp3',
  w1: 'audio/w1.mp3', w2: 'audio/w2.mp3', w3: 'audio/w3.mp3', w4: 'audio/w4.mp3',
  w5: 'audio/w5.mp3', w6: 'audio/w6.mp3', w7: 'audio/w7.mp3',
  l7_drill_guojia: 'audio/l7_drill_guojia.mp3', l7_drill_loufang: 'audio/l7_drill_loufang.mp3',
  l7_drill_pingguo: 'audio/l7_drill_pingguo.mp3', l7_drill_huanjing: 'audio/l7_drill_huanjing.mp3',
  l7_drill_shijian: 'audio/l7_drill_shijian.mp3', l7_drill_yinhang: 'audio/l7_drill_yinhang.mp3',
  l7_drill_cidian: 'audio/l7_drill_cidian.mp3', l7_drill_lanse: 'audio/l7_drill_lanse.mp3',
  sc_si: 'audio/sc_si.mp3', sc_wu5: 'audio/sc_wu5.mp3', sc_shu1: 'audio/sc_shu1.mp3'
};
function playAudio(id, text){
  const btn = window.event ? window.event.currentTarget : null;
  document.querySelectorAll('.playbtn.playing').forEach(b=>b.classList.remove('playing'));
  const src = audioMap[id];
  if(src){
    const a = new Audio(src);
    if(btn) btn.classList.add('playing');
    a.onended = () => { if(btn) btn.classList.remove('playing'); };
    a.onerror = () => { speak(text); };
    a.play().catch(() => { speak(text); });
    return;
  }
  speak(text);
}

/* ---------- Дарахти дарсҳо ---------- */
const path = document.getElementById('path');
function renderPath(){
  path.innerHTML = '';
  for(let i=1;i<=TOTAL_LESSONS;i++){
    const div = document.createElement('div');
    let cls = 'node';
    let icon = '';
    if(i < lessonUnlocked){ cls += ' done'; icon = '<span class="doneicon"><i>✓</i></span>'; }
    else if(i === lessonUnlocked){ cls += ' current'; }
    else { cls += ' locked'; icon = '<span class="lockicon"><i>&#128274;</i></span>'; }
    div.className = cls;
    div.innerHTML = `<div class="n">${i}</div>${icon}`;
    div.onclick = () => openLesson(i);
    path.appendChild(div);
  }
  document.getElementById('progNum').textContent = (lessonUnlocked-1) + '/30';
  document.getElementById('progFill').style.width = ((lessonUnlocked-1)/30*100) + '%';
}

let currentLessonNum = 1;
function openLesson(i){
  const panel = document.getElementById('panel');
  if(i > lessonUnlocked){
    panel.innerHTML = `<div style="text-align:center;padding:30px 0;color:var(--ink-soft);">
      <div style="font-size:28px;margin-bottom:8px;">&#128274;</div>
      Дарси ${i} қулф аст. Аввал тести дарси ${i-1}-ро бо натиҷаи 80% ё бештар гузаред.
    </div>`;
    return;
  }
  currentLessonNum = i;
  if(i === 1){ renderLesson1(); setTimeout(initStrokeWriters, 0); return; }
  if(i === 2){ renderLesson2(); setTimeout(initStrokeWriters, 0); return; }
  if(i === 3){ renderLesson3(); setTimeout(initStrokeWriters, 0); return; }
  if(i === 4){ renderLesson4(); setTimeout(initStrokeWriters, 0); return; }
  if(i === 5){ renderLesson5(); setTimeout(initStrokeWriters, 0); return; }
  if(i === 6){ renderLesson6(); setTimeout(initStrokeWriters, 0); return; }
  if(i === 7){ renderLesson7(); setTimeout(initStrokeWriters, 0); return; }
  panel.innerHTML = `<div style="text-align:center;padding:30px 0;color:var(--ink-soft);">
    Дарси ${i} — мазмун ҳанӯз илова карда нашудааст. Суратҳои дарсро равон кунед, то онро месозем.
  </div>`;
}

function renderLesson1(){
  const panel = document.getElementById('panel');
  panel.innerHTML = `
    <div class="panel-head">
      <div class="idx">01</div>
      <div class="titles">
        <div class="zh">你好</div>
        <div class="py">Nǐ hǎo</div>
        <div class="en">Салом</div>
      </div>
    </div>

    <div class="section-lbl">1. Пиньини дарс ва тарзи пайваст кардан</div>
    <div class="section-sub">Ҳар ҳиҷои хитоӣ аз се қисм иборат аст: <b>сарҳарф (声母)</b> + <b>бунёд (韵母)</b> + <b>оҳанг (声调)</b>. Масалан: nǐ = n (сарҳарф) + i (бунёд) + оҳанги 3.</div>

    <div class="section-sub" style="margin-top:14px;"><b>Тарзи хондани сарҳарфҳо</b> (истифодашуда дар дарс):</div>
    <table class="pytable">
      <tr><th>Ҳарф</th><th>Тарзи хондан</th></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">n</td><td>Мисли "н"-и тоҷикӣ (нон).</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">h</td><td>Мисли "х"-и тоҷикӣ, аз гулӯ (хона).</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">m</td><td>Мисли "м"-и тоҷикӣ (модар).</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">d</td><td>Мисли "д", вале бидуни нафаси қавӣ — байни "д" ва "т", каме мулоимтар аз "д"-и тоҷикӣ.</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">b</td><td>Мисли "б", вале бидуни нафаси қавӣ — байни "б" ва "п".</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">q</td><td>Мисли "ч", вале бо нафаси қавитар ва нӯги забон ба дандонҳои поён такя мекунад — "чҳ"-и тезу нафасдор.</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">g</td><td>Мисли "г", вале бидуни нафаси қавӣ — байни "г" ва "к".</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">x</td><td>Садои мулоими байни "с" ва "ш" — забон наздики дандонҳои пеш, гӯё "сь"-и нарм.</td></tr>
    </table>

    <div class="section-sub" style="margin-top:14px;"><b>Тарзи хондани бунёдҳо</b> (истифодашуда дар дарс):</div>
    <table class="pytable">
      <tr><th>Бунёд</th><th>Тарзи хондан</th></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">i</td><td>Мисли "и"-и тоҷикӣ, кӯтоҳ (масалан дар nǐ).</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">ao</td><td>Дифтонг: "а" сар мешавад, ба "о/у" мегузарад — якҷоя "ао" (масалан дар hǎo).</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">in</td><td>"и" + "н"-и бинӣ дар охир, мисли "ин" (масалан дар nín).</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">en</td><td>Садои "э"-и кӯтоҳ (байни "а" ва "е") + "н"-и бинӣ (масалан дар men).</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">ui (uei)</td><td>Дифтонг "уэй" — тахминан "вэй" (масалан дар duì).</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">u</td><td>Мисли "у"-и тоҷикӣ (масалан дар bu).</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">ei</td><td>Дифтонг "эй", мисли "эй"-и тоҷикӣ (масалан дар méi).</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">uan</td><td>"у" + "а" + "н"-и бинӣ, якҷоя "уан" (масалан дар guān).</td></tr>
    </table>
    <div class="note">Қоидаи пайваст: агар бунёд бо i, u ё ü сар шавад ва сарҳарф надошта бошад, дар навишт ҳарфи "y" ё "w" илова мешавад (масалан ü→yu). Агар ду ҳиҷои оҳанги 3 паси ҳам оянд — якумаш ба оҳанги 2 иваз мешавад (қоидаи пастар).</div>

    <div class="section-sub" style="margin-top:14px;"><b>Пиньини калимаҳои дарси 1</b> — ба ҳар як тугма зада гӯш кунед:</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('ni3','你')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">你</div><div class="py">nǐ<span class="transcript"> [ни]</span></div><div class="tj">оҳанги 3</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('hao3','好')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">好</div><div class="py">hǎo<span class="transcript"> [хао]</span></div><div class="tj">оҳанги 3</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('nin2','您')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">您</div><div class="py">nín<span class="transcript"> [нин]</span></div><div class="tj">оҳанги 2</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('men0','们')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">们</div><div class="py">men<span class="transcript"> [мэн]</span></div><div class="tj">оҳанги нейтралӣ</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('dui4','对')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">对</div><div class="py">duì<span class="transcript"> [дуй]</span></div><div class="tj">оҳанги 4</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('bu0','不')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">不</div><div class="py">bu<span class="transcript"> [бу]</span></div><div class="tj">оҳанги нейтралӣ</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('qi3','起')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">起</div><div class="py">qǐ<span class="transcript"> [ци]</span></div><div class="tj">оҳанги 3</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('mei2','没')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">没</div><div class="py">méi<span class="transcript"> [мэй]</span></div><div class="tj">оҳанги 2</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('guan1','关')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">关</div><div class="py">guān<span class="transcript"> [гуан]</span></div><div class="tj">оҳанги 1</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('xi0','系')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">系</div><div class="py">xi<span class="transcript"> [си]</span></div><div class="tj">оҳанги нейтралӣ</div></div>
    </div>

    <div class="section-lbl">2. Талаффуз — оҳангҳо ва тамрин (声调)</div>
    <div class="tonebox">
      <div class="t"><button class="playbtn" onclick="playAudio('ma1','妈')" aria-label="Гӯш кардан">&#128266;</button><div class="mark">mā 妈</div><div class="transcript">[ма]</div><div class="name">Оҳанги 1 — рост</div></div>
      <div class="t"><button class="playbtn" onclick="playAudio('ma2','麻')" aria-label="Гӯш кардан">&#128266;</button><div class="mark">má 麻</div><div class="transcript">[ма]</div><div class="name">Оҳанги 2 — боло</div></div>
      <div class="t"><button class="playbtn" onclick="playAudio('ma3','马')" aria-label="Гӯш кардан">&#128266;</button><div class="mark">mǎ 马</div><div class="transcript">[ма]</div><div class="name">Оҳанги 3 — фуру-боло</div></div>
      <div class="t"><button class="playbtn" onclick="playAudio('ma4','骂')" aria-label="Гӯш кардан">&#128266;</button><div class="mark">mà 骂</div><div class="transcript">[ма]</div><div class="name">Оҳанги 4 — поён</div></div>
    </div>
    <div class="note">Тағйири оҳанг маънои калимаро тағйир медиҳад — ҳамон ҳиҷо бо оҳанги гуногун калимаи дигар мешавад. Гӯш кунед ва такрор кунед.</div>
    <div class="note"><b>Қоидаи 3+3:</b> вақте ду ҳиҷои оҳанги 3-юм паси ҳам меоянд, якумаш ба оҳанги 2 иваз мешавад: 你 (nǐ) + 好 (hǎo) = <b>ní hǎo</b> (на nǐ hǎo), гарчанде дар навишт оҳанги аслӣ нигоҳ дошта мешавад.</div>

    <div class="section-sub" style="margin-top:14px;"><b>Тамрини оҳанги 3</b> — ин калимаҳо низ ду ҳиҷои оҳанги 3 доранд, хонед ва гӯш кунед:</div>
    <div class="drillgrid">
      <div class="drillcard">nǐhǎo<span class="transcript"><br>[нихао]</span><br><button class="playbtn" onclick="playAudio('drill_nihao','你好')">&#128266;</button></div>
      <div class="drillcard">kěyǐ<span class="transcript"><br>[кэйи]</span><br><button class="playbtn" onclick="playAudio('drill_keyi','可以')">&#128266;</button></div>
      <div class="drillcard">fúdǎo<span class="transcript"><br>[фудао]</span><br><button class="playbtn" onclick="playAudio('drill_fudao','辅导')">&#128266;</button></div>
      <div class="drillcard">xiǎojiě<span class="transcript"><br>[сяоцзе]</span><br><button class="playbtn" onclick="playAudio('drill_xiaojie','小姐')">&#128266;</button></div>
      <div class="drillcard">kǒuyǔ<span class="transcript"><br>[коуюй]</span><br><button class="playbtn" onclick="playAudio('drill_kouyu','口语')">&#128266;</button></div>
      <div class="drillcard">yǔfǎ<span class="transcript"><br>[юйфа]</span><br><button class="playbtn" onclick="playAudio('drill_yufa','语法')">&#128266;</button></div>
      <div class="drillcard">tǎohǎo<span class="transcript"><br>[таохао]</span><br><button class="playbtn" onclick="playAudio('drill_taohao','讨好')">&#128266;</button></div>
      <div class="drillcard">liǎojiě<span class="transcript"><br>[ляоцзе]</span><br><button class="playbtn" onclick="playAudio('drill_liaojie','了解')">&#128266;</button></div>
    </div>

    <div class="section-lbl">3. Калимаҳои нав</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('ni3','你')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">你</div><div class="py">nǐ<span class="transcript"> [ни]</span></div><div class="tj">ту (танҳо ба як нафар)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('hao3','好')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">好</div><div class="py">hǎo<span class="transcript"> [хао]</span></div><div class="tj">хуб, нағз</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('nin2','您')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">您</div><div class="py">nín<span class="transcript"> [нин]</span></div><div class="tj">шумо (бо эҳтиром)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('nimen','你们')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">你们</div><div class="py">nǐmen<span class="transcript"> [нимэн]</span></div><div class="tj">шумоён (бисёр кас)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('duibuqi','对不起')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">对不起</div><div class="py">duìbuqǐ<span class="transcript"> [дуйбуци]</span></div><div class="tj">бубахшед</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('meiguanxi','没关系')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">没关系</div><div class="py">méi guānxi<span class="transcript"> [мэй гуанси]</span></div><div class="tj">ҳечи не, айб надорад</div></div>
    </div>

    <div class="section-lbl">4. Грамматика</div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">1.</span>Ҷонишинҳои шахсӣ: <ruby>你<rt>nǐ</rt></ruby> / <ruby>您<rt>nín</rt></ruby> / <ruby>你们<rt>nǐmen</rt></ruby></div>
      <div class="gbody">Дар хитоӣ барои "ту/шумо" се шакли гуногун вуҷуд дорад, вобаста ба он, ки ба кӣ муроҷиат мешавад:<br>
      · <ruby>你<rt>nǐ</rt></ruby> — ба як нафар, муомилаи оддӣ (дӯст, ҳамсол)<br>
      · <ruby>您<rt>nín</rt></ruby> — ба як нафар, бо эҳтироми хос (калонсол, роҳбар, шахси ношинос)<br>
      · <ruby>你们<rt>nǐmen</rt></ruby> — ба якчанд нафар (қоидаи умумӣ: исм/ҷонишин + <ruby>们<rt>men</rt></ruby> = шакли ҷамъ)</div>
      <div class="gex"><span class="tag">сохт</span><ruby>你<rt>nǐ</rt></ruby> + <ruby>们<rt>men</rt></ruby> → <ruby>你们<rt>nǐmen</rt></ruby></div>
    </div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">2.</span>Ҷумлаи салом: Ҷонишин + <ruby>好<rt>hǎo</rt></ruby></div>
      <div class="gbody">Дар хитоӣ салом додан хеле содда сохта мешавад: ҷонишини шахсро мегиред ва бевосита калимаи <ruby>好<rt>hǎo</rt></ruby>-ро паси он мегузоред. На феъли "будан" лозим аст, на пешоянд.</div>
      <div class="gex"><span class="tag">сохт</span><ruby>你<rt>nǐ</rt></ruby> + <ruby>好<rt>hǎo</rt></ruby> = <ruby>你好<rt>nǐ hǎo</rt></ruby></div>
      <div class="gex"><span class="tag">сохт</span><ruby>您<rt>nín</rt></ruby> + 好 = <ruby>您好<rt>nín hǎo</rt></ruby></div>
      <div class="gex"><span class="tag">сохт</span><ruby>你们<rt>nǐmen</rt></ruby> + 好 = <ruby>你们好<rt>nǐmen hǎo</rt></ruby></div>
    </div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">3.</span>Ҷуфти узрхоҳӣ-ҷавоб: <ruby>对不起<rt>duìbuqǐ</rt></ruby> → <ruby>没关系<rt>méi guānxi</rt></ruby></div>
      <div class="gbody">Ин ду ибора ҳамеша ҷуфт кор мекунанд: якум узр металабад, дуюм ҷавоб медиҳад, ки масъала ҳал шудааст. 没关系 таҳтуллафзӣ маънои "алоқа нест" дорад — яъне "ин муҳим нест".</div>
      <div class="gex"><span class="tag">намуна</span>A: <ruby>对不起<rt>duìbuqǐ</rt></ruby>！ → B: <ruby>没关系<rt>méi guānxi</rt></ruby>！</div>
    </div>

    <div class="section-lbl">5. Ҷумлаҳо</div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">你好！</span><span class="py">Nǐ hǎo!</span><span class="transcript">[Ни хао!]</span><span class="tj">— Салом!</span><button class="playbtn inline" onclick="playAudio('nihao','你好')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">你好！</span><span class="py">Nǐ hǎo!</span><span class="transcript">[Ни хао!]</span><span class="tj">— Салом!</span><button class="playbtn inline" onclick="playAudio('nihao','你好')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">您好！</span><span class="py">Nín hǎo!</span><span class="transcript">[Нин хао!]</span><span class="tj">— Салом! (бо эҳтиром)</span><button class="playbtn inline" onclick="playAudio('ninhao','您好')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">你们好！</span><span class="py">Nǐmen hǎo!</span><span class="transcript">[Нимэн хао!]</span><span class="tj">— Салом ба шумоён!</span><button class="playbtn inline" onclick="playAudio('nimenhao','你们好')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">对不起！</span><span class="py">Duìbuqǐ!</span><span class="transcript">[Дуйбуци!]</span><span class="tj">— Бубахшед!</span><button class="playbtn inline" onclick="playAudio('duibuqi','对不起')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">没关系！</span><span class="py">Méi guānxi!</span><span class="transcript">[Мэй гуанси!]</span><span class="tj">— Ҳечи не!</span><button class="playbtn inline" onclick="playAudio('meiguanxi','没关系')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>

    <div class="section-lbl">6. Ибораҳои синфхона (课堂用语)</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('shangke','上课')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">上课！</div><div class="py">Shàng kè!<span class="transcript"> [Шан кэ!]</span></div><div class="tj">Дарс сар шуд!</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('xiake','下课')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">下课！</div><div class="py">Xià kè!<span class="transcript"> [Ся кэ!]</span></div><div class="tj">Дарс тамом шуд!</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('xianzaixiuxi','现在休息')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">现在休息！</div><div class="py">Xiànzài xiūxi!<span class="transcript"> [Сиенцзай сюси!]</span></div><div class="tj">Ҳозир истироҳат кунед!</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('kanheiban','看黑板')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">看黑板！</div><div class="py">Kàn hēibǎn!<span class="transcript"> [Кань хэйбань!]</span></div><div class="tj">Ба тахта нигоҳ кунед!</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('genwodu','跟我读')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">跟我读！</div><div class="py">Gēn wǒ dú!<span class="transcript"> [Гэнь во ду!]</span></div><div class="tj">Аз паси ман хонед!</div></div>
    </div>

    <div class="section-lbl">7. Тартиби навишти ҳарфҳо — аниматсия ва худтамрин</div>
    <ol class="ruleslist">
      <li><b>Аввал уфуқӣ (一), баъд амудӣ (丨)</b> — 先横后竖</li>
      <li><b>Аввал чапи поёнӣ (丿), баъд рости поёнӣ (捺)</b> — 先撇后捺</li>
      <li><b>Аз боло ба поён</b> — 从上到下</li>
      <li><b>Аз чап ба рост</b> — 从左到右</li>
      <li><b>Аввал беруна, баъд дарун</b> — 先外后内</li>
      <li><b>Аввал миёна, баъд ду тараф</b> (агар бошад) — 先中间后两边</li>
    </ol>
    <div class="section-sub">Аввал тугмаи «Нишон додан»-ро занед, то аниматсияи тартиби дурустро бинед. Баъд тугмаи «Худам нависам»-ро занед ва бо муш (ё ангушт дар мобил) худатон ҳарфро дар болои хатҳои хира кашед — система хатогиро нишон медиҳад.</div>
    <div class="strokegrid" id="strokegrid">
      <div class="strokecard"><div class="shz">你</div><div class="spy">nǐ <span class="transcript">[ни]</span></div><div class="starget" id="sw-ni"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw-ni')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw-ni')">Худам нависам</button></div>
        <div class="sstatus" id="sw-ni-status"></div></div>
      <div class="strokecard"><div class="shz">好</div><div class="spy">hǎo <span class="transcript">[хао]</span></div><div class="starget" id="sw-hao"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw-hao')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw-hao')">Худам нависам</button></div>
        <div class="sstatus" id="sw-hao-status"></div></div>
      <div class="strokecard"><div class="shz">您</div><div class="spy">nín <span class="transcript">[нин]</span></div><div class="starget" id="sw-nin"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw-nin')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw-nin')">Худам нависам</button></div>
        <div class="sstatus" id="sw-nin-status"></div></div>
      <div class="strokecard"><div class="shz">们</div><div class="spy">men <span class="transcript">[мэн]</span></div><div class="starget" id="sw-men"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw-men')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw-men')">Худам нависам</button></div>
        <div class="sstatus" id="sw-men-status"></div></div>
      <div class="strokecard"><div class="shz">对</div><div class="spy">duì <span class="transcript">[дуй]</span></div><div class="starget" id="sw-dui"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw-dui')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw-dui')">Худам нависам</button></div>
        <div class="sstatus" id="sw-dui-status"></div></div>
      <div class="strokecard"><div class="shz">不</div><div class="spy">bù <span class="transcript">[бу]</span></div><div class="starget" id="sw-bu"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw-bu')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw-bu')">Худам нависам</button></div>
        <div class="sstatus" id="sw-bu-status"></div></div>
      <div class="strokecard"><div class="shz">起</div><div class="spy">qǐ <span class="transcript">[ци]</span></div><div class="starget" id="sw-qi"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw-qi')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw-qi')">Худам нависам</button></div>
        <div class="sstatus" id="sw-qi-status"></div></div>
      <div class="strokecard"><div class="shz">没</div><div class="spy">méi <span class="transcript">[мэй]</span></div><div class="starget" id="sw-mei"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw-mei')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw-mei')">Худам нависам</button></div>
        <div class="sstatus" id="sw-mei-status"></div></div>
      <div class="strokecard"><div class="shz">关</div><div class="spy">guān <span class="transcript">[гуан]</span></div><div class="starget" id="sw-guan"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw-guan')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw-guan')">Худам нависам</button></div>
        <div class="sstatus" id="sw-guan-status"></div></div>
      <div class="strokecard"><div class="shz">系</div><div class="spy">xì <span class="transcript">[си]</span></div><div class="starget" id="sw-xi"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw-xi')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw-xi')">Худам нависам</button></div>
        <div class="sstatus" id="sw-xi-status"></div></div>
    </div>

    <div class="section-lbl">8. Аломатҳои асосии навишт (笔画)</div>
    <div class="section-sub"><b>笔画 (bǐhuà)</b> — "харфи қалам" — воҳиди хурдтарини навишти хитоӣ аст: як ҳаракати қалам аз замоне ки коғазро ламс мекунад то ваздте ки аз он ҷудо мешавад (мисли ҳарфи лотинӣ дар калима, вале ин ҷо ҳарф аз чанд харф сохта мешавад). Ҳар ҳарфи хитоӣ аз якчанд харф иборат аст ва тартиби кашидани онҳо муайян ва собит аст — агар тартиб вайрон шавад, шакли ҳарф вайрон менамояд ва ба хитоиҳо номафҳум менамояд. Барои ҳамин омӯхтани номи ҳар харф ва самти дурусти он аввалин қадам дар навиштани хитоӣ аст.</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('s_heng','一')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">一</div><div class="py">héng<span class="transcript"> [хэн]</span> — уфуқӣ</div><div class="tj">аз чап ба рост кашида мешавад. Мисол: 一 (як), 二 (ду)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('s_shu','丨')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">丨</div><div class="py">shù<span class="transcript"> [шу]</span> — амудӣ</div><div class="tj">аз боло ба поён кашида мешавад. Мисол: 十 (даҳ), 工 (кор)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('s_pie','丿')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">丿</div><div class="py">piě<span class="transcript"> [пйе]</span> — чапи поёнӣ</div><div class="tj">аз боло ба поёни чап моил мешавад. Мисол: 人 (одам), 八 (ҳашт)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('s_dian','丶')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">丶</div><div class="py">diǎn<span class="transcript"> [дьен]</span> — нуқта</div><div class="tj">харфи хурди кӯтоҳ, аз боло ба поёни рост. Мисол: 不 (не), 六 (шаш)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('s_na','乀')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">乀</div><div class="py">nà<span class="transcript"> [на]</span> — рости поёнӣ</div><div class="tj">аз боло ба поёни рост моил мешавад, дар охир каме васеътар. Мисол: 大 (калон), 天 (осмон)</div></div>
    </div>
    <div class="note">Диққат кунед: 撇 (丿) ва 捺 (乀) ба ҳам монанданд, вале самташон баръакс аст — 丿 ба чап моил мешавад, 乀 ба рост. Дар қоидаи 5-уми боло гуфта шуд, ки 撇 ҳамеша пеш аз 捺 навишта мешавад.</div>

    <div class="section-lbl">9. Рақамҳо — ҳарфҳои якҷузъа (独体字)</div>
    <div class="section-sub">Ҳарфи <b>якҷузъа (独体字, dútǐzì)</b> он аст, ки ба қисмҳои хурдтар (радикалҳо) тақсим намешавад — худаш аз чанд харфи оддӣ (笔画) рост меояд, на аз ду ҳарфи алоҳида (мисли 你 ки аз 亻+尔 сохта шудааст). Рақамҳои поён намунаи беҳтарини ин навъанд: содда, серистифода ва пойгоҳи хондани ҳарфҳои мураккабтар дар оянда мешаванд. Онҳоро дар ҳаво бо ангушт такрор кунед, баъд дар коғаз бинависед.</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('num_yi','一')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">一</div><div class="py">yī <span class="transcript">[и]</span></div><div class="tj">як — 1 харф, як хатти уфуқӣ</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('num_er','二')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">二</div><div class="py">èr <span class="transcript">[эр]</span></div><div class="tj">ду — 2 харф, ду хатти уфуқӣ</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('num_san','三')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">三</div><div class="py">sān <span class="transcript">[сань]</span></div><div class="tj">се — 3 харф, аз боло ба поён</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('num_shi','十')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">十</div><div class="py">shí <span class="transcript">[ши]</span></div><div class="tj">даҳ — уфуқӣ, баъд амудӣ аз миён мегузарад</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('num_ba','八')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">八</div><div class="py">bā <span class="transcript">[ба]</span></div><div class="tj">ҳашт — аввал 撇 (чап), баъд 捺 (рост)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('num_liu','六')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">六</div><div class="py">liù <span class="transcript">[лиу]</span></div><div class="tj">шаш — нуқта дар боло, баъд 八-монанд дар поён</div></div>
    </div>
    <div class="note">Фарқи 独体字 (якҷузъа) аз ҳарфҳои дигар: масалан 你 (nǐ) якҷузъа НЕСТ, зеро аз ду қисми алоҳида — 亻(одам) ва 尔 — сохта шудааст (ба бахши 7-и боло нигаред). Рақамҳои болоӣ бошанд, худ асоси сохтани ҳарфҳои дигар мешаванд.</div>

    <button class="quizbtn" onclick="showQuiz()">Гузаштани тест &#8594;</button>

    <div class="qwrap" id="qwrap">
      <div class="section-lbl" style="margin-top:32px;">Тести дарси 1 (10 савол)</div>
      <div class="qcard"><div class="q">1. 你好 чӣ маъно дорад?</div><div class="opts">
        <label><input type="radio" name="q1" value="wrong">Ташаккур</label>
        <label><input type="radio" name="q1" value="right">Салом</label>
        <label><input type="radio" name="q1" value="wrong">Бубахшед</label>
      </div></div>
      <div class="qcard"><div class="q">2. Пиньини калимаи 没关系 кадом аст?</div><div class="opts">
        <label><input type="radio" name="q2" value="wrong">duìbuqǐ</label>
        <label><input type="radio" name="q2" value="right">méi guānxi</label>
        <label><input type="radio" name="q2" value="wrong">nín</label>
      </div></div>
      <div class="qcard"><div class="q">3. Кадом калима барои "шумо" бо эҳтиром истифода мешавад?</div><div class="opts">
        <label><input type="radio" name="q3" value="wrong">你</label>
        <label><input type="radio" name="q3" value="right">您</label>
        <label><input type="radio" name="q3" value="wrong">你们</label>
      </div></div>
      <div class="qcard"><div class="q">4. Вақте 你 (nǐ) + 好 (hǎo) якҷоя талаффуз мешаванд, чӣ гуна хонда мешавад?</div><div class="opts">
        <label><input type="radio" name="q4" value="wrong">nǐ hǎo</label>
        <label><input type="radio" name="q4" value="right">ní hǎo</label>
        <label><input type="radio" name="q4" value="wrong">nì hào</label>
      </div></div>
      <div class="qcard"><div class="q">5. 你们 маънояш чист?</div><div class="opts">
        <label><input type="radio" name="q5" value="wrong">ту</label>
        <label><input type="radio" name="q5" value="wrong">шумо (эҳтиром)</label>
        <label><input type="radio" name="q5" value="right">шумоён</label>
      </div></div>
      <div class="qcard"><div class="q">6. Калимаи 妈 (mā) ба кадом оҳанг мансуб аст?</div><div class="opts">
        <label><input type="radio" name="q6" value="right">Оҳанги 1 — рост</label>
        <label><input type="radio" name="q6" value="wrong">Оҳанги 3 — фуру-боло</label>
        <label><input type="radio" name="q6" value="wrong">Оҳанги 4 — поён</label>
      </div></div>
      <div class="qcard"><div class="q">7. 对不起 маънояш чист?</div><div class="opts">
        <label><input type="radio" name="q7" value="wrong">Ҳечи не</label>
        <label><input type="radio" name="q7" value="right">Бубахшед</label>
        <label><input type="radio" name="q7" value="wrong">Ташаккур</label>
      </div></div>
      <div class="qcard"><div class="q">8. Кадом қоидаи навишт дуруст аст?</div><div class="opts">
        <label><input type="radio" name="q8" value="right">Аввал уфуқӣ (一), баъд амудӣ (丨)</label>
        <label><input type="radio" name="q8" value="wrong">Аввал амудӣ (丨), баъд уфуқӣ (一)</label>
        <label><input type="radio" name="q8" value="wrong">Тартиб муҳим нест</label>
      </div></div>
      <div class="qcard"><div class="q">9. Ҳарфи 好 аз кадом ду қисм иборат аст?</div><div class="opts">
        <label><input type="radio" name="q9" value="wrong">亻+ 尔</label>
        <label><input type="radio" name="q9" value="right">女 + 子</label>
        <label><input type="radio" name="q9" value="wrong">氵+ 殳</label>
      </div></div>
      <div class="qcard"><div class="q">10. Дар ҳарфи 您, кадом қисм дар поён меояд?</div><div class="opts">
        <label><input type="radio" name="q10" value="wrong">门</label>
        <label><input type="radio" name="q10" value="right">心</label>
        <label><input type="radio" name="q10" value="wrong">子</label>
      </div></div>
      <div id="qerror" style="display:none;color:var(--seal);font-size:13px;margin-bottom:10px;">Ба ҳамаи саволҳо ҷавоб диҳед.</div>
      <button class="quizbtn" onclick="submitQuiz()">Супоридани тест</button>

      <div class="result" id="result">
        <div class="seal" id="sealMark"></div>
        <div class="score" id="scoreText"></div>
        <div class="msg" id="scoreMsg"></div>
        <button class="retrybtn" id="retryBtn" onclick="retryQuiz()" style="display:none;">Такрори дарс ва тести дубора</button>
      </div>
    </div>
  `;
}

function renderLesson2(){
  const panel = document.getElementById('panel');
  panel.innerHTML = `
    <div class="panel-head">
      <div class="idx">02</div>
      <div class="titles">
        <div class="zh">谢谢你</div>
        <div class="py">Xièxie nǐ</div>
        <div class="en">Ташаккур</div>
      </div>
    </div>

    <div class="section-lbl">1. Пиньини дарс ва тарзи пайваст кардан</div>
    <div class="section-sub">Дар ин дарс сарҳарфҳо ва бунёдҳои нав меомӯзем. Инчунин ду қоидаи муҳими навишт: <b>ҷои гузоштани аломати оҳанг</b> ва <b>шакли кӯтоҳшуда (省写)</b>.</div>

    <div class="section-sub" style="margin-top:14px;"><b>Тарзи хондани сарҳарфҳои нав</b> (истифодашуда дар дарс):</div>
    <table class="pytable">
      <tr><th>Ҳарф</th><th>Тарзи хондан</th></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">z</td><td>Мисли "дз", вале бидуни нафаси қавӣ — забон ба дандонҳои пеш такя мекунад.</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">j</td><td>Мисли "ҷ"-и мулоим, забон дар пеши даҳон, наздики дандонҳо.</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">k</td><td>Мисли "к", бо нафаси қавитар аз "г" (ба фарқи g).</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">zh</td><td>Мисли "ҷ"-и ғафс — нӯги забон ба боло, ба сақфи даҳон печида мешавад.</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">ch</td><td>Мисли "ч"-и ғафс, бо нафаси қавӣ, нӯги забон ба боло печида.</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">sh</td><td>Мисли "ш"-и ғафс, нӯги забон ба боло печида.</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">r</td><td>Садои байни "ж" ва "р", нӯги забон ба боло, бидуни ларзиш.</td></tr>
    </table>

    <div class="section-sub" style="margin-top:14px;"><b>Тарзи хондани бунёдҳои нав</b> (истифодашуда дар дарс):</div>
    <table class="pytable">
      <tr><th>Бунёд</th><th>Тарзи хондан</th></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">ie</td><td>"и" ба "е" мегузарад, якҷоя "ие" (масалан дар xiè).</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">e</td><td>Садои амиқи "э" (гулугоҳӣ), мисли "ы"-и русӣ каме монанд (масалан дар kè).</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">ai</td><td>Дифтонг "ай", мисли "ай"-и тоҷикӣ (масалан дар zài).</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">ian</td><td>"и"+"э"+"н"-и бинӣ, якҷоя "иен" (масалан дар jiàn).</td></tr>
    </table>

    <div class="section-sub" style="margin-top:14px;"><b>Пиньини калимаҳои дарси 2</b> — ба ҳар як тугма зада гӯш кунед:</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('xie4','谢')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">谢</div><div class="py">xiè<span class="transcript"> [се]</span></div><div class="tj">оҳанги 4</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('bu4','不')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">不</div><div class="py">bù<span class="transcript"> [бу]</span></div><div class="tj">оҳанги 4</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('ke4','客')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">客</div><div class="py">kè<span class="transcript"> [кэ]</span></div><div class="tj">оҳанги 4</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('qi0','气')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">气</div><div class="py">qi<span class="transcript"> [ци]</span></div><div class="tj">оҳанги нейтралӣ</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('zai4','再')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">再</div><div class="py">zài<span class="transcript"> [цзай]</span></div><div class="tj">оҳанги 4</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('jian4','见')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">见</div><div class="py">jiàn<span class="transcript"> [цзиен]</span></div><div class="tj">оҳанги 4</div></div>
    </div>
    <div class="note"><b>Диққат:</b> 不 (bù) одатан оҳанги 4 дорад, вале агар пеш аз ҳиҷои дигари оҳанги 4 ояд, худаш ба оҳанги 2 иваз мешавад: bù + xiè → <b>bú xiè</b>; bù + kèqi → <b>bú kèqi</b>. Ин қоидаи "тағйири оҳанги 不" номида мешавад.</div>

    <div class="section-lbl">2. Талаффуз — оҳанги нейтралӣ ва тамрин (轻声)</div>
    <div class="section-sub">Ба ғайр аз 4 оҳанги асосӣ, боз як оҳанги панҷум ҳаст — <b>оҳанги нейтралӣ (轻声)</b>: кӯтоҳ ва сабук хонда мешавад, аломат надорад.</div>
    <div class="tonebox">
      <div class="t"><button class="playbtn" onclick="playAudio('l2_mama','妈妈')" aria-label="Гӯш кардан">&#128266;</button><div class="mark">māma 妈妈</div><div class="transcript">[мама]</div><div class="name">модар</div></div>
      <div class="t"><button class="playbtn" onclick="playAudio('l2_yeye','爷爷')" aria-label="Гӯш кардан">&#128266;</button><div class="mark">yéye 爷爷</div><div class="transcript">[йейе]</div><div class="name">бобо</div></div>
      <div class="t"><button class="playbtn" onclick="playAudio('l2_nainai','奶奶')" aria-label="Гӯш кардан">&#128266;</button><div class="mark">nǎinai 奶奶</div><div class="transcript">[найнай]</div><div class="name">биби</div></div>
      <div class="t"><button class="playbtn" onclick="playAudio('l2_baba','爸爸')" aria-label="Гӯш кардан">&#128266;</button><div class="mark">bàba 爸爸</div><div class="transcript">[баба]</div><div class="name">падар</div></div>
    </div>
    <div class="note">Диққат кунед: дар ҳар чор калима ҳиҷои дуюм оҳанги нейтралӣ дорад — кӯтоҳтар ва сабуктар аз ҳиҷои якум хонда мешавад.</div>

    <div class="section-sub" style="margin-top:14px;"><b>Тамрини оҳанги нейтралӣ</b> — хонед ва гӯш кунед:</div>
    <div class="drillgrid">
      <div class="drillcard">zhuōzi<span class="transcript"><br>[чжуоцзы]</span><br><button class="playbtn" onclick="playAudio('l2_drill_zhuozi','桌子')">&#128266;</button></div>
      <div class="drillcard">fángzi<span class="transcript"><br>[фанцзы]</span><br><button class="playbtn" onclick="playAudio('l2_drill_fangzi','房子')">&#128266;</button></div>
      <div class="drillcard">wǒmen<span class="transcript"><br>[во мэн]</span><br><button class="playbtn" onclick="playAudio('l2_drill_women','我们')">&#128266;</button></div>
      <div class="drillcard">dìdi<span class="transcript"><br>[дыди]</span><br><button class="playbtn" onclick="playAudio('l2_drill_didi','弟弟')">&#128266;</button></div>
      <div class="drillcard">xǐhuan<span class="transcript"><br>[сихуан]</span><br><button class="playbtn" onclick="playAudio('l2_drill_xihuan','喜欢')">&#128266;</button></div>
      <div class="drillcard">rènshi<span class="transcript"><br>[женши]</span><br><button class="playbtn" onclick="playAudio('l2_drill_rensi','认识')">&#128266;</button></div>
      <div class="drillcard">xiānsheng<span class="transcript"><br>[сиеншэн]</span><br><button class="playbtn" onclick="playAudio('l2_drill_xiansheng','先生')">&#128266;</button></div>
      <div class="drillcard">péngyou<span class="transcript"><br>[пэнйоу]</span><br><button class="playbtn" onclick="playAudio('l2_drill_pengyou','朋友')">&#128266;</button></div>
    </div>
    <div class="note"><b>Қоидаи гузоштани аломати оҳанг:</b> агар бунёд аз ду ё бештар ҳарфи садонок иборат бошад, аломати оҳанг ба ҳамон садоноке гузошта мешавад, ки даҳон бештар кушода мешавад — тартиб: a → o → e → i → u → ü. Истисно: дар "iu" аломат ба "u" гузошта мешавад (зеро iu кӯтоҳшудаи iou аст). Оҳанги нейтралӣ аломат надорад.</div>
    <div class="note"><b>Қоидаи кӯтоҳнависӣ (省写):</b> бунёдҳои iou, uei, uen баъд аз сарҳарф кӯтоҳ навишта мешаванд: iou→iu, uei→ui, uen→un. Масалан: n+iou=niu (на niou), g+uei=gui (на guei), l+uen=lun (на luen).</div>

    <div class="section-lbl">3. Калимаҳои нав</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('xiexie','谢谢')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">谢谢</div><div class="py">xièxie<span class="transcript"> [сесе]</span></div><div class="tj">ташаккур</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('bu4','不')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">不</div><div class="py">bù<span class="transcript"> [бу]</span></div><div class="tj">не, ин тавр не (инкор)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('bukeqi','不客气')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">不客气</div><div class="py">bú kèqi<span class="transcript"> [бу кэци]</span></div><div class="tj">намеарзад, ташвиш накашед</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('zaijian','再见')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">再见</div><div class="py">zàijiàn<span class="transcript"> [цзайцзиен]</span></div><div class="tj">то дидан, хайр</div></div>
    </div>

    <div class="section-lbl">4. Грамматика</div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">1.</span>Ҳарфи инкор: <ruby>不<rt>bù</rt></ruby></div>
      <div class="gbody">不 калимаи инкорист ва пеш аз феъл ё сифат гузошта мешавад, то маънои "не" бидиҳад. Дар ин дарс дар шакли ҷавоби кӯтоҳ истифода мешавад: ба ҷои "ташаккур намекунам", танҳо 不谢 (=не, лозим не) гуфта мешавад.</div>
      <div class="gex"><span class="tag">сохт</span>不 + феъл/сифат = инкор</div>
    </div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">2.</span>Ҷавоб ба ташаккур: <ruby>谢谢<rt>xièxie</rt></ruby> → <ruby>不谢<rt>bú xiè</rt></ruby> / <ruby>不客气<rt>bú kèqi</rt></ruby></div>
      <div class="gbody">Вақте касе ташаккур мегӯяд, ду тарзи ҷавоб дода мешавад: 不谢 (кӯтоҳ, "лозим не") ё 不客气 (расмитар, "ташвиш накашед"). Ҳарду маънои якхела доранд.</div>
      <div class="gex"><span class="tag">намуна</span>A: 谢谢你！ → B: 不客气！</div>
    </div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">3.</span>Хайрухушӣ: <ruby>再见<rt>zàijiàn</rt></ruby></div>
      <div class="gbody">再见 таҳтуллафзӣ маънои "боз бинам" дорад (再 — боз,見/见 — дидан). Дар мукотиба ҳарду тараф баробар мегӯянд: A: 再见！ B: 再见！</div>
      <div class="gex"><span class="tag">сохт</span>再 (боз) + 见 (дидан) = 再见 (то дидан)</div>
    </div>

    <div class="section-lbl">5. Ҷумлаҳо</div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">谢谢！</span><span class="py">Xièxie!</span><span class="transcript">[Сесе!]</span><span class="tj">— Ташаккур!</span><button class="playbtn inline" onclick="playAudio('xiexie','谢谢')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">不谢！</span><span class="py">Bú xiè!</span><span class="transcript">[Бу се!]</span><span class="tj">— Лозим не!</span><button class="playbtn inline" onclick="playAudio('buxie','不谢')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">谢谢你！</span><span class="py">Xièxie nǐ!</span><span class="transcript">[Сесе ни!]</span><span class="tj">— Ташаккур ба шумо!</span><button class="playbtn inline" onclick="playAudio('xiexieni','谢谢你')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">不客气！</span><span class="py">Bú kèqi!</span><span class="transcript">[Бу кэци!]</span><span class="tj">— Ташвиш накашед!</span><button class="playbtn inline" onclick="playAudio('bukeqi','不客气')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">再见！</span><span class="py">Zàijiàn!</span><span class="transcript">[Цзайцзиен!]</span><span class="tj">— То дидан!</span><button class="playbtn inline" onclick="playAudio('zaijian','再见')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">再见！</span><span class="py">Zàijiàn!</span><span class="transcript">[Цзайцзиен!]</span><span class="tj">— То дидан!</span><button class="playbtn inline" onclick="playAudio('zaijian','再见')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>

    <div class="section-lbl">6. Ибораҳои синфхона (课堂用语)</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('l2_dakaishu','打开书')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">打开书。</div><div class="py">Dǎkāi shū.<span class="transcript"> [Дакай шу]</span></div><div class="tj">Китобро кушоед.</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('l2_qingdashengdu','请大声读')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">请大声读。</div><div class="py">Qǐng dà shēng dú.<span class="transcript"> [Цин да шэн ду]</span></div><div class="tj">Марҳамат, баланд хонед.</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('l2_zaiduyibian','再读一遍')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">再读一遍。</div><div class="py">Zài dú yí biàn.<span class="transcript"> [Цзай ду и биен]</span></div><div class="tj">Боз як бор хонед.</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('l2_yiqidu','一起读')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">一起读。</div><div class="py">Yìqǐ dú.<span class="transcript"> [Ициду]</span></div><div class="tj">Якҷоя хонед.</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('l2_youwentima','有问题吗')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">有问题吗？</div><div class="py">Yǒu wèntí ma?<span class="transcript"> [Йоу вэньти ма?]</span></div><div class="tj">Савол ҳаст?</div></div>
    </div>

    <div class="section-lbl">7. Тартиби навишти ҳарфҳо — аниматсия ва худтамрин</div>
    <div class="section-sub">Ҳарфҳои нави дарси 2. Аввал «Нишон додан»-ро занед, баъд «Худам нависам»-ро.</div>
    <div class="strokegrid" id="strokegrid2">
      <div class="strokecard"><div class="shz">谢</div><div class="spy">xiè <span class="transcript">[се]</span></div><div class="starget" id="sw2-xie"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw2-xie')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw2-xie')">Худам нависам</button></div>
        <div class="sstatus" id="sw2-xie-status"></div></div>
      <div class="strokecard"><div class="shz">客</div><div class="spy">kè <span class="transcript">[кэ]</span></div><div class="starget" id="sw2-ke"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw2-ke')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw2-ke')">Худам нависам</button></div>
        <div class="sstatus" id="sw2-ke-status"></div></div>
      <div class="strokecard"><div class="shz">气</div><div class="spy">qì <span class="transcript">[ци]</span></div><div class="starget" id="sw2-qi"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw2-qi')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw2-qi')">Худам нависам</button></div>
        <div class="sstatus" id="sw2-qi-status"></div></div>
      <div class="strokecard"><div class="shz">再</div><div class="spy">zài <span class="transcript">[цзай]</span></div><div class="starget" id="sw2-zai"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw2-zai')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw2-zai')">Худам нависам</button></div>
        <div class="sstatus" id="sw2-zai-status"></div></div>
      <div class="strokecard"><div class="shz">见</div><div class="spy">jiàn <span class="transcript">[цзиен]</span></div><div class="starget" id="sw2-jian"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw2-jian')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw2-jian')">Худам нависам</button></div>
        <div class="sstatus" id="sw2-jian-status"></div></div>
      <div class="strokecard"><div class="shz">口</div><div class="spy">kǒu <span class="transcript">[коу]</span></div><div class="starget" id="sw2-kou"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw2-kou')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw2-kou')">Худам нависам</button></div>
        <div class="sstatus" id="sw2-kou-status"></div></div>
      <div class="strokecard"><div class="shz">山</div><div class="spy">shān <span class="transcript">[шань]</span></div><div class="starget" id="sw2-shan"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw2-shan')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw2-shan')">Худам нависам</button></div>
        <div class="sstatus" id="sw2-shan-status"></div></div>
      <div class="strokecard"><div class="shz">小</div><div class="spy">xiǎo <span class="transcript">[сяо]</span></div><div class="starget" id="sw2-xiao"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw2-xiao')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw2-xiao')">Худам нависам</button></div>
        <div class="sstatus" id="sw2-xiao-status"></div></div>
    </div>

    <div class="section-lbl">8. Аломатҳои асосии навишт (笔画)</div>
    <div class="section-sub">Се аломати нав, ки ҳамаашон "хамида" мешаванд — на рост, балки дар миёна тағйири самт медиҳанд.</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('s_hengzhe','横折')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">㇆</div><div class="py">héngzhé<span class="transcript"> [хэнчжэ]</span> — уфуқӣ-хамида</div><div class="tj">аввал уфуқӣ, баъд ба поён мехамад. Мисол: 口 (даҳон), 日 (офтоб)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('s_shuzhe','竖折')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">㇄</div><div class="py">shùzhé<span class="transcript"> [шучжэ]</span> — амудӣ-хамида</div><div class="tj">аввал амудӣ, баъд ба рост мехамад. Мисол: 山 (кӯҳ), 出 (баромадан)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('s_shugou','竖钩')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">亅</div><div class="py">shùgōu<span class="transcript"> [шугоу]</span> — амудӣ-қалмоқ</div><div class="tj">амудӣ поён рафта, дар охир каме ба чап мехамад. Мисол: 丁 (одам), 小 (хурд)</div></div>
    </div>

    <div class="section-lbl">9. Ҳарфҳои якҷузъа (独体字) — намунаҳои китоб</div>
    <div class="section-sub">Панҷ ҳарфи оддии зерин низ якҷузъаанд ва аслашон аз шакли ашёи воқеӣ гирифта шудааст:</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_kou','口')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">口</div><div class="py">kǒu <span class="transcript">[коу]</span></div><div class="tj">даҳон — шаклаш ба даҳони кушода монанд аст</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_jian','见')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">见</div><div class="py">jiàn <span class="transcript">[цзиен]</span></div><div class="tj">дидан — боло 目(чашм), поён 人(одам): "бо чашми кушода нигоҳ кардан"</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_shan','山')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">山</div><div class="py">shān <span class="transcript">[шань]</span></div><div class="tj">кӯҳ — шаклаш ба кӯҳҳои мавҷдор монанд аст</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_xiao','小')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">小</div><div class="py">xiǎo <span class="transcript">[сяо]</span></div><div class="tj">хурд — шаклаш ба зарраҳои реги майда монанд буд</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_bu','不')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">不</div><div class="py">bù <span class="transcript">[бу]</span></div><div class="tj">не — пештар олоти корӣ буд, ҳоло ҳарфи инкор аст (аллакай дар Дарси 1 омӯхтед)</div></div>
    </div>

    <button class="quizbtn" onclick="showQuiz()">Гузаштани тест &#8594;</button>

    <div class="qwrap" id="qwrap">
      <div class="section-lbl" style="margin-top:32px;">Тести дарси 2 (10 савол)</div>
      <div class="qcard"><div class="q">1. 谢谢 чӣ маъно дорад?</div><div class="opts">
        <label><input type="radio" name="q1" value="wrong">Салом</label>
        <label><input type="radio" name="q1" value="right">Ташаккур</label>
        <label><input type="radio" name="q1" value="wrong">Хайр</label>
      </div></div>
      <div class="qcard"><div class="q">2. Ба ҷумлаи "谢谢你！" кадом ҷавоб дуруст аст?</div><div class="opts">
        <label><input type="radio" name="q2" value="right">不客气！</label>
        <label><input type="radio" name="q2" value="wrong">再见！</label>
        <label><input type="radio" name="q2" value="wrong">你好！</label>
      </div></div>
      <div class="qcard"><div class="q">3. 再见 маънояш чист?</div><div class="opts">
        <label><input type="radio" name="q3" value="wrong">Ташаккур</label>
        <label><input type="radio" name="q3" value="wrong">Бубахшед</label>
        <label><input type="radio" name="q3" value="right">То дидан / Хайр</label>
      </div></div>
      <div class="qcard"><div class="q">4. Пиньини калимаи 不客气 кадом аст?</div><div class="opts">
        <label><input type="radio" name="q4" value="right">bú kèqi</label>
        <label><input type="radio" name="q4" value="wrong">xièxie</label>
        <label><input type="radio" name="q4" value="wrong">zàijiàn</label>
      </div></div>
      <div class="qcard"><div class="q">5. Вақте 不 (bù) пеш аз ҳиҷои оҳанги 4 меояд, чӣ рӯй медиҳад?</div><div class="opts">
        <label><input type="radio" name="q5" value="wrong">Ҳеҷ чиз, ҳамон хел мемонад</label>
        <label><input type="radio" name="q5" value="right">Ба оҳанги 2 иваз мешавад</label>
        <label><input type="radio" name="q5" value="wrong">Пурра нест мешавад</label>
      </div></div>
      <div class="qcard"><div class="q">6. Дар калимаҳои mama, yeye, nainai, baba — ҳиҷои дуюм кадом оҳангро дорад?</div><div class="opts">
        <label><input type="radio" name="q6" value="wrong">Оҳанги 1</label>
        <label><input type="radio" name="q6" value="right">Оҳанги нейтралӣ</label>
        <label><input type="radio" name="q6" value="wrong">Оҳанги 4</label>
      </div></div>
      <div class="qcard"><div class="q">7. Тибқи қоидаи кӯтоҳнависӣ, "n + iou" чӣ гуна навишта мешавад?</div><div class="opts">
        <label><input type="radio" name="q7" value="wrong">niou</label>
        <label><input type="radio" name="q7" value="right">niu</label>
        <label><input type="radio" name="q7" value="wrong">nio</label>
      </div></div>
      <div class="qcard"><div class="q">8. Ҳарфи 见 аз кадом ду қисм иборат аст?</div><div class="opts">
        <label><input type="radio" name="q8" value="wrong">女 + 子</label>
        <label><input type="radio" name="q8" value="right">目 (боло) + 人 (поён)</label>
        <label><input type="radio" name="q8" value="wrong">氵+ 殳</label>
      </div></div>
      <div class="qcard"><div class="q">9. Аломати 亅 (shùgōu) чӣ ном дорад ва дар кадом ҳарф вомехӯрад?</div><div class="opts">
        <label><input type="radio" name="q9" value="right">Амудӣ-қалмоқ, дар 小</label>
        <label><input type="radio" name="q9" value="wrong">Уфуқӣ-хамида, дар 口</label>
        <label><input type="radio" name="q9" value="wrong">Нуқта, дар 六</label>
      </div></div>
      <div class="qcard"><div class="q">10. 请大声读 маънояш чист?</div><div class="opts">
        <label><input type="radio" name="q10" value="wrong">Китобро кушоед</label>
        <label><input type="radio" name="q10" value="right">Марҳамат, баланд хонед</label>
        <label><input type="radio" name="q10" value="wrong">Боз як бор хонед</label>
      </div></div>
      <div id="qerror" style="display:none;color:var(--seal);font-size:13px;margin-bottom:10px;">Ба ҳамаи саволҳо ҷавоб диҳед.</div>
      <button class="quizbtn" onclick="submitQuiz()">Супоридани тест</button>

      <div class="result" id="result">
        <div class="seal" id="sealMark"></div>
        <div class="score" id="scoreText"></div>
        <div class="msg" id="scoreMsg"></div>
        <button class="retrybtn" id="retryBtn" onclick="retryQuiz()" style="display:none;">Такрори дарс ва тести дубора</button>
      </div>
    </div>
  `;
}

function renderLesson3(){
  const panel = document.getElementById('panel');
  panel.innerHTML = `
    <div class="panel-head">
      <div class="idx">03</div>
      <div class="titles">
        <div class="zh">你叫什么名字</div>
        <div class="py">Nǐ jiào shénme míngzi</div>
        <div class="en">Номи шумо чист</div>
      </div>
    </div>

    <div class="section-lbl">1. Пиньини дарс ва тарзи пайваст кардан</div>
    <div class="section-sub">Дар ин дарс фарқи ду гурӯҳи сарҳарфи монандро меомӯзем — j/q/x ва z/c/s, инчунин фарқи бунёдҳои i/u/ü.</div>
    <table class="pytable">
      <tr><th>Гурӯҳ</th><th>Тарзи хондан ва фарқият</th></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">j, q, x</td><td>Забон ба сақфи даҳон (пеши он) наздик мешавад. j — бе нафаси қавӣ; q — бо нафаси қавии зиёд; x — забон ламс намекунад, фақат наздик мешавад (садои "сь"-монанд).</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">z, c, s</td><td>Нӯги забон ба пушти дандонҳои болоӣ мезанад. z — бе нафаси қавӣ; c — бо нафаси қавии равшан; s — забон умуман ламс намекунад, фақат тангӣ месозад.</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">i / u</td><td>Ҷои забон якхела, вале лабҳо фарқ мекунанд: i — лабҳо ҳамвор (кушода); u — лабҳо мудаввар (гирд).</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">u / ü</td><td>Ҳарду лаб мудавваранд, вале ҷои забон фарқ мекунад: ü — забон дар пеш (нӯгаш ба дандонҳои поён такя мекунад); u — забон дар қафо.</td></tr>
    </table>
    <div class="note"><b>Қоидаи муҳим:</b> вақте ü (ё бунёде, ки бо ü сар мешавад) баъд аз j, q, x меояд, ду нуқтаи болои ü гум мешавад дар навишт: ju, qu, xu (на jü, qü, xü). Вале баъд аз l ё n нуқтаҳо мемонанд: lü, nü.</div>

    <div class="section-sub" style="margin-top:14px;"><b>Тамрин</b> — фарқи j/q/x ва z/c/s-ро гӯш кунед ва такрор кунед:</div>
    <div class="drillgrid">
      <div class="drillcard">xiūxi<span class="transcript"><br>[сюси]</span><br><button class="playbtn" onclick="playAudio('l3_drill_xiuxi','休息')">&#128266;</button></div>
      <div class="drillcard">jiàqī<span class="transcript"><br>[цзяци]</span><br><button class="playbtn" onclick="playAudio('l3_drill_jiaqi','假期')">&#128266;</button></div>
      <div class="drillcard">xīngqī<span class="transcript"><br>[синци]</span><br><button class="playbtn" onclick="playAudio('l3_drill_xingqi','星期')">&#128266;</button></div>
      <div class="drillcard">xìngqù<span class="transcript"><br>[синцюй]</span><br><button class="playbtn" onclick="playAudio('l3_drill_xingqu','兴趣')">&#128266;</button></div>
      <div class="drillcard">zǎoshang<span class="transcript"><br>[цзаушан]</span><br><button class="playbtn" onclick="playAudio('l3_drill_zaoshang','早上')">&#128266;</button></div>
      <div class="drillcard">cāochǎng<span class="transcript"><br>[цхаучан]</span><br><button class="playbtn" onclick="playAudio('l3_drill_caochang','操场')">&#128266;</button></div>
      <div class="drillcard">Hànzì<span class="transcript"><br>[ханьцзы]</span><br><button class="playbtn" onclick="playAudio('l3_drill_hanzi','汉字')">&#128266;</button></div>
      <div class="drillcard">zuótiān<span class="transcript"><br>[цзуотиен]</span><br><button class="playbtn" onclick="playAudio('l3_drill_zuotian','昨天')">&#128266;</button></div>
    </div>

    <div class="section-lbl">2. Талаффуз — қоидаи тағйири оҳанги 不 (пурра)</div>
    <table class="pytable">
      <tr><th>Ҳолат</th><th>Мисол</th></tr>
      <tr><td>Пеш аз оҳанги 1, 2 ё 3 — 不 тағйир НАМЕЁБАД</td><td style="font-family:'Noto Serif SC',serif;">bù chī, bù xíng, bù hǎo</td></tr>
      <tr><td>Пеш аз оҳанги 4 — 不 ба оҳанги 2 (bú) иваз мешавад</td><td style="font-family:'Noto Serif SC',serif;">bú huì, bú shì, bú kàn</td></tr>
    </table>
    <div class="note">Дар ин дарс низ ин қоида кор мекунад: 不是 (bú shì), зеро 是 оҳанги 4 дорад.</div>

    <div class="section-lbl">3. Калимаҳои нав</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('jiao4','叫')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">叫</div><div class="py">jiào<span class="transcript"> [цзяо]</span></div><div class="tj">номида шудан, ном доштан</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('shenme','什么')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">什么</div><div class="py">shénme<span class="transcript"> [шэньмэ]</span></div><div class="tj">чӣ (ҷонишини саволӣ)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('mingzi','名字')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">名字</div><div class="py">míngzi<span class="transcript"> [минцзы]</span></div><div class="tj">ном</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('wo3','我')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">我</div><div class="py">wǒ<span class="transcript"> [во]</span></div><div class="tj">ман</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('shi4','是')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">是</div><div class="py">shì<span class="transcript"> [ши]</span></div><div class="tj">будан (феъли пайвасткунанда)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('laoshi','老师')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">老师</div><div class="py">lǎoshī<span class="transcript"> [лаоши]</span></div><div class="tj">муаллим</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('ma_q','吗')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">吗</div><div class="py">ma<span class="transcript"> [ма]</span></div><div class="tj">аломати саволӣ (дар охири ҷумла)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('xuesheng','学生')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">学生</div><div class="py">xuésheng<span class="transcript"> [сюэшэн]</span></div><div class="tj">донишҷӯ, хонанда</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('ren2','人')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">人</div><div class="py">rén<span class="transcript"> [жэнь]</span></div><div class="tj">одам, шахс</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('zhongguo','中国')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">中国</div><div class="py">Zhōngguó<span class="transcript"> [Чжунго]</span></div><div class="tj">Хитой (номи хос)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('meiguo','美国')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">美国</div><div class="py">Měiguó<span class="transcript"> [Мэйго]</span></div><div class="tj">Амрико (номи хос)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('liyue','李月')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">李月</div><div class="py">Lǐ Yuè<span class="transcript"> [Ли Юэ]</span></div><div class="tj">номи шахс (Ли Юэ)</div></div>
    </div>

    <div class="section-lbl">4. Грамматика</div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">1.</span>Ҷонишини саволии <ruby>什么<rt>shénme</rt></ruby></div>
      <div class="gbody">什么 маънои "чӣ" дорад ва ба ҷои исми номаълум дар ҷумла гузошта мешавад — ё танҳо, ё пеш аз исми дигар. Тартиби ҷумла тағйир намеёбад, фақат ҷои калимаи номаълум 什么 мегирад.</div>
      <div class="gex"><span class="tag">намуна</span>你叫<ruby>什么<rt>shénme</rt></ruby>名字？ — Номи шумо чист?</div>
      <div class="gex"><span class="tag">намуна</span>这是<ruby>什么<rt>shénme</rt></ruby>？ — Ин чист?</div>
    </div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">2.</span>Ҷумлаи 是 (будан)</div>
      <div class="gbody">是 феъли пайвасткунанда аст, ки мегӯяд шахс/чиз чӣ аст ё ба чӣ мансуб аст. Шакли инкорӣ бо гузоштани 不 пеш аз 是 сохта мешавад: 不是.</div>
      <div class="gex"><span class="tag">сохт</span>Мубтадо + (不)是 + исм</div>
      <div class="gex"><span class="tag">намуна</span>我<ruby>是<rt>shì</rt></ruby>美国人。 — Ман амрикоӣ ҳастам.</div>
      <div class="gex"><span class="tag">намуна</span>我<ruby>不是<rt>bú shì</rt></ruby>老师。 — Ман муаллим нестам.</div>
    </div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">3.</span>Ҷумлаи саволӣ бо <ruby>吗<rt>ma</rt></ruby></div>
      <div class="gbody">Агар ба охири ҷумлаи хабарӣ 吗 илова кунед, он ба ҷумлаи саволӣ табдил меёбад — тартиби калимаҳо тағйир намеёбад, фақат 吗 дар охир зам мешавад.</div>
      <div class="gex"><span class="tag">сохт</span>Мубтадо + феъл + исм + 吗？</div>
      <div class="gex"><span class="tag">намуна</span>你是中国人。 → 你是中国人<ruby>吗<rt>ma</rt></ruby>？ — Шумо хитоӣ ҳастед? (Шумо хитоӣ ҳастед?)</div>
    </div>

    <div class="section-lbl">5. Ҷумлаҳо</div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">你叫什么名字？</span><span class="py">Nǐ jiào shénme míngzi?</span><span class="transcript">[Ни цзяо шэньмэ минцзы?]</span><span class="tj">— Номи шумо чист?</span><button class="playbtn inline" onclick="playAudio('l3_q1','你叫什么名字')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">我叫李月。</span><span class="py">Wǒ jiào Lǐ Yuè.</span><span class="transcript">[Во цзяо Ли Юэ.]</span><span class="tj">— Номи ман Ли Юэ.</span><button class="playbtn inline" onclick="playAudio('l3_a1','我叫李月')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">你是老师吗？</span><span class="py">Nǐ shì lǎoshī ma?</span><span class="transcript">[Ни ши лаоши ма?]</span><span class="tj">— Шумо муаллим ҳастед?</span><button class="playbtn inline" onclick="playAudio('l3_q2','你是老师吗')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">我不是老师，我是学生。</span><span class="py">Wǒ bú shì lǎoshī, wǒ shì xuésheng.</span><span class="transcript">[Во бу ши лаоши, во ши сюэшэн.]</span><span class="tj">— Ман муаллим нестам, ман донишҷӯ ҳастам.</span><button class="playbtn inline" onclick="playAudio('l3_a2','我不是老师我是学生')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">你是中国人吗？</span><span class="py">Nǐ shì Zhōngguó rén ma?</span><span class="transcript">[Ни ши Чжунго жэнь ма?]</span><span class="tj">— Шумо хитоӣ ҳастед?</span><button class="playbtn inline" onclick="playAudio('l3_q3','你是中国人吗')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">我不是中国人，我是美国人。</span><span class="py">Wǒ bú shì Zhōngguó rén, wǒ shì Měiguó rén.</span><span class="transcript">[Во бу ши Чжунго жэнь, во ши Мэйго жэнь.]</span><span class="tj">— Ман хитоӣ нестам, ман амрикоӣ ҳастам.</span><button class="playbtn inline" onclick="playAudio('l3_a3','我不是中国人我是美国人')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>

    <div class="section-lbl">6. Тартиби навишти ҳарфҳо — аниматсия ва худтамрин</div>
    <div class="section-sub">Ҳарфҳои нави дарси 3. Аввал «Нишон додан»-ро занед, баъд «Худам нависам»-ро.</div>
    <div class="strokegrid" id="strokegrid3">
      <div class="strokecard"><div class="shz">叫</div><div class="spy">jiào <span class="transcript">[цзяо]</span></div><div class="starget" id="sw3-jiao"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw3-jiao')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw3-jiao')">Худам нависам</button></div>
        <div class="sstatus" id="sw3-jiao-status"></div></div>
      <div class="strokecard"><div class="shz">什</div><div class="spy">shén <span class="transcript">[шэнь]</span></div><div class="starget" id="sw3-shen"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw3-shen')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw3-shen')">Худам нависам</button></div>
        <div class="sstatus" id="sw3-shen-status"></div></div>
      <div class="strokecard"><div class="shz">么</div><div class="spy">me <span class="transcript">[мэ]</span></div><div class="starget" id="sw3-me"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw3-me')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw3-me')">Худам нависам</button></div>
        <div class="sstatus" id="sw3-me-status"></div></div>
      <div class="strokecard"><div class="shz">名</div><div class="spy">míng <span class="transcript">[мин]</span></div><div class="starget" id="sw3-ming"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw3-ming')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw3-ming')">Худам нависам</button></div>
        <div class="sstatus" id="sw3-ming-status"></div></div>
      <div class="strokecard"><div class="shz">字</div><div class="spy">zì <span class="transcript">[цзы]</span></div><div class="starget" id="sw3-zi"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw3-zi')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw3-zi')">Худам нависам</button></div>
        <div class="sstatus" id="sw3-zi-status"></div></div>
      <div class="strokecard"><div class="shz">我</div><div class="spy">wǒ <span class="transcript">[во]</span></div><div class="starget" id="sw3-wo"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw3-wo')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw3-wo')">Худам нависам</button></div>
        <div class="sstatus" id="sw3-wo-status"></div></div>
      <div class="strokecard"><div class="shz">是</div><div class="spy">shì <span class="transcript">[ши]</span></div><div class="starget" id="sw3-shi4"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw3-shi4')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw3-shi4')">Худам нависам</button></div>
        <div class="sstatus" id="sw3-shi4-status"></div></div>
      <div class="strokecard"><div class="shz">老</div><div class="spy">lǎo <span class="transcript">[лао]</span></div><div class="starget" id="sw3-lao"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw3-lao')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw3-lao')">Худам нависам</button></div>
        <div class="sstatus" id="sw3-lao-status"></div></div>
      <div class="strokecard"><div class="shz">师</div><div class="spy">shī <span class="transcript">[ши]</span></div><div class="starget" id="sw3-shi1"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw3-shi1')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw3-shi1')">Худам нависам</button></div>
        <div class="sstatus" id="sw3-shi1-status"></div></div>
      <div class="strokecard"><div class="shz">吗</div><div class="spy">ma <span class="transcript">[ма]</span></div><div class="starget" id="sw3-ma"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw3-ma')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw3-ma')">Худам нависам</button></div>
        <div class="sstatus" id="sw3-ma-status"></div></div>
      <div class="strokecard"><div class="shz">学</div><div class="spy">xué <span class="transcript">[сюэ]</span></div><div class="starget" id="sw3-xue"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw3-xue')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw3-xue')">Худам нависам</button></div>
        <div class="sstatus" id="sw3-xue-status"></div></div>
      <div class="strokecard"><div class="shz">生</div><div class="spy">shēng <span class="transcript">[шэн]</span></div><div class="starget" id="sw3-sheng"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw3-sheng')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw3-sheng')">Худам нависам</button></div>
        <div class="sstatus" id="sw3-sheng-status"></div></div>
      <div class="strokecard"><div class="shz">人</div><div class="spy">rén <span class="transcript">[жэнь]</span></div><div class="starget" id="sw3-ren"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw3-ren')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw3-ren')">Худам нависам</button></div>
        <div class="sstatus" id="sw3-ren-status"></div></div>
    </div>

    <div class="section-lbl">7. Аломатҳои асосии навишт (笔画)</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('s_hengzhegou','横折钩')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">乛</div><div class="py">héngzhégōu<span class="transcript"> [хэнчжэгоу]</span> — уфуқӣ-хамида-қалмоқ</div><div class="tj">аввал уфуқӣ, баъд ба поён мехамад ва қалмоқ мекунад. Мисол: 门 (дар), 月 (моҳ)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('s_wogou','卧钩')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">㇃</div><div class="py">wògōu<span class="transcript"> [вогоу]</span> — қалмоқи хобида</div><div class="tj">каҷи мулоим ба поён, дар охир қалмоқи болораванда. Мисол: 心 (дил), 您 (шумо бо эҳтиром)</div></div>
    </div>

    <div class="section-lbl">8. Ҳарфҳои якҷузъа (独体字) — намунаҳои китоб</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_yue','月')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">月</div><div class="py">yuè <span class="transcript">[юэ]</span></div><div class="tj">моҳ (дар осмон) — шаклаш ба ҳилол монанд аст</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_xin','心')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">心</div><div class="py">xīn <span class="transcript">[синь]</span></div><div class="tj">дил — шаклаш ба дил монанд аст</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_zhong','中')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">中</div><div class="py">zhōng <span class="transcript">[чжун]</span></div><div class="tj">миён — пештар байрақи парвозкунанда буд, ҳоло маънои "мобайн"-ро дорад</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('ren2','人')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">人</div><div class="py">rén <span class="transcript">[жэнь]</span></div><div class="tj">одам — шаклаш ба одами рост истода монанд аст</div></div>
    </div>
    <div class="note"><b>Қоидаи тартиби навишт:</b> аввал уфуқӣ, баъд амудӣ (先横后竖) — мисол: 十, 工. Аввал чапи поёнӣ, баъд рости поёнӣ (先撇后捺) — мисол: 八, 人.</div>

    <button class="quizbtn" onclick="showQuiz()">Гузаштани тест &#8594;</button>

    <div class="qwrap" id="qwrap">
      <div class="section-lbl" style="margin-top:32px;">Тести дарси 3 (10 савол)</div>
      <div class="qcard"><div class="q">1. 你叫什么名字？ маънояш чист?</div><div class="opts">
        <label><input type="radio" name="q1" value="wrong">Шумо аз куҷоед?</label>
        <label><input type="radio" name="q1" value="right">Номи шумо чист?</label>
        <label><input type="radio" name="q1" value="wrong">Шумо чанд сола ҳастед?</label>
      </div></div>
      <div class="qcard"><div class="q">2. 什么 кадом вазифаро иҷро мекунад?</div><div class="opts">
        <label><input type="radio" name="q2" value="right">Ҷонишини саволӣ "чӣ"</label>
        <label><input type="radio" name="q2" value="wrong">Ҳарфи инкор</label>
        <label><input type="radio" name="q2" value="wrong">Аломати саволӣ</label>
      </div></div>
      <div class="qcard"><div class="q">3. Шакли инкории "我是老师" кадом аст?</div><div class="opts">
        <label><input type="radio" name="q3" value="wrong">我是不老师</label>
        <label><input type="radio" name="q3" value="right">我不是老师</label>
        <label><input type="radio" name="q3" value="wrong">我老师不是</label>
      </div></div>
      <div class="qcard"><div class="q">4. Барои сохтани ҷумлаи саволӣ аз "你是学生" чӣ илова мекунем?</div><div class="opts">
        <label><input type="radio" name="q4" value="wrong">不 дар аввал</label>
        <label><input type="radio" name="q4" value="right">吗 дар охир</label>
        <label><input type="radio" name="q4" value="wrong">什么 дар миён</label>
      </div></div>
      <div class="qcard"><div class="q">5. 学生 маънояш чист?</div><div class="opts">
        <label><input type="radio" name="q5" value="wrong">Муаллим</label>
        <label><input type="radio" name="q5" value="right">Донишҷӯ / хонанда</label>
        <label><input type="radio" name="q5" value="wrong">Одам</label>
      </div></div>
      <div class="qcard"><div class="q">6. Кадоме аз инҳо дуруст аст: 不是 чӣ гуна хонда мешавад?</div><div class="opts">
        <label><input type="radio" name="q6" value="wrong">bù shì</label>
        <label><input type="radio" name="q6" value="right">bú shì</label>
        <label><input type="radio" name="q6" value="wrong">bǔ shì</label>
      </div></div>
      <div class="qcard"><div class="q">7. Вақте ü баъд аз j, q, x меояд, дар навишт чӣ рӯй медиҳад?</div><div class="opts">
        <label><input type="radio" name="q7" value="right">Ду нуқтаи болои ü гум мешавад (ju, qu, xu)</label>
        <label><input type="radio" name="q7" value="wrong">ü ба u иваз мешавад пурра</label>
        <label><input type="radio" name="q7" value="wrong">Ҳеҷ чиз тағйир намеёбад</label>
      </div></div>
      <div class="qcard"><div class="q">8. Фарқи асосии j ва q дар талаффуз чист?</div><div class="opts">
        <label><input type="radio" name="q8" value="wrong">j забонро ламс намекунад, q мекунад</label>
        <label><input type="radio" name="q8" value="right">q бо нафаси қавитар талаффуз мешавад</label>
        <label><input type="radio" name="q8" value="wrong">Ҳеҷ фарқе нест</label>
      </div></div>
      <div class="qcard"><div class="q">9. Ҳарфи 中 аслан чӣ маъно дошт?</div><div class="opts">
        <label><input type="radio" name="q9" value="wrong">Дил</label>
        <label><input type="radio" name="q9" value="right">Байрақи парвозкунанда</label>
        <label><input type="radio" name="q9" value="wrong">Одами рост истода</label>
      </div></div>
      <div class="qcard"><div class="q">10. 我不是中国人，我是美国人 маънояш чист?</div><div class="opts">
        <label><input type="radio" name="q10" value="wrong">Ман хитоӣ ҳастам, амрикоӣ не</label>
        <label><input type="radio" name="q10" value="right">Ман хитоӣ нестам, ман амрикоӣ ҳастам</label>
        <label><input type="radio" name="q10" value="wrong">Ман на хитоӣ ва на амрикоӣ ҳастам</label>
      </div></div>
      <div id="qerror" style="display:none;color:var(--seal);font-size:13px;margin-bottom:10px;">Ба ҳамаи саволҳо ҷавоб диҳед.</div>
      <button class="quizbtn" onclick="submitQuiz()">Супоридани тест</button>

      <div class="result" id="result">
        <div class="seal" id="sealMark"></div>
        <div class="score" id="scoreText"></div>
        <div class="msg" id="scoreMsg"></div>
        <button class="retrybtn" id="retryBtn" onclick="retryQuiz()" style="display:none;">Такрори дарс ва тести дубора</button>
      </div>
    </div>
  `;
}

function renderLesson4(){
  const panel = document.getElementById('panel');
  panel.innerHTML = `
    <div class="panel-head">
      <div class="idx">04</div>
      <div class="titles">
        <div class="zh">她是我的汉语老师</div>
        <div class="py">Tā shì wǒ de Hànyǔ lǎoshī</div>
        <div class="en">Ӯ муаллими хитоии ман аст</div>
      </div>
    </div>

    <div class="section-lbl">1. Пиньини дарс ва тарзи пайваст кардан</div>
    <div class="section-sub">Дар ин дарс се мавзӯи муҳим: фарқи чуқуртари zh/ch/sh/r, фарқи бунёди n аз ng, ва қоидаи истифодаи y/w.</div>
    <table class="pytable">
      <tr><th>Ҳарф/бунёд</th><th>Тарзи хондан</th></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">zh, ch, sh, r</td><td>Нӯги забон ба боло печида, ба сақфи пеши даҳон наздик мешавад. zh — бе нафаси қавӣ; ch — бо нафаси қавии зиёд; sh — забон ламс намекунад, фақат тангӣ месозад; r — мисли sh, вале бо ларзиши овоз (садоӣ).</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">n (пеши бинӣ)</td><td>Нӯги забон ба буриши болоӣ такя мекунад, даҳон каме кушода.</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">ng (қафои бинӣ)</td><td>Решаи забон ба сақфи мулоим такя мекунад, даҳон бештар кушода мешавад.</td></tr>
    </table>
    <div class="note"><b>Қоидаи y/w:</b> агар бунёд бо i, u ё ü сар шавад ва ҳиҷо сарҳарф надошта бошад, дар навишт пеш аз он ҳарфи "y" (барои i/ü) ё "w" (барои u) илова мешавад. Масалан: i→yi, in→yin, ia→ya, iu→you; u→wu, ua→wa, ui→wei; ü→yu, üe→yue.</div>

    <div class="section-sub" style="margin-top:14px;"><b>Тамрин</b> — фарқи zh/ch/sh/r ва n/ng-ро гӯш кунед:</div>
    <div class="drillgrid">
      <div class="drillcard">zhīshi<span class="transcript"><br>[чжиши]</span><br><button class="playbtn" onclick="playAudio('l4_drill_zhishi','知识')">&#128266;</button></div>
      <div class="drillcard">rènshi<span class="transcript"><br>[женьши]</span><br><button class="playbtn" onclick="playAudio('l4_drill_renshi','认识')">&#128266;</button></div>
      <div class="drillcard">shēngrì<span class="transcript"><br>[шэнжи]</span><br><button class="playbtn" onclick="playAudio('l4_drill_shengri','生日')">&#128266;</button></div>
      <div class="drillcard">chángshí<span class="transcript"><br>[чханши]</span><br><button class="playbtn" onclick="playAudio('l4_drill_changshi','常识')">&#128266;</button></div>
    </div>

    <div class="section-lbl">2. Талаффуз — қоидаи тағйири оҳанги 一 (yī)</div>
    <table class="pytable">
      <tr><th>Ҳолат</th><th>Мисол</th></tr>
      <tr><td>Пеш аз оҳанги 1, 2 ё 3 — 一 ба оҳанги 4 иваз мешавад</td><td style="font-family:'Noto Serif SC',serif;">yì zhāng, yì tiáo, yì zhǒng</td></tr>
      <tr><td>Пеш аз оҳанги 4 — 一 ба оҳанги 2 иваз мешавад</td><td style="font-family:'Noto Serif SC',serif;">yídìng, yíkuài</td></tr>
      <tr><td>Танҳо истифода шавад ё дар рақам — тағйир НАМЕЁБАД</td><td style="font-family:'Noto Serif SC',serif;">dì yī, yī èr sān, xīngqī yī, shíyī</td></tr>
    </table>
    <div class="section-sub" style="margin-top:14px;"><b>Тамрин</b> — тағйири оҳанги 一-ро гӯш кунед:</div>
    <div class="drillgrid">
      <div class="drillcard">yì zhāng<span class="transcript"><br>[и чжан]</span><br><button class="playbtn" onclick="playAudio('l4_drill_yizhang','一张')">&#128266;</button></div>
      <div class="drillcard">yídìng<span class="transcript"><br>[и дин]</span><br><button class="playbtn" onclick="playAudio('l4_drill_yiding','一定')">&#128266;</button></div>
      <div class="drillcard">dì yī<span class="transcript"><br>[ди и]</span><br><button class="playbtn" onclick="playAudio('l4_drill_diyi','第一')">&#128266;</button></div>
      <div class="drillcard">shíyī<span class="transcript"><br>[ши и]</span><br><button class="playbtn" onclick="playAudio('l4_drill_shiyi','十一')">&#128266;</button></div>
    </div>

    <div class="section-lbl">3. Калимаҳои нав</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('ta1','她')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">她</div><div class="py">tā<span class="transcript"> [та]</span></div><div class="tj">ӯ (духтар/зан)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('shei2','谁')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">谁</div><div class="py">shéi<span class="transcript"> [шэй]</span></div><div class="tj">кӣ (ҷонишини саволӣ)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('de5','的')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">的</div><div class="py">de<span class="transcript"> [дэ]</span></div><div class="tj">аломати тааллуқият (аз они)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('hanyu','汉语')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">汉语</div><div class="py">Hànyǔ<span class="transcript"> [Ханьюй]</span></div><div class="tj">забони хитоӣ</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('na3','哪')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">哪</div><div class="py">nǎ<span class="transcript"> [на]</span></div><div class="tj">кадом</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('guo2','国')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">国</div><div class="py">guó<span class="transcript"> [го]</span></div><div class="tj">кишвар</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('ne5','呢')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">呢</div><div class="py">ne<span class="transcript"> [нэ]</span></div><div class="tj">аломати саволии "-чӣ?"</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('ta1m','他')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">他</div><div class="py">tā<span class="transcript"> [та]</span></div><div class="tj">ӯ (мард)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('tongxue','同学')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">同学</div><div class="py">tóngxué<span class="transcript"> [тхунсюэ]</span></div><div class="tj">ҳамсинф</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('pengyou','朋友')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">朋友</div><div class="py">péngyou<span class="transcript"> [пхэнйоу]</span></div><div class="tj">дӯст</div></div>
    </div>

    <div class="section-lbl">4. Грамматика</div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">1.</span>Ҷонишинҳои саволии <ruby>谁<rt>shéi</rt></ruby> ва <ruby>哪<rt>nǎ</rt></ruby></div>
      <div class="gbody">谁 барои пурсидани номи шахс истифода мешавад — ба ҷои номи одам гузошта мешавад. 哪 маънои "кадом" дорад ва сохташ чунин аст: 哪 + калимаи миқдорӣ/исм + исм.</div>
      <div class="gex"><span class="tag">намуна</span>她是<ruby>谁<rt>shéi</rt></ruby>？ — Ӯ кист?</div>
      <div class="gex"><span class="tag">намуна</span>你是<ruby>哪<rt>nǎ</rt></ruby>国人？ — Шумо аз кадом кишваред?</div>
    </div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">2.</span>Аломати сохторӣ <ruby>的<rt>de</rt></ruby></div>
      <div class="gbody">Сохти "исм/ҷонишин + 的 + исм" тааллуқиятро мефаҳмонад. Агар исми баъд аз 的 калимаи хешовандӣ ё номи шахс бошад, 的 метавонад партофта шавад.</div>
      <div class="gex"><span class="tag">сохт</span>我 + 的 + 汉语老师 = 我的汉语老师 (муаллими хитоии ман)</div>
      <div class="gex"><span class="tag">намуна</span>她不是我同学 (的 партофта шуд, зеро 同学 калимаи шахсист)</div>
    </div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">3.</span>Аломати саволии <ruby>呢<rt>ne</rt></ruby> (1)</div>
      <div class="gbody">呢 баъд аз исм ё ҷонишин гузошта мешавад, то дар бораи ҳамон мавзӯъ дубора пурсад — сохти маъмул: A……。B呢？ (маънои "аммо B-чӣ?")</div>
      <div class="gex"><span class="tag">намуна</span>我是美国人。你<ruby>呢<rt>ne</rt></ruby>？ — Ман амрикоӣ ҳастам. Шумо-чӣ?</div>
    </div>

    <div class="section-lbl">5. Ҷумлаҳо</div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">她是谁？</span><span class="py">Tā shì shéi?</span><span class="transcript">[Та ши шэй?]</span><span class="tj">— Ӯ кист?</span><button class="playbtn inline" onclick="playAudio('l4_q1','她是谁')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">她是我的汉语老师，她叫李月。</span><span class="py">Tā shì wǒ de Hànyǔ lǎoshī, tā jiào Lǐ Yuè.</span><span class="transcript">[Та ши во дэ Ханьюй лаоши, та цзяо Ли Юэ.]</span><span class="tj">— Ӯ муаллими хитоии ман аст, номаш Ли Юэ.</span><button class="playbtn inline" onclick="playAudio('l4_a1','她是我的汉语老师')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">你是哪国人？</span><span class="py">Nǐ shì nǎ guó rén?</span><span class="transcript">[Ни ши на го жэнь?]</span><span class="tj">— Шумо аз кадом кишваред?</span><button class="playbtn inline" onclick="playAudio('l4_q2','你是哪国人')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">我是美国人。你呢？</span><span class="py">Wǒ shì Měiguó rén. Nǐ ne?</span><span class="transcript">[Во ши Мэйго жэнь. Ни нэ?]</span><span class="tj">— Ман амрикоӣ ҳастам. Шумо-чӣ?</span><button class="playbtn inline" onclick="playAudio('l4_a2','我是美国人你呢')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">A:</span><span class="hz">我是中国人。</span><span class="py">Wǒ shì Zhōngguó rén.</span><span class="transcript">[Во ши Чжунго жэнь.]</span><span class="tj">— Ман хитоӣ ҳастам.</span><button class="playbtn inline" onclick="playAudio('l4_a2b','我是中国人')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">他是谁？</span><span class="py">Tā shì shéi?</span><span class="transcript">[Та ши шэй?]</span><span class="tj">— Ӯ (мард) кист?</span><button class="playbtn inline" onclick="playAudio('l4_q3','他是谁')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">他是我同学。</span><span class="py">Tā shì wǒ tóngxué.</span><span class="transcript">[Та ши во тхунсюэ.]</span><span class="tj">— Ӯ ҳамсинфи ман аст.</span><button class="playbtn inline" onclick="playAudio('l4_a3','他是我同学')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">A:</span><span class="hz">她呢？她是你同学吗？</span><span class="py">Tā ne? Tā shì nǐ tóngxué ma?</span><span class="transcript">[Та нэ? Та ши ни тхунсюэ ма?]</span><span class="tj">— Ӯ (зан)-чӣ? Ӯ ҳамсинфи шумост?</span><button class="playbtn inline" onclick="playAudio('l4_q3b','她呢她是你同学吗')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">她不是我同学，她是我朋友。</span><span class="py">Tā bú shì wǒ tóngxué, tā shì wǒ péngyou.</span><span class="transcript">[Та бу ши во тхунсюэ, та ши во пхэнйоу.]</span><span class="tj">— Ӯ ҳамсинфи ман нест, ӯ дӯсти ман аст.</span><button class="playbtn inline" onclick="playAudio('l4_a3b','她不是我同学她是我朋友')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>

    <div class="section-lbl">6. Тартиби навишти ҳарфҳо — аниматсия ва худтамрин</div>
    <div class="section-sub">Ҳарфҳои нави дарси 4. Аввал «Нишон додан»-ро занед, баъд «Худам нависам»-ро.</div>
    <div class="strokegrid" id="strokegrid4">
      <div class="strokecard"><div class="shz">她</div><div class="spy">tā <span class="transcript">[та]</span></div><div class="starget" id="sw4-ta1"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw4-ta1')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw4-ta1')">Худам нависам</button></div>
        <div class="sstatus" id="sw4-ta1-status"></div></div>
      <div class="strokecard"><div class="shz">谁</div><div class="spy">shéi <span class="transcript">[шэй]</span></div><div class="starget" id="sw4-shei"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw4-shei')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw4-shei')">Худам нависам</button></div>
        <div class="sstatus" id="sw4-shei-status"></div></div>
      <div class="strokecard"><div class="shz">的</div><div class="spy">de <span class="transcript">[дэ]</span></div><div class="starget" id="sw4-de"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw4-de')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw4-de')">Худам нависам</button></div>
        <div class="sstatus" id="sw4-de-status"></div></div>
      <div class="strokecard"><div class="shz">汉</div><div class="spy">hàn <span class="transcript">[хань]</span></div><div class="starget" id="sw4-han"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw4-han')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw4-han')">Худам нависам</button></div>
        <div class="sstatus" id="sw4-han-status"></div></div>
      <div class="strokecard"><div class="shz">语</div><div class="spy">yǔ <span class="transcript">[юй]</span></div><div class="starget" id="sw4-yu"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw4-yu')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw4-yu')">Худам нависам</button></div>
        <div class="sstatus" id="sw4-yu-status"></div></div>
      <div class="strokecard"><div class="shz">哪</div><div class="spy">nǎ <span class="transcript">[на]</span></div><div class="starget" id="sw4-na"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw4-na')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw4-na')">Худам нависам</button></div>
        <div class="sstatus" id="sw4-na-status"></div></div>
      <div class="strokecard"><div class="shz">国</div><div class="spy">guó <span class="transcript">[го]</span></div><div class="starget" id="sw4-guo"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw4-guo')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw4-guo')">Худам нависам</button></div>
        <div class="sstatus" id="sw4-guo-status"></div></div>
      <div class="strokecard"><div class="shz">呢</div><div class="spy">ne <span class="transcript">[нэ]</span></div><div class="starget" id="sw4-ne"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw4-ne')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw4-ne')">Худам нависам</button></div>
        <div class="sstatus" id="sw4-ne-status"></div></div>
      <div class="strokecard"><div class="shz">他</div><div class="spy">tā <span class="transcript">[та]</span></div><div class="starget" id="sw4-ta2"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw4-ta2')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw4-ta2')">Худам нависам</button></div>
        <div class="sstatus" id="sw4-ta2-status"></div></div>
      <div class="strokecard"><div class="shz">同</div><div class="spy">tóng <span class="transcript">[тхун]</span></div><div class="starget" id="sw4-tong"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw4-tong')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw4-tong')">Худам нависам</button></div>
        <div class="sstatus" id="sw4-tong-status"></div></div>
      <div class="strokecard"><div class="shz">朋</div><div class="spy">péng <span class="transcript">[пхэн]</span></div><div class="starget" id="sw4-peng"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw4-peng')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw4-peng')">Худам нависам</button></div>
        <div class="sstatus" id="sw4-peng-status"></div></div>
      <div class="strokecard"><div class="shz">友</div><div class="spy">yǒu <span class="transcript">[йоу]</span></div><div class="starget" id="sw4-you"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw4-you')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw4-you')">Худам нависам</button></div>
        <div class="sstatus" id="sw4-you-status"></div></div>
    </div>

    <div class="section-lbl">7. Аломатҳои асосии навишт (笔画)</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('s_shuwangou','竖弯钩')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">乚</div><div class="py">shùwāngōu<span class="transcript"> [шувангоу]</span> — амудӣ-каҷ-қалмоқ</div><div class="tj">амудӣ поён рафта, ба рост каҷ мешавад ва дар охир қалмоқ мекунад. Мисол: 七 (ҳафт), 儿 (писар)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('s_hengzhewangou','横折弯钩')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">乙</div><div class="py">héngzhéwāngōu<span class="transcript"> [хэнчжэвангоу]</span> — уфуқӣ-хамида-каҷ-қалмоқ</div><div class="tj">уфуқӣ, баъд ба поён мехамад, каҷ мешавад ва қалмоқ мекунад. Мисол: 九 (нӯҳ), 几 (чанд)</div></div>
    </div>

    <div class="section-lbl">8. Ҳарфҳои якҷузъа (独体字) — намунаҳои китоб</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_qi','七')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">七</div><div class="py">qī <span class="transcript">[тси]</span></div><div class="tj">ҳафт</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_er','儿')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">儿</div><div class="py">ér <span class="transcript">[эр]</span></div><div class="tj">пештар маънои "бача" дошт, ҳоло бештар "писар"-ро мефаҳмонад</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_ji','几')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">几</div><div class="py">jǐ <span class="transcript">[цзи]</span></div><div class="tj">пештар мизчаи хурди пастак буд, ҳоло "чанд" маъно дорад</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_jiu','九')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">九</div><div class="py">jiǔ <span class="transcript">[цзиу]</span></div><div class="tj">нӯҳ</div></div>
    </div>
    <div class="note"><b>Қоидаи тартиби навишт:</b> аз боло ба поён (从上到下) — мисол: 二, 三. Аз чап ба рост (从左到右) — мисол: 几, 八.</div>

    <button class="quizbtn" onclick="showQuiz()">Гузаштани тест &#8594;</button>

    <div class="qwrap" id="qwrap">
      <div class="section-lbl" style="margin-top:32px;">Тести дарси 4 (10 савол)</div>
      <div class="qcard"><div class="q">1. 她是谁？ маънояш чист?</div><div class="opts">
        <label><input type="radio" name="q1" value="wrong">Ӯ аз куҷост?</label>
        <label><input type="radio" name="q1" value="right">Ӯ кист?</label>
        <label><input type="radio" name="q1" value="wrong">Ин чист?</label>
      </div></div>
      <div class="qcard"><div class="q">2. Фарқи 他 ва 她 дар чист?</div><div class="opts">
        <label><input type="radio" name="q2" value="wrong">Якхела, фарқ надоранд</label>
        <label><input type="radio" name="q2" value="right">他 барои мард, 她 барои зан</label>
        <label><input type="radio" name="q2" value="wrong">他 барои якка, 她 барои ҷамъ</label>
      </div></div>
      <div class="qcard"><div class="q">3. 的 кадом вазифаро иҷро мекунад?</div><div class="opts">
        <label><input type="radio" name="q3" value="right">Тааллуқиятро нишон медиҳад (аз они)</label>
        <label><input type="radio" name="q3" value="wrong">Ҷумларо ба саволӣ табдил медиҳад</label>
        <label><input type="radio" name="q3" value="wrong">Инкор мекунад</label>
      </div></div>
      <div class="qcard"><div class="q">4. Дар ҷумлаи "我是美国人。你呢？" калимаи 呢 чӣ вазифа дорад?</div><div class="opts">
        <label><input type="radio" name="q4" value="wrong">Тааллуқиятро нишон медиҳад</label>
        <label><input type="radio" name="q4" value="right">Ҳамон саволро такрор мекунад ("шумо-чӣ?")</label>
        <label><input type="radio" name="q4" value="wrong">Инкор мекунад</label>
      </div></div>
      <div class="qcard"><div class="q">5. 汉语 маънояш чист?</div><div class="opts">
        <label><input type="radio" name="q5" value="wrong">Хитой (кишвар)</label>
        <label><input type="radio" name="q5" value="right">Забони хитоӣ</label>
        <label><input type="radio" name="q5" value="wrong">Муаллими хитоӣ</label>
      </div></div>
      <div class="qcard"><div class="q">6. Сохти дурусти "哪" дар савол кадом аст?</div><div class="opts">
        <label><input type="radio" name="q6" value="right">哪 + калимаи миқдорӣ/исм + исм</label>
        <label><input type="radio" name="q6" value="wrong">исм + 哪</label>
        <label><input type="radio" name="q6" value="wrong">哪 танҳо истифода мешавад</label>
      </div></div>
      <div class="qcard"><div class="q">7. "一" (yī) пеш аз калимаи оҳанги 4 (мисли 定) чӣ гуна тағйир меёбад?</div><div class="opts">
        <label><input type="radio" name="q7" value="wrong">Ба оҳанги 4 иваз мешавад</label>
        <label><input type="radio" name="q7" value="right">Ба оҳанги 2 иваз мешавад (yídìng)</label>
        <label><input type="radio" name="q7" value="wrong">Тағйир намеёбад</label>
      </div></div>
      <div class="qcard"><div class="q">8. Кадоме дуруст навишта шудааст: "u" бе сарҳарф дар аввали калима?</div><div class="opts">
        <label><input type="radio" name="q8" value="wrong">u (бе тағйир)</label>
        <label><input type="radio" name="q8" value="right">wu (бо "w")</label>
        <label><input type="radio" name="q8" value="wrong">yu</label>
      </div></div>
      <div class="qcard"><div class="q">9. 朋友 маънояш чист?</div><div class="opts">
        <label><input type="radio" name="q9" value="wrong">Ҳамсинф</label>
        <label><input type="radio" name="q9" value="right">Дӯст</label>
        <label><input type="radio" name="q9" value="wrong">Муаллим</label>
      </div></div>
      <div class="qcard"><div class="q">10. Ҳарфи 几 пештар чӣ маъно дошт?</div><div class="opts">
        <label><input type="radio" name="q10" value="wrong">Ҳафт</label>
        <label><input type="radio" name="q10" value="right">Мизчаи хурди пастак</label>
        <label><input type="radio" name="q10" value="wrong">Бача</label>
      </div></div>
      <div id="qerror" style="display:none;color:var(--seal);font-size:13px;margin-bottom:10px;">Ба ҳамаи саволҳо ҷавоб диҳед.</div>
      <button class="quizbtn" onclick="submitQuiz()">Супоридани тест</button>

      <div class="result" id="result">
        <div class="seal" id="sealMark"></div>
        <div class="score" id="scoreText"></div>
        <div class="msg" id="scoreMsg"></div>
        <button class="retrybtn" id="retryBtn" onclick="retryQuiz()" style="display:none;">Такрори дарс ва тести дубора</button>
      </div>
    </div>
  `;
}


function renderLesson5(){
  const panel = document.getElementById('panel');
  panel.innerHTML = `
    <div class="panel-head">
      <div class="idx">05</div>
      <div class="titles">
        <div class="zh">她女儿今年二十岁</div>
        <div class="py">Tā nǚ'ér jīnnián èrshí suì</div>
        <div class="en">Духтари ӯ имсол бисту солаг аст</div>
      </div>
    </div>

    <div class="section-lbl">1. Пиньини дарс ва тарзи пайваст кардан</div>
    <div class="section-sub">Дар ин дарс мавзӯи махсус — <b>儿化 (эрхуа)</b> — вақте 儿 бо ҳиҷои пеш якҷоя мешавад ва садои "р"-монанд ба охир зам мешавад.</div>
    <table class="pytable">
      <tr><th>Мавзӯъ</th><th>Шарҳ</th></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">儿化 (érhuà)</td><td>Ҳарфи 儿 бо ҳиҷои пеш якҷоя садо медиҳад: дар навишти ҳарфҳо ҳамчун "ҳарф+儿" менависанд, дар пиньин бошад ба охири ҳиҷо танҳо "r" илова мекунанд. Масалан: 小孩儿 = xiǎoháir (на xiǎohái + ér алоҳида).</td></tr>
    </table>
    <div class="section-sub" style="margin-top:14px;"><b>Мисолҳои эрхуа</b> — гӯш кунед:</div>
    <div class="drillgrid">
      <div class="drillcard">xiǎoháir<span class="transcript"><br>[сяохар]</span><br><button class="playbtn" onclick="playAudio('l5_drill_xiaohair','小孩儿')">&#128266;</button></div>
      <div class="drillcard">xiǎo niǎor<span class="transcript"><br>[сяо няор]</span><br><button class="playbtn" onclick="playAudio('l5_drill_xiaoniaor','小鸟儿')">&#128266;</button></div>
      <div class="drillcard">fànguǎnr<span class="transcript"><br>[фангуанр]</span><br><button class="playbtn" onclick="playAudio('l5_drill_fanguanr','饭馆儿')">&#128266;</button></div>
      <div class="drillcard">xiāngshuǐr<span class="transcript"><br>[сянхшуйр]</span><br><button class="playbtn" onclick="playAudio('l5_drill_xiangshuir','香水儿')">&#128266;</button></div>
    </div>
    <div class="note"><b>Аломати ҷудокунӣ (隔音符号):</b> агар ҳиҷои дуюм бо a, o ё e сар шавад ва баъд аз ҳиҷои дигар ояд, барои ҷудо кардани ду ҳиҷо аломати (') истифода мешавад — масалан pí'ǎo (皮袄), на "pião". Ин пеши омехта шудани ду ҳиҷоро мегирад.</div>

    <div class="section-lbl">2. Талаффуз — нафаси қавӣ ва бе қавӣ</div>
    <div class="section-sub">Дар хитоӣ ҷуфти сарҳарфҳо ҳастанд, ки ҷои забонашон якхела аст, вале яке бо нафаси қавӣ ва дигаре бе он талаффуз мешавад:</div>
    <table class="pytable">
      <tr><th>Бе нафаси қавӣ</th><th>Бо нафаси қавӣ</th></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">b</td><td style="font-family:'Noto Serif SC',serif;">p</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">d</td><td style="font-family:'Noto Serif SC',serif;">t</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">g</td><td style="font-family:'Noto Serif SC',serif;">k</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">j</td><td style="font-family:'Noto Serif SC',serif;">q</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">z</td><td style="font-family:'Noto Serif SC',serif;">c</td></tr>
      <tr><td style="font-family:'Noto Serif SC',serif;">zh</td><td style="font-family:'Noto Serif SC',serif;">ch</td></tr>
    </table>
    <div class="note">Барои санҷидан: дасти худро пеши даҳон гузоред — ҳангоми талаффузи ҳарфи "бо нафас" (p, t, k, q, c, ch) бояд нафаси равшан ҳис кунед; ҳангоми "бе нафас" (b, d, g, j, z, zh) не.</div>

    <div class="section-lbl">3. Калимаҳои нав</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('jia1','家')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">家</div><div class="py">jiā<span class="transcript"> [цзя]</span></div><div class="tj">оила, хона</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('you3','有')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">有</div><div class="py">yǒu<span class="transcript"> [йоу]</span></div><div class="tj">доштан, будан</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('kou3','口')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">口</div><div class="py">kǒu<span class="transcript"> [коу]</span></div><div class="tj">калимаи миқдорӣ барои аъзои оила</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('nver','女儿')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">女儿</div><div class="py">nǚ'ér<span class="transcript"> [нюйар]</span></div><div class="tj">духтар</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('ji3','几')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">几</div><div class="py">jǐ<span class="transcript"> [цзи]</span></div><div class="tj">чанд (барои ададҳои хурд)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sui4','岁')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">岁</div><div class="py">suì<span class="transcript"> [суй]</span></div><div class="tj">сол (синну сол)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('le5','了')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">了</div><div class="py">le<span class="transcript"> [лэ]</span></div><div class="tj">нишонаи тағйирот/ҳолати нав</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('jinnian','今年')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">今年</div><div class="py">jīnnián<span class="transcript"> [цзиньниен]</span></div><div class="tj">имсол</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('duo1','多')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">多</div><div class="py">duō<span class="transcript"> [дуо]</span></div><div class="tj">чӣ қадар (дараҷа)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('da4','大')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">大</div><div class="py">dà<span class="transcript"> [да]</span></div><div class="tj">калон (дар бораи синну сол)</div></div>
    </div>

    <div class="section-lbl">4. Грамматика</div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">1.</span>Ҷонишини саволии <ruby>几<rt>jǐ</rt></ruby></div>
      <div class="gbody">几 барои пурсидани миқдор истифода мешавад, одатан барои ададҳои аз 10 хурд.</div>
      <div class="gex"><span class="tag">намуна</span>你家有<ruby>几<rt>jǐ</rt></ruby>口人？ — Оилаи шумо чанд нафар аст?</div>
      <div class="gex"><span class="tag">намуна</span>你女儿<ruby>几<rt>jǐ</rt></ruby>岁了？ — Духтари шумо чанд сола аст?</div>
    </div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">2.</span>Ададҳо то 100</div>
      <div class="gbody">Даҳгонаҳо: 十(10), 二十(20), 三十(30) … 九十(90). Барои ададҳои дигар, воҳид баъд аз даҳгона илова мешавад: 二十三 (23) = 二十(20)+三(3); 五十六 (56) = 五十(50)+六(6).</div>
      <div class="gex"><span class="tag">намуна</span>二十三 (èrshísān) = 23; 五十六 (wǔshíliù) = 56</div>
    </div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">3.</span>Аломати тағйирот <ruby>了<rt>le</rt></ruby></div>
      <div class="gbody">了 дар охири ҷумла гузошта мешавад, то тағйирот ё пайдоиши ҳолати нав нишон диҳад — масалан синну соле, ки акнун расидааст.</div>
      <div class="gex"><span class="tag">намуна</span>李老师今年50岁<ruby>了<rt>le</rt></ruby>。 — Муаллим Ли имсол 50-сола шуд.</div>
    </div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">4.</span>Ибораи саволии <ruby>多<rt>duō</rt></ruby>+<ruby>大<rt>dà</rt></ruby></div>
      <div class="gbody">多+大 якҷоя барои пурсидани синну сол истифода мешавад, маънои таҳтуллафзиаш "чӣ қадар калон" аст.</div>
      <div class="gex"><span class="tag">намуна</span>你<ruby>多大<rt>duō dà</rt></ruby>了？ — Шумо чанд сола ҳастед?</div>
    </div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">Фарҳанг:</span>Тарзи пурсидани синну сол дар Хитой</div>
      <div class="gbody">Дар фарҳанги хитоӣ, синну сол сирри шахсӣ ҳисоб намешавад, вале тарзи пурсидан вобаста ба синну соли шахс фарқ мекунад: ба кӯдакони то 10-сола — 你今年几岁了? ба ҳамсолон ё ҷавонон — 你今年多大了? ба калонсолон бошад, аз рӯи эҳтиром — 您今年多大年纪了?</div>
    </div>

    <div class="section-lbl">5. Ҷумлаҳо</div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">你家有几口人？</span><span class="py">Nǐ jiā yǒu jǐ kǒu rén?</span><span class="transcript">[Ни цзя йоу цзи коу жэнь?]</span><span class="tj">— Оилаи шумо чанд нафар аст?</span><button class="playbtn inline" onclick="playAudio('l5_q1','你家有几口人')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">我家有三口人。</span><span class="py">Wǒ jiā yǒu sān kǒu rén.</span><span class="transcript">[Во цзя йоу сань коу жэнь.]</span><span class="tj">— Оилаи ман се нафар аст.</span><button class="playbtn inline" onclick="playAudio('l5_a1','我家有三口人')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">你女儿几岁了？</span><span class="py">Nǐ nǚ'ér jǐ suì le?</span><span class="transcript">[Ни нюйар цзи суй лэ?]</span><span class="tj">— Духтари шумо чанд сола аст?</span><button class="playbtn inline" onclick="playAudio('l5_q2','你女儿几岁了')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">她今年四岁了。</span><span class="py">Tā jīnnián sì suì le.</span><span class="transcript">[Та цзиньниен сы суй лэ.]</span><span class="tj">— Ӯ имсол чорсола шуд.</span><button class="playbtn inline" onclick="playAudio('l5_a2','她今年四岁了')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">李老师多大了？</span><span class="py">Lǐ lǎoshī duō dà le?</span><span class="transcript">[Ли лаоши дуо да лэ?]</span><span class="tj">— Муаллим Ли чанд сола аст?</span><button class="playbtn inline" onclick="playAudio('l5_q3','李老师多大了')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">她今年50岁了。她女儿呢？</span><span class="py">Tā jīnnián wǔshí suì le. Tā nǚ'ér ne?</span><span class="transcript">[Та цзиньниен уши суй лэ. Та нюйар нэ?]</span><span class="tj">— Ӯ имсол 50-сола шуд. Духтараш-чӣ?</span><button class="playbtn inline" onclick="playAudio('l5_a3','她今年50岁了')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">A:</span><span class="hz">她女儿今年20岁。</span><span class="py">Tā nǚ'ér jīnnián èrshí suì.</span><span class="transcript">[Та нюйар цзиньниен эрши суй.]</span><span class="tj">— Духтараш имсол 20-сола аст.</span><button class="playbtn inline" onclick="playAudio('l5_a3b','她女儿今年20岁')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>

    <div class="section-lbl">6. Тартиби навишти ҳарфҳо — аниматсия ва худтамрин</div>
    <div class="section-sub">Ҳарфҳои нави дарси 5. Аввал «Нишон додан»-ро занед, баъд «Худам нависам»-ро.</div>
    <div class="strokegrid" id="strokegrid5">
      <div class="strokecard"><div class="shz">家</div><div class="spy">jiā <span class="transcript">[цзя]</span></div><div class="starget" id="sw5-jia"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw5-jia')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw5-jia')">Худам нависам</button></div>
        <div class="sstatus" id="sw5-jia-status"></div></div>
      <div class="strokecard"><div class="shz">有</div><div class="spy">yǒu <span class="transcript">[йоу]</span></div><div class="starget" id="sw5-you"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw5-you')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw5-you')">Худам нависам</button></div>
        <div class="sstatus" id="sw5-you-status"></div></div>
      <div class="strokecard"><div class="shz">口</div><div class="spy">kǒu <span class="transcript">[коу]</span></div><div class="starget" id="sw5-kou"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw5-kou')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw5-kou')">Худам нависам</button></div>
        <div class="sstatus" id="sw5-kou-status"></div></div>
      <div class="strokecard"><div class="shz">女</div><div class="spy">nǚ <span class="transcript">[нюй]</span></div><div class="starget" id="sw5-nv"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw5-nv')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw5-nv')">Худам нависам</button></div>
        <div class="sstatus" id="sw5-nv-status"></div></div>
      <div class="strokecard"><div class="shz">儿</div><div class="spy">ér <span class="transcript">[ар]</span></div><div class="starget" id="sw5-er"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw5-er')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw5-er')">Худам нависам</button></div>
        <div class="sstatus" id="sw5-er-status"></div></div>
      <div class="strokecard"><div class="shz">几</div><div class="spy">jǐ <span class="transcript">[цзи]</span></div><div class="starget" id="sw5-ji"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw5-ji')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw5-ji')">Худам нависам</button></div>
        <div class="sstatus" id="sw5-ji-status"></div></div>
      <div class="strokecard"><div class="shz">岁</div><div class="spy">suì <span class="transcript">[суй]</span></div><div class="starget" id="sw5-sui"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw5-sui')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw5-sui')">Худам нависам</button></div>
        <div class="sstatus" id="sw5-sui-status"></div></div>
      <div class="strokecard"><div class="shz">了</div><div class="spy">le <span class="transcript">[лэ]</span></div><div class="starget" id="sw5-le"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw5-le')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw5-le')">Худам нависам</button></div>
        <div class="sstatus" id="sw5-le-status"></div></div>
      <div class="strokecard"><div class="shz">今</div><div class="spy">jīn <span class="transcript">[цзинь]</span></div><div class="starget" id="sw5-jin"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw5-jin')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw5-jin')">Худам нависам</button></div>
        <div class="sstatus" id="sw5-jin-status"></div></div>
      <div class="strokecard"><div class="shz">年</div><div class="spy">nián <span class="transcript">[ниен]</span></div><div class="starget" id="sw5-nian"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw5-nian')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw5-nian')">Худам нависам</button></div>
        <div class="sstatus" id="sw5-nian-status"></div></div>
      <div class="strokecard"><div class="shz">多</div><div class="spy">duō <span class="transcript">[дуо]</span></div><div class="starget" id="sw5-duo"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw5-duo')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw5-duo')">Худам нависам</button></div>
        <div class="sstatus" id="sw5-duo-status"></div></div>
      <div class="strokecard"><div class="shz">大</div><div class="spy">dà <span class="transcript">[да]</span></div><div class="starget" id="sw5-da"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw5-da')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw5-da')">Худам нависам</button></div>
        <div class="sstatus" id="sw5-da-status"></div></div>
    </div>

    <div class="section-lbl">7. Аломатҳои асосии навишт (笔画)</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('s_hengpie','横撇')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">㇇</div><div class="py">héngpiě<span class="transcript"> [хэнпье]</span> — уфуқӣ-чапи поёнӣ</div><div class="tj">аввал уфуқӣ, баъд ба чапи поён мехамад. Мисол: 水 (об), 又 (боз)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('s_piedian','撇点')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">㇘</div><div class="py">piědiǎn<span class="transcript"> [пьедиен]</span> — чапи поёнӣ-нуқта</div><div class="tj">чапи поёнӣ, баъд бо нуқта анҷом меёбад. Мисол: 女 (зан), 好 (хуб)</div></div>
    </div>

    <div class="section-lbl">8. Ҳарфҳои якҷузъа (独体字) — намунаҳои китоб</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_shui','水')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">水</div><div class="py">shuǐ <span class="transcript">[шуй]</span></div><div class="tj">об — шаклаш ба ҷӯйи кӯҳӣ монанд буд</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_nv','女')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">女</div><div class="py">nǚ <span class="transcript">[нюй]</span></div><div class="tj">зан — шаклаш ба зани дар замин зонузада монанд буд</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_le','了')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">了</div><div class="py">le <span class="transcript">[лэ]</span></div><div class="tj">пештар шакли кӯдаки навзод буд, ҳоло калимаи ёридиҳанда аст</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_da','大')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">大</div><div class="py">dà <span class="transcript">[да]</span></div><div class="tj">калон — шаклаш ба одами дастпояш кушода истода монанд буд, муқобили "хурд"</div></div>
    </div>
    <div class="note"><b>Қоидаи тартиби навишт:</b> аввал беруна, баъд дарун (先外后内) — мисол: 四, 国. Аввал миёна, баъд ду тараф (先中间后两边) — мисол: 小, 水.</div>

    <button class="quizbtn" onclick="showQuiz()">Гузаштани тест &#8594;</button>

    <div class="qwrap" id="qwrap">
      <div class="section-lbl" style="margin-top:32px;">Тести дарси 5 (10 савол)</div>
      <div class="qcard"><div class="q">1. 你家有几口人？ маънояш чист?</div><div class="opts">
        <label><input type="radio" name="q1" value="wrong">Шумо чанд сола ҳастед?</label>
        <label><input type="radio" name="q1" value="right">Оилаи шумо чанд нафар аст?</label>
        <label><input type="radio" name="q1" value="wrong">Шумо аз кадом кишваред?</label>
      </div></div>
      <div class="qcard"><div class="q">2. Калимаи 岁 барои чӣ истифода мешавад?</div><div class="opts">
        <label><input type="radio" name="q2" value="wrong">Барои шумориши одамон</label>
        <label><input type="radio" name="q2" value="right">Барои синну сол</label>
        <label><input type="radio" name="q2" value="wrong">Барои китобҳо</label>
      </div></div>
      <div class="qcard"><div class="q">3. 五十六 (wǔshíliù) кадом рақам аст?</div><div class="opts">
        <label><input type="radio" name="q3" value="wrong">15</label>
        <label><input type="radio" name="q3" value="right">56</label>
        <label><input type="radio" name="q3" value="wrong">65</label>
      </div></div>
      <div class="qcard"><div class="q">4. 了 дар охири ҷумла чӣ маъно дорад?</div><div class="opts">
        <label><input type="radio" name="q4" value="right">Тағйирот ё ҳолати нав</label>
        <label><input type="radio" name="q4" value="wrong">Инкор</label>
        <label><input type="radio" name="q4" value="wrong">Савол</label>
      </div></div>
      <div class="qcard"><div class="q">5. Барои пурсидани синну сол кадом ибора истифода мешавад?</div><div class="opts">
        <label><input type="radio" name="q5" value="wrong">哪国人</label>
        <label><input type="radio" name="q5" value="right">多大</label>
        <label><input type="radio" name="q5" value="wrong">什么名字</label>
      </div></div>
      <div class="qcard"><div class="q">6. Ба калонсолон бо эҳтиром синну солашонро чӣ гуна мепурсанд?</div><div class="opts">
        <label><input type="radio" name="q6" value="wrong">你今年几岁了？</label>
        <label><input type="radio" name="q6" value="right">您今年多大年纪了？</label>
        <label><input type="radio" name="q6" value="wrong">你叫什么名字？</label>
      </div></div>
      <div class="qcard"><div class="q">7. 儿化 (эрхуа) чист?</div><div class="opts">
        <label><input type="radio" name="q7" value="right">Ҳамроҳ шудани 儿 бо ҳиҷои пеш ва садои "р" дар охир</label>
        <label><input type="radio" name="q7" value="wrong">Қоидаи тағйири оҳанг</label>
        <label><input type="radio" name="q7" value="wrong">Аломати саволӣ</label>
      </div></div>
      <div class="qcard"><div class="q">8. Кадоме аз ин ҷуфтҳо "бе нафаси қавӣ — бо нафаси қавӣ" аст?</div><div class="opts">
        <label><input type="radio" name="q8" value="right">b — p</label>
        <label><input type="radio" name="q8" value="wrong">m — n</label>
        <label><input type="radio" name="q8" value="wrong">l — r</label>
      </div></div>
      <div class="qcard"><div class="q">9. 女儿 маънояш чист?</div><div class="opts">
        <label><input type="radio" name="q9" value="wrong">Писар</label>
        <label><input type="radio" name="q9" value="right">Духтар</label>
        <label><input type="radio" name="q9" value="wrong">Дугона</label>
      </div></div>
      <div class="qcard"><div class="q">10. Ҳарфи 大 муқобили кадом ҳарф аст?</div><div class="opts">
        <label><input type="radio" name="q10" value="right">小 (хурд)</label>
        <label><input type="radio" name="q10" value="wrong">多 (бисёр)</label>
        <label><input type="radio" name="q10" value="wrong">好 (хуб)</label>
      </div></div>
      <div id="qerror" style="display:none;color:var(--seal);font-size:13px;margin-bottom:10px;">Ба ҳамаи саволҳо ҷавоб диҳед.</div>
      <button class="quizbtn" onclick="submitQuiz()">Супоридани тест</button>

      <div class="result" id="result">
        <div class="seal" id="sealMark"></div>
        <div class="score" id="scoreText"></div>
        <div class="msg" id="scoreMsg"></div>
        <button class="retrybtn" id="retryBtn" onclick="retryQuiz()" style="display:none;">Такрори дарс ва тести дубора</button>
      </div>
    </div>
  `;
}

function renderLesson6(){
  const panel = document.getElementById('panel');
  panel.innerHTML = `
    <div class="panel-head">
      <div class="idx">06</div>
      <div class="titles">
        <div class="zh">我会说汉语</div>
        <div class="py">Wǒ huì shuō Hànyǔ</div>
        <div class="en">Ман хитоӣ гап зада метавонам</div>
      </div>
    </div>

    <div class="section-lbl">1. Пиньини дарс — оҳангсозии калимаҳои дуҳиҷоӣ</div>
    <div class="section-sub">Дар ин дарс мавзӯи муҳим: вақте ду ҳиҷо якҷоя меоянд, оҳанги 1 бо оҳангҳои дигар чӣ гуна ҷуфт мешавад. Мисол: kāfēi (1+1), gōngyuán (1+2), jīchǎng (1+3), chēzhàn (1+4).</div>
    <div class="note"><b>Диққат:</b> оҳанги 3 дар ҷуфти калима на мисли оҳанги 3-и танҳо (фуру-боло) хонда мешавад — қисми охираш боло намеравад, танҳо поён меафтад (мисли 2-1-1). Барои ҳамин jīchǎng бо оҳанги "паст" хонда мешавад, на бо баланд шудани охир.</div>
    <div class="section-sub" style="margin-top:14px;"><b>Тамрин</b> — оҳангсозии 1+... -ро гӯш кунед:</div>
    <div class="drillgrid">
      <div class="drillcard">kāfēi<span class="transcript"><br>[кхафэй]</span><br><button class="playbtn" onclick="playAudio('l6_drill_kafei','咖啡')">&#128266;</button></div>
      <div class="drillcard">gōngyuán<span class="transcript"><br>[гунйуэн]</span><br><button class="playbtn" onclick="playAudio('l6_drill_gongyuan','公园')">&#128266;</button></div>
      <div class="drillcard">jīchǎng<span class="transcript"><br>[цзичхан]</span><br><button class="playbtn" onclick="playAudio('l6_drill_jichang','机场')">&#128266;</button></div>
      <div class="drillcard">chēzhàn<span class="transcript"><br>[чхэчжань]</span><br><button class="playbtn" onclick="playAudio('l6_drill_chezhan','车站')">&#128266;</button></div>
      <div class="drillcard">jīntiān<span class="transcript"><br>[цзиньтхиен]</span><br><button class="playbtn" onclick="playAudio('l6_drill_jintian','今天')">&#128266;</button></div>
      <div class="drillcard">gōngsī<span class="transcript"><br>[гунсы]</span><br><button class="playbtn" onclick="playAudio('l6_drill_gongsi','公司')">&#128266;</button></div>
      <div class="drillcard">jīdàn<span class="transcript"><br>[цзидань]</span><br><button class="playbtn" onclick="playAudio('l6_drill_jidan','鸡蛋')">&#128266;</button></div>
      <div class="drillcard">kāishǐ<span class="transcript"><br>[кхайши]</span><br><button class="playbtn" onclick="playAudio('l6_drill_kaishi','开始')">&#128266;</button></div>
    </div>

    <div class="section-lbl">2. Калимаҳои нав</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('hui4','会')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">会</div><div class="py">huì<span class="transcript"> [хуй]</span></div><div class="tj">тавонистан (бо омӯзиш ба даст омада)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('shuo1','说')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">说</div><div class="py">shuō<span class="transcript"> [шуо]</span></div><div class="tj">гуфтан, гап задан</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('mama5','妈妈')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">妈妈</div><div class="py">māma<span class="transcript"> [мама]</span></div><div class="tj">модар</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('cai4','菜')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">菜</div><div class="py">cài<span class="transcript"> [цхай]</span></div><div class="tj">хӯрок, таом</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('hen3','很')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">很</div><div class="py">hěn<span class="transcript"> [хэнь]</span></div><div class="tj">хеле, бисёр</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('haochi3','好吃')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">好吃</div><div class="py">hǎochī<span class="transcript"> [хаочхи]</span></div><div class="tj">бомазза</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('zuo4','做')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">做</div><div class="py">zuò<span class="transcript"> [цзуо]</span></div><div class="tj">тайёр кардан, кор кардан</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('xie3','写')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">写</div><div class="py">xiě<span class="transcript"> [сйе]</span></div><div class="tj">навиштан</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('hanzi4','汉字')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">汉字</div><div class="py">Hànzì<span class="transcript"> [Ханьцзы]</span></div><div class="tj">ҳарфи хитоӣ</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('zi4','字')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">字</div><div class="py">zì<span class="transcript"> [цзы]</span></div><div class="tj">ҳарф, калима</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('zenme3','怎么')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">怎么</div><div class="py">zěnme<span class="transcript"> [цзэньмэ]</span></div><div class="tj">чӣ гуна</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('du2','读')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">读</div><div class="py">dú<span class="transcript"> [ду]</span></div><div class="tj">хондан</div></div>
    </div>

    <div class="section-lbl">3. Грамматика</div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">1.</span>Феъли модалии <ruby>会<rt>huì</rt></ruby> (1)</div>
      <div class="gbody">会 пеш аз феъл гузошта мешавад ва маънои қобилиятеро мефаҳмонад, ки тавассути омӯзиш ба даст омадааст. Шакли инкорӣ: 不会.</div>
      <div class="gex"><span class="tag">сохт</span>Мубтадо + (不)会 + феъл</div>
      <div class="gex"><span class="tag">намуна</span>我<ruby>会<rt>huì</rt></ruby>写汉字。 — Ман хат навишта метавонам.</div>
      <div class="gex"><span class="tag">намуна</span>我<ruby>不会<rt>bú huì</rt></ruby>做中国菜。 — Ман хӯроки хитоӣ пухта наметавонам.</div>
    </div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">2.</span>Ҷумлаи бо хабари сифатӣ</div>
      <div class="gbody">Сифат метавонад дар сохти "мубтадо + зарфи дараҷа + сифат" ҳолат ё сифати чизе/касеро тасвир кунад — зарфи дараҷа бештар 很 (хеле) мешавад. Шакли инкорӣ: мубтадо + 不 + сифат (бе 很).</div>
      <div class="gex"><span class="tag">намуна</span>中国菜<ruby>很<rt>hěn</rt></ruby>好吃。 — Хӯроки хитоӣ хеле бомазза аст.</div>
      <div class="gex"><span class="tag">намуна</span>我妈妈的汉语<ruby>不<rt>bù</rt></ruby>好。 — Хитоии модари ман хуб нест.</div>
    </div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">3.</span>Ҷонишини саволии <ruby>怎么<rt>zěnme</rt></ruby> (1)</div>
      <div class="gbody">怎么 пеш аз феъл гузошта мешавад ва тарзи иҷрои амалро мепурсад — маънои "чӣ гуна".</div>
      <div class="gex"><span class="tag">намуна</span>这个汉字<ruby>怎么<rt>zěnme</rt></ruby>读？ — Ин ҳарф чӣ гуна хонда мешавад?</div>
    </div>

    <div class="section-lbl">4. Ҷумлаҳо</div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">你会说汉语吗？</span><span class="py">Nǐ huì shuō Hànyǔ ma?</span><span class="transcript">[Ни хуй шуо Ханьюй ма?]</span><span class="tj">— Шумо хитоӣ гап зада метавонед?</span><button class="playbtn inline" onclick="playAudio('l6_q1','你会说汉语吗')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">我会说汉语。</span><span class="py">Wǒ huì shuō Hànyǔ.</span><span class="transcript">[Во хуй шуо Ханьюй.]</span><span class="tj">— Ман хитоӣ гап зада метавонам.</span><button class="playbtn inline" onclick="playAudio('l6_a1','我会说汉语')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">A:</span><span class="hz">你妈妈会说汉语吗？</span><span class="py">Nǐ māma huì shuō Hànyǔ ma?</span><span class="transcript">[Ни мама хуй шуо Ханьюй ма?]</span><span class="tj">— Модари шумо хитоӣ гап зада метавонад?</span><button class="playbtn inline" onclick="playAudio('l6_q1b','你妈妈会说汉语吗')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">她不会说。</span><span class="py">Tā bú huì shuō.</span><span class="transcript">[Та бу хуй шуо.]</span><span class="tj">— Ӯ гап зада наметавонад.</span><button class="playbtn inline" onclick="playAudio('l6_a1b','她不会说')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">中国菜好吃吗？</span><span class="py">Zhōngguó cài hǎochī ma?</span><span class="transcript">[Чжунго цхай хаочхи ма?]</span><span class="tj">— Хӯроки хитоӣ бомазза аст?</span><button class="playbtn inline" onclick="playAudio('l6_q2','中国菜好吃吗')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">中国菜很好吃。</span><span class="py">Zhōngguó cài hěn hǎochī.</span><span class="transcript">[Чжунго цхай хэнь хаочхи.]</span><span class="tj">— Хӯроки хитоӣ хеле бомазза аст.</span><button class="playbtn inline" onclick="playAudio('l6_a2','中国菜很好吃')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">A:</span><span class="hz">你会做中国菜吗？</span><span class="py">Nǐ huì zuò Zhōngguó cài ma?</span><span class="transcript">[Ни хуй цзуо Чжунго цхай ма?]</span><span class="tj">— Шумо хӯроки хитоӣ пухта метавонед?</span><button class="playbtn inline" onclick="playAudio('l6_q2b','你会做中国菜吗')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">我不会做。</span><span class="py">Wǒ bú huì zuò.</span><span class="transcript">[Во бу хуй цзуо.]</span><span class="tj">— Ман пухта наметавонам.</span><button class="playbtn inline" onclick="playAudio('l6_a2b','我不会做')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">你会写汉字吗？</span><span class="py">Nǐ huì xiě Hànzì ma?</span><span class="transcript">[Ни хуй сйе Ханьцзы ма?]</span><span class="tj">— Шумо ҳарфи хитоӣ навишта метавонед?</span><button class="playbtn inline" onclick="playAudio('l6_q3','你会写汉字吗')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">我会写。这个字怎么写？</span><span class="py">Wǒ huì xiě. Zhège zì zěnme xiě?</span><span class="transcript">[Во хуй сйе. Чжэгэ цзы цзэньмэ сйе?]</span><span class="tj">— Ман навишта метавонам.</span><button class="playbtn inline" onclick="playAudio('l6_a3','我会写')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">A:</span><span class="hz">这个字怎么写？</span><span class="py">Zhège zì zěnme xiě?</span><span class="transcript">[Чжэгэ цзы цзэньмэ сйе?]</span><span class="tj">— Ин ҳарф чӣ гуна навишта мешавад?</span><button class="playbtn inline" onclick="playAudio('l6_q3b','这个字怎么写')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">对不起，这个字我会读，不会写。</span><span class="py">Duìbuqǐ, zhège zì wǒ huì dú, bú huì xiě.</span><span class="transcript">[Дуйбуци, чжэгэ цзы во хуй ду, бу хуй сйе.]</span><span class="tj">— Бубахшед, ин ҳарфро хонда метавонам, вале навишта наметавонам.</span><button class="playbtn inline" onclick="playAudio('l6_a3b','对不起这个字我会读不会写')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>

    <div class="section-lbl">5. Тартиби навишти ҳарфҳо — аниматсия ва худтамрин</div>
    <div class="section-sub">Ҳарфҳои нави дарси 6. Аввал «Нишон додан»-ро занед, баъд «Худам нависам»-ро.</div>
    <div class="strokegrid" id="strokegrid6">
      <div class="strokecard"><div class="shz">会</div><div class="spy">huì <span class="transcript">[хуй]</span></div><div class="starget" id="sw6-hui"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw6-hui')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw6-hui')">Худам нависам</button></div>
        <div class="sstatus" id="sw6-hui-status"></div></div>
      <div class="strokecard"><div class="shz">说</div><div class="spy">shuō <span class="transcript">[шуо]</span></div><div class="starget" id="sw6-shuo"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw6-shuo')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw6-shuo')">Худам нависам</button></div>
        <div class="sstatus" id="sw6-shuo-status"></div></div>
      <div class="strokecard"><div class="shz">妈</div><div class="spy">mā <span class="transcript">[ма]</span></div><div class="starget" id="sw6-mama"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw6-mama')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw6-mama')">Худам нависам</button></div>
        <div class="sstatus" id="sw6-mama-status"></div></div>
      <div class="strokecard"><div class="shz">菜</div><div class="spy">cài <span class="transcript">[цхай]</span></div><div class="starget" id="sw6-cai"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw6-cai')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw6-cai')">Худам нависам</button></div>
        <div class="sstatus" id="sw6-cai-status"></div></div>
      <div class="strokecard"><div class="shz">很</div><div class="spy">hěn <span class="transcript">[хэнь]</span></div><div class="starget" id="sw6-hen"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw6-hen')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw6-hen')">Худам нависам</button></div>
        <div class="sstatus" id="sw6-hen-status"></div></div>
      <div class="strokecard"><div class="shz">做</div><div class="spy">zuò <span class="transcript">[цзуо]</span></div><div class="starget" id="sw6-zuo"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw6-zuo')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw6-zuo')">Худам нависам</button></div>
        <div class="sstatus" id="sw6-zuo-status"></div></div>
      <div class="strokecard"><div class="shz">写</div><div class="spy">xiě <span class="transcript">[сйе]</span></div><div class="starget" id="sw6-xie"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw6-xie')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw6-xie')">Худам нависам</button></div>
        <div class="sstatus" id="sw6-xie-status"></div></div>
      <div class="strokecard"><div class="shz">怎</div><div class="spy">zěn <span class="transcript">[цзэнь]</span></div><div class="starget" id="sw6-zenme"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw6-zenme')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw6-zenme')">Худам нависам</button></div>
        <div class="sstatus" id="sw6-zenme-status"></div></div>
      <div class="strokecard"><div class="shz">么</div><div class="spy">me <span class="transcript">[мэ]</span></div><div class="starget" id="sw6-me"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw6-me')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw6-me')">Худам нависам</button></div>
        <div class="sstatus" id="sw6-me-status"></div></div>
      <div class="strokecard"><div class="shz">读</div><div class="spy">dú <span class="transcript">[ду]</span></div><div class="starget" id="sw6-du"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw6-du')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw6-du')">Худам нависам</button></div>
        <div class="sstatus" id="sw6-du-status"></div></div>
      <div class="strokecard"><div class="shz">吃</div><div class="spy">chī <span class="transcript">[чхи]</span></div><div class="starget" id="sw6-chi"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw6-chi')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw6-chi')">Худам нависам</button></div>
        <div class="sstatus" id="sw6-chi-status"></div></div>
    </div>

    <div class="section-lbl">6. Аломатҳои асосии навишт (笔画)</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('s_piezhe','撇折')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">㇗</div><div class="py">piězhé<span class="transcript"> [пйечжэ]</span> — чапи-поёнӣ-хамида</div><div class="tj">аввал чапи поёнӣ, баъд ба самти дигар мехамад. Мисол: 么 (суффикс), 东 (шарқ)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('s_xiegou','斜钩')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">㇂</div><div class="py">xiégōu<span class="transcript"> [сйегоу]</span> — қалмоқи моил</div><div class="tj">хатти моил ба поёни рост, дар охир қалмоқ. Мисол: 我 (ман), 钱 (пул)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('s_ti','提')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">㇀</div><div class="py">tí<span class="transcript"> [тхи]</span> — болоравии рост</div><div class="tj">аз поёни чап ба болои рост мебарояд. Мисол: 我 (ман), 打 (задан)</div></div>
    </div>

    <div class="section-lbl">7. Ҳарфҳои якҷузъа (独体字) — намунаҳои китоб</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_dong','东')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">东</div><div class="py">dōng <span class="transcript">[дун]</span></div><div class="tj">шарқ — тарафи баромадани офтоб, муқобили 西 (ғарб)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_wo','我')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">我</div><div class="py">wǒ <span class="transcript">[во]</span></div><div class="tj">аслан шакли яроқи тезбар буд, ҳоло ҷонишини "ман"</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_xi','西')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">西</div><div class="py">xī <span class="transcript">[си]</span></div><div class="tj">аслан шакли ошёнаи парранда буд, ҳоло маънои "ғарб", муқобили 东</div></div>
    </div>

    <div class="section-lbl">8. Сохти ҳарфҳо (1): якҷузъа ва бисёрҷузъа</div>
    <div class="note">Ҳарфҳои хитоӣ ду навъ сохт доранд: <b>сохти якҷузъа (独体结构)</b> — аз як қисм иборат, мисли 人, 我, 中; ва <b>сохти бисёрҷузъа (合体结构)</b> — аз ду ё зиёда қисм иборат, мисли 你 (亻+尔), 做 (亻+古+攵).</div>

    <button class="quizbtn" onclick="showQuiz()">Гузаштани тест &#8594;</button>

    <div class="qwrap" id="qwrap">
      <div class="section-lbl" style="margin-top:32px;">Тести дарси 6 (10 савол)</div>
      <div class="qcard"><div class="q">1. 我会说汉语 маънояш чист?</div><div class="opts">
        <label><input type="radio" name="q1" value="wrong">Ман хитоиро дӯст медорам</label>
        <label><input type="radio" name="q1" value="right">Ман хитоӣ гап зада метавонам</label>
        <label><input type="radio" name="q1" value="wrong">Ман хитоиро меомӯзам</label>
      </div></div>
      <div class="qcard"><div class="q">2. Шакли инкории 会 кадом аст?</div><div class="opts">
        <label><input type="radio" name="q2" value="wrong">没会</label>
        <label><input type="radio" name="q2" value="right">不会</label>
        <label><input type="radio" name="q2" value="wrong">不是会</label>
      </div></div>
      <div class="qcard"><div class="q">3. Дар ҷумлаи бо хабари сифатӣ кадом зарф бештар истифода мешавад?</div><div class="opts">
        <label><input type="radio" name="q3" value="wrong">不</label>
        <label><input type="radio" name="q3" value="right">很</label>
        <label><input type="radio" name="q3" value="wrong">吗</label>
      </div></div>
      <div class="qcard"><div class="q">4. 怎么 кадом вазифаро иҷро мекунад?</div><div class="opts">
        <label><input type="radio" name="q4" value="wrong">Ҷонишини "чӣ"</label>
        <label><input type="radio" name="q4" value="right">Мепурсад "чӣ гуна"</label>
        <label><input type="radio" name="q4" value="wrong">Инкор мекунад</label>
      </div></div>
      <div class="qcard"><div class="q">5. 好吃 маънояш чист?</div><div class="opts">
        <label><input type="radio" name="q5" value="wrong">Гурусна</label>
        <label><input type="radio" name="q5" value="right">Бомазза</label>
        <label><input type="radio" name="q5" value="wrong">Хонда шуда</label>
      </div></div>
      <div class="qcard"><div class="q">6. Дар оҳангсозии калимаи дуҳиҷоӣ бо 1+3 (мисли jīchǎng), оҳанги 3 чӣ гуна тағйир меёбад?</div><div class="opts">
        <label><input type="radio" name="q6" value="right">Охираш боло намеравад, танҳо поён мемонад</label>
        <label><input type="radio" name="q6" value="wrong">Ба оҳанги 1 иваз мешавад</label>
        <label><input type="radio" name="q6" value="wrong">Ҳеҷ тағйире нест</label>
      </div></div>
      <div class="qcard"><div class="q">7. Фарқи 读 ва 写 дар чист?</div><div class="opts">
        <label><input type="radio" name="q7" value="right">读 хондан, 写 навиштан</label>
        <label><input type="radio" name="q7" value="wrong">Ҳарду як маъно доранд</label>
        <label><input type="radio" name="q7" value="wrong">读 гуфтан, 写 хондан</label>
      </div></div>
      <div class="qcard"><div class="q">8. Ҳарфи 我 аслан чӣ маъно дошт?</div><div class="opts">
        <label><input type="radio" name="q8" value="right">Яроқи тезбар</label>
        <label><input type="radio" name="q8" value="wrong">Ошёнаи парранда</label>
        <label><input type="radio" name="q8" value="wrong">Одами рост истода</label>
      </div></div>
      <div class="qcard"><div class="q">9. Сохти якҷузъа (独体结构) чист?</div><div class="opts">
        <label><input type="radio" name="q9" value="right">Ҳарфе, ки аз як қисм иборат аст (мисли 人)</label>
        <label><input type="radio" name="q9" value="wrong">Ҳарфе, ки аз ду ва зиёда қисм иборат аст</label>
        <label><input type="radio" name="q9" value="wrong">Ҳарфе, ки танҳо дар рақамҳо истифода мешавад</label>
      </div></div>
      <div class="qcard"><div class="q">10. "对不起，这个字我会读，不会写" маънояш чист?</div><div class="opts">
        <label><input type="radio" name="q10" value="wrong">Бубахшед, ин ҳарфро намедонам</label>
        <label><input type="radio" name="q10" value="right">Бубахшед, ин ҳарфро хонда метавонам, вале навишта не</label>
        <label><input type="radio" name="q10" value="wrong">Бубахшед, ман хитоиро намедонам</label>
      </div></div>
      <div id="qerror" style="display:none;color:var(--seal);font-size:13px;margin-bottom:10px;">Ба ҳамаи саволҳо ҷавоб диҳед.</div>
      <button class="quizbtn" onclick="submitQuiz()">Супоридани тест</button>

      <div class="result" id="result">
        <div class="seal" id="sealMark"></div>
        <div class="score" id="scoreText"></div>
        <div class="msg" id="scoreMsg"></div>
        <button class="retrybtn" id="retryBtn" onclick="retryQuiz()" style="display:none;">Такрори дарс ва тести дубора</button>
      </div>
    </div>
  `;
}

function renderLesson7(){
  const panel = document.getElementById('panel');
  panel.innerHTML = `
    <div class="panel-head">
      <div class="idx">07</div>
      <div class="titles">
        <div class="zh">今天几号</div>
        <div class="py">Jīntiān jǐ hào</div>
        <div class="en">Имрӯз чандум аст</div>
      </div>
    </div>

    <div class="section-lbl">1. Пиньини дарс — оҳангсозии калимаҳои дуҳиҷоӣ (2)</div>
    <div class="section-sub">Оҳанги 2 + оҳанги 1/2/3/4. Мисол: 时间(shíjiān), 银行(yínháng), 词典(cídiǎn), 蓝色(lánsè).</div>
    <div class="drillgrid">
      <div class="drillcard">guójiā<span class="transcript"><br>[госзя]</span><br><button class="playbtn" onclick="playAudio('l7_drill_guojia','国家')">&#128266;</button></div>
      <div class="drillcard">lóufáng<span class="transcript"><br>[лоуфан]</span><br><button class="playbtn" onclick="playAudio('l7_drill_loufang','楼房')">&#128266;</button></div>
      <div class="drillcard">píngguǒ<span class="transcript"><br>[пхинго]</span><br><button class="playbtn" onclick="playAudio('l7_drill_pingguo','苹果')">&#128266;</button></div>
      <div class="drillcard">huánjìng<span class="transcript"><br>[хуанцзин]</span><br><button class="playbtn" onclick="playAudio('l7_drill_huanjing','环境')">&#128266;</button></div>
      <div class="drillcard">shíjiān<span class="transcript"><br>[шицзиен]</span><br><button class="playbtn" onclick="playAudio('l7_drill_shijian','时间')">&#128266;</button></div>
      <div class="drillcard">yínháng<span class="transcript"><br>[иньхан]</span><br><button class="playbtn" onclick="playAudio('l7_drill_yinhang','银行')">&#128266;</button></div>
      <div class="drillcard">cídiǎn<span class="transcript"><br>[цыдиен]</span><br><button class="playbtn" onclick="playAudio('l7_drill_cidian','词典')">&#128266;</button></div>
      <div class="drillcard">lánsè<span class="transcript"><br>[лансэ]</span><br><button class="playbtn" onclick="playAudio('l7_drill_lanse','蓝色')">&#128266;</button></div>
    </div>

    <div class="section-lbl">2. Калимаҳои нав</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('qing3','请')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">请</div><div class="py">qǐng<span class="transcript"> [цин]</span></div><div class="tj">марҳамат, лутфан</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('wen4','问')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">问</div><div class="py">wèn<span class="transcript"> [вэнь]</span></div><div class="tj">пурсидан</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('jintian','今天')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">今天</div><div class="py">jīntiān<span class="transcript"> [цзиньтиен]</span></div><div class="tj">имрӯз</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('hao4','号')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">号</div><div class="py">hào<span class="transcript"> [хао]</span></div><div class="tj">рақами рӯз (дар моҳ)</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('yue4','月')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">月</div><div class="py">yuè<span class="transcript"> [юэ]</span></div><div class="tj">моҳ</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('xingqi','星期')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">星期</div><div class="py">xīngqī<span class="transcript"> [синци]</span></div><div class="tj">ҳафта</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('zuotian','昨天')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">昨天</div><div class="py">zuótiān<span class="transcript"> [цзуотиен]</span></div><div class="tj">дирӯз</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('mingtian','明天')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">明天</div><div class="py">míngtiān<span class="transcript"> [минтиен]</span></div><div class="tj">пагоҳ</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('qu4','去')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">去</div><div class="py">qù<span class="transcript"> [цюй]</span></div><div class="tj">рафтан</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('xuexiao','学校')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">学校</div><div class="py">xuéxiào<span class="transcript"> [сюэсяо]</span></div><div class="tj">мактаб</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('kan4','看')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">看</div><div class="py">kàn<span class="transcript"> [кань]</span></div><div class="tj">дидан, хондан</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('shu1','书')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">书</div><div class="py">shū<span class="transcript"> [шу]</span></div><div class="tj">китоб</div></div>
    </div>

    <div class="section-lbl">3. Грамматика</div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">1.</span>Ифодаи сана — моҳ, рӯз, ҳафта</div>
      <div class="gbody">Дар хитоӣ сана аз калон ба хурд гуфта мешавад: аввал моҳ, баъд рӯз/санаи моҳ, дар охир рӯзи ҳафта. Дар гуфтугӯ бештар 号 ба ҷои 日 истифода мешавад.</div>
      <div class="gex"><span class="tag">намуна</span>9月1号，星期三。— 1-уми сентябр, рӯзи чоршанбе.</div>
    </div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">2.</span>Ҷумлаи хабари исмӣ</div>
      <div class="gbody">Агар хабари ҷумла худаш исм/сана/сол бошад, феъли "будан" (是) лозим намеояд — исм мустақим паси мубтадо меояд. Барои синну сол, вақт, сана истифода мешавад.</div>
      <div class="gex"><span class="tag">намуна</span>我的汉语老师<b>33岁</b>。 明天<b>星期三</b>。 今天<b>9月1号</b>。</div>
    </div>
    <div class="gcard">
      <div class="gtitle"><span class="zh">3.</span>Ҷумлаи бо ду феъл: 去 + ҷой + кор кардан</div>
      <div class="gbody">Хабари ҷумла аз ду ё бештар феъл иборат аст: феъли дуюм мақсади феъли якумро мефаҳмонад. Пуркунандаи феъли якум (ҷой) баъзан партофта мешавад.</div>
      <div class="gex"><span class="tag">сохт</span>Мубтадо + 去 + (ҷой) + феъли дуюм</div>
      <div class="gex"><span class="tag">намуна</span>我<b>去</b>学校<b>看书</b>。— Ман ба мактаб меравам то китоб хонам.</div>
    </div>

    <div class="section-lbl">4. Моҳҳо ва рӯзҳои ҳафта</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('m01','一月')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">一月</div><div class="py">yī yuè<span class="transcript"> [и юэ]</span></div><div class="tj">январ</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('m02','二月')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">二月</div><div class="py">èr yuè<span class="transcript"> [эр юэ]</span></div><div class="tj">феврал</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('m03','三月')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">三月</div><div class="py">sān yuè<span class="transcript"> [сань юэ]</span></div><div class="tj">март</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('m04','四月')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">四月</div><div class="py">sì yuè<span class="transcript"> [сы юэ]</span></div><div class="tj">апрел</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('m05','五月')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">五月</div><div class="py">wǔ yuè<span class="transcript"> [ву юэ]</span></div><div class="tj">май</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('m06','六月')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">六月</div><div class="py">liù yuè<span class="transcript"> [лиу юэ]</span></div><div class="tj">июн</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('m07','七月')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">七月</div><div class="py">qī yuè<span class="transcript"> [тси юэ]</span></div><div class="tj">июл</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('m08','八月')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">八月</div><div class="py">bā yuè<span class="transcript"> [ба юэ]</span></div><div class="tj">август</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('m09','九月')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">九月</div><div class="py">jiǔ yuè<span class="transcript"> [цзиу юэ]</span></div><div class="tj">сентябр</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('m10','十月')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">十月</div><div class="py">shí yuè<span class="transcript"> [ши юэ]</span></div><div class="tj">октябр</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('m11','十一月')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">十一月</div><div class="py">shíyī yuè<span class="transcript"> [шии юэ]</span></div><div class="tj">ноябр</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('m12','十二月')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">十二月</div><div class="py">shí'èr yuè<span class="transcript"> [шиэр юэ]</span></div><div class="tj">декабр</div></div>
    </div>
    <div class="wordgrid" style="margin-top:10px;">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('w1','星期一')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">星期一</div><div class="py">xīngqī yī<span class="transcript"> [синци и]</span></div><div class="tj">душанбе</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('w2','星期二')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">星期二</div><div class="py">xīngqī èr<span class="transcript"> [синци эр]</span></div><div class="tj">сешанбе</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('w3','星期三')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">星期三</div><div class="py">xīngqī sān<span class="transcript"> [синци сань]</span></div><div class="tj">чоршанбе</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('w4','星期四')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">星期四</div><div class="py">xīngqī sì<span class="transcript"> [синци сы]</span></div><div class="tj">панҷшанбе</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('w5','星期五')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">星期五</div><div class="py">xīngqī wǔ<span class="transcript"> [синци ву]</span></div><div class="tj">ҷумъа</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('w6','星期六')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">星期六</div><div class="py">xīngqī liù<span class="transcript"> [синци лиу]</span></div><div class="tj">шанбе</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('w7','星期日')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">星期日</div><div class="py">xīngqīrì<span class="transcript"> [синцири]</span></div><div class="tj">якшанбе</div></div>
    </div>

    <div class="section-lbl">5. Ҷумлаҳо</div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">请问，今天几号？</span><span class="py">Qǐngwèn, jīntiān jǐ hào?</span><span class="transcript">[Цинвэнь, цзиньтиен цзи хао?]</span><span class="tj">— Бубахшед, имрӯз чандум аст?</span><button class="playbtn inline" onclick="playAudio('l7_q1','请问今天几号')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">今天9月1号。</span><span class="py">Jīntiān jiǔ yuè yī hào.</span><span class="transcript">[Цзиньтиен цзиу юэ и хао.]</span><span class="tj">— Имрӯз 1-уми сентябр.</span><button class="playbtn inline" onclick="playAudio('l7_a1','今天九月一号')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">A:</span><span class="hz">今天星期几？</span><span class="py">Jīntiān xīngqī jǐ?</span><span class="transcript">[Цзиньтиен синци цзи?]</span><span class="tj">— Имрӯз кадом рӯзи ҳафта аст?</span><button class="playbtn inline" onclick="playAudio('l7_q1b','今天星期几')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">星期三。</span><span class="py">Xīngqī sān.</span><span class="transcript">[Синци сань.]</span><span class="tj">— Чоршанбе.</span><button class="playbtn inline" onclick="playAudio('l7_a1b','星期三')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">昨天是几月几号？</span><span class="py">Zuótiān shì jǐ yuè jǐ hào?</span><span class="transcript">[Цзуотиен ши цзи юэ цзи хао?]</span><span class="tj">— Дирӯз кадом сана буд?</span><button class="playbtn inline" onclick="playAudio('l7_q2','昨天是几月几号')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">昨天是8月31号，星期二。</span><span class="py">Zuótiān shì bā yuè sānshíyī hào, xīngqī èr.</span><span class="transcript">[Цзуотиен ши ба юэ саньшии хао, синци эр.]</span><span class="tj">— Дирӯз 31-уми август, сешанбе буд.</span><button class="playbtn inline" onclick="playAudio('l7_a2','昨天是八月三十一号星期二')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">A:</span><span class="hz">明天呢？</span><span class="py">Míngtiān ne?</span><span class="transcript">[Минтиен нэ?]</span><span class="tj">— Пагоҳ-чӣ?</span><button class="playbtn inline" onclick="playAudio('l7_q2b','明天呢')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">明天是9月2号，星期四。</span><span class="py">Míngtiān shì jiǔ yuè èr hào, xīngqī sì.</span><span class="transcript">[Минтиен ши цзиу юэ эр хао, синци сы.]</span><span class="tj">— Пагоҳ 2-юми сентябр, панҷшанбе аст.</span><button class="playbtn inline" onclick="playAudio('l7_a2b','明天是九月二号星期四')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>
    <div class="dialog">
      <div class="line"><span class="who">A:</span><span class="hz">明天星期六，你去学校吗？</span><span class="py">Míngtiān xīngqī liù, nǐ qù xuéxiào ma?</span><span class="transcript">[Минтиен синци лиу, ни цюй сюэсяо ма?]</span><span class="tj">— Пагоҳ шанбе аст, шумо ба мактаб меравед?</span><button class="playbtn inline" onclick="playAudio('l7_q3','明天星期六你去学校吗')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">我去学校。</span><span class="py">Wǒ qù xuéxiào.</span><span class="transcript">[Во цюй сюэсяо.]</span><span class="tj">— Ман ба мактаб меравам.</span><button class="playbtn inline" onclick="playAudio('l7_a3','我去学校')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">A:</span><span class="hz">你去学校做什么？</span><span class="py">Nǐ qù xuéxiào zuò shénme?</span><span class="transcript">[Ни цюй сюэсяо цзуо шэньмэ?]</span><span class="tj">— Шумо ба мактаб рафта чӣ мекунед?</span><button class="playbtn inline" onclick="playAudio('l7_q3b','你去学校做什么')" aria-label="Гӯш кардан">&#128266;</button></div>
      <div class="line"><span class="who">B:</span><span class="hz">我去学校看书。</span><span class="py">Wǒ qù xuéxiào kàn shū.</span><span class="transcript">[Во цюй сюэсяо кань шу.]</span><span class="tj">— Ман ба мактаб меравам то китоб хонам.</span><button class="playbtn inline" onclick="playAudio('l7_a3b','我去学校看书')" aria-label="Гӯш кардан">&#128266;</button></div>
    </div>

    <div class="section-lbl">6. Тартиби навишти ҳарфҳо — аниматсия ва худтамрин</div>
    <div class="section-sub">Ҳарфҳои нави дарси 7. Аввал «Нишон додан»-ро занед, баъд «Худам нависам»-ро.</div>
    <div class="strokegrid" id="strokegrid7">
      <div class="strokecard"><div class="shz">请</div><div class="spy">qǐng <span class="transcript">[цин]</span></div><div class="starget" id="sw7-qing"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw7-qing')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw7-qing')">Худам нависам</button></div>
        <div class="sstatus" id="sw7-qing-status"></div></div>
      <div class="strokecard"><div class="shz">问</div><div class="spy">wèn <span class="transcript">[вэнь]</span></div><div class="starget" id="sw7-wen"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw7-wen')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw7-wen')">Худам нависам</button></div>
        <div class="sstatus" id="sw7-wen-status"></div></div>
      <div class="strokecard"><div class="shz">今</div><div class="spy">jīn <span class="transcript">[цзинь]</span></div><div class="starget" id="sw7-jin"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw7-jin')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw7-jin')">Худам нависам</button></div>
        <div class="sstatus" id="sw7-jin-status"></div></div>
      <div class="strokecard"><div class="shz">天</div><div class="spy">tiān <span class="transcript">[тиень]</span></div><div class="starget" id="sw7-tian"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw7-tian')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw7-tian')">Худам нависам</button></div>
        <div class="sstatus" id="sw7-tian-status"></div></div>
      <div class="strokecard"><div class="shz">号</div><div class="spy">hào <span class="transcript">[хао]</span></div><div class="starget" id="sw7-hao"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw7-hao')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw7-hao')">Худам нависам</button></div>
        <div class="sstatus" id="sw7-hao-status"></div></div>
      <div class="strokecard"><div class="shz">月</div><div class="spy">yuè <span class="transcript">[юэ]</span></div><div class="starget" id="sw7-yue"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw7-yue')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw7-yue')">Худам нависам</button></div>
        <div class="sstatus" id="sw7-yue-status"></div></div>
      <div class="strokecard"><div class="shz">星</div><div class="spy">xīng <span class="transcript">[син]</span></div><div class="starget" id="sw7-xing"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw7-xing')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw7-xing')">Худам нависам</button></div>
        <div class="sstatus" id="sw7-xing-status"></div></div>
      <div class="strokecard"><div class="shz">期</div><div class="spy">qī <span class="transcript">[тси]</span></div><div class="starget" id="sw7-qi"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw7-qi')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw7-qi')">Худам нависам</button></div>
        <div class="sstatus" id="sw7-qi-status"></div></div>
      <div class="strokecard"><div class="shz">昨</div><div class="spy">zuó <span class="transcript">[цзуо]</span></div><div class="starget" id="sw7-zuo"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw7-zuo')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw7-zuo')">Худам нависам</button></div>
        <div class="sstatus" id="sw7-zuo-status"></div></div>
      <div class="strokecard"><div class="shz">明</div><div class="spy">míng <span class="transcript">[мин]</span></div><div class="starget" id="sw7-ming"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw7-ming')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw7-ming')">Худам нависам</button></div>
        <div class="sstatus" id="sw7-ming-status"></div></div>
      <div class="strokecard"><div class="shz">去</div><div class="spy">qù <span class="transcript">[цюй]</span></div><div class="starget" id="sw7-qu"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw7-qu')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw7-qu')">Худам нависам</button></div>
        <div class="sstatus" id="sw7-qu-status"></div></div>
      <div class="strokecard"><div class="shz">校</div><div class="spy">xiào <span class="transcript">[сяо]</span></div><div class="starget" id="sw7-xiao"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw7-xiao')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw7-xiao')">Худам нависам</button></div>
        <div class="sstatus" id="sw7-xiao-status"></div></div>
      <div class="strokecard"><div class="shz">看</div><div class="spy">kàn <span class="transcript">[кань]</span></div><div class="starget" id="sw7-kan"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw7-kan')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw7-kan')">Худам нависам</button></div>
        <div class="sstatus" id="sw7-kan-status"></div></div>
      <div class="strokecard"><div class="shz">书</div><div class="spy">shū <span class="transcript">[шу]</span></div><div class="starget" id="sw7-shu"></div>
        <div class="strokebtns"><button class="sbtn" onclick="hwAnimate('sw7-shu')">Нишон додан</button><button class="sbtn primary" onclick="hwQuiz('sw7-shu')">Худам нависам</button></div>
        <div class="sstatus" id="sw7-shu-status"></div></div>
    </div>

    <div class="section-lbl">7. Ҳарфҳои якҷузъа (独体字) — намунаҳои китоб</div>
    <div class="wordgrid">
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_si','四')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">四</div><div class="py">sì <span class="transcript">[сы]</span></div><div class="tj">чор</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_wu5','五')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">五</div><div class="py">wǔ <span class="transcript">[ву]</span></div><div class="tj">панҷ</div></div>
      <div class="wordcard"><button class="playbtn" onclick="playAudio('sc_shu1','书')" aria-label="Гӯш кардан">&#128266;</button><div class="hz">书</div><div class="py">shū <span class="transcript">[шу]</span></div><div class="tj">пештар маънои "қалами мӯина ба сиёҳӣ андохтан" дошт, ҳоло "навиштан/китоб"</div></div>
    </div>

    <div class="section-lbl">8. Сохти ҳарфҳо (2) ва радикалҳо</div>
    <div class="note"><b>Сохти чап-рост</b> (左右结构): мисол 你, 好. <b>Сохти чап-миён-рост</b> (左中右结构): мисол 谢, 树.</div>
    <div class="wordgrid">
      <div class="wordcard"><div class="hz">氵</div><div class="py">сеқатра об</div><div class="tj">одатан бо об алоқаманд: 汉 (hàn), 没 (méi)</div></div>
      <div class="wordcard"><div class="hz">讠</div><div class="py">тарафи гуфтор</div><div class="tj">одатан бо забон/гуфтор алоқаманд: 语 (yǔ), 谁 (shéi)</div></div>
    </div>

    <button class="quizbtn" onclick="showQuiz()">Гузаштани тест &#8594;</button>

    <div class="qwrap" id="qwrap">
      <div class="section-lbl" style="margin-top:32px;">Тести дарси 7 (10 савол)</div>
      <div class="qcard"><div class="q">1. Дар хитоӣ санаро чӣ тартиб мегӯянд?</div><div class="opts">
        <label><input type="radio" name="q1" value="right">Аз калон ба хурд: моҳ → рӯз → рӯзи ҳафта</label>
        <label><input type="radio" name="q1" value="wrong">Аз хурд ба калон: рӯз → моҳ → сол</label>
        <label><input type="radio" name="q1" value="wrong">Тартиб муҳим нест</label>
      </div></div>
      <div class="qcard"><div class="q">2. 明天 маънояш чист?</div><div class="opts">
        <label><input type="radio" name="q2" value="wrong">Дирӯз</label>
        <label><input type="radio" name="q2" value="right">Пагоҳ</label>
        <label><input type="radio" name="q2" value="wrong">Имрӯз</label>
      </div></div>
      <div class="qcard"><div class="q">3. Дар ҷумлаи хабари исмӣ (мисли "今天9月1号") кадом феъл лозим аст?</div><div class="opts">
        <label><input type="radio" name="q3" value="right">Ҳеҷ феъл лозим нест</label>
        <label><input type="radio" name="q3" value="wrong">是 ҳатман лозим аст</label>
        <label><input type="radio" name="q3" value="wrong">会 ҳатман лозим аст</label>
      </div></div>
      <div class="qcard"><div class="q">4. Дар ҷумлаи "我去学校看书" феъли дуюм (看书) чӣ вазифа дорад?</div><div class="opts">
        <label><input type="radio" name="q4" value="right">Мақсади рафтанро мефаҳмонад</label>
        <label><input type="radio" name="q4" value="wrong">Ҷойро нишон медиҳад</label>
        <label><input type="radio" name="q4" value="wrong">Инкор мекунад</label>
      </div></div>
      <div class="qcard"><div class="q">5. 星期三 кадом рӯзи ҳафта аст?</div><div class="opts">
        <label><input type="radio" name="q5" value="wrong">Душанбе</label>
        <label><input type="radio" name="q5" value="right">Чоршанбе</label>
        <label><input type="radio" name="q5" value="wrong">Ҷумъа</label>
      </div></div>
      <div class="qcard"><div class="q">6. 九月 кадом моҳ аст?</div><div class="opts">
        <label><input type="radio" name="q6" value="wrong">Июн</label>
        <label><input type="radio" name="q6" value="right">Сентябр</label>
        <label><input type="radio" name="q6" value="wrong">Ноябр</label>
      </div></div>
      <div class="qcard"><div class="q">7. Дар гуфтугӯи ҳаррӯза, ба ҷои 日 бештар кадом калима истифода мешавад?</div><div class="opts">
        <label><input type="radio" name="q7" value="right">号</label>
        <label><input type="radio" name="q7" value="wrong">月</label>
        <label><input type="radio" name="q7" value="wrong">星期</label>
      </div></div>
      <div class="qcard"><div class="q">8. 请问 маънояш чист?</div><div class="opts">
        <label><input type="radio" name="q8" value="wrong">Ташаккур</label>
        <label><input type="radio" name="q8" value="right">Бубахшед (пеш аз савол)</label>
        <label><input type="radio" name="q8" value="wrong">То дидан</label>
      </div></div>
      <div class="qcard"><div class="q">9. Радикали 讠 бо чӣ алоқаманд аст?</div><div class="opts">
        <label><input type="radio" name="q9" value="wrong">Об</label>
        <label><input type="radio" name="q9" value="right">Забон, гуфтор</label>
        <label><input type="radio" name="q9" value="wrong">Одам</label>
      </div></div>
      <div class="qcard"><div class="q">10. Сохти ҳарфи 谢 (儿 не, худи 谢) кадом навъ аст?</div><div class="opts">
        <label><input type="radio" name="q10" value="wrong">Якҷузъа</label>
        <label><input type="radio" name="q10" value="wrong">Чап-рост</label>
        <label><input type="radio" name="q10" value="right">Чап-миён-рост</label>
      </div></div>
      <div id="qerror" style="display:none;color:var(--seal);font-size:13px;margin-bottom:10px;">Ба ҳамаи саволҳо ҷавоб диҳед.</div>
      <button class="quizbtn" onclick="submitQuiz()">Супоридани тест</button>

      <div class="result" id="result">
        <div class="seal" id="sealMark"></div>
        <div class="score" id="scoreText"></div>
        <div class="msg" id="scoreMsg"></div>
        <button class="retrybtn" id="retryBtn" onclick="retryQuiz()" style="display:none;">Такрори дарс ва тести дубора</button>
      </div>
    </div>
  `;
}

function showQuiz(){
  document.getElementById('qwrap').classList.add('active');
}

function submitQuiz(){
  const qs = ['q1','q2','q3','q4','q5','q6','q7','q8','q9','q10'];
  let answered = 0, correct = 0;
  qs.forEach(q=>{
    const sel = document.querySelector(`input[name="${q}"]:checked`);
    if(sel){ answered++; if(sel.value === 'right') correct++; }
  });
  const err = document.getElementById('qerror');
  if(answered < qs.length){
    err.style.display = 'block';
    return;
  }
  err.style.display = 'none';
  const pct = Math.round(correct/qs.length*100);
  const result = document.getElementById('result');
  const seal = document.getElementById('sealMark');
  const retryBtn = document.getElementById('retryBtn');
  result.classList.add('show');
  document.getElementById('scoreText').textContent = pct + '%';
  if(pct >= 80){
    result.className = 'result show pass';
    document.getElementById('scoreMsg').textContent = 'Табрик! Дарси ' + (currentLessonNum+1) + ' кушода шуд.';
    seal.innerHTML = 'ГУЗАШТ';
    retryBtn.style.display = 'none';
    if(currentLessonNum + 1 > lessonUnlocked){ lessonUnlocked = currentLessonNum + 1; saveProgress(); }
    renderPath();
  } else {
    result.className = 'result show fail';
    document.getElementById('scoreMsg').textContent = 'Натиҷа кофӣ нест. Аввал дарси ' + currentLessonNum + '-ро такрор кунед.';
    seal.innerHTML = '';
    retryBtn.style.display = 'inline-block';
  }
}

function retryQuiz(){
  document.getElementById('result').classList.remove('show');
  document.querySelectorAll('#qwrap input[type=radio]').forEach(r=>r.checked=false);
  window.scrollTo({top: document.getElementById('panel').offsetTop, behavior:'smooth'});
}

/* ---------- Тартиби навишт: аниматсия ва худтамрин ---------- */
const strokeChars = {
  'sw-ni':'你','sw-hao':'好','sw-nin':'您','sw-men':'们','sw-dui':'对',
  'sw-bu':'不','sw-qi':'起','sw-mei':'没','sw-guan':'关','sw-xi':'系',
  'sw2-xie':'谢','sw2-ke':'客','sw2-qi':'气','sw2-zai':'再','sw2-jian':'见',
  'sw2-kou':'口','sw2-shan':'山','sw2-xiao':'小',
  'sw3-jiao':'叫','sw3-shen':'什','sw3-me':'么','sw3-ming':'名','sw3-zi':'字',
  'sw3-wo':'我','sw3-shi4':'是','sw3-lao':'老','sw3-shi1':'师','sw3-ma':'吗',
  'sw3-xue':'学','sw3-sheng':'生','sw3-ren':'人',
  'sw4-ta1':'她','sw4-shei':'谁','sw4-de':'的','sw4-han':'汉','sw4-yu':'语',
  'sw4-na':'哪','sw4-guo':'国','sw4-ne':'呢','sw4-ta2':'他','sw4-tong':'同',
  'sw4-peng':'朋','sw4-you':'友',
  'sw5-jia':'家','sw5-you':'有','sw5-kou':'口','sw5-nv':'女','sw5-er':'儿',
  'sw5-ji':'几','sw5-sui':'岁','sw5-le':'了','sw5-jin':'今','sw5-nian':'年',
  'sw5-duo':'多','sw5-da':'大',
  'sw6-hui':'会','sw6-shuo':'说','sw6-mama':'妈','sw6-cai':'菜','sw6-hen':'很',
  'sw6-zuo':'做','sw6-xie':'写','sw6-zenme':'怎','sw6-me':'么','sw6-du':'读','sw6-chi':'吃',
  'sw7-qing':'请','sw7-wen':'问','sw7-jin':'今','sw7-tian':'天','sw7-hao':'号','sw7-yue':'月',
  'sw7-xing':'星','sw7-qi':'期','sw7-zuo':'昨','sw7-ming':'明','sw7-qu':'去','sw7-xiao':'校',
  'sw7-kan':'看','sw7-shu':'书'
};
const writers = {};
function initStrokeWriters(){
  if(typeof HanziWriter === 'undefined') return;
  Object.keys(strokeChars).forEach(id=>{
    const el = document.getElementById(id);
    if(!el) return;
    writers[id] = HanziWriter.create(id, strokeChars[id], {
      width: 118, height: 118, padding: 6,
      strokeColor: '#241F19',
      radicalColor: '#B23A2E',
      outlineColor: '#D9CFB8',
      drawingColor: '#B23A2E',
      showOutline: true,
      showCharacter: true,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 250
    });
  });
}
function hwAnimate(id){
  const w = writers[id];
  if(!w) return;
  const status = document.getElementById(id+'-status');
  if(status){ status.className = 'sstatus'; status.textContent = 'Тамошо кунед...'; }
  w.showCharacter();
  w.animateCharacter({
    onComplete: () => { if(status) status.textContent = 'Акнун худатон кӯшиш кунед.'; }
  });
}
function hwQuiz(id){
  const w = writers[id];
  if(!w) return;
  const status = document.getElementById(id+'-status');
  w.hideCharacter();
  w.quiz({
    onMistake: () => { if(status){ status.className='sstatus bad'; status.textContent = 'Хато — боз кӯшиш кунед.'; } },
    onCorrectStroke: (data) => { if(status){ status.className='sstatus'; status.textContent = 'Дуруст! (' + (data.strokeNum+1) + '/' + (data.strokeNum+1+data.strokesRemaining) + ')'; } },
    onComplete: () => { if(status){ status.className='sstatus ok'; status.textContent = 'Офарин! Комил навишта шуд.'; } }
  });
  if(status){ status.className='sstatus'; status.textContent = 'Аз аввалин харф кашед...'; }
}

renderPath();
openLesson(1);
