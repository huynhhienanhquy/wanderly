// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SmartReplacePanel } from './SmartReplacePanel';

describe('SmartReplacePanel component', () => {
  it('renders dialog states and closes from the keyboard', () => {
    const onClose = vi.fn();
    render(<SmartReplacePanel
      itemName="Hồ Gươm"
      candidates={[]}
      loading={true}
      error=""
      previewCandidate={() => null}
      onConfirm={() => undefined}
      onClose={onClose}
    />);
    const dialog = screen.getByRole('dialog', { name: 'Thay thế Hồ Gươm' });
    expect(screen.getByRole('status').textContent).toContain('Đang tìm');
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });
});
