## Slide 1 – Internal Developer Platform Portal
**Slide Content**
- Internal Developer Platform (IDP) Portal – Proje Kabul Sunumu
- Hazırlayan: <Takım/İsim>, Tarih
**Speaker Notes**
- Portala neden ihtiyaç duyduğumuzu ve bugünkü kararın önemini kısaca vurgulayın.

## Slide 2 – Gündem
**Slide Content**
- Mevcut durum & sorunlar
- Otomasyon seviyesi ve IDP vizyonu
- Sektör örnekleri, entegrasyonlar, yol haritası
**Speaker Notes**
- Sunumu üç blokta kurguladığınızı söyleyin: (1) bugün karşılaştığımız problemler, (2) IDP ile hedeflediğimiz otomasyon ve kattığı değer, (3) dünyadaki örnekler + entegrasyon durumu + yol haritası.
- Her bölümde cevaplayacağınız soruları önden paylaşın (neden ihtiyaç var, nasıl çözüyoruz, hangi adımlarda desteğe ihtiyacımız var) ki dinleyici beklentisini yönetin.

## Slide 3 – Mevcut Süreç: Ticket-Ops
**Slide Content**
- Talepler Jira/ServiceNow ticket’larıyla ilerliyor
- Bekleme süresi: X gün, manuel onay bağımlılığı
- Bilgi erişimi silo’larda
**Speaker Notes**
- Şu anki süreçte geliştiricinin yaşadığı tipik bir yolculuğu 1-2 örnekle anlatın; veriniz varsa paylaşın.

## Slide 4 – Otomasyon Seviyesi
**Slide Content**
- Provisioning: %30 otomasyon (script + manuel adımlar)
- Observability: ayrı araçlarda, self-service yok
- Güvenlik/uyumluluk: ticket onayıyla kontrol
**Speaker Notes**
- Otomasyonun hangi aşamada kırıldığına ve sonuçlarına (bekleme, hatalar) vurgu yapın.

## Slide 5 – IDP Vizyonu
**Slide Content**
- Tek portal: self-service provisioning, katalog, ölçümler
- Guardrail + template yaklaşımı
- Platform ekipleri için merkezi “product” zihniyeti
**Speaker Notes**
- IDP’nin sadece UI değil, süreç ve rol değişimini desteklediğini açıklayın.
- “Guardrail” kavramı, geliştiricinin hareket alanını tamamen kısıtlamadan onu güvenli ve doğru çerçevede tutacak otomatik kurallar/donanımlar anlamına geliyor. IDP bağlamında guardrail’ler, mesela hazır şablonlar, policy-as-code kontrolleri veya otomatik güvenlik testleri gibi mekanizmalarla “doğru” yolu önceden tanımlayarak hem hız hem güvenlik sağlar. Yani serbestçe ilerlerken yoldan çıkmamanı sağlayan bariyerler gibi düşünebilirsin.****

## Slide 6 – IDP Olgunluk Seviyesi
**Slide Content**
- CNCF Platform Maturity: Seviye 2 → Seviye 3’e geçiş
- Hedef: 6 ayda otomasyon kapsamını %70’e çıkarmak
**Speaker Notes**
- Olgunluğu CNCF Platform Maturity Model’e göre ölçtüğünüzü vurgulayın: Seviye 2 “temel otomasyon + platform takımı” anlamına geliyor, Seviye 3 ise self-service katalog, guardrail, ölçülebilir DX gibi özellikleri içeriyor.
- Hedeflediğiniz %70 otomasyonun hangi alanlardan geleceğini (provisioning, policy, observability) ve bu metriklerin nasıl takip edileceğini anlatın; böylece “yalnızca his” değil ölçülebilir bir yol haritası sunduğunuzu gösterin.
- CNCF Platform Maturity Model, Cloud Native Computing Foundation’ın platform ekipleri için hazırladığı bir olgunluk rehberi. Platform yönelik yetkinlikleri (self-service, standardizasyon, otomasyon, ürünleşme vb.) birkaç seviyeye ayırıyor. Özetle: Level 0-1: Dağınık araçlar, manuel süreçler; henüz platform zihniyeti yok.
Level 2: Platform ekibi kurulmuş, ortak servisler/şablonlar var ama hâlâ belli noktalar manuel (örneğin ticket tabanlı provisioning).
Level 3: Self-service katalog, guardrail’ler (policy-as-code, template) ve ölçülebilir developer experience var; onboarding ve operasyon büyük ölçüde otomatik.
Level 4-5: Platform “product” gibi yönetiliyor, metrikler sürekli optimize ediliyor, platform tüketicilerinden düzenli feedback alınıyor, advanced automation (finops, AI destekli süreçler) devrede.
Nasıl ölçebilirsiniz?
- Soruları/Checklist’i indir: CNCF’nin yayınladığı PDF’de her seviye için “katalog var mı?”, “guardrail tanımlı mı?”, “self-service ne ölçüde?” gibi sorular listeleniyor.
Her boyutu puanla: Örneğin “Provisioning”, “Observability”, “Security & Compliance”, “Developer Experience” gibi alanlarda 0–3 arası puan ver.
Eksikleri belirle: Puanı düşük alanları, hedeflenen seviye için olmazsa olmaz maddelere göre iyileştirme backlog’una al.
Takip et: KPI’lar belirle (ör. provisioning süresi, self-service adoption oranı, template kullanımı, DX anket skoru) ve çeyreksel olarak bu metrikleri ölç; olgunluk seviyesine geçişi bu metriklerdeki değişimle eşleştir.
Kısacası, modeli bir “gap analizi” çerçevesi gibi kullanıp her kriteri 0–3 puanlayarak nerede olduğunuzu, hangi eksikleri kapatınca seviye atlayacağınızı görebilirsiniz.
- checklist yok bu linki incele https://tag-app-delivery.cncf.io/whitepapers/platforms/

