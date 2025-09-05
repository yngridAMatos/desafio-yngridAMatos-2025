class AbrigoAnimais {

  const ANIMAIS = {
    Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"]},
    Mimi: {tipo: "gato", brinquedos: ["BOLA", "LASER"]}// add o restante
  }

  const BRINQUEDOS_VALIDOS = new Set(
      Object.values(ANIMAIS).flatMap(a => a.brinquedos)
  )
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const pessoa1 = brinquedosPessoa1.split(",").map(b => b.trim());
      const pessoa2 = brinquedosPessoa2.split(",").map(b => b.trim());
      const ordem = ordemAnimais.split(",").map(a => a.trim());

      this.validaAnimais(ordem);


    } catch (e) {
      return {erro: e.message};
    }
  }

  validaAnimais(ordem) {
    const set = new Set();
    for (let nome of ordem) {
      if(!ANIMAIS[nome]) throw new Error("Animal Inválido");
      if(set.has(nome)) throw new Error("Animal Inválido");
      set.add(nome);
    }
  }

  validaBrinquedos(listaBrinquedos) {
    const set = new Set();
    for (let b of listaBrinquedos) {
      if(!BRINQUEDOS_VALIDOS.has(b)) throw new Error("Brinquedo Inválido");
      if(set.has(b)) throw new Error("Brinquedo Inválido");
      set.add(nome);
    }
  }
}

export { AbrigoAnimais as AbrigoAnimais };
