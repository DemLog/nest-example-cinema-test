# Nest Example Cinema

### .ENV Config
```javascript
POSTGRES_HOST=localhost // Хост БД
POSTGRES_USER=postgres // Пользователь БД
POSTGRES_DB=test // Имя таблицы БД
POSTGRES_PASSWORD=root // Пароль БД
POSTGRES_PORT=5432 // Порт БД
JWT_SECRET_KEY=i06113qyb3@c&)2s8#-@rqw1#l#zyjkjbp*#1-y+ez^!civbao // Секретный ключ для JWT
```

### Установка

Клонируйте репозиторий:

```bash
git clone https://github.com/DemLog/nest-example-cinema.git
```

Установите зависимости:
```bash
npm install
```

Запустите контейнер с PostgreSQL:

```bash
docker-compose up -d
```

Запустите миграции:

```bash
npm run migration:run
```


### Запуск

Запустите приложение в режиме разработки:

```bash
npm run start:dev
```

Приложение будет доступно по адресу http://localhost:3000.

### Endpoints

Вся доступная документация по эндпоинтам находится в http://localhost:3000/docs
