const ANIMAIS = {
  Rex: {tipo: "cão", brinquedos: ["RATO", "BOLA"]},
  Mimi: {tipo: "gato", brinquedos: ["BOLA", "LASER"]},
  Fofo: {tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"]},
  Zero: {tipo: "gato", brinquedos: ["RATO", "BOLA"]},
  Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"]},
  Bebe: {tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"]},
  Loco: {tipo: "jabuti", brinquedos: ["SKATE", "RATO"]}
};

const BRINQUEDOS_VALIDOS = new Set(
    Object.values(ANIMAIS).flatMap(a => a.brinquedos)
);

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const pessoa1 = brinquedosPessoa1.split(",").map(b => b.trim());
      const pessoa2 = brinquedosPessoa2.split(",").map(b => b.trim());
      const ordem = ordemAnimais.split(",").map(a => a.trim());

      this.validaAnimais(ordem);
      this.validaBrinquedos([...pessoa1, ...pessoa2]);

      let resultado = [];
      let adotados = {pessoa1:0, pessoa2:0};

      for (let animalNome of ordem) {
        const animal = ANIMAIS[animalNome];
        let pessoa1Pode = this.validaAdocao(animal, pessoa1, adotados.pessoa1);
        let pessoa2Pode = this.validaAdocao(animal, pessoa2, adotados.pessoa2);

        let destino = "Abrigo";
        if(pessoa1Pode && !pessoa2Pode && adotados.pessoa1 < 3) {
          destino = "Pessoa 1";
          adotados.pessoa1++;
        } else if(!pessoa1Pode && pessoa2Pode && adotados.pessoa2 < 3){
          destino = "Pessoa 2";
          adotados.pessoa2++;
        }
        resultado.push(`${animalNome} - ${destino}`);
      }
      resultado.sort((a, b) => a.localeCompare(b));
      return {lista: resultado};
    } catch (e) {
      return {erro: e.message};
    }
  }

  validaAnimais(ordem) {
    const set = new Set();
    for (let nome of ordem) {
      if(!ANIMAIS[nome]) throw new Error("Animal inválido");
      if(set.has(nome)) throw new Error("Animal inválido");
      set.add(nome);
    }
  }

  validaBrinquedos(listaBrinquedos) {
    const set = new Set();
    for (let b of listaBrinquedos) {
      if(!BRINQUEDOS_VALIDOS.has(b)) throw new Error("Brinquedo inválido");
      if(set.has(b)) throw new Error("Brinquedo inválido");
      set.add(nome);
    }
  }

  validaAdocao(animal, brinquedosPessoa, qtdAtualAnimais) {
    if(qtdAtualAnimais >= 3) return false;
    if(animal == ANIMAIS["Loco"]) return true; //não importa a ordem dos brinquedos
    let index = 0;
    for (let b of brinquedosPessoa) {
      if(b === animal.brinquedos[index]) {
        index++;
        if (index === animal.brinquedos.length) return true;
      }
    }
    return false;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
