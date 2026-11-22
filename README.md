# Reselect — бібліотека книг

## Запуск проєкту

1. Встанови залежності:

   ```bash
   npm install
   ```

2. Відкрий перший термінал і запусти базу даних:

   ```bash
   npm run server
   ```

3. Відкрий другий термінал і запусти React:

   ```bash
   npm start
   ```

Застосунок відкриється за адресою `http://localhost:3000`, а JSON Server працюватиме на `http://localhost:4040`.

Для production-збірки виконай `npm run build`.

## API

За замовчуванням застосунок звертається до `http://localhost:4040`.
Якщо API розміщене за іншою адресою, створи файл `.env` у корені проєкту та додай:

```env
REACT_APP_API_URL=https://твоя-адреса-api
```

## Теми навчального проєкту

- Асинхронний потік дій
- Re-export імпортів
- Аліаси та абсолютні імпорти
- `createAsyncThunk`
- Redux Toolkit
