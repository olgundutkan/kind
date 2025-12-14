## Slide 1 – Internal Developer Platform Portal
**Slide Content**
- Internal Developer Platform (IDP) Portal – Proje Kabul Sunumu
- Hazırlayan: <Takım/İsim>, Tarih
**Speaker Notes**
- Portala neden ihtiyaç duyduğumuzu ve bugünkü kararın önemini kısaca vurgulayın.

## Slide 2 – Gündem
**Slide Content**
- Vizyon & misyon + DevOps’tan platform engineering’e geçiş ihtiyacı
- Mevcut süreç, KPI boşlukları, otomasyon seviyesi
- IDP çözümü: vizyon, geliştirici yolculuğu, olgunluk hedefleri
- Platform bileşenleri, güvenlik & observability, ölçüm & ritüeller, operasyon modeli, yol haritası, kaynakça
**Speaker Notes**
- Dinleyiciye önce vizyon/misyon üzerinden ortak hedefi, ardından bugünkü durum/KPI açığını, devamında IDP çözüm tasarımını ve son olarak ölçüm, operasyon + yol haritasını anlatacağınızı belirtin.
- Her bölümde cevaplayacağınız soruları önden paylaşın (neden ihtiyaç var, nasıl çözüyoruz, hangi adımlarda desteğe ihtiyacımız var) ki dinleyici beklentisini yönetin.

## Slide 3 – Vizyon & Misyon
**Slide Content**
- Vizyon: İç müşterilerin ihtiyaç duydukları her teknolojiye erişip kendi başlarına yönetebilecekleri, yeniden kullanılabilir ve müşteri odaklı bir platform
- Misyon: Modern open source & cloud native teknolojileri araştırmak, tecrübemizle iç müşteri ve KKST projelerinin altyapı ihtiyaçlarını maliyet etkin şekilde analiz tasarım ve uygulamak
- “Tek çatı”, self-service, sürekli iyileştirme kültürü
**Speaker Notes**
- Vizyon cümlesinin “havelsan KKST yazılım geliştirme süreçlerini ortak çatıya toplama” amacını vurgulayın; hem hız hem standartlaşma hedeflediğimizi belirtin.
- Misyonu üç aksa bölerek anlatın: (1) teknoloji tarama & yetkinlik kazanma, (2) iç müşterinin altyapı ihtiyacını analiz/tasarlama, (3) bunu maliyet-etkin operasyonla sürekli kılma.
- Vizyon/misyonun IDP ürününün sadece teknik değil kültürel dönüşüm sunduğunu göstermesini sağlayın; “platform bir ürün gibi yönetilecek, kullanıcı geri bildirimiyle sürekli iyileşecek” mesajını tekrarlayın.

