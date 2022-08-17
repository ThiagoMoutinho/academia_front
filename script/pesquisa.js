new Vue({
    el: "#app",
    data: {
        indice: "",
        id: "",
        nome: "",
        cargo: "",
        email: "",
        cref: "",
        aluno: "",
        gridLista: "",
        acao: "Cadastrar",
        baseUrl: "http://10.73.1.221:8080/academia/public",
    },
    created() {
        this.carregarUsuariosNoGrid();
    },
    methods: {
        carregarUsuariosNoGrid() {
            fetch(`${this.baseUrl}/ficha/listar-fe?aluno=${this.aluno}`)
            .then( r => r.json())
            .then( r => 
            {
                this.gridLista = r;
                 
            })
        },
        atualizarFicha() {
            
            fetch(`${this.baseUrl}/ficha/alterar`, {
                method: "POST",
                body: new FormData(document.getElementById("pesquisaListar"))
            })
            .then(r => r.json())
            .then(r => {
                alert(r.mensagem);    
                this.carregarUsuariosNoGrid();
                this.cancelarEdicao();
                return false; 
                
            })
              
        },
        editarFicha(indice) {
            this.id = this.listarProfessor[indice].id;
            this.nome = this.listarProfessor[indice].nome;
            this.cargo = this.listarProfessor[indice].cargo;
            this.email = this.listarProfessor[indice].email;
            this.cref = this.listarProfessor[indice].cref;

            this.acao = "Editar"
        },
        cancelarEdicao() {
            this.indice = "",
            this.id = "",
            this.nome = "",
            this.cargo = "",
            this.email = "",
            this.cref = "",
            this.acao = "Cadastrar"
        },
        excluirProfessor(id) {
            if(confirm("Deseja excluir esse registro?")) {
                fetch(`${this.baseUrl}/professor/excluir/${id}`, {
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
                        this.carregarUsuariosNoGrid()
                        return false;      
                    }
                })
                
            }
        }
    }
})