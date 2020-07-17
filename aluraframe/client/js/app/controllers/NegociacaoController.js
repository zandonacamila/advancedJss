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
     
        let service = new NegociacaoService();

        Promise.all([  // resolve todas as promises de uma vez só, na sequência
         service.obterNegociacoesDaSemana(),
         service.obterNegociacoesDaSemanaAnterior(),
         service.obterNegociacoesDaSemanaRetrasada()]
        ).then(negociacoes => {
        negociacoes
            .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
            .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso :D';
        })
        .catch(error => this._mensagem.texto = error);

    // ********Requisições feitas com PROMISE - problema de sincronicidade persiste:********

       /* service.obterNegociacoesDaSemana()
            .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
            this._mensagem.texto = 'Negociações da semana obtidas com sucesso.'
        })
            .catch(error => this._mensagem.texto = error)

        service.obterNegociacoesDaSemanaAnterior()
            .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
            this._mensagem.texto = 'Negociações da semana obtidas com sucesso.'
        })
            .catch(error => this._mensagem.texto = error)

        service.obterNegociacoesDaSemanaRetrasada()
            .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
            this._mensagem.texto = 'Negociações da semana obtidas com sucesso.'
        })
            .catch(error => this._mensagem.texto = error)*/

        // ********Pyramid of DOOM: requisições assíncronas aninhadas:********

        /*service.obterNegociacoesDaSemana((erro, negociacoes) => {// convenção error first: se tiver erro, pego ele no 1° parâmetro 

            if(erro) { 
                this._mensagem.texto = erro;
                return;
            }

            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            // this._mensagem.texto = 'Negociações importadas com sucesso!!';
        
            service.obterNegociacoesDaSemanaAnterior((erro, negociacoes) => {// convenção error first: se tiver erro, pego ele no 1° parâmetro 

                if(erro) { 
                    this._mensagem.texto = erro;
                    return;
                }
    
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                // this._mensagem.texto = 'Negociações importadas com sucesso!!';

                service.obterNegociacoesDaSemanaRetrasada((erro, negociacoes) => {// convenção error first: se tiver erro, pego ele no 1° parâmetro 

                    if(erro) { 
                        this._mensagem.texto = erro;
                        return;
                    }
        
                    negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto = 'Negociações importadas com sucesso!!';
                });
            });
        });*/
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