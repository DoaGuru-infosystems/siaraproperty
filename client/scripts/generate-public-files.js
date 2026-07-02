const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const outputDir = path.resolve(rootDir, process.argv[2] || "build");
const baseUrlVariable = "REACT_APP_BASE_URL";

function readEnvBaseUrl() {
  if (process.env[baseUrlVariable]) {
    return process.env[baseUrlVariable];
  }

  const envPath = path.join(rootDir, ".env");
  if (!fs.existsSync(envPath)) {
    return "";
  }

  const envFile = fs.readFileSync(envPath, "utf8");
  const envLine = envFile
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith("#") && line.startsWith(`${baseUrlVariable}=`));

  if (!envLine) {
    return "";
  }

  return envLine
    .slice(`${baseUrlVariable}=`.length)
    .trim()
    .replace(/^["']|["']$/g, "");
}

const baseUrl = readEnvBaseUrl().trim().replace(/\/+$/, "");

if (!baseUrl) {
  throw new Error(`${baseUrlVariable} is required to generate public files.`);
}

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
