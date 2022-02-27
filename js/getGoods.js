const getGoods = () => {
  const allLinks = document.querySelectorAll('.navigation-link');
  const moreGoods = document.querySelector('.more');

  const renderGoods = (goods) => {
    const goodsContainer = document.querySelector('.long-goods-list');

    goodsContainer.innerHTML = '';

    goods.forEach(good => {
      const goodBlock = document.createElement('div');

      goodBlock.classList.add('col-3-lg');
      goodBlock.classList.add('col-sm-6');

      goodBlock.innerHTML = `
        <div class="goods-card">
          <span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
            <img src="db/${good.img}" alt="${good.name}"
            class="goods-image">
          <h3 class="goods-title">${good.name}</h3>
          <p class="goods-description">${good.description}</p>
          <button class="button goods-card-btn add-to-cart" data-id="${good.id}">
            <span class="button-price">$${good.price}</span>
          </button>
        </div>
      `

      goodsContainer.append(goodBlock);
    });
  }

  const getData = (linkValue, category) => {
    fetch('https://shop-pet-5cfd4-default-rtdb.firebaseio.com/db.json')
      .then((response) => response.json())
      .then((response) => {
        const array = category ? response.filter(item => item[category] === linkValue) : response;

        localStorage.setItem('goods', JSON.stringify(array));

        if (window.location.pathname !== '/goods.html') {
          window.location.href = 'goods.html'
        } else {
          renderGoods(array)
        }
      })
  }

  allLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const linkValue = link.textContent;
      const category = link.dataset.field;

      getData(linkValue, category);
    })
  })
  
  if(localStorage.getItem('goods') && window.location.pathname === '/goods.html') {
    renderGoods(JSON.parse(localStorage.getItem('goods')))
  }

  if(moreGoods) {
    moreGoods.addEventListener('click', (event) => {
      event.preventDefault();

      getData();
    })
  }
}

getGoods();