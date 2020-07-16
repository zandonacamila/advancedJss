class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document); // .bind para fixar o document e não mudar conforme a variável
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        this._listaNegociacoes = new Bind(new ListaNegociacoes(),
        new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia'); 
        // ['adiciona', 'esvazia'] fora dos colchetes por causa do REST operator na classe Bind.
        
       
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
        
            /* this._listaNegociacoes = new ListaNegociacoes(model => this._negociacoesView.update(model));
             com arrow function, o this se mantém o mesmo onde quer que a função seja chamada, ou seja, é léxico
             é pego o this no momento da criação da função e ele se mantém até o final */
                    
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
     
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/semana') // 'negociacoes/semana' = seria a url da api????

        xhr.onreadystatechange = () => {
            /* status de requisição:
            0: requisição não iniciada

            1: conexão com o servidor estabelecida

            2: requisição recebida
            
            3: processando requisição
            
            4:requisição concluída e resposta pronta */
            if(xhr.readyState == 4) {

                if(xhr.status == 200) {
                // JSON não é um objeto js e precisa do .parse para ser manipulado
                    JSON.parse(xhr.responseText) // é um texto, JSON.parse vai retornar em objeto
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)) // cada objeto é convertido em uma instância de negociação, no final é gerado umm novo array
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)); // esse array é percorrido e adicionado na minha lista de negociacoes 
                    this._mensagem.texto = 'Negociações importadas com sucesso.';
                } else {
                    
                    console.log(xhr.responseText);
                    this._mensagem.texto = 'Não foi possível obter resposta do servidor.';
                }
            }
        };
        xhr.send();
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