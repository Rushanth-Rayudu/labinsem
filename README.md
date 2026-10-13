# CampusDesk College Management System

A small, static college management system built with HTML, CSS, and JavaScript. It uses sample data only and has no backend or database.

## Project pages

- `index.html` links to the admin and student portals.
- `admin.html` shows a sample student roster with a live search, attendance summary, and notices.
- `user.html` shows a sample student profile, a 94% attendance indicator, and campus notices.
- `style.css` contains the shared responsive styles and updated navigation/dashboard presentation.
- `script.js` filters the admin roster by student name, roll number, or course.

The feature branch demonstrates searchable student records, a visible student attendance percentage, and refined navigation and dashboard styling.

## Run locally

Open `index.html` in a browser, or use VS Code Live Server. From a terminal in this folder, a simple alternative is:

```powershell
py -m http.server 8000
```

Then open <http://localhost:8000>.

## Git fetch, review, and merge demonstration

The commands below use a local bare repository as `origin`; this simulates a remote without GitHub credentials or a network push. Run commands from the project folder. Do not continue through a command if Git reports uncommitted work or a conflict you have not reviewed.

### Inspect the starting point

```bash
git status
git remote -v
git branch
git branch -a
```

- `git status` shows the current branch and whether files are modified or staged.
- `git remote -v` lists configured remotes. A new project has no output here.
- `git branch` lists local branches; `*` marks the current branch.
- `git branch -a` also lists remote-tracking branches, if any.

### Create a local bare remote (only if `origin` is absent)

From the project folder, make the remote a sibling directory, then connect it:

```powershell
git init --bare ..\lab-insem-remote.git
git remote add origin ..\lab-insem-remote.git
git push -u origin main
```

A bare repository stores Git history without a working tree. `origin` is just the conventional name for that remote. These commands push only to your local disk.

To simulate another developer, clone the project from the bare remote to a separate sibling folder:

```powershell
git clone ..\lab-insem-remote.git ..\lab-insem-developer
cd ..\lab-insem-developer
git switch -c feature/student-dashboard
```

Make and commit the feature changes in that clone, then publish that feature branch to the local bare remote:

```bash
git add admin.html script.js
git commit -m "Add student search to admin roster"
git add user.html style.css README.md
git commit -m "Improve student dashboard and navigation"
git push -u origin feature/student-dashboard
```

Return to the original project folder before fetching and integrating the feature.

### Fetch in the requested order

```bash
git status
git remote -v
git branch
git branch -a
git fetch origin
git branch -a
git log --oneline --graph --all
```

1. `git status` checks that the working tree is safe to update.
2. `git remote -v` confirms that `origin` points to the intended local bare repository.
3. `git branch` identifies the current local branch and other local branches.
4. The first `git branch -a` shows local branches and any already-known remote-tracking branches.
5. `git fetch origin` downloads remote refs and commits without merging or changing working files.
6. The second `git branch -a` should now include `remotes/origin/feature/student-dashboard`.
7. `git log --oneline --graph --all` shows the commit graph across local and remote-tracking branches.

`git fetch origin` requires a configured and reachable `origin`. If the feature branch is missing, check the remote branch name with `git branch -r` and fetch again; do not merge an unverified branch.

### Review before merging

```bash
git branch -a
git log --oneline --all --decorate
git log --oneline main..origin/feature/student-dashboard
git diff main..origin/feature/student-dashboard
git diff --stat main..origin/feature/student-dashboard
git show <commit-hash>
```

- `main` without a prefix is your local branch. `remotes/origin/feature/student-dashboard` (also written `origin/feature/student-dashboard`) is the remote-tracking branch updated by fetch.
- `git log main..origin/feature/student-dashboard` lists commits reachable from the feature branch but not local `main`.
- `git diff` displays actual file content differences; `git diff --stat` summarizes the changed files and line counts.
- Replace `<commit-hash>` with a real hash copied from the log to inspect that commit's message, files, and patch.
- Review the commit list and diffs before merging; fetching alone does not integrate changes.

### Merge the reviewed feature

First confirm `git status` is clean. Save or commit local edits before continuing; do not discard them to make the merge proceed.

```bash
git switch main
git pull --ff-only origin main
git merge --no-ff origin/feature/student-dashboard
```

If `origin/main` has no new commits, `git pull --ff-only origin main` reports that the branch is already up to date. `--no-ff` records the feature integration as a merge commit. If the remote-tracking feature branch is unavailable, run `git fetch origin` and confirm its exact name before merging.

If Git reports conflicts, inspect the listed files and the conflict markers, edit each file to the intended final content, then stage each resolved file and continue:

```bash
git status
git diff
git add <resolved-file>
git merge --continue
```

When there are no conflicts, Git completes the merge without a resolution step. Do not push the merge unless you have explicit permission.

### Verify the merge

```bash
git status
git branch
git log --oneline --graph --decorate --all
git diff HEAD^ HEAD
```

Confirm the current branch is `main`, the feature commits appear in its history below the merge commit, and `git status` reports a clean working tree. `git diff HEAD^ HEAD` shows the merge commit's first-parent changes. No push is required for this local demonstration.

### Final demonstration checklist

1. Open `index.html` and follow both portal links.
2. On the admin dashboard, search the roster by student name, roll number, or course.
3. On the student dashboard, confirm the attendance percentage is displayed.
4. Resize the browser to check the responsive layout.
5. Compare the feature commit list and changed-file summary with the visible application updates.
