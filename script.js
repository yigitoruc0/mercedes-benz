document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value.trim();
    var message = document.getElementById('message').value.trim();

    if (name === '' || message === '') {
        alert('Lütfen isim ve mesaj alanlarını doldurun.');
        return;
    }

    var testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];

    var newTestimonial = { name: name, message: message };

    testimonials.push(newTestimonial);
    localStorage.setItem('testimonials', JSON.stringify(testimonials));

    renderTestimonials();
    this.reset();
});

function renderTestimonials() {
    var testimonialContainer = document.querySelector('.testimonial-cards');
    testimonialContainer.innerHTML = '';

    var testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];

    testimonials.forEach(function(testimonial) {
        var div = document.createElement('div');
        div.classList.add('testimonial-card');
        div.innerHTML = `
            <p>"${testimonial.message}"</p>
            <span>- ${testimonial.name}</span>
            <button class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        `;

        div.querySelector('.delete-btn').addEventListener('click', function() {
            testimonialContainer.removeChild(div);
            removeFromLocalStorage(testimonial.message, testimonial.name);
        });

        testimonialContainer.appendChild(div);
    });
}

function removeFromLocalStorage(message, name) {
    var testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    var updated = testimonials.filter(t => !(t.message === message && t.name === name));
    localStorage.setItem('testimonials', JSON.stringify(updated));
}

window.onload = renderTestimonials;
// Mouse drag ile yatay kaydırma
const testimonialContainer = document.querySelector('.testimonial-cards');

let isDown = false;
let startX;
let scrollLeft;

testimonialContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    testimonialContainer.classList.add('active');
    startX = e.pageX - testimonialContainer.offsetLeft;
    scrollLeft = testimonialContainer.scrollLeft;
});
testimonialContainer.addEventListener('mouseleave', () => {
    isDown = false;
    testimonialContainer.classList.remove('active');
});
testimonialContainer.addEventListener('mouseup', () => {
    isDown = false;
    testimonialContainer.classList.remove('active');
});
testimonialContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - testimonialContainer.offsetLeft;
    const walk = (x - startX) * 2; // Kaydırma hızı
    testimonialContainer.scrollLeft = scrollLeft - walk;
});
