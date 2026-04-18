import { useState } from 'react'
import { useNavigate } from 'react-router'
import CloseButton from '@/shared/ui/CloseButton'
import FormField from '@/shared/ui/FormField'
import { validateContact } from './validateContact'
import {
  ContactForm,
  DesktopCloseWrapper,
  DesktopPanel,
  DesktopStage,
  Page,
  PhonePanel,
  PhoneStage,
  PhoneSubtitle,
  PhoneTitle,
  RequiredNote,
  SubmitButton,
  SubmitRow,
  Subtitle,
  Title,
} from './ContactPage.styles'

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


function ContactFormFields({ layout, values, errors, onChange, onSubmit }) {
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
        placeholder='example@email.com'
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
