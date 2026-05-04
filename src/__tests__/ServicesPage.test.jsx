import { fireEvent, render, screen, within } from '@/__tests__/testUtils'
import { describe, expect, it } from 'vitest'
import ServicesPage from '@/routes/services/ServicesPage'
import services from '@/routes/services/services'

const normalizedText = (value) => value.replace(/\s+/g, ' ').trim()

describe('ServicesPage', () => {
  it('shows a dynamic eyebrow above the active desktop description', () => {
    render(<ServicesPage />)

    const activeDescription = screen.getByRole('region', {
      name: `${services[0].name} service description`,
    })

    expect(
      within(activeDescription).getByText(services[0].name.toUpperCase()),
    ).toBeInTheDocument()
    expect(activeDescription).toHaveTextContent(
      normalizedText(services[0].description),
    )

    fireEvent.mouseEnter(screen.getByText(services[1].name))

    const updatedDescription = screen.getByRole('region', {
      name: `${services[1].name} service description`,
    })

    expect(
      within(updatedDescription).getByText(services[1].name.toUpperCase()),
    ).toBeInTheDocument()
    expect(updatedDescription).toHaveTextContent(
      normalizedText(services[1].description),
    )
  })

  it('updates the active description when a service is tapped', () => {
    render(<ServicesPage />)

    const selectedDescription = screen.getByRole('region', {
      name: `${services[0].name} service description`,
    })

    expect(selectedDescription).toHaveTextContent(
      normalizedText(services[0].description),
    )

    fireEvent.click(screen.getByText(services[2].name))

    expect(
      screen.getByRole('region', {
        name: `${services[2].name} service description`,
      }),
    ).toBeInTheDocument()
    expect(selectedDescription).toHaveTextContent(
      normalizedText(services[2].description),
    )
  })
})
