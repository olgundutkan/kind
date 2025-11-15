# IDP - Local Kubernetes Development Environment

Bu proje, Kind (Kubernetes in Docker) kullanarak yerel bir GitOps tabanlı Kubernetes development ortamı sağlar.

## Ön Gereksinimler

- Docker Desktop (macOS) veya Docker Engine (Linux)
- kubectl
- Helm 3
- mkcert

## Kurulum

### 1. Gerekli Araçları Yükleyin

#### macOS

```bash
# Kind kurulumu
brew install kind

# kubectl kurulumu (yoksa)
brew install kubectl

# Helm kurulumu
brew install helm

# mkcert kurulumu
brew install mkcert
```

#### Linux (Ubuntu/Debian)

```bash
# Docker Engine kurulumu (yoksa)
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Docker'ı sudo olmadan kullanabilmek için
sudo usermod -aG docker $USER
newgrp docker

# Kind kurulumu
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
[ $(uname -m) = aarch64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-arm64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

# kubectl kurulumu
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

# Helm kurulumu
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# mkcert kurulumu
sudo apt install -y libnss3-tools
curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
chmod +x mkcert-v*-linux-amd64
sudo mv mkcert-v*-linux-amd64 /usr/local/bin/mkcert
```

### 2. mkcert ile Yerel CA Oluşturun

```bash
# mkcert CA'sını yükleyin
mkcert -install

# Wildcard sertifika oluşturun
cd infrastructure/services/traefik/certificates
mkcert "*.local.portal.k2.io" "local.portal.k2.io"

# Sertifikaları base64'e çevirin
base64 -i _wildcard.local.portal.k2.io+1.pem | tr -d '\n' > tls.crt.b64
base64 -i _wildcard.local.portal.k2.io+1-key.pem | tr -d '\n' > tls.key.b64

# Secret YAML'ı güncelleyin (base64 değerleri kopyalayın)
cat tls.crt.b64  # tls.crt değerini kopyalayın
cat tls.key.b64  # tls.key değerini kopyalayın
# infrastructure/manifests/traefik/certificates/k2-io-tls-secret.yaml dosyasını güncelleyin
```

### 3. Kind Cluster Oluşturun

```bash
# Docker'ın çalıştığından emin olun
# macOS: open -a Docker
# Linux: sudo systemctl start docker

# Kind cluster'ı oluşturun
kind create cluster --name idp --config kind-config.yaml

# Docker container'a kaynak ayırın (16GB RAM, 4 CPU)
docker update --memory=16g --memory-swap=16g --cpus=4 idp-control-plane

# Cluster bilgisini kontrol edin
kubectl cluster-info --context kind-idp
```

### 4. DNS Yapılandırması

```bash
# /etc/hosts dosyasına domain ekleyin
echo "\n# Kind local development\n127.0.0.1 traefik.local.portal.k2.io\n127.0.0.1 *.local.portal.k2.io" | sudo tee -a /etc/hosts
```

### 5. Traefik Kurulumu

```bash
# Namespace oluşturun
kubectl apply -f infrastructure/manifests/traefik/application.yaml

# TLS secret'ı oluşturun
kubectl apply -f infrastructure/manifests/traefik/certificates/k2-io-tls-secret.yaml

# Traefik Helm repo ekleyin
helm repo add traefik https://traefik.github.io/charts
helm repo update

# Traefik'i kurun
helm install traefik traefik/traefik \
  -n traefik \
  -f infrastructure/services/traefik/values.yaml

# Traefik'in çalıştığını kontrol edin
kubectl get pods -n traefik
kubectl get svc -n traefik
```

### 6. PostgreSQL Kurulumu

