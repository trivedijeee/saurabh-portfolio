document.addEventListener('DOMContentLoaded', function () {
    // Country code fetching and dropdown population (replace with your implementation)
    const countryCodeDropdown = document.getElementById('country-code');
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        // Sort the data array by country name
        data.sort((a, b) => {
          const countryA = a.name.common.toUpperCase();
          const countryB = b.name.common.toUpperCase();
          if (countryA < countryB) {
            return -1;
          }
          if (countryA > countryB) {
            return 1;
          }
          return 0;
        });

        // Populate the dropdown with sorted data
        data.forEach(country => {
          const option = document.createElement('option');
          const countryCode = country.cca2; // Get the country code from 'cca2' property
          const countryName = country.name.common;
          option.value = `+${countryCode}`;
          option.textContent = `${countryName} (+${countryCode})`;
          countryCodeDropdown.appendChild(option);
        });

        // Set default country code to India
        const indiaOption = document.querySelector('option[value="+IN"]');
        indiaOption.selected = true;
      })
      .catch(error => console.error(error));

    // Typed.js code (if you're using it)
    var typed = new Typed('#element', {
      strings: ['Software Quality Test', '&amp; Automate Test Cases.'],
      typeSpeed: 50,
      loop: true,
    });

    // Download resume button click event listener (if you're using it)
    document.getElementById('downloadResumeBtn').onclick = function () {
      var resumeUrl = 'Priyanshu_resume.docx'; // Replace with your actual resume file URL
      var link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'Priyanshu_resume.docx';
      link.click();
    };

    // Services link click event listener (if you't using it)
    document.getElementById('services-link').addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default link behavior

      // Scroll to the "Work Experience" section
      document.getElementById('work-experience-section').scrollIntoView({ behavior: 'smooth' });
    });

    // Skills link click event listener (if you're using it)
    document.querySelector('nav ul li a[href="#skillsSection"]').addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default link behavior

      // Scroll to the "Skills" section
      document.getElementById('skillsSection').scrollIntoView({ behavior: 'smooth' });
    });
});
