class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {

            this._http
            .get('negociacoes/semana')
            .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))); // cada objeto é convertido em uma instância de negociação, no final é gerado umm novo array           
            })
            .catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana.')
            });            
        });
    }

    obterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {

            this._http
            .get('negociacoes/anterior')
            .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))); // cada objeto é convertido em uma instância de negociação, no final é gerado umm novo array           
            })
            .catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana anterior.')
            });            
        });
    }

    obterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {

            this._http
            .get('negociacoes/retrasada')
            .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))); // cada objeto é convertido em uma instância de negociação, no final é gerado umm novo array           
            })
            .catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana retrasada.')
            });            
        });
    }
}
         /* status de requisição:
            0: requisição não iniciada

            1: conexão com o servidor estabelecida

            2: requisição recebida
            
            3: processando requisição
            
            4:requisição concluída e resposta pronta */