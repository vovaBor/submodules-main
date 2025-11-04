# Руководство по работе с Git Submodules

## Структура проекта

Основной репозиторий: `git@github.com:vovaBor/submodules-main.git`

### Субмодули:
- **aiFlightPlanning**: `modules/agents/aiFlightPlanning`
  - Репозиторий: `git@github.com:vovaBor/submodules-agent-1.git`

## Команды для работы с субмодулями

### Первоначальное клонирование проекта с субмодулями

```bash
# Клонирование основного репозитория со всеми субмодулями
git clone --recursive git@github.com:vovaBor/submodules-main.git

# Или если уже склонировали без --recursive
git clone git@github.com:vovaBor/submodules-main.git
cd submodules-main
git submodule update --init --recursive
```

### Обновление субмодулей

```bash
# Обновить все субмодули до последней версии
git submodule update --remote --recursive

# Обновить конкретный субмодуль
git submodule update --remote modules/agents/aiFlightPlanning
```

### Работа с изменениями в субмодуле

```bash
# Перейти в директорию субмодуля
cd modules/agents/aiFlightPlanning

# Внести изменения и закоммитить
git add .
git commit -m "Your commit message"
git push origin main

# Вернуться в основной проект
cd ../../..

# Обновить ссылку на субмодуль в основном проекте
git add modules/agents/aiFlightPlanning
git commit -m "Update aiFlightPlanning submodule"
git push origin main
```

### Проверка статуса субмодулей

```bash
# Показать статус всех субмодулей
git submodule status

# Показать изменения в субмодулях
git submodule foreach git status
```

### Синхронизация с удаленным репозиторием

```bash
# Получить последние изменения из основного репозитория и обновить субмодули
git pull origin main
git submodule update --init --recursive
```

### Удаление субмодуля (если понадобится)

```bash
# 1. Удалить субмодуль из .gitmodules
git submodule deinit -f modules/agents/aiFlightPlanning

# 2. Удалить из .git/modules
rm -rf .git/modules/modules/agents/aiFlightPlanning

# 3. Удалить из рабочей директории
git rm -f modules/agents/aiFlightPlanning
```

## Текущий статус

✅ Субмодуль `aiFlightPlanning` успешно добавлен в проект
- Путь: `modules/agents/aiFlightPlanning`
- Ветка: `main`

## Коммит изменений

Изменения были добавлены в staging area. Выполните команду для фиксации:

```bash
git commit -m "Add aiFlightPlanning submodule"
git push origin main
```

