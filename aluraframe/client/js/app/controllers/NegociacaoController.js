class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document); // .bind para fixar o document e não mudar conforme a variável
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = ProxyFactory.create(
            new ListaNegociacoes(), 
            ['adiciona', 'esvazia'],
            (model) => this._negociacoesView.update(model)
            ); 
       
            /*this._listaNegociacoes = new Proxy(new ListaNegociacoes(), { // proxy = usado para não manipular o model
            
            get(target, prop, receiver) {

                if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {

                    return function() {

                        console.log(`interceptando ${prop}`);
                        Reflect.apply(target[prop], target, arguments) // arguments acessível em qualquer função e dá acesso a todos os parâmetros da função
                        self._negociacoesView.update(target);
                    }
                }

                return Reflect.get(target, prop, receiver)
            } 
            });*/
        
            // this._listaNegociacoes = new ListaNegociacoes(model => this._negociacoesView.update(model));
            // com arrow function, o this se mantém o mesmo onde quer que a função seja chamada, ou seja, é léxico
            // é pego o this no momento da criação da função e ele se mantém até o final
        

            this._negociacoesView = new NegociacoesView($('#negociacoesView'));
            this._negociacoesView.update(this._listaNegociacoes);
            
            this._mensagem = ProxyFactory.create(
                new Mensagem(), ['texto'], model => 
                    this._mensagemView.update(model));
            this._mensagemView = new MensagemView($('#mensagemView'));
            this._mensagemView.update(this._mensagemView);
            
           
    }
    
    adiciona(event) {
        
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        // this._negociacoesView.update(this._listaNegociacoes); - desnecessário pq ProxyFactory
        
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        // this._mensagemView.update(this._mensagem); - desnecessário pq ProxyFactory
        
        this._limpaFormulario();   
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