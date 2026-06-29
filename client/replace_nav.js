const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            /* Recurse into a subdirectory */
            results = results.concat(walk(file));
        } else { 
            /* Is a file */
            if(file.endsWith('.jsx')) results.push(file);
        }
    });
    return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes('import Navbar from') || content.includes('import StickyNavbar from') || content.includes('NavbarMob') || content.includes('nav1') || content.includes('nav2')) {
    
    // Replace imports
    if (content.match(/import\s+Navbar\s+from\s+["'](\.\.?.*?)\/components\/Navbar["']/)) {
        content = content.replace(/import\s+Navbar\s+from\s+["'](\.\.?.*?)\/components\/Navbar["']/g, 'import Navbar from "$1/components/UpdatedCode/Navbar"');
        changed = true;
    }
    if (content.match(/import\s+StickyNavbar\s+from\s+["'](\.\.?.*?)\/components\/Navbar["']/)) {
        content = content.replace(/import\s+StickyNavbar\s+from\s+["'](\.\.?.*?)\/components\/Navbar["']/g, 'import StickyNavbar from "$1/components/UpdatedCode/Navbar"');
        changed = true;
    }

    // Remove NavbarMob import
    if (content.match(/import\s+NavbarMob\s+from\s+["'].*?NavbarMob["'];?/)) {
        content = content.replace(/import\s+NavbarMob\s+from\s+["'].*?NavbarMob["'];?\r?\n?/g, '');
        changed = true;
    }

    // Replace <div className="nav1">...</div>
    if (content.match(/<div\s+className=["']nav1["']>\s*<Navbar[^>]*\/>\s*<\/div>/)) {
        content = content.replace(/<div\s+className=["']nav1["']>\s*<Navbar([^>]*)>\s*<\/Navbar>\s*<\/div>/g, '<Navbar$1/>'); // fallback if children
        content = content.replace(/<div\s+className=["']nav1["']>\s*(<Navbar[^>]*\/>)\s*<\/div>/g, '$1');
        changed = true;
    }
    if (content.match(/<div\s+className=["']nav1["']>\s*<StickyNavbar[^>]*\/>\s*<\/div>/)) {
        content = content.replace(/<div\s+className=["']nav1["']>\s*(<StickyNavbar[^>]*\/>)\s*<\/div>/g, '$1');
        changed = true;
    }

    // Replace <div className="nav2">...</div>
    if (content.match(/<div\s+className=["']nav2["']>\s*<NavbarMob[^>]*\/>\s*(?:\{\s*["']\s*["']\s*\})?\s*<\/div>/)) {
        content = content.replace(/<div\s+className=["']nav2["']>\s*<NavbarMob[^>]*\/>\s*(?:\{\s*["']\s*["']\s*\})?\s*<\/div>/g, '');
        changed = true;
    }
    
    // specifically handle NavbarMob that has an explicit closing tag (if any)
    if (content.match(/<div\s+className=["']nav2["']>\s*<NavbarMob[^>]*><\/NavbarMob>\s*<\/div>/)) {
        content = content.replace(/<div\s+className=["']nav2["']>\s*<NavbarMob[^>]*><\/NavbarMob>\s*<\/div>/g, '');
        changed = true;
    }

    // if just <NavbarMob /> exists outside of nav2
    if (content.match(/<NavbarMob[^>]*\/>/)) {
        content = content.replace(/<NavbarMob[^>]*\/>/g, '');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log("Updated: " + file);
    }
  }
});
