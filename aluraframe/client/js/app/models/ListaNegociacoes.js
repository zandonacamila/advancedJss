class ListaNegociacoes {
    
    constructor(contexto, armadilha) {
        
        this._negociacoes = [];
        this._armadilha = armadilha;
        this._contexto = contexto;

    }
    
    adiciona(negociacao) {
        
        this._negociacoes.push(negociacao);
        this._armadilha(this);

        // Reflect.apply(this._armadilha, this._contexto, [this]); não é necessário após aplicar a arrow function pois seu escopo é léxico  
        // this precisa ser passado dentro de array
        // reflect faz como se tivesse trocado o "this" da função por esse que foi passado
    }
    
    get negociacoes() {
        
        return [].concat(this._negociacoes);
    }

    esvazia() {
        this._negociacoes = [];
        this._armadilha(this);
       // Reflect.apply(this._armadilha, this._contexto, [this]);  não é necessário após aplicar a arrow function pois seu escopo é léxico

    }
}