```bash
# Namespace ve credentials oluşturun
kubectl apply -f infrastructure/manifests/postgresql/application.yaml

# Bitnami Helm repo ekleyin (yoksa)
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# PostgreSQL'i kurun (initial DB'ler ile)
helm install postgresql bitnami/postgresql \
  -n postgresql \
  -f infrastructure/services/postgresql/values.yaml

# PostgreSQL'in çalıştığını kontrol edin
kubectl get pods -n postgresql
kubectl get svc -n postgresql

# PostgreSQL'e bağlanın (test için)
kubectl run postgresql-client --rm --tty -i --restart='Never' \
  --namespace postgresql \
  --image docker.io/bitnami/postgresql:16 \
  --env="PGPASSWORD=postgres" \
  --command -- psql --host postgresql -U postgres -d postgres -c '\l'
```

### 7. pgAdmin Kurulumu

```bash
# Namespace oluşturun
kubectl apply -f infrastructure/manifests/pgadmin/application.yaml

# TLS secret'ı pgadmin namespace'ine kopyalayın
kubectl get secret k2-io-tls -n traefik -o yaml | \
  sed 's/namespace: traefik/namespace: pgadmin/' | \
  kubectl apply -f -

# Runix pgAdmin Helm repo ekleyin
helm repo add runix https://helm.runix.net
helm repo update

# pgAdmin'i kurun
helm install pgadmin runix/pgadmin4 \
  -n pgadmin \
  -f infrastructure/services/pgadmin/values.yaml

# pgAdmin'in çalıştığını kontrol edin
kubectl get pods -n pgadmin
kubectl get svc -n pgadmin
kubectl get ingress -n pgadmin
```

### 8. DNS Yapılandırmasını Güncelleyin

```bash
# /etc/hosts'a pgadmin domain'ini ekleyin
echo "127.0.0.1 pgadmin.local.portal.k2.io" | sudo tee -a /etc/hosts
```

## Baştan Sona Kurulum Akışı

Aşağıdaki sıralama mevcut Kind ortamını tamamen temizleyip tekrar kurmanız için hazırlanmıştır. Komutlar macOS (Docker Desktop) ve Ubuntu (Docker Engine) üzerinde test edilmiştir; yalnızca Docker'ı başlatma ve `host.docker.internal` çözümlemesi Linux'ta farklılık gösterir.

1. **Temizlik** – Var olan Kind cluster'ını, kubectl context'ini ve varsa eski Helm release'lerini silin.
2. **TLS ve hosts dosyası** – `mkcert` ile wildcard sertifika oluşturun ve `/etc/hosts` girdilerini ekleyin.
3. **Cluster oluşturma** – `kind-config.yaml` kullanarak yeni cluster açın ve kaynak limitlerini güncelleyin.
4. **Traefik kurulumu** – Namespace, TLS secret ve Helm release.
5. **PostgreSQL kurulumu** – Namespace, secret ve Bitnami Helm chart'ı.
6. **pgAdmin kurulumu** – Namespace + TLS secret kopyası + Helm release.
7. **Yerel servis köprüsü** – `dev-ingress.yaml` + Vite/Go süreçleri + doğrulama.

### 1. Temizlik

```bash
# Traefik / PostgreSQL / pgAdmin release'leri cluster ayaktaysa kaldırılır
helm uninstall traefik -n traefik || true
helm uninstall postgresql -n postgresql || true
helm uninstall pgadmin -n pgadmin || true

# Kind cluster'ını silin
kind delete cluster --name idp || true

# Kubectl context/cluster kayıtlarını temizleyin
kubectl config delete-context kind-idp || true
kubectl config delete-cluster kind-idp || true
```

Docker Desktop kapalıysa açın (macOS: `open -a Docker`). Ubuntu'da `sudo systemctl start docker` ve gerekiyorsa `sudo systemctl enable docker`.

### 2. TLS ve /etc/hosts

