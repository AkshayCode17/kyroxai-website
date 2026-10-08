# KyroxAI Static Website

Static HTML/CSS/JS site based on the supplied Blocksy child-theme visual design language.

## Sections
1. Hero
2. About + Trusted Partners
3. Product suite with an animated desktop mega menu (Inthings, BeACoder, Zenix, VLook, Fixed Asset Management and Supply Chain Management)
4. Why KyroxAI
5. Compact Careers section with an autoplaying company-values slider and resume application form
6. Contact

## Important
The supplied WordPress theme's CSS is included as `css/template-style.css` and `css/template-responsive.css`. WordPress PHP, SCF/ACF data, database content and WordPress plugins are not required for this static version.

Locally stored product screenshots are used in the product cards. Replace them with approved product screenshots or photography when available.

Product-card images use responsive WebP variants (480, 800 and 1376 pixels wide) with the original PNGs as a fallback.

## Run locally
Open `index.html`, or run:
`python -m http.server 8080`
then visit `http://localhost:8080`.

## SEO
The homepage includes title, description, robots, canonical, Open Graph, Twitter metadata and Organization JSON-LD. `robots.txt`, `sitemap.xml`, and `seo-config.json` are included.

For every future page, give it a unique title, description, canonical URL, H1, semantic headings, descriptive image alt text, relevant JSON-LD, Open Graph metadata, and add the URL to the sitemap.

## Production checklist
- Replace `www.kyroxai.co.in` if the real domain differs.
- Replace partner placeholders.
- Replace dummy SVGs with real assets.
- Connect the contact form to a real form endpoint.
- Connect the Careers application form to a secure endpoint before accepting or storing candidate details and resume files.
- Add real organization/social URLs to JSON-LD.
- Add all production URLs to the sitemap.
- Verify mobile UX, accessibility, Core Web Vitals, structured data and Search Console.
