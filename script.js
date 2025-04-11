// script.js
document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Formun normal şekilde submit olmasını engeller

    // Kullanıcıdan gelen bilgileri alıyoruz
    var name = document.getElementById('name').value;
    var message = document.getElementById('message').value;

    // Yeni yorum (testimonial) elemanını oluşturuyoruz
    var newTestimonial = document.createElement('div');
    newTestimonial.classList.add('testimonial-card');
    newTestimonial.innerHTML = `<p>"${message}"</p><span>- ${name}</span>`;

    // Testimonialları göstereceğimiz alanı buluyoruz
    var testimonialContainer = document.getElementById('testimonial-cards');
    
    // Testimonialları temizliyoruz (yeni mesaj eklemek için önceki mesajı siliyoruz)
    testimonialContainer.innerHTML = '';  
    
    // Yeni testimonial'ı ekliyoruz
    testimonialContainer.appendChild(newTestimonial);  

    // Formu sıfırlıyoruz
    document.getElementById('message-form').reset();  
});
