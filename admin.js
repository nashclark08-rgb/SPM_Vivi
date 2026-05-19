const KEYS = {
    settings:'pti_settings', teachers:'pti_teachers', sounds:'pti_sounds',
    sessions:'pti_sessions_v2', active:'pti_active_session'
};

// Trinity Anglican College's Firebase Realtime Database. Hardcoded as a
// default so fresh browsers / cleared caches / new devices auto-populate
// the field without the user needing to paste-and-save it every time.
// If anyone forks this repo for another school, change this constant.
const DEFAULT_FIREBASE_URL = 'https://spmvivi-d8f6b-default-rtdb.firebaseio.com';

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
    '2965':'#003B5C',
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

function bindPMSInput(inputId, colourId, hexDisplayId, statusId, swatchId) {
    const el = document.getElementById(inputId);
    function run() {
        const hex = lookupPantone(el.value);
        const status = document.getElementById(statusId);
        const swatch = document.getElementById(swatchId);
        if (hex) {
            document.getElementById(colourId).value = hex;
            document.getElementById(hexDisplayId).textContent = hex;
            swatch.style.background = hex;
            status.textContent = '✓ ' + hex; status.className = 'pms-status found';
            updateBrandingPreview(); autosave();
        } else if (el.value.trim()) {
            swatch.style.background = '#ccc';
            status.textContent = '✗ Code not found'; status.className = 'pms-status notfound';
        } else {
            swatch.style.background = '#ccc';
            status.textContent = ''; status.className = 'pms-status';
        }
    }
    el.addEventListener('input', run);
    el.addEventListener('change', run);
    el.addEventListener('keydown', function(e) { if (e.key === 'Enter') { e.preventDefault(); run(); } });
}

