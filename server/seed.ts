import { db } from "./db";
import { products } from "@shared/schema";

const seedProducts = [
  {
    name: "Vitamin C Serum - Brightens Skin",
    description: "Brightening serum with natural vitamin C to enhance skin radiance",
    detailedDescription: "Our premium Vitamin C Serum is formulated with 15% pure L-Ascorbic Acid to brighten your skin, reduce dark spots, and boost collagen production. This lightweight, fast-absorbing serum is enriched with natural antioxidants that protect your skin from environmental damage while providing a luminous glow.\n\n**Key Benefits:**\n- Brightens and evens skin tone\n- Reduces appearance of dark spots and hyperpigmentation\n- Boosts collagen production for firmer skin\n- Protects against free radical damage\n- Improves skin texture and radiance\n\n**Suitable For:** All skin types, especially dull or uneven skin tone\n\n**Texture & Fragrance:** Lightweight, silky serum with a subtle citrus scent\n\n**Usage Frequency:** Apply morning and evening after cleansing\n\n**Expected Results:** Visible brightening in 2-4 weeks, significant improvement in 8-12 weeks",
    price: "35.00",
    category: "Serums",
    imageUrl: "/assets/vitamin-c-serum.png",
    stock: 100,
    rating: "4.80",
    ingredients: "L-Ascorbic Acid, Hyaluronic Acid, Vitamin E, Ferulic Acid, Aloe Vera Extract",
    howToUse: "Apply 3-4 drops to clean, dry face. Gently massage in circular motions. Follow with moisturizer and sunscreen during the day.",
    isActive: true
  },
  {
    name: "Natural Beetroot Lip Balm",
    description: "Nourishing lip balm with natural beetroot extract for rosy, soft lips",
    detailedDescription: "Indulge your lips with our Natural Beetroot Lip Balm, crafted with organic beetroot extract and nourishing botanical oils. This luxurious balm provides intense hydration while giving your lips a natural rosy tint.\n\n**Key Benefits:**\n- Deep hydration and nourishment\n- Natural rosy tint from beetroot\n- Repairs dry, chapped lips\n- Long-lasting moisture\n- SPF 15 sun protection\n\n**Suitable For:** All lip types, especially dry or chapped lips\n\n**Texture & Fragrance:** Creamy balm with a sweet, natural beetroot scent\n\n**Usage Frequency:** Apply as needed throughout the day\n\n**Expected Results:** Instant hydration, visibly softer lips within days",
    price: "12.00",
    category: "Lip Care",
    imageUrl: "/assets/beetroot-lipbalm.png",
    stock: 150,
    rating: "4.90",
    ingredients: "Organic Beetroot Extract, Shea Butter, Coconut Oil, Beeswax, Vitamin E, Jojoba Oil",
    howToUse: "Apply generously to lips whenever needed. Perfect for daily use and before lipstick application.",
    isActive: true
  },
  {
    name: "Nighty Night Cream",
    description: "Intensive night cream for skin repair and rejuvenation",
    detailedDescription: "Transform your skin overnight with our Nighty Night Cream, a rich, luxurious formula designed to repair and rejuvenate while you sleep. Packed with peptides, retinol, and hyaluronic acid, this cream works to reverse signs of aging and restore your skin's youthful vitality.\n\n**Key Benefits:**\n- Intensive overnight repair\n- Reduces fine lines and wrinkles\n- Deeply hydrates and plumps skin\n- Improves skin elasticity\n- Promotes cell renewal\n\n**Suitable For:** Mature skin, dry skin, all skin types concerned with aging\n\n**Texture & Fragrance:** Rich, creamy texture with calming lavender notes\n\n**Usage Frequency:** Apply every night before bed\n\n**Expected Results:** Smoother skin in 1 week, visible anti-aging effects in 4-6 weeks",
    price: "28.00",
    category: "Night Care",
    imageUrl: "/assets/night-cream.png",
    stock: 80,
    rating: "4.70",
    ingredients: "Retinol, Peptide Complex, Hyaluronic Acid, Shea Butter, Argan Oil, Lavender Essential Oil",
    howToUse: "Apply a generous amount to clean face and neck before bedtime. Gently massage in upward motions until absorbed.",
    isActive: true
  },
  {
    name: "Orange Whitening Face Wash",
    description: "Brightening face wash with orange extract for clear, radiant skin",
    detailedDescription: "Start your skincare routine with our Orange Whitening Face Wash, infused with natural orange extract and vitamin C. This gentle yet effective cleanser removes impurities while brightening your complexion and providing a refreshing citrus boost.\n\n**Key Benefits:**\n- Deeply cleanses without stripping\n- Brightens and evens skin tone\n- Removes excess oil and impurities\n- Refreshes and energizes skin\n- Natural vitamin C boost\n\n**Suitable For:** All skin types, especially oily and combination skin\n\n**Texture & Fragrance:** Creamy gel with fresh orange fragrance\n\n**Usage Frequency:** Use twice daily, morning and evening\n\n**Expected Results:** Clearer, brighter skin immediately, improved tone in 2-3 weeks",
    price: "18.00",
    category: "Cleansers",
    imageUrl: "/assets/orange-face-wash.png",
    stock: 120,
    rating: "4.60",
    ingredients: "Orange Extract, Vitamin C, Glycerin, Aloe Vera, Natural Surfactants, Orange Essential Oil",
    howToUse: "Wet face, apply a small amount, massage gently in circular motions for 30 seconds. Rinse thoroughly with water.",
    isActive: true
  },
  {
    name: "Rabbit Blood Hair Oil",
    description: "Strengthening hair oil for thick, lustrous hair growth",
    detailedDescription: "Revitalize your hair with our signature Rabbit Blood Hair Oil, a potent blend of rare botanical extracts and nourishing oils. This intensive treatment strengthens hair from root to tip, promotes growth, and adds incredible shine and manageability.\n\n**Key Benefits:**\n- Promotes faster hair growth\n- Strengthens hair follicles\n- Reduces hair fall significantly\n- Adds natural shine and softness\n- Nourishes scalp health\n\n**Suitable For:** All hair types, especially thin or damaged hair\n\n**Texture & Fragrance:** Lightweight oil with subtle herbal notes\n\n**Usage Frequency:** Apply 2-3 times per week, leave overnight for best results\n\n**Expected Results:** Reduced hair fall in 2 weeks, visible growth in 6-8 weeks",
    price: "32.00",
    category: "Hair Care",
    imageUrl: "/assets/rabbit-hair-oil.png",
    stock: 90,
    rating: "4.80",
    ingredients: "Bhringraj Extract, Amla Oil, Coconut Oil, Argan Oil, Rosemary Extract, Biotin, Vitamin E",
    howToUse: "Apply to scalp and hair, massage gently for 5 minutes. Leave for at least 2 hours or overnight. Wash with mild shampoo.",
    isActive: true
  },
  {
    name: "Red Wine Face Wash",
    description: "Anti-aging face wash with red wine extract and antioxidants",
    detailedDescription: "Indulge in the luxury of our Red Wine Face Wash, formulated with premium red wine extract rich in resveratrol and antioxidants. This sophisticated cleanser gently removes impurities while fighting signs of aging and protecting your skin from environmental damage.\n\n**Key Benefits:**\n- Powerful antioxidant protection\n- Anti-aging properties\n- Gentle deep cleansing\n- Improves skin firmness\n- Refines skin texture\n\n**Suitable For:** Mature skin, all skin types concerned with aging\n\n**Texture & Fragrance:** Luxurious cream with subtle grape notes\n\n**Usage Frequency:** Use twice daily for optimal results\n\n**Expected Results:** Smoother texture immediately, firmer skin in 3-4 weeks",
    price: "22.00",
    category: "Cleansers",
    imageUrl: "/assets/red-wine-face-wash.png",
    stock: 110,
    rating: "4.70",
    ingredients: "Red Wine Extract, Resveratrol, Grape Seed Oil, Vitamin E, Hyaluronic Acid, Natural Cleansers",
    howToUse: "Wet face, dispense a small amount and create a lather. Massage onto face for 30-45 seconds. Rinse thoroughly.",
    isActive: true
  },
  {
    name: "Sun Screen Lotion SPF 50",
    description: "Broad spectrum sunscreen with SPF 50 for maximum sun protection",
    detailedDescription: "Shield your skin from harmful UV rays with our Sun Screen Lotion SPF 50. This lightweight, non-greasy formula provides broad-spectrum protection against UVA and UVB rays while keeping your skin hydrated and comfortable all day long.\n\n**Key Benefits:**\n- Broad spectrum SPF 50 protection\n- Water-resistant for up to 80 minutes\n- Lightweight, non-greasy formula\n- Prevents sun damage and premature aging\n- Suitable for sensitive skin\n\n**Suitable For:** All skin types, including sensitive skin\n\n**Texture & Fragrance:** Light lotion, fragrance-free\n\n**Usage Frequency:** Apply 15 minutes before sun exposure, reapply every 2 hours\n\n**Expected Results:** Immediate protection, prevents sun damage when used regularly",
    price: "26.00",
    category: "Sun Care",
    imageUrl: "/assets/sunscreen.png",
    stock: 100,
    rating: "4.90",
    ingredients: "Zinc Oxide, Titanium Dioxide, Vitamin E, Aloe Vera, Hyaluronic Acid, Niacinamide",
    howToUse: "Apply generously 15 minutes before sun exposure. Reapply every 2 hours or after swimming/sweating.",
    isActive: true
  },
  {
    name: "Under Eye Cream",
    description: "Intensive eye cream to reduce dark circles and fine lines",
    detailedDescription: "Revive tired eyes with our Under Eye Cream, specially formulated to target dark circles, puffiness, and fine lines. This gentle yet effective cream combines peptides, caffeine, and hyaluronic acid to brighten, firm, and hydrate the delicate eye area.\n\n**Key Benefits:**\n- Reduces dark circles and puffiness\n- Minimizes fine lines and crow's feet\n- Firms and lifts eye area\n- Deeply hydrates delicate skin\n- Brightens and refreshes appearance\n\n**Suitable For:** All skin types, especially those with dark circles or aging concerns\n\n**Texture & Fragrance:** Lightweight cream, fragrance-free\n\n**Usage Frequency:** Apply morning and evening\n\n**Expected Results:** Reduced puffiness immediately, visible improvement in 2-4 weeks",
    price: "24.00",
    category: "Eye Care",
    imageUrl: "/assets/under-eye-cream.png",
    stock: 95,
    rating: "4.60",
    ingredients: "Caffeine, Peptide Complex, Vitamin K, Hyaluronic Acid, Niacinamide, Cucumber Extract",
    howToUse: "Gently pat a small amount around eye area using ring finger. Use morning and night after cleansing.",
    isActive: true
  }
];

async function seed() {
  try {
    console.log("Starting database seed...");
    
    for (const product of seedProducts) {
      await db.insert(products).values(product).onConflictDoNothing();
      console.log(`✓ Added: ${product.name}`);
    }
    
    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
