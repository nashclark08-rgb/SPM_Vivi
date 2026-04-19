const KEYS = {
    settings:'pti_settings', teachers:'pti_teachers', sounds:'pti_sounds',
    departments:'pti_departments', rooms:'pti_rooms',
    sessions:'pti_sessions_v2', active:'pti_active_session'
};

const PANTONE = {
    '100':'#F4ED7C','101':'#F4ED47','102':'#F6EB15','103':'#C6AD0E','104':'#AE9B1C','105':'#896E2A',
    '106':'#FAE910','107':'#FAE214','108':'#F7D900','109':'#F4CC00','110':'#E6A800','111':'#C28E00','112':'#B58200',
    '116':'#FFCA00','117':'#D4A800','118':'#B58C00','123':'#FFC72C','124':'#E5A812','125':'#C68F00',
    '130':'#F9CD23','131':'#F7C500','132':'#D19B00',
    '151':'#FF8300','152':'#E87722','158':'#EA7600','021':'#FF6A13',
    '165':'#FF6720','166':'#F36B21','167':'#D4610E','168':'#8B3A0F',
    '172':'#FF4F00','173':'#E04E00','179':'#FF3000','180':'#E83D00',
    '032':'#EF3340',
    '485':'#DA291C','186':'#C8102E','187':'#A4122A','188':'#78122A',
    '199':'#D50032','200':'#CC2451','201':'#A50034','202':'#8B1A35',
    '207':'#CC0044','208':'#9F0030',
    '212':'#F04E98','213':'#DA2274','214':'#C5006C','215':'#A50050','216':'#7A003C',
    '219':'#E91E8C','220':'#C00060','221':'#A20054',
    '253':'#C86AB5','254':'#B84EAA','255':'#8C2896',
    '258':'#7B3F98','259':'#6D2077','260':'#5C1A7A','261':'#4A1464',
    '265':'#7B5EA7','266':'#6B3FA0','267':'#5C2D91','268':'#522D6D','269':'#41104C',
    '270':'#8B7BB5','272':'#6854A0','273':'#3B2E8C','274':'#2E2477','275':'#201B62',
    '279':'#5B8DB8','280':'#1B3D6F','281':'#003A70','282':'#00244A',
    '285':'#4882C5','286':'#003DA5','287':'#003087','288':'#002868','289':'#001B48',
    '292':'#68ACE5','293':'#005EB8','294':'#003087','295':'#002D56','296':'#011936',
    '299':'#00A3E0','300':'#0057A8','301':'#005B99','302':'#004B87','303':'#003F72',
    '306':'#00A9CE','307':'#006B97','308':'#005473',
    '313':'#009DC4','314':'#00849F','315':'#006B82','316':'#00485C',
    '320':'#009999','321':'#00808F','322':'#007082','323':'#005F6E',
    '326':'#00B5A0','327':'#007B74',
    '341':'#00633E','342':'#005436','347':'#00843D','348':'#00733E','349':'#005B30',
    '354':'#00B140','355':'#009A44','356':'#007A33','357':'#00612C',
    '362':'#4E9D2D','363':'#4A8B2C','364':'#3E7A28',
    '368':'#78BE20','369':'#64A70B','370':'#4C8B2B','371':'#3A6B1E',
    '375':'#97D700','376':'#84C000','377':'#6A961E',
    '401':'#BFB8AF','402':'#B4AEA6','403':'#A39B96','404':'#837A77','405':'#6A6063',
    '419':'#212322',
    '423':'#98948E','424':'#888480','425':'#787470',
    '430':'#919191','431':'#777777','432':'#5A5E60','433':'#484C4E',
    '444':'#9EA4A8','445':'#6E7478','446':'#555C60','447':'#3A3F42',
    '872':'#A57C00','873':'#8C6E00','874':'#7A5E00','877':'#8A8D8F',
    'BLACK':'#2B2B2C','BLACK 2':'#323031','BLACK 3':'#212820','BLACK 6':'#101820',
    'WARM GRAY 1':'#D9D0C7','WARM GRAY 2':'#CEC4B9','WARM GRAY 3':'#C3B9AE',
    'WARM GRAY 4':'#B8ADA3','WARM GRAY 5':'#ADA198','WARM GRAY 6':'#A29590',
    'WARM GRAY 7':'#978A85','WARM GRAY 8':'#8C807A','WARM GRAY 9':'#81756F',
    'WARM GRAY 10':'#76696A','WARM GRAY 11':'#6B5E5A',
    'COOL GRAY 1':'#D9D9D9','COOL GRAY 2':'#CBCBCB','COOL GRAY 3':'#BCBCBC',
    'COOL GRAY 4':'#ADADAD','COOL GRAY 5':'#9E9E9E','COOL GRAY 6':'#909090',
    'COOL GRAY 7':'#818181','COOL GRAY 8':'#727272','COOL GRAY 9':'#636363',
    'COOL GRAY 10':'#545454','COOL GRAY 11':'#454545'
};

