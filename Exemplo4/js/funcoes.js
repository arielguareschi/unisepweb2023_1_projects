function abrirJanela(id){
    var janela = document.getElementById(id);

    if (janela.style.display == 'none'){
        janela.style.display = 'block';
    } else {
        janela.style.display = 'none';
    }
}