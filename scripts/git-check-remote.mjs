import fs from 'node:fs';
import http from 'isomorphic-git/http/node';
import git from 'isomorphic-git';

async function checkRemote() {
  console.log('Checking remote repository info for https://github.com/gollamaneesh1000/AdaptTravel.git...');
  try {
    const info = await git.getRemoteInfo({
      http,
      url: 'https://github.com/gollamaneesh1000/AdaptTravel.git'
    });
    console.log('Remote info successfully retrieved:');
    console.log('Capabilities:', info.capabilities);
    console.log('Remote branches/refs:', info.refs);
  } catch (err) {
    console.log('Remote check result:', err.message);
  }
}

checkRemote();
