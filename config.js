// ▼ ÚNICO ARQUIVO A EDITAR PARA CADA CLIENTE (rode: node aplicar-config.js depois de editar)
const CONFIG = {
  nome: "CrossFit Four Heads",
  nomeCurto: "Four Heads",
  endereco: "Rua Caramuru, 320",
  bairro: "Praça da Árvore",
  cidade: "São Paulo",
  uf: "SP",
  whatsapp: "5511991707922",
  maps: "",
  modalidades: [
    { titulo: "CrossFit", descricao: "Treinos variados que combinam força, condicionamento e movimentos funcionais para desenvolver seu desempenho de forma completa." },
    { titulo: "Levantamento Olímpico", descricao: "Aprimore técnica, força, potência e controle através dos principais movimentos do levantamento de peso olímpico." },
    { titulo: "Ginástica", descricao: "Desenvolva controle corporal, mobilidade, força e habilidades que complementam sua evolução nos treinos." }
  ],
  faq: [
    { pergunta: "Preciso ter experiência com CrossFit?", resposta: "Não necessariamente. A melhor forma de começar é conversar com nossa equipe e entender qual treino é mais adequado para você." },
    { pergunta: "Como faço para agendar uma aula experimental?", resposta: "Clique em qualquer botão de WhatsApp do site e fale com nossa equipe para consultar os horários disponíveis." },
    { pergunta: "Preciso levar algum equipamento?", resposta: "Para saber exatamente o que levar para sua primeira aula, confirme as orientações diretamente com nossa equipe pelo WhatsApp." },
    { pergunta: "Onde fica o {nome}?", resposta: "Estamos em {enderecoCompleto}.", mapa: true },
    { pergunta: "Quais são os horários das aulas?", resposta: "Os horários podem variar de acordo com a programação do box. Entre em contato pelo WhatsApp para consultar os horários disponíveis." }
  ]
};
