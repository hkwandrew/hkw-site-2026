import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { sendContactEmail } from '@/routes/contact/sendContactEmail'

const templateParams = {
  product_type: 'Branding',
  from_name: 'A.J. Hughes',
  organization: 'HKW',
  from_email: 'aj@example.com',
  website: 'https://example.com',
  project: 'We need a new site.',
}

describe('sendContactEmail', () => {
  let fetchMock

  beforeEach(() => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service_123')
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'template_123')
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'public_123')
    fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: vi.fn().mockResolvedValue('OK'),
    })
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('posts contact template parameters to EmailJS', async () => {
    await sendContactEmail(templateParams)

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.emailjs.com/api/v1.0/email/send',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_123',
          template_id: 'template_123',
          user_id: 'public_123',
          template_params: templateParams,
        }),
      },
    )
  })

  it('fails before making a request when EmailJS env config is missing', async () => {
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', '')

    await expect(sendContactEmail(templateParams)).rejects.toThrow(
      'EmailJS is not configured',
    )
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('throws a generic send error when EmailJS rejects the request', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 400,
      text: vi.fn().mockResolvedValue('Bad request'),
    })

    await expect(sendContactEmail(templateParams)).rejects.toThrow(
      'EmailJS request failed',
    )
  })
})
