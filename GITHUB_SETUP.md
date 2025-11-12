# GitHub Hosting Setup Guide

## Step-by-Step Instructions

### 1. Initialize Git Repository

Open your terminal in the project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Manufacturing website"
```

### 2. Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository name: `manufacturing-website` (or your preferred name)
5. Description: "Fully responsive manufacturing company website"
6. Set visibility: **Public** (required for free GitHub Pages)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

### 3. Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/manufacturing-website.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait a few minutes for GitHub to build your site
7. Your website will be available at: `https://YOUR_USERNAME.github.io/manufacturing-website`

### 5. Verify Your Website

- Visit your GitHub Pages URL
- Test on mobile, tablet, and desktop
- Check all sections and functionality
- Verify form submission (it will show a success message)

## 🔄 Updating Your Website

After making changes:

```bash
# Add changed files
git add .

# Commit changes
git commit -m "Description of your changes"

# Push to GitHub
git push
```

GitHub Pages will automatically update within a few minutes.

## 📝 Custom Domain (Optional)

If you have a custom domain:

1. Go to repository **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Follow GitHub's instructions to configure DNS
4. Enable **Enforce HTTPS** (recommended)

## 🔒 Privacy Note

Since GitHub Pages requires a public repository for free hosting:
- Remove any sensitive information before pushing
- Use placeholder data in the contact form
- Consider using environment variables for sensitive data if you add a backend

## ✅ Checklist

- [ ] Git repository initialized
- [ ] Files committed locally
- [ ] GitHub repository created
- [ ] Local repository connected to GitHub
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Website accessible via GitHub Pages URL
- [ ] All sections working correctly
- [ ] Responsive design verified

## 🆘 Troubleshooting

### Issue: "Repository not found"
- Check that you've added the correct remote URL
- Verify your GitHub username is correct
- Make sure the repository exists on GitHub

### Issue: "Permission denied"
- You may need to authenticate with GitHub
- Use GitHub CLI or SSH keys
- Or use GitHub Desktop app

### Issue: "GitHub Pages not working"
- Check that the repository is **Public**
- Verify the branch is set to `main` (or `master`)
- Wait a few minutes for GitHub to build
- Check the repository Settings → Pages for errors

### Issue: "Changes not appearing"
- GitHub Pages may take a few minutes to update
- Clear your browser cache
- Check that you pushed to the correct branch

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Desktop](https://desktop.github.com/) - GUI alternative

---

**Need Help?** Check GitHub's documentation or create an issue in your repository.

