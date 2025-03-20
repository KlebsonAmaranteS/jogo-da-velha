let tabuleiro = [
    '', '', '',
    '', '', '',
    '', '', ''
];

let jogador = 'X';
let maquina = 'O';

function marcarCelula(id) {
    const celula = document.getElementById(`celula-${id}`);
    if (celula.textContent === '') {
        celula.textContent = jogador;
        tabuleiro[id] = jogador;
        verificarVencedor();
        jogarMaquina();
    }
}

function jogarMaquina() {
    const indicesVazios = tabuleiro.map((celula, index) => celula === '' ? index : null).filter(index => index !== null);
    const indiceAleatorio = indicesVazios[Math.floor(Math.random() * indicesVazios.length)];
    if (indiceAleatorio !== undefined) {
        setTimeout(() => {
            const celula = document.getElementById(`celula-${indiceAleatorio}`);
            celula.textContent = maquina;
            tabuleiro[indiceAleatorio] = maquina;
            verificarVencedor();
        }, 1000); 
    }
}

function verificarVencedor() {
    const combinacoesVencedoras = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const combinacao of combinacoesVencedoras) {
        if (tabuleiro[combinacao[0]] === tabuleiro[combinacao[1]] && tabuleiro[combinacao[1]] === tabuleiro[combinacao[2]] && tabuleiro[combinacao[0]] !== '') {
            const resultado = document.getElementById('resultado');
            resultado.textContent = `Jogador ${tabuleiro[combinacao[0]]} venceu!`;
            bloquearTabuleiro();
            marcarLinhaVencedora(combinacao);
            return;
        }
    }
    if (!tabuleiro.includes('')) {
        const resultado = document.getElementById('resultado');
        resultado.textContent = 'Empate!';
        bloquearTabuleiro();
    }
}

function marcarLinhaVencedora(combinacao) {
    const celulas = combinacao.map(index => document.getElementById(`celula-${index}`));
    celulas.forEach(celula => celula.style.backgroundColor = 'green');
    celulas.forEach(celula => celula.style.color = 'white');
}

function bloquearTabuleiro() {
    const celulas = document.querySelectorAll('.celula');
    celulas.forEach(celula => celula.style.pointerEvents = 'none');
}

function reiniciar() {
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    jogador = 'X';
    maquina = 'O';
    const celulas = document.querySelectorAll('.celula');
    celulas.forEach(celula => {
        celula.textContent = '';
        celula.classList.remove('vencedora');
        celula.style.backgroundColor = '';
        celula.style.color = '';
    });
    const resultado = document.getElementById('resultado');
    resultado.textContent = '';
    celulas.forEach(celula => celula.style.pointerEvents = 'auto');
}

document.querySelectorAll('.celula').forEach((celula, index) => celula.addEventListener('click', () => marcarCelula(index)));
document.getElementById('reiniciar').addEventListener('click', reiniciar);
