document.getElementById('contactForm').addEventListener('submit', function(event) {
	event.preventDefault();
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const message = document.getElementById('message').value;

	// Gönderimi sunucuya POST ile yap
	fetch('/save-message', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name, email, message })
	})
	.then(resp => resp.json())
	.then(data => {
		if (data && data.ok) {
			alert(`Teşekkürler, ${name}! Mesajınız kaydedildi.`);
			document.getElementById('contactForm').reset();
		} else {
			alert('Mesaj kaydedilemedi: ' + (data && data.error ? data.error : 'Bilinmeyen hata'));
		}
	})
	.catch(err => {
		console.error(err);
		alert('Sunucuya bağlanırken hata oluştu.');
	});
});