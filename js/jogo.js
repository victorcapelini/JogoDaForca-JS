const criaJogo = sprite => {

    let etapa = 1;
    let palavraSecreta;
    let palavraAtual = [];

    const avancaEtapa = () => etapa++;

    const setPalavraSecreta = palavra => {
        if (!palavra.trim()) throw Error('Palavra inválida');
        palavraSecreta = palavra;
        criaLacunas();
        avancaEtapa();
    };

    const criaLacunas = () => palavraAtual = Array(palavraSecreta.length).fill('');

    const getLacunas = () => palavraAtual;

    const getEtapa = () => etapa;

    const processaChute = chute => {
        if (!chute.trim()) throw Error('Chute inválido');
        const exp = new RegExp(chute, 'gi');
        let resultado, acertou = false;

        while (resultado = exp.exec(palavraSecreta)) {
            palavraAtual[resultado.index] = chute;
            acertou = true;
        }

        if (!acertou) sprite.nextFrame();
    };

    const ganhou = () => !palavraAtual.some(lacuna => lacuna == '');

    const perdeu = () => sprite.isFinish();

    const ganhouOuPerdeu = () => (perdeu() || ganhou());

    const reinicia = () => {
        etapa = 1;
        palavraSecreta = '';
        lacunas = [];
        sprite.reset();
    };

    return {
        setPalavraSecreta,
        getLacunas,
        getEtapa,
        processaChute,
        ganhou,
        perdeu,
        ganhouOuPerdeu,
        reinicia
    }
};