# Remove `variant` prop from FormField

## Context
The `FormField` component supports two variants (`'default'` and `'contact'`), but only `'contact'` is ever used — all 6 instances in `Contact.jsx` pass `variant='contact'`. The default variant is dead code. Removing it simplifies the component by eliminating conditional style logic.

## Changes

### 1. `src/components/ui/FormField.jsx`
- Remove `variant` prop and all `$variant` transient props
- Inline the `'contact'` branch styles directly (remove ternaries/conditionals)
- Remove `defaultControlStyles` (unused once contact styles are the only path)
- In the JSX: always render `<LabelRow>` with error support (remove the non-contact branch at lines 184-187)
- Remove `$variant` from `controlProps` object

**Styled component simplifications:**
| Component | Current | After |
|-----------|---------|-------|
| `Wrapper` | gap ternary | `gap: 4px` |
| `FieldLabel` | color/size/weight/spacing ternaries | white, 14px, medium, 0.1em, wdth 68 |
| `StyledInput` | base + conditional contact + conditional invalid | base + contact styles merged, `$invalid` only |
| `StyledTextarea` | base + conditional contact + conditional invalid | base + contact styles merged, `$invalid` only |
| `StyledSelect` | base + conditional contact + conditional invalid | base + contact styles merged, `$invalid` only |

### 2. `src/pages/Contact.jsx`
- Remove `variant='contact'` from all 6 `<FormField>` usages

### 3. `src/__tests__/Contact.test.jsx`
- Verify tests still pass (no changes needed — tests don't reference variant)

## Verification
1. `npx vitest run` — all tests pass
2. `npx eslint src/components/ui/FormField.jsx src/pages/Contact.jsx` — no lint errors
3. `preview_start` → navigate to `/contact` → `preview_snapshot` + `preview_console_logs` — form renders correctly, no errors