```bash
cd infrastructure/services/traefik/certificates
mkcert "*.local.portal.k2.io" "local.portal.k2.io"
base64 -i _wildcard.local.portal.k2.io+1.pem | tr -d '\n' > tls.crt.b64
base64 -i _wildcard.local.portal.k2.io+1-key.pem | tr -d '\n' > tls.key.b64

# infrastructure/manifests/traefik/certificates/k2-io-tls-secret.yaml dosyasındaki tls.crt / tls.key alanlarını güncelleyin

# hosts girdileri
sudo tee -a /etc/hosts <<'EOS'
127.0.0.1 traefik.local.portal.k2.io
127.0.0.1 pgadmin.local.portal.k2.io
127.0.0.1 local.portal.k2.io
EOS
```

### 3. Kind Cluster Oluşturma

```bash
cd /Users/olgundutkan/Workspace/idp   # depo kökü
kind create cluster --name idp --config kind-config.yaml
docker update --memory=16g --memory-swap=16g --cpus=4 idp-control-plane
kubectl cluster-info --context kind-idp
```

Ubuntu'da çalışıyorsanız `host.docker.internal` DNS kaydı otomatik gelmez; host IP adresinizi not alın (ör. `hostname -I | awk '{print $1}'`) ve dev proxy'lerde gerekiyorsa bu adresi kullanın (bkz. Yerel Servisler bölümü).

### 4. Traefik Kurulumu

```bash
kubectl apply -f infrastructure/manifests/traefik/application.yaml
kubectl apply -f infrastructure/manifests/traefik/certificates/k2-io-tls-secret.yaml
helm repo add traefik https://traefik.github.io/charts
helm repo update
helm install traefik traefik/traefik -n traefik -f infrastructure/services/traefik/values.yaml
kubectl get pods -n traefik
kubectl get svc -n traefik
```

### 5. PostgreSQL Kurulumu

```bash
kubectl apply -f infrastructure/manifests/postgresql/application.yaml
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install postgresql bitnami/postgresql -n postgresql -f infrastructure/services/postgresql/values.yaml
kubectl get pods -n postgresql
kubectl get svc -n postgresql
```

PostgreSQL'i test etmek için:

```bash
kubectl run postgresql-client --rm --tty -i --restart='Never' \
  --namespace postgresql \
  --image docker.io/bitnami/postgresql:16 \
  --env="PGPASSWORD=postgres" \
  --command -- psql --host postgresql -U postgres -d postgres -c '\l'
```

### 6. pgAdmin Kurulumu

```bash
kubectl apply -f infrastructure/manifests/pgadmin/application.yaml
kubectl get secret k2-io-tls -n traefik -o yaml \
  | sed 's/namespace: traefik/namespace: pgadmin/' \
  | kubectl apply -f -
helm repo add runix https://helm.runix.net
helm repo update
helm install pgadmin runix/pgadmin4 -n pgadmin -f infrastructure/services/pgadmin/values.yaml
kubectl get pods -n pgadmin
kubectl get ingress -n pgadmin
```

### 7. Yerel Servis Köprüsü ve Doğrulama

```bash
# Proxy pod'larını ve IngressRoute'u oluşturur
kubectl apply -f dev-ingress.yaml

# Pod durumlarını kontrol edin
kubectl get pods -n default
```

`idp-frontend-proxy` ve `idp-backend-proxy` pod'ları `1/1` READY olduktan sonra host makinede geliştirme süreçlerinizi çalıştırın:

```bash
# Backend
cd development/idp-backend
go run .

# Frontend
cd development/idp-frontend
npm install          # ilk seferde
npm run start:dev
```

Linux ortamında `host.docker.internal` çözülmezse proxy deployment'larında `LOCAL_DEV_HOST` ortam değişkenini gerçek IP'nizle güncelleyin ve rollout yapın:

```bash
kubectl set env deployment/idp-backend-proxy LOCAL_DEV_HOST=192.168.1.23
kubectl set env deployment/idp-frontend-proxy LOCAL_DEV_HOST=192.168.1.23
kubectl rollout restart deployment/idp-backend-proxy
kubectl rollout restart deployment/idp-frontend-proxy
```

