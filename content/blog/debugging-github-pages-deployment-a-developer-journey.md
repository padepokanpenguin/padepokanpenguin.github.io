---
title: "Debugging GitHub Pages Deployment: A Developer's Journey"
date: 2025-08-03T17:00:00+07:00
draft: false
tags: ["debugging", "github-pages", "hugo", "devops", "troubleshooting"]
categories: ["tutorial", "story"]
description: "A first-person narrative of debugging a Hugo site deployment on GitHub Pages - from mysterious 404 errors to discovering hidden configuration issues."
---

## The Mystery of the Missing Website

It was a typical Saturday afternoon when I encountered what would become one of those debugging adventures that remind you why software development is both an art and a science. My Hugo blog had been working perfectly, but suddenly, visitors were greeted with nothing but a cold, unwelcoming 404 error.

"This can't be right," I muttered, staring at my browser displaying the dreaded "Page not found" message at `padepokanpenguin.github.io`.

## Chapter 1: The First Clues

I started my investigation the way any developer would - by checking the most recent changes. My GitHub Actions workflow showed a peculiar pattern: some runs were successful (✅), others were failing (❌), and the latest one claimed to be working fine.

```bash
gh run list --limit 10
```

The output revealed a story:
- ✅ Recent deployment: "Use Hugo 0.123.0..." - Success
- ❌ Previous attempt: "Update Hugo version..." - Failed  
- ✅ Even earlier: "Revert Hugo version..." - Success

Something was definitely wrong with the Hugo version updates. I dove deeper into the failed run logs:

```bash
gh run view 16703525626 --log-failed
```

## Chapter 2: The Template Mystery

The error logs painted a clear picture of the problem:

```
ERROR render of "/" failed: partial "partials/templates/_funcs/get-page-images" not found
```

My heart sank. The PaperMod theme was missing critical template files. But why? I had been using this theme for months without issues.

I checked the submodule status:

```bash
git submodule status
```

The output showed: `-dad94ab4b7c55eea0b63f7b81419d027fe9a8d81 themes/PaperMod`

That negative sign was my first real clue - it indicated an uninitialized submodule. The plot thickened when I discovered the themes directory was completely empty.

## Chapter 3: The Submodule Saga

"Of course!" I exclaimed. The git submodules weren't properly initialized. This is a classic mistake that catches even experienced developers off guard.

I fixed this immediately:

```bash
git submodule update --init --recursive
```

Watching the terminal output as it cloned the PaperMod theme gave me a sense of relief:

```
Submodule 'themes/PaperMod' registered for path 'themes/PaperMod'
Cloning into 'themes/PaperMod'...
Submodule path 'themes/PaperMod': checked out 'dad94ab4b7c55eea0b63f7b81419d027fe9a8d81'
```

But my celebration was premature.

## Chapter 4: The Version Compatibility Trap

I discovered another issue lurking in my `.gitmodules` file - duplicate submodule entries:

```ini
[submodule "PaperMod"]
    path = PaperMod
    url = https://github.com/adityatelange/hugo-PaperMod.git
[submodule "themes/PaperMod"]
    path = themes/PaperMod
    url = https://github.com/adityatelange/hugo-PaperMod.git
```

I cleaned this up, keeping only the correct entry for `themes/PaperMod`.

Then I tackled the Hugo version compatibility issue. The failed deployment had tried to use Hugo 0.148.0, but this version introduced breaking changes that deprecated `.Site.Social` - something the PaperMod theme was still using.

I made strategic decisions:
1. Update PaperMod to the latest version (v8.0)
2. Use a stable Hugo version (0.123.0) that works with the theme

```bash
cd themes/PaperMod
git checkout v8.0
```

## Chapter 5: The Deployment Success... Or So I Thought

After committing my fixes, I watched the GitHub Actions run with anticipation. Green checkmarks appeared across all steps:

- ✅ Install Hugo CLI
- ✅ Checkout (with submodules)
- ✅ Setup Pages  
- ✅ Build with Hugo
- ✅ Upload artifact
- ✅ Deploy

Hugo reported building 37 pages successfully. Everything looked perfect in the logs. Yet, when I visited my site... 404 error again.

## Chapter 6: The Hidden Configuration Culprit

This is where the real detective work began. The deployment was successful, the files were built correctly, but the site wasn't showing. I suspected a configuration issue.

I checked the GitHub Pages API:

```bash
gh api repos/padepokanpenguin/padepokanpenguin.github.io/pages
```

The response revealed the smoking gun:

```json
{
  "build_type": "legacy",
  "source": {
    "branch": "master",
    "path": "/"
  }
}
```

**"Legacy" build type!** 

I had been running my custom Hugo GitHub Actions workflow perfectly, but GitHub Pages was completely ignoring it. Instead, it was trying to use the old Jekyll-based system to build my site. Since I don't have Jekyll files, this resulted in... you guessed it, a 404 error.

## Chapter 7: The Solution

The fix was surprisingly simple but hidden in the repository settings. I needed to change the GitHub Pages source from "Deploy from a branch" to "GitHub Actions" in the repository settings.

This tells GitHub: "Hey, don't try to build this site yourself. Use the custom workflow I've created instead."

## The Lessons Learned

This debugging journey taught me several valuable lessons:

1. **Always check submodule initialization** - Empty directories can be deceiving
2. **Version compatibility matters** - Newer isn't always better
3. **Configuration can override code** - Even perfect workflows can be ignored by incorrect settings
4. **The real problem might not be where you think** - Sometimes it's not your code, it's the platform configuration

## Debugging Best Practices I Applied

### 1. Start with Recent Changes
I began by examining what had changed recently, using git logs and GitHub Actions history.

### 2. Follow the Error Trail
Each error message led to the next clue - from template errors to submodule issues to version conflicts.

### 3. Verify Assumptions
I assumed my GitHub Actions workflow was being used, but the API revealed otherwise.

### 4. Test Incrementally
I fixed issues one by one: submodules first, then versions, then configuration.

### 5. Document the Journey
Writing this post helps me remember the solution for future similar issues.

## The Happy Ending

After changing the GitHub Pages setting to use GitHub Actions, my site finally came back to life. The 37 pages Hugo had been successfully building were now properly served to visitors.

Sometimes the most frustrating bugs teach us the most. This particular debugging session reminded me that in our complex development ecosystems, the problem isn't always in our code - sometimes it's in the configuration of the platforms we depend on.

---

*Have you encountered similar deployment mysteries? Share your debugging war stories in the comments below. Remember, every bug is a learning opportunity in disguise.*
