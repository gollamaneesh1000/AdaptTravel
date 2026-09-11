import fs from 'node:fs';
import path from 'node:path';
import git from 'isomorphic-git';

const dir = process.cwd();

async function run() {
  console.log('1. Initializing Git repository in:', dir);
  await git.init({ fs, dir, defaultBranch: 'main' });

  console.log('2. Adding remote origin: https://github.com/gollamaneesh1000/AdaptTravel.git');
  try {
    await git.addRemote({
      fs,
      dir,
      remote: 'origin',
      url: 'https://github.com/gollamaneesh1000/AdaptTravel.git',
      force: true
    });
  } catch (e) {
    console.log('Remote already configured or updated:', e.message);
  }

  console.log('3. Staging files (respecting .gitignore)...');
  // Walk files in project
  const ignoredPatterns = [
    'node_modules',
    'dist',
    'dist-ssr',
    '.git',
    '.DS_Store',
    '.vscode',
    'pnpm-lock.yaml'
  ];

  function getFiles(currentDir, relativePrefix = '') {
    let results = [];
    const list = fs.readdirSync(currentDir);
    for (const file of list) {
      if (ignoredPatterns.includes(file)) continue;
      const fullPath = path.join(currentDir, file);
      const relPath = relativePrefix ? `${relativePrefix}/${file}` : file;
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        results = results.concat(getFiles(fullPath, relPath));
      } else {
        results.push(relPath);
      }
    }
    return results;
  }

  const filesToAdd = getFiles(dir);
  console.log(`Found ${filesToAdd.length} project files to stage.`);

  for (const filepath of filesToAdd) {
    await git.add({ fs, dir, filepath });
  }

  console.log('4. Committing files...');
  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'Maneesh Golla',
      email: 'gollamaneesh1000@users.noreply.github.com'
    },
    message: 'Initial commit: Adapt Travel Agent - AI Autonomous Itinerary & Disruption Platform (Obsidian Black & Solar Flare Orange)'
  });

  console.log('Committed successfully with SHA:', sha);
  console.log('Current branch: main');
}

run().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
