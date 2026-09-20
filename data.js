/* ============================================
   NavegaSeguro — data.js
   Conteúdo dos módulos, quizzes e desafio final
   ============================================ */

const MODULES = [
  {
    id: "phishing",
    num: 1,
    title: "Phishing: aprenda a reconhecer uma tentativa de golpe",
    shortDesc: "Como reconhecer tentativas de golpe.",
    content: `
      <h2>O que é phishing?</h2>
      <p>Phishing é quando alguém finge ser uma empresa, um banco ou até uma pessoa conhecida para te enganar e conseguir suas informações — como senhas, números de cartão ou dados pessoais. Geralmente acontece por e-mail, SMS ou mensagens em redes sociais, e tenta convencer você a clicar em um link ou informar dados sem perceber que é um golpe.</p>

      <h2>Como um golpe de phishing funciona?</h2>
      <div class="flow-diagram">
        <div class="flow-step">Mensagem suspeita</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">Link ou página falsa</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">Usuário acredita que é verdadeiro</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">Entrega informações</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">Golpista obtém os dados</div>
      </div>

      <h2>Sinais de alerta</h2>
      <ul>
        <li>Mensagens que criam urgência, como "sua conta será bloqueada hoje"</li>
        <li>Pedidos inesperados de senha ou código de confirmação</li>
        <li>Links estranhos, com endereços diferentes do site oficial</li>
        <li>Erros de escrita ou formatação incomum</li>
        <li>Promoções muito fora do normal</li>
        <li>Páginas que parecem um pouco diferentes do site original</li>
        <li>Solicitações de informações pessoais por mensagem</li>
      </ul>

      <h2>Como verificar um link?</h2>
      <p>Antes de clicar, observe o endereço completo do site: golpistas costumam usar nomes parecidos com os originais, mas com pequenas diferenças. Evite clicar por impulso, principalmente em mensagens urgentes. Quando tiver dúvida, não use o link recebido — procure o serviço diretamente pelo canal oficial, como o aplicativo ou o site digitado manualmente no navegador.</p>

      <div class="tip-card">
        <strong>Pare. Pense. Verifique.</strong>
        <p>Não clique imediatamente em mensagens que tentam causar medo ou urgência. Respire, avalie a situação e confirme pelo canal oficial antes de agir.</p>
      </div>
    `,
    quiz: {
      title: "Quiz — Phishing",
      questions: [
        {
          type: "mc",
          prompt: "Você recebe uma mensagem dizendo: \"Sua conta será bloqueada hoje! Clique aqui para confirmar seus dados.\" O que você deve fazer?",
          options: [
            { id: "a", text: "Clicar rapidamente no link" },
            { id: "b", text: "Enviar seus dados para confirmar" },
            { id: "c", text: "Verificar a mensagem e acessar o serviço pelo site oficial" },
            { id: "d", text: "Encaminhar para seus amigos" }
          ],
          correct: "c",
          explanation: "Mensagens que criam urgência são um dos principais sinais de phishing. O mais seguro é ignorar o link recebido e acessar o serviço diretamente pelo canal oficial."
        },
        {
          type: "tf",
          prompt: "Erros de escrita e links com endereços estranhos são sinais de alerta de uma possível tentativa de phishing.",
          options: [
            { id: "v", text: "Verdadeiro" },
            { id: "f", text: "Falso" }
          ],
          correct: "v",
          explanation: "Isso mesmo. Erros de escrita e endereços diferentes do site oficial costumam indicar que a mensagem não é legítima."
        },
        {
          type: "mc",
          prompt: "Qual é a atitude mais segura diante de uma mensagem urgente pedindo sua senha?",
          options: [
            { id: "a", text: "Responder com a senha o mais rápido possível, para evitar o bloqueio" },
            { id: "b", text: "Pausar, desconfiar da urgência e verificar pelo canal oficial" },
            { id: "c", text: "Enviar a senha só se a mensagem tiver o logotipo da empresa" },
            { id: "d", text: "Clicar no link e ver se a página parece confiável" }
          ],
          correct: "b",
          explanation: "Empresas sérias não pedem sua senha por mensagem. Desconfiar da urgência e checar pelo canal oficial evita cair no golpe."
        }
      ]
    }
  },
  {
    id: "senhas",
    num: 2,
    title: "Senhas fortes: sua primeira camada de proteção",
    shortDesc: "Como criar e proteger suas senhas.",
    content: `
      <h2>O que torna uma senha mais segura?</h2>
      <ul>
        <li>Comprimento — quanto mais longa, mais difícil de descobrir</li>
        <li>Combinação de letras, números e símbolos</li>
        <li>Evitar informações óbvias, como nome ou data de nascimento</li>
        <li>Não reutilizar a mesma senha em vários lugares</li>
      </ul>

      <h2>Evite senhas previsíveis</h2>
      <p>Alguns exemplos de senhas fracas, que devem ser evitadas:</p>
      <div class="checklist">
        <li>123456</li>
        <li>senha123</li>
        <li>nome123</li>
        <li>datadenascimento</li>
      </div>
      <p>Senhas previsíveis são fáceis de adivinhar ou testar automaticamente por programas usados em golpes, o que aumenta muito o risco de invasão.</p>

      <h2>Uma senha para cada conta</h2>
      <p>Usar a mesma senha em vários serviços é arriscado: se um deles vazar, todas as suas contas ficam vulneráveis. O ideal é ter senhas diferentes para e-mail, redes sociais, banco e outros serviços importantes.</p>

      <h2>Autenticação em dois fatores</h2>
      <p>A autenticação em dois fatores (2FA) adiciona uma camada extra de proteção: além da senha, é necessário confirmar sua identidade de outra forma.</p>
      <div class="twofa-diagram">
        <span class="tf-box">Senha</span>
        <span class="tf-plus">+</span>
        <span class="tf-box">Segundo fator</span>
        <span class="tf-eq">=</span>
        <span class="tf-result">Mais proteção</span>
      </div>
      <p>Exemplos de segundo fator:</p>
      <ul>
        <li>Código de confirmação enviado por mensagem</li>
        <li>Aplicativo autenticador</li>
        <li>Chave de segurança física</li>
      </ul>
    `,
    quiz: {
      title: "Quiz — Senhas",
      questions: [
        {
          type: "mc",
          prompt: "Qual dessas práticas é mais segura?",
          options: [
            { id: "a", text: "Usar a mesma senha em todos os sites" },
            { id: "b", text: "Utilizar senhas diferentes para diferentes contas" },
            { id: "c", text: "Usar apenas números" },
            { id: "d", text: "Compartilhar a senha com amigos" }
          ],
          correct: "b",
          explanation: "Senhas diferentes para cada conta evitam que o vazamento de um serviço comprometa todas as suas contas."
        },
        {
          type: "tf",
          prompt: "A autenticação em dois fatores torna uma conta mais protegida, mesmo que a senha seja descoberta.",
          options: [
            { id: "v", text: "Verdadeiro" },
            { id: "f", text: "Falso" }
          ],
          correct: "v",
          explanation: "Correto. Com o 2FA ativado, apenas a senha não é suficiente para acessar a conta — é preciso também o segundo fator."
        },
        {
          type: "mc",
          prompt: "Por que senhas como \"123456\" ou \"nome123\" são consideradas fracas?",
          options: [
            { id: "a", text: "Porque são curtas demais para o teclado do celular" },
            { id: "b", text: "Porque são fáceis de adivinhar ou testar automaticamente" },
            { id: "c", text: "Porque não funcionam em todos os sites" },
            { id: "d", text: "Porque exigem autenticação em dois fatores" }
          ],
          correct: "b",
          explanation: "Senhas previsíveis são as primeiras tentadas em golpes e ataques automatizados, por isso são consideradas frágeis."
        }
      ]
    }
  },
  {
    id: "malware",
    num: 3,
    title: "Malware: cuidado com o que você instala",
    shortDesc: "Como identificar riscos em downloads.",
    content: `
      <h2>O que é malware?</h2>
      <p>Malware é qualquer programa criado para prejudicar seu dispositivo ou roubar informações sem sua permissão — como vírus, programas espiões e outros softwares maliciosos. Ele pode deixar o dispositivo lento, roubar dados ou até bloquear arquivos.</p>

      <h2>Como programas maliciosos podem chegar ao dispositivo?</h2>
      <ul>
        <li>Downloads suspeitos, feitos fora de fontes confiáveis</li>
        <li>Links maliciosos recebidos por mensagem ou e-mail</li>
        <li>Anexos desconhecidos</li>
        <li>Sites suspeitos, com muitos anúncios ou pop-ups</li>
        <li>Programas de origem duvidosa</li>
      </ul>

      <h2>Antes de baixar</h2>
      <p>Antes de instalar qualquer programa ou arquivo, confira este checklist:</p>
      <div class="checklist">
        <li>Conheço o site?</li>
        <li>O arquivo é realmente necessário?</li>
        <li>O programa possui uma fonte oficial?</li>
        <li>O endereço parece confiável?</li>
        <li>Meu sistema está atualizado?</li>
      </div>

      <div class="tip-card">
        <strong>Dica</strong>
        <p>Se você não sabe de onde veio, pense duas vezes antes de abrir.</p>
      </div>
    `,
    quiz: {
      title: "Quiz — Malware",
      questions: [
        {
          type: "mc",
          prompt: "Você encontrou um programa gratuito em um site desconhecido. O que deve fazer?",
          options: [
            { id: "a", text: "Baixar imediatamente" },
            { id: "b", text: "Procurar uma fonte oficial" },
            { id: "c", text: "Desativar a proteção do computador" },
            { id: "d", text: "Ignorar qualquer aviso de segurança" }
          ],
          correct: "b",
          explanation: "Buscar a fonte oficial do programa reduz muito o risco de instalar um arquivo malicioso disfarçado de programa legítimo."
        },
        {
          type: "tf",
          prompt: "Manter o sistema atualizado ajuda a reduzir o risco de infecção por malware.",
          options: [
            { id: "v", text: "Verdadeiro" },
            { id: "f", text: "Falso" }
          ],
          correct: "v",
          explanation: "Atualizações corrigem falhas de segurança que poderiam ser usadas por programas maliciosos para invadir o dispositivo."
        },
        {
          type: "mc",
          prompt: "Qual situação representa o maior risco de malware?",
          options: [
            { id: "a", text: "Baixar um aplicativo pela loja oficial do sistema" },
            { id: "b", text: "Abrir um anexo desconhecido recebido por e-mail" },
            { id: "c", text: "Atualizar o sistema operacional" },
            { id: "d", text: "Visitar o site oficial de um banco" }
          ],
          correct: "b",
          explanation: "Anexos desconhecidos são uma das formas mais comuns de espalhar malware, principalmente quando vêm de remetentes não confiáveis."
        }
      ]
    }
  },
  {
    id: "compras",
    num: 4,
    title: "Compras online: antes de pagar, confira",
    shortDesc: "Como comprar com mais segurança.",
    content: `
      <h2>Como identificar uma loja confiável?</h2>
      <ul>
        <li>Endereço do site — verifique se parece oficial e seguro</li>
        <li>Informações da empresa, como CNPJ e contato</li>
        <li>Formas de pagamento oferecidas</li>
        <li>Reputação da loja em avaliações de outros clientes</li>
        <li>Políticas claras de troca e devolução</li>
        <li>Preços muito fora do normal para o produto</li>
      </ul>

      <h2>Promoções suspeitas</h2>
      <p>Compare o preço de um mesmo produto em diferentes lojas:</p>
      <div class="price-compare">
        <div class="price-row"><span>Produto</span><span>R$ 2.000</span></div>
        <div class="price-row"><span>Loja A</span><span>R$ 1.850</span></div>
        <div class="price-row"><span>Loja B</span><span>R$ 1.990</span></div>
        <div class="price-row"><span>Loja C</span><span>R$ 1.950</span></div>
        <div class="price-row alert"><span>Site desconhecido</span><span>R$ 199</span></div>
      </div>
      <p><strong>Qual situação merece mais atenção?</strong> Preços extremamente diferentes dos praticados pelo mercado podem ser um sinal de alerta e devem ser investigados antes da compra — pesquise a loja e desconfie de descontos exagerados demais para serem verdade.</p>
    `,
    quiz: {
      title: "Quiz — Compras online",
      questions: [
        {
          type: "mc",
          prompt: "Uma loja desconhecida oferece um produto muito abaixo do preço normal. Qual é a melhor atitude?",
          options: [
            { id: "a", text: "Comprar imediatamente, antes que a promoção acabe" },
            { id: "b", text: "Verificar a loja antes de fornecer qualquer dado" },
            { id: "c", text: "Compartilhar seus dados para liberar a promoção" },
            { id: "d", text: "Enviar o link para outras pessoas" }
          ],
          correct: "b",
          explanation: "Preços muito abaixo do mercado são um forte sinal de alerta. Pesquisar a reputação da loja antes de comprar evita golpes."
        },
        {
          type: "tf",
          prompt: "Uma política de troca e devolução clara é um bom sinal de que uma loja online é confiável.",
          options: [
            { id: "v", text: "Verdadeiro" },
            { id: "f", text: "Falso" }
          ],
          correct: "v",
          explanation: "Lojas sérias costumam deixar suas políticas de troca, devolução e contato bem visíveis para o cliente."
        },
        {
          type: "mc",
          prompt: "O que fazer antes de finalizar uma compra em uma loja que você nunca ouviu falar?",
          options: [
            { id: "a", text: "Pesquisar a reputação da loja e conferir suas informações" },
            { id: "b", text: "Pagar por transferência para um contato pessoal informado no site" },
            { id: "c", text: "Fornecer todos os dados solicitados sem verificar" },
            { id: "d", text: "Ignorar avaliações de outros clientes" }
          ],
          correct: "a",
          explanation: "Pesquisar a reputação, o CNPJ e as formas de pagamento antes de comprar ajuda a evitar lojas falsas."
        }
      ]
    }
  },
  {
    id: "wifi",
    num: 5,
    title: "Wi-Fi público: conecte-se com cuidado",
    shortDesc: "Cuidados ao usar redes públicas.",
    content: `
      <h2>O que é uma rede Wi-Fi pública?</h2>
      <p>É uma rede de internet disponível em locais como restaurantes, aeroportos, hotéis, shoppings, praças e outros espaços públicos, geralmente aberta para qualquer pessoa que esteja no local.</p>

      <h2>Quais cuidados tomar?</h2>
      <div class="wifi-cards">
        <div class="wifi-card">🔒 Evite realizar atividades extremamente sensíveis em redes desconhecidas.</div>
        <div class="wifi-card">📱 Mantenha seus dispositivos atualizados.</div>
        <div class="wifi-card">🚫 Não aceite redes suspeitas.</div>
        <div class="wifi-card">⚙️ Evite conexões automáticas desconhecidas.</div>
      </div>

      <h2>Como identificar a rede correta?</h2>
      <p>Em alguns locais podem existir redes com nomes muito parecidos, criadas justamente para confundir. Antes de conectar, confirme diretamente com o estabelecimento qual é o nome oficial da rede Wi-Fi.</p>
    `,
    quiz: {
      title: "Quiz — Wi-Fi público",
      questions: [
        {
          type: "mc",
          prompt: "Você encontrou duas redes Wi-Fi com nomes muito parecidos em um local público. O que deve fazer?",
          options: [
            { id: "a", text: "Escolher qualquer uma" },
            { id: "b", text: "Confirmar com o estabelecimento qual é a rede oficial" },
            { id: "c", text: "Conectar nas duas" },
            { id: "d", text: "Escolher a que tiver maior sinal" }
          ],
          correct: "b",
          explanation: "Redes com nomes parecidos podem ser falsas, criadas para capturar dados. Confirmar com o estabelecimento é a forma mais segura de saber qual é a oficial."
        },
        {
          type: "tf",
          prompt: "É seguro deixar o celular conectando automaticamente a qualquer rede Wi-Fi conhecida ou aberta.",
          options: [
            { id: "v", text: "Verdadeiro" },
            { id: "f", text: "Falso" }
          ],
          correct: "f",
          explanation: "Conexões automáticas a redes desconhecidas podem levar o dispositivo a se conectar a redes falsas sem que você perceba."
        },
        {
          type: "mc",
          prompt: "Qual atividade é mais arriscada de fazer conectado a uma rede Wi-Fi pública desconhecida?",
          options: [
            { id: "a", text: "Ler notícias em um site público" },
            { id: "b", text: "Acessar o aplicativo do banco e fazer transferências" },
            { id: "c", text: "Ver a previsão do tempo" },
            { id: "d", text: "Pesquisar um endereço no mapa" }
          ],
          correct: "b",
          explanation: "Atividades sensíveis, como acessar o banco, envolvem dados que merecem mais cuidado em redes públicas desconhecidas."
        }
      ]
    }
  },
  {
    id: "dados",
    num: 6,
    title: "Seus dados também precisam de proteção",
    shortDesc: "Como proteger suas informações pessoais.",
    content: `
      <h2>O que são dados pessoais?</h2>
      <p>São informações que identificam você, como nome, telefone, endereço, e-mail, documentos e informações de conta.</p>

      <h2>Pense antes de compartilhar</h2>
      <div class="risk-levels">
        <div class="risk-level low"><strong>🟢 Menor risco</strong>Informações gerais, como preferências e opiniões públicas.</div>
        <div class="risk-level mid"><strong>🟡 Atenção</strong>Telefone, e-mail, localização e informações semelhantes.</div>
        <div class="risk-level high"><strong>🔴 Muito cuidado</strong>Senhas, códigos de autenticação e informações financeiras.</div>
      </div>

      <div class="tip-card">
        <strong>Dica</strong>
        <p>Nem toda pessoa ou site precisa saber tudo sobre você.</p>
      </div>
    `,
    quiz: {
      title: "Quiz — Proteção de dados pessoais",
      questions: [
        {
          type: "mc",
          prompt: "Qual das opções abaixo exige o maior cuidado ao compartilhar?",
          options: [
            { id: "a", text: "Sua cor favorita" },
            { id: "b", text: "Um código de autenticação da sua conta" },
            { id: "c", text: "O nome de um filme que você assistiu" },
            { id: "d", text: "Sua opinião sobre um assunto público" }
          ],
          correct: "b",
          explanation: "Códigos de autenticação dão acesso direto a contas e informações financeiras, por isso exigem muito cuidado."
        },
        {
          type: "tf",
          prompt: "Compartilhar sua localização e telefone com qualquer site, sem necessidade, não traz riscos.",
          options: [
            { id: "v", text: "Verdadeiro" },
            { id: "f", text: "Falso" }
          ],
          correct: "f",
          explanation: "Telefone e localização são informações de atenção — compartilhá-las sem necessidade pode expor você a riscos desnecessários."
        },
        {
          type: "mc",
          prompt: "Antes de preencher um formulário pedindo vários dados pessoais, o que é recomendado fazer?",
          options: [
            { id: "a", text: "Preencher tudo sem verificar quem está pedindo" },
            { id: "b", text: "Pensar se aquele site realmente precisa dessas informações" },
            { id: "c", text: "Compartilhar também sua senha, para agilizar" },
            { id: "d", text: "Ignorar se o site parece confiável ou não" }
          ],
          correct: "b",
          explanation: "Avaliar se a informação pedida é realmente necessária ajuda a evitar compartilhar dados demais com sites ou pessoas desconhecidas."
        }
      ]
    }
  },
  {
    id: "golpes",
    num: 7,
    title: "Golpes podem aparecer onde você menos espera",
    shortDesc: "Reconhecendo golpes do dia a dia.",
    content: `
      <h2>Falsos atendentes</h2>
      <p>Uma pessoa entra em contato dizendo representar uma empresa, banco ou serviço, e pede dados ou pagamentos.</p>
      <div class="scenario-card">
        <div class="sc-row"><strong>Como reconhecer:</strong> pedidos de dados sensíveis ou pagamentos fora dos canais oficiais.</div>
        <div class="sc-row"><strong>O que fazer:</strong> desligue e entre em contato pelo canal oficial da empresa.</div>
        <div class="sc-row"><strong>O que evitar:</strong> fornecer senhas, códigos ou fazer pagamentos durante a ligação ou conversa.</div>
      </div>

      <h2>Falsos prêmios</h2>
      <p>O usuário recebe uma mensagem informando que ganhou algo, geralmente pedindo dados ou pagamento de uma taxa para liberar o prêmio.</p>
      <div class="scenario-card">
        <div class="sc-row"><strong>Como reconhecer:</strong> prêmios que você não se lembra de ter concorrido, urgência para responder.</div>
        <div class="sc-row"><strong>O que fazer:</strong> desconfie e verifique diretamente com a empresa mencionada.</div>
        <div class="sc-row"><strong>O que evitar:</strong> pagar qualquer taxa para "liberar" um prêmio.</div>
      </div>

      <h2>Falsas cobranças</h2>
      <p>Uma mensagem afirma que existe uma dívida ou pagamento pendente, tentando gerar pressa para o pagamento.</p>
      <div class="scenario-card">
        <div class="sc-row"><strong>Como reconhecer:</strong> cobranças que você não reconhece, com prazos curtos e ameaças.</div>
        <div class="sc-row"><strong>O que fazer:</strong> confira diretamente no aplicativo ou site oficial da empresa envolvida.</div>
        <div class="sc-row"><strong>O que evitar:</strong> pagar por um link recebido sem confirmar a origem.</div>
      </div>

      <h2>Contas falsas</h2>
      <p>Uma pessoa utiliza o nome ou imagem de outra pessoa conhecida para pedir favores, dinheiro ou informações.</p>
      <div class="scenario-card">
        <div class="sc-row"><strong>Como reconhecer:</strong> pedidos incomuns vindos de um perfil, mesmo que pareça familiar.</div>
        <div class="sc-row"><strong>O que fazer:</strong> confirme com a pessoa por outro meio de contato antes de atender ao pedido.</div>
        <div class="sc-row"><strong>O que evitar:</strong> enviar dinheiro ou dados só porque o perfil parece conhecido.</div>
      </div>

      <h2>Links suspeitos</h2>
      <p>Mensagens contendo links inesperados, muitas vezes enviadas por contatos que também podem ter sido enganados.</p>
      <div class="scenario-card">
        <div class="sc-row"><strong>Como reconhecer:</strong> links fora de contexto, mensagens genéricas como "olha isso" ou "você não vai acreditar".</div>
        <div class="sc-row"><strong>O que fazer:</strong> não clique e avise a pessoa que a enviou, caso pareça um contato conhecido.</div>
        <div class="sc-row"><strong>O que evitar:</strong> clicar por curiosidade em links inesperados.</div>
      </div>
    `,
    quiz: {
      title: "Quiz — Golpes do dia a dia",
      questions: [
        {
          type: "mc",
          prompt: "Uma pessoa liga se identificando como funcionário do seu banco e pede seu código de confirmação. O que fazer?",
          options: [
            { id: "a", text: "Informar o código, já que é o banco ligando" },
            { id: "b", text: "Desligar e entrar em contato pelo canal oficial do banco" },
            { id: "c", text: "Pedir para ligarem depois" },
            { id: "d", text: "Perguntar o nome do funcionário e confiar" }
          ],
          correct: "b",
          explanation: "Bancos não pedem códigos de confirmação por telefone. O mais seguro é desligar e confirmar diretamente pelo canal oficial."
        },
        {
          type: "tf",
          prompt: "Se um perfil conhecido pede dinheiro emprestado de forma repentina, é seguro confiar sem confirmar por outro meio.",
          options: [
            { id: "v", text: "Verdadeiro" },
            { id: "f", text: "Falso" }
          ],
          correct: "f",
          explanation: "Contas falsas costumam usar o nome e a foto de pessoas conhecidas. Confirmar por outro meio de contato evita cair no golpe."
        },
        {
          type: "mc",
          prompt: "Você recebe uma mensagem dizendo que ganhou um prêmio e que precisa pagar uma taxa para recebê-lo. O que isso indica?",
          options: [
            { id: "a", text: "É uma promoção legítima e comum" },
            { id: "b", text: "Provavelmente é um golpe" },
            { id: "c", text: "É seguro, desde que o valor seja baixo" },
            { id: "d", text: "Só é golpe se vier por e-mail" }
          ],
          correct: "b",
          explanation: "Prêmios verdadeiros não costumam exigir pagamento antecipado para serem entregues — esse é um forte sinal de golpe."
        }
      ]
    }
  }
];

