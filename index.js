// body transition
window.addEventListener('load', () => {
    const bodyElement = document.body;
    bodyElement.classList.add('visible', 'fadeIn');
    
});
// update header text inspired by the picture HTML tag
function updateCompanyName() {
    const companyNameElem = document.querySelector('.company-name');
    if (window.innerWidth < 345|| window.innerWidth >= 720) {
        companyNameElem.textContent = 'AE- Internation Consulting and Logistic - ICL';
    } else if (window.innerWidth >= 345) {
        companyNameElem.textContent = 'AE - ICL';
    }
}


window.addEventListener('resize', updateCompanyName);

updateCompanyName(); // Call the function on page load

// scroll between pages
const pages = [{
    button: '#about-section',
    targetPage: '#about-section'
}, {
    button: '#services-page',
    targetPage: '#services-section'
}, {
    button: '#contact-us-page',
    targetPage: '#contact-us-section'
}, {
    button: '.company-name-small' ?  '.company-name-small': '#company-name',
    targetPage: '.main-page'
}, {
    button: '.what-we-do',
    targetPage: '#about-section'
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
        to_email: userEmail.value,
    }
    submitBtn.value = 'Sending...';

    // Create a function to convert file to base64
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // initiating EmailJS :: meaning sending the data to EmailJS and it will send it back to your email
    emailjs.send(
        "service_zwo2d8j", "template_a761198", userData
    ).then(response => {
        console.log(`Success ${response.status} ${response.text}`);

        submitBtn.value = 'Sent!';
        submitBtn.style.cursor = 'no-drop';

        setTimeout(() => {
            submitBtn.value = 'Send';
            submitBtn.style.cursor = 'pointer';
        }, 300000);

        // Clear Fields
        clearFields(userName, userEmail, tel, companyName, message);

        return emailjs.send("service_zwo2d8j", "template_cqi5hj5", {
            to_name: userData.name,
            from_name: 'AE - International Consulting and Logistics - ICL',
            to_email: userData.email,
            message: userData.message
        });
    }).catch(error => {
        console.log(`Failed ${error}`);
    });
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