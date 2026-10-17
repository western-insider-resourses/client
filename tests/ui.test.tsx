import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Badge, Button, Card, EmptyState, SectionHeading } from '@/components/ui';

describe('ui components', () => {
  it('Button defaults to type=button and applies the variant', async () => {
    const onClick = vi.fn();
    render(<Button variant="primary" onClick={onClick}>Save</Button>);
    const b = screen.getByRole('button', { name: 'Save' });
    expect(b).toHaveAttribute('type', 'button');
    expect(b).toHaveClass('btn', 'btn-primary');
    await userEvent.click(b);
    expect(onClick).toHaveBeenCalledOnce();
  });
  it('Button with href renders a link', () => {
    render(<Button href="/x">Go</Button>);
    expect(screen.getByRole('link', { name: 'Go' })).toHaveAttribute('href', '/x');
  });
  it('Badge, Card, EmptyState and SectionHeading render their content', () => {
    render(<><Badge>Tech</Badge><Card data-testid="c">body</Card><EmptyState>Nothing</EmptyState><SectionHeading as="h3">Title</SectionHeading></>);
    expect(screen.getByText('Tech')).toHaveClass('badge');
    expect(screen.getByTestId('c')).toHaveClass('card');
    expect(screen.getByText('Nothing')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Title' })).toBeInTheDocument();
  });
});
