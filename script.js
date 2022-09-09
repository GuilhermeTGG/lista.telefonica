var appForm = document.getElementById('app-form');
var listaPessoas = document.getElementById('listaPessoas');
var btnOrdenar = document.getElementById('btnOrdenar');
var btnExemplo = document.getElementById('btnExemplo');

var pessoas = [];

appForm.onsubmit = addPessoa;
btnOrdenar.onclick = ordenarLista;
btnExemplo.onclick = gerarListaSeed;

function addPessoa(e) {
    e.preventDefault();

    console.log(e)

    var nome = e.target.pessoaNome.value;
    var sobrenome = e.target.pessoaSobrenome.value;
    var telefone = e.target.pessoaTelefone.value;

    var pessoa = {nome, sobrenome, telefone};

    var validation = validarCampos(pessoa);
    if(!validation.status) {
        alert(validation.error);
        return;
    }

    pessoas.push(pessoa);
    appForm.reset();
    mostrarLista();
    console.log(pessoas)
}

function validarCampos(pessoa) {
    var validation = { status: true, error: '', };

    if(pessoa.nome.length === 0) {
        validation.status = false;
        validation.error = 'Preencha o campo Nome';
    }
    else if(pessoa.sobrenome.length === 0) {
        validation.status = false;
        validation.error = 'Preencha o campo Sobrenome';
    }
    else if(pessoa.telefone.length < 10) {
        validation.status = false;
        validation.error = 'Preencha o campo Telefone corretamente'
    }
    return validation;
}

function mostrarLista() {
    listaPessoas.innerHTML = '';
    for(pessoa of pessoas) {
        var nomeE1 = document.createElement('strong');
        nomeE1.appendChild(document.createTextNode(pessoa.nome + ' ' + pessoa.sobrenome));

        var TelefoneE1 = document.createElement('p');
        TelefoneE1.appendChild(document.createTextNode('Telefone: ' + pessoa.telefone));

        var indice = pessoas.indexOf(pessoa);

        var removerE1 = document.createElement('a');
        removerE1.setAttribute('href', '#');
        var removerText = document.createTextNode('Remover');
        removerE1.appendChild(removerText);
        removerE1.setAttribute('onclick', 'removerPessoa(' + indice + ')');

        var alterarE1 = document.createElement('a');
        alterarE1.setAttribute('href', '#');
        var alterarText = document.createTextNode('Alterar');
        alterarE1.appendChild(alterarText)
        alterarE1.setAttribute('onclick', 'alterarPessoa(' + indice + ')');

        var itemE1 = document.createElement('li');
        itemE1.appendChild(nomeE1);
        itemE1.appendChild(TelefoneE1);
        itemE1.appendChild(alterarE1);
        itemE1.appendChild(removerE1);

        listaPessoas.appendChild(itemE1);
    }
}

function gerarListaSeed() {
    var pessoasExemplo = [
        {nome: 'Marcelo', sobrenome: 'Alves', telefone: 3835521528},
        {nome: 'Camila', sobrenome: 'Santos', telefone: 3899552212},
        {nome: 'Marcia', sobrenome: 'Torres', telefone: 3832147854},
        {nome: 'Julio', sobrenome: 'Castor', telefone: 3155251255},
        {nome: 'Paulo', sobrenome: 'Marinho', telefone: 3188547855},
        {nome: 'Marcel', sobrenome: 'Pires', telefone: 3199882255},
        {nome: 'Julio', sobrenome: 'Camelo', telefone: 3122457889},
    ];
    pessoas = pessoasExemplo;
    mostrarLista();
}

function removerPessoa(indice) {
    pessoas.splice(indice, 1);
    mostrarLista();
}

function alterarPessoa(indice) {
    var btnCadastrar = document.getElementById('btnCadastrar');
    var btnEditar = document.getElementById('btnEditar');
    var input_nome = document.getElementById('pessoaNome');
    var input_sobrenome = document.getElementById('pessoaSobrenome');
    var input_telefone = document.getElementById('pessoaTelefone');

    btnCadastrar.setAttribute('style', 'display:none');
    btnEditar.setAttribute('style', 'display:')

    input_nome.value = pessoas[indice].nome;
    input_sobrenome.value = pessoas[indice].sobrenome;
    input_telefone.value = pessoas[indice].telefone;

    btnEditar.onclick = function() {
        var pessoaAlterada = {
            nome: input_nome.value,
            sobrenome: input_sobrenome.value,
            telefone: input_telefone.value,
        };

        console.log(pessoaAlterada)

        var validation = validarCampos(pessoaAlterada);
        if(!validation.status){
            alert(validation.error);
            return;
        }

        input_nome.value = '';
        input_sobrenome.value = '';
        input_telefone.value = '';

        btnCadastrar.setAttribute('style', 'display:');
        btnEditar.setAttribute('style', 'display:none');

        pessoas[indice] = pessoaAlterada;
        mostrarLista();
    };
}

function ordenarLista() {
    pessoas.sort(function(a, b){
        var x = a.nome.toLowerCase() + a.sobrenome.toLowerCase();
        var y = b.nome.toLowerCase() + b.sobrenome.toLowerCase();
        if(x < y) return -1;
        if(x > y) return 1;
        return 0;
    });
    mostrarLista();
}
