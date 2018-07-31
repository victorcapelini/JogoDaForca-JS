var criaJogo = function (sprite) {

    var etapa = 1;
    var palavraSecreta;
    var palavraAtual = [];

    var avancaEtapa = function () {
        etapa++;
    }

    var setPalavraSecreta = function (palavra) {
        palavraSecreta = palavra.toUpperCase();
        criaLacunas();
        avancaEtapa();
    };

    var criaLacunas = function () {
        palavraAtual = Array(palavraSecreta.length).fill('');
        avancaEtapa();
    }

    var getLacunas = function () {
        return palavraAtual;
    };

    var getEtapa = function () {
        return etapa;
    };

    var processaChute = function (chute) {
        var exp = new RegExp(chute, 'gi'),
            resultado,
            acertou = false;

        while (resultado = exp.exec(palavraSecreta)) {
            palavraAtual[resultado.index] = chute;
            acertou = true;
        }

        if (!acertou) {
            sprite.nextFrame();
        }


    };

    var ganhou = function () {
        return lacunas.length
            ? !lacunas.some(function (lacuna) {
                return lacuna == '';
            })
            : false;
    };

    var perdeu = function () {
        return sprite.isFinish();
    };

    var ganhouOuPerdeu = function () {
        return (perdeu() || ganhou());
    };

    var reinicia = function () {

        etapa = 1;
        palavraSecreta = '';
        lacunas = [];
        sprite.reset();
    };

    return {
        setPalavraSecreta: setPalavraSecreta,
        getLacunas: getLacunas,
        getEtapa: getEtapa,
        processaChute: processaChute,
        ganhou: ganhou,
        perdeu: perdeu,
        ganhouOuPerdeu: ganhouOuPerdeu,
        reinicia: reinicia
    }
};