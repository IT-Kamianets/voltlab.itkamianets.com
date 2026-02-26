
# Voltlab – terminal quick start

## 1. Init project in empty folder

```bash
git init
git remote add origin https://github.com/IT-Kamianets/voltlab.itkamianets.com.git
git checkout -b master
git fetch --all
git reset --hard origin/master
```

If you need to remove old git history:

```bash
rm -rf .git
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Start project

```bash
npm run start
```

---

## 4. Sync with remote (overwrite local changes)

> ⚠️ This will remove all local modifications.

```bash
git fetch --all
git reset --hard origin/master
```

---

## 5. Commit and push changes (without VSCode UI)

```bash
git add --all .
git commit -m "COMMIT MESSAGE"
git pull origin master
git push origin master
```

