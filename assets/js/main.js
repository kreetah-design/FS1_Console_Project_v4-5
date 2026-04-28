let fs1Characteristic;

async function connectBLE() {
    if (fs1Characteristic) return;
    try {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ name: 'FS-1-Console' }],
            optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b']
        });
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService('4fafc201-1fb5-459e-8fcc-c5c9c331914b');
        fs1Characteristic = await service.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8');
        document.getElementById('link-btn').classList.add('linked');
    } catch (error) { console.log("BLE Connection Failed."); }
}

function sendCommand(cmd) {
    if (fs1Characteristic && document.getElementById('pwr-sw').checked) {
        const encoder = new TextEncoder();
        fs1Characteristic.writeValue(encoder.encode(cmd));
    }
}