function bindHexInput(inputId, colourId, hexDisplayId, swatchId) {
    const el = document.getElementById(inputId);
    function run() {
        const raw = el.value.trim();
        const hex = /^#?[0-9A-Fa-f]{6}$/.test(raw) ? (raw.startsWith('#') ? raw : '#' + raw) : null;
        const swatch = document.getElementById(swatchId);
        if (hex) {
            document.getElementById(colourId).value = hex;
            document.getElementById(hexDisplayId).textContent = hex;
            swatch.style.background = hex;
            updateBrandingPreview(); autosave();
        } else {
            swatch.style.background = '#ccc';
        }
    }
    el.addEventListener('input', run);
    el.addEventListener('change', run);
    el.addEventListener('keydown', function(e) { if (e.key === 'Enter') { e.preventDefault(); run(); } });
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

let teacherRows = [], logoDataUrl = '';


function getAllSessions() { try { return JSON.parse(localStorage.getItem(KEYS.sessions))||{}; } catch { return {}; } }
function getActiveName()  { return localStorage.getItem(KEYS.active)||''; }

// ── Firebase-backed session sync ──────────────────────────────────
// Sessions are mirrored to Firebase so they're visible on every device
// that uses the same Firebase URL. Local writes happen first (fast UI),
// then push to Firebase in the background. Reads pull Firebase contents
// into localStorage on page load and every 30s.
const FB_SESSIONS_PATH = '/pti-sessions';

// Firebase keys can't contain . # $ / [ ] -- encodeURIComponent handles
// most of those, but . must be escaped manually.
function sessionKey(name) {
    return encodeURIComponent(name).replace(/\./g, '%2E');
}

async function fetchSessionsFromFirebase() {
    const fb = getFirebaseUrl();
    if (!fb) return null;
    const r = await fetch(fb + FB_SESSIONS_PATH + '.json');
    if (!r.ok) throw new Error('Firebase fetch failed: HTTP ' + r.status);
    const data = await r.json();
    if (!data || typeof data !== 'object') return {};
    const out = {};
    Object.values(data).forEach(entry => {
        if (entry && entry.name && entry.payload) out[entry.name] = entry.payload;
    });
    return out;
}

async function uploadSessionToFirebase(name, payload) {
    const fb = getFirebaseUrl();
    if (!fb) return false;
    try {
        const r = await fetch(fb + FB_SESSIONS_PATH + '/' + sessionKey(name) + '.json', {
            method: 'PUT',
            body: JSON.stringify({ name, payload, updatedAt: Date.now() })
        });
        return r.ok;
    } catch (e) { return false; }
}

async function deleteSessionFromFirebase(name) {
    const fb = getFirebaseUrl();
    if (!fb) return false;
    try {
        const r = await fetch(fb + FB_SESSIONS_PATH + '/' + sessionKey(name) + '.json',
            { method: 'DELETE' });
        return r.ok;
    } catch (e) { return false; }
}

// Pull Firebase sessions into localStorage. Strategy: Firebase entries
// take precedence (so updates from other devices win), but local-only
// entries are kept (so unsynced offline saves aren't wiped).
// Caveat: deletions made on another device don't propagate here -- the
// "Refresh from cloud" button below does a full replace for that case.
async function syncSessionsFromFirebase() {
    try {
        const fbSessions = await fetchSessionsFromFirebase();
        if (fbSessions === null) return false;
        const local = getAllSessions();
        const merged = { ...local, ...fbSessions };
        if (JSON.stringify(merged) !== JSON.stringify(local)) {
            localStorage.setItem(KEYS.sessions, JSON.stringify(merged));
            renderSessionUI();
        }
        return true;
    } catch (e) { return false; }
}

// Full replace: drops local-only sessions and adopts whatever Firebase says.
// Use this to propagate deletes from other devices.
async function refreshSessionsFromCloud() {
    try {
        const fbSessions = await fetchSessionsFromFirebase();
        if (fbSessions === null) { toast('Firebase URL not set.'); return; }
        localStorage.setItem(KEYS.sessions, JSON.stringify(fbSessions));
        renderSessionUI();
        const n = Object.keys(fbSessions).length;
        toast('Synced ' + n + ' session' + (n === 1 ? '' : 's') + ' from cloud.');
    } catch (e) {
        toast('Could not reach Firebase. Local sessions kept.');
    }
}

function buildPayload() {
    return { settings: collectSettings(), teachers: teacherRows, sounds: collectSounds() };
}

async function saveSession() {
    const name = document.getElementById('sessionNameInput').value.trim();
    if (!name) { toast('Enter a session name first.'); return; }
    const payload = buildPayload();
    const sessions = getAllSessions(); sessions[name] = payload;
    localStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
    localStorage.setItem(KEYS.active, name);
    persist(); renderSessionUI();
    const synced = await uploadSessionToFirebase(name, payload);
    toast(synced
        ? `Session "${name}" saved (available on all devices).`
        : `Session "${name}" saved locally only — cloud sync failed.`);
}
async function updateSession() {
    const name = getActiveName();
    if (!name) { toast('No active session — use Save to create one.'); return; }
    const payload = buildPayload();
    const sessions = getAllSessions(); sessions[name] = payload;
    localStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
    persist();
    const synced = await uploadSessionToFirebase(name, payload);
    toast(synced
        ? `Session "${name}" updated (available on all devices).`
        : `Session "${name}" updated locally only — cloud sync failed.`);
}
function loadSelectedSession() {
    const name = document.getElementById('sessionSelect').value;
    if (!name) { toast('Select a session to load.'); return; }
    const s = getAllSessions()[name]; if (!s) { toast('Session not found.'); return; }
    applyPayload(s); localStorage.setItem(KEYS.active, name);
    document.getElementById('sessionNameInput').value = name;
    persist(); renderSessionUI(); toast(`Session "${name}" loaded.`);
}
async function deleteSelectedSession() {
    const name = document.getElementById('sessionSelect').value;
    if (!name) { toast('Select a session to delete.'); return; }
    if (!confirm(`Delete session "${name}" from all devices?`)) return;
    const sessions = getAllSessions(); delete sessions[name];
    localStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
    if (getActiveName()===name) localStorage.removeItem(KEYS.active);
    renderSessionUI();
    const synced = await deleteSessionFromFirebase(name);
    toast(synced
        ? `Session "${name}" deleted from all devices.`
        : `Session "${name}" deleted locally only — cloud delete failed.`);
}
function exportSelectedSession() {
    const name = document.getElementById('sessionSelect').value;
    if (!name) { toast('Select a session to export.'); return; }
    const payload = getAllSessions()[name];
    if (!payload) { toast('Session not found.'); return; }
    const file = { format: 'spm-vivi-session', version: 1, name, exportedAt: new Date().toISOString(), payload };
    const blob = new Blob([JSON.stringify(file, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_') + '.spm-vivi.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast(`Exported "${name}".`);
}

function importSession(ev) {
    const file = ev.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = async e => {
        let data;
        try { data = JSON.parse(e.target.result); }
        catch { toast('That file is not valid JSON.'); ev.target.value = ''; return; }
        if (data.format !== 'spm-vivi-session' || !data.payload) {
            toast('That file is not an SPM_Vivi session export.'); ev.target.value = ''; return;
        }
        let name = (data.name || 'Imported session').trim() || 'Imported session';
        const sessions = getAllSessions();
        if (sessions[name]) {
            const overwrite = confirm(`A session called "${name}" already exists.\n\nOK = overwrite it\nCancel = save as a new copy`);
            if (!overwrite) {
                let i = 2;
                while (sessions[`${name} (${i})`]) i++;
                name = `${name} (${i})`;
            }
        }
        sessions[name] = data.payload;
        localStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
        renderSessionUI();
        document.getElementById('sessionSelect').value = name;
        ev.target.value = '';
        const synced = await uploadSessionToFirebase(name, data.payload);
        toast(synced
            ? `Imported "${name}" (available on all devices). Click Load to apply it.`
            : `Imported "${name}" locally. Cloud sync failed — click Load to apply it.`);
    };
    reader.readAsText(file);
}

function applyPayload(s) {
    if (s.settings) applySettings(s.settings);
    teacherRows = s.teachers||[];
    applySounds(s.sounds);
    renderTable();
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
    localStorage.setItem(KEYS.settings,  JSON.stringify(collectSettings()));
    localStorage.setItem(KEYS.teachers,  JSON.stringify(teacherRows));
    localStorage.setItem(KEYS.sounds,    JSON.stringify(collectSounds()));
}

let autosaveTimer;
function autosave() { clearTimeout(autosaveTimer); autosaveTimer = setTimeout(persist, 400); }

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

function updateTeacher(i, field, val) { if (teacherRows[i]) teacherRows[i][field] = val; }

function renderTable() {
    const tbody=document.getElementById('teacherBody');
    const countEl=document.getElementById('teacherCount');
    if(countEl) countEl.textContent=teacherRows.length ? teacherRows.length+' teacher'+(teacherRows.length!==1?'s':'') : '';
    if(!teacherRows.length){
        tbody.innerHTML='<tr><td colspan="4" class="empty-msg">No teachers added yet — click &quot;+ Add Teacher&quot; below.</td></tr>';
        return;
    }
    tbody.innerHTML='';
    teacherRows.forEach((row,i)=>{
        const tr=document.createElement('tr');
        const nameEl    = document.createElement('td');
        const subjectEl = document.createElement('td');
        const roomEl    = document.createElement('td');
        const btnEl     = document.createElement('td');

        function makeInput(val, placeholder, field) {
            const inp = document.createElement('input');
            inp.type = 'text'; inp.value = val||''; inp.placeholder = placeholder;
            inp.addEventListener('input', function() { updateTeacher(i, field, this.value); autosave(); });
            return inp;
        }

        nameEl.appendChild(makeInput(row.name,    'Mr Nash Clark',    'name'));
        subjectEl.appendChild(makeInput(row.subject, 'Year 10 Maths', 'subject'));
        roomEl.appendChild(makeInput(row.room,    'Senior South 1.4', 'room'));

        const btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'btn-remove'; btn.innerHTML = '&#10005;';
        btn.addEventListener('click', function() { removeRow(i); });
        btnEl.appendChild(btn);

        tr.append(nameEl, subjectEl, roomEl, btnEl);
        tbody.appendChild(tr);
    });
}

function esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function addRow(data){ teacherRows.push(data||{name:'',subject:'',room:''}); renderTable(); autosave(); const inputs=document.querySelectorAll('#teacherBody tr:last-child input'); if(inputs.length&&!data) inputs[0].focus(); }
function removeRow(i){ teacherRows.splice(i,1); renderTable(); autosave(); }

// ── CSV Template & Upload ─────────────────────────────────────────
function downloadCSVTemplate() {
    const csv = 'Teacher Name,Subject / Year Level,Room\n"Smith, John","Year 10 Mathematics","Room 101"\n"Jones, Mary","Year 9 Science","Senior South 1.4"\n';
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = 'pti_teachers_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
        renderTable(); autosave();
        toast(`Imported ${rows.length} teacher(s) from CSV.`);
        e.target.value = '';
    };
    reader.readAsText(file);
}

// ── Firebase / Online Teacher Status ─────────────────────────────
// Returns the saved URL if present, otherwise the hardcoded default
// (and persists the default so subsequent calls are consistent).
function getFirebaseUrl() {
    let url = (localStorage.getItem('pti_firebase_url')||'').replace(/\/$/,'');
    if (!url) {
        url = DEFAULT_FIREBASE_URL;
        localStorage.setItem('pti_firebase_url', url);
    }
    return url;
}

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

function buildTeacherLink(dbUrl) {
    const s    = JSON.parse(localStorage.getItem(KEYS.settings) || '{}');
    const base = window.location.href.replace(/[^/]*$/, '');
    const iv   = parseInt(document.getElementById('interviewDuration').value) || s.interviewDuration || 10;
    const bk   = parseInt(document.getElementById('breakDuration').value)     || s.breakDuration     || 0;
    const st   = document.getElementById('startTime').value || s.startTime || '';
    const finish = document.getElementById('finishTime').value || s.finishTime || '';
    const ni   = (st && finish && iv) ? calcN(st, finish, iv, bk) : (s.numberOfInterviews || 0);
    const sn   = document.getElementById('schoolName').value.trim() || s.schoolName || 'SPM';
    const ev   = s.sessionName || '';
    return base + 'teacher.html?db=' + encodeURIComponent(dbUrl) +
           '&iv=' + iv + '&bk=' + bk + '&ni=' + ni +
           '&st=' + encodeURIComponent(st) +
           '&sn=' + encodeURIComponent(sn) +
           '&ev=' + encodeURIComponent(ev);
}

function generateTeacherQR(dbUrl) {
    dbUrl = (dbUrl||'').trim().replace(/\/$/,'');
    if (!dbUrl) { toast('Enter and save a Firebase URL first.'); return; }
    const link = buildTeacherLink(dbUrl);
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
        autosave();
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
    if(s.primaryColour)  { document.getElementById('primaryColour').value=s.primaryColour; document.getElementById('primaryHex').textContent=s.primaryColour; }
    if(s.secondaryColour){ document.getElementById('secondaryColour').value=s.secondaryColour; document.getElementById('secondaryHex').textContent=s.secondaryColour; }
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

// ── QR helpers ────────────────────────────────────────────────────
// qrcodejs has a hard byte-capacity limit (~2953 chars at level L) and silently
// fails for longer URLs — common once you have ~40+ teachers since the rooms
// payload is embedded in the URL hash. Fallback uses a server-side generator
// that handles long URLs reliably.
function _qrCodeJsDataUrl(text, size) {
    if (typeof QRCode === 'undefined') return '';
    const tmp = document.createElement('div');
    tmp.style.cssText = 'position:absolute;left:-9999px;top:-9999px;';
    document.body.appendChild(tmp);
    let result = '';
    try {
        new QRCode(tmp, { text, width: size, height: size,
            colorDark: '#000000', colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.L });
        const imgEl = tmp.querySelector('img');
        if (imgEl && imgEl.src && imgEl.src.startsWith('data:')) {
            result = imgEl.src;
        } else {
            const canvasEl = tmp.querySelector('canvas');
            if (canvasEl) { try { result = canvasEl.toDataURL('image/png'); } catch(e) {} }
        }
    } catch (e) {}
    document.body.removeChild(tmp);
    return result;
}
function _qrServerUrl(text, size) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&qzone=1`;
}
function getQrImageHTML(text, size) {
    const dataUrl = _qrCodeJsDataUrl(text, size);
    const src = dataUrl || _qrServerUrl(text, size);
    return `<img src="${src}" width="${size}" height="${size}" alt="QR Code" style="display:block;margin:0 auto;">`;
}
// Builds the rooms URL embedded in the print/Word QR.
// If Firebase is configured, uploads the payload and returns a SHORT
// `rooms.html?r=<id>&fb=<url>` (small QR, easy to scan).
// Otherwise falls back to a long `rooms.html#<base64>` (dense QR, may not scan).
async function buildShortRoomsUrl(base, payload, fbUrl) {
    if (fbUrl) {
        try {
            const r = await fetch(fbUrl + '/pti-rooms.json', {
                method: 'POST',
                body: JSON.stringify({ data: payload, createdAt: Date.now() })
            });
            if (r.ok) {
                const j = await r.json();
                if (j && j.name) {
                    return base + 'rooms.html?r=' + encodeURIComponent(j.name) +
                                  '&fb=' + encodeURIComponent(fbUrl);
                }
            }
        } catch (e) {}
    }
    try {
        return base + 'rooms.html#' + btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    } catch (e) { return base + 'rooms.html'; }
}

async function getQrDataUrl(text, size) {
    const dataUrl = _qrCodeJsDataUrl(text, size);
    if (dataUrl) return dataUrl;
    try {
        const r = await fetch(_qrServerUrl(text, size));
        if (!r.ok) return '';
        const blob = await r.blob();
        return await new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => resolve('');
            reader.readAsDataURL(blob);
        });
    } catch (e) { return ''; }
}

// ── Print A4 Parent Sheet ─────────────────────────────────────────
async function printParentSheet() {
    // Open window synchronously so popup blockers don't fire after the await
    const win = window.open('', '_blank');
    if (!win) { toast('Popup blocked — please allow popups for this site and try again.'); return; }
    win.document.write('<!DOCTYPE html><html><head><title>Preparing print sheet…</title><style>body{font-family:sans-serif;padding:3rem;color:#666;text-align:center}</style></head><body><p>Preparing print sheet…</p></body></html>');

    const s = JSON.parse(localStorage.getItem(KEYS.settings) || '{}');
    const sorted = [...teacherRows].filter(t=>t.name||t.room).sort((a,b)=>(a.name||'').localeCompare(b.name||''));
    const base = window.location.href.replace(/[^/]*$/, '');
    const fbUrl = getFirebaseUrl();

    const payload = {
        t: sorted.map(t=>({n:t.name||'',s:t.subject||'',r:t.room||''})),
        sn:s.schoolName||'', ev:s.sessionName||'',
        p:s.primaryColour||'#003B5C', sc:s.secondaryColour||'#FFFFFF',
        st:s.startTime||'', iv:s.interviewDuration||0,
        bk:s.breakDuration||0, ni:s.numberOfInterviews||0,
        fb: fbUrl
    };

    if (!fbUrl && sorted.length > 20) {
        toast('Tip: configure Firebase (section 6) so the QR stays scannable — without it, ' + sorted.length + ' teachers may produce a QR too dense for phones.');
    }

    const roomsUrl = await buildShortRoomsUrl(base, payload, fbUrl);
    const qrHtml = getQrImageHTML(roomsUrl, 360);

    const primary = s.primaryColour || '#003B5C';
    const eventName = s.sessionName || s.schoolName || 'Parent Teacher Interviews';
    const rows = sorted.map(t=>`<tr><td>${esc(t.name)}</td><td>${esc(t.subject)}</td><td>${esc(t.room)}</td></tr>`).join('');

    win.document.open();
    win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>PTI Parent Sheet</title><style>
*{box-sizing:border-box;margin:0;padding:0;}
@page{size:A4;margin:16mm;}
body{font-family:'Segoe UI',sans-serif;color:#212121;background:white;}
.hdr{text-align:center;padding-bottom:12px;margin-bottom:16px;border-bottom:3px solid ${primary};}
.logo{max-height:60px;display:block;margin:0 auto 8px;}
.school{font-size:21px;font-weight:800;color:${primary};}
.event{font-size:14px;color:#616161;margin-top:4px;}
.qr-section{text-align:center;margin-bottom:20px;}
.qr-title{font-size:16px;font-weight:700;color:${primary};margin-bottom:12px;}
.tbl-hdr{font-size:13px;font-weight:700;color:${primary};margin-bottom:7px;}
table{width:100%;border-collapse:collapse;}
th{background:${primary};color:white;padding:7px 9px;text-align:left;font-size:11px;}
td{padding:6px 9px;border-bottom:1px solid #EEEEEE;font-size:11px;}
tr:nth-child(even) td{background:#FAFAFA;}
</style></head><body>
<div class="hdr">
${s.logoDataUrl?`<img class="logo" src="${s.logoDataUrl}" alt="">`:''}
<div class="school">${esc(s.schoolName||'Parent Teacher Interviews')}</div>
${eventName!==s.schoolName?`<div class="event">${esc(eventName)}</div>`:''}
</div>
<div class="qr-section">
<div class="qr-title">&#128247; Scan for Live Timer &amp; Room Locations</div>
${qrHtml}
</div>
<div class="tbl-hdr">Teacher Room Locations</div>
<table><thead><tr><th>Teacher Name</th><th>Subject / Year Level</th><th>Room</th></tr></thead>
<tbody>${rows||'<tr><td colspan="3" style="text-align:center;color:#9E9E9E;font-style:italic;padding:14px">No teachers entered.</td></tr>'}</tbody></table>
<script>
(function(){function p(){try{window.print();}catch(e){}}
if(document.readyState==='complete'){setTimeout(p,300);}
else{window.addEventListener('load',function(){setTimeout(p,300);});}}
)();
<\/script>
</body></html>`);
    win.document.close();
}

// ── Word Doc Export ───────────────────────────────────────────────
async function downloadWordDoc() {
    const s = JSON.parse(localStorage.getItem(KEYS.settings) || '{}');
    const sorted = [...teacherRows].filter(t=>t.name||t.room).sort((a,b)=>(a.name||'').localeCompare(b.name||''));
    const base = window.location.href.replace(/[^/]*$/, '');
    const fbUrl = getFirebaseUrl();

    const payload = {
        t: sorted.map(t=>({n:t.name||'',s:t.subject||'',r:t.room||''})),
        sn:s.schoolName||'', ev:s.sessionName||'',
        p:s.primaryColour||'#003B5C', sc:s.secondaryColour||'#FFFFFF',
        st:s.startTime||'', iv:s.interviewDuration||0,
        bk:s.breakDuration||0, ni:s.numberOfInterviews||0,
        fb: fbUrl
    };

    if (!fbUrl && sorted.length > 20) {
        toast('Tip: configure Firebase (section 6) so the QR stays scannable — without it, ' + sorted.length + ' teachers may produce a QR too dense for phones.');
    }

    const roomsUrl = await buildShortRoomsUrl(base, payload, fbUrl);
    const qrDataUrl = await getQrDataUrl(roomsUrl, 280);

    const primary    = s.primaryColour || '#003B5C';
    const schoolName = s.schoolName || 'Student Progress Meetings';
    const eventName  = s.sessionName || '';
    const logoHtml   = s.logoDataUrl ? `<img src="${s.logoDataUrl}" style="height:55pt;display:block;margin:0 auto 8pt;" alt="">` : '';
    const qrHtml     = qrDataUrl
        ? `<img src="${qrDataUrl}" width="220" height="220" style="display:block;margin:0 auto;" alt="QR Code">`
        : `<p style="color:#999;font-size:9pt;">QR unavailable — both qrcodejs and the fallback generator failed (check internet).</p>`;
    const rows = sorted.map(t =>
        `<tr><td style="padding:5pt 8pt;border-bottom:1pt solid #EEEEEE;font-size:10pt;">${esc(t.name||'')}</td>` +
        `<td style="padding:5pt 8pt;border-bottom:1pt solid #EEEEEE;font-size:10pt;">${esc(t.subject||'')}</td>` +
        `<td style="padding:5pt 8pt;border-bottom:1pt solid #EEEEEE;font-size:10pt;">${esc(t.room||'')}</td></tr>`
    ).join('');

    const html =
`<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>${esc(schoolName)}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom><w:DoNotOptimizeForBrowser/></w:WordDocument></xml><![endif]-->
<style>@page{size:A4;margin:20mm;}body{font-family:Arial,sans-serif;color:#212121;}</style>
</head><body>
<div style="text-align:center;padding-bottom:12pt;margin-bottom:16pt;border-bottom:3pt solid ${primary};">
  ${logoHtml}
  <h1 style="font-size:20pt;font-weight:800;color:${primary};margin:0 0 4pt;">${esc(schoolName)}</h1>
  ${eventName?`<p style="font-size:11pt;color:#616161;margin:0;">${esc(eventName)}</p>`:''}
</div>
<div style="text-align:center;margin-bottom:20pt;">
  <p style="font-size:13pt;font-weight:bold;color:${primary};margin-bottom:10pt;">Scan for Live Timer &amp; Room Locations</p>
  ${qrHtml}
</div>
<p style="font-size:11pt;font-weight:bold;color:${primary};margin-bottom:8pt;">Teacher Room Locations</p>
<table style="width:100%;border-collapse:collapse;">
<thead><tr>
  <th style="background:${primary};color:white;padding:7pt 8pt;text-align:left;font-size:10pt;">Teacher Name</th>
  <th style="background:${primary};color:white;padding:7pt 8pt;text-align:left;font-size:10pt;">Subject / Year Level</th>
  <th style="background:${primary};color:white;padding:7pt 8pt;text-align:left;font-size:10pt;">Room</th>
</tr></thead>
<tbody>${rows||'<tr><td colspan="3" style="text-align:center;color:#9E9E9E;padding:10pt;font-style:italic;">No teachers entered.</td></tr>'}</tbody>
</table>
</body></html>`;

    const blob = new Blob(['﻿' + html], { type: 'application/msword' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = (schoolName.replace(/[^\w\s]/g,'').trim()||'SPM') + '_Teacher_Directory.doc';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast('Word document downloaded.');
}

// ── Email Template ────────────────────────────────────────────────
function showEmailTemplate() {
    const s     = JSON.parse(localStorage.getItem(KEYS.settings) || '{}');
    const event = s.sessionName || 'Student Progress Meetings';
    const fbUrl = getFirebaseUrl();
    const link  = fbUrl ? buildTeacherLink(fbUrl) : '[LINK — save Firebase URL first]';

    document.getElementById('emailText').value =
`Subject: ${event} — Online Interview Schedule

Dear Staff,

If you are conducting any ${event} interviews online via video call, please pre-schedule your online slots using the link below so that parents can see when you are in a meeting.

HOW TO PRE-SCHEDULE YOUR ONLINE MEETINGS
1. Click (or copy and paste) the link below into your browser:

   ${link}

2. Enter your name when prompted
3. Select each interview slot you will be hosting online
4. Press "Schedule My Online Meetings" to confirm
5. Your name will automatically appear on the main display screen during each of your selected time slots — no further action needed on the day

IMPORTANT NOTES
  • You only need to do this once before the session — all your slots are pre-scheduled
  • If you are not hosting any online meetings, no action is required
  • If a meeting ends early, open the link again and press "Cancel All My Sessions"
  • If you have any technical issues, please let me know

Thank you for helping to make ${event} run smoothly.

Kind regards,`;

    const linkSection = document.getElementById('emailLinkSection');
    if (fbUrl) {
        document.getElementById('emailLinkText').value = link;
        linkSection.style.display = 'block';
    } else {
        linkSection.style.display = 'none';
    }
    document.getElementById('emailModal').classList.add('open');
}

function closeEmailModal() { document.getElementById('emailModal').classList.remove('open'); }

function copyLink() {
    const el = document.getElementById('emailLinkText');
    el.select(); el.setSelectionRange(0, 99999);
    try {
        navigator.clipboard.writeText(el.value)
            .then(()=>toast('Link copied!'))
            .catch(()=>{ document.execCommand('copy'); toast('Link copied!'); });
    } catch(e) { document.execCommand('copy'); toast('Link copied!'); }
}

function copyEmailText() {
    const el = document.getElementById('emailText');
    el.select(); el.setSelectionRange(0, 99999);
    try {
        navigator.clipboard.writeText(el.value)
            .then(()=>toast('Copied to clipboard!'))
            .catch(()=>{ document.execCommand('copy'); toast('Copied to clipboard!'); });
    } catch(e) { document.execCommand('copy'); toast('Copied to clipboard!'); }
}

async function saveAndLaunch() {
    if (!validate()) return;
    const name = document.getElementById('sessionNameInput').value.trim();
    if (!name) {
        // No session name — preserve existing behaviour: just persist + launch
        persist();
        window.open('display.html', '_blank');
        return;
    }
    // Save sync to localStorage immediately so display.html sees latest state
    const payload = buildPayload();
    const sessions = getAllSessions(); sessions[name] = payload;
    localStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
    localStorage.setItem(KEYS.active, name);
    persist();
    renderSessionUI();
    // Open display window synchronously to avoid popup blockers firing after the await
    window.open('display.html', '_blank');
    // Push to Firebase in background, toast the result
    const synced = await uploadSessionToFirebase(name, payload);
    toast(synced
        ? `Session "${name}" saved (available on all devices). Display launched.`
        : `Session "${name}" saved locally only — cloud sync failed. Display launched.`);
}

function buildDisplayUrl() {
    persist();
    const s = collectSettings();
    const payload = {
        sn: s.schoolName    || '',
        ev: '',
        p:  s.primaryColour   || '#003B5C',
        sc: s.secondaryColour || '#FFFFFF',
        lg: s.logoDataUrl   || '',
        st: s.startTime          || '',
        iv: s.interviewDuration  || 0,
        bk: s.breakDuration      || 0,
        ni: s.numberOfInterviews || 0,
        t:  teacherRows.map(t => ({ n: t.name||'', s: t.subject||'', r: t.room||'' })),
        so: collectSounds(),
        fb: getFirebaseUrl()
    };
    const base = window.location.href.replace(/[^/]*$/, '');
    return base + 'display.html#' + btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}

function copyDisplayUrl() {
    if (!validate()) return;
    const url = buildDisplayUrl();
    if (url.length > 30000 && !confirm(`This URL is ${url.length.toLocaleString()} characters long, which may exceed some browser limits. A large school logo is the usual cause. Continue?`)) return;
    const done = () => toast('Display URL copied. Paste into a browser on any other PC/projector to launch a mirrored display.');
    const fallback = () => {
        const ta = document.createElement('textarea');
        ta.value = url; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); }
        catch(e) { toast('Copy failed — URL logged to console.'); console.log(url); }
        document.body.removeChild(ta);
    };
    try { navigator.clipboard.writeText(url).then(done).catch(fallback); }
    catch (e) { fallback(); }
}
function previewRooms(){ persist(); window.open('rooms.html','_blank'); }
function resetAll(){
    if(!confirm('Reset the current form? Your saved sessions will NOT be affected.')) return;
    localStorage.removeItem(KEYS.settings);
    localStorage.removeItem(KEYS.teachers);
    localStorage.removeItem(KEYS.sounds);
    localStorage.removeItem(KEYS.active);
    location.reload();
}

let toastTimer;
function toast(msg){
    const el=document.getElementById('toast');
    el.textContent=msg; el.classList.add('visible');
    clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('visible'),3500);
}

function init() {
    applySettings(loadData(KEYS.settings,{}));
    teacherRows=loadData(KEYS.teachers,[]);
    applySounds(loadData(KEYS.sounds,{}));
    renderTable();
    updateBrandingPreview(); updateTimingPreview();
    renderSessionUI();
    document.getElementById('sessionNameInput').value=getActiveName()||'';
    generateTeacherQR(getFirebaseUrl());

    bindPMSInput('primaryPMS','primaryColour','primaryHex','primaryPMSStatus','primaryPMSSwatch');
    bindPMSInput('secondaryPMS','secondaryColour','secondaryHex','secondaryPMSStatus','secondaryPMSSwatch');
    bindHexInput('primaryHEX','primaryColour','primaryHex','primaryHEXSwatch');
    bindHexInput('secondaryHEX','secondaryColour','secondaryHex','secondaryHEXSwatch');
    document.getElementById('schoolName').addEventListener('input', function(){ updateBrandingPreview(); autosave(); });
    document.getElementById('primaryColour').addEventListener('input', function() {
        document.getElementById('primaryHex').textContent = this.value;
        updateBrandingPreview(); autosave();
    });
    document.getElementById('secondaryColour').addEventListener('input', function() {
        document.getElementById('secondaryHex').textContent = this.value;
        updateBrandingPreview(); autosave();
    });
    ['startTime','finishTime','interviewDuration','breakDuration'].forEach(id=>
        document.getElementById(id).addEventListener('input', function(){ updateTimingPreview(); autosave(); }));
    document.getElementById('soundEndInterview').addEventListener('change', autosave);
    document.getElementById('soundEndBreak').addEventListener('change', autosave);

    // Cloud-sync sessions from Firebase on load and every 30s so changes
    // made on other devices appear here without manual refresh.
    syncSessionsFromFirebase();
    setInterval(syncSessionsFromFirebase, 30000);
}

init();
