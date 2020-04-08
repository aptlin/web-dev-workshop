import config from '../../config';
const { siteTitle, siteUrl } = config.meta;

interface SchemaOptions {
  pathname: string;
  pageTitle?: string;
}
function schemaGenerator({ pathname, pageTitle }: SchemaOptions) {
  const isSubPage = pageTitle && pathname !== '/';
  const canonical = `${siteUrl}${pathname}`;
  const pageTitleFull = pageTitle ? `${siteTitle} | ${pageTitle}` : siteTitle;

  const schema = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: canonical,
      name: pageTitle || siteTitle,
      alternateName: pageTitleFull,
    },
  ];

  if (isSubPage) {
    schema.push({
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': siteUrl,
            name: siteTitle,
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': canonical,
            name: pageTitle,
          },
        },
      ],
    } as any);
  }

  return schema;
}
export default schemaGenerator;
