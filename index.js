// body transition
window.addEventListener('load', () => {
    const bodyElement = document.body;
    bodyElement.classList.add('visible', 'fadeIn');
    
});
// update header text inspired by the picture HTML tag
function updateCompanyName() {
    const companyNameElem = document.querySelector('.company-name-small');
    if (window.innerWidth < 345|| window.innerWidth >= 720) {
        companyNameElem.textContent = 'AE- INTERNATIONAL CONSULTING AND LOGISTICS - ICL';
    } else if (window.innerWidth >= 345) {
        companyNameElem.textContent = 'AE - ICL';
    }
}


window.addEventListener('resize', updateCompanyName);

updateCompanyName(); // Call the function on page load

// scroll between pages
const pages = [{
    button: '#about-page',
    targetPage: '#about-section'
}, {
    button: '#services-page',
    targetPage: '#services-section'
}, {
    button: '#contact-us-page',
    targetPage: '#contact-us-section'
}, {
    button: '#what-we-do',
    targetPage: '#about-section'
}, {
    button: '.company-name-small' ?  '.company-name-small': '#company-name',
    targetPage: '.main-page'
}];

function scrollToDiv(target) {
    const targetDiv = document.querySelector(target);
    const offsetTop = targetDiv.offsetTop;
    const paddingTop = parseInt(window.getComputedStyle(targetDiv).paddingTop);
    
    window.scrollTo({
      top: offsetTop - paddingTop - 100, // the constant is additional padding top
      behavior: 'smooth'
    });
  }

document.addEventListener('DOMContentLoaded', () => {
    pages.forEach(page => {
    document.querySelector(page.button)
        .addEventListener('click', () => {
            if (page.button === '.what-we-do') {
                alert('What we do clicked');
                console.log('what we do');
                
            }
            scrollToDiv(page.targetPage);
        });
    });
});

// Form Submit
const userName = document.querySelector('.user-name');
const userEmail = document.querySelector('input[type="email"]');
const tel = document.querySelector('input[type="tel"]');
const companyName = document.querySelector('.user-company-name');
const message = document.querySelector('textarea');

const submitBtn = document.querySelector('input[type="submit"]');


function sendMail() {
    let userData = {
        name: userName.value,
        email: userEmail.value,
        tel: tel.value,
        companyName: companyName.value,
        message: message.value,
        to_email: userEmail.value
    }
    submitBtn.value = 'Sending...';
    console.log(userData);

    // initiating EmailJS :: meaning sending the data to EmailJS and it will send it back to your email
    emailjs.send(
        "service_zwo2d8j", "template_a761198", userData
    ).then(response => {
        console.log(`Success ${response.status} ${response.text}`);

        submitBtn.value = 'Sent!';

        setTimeout(() => {
            submitBtn.value = 'Send';
        }, 5000);


        return emailjs.send("service_zwo2d8j", "template_cqi5hj5", {
            to_name: userData.name,
            from_name: 'AE - International Consulting and Logistics - ICL',
            to_email: userData.email,
            message: userData.message
        });
    }).catch(error => {
        console.log(`Failed ${error}`);
    });

    

    
    // Clear Fields
    clearFields(userName, userEmail, tel, companyName, message);
}


submitBtn.addEventListener('click', event => {
    event.preventDefault();
    sendMail();
});

submitBtn.disable = true;
setTimeout(() => {
    submitBtn.disable = false;
    console.log('you can submit again now');
}, 20000);

function clearFields(...fields) {
    fields.forEach(field => {
        field.value = '';
    });
}


