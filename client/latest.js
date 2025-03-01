const fs = require('fs');
const { execSync } = require('child_process');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const depTypes = ['dependencies', 'devDependencies'];

depTypes.forEach((depType) => {
  if (packageJson[depType]) {
    Object.keys(packageJson[depType]).forEach((pkg) => {
      const latestVersion = execSync(`npm view ${pkg} version`)
        .toString()
        .trim();
      packageJson[depType][pkg] = `^${latestVersion}`;
      console.log(`Updated ${pkg} to ^${latestVersion}`);
    });
  }
});

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
