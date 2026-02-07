# Instagram OSINT Rehberi

Bu proje statik bir site ve basit bir Node HTTP sunucusu içerir. İletişim formu gönderilerini sunucu `mejas.txt` dosyasına ekler.

Yerelde çalıştırma

```powershell
cd C:\Users\PC\Desktop\osint-ne-ise-yarar
node server.js
```
Tarayıcı: http://localhost:3000

GitHub + Deploy (özet)

1. Yeni repo oluşturun veya mevcut bir repoya push edin:

```bash
git init
git add .
git commit -m "init"
# GitHub'da yeni repo oluşturduktan sonra:
git remote add origin https://github.com/Heckerandsehe/instgram-osint-ne-ise-yarar.git
git branch -M main
git push -u origin main
```

2. Deploy önerisi (Render/Railway): GitHub hesabınızı bağlayın, yeni Web Service oluşturun, repo ve `main` branch seçin. Start komutu: `node server.js`.

3. Deploy tamamlandığında size verilen URL ile siteyi paylaşabilirsiniz.

Notlar

- `mejas.txt` dosyası `.gitignore` içinde; canlı sunucuda izinlerin yazılabilir olduğundan emin olun.
- Özel domain mapping için Render/Railway arayüzünden domain ekleyip DNS kayıtlarını yönlendirin.

