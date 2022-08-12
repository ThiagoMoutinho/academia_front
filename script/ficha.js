const vm = new Vue({
    el: "#app",
    data: {
        indice: "",
        id: "",
        fk_aluno: "",
        fk_professor: "",
        inicio: "",
        termino: "",
        objetivo: "",
        observacao: "",
        exercicio: "",
        serie: "",
        repeticao: "",
        descanso: "",
        listarAluno: [],
        listarProfessor: [],
        listarExercicios: [],
        gridLista: "",
        gridFicha: "",
        acao: "Cadastrar",
        baseUrl: "http://10.73.1.221:8080/academia/public",
    },
    created() {
        this.carregarUsuariosNoGrid();
        this.carregarUsuariosNoGrid2() 
        this.listarAlunoCombo();
        this.listarProfessorCombo();
        this.listarExerciciosCombo();
    },
    methods: {
        carregarUsuariosNoGrid() {
            fetch(`${this.baseUrl}/ficha/listar-fe`)
            .then( r => r.json())
            .then( r => {
                this.gridLista = r;
            })
        },
        
        carregarUsuariosNoGrid2() {
            this.gridFicha = [
            ];
           },
        
           

        adicionarFicha() {
            fetch(`${this.baseUrl}/ficha/salvar`, {
                method: "POST",
                body: new FormData(document.getElementById
                ("formFicha"))
            })
            .then( r => r.json())
            .then( r => {
                alert(r.mensagem);
                //this.carregarUsuariosNoGrid();
                //this.cancelarEdicao()
                return false;
            })
        },

        listarAlunoCombo() {
            fetch(`${this.baseUrl}/aluno/listar-aluno`)
            .then(r => r.json())
            .then(r => {
                this.listarAluno = r;
                
            })
        },
        listarProfessorCombo() {
            fetch(`${this.baseUrl}/professor/listar-prof`)
            .then(r => r.json())
            .then(r => {
                this.listarProfessor = r;
                
            })
        },
        listarExerciciosCombo() {
            fetch(`${this.baseUrl}/exercicio/listar-exe`)
            .then(r => r.json())
            .then(r => {
                this.listarExercicios = r;
                
            })
        },

        adicionarExercicio() {
            
            this.gridFicha.push({
                "exercicio": this.exercicio,
                "serie": this.serie,
                "repeticao": this.repeticao,
                "descanso": this.descanso,
            });

            this.exercicio = "";
            this.serie = "";
            this.repeticao = "";
            this.descanso = "";
        },
        /* uf */
        atualizarFicha() {
            fetch(`${this.baseUrl}/ficha/alterar`, {
                method: "POST",
                body: new FormData(document.getElementById
                ("formFicha"))
            })
            .then( r => r.json())
            .then( r => {
                alert(r.mensagem);
                this.carregarUsuariosNoGrid();
                this.cancelarFicha();
            })
        },
        editarFicha(indice) {
            this.id = this.gridLista[indice].id;
            this.fk_aluno = this.gridLista[indice].fk_aluno;
            this.fk_professor = this.gridLista[indice].fk_professor;
            this.inicio = this.gridLista[indice].inicio;
            this.termino = this.gridLista[indice].termino;
            this.objetivo = this.gridLista[indice].objetivo;
            this.observacao = this.gridLista[indice].observacao;
            this.exercicio = this.gridFicha[indice].exercicio;
            this.serie = this.gridFicha[indice].serie;
            this.repeticao = this.gridFicha[indice].repeticao;
            this.descanso = this.gridFicha[indice].descanso;
            this.acao = "Editar"
        },
        cancelarEdicao() {
            this.indice = "";
            this.id = "";
            this.fk_aluno = "";
            this.fk_professor = "";
            this.inicio = "";
            this.termino = "";
            this.objetivo = "";
            this.observacao = "";
            this.exercicio = "";
            this.serie = "";
            this.descanso = "";
            this.acao = "Cadastrar";
        },
        excluirUsuario(id) {
            if(confirm("Deseja realmente excluir este registro?")) {
                fetch(`${this.baseUrl}/ficha/excluir/${id}`, {
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

                    this.carregarUsuariosNoGrid();
                })
            }
        }
    }
})