import { useEffect, useId, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { applyTypography } from './Typography'

const CONTACT_INVALID_FILL = '#FEE3CA'
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
  line-height: ${({ $layout }) => ($layout === 'desktop' ? '30px' : '1')};
  padding-top: ${({ $layout }) => ($layout === 'desktop' ? '10px' : '10px')};
  padding-right: ${({ $layout }) => ($layout === 'desktop' ? '72px' : '56px')};
  padding-bottom: ${({ $layout }) => ($layout === 'desktop' ? '10px' : '10px')};
  padding-left: ${({ $layout }) => ($layout === 'desktop' ? '27px' : '20px')};
  ${({ $invalid }) => $invalid && invalidControlStyles}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 2px;
  }
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
  right: ${({ $layout }) => ($layout === 'desktop' ? '23px' : '20px')};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $layout }) => ($layout === 'desktop' ? '24px' : '18px')};
  height: ${({ $layout }) => ($layout === 'desktop' ? '15px' : '11px')};
  color: ${({ theme }) => theme.colors.blue.dark};
  pointer-events: none;
  transform: translateY(-50%) rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  transition: transform 160ms ease;

  svg {
    width: 100%;
    height: 100%;
  }
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
  max-height: ${({ $layout }) => ($layout === 'desktop' ? '308px' : '264px')};
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
  layout,
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
    <SelectControl ref={rootRef} $open={isOpen} onBlurCapture={handleBlurCapture}>
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
        $invalid={invalid}
        $layout={layout}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
      >
        <TriggerValue id={valueId} $placeholder={selectedValue === ''}>
          {selectedItem.label}
        </TriggerValue>
        <TriggerCaret $layout={layout} $open={isOpen} aria-hidden='true'>
          <svg viewBox='0 0 24 15' fill='none'>
            <path
              d='M3 3L12 12L21 3'
              stroke='currentColor'
              strokeWidth='3.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </TriggerCaret>
      </SelectTrigger>

      {isOpen ? (
        <SelectMenu
          id={listboxId}
          role='listbox'
          aria-labelledby={labelId}
          $layout={layout}
        >
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
  const labelId = `${fieldId}-label`

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
          layout={layout}
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
