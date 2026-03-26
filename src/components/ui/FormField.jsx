import { useId } from 'react'
import styled, { css } from 'styled-components'
import { applyTypography } from './Typography'

const CONTACT_INVALID_FILL = '#FEE3CA'
const CONTACT_SELECT_ARROW = `data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%231C2D38' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`

const LabelRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  min-height: 18px;
`

const FieldLabel = styled.label`
  ${applyTypography('label')}
  color: ${({ theme }) => theme.colors.white};
  line-height: 1;
`

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.yellow.light};
  font-size: 14px;
  font-style: italic;
  font-variation-settings: 'wdth' 87;
  line-height: 1.1;
  text-align: right;
  white-space: nowrap;
`

const controlBase = css`
  width: 100%;
  min-height: 54px;
  padding: 10px 20px;
  border: 2px solid transparent;
  border-radius: 9999px;
  outline: 0;
  font-family: inherit;
  font-size: 16px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.blue.dark};
  background: ${({ theme }) => theme.colors.white};
  -webkit-appearance: none;
  appearance: none;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;

  &::placeholder {
    color: rgba(28, 45, 56, 0.7);
  }
`

const invalidControlStyles = css`
  border-color: ${({ theme }) => theme.colors.brown.brick};
  background: ${CONTACT_INVALID_FILL};
`

const StyledInput = styled.input`
  ${controlBase}
  ${({ $invalid }) => $invalid && invalidControlStyles}
`

const StyledTextarea = styled.textarea`
  ${controlBase}
  border-radius: 30px;
  min-height: 120px;
  resize: none;
  padding-top: 14px;
  padding-bottom: 14px;
  ${({ $invalid }) => $invalid && invalidControlStyles}
`

const StyledSelect = styled.select`
  ${controlBase}
  cursor: pointer;
  background-image: url('${CONTACT_SELECT_ARROW}');
  background-repeat: no-repeat;
  background-position: right 20px center;
  background-size: 12px 8px;
  padding-right: 50px;
  ${({ $invalid }) => $invalid && invalidControlStyles}
`

export default function FormField({
  label,
  type = 'text',
  required,
  options,
  errorText,
  id,
  name,
  ...props
}) {
  const autoId = useId()
  const fieldId =
    id ??
    `${autoId}-${String(label)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')}`
  const invalid = Boolean(errorText)
  const describedBy = invalid ? `${fieldId}-error` : undefined
  const labelText = `${label}${required ? '*' : ''}`

  const controlProps = {
    id: fieldId,
    name,
    'aria-invalid': invalid || undefined,
    'aria-describedby': describedBy,
    $invalid: invalid,
    ...props,
  }

  return (
    <Wrapper>
      <LabelRow>
        <FieldLabel htmlFor={fieldId}>
          {labelText}
        </FieldLabel>
        {invalid ? <ErrorText id={describedBy}>{errorText}</ErrorText> : null}
      </LabelRow>

      {type === 'textarea' ? (
        <StyledTextarea {...controlProps} />
      ) : type === 'select' ? (
        <StyledSelect
          {...controlProps}
          {...(props.value === undefined
            ? { defaultValue: props.defaultValue ?? '' }
            : { value: props.value })}
        >
          <option value=''>Select option</option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </StyledSelect>
      ) : (
        <StyledInput type={type} {...controlProps} />
      )}
    </Wrapper>
  )
}
