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
                    acao(target); //  Dessa forma funciona. Correção do instrutor: "target(prop) = value" porém apresenta erro no console.
                };
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

    static _ehFuncao(func){

        return typeof(func) == typeof(Function);
    }
}
