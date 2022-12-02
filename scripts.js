function buscaCEP(){
    let cep = document.getElementById("cep").value.replace(/\D/g, '');
    console.log(cep);

    fetch("https://viacep.com.br/ws/"+cep+"/json")
    .then(resp => resp.json())
    .then(json =>{
        console.log(json);
        for(let [campo, valor] of Object.entries(json) ){
            console.log(campo, valor);
            if(document.getElementById(campo)){
                document.getElementById(campo).value = valor;
            }
        }
    })
}

/* cadastro */

let cadastros = new Array();

function cadastra_novo(){
    const formcad = document.getElementById("formcad");
    const formData = new FormData(formcad);    // cria novo obejto de formulário com dados de HTML

    const formObj = Object.fromEntries(formData);

    cadastros.push(formObj);
    localStorage.setItem("cadastro", JSON.stringify(cadastros));
}

function preencheTabela(){
    if(localStorage.hasOwnProperty("cadastro")){
        cadastros = JSON.parse(localStorage.getItem("cadastro"));
    }

    document.getElementById("cadastros").innerHTML = 
    `<tr>
        <th class="tituloColuna">Nome</th>
        <th class="tituloColuna">CEP</th>
        <th class="tituloColuna">Rua</th>
        <th class="tituloColuna">Número</th>
        <th class="tituloColuna">Bairro</th>
        <th class="tituloColuna">Cidade</th>
        <th class="tituloColuna">Estado</th>
        <th class="tituloColuna">DDD</th>
        <th class="tituloColuna">Telefone Fixo</th>
        <th class="tituloColuna"></th>
        <th class="tituloColuna"></th>
    </tr>`;

    let index = 0;

    cadastros.forEach( function(cadastro){
        document.getElementById("cadastros").innerHTML +=
        `<tr>
        <td>${cadastro.nome}</td>
        <td>${cadastro.cep}</td>
        <td>${cadastro.logradouro}</td>
        <td>${cadastro.numero}</td>
        <td>${cadastro.bairro}</td>
        <td>${cadastro.localidade}</td>
        <td>${cadastro.uf}</td>
        <td>${cadastro.ddd}</td>
        <td>${cadastro.telefone}</td>
        <td><button onclick="editaCadastro(${index})">Editar</button></td>
        <td>Só pode ser editado uma vez</td>
        </tr>`;
        index++;        
    })
}

function editaCadastro(index){
    console.log(cadastros[index]);
    for(let [campo, valor] of Object.entries(cadastros[index]) ){
        document.getElementById(campo).value = valor;
    }
    document.getElementById('cadnovo').style="display:none";
    document.getElementById('atualiza').style="display:inline";
    document.getElementById('atualiza').addEventListener("click", function(){atualizaCadastro(index)});
}

function atualizaCadastro(index){
    const formcad = document.getElementById("formcad");
    const formData = new FormData(formcad);    // cria novo obejto de formulário com dados de HTML
    const formObj = Object.fromEntries(formData);   //cria pares chave/valor para formObj
    cadastros[index] = formObj;

    document.getElementById('atualiza').style="display:none";
    document.getElementById('cadnovo').style="display:inline";
    formcad.reset();

    localStorage.setItem("cadastro", JSON.stringify(cadastros) ); 
    preencheTabela();
}

document.getElementById("cadnovo").addEventListener("click", function(event){
    event.preventDefault();
    cadastra_novo();
    preencheTabela();
})

window.onload = function(){
    preencheTabela();
}
