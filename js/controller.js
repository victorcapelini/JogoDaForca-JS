var criaController = function (jogo) {

    var $entrada = $('#entrada');
    var $lacunas = $('.lacunas');

    var exibeLacunas = function () {
        $lacunas.empty();
        jogo.getLacunas().forEach((lacuna) => {
            $lacunas.append($("<li>").addClass("lacuna").text(lacuna));
        });
    };

    var mudaPlaceHolder = function (texto) {
        entrada.value = "";
        $entrada.attr("placeholder", texto);
    };

    var guardaPalavraSecreta = function () {
        jogo.setPalavraSecreta($entrada.val().trim());
        $entrada.val('');
        mudaPlaceHolder('chute');
        exibeLacunas();
    };

    var leChute = function () {
        var chute = $entrada.val().trim().substr(0, 1);
        $entrada.val('');
        if (!chute == " ") {
            jogo.processaChute(chute);
        }
        exibeLacunas();
    };

    var inicia = function () {

        $entrada.keypress(function (event) {
            if (event.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:
                        guardaPalavraSecreta();
                        break;
                    case 2:
                        leChute();
                        break;
                }
            }
        });
    }
    return { inicia: inicia };
};