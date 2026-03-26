import { useState } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import CloseButton from '@/components/ui/CloseButton'
import FormField from '@/components/ui/FormField'
import PillButton from '@/components/ui/PillButton'
import { validateContact } from '@/utils/validateContact'

const PHONE_BREAKPOINT = '767px'

const PROJECT_TYPES = [
  'Website Design',
  'Branding',
  'Graphic Design',
  'Online Marketing',
  'Creative Direction',
  'Other',
]

const initialValues = {
  projectType: '',
  name: '',
  organization: '',
  email: '',
  website: '',
  message: '',
}

const Page = styled.section`
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 100dvh;
  overflow-x: hidden;
  overflow-y: auto;
`

const DesktopStage = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;

  @media (max-width: ${PHONE_BREAKPOINT}) {
    display: none;
  }
`

const DesktopPanel = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 365px;
  overflow: visible;
`

const DesktopCloseWrapper = styled.div`
  position: absolute;
  top: -55px;
  left: 50%;
  transform: translateX(-50%);
`

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.yellow.light};
  text-align: center;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.font.family};
  font-variation-settings: 'wdth' 68;
  font-size: clamp(24px, 4vw, 40px);
  font-weight: ${({ theme }) => theme.font.weight.medium};
`

const Subtitle = styled.p`
  max-width: 339px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.font.weight.regular};
  line-height: calc(29 / 16);
`

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ $layout }) => ($layout === 'phone' ? '14px' : '8px')};
  width: ${({ $layout }) => ($layout === 'phone' ? '300px' : '365px')};
  margin-top: ${({ $layout }) => ($layout === 'phone' ? '18px' : '31px')};
`

const SubmitRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ $layout }) => ($layout === 'phone' ? '4px' : '16px')};
`

const SubmitButton = styled(PillButton)`
  width: 145px;
  min-width: 145px;
  height: 47px;
  padding: 0 20px;
  font-size: 20px;
  line-height: 1;
  font-variation-settings: 'wdth' 68;
`

const RequiredNote = styled.p`
  margin: ${({ $layout }) => ($layout === 'phone' ? '2px 0 0' : '14px 0 0')};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  line-height: calc(24 / 16);
  text-transform: uppercase;
  letter-spacing: 1.6px;
  font-variation-settings: 'wdth' 68;
`

const PhoneStage = styled.section`
  display: none;

  @media (max-width: ${PHONE_BREAKPOINT}) {
    display: block;
    position: relative;
    min-height: 100dvh;
    padding: 120px 20px 28px;
    isolation: isolate;

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 86px;
      width: 144vw;
      height: calc(100dvh - 86px);
      transform: translateX(-50%);
      background: ${({ theme }) => theme.colors.orange.base};
      border-radius: 50% 50% 0 0 / 13% 13% 0 0;
      z-index: 0;
    }
  }
`

const PhonePanel = styled.div`
  display: none;

  @media (max-width: ${PHONE_BREAKPOINT}) {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100dvh - 148px);
  }
`

const PhoneSubtitle = styled(Subtitle)`
  @media (max-width: ${PHONE_BREAKPOINT}) {
    max-width: 296px;
    margin-top: 6px;
    font-size: 15px;
  }
`

const PhoneTitle = styled(Title)`
  @media (max-width: ${PHONE_BREAKPOINT}) {
    font-size: 24px;
    line-height: 1.08;
  }
`

function ContactFormFields({ layout, values, errors, onChange, onSubmit }) {
  const isPhone = layout === 'phone'

  return (
    <ContactForm $layout={layout} noValidate onSubmit={onSubmit}>
      <FormField
        label='PROJECT TYPE'
        type='select'
        layout={layout}
        name='projectType'
        value={values.projectType}
        onChange={onChange}
        options={PROJECT_TYPES}
      />
      <FormField
        label='ENTER NAME'
        required
        layout={layout}
        name='name'
        value={values.name}
        onChange={onChange}
        errorText={errors.name}
        autoComplete='name'
      />
      <FormField
        label='ORGANIZATION'
        layout={layout}
        name='organization'
        value={values.organization}
        onChange={onChange}
        autoComplete='organization'
      />
      <FormField
        label='ENTER EMAIL ADDRESS'
        type='email'
        required
        layout={layout}
        name='email'
        value={values.email}
        onChange={onChange}
        errorText={errors.email}
        placeholder={isPhone ? 'example@email.com' : 'example@email.com'}
        autoComplete='email'
        inputMode='email'
      />
      <FormField
        label='ENTER WEBSITE, IF APPLICABLE'
        layout={layout}
        name='website'
        value={values.website}
        onChange={onChange}
        autoComplete='url'
      />
      <FormField
        label='TELL US ABOUT YOUR PROJECT'
        type='textarea'
        layout={layout}
        name='message'
        value={values.message}
        onChange={onChange}
      />
      <SubmitRow $layout={layout}>
        <SubmitButton variant='send' type='submit'>
          SEND MESSAGE
        </SubmitButton>
      </SubmitRow>
      <RequiredNote $layout={layout}>* REQUIRED</RequiredNote>
    </ContactForm>
  )
}

export default function Contact({ onClose } = {}) {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleClose = () => {
    if (onClose) {
      onClose()
      return
    }

    navigate('/')
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setValues((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => {
      if (!current[name]) return current

      const next = { ...current }
      delete next[name]
      return next
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validateContact(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }
  }

  return (
    <Page>
      <DesktopStage aria-label='Contact form'>
        <DesktopPanel>
          <DesktopCloseWrapper>
            <CloseButton onClick={handleClose} />
          </DesktopCloseWrapper>
          <Title>Get In Touch</Title>
          <Subtitle>
            Fill out the form below and we&apos;ll follow up soon.
          </Subtitle>
          <ContactFormFields
            layout='desktop'
            values={values}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </DesktopPanel>
      </DesktopStage>

      <PhoneStage aria-label='Contact form mobile'>
        <PhonePanel>
          <PhoneTitle>GET IN TOUCH</PhoneTitle>
          <PhoneSubtitle>
            Fill out the form below and we&apos;ll follow up soon.
          </PhoneSubtitle>
          <ContactFormFields
            layout='phone'
            values={values}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </PhonePanel>
      </PhoneStage>
    </Page>
  )
}
