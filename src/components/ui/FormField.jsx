import { useId } from 'react'
import styled, { css } from 'styled-components'
import { applyTypography } from './Typography'

const CONTACT_INVALID_FILL = '#FEE3CA'
const CONTACT_SELECT_ARROW = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 15" fill="none"><path d="M3 3L12 12L21 3" stroke="#1C2D38" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
)}`
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
  min-height: 24px;
`

const FieldLabel = styled.label`
  ${applyTypography('label')}
  color: ${({ theme }) => theme.colors.white};
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
  background-image: url("${CONTACT_SELECT_ARROW}");
  background-position: ${({ $layout }) =>
    $layout === 'desktop' ? 'right 23px center' : 'right 20px center'};
  background-repeat: no-repeat;
  background-size: ${({ $layout }) =>
    $layout === 'desktop' ? '24px 15px' : '18px 11px'};
  line-height: ${({ $layout }) => ($layout === 'desktop' ? '30px' : '1')};
  padding-top: ${({ $layout }) => ($layout === 'desktop' ? '10px' : '10px')};
  padding-right: ${({ $layout }) => ($layout === 'desktop' ? '72px' : '56px')};
  padding-bottom: ${({ $layout }) => ($layout === 'desktop' ? '10px' : '10px')};
  padding-left: ${({ $layout }) => ($layout === 'desktop' ? '27px' : '20px')};
  ${({ $invalid }) => $invalid && invalidControlStyles}
`

const SelectControl = styled.div`
  position: relative;
  width: 100%;
`

export default function FormField({
  label,
  type = 'text',
  required,
  options,
  errorText,
  layout = 'desktop',
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
    $layout: layout,
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
        <SelectControl $layout={layout}>
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
        </SelectControl>
      ) : (
        <StyledInput type={type} {...controlProps} />
      )}
    </Wrapper>
  )
}
