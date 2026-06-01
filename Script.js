//Aqui eu valido se já tem algo salvo no meu Web Storage API em LocalStorage.

document.addEventListener("DOMContentLoaded", () => {
    const dadosSalvos = localStorage.getItem("cadastro");

//Lembrar de colocar as traves e as aspas no fim das validações para que o campo não resulte em undefined como resposta.

    if (dadosSalvos) {
        const usuario = JSON.parse(dadosSalvos);

        document.getElementById("nome").value        = usuario.nome        || "";
        document.getElementById("email").value       = usuario.email       || "";
        document.getElementById("telefone").value    = usuario.telefone    || "";
        document.getElementById("cep").value         = usuario.cep         || "";
        document.getElementById("logradouro").value  = usuario.logradouro  || "";
        document.getElementById("bairro").value      = usuario.bairro      || "";
        document.getElementById("cidade").value      = usuario.cidade      || "";
        document.getElementById("uf").value          = usuario.uf          || "";
        document.getElementById("numero").value      = usuario.numero      || "";
        document.getElementById("complemento").value = usuario.complemento || "";
    }
});

//aqui eu puxo os dados do CEP através do método fetch no ViaCep

document.getElementById("cep").addEventListener("blur", (evento)=>{  
    const elemento = evento.target;
    const cepInformado = elemento.value;

    if (!(cepInformado.length === 8))
        return;
    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
    .then(response => response.json())
    .then(data => {
        if(!data.erro){
            document.getElementById('logradouro').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('uf').value = data.uf;
        }else{
            alert("Cep não encontrado.")
        }
    })
    .catch(error => console.error("Erro de importação de CEP", error));

})

//Aqui eu garanto que o Submit não limpará a página e que ele salvará os dados

document.querySelector("form").addEventListener("submit", (evento) => {
    evento.preventDefault();

    const usuario = {
        nome:        document.getElementById("nome").value,
        email:         document.getElementById("email").value,
        telefone:    document.getElementById("telefone").value,
        cep:         document.getElementById("cep").value,
        logradouro:  document.getElementById("logradouro").value,
        bairro:      document.getElementById("bairro").value,
        cidade:      document.getElementById("cidade").value,
        uf:          document.getElementById("uf").value,
        numero:      document.getElementById("numero").value,
        complemento: document.getElementById("complemento").value,
    };

    localStorage.setItem("cadastro", JSON.stringify(usuario));
    alert("Cadastro salvo com sucesso!");
});