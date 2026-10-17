import type { Category, PostDetail, PostsPage, PostSummary, SocialLink } from './types';

// Demo content shown until the real API has data (or always, when NEXT_PUBLIC_USE_DUMMY_DATA is not "false").
// The five niches below are the site tabs.
export const DUMMY_CATEGORIES: Category[] = [
  { id: 1, name: 'Business', slug: 'business' },
  { id: 2, name: 'Career', slug: 'career' },
  { id: 3, name: 'Technology', slug: 'technology' },
  { id: 4, name: 'Investment', slug: 'investment' },
  { id: 5, name: 'Finance', slug: 'finance' },
];

type Seed = [slug: string, title: string, excerpt: string, paragraphs: string[]];

const SEEDS: Record<string, Seed[]> = {
  business: [
    ['small-business-cash-flow', 'Five habits that keep a small business cash-positive', 'Healthy cash flow is rarely about big wins. It is about boring weekly routines.',
      ['Most small businesses do not fail for lack of customers. They fail because cash arrives later than bills do. The fix starts with seeing the numbers every week, not every quarter.', 'Send invoices the day work is done, not at month end. Offer a small discount for early payment and follow up politely on day seven.', 'Keep a thirteen-week cash forecast. It takes thirty minutes to update and shows a shortfall long before it becomes a crisis.', 'Finally, separate tax money the moment revenue lands. Money you do not see cannot be spent by accident.']],
    ['pricing-your-first-product', 'How to price your first product without guessing', 'Price is a message about value. Here is a simple way to set it with evidence.',
      ['Start with cost, add the margin you need, then compare against what customers already pay for the nearest alternative.', 'Ask ten potential buyers at what price the product feels too cheap to trust and too expensive to consider. The overlap is your range.', 'Launch at the upper half of that range. It is far easier to run a discount than to raise a price later.']],
    ['remote-teams-that-ship', 'What remote teams that ship on time do differently', 'Written updates, small batches and clear owners beat constant meetings.',
      ['Distributed teams fail when work is invisible. Successful ones write down decisions so nobody has to ask twice.', 'They also cut work into pieces small enough to finish in two days, which makes progress easy to see and easy to correct.', 'Every task has exactly one owner. Shared ownership usually means no ownership.']],
  ],
  career: [
    ['negotiating-a-raise', 'A practical script for negotiating a raise', 'Preparation, timing and a specific number make the difference.',
      ['Schedule a conversation rather than catching your manager in a hallway. Say you want to discuss your compensation and growth.', 'Bring three concrete results from the past year, each with a number attached: revenue, time saved or costs avoided.', 'Name a specific figure backed by market data. Then stop talking and let silence do some work.', 'If the answer is no, ask what would need to change and agree a date to revisit it.']],
    ['switching-careers-at-thirty-five', 'Switching careers at 35: what actually works', 'Transferable skills matter more than a fresh qualification.',
      ['Career changers often assume they must start from zero. In practice, most of what you know about people, projects and deadlines carries over.', 'Pick a bridge role close to your current work but pointed at the new field. It lets you learn on the job while earning.', 'Build one small piece of real work in the new area and show it. A portfolio beats a certificate in most interviews.']],
    ['writing-a-cv-that-gets-read', 'Writing a CV that gets read in under ten seconds', 'Recruiters skim. Design your CV for skimming.',
      ['Lead with a two-line summary that states your role, your strongest skill and a headline result.', 'Under each job, list three bullets that start with a verb and end with a measurable outcome.', 'Cut anything older than ten years unless it is directly relevant. One clean page beats two crowded ones.']],
  ],
  technology: [
    ['ai-tools-for-small-teams', 'Practical AI tools small teams can adopt this month', 'Start with the repetitive tasks nobody enjoys.',
      ['The best first uses of AI are dull: summarising meetings, drafting routine replies and tidying spreadsheets.', 'Pick one workflow, measure the time it takes today, and trial a tool for two weeks. Keep it only if the saving is real.', 'Set simple rules on what data may be pasted into external tools, and write them down where everyone can find them.']],
    ['password-managers-explained', 'Why everyone should use a password manager', 'Reusing passwords is the most common way accounts get taken over.',
      ['When one website leaks its database, attackers try the same email and password everywhere else. A unique password per site stops that chain.', 'A password manager creates and remembers those passwords for you, so you only memorise one strong passphrase.', 'Turn on two-factor authentication for email and banking first. Those are the accounts that unlock all the others.']],
    ['learning-to-code-in-a-year', 'A realistic plan to learn programming in a year', 'Consistency beats intensity. Thirty minutes a day adds up.',
      ['Choose one language and stay with it for six months. Jumping between languages is the commonest reason beginners stall.', 'Build tiny projects early: a tip calculator, a to-do list, a page that shows the weather.', 'Read other people\'s code and ask for review. Feedback shortens the learning curve more than any course.']],
  ],
  investment: [
    ['index-funds-for-beginners', 'Index funds for beginners: a plain-English guide', 'Low cost, wide spread, little maintenance.',
      ['An index fund holds a small slice of many companies, so one bad business cannot sink your savings.', 'Fees matter. A fund that charges one percent a year can cost you a quarter of your final balance over thirty years.', 'Invest a fixed amount on a fixed date each month. It removes the temptation to time the market.']],
    ['understanding-risk-tolerance', 'How to understand your own risk tolerance', 'The right portfolio is the one you can hold through a bad year.',
      ['Risk tolerance is not how you feel in a rising market. It is how you act when your balance falls by a fifth.', 'Match your mix of stocks and bonds to your time horizon. Money needed within five years should not sit in volatile assets.', 'Review once a year and rebalance if your mix has drifted. Then leave it alone.']],
    ['real-estate-vs-stocks', 'Real estate or stocks: comparing two popular routes', 'Each rewards a different kind of investor.',
      ['Property offers rental income and leverage, but it is hard to sell quickly and demands your time.', 'Stocks are liquid and easy to diversify, but their prices swing and tempt people into bad decisions.', 'Many investors hold both. The deciding factors are how much time you have, how much you can borrow safely and how soon you need the money.']],
  ],
  finance: [
    ['building-an-emergency-fund', 'Building an emergency fund from zero', 'Start with one month of essentials and grow from there.',
      ['An emergency fund turns a crisis into an inconvenience. It is the base that every other financial goal sits on.', 'List your essential monthly costs: rent, food, transport, utilities and minimum debt payments. Aim to save one month of that first.', 'Keep the money in a separate account that earns interest but is not linked to your debit card.']],
    ['budgeting-that-sticks', 'A budget that survives real life', 'Fewer categories, more flexibility.',
      ['Strict budgets with twenty categories rarely last a month. Try three buckets: needs, wants and savings.', 'Automate savings on payday so the decision is made before you can spend the money.', 'Review once a week for ten minutes. Small corrections beat a dramatic reset every quarter.']],
    ['paying-off-debt-faster', 'Paying off debt faster: avalanche or snowball?', 'Both work. The better one is the one you will finish.',
      ['The avalanche method pays the highest interest rate first and saves the most money overall.', 'The snowball method clears the smallest balance first and gives quick wins that keep motivation high.', 'Whichever you choose, pay the minimum on everything and direct every spare naira or dollar to one target at a time.']],
  ],
};