const ACHIEVEMENTS = [
  { id: "primeiros-passos", icon: "🏅", name: "Primeiros Passos", desc: "Concluiu o primeiro módulo.", condition: (s) => s.completedModules.length >= 1 },
  { id: "cacador-golpes", icon: "🛡️", name: "Caçador de Golpes", desc: "Concluiu o módulo de phishing.", condition: (s) => s.completedModules.includes("phishing") },
  { id: "guardiao-senhas", icon: "🔐", name: "Guardião das Senhas", desc: "Concluiu o módulo de senhas.", condition: (s) => s.completedModules.includes("senhas") },
  { id: "navegador-seguro", icon: "🏆", name: "Navegador Seguro", desc: "Concluiu todos os módulos.", condition: (s) => s.completedModules.length >= MODULES.length }
];

const FINAL_CHALLENGE = {
  questions: [
    {
      type: "multi",
      prompt: "Você recebe uma mensagem dizendo que ganhou um prêmio. O link possui um endereço estranho e a pessoa solicita seus dados para liberar o prêmio. Quais sinais indicam que isso pode ser um golpe? (selecione todas as opções corretas)",
      options: [
        { id: "a", text: "O link tem um endereço estranho, diferente de sites conhecidos" },
        { id: "b", text: "Pedem seus dados pessoais para liberar algo que você não esperava ganhar" },
        { id: "c", text: "A mensagem chegou pelo celular" },
        { id: "d", text: "Você não se lembra de ter participado de nenhum sorteio" }
      ],
      correctSet: ["a", "b", "d"],
      explanation: "Endereços estranhos, pedidos de dados para liberar algo inesperado e não se lembrar de ter participado do sorteio são sinais clássicos de golpe. Receber por celular, sozinho, não indica nada — o meio da mensagem não é o problema."
    },
    {
      type: "mc",
      prompt: "Você está em um shopping e vê duas redes Wi-Fi com nomes quase iguais. Ao mesmo tempo, recebe uma mensagem urgente pedindo sua senha do banco. Qual é a atitude mais segura?",
      options: [
        { id: "a", text: "Conectar na rede de maior sinal e responder a mensagem rapidamente" },
        { id: "b", text: "Confirmar a rede oficial com o shopping e ignorar o pedido de senha por mensagem" },
        { id: "c", text: "Enviar a senha para garantir que a conta não seja bloqueada" },
        { id: "d", text: "Conectar nas duas redes para ter certeza" }
      ],
      correct: "b",
      explanation: "Confirmar a rede oficial evita redes falsas, e nenhuma empresa séria pede senha por mensagem — os dois cuidados devem ser aplicados juntos."
    },
    {
      type: "mc",
      prompt: "Uma loja desconhecida vende um produto por um preço muito abaixo do praticado por outras lojas e aceita apenas pagamento por transferência direta para uma pessoa física. O que isso sugere?",
      options: [
        { id: "a", text: "Uma promoção real e vantajosa, deve-se comprar logo" },
        { id: "b", text: "Sinais de golpe: preço fora do padrão e forma de pagamento pouco confiável" },
        { id: "c", text: "Não há motivo para desconfiar, já que o site existe" },
        { id: "d", text: "É seguro, desde que o produto pareça bom nas fotos" }
      ],
      correct: "b",
      explanation: "Preço muito abaixo do mercado combinado com pagamento direto para pessoa física são dois sinais de alerta que devem ser investigados antes da compra."
    },
    {
      type: "multi",
      prompt: "Você recebe um e-mail de um \"antivírus gratuito\" pedindo para baixar um arquivo, com uma mensagem cheia de erros de português e um link diferente do site oficial da empresa. Quais atitudes são recomendadas? (selecione todas as opções corretas)",
      options: [
        { id: "a", text: "Não clicar no link nem baixar o arquivo" },
        { id: "b", text: "Verificar a fonte oficial do programa antes de instalar qualquer coisa" },
        { id: "c", text: "Baixar mesmo assim, já que é só um antivírus" },
        { id: "d", text: "Desconfiar dos erros de escrita na mensagem" }
      ],
      correctSet: ["a", "b", "d"],
      explanation: "Não clicar, verificar a fonte oficial e desconfiar de erros de escrita são atitudes que ajudam a evitar malware disfarçado de programa útil."
    },
    {
      type: "mc",
      prompt: "Um perfil com a foto de um amigo te chama e pede um empréstimo urgente por Pix, dizendo que perdeu o cartão. O que fazer?",
      options: [
        { id: "a", text: "Fazer o Pix rapidamente, já que é uma emergência" },
        { id: "b", text: "Ligar ou chamar o amigo por outro meio para confirmar antes de qualquer coisa" },
        { id: "c", text: "Pedir para o perfil mandar uma foto do documento" },
        { id: "d", text: "Ignorar completamente e nunca mais falar com esse amigo" }
      ],
      correct: "b",
      explanation: "Confirmar por outro canal de contato é a forma mais segura de verificar se realmente é o seu amigo ou uma conta falsa usando a imagem dele."
    }
  ]
};