## Slide 7 – IDP Olursa Ne Değişecek?
**Slide Content**
- Provisioning süresi saatlere inecek
- Tek tıkla ortam + GitOps template’leri
- Developer experience ölçülebilir hâle gelecek
**Speaker Notes**
- Somut hikâye anlatın: Geliştirici portalda servisi seçiyor → template formu dolduruyor → otomatik policy check/pipeline tetikleniyor → birkaç saat içinde ortam ve git repo hazır. “Önceden X gün bekliyorduk, şimdi Y saat” gibi karşılaştırmalı veri ekleyin.
- Observability/dashboard tarafında hangi metrikleri ölçebilir hale geleceğinizi (deployment frequency, lead time, incident MTTR, DX anket sonuçları) örnekleyin; böylece karar vericiler IDP’nin business KPI’larına bağlandığını duysun.

## Slide 8 – IDP Olmazsa Kaybedilenler
**Slide Content**
- Ticket kuyrukları büyür, TTM uzar
- Shadow IT ve manuel script artışı
- Platform ekipleri “reaktif” kalır
**Speaker Notes**
- Olmazsa senaryosunu rakamlarla çizin: örneğin “ticket sırası 2 hafta sürmeye devam ederse yıl sonu backlog 2000 ticket’a çıkıyor”; “manuel script’ler nedeniyle onay dışı değişiklik sayısı %X artıyor”. Security/compliance kayıplarını (audit log yokluğu, izinsiz ortamlar) özellikle belirtin.
- Platform ekibinin stratejik işlere vakit ayıramayıp sadece ticket cevaplamak zorunda kalacağını, yeni ürün çıkış sürelerinin uzayacağını vurgulayın; sponsorların “bu maliyet bizi nasıl etkiler?” sorusuna cevap verin.

## Slide 9 – Dünyadan Örnekler
**Slide Content**
- Spotify Backstage: %40 onboarding süresi düşüşü
- Zalando STUPS: self-service compliance
- Internal örnek: X şirketi – IDP sonrası deployment 5× arttı
**Speaker Notes**
- Örnekleri kısa tutup “benzer sonuçları hedefliyoruz” mesajını verin.

## Slide 10 – Portal Bileşenleri & Entegrasyonlar
**Slide Content**
- GitOps repo (template yönetimi)
- Kubernetes + Traefik + PostgreSQL entegrasyonları
- AuthZ/AuthN, audit log pipeline
**Speaker Notes**
- Diyagram gösterme imkânınız varsa burada kullanın; bugün hangi entegrasyonlar hazır onları sıralayın.

## Slide 11 – Portal Akışı (Demo Örneği)
**Slide Content**
- Servis kataloğu → form doldurma
- Otomatik provisioning → pipeline tetikleme
- Observability & health checks
**Speaker Notes**
- Demo planlıyorsanız bu slaytta hikâyeyi özetleyin; yoksa ekran görüntüleriyle anlatın.

## Slide 12 – Mevcut Durum & KPI’lar
**Slide Content**
- Pilot ekip sayısı, kullanılan template’ler
- İlk geri bildirimler (NPS/anket)
- Kısa vadeli KPI hedefleri
**Speaker Notes**
- Gerçek verilerle destekleyin; hangi problemleri çözdüğünüzü “numbers talk” şeklinde anlatın.

## Slide 13 – Yol Haritası
**Slide Content**
- Q1: Yeni servis türleri, policy-as-code
- Q2: Geliştirici ölçüm panelleri, AI destekli rehber
- Q3: Tam otomasyon (servis lifecycle)
**Speaker Notes**
- Her fazın hedefleri ve bağımlılıklarını açıklayın; sponsorların nerede destek vermesi gerektiğini belirtin.

## Slide 14 – Beklentiler & Karar
**Slide Content**
- Portal’ın şirket standardı olarak onaylanması
- Platform ekibi için ek kapasite / bütçe
- Pilot → geniş çaplı roll-out takvimi
**Speaker Notes**
- Hangi kararı istediğinizi net söyleyin; onay çıkarsa “next step” olarak ne yapacağınızı söyleyin.