const catBySlug = new Map(DUMMY_CATEGORIES.map((c) => [c.slug, c]));
const DAY = 86_400_000;

function build(): PostDetail[] {
  const base = Date.parse('2026-10-01T09:00:00Z');
  let n = 0;
  const out: PostDetail[] = [];
  for (const [catSlug, seeds] of Object.entries(SEEDS)) {
    const cat = catBySlug.get(catSlug)!;
    seeds.forEach(([slug, title, excerpt, paragraphs], i) => {
      n += 1;
      const cover = `https://picsum.photos/seed/${slug}/900/560`;
      out.push({
        id: `dummy-${n}`, title, slug, excerpt, featured: i === 0 && catSlug === 'business', author: 'Editorial Team',
        views: 1200 - n * 47, published_at: new Date(base - (n * 1.7) * DAY).toISOString(),
        category_name: cat.name, category_slug: cat.slug, category_id: cat.id, cover,
        likes: (n * 7) % 31, comments: (n * 3) % 9, body: paragraphs.join('\n\n'),
        images: [{ url: cover, caption: '', position: 0 }, { url: `https://picsum.photos/seed/${slug}-2/900/560`, caption: '', position: 1 }],
        related: [],
      });
    });
  }
  // newest first, like the real API
  return out.sort((a, b) => b.published_at.localeCompare(a.published_at));
}

export const DUMMY_POSTS: PostDetail[] = build();

export const DUMMY_SOCIAL: SocialLink[] = [
  { id: 1, platform: 'X', url: 'https://x.com' },
  { id: 2, platform: 'LinkedIn', url: 'https://linkedin.com' },
  { id: 3, platform: 'YouTube', url: 'https://youtube.com' },
];

const summary = ({ body: _b, images: _i, related: _r, category_id: _c, ...rest }: PostDetail): PostSummary => rest;

// Same filtering / paging rules as GET /api/posts, so the site behaves the same with dummy data.
export function queryDummyPosts({ category, q, page = 1, limit = 12 }: { category?: string; q?: string; page?: number; limit?: number } = {}): PostsPage {
  const needle = q?.trim().toLowerCase();
  const matches = DUMMY_POSTS
    .filter((p) => !category || p.category_slug === category)
    .filter((p) => !needle || p.title.toLowerCase().includes(needle) || p.excerpt.toLowerCase().includes(needle))
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.published_at.localeCompare(a.published_at));
  const safePage = Math.max(page, 1);
  return {
    posts: matches.slice((safePage - 1) * limit, safePage * limit).map(summary),
    page: safePage, pages: Math.max(Math.ceil(matches.length / limit), 1), total: matches.length,
  };
}

export const trendingDummy = (): PostSummary[] => [...DUMMY_POSTS].sort((a, b) => b.views - a.views).slice(0, 5).map(summary);

export function findDummyPost(slug: string): PostDetail | null {
  const post = DUMMY_POSTS.find((p) => p.slug === slug);
  if (!post) return null;
  const related = [...DUMMY_POSTS].filter((p) => p.id !== post.id)
    .sort((a, b) => Number(b.category_id === post.category_id) - Number(a.category_id === post.category_id)).slice(0, 4).map(summary);
  return { ...post, related };
}
