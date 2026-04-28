let fs1Device = null;
let fs1Characteristic = null;

async function connectBLE() {
    const btn = document.getElementById('link-btn');

    // DISCONNECT LOGIC
    if (fs1Device && fs1Device.gatt.connected) {
        await fs1Device.gatt.disconnect();
        // The event listener below will handle the UI reset
        return;
    }

    // CONNECT LOGIC
    try {
        fs1Device = await navigator.bluetooth.requestDevice({
            filters: [{ name: 'FS-1-Console' }],
            optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b']
        });

        fs1Device.addEventListener('gattserverdisconnected', () => {
            btn.classList.remove('linked');
            fs1Characteristic = null;
            console.log("Disconnected.");
        });

        const server = await fs1Device.gatt.connect();
        const service = await server.getPrimaryService('4fafc201-1fb5-459e-8fcc-c5c9c331914b');
        fs1Characteristic = await service.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8');

        btn.classList.add('linked');
    } catch (error) {
        console.log("Error: " + error);
        btn.classList.remove('linked');
    }
}
