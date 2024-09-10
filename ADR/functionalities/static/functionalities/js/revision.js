document.addEventListener('DOMContentLoaded', function () {
    const pdfFileInput = document.getElementById('pdf-file');
    const uploadPdfButton = document.getElementById('upload-pdf-button');
    const loadingText = document.getElementById('loading');
    const revisionTextHeader = document.getElementById('revision-text-header');
    const revisionTextContent = document.getElementById('revision-text-content');
    const previewScreen = document.getElementById('preview');
    const previewButton = document.getElementById('show-preview-button');
    const sliderSection = document.getElementById('pdf-slider');
    const widthSlider = document.getElementById('width-slider');
    // const downloadButton = document.getElementById('download-button');
    const smalldownloadButton = document.getElementById('small-button');
    const mediumdownloadButton = document.getElementById('medium-button');
    const largedownloadButton = document.getElementById('large-button');
    let widthValue = 0.2;
    let isPreviewVisible = false;

    uploadPdfButton.addEventListener('click', function (event) {
        event.preventDefault();
        const pdfFile = pdfFileInput.files[0];
        const formData = new FormData();
        formData.append('pdf-file', pdfFile);
        loadingText.style.display = 'block';

        fetch(revisionSheetBuilderUrl, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                const summary = data.summary
                formattedSummary = summary.replace(/\*\*(.*?)\*\*/g, '<h3>$1</h3>').replace(/\*(.*?)\n/g, '<p>$1<br/></p>').replace(/\n/g, '<p>');
                revisionTextContent.innerHTML = formattedSummary;

                loadingText.style.display = 'none';
                revisionTextHeader.style.display = 'block';
                revisionTextContent.style.display = 'block';
                previewButton.style.display = 'block';
                // downloadButton.style.display = 'block';
            })
            .catch(error => console.error('Error:', error));
    });

    previewButton.addEventListener('click', function() {
        isPreviewVisible = !isPreviewVisible;
        if (isPreviewVisible) {
            previewScreen.style.display = 'flex';
            // sliderSection.style.display = 'block';
            smalldownloadButton.style.display = 'block';
            mediumdownloadButton.style.display = 'block';
            largedownloadButton.style.display = 'block';
            revisionTextContent.style.opacity = 0.6;
        } else {
            previewScreen.style.display = 'none';
            sliderSection.style.display = 'none';
            smalldownloadButton.style.display = 'none';
            mediumdownloadButton.style.display = 'none';
            largedownloadButton.style.display = 'none';
            revisionTextContent.style.opacity = 1;
        }
    });

    widthSlider.onchange = function () {
        widthValue = this.value;
        previewScreen.style.width = ((1 - widthValue) * 262) + 'mm';
        previewScreen.style.height = ((1 - widthValue) * 262 * 1.41) + 'mm';
        document.getElementById('slider-value').innerText = widthValue;
    };

    smalldownloadButton.addEventListener('mouseover', function(){
        const widthinmm = 240;
        previewScreen.style.width = (widthinmm) + 'mm';
        previewScreen.style.height = (widthinmm * 1.41) + 'mm';
    })

    smalldownloadButton.addEventListener('click', function () {
        // const valueWidth = document.getElementById('slider-value').innerText;
        const pdf = new jspdf.jsPDF();

        // Formatting the summary for the pdf file
        const summaryText = '<div style="font-family: Arial, sans-serif; white-space: pre; width: 50px">' +
            '<h3 style="font-size: 12px; text-align: center;">Revision Sheet</h3>' +
            '<p style="font-size: 9px; text-align: center;">From Adriein (adreinn.eu.pythonanywhere.com)</p><br>' +
            formattedSummary +
            '</div>';

        // Add the formatted summary to the page
        pdf.html(summaryText, {
            callback: function (pdf) {
                pdf.save('revision_sheet.pdf');
            },
            // margin: 10,
            // autopaging: 'text',
            // html2canvas: {
                // scale: valueWidth
            // },
            x: 10,
            y: 10,
            width: 0.16,
            windowWidth: 1
        });
    });

    mediumdownloadButton.addEventListener('mouseover', function () {
        const widthinmm = 212;
        previewScreen.style.width = (widthinmm) + 'mm';
        previewScreen.style.height = (widthinmm * 1.41) + 'mm';
    })

    mediumdownloadButton.addEventListener('click', function () {
        const valueWidth = document.getElementById('slider-value').innerText;
        const pdf = new jspdf.jsPDF();

        const summaryText = '<div style="font-family: Arial, sans-serif; white-space: pre; width: 50px">' +
            '<h3 style="font-size: 12px; text-align: center;">Revision Sheet</h3>' +
            '<p style="font-size: 9px; text-align: center;">From Adriein (adreinn.eu.pythonanywhere.com)</p><br>' +
            formattedSummary +
            '</div>';

        pdf.html(summaryText, {
            callback: function (pdf) {
                pdf.save('revision_sheet.pdf');
            },
            x: 10,
            y: 10,
            width: 0.18,
            windowWidth: 1
        });
    });

    largedownloadButton.addEventListener('mouseover', function () {
        const widthinmm = 190;
        previewScreen.style.width = (widthinmm) + 'mm';
        previewScreen.style.height = (widthinmm * 1.41) + 'mm';
    })

    largedownloadButton.addEventListener('click', function () {
        const valueWidth = document.getElementById('slider-value').innerText;
        const pdf = new jspdf.jsPDF();

        const summaryText = '<div style="font-family: Arial, sans-serif; white-space: pre; width: 50px">' +
            '<h3 style="font-size: 12px; text-align: center;">Revision Sheet</h3>' +
            '<p style="font-size: 9px; text-align: center;">From Adriein (adreinn.eu.pythonanywhere.com)</p><br>' +
            formattedSummary +
            '</div>';

        pdf.html(summaryText, {
            callback: function (pdf) {
                pdf.save('revision_sheet.pdf');
            },
            x: 10,
            y: 10,
            width: 0.2,
            windowWidth: 1
        });
    });
});
