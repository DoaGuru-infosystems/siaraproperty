const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const outputDir = path.resolve(rootDir, process.argv[2] || "build");
// Candidate env variables in order of priority:
// 1. REACT_APP_Canonical_URL: Public site domain (https://siaraproperties.com)
// 2. REACT_APP_SITE_URL: Alternate public site domain variable
// 3. REACT_APP_BASE_URL: Backend or fallback URL
const candidateVariables = [
  "REACT_APP_Canonical_URL",
  "REACT_APP_SITE_URL",
  "REACT_APP_BASE_URL",
];

function readEnvBaseUrl() {
  // Check process.env first
  for (const varName of candidateVariables) {
    if (process.env[varName]) {
      return process.env[varName];
    }
  }

  const envPath = path.join(rootDir, ".env");
  if (!fs.existsSync(envPath)) {
    return "https://siaraproperties.com";
  }

  const envFile = fs.readFileSync(envPath, "utf8");
  const envLines = envFile.split(/\r?\n/).map((line) => line.trim());

  for (const varName of candidateVariables) {
    const match = envLines.find(
      (line) => line && !line.startsWith("#") && line.startsWith(`${varName}=`)
    );
    if (match) {
      return match
        .slice(`${varName}=`.length)
        .trim()
        .replace(/^["']|["']$/g, "");
    }
  }

  return "https://siaraproperties.com";
}

const baseUrl = (readEnvBaseUrl() || "https://siaraproperties.com")
  .trim()
  .replace(/\/+$/, "");

function renderPublicFile(fileName) {
  const templatePath = path.join(publicDir, fileName);
  const outputPath = path.join(outputDir, fileName);
  const template = fs.readFileSync(templatePath, "utf8");
  const rendered = template.replace(/__BASE_URL__/g, baseUrl);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, rendered);
}

renderPublicFile("sitemap.xml");
renderPublicFile("robots.txt");

console.log(`Generated sitemap.xml and robots.txt with ${baseUrl}`);