Ardından tarayıcıdan erişim:

- Backend health: `https://local.portal.k2.io/idp-backend/health`
- Frontend: `https://local.portal.k2.io/idp-frontend/`
- Traefik dashboard: `https://traefik.local.portal.k2.io`
- pgAdmin: `https://pgadmin.local.portal.k2.io`

Sorun yaşarsanız `kubectl logs deployment/idp-*-proxy -n default` komutları ile bağlantı hatalarını hızlıca görebilirsiniz.

## Erişim

- **Traefik Dashboard**: https://traefik.local.portal.k2.io
- **pgAdmin**: https://pgadmin.local.portal.k2.io (admin@k2.io / secret)
- **PostgreSQL**: localhost:30432 (postgres / postgres)
- **HTTP**: http://localhost:80
- **HTTPS**: https://localhost:443
- **Traefik API**: http://localhost:9000

### pgAdmin ile PostgreSQL'e Bağlanma

pgAdmin Helm chart'ı varsayılan olarak `admin@k2.io / secret` kimlik bilgileriyle gelir. Postgres tarafında ayrıca süper kullanıcı haklarına sahip `admin / secret` rolü otomatik oluşturulur. Bağlantıyı eklemek için:

1. https://pgadmin.local.portal.k2.io adresine gidin ve `admin@k2.io / secret` ile giriş yapın.
2. Sol menüde **Servers** ➜ **Register** ➜ **Server...** seçin.
3. **General** sekmesinde bağlantıya bir ad verin (ör. `Kind PostgreSQL`).
4. **Connection** sekmesinde şu değerleri girin:
   - **Host name/address**: `postgresql.postgresql.svc.cluster.local`
   - **Port**: `5432`
   - **Maintenance database**: `postgres`
   - **Username**: `admin`
   - **Password**: `secret`
5. Kaydettikten sonra pgAdmin üzerinden tüm veritabanlarını yönetebilirsiniz.

> `admin / secret` rolünün oluşturulması için PostgreSQL release'ini bu repo ile gelen güncel `values.yaml` dosyasıyla kurmanız gerekir. Daha önce kurduysanız aşağıdaki upgrade komutunu bir kez çalıştırıp pod'un yeniden ayağa kalkmasını bekleyin:
>
> ```bash
> helm upgrade postgresql bitnami/postgresql \
>   -n postgresql \
>   -f infrastructure/services/postgresql/values.yaml
> ```

Yerel makinenizden doğrudan bağlanmak isterseniz NodePort `localhost:30432` üzerinden aynı `admin / secret` kullanıcı/parolasını kullanabilirsiniz.

## Yerel IDP Servisleri ile Çalışmak

Cluster içindeki Traefik üzerinden yerelde çalışan servislerinize erişmek için `dev-ingress.yaml` dosyası, host makinenizdeki Vite ve Go süreçlerine proxy yapan hafif Nginx pod'ları oluşturur.

```bash
# Proksi Deployment'larını ve IngressRoute'u oluşturun
kubectl apply -f dev-ingress.yaml
```

### 1. IDP Backend (Go + Gin)

```bash
cd development/idp-backend
go mod tidy         # İlk kurulumda bağımlılıkları çekin
DB_HOST=localhost \
DB_PORT=30432 \
DB_USER=idp_user \
DB_PASSWORD=idp_pass \
DB_NAME=idp \
PORT=3001 \
go run .
```

Varsayılan değerler zaten bu ayarlara işaret ettiği için sadece `go run .` komutu çoğu durumda yeterlidir. Uygulama `http://0.0.0.0:3001` adresinde dinler ve Traefik üzerinden `https://local.portal.k2.io/idp-backend` yoluna bağlanır. Sağlık kontrolü: `https://local.portal.k2.io/idp-backend/health`.

### 2. IDP Frontend (React + Vite)

