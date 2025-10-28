const form = document.getElementById('contactForm');
const feedback = document.querySelector('.form-feedback');

async function submitContact(event) {
  event.preventDefault();
  if (!form || !feedback) return;

  feedback.textContent = 'Enviando mensagem...';
  feedback.style.color = '#173664';

  const formData = Object.fromEntries(new FormData(form));

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const { message } = await response.json().catch(() => ({ message: 'Erro ao enviar a mensagem.' }));
      throw new Error(message);
    }

    feedback.textContent = 'Mensagem enviada com sucesso. Entraremos em contato em breve.';
    feedback.style.color = '#1f4b8f';
    form.reset();
  } catch (error) {
    feedback.textContent = error.message || 'Não foi possível enviar a mensagem. Tente novamente mais tarde.';
    feedback.style.color = '#c0392b';
  }
}

if (form) {
  form.addEventListener('submit', submitContact);
}