function lookupPantone(raw) {
    const key = raw.trim().toUpperCase()
        .replace(/^(PANTONE|PMS)\s*/,'')
        .replace(/\s*(C|U|M|CP|EC|CU|MU)\s*$/,'')
        .trim();
    return PANTONE[key] || null;
}

function bindPMSInput(inputId, colourId, hexId, statusId) {
    document.getElementById(inputId).addEventListener('change', function() {
        const hex = lookupPantone(this.value);
        const status = document.getElementById(statusId);
        if (hex) {
            document.getElementById(colourId).value = hex;
            document.getElementById(hexId).textContent = hex;
            status.textContent = '✓ Found'; status.className = 'pms-status found';
            updateBrandingPreview();
        } else if (this.value.trim()) {
            status.textContent = '✗ Not found'; status.className = 'pms-status notfound';
        } else {
            status.textContent = ''; status.className = 'pms-status';
        }
    });
}

function playTone(ctx, type, freq, gain, start, stop) {
    const osc = ctx.createOscillator(), g = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.type = type; osc.frequency.value = freq;
    const t0 = ctx.currentTime;
    g.gain.setValueAtTime(gain, t0 + start);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + stop);
    osc.start(t0 + start); osc.stop(t0 + stop + 0.05);
}

const SOUND_DEFS = {
    'Descending Chime': c => { [[880,0],[660,0.42],[440,0.84]].forEach(([f,t])=>playTone(c,'sine',f,0.55,t,t+0.65)); },
    'Ascending Beep':   c => { [[440,0],[660,0.18],[440,0.55],[880,0.73]].forEach(([f,t])=>playTone(c,'square',f,0.18,t,t+0.14)); },
    'Single Bell':      c => { playTone(c,'sine',880,0.6,0,1.2); },
    'School Bell':      c => { for(let i=0;i<8;i++) playTone(c,'square',700,0.18,i*0.11,i*0.11+0.07); },
    'Soft Ding':        c => { playTone(c,'sine',1047,0.35,0,0.9); },
    'Double Tone':      c => { playTone(c,'sine',660,0.45,0,0.3); playTone(c,'sine',880,0.45,0.38,0.68); },
    'Alert Buzz':       c => { playTone(c,'square',200,0.3,0,0.5); },
    'Xylophone Hit':    c => { playTone(c,'triangle',1175,0.7,0,0.38); },
    'Low Gong':         c => { playTone(c,'sine',110,0.6,0,1.5); playTone(c,'sine',220,0.25,0,0.8); },
    'High Ping':        c => { playTone(c,'sine',2093,0.45,0,0.2); }
};

function previewSound(selectId) {
    const name = document.getElementById(selectId).value;
    const fn = SOUND_DEFS[name]; if (!fn) return;
    try { const ctx = new (window.AudioContext||window.webkitAudioContext)(); fn(ctx); }
    catch(e) { toast('Audio unavailable in this browser.'); }
}

function collectSounds() {
    return { endInterview: document.getElementById('soundEndInterview').value,
             endBreak:     document.getElementById('soundEndBreak').value };
}
function applySounds(s) {
    if (!s) return;
    if (s.endInterview) document.getElementById('soundEndInterview').value = s.endInterview;
    if (s.endBreak)     document.getElementById('soundEndBreak').value     = s.endBreak;
}

let deptList = [], roomList = [], teacherRows = [], logoDataUrl = '';

