class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document); // .bind para fixar o document e não mudar conforme a variável
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        this._listaNegociacoes = new Bind(new ListaNegociacoes(),
        new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia'); 

             this._mensagem = new Bind(new Mensagem(),
             new MensagemView($('#mensagemView')), 'texto'); // ['texto'] - REST

    }
    
    adiciona(event) {
        
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        // this._negociacoesView.update(this._listaNegociacoes); - desnecessário pq ProxyFactory
        
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        // this._mensagemView.update(this._mensagem); - desnecessário pq ProxyFactory
        
        this._limpaFormulario();   
    }

    importaNegociacoes() {
     
        let service = new NegociacaoService();

        service
        .obterNegociacoes()
        .then(negociacoes => {

            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociacoes importadas com sucesso :)';
        })
        .catch(error => this._mensagem.texto = error);

    }
    
    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);    
    }

    apaga() {

        this._listaNegociacoes.esvazia();
        // this._negociacoesView.update(this._listaNegociacoes); - desnecessário pq ProxyFactory

        this._mensagem.texto = 'Negociações apagadas com sucesso!'; //sem o underline a mensagem não é exibida
        // this._mensagemView.update(this._mensagem); - desnecessário pq ProxyFactory
    }
    
    _limpaFormulario() {
     
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }
}