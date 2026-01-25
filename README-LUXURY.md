# CarHive - Premium Luxury Car Rental Platform

A modern, multilingual luxury car rental platform inspired by Vip Car Istanbul and Avis, built with Next.js 14, featuring VIP chauffeur-driven services and premium self-drive options.

## 🌟 Key Features

### Multi-Language Support (i18n)
- **English (EN)** - Default language
- **Turkish (TR)** - Full Turkish localization
- **Arabic (AR)** - RTL support with Arabic translations

### Luxury Car Rental Services
- **Chauffeur-Driven Service** - Professional drivers for ultimate comfort
- **Self-Drive Luxury** - Premium vehicles for independent travel
- **VIP Airport Transfers** - Seamless airport pickups and drop-offs
- **Long-Term Rentals** - Flexible extended rental solutions
- **24/7 Availability** - Round-the-clock service

### Vehicle Categories
- **Executive Class** - Top-tier luxury vehicles
- **Luxury Sedans** - High-end comfort vehicles (Mercedes, BMW, etc.)
- **Premium SUVs** - Spacious luxury SUVs
- **VIP Minivans** - Perfect for groups (Mercedes Vito, etc.)
- **Sports Cars** - High-performance luxury vehicles

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Supabase)
- **ORM**: Drizzle ORM
- **Authentication**: Clerk
- **Payments**: Stripe
- **Image Management**: Cloudinary
- **Internationalization**: next-intl
- **UI Components**: Radix UI

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/eduamdev/carhive.git
cd carhive

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials
```

## 🔧 Environment Variables

Create a `.env` file with the following:

```env
# Supabase Database
POSTGRES_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Stripe Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🗄️ Database Schema Updates

The platform now includes enhanced database schema for luxury car rental features:

### New Fields in `cars` Table:
- `chauffeur_available` - Boolean flag for chauffeur service availability
- `chauffeur_price_per_day` - Additional cost for chauffeur service
- `vip_service` - Flag for VIP service designation
- `luxury_class` - Vehicle classification (standard, premium, luxury, executive)

### Database Commands:

```bash
# Generate migration
pnpm db:generate

# Push schema to database (Supabase)
pnpm db:push

# Run migrations
pnpm db:migrate

# Seed database with sample data
pnpm db:seed
```

## 🚀 Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## 🌍 Internationalization

The platform supports three languages with full translations:

### Adding New Translations

1. Add translations to `/messages/[locale].json`
2. Use the `useTranslations` hook in components:

```tsx
import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations('namespace')
  return <h1>{t('title')}</h1>
}
```

### Language Switcher

The language switcher is available in the header, allowing users to switch between EN/TR/AR on any page.

## 📱 Key Features Implementation

### VIP Services Section
Located in `/app/(app)/(home)/components/vip-services.tsx`, showcasing:
- Chauffeur-driven luxury vehicles
- Self-drive premium cars
- VIP airport transfers
- Long-term rental options

### Enhanced Car Types
Updated car categories to focus on luxury:
- Luxury Sedans (Mercedes, BMW, Audi)
- Premium SUVs
- VIP Minivans (Mercedes Vito)
- Executive Class vehicles
- Sports Cars

### 24/7 Availability Badge
Prominent display of round-the-clock service availability throughout the site.

## 🎨 UI Components

### New Components:
- `LanguageSwitcher` - Multi-language selector
- `VipServices` - Premium services showcase
- `AvailabilityBadge` - 24/7 service indicator
- Enhanced `Hero` section with luxury focus

## 📊 Service Types

```typescript
export type ServiceType = "self-drive" | "chauffeur"
export type LuxuryClass = "standard" | "premium" | "luxury" | "executive"
```

## 🔍 Search & Filtering

Enhanced search parameters include:
- Service type (chauffeur vs self-drive)
- Luxury class filtering
- Body style preferences
- Price range
- Location-based search
- Date availability

## 🏢 Target Market

Similar to Vip Car Istanbul and Avis Turkey, targeting:
- Business travelers requiring executive transportation
- Tourists seeking luxury travel experiences
- Special events and VIP transfers
- Long-term luxury vehicle needs
- Airport transfer services

## 📞 Contact & Support

- **24/7 Availability**: Round-the-clock customer support
- **Professional Service**: 15+ years experience in luxury transportation
- **Service Areas**: Istanbul, Ankara, Izmir, Antalya, and Turkey-wide

## 🛣️ Roadmap

- [ ] Real-time availability checking
- [ ] WhatsApp integration for instant booking
- [ ] Driver profiles and ratings
- [ ] Route optimization for transfers
- [ ] Corporate account management
- [ ] Mobile app (iOS/Android)

## 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## 👨‍💻 Author

**eduamdev**
- Website: [eduam.dev](https://eduam.dev)
- GitHub: [@eduamdev](https://github.com/eduamdev)

## 🙏 Acknowledgments

Inspired by:
- [Vip Car Istanbul](https://vipcar.rentals) - Luxury VIP car rental services
- [Avis Turkey](https://www.avis.com.tr) - Premium car rental solutions

---

**Built with ❤️ for luxury travel experiences**
