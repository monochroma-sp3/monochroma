const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf-8');

// Replacements
content = content.replace(
    '<title>Monochrome Music</title>',
    '<title>Monochroma Music</title>'
);

content = content.replace(
    '<link rel="canonical" href="https://monochrome.tf/" />',
    '<link rel="canonical" href="https://monochroma.haxs.dev/" />'
);

content = content.replace(
    '<meta name="apple-mobile-web-app-title" content="Monochrome" />',
    '<meta name="apple-mobile-web-app-title" content="Monochroma" />'
);

content = content.replace(
    'It could also be due to Monochrome not having',
    'It could also be due to Monochroma not having'
);

content = content.replace(
    'It is recommended to create a Monochrome profile instead.',
    'It is recommended to create a Monochroma profile instead.'
);

content = content.replace(
    'The desktop version of Monochrome is currently undergoing essential maintenance',
    'The desktop version of Monochroma is currently undergoing essential maintenance'
);

content = content.replace(
    '<p>A new version of Monochrome is available.</p>',
    '<p>A new version of Monochroma is available.</p>'
);

content = content.replace(
    '<a href="https://monochrome.tf/" class="sidebar-logo-link">\n                            <use svg="./images/monochrome-logo.svg" size="200" class="app-logo" />\n                            <span>Monochrome</span>',
    '<a href="https://monochroma.haxs.dev/" class="sidebar-logo-link">\n                            <use svg="./images/monochrome-logo.svg" size="200" class="app-logo" />\n                            <span>Monochroma</span>'
);

// Remove donate sidebar link
content = content.replace(
    / *<li class="nav-item" id="sidebar-nav-donate">[\s\S]*?<\/li>\n/,
    ''
);

// Update discord link
content = content.replace(
    '<a href="discord.html" target="_blank">',
    '<a href="https://discord.gg/ZSzCS6Kc2X" target="_blank">'
);

// Update download link
content = content.replace(
    '<a href="/download">',
    '<a href="https://mono.haxs.dev/download" target="_blank">'
);

// Update Welcome text
content = content.replace(
    '<h2 style="margin-bottom: 1rem">Welcome to Monochrome</h2>',
    '<h2 style="margin-bottom: 1rem">Welcome to Monochroma</h2>'
);

// Remove instances tab button
content = content.replace(
    / *<button class="settings-tab" data-tab="instances">Instances<\/button>\n/,
    ''
);

// Remove instances tab content
// It looks like:
// <div class="settings-tab-content" id="settings-tab-instances">
// ... down to the next settings-tab-content which is <div class="settings-tab-content" id="settings-tab-system">
const instancesTabRegex = / *<div class="settings-tab-content" id="settings-tab-instances">[\s\S]*?(?= *<div class="settings-tab-content" id="settings-tab-system">)/;
content = content.replace(instancesTabRegex, '');

// Remove donate toggle in settings
const donateToggleRegex = / *<div class="setting-item">\s*<div class="info">\s*<span class="label">Show Donate in Sidebar<\/span>[\s\S]*?<\/label>\s*<\/div>\n/;
content = content.replace(donateToggleRegex, '');

// Rename monochrome app text
content = content.replace(
    '<h2 class="section-title" style="text-align: center">Monochrome Official App</h2>',
    '<h2 class="section-title" style="text-align: center">Monochroma Official App</h2>'
);

content = content.replace(
    'Install the Monochrome Desktop App for a refined & improved music listening experience.',
    'Install the Monochroma Desktop App for a refined & improved music listening experience.'
);

// Remove donate page
const donatePageRegex = / *<div id="page-donate" class="page">[\s\S]*?<\/div> *(?:\n *){0,3}<\/main>/;
content = content.replace(donatePageRegex, '\n            </main>');

fs.writeFileSync('index.html', content);
console.log('index.html updated successfully');
