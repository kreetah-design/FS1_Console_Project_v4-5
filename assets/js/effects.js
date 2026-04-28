const pwr = document.getElementById('pwr-sw');
const pre = document.getElementById('pre-sw');
const rea = document.getElementById('reac-sw');
const int = document.getElementById('int-sw');
const fld = document.getElementById('fld-sw');
const thrust = document.getElementById('thrust-slider');
const fill = document.getElementById('p-level');

pwr.addEventListener('change', () => {
    if(!pwr.checked) { fill.style.width = '0%'; thrust.value = 0; }
    if (typeof sendCommand === "function") {
        sendCommand(pwr.checked ? "PWR_ON" : "PWR_OFF");
    }
});

pre.addEventListener('change', () => sendCommand(pre.checked ? "PRE_ON" : "PRE_OFF"));
rea.addEventListener('change', () => sendCommand(rea.checked ? "REAC_ON" : "REAC_OFF"));
int.addEventListener('change', () => sendCommand(int.checked ? "INT_ON" : "INT_OFF"));
fld.addEventListener('change', () => sendCommand(fld.checked ? "FLD_ON" : "FLD_OFF"));

thrust.addEventListener('input', (e) => {
    if(pwr.checked) {
        fill.style.width = e.target.value + '%';
        sendCommand("THR:" + e.target.value);
    }
});
