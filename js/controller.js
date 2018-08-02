const criaController = jogo => {

    const $entrada = $('#entrada');
    const $lacunas = $('.lacunas');

    const exibeLacunas = () => {
        $lacunas.empty();
        jogo.getLacunas().forEach(lacuna => $lacunas.append($("<li>").addClass("lacuna").text(lacuna)));
    };

    const mudaPlaceHolder = texto => {
        entrada.value = "";
        $entrada.attr("placeholder", texto);
    };

    const guardaPalavraSecreta = () => {
        try {
            jogo.setPalavraSecreta($entrada.val().trim());
            $entrada.val('');
            mudaPlaceHolder('chute');
            exibeLacunas();
            $entrada.attr("type", "text");
        } catch (err) {
            alert(err.message);

        }
    };

    const leChute = () => {
        try {
            const chute = $entrada.val().trim().substr(0, 1);
            $entrada.val('');
            jogo.processaChute(chute);

            exibeLacunas();
            setTimeout(() => {
                if (jogo.ganhouOuPerdeu()) {
                    jogo.ganhou() ? alert("Você ganhou!!!") : alert("Você perdeu :(");
                    reinicia();
                }
            }, 200);

        } catch (err) {
            alert(err.message);

        }
    };

    const reinicia = () => {
        jogo.reinicia();
        mudaPlaceHolder("Palavra Secreta");
        $entrada.attr("type", "password");
        $lacunas.empty();
    }

    const inicia = () => {
        $entrada.keypress(event => {
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
    return { inicia};
};