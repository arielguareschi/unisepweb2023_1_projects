// definindo as variaveis
const nomeInput = document.getElementById('nome-input');
const emailInput = document.getElementById('email-input');
const addBtn = document.getElementById('add-btn');
const tableBody = document.getElementById('table-body');
const updateNomeInput = document.getElementById('update-nome-input');
const updateEmailInput = document.getElementById('update-email-input');
const updateBtn = document.getElementById('update-btn');
const cancelarBtn = document.getElementById('cancelar-btn');
let contatos = JSON.parse(localStorage.getItem('contatos')) || [];
let currentContatoId = null;
const validRegex = /^[a-zA-Z0-9.!#$%&'*/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// criar as funcoes
function renderTable() {
    tableBody.innerHTML = "";
    for (let i = 0; i < contatos.length; i++) {
        // pega o contato da lista
        const contato = contatos[i];
        // cria os elementos da tela
        const tr = document.createElement("tr");
        const idTd = document.createElement("td");
        const nomeTd = document.createElement("td");
        const emailTd = document.createElement("td");
        const acoesTd = document.createElement("td");
        const editBtn = document.createElement("button");
        editBtn.className = "editar-btn";
        const apagarBtn = document.createElement("button");
        apagarBtn.className = "apagar-btn";
        // atribui os textos para os elementos
        idTd.innerText = contato.id;
        nomeTd.innerText = contato.nome;
        emailTd.innerText = contato.email;
        editBtn.innerText = "Editar";
        apagarBtn.innerText = "Apagar";
        // atribui as funcoes para os botoes
        editBtn.addEventListener("click",
            () => {
                showAtualizarForm(contato.id);
            }
        );
        apagarBtn.addEventListener("click",
            () => {
                apagarContato(contato.id);
            }
        );
        // montar a linha para a tela
        acoesTd.appendChild(editBtn);
        acoesTd.appendChild(apagarBtn);
        tr.appendChild(idTd);
        tr.appendChild(nomeTd);
        tr.appendChild(emailTd);
        tr.appendChild(acoesTd);
        // add a linha na tabela
        tableBody.appendChild(tr);
    }
}

function addContato() {
    // pega os dados da tela
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    if (email.match(validRegex)) { // email valido
        if (nome && email != null) { // tem os dados
            // inicia o id
            var id = 1;
            // procura se ja tem aquele id
            var val = contatos.map(
                function (x) { return x.id; }
            ).indexOf(id);
            while (val != -1) {
                id++;
                val = contatos.map(
                    function (x) { return x.id; }
                ).indexOf(id);
            }
            // monsta o obj para poder salvar
            const contato = {
                id: id,
                nome: nome,
                email: email,
            };
            // add o obj na lista
            contatos.push(contato);
            // salvar o lista no storage
            localStorage.setItem("contatos",
                JSON.stringify(contatos));
            // limpar os campos
            nomeInput.value = "";
            emailInput.value = "";
            // carrega a tabela
            renderTable();
        } else {
            alert("Tem que ter nome");
        }
    } else {
        alert("E-mail invalido!");
    }
}

function updateContato() {
    const nome = updateNomeInput.value;
    const email = updateEmailInput.value;
    if (email.match(validRegex)) {
        const index = contatos.findIndex(
            (contato) =>
                contato.id === currentContatoId
        );
        if (index !== -1) {
            contatos[index].nome = nome;
            contatos[index].email = email;
            localStorage.setItem(
                "contatos",
                JSON.stringify(contatos)
            );
            hiddenAtualizarForm();
            renderTable();
        }
    } else {
        alert('Email invalido!');
    }
}

function showAtualizarForm(contatoId) {
    const contato = contatos.find(
        (contato) => contato.id === contatoId
    );
    if (contato) {
        updateNomeInput.value = contato.nome;
        updateEmailInput.value = contato.email;
        currentContatoId = contato.id;
        updateBtn.addEventListener("click", updateContato);
        cancelarBtn.addEventListener("click", hiddenAtualizarForm);
        updateBtn.style.display = 'inline-block';
        cancelarBtn.style.display = 'inline-block';
        updateNomeInput.style.display = 'inline-block';
        updateEmailInput.style.display = 'inline-block';
        document.getElementById('update-container').style.display = 'block';
    }
}

function hiddenAtualizarForm() {
    updateNomeInput.value = "";
    updateEmailInput.value = "";
    currentContatoId = null;
    updateBtn.removeEventListener("click", updateContato);
    cancelarBtn.removeEventListener("click", hiddenAtualizarForm);
    updateBtn.style.display = "none";
    cancelarBtn.style.display = "none";
    updateNomeInput.style.display = "none";
    updateEmailInput.style.display = "none";
    document.getElementById('update-container').style.display = "none";
}

function apagarContato(contatoId) {
    contatos = contatos.filter(
        (contato) => contato.id !== contatoId
    );
    localStorage.setItem("contatos",
        JSON.stringify(contatos)
    );
    if (contatos.length == 0){
        hiddenAtualizarForm();
    }
    renderTable();
}

addBtn.addEventListener("click", addContato);

renderTable();

// while(true){
//     console.log("teste");
// }