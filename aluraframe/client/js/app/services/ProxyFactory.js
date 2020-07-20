class ProxyFactory {

    static create(objeto, props, acao) {

        return new Proxy(objeto, {
        
            get(target, prop, receiver) {

                if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {

                    return function() {

                        console.log(`interceptando ${prop}`);
                        Reflect.apply(target[prop], target, arguments) // arguments acessível em qualquer função e dá acesso a todos os parâmetros da função
                        return acao(target);
                    }
                }

                return Reflect.get(target, prop, receiver)
            },  

            set(target, prop, value, receiver) {

                if(props.includes(prop)) {
                    target[prop] = value;                    
                    // let retorno = Reflect.apply(target[prop], target, arguments);
                    acao(target); //  Dessa forma funciona. Correção do instrutor: "target[prop] = value" porém apresenta erro no console.
                    // return retorno;
                };
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

    static _ehFuncao(func){

        return typeof(func) == typeof(Function);
    }
}
/* O padrão de projeto Factory ocorre quando temos uma classe que nos ajuda a criar um objeto complexo, ou seja,
 ela esconde de nós os detalhes de criação desse objeto */