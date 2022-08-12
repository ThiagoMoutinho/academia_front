new Vue({
    el: "#app",
    data: {
        indice: "",
        id: "",
        nome: "",
        fk_grupomuscular: "",
        descricao: "",
        listarGrupo: [],
        carregarLista: "",
        acao: "Cadastrar",
        baseUrl: "http://10.73.1.221:8080/academia/public",
    },
    created() {
        this.carregarUsuariosNoGrid();
        this.grupoMuscular();
    },
    methods: {
        carregarUsuariosNoGrid() {
            fetch(`${this.baseUrl}/exercicio/listar-exe`)
            .then(r => r.json())
            .then(r => {
                this.carregarLista = r;
            })
        },

        grupoMuscular() {
            fetch(`${this.baseUrl}/gm/listargm`)
            .then(r => r.json())
            .then(r => {
                this.listarGrupo = r;
                
            })
        },
        
        adicionarUsuario() {
            
            fetch(`${this.baseUrl}/exercicio/salvar`, {
                method: "POST",
                body: new FormData(document.getElementById("formGrupo"))
            })
            .then(r => r.json())
            .then(r => {
                alert(r.mensagem);
                this.carregarUsuariosNoGrid();
                this.cancelarEdicao();
            })
        },
        atualizarUsuario() {
            fetch(`${this.baseUrl}/exercicio/alterar`, {
                method: "POST",
                body: new FormData(document.getElementById
                ("formGrupo"))
            })
            .then(r => r.json())
            .then(r => {
                alert(r.mensagem);
                this.carregarUsuariosNoGrid();
                this.cancelarEdicao();
            })
        },
        editarUsuario(indice) {
            this.id = this.carregarLista[indice].id;
            this.nome = this.carregarLista[indice].nome;
            this.fk_grupomuscular = this.carregarLista[indice].fk_grupomuscular;
            this.descricao = this.carregarLista[indice].descricao;
            this.acao = "Editar"
        },
        cancelarEdicao() {
            this.indice = "",
            this.id = "",
            this.nome = "",
            this.fk_grupomuscular ="",
            this.descricao = "",
            this.acao = "Cadastrar";
        },
        excluirUsuario(id) {
            if(confirm("Deseja realmente excluir este registro?")) {
                fetch(`${this.baseUrl}/exercicio/excluir/${id}`, {
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