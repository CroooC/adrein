const qrCodeDiv = document.getElementById('generator');
const qrInput = document.getElementById('urlInput');
const generateQrCodeButton = document.getElementById('generate-qrcode');
const qrcodeCanvas = document.getElementById('qrcode-canvas');
const downloadQrCodeButton = document.getElementById('download-qrcode');
const qrFileInput = document.getElementById('qr-file');
const gridContainer = document.getElementById('qr-grid');
const readQrCodeButton = document.getElementById('read-qrcode');
const qrResultDiv = document.getElementById('qrResult');
const gridSize = 21; // QR codes usually have a 21x21 grid for version 1
const secretLinkDiv = document.createElement('div'); // Create a div to hold the link
qrCodeDiv.appendChild(secretLinkDiv); // Append the div to the QR code generator area

const secretMessages = [
    "cqnan rb cfx tnhb... cqn vjg unenu anjlqjkun kh qxenarwp rb j tnh jwm cqrb cngc rb cqn xcqna tnh",
    "CQNAN RB CFX TNHB... CQN VJG UNENU ANJLQJKUN KH QXENARWP RB J TNH JWM CQRB CNGC RB CQN XCQNA TNH",
    "kyviv zj knf bvpj... kyv dro cvmvc ivrtyrscv sp yfmvizex zj r bvp reu kyzj kvok zj kyv fkyvi bvp",
    "KYVIV ZJ KNF BVPJ... KYV DRO CVMVC IVRTYRSCV SP YFMVIZEX ZJ R BVP REU KYZJ KVOK ZJ KYV FKYVI BVP",
];

qrInput.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        generateQrCodeButton.click();
    }
});

generateQrCodeButton.addEventListener('click', () => {
    const text = qrInput.value.trim();

    // Clear any existing content in the link div
    secretLinkDiv.innerHTML = '';

    // Check if the input matches the secret messages
    if (secretMessages.includes(text)) {
        const congratulationUrl = window.location.origin + '/congratulation/'; // assuming 'congratulation.html' is at the root of the website
        // If the input is a secret message, generate a QR code for the congratulation.html page
        const qr = new QRious({
            element: qrcodeCanvas,
            value: congratulationUrl,
            size: 200,
            background: 'white',
            foreground: 'black'
        });

        // Create a clickable link to congratulation.html
        const secretLink = document.createElement('a');
        secretLink.href = congratulationUrl;
        secretLink.innerHTML = '<p>Click here to go to the congratulation page!</p>';
        secretLink.style.display = 'block'; // Make the link appear as a block element below the QR code
        secretLink.style.marginTop = '0.5rem'; // Add some space above the link
        secretLink.style.fontFamily = '"Handjet", sans-serif';
        secretLink.style.fontSize = '1.2rem';
        secretLink.style.color = '#e74c3c';
        secretLinkDiv.appendChild(secretLink);

    } else if (text) {
        // Generate a QR code for the entered text if it's not a secret message
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

// Create a 21x21 grid for the QR code input
function createQrGrid() {
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 20px)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 20px)`;
    gridContainer.style.border = '2px solid #444444';

    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('qr-cell');
        cell.style.width = '20px';
        cell.style.height = '20px';
        cell.style.border = '0px solid #ddd';
        cell.style.backgroundColor = 'white'; // Default to white

        // Toggle cell color on click
        cell.addEventListener('click', function () {
            if (this.style.backgroundColor === 'white') {
                this.style.backgroundColor = 'black';
            } else {
                this.style.backgroundColor = 'white';
            }
        });

        gridContainer.appendChild(cell);
    }
}

// Convert the grid to a 2D array representing black/white pixels
function getQrGridData() {
    const cells = gridContainer.getElementsByClassName('qr-cell');
    const qrData = [];

    for (let row = 0; row < gridSize; row++) {
        const rowData = [];
        for (let col = 0; col < gridSize; col++) {
            const cellIndex = row * gridSize + col;
            const cell = cells[cellIndex];
            const isBlack = cell.style.backgroundColor === 'black';
            rowData.push(isBlack ? 1 : 0); // 1 for black, 0 for white
        }
        qrData.push(rowData);
    }

    return qrData;
}

// Read the QR code once the grid is recreated
readQrCodeButton.addEventListener('click', function () {
    const qrGridData = getQrGridData();

    // Simulate reading the QR code from the grid data
    try {
        const qrCode = jsQR(qrGridData, gridSize, gridSize); // Use jsQR to read the grid data
        if (qrCode && qrCode.data) {
            qrResultDiv.innerText = `QR Code Data: ${qrCode.data}`;
        } else {
            qrResultDiv.innerText = 'Error: QR code not detected.';
        }
    } catch (error) {
        qrResultDiv.innerText = 'Error reading QR code.';
        console.error(error);
    }
});

// Initialize the grid on page load
createQrGrid();
