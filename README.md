# Noxx Minecraft plugin catalog

Static, framework-free catalog. Open `index.html` directly, or publish these files on GitHub Pages. The 100 Java entries link to their Modrinth project pages and versions/download listings; each is marked Free based on its free Modrinth distribution listing. Verify versions and terms on the official page.

## Edit the plugin list

Open `plugins.js` in a text editor. The clearly marked `window.NOXX_PLUGINS` array holds every entry. Copy an object to add a plugin, or edit its fields: `name`, `description`, `platforms` (array), `category`, `price`, `page`, and `download`. Keep valid JSON-style quotes and commas. Use one of the category names displayed by the site. For official links, use the plugin's own Modrinth, Hangar, SpigotMC, GitHub, Bukkit Dev, or other publisher page.

## Change Free / Paid

Set that entry's `price` to exactly `"Free"` or `"Paid"`; this controls both the card badge and price filter. Only use Paid when the official page shows a paid offer. If a price is unknown, don't guess: use `"Unknown"` (it will show on the card, though the Free/Paid filter will not include it).

## Publish on GitHub Pages

1. Create a GitHub repository (public is simplest) and upload `index.html`, `styles.css`, `app.js`, `plugins.js`, `README.md`, and `.nojekyll` into the repository root.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**. Select branch **main** and folder **/(root)**, then save.
4. Wait for GitHub Pages to publish; the Pages screen shows the live site URL. Re-upload changed files to update it.

No build step, framework, or server is needed. Bedrock links are separate: Bedrock does not use Java plugins.
