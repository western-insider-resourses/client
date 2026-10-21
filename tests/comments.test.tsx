import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Comments from '@/components/Comments';

const { mutate, comments } = vi.hoisted(() => ({
  mutate: vi.fn(),
  comments: [{ id: 1, parent_id: null, name: 'Alex', body: 'Nice story', created_at: '2026-10-01T00:00:00Z', replies: [] }],
}));

vi.mock('@/hooks/api/useComments', () => ({
  useComments: () => ({ data: { comments, total: 1 }, isPending: false, error: null }),
  useCreateComment: () => ({ mutate, isPending: false, error: null }),
}));

describe('Comments', () => {
  it('shows comments from the API query and submits through the create-comment mutation', () => {
    render(<Comments slug="story-slug" />);

    expect(screen.getByRole('heading', { name: 'Comments (1)' })).toBeInTheDocument();
    expect(screen.getByText('Nice story')).toBeInTheDocument();

    fireEvent.change(screen.getByRole('textbox', { name: 'Your name' }), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Comment' }), { target: { value: 'Thanks for sharing' } });
    fireEvent.click(screen.getByRole('button', { name: 'Post comment' }));

    expect(mutate).toHaveBeenCalledWith(
      { name: 'Jane', body: 'Thanks for sharing', parentId: null },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    );
  });
});
