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

## Erişim

- **Traefik Dashboard**: https://traefik.local.portal.k2.io
- **HTTP**: http://localhost:80
- **HTTPS**: https://localhost:443
- **Traefik API**: http://localhost:9000

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
│   │   └── traefik/
│   │       ├── application.yaml           # Namespace
│   │       └── certificates/
│   │           └── k2-io-tls-secret.yaml  # TLS secret (base64)
│   └── services/               # Helm values
│       └── traefik/
│           ├── certificates/              # Raw PEM files (gitignore)
│           │   ├── _wildcard.local.portal.k2.io+1.pem
│           │   └── _wildcard.local.portal.k2.io+1-key.pem
│           └── values.yaml                # Helm values
├── services/                   # Uygulama servisleri
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

## Temizleme

```bash
# Cluster'ı tamamen silin
kind delete cluster --name idp

# /etc/hosts'tan domain'i kaldırın (manuel)
sudo nano /etc/hosts
# "# Kind local development" altındaki satırları silin
```
