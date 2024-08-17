const qrCodeDiv = document.getElementById('generator');
const qrInput = document.getElementById('urlInput');
const generateQrCodeButton = document.getElementById('generate-qrcode');
const qrcodeCanvas = document.getElementById('qrcode-canvas');
const downloadQrCodeButton = document.getElementById('download-qrcode');
const qrFileInput = document.getElementById('qr-file');
const readQrCodeButton = document.getElementById('read-qrcode');
const qrResultDiv = document.getElementById('qrResult');

generateQrCodeButton.addEventListener('click', () => {
    const text = qrInput.value.trim();
    if (text) {
        const qr = new QRious({
            element: qrcodeCanvas,
            value: text,
            size: 200,
            background: 'white',
            foreground: 'black'
        });
    }
});

downloadQrCodeButton.addEventListener('click', () => {
    const imageData = qrcodeCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imageData;
    link.download = 'qrcode.png';
    link.click();
});

readQrCodeButton.addEventListener('click', () => {
    const file = qrFileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const imageData = reader.result;
            // console.log('Image data:', imageData);
            try {
                const qrCode = new jsQR();
                qrCode.decode(imageData, 200, 200);
                const result = qrCode.getData();
                qrResultDiv.innerText = result;
            } catch (error) {
                console.error('Error reading QR code:', error);
                qrResultDiv.innerText = 'Error reading QR code';
            }
        };
        reader.readAsDataURL(file);
    }
});
