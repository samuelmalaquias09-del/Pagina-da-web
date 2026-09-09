const ICON_LIKE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v11"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H7a2 2 0 0 1-2-2v-9a2 2 0 0 1 .59-1.42L11 4a2 2 0 0 1 3 1.72Z"/></svg>`;
const ICON_DISLIKE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V3"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H17a2 2 0 0 1 2 2v9a2 2 0 0 1-.59 1.42L13 20a2 2 0 0 1-3-1.72Z"/></svg>`;

const referees = {
  now: [
    {
      initials:"RC",
      name:"Raphael Claus",
      role:"Árbitro FIFA — Federação Paulista",
      bio:"Uma das principais referências da arbitragem brasileira atual, ganhou espaço em decisões nacionais e já apitou em competições internacionais representando o país."
    },
    {
      initials:"WS",
      name:"Wilton Sampaio",
      role:"Árbitro FIFA — Federação Goiana",
      bio:"Consolidou-se como um dos nomes mais presentes em jogos decisivos do futebol brasileiro, com passagens por Copa do Brasil e competições continentais."
    },
    {
      initials:"AD",
      name:"Anderson Daronco",
      role:"Árbitro FIFA — Federação Gaúcha",
      bio:"Conhecido pela postura tranquila em campo, acumulou experiência em torneios sul-americanos e se tornou referência entre os árbitros mais jovens do país."
    },
    {
      initials:"BM",
      name:"Bráulio da Silva Machado",
      role:"Árbitro FIFA — Federação Catarinense",
      bio:"Ganhou destaque nacional nos últimos anos, com atuações em jogos de alta exposição e crescente presença em competições de nível internacional."
    }
  ],
  old: [
    {
      initials:"AC",
      name:"Arnaldo César Coelho",
      role:"Ativo entre as décadas de 1970 e 1980",
      bio:"Tornou-se um dos rostos mais conhecidos da arbitragem brasileira, apitando decisões importantes e seguindo depois como comentarista de arbitragem na televisão."
    },
    {
      initials:"RA",
      name:"Romualdo Arppi Filho",
      role:"Ativo entre as décadas de 1970 e 1980",
      bio:"Representou o Brasil em uma Copa do Mundo, chegando a apitar uma grande final internacional, um feito raro para árbitros sul-americanos da época."
    },
    {
      initials:"JW",
      name:"José Roberto Wright",
      role:"Ativo entre as décadas de 1980 e 1990",
      bio:"Passou por competições internacionais importantes e ficou conhecido pelo rigor na aplicação das regras em uma época de futebol mais físico."
    },
    {
      initials:"MR",
      name:"Márcio Rezende de Freitas",
      role:"Ativo entre as décadas de 1980 e 1990",
      bio:"Fez parte de uma geração de árbitros que ganhou notoriedade nacional em decisões de campeonatos estaduais e competições de mata-mata."
    }
  ]
};

let totalVotes = 0;

function renderCard(ref, era){
  const card = document.createElement('div');
  card.className = `card era-${era}`;

  card.innerHTML = `
    <div class="card-top">
      <div class="avatar">${ref.initials}</div>
      <div class="era-label">${era === 'now' ? 'ATUAL' : 'ANTIGO'}</div>
    </div>
    <div>
      <h3>${ref.name}</h3>
      <p class="role">${ref.role}</p>
      <p class="bio">${ref.bio}</p>
    </div>
    <div class="votes">
      <button class="vote-btn like" data-state="0">
        ${ICON_LIKE}<span class="vote-count">0</span>
      </button>
      <button class="vote-btn dislike" data-state="0">
        ${ICON_DISLIKE}<span class="vote-count">0</span>
      </button>
    </div>
  `;

  const likeBtn = card.querySelector('.like');
  const dislikeBtn = card.querySelector('.dislike');
  let likeCount = 0;
  let dislikeCount = 0;
  let vote = null;

  function updateUI(){
    likeBtn.classList.toggle('active', vote === 'like');
    dislikeBtn.classList.toggle('active', vote === 'dislike');
    likeBtn.querySelector('.vote-count').textContent = likeCount;
    dislikeBtn.querySelector('.vote-count').textContent = dislikeCount;
  }

  likeBtn.addEventListener('click', () => {
    if(vote === 'like'){
      vote = null; likeCount--; totalVotes--;
    } else {
      if(vote === 'dislike'){ dislikeCount--; totalVotes--; }
      vote = 'like'; likeCount++; totalVotes++;
    }
    updateUI();
    updateTotal();
  });

  dislikeBtn.addEventListener('click', () => {
    if(vote === 'dislike'){
      vote = null; dislikeCount--; totalVotes--;
    } else {
      if(vote === 'like'){ likeCount--; totalVotes--; }
      vote = 'dislike'; dislikeCount++; totalVotes++;
    }
    updateUI();
    updateTotal();
  });

  return card;
}

function updateTotal(){
  const el = document.getElementById('total-votes');
  el.textContent = `${totalVotes} voto${totalVotes === 1 ? '' : 's'} registrado${totalVotes === 1 ? '' : 's'}`;
}

const gridNow = document.getElementById('grid-now');
const gridOld = document.getElementById('grid-old');

referees.now.forEach(ref => gridNow.appendChild(renderCard(ref, 'now')));
referees.old.forEach(ref => gridOld.appendChild(renderCard(ref, 'old')));