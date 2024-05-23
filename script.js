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
      strings: ['Web Development', '&amp; Quality Engineering.'],
      typeSpeed: 50,
      loop: true,
    });

    // Download resume button click event listener (if you're using it)
    document.getElementById('downloadResumeBtn').onclick = function () {
      var resumeUrl = 'saurabh.docx'; // Replace with your actual resume file URL
      var link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'saurabh.docx';
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
// when scroll removing the oepn item 
    window.addEventListener('scroll', function() {
      var menuToggle = document.getElementById('menu-toggle');
      if (window.scrollY > 50) {
          menuToggle.checked = false; // Hide the toggle if scrolled more than 50px
      }
  }); // scroll option ended


  // hide toogle when someone click out the menu item not inside the menu item
  var menuToggle = document.getElementById('menu-toggle');
  var menuIcon = document.querySelector('.menu-icon');

  // Function to check if the click occurred outside the toggle option
  function isClickOutsideToggle(event) {
      if (!menuIcon.contains(event.target) && event.target !== menuToggle) {
          menuToggle.checked = false; // Hide the toggle
          document.removeEventListener('click', isClickOutsideToggle); // Remove the click event listener
      }
  }

  // Function to handle menu toggle click event
  function handleMenuToggleClick() {
      if (menuToggle.checked) {
          document.addEventListener('click', isClickOutsideToggle); // Add click event listener to check for clicks outside the toggle
      }
  }

  // Attach event listener to the menu toggle
  menuToggle.addEventListener('click', handleMenuToggleClick);

  // Prevent hiding the toggle when clicking inside the menu area
  document.querySelector('nav').addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent the click event from bubbling up to the document
  }); // click event enable done
});
