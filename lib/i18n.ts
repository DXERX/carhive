export const locales = ["en", "ar", "tr"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const translations = {
  en: {
    common: {
      language: "Language",
      browseCars: "Browse Cars",
    },
    userMenu: {
      account: "Account",
      dashboard: "Dashboard",
      myBookings: "My Bookings",
      profileSettings: "Profile Settings",
      adminDashboard: "Admin Dashboard",
      helpCenter: "Help Center",
      signOut: "Sign out",
      signUp: "Sign up",
      logIn: "Log in",
      giftCards: "Gift Cards",
    },
    cars: {
      filters: "Filters",
      filtersDescription:
        "Refine your search by adjusting the filters below to find your perfect match.",
      showCars: "Show cars",
      clearAll: "Clear all",
      powertrain: "Powertrain",
      priceRange: "Price range",
      dailyPrices: "Daily prices before fees and taxes",
      minimum: "Minimum",
      maximum: "Maximum",
      bodyStyle: "Body Style",
      seats: "Seats",
      any: "Any",
      transmission: "Transmission",
      viewDetails: "View Details",
      perDay: "day",
      powertrainLabels: {
        gasoline: "Gasoline",
        diesel: "Diesel",
        hybrid: "Hybrid",
        electric: "Electric",
      },
      transmissionLabels: {
        automatic: "Automatic",
        manual: "Manual",
      },
      bodyStyleLabels: {
        hatchback: "Hatchback",
        minivan: "Minivan",
        "pickup-truck": "Pickup Truck",
        "sports-car": "Sports Car",
        suv: "SUV",
        sedan: "Sedan",
      },
    },
    carDetails: {
      seats: "{count} seats",
      unlimitedMileage: "Unlimited mileage",
      reviews: "{count} reviews",
      offersTitle: "What this car offers",
      imageInterior: "car interior",
      imageDoorPanel: "car door panel",
      imageSeat: "car seat",
      amenities: [
        {
          title: "Onboard Navigation System",
          description:
            "A car equipped with a GPS navigation system to help you find your way with ease.",
        },
        {
          title: "24/7 Roadside Assistance",
          description:
            "Access to round-the-clock roadside support for any emergencies or breakdowns.",
        },
        {
          title: "Free Wi-Fi in the Car",
          description:
            "Enjoy complimentary Wi-Fi access during your drive to stay connected on the go.",
        },
        {
          title: "Child Safety Seats Available",
          description:
            "Optional child safety seats are available to ensure the safety of your little ones.",
        },
      ],
    },
    reserveCard: {
      totalBeforeTaxes: "Total before taxes",
      addDatesForPrices: "Add dates for prices",
      checkIn: "Check in",
      checkOut: "Check out",
      addDate: "Add date",
      reserve: "Reserve",
      notChargedYet: "You won't be charged yet",
    },
    reservation: {
      confirmAndReserve: "Confirm and Reserve",
      yourTrip: "Your trip",
      dates: "Dates",
      yourTotal: "Your total",
      day: "day",
      days: "days",
      taxes: "Taxes",
      total: "Total",
      contactInformation: "Contact Information",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone Number",
      whatsapp: "WhatsApp Number",
      additionalNotes: "Additional Notes",
      fullNamePlaceholder: "Enter your full name",
      emailPlaceholder: "your.email@example.com",
      phonePlaceholder: "+90 XXX XXX XX XX",
      whatsappPlaceholder: "+90 XXX XXX XX XX (optional)",
      notesPlaceholder: "Any special requests or questions...",
      noCreditCard: "No Credit Card Required",
      cashPayment: "Cash payment available at pickup",
      confirmContact: "We'll contact you to confirm your booking",
      sendingRequest: "Sending Request...",
      sendReservationRequest: "Send Reservation Request",
      termsNotice: "By submitting, you agree to our terms and privacy policy",
      reservationRequestSent: "Reservation Request Sent! ✅",
      contactSoon: "We will contact you shortly to confirm your booking.",
      error: "Error",
      failedToCreateBooking: "Failed to create booking. Please try again.",
      somethingWentWrong: "Something went wrong. Please try again.",
    },
    reservationSuccess: {
      title: "Booking Request Received!",
      subtitle: "Thank you for choosing CarHive",
      received: "We've received your reservation request{carName}!",
      emailSent: "A confirmation email has been sent to {email}",
      nextTitle: "What happens next?",
      nextDescription:
        "Our team will review your booking request and contact you within 24 hours to confirm your reservation and provide payment details.",
      emailTitle: "Check your email",
      emailDescription:
        "We've sent a confirmation email with your booking details. Please check your inbox (and spam folder just in case).",
      referenceTitle: "Booking Reference",
      referenceDescription:
        "Your booking is being processed. You'll receive a booking reference number via email once confirmed.",
      needHelp: "Need help?",
      returnHome: "Return to Home",
      browseMoreCars: "Browse More Cars",
      redirecting: "Redirecting to home in {count} seconds...",
    },
    home: {
      heroTitle: "Your Road Trip Starts Here",
      vipTitle: "Why Choose Avis Istanbul Airport",
      vipServices: [
        {
          title: "Modern Vehicles",
          description: "Latest model cars, clean and well-maintained for your comfort",
        },
        {
          title: "Airport Service",
          description: "Quick pickup and delivery directly from Istanbul Airport",
        },
        {
          title: "Flexible Payment",
          description: "No credit card required - cash payment accepted",
        },
        {
          title: "24/7 Available",
          description: "Book anytime, reliable service around the clock",
        },
      ],
      browseCarTypesTitle: "Browse by Car Type",
      popularDestinationsTitle: "Where to Rent Next",
      carsFromLabel: "Cars from",
      featuresTitle: "How It Works",
      features: [
        {
          title: "Easy Booking",
          description:
            "Simple process to book your car in just a few clicks. No hidden fees, transparent pricing.",
        },
        {
          title: "Secure & Reliable",
          description:
            "Your safety is our priority. All vehicles are inspected and properly insured.",
        },
        {
          title: "Istanbul Airport Service",
          description:
            "Convenient pickup and dropoff directly from Istanbul Airport locations.",
        },
        {
          title: "Wide Selection",
          description:
            "Choose from our diverse fleet of well-maintained vehicles to match your needs.",
        },
      ],
      testimonialsTitle: "What Our Customers Are Saying",
      ratingLabel: "Rating: {rating} out of 5",
      ctaTitleLine1: "Ready to hit the road?",
      ctaTitleLine2: "Book your car today.",
      search: {
        pickupDropoff: "Pick-up / Drop-off",
        selectLocation: "Select location",
        searchLocation: "Search location...",
        noLocationFound: "No location found.",
        checkIn: "Check in",
        checkOut: "Check out",
        pickDate: "Pick a date",
        search: "Search",
      },
    },
    footer: {
      builtBy: "Built by",
      sections: [
        {
          title: "AVIS",
          links: ["AVIS"],
        },
        {
          title: "Services",
          links: [
            "Car Rentals",
            "Insurance Options",
            "Corporate Rentals",
            "Special Offers",
            "FAQs",
          ],
        },
        {
          title: "Resources",
          links: [
            "Help Center",
            "Privacy Policy",
            "Terms of Service",
            "Accessibility",
            "Vehicle Guides",
            "Customer Testimonials",
          ],
        },
        {
          title: "Company",
          links: ["About", "Contact Us", "Blog", "Partners", "Customers", "Careers", "Press"],
        },
        {
          title: "Social",
          links: ["Youtube", "Twitter", "Instagram", "Facebook"],
        },
      ],
    },
    carTypes: {
      sedan: "Sedan",
      suv: "SUV",
      hatchback: "Hatchback",
      roadster: "Roadster",
      truck: "Truck",
      minivan: "Minivan",
      electric: "Electric",
      hybrid: "Hybrid",
    },
  },
  ar: {
    common: {
      language: "اللغة",
      browseCars: "تصفح السيارات",
    },
    userMenu: {
      account: "الحساب",
      dashboard: "لوحة التحكم",
      myBookings: "حجوزاتي",
      profileSettings: "إعدادات الملف الشخصي",
      adminDashboard: "لوحة الإدارة",
      helpCenter: "مركز المساعدة",
      signOut: "تسجيل الخروج",
      signUp: "إنشاء حساب",
      logIn: "تسجيل الدخول",
      giftCards: "بطاقات الهدايا",
    },
    cars: {
      filters: "الفلاتر",
      filtersDescription:
        "حسّن نتائج البحث بضبط الفلاتر أدناه للعثور على الخيار المناسب.",
      showCars: "عرض السيارات",
      clearAll: "مسح الكل",
      powertrain: "نظام الحركة",
      priceRange: "نطاق السعر",
      dailyPrices: "أسعار يومية قبل الرسوم والضرائب",
      minimum: "الحد الأدنى",
      maximum: "الحد الأقصى",
      bodyStyle: "نوع الهيكل",
      seats: "المقاعد",
      any: "أي",
      transmission: "ناقل الحركة",
      viewDetails: "عرض التفاصيل",
      perDay: "اليوم",
      powertrainLabels: {
        gasoline: "بنزين",
        diesel: "ديزل",
        hybrid: "هجينة",
        electric: "كهربائية",
      },
      transmissionLabels: {
        automatic: "أوتوماتيك",
        manual: "يدوي",
      },
      bodyStyleLabels: {
        hatchback: "هاتشباك",
        minivan: "ميني فان",
        "pickup-truck": "بيك أب",
        "sports-car": "رياضية",
        suv: "دفع رباعي",
        sedan: "سيدان",
      },
    },
    carDetails: {
      seats: "{count} مقاعد",
      unlimitedMileage: "كيلومترات غير محدودة",
      reviews: "{count} مراجعات",
      offersTitle: "ما الذي يقدمه هذا السيارة",
      imageInterior: "مقصورة السيارة",
      imageDoorPanel: "لوحة باب السيارة",
      imageSeat: "مقعد السيارة",
      amenities: [
        {
          title: "نظام ملاحة مدمج",
          description:
            "سيارة مزودة بنظام ملاحة GPS لمساعدتك على الوصول بسهولة.",
        },
        {
          title: "مساعدة على الطريق 24/7",
          description:
            "دعم على مدار الساعة لأي طوارئ أو أعطال.",
        },
        {
          title: "واي فاي مجاني داخل السيارة",
          description:
            "استمتع بواي فاي مجاني أثناء القيادة للبقاء على اتصال.",
        },
        {
          title: "مقاعد أمان للأطفال متاحة",
          description:
            "مقاعد أمان للأطفال متاحة لضمان سلامة الصغار.",
        },
      ],
    },
    reserveCard: {
      totalBeforeTaxes: "الإجمالي قبل الضرائب",
      addDatesForPrices: "أضف التواريخ لعرض الأسعار",
      checkIn: "تاريخ الاستلام",
      checkOut: "تاريخ الإرجاع",
      addDate: "أضف تاريخًا",
      reserve: "احجز",
      notChargedYet: "لن يتم خصم أي مبلغ الآن",
    },
    reservation: {
      confirmAndReserve: "تأكيد والحجز",
      yourTrip: "رحلتك",
      dates: "التواريخ",
      yourTotal: "الإجمالي",
      day: "يوم",
      days: "أيام",
      taxes: "الضرائب",
      total: "الإجمالي",
      contactInformation: "معلومات الاتصال",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      whatsapp: "رقم واتساب",
      additionalNotes: "ملاحظات إضافية",
      fullNamePlaceholder: "أدخل اسمك الكامل",
      emailPlaceholder: "your.email@example.com",
      phonePlaceholder: "+90 XXX XXX XX XX",
      whatsappPlaceholder: "+90 XXX XXX XX XX (اختياري)",
      notesPlaceholder: "أي طلبات خاصة أو أسئلة...",
      noCreditCard: "لا حاجة لبطاقة ائتمان",
      cashPayment: "الدفع النقدي متاح عند الاستلام",
      confirmContact: "سنتواصل معك لتأكيد حجزك",
      sendingRequest: "جارٍ إرسال الطلب...",
      sendReservationRequest: "إرسال طلب الحجز",
      termsNotice: "بإرسال النموذج، فإنك توافق على الشروط وسياسة الخصوصية",
      reservationRequestSent: "تم إرسال طلب الحجز! ✅",
      contactSoon: "سنتواصل معك قريبًا لتأكيد الحجز.",
      error: "خطأ",
      failedToCreateBooking: "فشل إنشاء الحجز. حاول مرة أخرى.",
      somethingWentWrong: "حدث خطأ ما. حاول مرة أخرى.",
    },
    reservationSuccess: {
      title: "تم استلام طلب الحجز!",
      subtitle: "شكرًا لاختيارك CarHive",
      received: "لقد استلمنا طلب الحجز{carName}!",
      emailSent: "تم إرسال بريد تأكيد إلى {email}",
      nextTitle: "ماذا يحدث الآن؟",
      nextDescription:
        "سيراجع فريقنا طلبك وسنتواصل خلال 24 ساعة لتأكيد الحجز وتفاصيل الدفع.",
      emailTitle: "تحقق من بريدك الإلكتروني",
      emailDescription:
        "أرسلنا لك بريدًا يحتوي على تفاصيل الحجز. يرجى التحقق من صندوق الوارد (والرسائل غير المرغوب فيها).",
      referenceTitle: "مرجع الحجز",
      referenceDescription:
        "جارٍ معالجة حجزك. ستتلقى رقم المرجع عبر البريد الإلكتروني بعد التأكيد.",
      needHelp: "تحتاج مساعدة؟",
      returnHome: "العودة للرئيسية",
      browseMoreCars: "تصفح المزيد من السيارات",
      redirecting: "سيتم تحويلك للرئيسية خلال {count} ثوانٍ...",
    },
    home: {
      heroTitle: "رحلتك تبدأ هنا",
      vipTitle: "لماذا تختار أفيس مطار إسطنبول",
      vipServices: [
        {
          title: "سيارات حديثة",
          description: "أحدث الموديلات، نظيفة ومعتنى بها لراحتك",
        },
        {
          title: "خدمة المطار",
          description: "استلام وتسليم سريع مباشرة من مطار إسطنبول",
        },
        {
          title: "دفع مرن",
          description: "لا حاجة لبطاقة ائتمان - الدفع نقدًا متاح",
        },
        {
          title: "متاح 24/7",
          description: "احجز في أي وقت، خدمة موثوقة على مدار الساعة",
        },
      ],
      browseCarTypesTitle: "تصفح حسب نوع السيارة",
      popularDestinationsTitle: "إلى أين تستأجر بعد ذلك",
      carsFromLabel: "تبدأ السيارات من",
      featuresTitle: "كيف يعمل",
      features: [
        {
          title: "حجز سهل",
          description:
            "عملية بسيطة لحجز سيارتك في بضع نقرات فقط. بدون رسوم مخفية وتسعير شفاف.",
        },
        {
          title: "آمن وموثوق",
          description: "سلامتك أولويتنا. جميع المركبات مفحوصة ومؤمنة بشكل مناسب.",
        },
        {
          title: "خدمة مطار إسطنبول",
          description: "استلام وتسليم مريح مباشرة من مواقع مطار إسطنبول.",
        },
        {
          title: "تشكيلة واسعة",
          description: "اختر من أسطولنا المتنوع من المركبات المُعتنى بها بما يناسب احتياجاتك.",
        },
      ],
      testimonialsTitle: "ماذا يقول عملاؤنا",
      ratingLabel: "التقييم: {rating} من 5",
      ctaTitleLine1: "جاهز للانطلاق؟",
      ctaTitleLine2: "احجز سيارتك اليوم.",
      search: {
        pickupDropoff: "الاستلام / التسليم",
        selectLocation: "اختر الموقع",
        searchLocation: "ابحث عن موقع...",
        noLocationFound: "لم يتم العثور على موقع.",
        checkIn: "تاريخ الاستلام",
        checkOut: "تاريخ الإرجاع",
        pickDate: "اختر تاريخًا",
        search: "بحث",
      },
    },
    footer: {
      builtBy: "بُني بواسطة",
      sections: [
        {
          title: "الخدمات",
          links: [
            "تأجير السيارات",
            "خيارات التأمين",
            "تأجير الشركات",
            "عروض خاصة",
            "الأسئلة الشائعة",
          ],
        },
        {
          title: "الموارد",
          links: [
            "مركز المساعدة",
            "سياسة الخصوصية",
            "شروط الخدمة",
            "إمكانية الوصول",
            "أدلة المركبات",
            "شهادات العملاء",
          ],
        },
        {
          title: "الشركة",
          links: ["من نحن", "اتصل بنا", "المدونة", "الشركاء", "العملاء", "الوظائف", "الصحافة"],
        },
        {
          title: "اجتماعي",
          links: ["يوتيوب", "تويتر", "إنستغرام", "فيسبوك"],
        },
      ],
    },
    carTypes: {
      sedan: "سيدان",
      suv: "دفع رباعي",
      hatchback: "هاتشباك",
      roadster: "رودستر",
      truck: "شاحنة",
      minivan: "ميني فان",
      electric: "كهربائية",
      hybrid: "هجينة",
    },
  },
  tr: {
    common: {
      language: "Dil",
      browseCars: "Araçları Gör",
    },
    userMenu: {
      account: "Hesap",
      dashboard: "Panel",
      myBookings: "Rezervasyonlarım",
      profileSettings: "Profil Ayarları",
      adminDashboard: "Yönetici Paneli",
      helpCenter: "Yardım Merkezi",
      signOut: "Çıkış yap",
      signUp: "Kayıt ol",
      logIn: "Giriş yap",
      giftCards: "Hediye Kartları",
    },
    cars: {
      filters: "Filtreler",
      filtersDescription:
        "Aramanızı daraltmak ve en uygun seçeneği bulmak için filtreleri ayarlayın.",
      showCars: "Araçları göster",
      clearAll: "Tümünü temizle",
      powertrain: "Tahrik",
      priceRange: "Fiyat aralığı",
      dailyPrices: "Vergi ve ücretler hariç günlük fiyatlar",
      minimum: "Minimum",
      maximum: "Maksimum",
      bodyStyle: "Kasa Tipi",
      seats: "Koltuk",
      any: "Farketmez",
      transmission: "Vites",
      viewDetails: "Detayları gör",
      perDay: "gün",
      powertrainLabels: {
        gasoline: "Benzin",
        diesel: "Dizel",
        hybrid: "Hibrit",
        electric: "Elektrik",
      },
      transmissionLabels: {
        automatic: "Otomatik",
        manual: "Manuel",
      },
      bodyStyleLabels: {
        hatchback: "Hatchback",
        minivan: "Minivan",
        "pickup-truck": "Pickup",
        "sports-car": "Spor",
        suv: "SUV",
        sedan: "Sedan",
      },
    },
    carDetails: {
      seats: "{count} koltuk",
      unlimitedMileage: "Sınırsız kilometre",
      reviews: "{count} yorum",
      offersTitle: "Bu araç neler sunuyor",
      imageInterior: "aracın içi",
      imageDoorPanel: "kapı paneli",
      imageSeat: "koltuk",
      amenities: [
        {
          title: "Dahili Navigasyon Sistemi",
          description:
            "GPS navigasyon sistemi ile yolunuzu kolayca bulun.",
        },
        {
          title: "7/24 Yol Yardımı",
          description:
            "Acil durumlar veya arızalar için gün boyu yol yardımı.",
        },
        {
          title: "Araçta Ücretsiz Wi‑Fi",
          description:
            "Sürüş sırasında bağlantıda kalmanız için ücretsiz Wi‑Fi.",
        },
        {
          title: "Çocuk Koltuğu Mevcut",
          description:
            "Çocukların güvenliği için opsiyonel çocuk koltukları mevcuttur.",
        },
      ],
    },
    reserveCard: {
      totalBeforeTaxes: "Vergiler hariç toplam",
      addDatesForPrices: "Fiyatları görmek için tarih ekleyin",
      checkIn: "Alış tarihi",
      checkOut: "Teslim tarihi",
      addDate: "Tarih ekle",
      reserve: "Rezervasyon yap",
      notChargedYet: "Henüz ücret alınmayacak",
    },
    reservation: {
      confirmAndReserve: "Onayla ve Rezervasyon",
      yourTrip: "Seyahatiniz",
      dates: "Tarihler",
      yourTotal: "Toplam",
      day: "gün",
      days: "gün",
      taxes: "Vergiler",
      total: "Toplam",
      contactInformation: "İletişim Bilgileri",
      fullName: "Ad Soyad",
      email: "E‑posta",
      phone: "Telefon",
      whatsapp: "WhatsApp",
      additionalNotes: "Ek Notlar",
      fullNamePlaceholder: "Ad soyadınızı girin",
      emailPlaceholder: "your.email@example.com",
      phonePlaceholder: "+90 XXX XXX XX XX",
      whatsappPlaceholder: "+90 XXX XXX XX XX (opsiyonel)",
      notesPlaceholder: "Özel istekleriniz veya sorularınız...",
      noCreditCard: "Kredi kartı gerekmez",
      cashPayment: "Teslimat sırasında nakit ödeme",
      confirmContact: "Rezervasyonunuzu onaylamak için sizinle iletişime geçeceğiz",
      sendingRequest: "İstek gönderiliyor...",
      sendReservationRequest: "Rezervasyon İsteği Gönder",
      termsNotice: "Göndererek şartlar ve gizlilik politikasını kabul etmiş olursunuz",
      reservationRequestSent: "Rezervasyon isteği alındı! ✅",
      contactSoon: "Rezervasyonunuzu onaylamak için yakında iletişime geçeceğiz.",
      error: "Hata",
      failedToCreateBooking: "Rezervasyon oluşturulamadı. Lütfen tekrar deneyin.",
      somethingWentWrong: "Bir şeyler yanlış gitti. Lütfen tekrar deneyin.",
    },
    reservationSuccess: {
      title: "Rezervasyon İsteği Alındı!",
      subtitle: "CarHive'ı tercih ettiğiniz için teşekkürler",
      received: "Rezervasyon isteğinizi aldık{carName}!",
      emailSent: "Onay e-postası {email} adresine gönderildi",
      nextTitle: "Sonraki adım nedir?",
      nextDescription:
        "Ekibimiz talebinizi inceleyip 24 saat içinde sizinle iletişime geçecek ve ödeme detaylarını paylaşacaktır.",
      emailTitle: "E-postanızı kontrol edin",
      emailDescription:
        "Rezervasyon detaylarıyla bir onay e-postası gönderdik. Lütfen gelen kutunuzu (ve spam klasörünü) kontrol edin.",
      referenceTitle: "Rezervasyon Referansı",
      referenceDescription:
        "Rezervasyonunuz işleniyor. Onaylandıktan sonra referans numarası e-posta ile gönderilecek.",
      needHelp: "Yardıma mı ihtiyacınız var?",
      returnHome: "Ana sayfaya dön",
      browseMoreCars: "Daha fazla araç incele",
      redirecting: "{count} saniye içinde ana sayfaya yönlendiriliyorsunuz...",
    },
    home: {
      heroTitle: "Yolculuğunuz Burada Başlıyor",
      vipTitle: "Neden Avis İstanbul Havalimanı",
      vipServices: [
        {
          title: "Modern Araçlar",
          description: "Konforunuz için en yeni modeller, temiz ve bakımlı araçlar",
        },
        {
          title: "Havalimanı Hizmeti",
          description: "İstanbul Havalimanı’ndan hızlı teslim alma ve bırakma",
        },
        {
          title: "Esnek Ödeme",
          description: "Kredi kartı gerekmez - nakit ödeme kabul edilir",
        },
        {
          title: "7/24 Hizmet",
          description: "İstediğiniz zaman rezervasyon, gün boyu güvenilir hizmet",
        },
      ],
      browseCarTypesTitle: "Araç Tipine Göre İncele",
      popularDestinationsTitle: "Sıradaki Kiralama Noktanız",
      carsFromLabel: "Araçlar şu fiyattan",
      featuresTitle: "Nasıl Çalışır",
      features: [
        {
          title: "Kolay Rezervasyon",
          description:
            "Sadece birkaç tıklama ile aracınızı ayırtın. Gizli ücret yok, şeffaf fiyatlandırma.",
        },
        {
          title: "Güvenli ve Sağlam",
          description: "Güvenliğiniz önceliğimizdir. Tüm araçlar kontrol edilir ve sigortalıdır.",
        },
        {
          title: "İstanbul Havalimanı Hizmeti",
          description: "İstanbul Havalimanı noktalarından kolay teslim alma ve bırakma.",
        },
        {
          title: "Geniş Seçenek",
          description: "İhtiyaçlarınıza uygun, bakımlı araçlardan oluşan filomuzdan seçin.",
        },
      ],
      testimonialsTitle: "Müşterilerimiz Ne Diyor",
      ratingLabel: "Puan: {rating} / 5",
      ctaTitleLine1: "Yola çıkmaya hazır mısınız?",
      ctaTitleLine2: "Aracınızı bugün ayırtın.",
      search: {
        pickupDropoff: "Alış / Teslim",
        selectLocation: "Konum seç",
        searchLocation: "Konum ara...",
        noLocationFound: "Konum bulunamadı.",
        checkIn: "Alış tarihi",
        checkOut: "Teslim tarihi",
        pickDate: "Tarih seç",
        search: "Ara",
      },
    },
    footer: {
      builtBy: "Geliştiren",
      sections: [
        {
          title: "Hizmetler",
          links: [
            "Araç Kiralama",
            "Sigorta Seçenekleri",
            "Kurumsal Kiralama",
            "Özel Teklifler",
            "SSS",
          ],
        },
        {
          title: "Kaynaklar",
          links: [
            "Yardım Merkezi",
            "Gizlilik Politikası",
            "Hizmet Şartları",
            "Erişilebilirlik",
            "Araç Rehberleri",
            "Müşteri Yorumları",
          ],
        },
        {
          title: "Şirket",
          links: ["Hakkımızda", "Bize Ulaşın", "Blog", "Ortaklar", "Müşteriler", "Kariyer", "Basın"],
        },
        {
          title: "Sosyal",
          links: ["Youtube", "Twitter", "Instagram", "Facebook"],
        },
      ],
    },
    carTypes: {
      sedan: "Sedan",
      suv: "SUV",
      hatchback: "Hatchback",
      roadster: "Roadster",
      truck: "Kamyon",
      minivan: "Minivan",
      electric: "Elektrikli",
      hybrid: "Hibrit",
    },
  },
} as const

export function isLocale(value: string | undefined | null): value is Locale {
  return Boolean(value && locales.includes(value as Locale))
}

export function getTranslations(locale: Locale) {
  return translations[locale] ?? translations[defaultLocale]
}
