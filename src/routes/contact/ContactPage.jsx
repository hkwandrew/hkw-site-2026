import { useState } from 'react'
import { useNavigate } from 'react-router'
import CloseButton from '@/shared/ui/CloseButton'
import FormField from '@/shared/ui/FormField'
import { validateContact } from './validateContact'
import {
  CloseWrapper,
  ContactForm,
  Panel,
  Page,
  RequiredNote,
  Stage,
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


function ContactFormFields({ values, errors, onChange, onSubmit }) {
  return (
    <ContactForm noValidate onSubmit={onSubmit}>
      <FormField
        label='PROJECT TYPE'
        type='select'
        name='projectType'
        value={values.projectType}
        onChange={onChange}
        options={PROJECT_TYPES}
      />
      <FormField
        label='ENTER NAME'
        required
        name='name'
        value={values.name}
        onChange={onChange}
        errorText={errors.name}
        autoComplete='name'
      />
      <FormField
        label='ORGANIZATION'
        name='organization'
        value={values.organization}
        onChange={onChange}
        autoComplete='organization'
      />
      <FormField
        label='ENTER EMAIL ADDRESS'
        type='email'
        required
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
        name='website'
        value={values.website}
        onChange={onChange}
        autoComplete='url'
      />
      <FormField
        label='TELL US ABOUT YOUR PROJECT'
        type='textarea'
        name='message'
        value={values.message}
        onChange={onChange}
      />
      <SubmitRow>
        <SubmitButton variant='send' type='submit'>
          SEND MESSAGE
        </SubmitButton>
      </SubmitRow>
      <RequiredNote>* REQUIRED</RequiredNote>
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
      <Stage aria-label='Contact form'>
        <Panel>
          <CloseWrapper>
            <CloseButton onClick={handleClose} />
          </CloseWrapper>
          <Title>Get In Touch</Title>
          <Subtitle>
            Fill out the form below and we&apos;ll follow up soon.
          </Subtitle>
          <ContactFormFields
            values={values}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </Panel>
      </Stage>
    </Page>
  )
}
