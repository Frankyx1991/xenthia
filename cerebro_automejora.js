
const { Octokit } = require('octokit');
const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const repoUrl = process.env.REPO_CEREBRO;

module.exports.ejecutarRevision = async () => {
  const repoName = repoUrl.split('/').pop().replace('.git', '');
  const tmpDir = path.join(__dirname, 'tmp', repoName);

  const git = simpleGit();

  if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });

  try {
    await git.clone(repoUrl, tmpDir);
    console.log("✅ Repositorio clonado:", repoName);

    const packagePath = path.join(tmpDir, 'package.json');
    if (!fs.existsSync(packagePath)) {
      console.warn("⚠️ No se encontró package.json");
      return;
    }

    const pkg = JSON.parse(fs.readFileSync(packagePath));
    if (!pkg.scripts || !pkg.scripts.start) {
      pkg.scripts = pkg.scripts || {};
      pkg.scripts.start = "node server.js";
      fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
      console.log("🛠️ Agregado script de inicio en package.json");

      await git.cwd(tmpDir);
      await git.add('package.json');
      await git.commit('fix: añadido script de inicio');
      await git.push('origin', 'main');
      console.log("🚀 Cambios subidos a GitHub.");
    } else {
      console.log("📦 package.json correcto.");
    }
  } catch (error) {
    console.error("❌ Error revisando Cerebro:", error.message);
  }
};