function addDept() {
    const inp = document.getElementById('deptInput'), val = inp.value.trim();
    if (!val) return;
    if (!deptList.includes(val)) { deptList.push(val); renderDepts(); updateDataLists(); }
    inp.value = ''; inp.focus();
}
function removeDept(i) { deptList.splice(i,1); renderDepts(); updateDataLists(); }
function renderDepts() {
    const el = document.getElementById('deptChips'); el.innerHTML = '';
    if (!deptList.length) { el.innerHTML = '<span class="chip-empty">No subjects added yet</span>'; return; }
    deptList.forEach((d,i) => {
        const chip = document.createElement('span'); chip.className = 'chip';
        chip.innerHTML = `${esc(d)} <button onclick="removeDept(${i})">&#215;</button>`;
        el.appendChild(chip);
    });
}

function addRoom() {
    const inp = document.getElementById('roomInput'), val = inp.value.trim();
    if (!val) return;
    if (!roomList.includes(val)) { roomList.push(val); renderRooms(); updateDataLists(); }
    inp.value = ''; inp.focus();
}
function removeRoom(i) { roomList.splice(i,1); renderRooms(); updateDataLists(); }
function renderRooms() {
    const el = document.getElementById('roomChips'); el.innerHTML = '';
    if (!roomList.length) { el.innerHTML = '<span class="chip-empty">No rooms added yet</span>'; return; }
    roomList.forEach((r,i) => {
        const chip = document.createElement('span'); chip.className = 'chip';
        chip.innerHTML = `${esc(r)} <button onclick="removeRoom(${i})">&#215;</button>`;
        el.appendChild(chip);
    });
}
function updateDataLists() {
    document.getElementById('deptDatalist').innerHTML = deptList.map(d=>`<option value="${esc(d)}">`).join('');
    document.getElementById('roomDatalist').innerHTML = roomList.map(r=>`<option value="${esc(r)}">`).join('');
}

function getAllSessions() { try { return JSON.parse(localStorage.getItem(KEYS.sessions))||{}; } catch { return {}; } }
function getActiveName()  { return localStorage.getItem(KEYS.active)||''; }

function buildPayload() {
    return { settings: collectSettings(), teachers: teacherRows,
             departments: deptList, rooms: roomList, sounds: collectSounds() };
}

function saveSession() {
    const name = document.getElementById('sessionNameInput').value.trim();
    if (!name) { toast('Enter a session name first.'); return; }
    const sessions = getAllSessions(); sessions[name] = buildPayload();
    localStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
    localStorage.setItem(KEYS.active, name);
    persist(); renderSessionUI(); toast(`Session "${name}" saved.`);
}
function updateSession() {
    const name = getActiveName();
    if (!name) { toast('No active session — use Save to create one.'); return; }
    const sessions = getAllSessions(); sessions[name] = buildPayload();
    localStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
    persist(); toast(`Session "${name}" updated.`);
}
function loadSelectedSession() {
    const name = document.getElementById('sessionSelect').value;
    if (!name) { toast('Select a session to load.'); return; }
    const s = getAllSessions()[name]; if (!s) { toast('Session not found.'); return; }
    applyPayload(s); localStorage.setItem(KEYS.active, name);
    document.getElementById('sessionNameInput').value = name;
    persist(); renderSessionUI(); toast(`Session "${name}" loaded.`);
}
function deleteSelectedSession() {
    const name = document.getElementById('sessionSelect').value;
    if (!name) { toast('Select a session to delete.'); return; }
    if (!confirm(`Delete session "${name}"?`)) return;
    const sessions = getAllSessions(); delete sessions[name];
    localStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
    if (getActiveName()===name) localStorage.removeItem(KEYS.active);
    renderSessionUI(); toast(`Session "${name}" deleted.`);
}
function applyPayload(s) {
    if (s.settings) applySettings(s.settings);
    teacherRows = s.teachers||[]; deptList = s.departments||[]; roomList = s.rooms||[];
    applySounds(s.sounds);
    renderTable(); renderDepts(); renderRooms(); updateDataLists();
    updateBrandingPreview(); updateTimingPreview();
}
function renderSessionUI() {
    const sessions = getAllSessions(), active = getActiveName();
    const sel = document.getElementById('sessionSelect'); sel.innerHTML = '';
    const names = Object.keys(sessions);
    if (!names.length) { sel.innerHTML = '<option value="">— No saved sessions —</option>'; }
    else names.forEach(n => {
        const opt = document.createElement('option');
        opt.value = n; opt.textContent = n; if (n===active) opt.selected=true;
        sel.appendChild(opt);
    });
    document.getElementById('sessionBadge').textContent = active||'Unsaved';
}

