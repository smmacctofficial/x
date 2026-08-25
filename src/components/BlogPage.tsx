import React, { useEffect } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Layers,
  HelpCircle,
  Share2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { blogPosts, getBlogPostBySlug, BlogPost } from '../data/blogData';
import { getServiceByIdOrSlug } from '../data/servicesData';
import { SeoHead } from './SeoHead';

interface BlogPageProps {
  selectedArticleSlug?: string;
  onSelectArticle: (slug: string) => void;
  onSelectService: (serviceId: string) => void;
  onBackToBlogList: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  selectedArticleSlug,
  onSelectArticle,
  onSelectService,
  onBackToBlogList
}) => {
  const currentPost = selectedArticleSlug ? getBlogPostBySlug(selectedArticleSlug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedArticleSlug]);

  // If viewing a specific article detail page
  if (currentPost) {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: currentPost.title,
      description: currentPost.metaDescription,
      datePublished: currentPost.publishedDate,
      dateModified: currentPost.publishedDate,
      author: {
        '@type': 'Organization',
        name: currentPost.author,
        url: 'https://buymailaccounts.com'
      },
      publisher: {
        '@type': 'Organization',
        name: 'BuyMailAccounts.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://buymailaccounts.com/logo.png'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://buymailaccounts.com/#blog/${currentPost.slug}`
      }
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://buymailaccounts.com/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://buymailaccounts.com/#blog'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: currentPost.title,
          item: `https://buymailaccounts.com/#blog/${currentPost.slug}`
        }
      ]
    };

    const relatedServices = currentPost.relatedServiceIds
      .map((id) => getServiceByIdOrSlug(id))
      .filter((s): s is NonNullable<typeof s> => !!s);

    const relatedArticles = currentPost.relatedBlogSlugs
      .map((s) => getBlogPostBySlug(s))
      .filter((a): a is BlogPost => !!a);

    return (
      <div className="min-h-screen bg-slate-50/50 text-slate-900 pb-20">
        <SeoHead
          title={`${currentPost.seoTitle} | BuyMailAccounts.com`}
          description={currentPost.metaDescription}
          keywords={[currentPost.primaryKeyword, ...currentPost.secondaryKeywords]}
          canonicalUrl={`https://buymailaccounts.com/#blog/${currentPost.slug}`}
          ogType="article"
          schemaJson={[articleSchema, breadcrumbSchema]}
        />

        {/* Breadcrumb Header */}
        <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap">
            <button
              onClick={onBackToBlogList}
              className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition-colors font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Articles</span>
            </button>
            <span>/</span>
            <span className="text-indigo-600 font-bold">{currentPost.category}</span>
            <span>/</span>
            <span className="text-slate-800 truncate">{currentPost.title}</span>
          </div>
        </div>

        {/* Main Article Container */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
          {/* Post Header */}
          <header className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
                {currentPost.category}
              </span>
              <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {currentPost.publishedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {currentPost.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {currentPost.author}
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {currentPost.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {currentPost.excerpt}
            </p>
          </header>

          {/* Quick Takeaway / Summary Box */}
          <div className="p-6 rounded-2xl bg-indigo-50/80 border border-indigo-200 space-y-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Key Article Takeaways &amp; Executive Summary</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {currentPost.content.introduction}
            </p>
          </div>

          {/* Body Sections */}
          <div className="space-y-8 text-slate-800 text-sm sm:text-base leading-relaxed bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
            {currentPost.content.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight border-b border-slate-100 pb-2">
                  {section.heading}
                </h2>
                <p className="text-slate-700 font-normal leading-relaxed">{section.body}</p>

                {section.subsections && (
                  <div className="grid grid-cols-1 gap-3.5 pt-2">
                    {section.subsections.map((sub, sIdx) => (
                      <div key={sIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{sub.title}</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                          {sub.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* Conclusion */}
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">Strategic Conclusion</h2>
              <p className="text-slate-700">{currentPost.content.conclusion}</p>
            </div>
          </div>

          {/* Embedded FAQs for this article */}
          {currentPost.faqs.length > 0 && (
            <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <span>Frequently Asked Questions</span>
              </h3>
              <div className="space-y-3">
                {currentPost.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-900">{faq.question}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Recommended Relevant Services Box */}
          {relatedServices.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white space-y-4 shadow-xl">
              <div>
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">Recommended Infrastructure</span>
                <h3 className="text-xl font-extrabold">Verified Accounts For This Strategy</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedServices.map((svc) => (
                  <div
                    key={svc.id}
                    onClick={() => onSelectService(svc.id)}
                    className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {svc.title}
                      </h4>
                      <span className="text-xs text-slate-300">From ${svc.startingPrice} &bull; {svc.deliveryTime}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-slate-900">Related Strategic Guides</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((art) => (
                  <div
                    key={art.slug}
                    onClick={() => onSelectArticle(art.slug)}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 transition-all cursor-pointer space-y-2 shadow-2xs group"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                      {art.category} &bull; {art.readTime}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                      {art.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{art.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    );
  }

  // Blog Index View
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'BuyMailAccounts.com Digital Deliverability & Account Security Blog',
    description: 'Expert tutorials and guides on email warmup, antidetect browsers, developer GitHub workflows, and PVA infrastructure.',
    url: 'https://buymailaccounts.com/#blog',
    blogPost: blogPosts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.metaDescription,
      datePublished: p.publishedDate,
      url: `https://buymailaccounts.com/#blog/${p.slug}`
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 pb-20">
      <SeoHead
        title="Knowledge Hub & Deliverability Blog | BuyMailAccounts.com"
        description="Comprehensive guides, tutorials, and best practices on warming up aged Gmail accounts, anti-detect browser setup, residential proxies, and GitHub commit history."
        canonicalUrl="https://buymailaccounts.com/#blog"
        keywords={[
          'email deliverability blog',
          'aged gmail warmup guide',
          'antidetect browser tutorial',
          'pva accounts guide',
          'github developer accounts'
        ]}
        schemaJson={blogListSchema}
      />

      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Topical Authority &amp; Strategic Knowledge Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Account Security &amp; Deliverability Guides
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            In-depth technical guides written by deliverability specialists, network engineers, and infrastructure architects.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              onClick={() => onSelectArticle(post.slug)}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 hover:border-indigo-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-6 group shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
                <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5" /> {post.publishedDate}
                </span>
                <span className="flex items-center gap-1">
                  Read Full Guide
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
