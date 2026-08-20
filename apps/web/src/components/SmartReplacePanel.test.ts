import { describe, expect, it } from 'vitest';
import { isDialogDismissKey } from './SmartReplacePanel';

describe('SmartReplacePanel keyboard behavior', () => {
  it('only dismisses the modal on Escape', () => {
    expect(['Escape', 'Enter', 'Tab'].map(isDialogDismissKey)).toEqual([true, false, false]);
  });
});
