document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.loading');
    const observerOptions = { threshold: 0.1 };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    sections.forEach(section => observer.observe(section));
  
    document.querySelectorAll('.pdf-preview').forEach(async (preview) => {
      const pdfUrl = preview.dataset.pdf;
      if (pdfUrl) {
        await loadPDFJS();
        loadPDF(pdfUrl, preview);
      }
    });
  });
  
  async function loadPDF(url, canvas) {
    try {
      const loadingTask = pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });
  
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
  
      await page.render({ canvasContext: context, viewport }).promise;
    } catch (error) {
      console.error('Error loading PDF:', error);
      canvas.classList.add('error');
      canvas.textContent = 'Failed to load PDF.';
    }
  }
  
  const downloadLink = document.createElement('a');
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  
  function downloadPDF(pdfUrl, filename) {
    downloadLink.href = pdfUrl;
    downloadLink.download = filename;
    downloadLink.click();
  }
  