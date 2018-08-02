var criaJogo = function (sprite) {

    var etapa = 1;
    var palavraSecreta;
    var palavraAtual = [];

    var avancaEtapa = function () {
        etapa++;
    }

    var setPalavraSecreta = function (palavra) {
        if(!palavra.trim()) throw Error('Palavra inválida');
        palavraSecreta = palavra;
        criaLacunas();
        avancaEtapa();
    };

    var criaLacunas = function () {
        palavraAtual = Array(palavraSecreta.length).fill('');
    }

    var getLacunas = function () {
        return palavraAtual;
    };

    var getEtapa = function () {
        return etapa;
    };

    var processaChute = function (chute) {
        if (!chute.trim()) throw Error('Chute inválido');
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
        return palavraAtual.length
            ? !palavraAtual.some(function (lacuna) {
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