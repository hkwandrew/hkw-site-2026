import { useId } from 'react'
import styled, { css } from 'styled-components'
import { applyTypography } from './Typography'

const CONTACT_INVALID_FILL = '#FEE3CA'
const CONTACT_SELECT_ARROW = `data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%231C2D38' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $variant }) => ($variant === 'contact' ? '4px' : '6px')};
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
  color: ${({ $variant, theme }) =>
    $variant === 'contact' ? theme.colors.white : theme.colors.blue.dark};
  font-size: ${({ $variant }) => ($variant === 'contact' ? '14px' : '13px')};
  font-weight: ${({ $variant, theme }) =>
    $variant === 'contact' ? theme.font.weight.medium : theme.font.weight.regular};
  letter-spacing: ${({ $variant }) => ($variant === 'contact' ? '0.1em' : '0.05em')};
  line-height: 1;
  text-transform: uppercase;

  ${({ $variant }) =>
    $variant === 'contact' &&
    css`
      font-variation-settings: 'wdth' 67.5;
    `}
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
  border: 0;
  outline: 0;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.blue.dark};
  background: ${({ theme }) => theme.colors.white};
  -webkit-appearance: none;
  appearance: none;

  &::placeholder {
    color: rgba(28, 45, 56, 0.7);
  }
`

const defaultControlStyles = css`
  padding: 14px 18px;
  border-radius: 9999px;
  font-size: 16px;
`

const contactControlStyles = css`
  min-height: 40px;
  padding: 10px 20px;
  border-radius: 9999px;
  border: 2px solid transparent;
  font-size: 16px;
  line-height: 1;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
`

const invalidControlStyles = css`
  border-color: #6F1B00;
  background: ${CONTACT_INVALID_FILL};
`

const StyledInput = styled.input`
  ${controlBase}
  ${defaultControlStyles}

  ${({ $variant }) => $variant === 'contact' && contactControlStyles}
  ${({ $invalid, $variant }) => $variant === 'contact' && $invalid && invalidControlStyles}
`

const StyledTextarea = styled.textarea`
  ${controlBase}
  ${defaultControlStyles}
  border-radius: 20px;
  min-height: 120px;
  resize: vertical;

  ${({ $variant }) => $variant === 'contact' && contactControlStyles}
  ${({ $variant }) =>
    $variant === 'contact' &&
    css`
      min-height: 80px;
      resize: none;
      padding-top: 14px;
      padding-bottom: 14px;
    `}
  ${({ $invalid, $variant }) => $variant === 'contact' && $invalid && invalidControlStyles}
`

const StyledSelect = styled.select`
  ${controlBase}
  ${defaultControlStyles}
  appearance: none;
  cursor: pointer;
  background-image: url("${CONTACT_SELECT_ARROW}");
  background-repeat: no-repeat;
  background-position: right 18px center;
  padding-right: 40px;

  ${({ $variant }) => $variant === 'contact' && contactControlStyles}
  ${({ $invalid, $variant }) => $variant === 'contact' && $invalid && invalidControlStyles}

  ${({ $variant }) =>
    $variant === 'contact' &&
    css`
      background-position: right 20px center;
      background-size: 12px 8px;
      padding-right: 50px;
    `}
`

export default function FormField({
  label,
  type = 'text',
  required,
  options,
  variant = 'default',
  errorText,
  id,
  name,
  ...props
}) {
  const autoId = useId()
  const fieldId = id ?? `${autoId}-${String(label).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  const invalid = Boolean(errorText)
  const describedBy = invalid ? `${fieldId}-error` : undefined
  const labelText = `${label}${required ? '*' : ''}`

  const controlProps = {
    id: fieldId,
    name,
    'aria-invalid': invalid || undefined,
    'aria-describedby': describedBy,
    $variant: variant,
    $invalid: invalid,
    ...props,
  }

  return (
    <Wrapper $variant={variant}>
      {variant === 'contact' ? (
        <LabelRow>
          <FieldLabel $variant={variant} htmlFor={fieldId}>
            {labelText}
          </FieldLabel>
          {invalid ? <ErrorText id={describedBy}>{errorText}</ErrorText> : null}
        </LabelRow>
      ) : (
        <FieldLabel $variant={variant} htmlFor={fieldId}>
          {labelText}
        </FieldLabel>
      )}

      {type === 'textarea' ? (
        <StyledTextarea $variant={variant} {...controlProps} />
      ) : type === 'select' ? (
        <StyledSelect
          $variant={variant}
          {...controlProps}
          {...(props.value === undefined
            ? { defaultValue: props.defaultValue ?? '' }
            : { value: props.value })}
        >
          <option value="">Select option</option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </StyledSelect>
      ) : (
        <StyledInput type={type} $variant={variant} {...controlProps} />
      )}
    </Wrapper>
  )
}
