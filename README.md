# HomeWork
Данный проект был выпускным на курсах Java-разработчика. Выполненны все условия преподавателя и даже больше. Получен максимальный бал. Продемонсьтрировать работу проекта не возможно так как ресурс преподавателя (http://yand.dyndns.org/gaspipeline) уже недоступен.

На сайте http://yand.dyndns.org/gaspipeline реализован Web API для получения данных с датчиков давления на некотором трубопроводе. Например, вызов http://yand.dyndns.org/gaspipeline/pressure/get/1 возвращает текущее давление на датчике номер 1. Всего датчиков 7. Требуется сделать web приложение для (однократной) индикации показаний этих датчиков.
Дополнительно:
1. Не суммировать времена ожидания датчиков (мномопоточная обработка)
2. Получать данные от прокси-сервиса в один запрос (Асинхронный запрос)
3. Быть хорошо спроектированным с точки зрения возможности расширения на произвольное число датчиков
4. Быть комфортным для конечного пользователя (главным образом, ясно индицировать ожидание отклика)
5. Быть изящным и чистым кодом.

