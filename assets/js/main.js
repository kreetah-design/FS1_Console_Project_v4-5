let fs1Device;
let fs1Characteristic;

async function connectBLE() {
    const btn = document.getElementById('link-btn');

    // TOGGLE OFF: If already connected, disconnect
    if (fs1Device && fs1Device.gatt.connected) {
        fs1Device.gatt.disconnect();
        btn.classList.remove('linked');
        fs1Characteristic = null;
        console.log("Disconnected from FS-1.");
        return;
    }

    // TOGGLE ON: Standard connection logic
    try {
        fs1Device = await navigator.bluetooth.requestDevice({
            filters: [{ name: 'FS-1-Console' }],
            optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b']
        });

        const server = await fs1Device.gatt.connect();
        const service = await server.getPrimaryService('4fafc201-1fb5-459e-8fcc-c5c9c331914b');
        fs1Characteristic = await service.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8');

        // Visual feedback
        btn.classList.add('linked');
        
        // Listen for accidental disconnections
        fs1Device.addEventListener('gattserverdisconnected', () => {
            btn.classList.remove('linked');
            fs1Characteristic = null;
        });

    } catch (error) { 
        console.log("BLE Connection Failed: " + error);
        btn.classList.remove('linked');
    }
}
