function skill(){
    document.getElementById("skillcon").style.display="block"
    document.getElementById("experianscon").style.display="none"
    document.getElementById("educationcon").style.display="none"
}
function experience(){
    document.getElementById("experianscon").style.display="block"
    document.getElementById("skillcon").style.display="none"
     document.getElementById("educationcon").style.display="none"
}
function education(){
    document.getElementById("educationcon").style.display="block"
    document.getElementById("skillcon").style.display="none"
    document.getElementById("experianscon").style.display="none"
}

    
   
        // Initialize EmailJS with your public key
        // You'll need to replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
        emailjs.init('YOUR_PUBLIC_KEY');

        // Form submission handler
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const messageContainer = document.getElementById('messageContainer');
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            btnText.innerHTML = '<span class="loading"></span>Sending...';
            
            // Clear previous messages
            messageContainer.innerHTML = '';
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Send email using EmailJS
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                to_email: 'rihenww@gmail.com',
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                reply_to: formData.email
            })
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                document.getElementById('contactForm').reset();
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                showMessage('Failed to send message. Please try again or contact me directly.', 'error');
            })
            .finally(function() {
                // Re-enable button
                submitBtn.disabled = false;
                btnText.innerHTML = 'Send Message';
            });
        });
        
        // Alternative method using Formspree (no setup required)
        function sendWithFormspree() {
            const form = document.getElementById('contactForm');
            const formData = new FormData(form);
            
            fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                    form.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            })
            .catch(error => {
                showMessage('Failed to send message. Please try again or contact me directly.', 'error');
            });
        }
        
        // Simple mailto fallback (works immediately without setup)
        function sendWithMailto() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            const mailtoLink = `mailto:rihenww@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            window.location.href = mailtoLink;
            showMessage('Opening your email client...', 'success');
        }
        
        // Use mailto as fallback for now (since it works immediately)
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            
            // Validate form
            const form = e.target;
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            // Show loading state
            submitBtn.disabled = true;
            btnText.innerHTML = '<span class="loading"></span>Processing...';
            
            // Simulate processing delay
            setTimeout(() => {
                sendWithMailto();
                
                // Reset button
                submitBtn.disabled = false;
                btnText.innerHTML = 'Send Message';
            }, 1000);
        });
        
        // Show message function
        function showMessage(text, type) {
            const messageContainer = document.getElementById('messageContainer');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}`;
            messageDiv.textContent = text;
            
            messageContainer.innerHTML = '';
            messageContainer.appendChild(messageDiv);
            
            // Show message with animation
            setTimeout(() => {
                messageDiv.classList.add('show');
            }, 100);
            
            // Hide message after 5 seconds
            setTimeout(() => {
                messageDiv.classList.remove('show');
                setTimeout(() => {
                    if (messageContainer.contains(messageDiv)) {
                        messageContainer.removeChild(messageDiv);
                    }
                }, 300);
            }, 5000);
        }
        
        // Form validation enhancements
        document.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', function() {
                if (this.validity.valid) {
                    this.style.borderColor = 'rgba(76, 175, 80, 0.5)';
                } else {
                    this.style.borderColor = 'rgba(244, 67, 54, 0.5)';
                }
            });
            
            field.addEventListener('input', function() {
                if (this.style.borderColor === 'rgba(244, 67, 54, 0.5)' && this.validity.valid) {
                    this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
            });
        });