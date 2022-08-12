new Vue({
    el: "#app",
    data: {
        indice: "",
        id: "", 
        nome: "",
        listaGm: "",
        acao: "Cadastrar",
        baseUrl: "http://10.73.1.221:8080/academia/public",
    },
    created() {
        this.carregarUsuariosNoGrid();
    },
    methods: {
        carregarUsuariosNoGrid() {
            fetch(`${this.baseUrl}/gm/listargm`)
            .then(r => r.json())
            .then(r => {
                this.listaGm = r;
            })
        },
        adicionarGrupo() {
            
            fetch(`${this.baseUrl}/gm/salvar`, {
                method: "POST",
                body: new FormData(document.getElementById("listarGm"))
            })
            .then(r => r.json())
            .then(r => {
                alert(r.mensagem);
                this.carregarUsuariosNoGrid();
                this.cancelarEdicao();
                return false;
            })

            
        },
        atualizarGm() {
            fetch(`${this.baseUrl}/gm/alterar`, {
                method: "POST",
                body: new FormData(document.getElementById
                ("formFicha"))
            })
            .then( r => r.json())
            .then( r => {
                alert(r.mensagem);
                this.carregarUsuariosNoGrid();
                this.cancelarFicha();
                return false;
            })
        },
        editarGrupo(indice) {
            this.id = this.listaGm[indice].id;
            this.nome = this.listaGm[indice].nome;
            this.acao = "Editar"
        },
        cancelarEdicao() {
            this.indice = "",
            this.id = "",
            this.nome = "",
            this.acao = "Cadastrar"
        },
        excluirGrupo(id) {
            if(confirm("Deseja excluir esse registro?")) {
                fetch(`${this.baseUrl}/gm/excluir/${id}`, {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: id}),
                })
                .then(r => r.json())
                .then(r => {
                    if(r.error) {
                        alert(r.error)
                        return false;
                    }

                    this.carregarUsuariosNoGrid()
                })
                
            }
        }
    }
})