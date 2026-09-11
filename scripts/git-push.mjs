import fs from 'node:fs';
import http from 'isomorphic-git/http/node';
import git from 'isomorphic-git';

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || process.argv[2];

async function push() {
  if (!token) {
    console.error('\n❌ GitHub Token required to push to https://github.com/gollamaneesh1000/AdaptTravel.git');
    console.error('\nUsage:');
    console.error('  node scripts/git-push.mjs <YOUR_GITHUB_PERSONAL_ACCESS_TOKEN>');
    console.error('  or: GITHUB_TOKEN=<YOUR_TOKEN> npm run push\n');
    process.exit(1);
  }

  console.log('Pushing main branch to https://github.com/gollamaneesh1000/AdaptTravel.git...');
  
  try {
    const result = await git.push({
      fs,
      http,
      dir: process.cwd(),
      remote: 'origin',
      ref: 'main',
      force: true,
      onAuth: () => ({
        username: token,
        password: ''
      })
    });

    console.log('✅ Pushed successfully to GitHub!');
    console.log('Repository URL: https://github.com/gollamaneesh1000/AdaptTravel');
    console.log('Result:', result);
  } catch (err) {
    console.error('❌ Push failed:', err.message);
    if (err.data) {
      console.error('Details:', err.data);
    }
    process.exit(1);
  }
}

push();
