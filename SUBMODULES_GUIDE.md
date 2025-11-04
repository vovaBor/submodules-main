# Руководство по работе с Git Submodules

## Структура проекта

**Основной репозиторий**: `git@github-vovaBor:vovaBor/submodules-main.git`

### Субмодули:
- **aiFlightPlanning**: `src/modules/agents/aiFlightPlanning`
  - Репозиторий: `git@github-vovaBor:vovaBor/submodules-agent-1.git`
  - SSH хост: `github-vovaBor` (использует ключ `~/.ssh/id_vladimir`)

## Важно! SSH конфигурация

Проект использует специальный SSH хост `github-vovaBor` для доступа к репозиториям пользователя `vovaBor`.

Убедитесь, что в вашем `~/.ssh/config` есть:

```ssh
Host github-vovaBor
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_vladimir
```

## Команды для работы с субмодулями

### Первоначальное клонирование проекта

```bash
# Клонирование основного репозитория со всеми субмодулями
git clone --recursive git@github-vovaBor:vovaBor/submodules-main.git

# Или если уже склонировали без --recursive
git clone git@github-vovaBor:vovaBor/submodules-main.git
cd submodules-main
git submodule update --init --recursive
```

### Обновление субмодулей

```bash
# Обновить все субмодули до последней версии
git submodule update --remote --recursive

# Обновить конкретный субмодуль
git submodule update --remote src/modules/agents/aiFlightPlanning
```

### Работа с изменениями в субмодуле

#### 1️⃣ Внести изменения в субмодуль:

```bash
# Перейти в директорию субмодуля
cd src/modules/agents/aiFlightPlanning

# Внести изменения в файлы...

# Добавить и закоммитить
git add .
git commit -m "Your commit message"

# Отправить в репозиторий субмодуля
git push origin main
```

#### 2️⃣ Обновить ссылку в основном репозитории:

```bash
# Вернуться в основной проект
cd /Users/username/projects/submodules-main

# Git автоматически увидит изменение субмодуля
git status
# Вы увидите: modified: src/modules/agents/aiFlightPlanning (new commits)

# Добавить обновление ссылки на субмодуль
git add src/modules/agents/aiFlightPlanning

# Закоммитить
git commit -m "Update aiFlightPlanning submodule"

# Отправить в основной репозиторий
git push origin main
```

### Проверка статуса

```bash
# Показать статус всех субмодулей
git submodule status

# Показать изменения в субмодулях
git submodule foreach git status

# Показать коммиты субмодуля
cd src/modules/agents/aiFlightPlanning
git log --oneline -5
```

### Синхронизация с удаленным репозиторием

```bash
# Получить последние изменения из основного репозитория
git pull origin main

# Обновить субмодули до версий, указанных в основном репозитории
git submodule update --init --recursive
```

### Удаление субмодуля (если понадобится)

```bash
# 1. Деинициализировать субмодуль
git submodule deinit -f src/modules/agents/aiFlightPlanning

# 2. Удалить из .git/modules
rm -rf .git/modules/src/modules/agents/aiFlightPlanning

# 3. Удалить из рабочей директории
git rm -f src/modules/agents/aiFlightPlanning

# 4. Закоммитить удаление
git commit -m "Remove aiFlightPlanning submodule"
```

## Структура файлов

```
submodules-main/
├── .gitmodules              # Конфигурация субмодулей
├── src/
│   ├── modules/
│   │   └── agents/
│   │       └── aiFlightPlanning/    # ← Субмодуль (отдельный Git репозиторий)
│   │           ├── README.md
│   │           └── aiFlightPlanning.module.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
└── ...
```

## Важные моменты

1. **Субмодуль - это отдельный Git репозиторий**
   - Он имеет свою собственную историю коммитов
   - Основной репозиторий хранит только ссылку на конкретный коммит субмодуля

2. **Два уровня коммитов**
   - Сначала коммитите изменения ВНУТРИ субмодуля
   - Затем коммитите обновление ссылки в основном репозитории

3. **SSH хост**
   - Проект использует `github-vovaBor` вместо стандартного `github.com`
   - Это позволяет использовать разные SSH ключи для разных аккаунтов

4. **Нельзя напрямую работать с файлами субмодуля из основного репозитория**
   - Команды `git add`, `git commit` в субмодуле нужно выполнять из его директории
   - Иначе получите ошибку: `fatal: Pathspec '...' is in submodule '...'`

## Текущее состояние

✅ Субмодуль успешно настроен:
- **Путь**: `src/modules/agents/aiFlightPlanning`
- **URL**: `git@github-vovaBor:vovaBor/submodules-agent-1.git`
- **Коммит**: `46c1604` (содержит `aiFlightPlanning.module.ts`)
- **Статус**: Синхронизирован с удаленным репозиторием

## Проверка работы

```bash
# Проверить что субмодуль корректно настроен
cd /Users/username/projects/submodules-main
git submodule status

# Проверить содержимое субмодуля
ls -la src/modules/agents/aiFlightPlanning/

# Проверить что файлы отправлены в удаленный репозиторий
cd src/modules/agents/aiFlightPlanning
git log --oneline
git status
```

## Troubleshooting

### Ошибка: "Permission denied"

Если видите ошибку доступа, проверьте:
1. SSH конфигурацию в `~/.ssh/config`
2. Наличие правильного SSH ключа: `ssh-add -l`
3. Подключение к GitHub: `ssh -T git@github-vovaBor`

### Ошибка: "Pathspec is in submodule"

Это значит, что вы пытаетесь изменить файл внутри субмодуля из основного репозитория.
Решение: зайдите в директорию субмодуля и работайте там.

### Субмодуль показывает "new commits"

Это нормально, если вы сделали коммиты в субмодуле. Просто обновите ссылку в основном репозитории:
```bash
git add src/modules/agents/aiFlightPlanning
git commit -m "Update submodule"
```
