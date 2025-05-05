

// Form Submit
const userName = document.querySelector('#name');
const userEmail = document.querySelector('#email');
const tel = document.querySelector('#number');
const companyName = document.querySelector('#company-name');
const message = document.querySelector('#message');
const submitBtn = document.querySelector('button[type="submit"]');

// add verification such as the input boxes are not to be empty
// add event listener to the send another message in the thank you message when clicked it should automatically bring back the old content

const sendMessageElement = document.querySelector('.send-message div');

const thankYouMessage = `
    <div class="thank-you">
        <img src="images/check-mark-t.png">
        <h4>Thank You!</h4>
        <p>Your message has been sent succesfully. We'll get to you shortly</p>
        <button>Send Another Message</button>
    </div>
`

const oldContent = sendMessageElement.innerHTML;

async function sendMail() {
    try {
        let userData = {
            name: userName.value,
            email: userEmail.value,
            tel: tel.value,
            companyName: companyName.value,
            message: message.value,
            to_email: userEmail.value,
        }
        
        // Disable the submit button and show loader
        submitBtn.disable = true;
        submitBtn.style.cursor = 
        submitBtn.innerHTML = `
            <span id="loader" class="loader" style="display: block;"></span> Sending...
        `;

        // send the email
    
        // initiating EmailJS :: meaning sending the data to EmailJS and it will send it back to your email

        // emailjs.send() does not return a Response object. Instead, it resolves or rejects a promise.
    
        const response = await emailjs.send("service_zwo2d8j", "template_a761198", userData);
        console.log(`Success ${response.status} ${response.text}`);

        // Show thank-you message and reset it after 30 seconds
        sendMessageElement.innerHTML = thankYouMessage;

        setTimeout(() => {
            sendMessageElement.innerHTML = oldContent;
        }, 30000);

        // Send auto-reply only after the first email succeeds
        await emailjs.send("service_zwo2d8j", "template_cqi5hj5", {
            to_name: userData.name,
            from_name: 'AE - International Consulting and Logistics - ICL',
            to_email: userData.email,
            message: userData.message
        });

        // Clear from fields
        clearFields(userName, userEmail, tel, companyName, message);
    
    } catch (error) {
        console.error(`Failed to send email: ${error.message}`);
        alert("Something went wrong. Please try again.");
    } finally {
        // Re-enable the button and reset its content
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
    }
}

// preventing the form default behaviour to submit so the submission gets handled by js

document.querySelector('form')
    .addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission
        await sendMail(); // Call the sendMail function
    });

submitBtn.addEventListener('click', event => {
    event.preventDefault();
    sendMail();
});


function clearFields(...fields) {
    fields.forEach(field => {
        field.value = '';
    });
}