function loadData(key, def) { try { return JSON.parse(localStorage.getItem(key))||def; } catch { return def; } }
function persist() {
    localStorage.setItem(KEYS.settings,    JSON.stringify(collectSettings()));
    localStorage.setItem(KEYS.teachers,    JSON.stringify(teacherRows));
    localStorage.setItem(KEYS.sounds,      JSON.stringify(collectSounds()));
    localStorage.setItem(KEYS.departments, JSON.stringify(deptList));
    localStorage.setItem(KEYS.rooms,       JSON.stringify(roomList));
}

function toMins(t) { const [h,m]=t.split(':').map(Number); return h*60+m; }
function minsTo12h(mins) {
    const h=Math.floor(mins/60)%24,m=mins%60,p=h>=12?'PM':'AM';
    return `${h%12||12}:${String(m).padStart(2,'0')} ${p}`;
}
function calcN(start,finish,iv,brk) {
    const total=toMins(finish)-toMins(start),cycle=iv+brk;
    if(total<=0||cycle<=0) return 0;
    return Math.floor((total+brk)/cycle);
}

function updateTimingPreview() {
    const start=document.getElementById('startTime').value;
    const finish=document.getElementById('finishTime').value;
    const iv=parseInt(document.getElementById('interviewDuration').value)||0;
    const brk=parseInt(document.getElementById('breakDuration').value)||0;
    const el=document.getElementById('timingPreview');
    if(!start||!finish||!iv){el.style.display='none';return;}
    const total=toMins(finish)-toMins(start);
    if(total<=0){el.textContent='Finish time must be after start time.';el.style.display='block';el.className='timing-preview error';return;}
    const n=calcN(start,finish,iv,brk);
    if(n<1){el.textContent='Interview duration is longer than the session window.';el.style.display='block';el.className='timing-preview error';return;}
    const used=n*iv+(n>1?(n-1)*brk:0), endMins=toMins(start)+used, unused=toMins(finish)-endMins;
    let msg=`${n} interview${n!==1?'s':''} will be scheduled, finishing at ${minsTo12h(endMins)}.`;
    if(unused>0) msg+=` (${unused} minute${unused!==1?'s':''} unused at end of session)`;
    el.textContent=msg; el.style.display='block'; el.className='timing-preview ok';
}

function updateBrandingPreview() {
    const name=document.getElementById('schoolName').value||'Your School Name';
    const primary=document.getElementById('primaryColour').value;
    const sec=document.getElementById('secondaryColour').value;
    document.getElementById('previewName').textContent=name;
    document.getElementById('previewBar').style.background=primary;
    document.getElementById('previewBar').style.color=sec;
    document.getElementById('primaryHex').textContent=primary;
    document.getElementById('secondaryHex').textContent=sec;
}

function renderTable() {
    const tbody=document.getElementById('teacherBody');
    if(!teacherRows.length){
        tbody.innerHTML='<tr><td colspan="4" class="empty-msg">No teachers added yet — click &quot;+ Add Teacher&quot; below.</td></tr>';
        return;
    }
    tbody.innerHTML='';
    teacherRows.forEach((row,i)=>{
        const tr=document.createElement('tr');
        tr.innerHTML=`<td><input type="text" value="${esc(row.name)}" placeholder="Mr Nash Clark" oninput="teacherRows[${i}].name=this.value"></td>
            <td><input type="text" value="${esc(row.subject)}" placeholder="Year 10 Maths" list="deptDatalist" oninput="teacherRows[${i}].subject=this.value"></td>
            <td><input type="text" value="${esc(row.room)}" placeholder="Senior South 1.4" list="roomDatalist" oninput="teacherRows[${i}].room=this.value"></td>
            <td><button class="btn-remove" onclick="removeRow(${i})">&#10005;</button></td>`;
        tbody.appendChild(tr);
    });
}

function esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function addRow(data){ teacherRows.push(data||{name:'',subject:'',room:''}); renderTable(); if(!data) document.querySelectorAll('#teacherBody tr:last-child input')[0]?.focus(); }
function removeRow(i){ teacherRows.splice(i,1); renderTable(); }

// ── CSV Template & Upload ─────────────────────────────────────────
function downloadCSVTemplate() {
    const csv = 'Teacher Name,Subject / Year Level,Room\n"Smith, John","Year 10 Mathematics","Room 101"\n"Jones, Mary","Year 9 Science","Senior South 1.4"\n';
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = 'pti_teachers_template.csv';
    a.click();
}

function _parseCSVLine(line) {
    const result = []; let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') { inQ = !inQ; }
        else if (c === ',' && !inQ) { result.push(cur); cur = ''; }
        else { cur += c; }
    }
    result.push(cur);
    return result;
}

function uploadCSV(e) {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
        const lines = ev.target.result.split(/\r?\n/).filter(l => l.trim());
        const rows = lines.slice(1).map(l => {
            const p = _parseCSVLine(l);
            return { name:(p[0]||'').trim(), subject:(p[1]||'').trim(), room:(p[2]||'').trim() };
        }).filter(r => r.name || r.subject || r.room);
        if (!rows.length) { toast('No teacher data found in CSV.'); e.target.value = ''; return; }
        rows.forEach(r => teacherRows.push(r));
        renderTable();
        toast(`Imported ${rows.length} teacher(s) from CSV.`);
        e.target.value = '';
    };
    reader.readAsText(file);
}

// ── Firebase / Online Teacher Status ─────────────────────────────
function getFirebaseUrl() { return (localStorage.getItem('pti_firebase_url')||'').replace(/\/$/,''); }

function saveFirebaseConfig() {
    const url = document.getElementById('firebaseUrl').value.trim().replace(/\/$/,'');
    if (url && !url.startsWith('https://')) { toast('URL must start with https://'); return; }
    if (url) {
        localStorage.setItem('pti_firebase_url', url);
        generateTeacherQR(url);
        toast('Firebase URL saved.');
    } else {
        localStorage.removeItem('pti_firebase_url');
        document.getElementById('teacherQRSection').style.display = 'none';
        toast('Firebase URL cleared.');
    }
}

function clearOnlineTeachers() {
    const url = getFirebaseUrl();
    if (!url) { toast('No Firebase URL saved yet.'); return; }
    fetch(url + '/pti-online.json', { method: 'DELETE' })
        .then(() => toast('All online statuses cleared.'))
        .catch(() => toast('Could not reach Firebase — check the URL.'));
}

function generateTeacherQR(dbUrl) {
    dbUrl = (dbUrl||'').trim().replace(/\/$/,'');
    if (!dbUrl) { toast('Enter and save a Firebase URL first.'); return; }
    const base = window.location.href.replace(/[^/]*$/, '');
    const iv   = parseInt(document.getElementById('interviewDuration').value) || 10;
    const sn   = document.getElementById('schoolName').value.trim() || 'PTI';
    const link = base + 'teacher.html?db=' + encodeURIComponent(dbUrl) +
                 '&iv=' + iv + '&sn=' + encodeURIComponent(sn);
    const container = document.getElementById('teacherQRCode');
    container.innerHTML = '';
    try {
        new QRCode(container, { text: link, width: 148, height: 148,
            colorDark:'#000000', colorLight:'#ffffff', correctLevel: QRCode.CorrectLevel.M });
        document.getElementById('teacherQRSection').style.display = 'block';
    } catch(ex) {
        container.textContent = link;
        document.getElementById('teacherQRSection').style.display = 'block';
    }
}

document.getElementById('schoolLogo').addEventListener('change',function(){
    const file=this.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=e=>{
        logoDataUrl=e.target.result;
        document.getElementById('logoPreviewWrap').innerHTML=`<img src="${logoDataUrl}" alt="Logo preview">`;
        const pl=document.getElementById('previewLogo'); pl.src=logoDataUrl; pl.style.display='block';
    };
    reader.readAsDataURL(file);
});

