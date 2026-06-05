import { useEffect, useId, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { applyTypography } from './Typography'

const applyCompactFieldStyles = (styles) => css`
  @container form-field (max-width: 320px) {
    ${styles}
  }

  @container form-field style(--hkw-field-density: compact) {
    ${styles}
  }
`

const compactLabelRowStyles = css`
  min-height: 19px;
`

const compactLabelStyles = css`
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 1.4px;
`

const compactControlStyles = css`
  height: 40px;
  padding: 8px 24px 10px;
`

const compactTextareaStyles = css`
  min-height: 80px;
  border-radius: 20px;
`

const compactSelectTriggerStyles = css`
  line-height: 1;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 56px;
  padding-left: 20px;
`

const compactCaretStyles = css`
  right: 20px;
  width: 26px;
  height: 16px;
`

const Wrapper = styled.div`
  container: form-field / inline-size;
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

  ${applyCompactFieldStyles(compactLabelRowStyles)}
`

const FieldLabel = styled.label`
  ${applyTypography('label')}
  color: ${({ theme }) => theme.colors.white};

  ${applyCompactFieldStyles(compactLabelStyles)}
`

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.peach};
  font-size: 14px;
  font-style: italic;
  font-variation-settings:
    'wdth' ${({ theme }) => theme.font.width.semicondensed},
    'slnt' ${({ theme }) => theme.font.slant.italic};
  text-align: right;
  white-space: nowrap;
`

const invalidControlStyles = css`
  border-color: ${({ theme }) => theme.colors.brown.brick};
  background: ${({ theme }) => theme.colors.peach};
`

const controlBase = css`
  width: 100%;
  height: 54px;
  padding: 10px 28px 12px;
  border: 2px solid transparent;
  border-radius: 99px;
  outline: 0;
  font-family: inherit;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.blue.dark};
  background: ${({ theme }) => theme.colors.white};
  -webkit-appearance: none;
  appearance: none;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;

  &:focus,
  &:focus-visible {
    ${invalidControlStyles}
  }

  &::placeholder {
    line-height: 1.875;
    color: rgba(28, 45, 56, 0.7);
  }

  ${applyCompactFieldStyles(compactControlStyles)}
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

  ${applyCompactFieldStyles(compactTextareaStyles)}
`

const SelectControl = styled.div`
  position: relative;
  width: 100%;
  z-index: ${({ $open }) => ($open ? 10 : 'auto')};
`

const HiddenSelectInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`

const SelectTrigger = styled.button`
  ${controlBase}
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  text-align: left;
  line-height: 30px;
  padding: 10px 72px 10px 27px;
  ${({ $active, $invalid }) => ($active || $invalid) && invalidControlStyles}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 2px;
  }

  ${applyCompactFieldStyles(compactSelectTriggerStyles)}
`

const TriggerValue = styled.span`
  display: block;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme, $placeholder }) =>
    $placeholder ? 'rgba(28, 45, 56, 0.92)' : theme.colors.blue.dark};
`

const TriggerCaret = styled.span`
  position: absolute;
  top: 50%;
  right: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 15px;
  color: ${({ theme }) => theme.colors.blue.dark};
  pointer-events: none;
  transform: translateY(-50%) scale(${({ $open }) => ($open ? '-1' : '1')});
  transition: transform 160ms ease;

  svg {
    width: 100%;
    height: 100%;
  }

  ${applyCompactFieldStyles(compactCaretStyles)}
`

const SelectMenu = styled.ul`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  padding: 10px;
  overflow-y: auto;
  border-radius: 30px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 18px 40px rgba(28, 45, 56, 0.24);
`

const SelectOption = styled.button`
  width: 100%;
  min-height: 46px;
  padding: 0 18px;
  border-radius: 9999px;
  text-align: left;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 16px;
  font-weight: ${({ theme, $selected }) =>
    $selected ? theme.font.weight.medium : theme.font.weight.regular};
  line-height: 1.2;
  font-variation-settings: 'wdth' 90;
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.yellow.light : theme.colors.blue.dark};
  background: ${({ theme, $selected, $active }) => {
    if ($selected) return theme.colors.blue.dark
    if ($active) return 'rgba(175, 211, 252, 0.55)'
    return 'transparent'
  }};
  transition:
    background-color 160ms ease,
    color 160ms ease;

  &:hover {
    background: ${({ theme, $selected }) =>
      $selected ? theme.colors.blue.dark : 'rgba(175, 211, 252, 0.55)'};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 2px;
  }
`

const getSelectItems = (options = []) => [
  { label: 'Select option', value: '' },
  ...options.map((opt) => ({ label: opt, value: opt })),
]

