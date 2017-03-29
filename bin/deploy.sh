#!/usr/bin/env bash
#
# From the project's root.
# First make sure your master is up to date.
# Then push the new changes
git checkout -B gh-pages
git add -f pages
git commit -am "Rebuild website" --no-verify
git filter-branch -f --prune-empty --subdirectory-filter pages
git push -f origin gh-pages
git checkout -