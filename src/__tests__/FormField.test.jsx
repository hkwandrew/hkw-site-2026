import { render, screen } from '@/__tests__/testUtils'
import { describe, expect, it } from 'vitest'
import FormField from '@/shared/ui/FormField'

const normalizeCss = (value) => value.replace(/\s+/g, '')
const getStyleText = () =>
  Array.from(document.head.querySelectorAll('style'))
    .map((styleTag) => styleTag.textContent ?? '')
    .join('\n')

describe('FormField', () => {
  it('emits form-field container and compact-density rules', () => {
    render(
      <>
        <FormField
          label='Name'
          name='name'
          errorText='Please fill out this field.'
        />
        <FormField
          label='Project type'
          name='project-type'
          type='select'
          options={['Branding']}
        />
        <FormField
          label='Project details'
          name='project-details'
          type='textarea'
        />
      </>,
    )

    const styles = normalizeCss(getStyleText())

    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText('Please fill out this field.')).toBeInTheDocument()
    expect(
      screen.getByRole('combobox', { name: /project type/i }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Project details')).toBeInTheDocument()
    expect(styles).toContain('container:form-field/inline-size')
    expect(styles).toContain('@containerform-field(max-width:320px)')
    expect(styles).toContain(
      '@containerform-fieldstyle(--hkw-field-density:compact)',
    )
    expect(styles).toContain('min-height:')
    expect(styles).toContain('padding-right:')
  })
})