function collectSettings() {
    const start=document.getElementById('startTime').value, finish=document.getElementById('finishTime').value;
    const iv=parseInt(document.getElementById('interviewDuration').value)||0;
    const brk=parseInt(document.getElementById('breakDuration').value)||0;
    return {
        schoolName: document.getElementById('schoolName').value.trim(), logoDataUrl,
        primaryColour: document.getElementById('primaryColour').value,
        secondaryColour: document.getElementById('secondaryColour').value,
        startTime:start, finishTime:finish, interviewDuration:iv, breakDuration:brk,
        numberOfInterviews:(start&&finish&&iv)?calcN(start,finish,iv,brk):0
    };
}

function applySettings(s) {
    if(!s) return;
    if(s.schoolName)        document.getElementById('schoolName').value=s.schoolName;
    if(s.primaryColour)     document.getElementById('primaryColour').value=s.primaryColour;
    if(s.secondaryColour)   document.getElementById('secondaryColour').value=s.secondaryColour;
    if(s.startTime)         document.getElementById('startTime').value=s.startTime;
    if(s.finishTime)        document.getElementById('finishTime').value=s.finishTime;
    if(s.interviewDuration) document.getElementById('interviewDuration').value=s.interviewDuration;
    if(s.breakDuration!==undefined) document.getElementById('breakDuration').value=s.breakDuration;
    if(s.logoDataUrl){
        logoDataUrl=s.logoDataUrl;
        document.getElementById('logoPreviewWrap').innerHTML=`<img src="${logoDataUrl}" alt="Logo preview">`;
        const pl=document.getElementById('previewLogo'); pl.src=logoDataUrl; pl.style.display='block';
    }
}

function validate() {
    const s=collectSettings();
    if(!s.startTime||!s.finishTime){toast('Please set start and finish times.');return false;}
    if(!s.interviewDuration){toast('Please set an interview duration.');return false;}
    if(s.numberOfInterviews<1){toast('Timing values result in 0 interviews — please check.');return false;}
    return true;
}

function saveAndLaunch(){ if(!validate()) return; persist(); window.open('display.html','_blank'); }
function previewRooms(){ persist(); window.open('rooms.html','_blank'); }
function resetAll(){
    if(!confirm('Reset all settings? This cannot be undone.')) return;
    Object.values(KEYS).forEach(k=>localStorage.removeItem(k));
    location.reload();
}

let toastTimer;
function toast(msg){
    const el=document.getElementById('toast');
    el.textContent=msg; el.classList.add('visible');
    clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('visible'),3500);
}

function init() {
    const activeName=getActiveName(), sessions=getAllSessions();
    if(activeName && sessions[activeName]) {
        applyPayload(sessions[activeName]);
    } else {
        applySettings(loadData(KEYS.settings,{}));
        teacherRows=loadData(KEYS.teachers,[]);
        deptList=loadData(KEYS.departments,[]);
        roomList=loadData(KEYS.rooms,[]);
        applySounds(loadData(KEYS.sounds,{}));
        renderTable(); renderDepts(); renderRooms(); updateDataLists();
        updateBrandingPreview(); updateTimingPreview();
    }
    renderSessionUI();
    document.getElementById('sessionNameInput').value=activeName||'';
    // Load Firebase URL if previously saved
    const savedFbUrl = getFirebaseUrl();
    if (savedFbUrl) {
        document.getElementById('firebaseUrl').value = savedFbUrl;
        generateTeacherQR(savedFbUrl);
    }

    bindPMSInput('primaryPMS','primaryColour','primaryHex','primaryPMSStatus');
    bindPMSInput('secondaryPMS','secondaryColour','secondaryHex','secondaryPMSStatus');
    document.getElementById('schoolName').addEventListener('input',updateBrandingPreview);
    document.getElementById('primaryColour').addEventListener('input',updateBrandingPreview);
    document.getElementById('secondaryColour').addEventListener('input',updateBrandingPreview);
    ['startTime','finishTime','interviewDuration','breakDuration'].forEach(id=>
        document.getElementById(id).addEventListener('input',updateTimingPreview));
}

init();
