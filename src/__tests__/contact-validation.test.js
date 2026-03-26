import { describe, it, expect } from 'vitest'
import { validateContact } from '@/utils/validateContact'

describe('validateContact', () => {
  it('returns errors for empty fields', () => {
    const errors = validateContact({ name: '', email: '' })
    expect(errors).toHaveProperty('name')
    expect(errors).toHaveProperty('email')
  })

  it('returns no errors for valid input', () => {
    const errors = validateContact({ name: 'John', email: 'john@example.com' })
    expect(Object.keys(errors)).toHaveLength(0)
  })

  it('returns email error for invalid email', () => {
    const errors = validateContact({ name: 'John', email: 'invalid' })
    expect(errors).not.toHaveProperty('name')
    expect(errors).toHaveProperty('email')
  })

  it('returns name error for whitespace-only name', () => {
    const errors = validateContact({ name: '   ', email: 'a@b.com' })
    expect(errors).toHaveProperty('name')
    expect(errors).not.toHaveProperty('email')
  })

  it('returns email error for empty email with valid name', () => {
    const errors = validateContact({ name: 'Jane', email: '' })
    expect(errors).not.toHaveProperty('name')
    expect(errors).toHaveProperty('email')
  })

  it('returns email error for email without domain', () => {
    const errors = validateContact({ name: 'Jane', email: 'test@' })
    expect(errors).toHaveProperty('email')
  })

  it('accepts valid email formats', () => {
    const validEmails = ['user@domain.com', 'name@sub.domain.co', 'a@b.c']
    validEmails.forEach((email) => {
      const errors = validateContact({ name: 'Test', email })
      expect(errors, `Expected ${email} to be valid`).not.toHaveProperty('email')
    })
  })
})
