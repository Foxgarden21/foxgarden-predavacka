// Číslování zakázek
let orderNumber = localStorage.getItem('foxOrder') || 1;
document.getElementById('orderNumber').textContent = orderNumber;

// Podpisový pad
const canvas = document.getElementById('signaturePad');
const signaturePad = new SignaturePad(canvas);

document.getElementById('clearSignature').addEventListener('click', () => {
    signaturePad.clear();
});

// Generování QR kódu
function updateQR() {
    const data = Array.from(document.querySelectorAll('input, textarea'))
        .map(field => `${field.placeholder}: ${field.value}`).join('\n');
    
    document.getElementById('qrCode').innerHTML = '';
    new QRCode(document.getElementById('qrCode'), {
        text: data,
        width: 128,
        height: 128
    });
}

document.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', updateQR);
});

// PDF generování
document.getElementById('downloadPdf').addEventListener('click', async () => {
    const element = document.querySelector('.container');
    const opt = {
        margin: 10,
        filename: `FoxGarden_Zakazka_${orderNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
    localStorage.setItem('foxOrder', ++orderNumber);
});

// Odesílání e-mailu
document.getElementById('sendEmail').addEventListener('click', () => {
    const subject = `Fox Garden - zakázka č. ${orderNumber}`;
    const body = Array.from(document.querySelectorAll('input, textarea'))
        .map(field => `${field.placeholder}: ${field.value}`).join('%0D%0A');
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent
