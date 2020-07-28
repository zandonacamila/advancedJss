class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }

    obterNegociacoes() {

        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
            .reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
    }

    obterNegociacoesDaSemana() {

        return this._http
            .get('negociacoes/semana')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)); // cada objeto é convertido em uma instância de negociação, no final é gerado umm novo array           
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana.')
            });            
        
    }

    obterNegociacoesDaSemanaAnterior() {

        return this._http
            .get('negociacoes/anterior')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)); // cada objeto é convertido em uma instância de negociação, no final é gerado umm novo array           
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana anterior.')
            });            
        
    }

    obterNegociacoesDaSemanaRetrasada() {

        return this._http
            .get('negociacoes/retrasada')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)); // cada objeto é convertido em uma instância de negociação, no final é gerado umm novo array           
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana retrasada.')
            });            
        
    }

    cadastra(negociacao) {
        
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso.')
            .catch(() => { 
                throw new Error('Não foi possível adicionar a negociação.')
        });

            
    }
}

    

         /* status de requisição:
            0: requisição não iniciada

            1: conexão com o servidor estabelecida

            2: requisição recebida
            
            3: processando requisição
            
            4:requisição concluída e resposta pronta */ 