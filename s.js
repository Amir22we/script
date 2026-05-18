(function () {
  let questionNum = 0;
  const results = [];

  function checkAnswer() {
    const options = document.querySelectorAll('#options-grid > div');
    const labels = ['A', 'B', 'C', 'D'];

    for (let i = 0; i < options.length; i++) {
      const img = options[i].querySelector('img');
      if (!img) continue;

      const filename = decodeURIComponent(img.src).split('/').pop();
      const nameWithoutExt = filename.replace(/\.[^.]+$/, '').trim();

      if (/\sa$|^a$/i.test(nameWithoutExt)) {
        const line = `${questionNum}: ${labels[i]} - a`;
        results.push(line);
        console.log('%c' + line, 'color: lime; font-weight: bold;');
        return;
      }
    }

    console.warn(`Q${questionNum}: ответ-a не найден`);
  }

  const grid = document.querySelector('#options-grid');
  if (!grid) return console.error('❌ #options-grid');

  questionNum = 1;
  checkAnswer();

  const observer = new MutationObserver(() => {
    setTimeout(() => {
      questionNum++;
      checkAnswer();
    }, 400);
  });

  observer.observe(grid, { childList: true, subtree: true });

  window.showResults = () => {
    console.log('\n📋 Все ответы:\n' + results.join('\n'));
  };

  console.log('✅');
})();
