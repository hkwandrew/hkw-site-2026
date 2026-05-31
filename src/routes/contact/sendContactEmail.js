const EMAILJS_SEND_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send'

const getEmailJsConfig = () => ({
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim(),
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim(),
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim(),
})

export async function sendContactEmail(templateParams) {
  const { serviceId, templateId, publicKey } = getEmailJsConfig()

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS is not configured')
  }

  const response = await fetch(EMAILJS_SEND_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: templateParams,
    }),
  })

  if (!response.ok) {
    throw new Error('EmailJS request failed')
  }

  return response
}