## Slide 4 – DevOps’tan Platform Engineering’e Geçiş (WJAETS 2025)
**Slide Content**
- DevOps siloları kırdı ancak yüzlerce mikroservis/multi-cloud ortamında bilişsel yük ve yönetişim sorunları büyüyor
- Platform engineering, IDP’lerle konfigürasyon, provizyon, pipeline, observability ve security’yi self-service katmanda standartlaştırıyor
- Spotify, Netflix, Capital One vaka çalışmaları: release sıklığı artışı, compliance ve güvenlikte dramatik iyileşme
**Speaker Notes**
- “The future of platform engineering: From DevOps to IDPs” (World Journal of Advanced Engineering Technology and Sciences, 2025 – https://journalwjaets.com/sites/default/files/fulltext_pdf/WJAETS-2025-0783.pdf) makalesinden referans verin; DevOps’un ölçek sorunlarını ve platform engineering’in nasıl cevap verdiğini anlatın.
- IDP’lerin 5 çekirdek bileşenini (konfig yönetimi, provizyon, pipeline, observability, security) tek çatı altında topladığını vurgulayın; HAVELSAN IDP’nin de aynı mimari yaklaşımı izlediğini bağlayın.
- Spotify/Backstage, Netflix/Spinnaker, Capital One gibi örneklerin release sıklığı, time-to-market ve compliance üzerindeki etkilerini kısaca aktarın; “biz de aynı değer zincirini hedefliyoruz” mesajını verin.

## Slide 5 – Mevcut Süreç: Ticket-Ops
**Slide Content**
- Talepler Jira/ServiceNow ticket’larıyla ilerliyor
- VM/cluster sağlama süresi: 3-5 gün, 4 ayrı onay
- Bilgi erişimi silo’larda, dökümantasyon dağınık
**Speaker Notes**
- Bugünkü geliştirici yolculuğunu 1-2 örnekle anlatın; talep aç → ağ/sunucu ekibi bekle → manuel script → tekrar onay döngüsünde geçen süreyi rakamlandırın.
- “Bir mikroservisin prod’a çıkması 9 adım, 6 farklı ekip” gibi çarpıcı sayılar paylaşın.

## Slide 6 – İhtiyaç & KPI Etkisi
**Slide Content**
- Lead time: 18 güne kadar uzuyor, MTTR > 12 saat
- Ticket backlog > 120, yıl sonunda 2000’i geçme riski
- Shadow IT / manuel script artışı → audit boşlukları
**Speaker Notes**
- KPI’ları şirket hedefleriyle ilişkilendirin: TTM uzadığı için gelir/gecikme etkisi, MTTR uzun olduğu için saha operasyonlarının riske girmesi.
- “3 güne inen provisioning süreleri” veya “deployment sıklığı 5× artışı” gibi hedef metrikleri kontrastlayın.

## Slide 7 – Otomasyon Seviyesi
**Slide Content**
- Provisioning: %30 otomasyon, script + manuel kablo
- Observability: ayrı araçlarda, self-service yok
- Güvenlik/uyumluluk: ticket onayıyla kontrol
**Speaker Notes**
- Otomasyonun hangi aşamada kırıldığına (ör. network, sertifika, log erişimi) ve sonuçlarına (bekleme, hatalar, audit riski) vurgu yapın.
- Bu slaytı Slide 4’teki KPI hedefleriyle bağlayın: otomasyon boşlukları kapanmazsa KPI’lar iyileşmez.
- WJAETS 2025 makalesinde anlatıldığı gibi, büyük ölçekli DevOps uygulamalarında manuel adımlar arttıkça bilişsel yük ve koordinasyon maliyeti patlıyor; IDP’ye yatırım bu kırılma noktalarını kapatmak için gerekli.

## Slide 8 – IDP Vizyonu
**Slide Content**
- Tek portal: self-service provisioning, katalog, ölçümler
- Guardrail + template yaklaşımı
- Platform ekipleri için merkezi “product” zihniyeti
- WJAETS 2025’te tanımlanan 5 çekirdek yetkinlik: konfig yönetimi, provizyon, pipeline, observability, security & compliance
**Speaker Notes**
- IDP’nin sadece UI değil, süreç ve rol değişimini desteklediğini açıklayın.
- Guardrail kavramını örnekleyin: hazır şablonlar, policy-as-code kontrolleri, otomatik güvenlik testleri → hız + güvenlik birlikte.
- Makaledeki 5 temel bileşeni HAVELSAN IDP yol haritasıyla eşleştirin; her bileşen için hangi modülün tamamlandığını ve sırada ne olduğunu söyleyin.

## Slide 9 – Geliştirici Yolculuğu & Servis Kataloğu
**Slide Content**
- Servis kataloğu: Kubernetes cluster, veritabanı, secret store, medya servisi, CI/CD pipeline
- Self-service form → policy kontrol → otomatik provisioning
- SLA/SLO’lar: VM < 2 saat, database < 30 dk, sertifika < 5 dk
**Speaker Notes**
- “Portal → katalog → form doldur → Vault/OPA kontrol → Terraform/Ansible tetiklenir → GitOps repo açılır” şeklinde uçtan uca yolculuğu anlatın.
- Her servis için sahip ekip, maliyet merkezi ve yaşam döngüsü sorumluluklarını katalogda gösterdiğinizi vurgulayın.

## Slide 10 – IDP Olgunluk Seviyesi
**Slide Content**
- CNCF Platform Maturity: Seviye 2 → Seviye 3’e geçiş
- Hedef: 6 ayda otomasyon kapsamını %70’e çıkarmak
- Ölçüm: provisioning lead time, template adoption, DX anketi
**Speaker Notes**
- Olgunluğu CNCF Platform Maturity Model’e göre ölçtüğünüzü vurgulayın; eksik kalan kriterleri (self-service katalog, ölçülebilir DX, guardrail’ler) bu çeyrekte kapatacağınızı söyleyin.
- KPI’ların nasıl takip edilip raporlanacağını anlatın; metriklerin çeyreklik rapora gireceğini söyleyin.

## Slide 11 – IDP Olursa Ne Değişecek?
**Slide Content**
- Provisioning süresi saatlere inecek (VM 3 gün → 2 saat)
- Tek tıkla ortam + GitOps template’leri
- Developer experience ölçülebilir hâle gelecek
**Speaker Notes**
- Somut hikâye anlatın: Geliştirici portalda servisi seçiyor → template formu dolduruyor → otomatik policy check/pipeline tetikleniyor → birkaç saat içinde ortam ve git repo hazır.
- Observability dashboard’ında deployment frequency, lead time, incident MTTR, DX anket sonuçları gibi metriklerin takip edileceğini anlatın.

## Slide 12 – IDP Olmazsa Kaybedilenler
**Slide Content**
- Ticket kuyrukları büyür, TTM uzar
- Shadow IT ve manuel script artışı
- Platform ekipleri “reaktif” kalır
**Speaker Notes**
- Olmazsa senaryosunu rakamlarla çizin: “Ticket sırası 2 hafta sürmeye devam ederse yıl sonu backlog 2000 ticket’a çıkıyor”; “manuel script’ler nedeniyle onay dışı değişiklik sayısı %X artıyor”.
- Security/compliance kayıplarını (audit log yokluğu, izinsiz ortamlar) özellikle belirtin.

## Slide 13 – Dünyadan Örnekler
**Slide Content**
- Spotify Backstage: onboarding süresi %40 düştü
- Zalando STUPS: self-service compliance
- Humanitec DevOps Benchmark 2023: Top takımların %93’ü Platform-as-a-Product yaklaşımıyla kurulan IDP kullanıyor; düşük performanslıların %53’ü hâlâ ticket-ops modelinde
- “The future of platform engineering: From DevOps to IDPs” (World Journal of Advanced Engineering Technology and Sciences, 2025) – Spotify, Netflix, Capital One vaka analizleriyle IDP’nin hız, güvenlik, compliance faydalarını gösteriyor
- Internal örnek: X şirketi – IDP sonrası deployment 5× arttı
**Speaker Notes**
- Örnekleri kısa tutup “benzer sonuçları hedefliyoruz” mesajını verin; dinleyicinin “bu kanıtlanmış bir yaklaşım” demesini sağlayın.
- Humanitec DevOps Benchmark 2023 (https://humanitec.com/whitepapers/devops-benchmarking-study-2023)’te paylaşılan grafikte, en yüksek performanslı takımların %93’ünün platform ekibi tarafından yönetilen IDP/self-service modeliyle çalıştığı, düşük performanslıların %53’ünün ise hâlâ ticket-ops modeline bağımlı olduğu vurgulanıyor. Bu görseli kullanarak IDP vizyonunun başarıyla direkt ilişkili olduğunu anlatın.
- “The future of platform engineering: From DevOps to internal developer platforms (IDPs)” makalesinin (https://journalwjaets.com/sites/default/files/fulltext_pdf/WJAETS-2025-0783.pdf) öne çıkan noktalarını özetleyin: DevOps’un ölçeklenme sorunları, IDP’nin konfigürasyon/provizyon/pipeline/observability/security bileşenleri ve Spotify/Netflix/Capital One örnekleriyle sağlanan KPI iyileşmeleri.

## Slide 14 – Portal Bileşenleri & Entegrasyonlar
**Slide Content**
- GitOps repo & template yönetimi (ArgoCD/Flux)
- Kubernetes + Traefik + PostgreSQL + MinIO entegrasyonları
- AuthN/AuthZ (ORY Hydra, OPA), audit log pipeline
**Speaker Notes**
- Diyagram gösterme imkânınız varsa burada kullanın; bugün hangi entegrasyonlar hazır (Vault, Cert-Manager, Kafka, eBPF CNI, CSI, Edge cluster) onları sıralayın.
- Servislerin NATO uyumluluğu (NAF, FMN Spiral 6, OCI standartları) ve kalite standardı (ISO/IEC 25010) ile ilişkilendirildiğini belirtin.
- WJAETS 2025 makalesindeki “IDP çekirdek bileşenleri” tablosunu referans alarak her entegrasyonun hangi yetkinliği güçlendirdiğini anlatın; bu kaynakla teknolojik seçimlerinizin bilimsel dayanağını gösterin.

## Slide 15 – Güvenlik & Uyumluluk Kanıtları
**Slide Content**
- Defense-in-depth: ORY Hydra + OPA + Vault + Cert-Manager
- Veri güvenliği: MongoDB/PostgreSQL/S3 şifreleme, KV secret store
- NATO FMN Spiral 6, OCI spec, ISO/IEC 25010 uyumluluğu
**Speaker Notes**
- Otantikasyon (Hydra), yetkilendirme (OPA), sertifika yönetimi (Vault + Cert-Manager + Trust Manager), secret dağıtımı (External Secrets) ve log/audit zincirini anlatın.
- “Policy as code” yaklaşımıyla guardrail’lerin otomatik çalıştığını ve audit trail’in merkezi toplandığını vurgulayın.
- WJAETS 2025 araştırmasının ortaya koyduğu gibi, güvenlik entegre IDP’lerde kritik zafiyetler prod öncesi yakalanıyor; bu referansla entegre scanner/policy kontrollerinizin etkisini destekleyin.

## Slide 16 – Observability & Ölçülebilir DX
**Slide Content**
- Loglama, metric, tracing platformu → tek panel
- Saha kurulumları için veri replikasyonu ve sağlık göstergeleri
- DX anketi, portal NPS, self-service adoption oranları
**Speaker Notes**
- Hangi tool’ların/devreye alındığını (Prometheus/Grafana/ELK vb.) ve kullanıcıya nasıl self-service erişim vereceğinizi anlatın.
- MTTR, incident sayısı, template kullanım oranı gibi metriklerin portalda yer aldığı dashboard’ı tarif edin; bu verilerin yönetim toplantılarında kullanılacağını söyleyin.
- WJAETS 2025 bulgularına göre, platform seviyesinde gömülü observability MTTD’yi saatlerden dakikalara indiriyor; bu sayıyı paylaşarak yatırımın risk azaltıcı etkisini destekleyin.

## Slide 17 – Başarıyı Nasıl Ölçüyoruz?
**Slide Content**
- DORA metrikleri: deployment frequency, lead time, MTTR, change failure rate (Hedef: Elite seviye)
- Developer Experience KPI’ları: time-to-first deployment, DX anket skoru, self-service ratio
- Platform adoption: template kullanım oranı, aktif servis kataloğu kayıtları, portal NPS
- Kaynaklar: Humanitec DevOps Benchmark 2023, WJAETS 2025, State of Platform Engineering
**Speaker Notes**
- Yönetimle paylaştığınız KPI tablosunda DORA metriklerini ve DX/adoption göstergelerini nasıl takip ettiğinizi açıklayın; hedef seviyeleri ve mevcut baz değerlerinizi belirtin.
- Humanitec raporundaki %93 IDP korelasyonunu ve WJAETS 2025’in MTTD/operasyonel iyileşme bulgularını referans vererek metriklerin neden kritik olduğunu anlatın.
- Ölçüm boşluklarını kapatmak için kurduğunuz telemetry/analytics altyapısını ve raporlama ritmini (ör. aylık portal raporu, çeyreklik DX anketi) paylaşın.

## Slide 18 – Platform as a Product Ritüelleri
**Slide Content**
- Developer araştırmaları: üç ayda bir görüşme/anket, SDLC haritalama
- Roadshow & office hours: haftalık destek oturumları, portal demo’ları
- Feedback → roadmap döngüsü: feature scorecard, adoption telemetry, DX NPS
- İç iletişim: release note, kullanım rehberleri, topluluk kanalları
**Speaker Notes**
- WJAETS 2025 ve Platform Engineering rehberindeki “ürün zihniyeti” vurgusunu HAVELSAN pratiğine bağlayın; platform ekibinin ürün yöneticisi gibi çalıştığını anlatın.
- Bu ritüellerin adoption ve değişim yönetimi için kritik olduğunu, sponsor desteğinin (ör. developer zamanını ayırma) gerektiğini belirtin.
- Office hours ve roadshow’larda topladığınız geri bildirimleri nasıl aksiyona çevirdiğinize dair kısa örnekler verin.

## Slide 19 – Operasyon Modeli & Adoption Plan
**Slide Content**
- Platform ekibi rolleri: Product owner, SRE, DX coach
- RACI: portal ekibi (build/run), proje ekipleri (consume), güvenlik (policy)
- Onboarding: ilk 90 gün – eğitim, şablon migrasyonu, destek SLA’sı
**Speaker Notes**
- Destek modeli (L2 platform, L3 ürün takımı), kapasite planı ve destek araçlarını (chatops, runbook) açıklayın.
- Finans/maliyet paylaşımı modelini ve pilot → genişleme sürecini anlatın; adoption KPI’larını (aktif kullanıcı, servis isteği sayısı) paylaşın.

## Slide 20 – Yol Haritası
**Slide Content**
- Now (Q1): Otomatik K8s provisioning, policy-as-code, medya server, edge cluster
- Next (Q2): Geliştirici ölçüm panelleri, AI destekli rehber, veri replikasyonu ekranları
- Later (Q3): Tam otomasyon (servis lifecycle), saha kurulum & sürümleme otomasyonu
**Speaker Notes**
- Her fazın bağımlılıklarını ve NATO uyumluluğu gibi dış gereksinimleri hatırlatın.
- Sponsorların hangi fazda destek vermesi gerektiğini belirtin; örneğin Q2’de ek bütçe/veri lisansları, Q3’de saha entegrasyon ekipleri.

## Slide 21 – Beklentiler & Karar
**Slide Content**
- Portal’ın şirket standardı olarak onaylanması
- Platform ekibi için ek kapasite / bütçe
- Pilot → geniş çaplı roll-out takvimi
**Speaker Notes**
- Hangi kararı istediğinizi net söyleyin; onay çıkarsa “next step” olarak ne yapacağınızı (ör. Q1 içinde 3 pilot ekip, governance konseyine aylık rapor) anlatın.
- Kararı özetlerken KPI’ları tekrar hatırlatın: “Onayla birlikte 6 ayda provisioning süresi %80 kısalacak, MTTR yarıya inecek” gibi güçlü kapanış yapın.

## Slide 22 – Kaynakça
**Slide Content**
- Humanitec DevOps Benchmarking Study 2023 – https://humanitec.com/whitepapers/devops-benchmarking-study-2023
- “The future of platform engineering: From DevOps to IDPs” – World Journal of Advanced Engineering Technology and Sciences (2025) – https://journalwjaets.com/sites/default/files/fulltext_pdf/WJAETS-2025-0783.pdf
- State of Platform Engineering Report / Platform Engineering community (2025)
- DORA “2023 State of DevOps Report” – https://cloud.google.com/blog/products/devops-sre/announcing-the-2023-state-of-devops-report
- “From DevOps to Platform Engineering: Essential skills for building IDPs” – Platformengineering.org (2025)
- “5 Real-World DevOps Case Studies” – Mihir Popat (2025) – Medium
**Speaker Notes**
- Slaytta yer alan kaynakların sunum boyunca referans verdiğiniz metriklerin dayanağı olduğunu vurgulayın; gerekirse yönetimle paylaşılacak ek dokümanlar hazırladığınızı belirtin.
- Bu listeye şirket içi raporlarınızı (pilot sonuçları, KPI tabloları) ekleyebileceğinizi söyleyerek güvenilirlik katmanını güçlendirin.
