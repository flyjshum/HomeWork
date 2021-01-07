var timeout;
var objTimer;

function getSensors(type) {
    var id;
    //type - тип датчика. Код универсален.
    // В зависимости от этой переменной (и реализованного удаленного WEBApi)
    //Возможна реализация передачи массива "типов датчиков" (реализовать цикл по массиву type) и получения любых показаний (с любого типа датчика)
    var url = "resources/api/getSensorsById?type=" + type + "&";
    timeout = $("#timeout").val();
    $("." + type).each(function (index, element) { //все датчики, которые имеют тип pressure 
        id = $(element).attr('id');                 //и помечены соответствующим классом в html
        if (index != $("." + type).length - 1)
        {
            url += "id=" + id.substring(14, id.length) + "&";
        } else {
            url += "id=" + id.substring(14, id.length);
        }
    });

    //Отправляем запрос в SencorService и разбираем результат
    //в зависимости от тответа севера успех или выводим error
    var request = $.ajax({
        url: url,
        type: "GET",
        timeout: $("#timeout").val() * 1000,
        beforeSend: function (xhr) {
            startLoadingAnimation("Выполняю запрос");//вызываем подключенный плагин блокировки страницы
        },
        success: function (data, textStatus, jqXHR) {
            for (var i = 0; i < data.length; i++) {
                $("#" + type + "Sensor" + data[i].id).val(data[i].value);
                $("#log").append("<p class='msgOK'>" + formatTime() + "> Данные c " + type + " датчика, id=" + data[i].id + "  получены успешно.</p>");
            }
            stopLoadingAnimation(); //закрываем плагин блокировки
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#log").append("<p class='msgError'>" + formatTime() + "> Ошибка: " + textStatus + "</p>");
            stopLoadingAnimation(); //закрываем плагин блокировки
        }
    });
}

//В название класса checkbox - последнии три символа обязательно chk.
//используем это для корректной разметки inputов
//учитывать это при генерации html-кода
function showOrHide(idCheckBox, idInput) {
    var nameClass;
    //делаем доступным imput и дабавлем имя класса (тип датчика)
    //чтобы учитывался при передаче массива id в SensorService
    //input помечаем классом toClr, чтобы знать что обнулять
    if ($("#" + idCheckBox).is(':checked')) {
        $("#" + idInput).prop("disabled", false);
        nameClass = $("#" + idCheckBox).prop("class");
        $("#" + idInput).prop("class", "toClr " + nameClass.substring(0, nameClass.length - 3));
    } else {
        $("#" + idInput).prop("disabled", true);
        $("#" + idInput).prop("class", "toClr");
    }
}

function startLoadingAnimation(textMsg) {
    $.blockUI({//функция отображения анимации и блокировки страницы
        message: "<h5>" + textMsg + "<p id='timer'></p></h5><img src='img/ajax-loader.gif' />",
        onBlock: function () {
            timeout -= 1;
            //дополнительно на ней размещаем таймер обратного отсчета
            //если ajax в течении этого времени не получил ответ, то возникает событие error
            $("#timer").append($("<p id='timerVal'>" + timeout + "</p>"));
            objTimer = setInterval(updateTimer, 1000, timeout);
        }
    });
}

function stopLoadingAnimation() {
    $.unblockUI();
    clearInterval(objTimer);
    timeout = 0;
}

//обновленние таймера
function updateTimer() {
    $("<p id='timerVal'>" + timeout + "</p>").replaceAll("#timerVal");
    timeout -= 1;
}

function formatTime() {
    now = new Date();
    return now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + ":" + now.getMilliseconds();
}

//вернуть страницу к первоначальному виду
function clearAll() {
    $(".pressureChk").prop("checked", false);
    $(".toClr").prop("disabled", true);
    $(".toClr").val("");
    $("#timeout").val("10");
    $("#log").text("");
}