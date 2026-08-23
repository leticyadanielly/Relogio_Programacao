import { test, expect } from '@playwright/test';

const HTML_RELOGIO = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { background: #0f172a; color: #f8fafc; font-family: monospace; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
      .clock-card { background: #1e293b; padding: 2rem; border-radius: 12px; text-align: center; border: 1px solid #334155; }
      #display { font-size: 3.5rem; color: #38bdf8; margin: 1rem 0; font-weight: bold; }
      #status { font-size: 1.2rem; color: #f1f5f9; margin-top: 1rem; }
      input, button { padding: 10px; font-size: 1rem; border-radius: 6px; border: none; margin: 4px; }
      button { background: #38bdf8; color: #0f172a; font-weight: bold; cursor: pointer; }
    </style>
  </head>
  <body>
    <div class="clock-card">
      <h2>Relógio Digital</h2>
      <div id="display">00:00:00</div>
      <div>
        <input type="text" id="alarm-input" placeholder="HH:MM:SS" />
        <button id="set-alarm-btn">Definir Alarme</button>
      </div>
      <div id="status">Sem alarme</div>
    </div>

    <script>
      let alarmTime = null;

      function tick() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        const currentTime = h + ':' + m + ':' + s;

        document.getElementById('display').innerText = currentTime;

        // Condicional ajustada para verificar se alcançou ou passou do horário do alarme
        if (alarmTime && currentTime >= alarmTime) {
          document.getElementById('status').innerText = '⏰ ALARME DISPARADO!';
          alarmTime = null;
        }
      }

      document.getElementById('set-alarm-btn').addEventListener('click', () => {
        const input = document.getElementById('alarm-input').value;
        if (input) {
          alarmTime = input;
          document.getElementById('status').innerText = 'Alarme ativo para: ' + alarmTime;
        }
      });

      setInterval(tick, 1000);
      tick();
    </script>
  </body>
  </html>
`;

const urlHtml = 'data:text/html;charset=utf-8,' + encodeURIComponent(HTML_RELOGIO);

test('Deve inicializar com o horário atual da máquina e avançar o tempo', async ({ page }) => {
  const agora = new Date();

  await page.clock.install({ time: agora });
  await page.clock.pauseAt(agora);
  await page.goto(urlHtml);

  const display = page.locator('#display');
  const horaInicialDOM = await display.innerText();

  await page.clock.fastForward(10000);

  const [h, m, s] = horaInicialDOM.split(':').map(Number);
  const dataEsperada = new Date();
  dataEsperada.setHours(h, m, s + 10);
  
  const horaEsperada = dataEsperada.toLocaleTimeString('pt-BR', { hour12: false });

  await expect(display).toHaveText(horaEsperada);
});

test('Deve ativar o alarme dinâmico para 10 segundos no futuro', async ({ page }) => {
  const agora = new Date();

  await page.clock.install({ time: agora });
  await page.goto(urlHtml);

  const display = page.locator('#display');
  const horaAtualDOM = await display.innerText();

  // Define o alarme para 5 segundos no futuro
  const [h, m, s] = horaAtualDOM.split(':').map(Number);
  const alarmeData = new Date();
  alarmeData.setHours(h, m, s + 5);
  
  const alarmeHora = alarmeData.toLocaleTimeString('pt-BR', { hour12: false });

  await page.fill('#alarm-input', alarmeHora);
  await page.click('#set-alarm-btn');

  const status = page.locator('#status');
  await expect(status).toHaveText('Alarme ativo para: ' + alarmeHora);

  // Avança 10 segundos no tempo do Playwright para garantir a passagem pelo alarme
  await page.clock.fastForward(10000);

  await expect(status).toHaveText('⏰ ALARME DISPARADO!');
});