class ListaNegociacoes {
    
    constructor(/*contexto, armadilha*/) { //apagar
        
        this._negociacoes = [];
       /* this._armadilha = armadilha; // apagar      
        this._contexto = contexto;  //apagar */

    }
    
    adiciona(negociacao) {
        
        this._negociacoes.push(negociacao);
       // this._armadilha(this); // infraestrutura apagar 

        // Reflect.apply(this._armadilha, this._contexto, [this]); não é necessário após aplicar a arrow function pois seu escopo é léxico  
        // this precisa ser passado dentro de array
        // reflect faz como se tivesse trocado o "this" da função por esse que foi passado
    }
    
    get negociacoes() {
        
        return [].concat(this._negociacoes);
    }

    esvazia() {
        this._negociacoes = [];
        //this._armadilha(this); // infraestrutura apagar
       // Reflect.apply(this._armadilha, this._contexto, [this]);  não é necessário após aplicar a arrow function pois seu escopo é léxico

    }

    get volumeTotal() {

        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }
}