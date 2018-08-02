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
        try {
            jogo.setPalavraSecreta($entrada.val().trim());
            $entrada.val('');
            mudaPlaceHolder('chute');
            exibeLacunas();
            $entrada.attr("type","text");
        } catch (err) {
            alert(err.message);
            
        }
    };

    var leChute = function () {
        try {
            var chute = $entrada.val().trim().substr(0, 1);
            $entrada.val('');
            jogo.processaChute(chute);

            exibeLacunas();
            setTimeout(function () {
                if (jogo.ganhouOuPerdeu()) {
                    jogo.ganhou() ? alert("Você ganhou!!!") : alert("Você perdeu :(");
                    reinicia();
                }
            }, 200);

        } catch (err) {
            alert(err.message);

        }
    };

    var reinicia = function () {
        jogo.reinicia();
        mudaPlaceHolder("Palavra Secreta");
        $entrada.attr("type","password");
        $lacunas.empty();
    }

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