import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import PostCard, { FeaturedCard } from '@/components/PostCard';
import StoryList from '@/components/StoryList';
import Pagination from '@/components/Pagination';
import { queryDummyPosts } from '@/lib/dummyData';

const { posts } = queryDummyPosts({ limit: 6 });

describe('PostCard', () => {
  it('links to the story and shows its niche badge', () => {
    const post = posts[1]!;
    render(<PostCard post={post} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', `/post/${post.slug}`);
    expect(screen.getByText(post.category_name!)).toHaveClass('badge');
    expect(screen.getByRole('heading', { name: post.title })).toBeInTheDocument();
  });
  it('FeaturedCard renders a large heading', () => {
    render(<FeaturedCard post={posts[0]!} />);
    expect(screen.getByRole('heading', { level: 2, name: posts[0]!.title })).toBeInTheDocument();
  });
});

describe('StoryList', () => {
  it('shows an empty state with no stories', () => {
    render(<StoryList posts={[]} />);
    expect(screen.getByText(/No stories here yet/)).toBeInTheDocument();
  });
  it('renders a featured card plus the rest', () => {
    render(<StoryList posts={posts} withFeatured />);
    expect(screen.getAllByRole('article')).toHaveLength(posts.length); // 1 featured + the rest
    expect(screen.getAllByRole('heading')).toHaveLength(posts.length);
  });
});

describe('Pagination', () => {
  it('renders nothing for one page', () => {
    const { container } = render(<Pagination page={1} pages={1} base="/" />);
    expect(container).toBeEmptyDOMElement();
  });
  it('links to neighbouring pages and keeps existing query strings', () => {
    render(<Pagination page={2} pages={3} base="/search?q=tax" />);
    expect(screen.getByRole('link', { name: 'Newer stories' })).toHaveAttribute('href', '/search?q=tax&page=1');
    expect(screen.getByRole('link', { name: 'Older stories' })).toHaveAttribute('href', '/search?q=tax&page=3');
    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
  });
});