function CustomSelectField({
  describedBy,
  fieldId,
  invalid,
  labelId,
  name,
  onChange,
  options,
  value,
  defaultValue,
}) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const optionRefs = useRef([])
  const listboxId = `${fieldId}-listbox`
  const valueId = `${fieldId}-value`
  const items = getSelectItems(options)
  const selectedValue = isControlled ? value : internalValue
  const selectedIndex = Math.max(
    0,
    items.findIndex((item) => item.value === selectedValue),
  )
  const selectedItem = items[selectedIndex] ?? items[0]

  const closeMenu = (restoreFocus = false) => {
    setIsOpen(false)

    if (restoreFocus) {
      window.requestAnimationFrame(() => {
        triggerRef.current?.focus()
      })
    }
  }

  const openMenu = (index = selectedIndex) => {
    setActiveIndex(index)
    setIsOpen(true)
  }

  const moveActiveIndex = (nextIndex) => {
    const count = items.length
    const normalized = ((nextIndex % count) + count) % count
    setActiveIndex(normalized)
  }

  const dispatchChange = (nextValue) => {
    if (!isControlled) {
      setInternalValue(nextValue)
    }

    onChange?.({
      target: {
        name,
        value: nextValue,
      },
    })
  }

  const selectValue = (nextValue) => {
    dispatchChange(nextValue)
    closeMenu(true)
  }

  useEffect(() => {
    if (!isOpen) return undefined

    const handleMouseDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const focusFrame = window.requestAnimationFrame(() => {
      optionRefs.current[activeIndex]?.focus()
    })

    return () => {
      window.cancelAnimationFrame(focusFrame)
    }
  }, [activeIndex, isOpen])

  const handleTriggerClick = () => {
    if (isOpen) {
      closeMenu()
      return
    }

    openMenu()
  }

  const handleTriggerKeyDown = (event) => {
    if (
      event.key === 'Enter' ||
      event.key === ' ' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp'
    ) {
      event.preventDefault()
      openMenu()
    }
  }

  const handleBlurCapture = () => {
    window.requestAnimationFrame(() => {
      if (!rootRef.current?.contains(document.activeElement)) {
        setIsOpen(false)
      }
    })
  }

  const handleOptionKeyDown = (event, index, nextValue) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      moveActiveIndex(index + 1)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      moveActiveIndex(index - 1)
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      moveActiveIndex(0)
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      moveActiveIndex(items.length - 1)
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      closeMenu(true)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      selectValue(nextValue)
    }
  }

  return (
    <SelectControl
      ref={rootRef}
      $open={isOpen}
      onBlurCapture={handleBlurCapture}
    >
      <HiddenSelectInput type='hidden' name={name} value={selectedValue} />
      <SelectTrigger
        ref={triggerRef}
        id={fieldId}
        type='button'
        role='combobox'
        aria-controls={listboxId}
        aria-describedby={describedBy}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        aria-invalid={invalid || undefined}
        aria-labelledby={`${labelId} ${valueId}`}
        $active={isOpen}
        $invalid={invalid}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
      >
        <TriggerValue id={valueId} $placeholder={selectedValue === ''}>
          {selectedItem.label}
        </TriggerValue>
        <TriggerCaret $open={isOpen} aria-hidden='true'>
          <svg
            viewBox='0 0 19 13'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M11.3479 11.6961C10.1551 13.1516 7.93221 13.1623 6.72548 11.7183L0.632629 4.4275C-0.835138 2.67114 0.413701 0 2.70261 0C3.60626 0 4.44989 0.45245 4.94981 1.20521L7.00255 4.29608C7.22632 4.63474 7.42772 4.9492 7.60674 5.23948C7.80814 5.52975 7.97598 5.81035 8.11024 6.08128C8.26688 6.34253 8.41234 6.60377 8.5466 6.86502C8.67378 7.11248 8.80096 7.36861 8.92813 7.63342C8.94115 7.66053 8.96854 7.67779 8.9986 7.67779C9.02984 7.67779 9.05805 7.65916 9.0705 7.63051C9.1769 7.38559 9.29318 7.14494 9.41933 6.90856C9.5536 6.65699 9.69905 6.40058 9.8557 6.13933C10.0123 5.86841 10.1914 5.58297 10.3928 5.28302C10.5942 4.98307 10.8179 4.66376 11.0641 4.32511L13.2028 1.15748C13.6915 0.43375 14.5077 0 15.381 0C17.5991 0 18.8197 2.57833 17.4138 4.29398L11.3479 11.6961Z'
              fill='#1C2D38'
            />
          </svg>
        </TriggerCaret>
      </SelectTrigger>

      {isOpen ? (
        <SelectMenu id={listboxId} role='listbox' aria-labelledby={labelId}>
          {items.map((item, index) => {
            const isSelected = item.value === selectedValue
            const isActive = index === activeIndex

            return (
              <li key={`${item.value || 'placeholder'}-${index}`}>
                <SelectOption
                  ref={(node) => {
                    optionRefs.current[index] = node
                  }}
                  type='button'
                  role='option'
                  aria-selected={isSelected}
                  $active={isActive}
                  $selected={isSelected}
                  onClick={() => selectValue(item.value)}
                  onFocus={() => setActiveIndex(index)}
                  onKeyDown={(event) =>
                    handleOptionKeyDown(event, index, item.value)
                  }
                >
                  {item.label}
                </SelectOption>
              </li>
            )
          })}
        </SelectMenu>
      ) : null}
    </SelectControl>
  )
}

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
  const labelId = `${fieldId}-label`

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
        <FieldLabel id={labelId} htmlFor={fieldId}>
          {labelText}
        </FieldLabel>
        {invalid ? <ErrorText id={describedBy}>{errorText}</ErrorText> : null}
      </LabelRow>

      {type === 'textarea' ? (
        <StyledTextarea {...controlProps} />
      ) : type === 'select' ? (
        <CustomSelectField
          defaultValue={props.defaultValue}
          describedBy={describedBy}
          fieldId={fieldId}
          invalid={invalid}
          labelId={labelId}
          name={name}
          onChange={props.onChange}
          options={options}
          value={props.value}
        />
      ) : (
        <StyledInput type={type} {...controlProps} />
      )}
    </Wrapper>
  )
}
