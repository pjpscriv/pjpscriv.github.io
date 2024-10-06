const fs = require('fs');
const path = require('path');

// Load template HTML
const template = fs.readFileSync('template.html', 'utf8');

// Languages directory
const languagesDir = './inputs';

// List of JSON files
const languageFiles = [
    'default.json',
    'fr.json',
    'es.json',
    'ma.json'
];

// Function to convert Markdown links to HTML <a> tags with target="_blank"
function convertMarkdownLinks(text) {
  const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  
  return text.replace(markdownLinkRegex, (match, linkText, url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
  });
}

// Function to recursively flatten nested objects into key-value pairs
function flattenObject(obj, prefix = '') {
    let result = {};
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
  
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          Object.assign(result, flattenObject(obj[key], newKey));
        } else {
          result[newKey] = obj[key];
        }
      }
    }
  
    return result;
  }
  

languageFiles.forEach((file) => {
  const languageData = JSON.parse(fs.readFileSync(path.join(languagesDir, file), 'utf8'));

  const flattenedData = flattenObject(languageData);

  // Replace placeholders in the template with language data
  let htmlContent = template;
  Object.keys(flattenedData).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    
    // Convert Markdown links to HTML <a> tags
    const htmlValue = convertMarkdownLinks(flattenedData[key]);
    htmlContent = htmlContent.replace(regex, htmlValue);
  });

  // Write the final HTML file
  let outputFileName = '../index.html';
  if (file !== 'default.json') {
      outputFileName = '../' + file.replace('.json', '/index.html');
  }
  fs.writeFileSync(outputFileName, htmlContent, 'utf8');
  console.log(`${outputFileName} generated.`);
});
