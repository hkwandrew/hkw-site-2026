import styled from 'styled-components'
import { applyTypography } from './Typography'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`

const FieldLabel = styled.label`
  ${applyTypography('label')}
  color: ${({ theme }) => theme.colors.blue.dark};
  font-size: 13px;
  letter-spacing: 0.05em;
`

const inputStyles = `
  width: 100%;
  padding: 14px 18px;
  border-radius: 9999px;
  font-size: 16px;
  background: white;
`

const StyledInput = styled.input`
  ${inputStyles}
`

const StyledTextarea = styled.textarea`
  ${inputStyles}
  border-radius: 20px;
  min-height: 120px;
  resize: vertical;
`

const StyledSelect = styled.select`
  ${inputStyles}
  appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%231C2D38' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 18px center;
  padding-right: 40px;
`

export default function FormField({ label, type = 'text', required, options, ...props }) {
  return (
    <Wrapper>
      <FieldLabel>
        {label}{required && '*'}
      </FieldLabel>
      {type === 'textarea' ? (
        <StyledTextarea {...props} />
      ) : type === 'select' ? (
        <StyledSelect {...props}>
          <option value="">Select option</option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </StyledSelect>
      ) : (
        <StyledInput type={type} {...props} />
      )}
    </Wrapper>
  )
}