```bash
cd development/idp-frontend
npm install
npm run start:dev
```

Geliştirme sunucusu `0.0.0.0:3000` üzerinde açılır ve Traefik üzerinden `https://local.portal.k2.io/idp-frontend/` adresinden ulaşabilirsiniz. Vite proxy ayarı `https://local.portal.k2.io/idp-backend` yolundaki istekleri otomatik olarak backend'e aktarır.

### 3. Host Erişimi Hakkında Notlar

- Proxy pod'ları varsayılan olarak `host.docker.internal` adresine bağlanır. Linux üzerinde bu isim çözümlenmiyorsa gerçek host IP adresinizi kullanmak için aşağıdaki gibi ortam değişkenini güncelleyebilirsiniz:

  ```bash
  kubectl set env deployment/idp-backend-proxy LOCAL_DEV_HOST=192.168.1.5
  kubectl set env deployment/idp-frontend-proxy LOCAL_DEV_HOST=192.168.1.5
  kubectl rollout restart deployment/idp-backend-proxy
  kubectl rollout restart deployment/idp-frontend-proxy
  ```

- Frontend'e doğrudan Vite üzerinden erişmek isterseniz `http://localhost:3000/idp-frontend/` adresini kullanın (taban yolu `/idp-frontend/` olarak ayarlandı).

### PostgreSQL Veritabanları

Otomatik oluşturulan veritabanları:
- `postgres` - Varsayılan DB (postgres / postgres)
- `hydra` - Hydra DB (hydra_user / hydra_pass)
- `infra` - Infrastructure DB (infra_user / infra_pass)
- `idp` - IDP DB (idp_user / idp_pass)

## Cluster Yönetimi

### Cluster'ı Durdurun

```bash
kind delete cluster --name idp
```

### Cluster'ı Yeniden Başlatın

```bash
# Cluster'ı yeniden oluşturun
kind create cluster --name idp --config kind-config.yaml
docker update --memory=16g --memory-swap=16g --cpus=4 idp-control-plane

# Traefik'i yeniden kurun
kubectl apply -f infrastructure/manifests/traefik/application.yaml
kubectl apply -f infrastructure/manifests/traefik/certificates/k2-io-tls-secret.yaml
helm install traefik traefik/traefik -n traefik -f infrastructure/services/traefik/values.yaml

# PostgreSQL'i yeniden kurun
kubectl apply -f infrastructure/manifests/postgresql/application.yaml
helm install postgresql bitnami/postgresql -n postgresql -f infrastructure/services/postgresql/values.yaml

# pgAdmin'i yeniden kurun
kubectl apply -f infrastructure/manifests/pgadmin/application.yaml
kubectl get secret k2-io-tls -n traefik -o yaml | sed 's/namespace: traefik/namespace: pgadmin/' | kubectl apply -f -
helm install pgadmin runix/pgadmin4 -n pgadmin -f infrastructure/services/pgadmin/values.yaml
```

### Traefik'i Güncelleme

```bash
# Values.yaml'da değişiklik yaptıktan sonra
helm upgrade traefik traefik/traefik \
  -n traefik \
  -f infrastructure/services/traefik/values.yaml

# Veya yeniden kurun
helm uninstall traefik -n traefik
helm install traefik traefik/traefik -n traefik -f infrastructure/services/traefik/values.yaml
```

## Proje Yapısı

