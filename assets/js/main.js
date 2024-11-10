document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header-nav');
  const form = document.getElementById('pdf-form');
  const mainImage = document.querySelector('.get-diplom-img img');
  const loader = document.getElementById('loader');

  // Hide/show the header when scrolling
  window.addEventListener('scroll', () =>
    header.classList.toggle('header-nav-scroll', window.scrollY > 145)
  );

  // Changing the data on the diploma
  ['name', 'gender', 'course', 'date'].forEach(id => {
    document.getElementById(id).addEventListener('input', ({ target }) => {
      const value = target.value;
      const editElement = document.getElementById(`edit-${id}`);

      if (id === 'date') {
        const formattedDate = new Date(value).toLocaleDateString('ru-RU', {
          day: '2-digit', month: 'long', year: 'numeric'
        });
        editElement.textContent = formattedDate;
      } else {
        editElement.textContent = value;
      }
    });
  });

  // Replacement of diploma image
  document.querySelector('.get-diplom-imgs').addEventListener('click', ({ target }) => {
    if (target.tagName === 'IMG') {
      loader.classList.toggle('fade');
      setTimeout(() => {
        mainImage.src = target.src;
        loader.classList.toggle('fade');
      }, 700);
    }
  });

  // Download PDF when checking form validity
  document.getElementById('downloadPdfButton').addEventListener('click', (event) => {
    if (!form.reportValidity()) return;
    generatePDF();
  });

  // PDF generation function
  async function generatePDF() {
    const element = document.querySelector('.make-pdf');
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new window.jspdf.jsPDF('portrait');
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('diplom.pdf');
  }
  
});


// To top button
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 250) {
            $('#top').fadeIn();
        } else {
            $('#top').fadeOut();
        }
    });

    $('#top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 300);
    });
});
