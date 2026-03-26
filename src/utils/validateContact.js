const REQUIRED_MESSAGE = 'Please fill out this field.'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact(values) {
  const nextErrors = {}

  if (!values.name.trim()) {
    nextErrors.name = REQUIRED_MESSAGE
  }

  if (!values.email.trim() || !EMAIL_PATTERN.test(values.email.trim())) {
    nextErrors.email = REQUIRED_MESSAGE
  }

  return nextErrors
}
