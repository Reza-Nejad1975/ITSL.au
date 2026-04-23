// 1. Toggle Function
function toggleModal() {
    const modal = document.getElementById('connection-modal');
    if (modal) {
        modal.classList.toggle('hidden');
        modal.classList.toggle('flex');
    }
}

// 2. Initialize EmailJS with your Public Key
(function() {
    emailjs.init("QMKJh2dJCHaSjZXG1");
})();

// 3. Form Handling
window.onload = function() {
    const contactForm = document.getElementById('itsl-contact-form');
    const feedback = document.getElementById('form-feedback');
    const btn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // STOP THE PAGE RELOAD
            event.preventDefault();
            event.stopImmediatePropagation();
            
            btn.innerText = 'TRANSMITTING...';
            btn.disabled = true;

            // Use your Service and Template IDs
            emailjs.sendForm('service_8t4nkl8', 'template_ti0jwxy', this)
                .then(function() {
                    // SUCCESS MESSAGE
                    feedback.innerText = "SUCCESS: SUBMITTED. ADMIN WILL CONTACT YOU SOON.";
                    feedback.className = "text-center text-[10px] font-mono mt-4 text-green-500";
                    feedback.classList.remove('hidden');
                    btn.innerText = 'TRANSMISSION COMPLETE';
                    
                    // Reset and Close
                    setTimeout(() => { 
                        toggleModal(); 
                        contactForm.reset();
                        feedback.classList.add('hidden');
                        btn.innerText = 'Initialize Transmission';
                        btn.disabled = false;
                    }, 4000);
                }, function(error) {
                    // ERROR MESSAGE
                    feedback.innerText = "ERROR: TRANSMISSION FAILED. CHECK CONSOLE.";
                    feedback.className = "text-center text-[10px] font-mono mt-4 text-red-500";
                    feedback.classList.remove('hidden');
                    btn.innerText = 'RETRY';
                    btn.disabled = false;
                    console.error("EmailJS Error Details:", error);
                });
            return false; // Extra safety to prevent reload
        });
    }
};
//chat bot
function toggleChat() {
    const chat = document.getElementById('chat-window');
    if (chat) {
        chat.classList.toggle('hidden');
        chat.classList.toggle('flex');
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const container = document.getElementById('chat-messages');
    
    if (input && input.value.trim() !== "") {
        // User Bubble
        const userDiv = document.createElement('div');
        userDiv.className = "flex justify-end mb-4";
        userDiv.innerHTML = `
            <div class="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none text-xs shadow-md max-w-[85%]">
                ${input.value}
            </div>
        `;
        container.appendChild(userDiv);
        
        const userText = input.value;
        input.value = "";
        container.scrollTop = container.scrollHeight;

        // "Real-time" thinking delay
        setTimeout(() => {
            const botDiv = document.createElement('div');
            botDiv.className = "flex gap-2 items-start mb-4";
            botDiv.innerHTML = `
                <div class="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden border border-gray-300">
                    <img src="assets/logo.png" class="w-full h-full scale-110">
                </div>
                <div class="bg-white border border-gray-200 text-gray-700 p-3 rounded-2xl rounded-tl-none text-xs shadow-sm max-w-[85%]">
                    Thank you for your message regarding "${userText}". An engineer has been alerted and will respond shortly via our secure channel.
                </div>
            `;
            container.appendChild(botDiv);
            container.scrollTop = container.scrollHeight;
        }, 1200);
    }
}