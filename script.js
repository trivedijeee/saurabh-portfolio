document.addEventListener('DOMContentLoaded', function () {
  // Country code fetching and dropdown population


  // Typed.js initialization
  var typed = new Typed('#element', {
      strings: ['Web Development', '&amp; Quality Engineering.'],
      typeSpeed: 50,
      loop: true,
  });

  // Download resume button click event listener
  document.getElementById('downloadResumeBtn').onclick = function () {
      var resumeUrl = 'saurabhRe.pdf'; // Replace with your actual resume file URL
      var link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'saurabhRe.pdf';
      link.click();
  };


  // when scroll, hide the open item in the menu
  window.addEventListener('scroll', function() {
      var menuToggle = document.getElementById('menu-toggle');
      if (window.scrollY > 50) {
          menuToggle.checked = false; // Hide the toggle if scrolled more than 50px
      }
  });

  // hide toggle when someone clicks outside the menu item, not inside the menu item
  var menuToggle = document.getElementById('menu-toggle');
  var menuIcon = document.querySelector('.menu-icon');

  function isClickOutsideToggle(event) {
      if (!menuIcon.contains(event.target) && event.target !== menuToggle) {
          menuToggle.checked = false; // Hide the toggle
          document.removeEventListener('click', isClickOutsideToggle); // Remove the click event listener
      }
  }

  function handleMenuToggleClick() {
      if (menuToggle.checked) {
          document.addEventListener('click', isClickOutsideToggle); // Add click event listener to check for clicks outside the toggle
      }
  }

  menuToggle.addEventListener('click', handleMenuToggleClick);

  document.querySelector('nav').addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent the click event from bubbling up to the document
  });
});
// writting js for scroll down when someone click on skill or services
document.getElementById('services-link').addEventListener('click', function (event) {
    event.preventDefault(); 
    document.getElementById('work-experience-section').scrollIntoView({ behavior: 'smooth' });
  })

  // Skills link click event listener (if you're using it)
  document.querySelector('nav ul li a[href="#skillsSection"]').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior
    // Scroll to the "Skills" section
    document.getElementById('skillsSection').scrollIntoView({ behavior: 'smooth' });
  });
  // ended js for scroll down when someone click on skill or services


//   contact pop up page js 
document.addEventListener('DOMContentLoaded', function () {
    const countryCodeDropdown = document.getElementById('country-code');

    // Fetching country codes and populating dropdown
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
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

        data.forEach(country => {
          const option = document.createElement('option');
          const countryCode = country.cca2;
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
  });

  // Open popup when clicking on Contact Us button
  const openPopupBtn = document.getElementById('openPopupBtn');
  const contactPopup = document.getElementById('contactPopup');
  const thankYouPopup = document.getElementById('thankYouPopup');
  const closePopup = document.getElementById('closePopup');

  openPopupBtn.addEventListener('click', function() {
    contactPopup.style.display = 'block';
  });

  // Close popup when clicking on close button
  closePopup.addEventListener('click', function() {
    contactPopup.style.display = 'none';
  });

  // Blink close button when clicking outside the contact popup
  document.addEventListener('click', function(event) {
    if (event.target.closest('.popup-content') === null && contactPopup.style.display === 'block') {
      closePopup.classList.add('blink');
      setTimeout(function() {
        closePopup.classList.remove('blink');
      }, 1000); // Adjust the timeout as needed
    }
  });

  // Automatically close thank you popup when clicking outside it
  document.addEventListener('click', function(event) {
    if (event.target.closest('.popup-content') === null && thankYouPopup.style.display === 'block') {
      thankYouPopup.style.display = 'none';
    }
  });

  // Submit form function
  function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate mobile number (already pattern attribute in HTML)
    // Email validation using regex (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Assuming validation passes, for simplicity, show thank you popup
    contactPopup.style.display = 'none';
    thankYouPopup.style.display = 'block';

    // Automatically hide thank you popup after 5 seconds
    setTimeout(function() {
      thankYouPopup.style.display = 'none';
    }, 5000);

    // Optionally, you can reset the form fields here
    document.getElementById('contactForm').reset();
  }
//   pop up js ended here 