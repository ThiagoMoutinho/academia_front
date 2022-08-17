new Vue({
    el: "#app",
    data: {
        indice: "",
        id: "",
        nome: "",
        email: "",
        dt_nascimento: "",
        matricula: "",
        peso: "",
        altura: "",
        atestado_medico: "",
        listarAluno: "",
        nome_aluno: "",
        acao: "Cadastrar",
        baseUrl: "http://10.73.1.221:8080/academia/public",
    },
    created() {
        this.carregarUsuariosNoGrid();
    },
    methods: {
        carregarUsuariosNoGrid() {

            fetch(`${this.baseUrl}/aluno/listar-aluno?nome=${this.nome_aluno}`)
            .then(r => r.json())
            .then(r => {                                                       
                this.listarAluno = r;
                
                
            })
            
        },
        
        adicionarUsuario() {
            
            fetch(`${this.baseUrl}/aluno/cadastrar`, {
                method: "POST",
                body: new FormData(document.getElementById("formAluno"))
            })
            .then(r => r.json())
            .then(r => {
                alert(r.mensagem);
                this.carregarUsuariosNoGrid();
                this.cancelarEdicao();
            })
        },
        atualizarUsuario() {
            fetch(`${this.baseUrl}/aluno/alterar`, {
                method: "POST",
                body: new FormData(document.getElementById
                ("formAluno"))
            })
            .then(r => r.json())
            .then(r => {
                alert(r.mensagem);
                this.carregarUsuariosNoGrid();
                this.cancelarEdicao();
                return false;
            })
        },
        editarUsuario(indice) {
            this.id = this.listarAluno[indice].id;
            this.matricula = this.listarAluno[indice].matricula;
            this.nome = this.listarAluno[indice].nome;
            this.email = this.listarAluno[indice].email;
            this.altura = this.listarAluno[indice].altura;
            this.peso = this.listarAluno[indice].peso;
            this.dt_nascimento = this.listarAluno[indice].dt_nascimento;
            this.atestado_medico = this.listarAluno[indice].atestado_medico;

            this.acao = "Editar"
        },
        cancelarEdicao() {
            this.indice = "",
            this.id = "",
            this.matricula = "",
            this.nome = "",
            this.email ="",
            this.dt_nascimento = "",
            this.altura = "",
            this.peso = "", 
            this.atestado_medico = "",
            this.acao = "Cadastrar";
        },
        excluirUsuario(id) {
            if(confirm("Deseja realmente excluir este registro?")) {
                fetch(`${this.baseUrl}/aluno/excluir/${id}`, {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: id}),
                })
                .then(r => r.json())
                .then(r => {
                    if(r.mensagem) {
                        alert(r.mensagem)
                        this.carregarUsuariosNoGrid();
                        return false;
                    }     
                })
            }
        }
    }
})