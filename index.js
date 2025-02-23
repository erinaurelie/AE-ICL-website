window.addEventListener('load', () => {
    const bodyElement = document.body;
    bodyElement.classList.add('visible', 'fadeIn');
    
});

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
    button: '.what-we-do',
    targetPage: '#about-section'
}, {
    button: '#company-name',
    targetPage: '.main-page'
}];

document.addEventListener('DOMContentLoaded', () => {
    pages.forEach(page => {
    document.querySelector(page.button)
        .addEventListener('click', () => {
            document.querySelector(page.targetPage).scrollIntoView({
                behavior: 'smooth',
                block: "start"
            });
        });
    });
});

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
            message: userData.message,
            reply_to: userData.email
        });
    }).catch(error => {
        console.log(`Failed ${error.text}`);
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

