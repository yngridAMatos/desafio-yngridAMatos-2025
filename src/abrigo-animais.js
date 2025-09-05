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
      const pessoa1 = parseLista(brinquedosPessoa1);
      const pessoa2 = parseLista(brinquedosPessoa2);
      const ordem = parseLista(ordemAnimais);

      this.validaAnimais(ordem);
      this.validaBrinquedos(pessoa1);
      this.validaBrinquedos(pessoa2);

      let resultado = [];
      let adotados = {pessoa1:0, pessoa2:0};

      for (let animalNome of ordem) {
        const animal = ANIMAIS[animalNome];

        let pessoa1Pode = this.analisaAdocao(animal, pessoa1, adotados.pessoa1);
        let pessoa2Pode = this.analisaAdocao(animal, pessoa2, adotados.pessoa2);

        let destino = "abrigo";
        if(pessoa1Pode && !pessoa2Pode && adotados.pessoa1 < 3) {
          destino = "pessoa 1";
          adotados.pessoa1++;
        } else if(!pessoa1Pode && pessoa2Pode && adotados.pessoa2 < 3){
          destino = "pessoa 2";
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
    const vistos = new Set();
    for (let nome of ordem) {
      if(!ANIMAIS[nome]) throw new Error("Animal inválido");
      if(vistos.has(nome)) throw new Error("Animal inválido");
      vistos.add(nome);
    }
  }

  validaBrinquedos(listaBrinquedos) {
    const vistos = new Set();
    for (let b of listaBrinquedos) {
      if(!BRINQUEDOS_VALIDOS.has(b)) throw new Error("Brinquedo inválido");
      if(vistos.has(b)) throw new Error("Brinquedo inválido");
      vistos.add(b);
    }
  }

  analisaAdocao(animal, brinquedosPessoa, qtdAtualAnimais) {
    if(qtdAtualAnimais >= 3) return false;
    return subsequencia(animal.brinquedos, brinquedosPessoa);
  }
}

function parseLista(str) {
  return String(str).split(",").map(s => s.trim()).filter(Boolean);
}

function subsequencia(necessarios, lista) {
  let i = 0;
  for (const item of lista){
    if(item === necessarios[i]) i++;
    if(i === necessarios.length) return true
  }
}

export { AbrigoAnimais as AbrigoAnimais };
