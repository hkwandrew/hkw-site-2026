import styled from 'styled-components'
import ViewContainer from '@/components/ui/ViewContainer'
import { H3, BodyMedium, Label } from '@/components/ui/Typography'
import PillButton from '@/components/ui/PillButton'
import CloseButton from '@/components/ui/CloseButton'
import FormField from '@/components/ui/FormField'

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`

const Circle = styled.div`
  width: 90vmin;
  height: 90vmin;
  max-width: 700px;
  max-height: 700px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.orange.base};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  overflow-y: auto;
  position: relative;
`

const CloseWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
`

const Title = styled(H3)`
  color: ${({ theme }) => theme.colors.yellow.light};
  text-align: center;
  margin-top: 50px;
  margin-bottom: 8px;
  text-transform: uppercase;
  font-size: clamp(24px, 4vw, 40px);
`

const Subtitle = styled(BodyMedium)`
  color: ${({ theme }) => theme.colors.yellow.light};
  text-align: center;
  margin-bottom: 24px;
  opacity: 0.9;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 400px;
`

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`

const RequiredNote = styled(Label)`
  color: ${({ theme }) => theme.colors.yellow.light};
  text-align: center;
  margin-top: 8px;
  font-size: 12px;
  opacity: 0.8;
`

const Logo = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  background: ${({ theme }) => theme.colors.blue.dark};
  color: ${({ theme }) => theme.colors.white};
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: 2px;
  z-index: 60;
`

const projectTypes = [
  'Website Design',
  'Branding',
  'Graphic Design',
  'Online Marketing',
  'Creative Direction',
  'Other',
]

export default function Contact({ isActive, onClose }) {
  return (
    <ViewContainer $isActive={isActive} style={{ zIndex: isActive ? 50 : 1 }}>
      <Overlay>
        <Circle>
          <CloseWrapper>
            <CloseButton onClick={onClose} />
          </CloseWrapper>
          <Title>Get In Touch</Title>
          <Subtitle>Fill out the form below and we&apos;ll follow up soon.</Subtitle>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormField label="PROJECT TYPE" type="select" options={projectTypes} />
            <FormField label="ENTER NAME" required placeholder="" />
            <FormField label="ORGANIZATION" placeholder="" />
            <FormField label="ENTER EMAIL ADDRESS" type="email" required placeholder="example@email.com" />
            <FormField label="ENTER WEBSITE, IF APPLICABLE" placeholder="" />
            <FormField label="TELL US ABOUT YOUR PROJECT" type="textarea" />
            <SubmitWrapper>
              <PillButton variant="send" type="submit">
                SEND MESSAGE
              </PillButton>
            </SubmitWrapper>
            <RequiredNote>* REQUIRED</RequiredNote>
          </Form>
        </Circle>
      </Overlay>
    </ViewContainer>
  )
}