```
idp/
├── infrastructure/
│   ├── manifests/              # Kubernetes manifests
│   │   ├── traefik/
│   │   │   ├── application.yaml           # Namespace
│   │   │   └── certificates/
│   │   │       └── k2-io-tls-secret.yaml  # TLS secret (base64)
│   │   ├── postgresql/
│   │   │   └── application.yaml           # Namespace + Credentials
│   │   └── pgadmin/
│   │       └── application.yaml           # Namespace
│   └── services/               # Helm values
│       ├── traefik/
│       │   ├── certificates/              # Raw PEM files (gitignore)
│       │   │   ├── _wildcard.local.portal.k2.io+1.pem
│       │   │   └── _wildcard.local.portal.k2.io+1-key.pem
│       │   └── values.yaml                # Helm values
│       ├── postgresql/
│       │   └── values.yaml                # PostgreSQL Helm values + Init DBs
│       └── pgadmin/
│           └── values.yaml                # pgAdmin Helm values
├── development/                # Uygulama servisleri
│   └── service-1/             # Örnek servis
├── kind-config.yaml           # Kind cluster yapılandırması
├── .gitignore
└── README.md
```

## Port Mapping

Kind cluster, aşağıdaki portları host makineye expose eder:

- `30080` → `80` (HTTP)
- `30443` → `443` (HTTPS)
- `30808` → `9000` (Traefik Dashboard)
- `30432` → `30432` (PostgreSQL NodePort)

## Notlar

- Sertifika dosyaları (`.pem`, `.key`, `.b64`) `.gitignore`'a eklenmiştir ve commit edilmemelidir
- mkcert ile oluşturulan sertifikalar 3 ay geçerlidir, süre dolduğunda yeniden oluşturun
- Kind cluster Docker container olarak çalıştığı için, Docker Desktop çalışır durumda olmalıdır

## Sorun Giderme

### Docker bağlantı hatası

```bash
# Docker'ın çalıştığını kontrol edin
docker ps

# Çalışmıyorsa başlatın
# macOS:
open -a Docker

# Linux:
sudo systemctl start docker
sudo systemctl enable docker  # Otomatik başlatma için
```

### Port zaten kullanımda

```bash
# Portları kullanan process'leri kontrol edin
lsof -i :80
lsof -i :443
lsof -i :9000

# Kind cluster'ı yeniden başlatın
kind delete cluster --name idp
kind create cluster --name idp --config kind-config.yaml
```

### Sertifika hatası

```bash
# mkcert CA'sını yeniden yükleyin
mkcert -install

# Yeni sertifika oluşturun
cd infrastructure/services/traefik/certificates
mkcert "*.local.portal.k2.io" "local.portal.k2.io"

# Secret'ı güncelleyin ve Traefik'i yeniden başlatın
kubectl delete secret k2-io-tls -n traefik
kubectl apply -f infrastructure/manifests/traefik/certificates/k2-io-tls-secret.yaml
kubectl rollout restart deployment traefik -n traefik
```

### Traefik dashboard'a erişilemiyor

```bash
# Pod'ların durumunu kontrol edin
kubectl get pods -n traefik
kubectl logs -n traefik -l app.kubernetes.io/name=traefik

# Service'i kontrol edin
kubectl get svc -n traefik

# Port forwarding ile test edin
kubectl port-forward -n traefik svc/traefik 9000:9000
# Tarayıcıda http://localhost:9000 açın
```

## Temizleme / Uninstall

```bash
# Helm release'lerini kaldırın (yoksa hata vermezler)
helm uninstall traefik -n traefik || true
helm uninstall postgresql -n postgresql || true
helm uninstall pgadmin -n pgadmin || true

# Namespace'leri temizlemek isterseniz
kubectl delete ns traefik postgresql pgadmin --ignore-not-found

# Yerel proxy kaynaklarını kaldırın
kubectl delete -f dev-ingress.yaml --ignore-not-found

# Kind cluster'ı tamamen silin
kind delete cluster --name idp || true

# Kubectl context/cluster kayıtlarını silin
kubectl config delete-context kind-idp || true
kubectl config delete-cluster kind-idp || true

# /etc/hosts'tan domain'leri kaldırın
sudo sed -i '' '/local.portal.k2.io/d' /etc/hosts    # macOS
# Ubuntu:
# sudo sed -i '/local.portal.k2.io/d' /etc/hosts
```
